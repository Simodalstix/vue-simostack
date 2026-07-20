export const UNSCORED_BANNER =
  'Unscored — required evidence is pending; this suburb does not rank yet.'

export function isUnscoredRow(row) {
  return row?.status === 'unscored'
}

export function isVetoedRow(row) {
  return row?.status === 'veto'
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
  if (isVetoedRow(row))
    return `Owner judgment veto: ${row.reasons?.[0]?.replace(/^Owner judgment: /, '') || ''}`
  const label = strategyLabel ? `under ${strategyLabel}` : 'under current settings'
  if (row.status === 'ok') return `✓ viable ${label}`
  if (row.status === 'conditional') return `~ conditional ${label}: ${row.reasons[0] || ''}`
  return `✕ fails ${label}: ${row.reasons[0] || ''}`
}
