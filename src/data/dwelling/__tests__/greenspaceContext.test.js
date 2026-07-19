import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { decideCriterionByKey, decideStrategies } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_CONTEXT } from '../greenspace/dwelling-greenspace-context.ts'

const activeRecords = areaCorridors.filter((rec) => rec.scored !== false)
const greenspaceIds = new Set(DWELLING_GREENSPACE_CONTEXT.records.map((rec) => rec.id))
const corridorIds = new Set(areaCorridors.map((rec) => rec.id))
const strategy = decideStrategies[0]
const rankedRows = useAreaRanking(
  areaCorridors,
  { ...strategy.filters, includeStretch: true },
  strategy.weights,
)
const generatedTargets = JSON.parse(
  readFileSync(
    new URL(
      '../../../../tools/dwelling-greenspace/dwelling-greenspace-targets.json',
      import.meta.url,
    ),
    'utf-8',
  ),
)

describe('dwelling greenspace context', () => {
  it('gives every active suburb a finite greenspace score and bounded components', () => {
    for (const rec of activeRecords) {
      expect(Number.isFinite(rec.greenspace)).toBe(true)
      expect(rec.greenspace).toBeGreaterThanOrEqual(0)
      expect(rec.greenspace).toBeLessThanOrEqual(10)

      expect(rec.greenspaceComponents).toBeTruthy()
      for (const value of Object.values(rec.greenspaceComponents)) {
        expect(Number.isFinite(value)).toBe(true)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(10)
      }

      expect(rec.greenspaceSourceMetadata?.methodologyVersion).toBe('greenspace-access-v1')
      expect(Number.isFinite(rec.greenspaceEvidence?.representedPopulation)).toBe(true)
      expect(Number.isFinite(rec.greenspaceEvidence?.sampledMeshBlocks)).toBe(true)
    }
  })

  it('maps every generated target id to a real application record', () => {
    expect(greenspaceIds.size).toBe(DWELLING_GREENSPACE_CONTEXT.records.length)
    for (const id of greenspaceIds) {
      expect(corridorIds.has(id)).toBe(true)
    }
  })

  it('keeps every generated target id aligned with a real application record id', () => {
    for (const record of generatedTargets.records) {
      expect(corridorIds.has(record.id)).toBe(true)
    }
  })

  it('keeps greenspace as context rather than a strategy criterion', () => {
    expect(decideCriterionByKey.greenspace).toBeUndefined()
    expect(decideCriterionByKey.beach).toBeTruthy()
  })

  it('keeps the generated context in lockstep with the active ranked records', () => {
    expect(DWELLING_GREENSPACE_CONTEXT.records.length).toBe(activeRecords.length)
  })

  it.each([
    ['clifton-hill-2br', 9.9123],
    ['doncaster-villa', 9.6298],
  ])('includes reviewed generated evidence for %s', (id, expectedScore) => {
    const record = DWELLING_GREENSPACE_CONTEXT.records.find((item) => item.id === id)
    const corridor = areaCorridors.find((item) => item.id === id)
    const rankedRow = rankedRows.value.find((item) => item.rec.id === id)

    expect(record?.greenspace).toBe(expectedScore)
    expect(record?.audit.reviewFlags).toEqual([])
    expect(record?.audit.residentialPopulationCoveragePct).toBeGreaterThan(98)
    expect(corridor?.scored).not.toBe(false)
    expect(corridor?.greenspace).toBe(expectedScore)
    expect(rankedRow?.status).not.toBe('unscored')
    expect(Number.isFinite(rankedRow?.weighted)).toBe(true)
  })
})
