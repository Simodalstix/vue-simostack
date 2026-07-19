# `/dwelling` suburb onboarding — start here

Use this pack whenever one to ten new suburbs need to become first-class
`/dwelling` records. This directory is the single onboarding contract and
source of truth.

## The short version

The owner can start an onboarding batch with only this:

```text
Onboard these suburbs into /dwelling:
1. Suburb A
2. Suburb B
...

Use the existing strategies and scoring rules. Treat each as a separate area
unless the evidence supports a combined station catchment. Choose the most
credible recurring dwelling product when I have not named one. Tell me once,
in one consolidated list, if any source files require my manual download.
The School Locations 2025 CSV and School Zones 2027 ZIP are already in
tools/dwelling-schools/source/.
```

The fuller copy/paste request is in [REQUEST-TEMPLATE.md](./REQUEST-TEMPLATE.md).

From the repository root, start the preferred CLI agent and paste that request
with the suburb names filled in. The explicit `START-HERE.md` path is the
workflow trigger; no extra bundle or setup script is needed.

The agent owns source discovery, SAL and station mapping, data integration,
pipeline runs, QA, UI wiring, tests and the final readiness report. The owner
is asked to download files only after the source audit proves that the file is
not already present and cannot be fetched safely by the agent. See
[OWNER-DOWNLOADS.md](./OWNER-DOWNLOADS.md).

## Minimum owner input

For each suburb, only the name is mandatory. These optional details reduce
assumptions:

- intended stock: 1BR apartment, older 2BR apartment, villa, townhouse,
  established house, or “choose from recurring stock”;
- whether it is a serious candidate or an intentional benchmark;
- a preferred station or pocket when the suburb has several;
- any personal reason that should appear as narrative context;
- whether nearby suburbs should be one combined record or separate records.

If the owner supplies names only, the agent must choose a recurring product
from evidence, record that assumption in the batch report, and never select a
product merely because it ranks well.

## Batch workflow

### 1. Freeze identity before researching scores

For every requested suburb, resolve and record:

- a stable kebab-case area ID that includes the dwelling product where useful;
- display name and exact component localities;
- station, route and catchment definition;
- dwelling product and bedroom count;
- ABS 2021 SAL code for every component locality;
- whether the record is a candidate, stress test or benchmark.

Do not create two IDs for the same proposition. Do not derive IDs from labels
at runtime. Combined records pool source counts only where the underlying
measure permits it.

### 2. Run the source audit before editing generated files

Check the batch against:

- `src/data/dwelling/areaCorridors.js` and `suburbProfiles.js`;
- `src/data/dwelling/areaGeo.js` and the locality polygon asset;
- the Census context and its component-SAL mapping;
- school anchors, zones, points and strength evidence;
- greenspace and cost target files and generated outputs;
- personal network, beach, girls' sport, facilities and source registries;
- current tests that assert complete record coverage.

Produce one owner-download request, not a series of interruptions. If nothing
is needed, say so and continue.

### 3. Pilot one record, then process the rest in small batches

Choose the technically simplest single-locality record as the pilot. It should
exercise the complete path without depending on a combined-area aggregation or
unusually thin stock. A pilot is chosen for integration clarity, not because it
is expected to rank highly.

After the pilot passes, process the remaining records in corridor-sized groups
of roughly three to five. Generated datasets may be rebuilt once for the whole
batch when their pipeline is deterministic and the QA output remains legible.

### 4. Integrate in dependency order

1. Core area record and source registry.
2. Area geometry, station points and locality polygons.
3. SAL target/component mapping and Census context.
4. Cost target coverage and generated VGV context.
5. School anchors, official zones/locations, context and strength evidence.
6. Greenspace targets and generated context.
7. Commute, safety, kid amenity and other evidence-backed manual fields.
8. Personal network, beach, girls' sport and facilities where applicable.
9. Expanded suburb profile and evidence copy.
10. Batch coverage test, full test suite, build and manual UI check.

Generated Census, school, cost and greenspace values are never hand-entered.
Source/config records are edited, then their pipeline is rerun.

## Current source-of-truth files

| Concern               | Source/config                                                   | Generated or rendered output                                      |
| --------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| Core record and gates | `src/data/dwelling/areaCorridors.js`                            | Ranked rows and profile fallback copy                             |
| Expanded profile      | `src/data/dwelling/suburbProfiles.js`                           | Profile card narrative                                            |
| Station/catchment     | `src/data/dwelling/areaGeo.js`                                  | `areaGeoFeatures.js`                                              |
| Locality polygons     | `src/assets/geo/melbourne-localities.geojson`                   | `localityFeatures.js` linkage                                     |
| Census targets        | `tools/dwelling-census/dwelling-community-context-targets.json` | `dwelling-community-context-2021.ts`                              |
| Community lenses      | Census raw counts                                               | `chineseCommunity.js`, `languageCommunities.js`, `partnerPool.js` |
| Cost targets          | `tools/dwelling-greenspace/dwelling-greenspace-targets.json`    | `cost/dwelling-cost-context.ts`                                   |
| School anchors        | `tools/dwelling-schools/dwelling-schools-anchors.json`          | school points, zones and context                                  |
| School score          | official zoned school IDs plus reviewed strength research       | `schools/schoolStrength.js`                                       |
| Greenspace targets    | `tools/dwelling-greenspace/dwelling-greenspace-targets.json`    | greenspace context and QA                                         |
| Decision score        | existing criteria in `decideStrategies.js`                      | `useAreaRanking.js`                                               |
| Optional context      | personal network, beach, girls' sport, facilities               | chips, profile context and applicable criteria                    |

The shared app target file currently feeds both greenspace and cost. Keep its
record IDs, SAL components and Census populations aligned with the Census
dataset rather than maintaining rival mappings.

## Non-negotiable integrity rules

- Do not change scoring formulas, weights, gates or strategy definitions as
  part of onboarding.
- Never tune a value until a preferred suburb rises in the ranking.
- Missing evidence is `null` or `scored: false`, not zero and not a guess.
- A standard criterion that is `null` drops out of the weighted mean; this is
  honest but reduces comparability and must be reported.
- Grouped Census counts use compatible raw numerators and denominators;
  percentages and published medians are never averaged.
- “Zoned school” comes from the official zone polygon at the record anchor.
  Nearby or same-suburb schools are not silently described as zoned.
- Price evidence is suburb/product context, never a valuation of a property.
- Locality, school-zone and park geometry are context. Only named score
  adapters may feed ranking.
- Keep `placeholder: true` while material evidence remains provisional.
- Existing unrelated worktree changes belong to the owner and must be
  preserved.

## Required batch report

At completion, return a table with one row per area:

| Area | Product | Status | Rank coverage | Census | Cost | Schools | Geo/map | Commute/safety | Remaining caveat |
| ---- | ------- | ------ | ------------- | ------ | ---- | ------- | ------- | -------------- | ---------------- |

Allowed status values:

- `READY`: every critical gate passes and every broadly applicable standard
  criterion is comparable; intentionally bounded fields such as a distant
  personal-network measure may remain inapplicable under their existing
  contract;
- `READY_WITH_CAVEATS`: fully integrated and visible, with an explicit honest
  null or provisional field that does not break the UI;
- `BLOCKED_SOURCE`: an official source file or external decision is missing;
- `BLOCKED_PRODUCT`: the nominated dwelling product lacks credible recurring
  stock;
- `UNSCORED`: intentionally visible only in the pending-evidence section.

Use [ONBOARDING-RUBRIC.md](./ONBOARDING-RUBRIC.md) for the exact pass criteria.

## Final verification

At minimum run:

```bash
npm run test
npm run build
npx eslint <changed application files>
npx prettier --check <changed application files>
```

Run the affected Python pipeline tests and QA as well. The exact commands live
in each pipeline's own start-here document. The final manual check must cover:

- one and only one ranked or intentionally unscored row per new ID;
- deep link `?area=<id>`;
- map polygon/point selection and profile opening;
- cost, Census, school and evidence sections;
- criterion breakdown with honest `n/a` handling;
- desktop and phone ranking navigation;
- no regression in existing record counts, IDs or ranking gates.
