// Optional personal lens derived from the ABS Census 2021 SAL community data.
//
// This is deliberately narrower than ancestry or birthplace: it measures the
// share of people who reported Cantonese or Mandarin as their main non-English
// language used at home. Those categories are mutually exclusive for a person,
// so their counts can be added without double-counting. Combined ranking areas
// aggregate component SAL counts over the common G13 language denominator.

import { communityContextFor } from './communityContext.js'

export const CHINESE_COMMUNITY_FULL_BONUS_SHARE = 20

export function chineseLanguageCommunityFor(areaId) {
  const context = communityContextFor(areaId)
  if (!context?.components.length || context.missing.length) return null

  let count = 0
  let denominator = 0
  for (const component of context.components) {
    const household = component.record.additionalHouseholdContext
    const cantonese = household?.cantoneseSpokenAtHome
    const mandarin = household?.mandarinSpokenAtHome
    const componentDenominator = cantonese?.denominator ?? mandarin?.denominator
    if (
      !Number.isFinite(cantonese?.count) ||
      !Number.isFinite(mandarin?.count) ||
      !Number.isFinite(componentDenominator) ||
      componentDenominator <= 0
    )
      return null

    count += cantonese.count + mandarin.count
    denominator += componentDenominator
  }

  if (denominator <= 0) return null
  return {
    count,
    denominator,
    percentage: (count / denominator) * 100,
    censusYear: 2021,
  }
}

// 20% combined Cantonese/Mandarin use earns 10/10; higher shares stay capped.
// The criterion converts this to at most +2 displayed ranking points.
export function chineseCommunityScore(areaId) {
  const share = chineseLanguageCommunityFor(areaId)?.percentage
  if (share == null) return null
  return Math.min(10, (share / CHINESE_COMMUNITY_FULL_BONUS_SHARE) * 10)
}
