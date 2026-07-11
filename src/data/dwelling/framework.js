// src/data/dwelling/framework.js
//
// Weighted decision framework + the process artifacts (info gaps, questions
// for professionals, research plan). Presentation-agnostic.

// Criteria keys map 1:1 to strategies[].scores. Default weights reflect the
// brief's stated values (security/payoff/commute over growth); the Rank tab
// lets Simon override them live. Weights are 0–10.
export const criteria = [
  {
    key: 'cost',
    label: 'Total acquisition cost',
    weight: 8,
    hint: 'Price + duty + costs. Lower cost scores higher.',
  },
  {
    key: 'payoff',
    label: 'Time to repay',
    weight: 9,
    hint: 'How fast the debt realistically dies.',
  },
  {
    key: 'commute',
    label: 'Collins St commute',
    weight: 8,
    hint: 'Door-to-door PT quality, frequency, resilience.',
  },
  {
    key: 'ongoing',
    label: 'Ongoing annual costs',
    weight: 7,
    hint: 'OC fees, rates, insurance, maintenance, transport.',
  },
  {
    key: 'coParenting',
    label: 'Co-parenting suitability',
    weight: 8,
    hint: 'Real room for Lulu, schools, custody logistics.',
  },
  {
    key: 'privacyWfh',
    label: 'Privacy / work-from-home',
    weight: 6,
    hint: 'Acoustic separation, secure work area, connectivity.',
  },
  {
    key: 'outdoor',
    label: 'Outdoor space',
    weight: 5,
    hint: 'Garden, courtyard, usable balcony, trees.',
  },
  {
    key: 'flexibility',
    label: 'Flexibility / adaptability',
    weight: 5,
    hint: 'Partner future, reconfiguration, expansion.',
  },
  {
    key: 'financeability',
    label: 'Financeability',
    weight: 6,
    hint: 'Mainstream lending, no size/type restrictions.',
  },
  {
    key: 'resale',
    label: 'Resale liquidity',
    weight: 4,
    hint: 'Exit option — deliberately NOT growth-weighted.',
  },
]

export const infoNeeded = [
  {
    q: 'Deposit available today (and FHSS potential)?',
    why: 'Sets the LVR and whether the 5% Deposit Scheme matters at all.',
  },
  {
    q: 'Stable income figure to model serviceability?',
    why: 'Defines maximum sensible loan for a 10–15yr payoff, working back from repayment capacity — not from what a bank will lend.',
  },
  {
    q: 'First home buyer status (incl. any prior ownership by you or a partner)?',
    why: 'Gates the $0-duty exemption, FHOG and 5% scheme. A 10-year lookback applies to the federal scheme.',
  },
  {
    q: 'Where does/will the other parent live, and what is the custody rhythm?',
    why: 'The single biggest unresolved location constraint. Corridor choice should triangulate home ↔ school ↔ other parent.',
  },
  {
    q: 'Lulu’s age and school horizon?',
    why: 'Determines how soon school-zone anchoring matters and how large the "real room" needs to be.',
  },
  {
    q: 'Will Collins St stay 5 days onsite?',
    why: 'At 3 days/week, outer-rail strategies jump a full band; at 5 days, they sink.',
  },
  {
    q: 'Which end of Collins St?',
    why: 'West → Southern Cross corridors. Central → Metro Tunnel (Town Hall) corridors. East → Parliament/loop corridors.',
  },
  {
    q: 'Hard floor on outdoor space?',
    why: 'Separates strategy 2/12 (balcony) from 6/11/14 (courtyard/garden) cleanly.',
  },
]

export const professionalQuestions = [
  {
    who: 'Mortgage broker',
    items: [
      'Max loan for a 12-year payoff at my income with a 2% rate buffer — not max borrowing capacity?',
      'Lender treatment of <50 m² apartments, villa units on shared driveways, and the 5% Deposit Scheme panel?',
      'Offset vs redraw for aggressive extra repayments — fees and traps?',
    ],
  },
  {
    who: 'Buyer’s advocate (interview, don’t auto-hire)',
    items: [
      'Off-market villa-unit flow in Reservoir/Glenroy/Sunshine — do you actually see it?',
      'Fee structure: flat vs percentage (percentage misaligns with a modest-price brief)?',
    ],
  },
  {
    who: 'Conveyancer',
    items: [
      'Review OC minutes (3 yrs), sinking fund, special levies, insurance, and any cladding/defect orders before I offer?',
      'Owner-occupier %, short-stay presence, embedded network contracts in the building?',
      'For houses: overlays, easements, sewer alignment — would a <60 m² second dwelling be buildable?',
    ],
  },
  {
    who: 'Building inspector',
    items: [
      'For 60s–70s stock: stumps, wiring, roof, damp — priced remediation list, not just findings?',
      'For new/OTP: engage independently at PCI; what defect classes are appearing in this builder’s recent projects?',
    ],
  },
  {
    who: 'Council / owners corp',
    items: [
      'Resident parking permit eligibility for this address (many new developments are excluded)?',
      'Any structure plans, level-crossing works or rezonings that change the street in 5 years?',
    ],
  },
]

export const researchPlan = [
  {
    phase: '1 · Frame (now – 1 month)',
    steps: [
      'Answer the eight open questions above — especially deposit, FHB status, and the other parent’s corridor.',
      'Set weights on the Rank tab; confirm strategy 15 (or a specialist) actually tops your weighting.',
      'Broker pre-approval sized to the payoff target, not borrowing capacity.',
    ],
  },
  {
    phase: '2 · Corridor test (months 1–3)',
    steps: [
      'Do the real commute from Sunshine, Reservoir and Pascoe Vale at 8am on a wet Tuesday. Door to Collins St, timed.',
      'Walk each shortlist pocket at night and on Saturday morning; note supermarkets, parks, station path lighting.',
      'Track every 2BR villa/apartment sale ≤$620k in the three corridors for 8+ weeks — build your own price sense before trusting anyone’s.',
    ],
  },
  {
    phase: '3 · Hunt (months 3–9)',
    steps: [
      'Inspect weekly in the winning corridor; conveyancer reviews contracts BEFORE offers.',
      'Hard filters: 2 real bedrooms · <800m station · OC <$2.5k/yr · no stacker · permit-eligible parking OR titled space · internal ≥50 m².',
      'Bid to your number. A soft Melbourne market rewards the buyer who can walk away.',
    ],
  },
  {
    phase: '4 · Kill the debt (settlement +)',
    steps: [
      'Repayments set to the 10–12 year schedule from day one; surplus into offset.',
      'Re-run this framework if custody, partner, or the onsite requirement changes — the data files are built to be edited.',
    ],
  },
]

export const hiddenCostTraps = [
  {
    trap: 'High-rise "bargains" (Docklands/CBD studios)',
    reality:
      'Cheap entry, $6–12k/yr fees, cladding/defect tail-risk, lender restrictions, weak resale. The purchase price is the smallest number involved.',
  },
  {
    trap: 'Tiny homes / containers',
    reality:
      'The land under them costs more than a villa unit. Unmortgageable when not fixed; insurance and resale worse.',
  },
  {
    trap: 'Greenfield house-and-land "affordability"',
    reality:
      'Site costs, landscaping, fencing add $60–90k; then a compulsory second car ($8k+/yr) — the anti-goal, permanently.',
  },
  {
    trap: 'Car stackers',
    reality: 'A machine the OC must maintain forever, priced as if it were a car park.',
  },
  {
    trap: 'OTP pre-construction discounts',
    reality: 'Valuation shortfall at settlement is YOUR equity gap; sunset clauses cut both ways.',
  },
  {
    trap: 'Sub-$300k 1BR "deals" (e.g. Caulfield East -29% YoY)',
    reality:
      'Prices falling for structural reasons: lender floor-area limits, investor exodus, student-market monoculture.',
  },
]
