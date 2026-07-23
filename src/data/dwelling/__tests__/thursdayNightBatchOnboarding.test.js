// Coverage contract for the 2026-07-23 Thursday-night onboarding batch.
//
// The nine records use generated ABS, VGV, school-zone and greenspace
// evidence. Safety and recreation remain honest nulls. Greenvale Secondary
// served only Years 7-10 in 2025, so its reviewed strength stays null.

import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { areaSources } from '../areaSources.js'
import { chineseCommunityScore } from '../chineseCommunity.js'
import { communityContextFor } from '../communityContext.js'
import { DWELLING_COST_BY_ID } from '../cost/dwelling-cost-context.ts'
import { decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_BY_ID } from '../greenspace/dwelling-greenspace-context.ts'
import {
  filipinoCommunityScore,
  southAmericanCommunityScore,
  thaiCommunityScore,
  vietnameseCommunityScore,
} from '../languageCommunities.js'
import { localityFeatures } from '../localityFeatures.js'
import { partnerPoolScore } from '../partnerPool.js'
import { relativeScoreFor } from '../relativeScoring.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import { zonedSchoolEvidenceForArea } from '../schools/schoolStrength.js'
import { suburbProfileFor } from '../suburbProfiles.js'

const BATCH_AREA_IDS = [
  'altona-north-2br',
  'broadmeadows-house',
  'cairnlea-house',
  'campbellfield-house',
  'deer-park-house',
  'epping-house',
  'greenvale-house',
  'hoppers-crossing-house',
  'roxburgh-park-house',
]

const strategy = decideStrategies[0]
const filters = { ...strategy.filters, includeStretch: true }

describe('Thursday-night batch: graduated coverage', () => {
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
    expect(Number.isFinite(chineseCommunityScore(areaId))).toBe(true)
    expect(Number.isFinite(partnerPoolScore(areaId))).toBe(true)

    for (const score of [
      filipinoCommunityScore(areaId),
      thaiCommunityScore(areaId),
      southAmericanCommunityScore(areaId),
      vietnameseCommunityScore(areaId),
    ]) {
      expect(score === null || Number.isFinite(score)).toBe(true)
    }

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
    if (areaId === 'greenvale-house') {
      expect(schoolEvidence?.secondary.evidence?.strength).toBeNull()
    } else {
      expect(Number.isFinite(schoolEvidence?.secondary.evidence?.strength)).toBe(true)
    }

    const propertyType = record.dwelling.types.includes('house') ? 'house' : 'unit'
    const officialMedian = DWELLING_COST_BY_ID[areaId]?.prices[propertyType]?.all?.medianPrice
    expect(officialMedian).toBeGreaterThanOrEqual(record.dwelling.indicativePrice[0])
    expect(officialMedian).toBeLessThanOrEqual(record.dwelling.indicativePrice[1])
    expect(Number.isFinite(record.commute?.typical)).toBe(true)
    expect(Number.isFinite(record.commute?.stressed)).toBe(true)
    expect(record.scores.safety).toBeNull()
    expect(relativeScoreFor('safetyQuality', areaId)).toBeNull()

    for (const sourceId of record.sources) expect(areaSources[sourceId]).toBeTruthy()
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
