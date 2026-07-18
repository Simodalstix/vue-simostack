import { describe, expect, it } from 'vitest'

import { areaCorridors } from '../areaCorridors.js'
import { beachAccessByAreaId } from '../beachAccess.js'
import { decideCriterionByKey, decideCriteria, decideStrategies } from '../decideStrategies.js'
import { differentiatingChipsFor, gateExceptionChipFor } from '../decisionChips.js'
import { costScoreFor, headroomScore, liquidityScore } from '../cost/costScoring.js'
import { weightedScore } from '../../../composables/useAreaRanking.js'
import { scoreCommute } from '../../../composables/useCommuteScoring.js'

describe('bonus-only criteria', () => {
  it('leaves beach absent rather than scoring it as zero', () => {
    const inland = areaCorridors.find((record) => !beachAccessByAreaId[record.id])
    expect(decideCriterionByKey.beach.value(inland)).toBeNull()
  })

  it('falls back to teen independence when girls sport is unresearched', () => {
    const toorak = areaCorridors.find((record) => record.id === 'toorak-2br')
    expect(decideCriterionByKey.kidAmenity.value(toorak)).toBe(
      toorak.childhood.teenIndependence * 2,
    )
  })

  it('makes every assessed beach band additive and never score-reducing', () => {
    const strategy = decideStrategies.find((item) => item.id === 'balanced2br')
    for (const rec of areaCorridors) {
      const commute = scoreCommute(rec.commute?.typical, rec.commute?.transfers)
      const beachOff = weightedScore(
        rec,
        commute,
        { ...strategy.weights, beach: 0 },
        { maxPrice: strategy.filters.maxPrice },
      )
      const beachOn = weightedScore(rec, commute, strategy.weights, {
        maxPrice: strategy.filters.maxPrice,
      })
      expect(beachOn).toBeGreaterThanOrEqual(beachOff)
      if (!beachAccessByAreaId[rec.id]) expect(beachOn).toBe(beachOff)
    }
  })

  it('uses the owner-approved balanced 2BR weights and beach premiums', () => {
    const beach = decideCriterionByKey.beach
    expect(beach.bonusPointsPerWeight).toBe(2)
    const balanced = decideStrategies.find((item) => item.id === 'balanced2br')
    expect(balanced.weights.beach).toBe(2)
    expect(balanced.weights.commute).toBe(2)
    expect(2 * (10 / 10) * beach.bonusPointsPerWeight).toBe(4)
    expect(2 * (7 / 10) * beach.bonusPointsPerWeight).toBe(2.8)
    expect(2 * (4 / 10) * beach.bonusPointsPerWeight).toBe(1.6)
  })
})

describe('decision chips', () => {
  it('caps differentiating chips at three and keeps viable rows silent', () => {
    for (const rec of areaCorridors) {
      const row = { rec, commute: rec.commute, status: 'ok', reasons: [] }
      expect(differentiatingChipsFor(row).length).toBeLessThanOrEqual(3)
      expect(gateExceptionChipFor(row)).toBeNull()
    }
  })

  it('uses concise badges and removes train-line badges from ranking rows', () => {
    const chips = areaCorridors.flatMap((rec) =>
      differentiatingChipsFor({ rec, commute: rec.commute, status: 'ok', reasons: [] }),
    )
    const texts = chips.map((chip) => chip.text)

    expect(chips.some((chip) => chip.tone === 'chinese' && /^Chinese \d+%$/.test(chip.text))).toBe(
      true,
    )
    expect(texts).toContain('Fast commute')
    expect(texts).toContain('Strong Schools')
    expect(chips.some((chip) => chip.key === 'train-line')).toBe(false)
    expect(texts).not.toContain('One-seat commute')
    expect(texts).not.toContain('Strong zoned schools')
  })

  it('uses the first gate reason for reject and conditional exceptions', () => {
    const rec = areaCorridors[0]
    expect(
      gateExceptionChipFor({ rec, status: 'reject', reasons: ['Over price cap', 'Other'] }),
    ).toMatchObject({ text: 'Over price cap', tone: 'reject' })
    expect(
      gateExceptionChipFor({ rec, status: 'conditional', reasons: ['OC fees risk'] }),
    ).toMatchObject({ text: 'OC fees risk', tone: 'conditional' })
  })
})

describe('cost scoring', () => {
  it('rewards suitable headroom rather than the cheapest headline median', () => {
    expect(headroomScore(675000, 900000)).toBeGreaterThan(headroomScore(300000, 900000))
    expect(headroomScore(675000, 900000)).toBeGreaterThan(headroomScore(1000000, 900000))
  })

  it('uses the documented 70/30 blend', () => {
    const headroom = headroomScore(720000, 900000)
    const liquidity = liquidityScore(80)
    expect(costScoreFor(720000, 80, 900000)).toBeCloseTo(0.7 * headroom + 0.3 * liquidity)
  })

  it('keeps generated-data fallback available for every current record', () => {
    expect(decideCriteria).toHaveLength(9)
    for (const strategy of decideStrategies) {
      expect(strategy.weights).toHaveProperty('beach')
      expect(strategy.weights).not.toHaveProperty('greenspace')
    }
    for (const rec of areaCorridors.filter((record) => record.scored !== false)) {
      expect(Number.isFinite(decideCriterionByKey.cost.value(rec))).toBe(true)
    }
  })
})
