# Settle census context importer

`build-dwelling-community-context.py` extends the checked-in ABS 2021 SAL
community-context dataset from official General Community Profile workbooks.
It does not aggregate combined suburbs. Scoring reads only the explicitly
named derived fields (the Chinese-language lens, grouped other-language
communities lens, and Mingle criterion); everything else remains
descriptive.

`backfill-partner-pool-context.py` adds the exact 35-44 Census measure used by
Mingle plus nearby neutral context (`unpartnered2554` from G06 and
`loneParentFamilies` from G29) to every record of the checked-in dataset and
regenerates `dwelling-community-context-qa.csv`. It verifies each workbook
against the SHA-256 recorded on its record and asserts the G06/G29 row labels
before reading any cell. Mingle uses only `unpartnered3544`, the exact G06 age
band matching the owner's near-40 preference. The broader 25-54 measure and
G29 one-parent-family counts remain descriptive and never enter Mingle.

Requires Python 3.10+ and `openpyxl>=3.1`.

## Inputs

- `dwelling-community-context-targets.json` lists the exact SAL records to add.
- Each workbook must be stored in a local cache as `GCP_SAL<code>.xlsx`.
- Workbooks come from the ABS URL recorded in every generated record:
  `https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL<code>/download/GCP_SAL<code>.xlsx`.

The importer records the workbook SHA-256 and preserves the source table,
source cell, denominator, basis and ABS privacy note for each measure.

## Run

```bash
python tools/dwelling-census/build-dwelling-community-context.py \
  --dataset src/data/dwelling/dwelling-community-context-2021.ts \
  --targets tools/dwelling-census/dwelling-community-context-targets.json \
  --cache /path/to/gcp-workbooks \
  --out /tmp/dwelling-community-context-2021.ts \
  --retrieved-at YYYY-MM-DD
```

Review the output and run the dwelling tests before replacing the checked-in
dataset. The importer is append-only: existing SAL records remain unchanged.

```bash
python tools/dwelling-census/backfill-partner-pool-context.py \
  --dataset src/data/dwelling/dwelling-community-context-2021.ts \
  --cache /path/to/gcp-workbooks \
  --out /tmp/dwelling-community-context-2021.ts \
  --qa-out tools/dwelling-census/dwelling-community-context-qa.csv \
  --generated-at YYYY-MM-DD
```
