// src/data/clearance/timeline.js
//
// Source of truth for the /clearance life & career timeline.
// Carried across from Simon_Parker_PV_HistoryGO (authoritative PV history doc).
//
// Presentation-agnostic facts only: no colours, no styling. The TimelinePage
// component decides how to draw these. Three lanes are rendered from the three
// arrays below; a future docx/print view can read the same arrays.
//
// `start` / `end` are decimal years (month = year + month/12) so blocks can be
// placed proportionally on the axis. Pre-2002 starts are clamped at render time,
// not here. `kind: 'gap'` marks a documented period of no formal employment.

export const AXIS_START = 2002    // age 16 — PV requires full history from here
export const RELOCATION = 2014    // start of 2014 — relocated from NZ to Australia
export const PRESENT    = 2026.5  // mid-2026 — where current blocks end
export const AXIS_END   = 2027.5  // one year past present: breathing room on the
                                  // right for future AWS / AGSVA process signalling
export const BORN_YEAR  = 1986

export const education = [
  {
    id: 'edu-cashmere',
    label: 'Cashmere High School',
    sublabel: 'NCEA Levels 1 to 3 + University Entrance',
    location: 'Christchurch, NZ',
    dates: '2000 – 2004',
    start: 2000, end: 2004.92,
  },
  {
    id: 'edu-bsc',
    label: 'BSc Biomedical Science',
    sublabel: 'Victoria University of Wellington',
    location: 'Wellington, NZ',
    dates: '2006 – 2008',
    start: 2006, end: 2008.92,
  },
  {
    id: 'edu-msc',
    label: 'MSc (Biomedical Science)',
    sublabel: 'Victoria University of Wellington',
    location: 'Wellington, NZ',
    dates: '2009 – 2011',
    start: 2009, end: 2011.92,
  },
  {
    id: 'edu-bpharm',
    label: 'BPharm (Hons) + internship',
    sublabel: 'Monash University — Graduate Entry (2-year degree + internship year)',
    location: 'Melbourne, VIC',
    dates: '2014 – 2016',
    start: 2014, end: 2016.92,
  },
]

export const employment = [
  {
    id: 'job-hardings',
    label: "Harding's Pharmacy",
    sublabel: 'Pharmacy Delivery / Cleaning',
    location: 'Christchurch, NZ',
    dates: 'Feb 2002 – Apr 2004',
    start: 2002.08, end: 2004.25,
  },
  {
    id: 'job-newworld',
    label: 'St Martins New World',
    sublabel: 'Shelf Stacker / Customer Service',
    location: 'Christchurch, NZ',
    dates: 'Feb 2005 – Dec 2005',
    start: 2005.08, end: 2005.92,
  },
  {
    id: 'job-mcdonalds',
    label: "McDonald's, Sydenham",
    sublabel: 'Crew Member',
    location: 'Christchurch, NZ',
    dates: 'Nov 2007 – Feb 2008',
    start: 2007.83, end: 2008.08,
  },
  {
    id: 'job-gavinryan',
    label: 'Gavin Ryan Property Mgmt',
    sublabel: 'Horticultural Maintenance / Labourer',
    location: 'Christchurch, NZ',
    dates: 'Nov 2008 – Feb 2009',
    start: 2008.83, end: 2009.08,
  },
  {
    id: 'job-aotea',
    label: 'Aotea Pathology',
    sublabel: 'Medical Laboratory Assistant',
    location: 'Wellington, NZ',
    dates: 'Jun 2009 – Nov 2010',
    start: 2009.42, end: 2010.83,
  },
  {
    id: 'job-medlab',
    label: 'Medlab South',
    sublabel: 'Data Entry Technician',
    location: 'Christchurch, NZ',
    dates: '2011',
    start: 2011, end: 2012,
  },
  {
    id: 'job-annex',
    label: 'Annex Developments',
    sublabel: 'Painter / Labourer — The Tannery',
    location: 'Christchurch, NZ',
    dates: '2012 – 2014',
    start: 2012, end: 2014,
  },
  {
    id: 'job-chemistwarehouse',
    label: 'Chemist Warehouse',
    sublabel: 'Pharmacist (student → intern → registered → PIC)',
    location: 'Melbourne, VIC',
    dates: '2016 – Dec 2024',
    start: 2016, end: 2024.92,
  },
  {
    id: 'job-reflect',
    label: 'Reflect Recruit',
    sublabel: 'COVID Vaccinator (concurrent role)',
    location: 'Melbourne, VIC',
    dates: '2021 – 2022',
    start: 2021, end: 2022.92,
  },
  {
    id: 'job-strongroom',
    label: 'Strongroom.ai',
    sublabel: 'Customer Success & Technical Support',
    location: 'Melbourne, VIC',
    dates: 'Jan 2025 – Apr 2025',
    start: 2025, end: 2025.25,
  },
  {
    id: 'job-transition',
    label: 'Career transition',
    sublabel: 'Self-directed cloud/infra study (AWS, Azure, Linux, Terraform)',
    location: 'Melbourne, VIC',
    dates: 'Apr 2025 – Feb 2026',
    start: 2025.25, end: 2026.08,
    kind: 'gap',
  },
  {
    id: 'job-cititec',
    label: 'Cititec (MSP)',
    sublabel: 'Helpdesk Support Technician',
    location: 'Melbourne, VIC',
    dates: 'Feb 2026 – Present',
    start: 2026.08, end: PRESENT,
    current: true,
  },
]

export const addresses = [
  {
    id: 'addr-stmartins-1',
    label: 'St Martins',
    sublabel: '37 St Martins Road — family home (incl. Canterbury Uni year)',
    location: 'Christchurch, NZ',
    dates: '2002 – 2006',
    start: 2002, end: 2006,
  },
  {
    id: 'addr-willis',
    label: 'Te Aro (hall of residence)',
    sublabel: '237 Willis Street — first year, moved to Wellington for VUW',
    location: 'Wellington, NZ',
    dates: '2006 – 2007',
    start: 2006, end: 2007,
  },
  {
    id: 'addr-hanson',
    label: 'Mount Cook',
    sublabel: '33 Hanson Street',
    location: 'Wellington, NZ',
    dates: 'Jan 2007 – Dec 2008',
    start: 2007, end: 2008.92,
  },
  {
    id: 'addr-aurora',
    label: 'Kelburn',
    sublabel: '57 Aurora Terrace',
    location: 'Wellington, NZ',
    dates: 'Jan 2009 – Jan 2010',
    start: 2009, end: 2010,
  },
  {
    id: 'addr-holland',
    label: 'Te Aro',
    sublabel: '406/11 Holland Street',
    location: 'Wellington, NZ',
    dates: 'Jan 2010 – May 2011',
    start: 2010, end: 2011.42,
  },
  {
    id: 'addr-leitch',
    label: 'Beckenham',
    sublabel: '32 Leitch Street',
    location: 'Christchurch, NZ',
    dates: 'Jun 2011 – 2012',
    start: 2011.42, end: 2012.92,
  },
  {
    id: 'addr-stmartins-2',
    label: 'St Martins',
    sublabel: '37 St Martins Road',
    location: 'Christchurch, NZ',
    dates: '2013 – 2014',
    start: 2013, end: 2014,
  },
  {
    id: 'addr-percy',
    label: 'Brunswick',
    sublabel: '202/40 Percy Street',
    location: 'Melbourne, VIC',
    dates: 'Jan 2014 – Aug 2015',
    start: 2014, end: 2015.58,
  },
  {
    id: 'addr-alma',
    label: 'St Kilda',
    sublabel: '13/150 Alma Road',
    location: 'Melbourne, VIC',
    dates: 'Aug 2015 – Apr 2016',
    start: 2015.58, end: 2016.33,
  },
  {
    id: 'addr-bourke-1401',
    label: 'Melbourne CBD',
    sublabel: '1401/39 Bourke Street',
    location: 'Melbourne, VIC',
    dates: 'May 2016 – Apr 2018',
    start: 2016.33, end: 2018.25,
  },
  {
    id: 'addr-bourke-206',
    label: 'Melbourne CBD',
    sublabel: '206/39 Bourke Street',
    location: 'Melbourne, VIC',
    dates: 'Apr 2018 – Apr 2020',
    start: 2018.25, end: 2020.25,
  },
  {
    id: 'addr-southbank',
    label: 'Southbank',
    sublabel: '618/39 Coventry Street (owner-occupied)',
    location: 'Melbourne, VIC',
    dates: 'Apr 2020 – Present',
    start: 2020.25, end: PRESENT,
    current: true,
  },
]

// International travel — one entry per trip (grouped from individual flight legs
// in Simon_Parker_Travel_Timeline_updated). Rendered as small markers spanning
// each trip's date span. `status: 'cancelled'` = booked but not flown (COVID).
// Overseas trips (`region: 'overseas'`) carry richer fields — `countries`
// (name + ISO code for flags), `duration`, `companions`, `reason` — consumed by
// the rich info bubbles in TimelinePage. Trans-Tasman trips stay as plain markers.
export const travel = [
  {
    id: 'tr-kul-2011', label: 'Kuala Lumpur', route: 'CHC ↔ KUL', dates: 'Apr 2011',
    start: 2011.31, end: 2011.33, region: 'overseas',
    duration: '4 days', companions: 'with Melissa', reason: 'Holiday',
    countries: [{ name: 'Malaysia', code: 'my' }],
  },
  { id: 'tr-reloc-2014',  label: 'Relocation to Melbourne', route: 'CHC → MEL (one-way)',                dates: '15 Jan 2014',        start: 2014.04, end: 2014.06 },
  { id: 'tr-chc-2015jul', label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Jul 2015',           start: 2015.50, end: 2015.52 },
  { id: 'tr-nz-2015nov',  label: 'Wellington + Christchurch', route: 'MEL ↔ WLG ↔ CHC',                  dates: 'Nov 2015',           start: 2015.88, end: 2015.90 },
  { id: 'tr-chc-2017mar', label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Mar 2017',           start: 2017.17, end: 2017.19 },
  {
    id: 'tr-europe-2017', label: 'Europe + Hong Kong', route: 'MEL → BCN … CDG → HKG → MEL',
    dates: 'Aug – Oct 2017', start: 2017.64, end: 2017.76, region: 'overseas',
    duration: '~7 weeks', companions: 'with Jeanie', reason: 'Holiday',
    countries: [
      { name: 'Spain', code: 'es' },
      { name: 'France', code: 'fr' },
      { name: 'Greece', code: 'gr' },
      { name: 'Romania', code: 'ro' },
      { name: 'Netherlands', code: 'nl' },
      { name: 'Austria', code: 'at' },
      { name: 'Italy', code: 'it' },
      { name: 'Hong Kong', code: 'hk' },
      { name: 'Macau', code: 'mo' },
    ],
  },
  { id: 'tr-chc-2017dec', label: 'Christchurch (Christmas)', route: 'MEL ↔ CHC',                         dates: 'Dec 2017 – Jan 2018', start: 2017.97, end: 2018.02 },
  { id: 'tr-chc-2018nov', label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Nov 2018',           start: 2018.87, end: 2018.89 },
  {
    id: 'tr-japan-2019', label: 'Japan + Hong Kong', route: 'MEL ↔ HKG ↔ NRT (Tokyo)', dates: 'Apr 2019',
    start: 2019.25, end: 2019.30, region: 'overseas',
    duration: '~2 weeks', companions: 'with Jeanie', reason: 'Holiday · 5-day HK stopover',
    countries: [{ name: 'Japan', code: 'jp' }, { name: 'Hong Kong', code: 'hk' }],
  },
  { id: 'tr-chc-2020',    label: 'Christchurch (cancelled)', route: 'MEL ↔ CHC',                         dates: 'Apr 2020',           start: 2020.27, end: 2020.30, status: 'cancelled' },
  { id: 'tr-chc-2021',    label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Jul 2021',           start: 2021.54, end: 2021.57 },
  { id: 'tr-chc-2023apr', label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Apr 2023',           start: 2023.25, end: 2023.28 },
  { id: 'tr-chc-2023dec', label: 'Christchurch (Christmas)', route: 'MEL ↔ CHC',                         dates: 'Dec 2023 – Jan 2024', start: 2023.96, end: 2024.01 },
  { id: 'tr-chc-2024',    label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Oct – Nov 2024',     start: 2024.77, end: 2024.84 },
  { id: 'tr-chc-2025',    label: 'Christchurch',            route: 'MEL ↔ CHC',                          dates: 'Jun – Jul 2025',     start: 2025.48, end: 2025.52 },
]

// Travel marker hues by region. Trans-Tasman (routine MEL<->NZ family visits)
// stays cool; overseas trips run warm so the few notable ones stand out. Items
// without a `region` default to trans-Tasman.
export const travelRegions = {
  tasman:   { fill: '#41707F', border: '#5E96A6', label: 'Trans-Tasman' },
  overseas: { fill: '#C06B52', border: '#D98A72', label: 'Overseas' },
}

// Lane definitions — order top to bottom. Colours chosen to read on the #111418
// canvas at small sizes and to avoid the site's reserved amber/teal accents.
export const lanes = [
  {
    id: 'education',
    label: 'Education',
    items: education,
    fill: '#3F5C73',   // steel blue
    border: '#5B7C96',
  },
  {
    id: 'employment',
    label: 'Employment',
    items: employment,
    fill: '#6B5876',   // muted plum
    border: '#8C77A0',
  },
  {
    id: 'addresses',
    label: 'Addresses',
    items: addresses,
    fill: '#4C6B5A',   // muted forest
    border: '#6E957E',
  },
  {
    id: 'travel',
    label: 'Travel',
    items: travel,
    fill: '#41707F',   // muted sky / ocean
    border: '#5E96A6',
    markers: true,     // render small trip markers, not full-height blocks
    rowH: 24,
  },
]

export const BLOCK_TEXT = '#F5F2EC'
