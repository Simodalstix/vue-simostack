// Bonus-only beach access for the Settle score. Estimates are deliberately
// broad owner-judgment bands for the best realistic walk or short flat cycle
// to a swimmable foreshore; every seeded row remains a placeholder pending
// owner review. Suburbs outside the plausible coastal set are absent rather
// than assigned a zero.

export const BEACH_ACCESS_DATASET = {
  method: 'Best realistic walk or short flat cycle to a swimmable foreshore',
  bands: '<=12min:10, <=25:7, <=40:4, >40:not assessed',
  asAt: 'July 2026',
}

export function beachScore(estMin) {
  if (estMin == null) return null
  if (estMin <= 12) return 10
  if (estMin <= 25) return 7
  if (estMin <= 40) return 4
  return null
}

export const beachAccessByAreaId = {
  'middle-park-2br': {
    estMin: 8,
    mode: 'walk',
    confidence: 'medium',
    placeholder: true,
    rationale: 'Middle Park Beach is an easy neighbourhood walk.',
  },
  'albert-park-2br': {
    estMin: 12,
    mode: 'walk',
    confidence: 'medium',
    placeholder: true,
    rationale: 'Albert Park Beach is walkable from the suburb catchment.',
  },
  'st-kilda-2br': {
    estMin: 8,
    mode: 'walk',
    confidence: 'medium',
    placeholder: true,
    rationale: 'St Kilda foreshore is part of everyday neighbourhood access.',
  },
  'balaclava-2br': {
    estMin: 20,
    mode: 'walk',
    confidence: 'low',
    placeholder: true,
    rationale: 'St Kilda foreshore is a casual but meaningful walk west.',
  },
  'elwood-2br': {
    estMin: 8,
    mode: 'walk',
    confidence: 'medium',
    placeholder: true,
    rationale: 'Elwood Beach is readily walkable within the suburb.',
  },
  'chelsea-2br': {
    estMin: 8,
    mode: 'walk',
    confidence: 'medium',
    placeholder: true,
    rationale: 'Chelsea Beach is close to the station-centred catchment.',
  },
  'bonbeach-2br': {
    estMin: 8,
    mode: 'walk',
    confidence: 'medium',
    placeholder: true,
    rationale: 'Bonbeach foreshore is close to the station-centred catchment.',
  },
  'mentone-2br': {
    estMin: 20,
    mode: 'walk',
    confidence: 'low',
    placeholder: true,
    rationale: 'Mentone Beach is reachable on foot from the rail catchment.',
  },
  'south-melbourne-2br': {
    estMin: 25,
    mode: 'walk',
    confidence: 'low',
    placeholder: true,
    rationale: 'Port Melbourne foreshore is reachable but not immediately local.',
  },
  'frankston-middle-ring': {
    estMin: 12,
    mode: 'walk',
    confidence: 'low',
    placeholder: true,
    rationale: 'Frankston foreshore is walkable from the central station catchment.',
  },
  'spotswood-2br': {
    estMin: 35,
    mode: 'cycle',
    confidence: 'low',
    placeholder: true,
    rationale: 'Williamstown foreshore is cycle-reachable, not a local beach walk.',
  },
}
