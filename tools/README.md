# tools/ — Settle offline pipelines

Python pipelines that turn official publisher files into the generated
datasets committed under `src/data/dwelling/`. Nothing here runs at site
build or runtime. Start at the root `AGENTS.md`; the full source, command
and output matrix is `dwelling-onboarding/SOURCE-PIPELINE-MATRIX.md`.

Rule of thumb: generated app datasets are never hand-edited. Edit the source
or config here, rerun the pipeline, review its QA output, then commit the
regenerated dataset.

## Directories

| Directory              | Purpose                                                                                                                                                              | Raw inputs                                                                            | Docs                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------- |
| `dwelling-onboarding/` | The suburb onboarding contract: workflow, rubric, owner-download policy and the source/pipeline matrix. No code.                                                     | n/a                                                                                   | `START-HERE.md`                     |
| `dwelling-cost/`       | VGV house/unit sales medians per record, optional Domain enrichment.                                                                                                 | `source/*.xlsx` (tracked, owner-downloaded)                                           | `START-HERE.md`                     |
| `dwelling-census/`     | ABS 2021 GCP community context importer and backfills.                                                                                                               | `GCP_SAL<code>.xlsx` in a local cache (not retained in repo)                          | `README.md`                         |
| `dwelling-schools/`    | School points, zone polygons and per-record zone context.                                                                                                            | `source/` (gitignored; CSV + zones ZIP on owner's machine only)                       | `dwelling-schools-START-HERE.md`    |
| `dwelling-greenspace/` | Population-weighted greenspace access; also owns the shared 119-record target registry `dwelling-greenspace-targets.json` used by the cost and safety pipelines too. | `source/Mesh_Block_Counts_2021.xlsx` (tracked); large geometry in untracked `.cache/` | `dwelling-greenspace-START-HERE.md` |
| `dwelling-safety/`     | Audit-only candidate Safety model from CSA suburb offence counts; no live ranking impact.                                                                            | Owner-supplied CSA LGA workbook outside the repository                                | `START-HERE.md`                     |
| `dwelling-geo/`        | `add-locality.py`: append one Vicmap locality polygon to the vendored map asset.                                                                                     | WFS GeoJSON response (recipe in `src/assets/geo/README.md`)                           | script docstring                    |

## Tracked vs untracked raw files

- Tracked (vendored on purpose): VGV workbooks in `dwelling-cost/source/`,
  Mesh Block counts workbook in `dwelling-greenspace/source/`.
- Untracked on purpose: everything in `dwelling-schools/source/`, ABS GCP
  workbook caches, `.cache/dwelling-greenspace/` geometry downloads.
- Root `.gitignore` has `*.txt`: new requirements or notes files ending in
  `.txt` need `git add -f` (this is why the greenspace requirements file
  referenced by its start-here is not in the repo).
- The CSA safety workbook stays outside the repository. The safety builder
  validates its SHA-256 and commits only audit, QA, outlier and source-manifest
  artifacts.

Do not move, rename or delete owner-downloaded raw files. If a file seems to
be in the wrong place, document it and ask; the canonical locations are in
the matrix.

## Tests

```bash
cd tools/dwelling-cost      && pytest test-dwelling-cost.py
cd tools/dwelling-greenspace && pytest -q test-dwelling-greenspace.py
cd tools/dwelling-schools   && python -m pytest test-dwelling-schools.py
python3 tools/dwelling-safety/test-dwelling-safety.py
```

The census scripts have no pytest file; they verify workbook SHA-256 and row
labels at run time instead.
