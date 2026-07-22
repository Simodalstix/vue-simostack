// Coverage contract for the 2026-07-22 ("Wednesday") onboarding batch.
//
// All 21 records enter UNSCORED (scored: false): identity, geometry, profile
// and Census context must resolve, and each record must appear exactly once in
// the pending-evidence group without disturbing the scored ranking. As
// evidence passes complete (Vicmap polygons/anchors, schools, greenspace,
// commute, safety, price), records graduate into the full scored assertions.

import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { communityContextFor } from '../communityContext.js'
import { decideStrategies } from '../decideStrategies.js'
import { suburbProfileFor } from '../suburbProfiles.js'
import { partitionDecisionRows } from '../unscoredUx.js'

const PENDING_AREA_IDS = [
  'aberfeldie-house',
  'albion-house',
  'blackburn-north-house',
  'blackburn-south-house',
  'box-hill-north-house',
  'box-hill-south-house',
  'brunswick-west-2br',
  'coburg-north-house',
  'gardenvale-house',
  'heidelberg-west-house',
  'keilor-house',
  'keilor-downs-house',
  'keilor-east-house',
  'keysborough-house',
  'maidstone-house',
  'maribyrnong-2br',
  'port-melbourne-2br',
  'sunshine-north-house',
  'sunshine-west-house',
  'tullamarine-house',
]

const strategy = decideStrategies[0]
const filters = { ...strategy.filters, includeStretch: true }

describe('Wednesday batch: pending-evidence coverage', () => {
  it.each(PENDING_AREA_IDS)('resolves identity, geometry and context for %s', (areaId) => {
    const records = areaCorridors.filter((record) => record.id === areaId)
    expect(records).toHaveLength(1)

    const record = records[0]
    expect(record.scored).toBe(false)
    expect(record.placeholder).toBe(true)

    expect(areaGeo[areaId]?.stationPoints.length).toBeGreaterThanOrEqual(1)
    expect(suburbProfileFor(areaId)).toBeTruthy()

    const context = communityContextFor(areaId)
    expect(context?.missing).toEqual([])
    expect(context.components[0].record.community.totalPopulation.count).toBeGreaterThan(0)
  })

  it('keeps pending records out of the ranking and in the unscored group exactly once', () => {
    const rows = useAreaRanking(areaCorridors, filters, strategy.weights).value
    const groups = partitionDecisionRows(rows)

    for (const areaId of PENDING_AREA_IDS) {
      expect(groups.unscored.filter((row) => row.rec.id === areaId)).toHaveLength(1)
      expect(groups.ranked.some((row) => row.rec.id === areaId)).toBe(false)
    }
  })

  it('does not change the scored ordering', () => {
    const withoutBatch = areaCorridors.filter((record) => !PENDING_AREA_IDS.includes(record.id))
    const baseline = partitionDecisionRows(
      useAreaRanking(withoutBatch, filters, strategy.weights).value,
    ).ranked.map((row) => row.rec.id)
    const current = partitionDecisionRows(
      useAreaRanking(areaCorridors, filters, strategy.weights).value,
    ).ranked.map((row) => row.rec.id)

    expect(current).toEqual(baseline)
  })
})
