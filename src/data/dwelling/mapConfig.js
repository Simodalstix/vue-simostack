// src/data/dwelling/mapConfig.js
//
// The single source of map colour definitions. No hex literals live in
// components; they all resolve here. The map recolours off the SAME ranking the
// list uses (useAreaRanking) — it never computes a competing score. The former
// per-metric lens system was removed July 2026: the choropleth now always
// colours by the one weighted fit score the active strategy produces.
//
// Channels are kept separate on purpose (the brief forbids one colour channel
// carrying every meaning):
//   fill hue      = the weighted fit score band
//   fill opacity  = data confidence (provisional placeholder vs verified)
//   solid ring    = selected / shortlisted / hovered (feature-state in the map)

// On-palette site colours reused by the map canvas + legend + component theme.
// purple = school / community context; gold = personal network. Both are
// accents with fixed semantic roles, never score hues.
import { fitBandColor, fitBandLegend, getFitBand } from './fitBands.js'

export const MAP_THEME = {
  bg: '#252D37',
  faintFill: '#2A3138',
  markerDim: '#7A8A99',
  ink: '#0C0F12',
  selected: '#FAF8F3',
  shortlist: '#D4903A',
  hover: '#4FCBB3',
  outline: '#3A434B',
  unscoredFill: '#2A3138',
  unscoredOutline: '#D4903A',
  reject: '#D4903A',
  purple: '#9B82E5',
  gold: '#E5C35A',
  goldMuted: '#A88E3C',
  goldDark: '#3A3218',
}

export { getFitBand }

// Confidence -> fill opacity. Provisional placeholder records read fainter than
// verified ones; strategy-gated suburbs stay slightly lighter so the map still
// reads while the hue remains aligned with the shared fit band.
export function fillOpacityFor(rec, status) {
  if (status === 'unscored') return 0.08
  const base = rec.placeholder ? 0.16 : 0.3
  if (status === 'reject') return base * 0.78
  if (status === 'conditional') return base * 0.88
  return base
}

export function colorForRow(row) {
  return fitBandColor(row.weighted)
}

// Build the feature-state payload the map consumes, keyed by areaId. `rows` are
// the ranked rows from useAreaRanking; `indexById` maps areaId -> integer fid.
// Rows without a map slot (no geo config) are skipped.
export function computeAreaState(rows, indexById) {
  const state = {}
  for (const row of rows) {
    const areaId = row.rec.id
    const fid = indexById[areaId]
    if (fid == null) continue
    const unscored = row.status === 'unscored'
    state[areaId] = {
      fid,
      color: unscored ? MAP_THEME.unscoredFill : colorForRow(row),
      fillOpacity: fillOpacityFor(row.rec, row.status),
      status: row.status,
      unscored,
    }
  }
  return state
}

// Legend rows: the fixed fit bands.
export function scoreLegend() {
  return fitBandLegend()
}
