// src/composables/useAreaRanking.js
//
// Ranks station-catchment records against the 555 Collins St commute anchor and
// the control-strip filters. Two-stage, by design:
//
//   1. HARD GATES run first. The nine non-negotiables (over ~65 min, >1
//      transfer, compulsory daily driving, no second bedroom, over the price
//      cap, fees that break payoff, and the user's own filter limits) tag a
//      record reject | conditional | ok. A cheap area must NOT out-rank a
//      workable one on price alone, so gates precede scoring.
//   2. WEIGHTED SCORE from areaWeights, on `scores` only, with the commute
//      score injected, PLUS the childhood lens criteria (school strength and
//      teen independence) folded in at their live Decide-panel weights. The
//      demographic communityProfile is NEVER read here.
//
// Returns a computed list sorted ok > conditional > reject > unscored, then by
// weighted score descending.

import { computed, unref } from 'vue'
import { areaWeights, areaWeightTotal } from '@/data/dwelling/areaWeights.js'
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

  // Intrinsic non-negotiables.
  if (commute && commute.typical > 65) reject('Over ~65 min door-to-door at peak')
  if (commute && commute.transfers > 1) reject('More than one routine transfer')
  if (rec.carDaily === 'compulsory') reject('Daily driving is effectively compulsory')
  if (rec.secondBedroom === false) reject('No viable second bedroom or path to one')

  // User-set control-strip limits.
  if (filters.maxPrice && rec.dwelling?.indicativePrice?.[0] > filters.maxPrice)
    reject(`Entry price above your ${fmtPrice(filters.maxPrice)} cap`)
  if (filters.minBedrooms && rec.dwelling?.bedrooms < filters.minBedrooms)
    reject('Fewer bedrooms than you require')
  if (filters.maxCommute && commute && commute.typical > filters.maxCommute)
    reject('Commute above your set maximum')
  if (filters.maxStationWalk && rec.stationWalkMin > filters.maxStationWalk)
    reject('Station walk above your set maximum')
  if (filters.carPref === 'carFree' && rec.carDaily !== 'optional') reject('Not viable car-free')
  if (
    filters.dwellingTypes?.length &&
    rec.dwelling?.types &&
    !rec.dwelling.types.some((t) => filters.dwellingTypes.includes(t))
  )
    reject('No stock of your selected dwelling types')

  // Softer flags.
  if (filters.maxOc && rec.dwelling?.annualOc?.[1] > filters.maxOc)
    flag('Owners-corp fees may undermine the payoff strategy')

  return { status, reasons }
}

// `childhoodWeights` is the live [{ key, weight }] pair for the lens criteria
// (school strength, teen independence) taken from the Decide panel sliders. Each
// is scored 1-5 from the record's `childhood` block, folded in with the same
// weight/score mechanism as the fixed areaWeights. A missing field is treated as
// "not assessed": its weight is left out of the denominator entirely, so a
// record with no childhood block scores on its base areaWeights alone rather
// than being penalised as if its schools were zero. A weight of 0 is likewise
// a no-op, leaving the base score untouched.
function weightedScore(rec, commuteScore, childhoodWeights) {
  const scoreMap = { ...rec.scores, commute: commuteScore }
  let sum = 0
  for (const w of areaWeights) {
    const s = scoreMap[w.key]
    if (s == null) continue
    sum += w.weight * (s / 5)
  }
  let total = areaWeightTotal
  for (const { key, weight } of childhoodWeights) {
    const s = rec.childhood?.[key]
    if (s == null) continue
    total += weight
    sum += weight * (s / 5)
  }
  // areaWeights sum to 100; with the childhood weights added to the denominator
  // this still reads as a percentage of the ideal.
  return Math.round((sum / total) * 100)
}

export function useAreaRanking(records, filtersRef, childhoodWeightsRef) {
  return computed(() => {
    const filters = unref(filtersRef) || {}
    const childhoodWeights = unref(childhoodWeightsRef) || []

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
      const weighted = weightedScore(rec, commuteScore, childhoodWeights)
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
