import { DWELLING_COST_BY_ID } from './dwelling-cost-context.ts'

const PROPERTY_TYPE_LABELS = {
  house: 'house',
  unit: 'apartment',
}

// The strategy names which median Cost reads: 'house' or 'unit'. Every suburb
// carries both VGV medians, so a strategy scores all suburbs on the same
// product. There is no bedroom-specific median in the VGV data, so there is no
// "bedroom proxy" any more — a record simply reads the all-house or all-unit
// suburb median. If a suburb lacks the requested product, fall back to the
// other so it still scores.
export function costMetricForArea(areaId, strategy = null) {
  const record = DWELLING_COST_BY_ID[areaId]
  if (!record?.prices) return null

  const requested = strategy?.pricePropertyType || 'unit'
  const other = requested === 'house' ? 'unit' : 'house'
  const propertyType = record.prices[requested]?.all?.medianPrice != null ? requested : other
  const all = record.prices[propertyType]?.all
  if (!all?.medianPrice) return null
  return { ...all, propertyType }
}

export function formatCostMetric(metric, { compact = false, terse = false } = {}) {
  if (!metric?.medianPrice) return 'n/a'
  const price = `$${Math.round(metric.medianPrice / 1000)}k`
  if (compact) return price

  const dwelling = PROPERTY_TYPE_LABELS[metric.propertyType] || metric.propertyType
  const year = metric.evidence?.latestYear ? ` · ${metric.evidence.latestYear}` : ''
  if (terse) return `${price} ${dwelling} median${year}`

  const market = metric.priceType === 'asking' ? 'asking median' : 'settled median'
  const sample = Number.isFinite(metric.sampleSize) ? ` · n=${metric.sampleSize}` : ''
  return `${price} ${dwelling} ${market}${sample}${year}`
}
