// src/data/dwelling/areaEnrichment.js
//
// Per-suburb decision enrichment: the dimensions the brief wants VISIBLE and
// COMPARABLE but explicitly NOT turned into new weighting sliders (car
// dependence, Melbourne PT network reach, crime, kid activity access, unique
// character, broad environmental flags).
//
// This file ships SEEDED BUT EMPTY on purpose. Every record is 'not assessed'
// until the owner fills it from real research — nothing here is fabricated. The
// UI renders honest "not assessed" states, and the map hides any lens that has
// no data yet (no empty or invented lenses).
//
// Keyed by the areaCorridors record id (same id everywhere else). To fill one,
// replace the fields on that id, e.g.:
//
//   'footscray-station-2br': {
//     ...blank(),
//     carDependence: 'low',
//     ptNetworkReach: { score: 5, note: 'Regional + 3 metro lines + buses', provisional: true },
//     signatureAssets: ['Major western transport interchange', 'Footscray Market'],
//     structuralFrictions: ['Uneven street environment near the station'],
//   },
//
// FIELD SHAPES / ENUMS
//   carDependence : 'very-low' | 'low' | 'moderate' | 'high' | 'very-high' | null
//                   (null falls back to a coarse guess from the record's
//                    carDaily field — see carDependenceFor)
//   ptNetworkReach: { score: 1..5 | null, note: string, provisional: bool }
//                   PUBLIC-TRANSPORT-ONLY reach across Melbourne beyond the
//                   Collins St commute (interchange value, redundancy, span of
//                   service, direct non-CBD destinations). A car never improves
//                   this — it is not what the metric measures.
//   crime         : { asOf, geography, note,
//                     person, burglary, vehicle, damage } each band:
//                     'low' | 'moderate' | 'elevated' | 'high' | null
//                   geography names the data unit (LGA / postcode) so no
//                   street-level precision is implied.
//   kidActivity   : { walkable[], cycleable[], pt[], driving[], note }
//                   named/categorical activity access for Lulu, split by how it
//                   is realistically reached. Enriches kid-independence; it is
//                   NOT a new global weight.
//   broadRiskFlags: [{ type, level }] level:
//                     'none' | 'localised' | 'material' | 'address-check'
//                   coarse suburb-level flags only (flood/bushfire/aircraft/
//                   freeway/rail/nightlife). Parcel-level checks are out of scope.
//   signatureAssets    : string[]  "what this suburb uniquely gives you"
//   structuralFrictions: string[]  "what you must accept"

import { areaCorridors } from './areaCorridors.js'

function blank() {
  return {
    carDependence: null,
    ptNetworkReach: { score: null, note: '', provisional: true },
    crime: {
      asOf: '',
      geography: '',
      note: '',
      person: null,
      burglary: null,
      vehicle: null,
      damage: null,
    },
    kidActivity: { walkable: [], cycleable: [], pt: [], driving: [], note: '' },
    broadRiskFlags: [],
    signatureAssets: [],
    structuralFrictions: [],
  }
}

// One entry per ranking record, all seeded blank. Fill in place.
export const areaEnrichment = Object.fromEntries(areaCorridors.map((r) => [r.id, blank()]))

export function enrichmentFor(id) {
  return areaEnrichment[id] || blank()
}

// Coarse car-dependence category. Uses an explicit enrichment value when set,
// otherwise falls back to the record's existing carDaily gate so the dimension
// is never blank where we already know daily driving is optional/compulsory.
const CAR_FROM_DAILY = { optional: 'low', constrained: 'moderate', compulsory: 'very-high' }
export function carDependenceFor(rec, enrich = enrichmentFor(rec.id)) {
  return enrich.carDependence || CAR_FROM_DAILY[rec.carDaily] || null
}

export const CAR_DEPENDENCE_ORDER = ['very-low', 'low', 'moderate', 'high', 'very-high']
export const CAR_DEPENDENCE_LABEL = {
  'very-low': 'Very low',
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  'very-high': 'Very high',
}
