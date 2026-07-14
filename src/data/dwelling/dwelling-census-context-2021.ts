/**
 * Backward-compatible export for the former 12-suburb census context filename.
 * Prefer importing from ./dwelling-community-context-2021.
 */
export {
  DWELLING_COMMUNITY_CONTEXT as DWELLING_CENSUS_CONTEXT,
  DWELLING_COMMUNITY_CONTEXT_BY_SUBURB as DWELLING_CENSUS_CONTEXT_BY_SUBURB,
} from './dwelling-community-context-2021'

export type {
  DwellingCommunityContextRecord as DwellingCensusContextRecord,
} from './dwelling-community-context-2021'
