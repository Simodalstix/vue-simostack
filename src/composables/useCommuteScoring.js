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

// Continuous 1-5, higher is better. Continuous (not banded) so the score moves
// with the door-to-door time even within a band: 25 min anchors at 5, each
// further minute costs ~0.067, floor at 1. Each routine transfer costs 0.4 for
// the friction it adds.
export function scoreCommute(mins, transfers = 0) {
  if (mins == null) return null
  const base = 5 - Math.max(0, mins - 25) * (4 / 60)
  const penalised = base - 0.4 * transfers
  return Math.min(5, Math.max(1, penalised))
}
