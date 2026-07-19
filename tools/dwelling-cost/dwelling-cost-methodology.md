# `/dwelling` suburb cost methodology

## Scope

This pipeline supports suburb choice. It does not assess a listing, strata
report, owners-corporation fee, floor plan, or any other property-specific
fact. Those belong in a later unit-analysis tool.

## Inputs

- Valuer-General Victoria annual suburb sales workbooks downloaded by the
  owner into `source/`. VGV is authoritative settled-price evidence, but its
  published suburb tables do not split units or houses by bedroom count.
  These values are therefore stored as `all` bedroom metrics and explicitly
  labelled as proxies whenever a strategy needs 1BR, 2BR, or 3BR evidence.
- Optional tidy CSV/XLSX inputs can provide a `Bedrooms` column alongside
  suburb, property type, year, median price, and sales. Exact-bedroom settled
  metrics take precedence over the all-bedroom VGV fallback.
- Optional Domain current-listing evidence. When `DOMAIN_CLIENT_ID` and
  `DOMAIN_CLIENT_SECRET` are absent, no network call is made and the build
  completes from VGV alone. Domain enrichment uses OAuth client credentials
  with `api_listings_read`, then `POST /v1/listings/residential/_search` for an
  exact suburb, unit, and 1BR/2BR filter. It records listing counts and, when at
  least five results disclose a parseable price, an asking-price median.
  Asking evidence is labelled as such and never represented as settled sales.

Grouped ranking records aggregate component suburbs by reported sales volume.
The weighted average of component medians is an approximation, not a true
pooled median, and is labelled as such in generated evidence.

## Scores

`affordabilityScore` compares the bedroom-selected median with the active
strategy's `maxPrice`. Piecewise-linear knots are `(price/cap → score)`:
`0→10`, `0.55→10`, `0.65→8`, `0.75→5`, `0.85→2`, `1.0→0`. The function is
monotonic: a cheaper median can never receive a worse Cost score.

`liquidityScore = min(10, 10 × log(1 + annual sales) / log(121))`.

Liquidity/availability is retained as separate evidence and does not alter the
Cost criterion. This prevents thin stock from making a cheaper suburb look
more expensive; a future Availability criterion can expose it independently.

Generated metrics record affordability against the $900,000 default for
auditability. The app selects the active strategy's property type and bedroom
count, falls back to the matching all-bedroom metric when necessary, and then
recomputes Cost against the active cap. Missing records retain the existing
`scores.housingValue` fallback until coverage is complete.

## QA

`dwelling-cost-outliers.md` flags any generated cost score that differs from
the hand score by at least two points on the 0–10 scale. A flag means inspect
the input row and suburb mapping; never adjust the formula toward an expected
winner.
