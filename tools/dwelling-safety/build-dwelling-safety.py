#!/usr/bin/env python3
"""Build an audit-only candidate Safety model from the CSA LGA workbook.

The script intentionally writes no runtime dataset and changes no live Settle
weights. It produces provenance, QA, outlier and sensitivity artifacts for
owner review before any scoring-layer integration.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import re
import statistics
import zipfile
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import date
from itertools import chain
from pathlib import Path
from typing import Any, Iterable, Iterator
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
DEFAULT_TARGETS = ROOT / "tools/dwelling-greenspace/dwelling-greenspace-targets.json"
DEFAULT_CONFIG = TOOL_DIR / "dwelling-safety-config.json"
DEFAULT_OUT_DIR = TOOL_DIR / "generated"
SHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
DOC_REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"


@dataclass(frozen=True)
class OffenceRow:
    year: int
    lga: str
    suburb: str
    division: str
    subdivision: str
    subgroup: str
    count: int
    source_row: int | None = None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--retrieved-at", type=date.fromisoformat, required=True)
    parser.add_argument("--targets", type=Path, default=DEFAULT_TARGETS)
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT_DIR)
    return parser.parse_args()


def clean(value: Any) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def normalise(value: Any) -> str:
    return clean(value).casefold()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def display_path(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path.resolve())


def validate_config(config: dict[str, Any]) -> None:
    baskets = config.get("baskets", [])
    if not baskets:
        raise ValueError("Config must define at least one candidate basket.")
    keys = [basket["key"] for basket in baskets]
    if len(set(keys)) != len(keys):
        raise ValueError("Candidate basket keys must be unique.")
    total_weight = sum(float(basket["weight"]) for basket in baskets)
    if not math.isclose(total_weight, 1.0, abs_tol=1e-9):
        raise ValueError(f"Candidate basket weights must sum to 1, got {total_weight}.")
    years = config["analysis"]["years"]
    if sorted(set(years)) != years or len(years) < 2:
        raise ValueError("Analysis years must be a sorted unique multi-year window.")
    prior = config["analysis"]["smoothingPriorPersonYears"]
    if prior <= 0:
        raise ValueError("Smoothing prior exposure must be positive.")


def column_number(reference: str) -> int:
    match = re.match(r"([A-Z]+)", reference)
    if not match:
        raise ValueError(f"Invalid XLSX cell reference: {reference!r}")
    result = 0
    for char in match.group(1):
        result = result * 26 + ord(char) - ord("A") + 1
    return result


class StreamingWorkbook:
    """Minimal streaming XLSX reader using only the Python standard library."""

    def __init__(self, path: Path):
        if not path.is_file():
            raise FileNotFoundError(f"Source workbook not found: {path}")
        if not zipfile.is_zipfile(path):
            raise ValueError(f"Source is not a valid XLSX ZIP archive: {path}")
        self.path = path
        self.archive = zipfile.ZipFile(path)
        self.shared_strings = self._load_shared_strings()
        self.sheet_paths = self._load_sheet_paths()

    def close(self) -> None:
        self.archive.close()

    def __enter__(self) -> "StreamingWorkbook":
        return self

    def __exit__(self, *_: Any) -> None:
        self.close()

    @staticmethod
    def _text_content(element: ET.Element | None) -> str:
        return "" if element is None else "".join(element.itertext())

    def _load_shared_strings(self) -> list[str]:
        path = "xl/sharedStrings.xml"
        if path not in self.archive.namelist():
            return []
        root = ET.parse(self.archive.open(path)).getroot()
        return [
            clean(self._text_content(item))
            for item in root.findall(f"{{{SHEET_NS}}}si")
        ]

    def _load_sheet_paths(self) -> dict[str, str]:
        rels = ET.parse(self.archive.open("xl/_rels/workbook.xml.rels")).getroot()
        targets = {
            rel.attrib["Id"]: rel.attrib["Target"]
            for rel in rels.findall(f"{{{REL_NS}}}Relationship")
        }
        workbook = ET.parse(self.archive.open("xl/workbook.xml")).getroot()
        result = {}
        for sheet in workbook.findall(f"{{{SHEET_NS}}}sheets/{{{SHEET_NS}}}sheet"):
            target = targets[sheet.attrib[DOC_REL]].lstrip("/")
            if not target.startswith("xl/"):
                target = f"xl/{target}"
            result[clean(sheet.attrib["name"])] = target
        return result

    def _cell_value(self, cell: ET.Element) -> str:
        value = cell.find(f"{{{SHEET_NS}}}v")
        cell_type = cell.attrib.get("t")
        if cell_type == "s" and value is not None:
            return self.shared_strings[int(value.text or "0")]
        if cell_type == "inlineStr":
            return clean(self._text_content(cell.find(f"{{{SHEET_NS}}}is")))
        return clean(value.text if value is not None else "")

    def rows(self, sheet_name: str) -> Iterator[dict[str, str]]:
        path = self.sheet_paths.get(sheet_name)
        if not path:
            raise KeyError(
                f"Missing worksheet {sheet_name!r}; found {sorted(self.sheet_paths)}"
            )
        headers: dict[int, str] | None = None
        with self.archive.open(path) as stream:
            for _, row in ET.iterparse(stream, events=("end",)):
                if row.tag != f"{{{SHEET_NS}}}row":
                    continue
                row_number = int(row.attrib.get("r", "0"))
                cells = {
                    column_number(cell.attrib["r"]): self._cell_value(cell)
                    for cell in row.findall(f"{{{SHEET_NS}}}c")
                    if cell.attrib.get("r")
                }
                row.clear()
                if headers is None:
                    headers = {
                        column: clean(value) for column, value in cells.items() if value
                    }
                    continue
                yield {
                    header: cells.get(column, "")
                    for column, header in headers.items()
                } | {"__rowNumber": str(row_number)}


def require_headers(
    first_row: dict[str, str] | None,
    required: set[str],
    sheet_name: str,
) -> None:
    found = set(first_row or {})
    missing = required - found
    if missing:
        raise ValueError(
            f"{sheet_name} is missing required columns {sorted(missing)}; "
            f"found {sorted(found)}"
        )


def integer(value: str, label: str) -> int:
    try:
        number = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"Expected numeric {label}, got {value!r}") from exc
    if not number.is_integer():
        raise ValueError(f"Expected integer {label}, got {value!r}")
    return int(number)


def number(value: str, label: str) -> float:
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"Expected numeric {label}, got {value!r}") from exc
    if not math.isfinite(result):
        raise ValueError(f"Expected finite {label}, got {value!r}")
    return result


def parse_lga_populations(
    workbook: StreamingWorkbook,
    sheet_name: str,
) -> tuple[dict[tuple[str, int], float], int]:
    required = {
        "Year",
        "Local Government Area",
        "Offence Count",
        "Rate per 100,000 population",
    }
    populations: dict[tuple[str, int], list[float]] = defaultdict(list)
    row_count = 0
    iterator = workbook.rows(sheet_name)
    try:
        first = next(iterator)
    except StopIteration:
        first = None
    require_headers(first, required, sheet_name)
    for row in chain([first] if first else [], iterator):
        year_text = row.get("Year", "")
        lga = clean(row.get("Local Government Area"))
        count_text = row.get("Offence Count", "")
        rate_text = row.get("Rate per 100,000 population", "")
        if (
            not year_text
            or not lga
            or lga.casefold() == "total"
            or not count_text
            or not rate_text
        ):
            continue
        row_count += 1
        count = number(count_text, "LGA offence count")
        rate = number(rate_text, "LGA rate")
        if count <= 0 or rate <= 0:
            continue
        year = integer(year_text, "LGA year")
        populations[(normalise(lga), year)].append(count / rate * 100_000)
    return {
        key: statistics.median(values) for key, values in populations.items()
    }, row_count


def parse_suburb_offences(
    workbook: StreamingWorkbook,
    sheet_name: str,
    *,
    target_suburbs: set[str],
    analysis_years: set[int],
) -> tuple[list[OffenceRow], dict[str, set[str]], set[int], int]:
    required = {
        "Year",
        "Local Government Area",
        "Suburb/Town Name",
        "Offence Division",
        "Offence Subdivision",
        "Offence Subgroup",
        "Offence Count",
    }
    rows: list[OffenceRow] = []
    lgas_by_suburb: dict[str, set[str]] = defaultdict(set)
    available_years: set[int] = set()
    source_row_count = 0
    iterator = workbook.rows(sheet_name)
    try:
        first = next(iterator)
    except StopIteration:
        first = None
    require_headers(first, required, sheet_name)
    for row in chain([first] if first else [], iterator):
        source_row_count += 1
        year_text = row.get("Year", "")
        if not year_text:
            continue
        year = integer(year_text, "suburb offence year")
        available_years.add(year)
        suburb = clean(row.get("Suburb/Town Name"))
        suburb_key = normalise(suburb)
        if suburb_key not in target_suburbs or year not in analysis_years:
            continue
        lga = clean(row.get("Local Government Area"))
        lgas_by_suburb[suburb_key].add(lga)
        rows.append(
            OffenceRow(
                year=year,
                lga=lga,
                suburb=suburb,
                division=clean(row.get("Offence Division")),
                subdivision=clean(row.get("Offence Subdivision")),
                subgroup=clean(row.get("Offence Subgroup")),
                count=integer(row.get("Offence Count", ""), "suburb offence count"),
                source_row=integer(row["__rowNumber"], "suburb source row"),
            )
        )
    return rows, lgas_by_suburb, available_years, source_row_count


def starts_with_any(value: str, prefixes: Iterable[str]) -> bool:
    return any(value.startswith(prefix) for prefix in prefixes)


def basket_key_for(row: OffenceRow, baskets: list[dict[str, Any]]) -> str | None:
    for basket in baskets:
        division_prefixes = basket.get("includeDivisionPrefixes", [])
        subdivision_prefixes = basket.get("includeSubdivisionPrefixes", [])
        subgroup_prefixes = basket.get("includeSubgroupPrefixes", [])
        include_checks = []
        if division_prefixes:
            include_checks.append(starts_with_any(row.division, division_prefixes))
        if subdivision_prefixes:
            include_checks.append(
                starts_with_any(row.subdivision, subdivision_prefixes)
            )
        if subgroup_prefixes:
            include_checks.append(starts_with_any(row.subgroup, subgroup_prefixes))
        if not include_checks or not all(include_checks):
            continue
        if starts_with_any(
            row.division, basket.get("excludeDivisionPrefixes", [])
        ):
            continue
        if starts_with_any(
            row.subdivision, basket.get("excludeSubdivisionPrefixes", [])
        ):
            continue
        if starts_with_any(
            row.subgroup, basket.get("excludeSubgroupPrefixes", [])
        ):
            continue
        return basket["key"]
    return None


def percentile_ranks(values_by_id: dict[str, float | None]) -> dict[str, float | None]:
    finite = sorted(
        (
            (record_id, value)
            for record_id, value in values_by_id.items()
            if value is not None and math.isfinite(value)
        ),
        key=lambda item: (item[1], item[0]),
    )
    result = {record_id: None for record_id in values_by_id}
    if not finite:
        return result
    if len(finite) == 1:
        result[finite[0][0]] = 0.0
        return result
    start = 0
    while start < len(finite):
        end = start + 1
        while end < len(finite) and math.isclose(
            finite[end][1], finite[start][1], rel_tol=0, abs_tol=1e-12
        ):
            end += 1
        average_rank = (start + end - 1) / 2
        percentile = average_rank / (len(finite) - 1)
        for index in range(start, end):
            result[finite[index][0]] = percentile
        start = end
    return result


def smoothed_rate(
    count: int,
    exposure: float | None,
    cohort_rate_per_person_year: float | None,
    prior_exposure: float,
    scale: float,
) -> float | None:
    if (
        exposure is None
        or exposure <= 0
        or cohort_rate_per_person_year is None
        or cohort_rate_per_person_year < 0
    ):
        return None
    return (
        (count + cohort_rate_per_person_year * prior_exposure)
        / (exposure + prior_exposure)
        * scale
    )


def inferred_growth_factor(
    suburb_key: str,
    year: int,
    lgas_by_suburb: dict[str, set[str]],
    lga_populations: dict[tuple[str, int], float],
    base_year: int,
) -> float | None:
    factors = []
    for lga in sorted(lgas_by_suburb.get(suburb_key, set())):
        lga_key = normalise(lga)
        base = lga_populations.get((lga_key, base_year))
        current = lga_populations.get((lga_key, year))
        if base and current:
            factors.append(current / base)
    return statistics.fmean(factors) if factors else None


def build_audit(
    targets: dict[str, Any],
    offence_rows: list[OffenceRow],
    lgas_by_suburb: dict[str, set[str]],
    lga_populations: dict[tuple[str, int], float],
    config: dict[str, Any],
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    analysis = config["analysis"]
    years = analysis["years"]
    year_set = set(years)
    base_year = analysis["populationBaseYear"]
    scale = float(analysis["rateScale"])
    prior_exposure = float(analysis["smoothingPriorPersonYears"])
    baskets = config["baskets"]
    basket_keys = [basket["key"] for basket in baskets]

    component_to_record: dict[str, str] = {}
    target_by_id = {}
    for target in targets["records"]:
        target_by_id[target["id"]] = target
        for component in target["salComponents"]:
            key = normalise(component["suburb"])
            if key in component_to_record:
                raise ValueError(
                    f"Suburb component {component['suburb']} occurs in multiple targets."
                )
            component_to_record[key] = target["id"]

    counts: dict[str, Counter[str]] = {
        target["id"]: Counter() for target in targets["records"]
    }
    source_rows: dict[str, dict[str, list[int]]] = {
        target["id"]: {key: [] for key in basket_keys}
        for target in targets["records"]
    }
    matched_rows = 0
    excluded_count = 0
    for row in offence_rows:
        record_id = component_to_record.get(normalise(row.suburb))
        if not record_id or row.year not in year_set:
            continue
        basket_key = basket_key_for(row, baskets)
        if basket_key:
            counts[record_id][basket_key] += row.count
            if row.source_row is not None:
                source_rows[record_id][basket_key].append(row.source_row)
            matched_rows += 1
        else:
            excluded_count += row.count

    records: list[dict[str, Any]] = []
    for target in targets["records"]:
        baseline_exposure = float(target["censusPopulation2021"] * len(years))
        adjusted_exposure = 0.0
        adjusted_complete = True
        component_evidence = []
        for component in target["salComponents"]:
            suburb_key = normalise(component["suburb"])
            yearly_factors = {}
            for year in years:
                factor = inferred_growth_factor(
                    suburb_key,
                    year,
                    lgas_by_suburb,
                    lga_populations,
                    base_year,
                )
                yearly_factors[str(year)] = factor
                if factor is None:
                    adjusted_complete = False
                else:
                    adjusted_exposure += component["censusPopulation2021"] * factor
            component_evidence.append(
                {
                    "suburb": component["suburb"],
                    "salCode": component["salCode"],
                    "censusPopulation2021": component["censusPopulation2021"],
                    "observedLgas": sorted(lgas_by_suburb.get(suburb_key, set())),
                    "lgaGrowthFactors": yearly_factors,
                }
            )
        records.append(
            {
                "id": target["id"],
                "displayName": target["displayName"],
                "components": component_evidence,
                "censusPopulation2021": target["censusPopulation2021"],
                "counts": {
                    key: int(counts[target["id"]][key]) for key in basket_keys
                },
                "evidence": {
                    "sourceTable": config["source"]["sheets"]["suburbOffences"],
                    "sourceColumns": {
                        "year": "A",
                        "lga": "C",
                        "suburb": "E",
                        "division": "F",
                        "subdivision": "G",
                        "subgroup": "H",
                        "count": "I",
                    },
                    "basketSourceRows": {
                        key: sorted(source_rows[target["id"]][key])
                        for key in basket_keys
                    },
                    "cellRule": "For every listed row: A, C and E:I.",
                },
                "variants": {
                    "census2021": {
                        "personYears": baseline_exposure,
                        "growthMultiple": 1.0,
                        "baskets": {},
                    },
                    "lgaGrowthAdjusted": {
                        "personYears": (
                            adjusted_exposure if adjusted_complete else None
                        ),
                        "growthMultiple": (
                            adjusted_exposure / baseline_exposure
                            if adjusted_complete and baseline_exposure
                            else None
                        ),
                        "baskets": {},
                    },
                },
            }
        )

    priors: dict[str, dict[str, float | None]] = {
        "census2021": {},
        "lgaGrowthAdjusted": {},
    }
    for variant_key in priors:
        total_exposure = sum(
            record["variants"][variant_key]["personYears"] or 0 for record in records
        )
        for basket_key in basket_keys:
            total_count = sum(record["counts"][basket_key] for record in records)
            priors[variant_key][basket_key] = (
                total_count / total_exposure if total_exposure > 0 else None
            )

    for record in records:
        for variant_key, variant in record["variants"].items():
            exposure = variant["personYears"]
            for basket_key in basket_keys:
                count = record["counts"][basket_key]
                raw_rate = (
                    count / exposure * scale if exposure is not None and exposure > 0 else None
                )
                variant["baskets"][basket_key] = {
                    "count": count,
                    "rawRatePer100kPersonYears": raw_rate,
                    "smoothedRatePer100kPersonYears": smoothed_rate(
                        count,
                        exposure,
                        priors[variant_key][basket_key],
                        prior_exposure,
                        scale,
                    ),
                }

    for variant_key in ("census2021", "lgaGrowthAdjusted"):
        for mode in ("raw", "smoothed"):
            for basket in baskets:
                basket_key = basket["key"]
                rate_field = f"{mode}RatePer100kPersonYears"
                percentiles = percentile_ranks(
                    {
                        record["id"]: record["variants"][variant_key]["baskets"][
                            basket_key
                        ][rate_field]
                        for record in records
                    }
                )
                for record in records:
                    record["variants"][variant_key]["baskets"][basket_key][
                        f"{mode}RiskPercentile"
                    ] = percentiles[record["id"]]

            for record in records:
                risk_parts = []
                for basket in baskets:
                    percentile = record["variants"][variant_key]["baskets"][
                        basket["key"]
                    ][f"{mode}RiskPercentile"]
                    if percentile is not None:
                        risk_parts.append((percentile, float(basket["weight"])))
                if len(risk_parts) != len(baskets):
                    score = None
                else:
                    risk = sum(value * weight for value, weight in risk_parts)
                    score = 10 * (1 - risk)
                record["variants"][variant_key][f"{mode}Score"] = score

            ranked = sorted(
                (record for record in records if record["variants"][variant_key][f"{mode}Score"] is not None),
                key=lambda record: (
                    -record["variants"][variant_key][f"{mode}Score"],
                    record["id"],
                ),
            )
            for rank, record in enumerate(ranked, start=1):
                record["variants"][variant_key][f"{mode}Rank"] = rank
            ranked_ids = {record["id"] for record in ranked}
            for record in records:
                if record["id"] not in ranked_ids:
                    record["variants"][variant_key][f"{mode}Rank"] = None

    for record in records:
        baseline = record["variants"]["census2021"]
        adjusted = record["variants"]["lgaGrowthAdjusted"]
        record["candidateSafetyScore"] = adjusted["smoothedScore"]
        record["candidateRank"] = adjusted["smoothedRank"]
        record["sensitivity"] = {
            "denominatorScoreDelta": difference(
                adjusted["smoothedScore"], baseline["smoothedScore"]
            ),
            "denominatorRankDelta": difference(
                adjusted["smoothedRank"], baseline["smoothedRank"]
            ),
            "smoothingScoreDelta": difference(
                adjusted["smoothedScore"], adjusted["rawScore"]
            ),
            "smoothingRankDelta": difference(
                adjusted["smoothedRank"], adjusted["rawRank"]
            ),
        }

    stats = {
        "targetRecordCount": len(targets["records"]),
        "targetComponentCount": len(component_to_record),
        "componentsWithOffenceRows": len(lgas_by_suburb),
        "matchedCandidateRows": matched_rows,
        "excludedRecordedOffenceCount": excluded_count,
        "cohortPriorRatesPer100kPersonYears": {
            variant: {
                basket: (rate * scale if rate is not None else None)
                for basket, rate in rates.items()
            }
            for variant, rates in priors.items()
        },
    }
    return records, stats


def difference(a: float | int | None, b: float | int | None) -> float | int | None:
    return a - b if a is not None and b is not None else None


def rounded(value: Any, digits: int = 4) -> Any:
    if isinstance(value, float):
        return round(value, digits)
    if isinstance(value, list):
        return [rounded(item, digits) for item in value]
    if isinstance(value, dict):
        return {key: rounded(item, digits) for key, item in value.items()}
    return value


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(rounded(payload), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def qa_row(record: dict[str, Any], basket_keys: list[str]) -> dict[str, Any]:
    baseline = record["variants"]["census2021"]
    adjusted = record["variants"]["lgaGrowthAdjusted"]
    row = {
        "id": record["id"],
        "displayName": record["displayName"],
        "components": " | ".join(
            component["suburb"] for component in record["components"]
        ),
        "observedLgas": " | ".join(
            sorted(
                {
                    lga
                    for component in record["components"]
                    for lga in component["observedLgas"]
                }
            )
        ),
        "censusPopulation2021": record["censusPopulation2021"],
        "adjustedThreeYearPersonYears": adjusted["personYears"],
        "growthMultiple": adjusted["growthMultiple"],
        "candidateSafetyScore": record["candidateSafetyScore"],
        "candidateRank": record["candidateRank"],
        "census2021SmoothedScore": baseline["smoothedScore"],
        "census2021SmoothedRank": baseline["smoothedRank"],
        "denominatorScoreDelta": record["sensitivity"]["denominatorScoreDelta"],
        "denominatorRankDelta": record["sensitivity"]["denominatorRankDelta"],
        "adjustedRawScore": adjusted["rawScore"],
        "adjustedRawRank": adjusted["rawRank"],
        "smoothingScoreDelta": record["sensitivity"]["smoothingScoreDelta"],
        "smoothingRankDelta": record["sensitivity"]["smoothingRankDelta"],
    }
    for basket_key in basket_keys:
        basket = adjusted["baskets"][basket_key]
        row[f"{basket_key}Count"] = basket["count"]
        row[f"{basket_key}RawRate"] = basket["rawRatePer100kPersonYears"]
        row[f"{basket_key}SmoothedRate"] = basket[
            "smoothedRatePer100kPersonYears"
        ]
        row[f"{basket_key}RiskPercentile"] = basket["smoothedRiskPercentile"]
    return rounded(row)


def write_qa_csv(
    path: Path,
    records: list[dict[str, Any]],
    basket_keys: list[str],
) -> None:
    rows = [qa_row(record, basket_keys) for record in records]
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(
            stream,
            fieldnames=list(rows[0]),
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(rows)


def score_table(records: list[dict[str, Any]], *, reverse: bool) -> list[str]:
    ranked = sorted(
        (record for record in records if record["candidateSafetyScore"] is not None),
        key=lambda record: (
            record["candidateSafetyScore"] if reverse else -record["candidateSafetyScore"],
            record["id"],
        ),
    )[:15]
    return [
        f"| {record['candidateRank']} | {record['displayName']} | "
        f"{record['candidateSafetyScore']:.2f} | "
        f"{record['variants']['lgaGrowthAdjusted']['growthMultiple']:.3f} |"
        for record in ranked
    ]


def write_outliers(
    path: Path,
    records: list[dict[str, Any]],
    stats: dict[str, Any],
    config: dict[str, Any],
) -> None:
    sensitivity = sorted(
        records,
        key=lambda record: abs(record["sensitivity"]["denominatorRankDelta"] or 0),
        reverse=True,
    )[:20]
    smoothing_sensitivity = sorted(
        records,
        key=lambda record: abs(record["sensitivity"]["smoothingRankDelta"] or 0),
        reverse=True,
    )[:20]
    split_components = [
        (record["displayName"], component["suburb"], component["observedLgas"])
        for record in records
        for component in record["components"]
        if len(component["observedLgas"]) > 1
    ]
    lines = [
        "# Settle Safety candidate audit",
        "",
        "> Audit only. These values are not connected to live Settle ranking.",
        "",
        "## Coverage",
        "",
        f"- Settle records: {stats['targetRecordCount']}",
        f"- SAL components: {stats['targetComponentCount']}",
        f"- Components matched to CSA suburb rows: {stats['componentsWithOffenceRows']}",
        f"- Analysis years: {', '.join(map(str, config['analysis']['years']))}",
        f"- Smoothing prior: {config['analysis']['smoothingPriorPersonYears']:,} person-years",
        "",
        "## Candidate formula",
        "",
    ]
    for basket in config["baskets"]:
        lines.append(
            f"- {basket['label']}: {basket['weight']:.0%} — {basket['rationale']}"
        )
    lines.extend(
        [
            "",
            "Every basket is converted to a smoothed relative risk percentile. "
            "The weighted risk is inverted to a 0–10 candidate Safety score.",
            "",
            "## Highest candidate Safety scores",
            "",
            "| Rank | Record | Score | 2024–26 population exposure ÷ 2021 baseline |",
            "| ---: | --- | ---: | ---: |",
            *score_table(records, reverse=False),
            "",
            "## Lowest candidate Safety scores",
            "",
            "| Rank | Record | Score | 2024–26 population exposure ÷ 2021 baseline |",
            "| ---: | --- | ---: | ---: |",
            *score_table(records, reverse=True),
            "",
            "## Largest denominator sensitivity",
            "",
            "| Record | Adjusted rank | 2021 rank | Rank delta | Score delta |",
            "| --- | ---: | ---: | ---: | ---: |",
        ]
    )
    for record in sensitivity:
        adjusted = record["variants"]["lgaGrowthAdjusted"]
        baseline = record["variants"]["census2021"]
        lines.append(
            f"| {record['displayName']} | {adjusted['smoothedRank']} | "
            f"{baseline['smoothedRank']} | "
            f"{record['sensitivity']['denominatorRankDelta']:+} | "
            f"{record['sensitivity']['denominatorScoreDelta']:+.3f} |"
        )
    lines.extend(
        [
            "",
            "A positive rank delta means the growth-adjusted model places the "
            "record lower (a numerically larger rank) than the fixed-2021 denominator.",
            "",
            "## Largest smoothing sensitivity",
            "",
            "| Record | Smoothed rank | Raw rank | Rank delta | Score delta | 2021 population |",
            "| --- | ---: | ---: | ---: | ---: | ---: |",
        ]
    )
    for record in smoothing_sensitivity:
        adjusted = record["variants"]["lgaGrowthAdjusted"]
        lines.append(
            f"| {record['displayName']} | {adjusted['smoothedRank']} | "
            f"{adjusted['rawRank']} | "
            f"{record['sensitivity']['smoothingRankDelta']:+} | "
            f"{record['sensitivity']['smoothingScoreDelta']:+.3f} | "
            f"{record['censusPopulation2021']:,} |"
        )
    lines.extend(
        [
            "",
            "A positive rank delta means smoothing places the record lower than "
            "its unsmoothed rate. Large movements are expected for small "
            "populations and must be reviewed before promotion.",
            "",
            "## Suburb names spanning multiple LGAs",
            "",
        ]
    )
    for display_name, suburb, lgas in split_components:
        lines.append(f"- {display_name}: {suburb} — {', '.join(lgas)}")
    lines.extend(
        [
            "",
            "The audit uses the arithmetic mean of the observed LGA growth "
            "factors for these split suburbs. This is explicit approximation, "
            "not a claim that population is evenly divided across the LGAs.",
            "",
            "## Interpretation limits",
            "",
            *[
                f"- {limitation}"
                for limitation in config["interpretation"]["limitations"]
            ],
            "",
        ]
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    args = parse_args()
    config = load_json(args.config)
    validate_config(config)
    targets = load_json(args.targets)
    source_hash = sha256_file(args.source)
    expected_hash = config["source"]["expectedSha256"]
    if source_hash != expected_hash:
        raise ValueError(
            f"Source SHA-256 mismatch for {args.source.name}: "
            f"expected {expected_hash}, got {source_hash}"
        )

    target_suburbs = {
        normalise(component["suburb"])
        for target in targets["records"]
        for component in target["salComponents"]
    }
    with StreamingWorkbook(args.source) as workbook:
        lga_populations, lga_row_count = parse_lga_populations(
            workbook, config["source"]["sheets"]["lgaRates"]
        )
        (
            offence_rows,
            lgas_by_suburb,
            available_years,
            source_offence_row_count,
        ) = parse_suburb_offences(
            workbook,
            config["source"]["sheets"]["suburbOffences"],
            target_suburbs=target_suburbs,
            analysis_years=set(config["analysis"]["years"]),
        )
        sheet_names = sorted(workbook.sheet_paths)

    required_years = set(config["analysis"]["years"])
    if not required_years.issubset(available_years):
        raise ValueError(
            f"Source lacks analysis years {sorted(required_years - available_years)}; "
            f"found {sorted(available_years)}"
        )
    missing_suburbs = target_suburbs - set(lgas_by_suburb)
    if missing_suburbs:
        raise ValueError(
            "CSA source lacks target suburb rows: " + ", ".join(sorted(missing_suburbs))
        )

    records, stats = build_audit(
        targets,
        offence_rows,
        lgas_by_suburb,
        lga_populations,
        config,
    )
    if any(record["candidateSafetyScore"] is None for record in records):
        missing = [
            record["id"]
            for record in records
            if record["candidateSafetyScore"] is None
        ]
        raise ValueError(f"Candidate Safety score is null for: {missing}")

    generated_at = date.today().isoformat()
    audit_payload = {
        "dataset": config["dataset"],
        "version": config["version"],
        "status": "audit-only",
        "generatedAt": generated_at,
        "liveRankingImpact": 0,
        "candidateModel": {
            "analysis": config["analysis"],
            "baskets": config["baskets"],
            "excludedFromCandidateScore": config["excludedFromCandidateScore"],
            "interpretation": config["interpretation"],
        },
        "coverage": stats,
        "records": records,
    }
    manifest = {
        "dataset": config["dataset"],
        "generatedAt": generated_at,
        "source": {
            **config["source"],
            "localFileName": args.source.name,
            "sha256": source_hash,
            "bytes": args.source.stat().st_size,
            "retrievedAt": args.retrieved_at.isoformat(),
            "worksheets": sheet_names,
            "sourceSchema": {
                "lgaPopulationProxy": {
                    "table": config["source"]["sheets"]["lgaRates"],
                    "fields": {
                        "year": "A",
                        "lga": "D",
                        "offenceCount": "E",
                        "ratePer100k": "F",
                    },
                    "derivation": "offence count / rate per 100,000 × 100,000",
                },
                "suburbOffences": {
                    "table": config["source"]["sheets"]["suburbOffences"],
                    "fields": {
                        "year": "A",
                        "lga": "C",
                        "suburb": "E",
                        "division": "F",
                        "subdivision": "G",
                        "subgroup": "H",
                        "count": "I",
                    },
                },
            },
            "lgaRowsRead": lga_row_count,
            "suburbOffenceRowsRead": source_offence_row_count,
            "availableYears": sorted(available_years),
        },
        "inputs": {
            "targets": {
                "path": display_path(args.targets),
                "sha256": sha256_file(args.targets),
                "version": targets.get("version"),
            },
            "config": {
                "path": display_path(args.config),
                "sha256": sha256_file(args.config),
            },
        },
        "notes": config["interpretation"]["limitations"],
    }

    args.out_dir.mkdir(parents=True, exist_ok=True)
    write_json(args.out_dir / "dwelling-safety-audit.json", audit_payload)
    write_json(args.out_dir / "dwelling-safety-source-manifest.json", manifest)
    write_qa_csv(
        args.out_dir / "dwelling-safety-qa.csv",
        records,
        [basket["key"] for basket in config["baskets"]],
    )
    write_outliers(
        args.out_dir / "dwelling-safety-outliers.md",
        records,
        stats,
        config,
    )
    print(
        f"Built audit for {len(records)} records from {len(target_suburbs)} "
        f"CSA suburb components into {args.out_dir}"
    )
    print("Live Settle ranking impact: 0 (audit-only)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
