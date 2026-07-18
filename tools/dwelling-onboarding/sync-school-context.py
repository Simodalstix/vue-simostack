#!/usr/bin/env python3
"""Copy generated zoned/catchment school names into staged area records."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--areas", type=Path, required=True)
    parser.add_argument("--context", type=Path, required=True)
    parser.add_argument("--area-id", action="append", required=True)
    return parser.parse_args()


def js_array(values: list[str], indent: int = 6) -> str:
    rendered = json.dumps(values, indent=2, ensure_ascii=False)
    padding = " " * indent
    return rendered.replace("\n", "\n" + padding)


def main() -> int:
    args = parse_args()
    context_source = args.context.read_text(encoding="utf-8")
    prefix = "export const schoolContextByAreaId = "
    context = json.loads(context_source[context_source.index(prefix) + len(prefix) :])
    source = args.areas.read_text(encoding="utf-8")

    for area_id in args.area_id:
        start = source.index(f"    id: '{area_id}',")
        end = source.index("\n  },", start) + len("\n  },")
        block = source[start:end]
        school = context[area_id]
        primary = [school["zonedPrimary"], *school["alsoInCatchmentPrimary"]]
        secondary = [school["zonedSecondary"], *school["alsoInCatchmentSecondary"]]
        primary = [name for name in primary if name]
        secondary = [name for name in secondary if name]

        block = block.replace("publicPrimary: [],", f"publicPrimary: {js_array(primary)},")
        block = block.replace("publicSecondary: [],", f"publicSecondary: {js_array(secondary)},")
        old_note = (
            "note: 'Populate school arrays and strength only after the 2027 zone polygons "
            "are intersected with the 800 m catchment and official school records are resolved.',"
        )
        boundary = (
            " The station anchor is close to a zone boundary; verify the exact address."
            if school["boundaryFlag"]
            else " Verify the exact address before relying on enrolment eligibility."
        )
        note = (
            f"At the station anchor, the 2027 zones are {school['zonedPrimary']} and "
            f"{school['zonedSecondary']}. Other listed schools have zones intersecting "
            f"part of the 800 m catchment.{boundary}"
        )
        block = block.replace(old_note, f"note: {json.dumps(note, ensure_ascii=False)},")
        source = source[:start] + block + source[end:]

    args.areas.write_text(source, encoding="utf-8")
    print(f"Synced school context for {len(args.area_id)} areas.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
