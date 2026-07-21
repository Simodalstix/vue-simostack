// Coverage contract for the 2026-07-21 north/west onboarding batch.
//
// All 24 records have graduated from pending-evidence (scored: false) to
// scored, so this asserts the full graduated state: identity, geometry,
// locality polygon, community/school/greenspace context, and a finite ranked
// score. It mirrors newAreaBatchOnboarding.test.js. The batch does not assert
// personalNetwork or the childhood name-hint arrays, which are optional and
// not populated for these records.

import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { chineseCommunityScore } from '../chineseCommunity.js'
import { communityContextFor } from '../communityContext.js'
import { decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_BY_ID } from '../greenspace/dwelling-greenspace-context.ts'
import { localityFeatures } from '../localityFeatures.js'
import { partnerPoolScore } from '../partnerPool.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import { suburbProfileFor } from '../suburbProfiles.js'

const BATCH_AREA_IDS = [
  'essendon-2br',
  'fawkner-house',
  'thomastown-house',
  'bundoora-house',
  'viewbank-house',
  'watsonia-house',
  'eltham-house',
  'williamstown-house',
  'point-cook-house',
  'werribee-house',
  'moonee-ponds-2br',
  'eltham-north-house',
  'essendon-west-house',
  'watsonia-north-house',
  'black-rock-house',
  'braybrook-villa',
  'brighton-house',
  'bulleen-house',
  'burwood-house',
  'camberwell-2br',
  'elsternwick-2br',
  'hawthorn-east-2br',
  'st-kilda-east-2br',
  'st-kilda-west-2br',
]

describe('north/west batch: graduated coverage', () => {
  it.each(BATCH_AREA_IDS)('resolves every generated adapter for %s', (areaId) => {
    const records = areaCorridors.filter((record) => record.id === areaId)
    expect(records).toHaveLength(1)

    const record = records[0]
    expect(record.scored).not.toBe(false)
    expect(areaGeo[areaId]?.stationPoints.length).toBeGreaterThanOrEqual(1)
    expect(suburbProfileFor(areaId)).toBeTruthy()

    const context = communityContextFor(areaId)
    expect(context?.missing).toEqual([])
    expect(context.components[0].record.community.totalPopulation.count).toBeGreaterThan(0)

    expect(Number.isFinite(chineseCommunityScore(areaId))).toBe(true)
    // Essendon West (ABS SAL20888) lacks the partner-pool measures in the
    // census dataset and its GCP workbook is not retained, so partnerPool is
    // an honest null that drops out of the weighted mean. Every other batch
    // record carries the measure.
    if (areaId === 'essendon-west-house') {
      expect(partnerPoolScore(areaId)).toBeNull()
    } else {
      expect(Number.isFinite(partnerPoolScore(areaId))).toBe(true)
    }
    expect(Number.isFinite(DWELLING_GREENSPACE_BY_ID[areaId]?.greenspace)).toBe(true)

    const school = schoolContextByAreaId[areaId]
    expect(school?.zonedPrimary).toBeTruthy()
    expect(school?.zonedSecondary).toBeTruthy()

    const linked = localityFeatures.features.filter((feature) =>
      feature.properties.areaIds.includes(areaId),
    )
    expect(linked.length).toBeGreaterThan(0)
  })

  it('ranks every batch record exactly once with a finite score', () => {
    const strategy = decideStrategies[0]
    const ranked = useAreaRanking(
      areaCorridors,
      { ...strategy.filters, includeStretch: true },
      strategy.weights,
    )
    for (const areaId of BATCH_AREA_IDS) {
      const rows = ranked.value.filter((row) => row.rec.id === areaId)
      expect(rows, areaId).toHaveLength(1)
      expect(Number.isFinite(rows[0].weighted), areaId).toBe(true)
    }
  })
})
