// Optional personal lenses derived from the ABS Census 2021 SAL community
// data, modelled on chineseCommunity.js.
//
// Each measure uses the share of people who reported the named language(s)
// as their main non-English language used at home (G13). ABS language
// responses are mutually exclusive for a person, so the Filipino lens can add
// the separate Filipino and Tagalog counts without double-counting, exactly
// as the Chinese lens adds Cantonese and Mandarin. Combined ranking areas
// aggregate component SAL counts over the common G13 denominator; percentages
// are never averaged.
//
// Vietnamese is surfaced from the source dataset's published top-five
// non-English language rows. That gives exact counts and denominators where it
// is listed, but deliberately returns null elsewhere: absence from a top-five
// list is not evidence of a zero population.
//
// The South American lens uses Spanish plus Portuguese at home: the standard
// ABS G09 country list carries no Colombia row, so language is the closest
// available census signal. It spans the Spanish-speaking Americas plus
// Brazil, and unavoidably also counts Iberian speakers; the hint carries
// that caveat.
//
// Full-bonus caps sit at the strongest observed concentration among the
// covered SALs (Filipino+Tagalog peaks at 3.3% in Donnybrook, Thai at 0.9%
// in Springvale, Spanish+Portuguese at 3.4% in St Kilda, and Vietnamese at
// 29.2% in St Albans), rounded, so each lens reads relative presence on a
// scale where Melbourne's strongest suburb saturates. They are
// population-share saturation points, never tuned against ranking output.

import { communityContextFor } from './communityContext.js'

export const FILIPINO_COMMUNITY_FULL_BONUS_SHARE = 3
export const THAI_COMMUNITY_FULL_BONUS_SHARE = 1
export const SOUTH_AMERICAN_COMMUNITY_FULL_BONUS_SHARE = 3
export const VIETNAMESE_COMMUNITY_FULL_BONUS_SHARE = 25

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

export function southAmericanCommunityFor(areaId) {
  return languageCommunityFor(areaId, ['spanishSpokenAtHome', 'portugueseSpokenAtHome'])
}

// Recombine a language only when every component SAL publishes it in its
// source top-five list. Partial combined-area percentages would be misleading,
// so a missing component keeps the result null.
function listedLanguageCommunityFor(areaId, languageName) {
  const context = communityContextFor(areaId)
  if (!context?.components.length || context.missing.length) return null

  let count = 0
  let denominator = 0
  for (const component of context.components) {
    const measure = component.record.community?.topNonEnglishLanguagesSpokenAtHome?.find(
      (item) => item.name === languageName,
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

  if (denominator <= 0) return null
  return {
    count,
    denominator,
    percentage: (count / denominator) * 100,
    censusYear: 2021,
    sourceCoverage: 'published-top-five',
  }
}

export function vietnameseCommunityFor(areaId) {
  const completeMeasure = languageCommunityFor(areaId, ['vietnameseSpokenAtHome'])
  if (completeMeasure) return completeMeasure
  return listedLanguageCommunityFor(areaId, 'Vietnamese')
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

export function southAmericanCommunityScore(areaId) {
  const share = southAmericanCommunityFor(areaId)?.percentage
  if (share == null) return null
  return Math.min(10, (share / SOUTH_AMERICAN_COMMUNITY_FULL_BONUS_SHARE) * 10)
}

export function vietnameseCommunityScore(areaId) {
  const share = vietnameseCommunityFor(areaId)?.percentage
  if (share == null) return null
  return Math.min(10, (share / VIETNAMESE_COMMUNITY_FULL_BONUS_SHARE) * 10)
}

// One opt-in score prevents several community measures from stacking several
// bonuses. The strongest measured presence supplies the grouped value; it is
// not meaningful to add or average separately normalised community scales.
export function otherCommunitiesScore(areaId) {
  const scores = [
    filipinoCommunityScore(areaId),
    thaiCommunityScore(areaId),
    southAmericanCommunityScore(areaId),
    vietnameseCommunityScore(areaId),
  ].filter(Number.isFinite)
  return scores.length ? Math.max(...scores) : null
}
