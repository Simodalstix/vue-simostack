# Dwelling Decide map — geographic assets

The Decide map is **local-only**. It makes no runtime request to Google Maps,
Mapbox, third-party basemap tiles or any boundary API. The route is behind the
site auth gate and must stay network-silent for third parties.

## What renders

There is **no basemap**. MapLibre draws on a blank dark canvas. The only
geometry shown is our own:

1. **Catchment circles** — a straight-line radius per station point, sized from
   each ranking record's `catchmentMetres` (700–1500 m).
2. **Station markers** — one point per station.

Both are **derived at build time**, not vendored as static files, so geometry
never drifts from the data:

- Coordinates live in [`src/data/dwelling/areaGeo.js`](../../data/dwelling/areaGeo.js)
  (one registry entry per ranking record, keyed by the record `id`).
- Radius comes from `catchmentMetres` on each record in `areaCorridors.js`.
- [`src/data/dwelling/areaGeoFeatures.js`](../../data/dwelling/areaGeoFeatures.js)
  assembles the GeoJSON `FeatureCollection`s from those two inputs.

If a future phase wants real suburb-boundary polygons underneath the circles,
vendor them here (e.g. ABS ASGS suburb/SAL boundaries, simplified) and layer
them faintly below the scored catchments.

## Coordinate source & honesty

- Station coordinates are **OpenStreetMap-derived**, to roughly platform
  precision, longitude-first (`[lng, lat]`, GeoJSON order).
- A handful were cross-checked against public gazetteers during authoring and
  carry `verifiedAt: '2026-07-13'`; the rest carry `verifiedAt: null` and should
  be treated as re-verifiable, consistent with the placeholder status of the
  whole dwelling dataset.
- The circles are **straight-line radii, not walking-network isochrones**. The
  map surfaces this caveat in its caption. A score applies to the defined
  station-catchment hypothesis, not to every street in the suburb.

## Combined records

Records that span more than one locality (e.g. `seddon-westfootscray-villa`,
`inner-se-apartment-corridor` = Carnegie / Murrumbeena / Oakleigh) list every
station point they cover. The map draws one circle per point, all sharing the
record's single score and colour. Canonical ids are always the record `id` —
never derived from the display label at runtime.
