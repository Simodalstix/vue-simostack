// Personal lens derived from the ABS Census 2021 SAL community data.
//
// Measures the share of people aged 35-44 not in a registered or de facto
// marriage (G06 social marital status — NOT G05 registered status, which
// miscounts de facto couples as single). This exact Census age band matches the
// owner's near-40 preference without using whole-suburb median age as a proxy.
// Combined ranking areas aggregate component SAL counts over the common
// denominator, chineseCommunity-style: counts are recombined, percentages never
// averaged. This does not claim that every unpartnered adult is available,
// interested or a potential partner.
//
// The two constants retained for the standalone raw-score helper:
// - PARTNER_POOL_FULL_BONUS_SHARE: a 40% unpartnered share among 35-44s earns
//   10/10 on the primary component; higher shares stay capped.
// - PARTNER_POOL_MIN_DENOMINATOR: below 300 persons aged 35-44 the rate is
//   noise, so the suburb scores null (not assessed) — never a confident 10.
//   This scales the former 800-person, three-band guard to the single 35-44
//   band and replaces any volume-weighting.
//
// 2021 Census; relative signal — suburb demographic profiles are sticky, but
// absolute figures are dated. Refresh when the 2026 Census publishes.

import { communityContextFor } from './communityContext.js'

export const PARTNER_POOL_FULL_BONUS_SHARE = 40
export const PARTNER_POOL_MIN_DENOMINATOR = 300

export function partnerPoolFor(areaId) {
  const context = communityContextFor(areaId)
  if (!context?.components.length || context.missing.length) return null

  let count = 0
  let denominator = 0
  for (const component of context.components) {
    const household = component.record.additionalHouseholdContext
    const unpartnered = household?.unpartnered3544
    if (
      !Number.isFinite(unpartnered?.count) ||
      !Number.isFinite(unpartnered?.denominator) ||
      unpartnered.denominator <= 0
    )
      return null

    count += unpartnered.count
    denominator += unpartnered.denominator
  }

  if (denominator <= 0) return null
  return {
    count,
    denominator,
    percentage: (count / denominator) * 100,
    censusYear: 2021,
  }
}

// Returns the uncapped source percentage after the denominator guard. The live
// Mingle criterion percentile-ranks this value, so suburbs above 40% no longer
// collapse into the same capped top score.
export function partnerPoolPercentage(areaId) {
  const pool = partnerPoolFor(areaId)
  if (pool == null || pool.denominator < PARTNER_POOL_MIN_DENOMINATOR) return null
  return pool.percentage
}

// A 40% unpartnered share earns 10/10 in the retained raw-score helper.
// Lone-parent family counts remain available as neutral Census context but
// never enter Mingle: they are not evidence of dating-pool availability.
export function partnerPoolScore(areaId) {
  const percentage = partnerPoolPercentage(areaId)
  if (percentage == null) return null
  return Math.min(10, (percentage / PARTNER_POOL_FULL_BONUS_SHARE) * 10)
}
