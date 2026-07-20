// Owner-judgment exclusions for the Soul gate. These are personal decisions,
// not source-backed suburb facts and never enter score mathematics.

export const SOUL_GATE = {
  key: 'soul',
  label: 'Soul',
  hint: 'Exclude records carrying an owner-judgment veto. Scores remain unchanged.',
  accent: 'blue',
  scoringRole: 'gate',
  defaultEnabled: true,
}

export const OWNER_VETOES_BY_AREA_ID = {
  'melbourne-cbd-2br': {
    reason: 'No place for a growing kid',
    basis: 'Owner judgment',
  },
  'carlton-2br': {
    reason: 'University-focused housing',
    basis: 'Owner judgment',
  },
  'south-melbourne-2br': {
    reason: 'Motorway',
    basis: 'Owner judgment',
  },
}

export function ownerVetoFor(areaId) {
  return OWNER_VETOES_BY_AREA_ID[areaId] ?? null
}
