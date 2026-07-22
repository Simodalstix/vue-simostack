// Pure suburb-level affordability scoring. Cost is intentionally monotonic:
// within the same product cohort, a lower median can never receive a worse
// score. Market depth belongs in evidence/availability, not in the Cost
// criterion.
//
// The LIVE Cost criterion uses `relativeCostScore` (cohort-relative: cheapest
// same-product suburb is greenest, dearest is reddest). `affordabilityScore`
// is the older absolute-vs-cap curve, kept for the generated-data pipeline's
// `defaultAffordabilityScore` field and reference; it no longer drives the
// ranking. There is no price cap in the live engine any more.

import { DWELLING_COST_BY_ID } from './dwelling-cost-context.ts'

const AFFORDABILITY_KNOTS = [
  [0, 10],
  [0.55, 10],
  [0.65, 8],
  [0.75, 5],
  [0.85, 2],
  [1, 0],
]

export function affordabilityScore(medianPrice, maxPrice = 900000) {
  if (!Number.isFinite(medianPrice) || !Number.isFinite(maxPrice) || maxPrice <= 0) return null
  const ratio = medianPrice / maxPrice
  if (ratio <= AFFORDABILITY_KNOTS[0][0]) return AFFORDABILITY_KNOTS[0][1]
  for (let index = 1; index < AFFORDABILITY_KNOTS.length; index += 1) {
    const [rightRatio, rightScore] = AFFORDABILITY_KNOTS[index]
    const [leftRatio, leftScore] = AFFORDABILITY_KNOTS[index - 1]
    if (ratio <= rightRatio) {
      const progress = (ratio - leftRatio) / (rightRatio - leftRatio)
      return leftScore + progress * (rightScore - leftScore)
    }
  }
  return 0
}

export function liquidityScore(salesPerYear) {
  if (!Number.isFinite(salesPerYear) || salesPerYear < 0) return null
  return Math.min(10, (10 * Math.log1p(salesPerYear)) / Math.log1p(120))
}

export function costScoreFor(medianPrice, maxPrice = 900000) {
  return affordabilityScore(medianPrice, maxPrice)
}

// ---- Cohort-relative cost (the live Cost criterion) ------------------------
//
// Every suburb carries both a VGV house median and a VGV unit median, so a
// strategy scores all suburbs on the SAME product (houses vs houses, units vs
// units). Within that cohort the cheapest suburb scores 10 (greenest), the
// dearest 0 (reddest), with average ranks for ties. This is a "cheaper than
// that suburb" comparison, not an absolute budget test — there is no cap.

function cohortMedians(propertyType) {
  const out = []
  for (const record of Object.values(DWELLING_COST_BY_ID)) {
    const median = record?.prices?.[propertyType]?.all?.medianPrice
    if (Number.isFinite(median)) out.push(median)
  }
  return out.sort((a, b) => a - b)
}

// Built once from the static generated dataset; recomputed on a miss so an
// unexpected propertyType still resolves.
const COHORTS = { house: cohortMedians('house'), unit: cohortMedians('unit') }

export function relativeCostScore(medianPrice, propertyType = 'unit') {
  if (!Number.isFinite(medianPrice)) return null
  const cohort = COHORTS[propertyType] || cohortMedians(propertyType)
  const n = cohort.length
  if (!n) return null
  if (n === 1) return 10
  let below = 0
  let atOrBelow = 0
  for (const value of cohort) {
    if (value < medianPrice) below += 1
    if (value <= medianPrice) atOrBelow += 1
  }
  const averageRank = (below + atOrBelow - 1) / 2 // 0 = cheapest, n-1 = dearest
  const percentile = averageRank / (n - 1)
  return Math.max(0, Math.min(10, (1 - percentile) * 10))
}
