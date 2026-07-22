"""Build the Settle school datasets from official Victorian sources.

Inputs (vendored under ./source/, downloaded by the operator — see START-HERE):
  1. School Locations CSV  (data.vic.gov.au "School Locations <year>")
     - every Victorian school, government and non-government, with coordinates.
  2. School Zones ZIP      (data.vic.gov.au "Victorian Government School Zones <year>")
     - spatial datasets for primary zones and each secondary year level,
       GDA94 VicGrid (EPSG:3111).
  3. melbourne-localities.geojson (already in-repo) — fallback anchor polygons
     for tram/bus-only records with no station point.

Outputs (generated, never hand-edited):
  src/data/dwelling/schools/dwelling-school-points.js    - map markers
  src/data/dwelling/schools/dwelling-school-zones.json   - simplified zone polygons
  src/data/dwelling/schools/dwelling-school-context.js   - per-record zoned summary
  tools/dwelling-schools/dwelling-schools-qa.csv         - review table
  tools/dwelling-schools/dwelling-schools-outliers.md    - boundary-proximity flags

CONTRACT (mirrors the greenspace and census datasets):
  - Zone polygons and school points are DISPLAY CONTEXT ONLY: never scored,
    never ranked, never read by the ranking engine. The schools criterion
    continues to read childhood.schoolStrength until the strength table lands.
  - Zones are the official enrolment-zone dataset for ONE zone year. They are
    published for enrolment decisions; the department states they should not
    be relied on for property purchase decisions. Any address must still be
    verified at findmyschool.vic.gov.au. The UI must carry both caveats.
  - Selective-entry, specialist, English-language and community schools have
    NO zones by definition; they may appear as markers, never as polygons.
  - An anchor within BOUNDARY_FLAG_M of its zone boundary is flagged in the
    outliers report: street-level address checks decide those cases, not this
    pipeline.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import tempfile
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

import geopandas as gpd
import pandas as pd
from shapely.geometry import Point, mapping

TOOL_DIR = Path(__file__).resolve().parent
REPO_ROOT = TOOL_DIR.parent.parent

WGS84 = "EPSG:4326"
VICGRID_M = "EPSG:3111"  # metres; used for distance math

SIMPLIFY_TOLERANCE_DEG = 0.0004  # matches the vendored locality polygons (~40 m)
BOUNDARY_FLAG_M = 150.0

# Zone layer discovery inside the official ZIP. The department has shipped
# shapefiles both loose and in nested zips, with names like
# "Primary_Integrated_2027" and "Secondary_Year7_2027" / "SEC_YR7".
PRIMARY_PATTERNS = [r"primary"]
SECONDARY_Y7_PATTERNS = [r"year\s*_?7", r"yr\s*_?7", r"y7", r"secondary_?7"]


# --------------------------------------------------------------------------- #
# small helpers
# --------------------------------------------------------------------------- #
def norm_name(name: str) -> str:
    """Normalise a school name for matching: casefold, expand the common
    abbreviations used in the hand-written childhood notes, strip punctuation
    and parentheticals."""
    s = re.sub(r"\(.*?\)", " ", str(name))
    s = s.casefold()
    s = re.sub(r"['\u2019.]", "", s)
    replacements = {
        r"\bps\b": "primary school",
        r"\bsc\b": "secondary college",
        r"\bhs\b": "high school",
        r"\bhigh\b(?!\s+school)": "high school",
        r"\bcollege\b": "college",
        r"\bp-12\b": "",
        r"&": "and",
    }
    for pat, rep in replacements.items():
        s = re.sub(pat, rep, s)
    # The 2027 zones source still names "Maribyrnong Secondary College"
    # while the 2025 locations source uses its current "Maribyrnong College"
    # name. Treat the generic word as optional so the official records join.
    s = re.sub(r"\bsecondary college\b", "college", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def slugify(name: str) -> str:
    s = re.sub(r"\(.*?\)", "", str(name)).casefold()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def match_layer(name: str, patterns: list[str]) -> bool:
    low = name.casefold()
    return any(re.search(p, low) for p in patterns)


# --------------------------------------------------------------------------- #
# input loading
# --------------------------------------------------------------------------- #
def load_locations_csv(path: Path) -> pd.DataFrame:
    """Load the DET school-locations CSV. Column names have varied across
    editions; resolve them defensively and fail loudly if essentials are
    missing."""
    df = pd.read_csv(path, encoding="utf-8-sig", dtype=str)
    cols = {c.casefold().replace(" ", "_"): c for c in df.columns}

    def pick(*cands: str) -> str | None:
        for c in cands:
            if c in cols:
                return cols[c]
        return None

    name_col = pick("school_name")
    sector_col = pick("education_sector", "sector")
    type_col = pick("school_type", "type")
    no_col = pick("school_no", "school_number", "entity_code")
    lat_col = pick("y", "latitude", "lat")
    lng_col = pick("x", "longitude", "long", "lon")
    postcode_col = pick("address_postcode", "postal_postcode", "postcode")
    town_col = pick("address_town", "postal_town", "town", "suburb")

    missing = [n for n, c in [("name", name_col), ("lat", lat_col), ("lng", lng_col)] if c is None]
    if missing:
        raise SystemExit(f"locations CSV missing columns: {missing}; found {list(df.columns)}")

    out = pd.DataFrame(
        {
            "schoolNo": df[no_col].str.strip() if no_col else None,
            "name": df[name_col].str.strip(),
            "sector": (df[sector_col].str.strip() if sector_col else "unknown"),
            "schoolType": (df[type_col].str.strip() if type_col else "unknown"),
            "lat": pd.to_numeric(df[lat_col], errors="coerce"),
            "lng": pd.to_numeric(df[lng_col], errors="coerce"),
            "postcode": df[postcode_col].str.strip() if postcode_col else None,
            "town": df[town_col].str.strip() if town_col else None,
        }
    ).dropna(subset=["lat", "lng"])
    out["normName"] = out["name"].map(norm_name)
    return out


def extract_zone_layers(zones_zip: Path, workdir: Path) -> dict[str, gpd.GeoDataFrame]:
    """Pull the primary and Year-7 secondary zone layers out of the official
    ZIP, whatever mix of loose shapefiles / nested zips / geojson it contains.
    Returns WGS84 GeoDataFrames keyed 'primary' and 'secondary'."""
    extracted = workdir / "zones"
    extracted.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zones_zip) as z:
        z.extractall(extracted)
    # one level of nested zips is enough for the published editions
    for inner in list(extracted.rglob("*.zip")):
        with zipfile.ZipFile(inner) as z:
            z.extractall(inner.with_suffix(""))

    candidates = [
        p for p in extracted.rglob("*") if p.suffix.casefold() in {".shp", ".geojson", ".json", ".gpkg"}
    ]
    layers: dict[str, gpd.GeoDataFrame] = {}
    for kind, patterns in [("primary", PRIMARY_PATTERNS), ("secondary", SECONDARY_Y7_PATTERNS)]:
        matches = [p for p in candidates if match_layer(p.stem, patterns)]
        if kind == "secondary":
            # avoid picking primary files whose names merely contain digits
            matches = [p for p in matches if not match_layer(p.stem, PRIMARY_PATTERNS)]
        if not matches:
            raise SystemExit(
                f"could not find a {kind} zone layer in {zones_zip.name}; "
                f"candidates were: {[p.name for p in candidates]}"
            )
        # prefer the shortest name: editions ship e.g. Year7 alongside Year8-12
        best = sorted(matches, key=lambda p: len(p.stem))[0]
        gdf = gpd.read_file(best)
        if gdf.crs is None:
            gdf = gdf.set_crs(VICGRID_M)  # documented projection of the dataset
        layers[kind] = gdf.to_crs(WGS84)
        print(f"  {kind} zones: {best.name} ({len(gdf)} features)")
    return layers


def zone_attr_columns(gdf: gpd.GeoDataFrame) -> tuple[str, str | None]:
    """Find the school-name and school-number attribute columns on a zone layer."""
    cols = {c.casefold(): c for c in gdf.columns}
    name_col = next(
        (cols[c] for c in cols if "school" in c and "name" in c),
        next((cols[c] for c in cols if c in {"name", "sch_name"}), None),
    )
    no_col = next((cols[c] for c in cols if "school" in c and ("no" in c or "num" in c)), None)
    if name_col is None:
        raise SystemExit(f"zone layer has no recognisable school-name column: {list(gdf.columns)}")
    return name_col, no_col


# --------------------------------------------------------------------------- #
# anchors
# --------------------------------------------------------------------------- #
@dataclass
class Anchor:
    area_id: str
    suburb: str
    lng: float
    lat: float
    source: str  # 'station' | 'locality-representative-point'
    name_hints: dict = field(default_factory=dict)
    catchment_m: float = 800.0


def load_anchors(anchors_path: Path, localities_path: Path) -> list[Anchor]:
    spec = json.loads(anchors_path.read_text())
    localities = gpd.read_file(localities_path)
    loc_by_name = {str(n).casefold(): g for n, g in zip(localities["name"], localities.geometry)}

    anchors: list[Anchor] = []
    for rec in spec["records"]:
        hints = rec.get("nameHints", {})
        if rec["anchors"]:
            a = rec["anchors"][0]  # first station point is the record's primary anchor
            anchors.append(Anchor(rec["id"], rec["suburb"], a["lng"], a["lat"], "station", hints, rec.get("catchmentMetres", 800)))
        else:
            # tram/bus-only records: fall back to the locality polygon
            geoms = [loc_by_name[n.casefold()] for n in rec["localityNames"] if n.casefold() in loc_by_name]
            if not geoms:
                print(f"  WARNING: no anchor and no locality polygon for {rec['id']}; skipped")
                continue
            pt = geoms[0].representative_point()
            anchors.append(
                Anchor(rec["id"], rec["suburb"], pt.x, pt.y, "locality-representative-point", hints,
                       rec.get("catchmentMetres", 800))
            )
    return anchors


# --------------------------------------------------------------------------- #
# core assignment
# --------------------------------------------------------------------------- #
def assign_zones(
    anchors: list[Anchor], zones: gpd.GeoDataFrame, category: str
) -> list[dict]:
    """Point-in-polygon: which zone contains each record anchor. Also measures
    the anchor's distance to the zone boundary (metres) for the QA flag."""
    name_col, no_col = zone_attr_columns(zones)
    zones_m = zones.to_crs(VICGRID_M)
    results = []
    for a in anchors:
        pt = Point(a.lng, a.lat)
        hit = zones[zones.geometry.contains(pt)]
        if hit.empty:
            results.append(
                {"areaId": a.area_id, "category": category, "schoolName": None, "schoolNo": None,
                 "boundaryDistanceM": None, "anchorSource": a.source}
            )
            continue
        row = hit.iloc[0]
        pt_m = gpd.GeoSeries([pt], crs=WGS84).to_crs(VICGRID_M).iloc[0]
        boundary_m = float(zones_m.loc[hit.index[0]].geometry.boundary.distance(pt_m))
        results.append(
            {
                "areaId": a.area_id,
                "category": category,
                "schoolName": str(row[name_col]).strip(),
                "schoolNo": (str(row[no_col]).strip() if no_col else None),
                "boundaryDistanceM": round(boundary_m, 1),
                "anchorSource": a.source,
                "_zoneIndex": int(hit.index[0]),
            }
        )
    return results


GENERIC_TOKENS = {"primary", "secondary", "school", "college", "high", "the", "and", "of"}


def distinctive_tokens(norm: str) -> frozenset[str]:
    return frozenset(t for t in norm.split() if t not in GENERIC_TOKENS and not re.fullmatch(r"[0-9-]+", t))


def catchment_zones(anchors: list[Anchor], zones: gpd.GeoDataFrame, category: str) -> list[dict]:
    """Zones that INTERSECT each record's catchment circle without containing
    the anchor itself. An 800 m catchment routinely straddles primary zone
    boundaries (South Yarra station sits 23 m from one); these are emitted as
    role 'inCatchment' so the display can show them fainter and the card can
    say 'parts of this catchment fall in X's zone'."""
    name_col, no_col = zone_attr_columns(zones)
    zones_m = zones.to_crs(VICGRID_M)
    out = []
    pts_m = gpd.GeoSeries([Point(a.lng, a.lat) for a in anchors], crs=WGS84).to_crs(VICGRID_M)
    for a, pt_m in zip(anchors, pts_m):
        circle = pt_m.buffer(a.catchment_m)
        hit = zones_m[zones_m.geometry.intersects(circle) & ~zones_m.geometry.contains(pt_m)]
        for idx, row in hit.iterrows():
            out.append({
                "areaId": a.area_id, "category": category,
                "schoolName": str(row[name_col]).strip(),
                "schoolNo": (str(row[no_col]).strip() if no_col else None),
                "boundaryDistanceM": None, "anchorSource": a.source,
                "_zoneIndex": int(idx), "role": "inCatchment",
            })
    return out


def match_hint_schools(anchors: list[Anchor], locations: pd.DataFrame) -> list[dict]:
    """Match the hand-written childhood school names to official location rows
    so every named school (including non-government privateContext entries)
    gets an official coordinate. Unmatched hints are reported, never invented.

    Three passes: exact normalised name; substring containment; then a
    token-subset fallback for word-insertion cases ("Keysborough College" ->
    "Keysborough Secondary College") guarded by sector (public* groups only
    match Government schools) and by category (publicSecondary only matches
    secondary/combined types) so locality-named schools in other sectors are
    never captured."""
    matched, unmatched = [], []
    for a in anchors:
        for group, names in (a.name_hints or {}).items():
            for raw in names:
                key = norm_name(raw)
                cand = locations[locations["normName"] == key]
                if cand.empty:  # relax: containment either way
                    cand = locations[
                        locations["normName"].str.contains(re.escape(key), regex=True)
                        | locations["normName"].map(lambda n: n in key if len(n) > 8 else False)
                    ]
                if cand.empty:  # token-subset fallback, sector/category guarded
                    want = distinctive_tokens(key)
                    if want:
                        pool = locations
                        if group.startswith("public"):
                            pool = pool[pool["sector"].str.casefold().str.contains("gov", na=False)]
                        if group == "publicSecondary":
                            pool = pool[pool["schoolType"].str.casefold().str.contains("sec|pri/sec", na=False, regex=True)]
                        elif group == "publicPrimary":
                            pool = pool[pool["schoolType"].str.casefold().str.contains("pri", na=False)]
                        cand = pool[pool["normName"].map(lambda n: want <= distinctive_tokens(n))]
                if cand.empty:
                    unmatched.append({"areaId": a.area_id, "hint": raw, "group": group})
                    continue
                row = cand.iloc[0]
                matched.append(
                    {"areaId": a.area_id, "group": group, "hint": raw,
                     "schoolNo": row["schoolNo"], "name": row["name"], "sector": row["sector"],
                     "schoolType": row["schoolType"], "lat": float(row["lat"]), "lng": float(row["lng"]),
                     "ambiguous": len(cand) > 1}
                )
    return matched, unmatched


# --------------------------------------------------------------------------- #
# emit
# --------------------------------------------------------------------------- #
GENERATED_HEADER = """// GENERATED by tools/dwelling-schools/build-dwelling-schools.py — do not hand-edit.
//
// DISPLAY CONTEXT ONLY: never scored, never ranked, never read by the ranking
// engine (same contract as the census and girls' sport datasets). Zones are
// the official enrolment zones for zoneYear {year}; the department publishes
// them for enrolment decisions and states they should not be relied on for
// property purchase decisions. Verify any address at findmyschool.vic.gov.au.
"""


def category_for(school_type: str, group: str | None) -> str:
    t = (school_type or "").casefold()
    if "pri/sec" in t or "p-12" in t or "combined" in t:
        return "combined"
    if "sec" in t:
        return "secondary"
    if "pri" in t:
        return "primary"
    if "special" in t or "language" in t:
        return "specialist"
    return {"publicPrimary": "primary", "publicSecondary": "secondary"}.get(group or "", "combined")


def sector_norm(sector: str) -> str:
    s = (sector or "").casefold()
    if "gov" in s:
        return "government"
    if "cath" in s:
        return "catholic"
    if "ind" in s:
        return "independent"
    return "unknown"


def run(args: argparse.Namespace) -> None:
    out_data_dir = REPO_ROOT / "src/data/dwelling/schools"
    out_data_dir.mkdir(parents=True, exist_ok=True)

    print("loading anchors + locations...")
    anchors = load_anchors(TOOL_DIR / "dwelling-schools-anchors.json", Path(args.localities))
    locations = load_locations_csv(Path(args.locations_csv))
    print(f"  {len(anchors)} anchors, {len(locations)} schools in locations CSV")

    catchment = []
    with tempfile.TemporaryDirectory() as td:
        layers = extract_zone_layers(Path(args.zones_zip), Path(td))
        assignments = assign_zones(anchors, layers["primary"], "primary") + assign_zones(
            anchors, layers["secondary"], "secondary"
        )
        for r in assignments:
            r.setdefault("role", "anchorZoned")
        catchment = catchment_zones(anchors, layers["primary"], "primary") + catchment_zones(
            anchors, layers["secondary"], "secondary"
        )

        # ---- zones output: one geometry per distinct school+category -------
        zone_features, zone_key_to_areas, zone_key_roles = {}, {}, {}
        for cat in ("primary", "secondary"):
            gdf = layers[cat]
            name_col, no_col = zone_attr_columns(gdf)
            for rec in [r for r in assignments + catchment if r["category"] == cat and r["schoolName"]]:
                key = f"{cat}:{rec['schoolNo'] or slugify(rec['schoolName'])}"
                zone_key_to_areas.setdefault(key, []).append(rec["areaId"])
                zone_key_roles.setdefault(key, {})[rec["areaId"]] = rec["role"]
                if key not in zone_features:
                    geom = gdf.loc[rec["_zoneIndex"]].geometry.simplify(
                        args.tolerance, preserve_topology=True
                    )
                    zone_features[key] = {
                        "schoolId": slugify(rec["schoolName"]),
                        "schoolNo": rec["schoolNo"],
                        "name": rec["schoolName"],
                        "category": cat,
                        "geometry": mapping(geom),
                    }

        zones_out = {
            "dataset": "dwelling-school-zones",
            "zoneYear": args.zone_year,
            "source": "Victorian Government School Zones (data.vic.gov.au), CC BY 4.0, (c) State of Victoria (Department of Education)",
            "caveat": "Enrolment zones for one year; verify any address at findmyschool.vic.gov.au. Not for property purchase reliance per the publisher.",
            "features": [
                {**f,
                 "areaIds": sorted(set(zone_key_to_areas[k])),
                 "anchorZonedFor": sorted(a for a, role in zone_key_roles[k].items() if role == "anchorZoned"),
                } for k, f in zone_features.items()
            ],
        }
        zones_path = out_data_dir / "dwelling-school-zones.json"
        zones_path.write_text(json.dumps(zones_out, separators=(",", ":")))
        print(f"  zones: {len(zone_features)} distinct polygons, {zones_path.stat().st_size/1024:.0f} KB")

    # ---- markers: zoned schools + name-hint schools ------------------------
    hint_matches, hint_unmatched = match_hint_schools(anchors, locations)
    markers: dict[str, dict] = {}

    def add_marker(school_no, name, sector, school_type, lat, lng, area_id, group=None, zoned=False):
        sid = slugify(name)
        m = markers.setdefault(
            sid,
            {"id": sid, "schoolNo": school_no, "name": name,
             "category": category_for(school_type, group), "sector": sector_norm(sector),
             "coordinates": [round(float(lng), 5), round(float(lat), 5)],
             "areaIds": [], "zonedFor": []},
        )
        if area_id not in m["areaIds"]:
            m["areaIds"].append(area_id)
        if zoned and area_id not in m["zonedFor"]:
            m["zonedFor"].append(area_id)

    loc_by_no = {r["schoolNo"]: r for _, r in locations.iterrows() if r["schoolNo"]}
    loc_by_norm = {r["normName"]: r for _, r in locations.iterrows()}
    zoned_missing_location = []
    for rec in assignments:
        if not rec["schoolName"]:
            continue
        row = loc_by_no.get(rec["schoolNo"]) if rec["schoolNo"] else None
        if row is None:
            row = loc_by_norm.get(norm_name(rec["schoolName"]))
        if row is None:
            zoned_missing_location.append(rec)
            continue
        add_marker(row["schoolNo"], row["name"], row["sector"], row["schoolType"],
                   row["lat"], row["lng"], rec["areaId"], zoned=True)
    for h in hint_matches:
        add_marker(h["schoolNo"], h["name"], h["sector"], h["schoolType"],
                   h["lat"], h["lng"], h["areaId"], group=h["group"])

    points_js = (
        GENERATED_HEADER.format(year=args.zone_year)
        + "\nexport const SCHOOL_POINTS_DATASET = "
        + json.dumps(
            {"source": "School Locations CSV + School Zones (data.vic.gov.au)",
             "zoneYear": args.zone_year, "generatedAt": args.generated_at},
            indent=2,
        )
        + "\n\nexport const schoolPoints = "
        + json.dumps(sorted(markers.values(), key=lambda m: m["id"]), indent=2)
        + "\n"
    )
    (out_data_dir / "dwelling-school-points.js").write_text(points_js)

    # ---- per-record context -------------------------------------------------
    context = {}
    for a in anchors:
        recs = {r["category"]: r for r in assignments if r["areaId"] == a.area_id and r["schoolName"]}
        alsoP = sorted({c["schoolName"] for c in catchment if c["areaId"] == a.area_id and c["category"] == "primary"})
        alsoS = sorted({c["schoolName"] for c in catchment if c["areaId"] == a.area_id and c["category"] == "secondary"})
        context[a.area_id] = {
            "zonedPrimary": recs.get("primary", {}).get("schoolName"),
            "zonedSecondary": recs.get("secondary", {}).get("schoolName"),
            "alsoInCatchmentPrimary": alsoP,
            "alsoInCatchmentSecondary": alsoS,
            "anchorSource": a.source,
            "boundaryFlag": any(
                (r.get("boundaryDistanceM") or 1e9) < BOUNDARY_FLAG_M for r in recs.values()
            ),
        }
    context_js = (
        GENERATED_HEADER.format(year=args.zone_year)
        + "\nexport const SCHOOL_CONTEXT_DATASET = "
        + json.dumps({"zoneYear": args.zone_year, "generatedAt": args.generated_at}, indent=2)
        + "\n\nexport const schoolContextByAreaId = "
        + json.dumps(context, indent=2)
        + "\n"
    )
    (out_data_dir / "dwelling-school-context.js").write_text(context_js)

    # ---- QA + outliers ------------------------------------------------------
    qa_path = TOOL_DIR / "dwelling-schools-qa.csv"
    with qa_path.open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["areaId", "category", "zonedSchool", "schoolNo", "boundaryDistanceM", "anchorSource"])
        for r in sorted(assignments, key=lambda r: (r["areaId"], r["category"])):
            w.writerow([r["areaId"], r["category"], r["schoolName"], r["schoolNo"],
                        r["boundaryDistanceM"], r["anchorSource"]])

    lines = [f"# dwelling-schools outliers — zone year {args.zone_year}\n"]
    flagged = [r for r in assignments
               if r["schoolName"] and (r["boundaryDistanceM"] or 1e9) < BOUNDARY_FLAG_M]
    lines.append(f"\n## Anchors within {BOUNDARY_FLAG_M:.0f} m of a zone boundary ({len(flagged)})\n")
    lines += [f"- {r['areaId']} ({r['category']}): {r['schoolName']} — {r['boundaryDistanceM']} m. "
              "Street-level: the zone can flip within the catchment.\n" for r in flagged]
    unassigned = [r for r in assignments if not r["schoolName"]]
    lines.append(f"\n## Anchors with no containing zone ({len(unassigned)})\n")
    lines += [f"- {r['areaId']} ({r['category']}) — anchor {r['anchorSource']}\n" for r in unassigned]
    lines.append(f"\n## Zoned schools missing from locations CSV ({len(zoned_missing_location)})\n")
    lines += [f"- {r['schoolName']} ({r['areaId']}, {r['category']})\n" for r in zoned_missing_location]
    lines.append(f"\n## Unmatched childhood name hints ({len(hint_unmatched)})\n")
    lines += [f"- {u['areaId']}: \"{u['hint']}\" ({u['group']})\n" for u in hint_unmatched]
    (TOOL_DIR / "dwelling-schools-outliers.md").write_text("".join(lines))

    print(f"  markers: {len(markers)} | context records: {len(context)}")
    print(f"  QA: {qa_path.name} | outliers: dwelling-schools-outliers.md")
    print("done.")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--locations-csv", required=True, help="School Locations CSV path")
    ap.add_argument("--zones-zip", required=True, help="School Zones ZIP path")
    ap.add_argument("--zone-year", required=True, help="Zone year the ZIP represents, e.g. 2027")
    ap.add_argument("--localities", default=str(REPO_ROOT / "src/assets/geo/melbourne-localities.geojson"))
    ap.add_argument("--tolerance", type=float, default=SIMPLIFY_TOLERANCE_DEG)
    ap.add_argument("--generated-at", default="2026-07-16")
    run(ap.parse_args())


if __name__ == "__main__":
    sys.exit(main())
