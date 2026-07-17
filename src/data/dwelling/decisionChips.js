// Informational ranking-card chips. Their order is deliberate and they never
// feed the scoring engine: personal context first, then beach access, named
// rail, transfer-free commute and strong zoned-school evidence.

import { beachAccessByAreaId } from './beachAccess.js'
import { friendContextFor } from './personalAnchors.js'
import { linesForArea, trainLines } from './trainLines.js'
import { zonedSchoolEvidenceForArea } from './schools/schoolStrength.js'

const lineById = Object.fromEntries(trainLines.map((line) => [line.id, line]))

export function differentiatingChipsFor(row) {
  const chips = []
  const areaId = row?.rec?.id
  if (!areaId) return chips

  if (friendContextFor(areaId)) {
    chips.push({ key: 'friend', text: 'Friend bonus', tone: 'friend' })
  }

  const beach = beachAccessByAreaId[areaId]
  if (beach?.estMin <= 12) chips.push({ key: 'beach', text: 'Beach', tone: 'beach' })
  else if (beach?.estMin <= 25) chips.push({ key: 'beach', text: 'Beach nearby', tone: 'beach' })

  const line = linesForArea(areaId)
    .map((id) => lineById[id])
    .find(Boolean)
  if (line) chips.push({ key: 'train-line', text: `${line.name} line`, tone: 'train' })

  const commute = row.commute || row.rec.commute
  if (commute?.transfers === 0) {
    chips.push({ key: 'one-seat', text: 'One-seat commute', tone: 'commute' })
  }

  const schools = zonedSchoolEvidenceForArea(areaId)
  const strongSchool = [schools?.primary, schools?.secondary].some(
    (school) => (school?.evidence?.strength ?? 0) >= 4,
  )
  if (strongSchool) {
    chips.push({ key: 'schools', text: 'Strong zoned schools', tone: 'schools' })
  }

  return chips.slice(0, 3)
}

export function gateExceptionChipFor(row) {
  if (!row || row.status === 'ok' || row.status === 'unscored') return null
  return {
    key: 'gate',
    text: row.reasons?.[0] || (row.status === 'reject' ? 'Does not pass gates' : 'Conditional'),
    tone: row.status === 'reject' ? 'reject' : 'conditional',
  }
}
