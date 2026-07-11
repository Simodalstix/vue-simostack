// src/composables/useCommuteScoring.js
//
// Collins St is too long for one generic CBD travel time. Three destination
// presets map to different door-to-door times because the 2026 network (Metro
// Tunnel for Sunbury and Cranbourne/Pakenham, City Loop all day for Frankston)
// makes a suburb perform differently for west vs central vs east Collins St.
//
// Pure helpers so they compose cleanly inside computed()s. Bands mirror
// commuteBands in facts.js: Excellent <35, Good 35-50, Acceptable 50-65,
// Difficult >65 (minutes, door to door).

export const COLLINS_PRESETS = [
  { key: 'west', label: 'Collins West', dest: 'Spencer–King St', field: 'collinsWest' },
  {
    key: 'central',
    label: 'Collins Central',
    dest: 'William–Swanston St',
    field: 'collinsCentral',
  },
  { key: 'east', label: 'Collins East', dest: 'Russell–Spring St', field: 'collinsEast' },
]

const FIELD_BY_KEY = {
  west: 'collinsWest',
  central: 'collinsCentral',
  east: 'collinsEast',
}

// Returns the {typical, stressed, transfers} object for a record under a preset,
// or null when the record carries no commute data (e.g. skeleton rows).
export function commuteForPreset(record, presetKey) {
  const field = FIELD_BY_KEY[presetKey] || FIELD_BY_KEY.central
  return record?.commute?.[field] ?? null
}

export function commuteBandLabel(mins) {
  if (mins == null) return null
  if (mins < 35) return 'Excellent'
  if (mins <= 50) return 'Good'
  if (mins <= 65) return 'Acceptable'
  return 'Difficult'
}

// Continuous 1-5, higher is better. Continuous (not banded) so that switching
// the Collins preset actually moves the score when the door-to-door time
// changes, even within a band: 25 min anchors at 5, each further minute costs
// ~0.067, floor at 1. Each routine transfer costs 0.4 for the friction it adds.
export function scoreCommute(mins, transfers = 0) {
  if (mins == null) return null
  const base = 5 - Math.max(0, mins - 25) * (4 / 60)
  const penalised = base - 0.4 * transfers
  return Math.min(5, Math.max(1, penalised))
}
