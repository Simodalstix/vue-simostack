// src/data/dwelling/localityFeatures.js
//
// Joins the vendored Vicmap locality polygons (src/assets/geo/
// melbourne-localities.geojson, names only) with the areaGeo registry at build
// time. The asset stays purely geographic; the assessed/areaId linkage lives
// HERE, derived from areaGeo localityNames — never baked into the GeoJSON and
// never derived from display labels at runtime.
//
// Every feature gets:
//   id (integer)            - for MapLibre feature-state (hover/selected)
//   properties.name         - real individual locality name (Title Case)
//   properties.areaIds      - ranking-record ids this locality belongs to
//                             ([] = context-only, not assessed)
//   properties.primaryAreaId - first ranked record id for click / hover routing
//   properties.assessed     - convenience boolean for paint expressions
//
// Grouped ranking records (Brunswick / Coburg, Seddon / West Footscray, ...)
// therefore link MANY locality features to ONE areaId; selecting the record
// outlines every linked polygon while each keeps its own geographic name.

import { areaGeo } from './areaGeo.js'
import localitiesRaw from '@/assets/geo/melbourne-localities.geojson?raw'

// areaIds per UPPER-CASE locality name (a locality may serve several records).
const areaIdsByLocality = {}
for (const [areaId, geo] of Object.entries(areaGeo)) {
  for (const n of geo.localityNames) {
    const k = n.toUpperCase()
    ;(areaIdsByLocality[k] ||= []).push(areaId)
  }
}

const parsed = JSON.parse(localitiesRaw)

export const localityFeatures = {
  type: 'FeatureCollection',
  features: parsed.features.map((f, i) => {
    const areaIds = areaIdsByLocality[f.properties.name.toUpperCase()] || []
    return {
      type: 'Feature',
      id: i,
      properties: {
        name: f.properties.name,
        areaIds,
        primaryAreaId: areaIds[0] || null,
        assessed: areaIds.length > 0,
      },
      geometry: f.geometry,
    }
  }),
}

// Integer feature ids per areaId, for selected/hover feature-state fan-out.
export const localityIdsByArea = (() => {
  const map = {}
  for (const f of localityFeatures.features) {
    for (const areaId of f.properties.areaIds) (map[areaId] ||= []).push(f.id)
  }
  return map
})()

function geomBounds(geom, b) {
  const ring = (r) => {
    for (const [x, y] of r) {
      if (x < b[0]) b[0] = x
      if (y < b[1]) b[1] = y
      if (x > b[2]) b[2] = x
      if (y > b[3]) b[3] = y
    }
  }
  if (geom.type === 'Polygon') geom.coordinates.forEach(ring)
  else if (geom.type === 'MultiPolygon') geom.coordinates.forEach((p) => p.forEach(ring))
  return b
}

// [w, s, e, n] over every locality polygon linked to an areaId (plus nothing
// else — the caller may union in station points). Used for the selection fit.
export const localityBoundsByArea = (() => {
  const map = {}
  for (const f of localityFeatures.features) {
    for (const areaId of f.properties.areaIds) {
      map[areaId] = geomBounds(
        f.geometry,
        map[areaId] || [Infinity, Infinity, -Infinity, -Infinity],
      )
    }
  }
  return map
})()

// Dev-time integrity: every scored record should have at least one polygon.
if (import.meta.env && import.meta.env.DEV) {
  for (const areaId of Object.keys(areaGeo)) {
    if (!localityIdsByArea[areaId])
      console.warn(`[localityFeatures] no locality polygon matched record "${areaId}"`)
  }
}
