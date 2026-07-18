#!/usr/bin/env python3
"""Merge one builder result into the application greenspace JSON and TS files."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any


TS_HEADER = """/**
 * Population-weighted greenspace access for /dwelling.
 *
 * Generated from official ABS, VPA and PARKRES spatial sources.
 */
export const DWELLING_GREENSPACE_CONTEXT = """

TS_FOOTER = """ as const;

export type DwellingGreenspaceRecord =
  (typeof DWELLING_GREENSPACE_CONTEXT.records)[number];

export const DWELLING_GREENSPACE_BY_ID = Object.fromEntries(
  DWELLING_GREENSPACE_CONTEXT.records.map((record) => [record.id, record]),
) as Record<string, DwellingGreenspaceRecord>;
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--generated", type=Path, required=True)
    parser.add_argument("--qa", type=Path, required=True)
    parser.add_argument("--json", type=Path, required=True)
    parser.add_argument("--ts", type=Path, required=True)
    parser.add_argument("--app-qa", type=Path, required=True)
    return parser.parse_args()


def as_number(value: str, *, integer: bool = False) -> int | float:
    number = float(value)
    return int(round(number)) if integer else round(number, 1)


def app_record(generated: dict[str, Any], qa: dict[str, str]) -> dict[str, Any]:
    context = generated["context"]
    review_flags = [flag for flag in qa["reviewFlags"].split("|") if flag]
    return {
        "id": generated["id"],
        "displayName": generated["suburb"],
        "salSuburbs": generated["salSuburbs"],
        "salCodes": generated["salCodes"],
        "greenspace": generated["greenspace"],
        "greenspaceComponents": generated["greenspaceComponents"],
        "evidence": {
            "localOpenSpaceCoveragePct": as_number(
                qa["localCoverageWithin400mPct"]
            ),
            "representedPopulation": as_number(
                qa["residentialPopulationWeight"], integer=True
            ),
            "sampledMeshBlocks": as_number(
                qa["residentialSampleCount"], integer=True
            ),
        },
        "sourceMetadata": {
            "methodologyVersion": "greenspace-access-v1",
            "sourceYears": {
                "absSal": 2021,
                "absMeshBlocks": 2021,
                "absMeshBlockCounts": 2021,
                "vpaOpenSpace": 2019,
                "parkresSupplement": 2026,
            },
            "retrievedAt": generated["sourceMetadata"]["retrievedAt"],
            "distanceMethod": "straight-line",
            "majorParkThresholdHectares": 5,
        },
        "audit": {
            "populationWeightedMedianDistanceM": {
                key: int(round(value)) if value is not None else None
                for key, value in context[
                    "populationWeightedMedianDistanceM"
                ].items()
            },
            "nearbyOpenSpaces": context["nearbyOpenSpaces"],
            "nearbyNatureCorridors": context["nearbyNatureCorridors"],
            "residentialPopulationCoveragePct": as_number(
                qa["residentialPopulationCoveragePct"]
            ),
            "componentSpread": as_number(qa["componentSpread"]),
            "reviewFlags": review_flags,
        },
    }


def main() -> int:
    args = parse_args()
    generated_payload = json.loads(args.generated.read_text(encoding="utf-8"))
    if len(generated_payload["records"]) != 1:
        raise ValueError("Expected exactly one generated record.")
    with args.qa.open(newline="", encoding="utf-8") as handle:
        qa_rows = list(csv.DictReader(handle))
    if len(qa_rows) != 1:
        raise ValueError("Expected exactly one QA row.")

    payload = json.loads(args.json.read_text(encoding="utf-8"))
    record = app_record(generated_payload["records"][0], qa_rows[0])
    payload["records"] = [
        item for item in payload["records"] if item["id"] != record["id"]
    ]
    payload["records"].append(record)
    payload["records"].sort(key=lambda item: item["displayName"].casefold())

    rendered = json.dumps(payload, indent=2, ensure_ascii=False)
    args.json.write_text(rendered + "\n", encoding="utf-8")
    args.ts.write_text(TS_HEADER + rendered + TS_FOOTER, encoding="utf-8")

    with args.app_qa.open(newline="", encoding="utf-8") as handle:
        app_qa_rows = list(csv.DictReader(handle))
    app_qa_rows = [row for row in app_qa_rows if row["id"] != record["id"]]
    app_qa_rows.append(qa_rows[0])
    app_qa_rows.sort(key=lambda row: float(row["greenspace"]), reverse=True)
    for rank, row in enumerate(app_qa_rows, start=1):
        row["rank"] = str(rank)
    with args.app_qa.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=app_qa_rows[0].keys())
        writer.writeheader()
        writer.writerows(app_qa_rows)

    print(f"Integrated {record['id']}; context now has {len(payload['records'])} records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
