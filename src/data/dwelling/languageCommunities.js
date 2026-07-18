// Optional personal lenses derived from the ABS Census 2021 SAL community
// data, modelled on chineseCommunity.js.
//
// Each lens measures the share of people who reported the named language(s)
// as their main non-English language used at home (G13). ABS language
// responses are mutually exclusive for a person, so the Filipino lens can add
// the separate Filipino and Tagalog counts without double-counting, exactly
// as the Chinese lens adds Cantonese and Mandarin. Combined ranking areas
// aggregate component SAL counts over the common G13 denominator; percentages
// are never averaged.
//
// Full-bonus caps sit at the strongest observed concentration among the
// covered SALs (Filipino+Tagalog peaks at 3.3% in Donnybrook, Thai at 0.9%
// in Springvale), rounded, so each lens reads relative presence on a scale
// where Melbourne's strongest suburb saturates. They are population-share
// saturation points, never tuned against ranking output.

import { communityContextFor } from './communityContext.js'

export const FILIPINO_COMMUNITY_FULL_BONUS_SHARE = 3
export const THAI_COMMUNITY_FULL_BONUS_SHARE = 1

// Recombine raw counts for the given language measures across component SALs
// over their common G13 denominator. Null on any missing component,
// chineseCommunity-style: unresearched data is never scored as zero.
function languageCommunityFor(areaId, measureKeys) {
  const context = communityContextFor(areaId)
  if (!context?.components.length || context.missing.length) return null

  let count = 0
  let denominator = 0
  for (const component of context.components) {
    const household = component.record.additionalHouseholdContext
    let componentDenominator = null
    for (const key of measureKeys) {
      const measure = household?.[key]
      if (
        !Number.isFinite(measure?.count) ||
        !Number.isFinite(measure?.denominator) ||
        measure.denominator <= 0
      )
        return null
      count += measure.count
      componentDenominator = measure.denominator
    }
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

export function filipinoCommunityFor(areaId) {
  return languageCommunityFor(areaId, ['filipinoSpokenAtHome', 'tagalogSpokenAtHome'])
}

export function thaiCommunityFor(areaId) {
  return languageCommunityFor(areaId, ['thaiSpokenAtHome'])
}

export function filipinoCommunityScore(areaId) {
  const share = filipinoCommunityFor(areaId)?.percentage
  if (share == null) return null
  return Math.min(10, (share / FILIPINO_COMMUNITY_FULL_BONUS_SHARE) * 10)
}

export function thaiCommunityScore(areaId) {
  const share = thaiCommunityFor(areaId)?.percentage
  if (share == null) return null
  return Math.min(10, (share / THAI_COMMUNITY_FULL_BONUS_SHARE) * 10)
}
