#!/usr/bin/env python3
"""
Build population-weighted greenspace access scores for Settle suburb records.

Version-one method
------------------
1. Use ABS 2021 Suburbs and Localities (SAL) boundaries.
2. Use ABS 2021 residential Mesh Blocks with usual-resident population as
   population-weighted residential sampling points.
3. Use the VPA metropolitan Open Space polygons as the comprehensive base layer.
4. Optionally merge a current PARKRES layer into major-park and nature-corridor
   calculations.
5. Calculate:
     localOpenSpaceAccess (50%)
     majorParkAccess      (30%)
     natureCorridorAccess (20%)
6. Store each component, the final 0-10 score and QA diagnostics.

Distances are straight-line distances in GDA2020 / MGA zone 55 (EPSG:7855).
They are not walking-network distances. This limitation is explicit in output metadata.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import shutil
import sys
import time
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable, Sequence

import geopandas as gpd
import numpy as np
import pandas as pd
import requests
from shapely.geometry import GeometryCollection
from shapely.ops import unary_union

try:
    import pyogrio
except ImportError as exc:  # pragma: no cover - clear runtime guidance
    raise SystemExit(
        "pyogrio is required. Install dependencies from requirements-greenspace.txt"
    ) from exc


METHOD_VERSION = "greenspace-access-v1"
RETRIEVED_AT = "2026-07-19"
ANALYSIS_CRS = "EPSG:7855"  # GDA2020 / MGA zone 55
WGS84_CRS = "EPSG:4326"

SOURCE_URLS = {
    "vpaOpenSpaceGeoJson": (
        "https://opendata.arcgis.com/datasets/"
        "da1c06e3ab6948fcb56de4bb3c722449_0.geojson"
    ),
    "absSalShapefileZip": (
        "https://www.abs.gov.au/statistics/standards/"
        "australian-statistical-geography-standard-asgs/"
        "edition-3-july-2021-june-2026/access-and-downloads/"
        "digital-boundary-files/SAL_2021_AUST_GDA2020_SHP.zip"
    ),
    "absMeshBlockShapefileZip": (
        "https://www.abs.gov.au/statistics/standards/"
        "australian-statistical-geography-standard-asgs/"
        "edition-3-july-2021-june-2026/access-and-downloads/"
        "digital-boundary-files/MB_2021_AUST_SHP_GDA2020.zip"
    ),
    "absMeshBlockFeatureService": (
        "https://geo.abs.gov.au/arcgis/rest/services/"
        "ASGS2021/MB/MapServer/0"
    ),
    "absMeshBlockCountsXlsx": (
        "https://www.abs.gov.au/census/guide-census-data/"
        "mesh-block-counts/2021/Mesh%20Block%20Counts%2C%202021.xlsx"
    ),
    "vpaOpenSpaceMetadata": (
        "https://discover.data.vic.gov.au/dataset/open-space"
    ),
    "parkresMetadata": (
        "https://discover.data.vic.gov.au/dataset/"
        "parks-and-conservation-reserves-parkres"
    ),
    "absBoundaryMetadata": (
        "https://www.abs.gov.au/statistics/standards/"
        "australian-statistical-geography-standard-asgs/"
        "edition-3-july-2021-june-2026/access-and-downloads/"
        "digital-boundary-files"
    ),
    "absMeshCountMetadata": (
        "https://www.abs.gov.au/census/guide-census-data/"
        "mesh-block-counts/latest-release"
    ),
}

DEFAULT_CONFIG = {
    "componentWeights": {
        "localOpenSpaceAccess": 0.50,
        "majorParkAccess": 0.30,
        "natureCorridorAccess": 0.20,
    },
    "localAccessDistanceM": 400.0,
    "localCoverageTargetPct": 95.0,
    "minimumLocalFeatureAreaHa": 0.05,
    "majorParkMinimumAreaHa": 5.0,
    "distanceScoreKnots": [
        {"distanceM": 0.0, "score": 10.0},
        {"distanceM": 400.0, "score": 10.0},
        {"distanceM": 800.0, "score": 8.0},
        {"distanceM": 1200.0, "score": 6.0},
        {"distanceM": 1600.0, "score": 4.0},
        {"distanceM": 2400.0, "score": 0.0},
    ],
    "review": {
        "minimumResidentialSamples": 10,
        "minimumResidentialPopulationCoveragePct": 80.0,
        "highComponentSpread": 5.0,
        "topNearbyFeatureCount": 5,
        "nearbyFeatureSearchDistanceM": 1200.0,
    },
}

NATURE_PATTERN = re.compile(
    r"waterway|river|creek|canal|wetland|lake|lagoon|foreshore|coast|"
    r"beach|conservation|bushland|natural|recreation corridor|linear park|"
    r"shared trail|bay trail|river trail|creek trail",
    re.IGNORECASE,
)

NO_DATA_VALUES = {
    "",
    "no data",
    "not applicable",
    "n/a",
    "none",
    "null",
    "unknown",
    "no",
    "false",
    "0",
}

LOCAL_INCLUDED_CATEGORIES = {
    "parks and gardens",
    "sportsfields and organised recreation",
    "recreation corridor",
    "natural and semi-natural open space",
    "conservation reserves",
}

LOCAL_EXCLUDED_SUBCATEGORIES = {
    "golf course",
    "race course",
    "median park",
    "green buffer",
    "outdoor shopping centre forecourts",
}

PARKRES_EXCLUDED_TYPES = re.compile(
    r"port & coastal facility|marine sanctuary|education area|^other$|proposed",
    re.IGNORECASE,
)

PARKRES_MAJOR_OR_NATURE_TYPES = re.compile(
    r"metropolitan park|regional park|state park|national park|coastal reserve|"
    r"reservoir park|historic reserve|other park|nature conservation reserve|"
    r"natural features reserve",
    re.IGNORECASE,
)


def normalise_sal_code(value: Any) -> str:
    text = str(value).strip()
    if text.upper().startswith("SAL"):
        text = text[3:]
    return text


@dataclass(frozen=True)
class SourcePaths:
    sal_zip: Path
    mb_zip: Path
    mb_counts: Path
    open_space: Path
    sal_dir: Path
    mb_dir: Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build Settle greenspace context data."
    )
    parser.add_argument(
        "--targets",
        type=Path,
        default=Path("dwelling-greenspace-targets.json"),
        help="Target suburb/SAL mapping JSON.",
    )
    parser.add_argument(
        "--cache",
        type=Path,
        default=Path(".cache/dwelling-greenspace"),
        help="Source download and extraction directory.",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path("generated/dwelling-greenspace"),
        help="Output directory.",
    )
    parser.add_argument(
        "--config",
        type=Path,
        help="Optional JSON file overriding DEFAULT_CONFIG.",
    )
    parser.add_argument(
        "--parkres",
        type=Path,
        help=(
            "Optional current PARKRES spatial file (SHP/GPKG/GeoJSON). "
            "Used only to supplement major-park and nature-corridor layers."
        ),
    )
    parser.add_argument(
        "--mesh-blocks",
        type=Path,
        help=(
            "Optional official ABS Mesh Block SHP/GPKG/GeoJSON subset. "
            "Use this instead of downloading the national Mesh Block ZIP."
        ),
    )
    parser.add_argument(
        "--target-id",
        action="append",
        help="Calculate one target id; repeat to build an incremental batch.",
    )
    parser.add_argument(
        "--no-download",
        action="store_true",
        help="Require all source files to already exist in --cache.",
    )
    parser.add_argument(
        "--inspect-only",
        action="store_true",
        help="Inspect source fields/categories without calculating scores.",
    )
    parser.add_argument(
        "--force-download",
        action="store_true",
        help="Re-download source files even when cached.",
    )
    return parser.parse_args()


def deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    merged = dict(base)
    for key, value in override.items():
        if (
            key in merged
            and isinstance(merged[key], dict)
            and isinstance(value, dict)
        ):
            merged[key] = deep_merge(merged[key], value)
        else:
            merged[key] = value
    return merged


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def download(
    url: str,
    destination: Path,
    *,
    force: bool = False,
    attempts: int = 4,
) -> None:
    if destination.exists() and destination.stat().st_size > 0 and not force:
        return

    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = destination.with_suffix(destination.suffix + ".part")
    headers = {
        "User-Agent": (
            "Mozilla/5.0 dwelling-greenspace-pipeline/1.0 "
            "(source-attributed research build)"
        )
    }

    last_error: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            with requests.get(
                url,
                stream=True,
                timeout=(30, 300),
                headers=headers,
                allow_redirects=True,
            ) as response:
                response.raise_for_status()
                with temporary.open("wb") as handle:
                    for chunk in response.iter_content(chunk_size=1024 * 1024):
                        if chunk:
                            handle.write(chunk)
            temporary.replace(destination)
            return
        except Exception as exc:  # pragma: no cover - network-dependent
            last_error = exc
            temporary.unlink(missing_ok=True)
            if attempt < attempts:
                time.sleep(2**attempt)

    raise RuntimeError(f"Failed to download {url}: {last_error}")


def extract_zip(zip_path: Path, destination: Path) -> None:
    marker = destination / ".extracted"
    if marker.exists():
        return
    destination.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as archive:
        archive.extractall(destination)
    marker.write_text(zip_path.name + "\n", encoding="utf-8")


def locate_file(directory: Path, pattern: str) -> Path:
    matches = sorted(directory.rglob(pattern))
    if not matches:
        raise FileNotFoundError(f"No file matching {pattern!r} in {directory}")
    return matches[0]


def resolve_field(
    fields: Iterable[str],
    candidates: Sequence[str],
    *,
    required: bool = True,
) -> str | None:
    lookup = {field.casefold(): field for field in fields}
    for candidate in candidates:
        match = lookup.get(candidate.casefold())
        if match:
            return match
    if required:
        raise KeyError(
            f"Could not resolve any of {list(candidates)} from fields "
            f"{sorted(fields)}"
        )
    return None


def ensure_sources(
    cache: Path,
    *,
    no_download: bool,
    force_download: bool,
    mesh_blocks: Path | None,
) -> SourcePaths:
    cache.mkdir(parents=True, exist_ok=True)

    sal_zip = cache / "SAL_2021_AUST_GDA2020_SHP.zip"
    mb_zip = mesh_blocks or cache / "MB_2021_AUST_SHP_GDA2020.zip"
    mb_counts = cache / "Mesh_Block_Counts_2021.xlsx"
    open_space = cache / "VPA_Open_Space.geojson"
    sal_dir = cache / "SAL_2021_AUST_GDA2020_SHP"
    mb_dir = cache / "MB_2021_AUST_SHP_GDA2020"

    required_downloads = [
        (SOURCE_URLS["absSalShapefileZip"], sal_zip),
        (SOURCE_URLS["absMeshBlockCountsXlsx"], mb_counts),
        (SOURCE_URLS["vpaOpenSpaceGeoJson"], open_space),
    ]
    if mesh_blocks is None:
        required_downloads.insert(
            1,
            (SOURCE_URLS["absMeshBlockShapefileZip"], mb_zip),
        )
    elif not mesh_blocks.exists():
        raise FileNotFoundError(f"Mesh Block subset does not exist: {mesh_blocks}")

    if no_download:
        missing = [str(path) for _, path in required_downloads if not path.exists()]
        if missing:
            raise FileNotFoundError(
                "--no-download was used but source files are missing:\n- "
                + "\n- ".join(missing)
            )
    else:
        for url, path in required_downloads:
            print(f"Source: {path.name}", file=sys.stderr)
            download(url, path, force=force_download)

    extract_zip(sal_zip, sal_dir)
    if mesh_blocks is None:
        extract_zip(mb_zip, mb_dir)
    else:
        mb_dir = mesh_blocks
    return SourcePaths(
        sal_zip=sal_zip,
        mb_zip=mb_zip,
        mb_counts=mb_counts,
        open_space=open_space,
        sal_dir=sal_dir,
        mb_dir=mb_dir,
    )


def load_targets(path: Path) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    records = payload.get("records")
    if not isinstance(records, list) or not records:
        raise ValueError("Targets JSON must contain a non-empty records array.")

    seen_ids: set[str] = set()
    seen_codes: set[str] = set()
    for record in records:
        if record["id"] in seen_ids:
            raise ValueError(f"Duplicate target id: {record['id']}")
        seen_ids.add(record["id"])
        for component in record["salComponents"]:
            code = normalise_sal_code(component["salCode"])
            component["salCode"] = code
            if code in seen_codes:
                raise ValueError(
                    f"SAL {code} occurs in more than one active target. "
                    "Resolve duplicate lens coverage before scoring."
                )
            seen_codes.add(code)
    return payload, records


def load_sal_boundaries(
    sal_dir: Path,
    target_codes: set[str],
) -> gpd.GeoDataFrame:
    sal_path = locate_file(sal_dir, "*.shp")
    info = pyogrio.read_info(sal_path)
    code_field = resolve_field(
        info["fields"],
        ["SAL_CODE21", "SAL_CODE_2021", "SAL_CODE"],
    )
    name_field = resolve_field(
        info["fields"],
        ["SAL_NAME21", "SAL_NAME_2021", "SAL_NAME"],
        required=False,
    )

    columns = [code_field]
    if name_field:
        columns.append(name_field)

    sal = gpd.read_file(sal_path, columns=columns, engine="pyogrio")
    sal[code_field] = sal[code_field].map(normalise_sal_code)
    sal = sal[sal[code_field].isin(target_codes)].copy()
    if len(sal) != len(target_codes):
        found = set(sal[code_field])
        raise ValueError(
            f"Missing target SAL boundaries: {sorted(target_codes - found)}"
        )

    rename = {code_field: "salCode"}
    if name_field:
        rename[name_field] = "salName"
    sal = sal.rename(columns=rename)
    return sal.to_crs(ANALYSIS_CRS)


def load_victorian_mesh_counts(path: Path) -> pd.DataFrame:
    frames: list[pd.DataFrame] = []
    for sheet in ("Table 2", "Table 2.1"):
        frame = pd.read_excel(
            path,
            sheet_name=sheet,
            skiprows=6,
            usecols="A:F",
            dtype={"MB_CODE_2021": "string"},
        )
        frame = frame.dropna(subset=["MB_CODE_2021"])
        frames.append(frame)

    counts = pd.concat(frames, ignore_index=True)
    counts["MB_CODE_2021"] = (
        counts["MB_CODE_2021"].astype("string").str.replace(r"\.0$", "", regex=True)
    )
    counts["Person"] = pd.to_numeric(counts["Person"], errors="coerce").fillna(0)
    counts["Dwelling"] = pd.to_numeric(
        counts["Dwelling"], errors="coerce"
    ).fillna(0)

    # Population-weighted residential sampling points.
    counts = counts[
        counts["MB_CATEGORY_NAME_2021"].astype(str).str.casefold().eq("residential")
        & counts["Person"].gt(0)
    ].copy()
    return counts[
        [
            "MB_CODE_2021",
            "MB_CATEGORY_NAME_2021",
            "Dwelling",
            "Person",
        ]
    ]


def load_residential_samples(
    mb_dir: Path,
    sal: gpd.GeoDataFrame,
    counts: pd.DataFrame,
) -> gpd.GeoDataFrame:
    mb_path = mb_dir if mb_dir.is_file() else locate_file(mb_dir, "*.shp")
    info = pyogrio.read_info(mb_path)
    code_field = resolve_field(
        info["fields"],
        ["MB_CODE21", "MB_CODE_2021", "MB_CODE"],
    )

    # Read only the Melbourne target envelope, rather than every Australian MB.
    source_crs = info.get("crs")
    sal_for_bbox = sal.to_crs(source_crs) if source_crs else sal.to_crs(WGS84_CRS)
    minx, miny, maxx, maxy = sal_for_bbox.total_bounds
    # Margin catches polygons whose representative point is near a SAL boundary.
    margin = 0.02
    bbox = (minx - margin, miny - margin, maxx + margin, maxy + margin)

    mb = gpd.read_file(
        mb_path,
        bbox=bbox,
        columns=[code_field],
        engine="pyogrio",
    )
    mb = mb.rename(columns={code_field: "mbCode"})
    mb["mbCode"] = mb["mbCode"].astype(str)

    residential_codes = set(counts["MB_CODE_2021"].astype(str))
    mb = mb[mb["mbCode"].isin(residential_codes)].copy()
    mb = mb.to_crs(ANALYSIS_CRS)
    mb["geometry"] = mb.geometry.representative_point()

    samples = gpd.sjoin(
        mb,
        sal[["salCode", "geometry"]],
        how="inner",
        predicate="within",
    ).drop(columns=["index_right"])

    samples = samples.merge(
        counts.rename(columns={"MB_CODE_2021": "mbCode"}),
        on="mbCode",
        how="inner",
        validate="one_to_one",
    )
    samples["populationWeight"] = samples["Person"].astype(float)
    return samples


def normalise_text(series: pd.Series) -> pd.Series:
    return series.fillna("").astype(str).str.strip().str.casefold()


def load_open_space(
    path: Path,
    sal: gpd.GeoDataFrame,
) -> tuple[gpd.GeoDataFrame, dict[str, Any]]:
    # Bounding in source CRS materially reduces memory use.
    info = pyogrio.read_info(path)
    source_crs = info.get("crs")
    sal_for_bbox = sal.to_crs(source_crs) if source_crs else sal.to_crs(WGS84_CRS)
    bbox = tuple(sal_for_bbox.total_bounds)
    open_space = gpd.read_file(
        path,
        bbox=bbox,
        engine="pyogrio",
    )

    fields = list(open_space.columns)
    mapping = {
        "lga": resolve_field(
            fields,
            ["LGA", "LGA_NAME", "LOCAL_GOVERNMENT_AREA"],
            required=False,
        ),
        "category": resolve_field(
            fields,
            ["OS_CATEGOR", "OS_CATEGORY", "CATEGORY"],
        ),
        "subcategory": resolve_field(
            fields,
            ["OS_CATEG_2", "OS_CATEGORY_2", "SUBCATEGORY"],
            required=False,
        ),
        "status": resolve_field(
            fields,
            ["OS_STATUS", "STATUS"],
            required=False,
        ),
        "access": resolve_field(
            fields,
            ["OS_ACCESS", "ACCESS"],
            required=False,
        ),
        "type": resolve_field(
            fields,
            ["OS_TYPE", "TYPE"],
            required=False,
        ),
        "name": resolve_field(
            fields,
            ["PARK_NAME", "NAME"],
            required=False,
        ),
        "water": resolve_field(
            fields,
            ["WATER_BODY", "WATERBODY"],
            required=False,
        ),
        "coastal": resolve_field(
            fields,
            ["COASTAL"],
            required=False,
        ),
        "areaHa": resolve_field(
            fields,
            ["HA", "AREA_HA"],
            required=False,
        ),
    }

    rename = {
        source: target
        for target, source in mapping.items()
        if source is not None
    }
    open_space = open_space.rename(columns=rename).to_crs(ANALYSIS_CRS)
    open_space = open_space[
        open_space.geometry.notna() & ~open_space.geometry.is_empty
    ].copy()

    # Calculate area from geometry rather than trusting the source field.
    open_space["calculatedAreaHa"] = open_space.geometry.area / 10_000.0

    for field in (
        "lga",
        "category",
        "subcategory",
        "status",
        "access",
        "type",
        "name",
        "water",
        "coastal",
    ):
        if field not in open_space:
            open_space[field] = ""

    inspection = {
        "featureCountInTargetEnvelope": int(len(open_space)),
        "fields": sorted(fields),
        "categoryCounts": (
            open_space["category"]
            .fillna("NO DATA")
            .astype(str)
            .value_counts(dropna=False)
            .to_dict()
        ),
        "subcategoryCounts": (
            open_space["subcategory"]
            .fillna("NO DATA")
            .astype(str)
            .value_counts(dropna=False)
            .to_dict()
        ),
        "accessCounts": (
            open_space["access"]
            .fillna("NO DATA")
            .astype(str)
            .value_counts(dropna=False)
            .to_dict()
        ),
        "typeCounts": (
            open_space["type"]
            .fillna("NO DATA")
            .astype(str)
            .value_counts(dropna=False)
            .to_dict()
        ),
    }
    return open_space, inspection


def accessible_local_open_space(
    source: gpd.GeoDataFrame,
    *,
    minimum_area_ha: float,
) -> gpd.GeoDataFrame:
    category = normalise_text(source["category"])
    subcategory = normalise_text(source["subcategory"])
    status = normalise_text(source["status"])
    access = normalise_text(source["access"])
    os_type = normalise_text(source["type"])
    water = normalise_text(source["water"])
    coastal = normalise_text(source["coastal"])

    existing = status.eq("existing") | status.eq("")
    open_access = access.eq("open")
    public_open_space = os_type.eq("public open space")
    usable_category = category.isin(LOCAL_INCLUDED_CATEGORIES)
    excluded_subcategory = subcategory.isin(LOCAL_EXCLUDED_SUBCATEGORIES)
    water_only = water.map(lambda value: value not in NO_DATA_VALUES) & coastal.map(
        lambda value: value in NO_DATA_VALUES
    )
    sufficient_area = source["calculatedAreaHa"].ge(minimum_area_ha)

    return source[
        existing
        & open_access
        & public_open_space
        & usable_category
        & ~excluded_subcategory
        & ~water_only
        & sufficient_area
    ].copy()


def nature_open_space(source: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    combined = (
        source["category"].fillna("").astype(str)
        + " "
        + source["subcategory"].fillna("").astype(str)
        + " "
        + source["name"].fillna("").astype(str)
        + " "
        + source["water"].fillna("").astype(str)
    )
    coastal = normalise_text(source["coastal"]).map(
        lambda value: value not in NO_DATA_VALUES
    )
    nature = combined.str.contains(NATURE_PATTERN, na=False) | coastal
    return source[nature].copy()


def dissolve_contiguous(
    source: gpd.GeoDataFrame,
    *,
    bridge_m: float = 2.0,
) -> gpd.GeoDataFrame:
    if source.empty:
        return gpd.GeoDataFrame(
            {"geometry": []},
            geometry="geometry",
            crs=source.crs,
        )

    # Tiny buffer/unbuffer joins parcel slivers belonging to one park while
    # avoiding broad merging across roads.
    merged = unary_union(source.geometry.buffer(bridge_m)).buffer(-bridge_m)
    if merged.is_empty:
        return gpd.GeoDataFrame(
            {"geometry": []},
            geometry="geometry",
            crs=source.crs,
        )

    geometries = (
        list(merged.geoms)
        if hasattr(merged, "geoms")
        else [merged]
    )
    result = gpd.GeoDataFrame(
        {"geometry": geometries},
        geometry="geometry",
        crs=source.crs,
    )
    result["calculatedAreaHa"] = result.geometry.area / 10_000.0
    return result


def build_major_features(
    source: gpd.GeoDataFrame,
    *,
    minimum_area_ha: float,
) -> gpd.GeoDataFrame:
    """Dissolve named park parcels, retain unnamed polygons individually."""
    if source.empty:
        return gpd.GeoDataFrame(
            {"geometry": [], "calculatedAreaHa": []},
            geometry="geometry",
            crs=source.crs,
        )

    working = source.copy()
    names = normalise_text(working["name"])
    lgas = normalise_text(working["lga"])
    valid_name = ~names.isin(NO_DATA_VALUES) & ~names.str.contains(
        r"^unnamed|^no name",
        regex=True,
    )

    named = working[valid_name].copy()
    if not named.empty:
        named["_majorName"] = names[valid_name]
        named["_majorLga"] = lgas[valid_name]
        named = named.dissolve(
            by=["_majorLga", "_majorName"],
            as_index=False,
        )
        named["calculatedAreaHa"] = named.geometry.area / 10_000.0
        named = named[["geometry", "calculatedAreaHa"]]
    else:
        named = gpd.GeoDataFrame(
            {"geometry": [], "calculatedAreaHa": []},
            geometry="geometry",
            crs=source.crs,
        )

    unnamed = working[~valid_name][["geometry"]].copy()
    unnamed["calculatedAreaHa"] = unnamed.geometry.area / 10_000.0

    combined = gpd.GeoDataFrame(
        pd.concat([named, unnamed], ignore_index=True),
        geometry="geometry",
        crs=source.crs,
    )
    return combined[
        combined["calculatedAreaHa"].ge(minimum_area_ha)
    ].copy()


def load_optional_parkres(
    path: Path | None,
    sal: gpd.GeoDataFrame,
) -> gpd.GeoDataFrame:
    if path is None:
        return gpd.GeoDataFrame(
            {"geometry": []},
            geometry="geometry",
            crs=ANALYSIS_CRS,
        )
    if not path.exists():
        raise FileNotFoundError(path)

    bbox = tuple(sal.to_crs(WGS84_CRS).total_bounds)
    parkres = gpd.read_file(path, bbox=bbox, engine="pyogrio")
    parkres = parkres[
        parkres.geometry.notna() & ~parkres.geometry.is_empty
    ].to_crs(ANALYSIS_CRS)
    for field in ("name", "area_type", "manager", "iucn"):
        if field not in parkres:
            parkres[field] = ""
    return parkres[["geometry", "name", "area_type", "manager", "iucn"]].copy()


def filter_parkres_reserves(source: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    if source.empty:
        return source.copy()

    area_type = normalise_text(source["area_type"])
    included = area_type.str.contains(PARKRES_MAJOR_OR_NATURE_TYPES, na=False)
    excluded = area_type.str.contains(PARKRES_EXCLUDED_TYPES, na=False)
    return source[included & ~excluded].copy()


def nearest_distances(
    samples: gpd.GeoDataFrame,
    features: gpd.GeoDataFrame,
) -> pd.Series:
    if samples.empty:
        return pd.Series(dtype=float)
    if features.empty:
        return pd.Series(
            np.inf,
            index=samples.index,
            dtype=float,
        )

    joined = gpd.sjoin_nearest(
        samples[["geometry"]],
        features[["geometry"]],
        how="left",
        distance_col="distanceM",
    )
    distances = joined.groupby(level=0)["distanceM"].min()
    return distances.reindex(samples.index).fillna(np.inf)


def weighted_share(
    condition: pd.Series,
    weights: pd.Series,
) -> float:
    valid = condition.notna() & weights.notna() & weights.gt(0)
    if not valid.any():
        return float("nan")
    return float(
        np.average(
            condition[valid].astype(float),
            weights=weights[valid].astype(float),
        )
    )


def weighted_mean(values: pd.Series, weights: pd.Series) -> float:
    valid = (
        values.notna()
        & np.isfinite(values)
        & weights.notna()
        & weights.gt(0)
    )
    if not valid.any():
        return float("nan")
    return float(
        np.average(
            values[valid].astype(float),
            weights=weights[valid].astype(float),
        )
    )


def weighted_median(values: pd.Series, weights: pd.Series) -> float | None:
    valid = (
        values.notna()
        & np.isfinite(values)
        & weights.notna()
        & weights.gt(0)
    )
    if not valid.any():
        return None
    ordered = pd.DataFrame(
        {
            "value": values[valid].astype(float),
            "weight": weights[valid].astype(float),
        }
    ).sort_values("value")
    cutoff = ordered["weight"].sum() / 2.0
    value = ordered.loc[
        ordered["weight"].cumsum().ge(cutoff),
        "value",
    ].iloc[0]
    return float(value)


def interpolate_distance_score(
    distances: pd.Series,
    knots: Sequence[dict[str, float]],
) -> pd.Series:
    ordered = sorted(knots, key=lambda item: item["distanceM"])
    x = np.array([item["distanceM"] for item in ordered], dtype=float)
    y = np.array([item["score"] for item in ordered], dtype=float)
    values = distances.to_numpy(dtype=float)
    result = np.interp(values, x, y, left=y[0], right=y[-1])
    result[~np.isfinite(values)] = 0.0
    return pd.Series(result, index=distances.index, dtype=float)


def local_access_score(
    coverage_pct: float,
    target_pct: float,
) -> float:
    if not math.isfinite(coverage_pct):
        return 0.0
    return min(10.0, max(0.0, 10.0 * coverage_pct / target_pct))


def top_nearby_features(
    target_geometry,
    source: gpd.GeoDataFrame,
    *,
    distance_m: float,
    limit: int,
) -> list[dict[str, Any]]:
    if source.empty:
        return []
    nearby = source[source.geometry.intersects(target_geometry.buffer(distance_m))].copy()
    if nearby.empty:
        return []

    nearby["displayName"] = (
        nearby["name"]
        .fillna("")
        .astype(str)
        .str.strip()
        .replace({"": "Unnamed open space", "NO DATA": "Unnamed open space"})
    )
    grouped = (
        nearby.groupby("displayName", as_index=False)["calculatedAreaHa"]
        .sum()
        .sort_values(["calculatedAreaHa", "displayName"], ascending=[False, True])
        .head(limit)
    )
    return [
        {
            "name": row["displayName"],
            "areaHa": round(float(row["calculatedAreaHa"]), 2),
        }
        for _, row in grouped.iterrows()
    ]


def build_records(
    targets: list[dict[str, Any]],
    sal: gpd.GeoDataFrame,
    samples: gpd.GeoDataFrame,
    local_features: gpd.GeoDataFrame,
    major_features: gpd.GeoDataFrame,
    nature_features: gpd.GeoDataFrame,
    config: dict[str, Any],
) -> tuple[list[dict[str, Any]], pd.DataFrame]:
    sal_by_code = sal.set_index("salCode")
    weights_config = config["componentWeights"]
    review_config = config["review"]
    knots = config["distanceScoreKnots"]

    records: list[dict[str, Any]] = []
    qa_rows: list[dict[str, Any]] = []

    for target in targets:
        sal_codes = [
            component["salCode"]
            for component in target["salComponents"]
        ]
        target_sal = sal_by_code.loc[sal_codes]
        target_geometry = unary_union(target_sal.geometry.tolist())
        target_samples = samples[samples["salCode"].isin(sal_codes)].copy()

        review_flags: list[str] = []
        if target_samples.empty:
            review_flags.append("noResidentialMeshBlockSamples")
            representative = target_geometry.representative_point()
            target_samples = gpd.GeoDataFrame(
                {
                    "salCode": [sal_codes[0]],
                    "populationWeight": [1.0],
                    "geometry": [representative],
                },
                geometry="geometry",
                crs=ANALYSIS_CRS,
            )

        local_distance = nearest_distances(target_samples, local_features)
        major_distance = nearest_distances(target_samples, major_features)
        nature_distance = nearest_distances(target_samples, nature_features)
        population_weight = target_samples["populationWeight"].astype(float)

        local_coverage_pct = (
            weighted_share(
                local_distance.le(config["localAccessDistanceM"]),
                population_weight,
            )
            * 100.0
        )
        local_component = local_access_score(
            local_coverage_pct,
            config["localCoverageTargetPct"],
        )

        major_point_scores = interpolate_distance_score(major_distance, knots)
        nature_point_scores = interpolate_distance_score(nature_distance, knots)
        major_component = weighted_mean(major_point_scores, population_weight)
        nature_component = weighted_mean(nature_point_scores, population_weight)

        components = {
            "localOpenSpaceAccess": round(local_component, 4),
            "majorParkAccess": round(major_component, 4),
            "natureCorridorAccess": round(nature_component, 4),
        }
        final = sum(
            components[name] * float(weight)
            for name, weight in weights_config.items()
        )
        final = round(final, 4)

        sample_population = float(population_weight.sum())
        expected_population = float(target["censusPopulation2021"])
        population_coverage_pct = (
            sample_population / expected_population * 100.0
            if expected_population > 0
            else None
        )

        if len(target_samples) < review_config["minimumResidentialSamples"]:
            review_flags.append("lowResidentialSampleCount")
        if (
            population_coverage_pct is not None
            and population_coverage_pct
            < review_config["minimumResidentialPopulationCoveragePct"]
        ):
            review_flags.append("lowResidentialPopulationCoverage")
        component_spread = max(components.values()) - min(components.values())
        if component_spread >= review_config["highComponentSpread"]:
            review_flags.append("highComponentSpread")
        if major_features.empty:
            review_flags.append("noMajorParkFeatures")
        if nature_features.empty:
            review_flags.append("noNatureCorridorFeatures")

        nearby = top_nearby_features(
            target_geometry,
            local_features,
            distance_m=review_config["nearbyFeatureSearchDistanceM"],
            limit=review_config["topNearbyFeatureCount"],
        )
        nearby_nature = top_nearby_features(
            target_geometry,
            nature_features,
            distance_m=review_config["nearbyFeatureSearchDistanceM"],
            limit=review_config["topNearbyFeatureCount"],
        )

        record = {
            "id": target["id"],
            "suburb": target["displayName"],
            "salSuburbs": [
                component["suburb"]
                for component in target["salComponents"]
            ],
            "salCodes": sal_codes,
            "greenspace": final,
            "greenspaceComponents": components,
            "context": {
                "localCoverageWithin400mPct": round(local_coverage_pct, 1),
                "populationWeightedMedianDistanceM": {
                    "localOpenSpace": (
                        None
                        if weighted_median(local_distance, population_weight) is None
                        else round(
                            weighted_median(local_distance, population_weight),
                            0,
                        )
                    ),
                    "majorPark": (
                        None
                        if weighted_median(major_distance, population_weight) is None
                        else round(
                            weighted_median(major_distance, population_weight),
                            0,
                        )
                    ),
                    "natureCorridor": (
                        None
                        if weighted_median(nature_distance, population_weight) is None
                        else round(
                            weighted_median(nature_distance, population_weight),
                            0,
                        )
                    ),
                },
                "nearbyOpenSpaces": nearby,
                "nearbyNatureCorridors": nearby_nature,
            },
            "sourceMetadata": {
                "methodVersion": METHOD_VERSION,
                "retrievedAt": RETRIEVED_AT,
                "distanceMethod": (
                    "Straight-line distance from population-weighted residential "
                    "ABS 2021 Mesh Block representative points"
                ),
                "analysisCrs": ANALYSIS_CRS,
                "reviewRequired": bool(review_flags),
                "reviewFlags": review_flags,
            },
        }
        records.append(record)

        qa_rows.append(
            {
                "id": target["id"],
                "suburb": target["displayName"],
                "salCodes": "|".join(sal_codes),
                "greenspace": final,
                "localOpenSpaceAccess": components["localOpenSpaceAccess"],
                "majorParkAccess": components["majorParkAccess"],
                "natureCorridorAccess": components["natureCorridorAccess"],
                "localCoverageWithin400mPct": round(local_coverage_pct, 1),
                "medianLocalDistanceM": weighted_median(
                    local_distance,
                    population_weight,
                ),
                "medianMajorParkDistanceM": weighted_median(
                    major_distance,
                    population_weight,
                ),
                "medianNatureDistanceM": weighted_median(
                    nature_distance,
                    population_weight,
                ),
                "residentialSampleCount": int(len(target_samples)),
                "residentialPopulationWeight": int(round(sample_population)),
                "censusPopulation2021": int(expected_population),
                "residentialPopulationCoveragePct": (
                    None
                    if population_coverage_pct is None
                    else round(population_coverage_pct, 1)
                ),
                "componentSpread": round(component_spread, 1),
                "reviewFlags": "|".join(review_flags),
            }
        )

    return records, pd.DataFrame(qa_rows)


def source_metadata(
    paths: SourcePaths,
    *,
    parkres: Path | None,
) -> dict[str, Any]:
    sources: list[dict[str, Any]] = [
        {
            "name": "Victorian Planning Authority Open Space",
            "role": "Comprehensive metropolitan open-space base polygons",
            "dataDate": "2019-07-08",
            "retrievedAt": RETRIEVED_AT,
            "url": SOURCE_URLS["vpaOpenSpaceMetadata"],
            "downloadUrl": SOURCE_URLS["vpaOpenSpaceGeoJson"],
            "localFile": paths.open_space.name,
            "sha256": sha256_file(paths.open_space),
            "limitation": (
                "The official dataset states that it is not currently maintained. "
                "Results require manual review for parks created or materially "
                "changed after 2019."
            ),
        },
        {
            "name": "ABS ASGS Edition 3 Suburbs and Localities",
            "role": "2021 SAL boundaries",
            "dataDate": "2021",
            "retrievedAt": RETRIEVED_AT,
            "url": SOURCE_URLS["absBoundaryMetadata"],
            "downloadUrl": SOURCE_URLS["absSalShapefileZip"],
            "localFile": paths.sal_zip.name,
            "sha256": sha256_file(paths.sal_zip),
        },
        {
            "name": "ABS ASGS Edition 3 Mesh Blocks",
            "role": "Residential sampling geometry",
            "dataDate": "2021",
            "retrievedAt": RETRIEVED_AT,
            "url": SOURCE_URLS["absBoundaryMetadata"],
            "downloadUrl": (
                SOURCE_URLS["absMeshBlockFeatureService"]
                if paths.mb_zip.is_file() and paths.mb_zip.suffix.lower() != ".zip"
                else SOURCE_URLS["absMeshBlockShapefileZip"]
            ),
            "localFile": paths.mb_zip.name,
            "sha256": sha256_file(paths.mb_zip),
        },
        {
            "name": "ABS Census Mesh Block Counts",
            "role": "Usual-resident population weights and residential category",
            "dataDate": "2021",
            "retrievedAt": RETRIEVED_AT,
            "url": SOURCE_URLS["absMeshCountMetadata"],
            "downloadUrl": SOURCE_URLS["absMeshBlockCountsXlsx"],
            "localFile": paths.mb_counts.name,
            "sha256": sha256_file(paths.mb_counts),
        },
    ]
    if parkres is not None:
        sources.append(
            {
                "name": "Victorian Parks and Conservation Reserves (PARKRES)",
                "role": (
                    "Current supplemental major-park and nature-corridor polygons"
                ),
                "dataDate": "Source file supplied at build time",
                "retrievedAt": RETRIEVED_AT,
                "url": SOURCE_URLS["parkresMetadata"],
                "localFile": parkres.name,
                "sha256": sha256_file(parkres),
                "limitation": (
                    "PARKRES does not replace council-level local park coverage; "
                    "it supplements the VPA metropolitan layer."
                ),
            }
        )
    return {
        "methodVersion": METHOD_VERSION,
        "retrievedAt": RETRIEVED_AT,
        "sources": sources,
    }


def write_outputs(
    out_dir: Path,
    records: list[dict[str, Any]],
    qa: pd.DataFrame,
    inspection: dict[str, Any],
    config: dict[str, Any],
    metadata: dict[str, Any],
) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    qa = qa.sort_values(
        ["greenspace", "suburb"],
        ascending=[False, True],
    ).reset_index(drop=True)
    qa["rank"] = np.arange(1, len(qa) + 1)

    payload = {
        "dataset": "dwelling-greenspace-context",
        "version": METHOD_VERSION,
        "retrievedAt": RETRIEVED_AT,
        "usage": {
            "criterion": "greenspace",
            "scoreScale": "0-10",
            "interpretation": "Access-based, descriptive and source-attributed",
            "notMeasured": [
                "Park maintenance quality",
                "Perceived safety within parks",
                "Tree canopy",
                "Private gardens",
                "Walking-route barriers",
            ],
        },
        "method": {
            "formula": (
                "0.50 × localOpenSpaceAccess + "
                "0.30 × majorParkAccess + "
                "0.20 × natureCorridorAccess"
            ),
            "config": config,
            "combinedSuburbRule": (
                "Combined lens records pool all component-SAL residential "
                "sampling points and population weights before calculating "
                "components. Component scores are not averaged."
            ),
        },
        "sourceMetadata": metadata,
        "records": sorted(records, key=lambda item: item["suburb"]),
    }

    json_path = out_dir / "dwelling-greenspace-context.json"
    ts_path = out_dir / "dwelling-greenspace-context.ts"
    qa_path = out_dir / "dwelling-greenspace-qa.csv"
    inspection_path = out_dir / "dwelling-greenspace-source-inspection.json"

    json_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    ts_path.write_text(
        """/**
 * Population-weighted greenspace access for Settle.
 *
 * Generated by build-dwelling-greenspace.py.
 * Retain component values and source metadata when integrating.
 */
export const DWELLING_GREENSPACE_CONTEXT = """
        + json.dumps(payload, indent=2, ensure_ascii=False)
        + """ as const;

export type DwellingGreenspaceRecord =
  (typeof DWELLING_GREENSPACE_CONTEXT.records)[number];

export const DWELLING_GREENSPACE_BY_ID = Object.fromEntries(
  DWELLING_GREENSPACE_CONTEXT.records.map((record) => [record.id, record]),
) as Record<string, DwellingGreenspaceRecord>;
""",
        encoding="utf-8",
    )
    qa.to_csv(qa_path, index=False)
    inspection_path.write_text(
        json.dumps(inspection, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def main() -> int:
    args = parse_args()
    config = DEFAULT_CONFIG
    if args.config:
        config = deep_merge(
            DEFAULT_CONFIG,
            json.loads(args.config.read_text(encoding="utf-8")),
        )

    _, targets = load_targets(args.targets)
    if args.target_id:
        requested_ids = set(args.target_id)
        targets = [target for target in targets if target["id"] in requested_ids]
        found_ids = {target["id"] for target in targets}
        if missing_ids := requested_ids - found_ids:
            raise ValueError(f"Unknown target ids: {sorted(missing_ids)}")
    target_codes = {
        component["salCode"]
        for target in targets
        for component in target["salComponents"]
    }

    paths = ensure_sources(
        args.cache,
        no_download=args.no_download,
        force_download=args.force_download,
        mesh_blocks=args.mesh_blocks,
    )
    sal = load_sal_boundaries(paths.sal_dir, target_codes)
    open_space, inspection = load_open_space(paths.open_space, sal)

    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "dwelling-greenspace-source-inspection.json").write_text(
        json.dumps(inspection, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    if args.inspect_only:
        print(json.dumps(inspection, indent=2))
        return 0

    counts = load_victorian_mesh_counts(paths.mb_counts)
    samples = load_residential_samples(paths.mb_dir, sal, counts)

    local_features = accessible_local_open_space(
        open_space,
        minimum_area_ha=config["minimumLocalFeatureAreaHa"],
    )

    current_parkres = filter_parkres_reserves(
        load_optional_parkres(args.parkres, sal)
    )
    major_features = build_major_features(
        local_features,
        minimum_area_ha=config["majorParkMinimumAreaHa"],
    )

    if not current_parkres.empty:
        parkres_dissolved = dissolve_contiguous(current_parkres)
        parkres_major = parkres_dissolved[
            parkres_dissolved["calculatedAreaHa"].ge(
                config["majorParkMinimumAreaHa"]
            )
        ]
        major_features = gpd.GeoDataFrame(
            pd.concat(
                [
                    major_features[["geometry", "calculatedAreaHa"]],
                    parkres_major[["geometry", "calculatedAreaHa"]],
                ],
                ignore_index=True,
            ),
            geometry="geometry",
            crs=ANALYSIS_CRS,
        )

    nature_features = nature_open_space(local_features)
    if not current_parkres.empty:
        # PARKRES is supplemental nature/major context. It is not added to the
        # local-access layer because public pedestrian access is not encoded
        # consistently enough to assume universal access.
        parkres_nature = current_parkres.copy()
        parkres_nature["calculatedAreaHa"] = (
            parkres_nature.geometry.area / 10_000.0
        )
        parkres_nature["name"] = (
            parkres_nature["name"]
            .fillna("")
            .astype(str)
            .str.strip()
            .replace({"": "PARKRES reserve"})
        )
        nature_features = gpd.GeoDataFrame(
            pd.concat(
                [
                    nature_features,
                    parkres_nature,
                ],
                ignore_index=True,
                sort=False,
            ),
            geometry="geometry",
            crs=ANALYSIS_CRS,
        )

    records, qa = build_records(
        targets,
        sal,
        samples,
        local_features,
        major_features,
        nature_features,
        config,
    )
    metadata = source_metadata(paths, parkres=args.parkres)
    write_outputs(
        args.out,
        records,
        qa,
        inspection,
        config,
        metadata,
    )

    flagged = int(
        qa["reviewFlags"].fillna("").astype(str).str.len().gt(0).sum()
    )
    print(
        f"Generated {len(records)} greenspace records; "
        f"{flagged} require manual review."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
