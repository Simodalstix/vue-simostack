#!/usr/bin/env python3
"""Append or replace one Vicmap locality in the vendored map asset.

The input is a WFS GeoJSON response fetched with the recipe documented in
src/assets/geo/README.md. Geometry is simplified to the same tolerance as the
existing asset and output remains compact for bundling.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from shapely.geometry import mapping, shape


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--asset", type=Path, required=True)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--name", required=True)
    parser.add_argument("--tolerance", type=float, default=0.0004)
    args = parser.parse_args()

    asset = json.loads(args.asset.read_text(encoding="utf-8"))
    source = json.loads(args.source.read_text(encoding="utf-8"))
    if len(source.get("features", [])) != 1:
        raise ValueError(f"Expected one source feature, found {len(source.get('features', []))}")

    geometry = shape(source["features"][0]["geometry"]).simplify(
        args.tolerance, preserve_topology=True
    )
    feature = {
        "type": "Feature",
        "properties": {"name": args.name},
        "geometry": mapping(geometry),
    }
    asset["features"] = [
        existing
        for existing in asset["features"]
        if existing.get("properties", {}).get("name") != args.name
    ]
    asset["features"].append(feature)
    args.asset.write_text(json.dumps(asset, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {args.name}; asset now has {len(asset['features'])} localities")


if __name__ == "__main__":
    main()
