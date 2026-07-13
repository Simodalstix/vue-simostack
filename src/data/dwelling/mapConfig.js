// src/data/dwelling/mapConfig.js
//
// The single source of map colour and lens definitions. No hex literals live in
// components; they all resolve here. The map recolours off the SAME ranking the
// list uses (useAreaRanking) — it never computes a competing score.
//
// Channels are kept separate on purpose (the brief forbids one colour channel
// carrying every meaning):
//   fill hue      = the score for the current lens
//   fill opacity  = data confidence (provisional placeholder vs verified)
//   dashed ring   = hard-gate rejection (drawn by the map component)
//   solid ring    = selected / shortlisted / hovered (feature-state in the map)

// On-palette site colours reused by the map canvas + legend + component theme.
export const MAP_THEME = {
  bg: '#111418',
  faintFill: '#2A3138',
  markerDim: '#7A8A99',
  ink: '#0C0F12',
  selected: '#FAF8F3',
  shortlist: '#D4903A',
  hover: '#4FCBB3',
  outline: '#3A434B',
  reject: '#D4903A',
}

// Stable overall-fit bands on the 0-100 "% of ideal" weighted score. Fixed
// thresholds (not quantiles) so a suburb keeps its colour meaning as weights
// move. teal = stronger fit, amber = trade-offs, grey = weak/poor.
export const SCORE_BANDS = [
  { min: 80, label: 'Excellent fit', color: '#4FCBB3' },
  { min: 70, label: 'Strong fit', color: '#3DB8A0' },
  { min: 60, label: 'Meaningful trade-offs', color: '#C98A3E' },
  { min: 50, label: 'Weak fit', color: '#8A6A3A' },
  { min: -Infinity, label: 'Poor fit', color: '#5B6670' },
]

export function bandFor(score) {
  if (score == null) return { label: 'Not scored', color: MAP_THEME.markerDim }
  return SCORE_BANDS.find((b) => score >= b.min)
}

// The 1-5 metric lenses reuse the same five steps so the map reads as one
// system whichever lens is active.
const RAMP_5 = ['#5B6670', '#8A6A3A', '#C98A3E', '#3DB8A0', '#4FCBB3']
export function rampColor(v) {
  if (v == null) return MAP_THEME.markerDim
  const i = Math.max(1, Math.min(5, Math.round(v))) - 1
  return RAMP_5[i]
}

// Confidence -> fill opacity. Provisional placeholder records read fainter than
// verified ones; rejected records are dimmed further so the amber dashed ring,
// not a bold fill, carries the rejection.
export function fillOpacityFor(rec, status) {
  const base = rec.placeholder ? 0.16 : 0.3
  return status === 'reject' ? base * 0.55 : base
}

// Lenses. `overall` uses the weighted 0-100 score; the rest colour by a single
// 1-5 metric that already has real data. Each `value(row)` returns the number to
// colour by; `pct` marks the 0-100 scale. Only add a lens once its data exists.
export const MAP_LENSES = [
  { key: 'overall', label: 'Overall fit', pct: true, value: (row) => row.weighted },
  { key: 'commute', label: 'Collins St commute', value: (row) => row.commuteScore },
  {
    key: 'affordability',
    label: 'Housing cost & availability',
    value: (row) => row.rec.scores?.housingValue,
  },
  {
    key: 'schools',
    label: 'Public school strength',
    value: (row) => row.rec.childhood?.schoolStrength,
  },
  {
    key: 'teen',
    label: 'Kid independence & amenity',
    value: (row) => row.rec.childhood?.teenIndependence,
  },
  { key: 'lowCar', label: 'Low-car daily life', value: (row) => row.rec.scores?.lowCar },
  { key: 'safety', label: 'Safety', value: (row) => row.rec.scores?.safety },
]

export function lensByKey(key) {
  return MAP_LENSES.find((l) => l.key === key) || MAP_LENSES[0]
}

// Colour for a row under a given lens.
export function colorForRow(row, lens) {
  const v = lens.value(row)
  return lens.pct ? bandFor(v).color : rampColor(v)
}

// Build the feature-state payload the map consumes, keyed by areaId. `rows` are
// the ranked rows from useAreaRanking; `indexById` maps areaId -> integer fid.
// Rows without a map slot (no geo config) are skipped.
export function computeAreaState(rows, indexById, lensKey = 'overall') {
  const lens = lensByKey(lensKey)
  const state = {}
  for (const row of rows) {
    const areaId = row.rec.id
    const fid = indexById[areaId]
    if (fid == null || row.status === 'unscored') continue
    state[areaId] = {
      fid,
      color: colorForRow(row, lens),
      fillOpacity: fillOpacityFor(row.rec, row.status),
      status: row.status,
    }
  }
  return state
}

// Legend rows for the active lens: the five bands for `overall`, or a compact
// low->high strip for a 1-5 metric lens.
export function legendFor(lensKey) {
  const lens = lensByKey(lensKey)
  if (lens.pct) {
    return SCORE_BANDS.map((b) => ({
      color: b.color,
      label: b.min === -Infinity ? `< 50 · ${b.label}` : `${b.min}+ · ${b.label}`,
    }))
  }
  return [
    { color: RAMP_5[0], label: 'weak (1)' },
    { color: RAMP_5[2], label: 'mid (3)' },
    { color: RAMP_5[4], label: 'strong (5)' },
  ]
}
