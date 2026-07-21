import { describe, expect, it } from 'vitest'

import { areaCorridors } from '../areaCorridors.js'
import { areaGeo } from '../areaGeo.js'
import { localityFeatures, localityIdsByArea } from '../localityFeatures.js'

describe('locality map coverage', () => {
  it('links every scored area to at least one locality polygon', () => {
    // Pending-evidence records (scored: false) may render their provisional
    // anchor point alone until their Vicmap locality polygon is vendored;
    // every scored record must have a polygon.
    const scoredIds = new Set(
      areaCorridors.filter((record) => record.scored !== false).map((record) => record.id),
    )
    const linked = new Set(Object.keys(localityIdsByArea))
    for (const areaId of Object.keys(areaGeo)) {
      if (scoredIds.has(areaId)) {
        expect(linked.has(areaId), areaId).toBe(true)
      }
    }
    for (const areaId of linked) {
      expect(areaGeo[areaId], areaId).toBeTruthy()
    }
  })

  it.each([
    ['chelsea-2br', 'Chelsea'],
    ['bonbeach-2br', 'Bonbeach'],
  ])('renders %s using the %s locality', (areaId, localityName) => {
    const linkedFeatures = localityFeatures.features.filter((feature) =>
      feature.properties.areaIds.includes(areaId),
    )

    expect(linkedFeatures.map((feature) => feature.properties.name)).toContain(localityName)
  })
})
