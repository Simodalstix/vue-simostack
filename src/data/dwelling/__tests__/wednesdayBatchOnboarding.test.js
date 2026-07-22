// Coverage contract for the 2026-07-22 ("Wednesday") onboarding batch.
//
// All 20 retained records remain UNSCORED (scored: false) pending owner review.
// Identity, geometry, locality, Census, school, greenspace, commute and cost
// evidence must resolve. Safety deliberately remains null because the current
// CSA download does not expose reproducible suburb geography.

import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { communityContextFor } from '../communityContext.js'
import { DWELLING_COST_BY_ID } from '../cost/dwelling-cost-context.ts'
import { decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_BY_ID } from '../greenspace/dwelling-greenspace-context.ts'
import { localityFeatures } from '../localityFeatures.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import { zonedSchoolEvidenceForArea } from '../schools/schoolStrength.js'
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
  it.each(PENDING_AREA_IDS)('resolves completed evidence passes for %s', (areaId) => {
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

    const linked = localityFeatures.features.filter((feature) =>
      feature.properties.areaIds.includes(areaId),
    )
    expect(linked.length).toBeGreaterThan(0)
    expect(Number.isFinite(DWELLING_GREENSPACE_BY_ID[areaId]?.greenspace)).toBe(true)

    const school = schoolContextByAreaId[areaId]
    expect(school?.zonedPrimary).toBeTruthy()
    expect(school?.zonedSecondary).toBeTruthy()
    expect(record.childhood.publicPrimary).toEqual([school.zonedPrimary])
    expect(record.childhood.publicSecondary).toEqual([school.zonedSecondary])

    const schoolEvidence = zonedSchoolEvidenceForArea(areaId)
    expect(Number.isFinite(schoolEvidence?.primary.evidence?.strength)).toBe(true)
    if (areaId === 'port-melbourne-2br') {
      expect(schoolEvidence?.secondary.evidence?.strength).toBeNull()
    } else {
      expect(Number.isFinite(schoolEvidence?.secondary.evidence?.strength)).toBe(true)
    }

    expect(record.dwelling.indicativePrice).toHaveLength(2)
    expect(record.dwelling.annualOc).toHaveLength(2)
    const propertyType = record.dwelling.types.includes('house') ? 'house' : 'unit'
    const officialMedian = DWELLING_COST_BY_ID[areaId]?.prices[propertyType]?.all?.medianPrice
    expect(officialMedian).toBeGreaterThanOrEqual(record.dwelling.indicativePrice[0])
    expect(officialMedian).toBeLessThanOrEqual(record.dwelling.indicativePrice[1])
    expect(Number.isFinite(record.commute?.typical)).toBe(true)
    expect(Number.isFinite(record.commute?.stressed)).toBe(true)
    expect(record.scores.safety).toBeNull()
    expect(record.sources).toEqual(
      expect.arrayContaining([
        'abs',
        'vgv',
        'csa',
        'vicplan',
        'ptv',
        'detSchoolLocations',
        'detSchoolZones2027',
      ]),
    )
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
