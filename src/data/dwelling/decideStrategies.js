// src/data/dwelling/decideStrategies.js
//
// The Decide page's single control model: a STRATEGY is a weighting preset
// plus the purchase proposition (dwelling type, bedrooms, price cap) it
// tests. Selecting a strategy loads its weight vector over the twelve suburb
// criteria; each criterion is then a binary toggle: on (preset weight) or
// off (weight 0). Standard criteria renormalise over the enabled weights;
// explicitly additive criteria such as Beach apply a small bounded premium
// outside the mean, so enabling a bonus can never lower a suburb.
//
// This supersedes the old purchase modes + criteria sliders + lens buttons
// (all removed July 2026). Gates still run exactly as before: the strategy's
// filters feed the same reject/conditional machinery in useAreaRanking, and
// its dwelling/bedrooms drive the cost story the same way purchase modes did.

// ---- criteria -------------------------------------------------------------
//
// Twelve criteria, each scored 0-10 per suburb, derived from the existing
// record data (nothing new is fabricated here). `value(rec, commuteScore)`
// returns 0-10 or null when the record carries no data for it; a null is
// omitted rather than scored as zero. `scoringMode: 'additiveBonus'` keeps a
// criterion outside the standard weighted-mean denominator.
import { zonedSchoolEvidenceForArea } from './schools/schoolStrength.js'
import { personalNetworkByAreaId, pnScore } from './personalNetwork.js'
import { beachAccessByAreaId, beachScore } from './beachAccess.js'
import { girlsSportFor, sportAccessScore } from './girlsSport.js'
import { chineseCommunityScore } from './chineseCommunity.js'
import {
  filipinoCommunityScore,
  southAmericanCommunityScore,
  thaiCommunityScore,
} from './languageCommunities.js'
import { partnerPoolScore } from './partnerPool.js'
import { DWELLING_COST_BY_ID } from './cost/dwelling-cost-context.ts'
import { costScoreFor } from './cost/costScoring.js'

const tenScale = (v) => (v == null ? null : v * 2) // existing 1-5 scores -> 2-10

function zonedSchoolStrength(rec) {
  const context = zonedSchoolEvidenceForArea(rec.id)
  if (!context) return null
  const components = [
    { strength: context.secondary.evidence?.strength, weight: 0.6 },
    { strength: context.primary.evidence?.strength, weight: 0.4 },
  ].filter(({ strength }) => Number.isFinite(strength))
  if (!components.length) return null
  const totalWeight = components.reduce((sum, component) => sum + component.weight, 0)
  return (
    components.reduce((sum, component) => sum + component.strength * component.weight, 0) /
    totalWeight
  )
}

export const decideCriteria = [
  {
    key: 'cost',
    label: 'Cost',
    hint: 'Suitable stock at a price the brief can carry, not just a low median.',
    value: (rec, _commuteScore, context = {}) => {
      const generated = DWELLING_COST_BY_ID[rec.id]
      if (!generated?.medianPrice2br) return tenScale(rec.scores?.housingValue)
      return costScoreFor(
        generated.medianPrice2br,
        generated.salesPerYear,
        context.maxPrice ?? 900000,
      )
    },
  },
  {
    key: 'commute',
    label: 'Commute',
    hint: 'Door-to-door to 555 Collins St, transfer-penalised.',
    value: (rec, commuteScore) => tenScale(commuteScore),
  },
  {
    key: 'schools',
    label: 'Schools',
    hint: 'Zoned public school strength.',
    value: (rec) => tenScale(zonedSchoolStrength(rec) ?? rec.childhood?.schoolStrength),
  },
  {
    key: 'kidAmenity',
    label: 'Kid amenity',
    hint: 'How independently a 12-15yo can get around, blended equally with girls’ sport access where researched.',
    value: (rec) => {
      const teen = tenScale(rec.childhood?.teenIndependence)
      const sport = sportAccessScore(girlsSportFor(rec.id))
      if (teen == null && sport == null) return null
      if (sport == null) return teen
      if (teen == null) return sport
      return 0.5 * teen + 0.5 * sport
    },
  },
  {
    key: 'beach',
    label: 'Beach',
    hint: 'Additive premium for walkable access to a swimmable foreshore. Non-coastal suburbs receive no bonus and are never penalised.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    accent: 'amber',
    value: (rec) => beachScore(beachAccessByAreaId[rec.id]?.estMin ?? null),
  },
  {
    key: 'safetyQuality',
    label: 'Safety',
    hint: 'Measured offence rates and street conditions, not perception.',
    value: (rec) => tenScale(rec.scores?.safety),
  },
  {
    key: 'personalNetwork',
    label: 'Friends',
    hint: 'Practical non-car access to the inner-circle anchor in South Yarra; banded estimate at suburb level.',
    value: (rec) => pnScore(personalNetworkByAreaId[rec.id]?.estMin ?? null),
  },
  {
    key: 'chineseCommunity',
    label: 'Chinese',
    hint: 'Optional personal bonus from the combined ABS Census 2021 share using Cantonese or Mandarin at home. Off by default.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    defaultEnabled: false,
    accent: 'red',
    value: (rec) => chineseCommunityScore(rec.id),
  },
  {
    key: 'filipinoCommunity',
    label: 'Filipino',
    hint: 'Optional personal bonus from the combined ABS Census 2021 share using Filipino or Tagalog at home. Off by default.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    defaultEnabled: false,
    accent: 'pink',
    value: (rec) => filipinoCommunityScore(rec.id),
  },
  {
    key: 'thaiCommunity',
    label: 'Thai',
    hint: 'Optional personal bonus from the ABS Census 2021 share using Thai at home. Off by default.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    defaultEnabled: false,
    accent: 'pink',
    value: (rec) => thaiCommunityScore(rec.id),
  },
  {
    key: 'southAmericanCommunity',
    label: 'Sth American',
    hint: 'Optional personal bonus from the combined ABS Census 2021 share using Spanish or Portuguese at home. The census country list has no Colombia row, so language is the closest signal; Iberian speakers are included. Off by default.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    defaultEnabled: false,
    accent: 'pink',
    value: (rec) => southAmericanCommunityScore(rec.id),
  },
  {
    key: 'partnerPool',
    label: 'Partner pool',
    hint: '2021 Census; relative signal: suburb demographic profiles are sticky, absolute figures are dated. Refresh when the 2026 Census publishes (mid-2027).',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    value: (rec) => partnerPoolScore(rec.id),
  },
]

export const decideCriterionByKey = Object.fromEntries(decideCriteria.map((c) => [c.key, c]))

// ---- strategies -----------------------------------------------------------
//
// weights are 0-3 per criterion. filters feed the same gate fields the old
// purchase modes used (minBedrooms, dwellingTypes, maxPrice), so suburb
// viability stays explainable through named gates. priceNote flags where the
// recorded per-suburb bands do not directly price this dwelling.
export const decideStrategies = [
  {
    id: 'balanced2br',
    label: '2BR Balanced',
    shortLabel: '2 Bedroom',
    dwelling: 'Older 2BR apartment or villa unit',
    bedrooms: 2,
    intent: 'commute, cost and Lulu in balance',
    weights: {
      cost: 2,
      commute: 2,
      schools: 2,
      kidAmenity: 2,
      beach: 2,
      safetyQuality: 1,
      personalNetwork: 2,
      chineseCommunity: 2,
      filipinoCommunity: 2,
      thaiCommunity: 2,
      southAmericanCommunity: 2,
      partnerPool: 1,
    },
    filters: { minBedrooms: 2, dwellingTypes: [], maxPrice: 900000 },
    priceNote: null,
  },
  {
    id: 'bachelor1br',
    label: '1BR Bachelor',
    shortLabel: '1 Bedroom',
    dwelling: 'Older 1BR walk-up',
    bedrooms: 1,
    intent: 'cheapest honest ownership, commute first',
    weights: {
      cost: 2,
      commute: 3,
      schools: 1,
      kidAmenity: 1,
      beach: 1,
      safetyQuality: 1,
      personalNetwork: 2,
      chineseCommunity: 2,
      filipinoCommunity: 2,
      thaiCommunity: 2,
      southAmericanCommunity: 2,
      partnerPool: 1,
    },
    filters: { minBedrooms: 1, dwellingTypes: ['older-apartment'], maxPrice: 550000 },
    priceNote:
      '1BR stock is not separately priced per suburb yet; viability is tested against the recorded 2BR entry band as a conservative ceiling.',
  },
  {
    id: 'family3br',
    label: '3BR Family',
    shortLabel: '3 Bedroom',
    dwelling: '3BR house, townhouse or large villa unit',
    bedrooms: 3,
    intent: 'three real bedrooms with schools leading',
    weights: {
      cost: 3,
      commute: 2,
      schools: 3,
      kidAmenity: 3,
      beach: 2,
      safetyQuality: 2,
      personalNetwork: 3,
      chineseCommunity: 2,
      filipinoCommunity: 2,
      thaiCommunity: 2,
      southAmericanCommunity: 2,
      partnerPool: 1,
    },
    filters: {
      minBedrooms: 3,
      dwellingTypes: ['house', 'townhouse', 'villa-unit'],
      maxPrice: 900000,
    },
    priceNote: null,
  },
  {
    id: 'landBuild',
    label: 'Land Build',
    shortLabel: 'Land Build',
    dwelling: 'Land with a modest new build',
    bedrooms: 3,
    intent: 'cheap land and a modest build on the fringe',
    weights: {
      cost: 3,
      commute: 1,
      schools: 2,
      kidAmenity: 1,
      beach: 2,
      safetyQuality: 1,
      personalNetwork: 1,
      chineseCommunity: 2,
      filipinoCommunity: 2,
      thaiCommunity: 2,
      southAmericanCommunity: 2,
      partnerPool: 1,
    },
    filters: { minBedrooms: 3, dwellingTypes: ['house'], maxPrice: 700000 },
    priceNote:
      'Recorded bands price established stock, not land-plus-build packages; treat viability here as a corridor hint only.',
  },
  {
    id: 'villaTownhouse',
    label: 'Villa / Townhouse',
    shortLabel: 'Villa / Townhouse',
    dwelling: '2-3BR villa unit or townhouse',
    bedrooms: 2,
    intent: 'courtyard living with strong schools',
    weights: {
      cost: 2,
      commute: 2,
      schools: 3,
      kidAmenity: 2,
      beach: 2,
      safetyQuality: 2,
      personalNetwork: 3,
      chineseCommunity: 2,
      filipinoCommunity: 2,
      thaiCommunity: 2,
      southAmericanCommunity: 2,
      partnerPool: 1,
    },
    filters: { minBedrooms: 2, dwellingTypes: ['villa-unit', 'townhouse'], maxPrice: 800000 },
    priceNote: null,
  },
]

export const defaultStrategyId = 'balanced2br'

export function strategyById(id) {
  return decideStrategies.find((s) => s.id === id) || decideStrategies[0]
}
