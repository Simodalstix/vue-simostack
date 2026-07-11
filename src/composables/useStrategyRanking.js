// src/composables/useStrategyRanking.js
//
// Weighted ranking of dwelling strategies (the Rank engine), reusable by the
// Decide view. Adds a LOCATION LENS: when a commute score is supplied (from a
// chosen corridor via useCommuteScoring), it overrides each strategy's own
// `commute` criterion so the whole list re-ranks for that suburb. Everything
// else stays the strategy's own judgement.
//
// Returns, per strategy: the full strategy object, the weighted score (0-5),
// a 0-100 scaled score, and the per-criterion contribution breakdown (with the
// commute row flagged when it came from a location).

import { computed, unref } from 'vue'

export function useStrategyRanking(strategies, criteriaState, commuteScoreRef) {
  return computed(() => {
    const criteria = unref(criteriaState)
    const commuteOverride = unref(commuteScoreRef)
    const totalWeight = criteria.reduce((a, c) => a + c.weight, 0) || 1

    return strategies
      .map((s) => {
        const breakdown = criteria.map((c) => {
          const overridden = c.key === 'commute' && commuteOverride != null
          const raw = overridden ? commuteOverride : (s.scores[c.key] ?? 3)
          return {
            key: c.key,
            label: c.label,
            raw,
            weight: c.weight,
            contribution: (c.weight * raw) / totalWeight,
            overridden,
          }
        })
        const score = breakdown.reduce((a, b) => a + b.contribution, 0)
        return {
          strategy: s,
          score,
          scorePct: Math.round((score / 5) * 100),
          breakdown,
        }
      })
      .sort((a, b) => b.score - a.score)
  })
}
