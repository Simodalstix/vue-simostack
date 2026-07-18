#!/usr/bin/env python3
"""Regenerate community-context QA from the checked-in generated dataset."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    return parser.parse_args()


def parse_dataset(source: str) -> dict:
    prefix = "export const DWELLING_COMMUNITY_CONTEXT = "
    start = source.index(prefix) + len(prefix)
    end = source.rindex(" as const;")
    return json.loads(source[start:end])


def percentage(count: int, denominator: int) -> float | None:
    return None if denominator <= 0 else round(count / denominator * 100, 1)


def qa_row(record: dict) -> dict:
    community = record["community"]
    additional = record["additionalHouseholdContext"]
    tenure = community["tenure"]
    components_sum = sum(
        tenure[key]["count"]
        for key in ("ownerOccupied", "renting", "otherTenure", "notStated")
    )
    unpartnered = additional["unpartnered2554"]
    lone_parent = additional["loneParentFamilies"]
    language_measures = [
        additional[key]
        for key in ("filipinoSpokenAtHome", "tagalogSpokenAtHome", "thaiSpokenAtHome")
    ]
    checks = [
        community["totalPopulation"]["count"] > 0,
        tenure["denominator"] > 0,
        *(
            0 <= measure["count"] <= measure["denominator"]
            and measure["percentage"] == percentage(measure["count"], measure["denominator"])
            for measure in language_measures
        ),
        0 <= unpartnered["count"] <= unpartnered["denominator"],
        unpartnered["percentage"]
        == percentage(unpartnered["count"], unpartnered["denominator"]),
        0 <= lone_parent["count"] <= lone_parent["denominator"],
        lone_parent["percentage"]
        == percentage(lone_parent["count"], lone_parent["denominator"]),
    ]
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
        "filipinoPct": additional["filipinoSpokenAtHome"]["percentage"],
        "tagalogPct": additional["tagalogSpokenAtHome"]["percentage"],
        "thaiPct": additional["thaiSpokenAtHome"]["percentage"],
        "topBirthplacesCount": len(community["topOverseasCountriesOfBirth"]),
        "topLanguagesCount": len(community["topLanguagesSpokenAtHome"]),
        "topNonEnglishLanguagesCount": len(
            community["topNonEnglishLanguagesSpokenAtHome"]
        ),
        "tenureDenominator": tenure["denominator"],
        "tenureComponentsSum": components_sum,
        "tenureRandomisationDifference": tenure["denominator"] - components_sum,
        "unpartnered2554Count": unpartnered["count"],
        "unpartnered2554Denominator": unpartnered["denominator"],
        "unpartnered2554Pct": unpartnered["percentage"],
        "loneParentFamiliesCount": lone_parent["count"],
        "loneParentFamiliesDenominator": lone_parent["denominator"],
        "loneParentFamiliesPct": lone_parent["percentage"],
        "status": "PASS" if all(checks) else "CHECK",
    }


def main() -> int:
    args = parse_args()
    dataset = parse_dataset(args.dataset.read_text(encoding="utf-8"))
    rows = sorted((qa_row(record) for record in dataset["records"]), key=lambda row: row["suburb"])
    with args.out.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    failed = [row["suburb"] for row in rows if row["status"] != "PASS"]
    if failed:
        raise ValueError(f"Community QA failed for: {failed}")
    print(f"Wrote {len(rows)} PASS rows.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
