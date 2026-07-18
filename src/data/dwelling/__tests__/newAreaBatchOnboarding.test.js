import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { chineseCommunityScore } from '../chineseCommunity.js'
import { communityContextFor } from '../communityContext.js'
import { decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_BY_ID } from '../greenspace/dwelling-greenspace-context.ts'
import { partnerPoolScore } from '../partnerPool.js'
import { personalNetworkByAreaId } from '../personalNetwork.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import { suburbProfileFor } from '../suburbProfiles.js'

const AREA_IDS = [
  'heidelberg-3br-townhouse',
  'rosanna-house',
  'fairfield-house',
  'surrey-hills-house',
  'blackburn-house',
  'mount-waverley-villa',
  'ashburton-villa',
  'bentleigh-house',
  'newport-house',
]

describe('remaining new-area onboarding batch', () => {
  it.each(AREA_IDS)('resolves every generated adapter for %s', (areaId) => {
    const records = areaCorridors.filter((record) => record.id === areaId)
    const record = records[0]
    const school = schoolContextByAreaId[areaId]

    expect(records).toHaveLength(1)
    expect(record.placeholder).toBe(true)
    expect(areaGeo[areaId]?.stationPoints).toHaveLength(1)
    expect(suburbProfileFor(areaId)).toBeTruthy()
    expect(communityContextFor(areaId)?.missing).toEqual([])
    expect(Number.isFinite(chineseCommunityScore(areaId))).toBe(true)
    expect(Number.isFinite(partnerPoolScore(areaId))).toBe(true)
    expect(Number.isFinite(DWELLING_GREENSPACE_BY_ID[areaId]?.greenspace)).toBe(true)
    expect(school?.zonedPrimary).toBeTruthy()
    expect(school?.zonedSecondary).toBeTruthy()
    expect(record.childhood.publicPrimary).toEqual([
      school.zonedPrimary,
      ...school.alsoInCatchmentPrimary,
    ])
    expect(record.childhood.publicSecondary).toEqual([
      school.zonedSecondary,
      ...school.alsoInCatchmentSecondary,
    ])
    expect(personalNetworkByAreaId[areaId]?.estMin).toBeNull()
  })

  it('keeps all nine visible to the existing ranking with honest null criteria', () => {
    const strategy = decideStrategies[0]
    const ranked = useAreaRanking(
      areaCorridors,
      { ...strategy.filters, includeStretch: true },
      strategy.weights,
    )

    for (const areaId of AREA_IDS) {
      const rows = ranked.value.filter((row) => row.rec.id === areaId)
      expect(rows, areaId).toHaveLength(1)
      expect(Number.isFinite(rows[0].weighted), areaId).toBe(true)
    }
  })
})
