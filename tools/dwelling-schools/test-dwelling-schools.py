"""Tests for build-dwelling-schools.py using synthetic fixtures.

Covers name normalisation/matching, point-in-polygon zone assignment with the
boundary-distance flag, layer discovery patterns, and category/sector mapping.
Runs with no source downloads: everything is generated in-memory.
"""

import importlib.util
import sys
from pathlib import Path

import geopandas as gpd
import pandas as pd
import pytest
from shapely.geometry import Polygon

spec = importlib.util.spec_from_file_location(
    "build_dwelling_schools", Path(__file__).parent / "build-dwelling-schools.py"
)
mod = importlib.util.module_from_spec(spec)
sys.modules["build_dwelling_schools"] = mod  # dataclass annotation resolution
spec.loader.exec_module(mod)


# ---- name normalisation ----------------------------------------------------
@pytest.mark.parametrize(
    "raw,expected",
    [
        ("Clifton Hill PS", "clifton hill primary school"),
        ("Doncaster Secondary College", "doncaster secondary college"),
        ("East Doncaster SC (verify zone)", "east doncaster secondary college"),
        ("Prahran High (new 2019 vertical campus)", "prahran high school"),
        ("Melbourne Girls' College", "melbourne girls college"),
        ("Balwyn High (zoned; in-suburb)", "balwyn high school"),
    ],
)
def test_norm_name(raw, expected):
    assert mod.norm_name(raw) == expected


def test_slugify():
    assert mod.slugify("St Kilda Primary School") == "st-kilda-primary-school"
    assert mod.slugify("Fitzroy High (verify zone)") == "fitzroy-high"


# ---- zone layer discovery patterns -----------------------------------------
@pytest.mark.parametrize(
    "stem,kind,should_match",
    [
        ("Primary_Integrated_2027", "primary", True),
        ("Secondary_Year7_2027", "secondary", True),
        ("SEC_YR7", "secondary", True),
        ("Secondary_Year10_2027", "secondary", False),
        ("Primary_Integrated_2027", "secondary", False),
    ],
)
def test_layer_patterns(stem, kind, should_match):
    patterns = mod.PRIMARY_PATTERNS if kind == "primary" else mod.SECONDARY_Y7_PATTERNS
    assert mod.match_layer(stem, patterns) is should_match


# ---- point-in-polygon assignment + boundary flag ----------------------------
@pytest.fixture()
def square_zones():
    """Two adjacent 0.02-degree squares (~2 km) named A and B."""
    a = Polygon([(145.00, -37.80), (145.02, -37.80), (145.02, -37.78), (145.00, -37.78)])
    b = Polygon([(145.02, -37.80), (145.04, -37.80), (145.04, -37.78), (145.02, -37.78)])
    return gpd.GeoDataFrame(
        {"School_Name": ["Zone A Primary School", "Zone B Primary School"],
         "School_No": ["0001", "0002"]},
        geometry=[a, b],
        crs=mod.WGS84,
    )


def test_zone_assignment_contains(square_zones):
    anchors = [
        mod.Anchor("rec-a", "A", 145.01, -37.79, "station"),       # centre of A
        mod.Anchor("rec-b", "B", 145.03, -37.79, "station"),       # centre of B
        mod.Anchor("rec-out", "Out", 145.10, -37.79, "station"),   # outside both
    ]
    res = {r["areaId"]: r for r in mod.assign_zones(anchors, square_zones, "primary")}
    assert res["rec-a"]["schoolName"] == "Zone A Primary School"
    assert res["rec-b"]["schoolName"] == "Zone B Primary School"
    assert res["rec-out"]["schoolName"] is None


def test_boundary_distance_flags_edge_anchor(square_zones):
    # ~55 m from the A/B shared boundary at this latitude
    edge = mod.Anchor("rec-edge", "Edge", 145.0194, -37.79, "station")
    centre = mod.Anchor("rec-centre", "Centre", 145.01, -37.79, "station")
    res = {r["areaId"]: r for r in mod.assign_zones([edge, centre], square_zones, "primary")}
    assert res["rec-edge"]["boundaryDistanceM"] < mod.BOUNDARY_FLAG_M
    assert res["rec-centre"]["boundaryDistanceM"] > mod.BOUNDARY_FLAG_M


# ---- hint matching against a locations frame --------------------------------
@pytest.fixture()
def locations():
    df = pd.DataFrame(
        {
            "schoolNo": ["1001", "1002", "1003"],
            "name": ["Clifton Hill Primary School", "Doncaster Secondary College", "Salesian College Rupertswood"],
            "sector": ["Government", "Government", "Catholic"],
            "schoolType": ["Primary", "Secondary", "Secondary"],
            "lat": [-37.788, -37.787, -37.571],
            "lng": [144.995, 145.124, 144.741],
            "postcode": ["3068", "3108", "3429"],
            "town": ["Clifton Hill", "Doncaster", "Sunbury"],
        }
    )
    df["normName"] = df["name"].map(mod.norm_name)
    return df


def test_hint_matching(locations):
    anchors = [
        mod.Anchor("clifton-hill-2br", "Clifton Hill", 144.995, -37.788, "station",
                   {"publicPrimary": ["Clifton Hill PS"], "publicSecondary": ["Nonexistent High"]}),
        mod.Anchor("sunbury-house", "Sunbury", 144.72, -37.58, "station",
                   {"privateContext": ["Salesian College Rupertswood"]}),
    ]
    matched, unmatched = mod.match_hint_schools(anchors, locations)
    names = {m["name"] for m in matched}
    assert "Clifton Hill Primary School" in names
    assert "Salesian College Rupertswood" in names
    assert unmatched == [{"areaId": "clifton-hill-2br", "hint": "Nonexistent High", "group": "publicSecondary"}]
    sal = next(m for m in matched if m["name"] == "Salesian College Rupertswood")
    assert sal["sector"] == "Catholic"


# ---- category / sector mapping ----------------------------------------------
@pytest.mark.parametrize(
    "school_type,group,expected",
    [
        ("Primary", None, "primary"),
        ("Secondary", None, "secondary"),
        ("Pri/Sec", None, "combined"),
        ("Special", None, "specialist"),
        ("unknown", "publicSecondary", "secondary"),
    ],
)
def test_category_for(school_type, group, expected):
    assert mod.category_for(school_type, group) == expected


def test_sector_norm():
    assert mod.sector_norm("Government") == "government"
    assert mod.sector_norm("Catholic") == "catholic"
    assert mod.sector_norm("Independent") == "independent"


# ---- token-subset fallback ---------------------------------------------------
@pytest.fixture()
def insertion_locations():
    df = pd.DataFrame(
        {
            "schoolNo": ["2001", "2002", "2003", "2004"],
            "name": [
                "Keysborough Secondary College",
                "Keysborough Primary School",
                "Mount Alexander 7-12 College",
                "Keysborough Catholic College",
            ],
            "sector": ["Government", "Government", "Government", "Catholic"],
            "schoolType": ["Secondary", "Primary", "Pri/Sec", "Secondary"],
            "lat": [-37.99, -37.98, -37.77, -37.97],
            "lng": [145.17, 145.16, 144.92, 145.15],
            "postcode": ["3173"] * 4,
            "town": ["Keysborough", "Keysborough", "Flemington", "Keysborough"],
        }
    )
    df["normName"] = df["name"].map(mod.norm_name)
    return df


def test_token_subset_matches_insertion_names(insertion_locations):
    anchors = [
        mod.Anchor("se-value-corridor", "Keysborough", 145.17, -37.99, "station",
                   {"publicSecondary": ["Keysborough College"]}),
        mod.Anchor("inner-lowcar-benchmark", "Flemington", 144.92, -37.77, "station",
                   {"publicSecondary": ["Mount Alexander College"]}),
    ]
    matched, unmatched = mod.match_hint_schools(anchors, insertion_locations)
    assert unmatched == []
    names = {m["name"] for m in matched}
    # sector guard keeps the Catholic near-namesake out; category guard keeps
    # the primary out; Pri/Sec is admissible for a secondary hint
    assert names == {"Keysborough Secondary College", "Mount Alexander 7-12 College"}


def test_token_subset_never_invents(insertion_locations):
    anchors = [mod.Anchor("balaclava-2br", "Balaclava", 144.99, -37.87, "station",
                          {"publicPrimary": ["Balaclava PS"]})]
    matched, unmatched = mod.match_hint_schools(anchors, insertion_locations)
    assert matched == []
    assert len(unmatched) == 1
