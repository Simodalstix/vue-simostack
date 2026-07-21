from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

import geopandas as gpd
import pandas as pd
from shapely.geometry import Point, box


MODULE_PATH = Path(__file__).with_name("build-dwelling-greenspace.py")
SPEC = importlib.util.spec_from_file_location("greenspace_pipeline", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules["greenspace_pipeline"] = MODULE
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


def test_local_coverage_target_caps_at_ten():
    assert MODULE.local_access_score(95.0, 95.0) == 10.0
    assert MODULE.local_access_score(100.0, 95.0) == 10.0
    assert MODULE.local_access_score(47.5, 95.0) == 5.0


def test_distance_score_interpolates():
    distances = pd.Series([0, 400, 600, 800, 1200, 1600, 2400, 3000])
    scores = MODULE.interpolate_distance_score(
        distances,
        MODULE.DEFAULT_CONFIG["distanceScoreKnots"],
    )
    assert scores.tolist() == [10.0, 10.0, 9.0, 8.0, 6.0, 4.0, 0.0, 0.0]


def test_weighted_share_uses_population_weights():
    condition = pd.Series([True, False])
    weights = pd.Series([90.0, 10.0])
    assert MODULE.weighted_share(condition, weights) == 0.9


def test_weighted_median_uses_population_weights():
    values = pd.Series([100.0, 1000.0])
    weights = pd.Series([90.0, 10.0])
    assert MODULE.weighted_median(values, weights) == 100.0


def test_component_weights_sum_to_one():
    weights = MODULE.DEFAULT_CONFIG["componentWeights"]
    assert round(sum(weights.values()), 10) == 1.0


def test_target_file_matches_current_94_record_registry():
    payload, records = MODULE.load_targets(
        Path(__file__).with_name("dwelling-greenspace-targets.json")
    )
    assert payload["recordCount"] == 94
    assert len(records) == 94
    assert len({record["id"] for record in records}) == 94


def test_load_targets_normalises_sal_prefixes(tmp_path):
    target_path = tmp_path / "targets.json"
    target_path.write_text(
        json.dumps(
            {
                "records": [
                    {
                        "id": "demo",
                        "displayName": "Demo",
                        "salComponents": [
                            {
                                "suburb": "Demo",
                                "salCode": "SAL12345",
                                "censusPopulation2021": 100,
                            }
                        ],
                        "censusPopulation2021": 100,
                    }
                ]
            }
        ),
        encoding="utf-8",
    )
    _, records = MODULE.load_targets(target_path)
    assert records[0]["salComponents"][0]["salCode"] == "12345"


def test_load_open_space_uses_source_crs_bbox(monkeypatch):
    sal = gpd.GeoDataFrame(
        {"salCode": ["1"]},
        geometry=[box(144.9, -37.9, 145.0, -37.8)],
        crs="EPSG:4326",
    )
    captured = {}

    def fake_read_info(_path):
        return {"crs": "EPSG:3857"}

    def fake_read_file(_path, *, bbox, engine):
        captured["bbox"] = bbox
        captured["engine"] = engine
        return gpd.GeoDataFrame(
            {
                "OS_CATEGOR": [],
                "OS_CATEG_2": [],
                "OS_STATUS": [],
                "OS_ACCESS": [],
                "OS_TYPE": [],
                "PARK_NAME": [],
                "WATER_BODY": [],
                "COASTAL": [],
            },
            geometry=[],
            crs="EPSG:3857",
        )

    monkeypatch.setattr(MODULE.pyogrio, "read_info", fake_read_info)
    monkeypatch.setattr(MODULE.gpd, "read_file", fake_read_file)

    MODULE.load_open_space(Path("dummy.geojson"), sal)

    assert captured["engine"] == "pyogrio"
    assert abs(captured["bbox"][0]) > 1_000_000


def test_combined_records_pool_samples_instead_of_averaging_scores():
    sal = gpd.GeoDataFrame(
        {"salCode": ["A", "B"]},
        geometry=[
            box(0, 0, 100, 100),
            box(3000, 0, 3100, 100),
        ],
        crs=MODULE.ANALYSIS_CRS,
    )
    samples = gpd.GeoDataFrame(
        {
            "salCode": ["A", "B"],
            "populationWeight": [90.0, 10.0],
        },
        geometry=[Point(50, 50), Point(3050, 50)],
        crs=MODULE.ANALYSIS_CRS,
    )
    local_features = gpd.GeoDataFrame(
        {
            "name": ["Local A", "Local B"],
            "lga": ["X", "Y"],
            "calculatedAreaHa": [1.0, 1.0],
        },
        geometry=[Point(50, 50).buffer(80), Point(3050, 50).buffer(80)],
        crs=MODULE.ANALYSIS_CRS,
    )
    major_features = gpd.GeoDataFrame(
        {"calculatedAreaHa": [6.0]},
        geometry=[Point(50, 50).buffer(120)],
        crs=MODULE.ANALYSIS_CRS,
    )
    nature_features = local_features.copy()
    targets = [
        {
            "id": "a",
            "displayName": "A",
            "salComponents": [{"suburb": "A", "salCode": "A"}],
            "censusPopulation2021": 90,
        },
        {
            "id": "b",
            "displayName": "B",
            "salComponents": [{"suburb": "B", "salCode": "B"}],
            "censusPopulation2021": 10,
        },
        {
            "id": "combined",
            "displayName": "A/B",
            "salComponents": [
                {"suburb": "A", "salCode": "A"},
                {"suburb": "B", "salCode": "B"},
            ],
            "censusPopulation2021": 100,
        },
    ]

    records, _ = MODULE.build_records(
        targets,
        sal,
        samples,
        local_features,
        major_features,
        nature_features,
        MODULE.DEFAULT_CONFIG,
    )
    by_id = {record["id"]: record for record in records}
    a_major = by_id["a"]["greenspaceComponents"]["majorParkAccess"]
    b_major = by_id["b"]["greenspaceComponents"]["majorParkAccess"]
    combined_major = by_id["combined"]["greenspaceComponents"]["majorParkAccess"]

    assert a_major == 10.0
    assert b_major == 0.0
    assert round((a_major + b_major) / 2.0, 4) == 5.0
    assert combined_major == 9.0


def test_accessible_local_open_space_excludes_private_and_unsuitable_land():
    source = gpd.GeoDataFrame(
        {
            "category": [
                "Parks and gardens",
                "Sportsfields and organised recreation",
                "Transport reservations",
                "Natural and semi-natural open space",
                "Parks and gardens",
            ],
            "subcategory": [
                "Not applicable",
                "Golf course",
                "Median park",
                "Not applicable",
                "Not applicable",
            ],
            "status": ["Existing"] * 5,
            "access": ["Open"] * 5,
            "type": [
                "Public open space",
                "Private open space",
                "Public open space",
                "Public open space",
                "Public open space",
            ],
            "water": ["", "", "", "", "River"],
            "coastal": ["", "", "", "", ""],
            "name": ["Usable park", "Private golf", "Median strip", "Usable bushland", "Water only"],
            "calculatedAreaHa": [1.0] * 5,
        },
        geometry=[Point(i * 20, 0).buffer(5) for i in range(5)],
        crs=MODULE.ANALYSIS_CRS,
    )

    filtered = MODULE.accessible_local_open_space(source, minimum_area_ha=0.05)
    assert filtered["name"].tolist() == ["Usable park", "Usable bushland"]
