# `/dwelling` schools pipeline — start here

## Current status

Pipeline code, anchors config and tests are complete for all 60 Decide-page
records (including the July 2026 ten-area onboarding batch). The
package intentionally contains **no school data**: generated files are emitted
only after the two official source files are supplied and the QA report is
reviewed. 21 pytest cases cover the transform logic with synthetic fixtures.

## Inputs to download (operator step)

Place both under `tools/dwelling-schools/source/`:

1. **Victorian Government School Zones 2027** — data.vic.gov.au, the spatial
   ZIP (primary zones + per-year secondary zones, EPSG:3111).
2. **School Locations CSV** — data.vic.gov.au ("School Locations", latest
   edition): every Victorian school, all sectors, with coordinates.

Both are CC BY 4.0, (c) State of Victoria (Department of Education).

## Run

```bash
python -m pip install -r requirements-schools.txt
python -m pytest test-dwelling-schools.py
python build-dwelling-schools.py \
  --locations-csv source/<locations>.csv \
  --zones-zip source/<zones>.zip \
  --zone-year 2027
```

## What it emits

- `src/data/dwelling/schools/dwelling-school-points.js` — map markers for every
  zoned school plus every childhood-named school matched to an official
  location (all sectors). Replaces the 17 hand-placed provisional markers.
- `src/data/dwelling/schools/dwelling-school-zones.json` — simplified zone
  polygons (one geometry per distinct school+category, `areaIds` linkage),
  intended for dynamic import by the map.
- `src/data/dwelling/schools/dwelling-school-context.js` — per-record zoned
  primary/secondary summary for the suburb card.
- `dwelling-schools-qa.csv` + `dwelling-schools-outliers.md` — review before
  committing generated output.

## Decisions already made

- Anchor per record: first station point from `areaGeo.js`; tram/bus-only
  records fall back to the locality polygon representative point.
  `dwelling-schools-anchors.json` is generated from the app data — regenerate
  after adding records, never hand-edit.
- Zone lookup is point-in-polygon at the anchor. Anchors within 150 m of a
  zone boundary are flagged: the zone can flip within the catchment, so those
  records carry a verify-the-address caveat rather than a confident claim.
- Zones and points are DISPLAY CONTEXT ONLY — never scored, never read by the
  ranking engine. The schools criterion keeps reading
  `childhood.schoolStrength` until the evidence-backed strength table lands
  (separate session).
- Selective-entry / specialist / language schools have no zones by definition:
  markers only, never polygons.
- UI must carry two caveats: zones are for one zone year and enrolment
  decisions (the publisher states not for property purchase reliance), and any
  address must be verified at findmyschool.vic.gov.au.
