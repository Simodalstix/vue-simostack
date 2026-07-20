#!/usr/bin/env python3
"""Backfill Mingle and neutral family-context measures into the SAL dataset.

Adds two measures to additionalHouseholdContext on EVERY dataset record,
sourced from the same official ABS GCP workbooks as the rest of the record:

- unpartnered2554: persons aged 25-54 not in a registered or de facto
  marriage, over all persons aged 25-54 (G06, social marital status).
  G06 publishes 10-year bands (25-34 / 35-44 / 45-54), so 25-54 is the
  closest available cover of the requested 30-49 range; the band note is
  recorded on the measure itself.
- loneParentFamilies: neutral descriptive context only: one-parent families
  over all families in occupied private dwellings (G29, family composition;
  place of enumeration). This measure must never enter the Mingle score.

Also regenerates the community-context QA report, extending it with the new
measures. Every workbook is checked against the SHA-256 recorded on its
record, and the G06/G29 row labels are asserted before any cell is read so a
layout drift fails loudly instead of miscounting.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path
from typing import Any

import openpyxl

# G06 persons rows for the 25-34 / 35-44 / 45-54 bands, with the labels the
# workbook must carry for the read to be considered aligned.
G06_ROWS = [(42, "25-34 years"), (43, "35-44 years"), (44, "45-54 years")]
# G29: one-parent-family total row and all-families total row.
G29_ONE_PARENT_ROW = 43
G29_TOTAL_ROW = 47


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Backfill partner-pool measures into the community context."
    )
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--cache", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--qa-out", type=Path, required=True)
    parser.add_argument("--generated-at", required=True)
    return parser.parse_args()


def parse_dataset(source: str) -> dict[str, Any]:
    prefix = "export const DWELLING_COMMUNITY_CONTEXT = "
    start = source.index(prefix) + len(prefix)
    end = source.index(" as const;", start)
    return json.loads(source[start:end])


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


def assert_layout(workbook: Any, workbook_name: str) -> None:
    for row, expected in G06_ROWS:
        found = label(workbook, "G06", f"A{row}")
        if found != expected:
            raise ValueError(f"{workbook_name} G06!A{row}: expected {expected!r}, found {found!r}")
    if label(workbook, "G06", "B38") != "PERSONS":
        raise ValueError(f"{workbook_name} G06!B38 is not the PERSONS block")
    if not label(workbook, "G29", "A4").startswith("G29 FAMILY COMPOSITION"):
        raise ValueError(f"{workbook_name} G29 is not the family composition table")
    for row in (G29_ONE_PARENT_ROW, G29_TOTAL_ROW):
        if label(workbook, "G29", f"A{row}") != "Total":
            raise ValueError(f"{workbook_name} G29!A{row} is not a Total row")
    if not label(workbook, "G29", "A29").startswith("One parent family"):
        raise ValueError(f"{workbook_name} G29!A29 is not the one-parent-family block")


def build_measures(workbook: Any) -> dict[str, dict[str, Any]]:
    unpartnered = sum(number(workbook, "G06", f"D{row}") for row, _ in G06_ROWS)
    persons_25_54 = sum(number(workbook, "G06", f"E{row}") for row, _ in G06_ROWS)
    one_parent = number(workbook, "G29", f"B{G29_ONE_PARENT_ROW}")
    families = number(workbook, "G29", f"B{G29_TOTAL_ROW}")
    return {
        "unpartnered2554": {
            "count": unpartnered,
            "denominator": persons_25_54,
            "percentage": percentage(unpartnered, persons_25_54),
            "numeratorLabel": "Persons aged 25-54 not in a registered or de facto marriage",
            "denominatorLabel": "All persons aged 25-54 in G06",
            "sourceTable": "G06",
            "sourceCells": {
                "numerator": [f"D{row}" for row, _ in G06_ROWS],
                "denominator": [f"E{row}" for row, _ in G06_ROWS],
            },
            "basis": "Place of usual residence",
            "note": (
                "G06 publishes 10-year age bands (25-34, 35-44, 45-54); "
                "25-54 is the closest available cover of the requested 30-49 range."
            ),
        },
        "loneParentFamilies": {
            "count": one_parent,
            "denominator": families,
            "percentage": percentage(one_parent, families),
            "numeratorLabel": "One-parent families",
            "denominatorLabel": "All families in occupied private dwellings (G29)",
            "sourceTable": "G29",
            "sourceCells": {
                "numerator": [f"B{G29_ONE_PARENT_ROW}"],
                "denominator": [f"B{G29_TOTAL_ROW}"],
            },
            "basis": "Place of enumeration",
        },
    }


def qa_row(record: dict[str, Any]) -> dict[str, Any]:
    community = record["community"]
    additional = record["additionalHouseholdContext"]
    tenure = community["tenure"]
    components_sum = (
        tenure["ownerOccupied"]["count"]
        + tenure["renting"]["count"]
        + tenure["otherTenure"]["count"]
        + tenure["notStated"]["count"]
    )
    unpartnered = additional.get("unpartnered2554", {})
    lone_parent = additional.get("loneParentFamilies", {})

    checks = [
        community["totalPopulation"]["count"] > 0,
        tenure["denominator"] > 0,
    ]
    for measure in (unpartnered, lone_parent):
        count = measure.get("count")
        denominator = measure.get("denominator")
        checks.append(
            isinstance(count, int)
            and isinstance(denominator, int)
            and 0 <= count <= denominator
            and measure.get("percentage") == percentage(count, denominator)
        )

    return {
        "suburb": record["suburb"],
        "geographyCode": record["geographyCode"],
        "population": community["totalPopulation"]["count"],
        "medianAge": community["medianAge"]["value"],
        "medianHouseholdIncomeWeekly": community["medianHouseholdIncome"]["value"],
        "householdsWithChildrenPct": community["householdsWithChildren"]["percentage"],
        "ownerOccupiedPct": tenure["ownerOccupied"]["percentage"],
        "rentingPct": tenure["renting"]["percentage"],
        "overseasBornPct": community["overseasBornPopulation"]["percentage"],
        "cantonesePct": additional["cantoneseSpokenAtHome"]["percentage"],
        "mandarinPct": additional["mandarinSpokenAtHome"]["percentage"],
        "hongKongBornPct": additional["hongKongBornPopulation"]["percentage"],
        "chinaBornPct": additional["chinaBornPopulation"]["percentage"],
        "topBirthplacesCount": len(community["topOverseasCountriesOfBirth"]),
        "topLanguagesCount": len(community["topLanguagesSpokenAtHome"]),
        "topNonEnglishLanguagesCount": len(community["topNonEnglishLanguagesSpokenAtHome"]),
        "tenureDenominator": tenure["denominator"],
        "tenureComponentsSum": components_sum,
        "tenureRandomisationDifference": tenure["denominator"] - components_sum,
        "unpartnered2554Count": unpartnered.get("count"),
        "unpartnered2554Denominator": unpartnered.get("denominator"),
        "unpartnered2554Pct": unpartnered.get("percentage"),
        "loneParentFamiliesCount": lone_parent.get("count"),
        "loneParentFamiliesDenominator": lone_parent.get("denominator"),
        "loneParentFamiliesPct": lone_parent.get("percentage"),
        "status": "PASS" if all(checks) else "CHECK",
    }


def main() -> int:
    args = parse_args()
    source = args.dataset.read_text(encoding="utf-8")
    dataset = parse_dataset(source)

    # The dataset is rewritten by re-serialising the parsed JSON, so prove the
    # round trip is lossless before touching anything.
    prefix = "export const DWELLING_COMMUNITY_CONTEXT = "
    start = source.index(prefix) + len(prefix)
    end = source.index(" as const;", start)
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
        assert_layout(workbook, workbook_path.name)
        record["additionalHouseholdContext"].update(build_measures(workbook))

    dataset["generatedAt"] = args.generated_at
    dataset["version"] = "2021-gcp-sal-v3"
    dataset["usage"]["implementationRule"] = (
        "Do not connect this dataset to default ranking or filtering beyond the named "
        "derived measures. The exceptions are the off-by-default Chinese-language "
        "community personal lens (Cantonese and Mandarin language-at-home counts), the "
        "grouped other-language-communities lens (Filipino/Tagalog, Thai, "
        "Spanish/Portuguese and source-listed Vietnamese), and the Mingle criterion "
        "(unpartnered adults aged 25-54). One-parent-family counts are descriptive "
        "context only and never enter Mingle. Compatible counts are recombined over a "
        "common denominator; percentages are never averaged."
    )
    body = json.dumps(dataset, indent=2, ensure_ascii=False)
    args.out.write_text(source[:start] + body + source[end:], encoding="utf-8")

    rows = [qa_row(record) for record in dataset["records"]]
    with args.qa_out.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    failing = [row["suburb"] for row in rows if row["status"] != "PASS"]
    print(f"Backfilled {len(dataset['records'])} records; QA rows: {len(rows)}")
    print("QA status:", "all PASS" if not failing else f"CHECK: {', '.join(failing)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
