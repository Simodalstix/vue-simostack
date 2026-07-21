import { DWELLING_COST_BY_ID } from './dwelling-cost-context.ts'

const PROPERTY_TYPE_LABELS = {
  house: 'house',
  unit: 'unit',
}

function strategyPriceKey(strategy, rec) {
  const requestedPropertyType = strategy?.pricePropertyType || 'unit'
  const recordTypes = rec?.dwelling?.types || []
  const houseOnly = recordTypes.length > 0 && recordTypes.every((type) => type === 'house')
  const hasHouse = recordTypes.includes('house')
  const propertyType =
    requestedPropertyType === 'unit' && houseOnly
      ? 'house'
      : requestedPropertyType === 'house' && recordTypes.length > 0 && !hasHouse
        ? 'unit'
        : requestedPropertyType
  const bedrooms =
    propertyType !== requestedPropertyType
      ? (rec?.dwelling?.bedrooms ?? strategy?.bedrooms ?? null)
      : (strategy?.bedrooms ?? null)
  return { propertyType, bedrooms }
}

export function costMetricForArea(areaId, strategy, rec = null) {
  const record = DWELLING_COST_BY_ID[areaId]
  if (!record?.prices) return null

  const { propertyType, bedrooms } = strategyPriceKey(strategy, rec)
  const byBedroom = record.prices[propertyType]
  if (!byBedroom) return null

  const exact = bedrooms == null ? null : byBedroom[String(bedrooms)]
  if (exact) return { ...exact, propertyType, bedrooms, isBedroomProxy: false }

  const fallback = byBedroom.all
  if (!fallback) return null
  return { ...fallback, propertyType, bedrooms, isBedroomProxy: bedrooms != null }
}

export function formatCostMetric(metric, { compact = false, terse = false } = {}) {
  if (!metric?.medianPrice) return 'n/a'
  const price = `$${Math.round(metric.medianPrice / 1000)}k`
  if (compact) return metric.isBedroomProxy ? `${price} ${metric.bedrooms}BR proxy` : price

  const dwelling = PROPERTY_TYPE_LABELS[metric.propertyType] || metric.propertyType
  // Terse: price, basis and year only — no "settled median" clause. Keeps the
  // scored-price header metric to two lines.
  if (terse) {
    const year = metric.evidence?.latestYear ? ` · ${metric.evidence.latestYear}` : ''
    const basis = metric.isBedroomProxy
      ? `${metric.bedrooms}BR proxy`
      : metric.bedrooms == null
        ? `all-${dwelling}`
        : `${metric.bedrooms}BR ${dwelling}`
    return `${price} ${basis}${year}`
  }
  const market = metric.priceType === 'asking' ? 'asking median' : 'settled median'
  const sample = Number.isFinite(metric.sampleSize) ? ` · n=${metric.sampleSize}` : ''
  const latestYear = metric.evidence?.latestYear
  const year = latestYear ? ` · ${latestYear}` : ''
  if (metric.isBedroomProxy)
    return `${price} all-${dwelling} ${market} · ${metric.bedrooms}BR proxy${sample}${year}`
  const basis = metric.bedrooms == null ? `all-${dwelling}` : `${metric.bedrooms}BR ${dwelling}`
  return `${price} ${basis} ${market}${sample}${year}`
}
