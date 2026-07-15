export const FIT_BAND_TOKENS = {
  sTier: '#2C79C7',
  darkGreen: '#23733E',
  strongGreen: '#32964D',
  midGreen: '#57B25C',
  yellowGreen: '#8FBE4B',
  amber: '#D4A13A',
  orange: '#DA7435',
  red: '#C54A42',
  unscored: '#7A8A99',
}

export const FIT_BANDS = [
  {
    key: 's-tier',
    label: 'S tier',
    minScore: 90,
    colourToken: 'sTier',
    rangeLabel: '90+',
    ariaLabel: 'S tier fit',
  },
  {
    key: 'dark-green',
    label: 'Dark green',
    minScore: 85,
    colourToken: 'darkGreen',
    rangeLabel: '85-89',
    ariaLabel: 'Dark green fit',
  },
  {
    key: 'strong-green',
    label: 'Strong green',
    minScore: 80,
    colourToken: 'strongGreen',
    rangeLabel: '80-84',
    ariaLabel: 'Strong green fit',
  },
  {
    key: 'mid-green',
    label: 'Mid green',
    minScore: 75,
    colourToken: 'midGreen',
    rangeLabel: '75-79',
    ariaLabel: 'Mid green fit',
  },
  {
    key: 'yellow-green',
    label: 'Yellow-green',
    minScore: 71,
    colourToken: 'yellowGreen',
    rangeLabel: '71-74',
    ariaLabel: 'Yellow-green fit',
  },
  {
    key: 'amber',
    label: 'Amber',
    minScore: 61,
    colourToken: 'amber',
    rangeLabel: '61-70',
    ariaLabel: 'Amber fit',
  },
  {
    key: 'orange',
    label: 'Orange',
    minScore: 51,
    colourToken: 'orange',
    rangeLabel: '51-60',
    ariaLabel: 'Orange fit',
  },
  {
    key: 'red',
    label: 'Red',
    minScore: 0,
    colourToken: 'red',
    rangeLabel: '0-50',
    ariaLabel: 'Red fit',
  },
]

export const UNSCORED_FIT_BAND = {
  key: 'unscored',
  label: 'Not scored',
  minScore: -Infinity,
  colourToken: 'unscored',
  rangeLabel: 'n/a',
  ariaLabel: 'Not scored',
}

export function getFitBand(score) {
  if (!Number.isFinite(score)) return UNSCORED_FIT_BAND
  return FIT_BANDS.find((band) => score >= band.minScore) || FIT_BANDS[FIT_BANDS.length - 1]
}

export function fitBandColor(input) {
  const band = typeof input === 'object' && input?.colourToken ? input : getFitBand(input)
  return FIT_BAND_TOKENS[band.colourToken] || FIT_BAND_TOKENS.unscored
}

export function fitBandBadgeFill(score, alpha = 0.14) {
  const hex = fitBandColor(score).replace('#', '')
  if (hex.length !== 6) return fitBandColor(score)
  const [r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((v) =>
    Number.parseInt(v, 16),
  )
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function fitBandLegend() {
  return FIT_BANDS.map((band) => ({
    ...band,
    color: fitBandColor(band),
    label: `${band.label}: ${band.rangeLabel}`,
  }))
}
