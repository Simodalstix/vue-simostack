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
    assert records[0]["medianPrice2br"] == 720000
    assert records[0]["salesPerYear"] == 80
    assert 0 <= records[0]["headroomScore"] <= 10
    assert 0 <= records[0]["liquidityScore"] <= 10
    assert records[0]["costScore"] == round(
        0.7 * records[0]["headroomScore"]
        + 0.3 * records[0]["liquidityScore"],
        4,
    )


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
    assert by_id["example-2br"]["medianPrice2br"] == 720000
    assert by_id["example-2br"]["salesPerYear"] is None
    assert by_id["example-2br"]["evidence"]["latestYear"] == 2025
    assert by_id["example-2br"]["evidence"]["lowSampleMarkers"] == {"Example": "^"}
    # A blank latest year falls back to the newest year that has a value,
    # and the source year stays visible in evidence.
    assert by_id["stale-only-2br"]["medianPrice2br"] == 500000
    assert by_id["stale-only-2br"]["evidence"]["latestYear"] == 2024


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


def test_headroom_rewards_credible_stock_not_absolute_cheapness():
    assert MODULE.headroom_score(675000, 900000) > MODULE.headroom_score(300000, 900000)
    assert MODULE.headroom_score(675000, 900000) > MODULE.headroom_score(1000000, 900000)
