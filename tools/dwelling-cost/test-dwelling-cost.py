import importlib.util
import json
import sys
from pathlib import Path

import pandas as pd


MODULE_PATH = Path(__file__).with_name("build-dwelling-cost.py")
SPEC = importlib.util.spec_from_file_location("dwelling_cost", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def config():
    return json.loads(Path(__file__).with_name("dwelling-cost-config.json").read_text())


def test_tidy_vgv_rows_build_a_bounded_record():
    raw = pd.DataFrame(
        [
            ["Suburb", "Property type", "Year", "Median price", "No. of sales"],
            ["Example", "unit", 2025, "$720,000", 80],
        ]
    )
    observations = MODULE.parse_table(
        raw, path=Path("units.csv"), sheet="csv", config=config()
    )
    targets = {
        "records": [
            {
                "id": "example-2br",
                "displayName": "Example",
                "salComponents": [{"suburb": "Example"}],
            }
        ]
    }
    records = MODULE.build_records(targets, observations, config())
    metric = records[0]["prices"]["unit"]["all"]
    assert metric["medianPrice"] == 720000
    assert metric["salesPerYear"] == 80
    assert metric["evidence"]["bedroomSpecific"] is False
    assert 0 <= metric["defaultAffordabilityScore"] <= 10
    assert 0 <= metric["availabilityScore"] <= 10


def test_year_matrix_sheet_yields_latest_median_and_marker():
    # Mirrors the published VGV houses/units-by-suburb workbooks: no metric
    # labels, a Locality column, one column per year with an unlabelled
    # footnote-marker column after each, then Prelim and growth columns.
    raw = pd.DataFrame(
        [
            [None, None, None, None, None, None, None, None],
            ["Locality", "2024", None, "2025", None, "Prelim", "24-25", "PA"],
            [None, None, None, None, None, None, None, None],
            [None, None, None, None, None, None, None, None],
            [None, None, None, None, None, None, None, None],
            ["EXAMPLE", "$700,000", " ", "$720,000", "^", "710000", "3", "1.2"],
            ["STALE ONLY", "$500,000", " ", "-", " ", None, None, None],
        ]
    )
    observations = MODULE.parse_table(
        raw, path=Path("units-by-suburb-2015-2025.xlsx"), sheet="Sheet1", config=config()
    )
    targets = {
        "records": [
            {
                "id": "example-2br",
                "displayName": "Example",
                "salComponents": [{"suburb": "Example"}],
            },
            {
                "id": "stale-only-2br",
                "displayName": "Stale Only",
                "salComponents": [{"suburb": "Stale Only"}],
            },
        ]
    }
    records = MODULE.build_records(targets, observations, config())
    by_id = {record["id"]: record for record in records}
    example = by_id["example-2br"]["prices"]["unit"]["all"]
    assert example["medianPrice"] == 720000
    assert example["salesPerYear"] is None
    assert example["evidence"]["latestYear"] == 2025
    assert example["evidence"]["lowSampleMarkers"] == {"Example": "^"}
    # A blank latest year falls back to the newest year that has a value,
    # and the source year stays visible in evidence.
    stale = by_id["stale-only-2br"]["prices"]["unit"]["all"]
    assert stale["medianPrice"] == 500000
    assert stale["evidence"]["latestYear"] == 2024


def test_missing_vgv_data_stays_absent():
    targets = {
        "records": [
            {
                "id": "missing-2br",
                "displayName": "Missing",
                "salComponents": [{"suburb": "Missing"}],
            }
        ]
    }
    assert MODULE.build_records(targets, [], config()) == []


def test_affordability_is_monotonic():
    assert MODULE.affordability_score(300000, 900000) >= MODULE.affordability_score(675000, 900000)
    assert MODULE.affordability_score(675000, 900000) > MODULE.affordability_score(1000000, 900000)


def test_affordability_uses_strict_full_range_anchors():
    assert MODULE.affordability_score(495000, 900000) == 10
    assert MODULE.affordability_score(585000, 900000) == 8
    assert MODULE.affordability_score(675000, 900000) == 5
    assert MODULE.affordability_score(765000, 900000) == 2
    assert MODULE.affordability_score(900000, 900000) == 0


def test_tidy_bedroom_rows_stay_separate_from_all_unit_proxy():
    raw = pd.DataFrame(
        [
            ["Suburb", "Property type", "Bedrooms", "Year", "Median price", "No. of sales"],
            ["Example", "unit", None, 2025, 600000, 100],
            ["Example", "unit", 1, 2025, 450000, 40],
            ["Example", "unit", 2, 2025, 680000, 60],
        ]
    )
    observations = MODULE.parse_table(
        raw, path=Path("bedroom-sales.csv"), sheet="csv", config=config()
    )
    targets = {
        "records": [
            {
                "id": "example-2br",
                "displayName": "Example",
                "salComponents": [{"suburb": "Example"}],
            }
        ]
    }
    prices = MODULE.build_records(targets, observations, config())[0]["prices"]["unit"]
    assert prices["all"]["medianPrice"] == 600000
    assert prices["1"]["medianPrice"] == 450000
    assert prices["2"]["medianPrice"] == 680000
    assert prices["2"]["evidence"]["bedroomSpecific"] is True


def test_domain_display_price_parser_uses_range_midpoint():
    assert MODULE.advertised_price({"priceDetails": {"displayPrice": "$600k–$700k"}}) == 650000
    assert MODULE.advertised_price({"priceDetails": {"displayPrice": "Contact agent"}}) is None
