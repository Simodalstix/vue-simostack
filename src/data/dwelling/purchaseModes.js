// src/data/dwelling/purchaseModes.js
//
// Purchase modes: WHAT KIND OF PURCHASE is being tested against the suburbs.
// Deliberately separate from the criteria weights (which are personal
// priorities and are never rewritten by a mode change).
//
// A mode expresses its proposition through the SAME filter gates the ranking
// already runs (dwelling types, minimum bedrooms, price cap), so any change
// in suburb viability is explainable through stock, dwelling type and price
// assumptions rather than an arbitrary recolouring. A suburb that fails a
// mode is rejected by a named gate, not dimmed by fiat.
//
// Each mode links to the existing strategy record (strategies.js) that argues
// its case in full; the big strategy cards remain the detailed explanation.
//
// priceNote flags where the recorded per-suburb bands do not directly price
// the mode's dwelling (1BR and land/build cases) so the pane can say so
// instead of pretending precision.

export const purchaseModes = [
  {
    id: 'balanced-2br',
    label: 'Balanced inner 2BR',
    short: '2BR balance',
    strategyId: 'apartment-transport',
    dwelling: 'Older 2BR apartment or villa unit',
    bedrooms: 2,
    filters: {
      minBedrooms: 2,
      dwellingTypes: [],
      maxPrice: 900000,
    },
    blurb:
      'The default test: a two-bedroom apartment or villa unit balancing commute, Lulu and cost.',
    priceNote: null,
  },
  {
    id: 'space-first-house',
    label: 'Space-first outer house',
    short: 'Outer house',
    strategyId: 'outer-rail',
    dwelling: '3BR house or townhouse on a real block',
    bedrooms: 3,
    filters: {
      minBedrooms: 3,
      dwellingTypes: ['house', 'townhouse'],
      maxPrice: 750000,
    },
    blurb:
      'Trades commute minutes for a whole house. Only suburbs with recorded house or townhouse stock stay viable.',
    priceNote: null,
  },
  {
    id: 'solo-1br',
    label: 'Solo minimum-cost 1BR',
    short: 'Solo 1BR',
    strategyId: 'lowest-cost',
    dwelling: 'Older 1BR walk-up, minimum viable ownership',
    bedrooms: 1,
    filters: {
      minBedrooms: 1,
      dwellingTypes: ['older-apartment'],
      maxPrice: 550000,
    },
    blurb:
      'The cheapest honest ownership test. Suburb bands are 2BR references; 1BR entry usually sits below them.',
    priceNote:
      '1BR stock is not separately priced per suburb yet; viability is tested against the recorded 2BR entry band as a conservative ceiling.',
  },
  {
    id: 'family-3br',
    label: 'Family-together 3BR',
    short: 'Family 3BR',
    strategyId: 'co-parenting',
    dwelling: '3BR house, townhouse or large villa unit',
    bedrooms: 3,
    filters: {
      minBedrooms: 3,
      dwellingTypes: ['house', 'townhouse', 'villa-unit'],
      maxPrice: 900000,
    },
    blurb:
      'Tests the larger-household case: three real bedrooms with family logistics leading the trade-offs.',
    priceNote: null,
  },
  {
    id: 'land-build',
    label: 'Land/build experiment',
    short: 'Land/build',
    strategyId: 'unconventional-build',
    dwelling: 'Land with a modest new build or small-lot house',
    bedrooms: 3,
    filters: {
      minBedrooms: 3,
      dwellingTypes: ['house'],
      maxPrice: 700000,
    },
    blurb:
      'The experiment case: land plus a modest build on the fringe. Few suburbs carry matching stock, by design.',
    priceNote:
      'Recorded bands price established stock, not land-plus-build packages; treat viability here as a corridor hint only.',
  },
]

export const defaultModeId = 'balanced-2br'

export function modeById(id) {
  return purchaseModes.find((m) => m.id === id) || purchaseModes[0]
}
