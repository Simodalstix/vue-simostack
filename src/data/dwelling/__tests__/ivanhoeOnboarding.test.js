import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { chineseCommunityScore } from '../chineseCommunity.js'
import { communityContextFor } from '../communityContext.js'
import { decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_BY_ID } from '../greenspace/dwelling-greenspace-context.ts'
import { partnerPoolScore } from '../partnerPool.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import { suburbProfileFor } from '../suburbProfiles.js'

const AREA_ID = 'ivanhoe-house'

describe('Ivanhoe onboarding pilot', () => {
  it('resolves every required application adapter exactly once', () => {
    expect(areaCorridors.filter((record) => record.id === AREA_ID)).toHaveLength(1)
    expect(areaGeo[AREA_ID]?.stationPoints.length).toBeGreaterThanOrEqual(1)
    expect(suburbProfileFor(AREA_ID)).toBeTruthy()
    expect(communityContextFor(AREA_ID)?.missing).toEqual([])
    expect(Number.isFinite(chineseCommunityScore(AREA_ID))).toBe(true)
    expect(Number.isFinite(partnerPoolScore(AREA_ID))).toBe(true)
    expect(Number.isFinite(DWELLING_GREENSPACE_BY_ID[AREA_ID]?.greenspace)).toBe(true)
    expect(schoolContextByAreaId[AREA_ID]).toMatchObject({
      zonedPrimary: 'Ivanhoe Primary School',
      zonedSecondary: 'Thornbury High School',
      alsoInCatchmentPrimary: ['Ivanhoe East Primary School'],
      alsoInCatchmentSecondary: ['Kew High School'],
    })
  })

  it('flows through the existing ranking and price gates without special handling', () => {
    const strategy = decideStrategies[0]
    const ranked = useAreaRanking(
      areaCorridors,
      { ...strategy.filters, includeStretch: true },
      strategy.weights,
    )
    const rows = ranked.value.filter((row) => row.rec.id === AREA_ID)

    expect(rows).toHaveLength(1)
    expect(['conditional', 'reject']).toContain(rows[0].status)
    expect(Number.isFinite(rows[0].weighted)).toBe(true)
  })
})
