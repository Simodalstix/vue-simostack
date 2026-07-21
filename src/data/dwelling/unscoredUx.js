export const UNSCORED_BANNER =
  'Unscored — required evidence is pending; this suburb does not rank yet.'

export function isUnscoredRow(row) {
  return row?.status === 'unscored'
}

export function isVetoedRow(row) {
  return row?.status === 'veto'
}

// Presentation tier for suburbs whose entry price is well above the budget
// cap (flag set in useAreaRanking). Shown as a "Prestige" pill wherever the
// record appears; it never changes scoring or ranking.
export const PRESTIGE_LABEL = 'Prestige'

export function isPrestigeRow(row) {
  return row?.prestige === true
}

export function isRankedRow(row) {
  return !isUnscoredRow(row) && !isVetoedRow(row)
}

export function partitionDecisionRows(rows) {
  const ranked = []
  const vetoed = []
  const unscored = []
  for (const row of rows || []) {
    if (isUnscoredRow(row)) unscored.push(row)
    else if (isVetoedRow(row)) vetoed.push(row)
    else ranked.push(row)
  }
  return { ranked, vetoed, unscored }
}

export function fitLineForRow(row, strategyLabel) {
  if (isUnscoredRow(row)) return UNSCORED_BANNER
  if (isVetoedRow(row)) return 'Owner veto'
  const label = strategyLabel ? `under ${strategyLabel}` : 'under current settings'
  if (row.status === 'ok') return `✓ viable ${label}`
  if (row.status === 'conditional') return `~ conditional ${label}: ${row.reasons[0] || ''}`
  return `✕ fails ${label}: ${row.reasons[0] || ''}`
}
