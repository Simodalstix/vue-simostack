// src/data/dwelling/facts.js
//
// Source of truth for market, scheme and transport facts used by /dwelling.
// Presentation-agnostic. Every figure is dated. VERIFY before acting —
// medians are indicative, schemes change, and none of this is financial advice.

export const AS_AT = 'July 2026'

export const marketFacts = [
  {
    id: 'median-dwelling',
    label: 'Melbourne median dwelling value',
    value: '~$813k',
    detail:
      'Cotality, May 2026. Down -2.3% over the quarter, +0.5% over the year — the softest capital city. Values still ~3% below the March 2022 peak.',
  },
  {
    id: 'median-unit',
    label: 'Melbourne median unit/apartment',
    value: '~$580–635k',
    detail:
      'Range across Domain/Cotality/PropTrack measures, early–mid 2026. Older walk-ups and villa units in the west and north sit well below this.',
  },
  {
    id: 'buyers-window',
    label: 'Market position',
    value: 'Soft / buyer-favourable',
    detail:
      'Melbourne has underperformed every other capital for 5 years. Bank forecasts for 2026 range from -1.7% to +6%. For an owner-occupier optimising security over growth, a soft market is a feature, not a bug.',
  },
  {
    id: 'metro-tunnel',
    label: 'Metro Tunnel',
    value: 'Open (from early 2026)',
    detail:
      'Sunbury line and Cranbourne/Pakenham lines now run through Arden, Parkville, State Library, Town Hall and Anzac. Town Hall exits at Swanston/Collins — a one-seat ride to mid-Collins St from the west (Footscray, Sunshine, St Albans) and south-east (Clayton, Springvale, Noble Park, Dandenong). This quietly re-rated commute quality for whole corridors.',
  },
  {
    id: 'rates',
    label: 'Interest rates',
    value: 'Cash ~3.60–3.85%',
    detail:
      'RBA path uncertain mid-2026 (commentary splits between a cut and a hike). Owner-occupier P&I variable roughly 5.5–6.0%. Repayment modelling here defaults to 5.9% — stress-test at +2%.',
  },
]

export const schemes = [
  {
    id: 'fhb-duty',
    name: 'FHB stamp duty exemption/concession (VIC)',
    headline: '$0 duty ≤ $600k, sliding concession to $750k',
    detail:
      'Unchanged since 1 July 2017. On a $600k purchase this saves ~$31k. One dollar over $600k and duty jumps sharply — the threshold is a hard design constraint worth building the whole strategy around. Must live in 12 months within 12 months of settlement. Confirmed continuing in the 2026-27 State Budget (5 May 2026).',
    verified: 'SRO Vic, updated May–July 2026',
  },
  {
    id: 'fhog',
    name: 'First Home Owner Grant (VIC)',
    headline: '$10k, new homes ≤ $750k only',
    detail:
      'New builds / off-the-plan / substantial renovations only — not established homes. Unchanged in the 2026-27 Budget.',
    verified: 'SRO Vic / 2026-27 Budget, May 2026',
  },
  {
    id: 'otp',
    name: 'Temporary off-the-plan duty concession (VIC)',
    headline: 'Construction costs excluded from dutiable value — any buyer, any price',
    detail:
      'Strata apartments/units/townhouses with common property, contracts 21 Oct 2024 – 20 Oct 2026; the 2026-27 Budget extended it to 20 April 2027 (subject to legislation — confirm before relying on the extension). Stacks with the FHB exemption: a nominal ~$700k OTP apartment can land under the $600k dutiable threshold → $0 duty. Roughly a $28k saving on a $620k apartment bought pre-construction.',
    verified: 'vic.gov.au / SRO, May 2026',
  },
  {
    id: 'fhbg',
    name: 'Australian Government 5% Deposit Scheme (First Home Guarantee)',
    headline: '5% deposit, no LMI, no income cap, Melbourne cap $950k',
    detail:
      'Expanded 1 Oct 2025: income caps and place limits removed. Government guarantees the gap to 20%, so no LMI (~$25–30k saved on a $700k purchase at 95% LVR). Owner-occupier only. 10-year lookback on prior ownership. Caution: 95% LVR conflicts with a fast-payoff goal — more useful as an early-entry lever than a debt-minimisation one.',
    verified: 'Housing Australia, 2026',
  },
  {
    id: 'htb',
    name: 'Help to Buy (shared equity)',
    headline: '2% deposit, govt takes up to 30% equity',
    detail:
      'Income cap $100k single. Melbourne cap $950k. Conflicts directly with your goal of owning outright fast — the government holds equity you later buy back. Listed for completeness; probably reject.',
    verified: 'firsthomebuyers.gov.au, 2026',
  },
  {
    id: 'fhss',
    name: 'First Home Super Saver',
    headline: 'Up to $50k of voluntary super contributions released for a deposit',
    detail:
      'Contributions taxed at 15% instead of your marginal rate. Worth running the numbers during any save-up phase.',
    verified: 'ATO, 2026',
  },
  {
    id: 'ssd',
    name: 'Small second dwelling (VIC planning)',
    headline: '<60 m² second dwelling — no planning permit (conditions apply)',
    detail:
      'Since Dec 2023, a small second dwelling under 60 m² on a lot with an existing home generally needs no planning permit (building permit still required; overlays, easements and setbacks can bite). This is what makes "modest house now, garden studio later" a real expansion path.',
    verified: 'DTP Victoria — re-verify current rules before designing around it',
  },
]

// Non-negotiables distilled from the brief.
export const nonNegotiables = [
  'Metropolitan Melbourne only',
  'Public-transport commute to Collins St — Acceptable (≤65 min) or better, Good (≤50) preferred',
  'A real second bedroom, or a credible path to one (co-parenting is not negotiable-away)',
  'Debt sized for a 10–15 year payoff, not 30',
  'Low recurring costs — owners-corp fees are a permanent rent on your own home',
  'Private, acoustically separated work area with reliable internet',
  'Walkable daily needs; one small car at most, used occasionally',
]

export const collinsStSections = [
  {
    section: 'Western (Spencer–William)',
    access:
      'Southern Cross on the doorstep. Favours Werribee, Williamstown, Sunbury-line and V/Line corridors. Trams 11/12/48/109 along Collins.',
  },
  {
    section: 'Central (William–Swanston)',
    access:
      'Town Hall station (Metro Tunnel) exits at Swanston/Collins — one-seat rides from Sunbury and Cranbourne/Pakenham lines. Flinders St 5 min walk. Best-served block in the city.',
  },
  {
    section: 'Eastern (Swanston–Spring)',
    access:
      'Parliament (city loop) closest — favours Hurstbridge/Mernda and loop-running services. Collins trams cover the last leg from either station.',
  },
]

export const commuteBands = [
  { band: 'Excellent', range: '< 35 min door-to-door' },
  { band: 'Good', range: '35–50 min' },
  { band: 'Acceptable', range: '50–65 min' },
  { band: 'Difficult', range: '> 65 min or fragile transfers' },
]

export const parkingTypes = [
  {
    type: 'Titled car space',
    note: 'On your title. Adds ~$40–90k inner-city to price. Best resale and finance treatment.',
  },
  {
    type: 'Separate-title space',
    note: 'Can sometimes be sold/rented independently — flexibility, but check OC rules and lending treatment.',
  },
  {
    type: 'Car stacker',
    note: 'Mechanical plant = OC maintenance liability + breakdown risk + height/size limits. Discount heavily.',
  },
  {
    type: 'Tandem',
    note: 'Fine for one car + bikes. Annoying for two. Priced between none and single titled.',
  },
  {
    type: 'Permit street parking',
    note: 'Check council permit eligibility BEFORE buying — many new inner-city developments are permit-excluded by planning condition.',
  },
  {
    type: 'No parking',
    note: 'Typically $30–70k cheaper. Viable inner-city with car-share; verify a small car could still be street-parked legally for Lulu logistics.',
  },
]

export const transportCosts = [
  {
    item: 'Myki commuting (Zone 1+2, capped)',
    cost: '≈ $2,400–2,700 / yr',
    note: 'Daily/weekly caps; ~$220/month worst case at Jan 2026 fares.',
  },
  {
    item: 'One small car, kept & used occasionally',
    cost: '≈ $6,000–9,000 / yr',
    note: 'Rego + insurance + servicing + fuel + depreciation on a used small car. Halves if genuinely occasional-use and bought outright.',
  },
  {
    item: 'Car-share instead of owning',
    cost: '≈ $1,500–4,000 / yr',
    note: 'At ~$12–17/hr, occasional use. Breaks even vs ownership below roughly 2 uses/week. Coverage is good inner-north/west, thin past the middle ring.',
  },
  {
    item: 'Daily CBD driving (the anti-goal)',
    cost: '$12,000–20,000+ / yr',
    note: 'CBD parking $300–600/mo alone, plus CityLink tolls up to ~$12/trip. This is the cost the whole strategy avoids.',
  },
  {
    item: 'E-bike / cargo bike',
    cost: '$2–6k once, ~$200/yr',
    note: 'Replaces most sub-8km trips. Needs secure storage — a real dwelling-selection criterion, not an afterthought.',
  },
]

// Owner's live position. This is the personal reality the whole tool serves:
// a new AWS role, a marriage ending into co-parenting, and a modest budget.
// Indicative and dated. Update as the settlement, sign-on and role start land.
// Not financial, legal or credit advice. Feeds the Overview "Your position"
// panel and seeds the Money tab calculator (calc), so it stays single-source.
export const personalPosition = {
  asAt: AS_AT,
  figures: [
    {
      label: 'New role',
      value: 'Systems Engineer · AWS',
      detail:
        'Starts in about 2.5 months, around October 2026. Positive Vetting clearance is in progress and required before you can commence. This housing plan and the /clearance PV prep are two halves of the same transition.',
    },
    {
      label: 'Income',
      value: '$100k + $20k sign-on',
      detail:
        'Base $100k is roughly $77k take-home, about $6,400 a month. The $20k sign-on lands near your start date and is taxable, so about $13k to $14k net as a one-off.',
    },
    {
      label: 'Liquid now',
      value: '~$10k',
      detail: 'Cash on hand today, before the settlement and the sign-on bonus.',
    },
    {
      label: 'Deposit outlook',
      value: '~$80–95k',
      detail:
        'Your roughly half of the ~$145k Southbank equity (about $70k) once Jeanie buys out your share, plus the ~$10k liquid and the net sign-on. Timing clusters around your start date. Confirm the settlement figure before relying on it.',
    },
    {
      label: 'Current home',
      value: 'Southbank · ~$400k, $255k owing',
      detail:
        'Jeanie keeps the apartment and refinances it into her name, buying out your share. You exit the mortgage and rehouse separately, ideally close by.',
    },
    {
      label: 'Indicative borrowing',
      value: '~$400k, order of magnitude',
      detail:
        'A rough guide on a $100k single income with part-time care of one child, assessed near 8 to 9 percent. A broker gives you the real figure. Treat this as a placeholder, not a promise.',
    },
  ],
  assumptions: [
    'Co-parenting Lulu on a shared, proportional contribution between households rather than expensive paid childcare.',
    'Jeanie stays secure in the Southbank apartment. You rehouse nearby on a one-seat ride to Collins St.',
    'A fuller, shared financial effort across both households where it is logical and fair.',
  ],
  eligibilityFlag:
    'You currently co-own, so the standard first-home concessions (the $0 duty FHB exemption and the FHOG) most likely do not apply to your next purchase. The single-parent Family Home Guarantee, at a 2 percent deposit and open to previous owners, is the path that fits. The Incentive stack on the Money tab is not yet re-baselined for this, so verify eligibility before counting any of it.',
  // Seeds the Money tab repayment model.
  calc: { deposit: 85000, targetPrice: 485000, loan: 400000, rate: 5.9, netMonthly: 6400 },
}
