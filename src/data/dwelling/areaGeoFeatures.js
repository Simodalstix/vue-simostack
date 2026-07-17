// src/data/dwelling/areaGeoFeatures.js
//
// Turns the geographic registry (areaGeo) plus the ranking records
// (areaCorridors) into MapLibre-ready station GeoJSON. Geometry is DERIVED
// here, not hand-authored, so coordinates live in one place: areaGeo.
//
// Feature `id` is an integer index per ranking record. Multiple station points
// belonging to one grouped record share it, so one map.setFeatureState() call
// updates them together. Scores/colours are never baked into these features.

import { areaCorridors } from './areaCorridors.js'
import { areaGeo } from './areaGeo.js'
import { localityFeatures } from './localityFeatures.js'

// Stable record ordering -> integer feature-state id. Only records that have BOTH
// a ranking entry and a geo entry get a slot.
export const AREA_INDEX = areaCorridors.filter((rec) => areaGeo[rec.id]).map((rec) => rec.id)

export const areaIndexById = Object.fromEntries(AREA_INDEX.map((id, i) => [id, i]))

const recordById = Object.fromEntries(areaCorridors.map((r) => [r.id, r]))

function buildFeatures() {
  const points = []

  for (const areaId of AREA_INDEX) {
    const rec = recordById[areaId]
    const geo = areaGeo[areaId]
    const fid = areaIndexById[areaId]
    const props = {
      areaId,
      suburb: rec.suburb,
      region: rec.region,
      unscored: rec.scored === false,
    }

    for (const sp of geo.stationPoints) {
      points.push({
        type: 'Feature',
        id: fid,
        properties: { ...props, stationId: sp.id, stationName: sp.name },
        geometry: { type: 'Point', coordinates: sp.coordinates },
      })
    }
  }

  return { type: 'FeatureCollection', features: points }
}

export const stationPointFeatures = buildFeatures()

function extendBoundsPoint(bounds, lng, lat) {
  if (lng < bounds[0]) bounds[0] = lng
  if (lat < bounds[1]) bounds[1] = lat
  if (lng > bounds[2]) bounds[2] = lng
  if (lat > bounds[3]) bounds[3] = lat
}

function extendBoundsGeometry(bounds, geometry) {
  const ring = (coords) => {
    for (const [lng, lat] of coords) extendBoundsPoint(bounds, lng, lat)
  }

  if (geometry.type === 'Polygon') geometry.coordinates.forEach(ring)
  else if (geometry.type === 'MultiPolygon')
    geometry.coordinates.forEach((poly) => poly.forEach(ring))
}

// Bounding box [west, south, east, north] over the rendered suburb context plus
// station points, so the map fits the actual geographic frame rather than only
// the marker centroids.
export const areaBounds = (() => {
  const bounds = [Infinity, Infinity, -Infinity, -Infinity]

  for (const f of localityFeatures.features) extendBoundsGeometry(bounds, f.geometry)
  for (const f of stationPointFeatures.features) {
    const [lng, lat] = f.geometry.coordinates
    extendBoundsPoint(bounds, lng, lat)
  }
  return bounds
})()
