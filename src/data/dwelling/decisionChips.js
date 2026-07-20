// Ranking-card presentation follows one semantic rule:
// - pills identify active inputs that affected this ranking;
// - flat context facts describe the place without implying score impact.

import { beachAccessByAreaId } from './beachAccess.js'
import { chineseLanguageCommunityFor } from './chineseCommunity.js'
import {
  FILIPINO_COMMUNITY_FULL_BONUS_SHARE,
  SOUTH_AMERICAN_COMMUNITY_FULL_BONUS_SHARE,
  THAI_COMMUNITY_FULL_BONUS_SHARE,
  VIETNAMESE_COMMUNITY_FULL_BONUS_SHARE,
  filipinoCommunityFor,
  southAmericanCommunityFor,
  thaiCommunityFor,
  vietnameseCommunityFor,
} from './languageCommunities.js'
import { friendContextFor } from './personalAnchors.js'
import { zonedSchoolEvidenceForArea } from './schools/schoolStrength.js'

function criterionIsActive(weights, key) {
  return weights == null || (weights[key] ?? 0) > 0
}

export function differentiatingChipsFor(row, weights = null) {
  const chips = []
  const areaId = row?.rec?.id
  if (!areaId) return chips

  if (criterionIsActive(weights, 'personalNetwork') && friendContextFor(areaId)) {
    chips.push({ key: 'friend', text: 'Friend bonus', tone: 'friend' })
  }

  const commute = row.commute || row.rec.commute
  if (criterionIsActive(weights, 'commute') && commute?.typical <= 30) {
    chips.push({ key: 'fast-commute', text: 'Fast commute', tone: 'commute' })
  }

  const schools = zonedSchoolEvidenceForArea(areaId)
  const strongSchool = [schools?.primary, schools?.secondary].some(
    (school) => (school?.evidence?.strength ?? 0) >= 4,
  )
  if (criterionIsActive(weights, 'schools') && strongSchool) {
    chips.push({ key: 'schools', text: 'Strong Schools', tone: 'schools' })
  }

  return chips
}

export function decisionContextFor(row) {
  const facts = []
  const areaId = row?.rec?.id
  if (!areaId) return facts

  const beach = beachAccessByAreaId[areaId]
  if (beach?.estMin <= 25) {
    facts.push({
      key: 'beach',
      label: 'Beach',
      value: beach.estMin <= 12 ? `~${beach.estMin} min` : `nearby · ~${beach.estMin} min`,
      tone: 'beach',
    })
  }

  const chineseShare = chineseLanguageCommunityFor(areaId)?.percentage
  if (chineseShare >= 5) {
    facts.push({
      key: 'chinese-community',
      label: 'Chinese',
      value: `${Math.round(chineseShare)}%`,
      tone: 'chinese',
    })
  }

  // Same quarter-of-full-bonus threshold as the former community pills, shown with one
  // decimal because these community shares sit well under 10%.
  const vietnameseShare = vietnameseCommunityFor(areaId)?.percentage
  if (vietnameseShare >= VIETNAMESE_COMMUNITY_FULL_BONUS_SHARE / 4) {
    facts.push({
      key: 'vietnamese-community',
      label: 'Vietnamese',
      value: `${vietnameseShare.toFixed(1)}%`,
      tone: 'yellow',
    })
  }

  const filipinoShare = filipinoCommunityFor(areaId)?.percentage
  if (filipinoShare >= FILIPINO_COMMUNITY_FULL_BONUS_SHARE / 4) {
    facts.push({
      key: 'filipino-community',
      label: 'Filipino',
      value: `${filipinoShare.toFixed(1)}%`,
      tone: 'pink',
    })
  }

  const thaiShare = thaiCommunityFor(areaId)?.percentage
  if (thaiShare >= THAI_COMMUNITY_FULL_BONUS_SHARE / 4) {
    facts.push({
      key: 'thai-community',
      label: 'Thai',
      value: `${thaiShare.toFixed(1)}%`,
      tone: 'pink',
    })
  }

  const southAmericanShare = southAmericanCommunityFor(areaId)?.percentage
  if (southAmericanShare >= SOUTH_AMERICAN_COMMUNITY_FULL_BONUS_SHARE / 4) {
    facts.push({
      key: 'south-american-community',
      label: 'Sth American',
      value: `${southAmericanShare.toFixed(1)}%`,
      tone: 'green',
    })
  }

  return facts
}

export function gateExceptionChipFor(row) {
  if (!row || row.status === 'ok' || row.status === 'unscored') return null
  if (row.status === 'veto') {
    return {
      key: 'owner-veto',
      text: row.reasons?.[0] || 'Owner judgment veto',
      tone: 'veto',
    }
  }
  return {
    key: 'gate',
    text: row.reasons?.[0] || (row.status === 'reject' ? 'Does not pass gates' : 'Conditional'),
    tone: row.status === 'reject' ? 'reject' : 'conditional',
  }
}
