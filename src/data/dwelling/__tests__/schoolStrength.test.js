import { describe, expect, it } from 'vitest'

import { schoolPoints } from '../schools/dwelling-school-points.js'
import { schoolContextByAreaId } from '../schools/dwelling-school-context.js'
import {
  schoolStrengthByName,
  schoolStrengthBySchoolNo,
  zonedSchoolEvidenceForArea,
} from '../schools/schoolStrength.js'

const pointSchoolNos = new Set(
  schoolPoints.filter((school) => school.schoolNo != null).map((school) => String(school.schoolNo)),
)
const pointNames = new Set(schoolPoints.map((school) => school.name))

describe('school strength research table', () => {
  it('keys every entry to a school in the generated points dataset', () => {
    for (const schoolNo of Object.keys(schoolStrengthBySchoolNo)) {
      expect(pointSchoolNos.has(schoolNo), `unknown school number: ${schoolNo}`).toBe(true)
    }
    for (const name of Object.keys(schoolStrengthByName)) {
      expect(pointNames.has(name), `unknown school name: ${name}`).toBe(true)
    }
  })

  it('keeps strengths nullable or integer values from 1 to 5', () => {
    const entries = [
      ...Object.values(schoolStrengthBySchoolNo),
      ...Object.values(schoolStrengthByName),
    ]
    expect(entries.length).toBe(92)
    for (const entry of entries) {
      expect(
        entry.strength === null ||
          (Number.isInteger(entry.strength) && entry.strength >= 1 && entry.strength <= 5),
      ).toBe(true)
    }
  })
})

describe('catchment zone roles', () => {
  it('keeps anchor-zoned schools separate from zones that only overlap the catchment', () => {
    const southYarra = schoolContextByAreaId['inner-south-yarra-2br']
    expect(southYarra.zonedPrimary).toBe('Toorak Primary School')
    expect(southYarra.alsoInCatchmentPrimary).toEqual([
      'Richmond Primary School',
      'South Yarra Primary School',
      'Windsor Primary School',
    ])

    const balwynNorth = schoolContextByAreaId['balwyn-north-2br']
    expect(balwynNorth.zonedSecondary).toBe('Balwyn High School')
    expect(balwynNorth.alsoInCatchmentSecondary).toEqual([])
  })

  it.each([
    ['heidelberg-3br-townhouse', 4, 4],
    ['rosanna-house', 3, 1],
    ['fairfield-house', 4, 4],
    ['surrey-hills-house', 4, 4],
    ['blackburn-house', 4, 4],
    ['mount-waverley-villa', 5, 4],
    ['ashburton-villa', 4, 4],
    ['bentleigh-house', 4, 5],
    ['newport-house', 3, 2],
  ])('resolves zoned-school evidence for %s', (areaId, primary, secondary) => {
    const evidence = zonedSchoolEvidenceForArea(areaId)
    expect(evidence.primary.evidence?.strength).toBe(primary)
    expect(evidence.secondary.evidence?.strength).toBe(secondary)
    expect(evidence.primary.evidence?.confidence).toBe('high')
    expect(evidence.secondary.evidence?.sources[0]).toContain('vrqa.vic.gov.au')
  })
})
