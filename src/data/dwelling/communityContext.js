// src/data/dwelling/communityContext.js
//
// Adapter between the /dwelling ranking records and the authoritative
// Community Context dataset (dwelling-community-context-2021.ts, ABS Census
// 2021 SAL records, statically imported — never fetched at runtime).
//
// CONTRACT (from the dataset itself and the README):
// - Descriptive by default. Every record carries contextOnly: true,
//   excludeFromSuburbScore: true and scoreContribution: 0, so none of it enters
//   the preset ranking automatically. Two deliberate, named exceptions derive
//   small additive bonuses: the off-by-default Chinese-language lens
//   (chineseCommunity.js) and the partner-pool criterion (partnerPool.js).
//   Both recombine raw counts over a common denominator; nothing else here is
//   scored.
// - Combined /dwelling labels (e.g. "Brunswick / Coburg") resolve to their
//   COMPONENT SAL records via coverage.dwellingLensEntries. Component
//   percentages are never averaged and published medians are never
//   arithmetically combined; the UI shows each component suburb separately.
// - Percentages come straight from the dataset (each measure keeps its own
//   ABS denominator: G13 persons for language, G09/G01 for birthplace, G42 /
//   G37 occupied private dwellings for households and tenure). Nothing is
//   recalculated against total population here.
// - ABS applies small random adjustments for privacy, so component sums can
//   differ slightly from published totals; the per-record privacyNote carries
//   that caveat into the UI.
//
// This module supersedes the former empty communityProfile blocks on the
// ranking records and the earlier 12-suburb census placeholder.

import {
  DWELLING_COMMUNITY_CONTEXT,
  DWELLING_COMMUNITY_CONTEXT_BY_SUBURB,
} from './dwelling-community-context-2021'
import { areaCorridors } from './areaCorridors.js'

export const COMMUNITY_DATASET = {
  title: DWELLING_COMMUNITY_CONTEXT.title, // 'Community Context · ABS Census 2021'
  version: DWELLING_COMMUNITY_CONTEXT.version,
  censusYear: 2021,
  usage: DWELLING_COMMUNITY_CONTEXT.usage,
  recordCount: DWELLING_COMMUNITY_CONTEXT.coverage.recordCount,
}

const recordBySuburb = DWELLING_COMMUNITY_CONTEXT_BY_SUBURB
const corridorById = Object.fromEntries(areaCorridors.map((r) => [r.id, r]))

// "Windsor / Prahran" and "Windsor/Prahran" are the same label.
function normaliseLabel(label) {
  return String(label || '')
    .split('/')
    .map((s) => s.trim())
    .join('/')
}

const lensEntryByLabel = Object.fromEntries(
  DWELLING_COMMUNITY_CONTEXT.coverage.dwellingLensEntries.map((e) => [
    normaliseLabel(e.lensLabel),
    e,
  ]),
)

// Component SAL suburb names for a ranking record. Per the bundle contract,
// combined labels are resolved from coverage.dwellingLensEntries, while a
// single-label suburb falls back to an exact SAL suburb match when present.
// This keeps the Community Context view aligned with the authoritative
// dataset instead of inferring extra localities from map/station metadata.
export function componentSuburbNamesFor(areaId) {
  const rec = corridorById[areaId]
  if (!rec) return []
  const fromLens = lensEntryByLabel[normaliseLabel(rec.suburb)]?.salSuburbs
  if (fromLens?.length) return fromLens
  return [rec.suburb]
}

// Resolve a ranking record to its individual SAL community records.
// Returns { components: [{ name, record }], missing: [name] } — `missing`
// lists localities with no SAL record in the dataset (graceful, not fatal).
export function communityContextFor(areaId) {
  const names = componentSuburbNamesFor(areaId)
  if (!names.length) return null
  const components = []
  const missing = []
  for (const name of names) {
    const record = recordBySuburb[name] || null
    if (record) components.push({ name, record })
    else missing.push(name)
  }
  return { components, missing }
}

// Compact descriptive snapshot for the dense preview: overseas-born share and
// the strongest non-English languages of the FIRST component suburb (never a
// blend across components). Wording stays descriptive and neutral.
export function communitySnapshotFor(areaId) {
  const ctx = communityContextFor(areaId)
  const first = ctx?.components[0]
  if (!first) return null
  const c = first.record.community
  const parts = []
  if (c.overseasBornPopulation?.percentage != null)
    parts.push(`${c.overseasBornPopulation.percentage}% overseas-born`)
  const langs = (c.topNonEnglishLanguagesSpokenAtHome || [])
    .slice(0, 3)
    .filter((l) => l.percentage != null && l.percentage >= 1)
    .map((l) => `${l.name} ${l.percentage}%`)
  if (langs.length) parts.push(langs.join(' · '))
  if (!parts.length) return null
  return {
    suburb: first.record.suburb,
    text: parts.join(' · '),
    multiComponent: ctx.components.length > 1,
  }
}

// Formatting helpers shared by the community UI. All handle missing values.
export function fmtPct(v) {
  return v == null ? 'n/a' : `${v}%`
}
export function fmtCount(v) {
  return v == null ? 'n/a' : Number(v).toLocaleString('en-AU')
}
export function fmtWeeklyIncome(measure) {
  return measure?.value == null ? 'n/a' : `$${fmtCount(measure.value)}/wk`
}
export function fmtMedianAge(measure) {
  return measure?.value == null ? 'n/a' : `${measure.value} yrs`
}

// Source metadata line for the detail view / source disclosure.
export function sourceLineFor(record) {
  return {
    geographyType: record.geographyType,
    geographyCode: record.geographyCode,
    censusYear: record.censusYear,
    source: record.source,
    retrievedAt: record.retrievedAt,
    profileUrl: record.sourceMetadata?.profileUrl || null,
    privacyNote: record.sourceMetadata?.privacyNote || null,
  }
}
