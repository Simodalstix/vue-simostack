# Onboarding batch: Thursday night nine (2026-07-23)

Working document for Altona North, Broadmeadows, Cairnlea, Campbellfield,
Deer Park, Epping, Greenvale, Hoppers Crossing and Roxburgh Park. Contract:
[../START-HERE.md](../START-HERE.md). Source locations:
[../SOURCE-PIPELINE-MATRIX.md](../SOURCE-PIPELINE-MATRIX.md).

The owner supplied nine original ABS 2021 General Community Profile
workbooks by absolute WSL path. Names only were supplied, so each suburb is a
separate record and the dwelling product is an evidence-backed agent proposal.

## Identity and product freeze

Altona North uses an older 2BR unit proposition because its official 2025 VGV
unit median is $735k versus a $960k house median, and recurring established
unit/villa stock is the credible budget proposition. The other eight use
established 3BR houses. Cairnlea deliberately keeps its credible house product
despite the broad-house median sitting just above the current cap; the product
was not changed merely to improve rank.

| ID                       | Suburb           | Municipality | Product               | SAL   | 2021 pop | Anchor                         |
| ------------------------ | ---------------- | ------------ | --------------------- | ----- | -------- | ------------------------------ |
| `altona-north-2br`       | Altona North     | Hobsons Bay  | Older 2BR unit        | 20037 | 12,962   | Vicmap locality point          |
| `broadmeadows-house`     | Broadmeadows     | Hume         | Established 3BR house | 20346 | 12,524   | Broadmeadows station (TV GTFS) |
| `cairnlea-house`         | Cairnlea         | Brimbank     | Established 3BR house | 20441 | 10,038   | Vicmap locality point          |
| `campbellfield-house`    | Campbellfield    | Hume         | Established 3BR house | 20455 | 4,977    | Upfield station (TV GTFS)      |
| `deer-park-house`        | Deer Park        | Brimbank     | Established 3BR house | 20729 | 18,145   | Deer Park station (TV GTFS)    |
| `epping-house`           | Epping           | Whittlesea   | Established 3BR house | 20878 | 33,489   | Epping station (TV GTFS)       |
| `greenvale-house`        | Greenvale        | Hume         | Established 3BR house | 21105 | 21,274   | Vicmap locality point          |
| `hoppers-crossing-house` | Hoppers Crossing | Wyndham      | Established 3BR house | 21203 | 37,216   | Hoppers Crossing (TV GTFS)     |
| `roxburgh-park-house`    | Roxburgh Park    | Hume         | Established 3BR house | 22208 | 24,129   | Roxburgh Park (TV GTFS)        |

## Source audit

- ABS GCP workbooks: all nine supplied and validated as Excel workbooks; SAL
  names confirmed against the official ABS profile pages. Raw workbooks remain
  outside the repository.
- VGV: tracked 2015-2025 house and unit workbooks cover all nine. The chosen
  Altona North unit product has a $735k broad-unit median; the eight chosen
  house products have broad-house medians from $640k to $922k.
- Schools: local School Locations 2025 CSV and School Zones 2027 ZIP are
  present and reusable.
- Vicmap: none of the nine locality polygons were already vendored. One
  official WFS response containing all nine has been fetched for the
  reproducible locality integration pass.
- Transport: official Transport Victoria GTFS dated 2026-07-17 resolves the
  six rail anchors. The three stationless records use locality representative
  points rather than invented stops.
- Greenspace: the tracked ABS Mesh Block population workbook is present. The
  stable VPA and ABS SAL inputs were fetched hash-identically to the manifest;
  official ABS Mesh Blocks were queried in bounded suburb envelopes and a
  fresh metropolitan PARKRES supplement was fetched.
- Safety: no reproducible suburb-level pipeline exists. Safety remains `null`,
  consistent with the latest completed batches.
- Owner downloads required: none.

## Session status

- 2026-07-23 (identity and geometry): froze nine separate records and chose the
  recurring products above. Vendored all nine official Vicmap locality
  polygons and verified the six rail anchors against Transport Victoria GTFS
  dated 2026-07-17. The three stationless records use disclosed locality
  representative points.
- 2026-07-23 (Census): imported all nine owner-supplied original ABS GCP
  workbooks through the append-only builder. The generated dataset now
  contains 138 SAL records and the regenerated QA report contains 138 PASS
  rows.
- 2026-07-23 (cost): cost pytest passed 7/7 and the VGV pipeline regenerated
  all 128 application records from 13,831 observations with Domain enrichment
  off. Every selected-product median falls inside its record's indicative
  band and none of the nine appears in the cost outlier report.
- 2026-07-23 (schools): regenerated the 128-record anchor registry and reran
  the School Locations 2025 / School Zones 2027 pipeline; schools pytest
  passed 26/26. All nine anchors resolve official primary and secondary zones.
  Epping primary and secondary and Greenvale primary are boundary-sensitive,
  so their cards require exact-address verification.
- 2026-07-23 (school strength): fetched the official 2025 VRQA annual reports
  for every newly zoned school not already reviewed. Eight primary-school
  ratings use the published four-measure, three-year NAPLAN
  Strong-or-Exceeding averages; five secondary ratings use mean VCE study
  score plus completion. Greenvale Secondary served Years 7-10 in 2025 and
  therefore retains an honest `strength: null`.
- 2026-07-23 (greenspace): greenspace pytest passed 10/10. The nine-target
  incremental official-source build produced nine clean QA rows and zero
  review flags, then integrated the records into the 128-record application
  context. No generated value was hand-edited.
- 2026-07-23 (graduation): removed `scored: false` only after Census, cost,
  schools and greenspace resolved. Commutes remain provisional door-to-door
  estimates under the existing 555 Collins protocol; safety and recreation
  remain null under the same contract as the preceding completed batches.
  The batch coverage contract requires one finite ranked row per ID.

## Final readiness

All nine records are `READY_WITH_CAVEATS`: they are selectable and rankable
with generated Census, cost, school and greenspace evidence, while
`placeholder: true` preserves the disclosed manual-field limitations. No
formula, weight, preset or gate changed.

| Area             | Product               | Status             | Rank coverage       | Census | Cost       | Schools                                                    | Geo/map | Commute / safety       | Remaining caveat                                 |
| ---------------- | --------------------- | ------------------ | ------------------- | ------ | ---------- | ---------------------------------------------------------- | ------- | ---------------------- | ------------------------------------------------ |
| Altona North     | Older 2BR unit        | READY_WITH_CAVEATS | 1 finite scored row | PASS   | Unit PASS  | Bayside P-12 reviewed                                      | PASS    | 42/58 min; safety null | Bus geometry and all-bedroom unit proxy          |
| Broadmeadows     | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Broadmeadows Valley PS / Hume Central reviewed             | PASS    | 38/50 min; safety null | Street and station-walk variation                |
| Cairnlea         | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Cairnlea Park PS / Victoria University SC reviewed         | PASS    | 50/65 min; safety null | House median above cap and feeder dependence     |
| Campbellfield    | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Dallas Brooks Community PS / Hume Central reviewed         | PASS    | 43/58 min; safety null | Industrial interfaces                            |
| Deer Park        | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Deer Park West PS / Victoria University SC reviewed        | PASS    | 38/52 min; safety null | Regional frequency and arterial exposure         |
| Epping           | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Epping PS / Epping SC reviewed; both boundary-sensitive    | PASS    | 47/62 min; safety null | Verify both zones and station access             |
| Greenvale        | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Greenvale PS reviewed; primary boundary; secondary unrated | PASS    | 60/78 min; safety null | Feeder dependence and no secondary VCE cohort    |
| Hoppers Crossing | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Woodville PS / Hoppers Crossing SC reviewed                | PASS    | 45/60 min; safety null | Large-locality station-access variation          |
| Roxburgh Park    | Established 3BR house | READY_WITH_CAVEATS | 1 finite scored row | PASS   | House PASS | Roxburgh Park PS / Roxburgh College reviewed               | PASS    | 45/58 min; safety null | School evidence and estate-era address variation |

Automated verification: 243/243 Vitest tests, production Vite build, targeted
ESLint, cost pytest 7/7, schools pytest 26/26 and greenspace pytest 10/10.
All nine `/tool/settle?area=<id>` deep links also returned the Vite application
shell from the local server. External visual inspection remains a final owner
check; the coverage test and production build exercise the data path and all
generated adapters.
