// Cohort-relative scoring for criteria whose raw values are more useful as a
// comparison than as an absolute scale. Percentile ranks use average ranks for
// ties, map the cohort minimum to 0 and maximum to 10, and exclude nulls.

import { areaCorridors } from './areaCorridors.js'
import { partnerPoolScore } from './partnerPool.js'

export const SAFETY_PERCENTILE_BLEND = 1
export const PARTNER_PERCENTILE_BLEND = 0.5

const scoredCohort = areaCorridors.filter((record) => record.scored !== false)

export function percentileRanksById(records, valueFor) {
  const finite = records
    .map((record) => ({ id: record.id, value: valueFor(record) }))
    .filter((entry) => Number.isFinite(entry.value))
    .sort((a, b) => a.value - b.value || a.id.localeCompare(b.id))
  const result = Object.fromEntries(records.map((record) => [record.id, null]))
  if (!finite.length) return result
  if (finite.length === 1) {
    result[finite[0].id] = 10
    return result
  }

  for (let start = 0; start < finite.length; ) {
    let end = start + 1
    while (end < finite.length && finite[end].value === finite[start].value) end += 1
    const averageZeroBasedRank = (start + (end - 1)) / 2
    const percentileScore = (averageZeroBasedRank / (finite.length - 1)) * 10
    for (let index = start; index < end; index += 1) result[finite[index].id] = percentileScore
    start = end
  }

  return result
}

export function blendRawAndPercentile(rawScore, percentileScore, percentileBlend) {
  if (!Number.isFinite(rawScore) || !Number.isFinite(percentileScore)) return null
  return rawScore * (1 - percentileBlend) + percentileScore * percentileBlend
}

function mappingFor(valueFor, percentileBlend) {
  const rawScoreById = Object.fromEntries(
    scoredCohort.map((record) => {
      const value = valueFor(record)
      return [record.id, Number.isFinite(value) ? value : null]
    }),
  )
  const percentileScoreById = percentileRanksById(scoredCohort, valueFor)
  const blendedScoreById = Object.fromEntries(
    scoredCohort.map((record) => [
      record.id,
      blendRawAndPercentile(
        rawScoreById[record.id],
        percentileScoreById[record.id],
        percentileBlend,
      ),
    ]),
  )
  return { percentileBlend, rawScoreById, percentileScoreById, blendedScoreById }
}

export const RELATIVE_SCORING_BY_CRITERION = {
  safetyQuality: mappingFor(
    (record) => (record.scores?.safety == null ? null : record.scores.safety * 2),
    SAFETY_PERCENTILE_BLEND,
  ),
  partnerPool: mappingFor((record) => partnerPoolScore(record.id), PARTNER_PERCENTILE_BLEND),
}

export function relativeScoreFor(criterionKey, areaId) {
  return RELATIVE_SCORING_BY_CRITERION[criterionKey]?.blendedScoreById[areaId] ?? null
}
