import { describe, it, expect } from 'vitest'

import { colorForRow, fillOpacityFor, lensByKey } from '../mapConfig.js'

describe('map purchase-mode caution colours', () => {
  const overall = lensByKey('overall')

  it('keeps viable suburbs on the normal fit ramp', () => {
    expect(colorForRow({ status: 'ok', weighted: 82 }, overall)).toBe('#1A9850')
    expect(colorForRow({ status: 'ok', weighted: 56 }, overall)).toBe('#FC8D59')
  })

  it('uses warm colours for conditional and rejected suburbs', () => {
    expect(colorForRow({ status: 'conditional', weighted: 81 }, overall)).toBe('#FEE08B')
    expect(colorForRow({ status: 'conditional', weighted: 68 }, overall)).toBe('#FDAE61')
    expect(colorForRow({ status: 'reject', weighted: 63 }, overall)).toBe('#F46D43')
    expect(colorForRow({ status: 'reject', weighted: 42 }, overall)).toBe('#D73027')
  })

  it('keeps gated suburbs visible enough for the caution fill to read', () => {
    expect(fillOpacityFor({ placeholder: false }, 'ok')).toBe(0.3)
    expect(fillOpacityFor({ placeholder: false }, 'conditional')).toBeGreaterThan(0.25)
    expect(fillOpacityFor({ placeholder: false }, 'reject')).toBeGreaterThan(0.2)
  })
})
