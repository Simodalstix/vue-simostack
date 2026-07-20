// Personal lens derived from the ABS Census 2021 SAL community data.
//
// Measures the share of people aged 25-54 not in a registered or de facto
// marriage (G06 social marital status — NOT G05 registered status, which
// miscounts de facto couples as single). G06 publishes 10-year age bands, so
// 25-54 is the closest available cover of the intended 30-49 range; the
// dataset records this on the measure itself. Combined ranking areas aggregate
// component SAL counts over the common denominator, chineseCommunity-style:
// counts are recombined, percentages never averaged. This does not claim that
// every unpartnered adult is available, interested or a potential partner.
//
// The two constants:
// - PARTNER_POOL_FULL_BONUS_SHARE: a 40% unpartnered share among 25-54s earns
//   10/10 on the primary component; higher shares stay capped.
// - PARTNER_POOL_MIN_DENOMINATOR: below 800 persons aged 25-54 the rate is
//   noise, so the suburb scores null (not assessed) — never a confident 10.
//   The guard replaces any volume-weighting.
//
// 2021 Census; relative signal — suburb demographic profiles are sticky, but
// absolute figures are dated. Refresh when the 2026 Census publishes.

import { communityContextFor } from './communityContext.js'

export const PARTNER_POOL_FULL_BONUS_SHARE = 40
export const PARTNER_POOL_MIN_DENOMINATOR = 800

export function partnerPoolFor(areaId) {
  const context = communityContextFor(areaId)
  if (!context?.components.length || context.missing.length) return null

  let count = 0
  let denominator = 0
  for (const component of context.components) {
    const household = component.record.additionalHouseholdContext
    const unpartnered = household?.unpartnered2554
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

// A 40% unpartnered share earns 10/10. The component stays capped, so at the
// criterion's x1 preset this is at most +2 ranking points. Lone-parent family
// counts remain available as neutral Census context but never enter this score.
export function partnerPoolScore(areaId) {
  const pool = partnerPoolFor(areaId)
  if (pool == null || pool.denominator < PARTNER_POOL_MIN_DENOMINATOR) return null
  return Math.min(10, (pool.percentage / PARTNER_POOL_FULL_BONUS_SHARE) * 10)
}
