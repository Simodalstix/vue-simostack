# `/dwelling` onboarding readiness rubric

Apply this rubric to each new area ID and to the batch as a whole. It is a gate,
not a points competition: a high total cannot hide a failed critical row.

## Rating scale

- `2 — PASS`: source-backed, correctly integrated and validated.
- `1 — CAVEAT`: an honest null/provisional field with a visible fallback and
  no fabricated value.
- `0 — FAIL`: missing/broken linkage, unsupported claim, guessed active value,
  orphan ID or generated data edited by hand.

Critical rows must score `2` for `READY`. A critical row at `1` may qualify for
`READY_WITH_CAVEATS` only where the table explicitly allows it. Any critical
row at `0` blocks ranking release or requires `scored: false`.

## Per-area rubric

| #   | System                     | Critical    | `2 — PASS`                                                                                                  | `1 — CAVEAT` allowed                                                               | `0 — FAIL` examples                                                                     |
| --- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | Identity and product       | Yes         | Unique stable ID; component localities, catchment, bedrooms and recurring stock proposition are explicit    | Benchmark status or thin-but-observed supply is disclosed                          | Duplicate ID, label-derived runtime ID, or invented product                             |
| 2   | Core record schema         | Yes         | Matches current `areaCorridors.js`; gates and display fields are present                                    | Non-scoring narrative field is explicitly pending                                  | Required field missing or stale historical schema copied in                             |
| 3   | Source registry            | Yes         | Every referenced source ID resolves with URL and checked date                                               | A narrative claim is clearly marked owner judgment                                 | Broken source ID or uncited factual claim used as evidence                              |
| 4   | Station/catchment geometry | Yes         | Correct station/anchor coordinates, route and catchment; `areaGeo` ID resolves once                         | Bus/tram locality representative point is disclosed                                | No map point, wrong station, swapped lat/lng, duplicate feature                         |
| 5   | Locality polygon           | Yes         | Every component locality is vendored and linked to the area ID                                              | Catchment point renders while an explicitly requested polygon fetch is blocked     | Missing polygon silently makes the area non-interactive                                 |
| 6   | SAL mapping                | Yes         | Official SAL code and 2021 population for every component; totals reconcile                                 | None for a released scored record                                                  | Guessed SAL, missing component or averaged population                                   |
| 7   | Census context             | Yes         | Generated record resolves every component with provenance and QA                                            | `scored: false` pending official workbook                                          | Manual percentages, missing workbook silently treated as zero                           |
| 8   | Community scoring adapters | Yes         | Chinese, grouped other communities and partner pool resolve from compatible raw counts or guarded nulls     | A named measure is null because the official source does not publish enough detail | Averaged percentages, incompatible denominators or direct demographic hand-score        |
| 9   | Cost evidence              | Yes         | Product-aware VGV record or explicitly labelled generated proxy; strategy cap remains dynamic               | Existing hand-score fallback is retained and clearly provisional                   | Invented median, wrong property type or all-unit evidence presented as bedroom-specific |
| 10  | Commute                    | Yes         | Door-to-door typical/stressed time and transfers use the current 555 Collins protocol                       | Provisional reproducible estimate with `placeholder: true`                         | Station-only time presented as door-to-door or transfer count guessed                   |
| 11  | Safety                     | Yes         | Existing safety rubric applied from reproducible evidence                                                   | Null/not assessed with visible `n/a` and `placeholder: true`                       | Perception substituted for evidence or null silently coerced to zero                    |
| 12  | Schools: zone/context      | Yes         | Official 2027 primary and Year 7 zone at anchor; intersecting catchment schools and boundary flag generated | Exact-address caveat near boundary                                                 | Same-suburb school claimed as zoned without polygon result                              |
| 13  | Schools: strength          | Conditional | Every newly zoned scored school joins reviewed strength evidence                                            | Criterion falls back or is null with evidence gap reported                         | Strength guessed from reputation or tuned to expected suburb rank                       |
| 14  | Kid amenity                | Yes         | Teen independence follows current rubric; researched sport is blended by existing code                      | Girls' sport absent and existing fallback is used                                  | New formula, double count or unsupported score                                          |
| 15  | Greenspace context         | Yes         | Target maps to official SAL/components; generated context and QA resolve                                    | Pipeline output is context-only pending review                                     | Manual greenspace number or geometry used directly by ranking                           |
| 16  | Optional bonuses/context   | No          | Beach, personal network, community, facilities and sport appear only when applicable and evidenced          | Null/absent                                                                        | Inapplicable bonus added to avoid a low rank                                            |
| 17  | Expanded profile           | Yes         | `lives`, `housing`, `fit[]`, `decision` and evidence caveats match current pattern                          | A clearly labelled pending paragraph                                               | Copy names wrong suburb, marketing language, or contradiction with gates                |
| 18  | Ranking behavior           | Yes         | Exactly one row; finite score when scored; gates work without special cases                                 | `scored: false` places it in pending evidence                                      | NaN, special-case ranking code, or onboarding changes weights/formulas                  |
| 19  | UI behavior                | Yes         | Deep link, map selection, card, Census, school and criterion breakdown render on desktop and phone          | Explicit `n/a` for an allowed caveat                                               | Crash, orphan selection, misleading zero or hidden missing data                         |
| 20  | Tests and QA               | Yes         | Coverage test plus full Vitest/build/lint/format and affected pipeline QA pass                              | External visual check is recorded as pending                                       | Failing test waived, generated outlier ignored or unrelated regression introduced       |

“Conditional” means row 13 is critical only when the schools criterion would
otherwise claim a finite evidence-backed score. A guarded null is preferable to
an invented school strength.

## Release classification

### `READY`

- All critical rows are `2`.
- Every broadly applicable enabled standard criterion is comparable and
  source-backed. A criterion whose existing contract deliberately treats the
  area as inapplicable, such as distant personal-network access, may remain
  null without lowering readiness.
- Bonus/context measures are either valid or honestly inapplicable.
- `placeholder` may be removed only after the record-specific caveats have been
  reviewed, not merely because tests pass.

### `READY_WITH_CAVEATS`

- No critical row is `0`.
- At most one enabled standard criterion is `1`, or a generated context field
  has a clearly displayed source limitation.
- The area is fully selectable and rankable, and the final report states how
  the missing criterion changes comparability.
- Keep `placeholder: true`.

### `UNSCORED`

- Identity, profile and geometry may be complete, but a core release gate is
  pending.
- Set `scored: false`; do not let incomplete evidence enter normal rankings.
- The pending-evidence UX and deep link must still work.

### `BLOCKED_SOURCE`

- One or more official source files cannot be obtained or validated.
- Provide exact filename, official publisher page, expected path and the
  pipeline it blocks.

### `BLOCKED_PRODUCT`

- Evidence does not support recurring stock matching the nominated product.
- Recommend a different product or nearby suburb, but do not substitute it
  without owner approval.

## Batch-level acceptance gates

The batch passes only when:

1. Requested names map one-to-one to approved area propositions.
2. Every new ID appears in all required registries and no unrelated ID is
   orphaned.
3. Generated record counts and target counts agree after the batch.
4. No source percentage or median was arithmetically blended where the
   publisher does not permit it.
5. No scoring formula, preset, weight or gate changed in the onboarding diff.
6. Existing records keep their prior gate statuses under identical inputs.
7. Every generated QA review flag is either fixed or documented per area.
8. The final readiness table lists all caveats and owner decisions.

## Required automated assertions for a new batch

Add or extend a data test that iterates every new ID and asserts:

- exactly one `areaCorridors` record;
- profile and `areaGeo` resolution;
- locality polygon linkage;
- no missing Census component;
- generated cost and greenspace lookup, or the documented fallback;
- generated school context with primary/secondary zone names;
- community score adapters return finite values or their documented guard;
- normal ranking returns one finite row, or `scored: false` returns one
  pending-evidence row;
- referenced source IDs and optional-context IDs are not orphaned.

Do not make the test assert a preferred rank position. The test protects
coverage and integrity, not a desired winner.
