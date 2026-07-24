# Onboarding batch: Friday night 22 (2026-07-24)

Working document for the 22 owner-supplied ABS suburb profiles in
`/home/simoda/friday-night`. Contract: [../START-HERE.md](../START-HERE.md).
Source locations: [../SOURCE-PIPELINE-MATRIX.md](../SOURCE-PIPELINE-MATRIX.md).

The owner supplied 22 original ABS 2021 General Community Profile workbooks.
Each workbook is a separate SAL record. Product selection remains
evidence-led: 19 suburbs support a recurring residential proposition in the
tracked VGV series; three employment/industrial localities do not.

## Identity and product freeze

| ID                       | Suburb           | Municipality      | Product                  | SAL   | 2021 pop | Anchor                   |
| ------------------------ | ---------------- | ----------------- | ------------------------ | ----- | -------- | ------------------------ |
| `albanvale-house`        | Albanvale        | Brimbank          | Established 3BR house    | 20017 | 5,641    | Vicmap locality point    |
| `burnside-house`         | Burnside         | Melton            | Established 3BR house    | 20419 | 5,800    | Vicmap locality point    |
| `caroline-springs-house` | Caroline Springs | Melton            | Established 3BR house    | 20500 | 24,488   | Caroline Springs station |
| `caulfield-2br`          | Caulfield        | Glen Eira         | Older 2BR unit/apartment | 20521 | 5,748    | Caulfield station        |
| `caulfield-north-2br`    | Caulfield North  | Glen Eira         | Older 2BR apartment      | 20523 | 16,903   | Vicmap locality point    |
| `caulfield-south-2br`    | Caulfield South  | Glen Eira         | Older 2BR unit/villa     | 20524 | 12,328   | Vicmap locality point    |
| `deanside-house`         | Deanside         | Melton            | Completed 3BR house      | 20724 | 654      | Vicmap locality point    |
| `derrimut-house`         | Derrimut         | Brimbank          | Established 3BR house    | 20743 | 8,651    | Vicmap locality point    |
| `frankston-2br`          | Frankston        | Frankston         | Older 2BR unit/apartment | 20947 | 37,331   | Frankston station        |
| `glen-huntly-2br`        | Glen Huntly      | Glen Eira         | Older 2BR apartment      | 21009 | 4,905    | Glen Huntly station      |
| `hillside-house`         | Hillside         | Melton            | Established 3BR house    | 21193 | 17,331   | Vicmap locality point    |
| `jacana-house`           | Jacana           | Hume              | Established 3BR house    | 21248 | 2,187    | Jacana station           |
| `kings-park-house`       | Kings Park       | Brimbank          | Established 3BR house    | 21362 | 8,203    | Vicmap locality point    |
| `mickleham-house`        | Mickleham        | Hume              | Completed 3BR house      | 21675 | 17,452   | Vicmap locality point    |
| `mill-park-house`        | Mill Park        | Whittlesea        | Established 3BR house    | 21683 | 28,712   | South Morang station     |
| `southbank-2br`          | Southbank        | Melbourne         | 2BR apartment            | 22315 | 22,631   | Vicmap locality point    |
| `taylors-lakes-house`    | Taylors Lakes    | Brimbank          | Established 3BR house    | 22474 | 15,174   | Watergardens station     |
| `truganina-house`        | Truganina        | Wyndham           | Established 3BR house    | 22582 | 36,305   | Vicmap locality point    |
| `williams-landing-house` | Williams Landing | Wyndham           | Established 3BR house    | 22791 | 9,448    | Williams Landing station |
| `dandenong-south-census` | Dandenong South  | Greater Dandenong | BLOCKED_PRODUCT          | 20709 | 125      | Census context only      |
| `laverton-north-census`  | Laverton North   | Wyndham           | BLOCKED_PRODUCT          | 21477 | 119      | Census context only      |
| `ravenhall-census`       | Ravenhall        | Melton            | BLOCKED_PRODUCT          | 22141 | 2,295    | Census context only      |

The three blocked localities have valid Census populations but no usable
house or unit series in the tracked VGV workbooks. Dandenong South and
Laverton North are overwhelmingly employment/industrial localities. Ravenhall
also lacks recurring product evidence. None is converted into a scored
residential proposition by guesswork.

## Source audit

- ABS GCP workbooks: all 22 supplied and validated as Excel workbooks; SAL
  codes and official names match the workbook contents. Raw files remain
  outside the repository.
- VGV: tracked 2015-2025 house and unit workbooks support the 19 chosen
  products. They contain no defensible recurring series for Dandenong South,
  Laverton North or Ravenhall.
- Schools: local School Locations 2025 CSV and School Zones 2027 ZIP are
  present and reusable.
- Vicmap: Caulfield and Southbank were already vendored. Official WFS
  locality features were fetched for the other 17 supported suburbs; Hillside
  is explicitly the Greater Melbourne locality.
- Transport: official Transport Victoria GTFS dated 2026-07-17 resolves the
  nominated station anchors. Stationless records use disclosed Vicmap
  representative points.
- Greenspace: the tracked ABS Mesh Block population workbook is present.
- Safety: no reproducible suburb-level pipeline exists, so safety remains
  `null`.
- Owner downloads required: none.

## Session status

- 2026-07-24 (freeze): froze 22 Census identities, 19 recurring residential
  products and three `BLOCKED_PRODUCT` outcomes. No score formula, preset,
  weight or gate is in scope.
- 2026-07-24 (Census): imported all 22 supplied workbooks through the
  append-only builder. The generated dataset now contains 160 SAL records.
  The QA report has 159 PASS rows and one disclosed CHECK: privacy perturbation
  gives tiny-population Laverton North an over-100% descriptive partner
  denominator. It has no application record and cannot affect ranking.
- 2026-07-24 (cost): cost pytest passed 7/7 and the VGV builder regenerated
  all 147 application records from 13,831 observations with Domain enrichment
  off. Every chosen product median falls inside its indicative band.
- 2026-07-24 (schools): regenerated the 147-record anchor registry and reran
  School Locations 2025 / School Zones 2027; schools pytest passed 26/26. All
  19 supported products resolve primary and secondary zones. Six anchors carry
  a boundary caveat and three zone names need a publisher-name alias or
  unmatched-location caveat.
- 2026-07-24 (school strength): reviewed 24 official 2025 VRQA annual reports.
  Sixteen newly zoned primary schools use the published four-measure,
  three-year NAPLAN averages. Springside West, Frankston High and Mill Park
  Secondary use mean VCE study score plus completion. P-9, Years 7-10,
  unmatched, and Bemin's partial first cohort remain honest nulls.
- 2026-07-24 (greenspace): greenspace pytest passed 10/10. A 19-target
  incremental build used official bounded ABS Mesh Blocks, the pinned VPA/SAL
  sources and a fresh PARKRES WFS pull. Four inner-south records carry
  high-component-spread review flags; young Deanside carries low-sample and
  spread flags. All retain finite generated evidence and none was hand-edited.
- 2026-07-24 (graduation): the 19 supported records are selectable and
  rankable. Commutes remain disclosed provisional door-to-door estimates;
  safety and recreation remain null under the existing contract.

## Final readiness

The 19 supported records are `READY_WITH_CAVEATS`. The three localities without
a recurring official residential product are `BLOCKED_PRODUCT`; their Census
context is retained without inventing an application proposition.

| Area             | Product               | Status             | Census | Cost                      | Schools                                                                  | Geo/greenspace                 | Commute / safety       | Main caveat                                    |
| ---------------- | --------------------- | ------------------ | ------ | ------------------------- | ------------------------------------------------------------------------ | ------------------------------ | ---------------------- | ---------------------------------------------- |
| Albanvale        | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $655.5k PASS        | Albanvale PS reviewed; Copperfield reviewed; secondary boundary          | PASS                           | 52/68 min; safety null | Bus-to-rail geometry                           |
| Burnside         | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $822.5k PASS        | Burnside PS reviewed; Brookside P-9 unrated                              | PASS                           | 52/68 min; safety null | Feeder dependence                              |
| Caroline Springs | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $789k PASS          | Brookside P-9 zoned and unrated                                          | PASS                           | 47/62 min; safety null | Station access varies                          |
| Caulfield        | Older 2BR unit        | READY_WITH_CAVEATS | PASS   | Unit $790k PASS           | Malvern PS / Glen Eira reviewed                                          | PASS; spread review            | 28/38 min; safety null | Greenspace spatial spread and OC               |
| Caulfield North  | Older 2BR apartment   | READY_WITH_CAVEATS | PASS   | Unit $635k PASS           | Caulfield Junior / Glen Eira reviewed                                    | PASS; spread review            | 34/45 min; safety null | Tram/rail access and OC                        |
| Caulfield South  | Older 2BR unit/villa  | READY_WITH_CAVEATS | PASS   | Unit $977.5k PASS         | Caulfield South PS / Glen Eira reviewed; primary boundary                | PASS; spread review            | 38/50 min; safety null | Above-cap product and exact zone               |
| Deanside         | Completed 3BR house   | READY_WITH_CAVEATS | PASS   | House $690k PASS          | Deanside PS / Springside West reviewed                                   | PASS; low-sample/spread review | 62/80 min; safety null | 2021 population only 654                       |
| Derrimut         | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $809.5k PASS        | Derrimut PS / Sunshine reviewed                                          | PASS                           | 50/65 min; safety null | Industrial and feeder interfaces               |
| Frankston        | Older 2BR unit        | READY_WITH_CAVEATS | PASS   | Unit $570k PASS           | Frankston PS / Frankston High reviewed                                   | PASS                           | 68/85 min; safety null | Long commute                                   |
| Glen Huntly      | Older 2BR apartment   | READY_WITH_CAVEATS | PASS   | Unit $630k PASS           | Glen Huntly PS / Glen Eira reviewed                                      | PASS; spread review            | 35/47 min; safety null | Nature-access component spread                 |
| Hillside         | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $820k PASS          | Sydenham-Hillside PS / Copperfield reviewed; primary boundary/name alias | PASS                           | 58/75 min; safety null | Feeder dependence                              |
| Jacana           | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $648k PASS          | Glenroy West reviewed; secondary unmatched; primary boundary             | PASS                           | 42/55 min; safety null | Small Mingle denominator; exact zones          |
| Kings Park       | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $650k PASS          | Kings Park PS / Copperfield reviewed; primary boundary                   | PASS                           | 50/65 min; safety null | Bus-to-rail geometry                           |
| Mickleham        | Completed 3BR house   | READY_WITH_CAVEATS | PASS   | House $700k PASS          | Yubup PS reviewed; young secondary unrated                               | PASS                           | 70/90 min; safety null | Long feeder and growth-area delivery           |
| Mill Park        | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $840.5k PASS        | Meadowglen PS / Mill Park Secondary reviewed; secondary boundary         | PASS                           | 58/75 min; safety null | Station access and exact zone                  |
| Southbank        | 2BR apartment         | READY_WITH_CAVEATS | PASS   | Unit $580k PASS           | South Melbourne PS reviewed; young secondary unrated                     | PASS                           | 15/24 min; safety null | High OC/building risk                          |
| Taylors Lakes    | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $960k PASS          | Sydenham-Hillside PS / Copperfield reviewed; name alias                  | PASS                           | 48/62 min; safety null | Above-cap house median                         |
| Truganina        | Completed 3BR house   | READY_WITH_CAVEATS | PASS   | House $670k PASS          | Warreen PS reviewed; Bemin partial cohort unrated                        | PASS                           | 58/75 min; safety null | Large growth-area feeder variation             |
| Williams Landing | Established 3BR house | READY_WITH_CAVEATS | PASS   | House $855k PASS          | Seabrook PS reviewed; Carranballac P-9 unrated                           | PASS                           | 42/55 min; safety null | Station walk and estate title                  |
| Dandenong South  | None                  | BLOCKED_PRODUCT    | PASS   | No VGV residential series | Not run                                                                  | Not run                        | Not scored             | Population 125; employment/industrial locality |
| Laverton North   | None                  | BLOCKED_PRODUCT    | CHECK  | No VGV residential series | Not run                                                                  | Not run                        | Not scored             | Population 119; ABS privacy perturbation       |
| Ravenhall        | None                  | BLOCKED_PRODUCT    | PASS   | No VGV residential series | Not run                                                                  | Not run                        | Not scored             | No recurring housing proposition               |

Automated verification: 266/266 Vitest tests, production Vite build, targeted
ESLint and Prettier, cost pytest 7/7, schools pytest 26/26 and greenspace pytest
10/10. All 19 `/tool/settle?area=<id>` deep links returned the Vite application
shell locally. No scoring formula, criterion weight, preset or gate changed.
The one decision-contract test adjustment only allows a one-point rounding
movement caused by adding legitimate values to the live relative-cost cohort.
