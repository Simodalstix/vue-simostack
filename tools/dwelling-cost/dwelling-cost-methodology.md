# `/dwelling` suburb cost methodology

## Scope

This pipeline supports suburb choice. It does not assess a listing, strata
report, owners-corporation fee, floor plan, or any other property-specific
fact. Those belong in a later unit-analysis tool.

## Inputs

- Valuer-General Victoria annual suburb sales workbooks downloaded
  by the owner into `source/`. VGV is authoritative for median prices and
  transaction counts. Unit medians are used as the current proxy for the
  requested `medianPrice2br`; VGV does not split those published suburb tables
  by bedroom count, so the limitation stays explicit.
- Optional Domain current-listing counts. When `DOMAIN_CLIENT_ID` and
  `DOMAIN_CLIENT_SECRET` are absent, no network call is made and the build
  completes from VGV alone. Domain enrichment uses OAuth client credentials
  with `api_listings_read`, then `POST /v1/listings/residential/_search` for an
  exact suburb and bedroom/dwelling filter. Listing counts are context only;
  they do not replace settled-sale liquidity.

Grouped ranking records aggregate component suburbs by reported sales volume.
The weighted average of component medians is an approximation, not a true
pooled median, and is labelled as such in generated evidence.

## Scores

`headroomScore` compares the median with the active strategy's `maxPrice`.
Piecewise-linear knots are `(price/cap → score)`: `0→4`, `0.5→7`, `0.7→10`,
`0.8→10`, `1.0→6`, `1.15→0`. This rewards credible stock around 70–80% of
the cap, tapers above the cap, and gives only diminishing credit to a headline
median far below the brief.

`liquidityScore = min(10, 10 × log(1 + annual sales) / log(121))`.

`costScore = 0.7 × headroomScore + 0.3 × liquidityScore`.

Generated files record scores against the $900,000 default for auditability.
The app recomputes headroom and cost against the active strategy cap. Missing
generated records fall back to the existing `scores.housingValue` field until
VGV coverage is complete.

## QA

`dwelling-cost-outliers.md` flags any generated cost score that differs from
the hand score by at least two points on the 0–10 scale. A flag means inspect
the input row and suburb mapping; never adjust the formula toward an expected
winner.
