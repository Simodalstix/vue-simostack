#!/usr/bin/env python3
"""Build the small, context-only VPA open-space layer used by Settle."""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path

import geopandas as gpd
from shapely.geometry import box, mapping
from shapely.ops import unary_union


MAP_BOUNDS = (144.50, -38.12, 145.25, -37.45)
ANALYSIS_CRS = "EPSG:7855"


def load_pipeline():
    path = Path(__file__).with_name("build-dwelling-greenspace.py")
    spec = importlib.util.spec_from_file_location("dwelling_greenspace", path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--simplify-metres", type=float, default=80.0)
    parser.add_argument("--minimum-render-area-ha", type=float, default=0.75)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    pipeline = load_pipeline()
    bounds_wgs84 = gpd.GeoDataFrame(
        {"geometry": [box(*MAP_BOUNDS)]}, geometry="geometry", crs="EPSG:4326"
    )
    source, _ = pipeline.load_open_space(args.source, bounds_wgs84)
    eligible = pipeline.accessible_local_open_space(
        source, minimum_area_ha=0.05
    )
    # Pocket spaces below three quarters of a hectare remain in the analytical context
    # dataset but are imperceptible at this map's metropolitan scale.
    eligible = eligible[
        eligible["calculatedAreaHa"].ge(args.minimum_render_area_ha)
    ]

    clip_geometry = bounds_wgs84.to_crs(ANALYSIS_CRS).geometry.iloc[0]
    geometries = eligible.geometry.intersection(clip_geometry)
    geometries = geometries[~geometries.is_empty]
    merged = unary_union(geometries)
    simplified = merged.simplify(args.simplify_metres, preserve_topology=True)
    output_geometry = gpd.GeoSeries([simplified], crs=ANALYSIS_CRS).to_crs(
        "EPSG:4326"
    ).iloc[0]

    def compact_coordinates(value):
        if isinstance(value, float):
            return round(value, 4)
        if isinstance(value, (list, tuple)):
            return [compact_coordinates(item) for item in value]
        if isinstance(value, dict):
            return {key: compact_coordinates(item) for key, item in value.items()}
        return value

    payload = {
        "type": "FeatureCollection",
        "name": "Eligible VPA open space (context only)",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": compact_coordinates(mapping(output_geometry)),
            }
        ],
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(payload, separators=(",", ":")), encoding="utf-8"
    )
    print(
        f"Wrote {len(payload['features'])} features to {args.out} "
        f"({args.out.stat().st_size:,} bytes)"
    )


if __name__ == "__main__":
    main()
