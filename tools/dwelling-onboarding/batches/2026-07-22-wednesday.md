# Onboarding batch: 21 suburbs (2026-07-22, "Wednesday")

Working document for the in-progress batch. Delete after the batch report is
accepted. Contract: [../START-HERE.md](../START-HERE.md). Source locations:
[../SOURCE-PIPELINE-MATRIX.md](../SOURCE-PIPELINE-MATRIX.md).

Owner supplied a zip of 23 ABS GCP SAL workbooks. Two (Springvale SAL22328,
Surrey Hills SAL22399) were already in the dataset as existing records and
were skipped by the append-only importer. The remaining 21 are onboarded
here. Names only were supplied, so dwelling products are agent proposals
recorded as assumptions below. Each suburb is a separate record; no combined
catchments proposed (but several are combination candidates, see below).

## Session status

- 2026-07-22 (remote session, workbooks only): census import + cost build +
  pending-evidence integration. This environment has no external network, so
  Vicmap polygons/anchors, schools, greenspace and commute are deferred to a
  local network session, exactly as the previous batch's first pass.
  - Census: 21 new SAL records imported (dataset now 124, QA 124 PASS).
  - Every record integrated as `scored: false` pending-evidence:
    areaCorridors + areaGeo (provisional anchor) + suburbProfiles + shared
    targets (registry now 115).
  - Cost build rerun: 114 of 115 targets got a VGV median. `bellfield-house`
    (pop 1,996) has no published VGV suburb median (too small / suppressed);
    the cost adapter falls back gracefully. Honest data gap, not an error.
  - New pending coverage test `wednesdayBatchOnboarding.test.js`; pinned
    counts updated (community 124, greenspace targets 115). Full suite
    225/225, build, lint, prettier (on touched files) all pass.
- 2026-07-22 (owner decisions applied): (1) combination candidates kept as
  separate records; (2) Brunswick West and Maribyrnong switched from 3BR
  house to older 2BR apartment (`brunswick-west-2br`, `maribyrnong-2br`);
  (3) Bellfield removed. Batch now 20 pending records. Shared targets and
  cost regenerated to 114; greenspace test pin 114. NOTE: the Bellfield SAL
  community-context record remains in the generated census dataset (still
  124 records) as a harmless unused descriptive entry — the generated file
  is never hand-edited and a full regen needs every workbook. It is removed
  from the census-targets list so a future regen excludes it. Full suite
  224/224, build, lint, prettier pass.
- 2026-07-22 (local network session, geometry pass): all 20 retained
  localities fetched from the official Vicmap Lite WFS and added/replaced in
  the vendored asset (129 localities total). The 16 stationless records now
  use Vicmap polygon representative points. Albion and Gardenvale use named
  station parent points from the official 2026-07-17 Transport Victoria GTFS;
  Coburg North uses both Merlynston and Batman; Port Melbourne is anchored at
  the midpoint of the two North Port route 109 platforms. All 20 anchors now
  carry `verifiedAt: '2026-07-22'`; Albion moved about 500 m and the shared
  `trainLines.js` point was synced. No record graduated from `scored: false`.
- 2026-07-22 (schools + greenspace pass): regenerated school anchors from
  all 114 current records and reran the official 2027 zone pipeline (25/25
  pytest): all 20 Wednesday records resolve primary + Year 7 zones, with
  seven street-level boundary flags and no missing zones. Added official 2025
  VRQA evidence for the 23 newly zoned schools not already researched (16
  primary, seven secondary); Port Melbourne Secondary College remains an
  honest `strength: null` because it served only Years 7-10 in 2025 and had no
  completing VCE cohort. These additions await owner review. Greenspace pytest
  passed 10/10; the 20-target build used cached hash-matched ABS/VPA inputs and
  a fresh 422-feature PARKRES pull, then integrated all records (app context
  now 114). Gardenvale's `highComponentSpread` flag was reviewed and accepted
  as structural (full local access, weak inland nature-corridor proximity).
  No record graduated from `scored: false`.
- 2026-07-22 (commute + safety + price pass): entered door-to-door commute
  estimates to 555 Collins St for all 20 records using the existing
  hand-maintained protocol: nearest same-corridor evidence record plus the
  verified rail, tram or feeder-bus service pattern. `stationWalkMin` remains
  null because no exact property address is modelled. Added per-product price
  bands around the generated official 2025 VGV broad-property medians and
  explicit owners-corporation ranges (unit medians remain all-bedroom
  proxies). Researched the current CSA sources and downloaded the official
  criminal-incidents workbook released 18 June 2026. Its public tables are
  statewide offence, location-type, family-incident and charge-status series;
  they do not include reproducible suburb geography. Safety therefore remains
  an honest `null` for every record rather than borrowing a neighbouring score
  or converting a qualitative impression into evidence. School name hints,
  source IDs and profile caveats were synced to the completed passes. No
  record graduated from `scored: false`.

## Records (all scored: false pending)

| ID                    | Suburb          | Region              | Product (assumption) | SAL   | Pop    | Anchor kind                 |
| --------------------- | --------------- | ------------------- | -------------------- | ----- | ------ | --------------------------- |
| aberfeldie-house      | Aberfeldie      | North               | 3BR house            | 20003 | 3,925  | Vicmap locality point       |
| albion-house          | Albion          | West                | 3BR house            | 20021 | 4,334  | Albion station (TV GTFS)    |
| ~~bellfield-house~~   | Bellfield       | REMOVED (owner)     | -                    | 20198 | 1,996  | -                           |
| blackburn-north-house | Blackburn North | East and south-east | 3BR house            | 20253 | 7,627  | Vicmap locality point       |
| blackburn-south-house | Blackburn South | East and south-east | 3BR house            | 20254 | 10,939 | Vicmap locality point       |
| box-hill-north-house  | Box Hill North  | East and south-east | 3BR house            | 20315 | 12,337 | Vicmap locality point       |
| box-hill-south-house  | Box Hill South  | East and south-east | 3BR house            | 20316 | 8,491  | Vicmap locality point       |
| brunswick-west-2br    | Brunswick West  | North               | older 2BR apartment  | 20363 | 14,746 | Vicmap locality point       |
| coburg-north-house    | Coburg North    | North               | 3BR house            | 20597 | 8,327  | Merlynston + Batman (GTFS)  |
| gardenvale-house      | Gardenvale      | South               | 3BR house            | 20965 | 1,019  | Gardenvale station (GTFS)   |
| heidelberg-west-house | Heidelberg West | Middle north-east   | 3BR house            | 21169 | 5,252  | Vicmap locality point       |
| keilor-house          | Keilor          | West                | 3BR house            | 21314 | 5,906  | Vicmap locality point       |
| keilor-downs-house    | Keilor Downs    | West                | 3BR house            | 21315 | 9,857  | Vicmap locality point       |
| keilor-east-house     | Keilor East     | West                | 3BR house            | 21316 | 15,078 | Vicmap locality point       |
| keysborough-house     | Keysborough     | East and south-east | 3BR house            | 21339 | 30,018 | Vicmap locality point       |
| maidstone-house       | Maidstone       | West                | 3BR house            | 21575 | 9,389  | Vicmap locality point       |
| maribyrnong-2br       | Maribyrnong     | West                | older 2BR apartment  | 21604 | 12,573 | Vicmap locality point       |
| port-melbourne-2br    | Port Melbourne  | Inner               | older 2BR apartment  | 22107 | 17,633 | North Port route 109 (GTFS) |
| sunshine-north-house  | Sunshine North  | West                | 3BR house            | 22396 | 12,047 | Vicmap locality point       |
| sunshine-west-house   | Sunshine West   | West                | 3BR house            | 22397 | 18,552 | Vicmap locality point       |
| tullamarine-house     | Tullamarine     | North               | 3BR house            | 22586 | 6,733  | Vicmap locality point       |

## Owner decisions resolved

1. Brunswick West and Maribyrnong use older 2BR apartment products; Port
   Melbourne remains an older 2BR apartment. The other retained records use
   established 3BR houses.
2. Combination candidates remain separate records.
3. Bellfield was dropped; its unused generated Census context is retained
   until a future full regeneration, as documented in the session status.

## Evidence still owed (local network session, same as prior batch)

1. DONE (2026-07-22): Vicmap locality polygons fetched and vendored for all
   20 retained records (Bellfield remains removed); every record now links to
   a polygon.
2. DONE (2026-07-22): all anchors verified from Vicmap polygons or the
   official Transport Victoria GTFS and dated 2026-07-22. Coburg North now
   carries both Merlynston and Batman station points; Albion's schematic-line
   coordinate was corrected with its anchor.
3. DONE (2026-07-22): schools anchors regenerated for the 114-record registry;
   official 2027 zone pipeline rerun for all 20 retained records. Seven
   anchors carry the expected exact-address boundary caveat. Strength research
   added for all 23 newly zoned schools that lacked evidence; additions await
   owner review, and Port Melbourne Secondary is an evidence-backed null.
4. DONE (2026-07-22): greenspace built and integrated for all 20 retained
   targets. Gardenvale's sole QA flag was reviewed and accepted; no manual
   generated value was edited.
5. DONE (2026-07-22): commute estimates and official VGV-framed price / OC
   bands entered for all 20 records. The current official CSA workbook was
   checked, but it lacks suburb geography; safety remains `null` under the
   missing-evidence rule rather than being inferred.
6. Graduate to scored only on owner approval, per the previous batch pattern.
