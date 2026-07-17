import { describe, expect, it } from 'vitest'

import { areaGeo } from '../areaGeo.js'
import { localityFeatures, localityIdsByArea } from '../localityFeatures.js'

describe('locality map coverage', () => {
  it('links every ranked area to at least one locality polygon', () => {
    expect(Object.keys(localityIdsByArea).sort()).toEqual(Object.keys(areaGeo).sort())
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
