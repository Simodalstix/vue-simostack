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
