// src/composables/useAreaRanking.js
//
// Ranks station-catchment records against the 555 Collins St commute anchor and
// the active strategy. Two-stage, by design:
//
//   1. HARD GATES run first. The intrinsic non-negotiables (over ~65 min, >1
//      transfer, no second bedroom) plus the strategy's own filter gates
//      (dwelling types, minimum bedrooms, price cap) tag a record
//      reject | conditional | ok. A cheap area must NOT out-rank a workable
//      one on price alone, so gates precede scoring.
//   2. WEIGHTED SCORE over the six Decide criteria (decideStrategies.js):
//      score = sum(w * s) / sum(w) over ENABLED criteria only, normalised to
//      0-100. Criteria the record has no data for are left out of both sides
//      of the mean (never scored as zero), and if every enabled criterion has
//      weight 0 the score falls back to an equal-weight mean, so no subset of
//      toggles can produce NaN. The demographic communityProfile is NEVER
//      read here.
//
// Returns a computed list sorted ok > conditional > reject > unscored, then by
// weighted score descending.

import { computed, unref } from 'vue'
import { decideCriteria } from '@/data/dwelling/decideStrategies.js'
import { commuteFor, scoreCommute, commuteBandLabel } from './useCommuteScoring.js'

const STATUS_ORDER = { ok: 0, conditional: 1, reject: 2, unscored: 3 }

function fmtPrice(n) {
  return '$' + Math.round(n / 1000) + 'k'
}

function gate(rec, filters, commute) {
  const reasons = []
  let status = 'ok'
  const reject = (msg) => {
    reasons.push(msg)
    status = 'reject'
  }
  const flag = (msg) => {
    reasons.push(msg)
    if (status === 'ok') status = 'conditional'
  }

  // Intrinsic non-negotiables. (The former car-dependence gate was removed
  // from Decide July 2026; rec.carDaily is retained as data only.)
  if (commute && commute.typical > 65) reject('Over ~65 min door-to-door at peak')
  if (commute && commute.transfers > 1) reject('More than one routine transfer')
  if (rec.secondBedroom === false) reject('No viable second bedroom or path to one')

  // Strategy filter gates.
  if (filters.maxPrice && rec.dwelling?.indicativePrice?.[0] > filters.maxPrice)
    reject(`Entry price above the ${fmtPrice(filters.maxPrice)} cap`)
  if (filters.minBedrooms && rec.dwelling?.bedrooms < filters.minBedrooms)
    reject('Fewer bedrooms than the strategy requires')
  if (filters.maxCommute && commute && commute.typical > filters.maxCommute)
    reject('Commute above your set maximum')
  if (filters.maxStationWalk && rec.stationWalkMin > filters.maxStationWalk)
    reject('Station walk above your set maximum')
  if (
    filters.dwellingTypes?.length &&
    rec.dwelling?.types &&
    !rec.dwelling.types.some((t) => filters.dwellingTypes.includes(t))
  )
    reject('No stock of the strategy dwelling types')

  // Softer flags.
  if (filters.maxOc && rec.dwelling?.annualOc?.[1] > filters.maxOc)
    flag('Owners-corp fees may undermine the payoff strategy')

  return { status, reasons }
}

// `weights` is the effective weight per criterion key from the Decide panel:
// the strategy preset value when the toggle is on, 0 when it is off. Each
// criterion resolves its own 0-10 value from the record (decideStrategies.js);
// a null value means "not assessed" and drops out of both numerator and
// denominator, so a record missing a field is never punished as if it scored
// zero. If the enabled weights sum to 0, fall back to an equal-weight mean of
// whatever data exists rather than dividing by zero.
export function weightedScore(rec, commuteScore, weights) {
  const entries = decideCriteria
    .map((c) => ({ w: weights[c.key] ?? 0, s: c.value(rec, commuteScore) }))
    .filter((e) => e.s != null)
  if (!entries.length) return null
  let sum = 0
  let totalWeight = 0
  for (const e of entries) {
    sum += e.w * e.s
    totalWeight += e.w
  }
  if (totalWeight === 0) {
    sum = entries.reduce((a, e) => a + e.s, 0)
    totalWeight = entries.length
  }
  // s is 0-10, so the weighted mean x10 reads as a percentage of the ideal.
  return Math.round((sum / totalWeight) * 10)
}

export function useAreaRanking(records, filtersRef, weightsRef) {
  return computed(() => {
    const filters = unref(filtersRef) || {}
    const weights = unref(weightsRef) || {}

    const source = (unref(records) || []).filter((rec) => !rec.stretch || filters.includeStretch)

    const rows = source.map((rec) => {
      if (rec.scored === false) {
        return {
          rec,
          status: 'unscored',
          reasons: [],
          weighted: null,
          commute: null,
          commuteScore: null,
          band: null,
        }
      }
      const commute = commuteFor(rec)
      const commuteScore = commute ? scoreCommute(commute.typical, commute.transfers) : null
      const { status, reasons } = gate(rec, filters, commute)
      const weighted = weightedScore(rec, commuteScore, weights)
      return {
        rec,
        status,
        reasons,
        weighted,
        commute,
        commuteScore,
        band: commute ? commuteBandLabel(commute.typical) : null,
      }
    })

    return rows.sort((a, b) => {
      const s = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      if (s !== 0) return s
      return (b.weighted ?? -1) - (a.weighted ?? -1)
    })
  })
}
