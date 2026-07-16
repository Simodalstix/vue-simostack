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

A faint orientation basemap is vendored as `melbourne-coastline.geojson`: the
Port Phillip Bay / Yarra coastline, pulled from the OpenStreetMap Overpass API
(`natural=coastline` ways in the Melbourne bbox), converted to LineStrings and
Douglas-Peucker simplified (~40 KB, tolerance ~0.0012deg). It is drawn as a
faint line under the catchments and loaded as a same-origin bundled asset (no
third-party request). Re-fetch/re-simplify if the shoreline needs more detail.

## Locality polygons, bay fill, Yarra (retrieved 2026-07-13)

`melbourne-localities.geojson` — suburb/locality boundary polygons.

- **Source**: Victorian Government Vicmap open-data WFS,
  `https://opendata.maps.vic.gov.au/geoserver/wfs`, layer
  `open-data-platform:vmlite_locality_polygon` (Vicmap Lite, pre-generalised).
- **Licence**: Creative Commons Attribution 4.0 (State of Victoria, DEECA /
  Vicmap). Attribution: "(c) State of Victoria (Vicmap)".
- **CRS**: requested as `EPSG:4326`; source data is GDA2020 (EPSG:7844), which
  differs from WGS84 by centimetres — irrelevant at this scale.
- **Filtering**: `locality_name IN (...) AND state='VIC'` for the scored
  lens localities (taken from `areaGeo.js` localityNames — the single source of
  truth) plus ~40 hand-picked context neighbours (CBD, Southbank, bayside and
  adjoining suburbs). 72 polygons in the original pull; Kew, Balwyn, Box Hill
  and Sunbury were added 2026-07-14, and Spotswood, Armadale, Burnley,
  Hawthorn, McKinnon, Glen Waverley, Balwyn North and Mentone 2026-07-15, all
  with the same recipe and tolerance. Doncaster was added from the same WFS
  source on 2026-07-16 (85 polygons total).
- **Simplification**: Douglas-Peucker, tolerance 0.0004 deg (~40 m). ~37 KB.
- Properties carry `name` only (Title Case). The assessed/areaId linkage is
  derived at build time in `localityFeatures.js`, never baked into the asset.

`port-phillip-bay.geojson` — a single closed Port Phillip water polygon,
constructed from the OSM coastline ways above: the Bellarine shore (from Point
Lonsdale) and the north+east bay shore (Avalon > Melbourne > Frankston > Point
Nepean) were stitched by matching way endpoints, joined across the heads and
across the Corio arm (both joins cross open water), and DP-simplified at
0.0012 deg. Validated by point-in-polygon (bay centre inside, CBD/Footscray
outside). The Geelong/Corio arm west of ~144.40 is not covered; it sits outside
the map frame.

`yarra-river.geojson` — the Yarra centreline from the same Vicmap WFS, layer
`open-data-platform:vmlite_hy_watercourse`, `name='YARRA RIVER'`, clipped to
the map frame (144.80..145.25, -37.92..-37.68) and DP-simplified at 0.0004 deg.

Refetch recipe: WFS GetFeature with `service=WFS&version=2.0.0&
request=GetFeature&typeNames=<layer>&outputFormat=application/json&
srsName=EPSG:4326&cql_filter=<filter>`, then DP-simplify and strip properties.

## Label glyphs

`public/glyphs/Noto Sans Regular/0-255.pbf` — MapLibre SDF glyph range for the
locality-name symbol layer, vendored from `demotiles.maplibre.org/font/`
(Noto Sans is OFL-licensed). Served same-origin via the style's `glyphs` URL;
no runtime font request leaves the site. Range 0-255 covers all ASCII suburb
names; add further ranges only if a name ever needs them.

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
