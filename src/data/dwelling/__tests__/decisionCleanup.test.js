import { describe, expect, it } from 'vitest'

import { areaCorridors } from '../areaCorridors.js'
import { beachAccessByAreaId } from '../beachAccess.js'
import { decideCriterionByKey, decideCriteria, decideStrategies } from '../decideStrategies.js'
import {
  decisionContextFor,
  differentiatingChipsFor,
  gateExceptionChipFor,
} from '../decisionChips.js'
import { affordabilityScore, costScoreFor, liquidityScore } from '../cost/costScoring.js'
import { costMetricForArea, formatCostMetric } from '../cost/costContext.js'
import { DWELLING_COST_BY_ID } from '../cost/dwelling-cost-context.ts'
import { weightedScore } from '../../../composables/useAreaRanking.js'
import { scoreCommute } from '../../../composables/useCommuteScoring.js'

describe('bonus-only criteria', () => {
  it('keeps stable IDs while exposing the Recreation and Mingle names', () => {
    expect(decideCriterionByKey.kidAmenity.label).toBe('Recreation')
    expect(decideCriterionByKey.partnerPool.label).toBe('Mingle')
    expect(decideCriterionByKey.kidAmenity.hint).toContain('Childcare is separate')
    expect(decideCriterionByKey.partnerPool.hint).toContain(
      'not in a registered or de facto marriage',
    )
  })

  it('leaves beach absent rather than scoring it as zero', () => {
    const inland = areaCorridors.find((record) => !beachAccessByAreaId[record.id])
    expect(decideCriterionByKey.beach.value(inland)).toBeNull()
  })

  it('awards St Kilda West its direct foreshore access', () => {
    expect(beachAccessByAreaId['st-kilda-west-2br']).toMatchObject({
      estMin: 8,
      mode: 'walk',
    })
  })

  it('falls back to teen independence when girls sport is unresearched', () => {
    const toorak = areaCorridors.find((record) => record.id === 'toorak-2br')
    expect(decideCriterionByKey.kidAmenity.value(toorak)).toBe(
      toorak.childhood.teenIndependence * 2,
    )
  })

  it('makes every bonus criterion monotonic for every record', () => {
    const strategy = decideStrategies.find((item) => item.id === 'apartment')
    const bonusCriteria = decideCriteria.filter(
      (criterion) => criterion.scoringMode === 'additiveBonus',
    )

    expect(bonusCriteria.map((criterion) => criterion.key)).toEqual([
      'beach',
      'personalNetwork',
      'chineseCommunity',
      'otherCommunities',
      'partnerPool',
    ])
    for (const criterion of bonusCriteria) {
      for (const rec of areaCorridors) {
        const commute = scoreCommute(rec.commute?.typical, rec.commute?.transfers)
        const withoutBonus = weightedScore(
          rec,
          commute,
          { ...strategy.weights, [criterion.key]: 0 },
          { strategy },
        )
        const withBonus = weightedScore(rec, commute, strategy.weights, {
          strategy,
        })
        expect(
          withBonus,
          `${rec.id}: removing ${criterion.key} increased its score`,
        ).toBeGreaterThanOrEqual(withoutBonus)
      }
    }
  })

  it("does not let Balaclava's lower beach bonus reverse Windsor under Apartment", () => {
    const strategy = decideStrategies.find((item) => item.id === 'apartment')
    const score = (id) => {
      const rec = areaCorridors.find((record) => record.id === id)
      const commute = scoreCommute(rec.commute?.typical, rec.commute?.transfers)
      return weightedScore(rec, commute, strategy.weights, {
        strategy,
      })
    }

    expect(score('inner-windsor-prahran-2br')).toBeGreaterThanOrEqual(score('balaclava-2br'))
  })

  it('uses the owner-approved Apartment weights and beach premiums', () => {
    const beach = decideCriterionByKey.beach
    expect(beach.bonusPointsPerWeight).toBe(2)
    const apartment = decideStrategies.find((item) => item.id === 'apartment')
    expect(apartment.weights.beach).toBe(2)
    expect(apartment.weights.commute).toBe(2)
    expect(2 * (10 / 10) * beach.bonusPointsPerWeight).toBe(4)
    expect(2 * (7 / 10) * beach.bonusPointsPerWeight).toBe(2.8)
    expect(2 * (4 / 10) * beach.bonusPointsPerWeight).toBe(1.6)
  })
})

describe('decision-card pills and context', () => {
  it('caps differentiating chips at four and keeps viable rows silent', () => {
    for (const rec of areaCorridors) {
      const row = { rec, commute: rec.commute, status: 'ok', reasons: [] }
      expect(differentiatingChipsFor(row).length).toBeLessThanOrEqual(4)
      expect(gateExceptionChipFor(row)).toBeNull()
    }
  })

  it('keeps only active rank inputs in pills', () => {
    const apartment = decideStrategies.find((strategy) => strategy.id === 'apartment')
    const chips = areaCorridors.flatMap((rec) =>
      differentiatingChipsFor(
        { rec, commute: rec.commute, status: 'ok', reasons: [] },
        apartment.weights,
      ),
    )
    const texts = chips.map((chip) => chip.text)

    expect(texts).toContain('Friend bonus')
    expect(texts).toContain('Beach')
    expect(texts).toContain('Fast commute')
    expect(texts).toContain('Strong Schools')
    expect(
      chips.every((chip) => ['friend', 'beach', 'fast-commute', 'schools'].includes(chip.key)),
    ).toBe(true)
    expect(chips.some((chip) => chip.key === 'train-line')).toBe(false)

    const allOff = { commute: 0, personalNetwork: 0, beach: 0, schools: 0 }
    expect(
      areaCorridors.flatMap((rec) =>
        differentiatingChipsFor({ rec, commute: rec.commute }, allOff),
      ),
    ).toEqual([])
  })

  it('keeps only thresholded community percentages in rank-neutral descriptive context', () => {
    const facts = areaCorridors.flatMap((rec) =>
      decisionContextFor({ rec, commute: rec.commute, status: 'ok', reasons: [] }),
    )

    expect(facts.some((fact) => fact.key === 'beach')).toBe(false)
    expect(facts.some((fact) => fact.key === 'chinese-community')).toBe(true)
    expect(facts.some((fact) => fact.key === 'vietnamese-community')).toBe(true)
    expect(facts.some((fact) => fact.key === 'south-american-community')).toBe(true)
    expect(facts.some((fact) => fact.key === 'kiwi-community')).toBe(true)
    expect(facts.some((fact) => fact.key === 'indian-community')).toBe(true)
    expect(facts.every((fact) => fact.text == null && fact.label && fact.value && fact.tone)).toBe(
      true,
    )
    expect(facts.find((fact) => fact.key === 'chinese-community')?.tone).toBe('chinese')
    expect(facts.find((fact) => fact.key === 'vietnamese-community')?.tone).toBe('yellow')
    expect(facts.find((fact) => fact.key === 'filipino-community')?.tone).toBe('pink')
    expect(facts.find((fact) => fact.key === 'thai-community')?.tone).toBe('pink')
    expect(facts.find((fact) => fact.key === 'south-american-community')?.tone).toBe('amber')
    expect(facts.find((fact) => fact.key === 'kiwi-community')?.tone).toBe('white')
    expect(facts.find((fact) => fact.key === 'indian-community')?.tone).toBe('yellow')
    expect(
      facts.filter((fact) => fact.key === 'thai-community').every((fact) => fact.percentage >= 0.5),
    ).toBe(true)
    expect(
      facts
        .filter((fact) => fact.key === 'south-american-community')
        .every((fact) => fact.percentage >= 2.9),
    ).toBe(true)
    expect(
      facts.filter((fact) => fact.key === 'kiwi-community').every((fact) => fact.percentage > 2),
    ).toBe(true)
    expect(
      facts.filter((fact) => fact.key === 'indian-community').every((fact) => fact.percentage > 5),
    ).toBe(true)
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
  it('is monotonic so a cheaper median never receives a worse cost score', () => {
    expect(affordabilityScore(300000, 900000)).toBeGreaterThanOrEqual(
      affordabilityScore(675000, 900000),
    )
    expect(affordabilityScore(675000, 900000)).toBeGreaterThan(affordabilityScore(1000000, 900000))
  })

  it('uses the stricter balanced-budget anchors across the full 0-10 range', () => {
    expect(affordabilityScore(495000, 900000)).toBe(10)
    expect(affordabilityScore(585000, 900000)).toBe(8)
    expect(affordabilityScore(675000, 900000)).toBe(5)
    expect(affordabilityScore(765000, 900000)).toBe(2)
    expect(affordabilityScore(900000, 900000)).toBe(0)
  })

  it('keeps availability separate from Cost', () => {
    expect(costScoreFor(720000, 900000)).toBe(affordabilityScore(720000, 900000))
    expect(liquidityScore(80)).toBeGreaterThan(0)
  })

  it('reads the strategy product median with no bedroom proxy', () => {
    const apartment = decideStrategies.find((strategy) => strategy.id === 'apartment')
    const house = decideStrategies.find((strategy) => strategy.id === 'house')
    const armadale = costMetricForArea('armadale-2br', apartment)
    const ivanhoe = costMetricForArea('ivanhoe-house', house)

    // Unit strategy reads the all-unit median; house strategy the all-house
    // median. No bedrooms, no proxy flag — the VGV data has no bedroom split.
    expect(armadale.propertyType).toBe('unit')
    expect(armadale).not.toHaveProperty('isBedroomProxy')
    expect(Number.isFinite(armadale.medianPrice)).toBe(true)
    expect(formatCostMetric(armadale)).toContain('apartment')
    expect(formatCostMetric(armadale)).not.toContain('proxy')
    expect(formatCostMetric(armadale, { terse: true })).toContain('apartment median')

    expect(ivanhoe.propertyType).toBe('house')
    expect(formatCostMetric(ivanhoe, { terse: true })).toContain('house median')
  })

  it('keeps generated-data fallback available without inventing placeholder values', () => {
    expect(decideCriteria).toHaveLength(9)
    for (const strategy of decideStrategies) {
      expect(strategy.weights).toHaveProperty('beach')
      expect(strategy.weights).not.toHaveProperty('safetyQuality')
      expect(strategy.weights).not.toHaveProperty('greenspace')
    }
    for (const rec of areaCorridors.filter((record) => record.scored !== false)) {
      const cost = decideCriterionByKey.cost.value(rec)
      // A record scores only from generated VGV context or a hand score;
      // with neither (e.g. no VGV units row for the suburb) it stays null
      // rather than receiving invented values.
      const prices = DWELLING_COST_BY_ID[rec.id]?.prices
      // House-product records score cost off the house median when no unit
      // row exists, so generated data means either type is present.
      const hasGenerated =
        prices?.unit?.all?.medianPrice != null || prices?.house?.all?.medianPrice != null
      if (!hasGenerated && rec.scores?.housingValue == null) expect(cost).toBeNull()
      else expect(Number.isFinite(cost)).toBe(true)
    }
  })
})
