#!/usr/bin/env python3
"""Build suburb-level VGV cost context with optional Domain enrichment."""

from __future__ import annotations

import argparse
import json
import math
import os
import re
import statistics
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

import pandas as pd
import requests


ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
DEFAULT_TARGETS = ROOT / "tools/dwelling-greenspace/dwelling-greenspace-targets.json"
DEFAULT_CONFIG = TOOL_DIR / "dwelling-cost-config.json"
DEFAULT_SOURCE = TOOL_DIR / "source"
DEFAULT_OUTPUT = ROOT / "src/data/dwelling/cost/dwelling-cost-context.ts"
DEFAULT_OUTLIERS = TOOL_DIR / "generated/dwelling-cost-outliers.md"
DEFAULT_CORRIDORS = ROOT / "src/data/dwelling/areaCorridors.js"
YEAR_RE = re.compile(r"\b(19|20)\d{2}\b")


@dataclass(frozen=True)
class Observation:
    suburb: str
    property_type: str
    bedrooms: int | None
    year: int | None
    median_price: float | None
    sales: float | None
    source_file: str
    source_sheet: str
    marker: str | None = None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--targets", type=Path, default=DEFAULT_TARGETS)
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--outliers", type=Path, default=DEFAULT_OUTLIERS)
    parser.add_argument("--area-corridors", type=Path, default=DEFAULT_CORRIDORS)
    parser.add_argument("--skip-domain", action="store_true")
    return parser.parse_args()


def normalise(value: Any) -> str:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return ""
    return re.sub(r"\s+", " ", str(value).strip()).casefold()


def number(value: Any) -> float | None:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    text = str(value).strip().replace("$", "").replace(",", "")
    if not text or normalise(text) in {"na", "n/a", "-", "nil", "np"}:
        return None
    match = re.search(r"-?\d+(?:\.\d+)?", text)
    return float(match.group()) if match else None


def property_type_from_name(path: Path) -> str:
    name = normalise(path.stem)
    if "unit" in name or "apartment" in name or "flat" in name:
        return "unit"
    if "house" in name:
        return "house"
    return "unknown"


def alias_lookup(config: dict[str, Any]) -> dict[str, str]:
    lookup: dict[str, str] = {}
    for canonical, aliases in config["fieldAliases"].items():
        for alias in aliases:
            lookup[normalise(alias)] = canonical
    return lookup


def first_matching_header(raw: pd.DataFrame, aliases: dict[str, str]) -> int | None:
    for row_index in range(min(30, len(raw))):
        canonical = {aliases.get(normalise(value)) for value in raw.iloc[row_index]}
        if "suburb" in canonical and ({"medianPrice", "sales"} & canonical):
            return row_index
    return None


def parse_tidy_table(
    raw: pd.DataFrame,
    *,
    header_row: int,
    aliases: dict[str, str],
    source_file: str,
    source_sheet: str,
    fallback_property_type: str,
) -> list[Observation]:
    columns: dict[str, int] = {}
    for index, value in enumerate(raw.iloc[header_row]):
        canonical = aliases.get(normalise(value))
        if canonical and canonical not in columns:
            columns[canonical] = index

    observations: list[Observation] = []
    for row_index in range(header_row + 1, len(raw)):
        row = raw.iloc[row_index]
        suburb = str(row.iloc[columns["suburb"]]).strip()
        if not suburb or normalise(suburb) in {"nan", "total", "victoria"}:
            continue
        property_type = fallback_property_type
        if "propertyType" in columns:
            property_type = normalise(row.iloc[columns["propertyType"]]) or property_type
        year_value = number(row.iloc[columns["year"]]) if "year" in columns else None
        bedroom_value = number(row.iloc[columns["bedrooms"]]) if "bedrooms" in columns else None
        observations.append(
            Observation(
                suburb=suburb,
                property_type=property_type,
                bedrooms=int(bedroom_value) if bedroom_value else None,
                year=int(year_value) if year_value else None,
                median_price=(
                    number(row.iloc[columns["medianPrice"]])
                    if "medianPrice" in columns
                    else None
                ),
                sales=number(row.iloc[columns["sales"]]) if "sales" in columns else None,
                source_file=source_file,
                source_sheet=source_sheet,
            )
        )
    return observations


def parse_wide_table(
    raw: pd.DataFrame,
    *,
    aliases: dict[str, str],
    source_file: str,
    source_sheet: str,
    fallback_property_type: str,
) -> list[Observation]:
    suburb_row = None
    suburb_col = None
    for row_index in range(min(30, len(raw))):
        for col_index, value in enumerate(raw.iloc[row_index]):
            if aliases.get(normalise(value)) == "suburb":
                suburb_row, suburb_col = row_index, col_index
                break
        if suburb_row is not None:
            break
    if suburb_row is None or suburb_col is None:
        return []

    header_rows = range(max(0, suburb_row - 3), min(len(raw), suburb_row + 3))
    joined_headers = [
        " ".join(normalise(raw.iat[row_index, col_index]) for row_index in header_rows)
        for col_index in range(raw.shape[1])
    ]
    metric_columns: list[tuple[int, int | None, str]] = []
    for col_index, joined in enumerate(joined_headers):
        years = [int(match.group()) for match in YEAR_RE.finditer(joined)]
        metric = None
        if any(alias in joined for alias in ("median", "median price")):
            metric = "median"
        elif any(alias in joined for alias in ("no. of sales", "number of sales", "sales")):
            metric = "sales"
        if metric:
            metric_columns.append((col_index, max(years) if years else None, metric))
    if not metric_columns:
        # VGV also publishes year-matrix sheets (Locality + one column per
        # year, e.g. the houses/units-by-suburb 2015-2025 workbooks) where the
        # metric is implied by the workbook title. A bare-year header is that
        # year's median for the file's property type; the unlabelled column
        # after each year holds VGV's low-sample footnote marker (^ or *).
        for col_index, joined in enumerate(joined_headers):
            label = joined.strip()
            if re.fullmatch(r"(19|20)\d{2}", label):
                metric_columns.append((col_index, int(label), "median"))

    observations: dict[tuple[str, int | None], dict[str, Any]] = {}
    for row_index in range(suburb_row + 1, len(raw)):
        suburb = str(raw.iat[row_index, suburb_col]).strip()
        if not suburb or normalise(suburb) in {"nan", "total", "victoria"}:
            continue
        for col_index, year, metric in metric_columns:
            value = number(raw.iat[row_index, col_index])
            if value is not None:
                entry = observations.setdefault(
                    (suburb, year), {"median": None, "sales": None, "marker": None}
                )
                entry[metric] = value
                if metric == "median" and col_index + 1 < raw.shape[1]:
                    flag = str(raw.iat[row_index, col_index + 1]).strip()
                    if flag in {"^", "*"} and not joined_headers[col_index + 1].strip():
                        entry["marker"] = flag

    return [
        Observation(
            suburb=suburb,
            property_type=fallback_property_type,
            bedrooms=None,
            year=year,
            median_price=values["median"],
            sales=values["sales"],
            source_file=source_file,
            source_sheet=source_sheet,
            marker=values["marker"],
        )
        for (suburb, year), values in observations.items()
    ]


def parse_table(
    raw: pd.DataFrame,
    *,
    path: Path,
    sheet: str,
    config: dict[str, Any],
) -> list[Observation]:
    aliases = alias_lookup(config)
    header = first_matching_header(raw, aliases)
    kwargs = {
        "raw": raw,
        "aliases": aliases,
        "source_file": path.name,
        "source_sheet": sheet,
        "fallback_property_type": property_type_from_name(path),
    }
    if header is not None:
        return parse_tidy_table(header_row=header, **kwargs)
    return parse_wide_table(**kwargs)


def load_observations(source: Path, config: dict[str, Any]) -> list[Observation]:
    observations: list[Observation] = []
    paths = sorted(
        path
        for path in source.iterdir()
        if path.is_file() and path.suffix.casefold() in {".csv", ".xlsx", ".xls"}
    ) if source.exists() else []
    for path in paths:
        if path.suffix.casefold() == ".csv":
            tables = {"csv": pd.read_csv(path, header=None, dtype=object)}
        else:
            try:
                workbook = pd.ExcelFile(path)
            except ImportError as exc:
                raise RuntimeError(
                    f"Cannot read {path.name}; install xlrd for legacy .xls files."
                ) from exc
            tables = {
                sheet: pd.read_excel(path, sheet_name=sheet, header=None, dtype=object)
                for sheet in workbook.sheet_names
            }
        for sheet, raw in tables.items():
            observations.extend(parse_table(raw, path=path, sheet=sheet, config=config))
    return observations


def latest_by_suburb(
    observations: Iterable[Observation], property_type: str, bedrooms: int | None = None
) -> dict[str, Observation]:
    selected: dict[str, Observation] = {}
    for observation in observations:
        if property_type not in normalise(observation.property_type):
            continue
        if observation.bedrooms != bedrooms:
            continue
        key = normalise(observation.suburb)
        current = selected.get(key)
        rank = (observation.year or 0, observation.median_price is not None, observation.sales is not None)
        current_rank = (
            (current.year or 0, current.median_price is not None, current.sales is not None)
            if current
            else (-1, False, False)
        )
        if rank > current_rank:
            selected[key] = observation
        elif current and observation.year == current.year:
            selected[key] = Observation(
                suburb=current.suburb,
                property_type=current.property_type,
                bedrooms=current.bedrooms,
                year=current.year,
                median_price=current.median_price or observation.median_price,
                sales=current.sales if current.sales is not None else observation.sales,
                source_file=current.source_file,
                source_sheet=current.source_sheet,
                marker=current.marker or observation.marker,
            )
    return selected


def affordability_score(median_price: float, cap: float) -> float:
    knots = [(0, 10), (0.55, 10), (0.65, 8), (0.75, 5), (0.85, 2), (1, 0)]
    ratio = median_price / cap
    for index in range(1, len(knots)):
        left, right = knots[index - 1], knots[index]
        if ratio <= right[0]:
            progress = max(0.0, (ratio - left[0]) / (right[0] - left[0]))
            return left[1] + progress * (right[1] - left[1])
    return 0.0


def liquidity_score(sales: float, full_score_sales: float) -> float:
    return min(10.0, 10.0 * math.log1p(max(0.0, sales)) / math.log1p(full_score_sales))


def domain_token(config: dict[str, Any], client_id: str, secret: str) -> str:
    response = requests.post(
        config["domain"]["authUrl"],
        auth=(client_id, secret),
        data={"grant_type": "client_credentials", "scope": "api_listings_read"},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["access_token"]


def domain_listing_payloads(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    listings: list[dict[str, Any]] = []
    for item in items:
        if normalise(item.get("type")) == "project":
            project = item.get("project") or {}
            children = project.get("childListings") or project.get("listings") or []
            listings.extend((child.get("listing") or child) for child in children)
        else:
            listings.append(item.get("listing") or item)
    return listings


def advertised_price(listing: dict[str, Any]) -> float | None:
    details = listing.get("priceDetails") or {}
    lower = number(details.get("priceFrom"))
    upper = number(details.get("priceTo"))
    if lower is not None and upper is not None:
        return (lower + upper) / 2
    for key in ("price", "priceGuide", "priceFrom", "priceTo"):
        value = number(details.get(key))
        if value is not None and value >= 100_000:
            return value

    display = str(details.get("displayPrice") or "")
    values = []
    for raw, suffix in re.findall(r"\$?\s*([0-9][0-9,.]*(?:\.[0-9]+)?)\s*([kKmM]?)", display):
        value = float(raw.replace(",", ""))
        if suffix.casefold() == "k":
            value *= 1_000
        elif suffix.casefold() == "m":
            value *= 1_000_000
        if value >= 100_000:
            values.append(value)
    if not values:
        return None
    return statistics.median(values[:2])


def domain_listing_metrics(
    config: dict[str, Any], token: str, suburb: str, bedrooms: int
) -> dict[str, Any]:
    domain = config["domain"]
    payload = {
        "listingType": domain["listingType"],
        "propertyTypes": domain["propertyTypes"],
        "minBedrooms": bedrooms,
        "maxBedrooms": bedrooms,
        "locations": [
            {
                "state": domain["state"],
                "suburb": suburb,
                "includeSurroundingSuburbs": False,
            }
        ],
    }
    response = requests.post(
        domain["searchUrl"],
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=payload,
        timeout=30,
    )
    response.raise_for_status()
    listings = domain_listing_payloads(response.json())
    prices = [price for listing in listings if (price := advertised_price(listing)) is not None]
    return {
        "listingCount": len(listings),
        "pricedCount": len(prices),
        "medianPrice": round(statistics.median(prices)) if prices else None,
    }


def hand_scores(path: Path) -> dict[str, float]:
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(
        r"\bid:\s*'([^']+)'.*?\bscores:\s*\{.*?\bhousingValue:\s*([0-9.]+)",
        re.DOTALL,
    )
    return {match.group(1): float(match.group(2)) * 2 for match in pattern.finditer(text)}


def build_records(
    targets: dict[str, Any],
    observations: list[Observation],
    config: dict[str, Any],
    *,
    domain_metrics: dict[tuple[str, int], dict[str, Any]] | None = None,
) -> list[dict[str, Any]]:
    default_cap = float(config["defaultMaxPrice"])
    full_sales = float(config["liquidityFullScoreSales"])
    source_indexes = {
        (property_type, bedrooms): latest_by_suburb(observations, property_type, bedrooms)
        for property_type in ("unit", "house")
        for bedrooms in (None, 1, 2, 3)
    }

    def source_metric(target: dict[str, Any], property_type: str, bedrooms: int | None):
        selected = source_indexes[(property_type, bedrooms)]
        components = []
        for component in target["salComponents"]:
            suburb = component["suburb"]
            observation = selected.get(normalise(suburb))
            if observation and observation.median_price is not None:
                components.append((suburb, observation))
        if not components:
            return None

        weights = [observation.sales or 1 for _, observation in components]
        weight_total = sum(weights)
        median = sum(
            observation.median_price * weight
            for (_, observation), weight in zip(components, weights)
        ) / weight_total
        reported_sales = [observation.sales for _, observation in components]
        sales = sum(value for value in reported_sales if value is not None)
        sales_value = sales if any(value is not None for value in reported_sales) else None
        availability = (
            liquidity_score(sales_value, full_sales) if sales_value is not None else None
        )
        return {
            "medianPrice": round(median),
            "priceType": "settled",
            "bedrooms": bedrooms,
            "sampleSize": round(sales_value) if sales_value is not None else None,
            "salesPerYear": round(sales_value, 1) if sales_value is not None else None,
            "listingCount": None,
            "availabilityScore": round(availability, 4) if availability is not None else None,
            "defaultAffordabilityScore": round(affordability_score(median, default_cap), 4),
            "evidence": {
                "propertyType": property_type,
                "bedroomSpecific": bedrooms is not None,
                "componentSuburbs": [suburb for suburb, _ in components],
                "sourceFiles": sorted(
                    {observation.source_file for _, observation in components}
                ),
                "latestYear": max(
                    (observation.year or 0 for _, observation in components), default=None
                )
                or None,
                "groupedMedianMethod": (
                    "sales-weighted component median approximation"
                    if len(components) > 1
                    else "reported suburb median"
                ),
                "lowSampleMarkers": (
                    {
                        suburb: observation.marker
                        for suburb, observation in components
                        if observation.marker
                    }
                    or None
                ),
            },
        }

    def domain_metric(target: dict[str, Any], bedrooms: int):
        if domain_metrics is None:
            return None
        components = []
        for component in target["salComponents"]:
            suburb = component["suburb"]
            metric = domain_metrics.get((normalise(suburb), bedrooms))
            if metric:
                components.append((suburb, metric))
        priced = [(suburb, metric) for suburb, metric in components if metric["medianPrice"]]
        priced_count = sum(metric["pricedCount"] for _, metric in priced)
        minimum = int(config["domain"].get("minimumPricedListings", 5))
        if not priced or priced_count < minimum:
            return None
        median = sum(
            metric["medianPrice"] * metric["pricedCount"] for _, metric in priced
        ) / priced_count
        listing_count = sum(metric["listingCount"] for _, metric in components)
        availability = liquidity_score(listing_count, full_sales)
        return {
            "medianPrice": round(median),
            "priceType": "asking",
            "bedrooms": bedrooms,
            "sampleSize": priced_count,
            "salesPerYear": None,
            "listingCount": listing_count,
            "availabilityScore": round(availability, 4),
            "defaultAffordabilityScore": round(affordability_score(median, default_cap), 4),
            "evidence": {
                "propertyType": "unit",
                "bedroomSpecific": True,
                "componentSuburbs": [suburb for suburb, _ in components],
                "sourceFiles": ["Domain residential listing search"],
                "latestYear": datetime.now(timezone.utc).year,
                "groupedMedianMethod": (
                    "priced-listing-weighted component asking median approximation"
                    if len(components) > 1
                    else "current disclosed asking-price median"
                ),
                "lowSampleMarkers": None,
            },
        }

    records: list[dict[str, Any]] = []
    for target in targets["records"]:
        prices: dict[str, dict[str, Any]] = {}
        for property_type in ("unit", "house"):
            by_bedroom: dict[str, Any] = {}
            general = source_metric(target, property_type, None)
            if general:
                by_bedroom["all"] = general
            for bedrooms in (1, 2, 3):
                exact = source_metric(target, property_type, bedrooms)
                if exact:
                    by_bedroom[str(bedrooms)] = exact
                elif property_type == "unit" and bedrooms in config["domain"]["bedrooms"]:
                    current = domain_metric(target, bedrooms)
                    if current:
                        by_bedroom[str(bedrooms)] = current
            if by_bedroom:
                prices[property_type] = by_bedroom
        if not prices:
            continue
        records.append(
            {
                "id": target["id"],
                "suburb": target["displayName"],
                "prices": prices,
            }
        )
    return records


def write_typescript(path: Path, records: list[dict[str, Any]], config: dict[str, Any]) -> None:
    payload = {
        "dataset": "dwelling-cost-context",
        "methodVersion": config["methodVersion"],
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "defaultMaxPrice": config["defaultMaxPrice"],
        "records": records,
    }
    serialized = json.dumps(payload, indent=2, ensure_ascii=False)
    content = f"""// src/data/dwelling/cost/dwelling-cost-context.ts
//
// Generated by tools/dwelling-cost/build-dwelling-cost.py. Do not hand-edit;
// rebuild from owner-downloaded source files. Domain bedroom-specific asking
// metrics are optional and no credential is ever written here.

export const DWELLING_COST_CONTEXT = {serialized} as const

export const DWELLING_COST_BY_ID = Object.fromEntries(
  DWELLING_COST_CONTEXT.records.map((record) => [record.id, record]),
)
"""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def write_outliers(path: Path, records: list[dict[str, Any]], hand: dict[str, float]) -> None:
    scored = [
        (record, record.get("prices", {}).get("unit", {}).get("all"))
        for record in records
    ]
    flagged = [
        (record, metric, hand[record["id"]])
        for record, metric in scored
        if metric
        and record["id"] in hand
        and abs(metric["defaultAffordabilityScore"] - hand[record["id"]]) >= 2
    ]
    lines = [
        "# Dwelling cost QA / outliers",
        "",
        "Generated-score differences are review prompts for the source data and suburb mapping, not reasons to tune the formula toward an expected winner.",
        "",
    ]
    if not records:
        lines.append("No VGV-backed records were generated; add owner-downloaded workbooks to `source/`.")
    elif not flagged:
        lines.append("No generated score differs from the hand score by 2.0 or more.")
    else:
        lines.extend(
            [
                "| Record | Generated | Hand | Difference |",
                "|---|---:|---:|---:|",
                *[
                    f"| {record['id']} | {metric['defaultAffordabilityScore']:.2f} | {manual:.2f} | {metric['defaultAffordabilityScore'] - manual:+.2f} |"
                    for record, metric, manual in flagged
                ],
            ]
        )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    args = parse_args()
    config = json.loads(args.config.read_text(encoding="utf-8"))
    targets = json.loads(args.targets.read_text(encoding="utf-8"))
    observations = load_observations(args.source, config)

    credentials = (os.getenv("DOMAIN_CLIENT_ID"), os.getenv("DOMAIN_CLIENT_SECRET"))
    if bool(credentials[0]) != bool(credentials[1]):
        raise RuntimeError("Set both DOMAIN_CLIENT_ID and DOMAIN_CLIENT_SECRET, or neither.")

    domain_metrics = None
    if all(credentials) and not args.skip_domain:
        token = domain_token(config, credentials[0], credentials[1])
        suburbs = sorted(
            {
                component["suburb"]
                for target in targets["records"]
                for component in target["salComponents"]
            }
        )
        domain_metrics = {
            (normalise(suburb), bedrooms): domain_listing_metrics(
                config, token, suburb, bedrooms
            )
            for suburb in suburbs
            for bedrooms in config["domain"]["bedrooms"]
        }

    records = build_records(targets, observations, config, domain_metrics=domain_metrics)
    write_typescript(args.out, records, config)
    write_outliers(args.outliers, records, hand_scores(args.area_corridors))
    print(
        f"Generated {len(records)} cost records from {len(observations)} VGV observations; "
        f"Domain enrichment {'on' if domain_metrics is not None else 'off'}."
    )
    if not observations:
        print("No VGV workbook rows found; the app will use hand-score fallback.", file=sys.stderr)


if __name__ == "__main__":
    main()
