from __future__ import annotations

import importlib.util
import json
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


MODULE_PATH = Path(__file__).with_name("build-dwelling-safety.py")
SPEC = importlib.util.spec_from_file_location("dwelling_safety", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def config():
    return json.loads(
        Path(__file__).with_name("dwelling-safety-config.json").read_text()
    )


def offence(
    *,
    division="A Crimes against the person",
    subdivision="A20 Assault and related offences",
    subgroup="A211 FV Serious assault",
    count=1,
    year=2026,
    suburb="Example",
    lga="Example LGA",
):
    return MODULE.OffenceRow(
        year=year,
        lga=lga,
        suburb=suburb,
        division=division,
        subdivision=subdivision,
        subgroup=subgroup,
        count=count,
    )


def column_name(index):
    result = ""
    while index:
        index, remainder = divmod(index - 1, 26)
        result = chr(ord("A") + remainder) + result
    return result


def sheet_xml(rows):
    rendered_rows = []
    for row_number, row in enumerate(rows, start=1):
        cells = []
        for column, value in enumerate(row, start=1):
            reference = f"{column_name(column)}{row_number}"
            if isinstance(value, (int, float)):
                cells.append(f'<c r="{reference}"><v>{value}</v></c>')
            else:
                cells.append(
                    f'<c r="{reference}" t="inlineStr"><is><t>{escape(str(value))}</t></is></c>'
                )
        rendered_rows.append(f'<row r="{row_number}">{"".join(cells)}</row>')
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<sheetData>{"".join(rendered_rows)}</sheetData></worksheet>'
    )


def write_test_workbook(path, sheets):
    workbook_sheets = []
    relationships = []
    with zipfile.ZipFile(path, "w") as archive:
        for index, (name, rows) in enumerate(sheets.items(), start=1):
            workbook_sheets.append(
                f'<sheet name="{escape(name)}" sheetId="{index}" r:id="rId{index}"/>'
            )
            relationships.append(
                f'<Relationship Id="rId{index}" '
                'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
                f'Target="worksheets/sheet{index}.xml"/>'
            )
            archive.writestr(f"xl/worksheets/sheet{index}.xml", sheet_xml(rows))
        archive.writestr(
            "xl/workbook.xml",
            '<?xml version="1.0" encoding="UTF-8"?>'
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            f'<sheets>{"".join(workbook_sheets)}</sheets></workbook>',
        )
        archive.writestr(
            "xl/_rels/workbook.xml.rels",
            '<?xml version="1.0" encoding="UTF-8"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f'{"".join(relationships)}</Relationships>',
        )


class SafetyPipelineTests(unittest.TestCase):
    def test_candidate_baskets_include_only_the_configured_risk_types(self):
        baskets = config()["baskets"]
        cases = [
            (offence(), "person"),
            (
                offence(
                    subgroup="A22 Assault police, emergency services or other authorised officer"
                ),
                None,
            ),
            (
                offence(
                    subdivision="A80 Dangerous and negligent acts endangering people",
                    subgroup="A81 Dangerous driving",
                ),
                None,
            ),
            (
                offence(
                    division="B Property and deception offences",
                    subdivision="B30 Burglary/Break and enter",
                    subgroup="B311 Residential aggravated burglary",
                ),
                "burglary",
            ),
            (
                offence(
                    division="B Property and deception offences",
                    subdivision="B30 Burglary/Break and enter",
                    subgroup="B322 Non-residential non-aggravated burglary",
                ),
                None,
            ),
            (
                offence(
                    division="B Property and deception offences",
                    subdivision="B40 Theft",
                    subgroup="B41 Motor vehicle theft",
                ),
                "vehicle",
            ),
            (
                offence(
                    division="B Property and deception offences",
                    subdivision="B20 Property damage",
                    subgroup="B21 Criminal damage",
                ),
                "damage",
            ),
            (
                offence(
                    division="B Property and deception offences",
                    subdivision="B40 Theft",
                    subgroup="B43 Steal from a retail store",
                ),
                None,
            ),
        ]
        self.assertEqual(
            [MODULE.basket_key_for(row, baskets) for row, _ in cases],
            [expected for _, expected in cases],
        )

    def test_percentiles_average_ties_and_keep_nulls(self):
        result = MODULE.percentile_ranks(
            {"low": 10.0, "tie-a": 20.0, "tie-b": 20.0, "high": 40.0, "null": None}
        )
        self.assertEqual(result["low"], 0)
        self.assertEqual(result["high"], 1)
        self.assertAlmostEqual(result["tie-a"], 0.5)
        self.assertEqual(result["tie-a"], result["tie-b"])
        self.assertIsNone(result["null"])

    def test_smoothing_pulls_a_small_area_toward_the_cohort_rate(self):
        rate = MODULE.smoothed_rate(
            count=100,
            exposure=1_000,
            cohort_rate_per_person_year=0.01,
            prior_exposure=10_000,
            scale=100_000,
        )
        raw_rate = 100 / 1_000 * 100_000
        cohort_rate = 0.01 * 100_000
        self.assertGreater(rate, cohort_rate)
        self.assertLess(rate, raw_rate)

    def test_lga_growth_factor_averages_split_suburb_lgas(self):
        factor = MODULE.inferred_growth_factor(
            "example",
            2026,
            {"example": {"Alpha", "Beta"}},
            {
                ("alpha", 2021): 100,
                ("alpha", 2026): 120,
                ("beta", 2021): 100,
                ("beta", 2026): 140,
            },
            2021,
        )
        self.assertAlmostEqual(factor, 1.3)

    def test_streaming_reader_validates_and_reads_required_sheets(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "fixture.xlsx"
            write_test_workbook(
                path,
                {
                    "Table 01": [
                        [
                            "Year",
                            "Local Government Area",
                            "Offence Count",
                            "Rate per 100,000 population",
                        ],
                        [2021, "Example LGA", 100, 1000],
                        [2026, "Example LGA", 120, 1000],
                    ],
                    "Table 03": [
                        [
                            "Year",
                            "Local Government Area",
                            "Suburb/Town Name",
                            "Offence Division",
                            "Offence Subdivision",
                            "Offence Subgroup",
                            "Offence Count",
                        ],
                        [
                            2026,
                            "Example LGA",
                            "Example",
                            "A Crimes against the person",
                            "A20 Assault and related offences",
                            "A211 FV Serious assault",
                            4,
                        ],
                    ],
                },
            )
            with MODULE.StreamingWorkbook(path) as workbook:
                populations, rows_read = MODULE.parse_lga_populations(
                    workbook, "Table 01"
                )
                rows, lgas, years, source_rows = MODULE.parse_suburb_offences(
                    workbook,
                    "Table 03",
                    target_suburbs={"example"},
                    analysis_years={2026},
                )
            self.assertEqual(rows_read, 2)
            self.assertEqual(populations[("example lga", 2021)], 10_000)
            self.assertEqual(populations[("example lga", 2026)], 12_000)
            self.assertEqual(rows[0].count, 4)
            self.assertEqual(lgas["example"], {"Example LGA"})
            self.assertEqual(years, {2026})
            self.assertEqual(source_rows, 1)

    def test_build_audit_produces_complete_bounded_candidate_scores(self):
        targets = {
            "records": [
                {
                    "id": "alpha",
                    "displayName": "Alpha",
                    "salComponents": [
                        {
                            "suburb": "Alpha",
                            "salCode": "1",
                            "censusPopulation2021": 10_000,
                        }
                    ],
                    "censusPopulation2021": 10_000,
                },
                {
                    "id": "beta",
                    "displayName": "Beta",
                    "salComponents": [
                        {
                            "suburb": "Beta",
                            "salCode": "2",
                            "censusPopulation2021": 10_000,
                        }
                    ],
                    "censusPopulation2021": 10_000,
                },
            ]
        }
        rows = []
        for year in (2024, 2025, 2026):
            rows.extend(
                [
                    offence(suburb="Alpha", lga="Alpha LGA", year=year, count=10),
                    offence(suburb="Beta", lga="Beta LGA", year=year, count=20),
                ]
            )
            for subgroup, basket_count in (
                ("B311 Residential aggravated burglary", 3),
                ("B41 Motor vehicle theft", 4),
                ("B21 Criminal damage", 5),
            ):
                subdivision = (
                    "B30 Burglary/Break and enter"
                    if subgroup.startswith("B31")
                    else "B40 Theft"
                    if subgroup.startswith("B4")
                    else "B20 Property damage"
                )
                for suburb, lga, multiple in (
                    ("Alpha", "Alpha LGA", 1),
                    ("Beta", "Beta LGA", 2),
                ):
                    rows.append(
                        offence(
                            suburb=suburb,
                            lga=lga,
                            year=year,
                            division="B Property and deception offences",
                            subdivision=subdivision,
                            subgroup=subgroup,
                            count=basket_count * multiple,
                        )
                    )
        populations = {}
        for lga in ("alpha lga", "beta lga"):
            populations[(lga, 2021)] = 10_000
            populations[(lga, 2024)] = 10_500
            populations[(lga, 2025)] = 11_000
            populations[(lga, 2026)] = 11_500
        records, stats = MODULE.build_audit(
            targets,
            rows,
            {"alpha": {"Alpha LGA"}, "beta": {"Beta LGA"}},
            populations,
            config(),
        )
        by_id = {record["id"]: record for record in records}
        self.assertGreater(by_id["alpha"]["candidateSafetyScore"], by_id["beta"]["candidateSafetyScore"])
        self.assertEqual(by_id["alpha"]["candidateRank"], 1)
        self.assertEqual(by_id["beta"]["candidateRank"], 2)
        self.assertTrue(
            all(0 <= record["candidateSafetyScore"] <= 10 for record in records)
        )
        self.assertEqual(stats["targetRecordCount"], 2)

    def test_checked_in_audit_is_complete_and_explicitly_non_runtime(self):
        audit_path = (
            Path(__file__).with_name("generated") / "dwelling-safety-audit.json"
        )
        audit = json.loads(audit_path.read_text())
        targets = json.loads(
            (
                Path(__file__).parents[1]
                / "dwelling-greenspace"
                / "dwelling-greenspace-targets.json"
            ).read_text()
        )
        self.assertEqual(audit["status"], "audit-only")
        self.assertEqual(audit["liveRankingImpact"], 0)
        self.assertEqual(len(audit["records"]), targets["recordCount"])
        self.assertTrue(
            all(record["candidateSafetyScore"] is not None for record in audit["records"])
        )
        self.assertTrue(
            all(
                all(
                    row_number > 1
                    for rows in record["evidence"]["basketSourceRows"].values()
                    for row_number in rows
                )
                for record in audit["records"]
            )
        )


if __name__ == "__main__":
    unittest.main()
