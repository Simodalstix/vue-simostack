// Coverage contract for the 2026-07-21 north/west onboarding batch.
//
// The pilot record enters UNSCORED (scored: false): identity, geometry,
// profile and Census context must resolve, and the record must appear exactly
// once in the pending-evidence group without disturbing the scored ranking.
// As evidence passes complete, records graduate into the full assertions used
// by newAreaBatchOnboarding.test.js.

import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { communityContextFor } from '../communityContext.js'
import { decideStrategies } from '../decideStrategies.js'
import { localityFeatures } from '../localityFeatures.js'
import { suburbProfileFor } from '../suburbProfiles.js'
import { partitionDecisionRows } from '../unscoredUx.js'

const PENDING_AREA_IDS = ['essendon-2br']

const strategy = decideStrategies[0]
const filters = { ...strategy.filters, includeStretch: true }

describe('north/west batch: pending-evidence pilot coverage', () => {
  it.each(PENDING_AREA_IDS)('resolves identity, geometry and context for %s', (areaId) => {
    const records = areaCorridors.filter((record) => record.id === areaId)
    expect(records).toHaveLength(1)

    const record = records[0]
    expect(record.scored).toBe(false)
    expect(record.placeholder).toBe(true)

    expect(areaGeo[areaId]?.stationPoints).toHaveLength(1)
    expect(suburbProfileFor(areaId)).toBeTruthy()

    const context = communityContextFor(areaId)
    expect(context?.missing).toEqual([])
    expect(context.components[0].record.community.totalPopulation.count).toBeGreaterThan(0)

    const linked = localityFeatures.features.filter((feature) =>
      feature.properties.areaIds.includes(areaId),
    )
    expect(linked.length).toBeGreaterThan(0)
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
