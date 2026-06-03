// src/data/clearance/identity.js
// PV framing — Jeanie is household/family, not a foreign association category

export const simon = {
  name: 'Simon Parker',
  born: 'Christchurch, New Zealand',
  bornFlag: 'nz',
  citizenships: [
    { country: 'Australia', code: 'au', basis: 'By descent — father Australian, obtained near birth' },
    { country: 'New Zealand', code: 'nz', basis: 'By birth' },
  ],
  residence: 'Southbank, Melbourne VIC',
  residenceFlag: 'au',
  physique: 'Mesomorphic — lifelong athlete, maintained throughout adulthood',
  sport: [
    { name: 'Rugby Union', note: 'Grew up playing, maintained through adulthood' },
    { name: 'Gymnastics', note: 'Competitive youth — lifelong physical foundation' },
  ],
}

export const jeanie = {
  name: 'Jeanie Tzs Yan Ng',
  marriedName: 'Parker',
  born: 'Hong Kong SAR',
  bornFlag: 'hk',
  citizenships: [
    { country: 'Australia', code: 'au', basis: 'Naturalised post-marriage (COVID era)' },
    { country: 'Hong Kong SAR', code: 'hk', basis: 'By birth — retains SAR passport' },
  ],
  residence: 'Southbank, Melbourne VIC (joint)',
  metContext: 'Met on pharmacy placement at Geelong hospital',
  career: 'Practising pharmacist — Student → Intern → Registered Pharmacist',
  priorWork: 'Retail work, Hong Kong (student era, pre-immigration only)',
  familyInHK: 'Mother — civilian, no government or military affiliations. Father not in regular contact.',
  governmentLinks: 'None known',
  immigrationPath: 'Student visa → Permanent Resident → Australian Citizen (post-marriage)',
  note: 'Moved to Australia to study pharmacy. Fully integrated. No foreign financial ties.',
}

export const household = {
  daughter: {
    name: 'Lulu Artemis Parker',
    age: 4,
    citizenship: 'Australian',
    flag: 'au',
  },
  property: {
    description: 'Apartment, Southbank VIC',
    ownership: 'Joint (Simon + Jeanie)',
    mortgage: '~$260,000',
  },
}

// Education — Simon
export const education = [
  {
    degree: 'Bachelor of Biomedical Science',
    institution: 'Victoria University of Wellington',
    location: 'Wellington, New Zealand',
    flag: 'nz',
    years: '2008 – 2010',
    logoUrl: '/images/education/victoria-icon.png',
    colour: '#005B99',
  },
  {
    degree: 'Master of Science — Biochemistry & Immunology',
    institution: 'Victoria University of Wellington',
    location: 'Wellington, New Zealand',
    flag: 'nz',
    years: '2011 – 2012',
    logoUrl: '/images/education/victoria-icon.png',
    colour: '#005B99',
  },
  {
    degree: 'Bachelor of Pharmacy (Honours)',
    institution: 'Monash University',
    location: 'Melbourne, Australia',
    flag: 'au',
    years: '2014 – 2016',
    note: 'Graduate entry — 2-year accelerated from 4-year program',
    logoUrl: '/images/education/monash_icon.jpg',
    colour: '#006DAE',
  },
]

// Education — Jeanie
export const jeanieEducation = [
  {
    degree: 'Bachelor of Pharmacy (Honours)',
    institution: 'Monash University',
    location: 'Melbourne, Australia',
    flag: 'au',
    years: '2010 – 2014',
    note: 'Standard 4-year program',
    logoUrl: '/images/education/monash_icon.jpg',
    colour: '#006DAE',
  },
]

// Health & physical
export const health = {
  physique: 'Mesomorphic — lifelong athlete, maintained throughout adulthood',
  sport: [
    { name: 'Rugby Union', note: 'Grew up playing, maintained through adulthood' },
    { name: 'Gymnastics', note: 'Competitive youth — developed lifelong physical foundation' },
  ],
  vo2max: {
    value: 53,
    rating: 'Excellent',
    percentile: 'Top 15%',
    ageGroup: 'Males 35–39',
    source: 'Garmin Connect',
  },
  bloodwork: {
    date: 'Early 2026',
    summary: 'All markers within healthy range. Doctor confirmed excellent overall health.',
    markers: [],
  },
}

// Voluntary disclosures — on Identity page because they are about who you are,
// not about risk categorisation
export const disclosures = [
  {
    id: 'cannabis',
    icon: '🌿',
    label: 'Cannabis — disclosed',
    colour: 'amber',
    summary: 'Occasional social use through 20s and early 30s.',
    detail: [
      'Pattern: occasional, social — rugby catch-ups, creative conversations with friends',
      'Never habitual, never daily, never at work',
      'Current: very occasional (major social events)',
      'Intent: willing to cease entirely for this role — straightforward decision',
      'No legal incidents, no dependency, no treatment history',
    ],
    framing: 'Voluntary disclosure is a character indicator. The assessment is about judgement and susceptibility to coercion — not whether use occurred. Honest disclosure with clear intent to cease is the correct approach. At PV level, concealment is the real risk.',
  },
  {
    id: 'mental-health',
    icon: '💊',
    label: 'Escitalopram 10mg — disclosed',
    colour: 'slate',
    summary: 'Mild anxiety (sleep-related rumination). Managed and disclosed.',
    detail: [
      'Prescription: Escitalopram (Lexapro) 10mg — SSRI',
      'Condition: mild anxiety — sleep disruption from planning/rumination',
      'Functional impact: none — high-functioning, confident, socially engaged at work',
      'Work presentation: calm, direct, joking in nature — mature and grounded',
      'Disclosed in security screen',
    ],
    framing: 'PSPF guidance: treated mental health conditions are not a barrier to security clearance. The relevant question is functional capacity — not whether a prescription exists. 10mg Escitalopram for mild anxiety is one of the most common management tools in Australia.',
  },
]

// Family members required for PV questionnaire
// PV requires: partner + parents + siblings + cohabitants over 18 + children
export const pvFamily = {
  partner: {
    label: 'Spouse',
    name: 'Jeanie Tzs Yan Ng (Parker)',
    dob: 'To confirm',
    citizenship: 'Australian + Hong Kong SAR',
    flags: ['au', 'hk'],
    address: 'Southbank, Melbourne VIC (joint)',
    occupation: 'Registered Pharmacist',
  },
  parents: [
    {
      label: 'Father',
      name: 'To confirm with family',
      dob: 'To confirm',
      citizenship: 'Australian',
      flags: ['au'],
      address: 'New Zealand (to confirm)',
      occupation: 'To confirm',
      note: 'Australian citizen — basis for Simon\'s citizenship by descent',
    },
    {
      label: 'Mother',
      name: 'To confirm with family',
      dob: 'To confirm',
      citizenship: 'To confirm (NZ)',
      flags: ['nz'],
      address: 'New Zealand (to confirm)',
      occupation: 'To confirm',
    },
  ],
  siblings: [
    { label: 'Sibling 1', name: 'To confirm', citizenship: 'NZ', flags: ['nz'], address: 'New Zealand', occupation: 'To confirm' },
    { label: 'Sibling 2', name: 'To confirm', citizenship: 'NZ', flags: ['nz'], address: 'New Zealand', occupation: 'To confirm' },
    { label: 'Sibling 3', name: 'To confirm', citizenship: 'NZ', flags: ['nz'], address: 'New Zealand', occupation: 'To confirm' },
  ],
  overseasRelatives: [
    {
      label: 'Mother-in-law',
      name: 'To confirm with Jeanie',
      relationship: 'Jeanie\'s mother',
      country: 'Hong Kong SAR',
      flags: ['hk'],
      citizenship: 'Hong Kong SAR',
      address: 'Hong Kong (to confirm)',
      occupation: 'To confirm',
      note: 'Civilian — no known government or military affiliations',
    },
  ],
  daughter: {
    name: 'Lulu Artemis Parker',
    dob: '~2021',
    citizenship: 'Australian',
    flags: ['au'],
  },
}
