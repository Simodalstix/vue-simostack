// src/composables/useCommuteScoring.js
//
// The single commute anchor is 555 Collins St (William St end, ~400m from
// Southern Cross), so door-to-door times are measured to the western end of
// Collins St. Records carry one {typical, stressed, transfers} commute object
// measured to that anchor.
//
// Pure helpers so they compose cleanly inside computed()s. Bands mirror
// commuteBands in facts.js: Excellent <35, Good 35-50, Acceptable 50-65,
// Difficult >65 (minutes, door to door).

// The fixed destination anchor, used for the caption and commute labels.
export const DESTINATION = {
  label: '555 Collins St',
  dest: 'Southern Cross end',
}

// Returns the {typical, stressed, transfers} object for a record, or null when
// the record carries no commute data (e.g. skeleton rows).
export function commuteFor(record) {
  return record?.commute ?? null
}

export function commuteBandLabel(mins) {
  if (mins == null) return null
  if (mins < 35) return 'Excellent'
  if (mins <= 50) return 'Good'
  if (mins <= 65) return 'Acceptable'
  return 'Difficult'
}

// Continuous 0-5, higher is better. 25 min anchors at 5; each further minute
// costs 0.1; no artificial floor (the >65 min gate already rejects extremes,
// and a floor of 1 made commute perversely one of the better criteria for far
// suburbs, so toggling commute off made them drop). Each routine transfer
// costs 0.4.
export function scoreCommute(mins, transfers = 0) {
  if (mins == null) return null
  const base = 5 - Math.max(0, mins - 25) * 0.1
  return Math.min(5, Math.max(0, base - 0.4 * transfers))
}
