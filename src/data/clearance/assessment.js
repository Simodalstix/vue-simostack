// src/data/clearance/assessment.js

export const adjudicativeCategories = [
  {
    id: 'identity',
    label: 'Identity & Citizenship',
    status: 'clear',    // clear | noted | context
    note: 'Australian by descent (father) + NZ by birth. Dual citizenship fully documented. No third-country citizenships.',
  },
  {
    id: 'criminal',
    label: 'Criminal History',
    status: 'clear',
    note: 'None. No arrests, charges, convictions, or cautions in any jurisdiction.',
  },
  {
    id: 'foreign',
    label: 'Foreign Associations',
    status: 'noted',
    note: 'Spouse: dual AU/HK citizenship. Family in Hong Kong (civilian). No financial or employment ties to foreign jurisdictions. HK post-2020 NSL context — documented and understood.',
  },
  {
    id: 'financial',
    label: 'Financial Position',
    status: 'noted',
    note: 'Single mortgage (~$260k). Investment losses during unemployment — disclosed, no legal dimension. Dual income, no consumer debt.',
  },
  {
    id: 'substance',
    label: 'Substance Use',
    status: 'noted',
    note: 'Cannabis: occasional social use through 20s–early 30s. Voluntary disclosure. Intent to cease. No dependency, no legal incidents.',
  },
  {
    id: 'mental',
    label: 'Mental Health',
    status: 'clear',
    note: 'Escitalopram 10mg — mild anxiety (sleep/rumination). Managed, disclosed. PSPF: treated conditions are not a barrier. High functional capacity.',
  },
  {
    id: 'employment',
    label: 'Employment Continuity',
    status: 'clear',
    note: 'Fully documented. ~10-month gap (2025) explained by career transition + company administration (Strongroom.ai — verifiable). No unexplained gaps.',
  },
  {
    id: 'character',
    label: 'Character & Honesty',
    status: 'clear',
    note: 'Voluntary disclosure across all categories. Pattern of transparency is itself a positive indicator. References available from current employer, former colleagues, personal contacts.',
  },
]

export const oha = {
  heading: 'OHA — Occupational Health Assessment',
  subheading: 'Separate to the AGSVA clearance interview. Assessed by contracted occupational health provider.',
  purpose: 'Fitness-for-duty assessment — not a security suitability judgement. The assessor is a medical professional, not an investigator.',
  categories: [
    {
      label: 'Physical fitness',
      status: 'clear',
      note: 'Lifelong athlete. Rugby and gymnastics background. Mesomorphic build maintained through adulthood. No physical conditions affecting role performance.',
    },
    {
      label: 'Mental health',
      status: 'clear',
      note: 'Escitalopram 10mg — mild anxiety, managed. No impairment to judgement or function. Disclosure is appropriate and expected.',
    },
    {
      label: 'Substance use',
      status: 'noted',
      note: 'Cannabis: occasional, historical/tapering. Not current dependency. Not at work. Honest disclosure in the OHA context. Assessor is interested in current use patterns and dependency indicators — neither is present.',
    },
  ],
  keyPrinciple: 'Be honest, be brief, be past-tense. The OHA is not where clearance decisions are made — the medical assessor reports fitness, not suitability. The bigger risk is understating or omitting what the form directly asks for.',
}

export const statusConfig = {
  clear:   { label: 'Clear',   colour: '#34d399', bg: 'bg-emerald-950/40', border: 'border-emerald-800/60', text: 'text-emerald-300' },
  noted:   { label: 'Noted',   colour: '#fbbf24', bg: 'bg-amber-950/40',   border: 'border-amber-800/60',   text: 'text-amber-300' },
  context: { label: 'Context', colour: '#38bdf8', bg: 'bg-sky-950/40',     border: 'border-sky-800/60',     text: 'text-sky-300' },
}
