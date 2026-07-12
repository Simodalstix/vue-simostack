// src/data/dwelling/areaWeights.js
//
// Location-specific weighting for the Areas atlas. Distinct from framework.js
// criteria (which rank dwelling STRATEGIES); these rank PLACES. Weights sum to
// 100 so a weighted score reads as a percentage of the ideal.
//
// key maps 1:1 to areaCorridors[].scores. Each raw score is 1-5.
//
// IMPORTANT: the `community` weight funds measurable AMENITY (grocers, markets,
// language services, everyday cultural infrastructure), never demographic
// desirability. Ancestry, birthplace and language composition are contextual
// only and are never fed into any score. See CommunityProfile.vue.

export const areaWeights = [
  {
    key: 'commute',
    label: 'Collins St commute',
    weight: 18,
    hint: 'Door-to-door to 555 Collins St (Southern Cross end), with transfer and reliability penalties.',
  },
  {
    key: 'housingValue',
    label: 'Suitable housing cost & availability',
    weight: 16,
    hint: 'Is there real 2BR stock in the catchment at a price the brief can carry, not just a low headline median.',
  },
  {
    key: 'coparenting',
    label: 'Co-parenting practicality',
    weight: 12,
    hint: 'Room for Lulu, school access, and manageable travel to the other parent.',
  },
  {
    key: 'lowCar',
    label: 'Low-car daily life',
    weight: 12,
    hint: 'Can daily needs be met without a compulsory car.',
  },
  {
    key: 'recurringCosts',
    label: 'Total annual transport cost',
    weight: 10,
    hint: 'Myki, occasional car or car-share, against the payoff goal.',
  },
  {
    key: 'walkability',
    label: 'Walkable services & amenities',
    weight: 8,
    hint: 'Supermarkets, health, parks and everyday needs on foot.',
  },
  {
    key: 'safety',
    label: 'Safety',
    weight: 6,
    hint: 'Measured offence rates and street conditions, not perception. Pending Vic CSA data.',
  },
  {
    key: 'envRisk',
    label: 'Environmental & planning risk',
    weight: 6,
    hint: 'Flood, bushfire, contamination, freight and reservation exposure. Pending VicPlan review.',
  },
  {
    key: 'privacyWfh',
    label: 'Private / WFH-compatible layouts',
    weight: 5,
    hint: 'Acoustic separation and a secure work area with reliable internet.',
  },
  {
    key: 'resale',
    label: 'Resale & financeability',
    weight: 4,
    hint: 'Exit liquidity and mainstream lender treatment. Not growth-weighted.',
  },
  {
    key: 'community',
    label: 'Community & cultural amenities',
    weight: 3,
    hint: 'Grocers, markets, restaurants and language services. Amenity only, never demographic desirability.',
  },
]

export const areaWeightTotal = areaWeights.reduce((a, c) => a + c.weight, 0)
