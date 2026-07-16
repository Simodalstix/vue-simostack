export const UNSCORED_BANNER =
  'Unscored — greenspace evidence pending; this suburb does not rank yet.'

export function isUnscoredRow(row) {
  return row?.status === 'unscored'
}

export function partitionDecisionRows(rows) {
  const ranked = []
  const unscored = []
  for (const row of rows || []) {
    if (isUnscoredRow(row)) unscored.push(row)
    else ranked.push(row)
  }
  return { ranked, unscored }
}

export function fitLineForRow(row, strategyLabel) {
  if (isUnscoredRow(row)) return UNSCORED_BANNER
  const label = strategyLabel ? `under ${strategyLabel}` : 'under current settings'
  if (row.status === 'ok') return `✓ viable ${label}`
  if (row.status === 'conditional') return `~ conditional ${label}: ${row.reasons[0] || ''}`
  return `✕ fails ${label}: ${row.reasons[0] || ''}`
}
