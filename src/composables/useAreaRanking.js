// src/composables/useAreaRanking.js
//
// Ranks station-catchment records against the 555 Collins St commute anchor and
// the active strategy. As of July 2026 there are NO price/commute/dwelling
// REJECT gates: the tool never hides a suburb for being expensive, far or the
// wrong product — the owner judges that. Every scored record is coloured by its
// weighted score so the map reads as a landscape. The only gate left is the
// owner's explicit Soul veto.
//
// SCORE over the ten Settle criteria (decideStrategies.js): standard criteria
// use sum(w * s) / sum(w), normalised to 0-100. Explicit bonus criteria add a
// small bounded premium after that mean. Missing data is never scored as zero,
// and the all-zero fallback prevents NaN. The demographic context is never read
// here directly; the opt-in Chinese-language lens, grouped other-communities
// lens and partner-pool criterion each supply one derived additive value.
//
// Returns a computed list sorted ok > veto > unscored, then by weighted score
// descending.

import { computed, unref } from 'vue'
import { decideCriteria } from '@/data/dwelling/decideStrategies.js'
import { ownerVetoFor } from '@/data/dwelling/ownerVetoes.js'
import { commuteFor, scoreCommute, commuteBandLabel } from './useCommuteScoring.js'

const STATUS_ORDER = { ok: 0, conditional: 1, reject: 2, veto: 3, unscored: 4 }

// The only remaining gate: the owner's explicit Soul veto. Everything else is
// scored, never rejected.
function gate(rec, filters) {
  const ownerVeto = ownerVetoFor(rec.id)
  if (filters.soulEnabled !== false && ownerVeto) {
    return { status: 'veto', reasons: [`${ownerVeto.basis}: ${ownerVeto.reason}`] }
  }
  return { status: 'ok', reasons: [] }
}

// Prestige was a price-cap presentation tier. With no cap it no longer fires;
// the export is kept as an always-false stub so consuming components stay valid
// without a coordinated change.
export const PRESTIGE_CAP_MULTIPLE = 1.5

export function prestigeFor() {
  return false
}

// `weights` is the effective weight per criterion key from the Settle panel:
// the strategy preset value when the toggle is on, 0 when it is off. Standard
// criteria form the renormalised weighted mean. Explicitly additive bonuses
// (Beach, the opt-in community lenses and the Partner-pool lens) stay
// outside that denominator and can only lift the base
// score. A null value means "not assessed" and contributes nothing. If the
// enabled standard weights sum to 0, fall back to their equal-weight mean so
// no toggle combination can produce NaN.
export function weightedScore(rec, commuteScore, weights, scoringContext = {}) {
  const entries = decideCriteria
    .map((c) => ({
      criterion: c,
      w: weights[c.key] ?? 0,
      s: c.value(rec, commuteScore, scoringContext),
    }))
    .filter((e) => e.s != null)
  if (!entries.length) return null

  const standardEntries = entries.filter((entry) => entry.criterion.scoringMode !== 'additiveBonus')
  const bonusEntries = entries.filter(
    (entry) => entry.criterion.scoringMode === 'additiveBonus' && entry.w > 0,
  )
  if (!standardEntries.length) {
    const bonusOnly = bonusEntries.reduce(
      (sum, entry) => sum + entry.w * (entry.s / 10) * (entry.criterion.bonusPointsPerWeight ?? 0),
      0,
    )
    return Math.round(Math.min(100, bonusOnly))
  }

  let sum = 0
  let totalWeight = 0
  for (const e of standardEntries) {
    sum += e.w * e.s
    totalWeight += e.w
  }
  if (totalWeight === 0) {
    sum = standardEntries.reduce((a, e) => a + e.s, 0)
    totalWeight = standardEntries.length
  }
  // Standard s is 0-10, so the weighted mean x10 reads as a percentage of the
  // ideal. Bonus points are already expressed on that 0-100 display scale.
  const baseScore = (sum / totalWeight) * 10
  const bonusPoints = bonusEntries.reduce(
    (bonus, entry) =>
      bonus + entry.w * (entry.s / 10) * (entry.criterion.bonusPointsPerWeight ?? 0),
    0,
  )
  return Math.round(Math.min(100, baseScore + bonusPoints))
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
          prestige: prestigeFor(rec, filters),
        }
      }
      const commute = commuteFor(rec)
      const commuteScore = commute ? scoreCommute(commute.typical, commute.transfers) : null
      const { status, reasons } = gate(rec, filters)
      const weighted = weightedScore(rec, commuteScore, weights, {
        strategy: filters.strategy,
      })
      return {
        rec,
        status,
        reasons,
        weighted,
        commute,
        commuteScore,
        band: commute ? commuteBandLabel(commute.typical) : null,
        prestige: prestigeFor(rec, filters),
      }
    })

    return rows.sort((a, b) => {
      const s = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      if (s !== 0) return s
      return (b.weighted ?? -1) - (a.weighted ?? -1)
    })
  })
}
