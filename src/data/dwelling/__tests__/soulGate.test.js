import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { decideStrategies } from '../decideStrategies.js'
import { OWNER_VETOES_BY_AREA_ID, SOUL_GATE } from '../ownerVetoes.js'
import { partitionDecisionRows } from '../unscoredUx.js'

const strategy = decideStrategies.find((item) => item.id === 'apartment')
const filters = {
  ...strategy.filters,
  maxCommute: 90,
  maxStationWalk: 20,
  includeStretch: true,
  strategy,
}

describe('Soul owner-veto gate', () => {
  it('is an enabled-by-default gate with the exact owner judgments', () => {
    expect(SOUL_GATE).toMatchObject({ scoringRole: 'gate', defaultEnabled: true, accent: 'blue' })
    expect(OWNER_VETOES_BY_AREA_ID).toEqual({
      'melbourne-cbd-2br': {
        reason: 'No place for a growing kid',
        basis: 'Owner judgment',
      },
      'carlton-2br': {
        reason: 'University-focused housing',
        basis: 'Owner judgment',
      },
      'south-melbourne-2br': { reason: 'Motorway', basis: 'Owner judgment' },
      'southbank-2br': { reason: 'Current home base', basis: 'Owner judgment' },
    })
    expect(OWNER_VETOES_BY_AREA_ID).not.toHaveProperty('docklands-2br')
    expect(OWNER_VETOES_BY_AREA_ID).not.toHaveProperty('parkville-2br')
  })

  it('excludes vetoes from ranks without changing their true scores', () => {
    const enabled = useAreaRanking(
      areaCorridors,
      { ...filters, soulEnabled: true },
      strategy.weights,
    )
    const disabled = useAreaRanking(
      areaCorridors,
      { ...filters, soulEnabled: false },
      strategy.weights,
    )
    const disabledById = Object.fromEntries(disabled.value.map((row) => [row.rec.id, row]))
    const groups = partitionDecisionRows(enabled.value)

    expect(groups.vetoed.map((row) => row.rec.id).sort()).toEqual(
      Object.keys(OWNER_VETOES_BY_AREA_ID).sort(),
    )
    for (const row of groups.vetoed) {
      expect(row.weighted).toBe(disabledById[row.rec.id].weighted)
      expect(row.reasons[0]).toMatch(/^Owner judgment: /)
      expect(groups.ranked.some((ranked) => ranked.rec.id === row.rec.id)).toBe(false)
    }
  })

  it('ranks vetoed records normally when Soul is off', () => {
    const rows = useAreaRanking(
      areaCorridors,
      { ...filters, soulEnabled: false },
      strategy.weights,
    ).value
    for (const areaId of Object.keys(OWNER_VETOES_BY_AREA_ID)) {
      expect(rows.find((row) => row.rec.id === areaId)?.status).not.toBe('veto')
    }
  })
})
