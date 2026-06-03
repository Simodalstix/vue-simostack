// src/data/clearance/timeline.js
//
// FOUR ROWS on the timeline component:
//
//   Born anchor (1986) + discontinuity break + proportional spine 2006–2026
//
//   Row 1 — lane: 'travel'  — above spine  — international travel only
//   ─────────────── YEAR SPINE (2006–2026) ───────────────
//   Row 2 — lane: 'career'  — below spine  — education, employment, AND life events
//   Row 3 — address bars    — rendered from addressHistory (yearStart/yearEnd)
//   Row 4 — nzVisits        — dedicated NZ row, own colour
//
// Entries with yearNum < 2006 are pinned just after the break
// type: 'travel' | 'life' | 'education' | 'career' | 'financial'

// Spine axis — proportional spacing covers this range
export const SPINE_START = 2006
export const SPINE_END   = 2026
export const BORN_YEAR   = 1986

export const timelineEntries = [

  // ── EARLY WORK (Row 2 — straddles break, pinned to 2006) ─────────────────
  {
    id: 'early-work',
    year: '~2003–07',
    yearNum: 2006,
    yearEnd: 2007,         // pinned to just after break for rendering
    label: 'Early work',
    sublabel: 'Pharmacy assistant, New World, McDonalds — Christchurch',
    flags: ['nz'],
    lane: 'career',
    type: 'career',
    note: 'Teenager — dates to confirm with parents. Straddles discontinuity break.',
  },

  // ── QUEENSLAND (Row 1 — travel, pre-break, pinned) ───────────────────────
  {
    id: 'queensland',
    year: '~2003',
    yearNum: 2006,         // pre-break, pinned near start of visible spine
    label: 'Queensland',
    sublabel: 'Family holiday',
    flags: ['au'],
    lane: 'travel',
    type: 'travel',
  },

  // ── UNIVERSITY (Row 2 — career) ───────────────────────────────────────────
  {
    id: 'biomed-degree',
    year: '2008–10',
    yearNum: 2008,
    yearEnd: 2010,
    label: 'BSc Biomedical Science',
    sublabel: 'Victoria University of Wellington',
    degree: 'Bachelor of Biomedical Science',
    flags: ['nz'],
    lane: 'career',
    type: 'education',
  },
  {
    id: 'lab-wellington',
    year: '~2010–11',
    yearNum: 2010,
    yearEnd: 2011,
    label: 'Specimen Reception',
    sublabel: 'Medical Laboratory — Wellington',
    flags: ['nz'],
    lane: 'career',
    type: 'career',
  },
  {
    id: 'masters',
    year: '2011–12',
    yearNum: 2011,
    yearEnd: 2012,
    label: 'MSc Biochemistry & Immunology',
    sublabel: 'Victoria University of Wellington',
    degree: 'Master of Science — Biochemistry & Immunology',
    flags: ['nz'],
    lane: 'career',
    type: 'education',
  },

  // ── MALAYSIA (Row 1 — travel) ─────────────────────────────────────────────
  {
    id: 'malaysia',
    year: '2011',
    yearNum: 2011,
    label: 'Malaysia',
    sublabel: 'Holiday with partner Melissa',
    note: 'Age ~25. Not university-related.',
    flags: ['my'],
    lane: 'travel',
    type: 'travel',
  },

  // ── POST-MASTERS WORK (Row 2 — career) ────────────────────────────────────
  {
    id: 'lab-christchurch',
    year: '~2012',
    yearNum: 2012,
    yearEnd: 2012,
    label: 'Specimen Reception',
    sublabel: 'Medical Laboratory — Christchurch',
    flags: ['nz'],
    lane: 'career',
    type: 'career',
  },
  {
    id: 'construction',
    year: '~2012–13',
    yearNum: 2012,
    yearEnd: 2013,
    label: 'Labourer & Painter',
    sublabel: 'Construction — New Zealand',
    flags: ['nz'],
    lane: 'career',
    type: 'career',
  },

  // ── MOVE TO AUSTRALIA (Row 2 — life event) ────────────────────────────────
  {
    id: 'move-to-aus',
    year: '2013',
    yearNum: 2013,
    label: 'Moved to Australia',
    sublabel: 'Melbourne, VIC',
    flags: ['au'],
    lane: 'career',
    type: 'life',
    highlight: true,
  },

  // ── PHARMACY DEGREE + CAREER (Row 2 — career) ─────────────────────────────
  {
    id: 'pharmacy-degree',
    year: '2014–16',
    yearNum: 2014,
    yearEnd: 2016,
    label: 'BPharm (Hons) — Graduate Entry',
    sublabel: 'Monash University, Melbourne',
    degree: 'Bachelor of Pharmacy (Honours)',
    flags: ['au'],
    lane: 'career',
    type: 'education',
  },
  {
    id: 'pharmacist-start',
    year: '2017–24',
    yearNum: 2017,
    yearEnd: 2024,
    label: 'Registered Pharmacist',
    sublabel: 'Chemist Warehouse — Melbourne',
    flags: ['au'],
    lane: 'career',
    type: 'career',
  },

  // ── EUROPE + HK 2017 (Row 1 — travel) ────────────────────────────────────
  {
    id: 'europe-trip',
    year: '2017',
    yearNum: 2017,
    label: 'Europe + Hong Kong',
    sublabel: 'Spain · France · Greece · Romania · Italy · Austria · Netherlands · HK',
    flags: ['es', 'fr', 'gr', 'ro', 'it', 'at', 'nl', 'hk'],
    lane: 'travel',
    type: 'travel',
    note: 'France: father at World Cycling Championships. Greece/Romania with family. Some legs with Jeanie only. Return via Hong Kong.',
  },

  // ── HK + JAPAN 2019 (Row 1 — travel) ─────────────────────────────────────
  {
    id: 'hk-japan',
    year: '2019',
    yearNum: 2019,
    label: 'Hong Kong + Japan',
    sublabel: 'Proposed to Jeanie under cherry blossom',
    flags: ['hk', 'jp'],
    lane: 'travel',
    type: 'travel',
    highlight: true,
    note: "Visited Jeanie's family in Hong Kong. Engaged in Japan.",
  },

  // ── LIFE EVENTS (Row 2 — life) ────────────────────────────────────────────
  {
    id: 'marriage',
    year: '2020',
    yearNum: 2020,
    label: 'Married Jeanie',
    sublabel: 'COVID era — Melbourne',
    flags: ['au'],
    lane: 'career',
    type: 'life',
    highlight: true,
  },
  {
    id: 'lulu',
    year: '2021',
    yearNum: 2021,
    label: 'Lulu Artemis born',
    sublabel: 'Melbourne, VIC',
    flags: ['au'],
    lane: 'career',
    type: 'life',
    highlight: true,
  },
  {
    id: 'apartment',
    year: '~2022',
    yearNum: 2022,
    label: 'Apartment purchased',
    sublabel: 'Southbank, Melbourne — joint ownership',
    flags: ['au'],
    lane: 'career',
    type: 'financial',
  },

  // ── HK 2023 (Row 1 — travel) ──────────────────────────────────────────────
  {
    id: 'hk-2023',
    year: '2023',
    yearNum: 2023,
    label: 'Hong Kong',
    sublabel: 'Lulu meets great-grandparents — family visit',
    flags: ['hk'],
    lane: 'travel',
    type: 'travel',
    note: "First trip for Lulu. Visit to Jeanie's mother.",
  },

  // ── TECH CAREER (Row 2 — career) ──────────────────────────────────────────
  {
    id: 'resigned-pharmacy',
    year: 'Late 2024',
    yearNum: 2024,
    yearEnd: 2024,
    label: 'Resigned — Chemist Warehouse',
    sublabel: 'Career change to technology',
    flags: ['au'],
    lane: 'career',
    type: 'career',
  },
  {
    id: 'strongroom',
    year: 'Jan–Apr 2025',
    yearNum: 2025,
    yearEnd: 2025,
    label: 'Technical Support — Strongroom.ai',
    sublabel: 'Company entered administration — made redundant',
    flags: ['au'],
    lane: 'career',
    type: 'career',
  },
  {
    id: 'cititec',
    year: 'Feb 2026–',
    yearNum: 2026,
    yearEnd: 2026,
    label: 'Helpdesk Support — Cititec',
    sublabel: 'Current role — MSP, Melbourne',
    flags: ['au'],
    lane: 'career',
    type: 'career',
    current: true,
  },
]

// ── NZ VISITS — Row 4 ─────────────────────────────────────────────────────────
export const nzVisits = [
  {
    id: 'nz-childhood',
    yearStart: 1986,
    yearEnd:   2007,
    year: '1986–2007',
    label: 'Christchurch — childhood home',
    sublabel: 'Born and raised — family home',
    flags: ['nz'],
    note: "Primary residence until moving to Wellington for university. Parents' address.",
    preBreak: true,   // rendered differently — spans the discontinuity
  },
  {
    id: 'nz-study-visits',
    yearStart: 2008,
    yearEnd:   2013,
    year: '~2008–13',
    label: 'Christchurch — family visits',
    sublabel: 'During Wellington & post-study years',
    flags: ['nz'],
    note: 'Regular visits to parents during university and early career. Exact trips to confirm with parents / passport stamps.',
  },
  {
    id: 'nz-wedding',
    yearStart: 2016,
    yearEnd:   2016,
    year: '~2016',
    label: 'Auckland',
    sublabel: "Friend's wedding",
    flags: ['nz'],
    note: 'Approximate year — to confirm.',
  },
  {
    id: 'nz-post-aus',
    yearStart: 2014,
    yearEnd:   2026,
    year: '2014–present',
    label: 'Christchurch — ongoing visits',
    sublabel: 'Regular family visits — parents & siblings',
    flags: ['nz'],
    note: 'Multiple trips. Specific dates to gather from passport stamps and bank records.',
  },
]

// ── ADDRESS HISTORY — Row 3 ───────────────────────────────────────────────────
// yearStart / yearEnd used to render proportional bars on the spine axis
export const addressHistory = [
  {
    id: 'addr-christchurch-parents',
    yearStart: 1986,
    yearEnd:   2007,
    period: '1986 – 2007',
    address: "Parents' address — Christchurch, NZ",
    type: 'Family home',
    flags: ['nz'],
    status: 'approximate',
    note: "Confirm exact street address with parents. Statutory declaration acceptable for proof.",
    preBreak: true,
  },
  {
    id: 'addr-wellington',
    yearStart: 2008,
    yearEnd:   2013,
    period: '2008 – 2013',
    address: 'Multiple addresses — Wellington, NZ',
    type: 'Student / flatting',
    flags: ['nz'],
    status: 'needed',
    note: 'At least 4 separate addresses during BSc, MSc, and lab work years. Gather from memory, VUW records, old tenancy agreements. Statutory declaration as fallback.',
  },
  {
    id: 'addr-christchurch-return',
    yearStart: 2012,
    yearEnd:   2013,
    period: '~2012 – 2013',
    address: "Parents' address — Christchurch, NZ",
    type: 'Family home (return)',
    flags: ['nz'],
    status: 'approximate',
    note: 'Returned to parents before Australia move. Overlaps with Wellington — confirm exact transition date.',
  },
  {
    id: 'addr-melbourne-student',
    yearStart: 2013,
    yearEnd:   2017,
    period: '2013 – 2017',
    address: 'Student / rental — Melbourne, VIC',
    type: 'Student / rental',
    flags: ['au'],
    status: 'needed',
    note: 'Melbourne addresses during Monash years. Utility bills, lease agreements, or bank statements.',
  },
  {
    id: 'addr-melbourne-rental',
    yearStart: 2017,
    yearEnd:   2022,
    period: '2017 – 2022',
    address: 'Rental address(es) — Melbourne, VIC',
    type: 'Rental',
    flags: ['au'],
    status: 'needed',
    note: 'Between graduating pharmacy and purchasing apartment. Lease agreements and bank statements likely available.',
  },
  {
    id: 'addr-southbank',
    yearStart: 2022,
    yearEnd:   2026,
    period: '2022 – present',
    address: 'Southbank, Melbourne VIC',
    type: 'Owner-occupied',
    flags: ['au'],
    status: 'confirmed',
    note: 'Joint ownership with Jeanie. Mortgage documents, rates notices, bank statements — fully documented.',
  },
]

// ── TYPE COLOURS ──────────────────────────────────────────────────────────────
export const typeConfig = {
  travel:    { colour: '#38bdf8', label: 'International travel' },
  nz:        { colour: '#34d399', label: 'New Zealand' },
  life:      { colour: '#a78bfa', label: 'Life event' },
  education: { colour: '#c084fc', label: 'Education' },
  career:    { colour: '#f97316', label: 'Career' },
  financial: { colour: '#fbbf24', label: 'Financial' },
}

export const addressStatusConfig = {
  confirmed:   { colour: '#34d399', label: 'Confirmed',   bg: 'bg-emerald-950/40', border: 'border-emerald-800/60', text: 'text-emerald-300' },
  approximate: { colour: '#fbbf24', label: 'Approximate', bg: 'bg-amber-950/40',   border: 'border-amber-800/60',   text: 'text-amber-300' },
  needed:      { colour: '#f87171', label: 'Needed',      bg: 'bg-red-950/40',     border: 'border-red-900/60',     text: 'text-red-300' },
}
