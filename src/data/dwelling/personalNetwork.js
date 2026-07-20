// Personal-network access for the Settle score. Geometry is deliberately
// anchor-to-anchor: the public South Yarra friend reference point to the
// record's first declared station/transit anchor in areaGeo.js. Locality
// polygons, centroids and nearest-boundary distances are never score inputs.
//
// Records without a declared station anchor remain null. This is preferable
// to letting a large polygon (notably Melbourne CBD) appear artificially close
// because one edge stretches toward South Yarra.

import { areaCorridors } from './areaCorridors.js'
import { areaGeo } from './areaGeo.js'
import { publicAnchors } from './personalAnchors.js'

export const PERSONAL_NETWORK_REFERENCE_ANCHOR_ID = 'nathan'
export const PERSONAL_NETWORK_DISTANCE_BANDS = [
  { maxKm: 1.5, score: 10 },
  { maxKm: 3, score: 8 },
  { maxKm: 6, score: 6 },
]

export const PERSONAL_NETWORK_DATASET = {
  anchor: 'South Yarra public reference point (personalAnchors.js)',
  method: 'Haversine distance from reference point to the first declared area station anchor',
  bands: '<=1.5km:10, <=3km:8, <=6km:6, >6km:not assessed',
  geometryRule: 'Point-to-point only; locality polygons are excluded',
  asAt: 'July 2026',
}

const referenceAnchor = publicAnchors.find(
  (anchor) => anchor.id === PERSONAL_NETWORK_REFERENCE_ANCHOR_ID,
)

function radians(degrees) {
  return (degrees * Math.PI) / 180
}

export function anchorDistanceKm(fromCoordinates, toCoordinates) {
  if (
    !Array.isArray(fromCoordinates) ||
    !Array.isArray(toCoordinates) ||
    !fromCoordinates.every(Number.isFinite) ||
    !toCoordinates.every(Number.isFinite)
  )
    return null

  const [fromLongitude, fromLatitude] = fromCoordinates
  const [toLongitude, toLatitude] = toCoordinates
  const latitudeDelta = radians(toLatitude - fromLatitude)
  const longitudeDelta = radians(toLongitude - fromLongitude)
  const fromLatitudeRadians = radians(fromLatitude)
  const toLatitudeRadians = radians(toLatitude)
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitudeRadians) * Math.cos(toLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2

  return 2 * 6371 * Math.asin(Math.sqrt(haversine))
}

export function pnScore(distanceKm) {
  if (!Number.isFinite(distanceKm)) return null
  return PERSONAL_NETWORK_DISTANCE_BANDS.find((band) => distanceKm <= band.maxKm)?.score ?? null
}

function personalNetworkFor(record) {
  const stationAnchor = areaGeo[record.id]?.stationPoints?.[0] ?? null
  const referenceCoordinates = referenceAnchor?.coordinates ?? [
    referenceAnchor?.longitude,
    referenceAnchor?.latitude,
  ]
  const distanceKm = stationAnchor
    ? anchorDistanceKm(referenceCoordinates, stationAnchor.coordinates)
    : null

  return {
    referenceAnchorId: referenceAnchor?.id ?? null,
    referenceAnchorName: referenceAnchor?.label ?? null,
    stationAnchorId: stationAnchor?.id ?? null,
    stationAnchorName: stationAnchor?.name ?? null,
    stationAnchorCoordinates: stationAnchor?.coordinates ?? null,
    distanceKm,
    score: pnScore(distanceKm),
    method: PERSONAL_NETWORK_DATASET.method,
  }
}

export const personalNetworkByAreaId = Object.fromEntries(
  areaCorridors.map((record) => [record.id, personalNetworkFor(record)]),
)
