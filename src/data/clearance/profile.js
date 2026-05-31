// src/data/clearance/profile.js

export const foreignAssociations = {
  heading: 'Foreign Associations',
  summary: 'Spouse holds dual Australian / Hong Kong SAR citizenship. No financial ties or employment history in foreign jurisdictions.',
  jeanie: {
    relationship: 'Wife (married ~2020)',
    born: 'Hong Kong SAR',
    bornFlag: 'hk',
    currentCitizenship: ['Australia (naturalised)', 'Hong Kong SAR (retained)'],
    currentFlags: ['au', 'hk'],
    currentResidence: 'Southbank, Melbourne VIC',
    employment: 'Registered pharmacist — practising in Australia',
    priorForeignEmployment: 'Retail work, Hong Kong (student era, pre-immigration) — no professional foreign employment',
    foreignAssets: 'None known',
    foreignAccounts: 'None',
    familyInHK: 'Mother — civilian, no known government/military/intelligence affiliations. Father not in contact (left during childhood).',
    governmentLinks: 'None known',
    immigrationPath: 'Student → Permanent Resident → Australian Citizen (post-marriage)',
  },
  travelToHK: [
    { year: '2017', context: 'Transit return from Europe trip' },
    { year: '2019', context: "Visit to Jeanie's family (engagement trip)" },
    { year: '2023', context: "Brought Lulu to meet Jeanie's family — first trip for Lulu (great-grandparent visit)" },
  ],
  context: 'Hong Kong\'s classification in security assessments changed following the 2020 National Security Law. HK is now assessed more cautiously than pre-2020 — this does not preclude clearance. The relationship is stable, documented, and Jeanie is a fully integrated Australian citizen with no foreign government links.',
  assessment: 'Well-understood and manageable disclosure. Spouse is Australian, integrated, no known foreign government connection. Family in HK are ordinary civilians.',
}

export const financial = {
  heading: 'Financial Position',
  summary: 'Single mortgage, modest investments, no consumer debt. Dual-income household.',
  items: [
    {
      label: 'Mortgage',
      value: '~$260,000',
      detail: 'Southbank apartment — joint ownership with Jeanie',
      flag: 'au',
      status: 'normal',
    },
    {
      label: 'Investments',
      value: '~$10,000 – $20,000',
      detail: 'Currently down — drawn during 10-month unemployment period (2025). Actively recovering.',
      status: 'noted',
    },
    {
      label: 'Consumer debt',
      value: 'None',
      detail: 'No credit cards, personal loans, or consumer debt beyond the mortgage',
      status: 'clear',
    },
    {
      label: 'Bankruptcy / CCJs',
      value: 'None',
      detail: 'No bankruptcy, no debt collectors, no county court judgements',
      status: 'clear',
    },
    {
      label: 'Foreign accounts',
      value: 'None',
      detail: 'No financial assets or accounts outside Australia',
      status: 'clear',
    },
    {
      label: 'Household income',
      value: 'Dual income',
      detail: 'Simon: technology (Cititec). Jeanie: practising pharmacist.',
      status: 'normal',
    },
  ],
  historicalNote: {
    heading: 'COVID-era stock & crypto trading',
    body: 'Significant gains on equities (Tesla, others) during 2020–21. Gains subsequently surrendered through poor holding decisions and cryptocurrency exposure. Losses were financial — no legal dimension, no criminal activity, no foreign involvement. Lessons learned: now holds conservative indexed investments. Transparent disclosure is the correct approach — demonstrates judgement (learned from it) not ongoing recklessness.',
  },
  assessment: 'Financial vulnerability is assessed as a coercion vector. This profile presents no material vulnerability: single mortgage (normal), modest investments (expected after unemployment), no consumer debt, dual income. The investment history is disclosed and has no ongoing legal dimension.',
}
