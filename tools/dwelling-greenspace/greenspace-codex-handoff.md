# Codex / Claude CLI handoff: build greenspace data

Use the supplied greenspace pipeline package to generate source-attributed
greenspace scores for all 35 current `/dwelling` Decide records.

Do not modify application scoring or UI in this task.

## Inputs

- `build-dwelling-greenspace.py`
- `dwelling-greenspace-targets.json`
- `dwelling-greenspace-config.json`
- `dwelling-greenspace-methodology.md`
- `requirements-greenspace.txt`
- `test-dwelling-greenspace.py`

Read the methodology before running the build.

## Steps

1. Install the requirements in an isolated environment.

2. Run:

```bash
pytest -q test-dwelling-greenspace.py
```

3. Run the source inspection first:

```bash
python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --config dwelling-greenspace-config.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace \
  --inspect-only
```

4. Review `dwelling-greenspace-source-inspection.json`.

Confirm the VPA source exposes the expected fields:

- status;
- access;
- open-space type;
- category and subcategory;
- park name;
- water-body and coastal indicators.

Do not broaden the eligible category filter merely to increase scores.
Private, highly restricted and non-recreational green-looking land must not be
treated as usable local greenspace.

5. Download the current official PARKRES spatial layer from DataVic and pass
its local SHP, GPKG or GeoJSON path using `--parkres`.

PARKRES supplements major parks and nature corridors only. It must not replace
the council-scale VPA local-park base or be assumed universally accessible.

6. Run the full build:

```bash
python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --config dwelling-greenspace-config.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace \
  --parkres /absolute/path/to/PARKRES.shp
```

7. Review `dwelling-greenspace-qa.csv`.

Report:

- top five and bottom five scores;
- every record with a review flag;
- unexpected coastal, river-corridor or major-park results;
- source category values excluded by the current rules;
- any download, CRS, geometry or population-coverage issue.

8. Check these outlier groups manually:

- Coastal: St Kilda, Elwood, Middle Park, Mentone, Chelsea/Bonbeach,
  South Melbourne.
- River/creek corridor: Burnley, Richmond, Collingwood/Abbotsford,
  Footscray, Yarraville, Spotswood.
- Large-park access: Hawthorn, South Melbourne, Middle Park,
  Kensington/Flemington.
- Growth areas: Donnybrook, Craigieburn, Tarneit/Wyndham Vale.

9. Do not hand-edit an individual suburb score.

If a result is wrong, change a documented classification or threshold and
regenerate all 35 records.

10. Do not integrate the generated score into the application until the QA
report has been reviewed.

## Required output

Return:

- generated JSON and TypeScript;
- QA CSV;
- source-inspection JSON;
- exact source file checksums;
- any proposed method changes;
- confirmation that combined suburb records pool population-weighted
  residential samples rather than averaging SAL scores.
