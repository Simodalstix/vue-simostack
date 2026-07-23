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

  it('shares the combined profile detail while keeping card taglines suburb-specific', () => {
    const collingwood = suburbProfileFor('inner-collingwood-2br')
    const abbotsford = suburbProfileFor('inner-abbotsford-2br')
    const chelsea = suburbProfileFor('chelsea-2br')
    const bonbeach = suburbProfileFor('bonbeach-2br')

    expect(collingwood.lives).toBe(abbotsford.lives)
    expect(collingwood.previewTagline).not.toBe(abbotsford.previewTagline)
    expect(chelsea.lives).toBe(bonbeach.lives)
    expect(chelsea.previewTagline).not.toBe(bonbeach.previewTagline)
  })

  it('keeps every ranking-card tagline concise and distinct', () => {
    const seen = new Map()

    for (const [id, p] of Object.entries(suburbProfiles)) {
      const tagline = p.previewTagline || p.decision.bestFor
      const normalised = tagline.trim().toLocaleLowerCase()

      expect(tagline.length, `${id} tagline exceeds 80 characters`).toBeLessThanOrEqual(80)
      expect(seen.has(normalised), `${id} duplicates ${seen.get(normalised)}`).toBe(false)
      seen.set(normalised, id)
    }
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
