// Cohort-relative scoring for criteria whose raw values are more useful as a
// comparison than as an absolute scale. Percentile ranks use average ranks for
// ties, map the cohort minimum to 0 and maximum to 10, and exclude nulls.

import { areaCorridors } from './areaCorridors.js'
import { partnerPoolPercentage, partnerPoolScore } from './partnerPool.js'

export const PARTNER_PERCENTILE_BLEND = 1

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

function mappingFor(rawScoreFor, percentileBlend, percentileValueFor = rawScoreFor) {
  const rawScoreById = Object.fromEntries(
    scoredCohort.map((record) => {
      const value = rawScoreFor(record)
      return [record.id, Number.isFinite(value) ? value : null]
    }),
  )
  const percentileScoreById = percentileRanksById(scoredCohort, percentileValueFor)
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
  partnerPool: mappingFor(
    (record) => partnerPoolScore(record.id),
    PARTNER_PERCENTILE_BLEND,
    (record) => partnerPoolPercentage(record.id),
  ),
}

export function relativeScoreFor(criterionKey, areaId) {
  return RELATIVE_SCORING_BY_CRITERION[criterionKey]?.blendedScoreById[areaId] ?? null
}
