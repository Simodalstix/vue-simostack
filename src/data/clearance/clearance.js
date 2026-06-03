// src/data/clearance/clearance.js
// PV-level assessment data — AGSVA adjudicative criteria, OSA/OHA framing,
// referee planning, and document checklist

export const pvProcess = {
  heading: 'Positive Vetting — Process Overview',
  stages: [
    {
      id: 'osa',
      label: 'OSA',
      full: 'Organisational Suitability Assessment',
      who: 'ASD — runs independently of AGSVA',
      timeline: '~2–4 months',
      status: 'active',
      description: 'ASD\'s own suitability gate before the offer is confirmed. Includes Personal History Booklet, psychological assessment, and interview with ASD vetting staff. This is the immediate hurdle — the conditional offer is contingent on OSA passing.',
      what: [
        'Personal History Booklet — education, employment, overseas travel, contacts, legal, health',
        'Psychological assessment — structured interview with ASD psychologist',
        'Character assessment — honesty, judgement, resilience, loyalty',
      ],
    },
    {
      id: 'baseline',
      label: 'Baseline',
      full: 'Baseline Security Clearance',
      who: 'AGSVA',
      timeline: '~20 business days vetting',
      status: 'pending',
      description: 'Entry-level clearance — identity, criminal, basic background. Typically runs concurrently with or immediately after OSA. Fast compared to PV.',
      what: [
        'Identity verification — citizenship, birth certificate',
        'Criminal history check',
        'Basic employment and address verification',
        '1 referee minimum',
      ],
    },
    {
      id: 'pv',
      label: 'Positive Vetting',
      full: 'Positive Vetting Clearance',
      who: 'AGSVA',
      timeline: '~180 business days (~9 months)',
      status: 'pending',
      description: 'Full PV assessment. The comprehensive process covering every adjudicative category. Runs after Baseline. This is the main event.',
      what: [
        'Full personal history since age 16',
        'Psychological assessment (AGSVA-contracted psychologist)',
        'Vetting officer interview — detailed, structured',
        'Referee interviews — 5 required, all contacted',
        'Financial deep-dive — tax return, assets, debts, super',
        'Foreign associations review — Jeanie\'s background, HK family',
        'Social media accounts submitted',
      ],
    },
  ],
}

export const adjudicativeCategories = [
  {
    id: 'identity',
    label: 'Identity & Citizenship',
    status: 'clear',
    note: 'Australian citizen by descent (father) + NZ by birth. Dual citizenship documented. No third-country citizenships. Born in NZ, raised in NZ, Australian citizen since near birth.',
  },
  {
    id: 'criminal',
    label: 'Criminal History',
    status: 'clear',
    note: 'None. No arrests, charges, convictions, cautions, or traffic infringements of note in any jurisdiction.',
  },
  {
    id: 'foreign',
    label: 'Foreign Associations',
    status: 'noted',
    note: 'Spouse Jeanie: dual AU/HK citizenship. Mother-in-law in Hong Kong (civilian). HK post-2020 NSL assessed more cautiously. No financial or employment ties to foreign jurisdictions. See Profile page for full detail.',
  },
  {
    id: 'financial',
    label: 'Financial Position',
    status: 'noted',
    note: 'Single mortgage (~$260k, joint). Investment losses disclosed (unemployment period). No consumer debt. Dual income. COVID-era trading history disclosed. No legal dimension.',
  },
  {
    id: 'substance',
    label: 'Substance Use',
    status: 'noted',
    note: 'Cannabis: occasional social use through 20s–early 30s. Current: very occasional. Intent to cease. Voluntary disclosure. No dependency, no legal incidents, no treatment history.',
  },
  {
    id: 'mental',
    label: 'Mental Health',
    status: 'clear',
    note: 'Escitalopram 10mg — mild anxiety (sleep/rumination). Managed, disclosed. PSPF: treated conditions are not a barrier. High functional capacity — confident, socially engaged, no impairment.',
  },
  {
    id: 'employment',
    label: 'Employment Continuity',
    status: 'clear',
    note: 'Fully documented. ~10-month gap (2025) explained by career transition + company administration (Strongroom.ai — verifiable). No unexplained gaps. PV requires employment history since age 16.',
  },
  {
    id: 'character',
    label: 'Character & Honesty',
    status: 'clear',
    note: 'Voluntary disclosure across all categories. Pattern of transparency is itself a positive indicator at PV level. References available across all life periods.',
  },
  {
    id: 'loyalty',
    label: 'Loyalty & Associations',
    status: 'clear',
    note: 'No memberships in extremist, foreign government, or hostile organisations. No foreign government contacts. Social media accounts to be submitted — standard and unremarkable.',
  },
]

// PV requires 5 referees covering every period since age 16
export const referees = [
  {
    id: 'ref-current-employer',
    role: 'Professional — current supervisor',
    period: '2026–present',
    covering: 'Cititec MSP role',
    status: 'available',
    note: 'Manager at Cititec. Required: 1–2 supervisors.',
    requirement: 'supervisor',
  },
  {
    id: 'ref-pharmacy',
    role: 'Professional — pharmacy colleague/supervisor',
    period: '2017–2024',
    covering: 'Chemist Warehouse pharmacist years',
    status: 'to-identify',
    note: 'Senior pharmacist or pharmacy manager from CW years. Long enough tenure for strong reference.',
    requirement: 'supervisor',
  },
  {
    id: 'ref-personal-melb',
    role: 'Personal — Melbourne (long-term)',
    period: '2013–present',
    covering: 'Melbourne life — character, relationships, lifestyle',
    status: 'to-identify',
    note: 'Someone who has known you well in Melbourne for 5+ years. Friend, not family, not partner.',
    requirement: 'personal',
  },
  {
    id: 'ref-personal-nz-recent',
    role: 'Personal — New Zealand connection',
    period: '~2008–2013',
    covering: 'Wellington/Christchurch years — university and early career',
    status: 'to-identify',
    note: 'Friend or colleague from NZ years. Could be someone who has maintained contact since. Must be AU/NZ/FVEY citizen where possible.',
    requirement: 'personal',
  },
  {
    id: 'ref-personal-early',
    role: 'Personal — early life (age 16+)',
    period: '~2004–2008',
    covering: 'Christchurch teenage/early adult years',
    status: 'to-identify',
    note: 'This is the hardest one to find. Could be a school friend, early employer, community contact. Parents cannot be referees. Must have had regular contact over an extended period.',
    requirement: 'personal',
  },
]

export const refereeStatusConfig = {
  available:    { colour: '#34d399', label: 'Available',    text: 'text-emerald-300' },
  'to-identify': { colour: '#fbbf24', label: 'To identify',  text: 'text-amber-300' },
  confirmed:    { colour: '#38bdf8', label: 'Confirmed',    text: 'text-sky-300' },
}

// Document checklist — from AGSVA guidebook PV column
export const documents = {
  mandatory: [
    { id: 'birth-cert', label: 'Full Birth Certificate — NZ (overseas)', status: 'needed', note: 'Must include at least one parent\'s details. Extract not acceptable. If not in English, requires NAATI-accredited translation.' },
    { id: 'au-citizenship', label: 'Australian Citizenship Certificate', status: 'needed', note: 'Proof of citizenship by descent. Father\'s Australian documents may also be required.' },
    { id: 'passports', label: 'All Passports — current + expired', status: 'partial', note: 'Details page + all stamped pages for every current, expired, or cancelled passport. Both AU and NZ passports.' },
    { id: 'marriage-cert', label: 'Marriage Certificate', status: 'needed', note: 'Issued by Registrar of Births, Deaths and Marriages — Australian registration.' },
    { id: 'photo-id', label: 'Current Photo ID', status: 'available', note: 'Driver\'s licence or proof of age card.' },
    { id: 'secondary-id', label: 'Secondary ID — Medicare or bank card', status: 'available', note: 'Current Medicare card or credit/bank card.' },
    { id: 'proof-address-current', label: 'Proof of current address', status: 'available', note: 'Driver\'s licence, utility bill, rates notice, or bank statement.' },
    { id: 'proof-address-prev', label: 'Proof of all addresses since age 16', status: 'partial', note: 'Australian addresses: lease agreements, utility bills, bank statements. NZ addresses: statutory declarations where documentary evidence unavailable.' },
    { id: 'proof-employment', label: 'Proof of all employment since age 16', status: 'partial', note: 'Payslips, payment summaries, statements of service, letters of service. All employers since age 16 for PV.' },
  ],
  financial: [
    { id: 'bank-statements', label: 'Bank statements — last 3 months (all accounts)', status: 'needed', note: 'All bank accounts including credit cards.' },
    { id: 'tax-return', label: 'Most recent Tax Return', status: 'needed', note: 'Last lodged return.' },
    { id: 'notice-assessment', label: 'Notice of Tax Assessment', status: 'needed', note: 'Last notice from ATO.' },
    { id: 'payslip', label: 'Most recent payslip — Cititec', status: 'available', note: 'Current employer.' },
  ],
}

export const documentStatusConfig = {
  available: { colour: '#34d399', label: 'Available',    text: 'text-emerald-300' },
  partial:   { colour: '#fbbf24', label: 'Partial',      text: 'text-amber-300' },
  needed:    { colour: '#f87171', label: 'Needed',       text: 'text-red-300' },
}

export const oha = {
  heading: 'OSA Psychological Assessment',
  subheading: 'Run by ASD — not AGSVA. This is the main gate for the conditional offer.',
  purpose: 'Suitability assessment — not just fitness for duty. A trained psychologist assesses character, judgement, honesty, resilience, and susceptibility to coercion.',
  duration: 'Potentially hours — structured interview, potentially 100s of questions',
  categories: [
    {
      label: 'Physical health',
      status: 'clear',
      note: 'Lifelong athlete. Rugby and gymnastics background. VO2 max 53 (top 15%, males 35–39). All bloodwork markers within healthy range (early 2026). No physical conditions affecting role performance.',
    },
    {
      label: 'Mental health',
      status: 'clear',
      note: 'Escitalopram 10mg — mild anxiety, managed. No impairment to judgement or function. PSPF: treated conditions are not a barrier. Disclosure is appropriate and expected at PV level.',
    },
    {
      label: 'Substance use',
      status: 'noted',
      note: 'Cannabis: occasional, social, tapering. Not habitual, not at work. Honest voluntary disclosure. Assessor focus: current patterns, dependency indicators, judgement. Neither dependency nor impaired judgement are present.',
    },
    {
      label: 'Character & judgement',
      status: 'clear',
      note: 'Confident, socially engaged, direct. Mature — understands consequences and obligations. Voluntary disclosure pattern across all categories demonstrates honesty and self-awareness.',
    },
    {
      label: 'Resilience & loyalty',
      status: 'clear',
      note: 'Career transition from pharmacy: deliberate, committed, pushed through real doubt. No evidence of coercion vulnerability. Strong family unit, stable housing, dual income.',
    },
  ],
  keyPrinciple: 'Be honest, be direct, be past-tense where applicable. The psychological assessment is looking for the whole person — not trying to catch you out. Concealment is a far greater risk than any disclosed item in your profile.',
}

export const statusConfig = {
  clear:   { label: 'Clear',   colour: '#34d399', bg: 'bg-emerald-950/40', border: 'border-emerald-800/60', text: 'text-emerald-300' },
  noted:   { label: 'Noted',   colour: '#fbbf24', bg: 'bg-amber-950/40',   border: 'border-amber-800/60',   text: 'text-amber-300' },
  context: { label: 'Context', colour: '#38bdf8', bg: 'bg-sky-950/40',     border: 'border-sky-800/60',     text: 'text-sky-300' },
}
