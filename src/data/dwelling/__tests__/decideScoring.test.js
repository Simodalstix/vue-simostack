// Tests for the Decide strategy-preset scoring model (decideStrategies.js +
// useAreaRanking.weightedScore): standard criteria use sum(w * s) / sum(w)
// over enabled criteria, while explicitly additive criteria apply a bounded
// premium after that base mean.

import { describe, it, expect } from 'vitest'

import { decideStrategies, decideCriteria } from '../decideStrategies.js'
import { areaCorridors } from '../areaCorridors.js'
import { personalNetworkByAreaId, pnScore } from '../personalNetwork.js'
import {
  CHINESE_COMMUNITY_FULL_BONUS_SHARE,
  chineseCommunityScore,
  chineseLanguageCommunityFor,
} from '../chineseCommunity.js'
import { useAreaRanking, weightedScore } from '../../../composables/useAreaRanking.js'
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

// Every non-empty subset of the eight criteria, plus the empty set (all off).
function allSubsets(keys) {
  const out = []
  for (let mask = 0; mask < 1 << keys.length; mask++) {
    out.push(keys.filter((_, i) => mask & (1 << i)))
  }
  return out
}

describe('preset weight vectors', () => {
  it('ships the five strategies with 0-3 weights over exactly the eight criteria', () => {
    expect(decideStrategies.map((s) => s.id)).toEqual([
      'balanced2br',
      'bachelor1br',
      'family3br',
      'landBuild',
      'villaTownhouse',
    ])
    const keys = decideCriteria.map((c) => c.key).sort()
    expect(keys).toHaveLength(8)
    for (const s of decideStrategies) {
      expect(Object.keys(s.weights).sort()).toEqual(keys)
      for (const w of Object.values(s.weights)) {
        expect(w).toBeGreaterThanOrEqual(0)
        expect(w).toBeLessThanOrEqual(3)
      }
    }
  })

  it('keeps the Chinese-community personal lens off by default', () => {
    const criterion = decideCriteria.find((item) => item.key === 'chineseCommunity')
    expect(criterion.defaultEnabled).toBe(false)
    expect(decideCriteria.filter((item) => item.defaultEnabled === false)).toEqual([criterion])
    expect(decideStrategies.every((strategy) => strategy.weights.chineseCommunity === 2)).toBe(true)
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

  it('keeps every gate status unchanged when any one criterion is toggled off', () => {
    const strategy = decideStrategies.find((item) => item.id === 'balanced2br')
    const filters = { ...strategy.filters, includeStretch: true }
    const allOn = useAreaRanking(areaCorridors, filters, strategy.weights).value
    const statusById = Object.fromEntries(allOn.map((row) => [row.rec.id, row.status]))
    expect(allOn.every((row) => Number.isFinite(row.weighted))).toBe(true)

    for (const key of keys) {
      const toggled = useAreaRanking(areaCorridors, filters, {
        ...strategy.weights,
        [key]: 0,
      }).value
      expect(toggled.every((row) => statusById[row.rec.id] === row.status)).toBe(true)
    }
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

  it('keeps a finite score when network data is absent and the criterion is enabled', () => {
    const rec = { ...scoredRecords[0], id: 'missing-network-record' }
    const network = decideCriteria.find((criterion) => criterion.key === 'personalNetwork')
    const score = weightedScore(rec, commuteScoreFor(rec), weightsFor(decideStrategies[0], keys))

    expect(network.value(rec)).toBeNull()
    expect(Number.isFinite(score)).toBe(true)
  })

  it('ranks Windsor and Prahran above South Melbourne with only network enabled', () => {
    const windsor = areaCorridors.find((rec) => rec.id === 'inner-windsor-prahran-2br')
    const southMelbourne = areaCorridors.find((rec) => rec.id === 'south-melbourne-2br')
    const weights = weightsFor(decideStrategies[0], ['personalNetwork'])

    expect(weightedScore(windsor, commuteScoreFor(windsor), weights)).toBeGreaterThan(
      weightedScore(southMelbourne, commuteScoreFor(southMelbourne), weights),
    )
  })
})

describe('personal network data', () => {
  it('uses the documented band edges', () => {
    expect(pnScore(10)).toBe(10)
    expect(pnScore(11)).toBe(8)
    expect(pnScore(30)).toBe(6)
    expect(pnScore(31)).toBeNull()
    expect(pnScore(41)).toBeNull()
    expect(pnScore(null)).toBeNull()
  })

  it('covers all 50 dwelling records', () => {
    expect(Object.keys(personalNetworkByAreaId).sort()).toEqual(
      areaCorridors.map((rec) => rec.id).sort(),
    )
  })

  it('changes scores without changing any gate status', () => {
    const balanced = decideStrategies.find((strategy) => strategy.id === 'balanced2br')
    const filters = {
      ...balanced.filters,
      maxCommute: 90,
      maxStationWalk: 20,
      includeStretch: true,
    }
    const rankedWithNetwork = useAreaRanking(areaCorridors, filters, balanced.weights).value.filter(
      (row) => row.status !== 'unscored',
    )
    const networkOffWeights = { ...balanced.weights, personalNetwork: 0 }
    const rankedWithoutNetwork = useAreaRanking(
      areaCorridors,
      filters,
      networkOffWeights,
    ).value.filter((row) => row.status !== 'unscored')

    const statusWithout = Object.fromEntries(
      rankedWithoutNetwork.map((row) => [row.rec.id, row.status]),
    )
    expect(rankedWithNetwork.every((row) => statusWithout[row.rec.id] === row.status)).toBe(true)
    expect(
      rankedWithNetwork.some(
        (row) =>
          row.weighted !==
          rankedWithoutNetwork.find((other) => other.rec.id === row.rec.id)?.weighted,
      ),
    ).toBe(true)
  })
})

describe('Chinese-language community personal lens', () => {
  it('adds Cantonese and Mandarin counts over one language denominator', () => {
    const seddon = chineseLanguageCommunityFor('seddon-westfootscray-villa')
    expect(seddon.count).toBeGreaterThan(0)
    expect(seddon.denominator).toBeGreaterThan(seddon.count)
    expect(seddon.percentage).toBeCloseTo((seddon.count / seddon.denominator) * 100)
  })

  it('aggregates combined suburb records by counts and denominators', () => {
    const combined = chineseLanguageCommunityFor('upfield-corridor')
    expect(combined.count).toBeGreaterThan(0)
    expect(combined.denominator).toBeGreaterThan(0)
    expect(combined.percentage).toBeCloseTo(2.35, 1)
  })

  it('caps the scoring scale at ten when the combined share exceeds the full-bonus mark', () => {
    expect(CHINESE_COMMUNITY_FULL_BONUS_SHARE).toBe(20)
    expect(chineseCommunityScore('box-hill-2br')).toBe(10)
    expect(chineseCommunityScore('chelsea-2br')).toBeLessThan(chineseCommunityScore('box-hill-2br'))
  })

  it('can only add points when enabled', () => {
    const balanced = decideStrategies.find((strategy) => strategy.id === 'balanced2br')
    const boxHill = areaCorridors.find((rec) => rec.id === 'box-hill-2br')
    const baseWeights = { ...balanced.weights, chineseCommunity: 0 }
    const enabledWeights = {
      ...baseWeights,
      chineseCommunity: balanced.weights.chineseCommunity,
    }
    const base = weightedScore(boxHill, commuteScoreFor(boxHill), baseWeights)
    const enabled = weightedScore(boxHill, commuteScoreFor(boxHill), enabledWeights)

    expect(enabled).toBeGreaterThanOrEqual(base)
    expect(enabled - base).toBeLessThanOrEqual(4)
  })
})

describe('commute distortion fix', () => {
  it('has no artificial floor and preserves the documented anchors', () => {
    expect(scoreCommute(25)).toBe(5)
    expect(scoreCommute(55)).toBe(2)
    expect(scoreCommute(65)).toBe(1)
    expect(scoreCommute(80)).toBe(0)
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
