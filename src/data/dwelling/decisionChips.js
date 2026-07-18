// Informational ranking-card chips. Their order is deliberate and they never
// feed the scoring engine: personal context first, then beach access,
// Chinese-language presence, fast commute and strong zoned-school evidence.

import { beachAccessByAreaId } from './beachAccess.js'
import { chineseLanguageCommunityFor } from './chineseCommunity.js'
import {
  FILIPINO_COMMUNITY_FULL_BONUS_SHARE,
  SOUTH_AMERICAN_COMMUNITY_FULL_BONUS_SHARE,
  THAI_COMMUNITY_FULL_BONUS_SHARE,
  filipinoCommunityFor,
  southAmericanCommunityFor,
  thaiCommunityFor,
} from './languageCommunities.js'
import { friendContextFor } from './personalAnchors.js'
import { zonedSchoolEvidenceForArea } from './schools/schoolStrength.js'

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

  const chineseShare = chineseLanguageCommunityFor(areaId)?.percentage
  if (chineseShare >= 5) {
    chips.push({
      key: 'chinese-community',
      text: `Chinese ${Math.round(chineseShare)}%`,
      tone: 'chinese',
    })
  }

  // Same quarter-of-full-bonus threshold as the Chinese chip, shown with one
  // decimal because these community shares sit well under 10%.
  const filipinoShare = filipinoCommunityFor(areaId)?.percentage
  if (filipinoShare >= FILIPINO_COMMUNITY_FULL_BONUS_SHARE / 4) {
    chips.push({
      key: 'filipino-community',
      text: `Filipino ${filipinoShare.toFixed(1)}%`,
      tone: 'pink',
    })
  }

  const thaiShare = thaiCommunityFor(areaId)?.percentage
  if (thaiShare >= THAI_COMMUNITY_FULL_BONUS_SHARE / 4) {
    chips.push({
      key: 'thai-community',
      text: `Thai ${thaiShare.toFixed(1)}%`,
      tone: 'pink',
    })
  }

  const southAmericanShare = southAmericanCommunityFor(areaId)?.percentage
  if (southAmericanShare >= SOUTH_AMERICAN_COMMUNITY_FULL_BONUS_SHARE / 4) {
    chips.push({
      key: 'south-american-community',
      text: `Sth American ${southAmericanShare.toFixed(1)}%`,
      tone: 'pink',
    })
  }

  const commute = row.commute || row.rec.commute
  if (commute?.typical <= 30) {
    chips.push({ key: 'fast-commute', text: 'Fast commute', tone: 'commute' })
  }

  const schools = zonedSchoolEvidenceForArea(areaId)
  const strongSchool = [schools?.primary, schools?.secondary].some(
    (school) => (school?.evidence?.strength ?? 0) >= 4,
  )
  if (strongSchool) {
    chips.push({ key: 'schools', text: 'Strong Schools', tone: 'schools' })
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
