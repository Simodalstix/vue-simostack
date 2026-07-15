import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { areaCorridors } from '../areaCorridors.js'
import { decideCriterionByKey } from '../decideStrategies.js'
import { DWELLING_GREENSPACE_CONTEXT } from '../greenspace/dwelling-greenspace-context.ts'

const activeRecords = areaCorridors.filter((rec) => rec.scored !== false)
const greenspaceIds = new Set(DWELLING_GREENSPACE_CONTEXT.records.map((rec) => rec.id))
const corridorIds = new Set(areaCorridors.map((rec) => rec.id))
const generatedTargets = JSON.parse(
  readFileSync(
    new URL('../../../../tools/dwelling-greenspace/dwelling-greenspace-targets-app.json', import.meta.url),
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

  it('feeds the strategy engine one greenspace criterion value per record', () => {
    const rec = activeRecords.find((record) => record.greenspaceComponents)
    const altered = {
      ...rec,
      greenspaceComponents: {
        localOpenSpaceAccess: 0,
        majorParkAccess: 0,
        natureCorridorAccess: 0,
      },
    }
    expect(decideCriterionByKey.greenspace.value(altered)).toBe(rec.greenspace)
  })

  it('keeps the generated context in lockstep with the active ranked records', () => {
    expect(DWELLING_GREENSPACE_CONTEXT.records.length).toBe(activeRecords.length)
  })
})
