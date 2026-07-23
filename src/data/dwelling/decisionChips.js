// Ranking-card badge data stays semantically split even when the UI presents
// both groups in one row: active rank inputs come from differentiatingChipsFor,
// while descriptive community facts come from decisionContextFor.

import { beachAccessByAreaId } from './beachAccess.js'
import { chineseLanguageCommunityFor } from './chineseCommunity.js'
import {
  FILIPINO_COMMUNITY_FULL_BONUS_SHARE,
  VIETNAMESE_COMMUNITY_FULL_BONUS_SHARE,
  filipinoCommunityFor,
  southAmericanCommunityFor,
  thaiCommunityFor,
  vietnameseCommunityFor,
} from './languageCommunities.js'
import { communityContextFor } from './communityContext.js'
import { friendContextFor } from './personalAnchors.js'
import { zonedSchoolEvidenceForArea } from './schools/schoolStrength.js'

const THAI_CONTEXT_MIN_SHARE = 0.5
const SOUTH_AMERICAN_CONTEXT_MIN_SHARE = 2.9
const KIWI_CONTEXT_MIN_SHARE = 2
const INDIAN_CONTEXT_MIN_SHARE = 5

function criterionIsActive(weights, key) {
  return weights == null || (weights[key] ?? 0) > 0
}

// Country-of-birth rows are a published top-country list. Combined areas only
// surface a percentage when every component SAL includes the country, so a
// partial list can never masquerade as a complete combined-area percentage.
function listedBirthplaceShareFor(areaId, countryName) {
  const context = communityContextFor(areaId)
  if (!context?.components.length || context.missing.length) return null

  let count = 0
  let denominator = 0
  for (const component of context.components) {
    const measure = component.record.community?.topOverseasCountriesOfBirth?.find(
      (item) => item.name === countryName,
    )
    if (
      !Number.isFinite(measure?.count) ||
      !Number.isFinite(measure?.denominator) ||
      measure.denominator <= 0
    )
      return null
    count += measure.count
    denominator += measure.denominator
  }

  return denominator > 0 ? (count / denominator) * 100 : null
}

export function differentiatingChipsFor(row, weights = null) {
  const chips = []
  const areaId = row?.rec?.id
  if (!areaId) return chips

  if (criterionIsActive(weights, 'personalNetwork') && friendContextFor(areaId)) {
    chips.push({ key: 'friend', text: 'Friend bonus', tone: 'friend' })
  }

  const beach = beachAccessByAreaId[areaId]
  if (criterionIsActive(weights, 'beach') && beach?.estMin <= 12) {
    chips.push({ key: 'beach', text: 'Beach', tone: 'beach' })
  } else if (criterionIsActive(weights, 'beach') && beach?.estMin <= 25) {
    chips.push({ key: 'beach', text: 'Beach nearby', tone: 'beach' })
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

  const chineseShare = chineseLanguageCommunityFor(areaId)?.percentage
  if (chineseShare >= 5) {
    facts.push({
      key: 'chinese-community',
      label: 'Chinese',
      value: `${Math.round(chineseShare)}%`,
      percentage: chineseShare,
      tone: 'chinese',
    })
  }

  // Context chips are deliberately selective: a percentage is displayed only
  // where it differentiates the suburb rather than repeating regional noise.
  const vietnameseShare = vietnameseCommunityFor(areaId)?.percentage
  if (vietnameseShare >= VIETNAMESE_COMMUNITY_FULL_BONUS_SHARE / 4) {
    facts.push({
      key: 'vietnamese-community',
      label: 'Vietnamese',
      value: `${vietnameseShare.toFixed(1)}%`,
      percentage: vietnameseShare,
      tone: 'yellow',
    })
  }

  const filipinoShare = filipinoCommunityFor(areaId)?.percentage
  if (filipinoShare >= FILIPINO_COMMUNITY_FULL_BONUS_SHARE / 4) {
    facts.push({
      key: 'filipino-community',
      label: 'Filipino',
      value: `${filipinoShare.toFixed(1)}%`,
      percentage: filipinoShare,
      tone: 'pink',
    })
  }

  const thaiShare = thaiCommunityFor(areaId)?.percentage
  if (thaiShare >= THAI_CONTEXT_MIN_SHARE) {
    facts.push({
      key: 'thai-community',
      label: 'Thai',
      value: `${thaiShare.toFixed(1)}%`,
      percentage: thaiShare,
      tone: 'pink',
    })
  }

  const southAmericanShare = southAmericanCommunityFor(areaId)?.percentage
  if (southAmericanShare >= SOUTH_AMERICAN_CONTEXT_MIN_SHARE) {
    facts.push({
      key: 'south-american-community',
      label: 'Sth American',
      value: `${southAmericanShare.toFixed(1)}%`,
      percentage: southAmericanShare,
      tone: 'amber',
    })
  }

  const kiwiShare = listedBirthplaceShareFor(areaId, 'New Zealand')
  if (kiwiShare > KIWI_CONTEXT_MIN_SHARE) {
    facts.push({
      key: 'kiwi-community',
      label: 'Kiwi',
      value: `${kiwiShare.toFixed(1)}%`,
      percentage: kiwiShare,
      tone: 'white',
      basis: 'birthplace',
    })
  }

  const indianShare = listedBirthplaceShareFor(areaId, 'India')
  if (indianShare > INDIAN_CONTEXT_MIN_SHARE) {
    facts.push({
      key: 'indian-community',
      label: 'Indian',
      value: `${indianShare.toFixed(1)}%`,
      percentage: indianShare,
      tone: 'yellow',
      basis: 'birthplace',
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
