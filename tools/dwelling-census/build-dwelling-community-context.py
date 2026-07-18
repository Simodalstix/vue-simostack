#!/usr/bin/env python3
"""Extend the checked-in ABS 2021 SAL community context from GCP workbooks."""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import re
from pathlib import Path
from typing import Any

import openpyxl


COUNTRY_ROWS = [row for row in range(12, 62) if row != 13]
LANGUAGE_ROWS = [
    15,
    16,
    17,
    19,
    20,
    23,
    24,
    25,
    26,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    50,
    51,
    52,
    55,
    56,
    57,
    58,
    59,
]
RELIGION_ROWS = [
    ("No religion / secular or other spiritual beliefs", 43),
    ("Christianity", 30),
    ("Buddhism", 9),
    ("Hinduism", 31),
    ("Islam", 32),
    ("Judaism", 33),
    ("Other religions", 38),
    ("Religious affiliation not stated", 44),
]
G06_PARTNER_POOL_ROWS = [(42, "25-34 years"), (43, "35-44 years"), (44, "45-54 years")]
G29_ONE_PARENT_ROW = 43
G29_TOTAL_ROW = 47


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Add missing SAL records to dwelling community context."
    )
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--targets", type=Path, required=True)
    parser.add_argument("--cache", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--retrieved-at", required=True)
    return parser.parse_args()


def parse_dataset(source: str) -> dict[str, Any]:
    prefix = "export const DWELLING_COMMUNITY_CONTEXT = "
    start = source.index(prefix) + len(prefix)
    end = source.rindex(" as const;")
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


def percentage(count: int, denominator: int) -> float | None:
    if denominator <= 0:
        return None
    return round(count / denominator * 100, 1)


def text(workbook: Any, sheet: str, coordinate: str) -> str:
    return str(workbook[sheet][coordinate].value or "").strip()


def partner_pool_measures(workbook: Any, workbook_name: str) -> dict[str, dict[str, Any]]:
    """Read the live partner-pool inputs while adding a new SAL record.

    The original importer predates partnerPool.js. Reading these measures here
    prevents a new record from inheriting the template suburb's counts before
    the full historical backfill can be rerun.
    """
    for row, expected in G06_PARTNER_POOL_ROWS:
        found = text(workbook, "G06", f"A{row}")
        if found != expected:
            raise ValueError(
                f"{workbook_name} G06!A{row}: expected {expected!r}, found {found!r}"
            )
    if text(workbook, "G06", "B38") != "PERSONS":
        raise ValueError(f"{workbook_name} G06!B38 is not the PERSONS block")
    if not text(workbook, "G29", "A4").startswith("G29 FAMILY COMPOSITION"):
        raise ValueError(f"{workbook_name} G29 is not the family composition table")
    if not text(workbook, "G29", "A29").startswith("One parent family"):
        raise ValueError(f"{workbook_name} G29!A29 is not the one-parent-family block")
    for row in (G29_ONE_PARENT_ROW, G29_TOTAL_ROW):
        if text(workbook, "G29", f"A{row}") != "Total":
            raise ValueError(f"{workbook_name} G29!A{row} is not a Total row")

    unpartnered = sum(number(workbook, "G06", f"D{row}") for row, _ in G06_PARTNER_POOL_ROWS)
    persons_25_54 = sum(number(workbook, "G06", f"E{row}") for row, _ in G06_PARTNER_POOL_ROWS)
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
                "numerator": [f"D{row}" for row, _ in G06_PARTNER_POOL_ROWS],
                "denominator": [f"E{row}" for row, _ in G06_PARTNER_POOL_ROWS],
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


def ranked_measure(
    *,
    name: str,
    count: int,
    denominator: int,
    source_table: str,
    source_cell: str,
) -> dict[str, Any]:
    return {
        "name": name,
        "count": count,
        "denominator": denominator,
        "percentage": percentage(count, denominator),
        "sourceTable": source_table,
        "sourceCell": source_cell,
        "basis": "Place of usual residence",
    }


def clean_country_name(value: Any) -> str:
    return re.sub(r"\([a-z]\)$", "", str(value)).strip()


def top_countries(workbook: Any, denominator: int) -> list[dict[str, Any]]:
    sheet = workbook["G09c"]
    candidates = []
    for row in COUNTRY_ROWS:
        count = number(workbook, "G09c", f"K{row}")
        if count <= 0:
            continue
        candidates.append((count, row, clean_country_name(sheet[f"A{row}"].value)))
    candidates.sort(key=lambda item: (-item[0], item[1]))
    return [
        ranked_measure(
            name=name,
            count=count,
            denominator=denominator,
            source_table="G09c",
            source_cell=f"K{row}",
        )
        for count, row, name in candidates[:5]
    ]


def top_languages(workbook: Any, denominator: int) -> list[dict[str, Any]]:
    sheet = workbook["G13c"]
    candidates = []
    for row in LANGUAGE_ROWS:
        count = number(workbook, "G13c", f"G{row}")
        if count <= 0:
            continue
        candidates.append((count, row, str(sheet[f"A{row}"].value).strip()))
    candidates.sort(key=lambda item: (-item[0], item[1]))
    return [
        ranked_measure(
            name=name,
            count=count,
            denominator=denominator,
            source_table="G13c",
            source_cell=f"G{row}",
        )
        for count, row, name in candidates[:5]
    ]


def religion_summary(workbook: Any, denominator: int) -> list[dict[str, Any]]:
    return [
        ranked_measure(
            name=name,
            count=number(workbook, "G14", f"D{row}"),
            denominator=denominator,
            source_table="G14",
            source_cell=f"D{row}",
        )
        for name, row in RELIGION_ROWS
    ]


def build_record(
    template: dict[str, Any],
    target: dict[str, Any],
    workbook_path: Path,
    retrieved_at: str,
) -> dict[str, Any]:
    suburb = target["suburb"]
    sal_code = str(target["salCode"])
    workbook = openpyxl.load_workbook(workbook_path, data_only=True, read_only=True)
    record = copy.deepcopy(template)

    record["suburb"] = suburb
    record["geographyCode"] = f"SAL{sal_code}"
    record["retrievedAt"] = retrieved_at
    metadata = record["sourceMetadata"]
    metadata.update(
        {
            "profileUrl": (
                "https://www.abs.gov.au/census/find-census-data/"
                f"community-profiles/2021/SAL{sal_code}"
            ),
            "downloadUrl": (
                "https://www.abs.gov.au/census/find-census-data/"
                f"community-profiles/2021/SAL{sal_code}/download/"
                f"GCP_SAL{sal_code}.xlsx"
            ),
            "sourceWorkbook": workbook_path.name,
            "sourceWorkbookSha256": sha256_file(workbook_path),
        }
    )

    community = record["community"]
    total_population = number(workbook, "G01", "D17")
    community["totalPopulation"]["count"] = total_population
    community["medianAge"]["value"] = number(workbook, "G02", "B13")

    children = community["householdsWithChildren"]
    couple_children = number(workbook, "G42", "C36")
    one_parent = number(workbook, "G42", "D36")
    occupied_households = number(workbook, "G42", "I36")
    children.update(
        {
            "count": couple_children + one_parent,
            "denominator": occupied_households,
            "percentage": percentage(couple_children + one_parent, occupied_households),
        }
    )
    children["components"].update(
        {
            "coupleFamilyWithChildren": couple_children,
            "oneParentFamily": one_parent,
        }
    )
    community["medianHouseholdIncome"]["value"] = number(workbook, "G02", "B19")

    tenure = community["tenure"]
    tenure_denominator = number(workbook, "G37", "G31")
    owned_outright = number(workbook, "G37", "G14")
    owned_mortgage = number(workbook, "G37", "G16")
    renting = number(workbook, "G37", "G25")
    other = number(workbook, "G37", "G27")
    not_stated = number(workbook, "G37", "G29")
    tenure["denominator"] = tenure_denominator
    tenure["ownerOccupied"].update(
        {
            "count": owned_outright + owned_mortgage,
            "percentage": percentage(owned_outright + owned_mortgage, tenure_denominator),
        }
    )
    tenure["ownerOccupied"]["components"].update(
        {"ownedOutright": owned_outright, "ownedWithMortgage": owned_mortgage}
    )
    for key, count in (("renting", renting), ("otherTenure", other), ("notStated", not_stated)):
        tenure[key].update(
            {"count": count, "percentage": percentage(count, tenure_denominator)}
        )

    overseas = number(workbook, "G01", "D44")
    community["overseasBornPopulation"].update(
        {
            "count": overseas,
            "denominator": total_population,
            "percentage": percentage(overseas, total_population),
        }
    )

    country_denominator = number(workbook, "G09c", "K65")
    language_denominator = number(workbook, "G13c", "G65")
    non_english = top_languages(workbook, language_denominator)
    english_only = ranked_measure(
        name="English only",
        count=number(workbook, "G13c", "G12"),
        denominator=language_denominator,
        source_table="G13c",
        source_cell="G12",
    )
    community["topOverseasCountriesOfBirth"] = top_countries(
        workbook, country_denominator
    )
    community["topNonEnglishLanguagesSpokenAtHome"] = non_english
    community["topLanguagesSpokenAtHome"] = [english_only, *non_english[:4]]
    community["religiousAffiliationSummary"] = religion_summary(
        workbook, number(workbook, "G14", "D46")
    )

    additional = record["additionalHouseholdContext"]
    for key, sheet, cell, denominator_cell in (
        ("cantoneseSpokenAtHome", "G13c", "G19", "G65"),
        ("mandarinSpokenAtHome", "G13c", "G20", "G65"),
        ("hongKongBornPopulation", "G09c", "K28", "K65"),
        ("chinaBornPopulation", "G09c", "K20", "K65"),
    ):
        count = number(workbook, sheet, cell)
        denominator = number(workbook, sheet, denominator_cell)
        additional[key].update(
            {
                "count": count,
                "denominator": denominator,
                "percentage": percentage(count, denominator),
            }
        )
    additional.update(partner_pool_measures(workbook, workbook_path.name))
    return record


def indent_record(record: dict[str, Any]) -> str:
    return "\n".join(f"    {line}" for line in json.dumps(record, indent=2).splitlines())


def main() -> int:
    args = parse_args()
    source = args.dataset.read_text(encoding="utf-8")
    dataset = parse_dataset(source)
    targets = json.loads(args.targets.read_text(encoding="utf-8"))["records"]
    existing = {record["suburb"] for record in dataset["records"]}
    components = {
        component["suburb"]: component
        for target in targets
        for component in target["salComponents"]
    }
    missing = [components[name] for name in sorted(components) if name not in existing]
    if not missing:
        args.out.write_text(source, encoding="utf-8")
        print("No missing SAL community records.")
        return 0

    template = dataset["records"][0]
    records = []
    for target in missing:
        workbook = args.cache / f"GCP_SAL{target['salCode']}.xlsx"
        if not workbook.exists():
            raise FileNotFoundError(f"Missing official ABS workbook: {workbook}")
        records.append(build_record(template, target, workbook, args.retrieved_at))

    new_count = len(dataset["records"]) + len(records)
    source = source.replace(
        f'"generatedAt": "{dataset["generatedAt"]}"',
        f'"generatedAt": "{args.retrieved_at}"',
        1,
    )
    source = source.replace(
        f'"recordCount": {dataset["coverage"]["recordCount"]}',
        f'"recordCount": {new_count}',
        1,
    )
    marker = "\n  ]\n} as const;"
    if marker not in source:
        raise ValueError("Could not locate the dataset records terminator.")
    insertion = ",\n" + ",\n".join(indent_record(record) for record in records)
    source = source.replace(marker, f"{insertion}{marker}", 1)
    args.out.write_text(source, encoding="utf-8")
    print(f"Added {len(records)} SAL records; dataset now contains {new_count} records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
