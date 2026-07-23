# Settle source and pipeline matrix

Authoritative map of every raw source type, its canonical location, whether it
is tracked, the pipeline that consumes it, the exact generating commands and
the outputs. Commands below were verified against the scripts' actual argument
parsers; do not invent variants. Entry point for all agent work is the root
`AGENTS.md`.

## Shared target registry

`tools/dwelling-greenspace/dwelling-greenspace-targets.json` is the canonical
app-wide target registry (currently 119 Settle records with IDs, component
SALs and Census populations). Despite living in the greenspace directory it is
shared: it is the default `--targets` for **both** the greenspace builder and
the cost builder (`DEFAULT_TARGETS` in `build-dwelling-cost.py`). Keep its
record IDs and SAL components aligned with the Census dataset. Do not create
a rival copy.

`tools/dwelling-census/dwelling-community-context-targets.json` is different:
it lists only the SAL records to **add** in a census import batch, not the
whole registry.

## Matrix

| Source type                                                                                    | Raw canonical location                                                                                        | Tracked?                                                                                | Config / targets                                                                                                                                                   | Build command (from tool dir unless noted)                                                                                                                            | Generated outputs (all tracked)                                                                                                                                                                                                                                     | Runtime consumers                                                                        |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| VGV house/unit sales workbooks                                                                 | `tools/dwelling-cost/source/*.xlsx` (see its README for optional bedroom-specific CSV format)                 | **Tracked** (owner-downloaded, vendored)                                                | `dwelling-cost-config.json`; shared targets file above                                                                                                             | `python build-dwelling-cost.py` (defaults cover targets/config/source/out; `--skip-domain` to skip Domain enrichment)                                                 | `src/data/dwelling/cost/dwelling-cost-context.ts`; `tools/dwelling-cost/generated/dwelling-cost-outliers.md`                                                                                                                                                        | `cost/costContext.js`, `cost/costScoring.js`                                             |
| Domain API listing enrichment (optional)                                                       | none stored; live API                                                                                         | n/a                                                                                     | `DOMAIN_CLIENT_ID` / `DOMAIN_CLIENT_SECRET` env vars only, never files                                                                                             | part of the cost build above                                                                                                                                          | merged into cost context                                                                                                                                                                                                                                            | as above                                                                                 |
| ABS 2021 GCP workbooks (`GCP_SAL<code>.xlsx`)                                                  | local cache outside the repo, passed via `--cache`                                                            | **Not retained** (deliberate policy)                                                    | `tools/dwelling-census/dwelling-community-context-targets.json`                                                                                                    | see census commands below                                                                                                                                             | `src/data/dwelling/dwelling-community-context-2021.ts`; `tools/dwelling-census/dwelling-community-context-qa.csv`                                                                                                                                                   | `communityContext.js`, `chineseCommunity.js`, `languageCommunities.js`, `partnerPool.js` |
| School Locations 2025 CSV + School Zones 2027 ZIP                                              | `tools/dwelling-schools/source/`                                                                              | **Untracked** (gitignored; present only on the owner's machine, absent in fresh clones) | `dwelling-schools-anchors.json` (derived from `areaGeo.js`; regenerate after adding records, never hand-edit); `school-strength-research.json` (research evidence) | `python build-dwelling-schools.py --locations-csv source/dv402-SchoolLocations2025.csv --zones-zip source/dv419_DataVic_School_Zones_2027_MAR26.zip --zone-year 2027` | `src/data/dwelling/schools/dwelling-school-points.js`, `dwelling-school-zones.json`, `dwelling-school-context.js`; QA: `dwelling-schools-qa.csv`, `dwelling-schools-outliers.md` (in tool dir)                                                                      | `schools/schoolStrength.js` (scoring), map layers, suburb card                           |
| ABS Mesh Block population counts workbook                                                      | `tools/dwelling-greenspace/source/Mesh_Block_Counts_2021.xlsx`                                                | **Tracked** (vendored)                                                                  | `dwelling-greenspace-targets.json`, `dwelling-greenspace-config.json`                                                                                              | see greenspace commands below                                                                                                                                         | in `src/data/dwelling/greenspace/`: `dwelling-greenspace-context.json`, `dwelling-greenspace-context.ts`, `dwelling-greenspace-qa.csv`, `dwelling-greenspace-source-inspection.json`, `dwelling-greenspace-source-manifest.json`, `dwelling-greenspace-outliers.md` | `greenspaceContext` consumers, suburb card                                               |
| CSA LGA recorded-offences workbook                                                             | owner-supplied absolute path outside the repository, passed with `--source`                                   | **Not retained** (deliberate policy; generated audit only)                              | `tools/dwelling-safety/dwelling-safety-config.json`; shared targets file above                                                                                     | `python3 tools/dwelling-safety/build-dwelling-safety.py --source <absolute-xlsx-path> --retrieved-at YYYY-MM-DD` (repo root)                                          | `tools/dwelling-safety/generated/dwelling-safety-{audit.json,qa.csv,outliers.md,source-manifest.json}`; audit-only, no runtime dataset                                                                                                                              | none until a separate owner-approved scoring-layer promotion                             |
| ABS Mesh Block / SAL geometry, VPA open-space polygons, PARKRES                                | downloaded into `.cache/dwelling-greenspace/` by the builder (PARKRES may be supplied via `--parkres <path>`) | **Untracked** (cache; too large to vendor)                                              | as above                                                                                                                                                           | as above                                                                                                                                                              | as above, plus `src/assets/geo/melbourne-open-space.geojson` via `build-open-space-map.py --out <path>`                                                                                                                                                             | map context layer only, never scored                                                     |
| Vicmap locality polygons                                                                       | fetched per locality via WFS (recipe in `src/assets/geo/README.md`)                                           | asset **tracked**, WFS responses not kept                                               | n/a                                                                                                                                                                | `python tools/dwelling-geo/add-locality.py --asset src/assets/geo/melbourne-localities.geojson --source <wfs-response.geojson> --name <LOCALITY>` (repo root)         | updated `melbourne-localities.geojson`                                                                                                                                                                                                                              | map polygons, `localityFeatures.js`                                                      |
| School strength evidence (VRQA annual reports)                                                 | research recorded in `tools/dwelling-schools/school-strength-research.json`                                   | **Tracked**                                                                             | n/a                                                                                                                                                                | no script: `src/data/dwelling/schools/schoolStrength.js` is hand-generated from the research file and owner-reviewed                                                  | `schoolStrength.js`                                                                                                                                                                                                                                                 | schools criterion                                                                        |
| Current runtime commute, safety, recreation, beach, girls' sport, personal network, facilities | hand-maintained JS records in `src/data/dwelling/` citing `areaSources.js` IDs                                | **Tracked** (except `personalAnchors.local.js`, gitignored)                             | `areaSources.js` is the source registry                                                                                                                            | none (manual, evidence-cited edits); the CSA audit above does not replace runtime safety                                                                              | n/a                                                                                                                                                                                                                                                                 | criteria adapters in `decideStrategies.js`                                               |

## Census commands (verified against the scripts)

Append new SAL records (append-only; existing records unchanged):

```bash
python tools/dwelling-census/build-dwelling-community-context.py \
  --dataset src/data/dwelling/dwelling-community-context-2021.ts \
  --targets tools/dwelling-census/dwelling-community-context-targets.json \
  --cache /path/to/gcp-workbooks \
  --out /tmp/dwelling-community-context-2021.ts \
  --retrieved-at YYYY-MM-DD
```

Backfill Mingle measures and regenerate QA:

```bash
python tools/dwelling-census/backfill-partner-pool-context.py \
  --dataset src/data/dwelling/dwelling-community-context-2021.ts \
  --cache /path/to/gcp-workbooks \
  --out /tmp/dwelling-community-context-2021.ts \
  --qa-out tools/dwelling-census/dwelling-community-context-qa.csv \
  --generated-at YYYY-MM-DD
```

Also available: `backfill-language-community-context.py` (adds named
language-community measures to every record) and `refresh-community-qa.py
--dataset <ts> --out <csv>` (QA regeneration only). Review `/tmp` output and
run the dwelling tests before replacing the checked-in dataset.

## Greenspace commands (verified)

```bash
# inspection pass first
python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --config dwelling-greenspace-config.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace \
  --inspect-only

# full build after review; add --parkres /abs/path when supplying PARKRES,
# --target-id <id> (repeatable) for incremental builds,
# --mesh-blocks <file> for an official ABS geometry subset
```

Builder output under `generated/dwelling-greenspace/` is untracked staging.
Merge one record into the committed app files with:

```bash
python integrate-generated-record.py \
  --generated <builder-json> --qa <builder-qa> \
  --json src/data/dwelling/greenspace/dwelling-greenspace-context.json \
  --ts src/data/dwelling/greenspace/dwelling-greenspace-context.ts \
  --app-qa src/data/dwelling/greenspace/dwelling-greenspace-qa.csv
```

## Python dependencies

| Pipeline                | Install                                                                                     | Notes                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Cost                    | `python -m pip install -r requirements-cost.txt`                                            | pandas, openpyxl, requests, xlrd, pytest                                       |
| Schools                 | `python -m pip install -r requirements-schools.txt`                                         | geopandas, pandas, shapely, pytest                                             |
| Greenspace              | no requirements file in repo (root `.gitignore` has `*.txt`; adding one needs `git add -f`) | script imports: geopandas, numpy, pandas, requests, shapely; tests need pytest |
| Census                  | none                                                                                        | Python 3.10+, `openpyxl>=3.1`                                                  |
| Safety audit            | none                                                                                        | Python 3.10+ standard library only; raw workbook stays outside the repository  |
| Geo (`add-locality.py`) | none                                                                                        | shapely                                                                        |

## Null and provenance policy (applies to every pipeline)

- Missing, suppressed or incompatible values stay `null`; never coerce to
  zero, never estimate, never average published percentages or medians.
- Generated records carry provenance: publisher URL, source table and cell,
  workbook SHA-256, retrieval date and the ABS randomisation note where it
  applies. The census scripts verify recorded SHA-256 before reading cells.
- Raw publisher files keep their original filenames; zone ZIPs stay zipped.
- Generated outputs, QA reports and source manifests are committed; raw
  caches, secrets and browser downloads are not, unless the repository
  already deliberately vendors that source (VGV workbooks, Mesh Block
  counts workbook).

## Sequences

**Onboarding sequence:** `START-HERE.md` in this directory is the contract
(identity freeze, source audit, pilot record, dependency-order integration,
rubric, batch report). The matrix above tells you where every source lives.

**Source-refresh sequence** (any pipeline):

1. Confirm the refresh is actually requested; a refresh is never a side
   effect of UI work.
2. Check `OWNER-DOWNLOADS.md` for whether the agent may fetch the file or
   must request an owner download.
3. Place or cache the file in the canonical location from the matrix.
4. Run the pipeline's test file, then the build command, then review the QA
   and outlier outputs before committing regenerated datasets.
5. Run `npm run test` and `npm run build` at the root.

**Scoring-change boundary:** nothing in this directory or in `tools/`
authorises changes to scoring. Formulas, weights, bands, presets and gates
live in `src/data/dwelling/` (`decideStrategies.js`, `fitBands.js`,
`relativeScoring.js`, adapters) and `src/composables/useAreaRanking.js`, and
change only when the owner explicitly asks for scoring work.
