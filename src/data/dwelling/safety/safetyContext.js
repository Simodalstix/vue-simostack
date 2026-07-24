// Runtime adapter for the generated CSA Safety context. The generated file
// retains the audit's method/provenance; this module is the only scoring entry
// point so missing coverage remains null rather than becoming a guessed score.
import { safetyContext, safetyFor } from './dwelling-safety-context.js'

export { safetyContext, safetyFor }

export function safetyScoreFor(areaId) {
  return safetyFor(areaId)?.score ?? null
}

export function safetyBandFor(areaId) {
  const score = safetyScoreFor(areaId)
  if (score == null) return null
  if (score >= 7) return 'lower relative recorded-offence risk'
  if (score >= 4) return 'mid-range relative recorded-offence risk'
  return 'higher relative recorded-offence risk'
}
