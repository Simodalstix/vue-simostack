// Contract tests for the girls' sport access context (girlsSport.js):
// context-only data keyed by real record ids, with the supplied three-state
// club values and confidence bands preserved exactly (never coerced), and
// source URLs kept in the data layer.

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import {
  girlsSportByArea,
  girlsSportFor,
  GIRLS_SPORT_CLUBS,
  sportAccessScore,
} from '../girlsSport.js'
import { areaCorridors } from '../areaCorridors.js'

const recordIds = new Set(areaCorridors.map((r) => r.id))
const CLUB_KEYS = GIRLS_SPORT_CLUBS.map((c) => c.key)
const VALID_PRESENCE = new Set([true, false, 'unknown'])
const VALID_CONFIDENCE = new Set(['high', 'medium', 'low'])

describe('girls sport context data', () => {
  it('keys every entry by an existing areaCorridors record id', () => {
    for (const id of Object.keys(girlsSportByArea)) {
      expect(recordIds.has(id), `unknown record id: ${id}`).toBe(true)
    }
  })

  it('preserves three-state club presence and the confidence enum', () => {
    for (const [id, g] of Object.entries(girlsSportByArea)) {
      expect(typeof g.line, id).toBe('string')
      expect(Array.isArray(g.facilities), id).toBe(true)
      expect(VALID_CONFIDENCE.has(g.confidence), `${id} confidence: ${g.confidence}`).toBe(true)
      expect(Object.keys(g.clubPresence).sort()).toEqual([...CLUB_KEYS].sort())
      for (const k of CLUB_KEYS) {
        expect(
          VALID_PRESENCE.has(g.clubPresence[k]),
          `${id}.${k}: ${JSON.stringify(g.clubPresence[k])}`,
        ).toBe(true)
      }
      expect(g.sources.length, id).toBeGreaterThan(0)
      for (const u of g.sources) expect(u, id).toMatch(/^https?:\/\//)
    }
  })

  it("keeps 'unknown' as the string, never coerced to false", () => {
    // Cremorne shipped fully unknown in the supplied research.
    expect(girlsSportFor('cremorne-2br').clubPresence).toEqual({
      netball: 'unknown',
      girlsFooty: 'unknown',
      soccer: 'unknown',
    })
  })

  it('shares the combined-name records across both member ids', () => {
    expect(girlsSportFor('inner-collingwood-2br')).toBe(girlsSportFor('inner-abbotsford-2br'))
    expect(girlsSportFor('chelsea-2br')).toBe(girlsSportFor('bonbeach-2br'))
  })

  it('returns null for records without research (context stays absent, not faked)', () => {
    expect(girlsSportFor('toorak-2br')).toBeNull()
  })

  it('scores confirmed pathways and facility presence in equal broad increments', () => {
    expect(sportAccessScore(null)).toBeNull()
    expect(sportAccessScore(girlsSportFor('cremorne-2br'))).toBe(2.5)
    expect(sportAccessScore(girlsSportFor('middle-park-2br'))).toBe(10)
  })

  it('is only imported by the criterion definition, never map colouring', () => {
    const src = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')
    for (const rel of [
      '../../../composables/useAreaRanking.js',
      '../../../composables/useCommuteScoring.js',
      '../mapConfig.js',
    ]) {
      expect(src(rel)).not.toMatch(/girlsSport/i)
    }
    expect(src('../decideStrategies.js')).toMatch(/sportAccessScore/)
  })
})
