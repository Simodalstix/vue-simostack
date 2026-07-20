import { describe, it, expect } from 'vitest'

import { personalAnchors } from '../personalAnchors.js'

const VALID_TYPES = new Set(['home', 'work', 'family', 'other'])

describe('personal map anchors', () => {
  it('ships every marker with one immutable geographic point', () => {
    for (const anchor of personalAnchors) {
      expect(typeof anchor.id).toBe('string')
      expect(typeof anchor.label).toBe('string')
      expect(VALID_TYPES.has(anchor.type), `${anchor.id} invalid type`).toBe(true)
      expect(Number.isFinite(anchor.longitude), `${anchor.id} longitude`).toBe(true)
      expect(Number.isFinite(anchor.latitude), `${anchor.id} latitude`).toBe(true)
      expect(anchor.coordinates).toEqual([anchor.longitude, anchor.latitude])
    }
  })

  it('treats label offsets as label placement only, never missing coordinates', () => {
    for (const anchor of personalAnchors) {
      if (!anchor.labelOffset) continue
      expect(anchor.labelOffset).toHaveLength(2)
      expect(
        anchor.labelOffset.every((value) => Number.isFinite(value)),
        anchor.id,
      ).toBe(true)
      expect(Number.isFinite(anchor.longitude), `${anchor.id} longitude`).toBe(true)
      expect(Number.isFinite(anchor.latitude), `${anchor.id} latitude`).toBe(true)
    }
  })
})
