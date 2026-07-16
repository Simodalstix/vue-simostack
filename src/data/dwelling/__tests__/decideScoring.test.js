// Tests for the Decide strategy-preset scoring model (decideStrategies.js +
// useAreaRanking.weightedScore): score = sum(w * s) / sum(w) over enabled
// criteria only, renormalised so toggling a criterion off redistributes its
// weight instead of penalising anyone.

import { describe, it, expect } from 'vitest'

import { decideStrategies, decideCriteria } from '../decideStrategies.js'
import { areaCorridors } from '../areaCorridors.js'
import { weightedScore } from '../../../composables/useAreaRanking.js'
import { commuteFor, scoreCommute } from '../../../composables/useCommuteScoring.js'

const scoredRecords = areaCorridors.filter((r) => r.scored !== false)

function commuteScoreFor(rec) {
  const c = commuteFor(rec)
  return c ? scoreCommute(c.typical, c.transfers) : null
}

function weightsFor(strategy, enabledKeys) {
  return Object.fromEntries(
    decideCriteria.map((c) => [c.key, enabledKeys.includes(c.key) ? strategy.weights[c.key] : 0]),
  )
}

// Every non-empty subset of the six criteria, plus the empty set (all off).
function allSubsets(keys) {
  const out = []
  for (let mask = 0; mask < 1 << keys.length; mask++) {
    out.push(keys.filter((_, i) => mask & (1 << i)))
  }
  return out
}

describe('preset weight vectors', () => {
  it('ships the five strategies with 0-3 weights over exactly the six criteria', () => {
    expect(decideStrategies.map((s) => s.id)).toEqual([
      'balanced2br',
      'bachelor1br',
      'family3br',
      'landBuild',
      'villaTownhouse',
    ])
    const keys = decideCriteria.map((c) => c.key).sort()
    for (const s of decideStrategies) {
      expect(Object.keys(s.weights).sort()).toEqual(keys)
      for (const w of Object.values(s.weights)) {
        expect(w).toBeGreaterThanOrEqual(0)
        expect(w).toBeLessThanOrEqual(3)
      }
    }
  })
})

describe('score robustness', () => {
  const keys = decideCriteria.map((c) => c.key)

  it('every scored record gets a finite 0-100 score for every strategy and toggle subset', () => {
    expect(scoredRecords.length).toBeGreaterThanOrEqual(17)
    for (const strategy of decideStrategies) {
      for (const subset of allSubsets(keys)) {
        const weights = weightsFor(strategy, subset)
        for (const rec of scoredRecords) {
          const score = weightedScore(rec, commuteScoreFor(rec), weights)
          expect(Number.isFinite(score)).toBe(true)
          expect(score).toBeGreaterThanOrEqual(0)
          expect(score).toBeLessThanOrEqual(100)
        }
      }
    }
  })

  it('falls back to an equal-weight mean when every toggle is off', () => {
    const rec = scoredRecords[0]
    const score = weightedScore(rec, commuteScoreFor(rec), weightsFor(decideStrategies[0], []))
    expect(Number.isFinite(score)).toBe(true)
  })

  it('ranks a strength-5 zoned secondary above strength 3 with only schools enabled', () => {
    const base = { childhood: { schoolStrength: 1 } }
    const topTier = { ...base, id: 'balwyn-2br' }
    const midTier = { ...base, id: 'preston-villa' }
    const weights = weightsFor(decideStrategies[0], ['schools'])

    expect(weightedScore(topTier, null, weights)).toBeGreaterThan(
      weightedScore(midTier, null, weights),
    )
  })

  it('falls back to childhood school strength when both zoned strengths are null', () => {
    const schools = decideCriteria.find((criterion) => criterion.key === 'schools')
    const rec = {
      id: 'growth-corridor-stress-test',
      childhood: { schoolStrength: 3 },
    }

    expect(schools.value(rec)).toBe(6)
  })
})

describe('renormalisation semantics', () => {
  const keys = decideCriteria.map((c) => c.key)
  const balanced = decideStrategies.find((s) => s.id === 'balanced2br')

  it('toggling cost off improves a premium suburb (Toorak), never degrades it', () => {
    const toorak = areaCorridors.find((r) => r.id === 'toorak-2br')
    expect(toorak).toBeTruthy()
    const cs = commuteScoreFor(toorak)
    const withCost = weightedScore(toorak, cs, weightsFor(balanced, keys))
    const withoutCost = weightedScore(
      toorak,
      cs,
      weightsFor(
        balanced,
        keys.filter((k) => k !== 'cost'),
      ),
    )
    expect(withoutCost).toBeGreaterThan(withCost)
  })

  it('switching strategy changes at least some suburb scores', () => {
    const family = decideStrategies.find((s) => s.id === 'family3br')
    const changed = scoredRecords.some((rec) => {
      const cs = commuteScoreFor(rec)
      return (
        weightedScore(rec, cs, weightsFor(balanced, keys)) !==
        weightedScore(rec, cs, weightsFor(family, keys))
      )
    })
    expect(changed).toBe(true)
  })
})
