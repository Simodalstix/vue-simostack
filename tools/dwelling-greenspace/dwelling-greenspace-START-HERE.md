# `/dwelling` greenspace pipeline — start here

## Current status

The version-one method, suburb mapping and reproducible build pipeline are
complete for all 60 current Decide-page records.

The package intentionally does **not** contain made-up greenspace scores. Final
JSON/TypeScript values are emitted only after the spatial source files are
successfully downloaded and the generated QA report is reviewed.

This environment could retain the official ABS Mesh Block population workbook,
but it could not persist the larger ZIP/GeoJSON geometry downloads. Run the
pipeline in the repository through Codex, Claude CLI or a local Python
environment with internet access.

## What has already been decided

- Unit of analysis: the 35 current Decide-page records.
- Combined records pool population-weighted residential samples from their
  component SALs; component suburb percentages are not averaged.
- Residential samples: ABS 2021 Residential Mesh Blocks with usual-resident
  population weights.
- Distance method: straight-line metres in EPSG:7855 for version one.
- Final formula:

```text
greenspace =
  localOpenSpaceAccess × 0.50 +
  majorParkAccess      × 0.30 +
  natureCorridorAccess × 0.20
```

- Local access: population share within 400 m of eligible public open space,
  scaled so 95% coverage receives 10/10.
- Major park: population-weighted distance access to public parks/reserves of
  at least 5 ha.
- Nature corridor: population-weighted distance access to foreshore, river,
  creek, wetland, conservation, bushland and recreation-corridor features.
- Private and highly restricted land is excluded from local access.
- The current PARKRES layer is supplemental for major/nature access and does
  not replace the metropolitan local-open-space base.

## First command to give Codex or Claude CLI

Copy this bundle into the repository and provide `greenspace-codex-handoff.md`.
The agent should run:

```bash
python -m pip install -r requirements-greenspace.txt
pytest -q test-dwelling-greenspace.py

python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --config dwelling-greenspace-config.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace \
  --inspect-only
```

After source inspection, download the current official PARKRES spatial file and
run the full build with `--parkres /absolute/path/to/PARKRES-file`.

For an incremental build, repeat `--target-id` for each configured target in
the batch. `--mesh-blocks` accepts an official ABS SHP/GPKG/GeoJSON subset in
place of the national Mesh Block ZIP; this is useful with the official ABS
ArcGIS feature service when the national download is impractical.

The Ivanhoe pilot used this reproducible official-service subset (the builder
then spatially joins residential representative points to SAL 21246):

```bash
curl -fsSL -G \
  'https://geo.abs.gov.au/arcgis/rest/services/ASGS2021/MB/MapServer/0/query' \
  --data-urlencode 'where=1=1' \
  --data-urlencode 'geometry=145.02,-37.79,145.07,-37.74' \
  --data-urlencode 'geometryType=esriGeometryEnvelope' \
  --data-urlencode 'inSR=4326' \
  --data-urlencode 'spatialRel=esriSpatialRelIntersects' \
  --data-urlencode 'outFields=mb_code_2021,mb_category_2021' \
  --data-urlencode 'returnGeometry=true' \
  --data-urlencode 'outSR=4326' \
  --data-urlencode 'f=geojson' \
  -o /tmp/ivanhoe-mesh-blocks.geojson
```

## Expected generated files

- `dwelling-greenspace.json`
- `dwelling-greenspace.ts`
- `dwelling-greenspace-qa.csv`
- `dwelling-greenspace-source-inspection.json`
- `dwelling-greenspace-source-manifest.json`

Do not wire the result into scoring until the QA report and obvious outliers
have been reviewed.

## Manual review groups

- Coastal: St Kilda, Elwood, Middle Park, Mentone, Chelsea/Bonbeach,
  South Melbourne.
- River/creek: Burnley, Richmond, Collingwood/Abbotsford, Footscray,
  Yarraville, Spotswood.
- Major parks: Hawthorn, South Melbourne, Middle Park,
  Kensington/Flemington.
- Growth areas: Donnybrook, Craigieburn, Tarneit/Wyndham Vale.

If a result is wrong, change the documented classification or method and
regenerate all records. Do not hand-edit individual suburb scores.
