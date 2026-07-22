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

## Records (all scored: false pending)

| ID                    | Suburb          | Region              | Product (assumption) | SAL   | Pop    | Anchor kind                 |
| --------------------- | --------------- | ------------------- | -------------------- | ----- | ------ | --------------------------- |
| aberfeldie-house      | Aberfeldie      | North               | 3BR house            | 20003 | 3,925  | approx locality             |
| albion-house          | Albion          | West                | 3BR house            | 20021 | 4,334  | Albion station (repo coord) |
| bellfield-house       | Bellfield       | Middle north-east   | 3BR house            | 20198 | 1,996  | approx locality             |
| blackburn-north-house | Blackburn North | East and south-east | 3BR house            | 20253 | 7,627  | approx locality             |
| blackburn-south-house | Blackburn South | East and south-east | 3BR house            | 20254 | 10,939 | approx locality             |
| box-hill-north-house  | Box Hill North  | East and south-east | 3BR house            | 20315 | 12,337 | approx locality             |
| box-hill-south-house  | Box Hill South  | East and south-east | 3BR house            | 20316 | 8,491  | approx locality             |
| brunswick-west-house  | Brunswick West  | North               | 3BR house            | 20363 | 14,746 | approx locality             |
| coburg-north-house    | Coburg North    | North               | 3BR house            | 20597 | 8,327  | approx locality             |
| gardenvale-house      | Gardenvale      | South               | 3BR house            | 20965 | 1,019  | approx Sandringham line     |
| heidelberg-west-house | Heidelberg West | Middle north-east   | 3BR house            | 21169 | 5,252  | approx locality             |
| keilor-house          | Keilor          | West                | 3BR house            | 21314 | 5,906  | approx locality             |
| keilor-downs-house    | Keilor Downs    | West                | 3BR house            | 21315 | 9,857  | approx locality             |
| keilor-east-house     | Keilor East     | West                | 3BR house            | 21316 | 15,078 | approx locality             |
| keysborough-house     | Keysborough     | East and south-east | 3BR house            | 21339 | 30,018 | approx locality             |
| maidstone-house       | Maidstone       | West                | 3BR house            | 21575 | 9,389  | approx locality             |
| maribyrnong-house     | Maribyrnong     | West                | 3BR house            | 21604 | 12,573 | approx locality             |
| port-melbourne-2br    | Port Melbourne  | Inner               | older 2BR apartment  | 22107 | 17,633 | approx route 109 light rail |
| sunshine-north-house  | Sunshine North  | West                | 3BR house            | 22396 | 12,047 | approx locality             |
| sunshine-west-house   | Sunshine West   | West                | 3BR house            | 22397 | 18,552 | approx locality             |
| tullamarine-house     | Tullamarine     | North               | 3BR house            | 22586 | 6,733  | approx locality             |

## Owner decisions owed

1. **Product confirmations.** All but Port Melbourne default to established
   3BR house. Candidates that may be better as an apartment/villa product:
   Brunswick West (Melville Rd apartment strip), Maribyrnong (Edgewater
   apartment estate), Port Melbourne (already 2BR). Confirm or veto.
2. **Combination candidates.** Several are natural component pairs/trios that
   the owner may prefer as combined catchment records rather than separate:
   Keilor / Keilor Downs / Keilor East; Blackburn North / Blackburn South;
   Box Hill North / Box Hill South; Sunshine North / Sunshine West. Left as
   separate records pending your call.
3. **Bellfield cost gap.** No VGV median published for such a small suburb;
   confirm whether to accept the fallback or drop the record.

## Evidence still owed (local network session, same as prior batch)

1. Vicmap locality polygons for all 21 localities (fetch + `add-locality.py`);
   removes the pending-record locality-coverage exemption once linked.
2. Anchor verification: every anchor is provisional (`verifiedAt: null`,
   `source: OSM`). The `approx` locality anchors are LOW precision; replace
   with polygon representative points, and gazetteer-check the station points
   (Albion reuses the repo coord; Gardenvale, Coburg North, Port Melbourne
   light rail are approximate).
3. Schools pipeline rerun (anchors regenerate from areaGeo; needs the two
   local source files) + strength research for newly zoned schools.
4. Greenspace build for the 21 new targets (network session).
5. Commute protocol runs, safety evidence, price-band research per record.
6. Graduate to scored only on owner approval, per the previous batch pattern.
