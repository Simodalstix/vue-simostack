// Contract tests for the expanded-card narrative copy (suburbProfiles.js):
// every key must be a real areaCorridors record id (never a display name),
// every entry must carry the four render fields, and fit tags must stay
// within the enum the card knows how to colour.

import { describe, it, expect } from 'vitest'

import { suburbProfiles, suburbProfileFor } from '../suburbProfiles.js'
import { areaCorridors } from '../areaCorridors.js'

const recordIds = new Set(areaCorridors.map((r) => r.id))
const VALID_TAGS = new Set(['network', 'tradeoff', null])

describe('suburb profile copy', () => {
  it('keys every profile by an existing areaCorridors record id', () => {
    for (const id of Object.keys(suburbProfiles)) {
      expect(recordIds.has(id), `unknown record id: ${id}`).toBe(true)
    }
  })

  it('carries the four card fields with valid fit tags', () => {
    for (const [id, p] of Object.entries(suburbProfiles)) {
      expect(typeof p.lives, id).toBe('string')
      expect(typeof p.housing, id).toBe('string')
      expect(Array.isArray(p.fit) && p.fit.length > 0, id).toBe(true)
      for (const f of p.fit) {
        expect(typeof f.text, id).toBe('string')
        expect(VALID_TAGS.has(f.tag), `${id} bad tag: ${f.tag}`).toBe(true)
      }
      for (const k of ['bestFor', 'mainRisk', 'pursueWhen']) {
        expect(typeof p.decision[k], `${id}.decision.${k}`).toBe('string')
      }
    }
  })

  it('shares the combined-name profiles across both member records', () => {
    expect(suburbProfileFor('inner-collingwood-2br')).toBe(suburbProfileFor('inner-abbotsford-2br'))
    expect(suburbProfileFor('chelsea-2br')).toBe(suburbProfileFor('bonbeach-2br'))
  })

  it('returns null for unknown ids (fallback path)', () => {
    expect(suburbProfileFor('no-such-record')).toBeNull()
  })

  it('covers every atlas record since the 2026-07-19 batch', () => {
    for (const rec of areaCorridors) {
      expect(suburbProfileFor(rec.id), `missing profile for ${rec.id}`).not.toBeNull()
    }
  })
})
