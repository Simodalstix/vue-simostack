# src/data/dwelling/ — Settle runtime data layer

Everything the Settle UI reads about suburbs lives here. Files fall into
three classes with different edit rules. Start at the root `AGENTS.md`;
pipeline commands live in `tools/dwelling-onboarding/SOURCE-PIPELINE-MATRIX.md`.

## 1. Generated datasets — never hand-edit

Produced by the pipelines under `tools/`. To change a value: edit the
pipeline's source or config, rerun it, review its QA output, commit the
regenerated file.

| File(s)                                                                                                         | Pipeline                                                       |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `dwelling-community-context-2021.ts`                                                                            | `tools/dwelling-census/`                                       |
| `dwelling-census-context-2021.ts`                                                                               | backward-compatible re-export of the file above; not a dataset |
| `cost/dwelling-cost-context.ts`                                                                                 | `tools/dwelling-cost/`                                         |
| `schools/dwelling-school-points.js`, `schools/dwelling-school-zones.json`, `schools/dwelling-school-context.js` | `tools/dwelling-schools/`                                      |
| `greenspace/dwelling-greenspace-context.{json,ts}` plus its QA, inspection, manifest and outliers files         | `tools/dwelling-greenspace/`                                   |

`schools/schoolStrength.js` is the one hybrid: hand-generated from
`tools/dwelling-schools/school-strength-research.json` and owner-reviewed.
Treat its values as evidence, not tunable numbers.

## 2. Hand-maintained records — edit with cited evidence

The core suburb facts. Every factual claim cites a source ID from
`areaSources.js`. Missing evidence stays `null` or `scored: false`.

- `areaCorridors.js` — the core record per area: identity, gates, scores,
  dwelling, commute, safety. One record per area ID; IDs are stable and
  never derived from labels at runtime.
- `suburbProfiles.js` — expanded profile narrative per record.
- `areaGeo.js` — station/anchor coordinates and catchments (feeds
  `areaGeoFeatures.js` and the schools anchors file).
- `areaSources.js` — the source registry (URL + lastChecked per source ID).
- Optional context and bonus data: `personalNetwork.js`, `beachAccess.js`,
  `girlsSport.js`, `facilities.js`, `chineseCommunity.js` raw inputs,
  `ownerVetoes.js`, `trainLines.js`, `regions.js`, `localityFeatures.js`,
  `decisionChips.js`, `facts.js`.
- `personalAnchors.js` has a gitignored `personalAnchors.local.js`
  counterpart; exact personal coordinates never enter the repository.
- `areaWeights.js` and `framework.js` are historical/reference models kept
  for the per-record fields they document; live ranking does not use their
  weights.

## 3. Scoring layer — protected; change only on explicit owner request

Formulas, weights, presets, bands and gates. Onboarding and UI tasks must
not modify these.

- `decideStrategies.js` — the nine live criteria and strategy presets (weight
  vectors plus purchase proposition). Additive-bonus criteria sit outside
  the weighted mean.
- `../../composables/useAreaRanking.js` — hard gates first, then
  weighted-mean scoring; nulls drop out of the mean, never become zero.
- `../../composables/useCommuteScoring.js` — commute scoring against the
  555 Collins St anchor.
- `relativeScoring.js` — cohort-percentile scoring for Mingle. Safety is kept
  as raw record context only and has no live ranking weight.
- `cost/costScoring.js`, `cost/costContext.js` — cost criterion adapter.
- `schools/schoolStrength.js` — schools criterion evidence.
- `chineseCommunity.js`, `languageCommunities.js`, `partnerPool.js` — the
  only demographic-derived score adapters; everything else in the Census
  dataset is descriptive context and must stay unscored.
- `fitBands.js` — score-to-band display mapping.
- `unscoredUx.js`, `decideStrategies.js` gates — pending-evidence UX.

Geometry (locality polygons, school zones, open space) is display context
only and never feeds ranking.

## Tests

`npm run test` (Vitest) runs `__tests__/` here plus the router tests. The
suite asserts record coverage, adapter guards, gate behaviour and onboarding
invariants; new suburbs extend the batch coverage tests rather than relaxing
them.
