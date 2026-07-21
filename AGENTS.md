# AGENTS.md — start here

Canonical entry point for any coding agent working in this repository. Read
this file first in every new session, then follow the read order for your task
type below. Do not audit sources, download datasets, rerun pipelines or start
onboarding until the decision tree says your task requires it.

## What is in this repository

`simostack.com`, a Vue 3 + Vite single-page site, plus **Settle**, the
Melbourne suburb decision tool at `/tool/settle`. Settle is the largest
feature and has its own data layer (`src/data/dwelling/`) and offline Python
pipelines (`tools/`). The site also has a private travel-timeline map at
`/clearance`; that separate feature is documented in `CLAUDE.md`, which is
about the travel map only and says nothing about Settle.

## Classify the task first

Decide which one of these the request is before touching anything:

1. **UI/application-only work** — Vue components, views, routing, styling,
   composables, copy changes, layout or interaction fixes.
2. **Suburb onboarding** — adding one or more new suburbs as Settle records.
3. **Source acquisition or refresh** — obtaining or updating a raw publisher
   file (VGV workbooks, ABS workbooks, school CSV/ZIP, spatial layers).
4. **Pipeline maintenance** — changing a Python builder, its config, targets,
   QA or tests under `tools/`.
5. **Scoring-layer work** — changing formulas, weights, bands, presets, gates
   or score adapters. This is the most protected category.

### Decision tree

```
Does the request change how anything looks or behaves in the browser,
without needing new or different data?
├── YES → UI/application-only. Work in src/ (components, views,
│         composables, router). Do NOT audit sources, download anything,
│         rerun any pipeline or touch generated datasets. Read order:
│         this file → src/data/dwelling/README.md (only if you must read
│         data shapes) → the component you are changing.
└── NO → Does it add a new suburb to Settle?
    ├── YES → Suburb onboarding. Read order: this file →
    │         tools/dwelling-onboarding/START-HERE.md →
    │         tools/dwelling-onboarding/SOURCE-PIPELINE-MATRIX.md →
    │         ONBOARDING-RUBRIC.md → OWNER-DOWNLOADS.md.
    └── NO → Does it need a new or refreshed raw publisher file?
        ├── YES → Source acquisition/refresh. Read order: this file →
        │         tools/dwelling-onboarding/SOURCE-PIPELINE-MATRIX.md →
        │         OWNER-DOWNLOADS.md → the pipeline's own start-here doc.
        └── NO → Does it change a Python builder, targets, config or QA?
            ├── YES → Pipeline maintenance. Read order: this file →
            │         SOURCE-PIPELINE-MATRIX.md → the pipeline's own
            │         start-here doc → its test file.
            └── NO → Does it change scores, weights, bands, gates,
                     presets or adapters?
                ├── YES → Scoring-layer work. Requires explicit owner
                │         intent. Read order: this file →
                │         src/data/dwelling/README.md → decideStrategies.js
                │         → useAreaRanking.js → the affected adapter.
                └── NO → Reclassify; ask the owner if genuinely ambiguous.
```

### The UI-only rule (non-negotiable)

UI or application-only work must not trigger source auditing, dataset
downloads, pipeline reruns or suburb onboarding unless the requested change
directly requires them. A styling fix, a component refactor or a copy change
never requires a pipeline run. Generated datasets and runtime suburb records
are read-only inputs for UI work.

## Repository map

| Concern                                                           | Location                                                              |
| ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Settle routes (`/tool/settle`, `/overview`, `/decide`)            | `src/router/routes.js` (`SETTLE_PATHS`)                               |
| Settle views                                                      | `src/views/dwelling/` (`DwellingShell.vue`, `DwellingDecideView.vue`) |
| Settle components                                                 | `src/components/dwelling/` (map, cards, drawer, overview)             |
| Ranking engine and commute scoring                                | `src/composables/useAreaRanking.js`, `useCommuteScoring.js`           |
| Runtime suburb data, scoring adapters, generated datasets         | `src/data/dwelling/` (see its README)                                 |
| Map geometry assets (local-only, no third-party tiles)            | `src/assets/geo/` (see its README)                                    |
| Offline Python pipelines and raw sources                          | `tools/` (see `tools/README.md`)                                      |
| Onboarding contract, rubric, owner-download policy, source matrix | `tools/dwelling-onboarding/`                                          |
| Travel-timeline map feature (unrelated to Settle)                 | `CLAUDE.md`, `src/views/ClearanceView.vue`, `src/data/clearance/`     |
| Prep/interview data (unrelated to Settle)                         | `src/data/prep/`                                                      |

## Boundary rules that protect the data

- **Generated files are never hand-edited.** Census, cost, schools and
  greenspace datasets in `src/data/dwelling/` are pipeline outputs. Edit the
  source or config, rerun the pipeline, review the QA output.
- **Missing evidence is `null` or `scored: false`**, never zero and never a
  guess. Nulls drop out of the weighted mean.
- **Provenance is mandatory.** Records cite `areaSources.js` IDs; generated
  records carry source table, cell, SHA-256 and retrieval date.
- **Scoring changes are their own task type.** Onboarding and UI work must
  not change formulas, weights, gates, presets or strategy definitions.
- **Geometry is context, not score.** Locality, zone and park polygons never
  feed ranking directly; only named score adapters do.

## Repository gotchas

- Root `.gitignore` contains `*.txt`. The tracked `requirements-*.txt` files
  override it, but any **new** `.txt` file needs `git add -f`. This is why
  `tools/dwelling-greenspace/requirements-greenspace.txt` (referenced by that
  pipeline's start-here) is absent from the repository.
- `tools/dwelling-schools/source/` is gitignored. The school CSV and zones
  ZIP exist only on the owner's machine and are absent in a fresh clone.
  Their absence is not an error and is not a reason to download anything.
- ABS General Community Profile workbooks are deliberately not retained;
  they live in a local cache passed to the census scripts via `--cache`.
- `src/data/dwelling/personalAnchors.local.js` is gitignored; exact personal
  coordinates never enter the repository.
- `*.docx` is gitignored (sensitive PV documents, never commit).
- `dwelling-census-context-2021.ts` is only a backward-compatible re-export
  of `dwelling-community-context-2021.ts`; the latter is the real dataset.

## Validation commands that exist

From the repository root (Node):

```bash
npm run test      # vitest run: src/data/dwelling/__tests__ + src/router/__tests__
npm run build     # vite build
npm run lint      # eslint . --fix
npx prettier --check <files>
```

Python pipeline tests (run from each tool directory; see the matrix for
dependency install):

```bash
pytest test-dwelling-cost.py        # in tools/dwelling-cost/
pytest -q test-dwelling-greenspace.py  # in tools/dwelling-greenspace/
python -m pytest test-dwelling-schools.py  # in tools/dwelling-schools/
```

There are no census pipeline tests; the census scripts validate workbook
SHA-256 and row labels at run time.

## Required read order (summary)

1. This file, always.
2. `tools/dwelling-onboarding/SOURCE-PIPELINE-MATRIX.md` for anything that
   touches data, sources or pipelines.
3. The task-type documents from the decision tree above.
4. `src/data/dwelling/README.md` before editing anything in that directory.
