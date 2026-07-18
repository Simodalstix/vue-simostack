#!/usr/bin/env python3
"""Integrate staged onboarding records and profiles into the current JS registries."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


REGIONS = {
    "middle-north-east": "Middle north-east",
    "inner-middle-north-east": "Inner",
    "middle-east": "East and south-east",
    "middle-south-east": "East and south-east",
    "middle-south": "South",
    "middle-west": "West",
}

CORRIDORS = {
    "Hurstbridge": "Hurstbridge line",
    "Belgrave-Lilydale": "Belgrave / Lilydale lines",
    "Glen-Waverley": "Glen Waverley line",
    "Alamein": "Alamein line",
    "Frankston": "Frankston line",
    "Werribee-Williamstown": "Werribee / Williamstown lines",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--records", type=Path, required=True)
    parser.add_argument("--profiles", type=Path, required=True)
    parser.add_argument("--area-corridors", type=Path, required=True)
    parser.add_argument("--suburb-profiles", type=Path, required=True)
    parser.add_argument("--skip-id", action="append", default=[])
    return parser.parse_args()


def js_entry(record: dict[str, Any]) -> str:
    rendered = json.dumps(record, indent=2, ensure_ascii=False)
    return "  " + rendered.replace("\n", "\n  ") + ","


def insert_before(source: str, marker: str, entries: list[str]) -> str:
    if marker not in source:
        raise ValueError(f"Could not locate marker: {marker!r}")
    return source.replace(marker, "\n" + "\n".join(entries) + marker, 1)


def adapt_record(record: dict[str, Any]) -> dict[str, Any]:
    adapted = json.loads(json.dumps(record))
    adapted["region"] = REGIONS[adapted["region"]]
    adapted["corridor"] = CORRIDORS[adapted["corridor"]]
    adapted["scores"].pop("envRisk", None)
    adapted["verifiedAt"] = None
    adapted["placeholder"] = True
    return adapted


def main() -> int:
    args = parse_args()
    records = json.loads(args.records.read_text(encoding="utf-8"))
    profiles = json.loads(args.profiles.read_text(encoding="utf-8"))
    skip = set(args.skip_id)
    selected = [record for record in records if record["id"] not in skip]

    area_source = args.area_corridors.read_text(encoding="utf-8")
    new_records = [record for record in selected if f"id: '{record['id']}'" not in area_source]
    if new_records:
        area_source = insert_before(
            area_source,
            "\n]\n\nexport const areaCorridors",
            [js_entry(adapt_record(record)) for record in new_records],
        )
        args.area_corridors.write_text(area_source, encoding="utf-8")

    profile_source = args.suburb_profiles.read_text(encoding="utf-8")
    new_profiles = [
        (record["id"], profiles[record["id"]])
        for record in selected
        if f"'{record['id']}':" not in profile_source
    ]
    if new_profiles:
        entries = []
        for area_id, profile in new_profiles:
            rendered = json.dumps(profile, indent=2, ensure_ascii=False)
            rendered = "  " + rendered.replace("\n", "\n  ")
            entries.append(f"  '{area_id}': {rendered.lstrip()},")
        profile_source = insert_before(
            profile_source,
            "\n  // 'Collingwood/Abbotsford' (shared)",
            entries,
        )
        args.suburb_profiles.write_text(profile_source, encoding="utf-8")

    print(f"Integrated {len(new_records)} records and {len(new_profiles)} profiles.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
