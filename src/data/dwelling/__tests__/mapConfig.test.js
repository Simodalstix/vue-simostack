import { describe, it, expect } from 'vitest'

import { colorForRow, fillOpacityFor } from '../mapConfig.js'
import { fitBandColor, getFitBand } from '../fitBands.js'

const FIT_BAND_BOUNDARIES = [
  [50, 'red'],
  [51, 'orange'],
  [60, 'orange'],
  [61, 'amber'],
  [70, 'amber'],
  [71, 'yellow-green'],
  [74, 'yellow-green'],
  [75, 'mid-green'],
  [79, 'mid-green'],
  [80, 'strong-green'],
  [84, 'strong-green'],
  [85, 'dark-green'],
  [89, 'dark-green'],
  [90, 's-tier'],
  [100, 's-tier'],
]

describe('fit band thresholds', () => {
  it.each(FIT_BAND_BOUNDARIES)(
    'assigns %s to the %s band',
    (score, expectedKey) => {
      expect(getFitBand(score).key).toBe(expectedKey)
    },
  )
})

describe('shared fit colours', () => {
  it('keeps map fills on the same fit-band helper regardless of strategy gate status', () => {
    expect(colorForRow({ status: 'ok', weighted: 82 })).toBe(fitBandColor(82))
    expect(colorForRow({ status: 'conditional', weighted: 68 })).toBe(fitBandColor(68))
    expect(colorForRow({ status: 'reject', weighted: 42 })).toBe(fitBandColor(42))
  })

  it('keeps gated suburbs visible enough for the fill to read', () => {
    expect(fillOpacityFor({ placeholder: false }, 'ok')).toBe(0.55)
    expect(fillOpacityFor({ placeholder: false }, 'conditional')).toBeGreaterThan(0.45)
    expect(fillOpacityFor({ placeholder: false }, 'reject')).toBeGreaterThan(0.4)
  })
})
