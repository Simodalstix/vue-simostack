#!/usr/bin/env python3
"""Backfill named language-community measures into the SAL context.

Adds Filipino, Tagalog, Thai, Spanish, Portuguese and Vietnamese measures to
additionalHouseholdContext on EVERY dataset record,
from the same G13c language-at-home table and G65 denominator the Cantonese
and Mandarin measures use. Filipino and Tagalog are separate, mutually
exclusive ABS language responses, so a Filipino-community lens can add their
counts without double-counting, exactly as the Chinese lens adds Cantonese
and Mandarin.

Each workbook is checked against the SHA-256 recorded on its record and the
G13c row labels are asserted before any cell is read.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any

import openpyxl

# G13c persons rows, with the labels the workbook must carry. Spanish and
# Portuguese together are the closest census signal for the South American
# community lens: the standard G09 country list carries no Colombia row.
LANGUAGE_ROWS = [
    ("filipinoSpokenAtHome", 50, "Filipino", "Persons who used Filipino at home"),
    ("tagalogSpokenAtHome", 52, "Tagalog", "Persons who used Tagalog at home"),
    ("thaiSpokenAtHome", 57, "Thai", "Persons who used Thai at home"),
    ("spanishSpokenAtHome", 55, "Spanish", "Persons who used Spanish at home"),
    ("portugueseSpokenAtHome", 45, "Portuguese", "Persons who used Portuguese at home"),
    ("vietnameseSpokenAtHome", 59, "Vietnamese", "Persons who used Vietnamese at home"),
]
DENOMINATOR_CELL = "G65"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Backfill named language-community measures into the community context."
    )
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--cache", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--generated-at", required=True)
    return parser.parse_args()


def parse_bounds(source: str) -> tuple[int, int]:
    prefix = "export const DWELLING_COMMUNITY_CONTEXT = "
    start = source.index(prefix) + len(prefix)
    end = source.index(" as const;", start)
    return start, end


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def number(workbook: Any, sheet: str, coordinate: str) -> int:
    value = workbook[sheet][coordinate].value
    if value is None:
        raise ValueError(f"Missing value at {sheet}!{coordinate}")
    return int(round(float(value)))


def label(workbook: Any, sheet: str, coordinate: str) -> str:
    return str(workbook[sheet][coordinate].value or "").strip()


def percentage(count: int, denominator: int) -> float | None:
    if denominator <= 0:
        return None
    return round(count / denominator * 100, 1)


def build_measures(workbook: Any, workbook_name: str) -> dict[str, dict[str, Any]]:
    denominator = number(workbook, "G13c", DENOMINATOR_CELL)
    measures: dict[str, dict[str, Any]] = {}
    for key, row, expected_label, numerator_label in LANGUAGE_ROWS:
        found = label(workbook, "G13c", f"A{row}")
        if found != expected_label:
            raise ValueError(
                f"{workbook_name} G13c!A{row}: expected {expected_label!r}, found {found!r}"
            )
        count = number(workbook, "G13c", f"G{row}")
        measures[key] = {
            "count": count,
            "denominator": denominator,
            "percentage": percentage(count, denominator),
            "numeratorLabel": numerator_label,
            "denominatorLabel": "All persons in G13, including language/proficiency not stated",
            "sourceTable": "G13c",
            "sourceCells": {"numerator": [f"G{row}"], "denominator": DENOMINATOR_CELL},
            "basis": "Place of usual residence",
        }
    return measures


def main() -> int:
    args = parse_args()
    source = args.dataset.read_text(encoding="utf-8")
    start, end = parse_bounds(source)
    dataset = json.loads(source[start:end])
    if json.dumps(dataset, indent=2, ensure_ascii=False) != source[start:end]:
        raise ValueError("Dataset JSON round-trip is not byte-identical; aborting.")

    for record in dataset["records"]:
        sal_code = record["geographyCode"].removeprefix("SAL")
        workbook_path = args.cache / f"GCP_SAL{sal_code}.xlsx"
        if not workbook_path.exists():
            raise FileNotFoundError(f"Missing official ABS workbook: {workbook_path}")
        recorded_sha = record["sourceMetadata"].get("sourceWorkbookSha256")
        if recorded_sha and recorded_sha != sha256_file(workbook_path):
            raise ValueError(f"{workbook_path.name} does not match the recorded SHA-256")
        workbook = openpyxl.load_workbook(workbook_path, data_only=True, read_only=True)
        record["additionalHouseholdContext"].update(
            build_measures(workbook, workbook_path.name)
        )

    dataset["generatedAt"] = args.generated_at
    body = json.dumps(dataset, indent=2, ensure_ascii=False)
    args.out.write_text(source[:start] + body + source[end:], encoding="utf-8")
    print(f"Backfilled {len(dataset['records'])} records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
