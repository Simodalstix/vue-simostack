import { describe, expect, it } from 'vitest'

import { areaCorridors } from '../areaCorridors.js'
import { areaSources } from '../areaSources.js'

describe('area source registry', () => {
  it('resolves every area evidence source id', () => {
    for (const record of areaCorridors) {
      expect(record.sources?.length, record.id).toBeGreaterThan(0)
      for (const sourceId of record.sources) {
        expect(areaSources[sourceId], `${record.id}: ${sourceId}`).toBeTruthy()
      }
    }
  })

  it('keeps registry keys, ids and URLs aligned', () => {
    for (const [sourceId, source] of Object.entries(areaSources)) {
      expect(source.id).toBe(sourceId)
      expect(source.url).toMatch(/^https:\/\//)
    }
  })
})
