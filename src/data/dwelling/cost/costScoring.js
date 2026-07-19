// Pure suburb-level affordability scoring shared by the generated-data
// pipeline and the live strategy engine. Cost is intentionally monotonic:
// within the same strategy, a lower median can never receive a worse score.
// Market depth belongs in evidence/availability, not in the Cost criterion.

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
