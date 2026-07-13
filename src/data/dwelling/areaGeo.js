// src/data/dwelling/areaGeo.js
//
// Geographic registry for the Decide map. Keyed by areaCorridors[].id — the SAME
// id that strategies[].lensSuburbs already reference — so this is a stable
// extension of the existing linkage, never a parallel identity scheme.
//
// This file is PURELY geographic: verified station points, the localities a
// record covers, and nothing else. It carries NO colours, NO presentation
// classes and NO scores. Scores, prices and catchment radius come from
// areaCorridors.js at render time (single source of truth). The GeoJSON builder
// in ./areaGeoFeatures.js reads catchmentMetres off each ranking record.
//
// COORDINATES are longitude-first ([lng, lat], GeoJSON order) and are
// OpenStreetMap-derived to roughly station-platform precision. They are
// provisional like the rest of the dwelling dataset: `verifiedAt` is set only
// where a coordinate was cross-checked against a public source during this
// pass, and null otherwise. A wrong dot is a map bug, so treat these as
// re-verifiable, not authoritative. Straight-line catchment radii are drawn
// from these points; they are NOT walking-network isochrones.
//
// MANY-TO-MANY by design: a combined record (Seddon / West Footscray,
// Carnegie / Oakleigh, Brunswick / Coburg) lists every station point it spans,
// and the map draws one catchment per point sharing that record's single score.
// Do NOT derive canonical ids from the human-readable `suburb`/`station` labels
// at runtime — always key off the record id.

import { areaCorridors } from './areaCorridors.js'
import { strategies } from './strategies.js'

// Shorthand: coordinates cross-checked against a public gazetteer this pass.
const V = '2026-07-13'
const OSM = 'OpenStreetMap'

export const areaGeo = {
  // ---- Inner ---------------------------------------------------------------
  'inner-south-yarra-2br': {
    localityNames: ['South Yarra'],
    stationPoints: [
      {
        id: 'south-yarra',
        name: 'South Yarra',
        coordinates: [144.9924, -37.8389],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'anzac',
        name: 'Anzac (Metro Tunnel)',
        coordinates: [144.9758, -37.8407],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-richmond-2br': {
    localityNames: ['Richmond'],
    stationPoints: [
      {
        id: 'richmond',
        name: 'Richmond',
        coordinates: [144.9895, -37.8231],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'east-richmond',
        name: 'East Richmond',
        coordinates: [144.9931, -37.8266],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-collingwood-2br': {
    localityNames: ['Collingwood'],
    stationPoints: [
      {
        id: 'victoria-park',
        name: 'Victoria Park',
        coordinates: [144.9906, -37.7986],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'collingwood',
        name: 'Collingwood',
        coordinates: [144.9878, -37.8017],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-windsor-prahran-2br': {
    localityNames: ['Windsor', 'Prahran'],
    stationPoints: [
      {
        id: 'windsor',
        name: 'Windsor',
        coordinates: [144.9906, -37.8558],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'prahran',
        name: 'Prahran',
        coordinates: [144.9931, -37.8517],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-abbotsford-2br': {
    localityNames: ['Abbotsford'],
    stationPoints: [
      {
        id: 'victoria-park-abb',
        name: 'Victoria Park',
        coordinates: [144.9906, -37.7986],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'collingwood-abb',
        name: 'Collingwood',
        coordinates: [144.9878, -37.8017],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-lowcar-benchmark': {
    localityNames: ['Kensington', 'Flemington'],
    stationPoints: [
      {
        id: 'kensington',
        name: 'Kensington',
        coordinates: [144.9302, -37.7943],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'newmarket',
        name: 'Newmarket',
        coordinates: [144.927, -37.7876],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- West ----------------------------------------------------------------
  'sunshine-station-2br': {
    localityNames: ['Sunshine'],
    stationPoints: [
      {
        id: 'sunshine',
        name: 'Sunshine',
        coordinates: [144.8307, -37.788],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'footscray-station-2br': {
    localityNames: ['Footscray'],
    stationPoints: [
      {
        id: 'footscray',
        name: 'Footscray',
        coordinates: [144.9006, -37.8006],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'seddon-westfootscray-villa': {
    localityNames: ['Seddon', 'West Footscray'],
    stationPoints: [
      {
        id: 'seddon',
        name: 'Seddon',
        coordinates: [144.8906, -37.8079],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'west-footscray',
        name: 'West Footscray',
        coordinates: [144.876, -37.7997],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'established-western-value': {
    localityNames: ['St Albans'],
    stationPoints: [
      {
        id: 'st-albans',
        name: 'St Albans',
        coordinates: [144.7997, -37.7445],
        source: OSM,
        verifiedAt: V,
      },
    ],
  },

  // ---- North ---------------------------------------------------------------
  'northwest-villa-corridor': {
    localityNames: ['Pascoe Vale', 'Glenroy'],
    stationPoints: [
      {
        id: 'pascoe-vale',
        name: 'Pascoe Vale',
        coordinates: [144.937, -37.7297],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'glenroy',
        name: 'Glenroy',
        coordinates: [144.9163, -37.7057],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'upfield-corridor': {
    localityNames: ['Brunswick', 'Coburg'],
    stationPoints: [
      {
        id: 'brunswick',
        name: 'Brunswick',
        coordinates: [144.9601, -37.7686],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'jewell',
        name: 'Jewell',
        coordinates: [144.9614, -37.7746],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'coburg',
        name: 'Coburg',
        coordinates: [144.9639, -37.7439],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'northern-rail-value': {
    localityNames: ['Reservoir'],
    stationPoints: [
      {
        id: 'reservoir',
        name: 'Reservoir',
        coordinates: [145.006, -37.7163],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'ruthven',
        name: 'Ruthven',
        coordinates: [145.0096, -37.702],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'ascot-vale-2br': {
    localityNames: ['Ascot Vale'],
    stationPoints: [
      {
        id: 'ascot-vale',
        name: 'Ascot Vale',
        coordinates: [144.9213, -37.777],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- East and south-east -------------------------------------------------
  'inner-se-apartment-corridor': {
    localityNames: ['Carnegie', 'Murrumbeena', 'Oakleigh'],
    stationPoints: [
      {
        id: 'carnegie',
        name: 'Carnegie',
        coordinates: [145.0558, -37.8877],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'murrumbeena',
        name: 'Murrumbeena',
        coordinates: [145.0672, -37.8887],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'oakleigh',
        name: 'Oakleigh',
        coordinates: [145.0888, -37.9003],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'se-value-corridor': {
    localityNames: ['Springvale', 'Noble Park', 'Clayton'],
    stationPoints: [
      {
        id: 'springvale',
        name: 'Springvale',
        coordinates: [145.152, -37.9483],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'noble-park',
        name: 'Noble Park',
        coordinates: [145.1743, -37.9662],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'clayton',
        name: 'Clayton',
        coordinates: [145.1207, -37.9243],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- South ---------------------------------------------------------------
  'frankston-middle-ring': {
    localityNames: ['Moorabbin', 'Highett', 'Cheltenham'],
    stationPoints: [
      {
        id: 'moorabbin',
        name: 'Moorabbin',
        coordinates: [145.0397, -37.9394],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'highett',
        name: 'Highett',
        coordinates: [145.043, -37.949],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'cheltenham',
        name: 'Cheltenham',
        coordinates: [145.0533, -37.9636],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- Outer growth areas (control group) ----------------------------------
  'growth-corridor-stress-test': {
    localityNames: ['Tarneit', 'Wyndham Vale'],
    stationPoints: [
      {
        id: 'tarneit',
        name: 'Tarneit',
        coordinates: [144.6946, -37.8322],
        source: OSM,
        verifiedAt: V,
      },
      {
        id: 'wyndham-vale',
        name: 'Wyndham Vale',
        coordinates: [144.6227, -37.8877],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'craigieburn-townhouse': {
    localityNames: ['Craigieburn'],
    stationPoints: [
      {
        id: 'craigieburn',
        name: 'Craigieburn',
        coordinates: [144.9431, -37.6023],
        source: OSM,
        verifiedAt: V,
      },
    ],
  },
  'donnybrook-house-land': {
    localityNames: ['Donnybrook'],
    stationPoints: [
      {
        id: 'donnybrook',
        name: 'Donnybrook',
        coordinates: [144.9701, -37.542],
        source: OSM,
        verifiedAt: V,
      },
    ],
  },
}

// Strategy ids that apply to each area, derived (not hand-duplicated) from the
// existing strategies[].lensSuburbs many-to-many linkage. Keyed by area id.
export const strategyIdsByArea = (() => {
  const map = {}
  for (const s of strategies) {
    for (const areaId of s.lensSuburbs || []) {
      ;(map[areaId] ||= []).push(s.id)
    }
  }
  return map
})()

// Dev-only integrity check: warn about any scored ranking record with no map
// configuration (it would silently vanish from the map), any geo entry with no
// station points, and any geo entry pointing at a record that no longer exists.
export function validateAreaGeo() {
  const recIds = new Set(areaCorridors.map((r) => r.id))
  const warnings = []
  for (const rec of areaCorridors) {
    if (rec.scored === false) continue
    const geo = areaGeo[rec.id]
    if (!geo)
      warnings.push(`ranking record "${rec.id}" has no map configuration (won't appear on the map)`)
    else if (!geo.stationPoints?.length) warnings.push(`"${rec.id}" has no station points`)
  }
  for (const key of Object.keys(areaGeo)) {
    if (!recIds.has(key))
      warnings.push(`geo entry "${key}" references a non-existent ranking record`)
  }
  for (const w of warnings) console.warn(`[areaGeo] ${w}`)
  return warnings
}

if (import.meta.env && import.meta.env.DEV) validateAreaGeo()
