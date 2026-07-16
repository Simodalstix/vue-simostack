# Dwelling census context importer

`build-dwelling-community-context.py` extends the checked-in ABS 2021 SAL
community-context dataset from official General Community Profile workbooks.
It does not aggregate combined suburbs and does not connect demographic data
to ranking or scoring.

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
