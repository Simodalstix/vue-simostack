// src/data/dwelling/decideStrategies.js
//
// The Settle workspace's single control model: a STRATEGY is a weighting preset
// plus the purchase proposition (dwelling type, bedrooms, price cap) it
// tests. Selecting a strategy loads its weight vector over the ten suburb
// criteria; each criterion is then a binary toggle: on (preset weight) or
// off (weight 0). Standard criteria renormalise over the enabled weights;
// explicitly additive criteria such as Beach and Friends apply a small bounded premium
// outside the mean, so enabling a bonus can never lower a suburb.
//
// This supersedes the old purchase modes + criteria sliders + lens buttons
// (all removed July 2026). Strategies are now pure SCORING LENSES: a weight
// preset plus which median Cost reads (house vs unit). The price-cap and
// dwelling/commute REJECT gates were removed (July 2026) so every suburb is
// scored and coloured — the owner judges affordability, the tool does not hide
// suburbs. Only the Soul veto still gates.

// ---- criteria -------------------------------------------------------------
//
// Ten criteria, each scored 0-10 per suburb, derived from the existing
// record data (nothing new is fabricated here). `value(rec, commuteScore)`
// returns 0-10 or null when the record carries no data for it; a null is
// omitted rather than scored as zero. `scoringMode: 'additiveBonus'` keeps a
// criterion outside the standard weighted-mean denominator.
import { zonedSchoolEvidenceForArea } from './schools/schoolStrength.js'
import { personalNetworkByAreaId } from './personalNetwork.js'
import { beachAccessByAreaId, beachScore } from './beachAccess.js'
import { girlsSportFor, sportAccessScore } from './girlsSport.js'
import { chineseCommunityScore } from './chineseCommunity.js'
import { otherCommunitiesScore } from './languageCommunities.js'
import { relativeScoreFor } from './relativeScoring.js'
import { relativeCostScore } from './cost/costScoring.js'
import { costMetricForArea } from './cost/costContext.js'
import { safetyScoreFor } from './safety/safetyContext.js'

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
    hint: 'Relative affordability: the cheapest suburb for the chosen product scores best, the dearest worst. No price cap.',
    accent: 'blue',
    value: (rec, _commuteScore, context = {}) => {
      const metric = costMetricForArea(rec.id, context.strategy)
      if (!metric?.medianPrice) return tenScale(rec.scores?.housingValue)
      return relativeCostScore(metric.medianPrice, metric.propertyType)
    },
  },
  {
    key: 'commute',
    label: 'Commute',
    hint: 'Door-to-door to 555 Collins St, transfer-penalised.',
    accent: 'blue',
    value: (rec, commuteScore) => tenScale(commuteScore),
  },
  {
    key: 'safety',
    label: 'Safety',
    hint: 'Optional CSA recorded-offence context. 10 means lower relative recorded-offence risk; enable it for a risk-aware comparison.',
    defaultEnabled: false,
    accent: 'teal',
    value: (rec) => safetyScoreFor(rec.id),
  },
  {
    key: 'schools',
    label: 'Schools',
    hint: 'Zoned public school strength.',
    accent: 'purple',
    value: (rec) => tenScale(zonedSchoolStrength(rec) ?? rec.childhood?.schoolStrength),
  },
  {
    key: 'kidAmenity',
    label: 'Recreation',
    hint: 'Usable sport, leisure, playground and other recreational amenity: teen independence blended equally with girls’ sport access where researched. Childcare is separate and not included.',
    accent: 'purple',
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
    key: 'personalNetwork',
    label: 'Friends',
    hint: 'Additive premium for practical access to the inner-circle anchor in South Yarra. Distant or unassessed records receive no bonus and are never penalised.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    accent: 'amber',
    value: (rec) => personalNetworkByAreaId[rec.id]?.score ?? null,
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
    key: 'otherCommunities',
    label: 'International',
    hint: 'One optional personal bonus for Filipino/Tagalog, Thai, Spanish/Portuguese or Vietnamese language presence. Uses the strongest available source-backed measure so several communities cannot stack several bonuses. Off by default.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    defaultEnabled: false,
    accent: 'pink',
    value: (rec) => otherCommunitiesScore(rec.id),
  },
  {
    key: 'partnerPool',
    label: 'Mingle',
    hint: 'Playful name, honest measure: the pure cohort percentile of the ABS 2021 Census share of adults aged 25–54 who were not in a registered or de facto marriage. It does not infer availability, orientation or interest; nulls remain unassessed.',
    scoringMode: 'additiveBonus',
    bonusPointsPerWeight: 2,
    accent: 'pink',
    value: (rec) => relativeScoreFor('partnerPool', rec.id),
  },
]

export const decideCriterionByKey = Object.fromEntries(decideCriteria.map((c) => [c.key, c]))

// ---- strategies -----------------------------------------------------------
//
// The two strategies match the two VGV product medians available to the app:
// all-unit (Apartment) and all-house (House). They never claim a bedroom-level
// price distinction that the source data cannot support. Weights are relative
// multipliers per criterion (0 = off); the House lens deliberately pushes Cost
// to 6 so price dominates its map.
export const decideStrategies = [
  {
    id: 'apartment',
    label: 'Apartment',
    shortLabel: 'Apartment',
    dwelling: 'Apartment',
    pricePropertyType: 'unit',
    intent: 'commute, cost and Lulu in balance',
    weights: {
      cost: 2,
      commute: 2,
      safety: 1,
      schools: 2,
      kidAmenity: 2,
      beach: 2,
      personalNetwork: 2,
      chineseCommunity: 2,
      otherCommunities: 2,
      partnerPool: 2,
    },
  },
  {
    id: 'house',
    label: 'House',
    shortLabel: 'House',
    dwelling: 'House',
    pricePropertyType: 'house',
    intent: 'house value first: cheap house medians lead, commute still counts',
    // Cost is deliberately dominant here (6 of 10 standard weight = 60%), so
    // the map repaints by house price — expensive inner suburbs read red,
    // cheaper outer suburbs green — while commute still pulls as a real factor.
    weights: {
      cost: 6,
      commute: 2,
      safety: 1,
      schools: 1,
      kidAmenity: 1,
      beach: 2,
      personalNetwork: 1,
      chineseCommunity: 2,
      otherCommunities: 2,
      partnerPool: 2,
    },
  },
]

export const defaultStrategyId = 'apartment'

export function strategyById(id) {
  return decideStrategies.find((s) => s.id === id) || decideStrategies[0]
}
