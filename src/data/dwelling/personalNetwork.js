// Personal-network access for the Decide score. The anchor is the public,
// suburb-level approximate South Yarra point described in personalAnchors.js;
// exact coordinates are never used because these bands are deliberately
// insensitive to sub-suburb precision. Estimates use the best realistic
// non-car journey in typical conditions as at July 2026, after the Metro
// Tunnel opening. They are owner judgment pending PTV verification of the
// low-confidence rows. The score is bonus-only: proximity contributes, while
// a distant anchor is not assessed because commute already captures distance.

export const PERSONAL_NETWORK_DATASET = {
  anchor: 'South Yarra (suburb-level approximate, see personalAnchors.js)',
  method: 'Best realistic non-car journey, typical conditions, banded score',
  bands: '<=10min:10, <=20:8, <=30:6, >30:not assessed',
  asAt: 'July 2026 (post Metro Tunnel opening)',
}

export function pnScore(estMin) {
  if (estMin == null) return null
  if (estMin <= 10) return 10
  if (estMin <= 20) return 8
  if (estMin <= 30) return 6
  return null
}

export const personalNetworkByAreaId = {
  'inner-south-yarra-2br': {
    estMin: 5,
    mode: 'walk',
    confidence: 'high',
    rationale: 'Same suburb.',
  },
  'inner-windsor-prahran-2br': {
    estMin: 10,
    mode: 'walk/train',
    confidence: 'high',
    rationale: 'One Sandringham stop or a flat 1.5km walk.',
  },
  'toorak-2br': {
    estMin: 13,
    mode: 'tram/walk',
    confidence: 'high',
    rationale: 'Tram 58 or a Toorak Rd walk.',
  },
  'burnley-2br': {
    estMin: 18,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Burnley to Richmond, one-stop change; cycling quicker.',
  },
  'inner-richmond-2br': {
    estMin: 12,
    mode: 'train',
    confidence: 'high',
    rationale: 'Richmond to South Yarra is one stop.',
  },
  'cremorne-2br': {
    estMin: 15,
    mode: 'walk/train',
    confidence: 'high',
    rationale: 'Church St bridge walk or East Richmond hop.',
  },
  'armadale-2br': {
    estMin: 8,
    mode: 'train',
    confidence: 'high',
    rationale: 'Two Frankston-line stops.',
  },
  'st-kilda-2br': {
    estMin: 22,
    mode: 'tram',
    confidence: 'medium',
    rationale: 'Route 78/16 into Chapel St; no rail.',
  },
  'balaclava-2br': {
    estMin: 8,
    mode: 'train',
    confidence: 'high',
    rationale: 'Three Sandringham-line stops.',
  },
  'elwood-2br': {
    estMin: 26,
    mode: 'tram+train',
    confidence: 'medium',
    rationale: 'Tram 67 to Balaclava then rail; no station.',
  },
  'middle-park-2br': {
    estMin: 28,
    mode: 'tram',
    confidence: 'medium',
    rationale: 'Light rail plus 12 tram, cross-grain.',
  },
  'hawthorn-2br': {
    estMin: 22,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Change at Richmond.',
  },
  'south-melbourne-2br': {
    estMin: 25,
    mode: 'tram',
    confidence: 'medium',
    rationale: 'Route 12 across St Kilda Rd; cross-grain despite short distance.',
  },
  'albert-park-2br': {
    estMin: 28,
    mode: 'tram',
    confidence: 'medium',
    rationale: 'Two trams or one plus a walk; short but slow.',
  },
  'malvern-2br': {
    estMin: 10,
    mode: 'train',
    confidence: 'high',
    rationale: 'Frankston line direct.',
  },
  'inner-collingwood-2br': {
    estMin: 28,
    mode: 'tram/train',
    confidence: 'medium',
    rationale: '78 tram runs Chapel St into South Yarra.',
  },
  'inner-abbotsford-2br': {
    estMin: 28,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Victoria Park to Richmond, change once.',
  },
  'kew-2br': {
    estMin: 35,
    mode: 'tram+train',
    confidence: 'low',
    rationale: 'No station; tram to Hawthorn then rail with a change.',
  },
  'clifton-hill-2br': {
    estMin: 28,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'One change at Richmond/Jolimont.',
  },
  'north-melbourne-2br': {
    estMin: 32,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Loop to Flinders St then Sandringham line.',
  },
  'inner-se-apartment-corridor': {
    estMin: 30,
    mode: 'train+walk',
    confidence: 'medium',
    rationale: 'Metro Tunnel to Anzac then walk; Pakenham trains no longer stop at South Yarra.',
  },
  'inner-lowcar-benchmark': {
    estMin: 35,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Kensington to Flinders St, change to Sandringham line.',
  },
  'northcote-2br': {
    estMin: 33,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Mernda line, change at Jolimont/Richmond.',
  },
  'balwyn-2br': {
    estMin: 40,
    mode: 'tram+transfer',
    confidence: 'low',
    rationale: 'Tram 109 then rail; slow cross-grain.',
  },
  'mckinnon-villa': {
    estMin: 16,
    mode: 'train',
    confidence: 'high',
    rationale: 'Frankston line direct.',
  },
  'upfield-corridor': {
    estMin: 38,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Upfield line to the loop, change at Flinders St.',
  },
  'thornbury-2br': {
    estMin: 36,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Mernda line, one change.',
  },
  'footscray-station-2br': {
    estMin: 26,
    mode: 'train+walk',
    confidence: 'medium',
    rationale: 'Metro Tunnel one seat to Anzac, then the western walk.',
  },
  'yarraville-2br': {
    estMin: 35,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Werribee line to Flinders St, change to Sandringham.',
  },
  'ascot-vale-2br': {
    estMin: 35,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Craigieburn line, change at Flinders St.',
  },
  'spotswood-2br': {
    estMin: 38,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Werribee line, one change.',
  },
  'seddon-westfootscray-villa': {
    estMin: 32,
    mode: 'train+walk',
    confidence: 'medium',
    rationale: 'Hop to Footscray, tunnel to Anzac.',
  },
  'balwyn-north-2br': {
    estMin: 45,
    mode: 'tram+transfer',
    confidence: 'low',
    rationale: 'Tram 48 then rail; slowest inner-east grain.',
  },
  'doncaster-villa': {
    estMin: 48,
    mode: 'bus+train',
    confidence: 'low',
    rationale: 'DART to the city then rail out; no direct line.',
  },
  'box-hill-2br': {
    estMin: 35,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Lilydale group to Richmond, change once.',
  },
  'frankston-middle-ring': {
    estMin: 30,
    mode: 'train',
    confidence: 'medium',
    rationale: 'Frankston line direct.',
  },
  'preston-villa': {
    estMin: 40,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Mernda line, one change.',
  },
  'northwest-villa-corridor': {
    estMin: 45,
    mode: 'train+transfer',
    confidence: 'low',
    rationale: 'Craigieburn line plus a change.',
  },
  'northern-rail-value': {
    estMin: 45,
    mode: 'train+transfer',
    confidence: 'low',
    rationale: 'Mernda line from Reservoir, one change.',
  },
  'glen-waverley-2br': {
    estMin: 42,
    mode: 'train+transfer',
    confidence: 'medium',
    rationale: 'Glen Waverley line to Richmond, change once.',
  },
  'sunshine-station-2br': {
    estMin: 34,
    mode: 'train+walk',
    confidence: 'medium',
    rationale: 'Metro Tunnel one seat to Anzac.',
  },
  'mentone-2br': {
    estMin: 28,
    mode: 'train',
    confidence: 'medium',
    rationale: 'Frankston line direct.',
  },
  'se-value-corridor': {
    estMin: 42,
    mode: 'train+walk',
    confidence: 'medium',
    rationale: 'Tunnel corridor to Anzac; long ride.',
  },
  'established-western-value': {
    estMin: 42,
    mode: 'train+walk',
    confidence: 'medium',
    rationale: 'St Albans via the tunnel to Anzac.',
  },
  'chelsea-2br': {
    estMin: 40,
    mode: 'train',
    confidence: 'medium',
    rationale: 'Frankston line direct but long.',
  },
  'bonbeach-2br': {
    estMin: 42,
    mode: 'train',
    confidence: 'medium',
    rationale: 'Frankston line direct but long.',
  },
  'growth-corridor-stress-test': {
    estMin: 60,
    mode: 'train+transfer',
    confidence: 'low',
    rationale: 'V/Line plus suburban change.',
  },
  'craigieburn-townhouse': {
    estMin: 55,
    mode: 'train+transfer',
    confidence: 'low',
    rationale: 'Full-length Craigieburn line plus a change.',
  },
  'donnybrook-house-land': {
    estMin: 65,
    mode: 'train+transfer',
    confidence: 'low',
    rationale: 'V/Line frequency-dependent.',
  },
  'sunbury-house': {
    estMin: 58,
    mode: 'train+walk',
    confidence: 'low',
    rationale: 'Sunbury line via the tunnel to Anzac; long.',
  },
}
