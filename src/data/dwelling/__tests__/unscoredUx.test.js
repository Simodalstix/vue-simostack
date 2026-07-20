import { describe, expect, it } from 'vitest'

import { useAreaRanking } from '../../../composables/useAreaRanking.js'
import { areaCorridors } from '../areaCorridors.js'
import { decideStrategies } from '../decideStrategies.js'
import { computeAreaState, MAP_THEME } from '../mapConfig.js'
import { fitBandColor } from '../fitBands.js'
import { UNSCORED_BANNER, fitLineForRow, partitionDecisionRows } from '../unscoredUx.js'

const strategy = decideStrategies[0]
const filters = {
  ...strategy.filters,
  maxCommute: 90,
  maxStationWalk: 20,
  includeStretch: true,
}
const scoredFixture = areaCorridors.find((record) => record.scored !== false)
const unscoredFixture = {
  ...scoredFixture,
  id: 'synthetic-unscored',
  suburb: 'Synthetic Pending Suburb',
  scored: false,
}

describe('unscored record presentation contract', () => {
  it('keeps the record outside ranked rows and exposes it to the unscored group', () => {
    const rows = useAreaRanking([scoredFixture, unscoredFixture], filters, strategy.weights).value
    const groups = partitionDecisionRows(rows)

    expect(groups.ranked.map((row) => row.rec.id)).toEqual([scoredFixture.id])
    expect(groups.unscored.map((row) => row.rec.id)).toEqual([unscoredFixture.id])
    expect(groups.ranked.map((row, index) => [row.rec.id, index + 1])).not.toContainEqual([
      unscoredFixture.id,
      expect.any(Number),
    ])
  })

  it('does not change scored ordering when an unscored fixture is present', () => {
    const baseline = partitionDecisionRows(
      useAreaRanking(areaCorridors, filters, strategy.weights).value,
    ).ranked
    const withPending = partitionDecisionRows(
      useAreaRanking([...areaCorridors, unscoredFixture], filters, strategy.weights).value,
    ).ranked

    expect(withPending).toEqual(baseline)
  })

  it('returns inert map state instead of dropping the record', () => {
    const row = useAreaRanking([unscoredFixture], filters, strategy.weights).value[0]
    const state = computeAreaState([row], { [unscoredFixture.id]: 49 })[unscoredFixture.id]

    expect(state).toEqual({
      fid: 49,
      color: MAP_THEME.unscoredFill,
      fillOpacity: 0.08,
      status: 'unscored',
      unscored: true,
      vetoed: false,
    })
    expect(state.color).not.toBe(fitBandColor(row.weighted))
  })

  it('returns the pending-evidence card banner instead of a fail verdict', () => {
    const row = useAreaRanking([unscoredFixture], filters, strategy.weights).value[0]
    const line = fitLineForRow(row, strategy.label)

    expect(line).toBe(UNSCORED_BANNER)
    expect(line).not.toContain('✕')
    expect(line).not.toContain('fails')
  })
})
