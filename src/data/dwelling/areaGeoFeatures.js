// src/data/dwelling/areaGeoFeatures.js
//
// Turns the geographic registry (areaGeo) plus the ranking records
// (areaCorridors) into MapLibre-ready GeoJSON. Geometry is DERIVED here, not
// hand-authored, so there is one source of truth: coordinates live in areaGeo,
// catchment radius lives on each ranking record (`catchmentMetres`).
//
// Two FeatureCollections:
//   catchmentFeatures  - one straight-line radius circle per station point
//   stationPointFeatures - one marker per station point
//
// Feature `id` is an integer INDEX PER RECORD (not per circle). Every circle and
// marker belonging to the same ranking record shares that id, so a single
// map.setFeatureState() call recolours the whole record at once. The stable
// string record id travels in properties.areaId. Scores/colours are NEVER baked
// into these features; the component applies them live via feature-state.
//
// The circles are straight-line radii, NOT walking-network isochrones. The map
// caption says so.

import { areaCorridors } from './areaCorridors.js'
import { areaGeo } from './areaGeo.js'
import { localityFeatures } from './localityFeatures.js'

// Stable record ordering -> integer feature-state id. Only records that have BOTH
// a ranking entry and a geo entry get a slot.
export const AREA_INDEX = areaCorridors
  .filter((rec) => rec.scored !== false && areaGeo[rec.id])
  .map((rec) => rec.id)

export const areaIndexById = Object.fromEntries(AREA_INDEX.map((id, i) => [id, i]))

const recordById = Object.fromEntries(areaCorridors.map((r) => [r.id, r]))

// Approximate a geodesic circle as a closed lng/lat ring. Good enough at the
// 700-1500 m scale of a station catchment on a city-wide map.
function circleRing(center, radiusMetres, steps = 64) {
  const [lng, lat] = center
  const dLat = radiusMetres / 111320
  const dLng = radiusMetres / (111320 * Math.cos((lat * Math.PI) / 180))
  const ring = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI
    ring.push([lng + dLng * Math.cos(t), lat + dLat * Math.sin(t)])
  }
  return ring
}

function buildFeatures() {
  const catchments = []
  const points = []

  for (const areaId of AREA_INDEX) {
    const rec = recordById[areaId]
    const geo = areaGeo[areaId]
    const fid = areaIndexById[areaId]
    const radius = rec.catchmentMetres || 800
    const props = {
      areaId,
      suburb: rec.suburb,
      region: rec.region,
    }

    for (const sp of geo.stationPoints) {
      catchments.push({
        type: 'Feature',
        id: fid,
        properties: { ...props, stationId: sp.id, stationName: sp.name },
        geometry: { type: 'Polygon', coordinates: [circleRing(sp.coordinates, radius)] },
      })
      points.push({
        type: 'Feature',
        id: fid,
        properties: { ...props, stationId: sp.id, stationName: sp.name },
        geometry: { type: 'Point', coordinates: sp.coordinates },
      })
    }
  }

  return {
    catchmentFeatures: { type: 'FeatureCollection', features: catchments },
    stationPointFeatures: { type: 'FeatureCollection', features: points },
  }
}

const built = buildFeatures()
export const catchmentFeatures = built.catchmentFeatures
export const stationPointFeatures = built.stationPointFeatures

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
