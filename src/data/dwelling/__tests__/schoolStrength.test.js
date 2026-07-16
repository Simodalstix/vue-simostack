import { describe, expect, it } from 'vitest'

import { schoolPoints } from '../schools/dwelling-school-points.js'
import { schoolStrengthByName, schoolStrengthBySchoolNo } from '../schools/schoolStrength.js'

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
    expect(entries.length).toBe(73)
    for (const entry of entries) {
      expect(
        entry.strength === null ||
          (Number.isInteger(entry.strength) && entry.strength >= 1 && entry.strength <= 5),
      ).toBe(true)
    }
  })
})
