// Coverage contract for the 2026-07-22 ("Wednesday") onboarding batch.
//
// All 20 retained records have owner approval to graduate into the ranking.
// Identity, geometry, locality, Census, school, greenspace, commute and cost
// evidence must resolve with a finite score. Safety deliberately remains null
// because the current CSA download does not expose reproducible suburb
// geography; null criteria drop out of the weighted mean.

import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { communityContextFor } from '../communityContext.js'
import { DWELLING_COST_BY_ID } from '../cost/dwelling-cost-context.ts'
import { decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_BY_ID } from '../greenspace/dwelling-greenspace-context.ts'
import { localityFeatures } from '../localityFeatures.js'
import { relativeScoreFor } from '../relativeScoring.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import { zonedSchoolEvidenceForArea } from '../schools/schoolStrength.js'
import { suburbProfileFor } from '../suburbProfiles.js'

const BATCH_AREA_IDS = [
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

describe('Wednesday batch: graduated coverage', () => {
  it.each(BATCH_AREA_IDS)('resolves completed evidence passes for %s', (areaId) => {
    const records = areaCorridors.filter((record) => record.id === areaId)
    expect(records).toHaveLength(1)

    const record = records[0]
    expect(record.scored).not.toBe(false)
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
    expect(relativeScoreFor('safetyQuality', areaId)).toBeNull()
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

  it('ranks every batch record exactly once with a finite score', () => {
    const rows = useAreaRanking(areaCorridors, filters, strategy.weights).value

    for (const areaId of BATCH_AREA_IDS) {
      const matches = rows.filter((row) => row.rec.id === areaId)
      expect(matches, areaId).toHaveLength(1)
      expect(matches[0].status, areaId).not.toBe('unscored')
      expect(Number.isFinite(matches[0].weighted), areaId).toBe(true)
    }
  })
})
