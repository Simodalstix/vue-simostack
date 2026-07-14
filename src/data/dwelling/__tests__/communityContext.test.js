// Tests for the Community Context · ABS Census 2021 integration.
//
// Covers the contract the dataset ships with: suburb lookup (original and
// newly added), combined-label mapping to component SAL records, exclusion
// from all scoring, correct rendering of percentage and scalar measures,
// missing-value handling, source metadata, and the absence of evaluative
// demographic wording in the shipped UI code.

import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import {
  DWELLING_COMMUNITY_CONTEXT,
  DWELLING_COMMUNITY_CONTEXT_BY_SUBURB,
} from '../dwelling-community-context-2021'
import { DWELLING_CENSUS_CONTEXT } from '../dwelling-census-context-2021'
import {
  COMMUNITY_DATASET,
  communityContextFor,
  communitySnapshotFor,
  componentSuburbNamesFor,
  fmtPct,
  fmtCount,
  fmtWeeklyIncome,
  fmtMedianAge,
  sourceLineFor,
} from '../communityContext.js'
import { areaCorridors } from '../areaCorridors.js'
import { areaWeights } from '../areaWeights.js'

const src = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

describe('dataset coverage and lookup', () => {
  it('exposes the revised 48-record SAL dataset', () => {
    expect(DWELLING_COMMUNITY_CONTEXT.records).toHaveLength(48)
    expect(COMMUNITY_DATASET.title).toBe('Community Context · ABS Census 2021')
    expect(COMMUNITY_DATASET.recordCount).toBe(48)
    expect(DWELLING_CENSUS_CONTEXT).toBe(DWELLING_COMMUNITY_CONTEXT)
  })

  it('resolves an original lens suburb to an individual SAL record', () => {
    const ctx = communityContextFor('footscray-station-2br')
    expect(ctx.components).toHaveLength(1)
    expect(ctx.components[0].record.suburb).toBe('Footscray')
    expect(ctx.components[0].record.geographyType).toBe('SAL')
    expect(ctx.components[0].record.community.totalPopulation.count).toBeGreaterThan(0)
    expect(ctx.missing).toEqual([])
  })

  it('resolves newly added suburbs (Sunbury, Kew, North Melbourne, Cremorne, Elwood, Balaclava, Chelsea, Bonbeach)', () => {
    for (const [areaId, suburb] of [
      ['sunbury-house', 'Sunbury'],
      ['kew-2br', 'Kew'],
      ['north-melbourne-2br', 'North Melbourne'],
      ['cremorne-2br', 'Cremorne'],
      ['elwood-2br', 'Elwood'],
      ['balaclava-2br', 'Balaclava'],
      ['chelsea-2br', 'Chelsea'],
      ['bonbeach-2br', 'Bonbeach'],
    ]) {
      const ctx = communityContextFor(areaId)
      expect(ctx.components.map((c) => c.record.suburb)).toEqual([suburb])
      expect(ctx.components[0].record.geographyCode).toMatch(/^SAL\d+$/)
    }
  })
})

describe('combined-label handling', () => {
  it('maps combined labels to component SAL records via dwellingLensEntries', () => {
    const ctx = communityContextFor('upfield-corridor') // "Brunswick / Coburg"
    expect(ctx.components.map((c) => c.record.suburb)).toEqual(['Brunswick', 'Coburg'])
    const wp = communityContextFor('inner-windsor-prahran-2br')
    expect(wp.components.map((c) => c.record.suburb)).toEqual(['Windsor', 'Prahran'])
  })

  it('keeps component records separate: no averaged percentages or medians', () => {
    const ctx = communityContextFor('upfield-corridor')
    const [brunswick, coburg] = ctx.components.map((c) => c.record)
    // Distinct published medians must both be reachable, unblended.
    expect(brunswick.community.medianAge.value).not.toBeNull()
    expect(coburg.community.medianAge.value).not.toBeNull()
    // The adapter exposes no aggregate/average across components.
    expect(ctx.average).toBeUndefined()
    expect(ctx.combined).toBeUndefined()
  })

  it('uses dwellingLensEntries for combined-label decomposition, not station coverage', () => {
    const names = componentSuburbNamesFor('frankston-middle-ring')
    expect(names).toEqual(['Moorabbin', 'Cheltenham'])
    expect(names).not.toContain('Highett')
    const ctx = communityContextFor('frankston-middle-ring')
    expect(ctx.components.map((c) => c.record.suburb)).toEqual(['Moorabbin', 'Cheltenham'])
    expect(ctx.missing).toEqual([])
  })

  it('covers every /dwelling ranking record with components or an explicit gap', () => {
    for (const rec of areaCorridors) {
      const names = componentSuburbNamesFor(rec.id)
      expect(names.length).toBeGreaterThan(0)
      const ctx = communityContextFor(rec.id)
      expect(ctx.components.length + ctx.missing.length).toBe(names.length)
    }
  })
})

describe('exclusion from scoring', () => {
  it('every record is flagged context-only', () => {
    for (const r of DWELLING_COMMUNITY_CONTEXT.records) {
      expect(r.contextOnly).toBe(true)
      expect(r.excludeFromSuburbScore).toBe(true)
      expect(r.scoreContribution).toBe(0)
    }
  })

  it('no ranking weight keys reference demographic measures', () => {
    const banned = /language|birthplace|religion|ethnic|overseas|ancestr/i
    for (const w of areaWeights) {
      expect(w.key).not.toMatch(banned)
      expect(w.label).not.toMatch(banned)
    }
  })

  it('the ranking composables never import the community dataset', () => {
    for (const rel of [
      '../../../composables/useAreaRanking.js',
      '../../../composables/useStrategyRanking.js',
      '../../../composables/useCommuteScoring.js',
    ]) {
      const code = src(rel)
      expect(code).not.toMatch(/communityContext|community-context|COMMUNITY_CONTEXT/)
    }
  })
})

describe('measure rendering', () => {
  it('renders percentage measures as published, never recalculated', () => {
    const seddon = DWELLING_COMMUNITY_CONTEXT_BY_SUBURB['Seddon']
    // Tenure uses occupied private dwellings, not population (QA row: 58.8%).
    expect(fmtPct(seddon.community.tenure.ownerOccupied.percentage)).toBe('58.8%')
    expect(seddon.community.tenure.denominator).not.toBe(seddon.community.totalPopulation.count)
    expect(fmtPct(seddon.community.overseasBornPopulation.percentage)).toBe('26.8%')
  })

  it('renders scalar measures with units', () => {
    const seddon = DWELLING_COMMUNITY_CONTEXT_BY_SUBURB['Seddon']
    expect(fmtCount(seddon.community.totalPopulation.count)).toBe('5,143')
    expect(fmtMedianAge(seddon.community.medianAge)).toBe('36 yrs')
    expect(fmtWeeklyIncome(seddon.community.medianHouseholdIncome)).toBe('$2,471/wk')
  })

  it('builds a descriptive snapshot without blending components', () => {
    const snap = communitySnapshotFor('upfield-corridor')
    expect(snap.suburb).toBe('Brunswick')
    expect(snap.multiComponent).toBe(true)
    expect(snap.text).toMatch(/% overseas-born/)
  })
})

describe('missing-value handling', () => {
  it('formatters degrade to n/a', () => {
    expect(fmtPct(null)).toBe('n/a')
    expect(fmtPct(undefined)).toBe('n/a')
    expect(fmtCount(null)).toBe('n/a')
    expect(fmtWeeklyIncome(null)).toBe('n/a')
    expect(fmtWeeklyIncome({ value: null })).toBe('n/a')
    expect(fmtMedianAge(undefined)).toBe('n/a')
  })

  it('a suburb without a SAL record resolves to an explicit gap, not a crash', () => {
    const ctx = communityContextFor('ascot-vale-2br')
    expect(ctx.components).toEqual([])
    expect(ctx.missing).toEqual(['Ascot Vale'])
    expect(communitySnapshotFor('ascot-vale-2br')).toBeNull()
  })

  it('an unknown area id returns an empty resolution', () => {
    expect(communityContextFor('no-such-record')).toBeNull()
  })
})

describe('source metadata', () => {
  it('every record carries the required source fields', () => {
    for (const r of DWELLING_COMMUNITY_CONTEXT.records) {
      const s = sourceLineFor(r)
      expect(s.geographyType).toBe('SAL')
      expect(s.geographyCode).toMatch(/^SAL\d+$/)
      expect(s.censusYear).toBe(2021)
      expect(s.source).toBe('Australian Bureau of Statistics')
      expect(s.retrievedAt).toBe('2026-07-14')
      expect(s.privacyNote).toBeTruthy()
    }
  })
})

describe('neutral wording and shipping hygiene', () => {
  it('no evaluative demographic wording in the shipped adapter or UI', () => {
    const banned = [/cultural fit/i, /ethnicity score/i, /preferred demographic/i]
    for (const rel of [
      '../communityContext.js',
      '../../../components/dwelling/CommunityContextSection.vue',
      '../../../components/dwelling/SuburbDecisionPane.vue',
    ]) {
      const code = src(rel)
      for (const b of banned) expect(code).not.toMatch(b)
    }
  })

  it('the QA CSV is not part of the shipped source tree', () => {
    expect(
      existsSync(fileURLToPath(new URL('../dwelling-community-context-qa.csv', import.meta.url))),
    ).toBe(false)
  })
})
