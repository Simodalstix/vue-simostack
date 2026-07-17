// Pure suburb-level cost scoring shared by the generated-data pipeline and
// the live strategy engine. This measures suitable stock near the active cap,
// not "cheapest suburb wins"; an implausibly low median therefore receives
// diminishing credit rather than an automatic maximum.

const HEADROOM_KNOTS = [
  [0, 4],
  [0.5, 7],
  [0.7, 10],
  [0.8, 10],
  [1, 6],
  [1.15, 0],
]

export function headroomScore(medianPrice, maxPrice = 900000) {
  if (!Number.isFinite(medianPrice) || !Number.isFinite(maxPrice) || maxPrice <= 0) return null
  const ratio = medianPrice / maxPrice
  if (ratio <= HEADROOM_KNOTS[0][0]) return HEADROOM_KNOTS[0][1]
  for (let index = 1; index < HEADROOM_KNOTS.length; index += 1) {
    const [rightRatio, rightScore] = HEADROOM_KNOTS[index]
    const [leftRatio, leftScore] = HEADROOM_KNOTS[index - 1]
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

export function costScoreFor(medianPrice, salesPerYear, maxPrice = 900000) {
  const headroom = headroomScore(medianPrice, maxPrice)
  const liquidity = liquidityScore(salesPerYear)
  if (headroom == null && liquidity == null) return null
  if (liquidity == null) return headroom
  if (headroom == null) return liquidity
  return 0.7 * headroom + 0.3 * liquidity
}
