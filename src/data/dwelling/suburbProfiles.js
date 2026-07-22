// src/data/dwelling/suburbProfiles.js
//
// Narrative copy for the expanded Settle suburb profile card,
// keyed by the areaCorridors record id. Presentation copy only: nothing here
// is scored, ranked or read by the ranking engine.
//
// Source mix:
// - original owner-supplied draft (2026-07-15) for the first shipped batch;
//   the reviewed copy below is now the canonical integrated record
// - the ten July 2026 expansion entries (Spotswood through Mentone) were
//   reviewed and integrated into the same canonical registry on 2026-07-19
// Expect wording to be edited over time.
//
// Fields per record:
//   lives    -> "How the suburb lives"  (1-2 sentences, suburb-level only)
//   housing  -> "Housing reality"        (what Domain browsing will show)
//   fit      -> "Household fit" bullets. tag: 'network' (gold), 'tradeoff'
//               (amber) or null (neutral).
//   decision -> "Decision summary" { bestFor, mainRisk, pursueWhen }
//
// A record with no entry here falls back to the older caseFor/caseAgainst
// copy in areaCorridors.js (see SuburbProfileCard.vue).
//
// Owner TODOs carried over from the draft:
// - Verify school-zone claims at findmyschool.vic.gov.au (zones shift yearly).
// (Sunbury/Tama profile drafted 2026-07-19 in the in-repo batch below.)

// Supplied as one combined 'Collingwood/Abbotsford' profile; both records share it.
const collingwoodAbbotsford = {
  lives:
    'Smith St’s energy, warehouse laneways and Yarra trail access, with Victoria Park station and route 86 covering transport. Diverse in the true sense — creatives, professionals and public-housing communities side by side.',
  housing:
    'Walk-ups, warehouse conversions and newer mid-rise. Genuine 2BRs with light and quiet exist but the good ones are known quantities at auction.',
  fit: [
    {
      text: 'St Vincent’s precinct close for Jeanie.',
      tag: null,
    },
    {
      text: 'Strong tram/train independence for Lulu later.',
      tag: null,
    },
    {
      text: 'Public secondary story is thinner than Richmond’s — MGC is out of reach here.',
      tag: 'tradeoff',
    },
  ],
  decision: {
    bestFor: 'Warehouse-and-laneway inner living with real transport.',
    mainRisk: 'The school gap versus near-identical money in Richmond.',
    pursueWhen: 'A warehouse conversion or quality walk-up 2BR undercuts Richmond pricing.',
  },
}

// Supplied as one combined 'Chelsea/Bonbeach' profile; both records share it.
const chelseaBonbeach = {
  lives:
    'Proper beach-town living on the Frankston line — sand at the end of the street, modest strips, unhurried pace, and real distance from the city.',
  housing:
    'Affordable houses and units with genuine beach proximity; stock is accessible and competition gentler than anywhere comparable.',
  fit: [
    {
      text: 'Cheapest beach-walk lifestyle on the list.',
      tag: null,
    },
    {
      text: 'Long commute and thin teen amenity beyond the beach.',
      tag: 'tradeoff',
    },
    {
      text: 'Frankston Hospital is the nearest major employer for Jeanie.',
      tag: null,
    },
  ],
  decision: {
    bestFor: 'Beach lifestyle at outer-suburb prices.',
    mainRisk: 'The commute compounding into resentment.',
    pursueWhen: 'Commute weighting drops and beach-street stock lists under budget.',
  },
}

export const suburbProfiles = {
  'melbourne-cbd-2br': {
    lives:
      'Maximum city access: jobs, universities, culture and late-night transport are downstairs rather than a commute away.',
    housing:
      'A deep apartment market spanning compact investor stock, older towers and larger owner-occupier buildings; floor plan, light, noise and owners-corporation health matter more than the postcode.',
    fit: [
      { text: 'The strongest car-free and teen-independent proposition in the set.', tag: null },
      { text: 'Little private outdoor space and uneven building quality.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'A genuinely urban household that values time and access over space.',
      mainRisk: 'Buying the wrong building in a market with many superficially similar apartments.',
      pursueWhen: 'A quiet, well-run building offers a real second bedroom and useful storage.',
    },
  },
  'east-melbourne-2br': {
    lives:
      'Leafy, quiet and immediately beside the CBD, with gardens, hospitals, sport and Parliament all walkable.',
    housing:
      'Scarce older apartments and premium low-rise stock sit beside a smaller number of towers; the postcode premium buys calm and proximity.',
    fit: [
      { text: 'Exceptional access to hospital work and central-city life.', tag: null },
      { text: 'Thin stock and premium pricing reduce bargaining power.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'CBD convenience without CBD intensity.',
      mainRisk: 'Overpaying for the address while compromising on the apartment itself.',
      pursueWhen:
        'An established two-bedroom has good light away from major roads and event noise.',
    },
  },
  'west-melbourne-2br': {
    lives:
      'A changing city-fringe neighbourhood linking the CBD, Queen Victoria Market, North Melbourne and the rail yards.',
    housing:
      'Warehouse conversions, small walk-ups and rapid apartment development coexist; construction exposure and street-by-street amenity vary sharply.',
    fit: [
      { text: 'Central access at a discount to the polished inner east.', tag: null },
      {
        text: 'Arden construction and traffic corridors can dominate the wrong address.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'City-fringe value with future precinct upside.',
      mainRisk: 'Buying next to prolonged construction or a hostile road edge.',
      pursueWhen: 'A settled side-street building has a clear view of its future surroundings.',
    },
  },
  'docklands-2br': {
    lives:
      'Waterfront promenades, stadium access and free-tram CBD proximity, but a quieter and more corporate street life than older inner suburbs.',
    housing:
      'Apartment choice is abundant and negotiating leverage can be real; building defects, wind, orientation and high shared-facility costs separate good value from a trap.',
    fit: [
      { text: 'Excellent city access and strong apartment value for the location.', tag: null },
      {
        text: 'School, street-life and building-quality stories are highly address-specific.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Waterfront apartment living with a short CBD commute.',
      mainRisk: 'High owners-corporation costs or a compromised tower erasing the price advantage.',
      pursueWhen: 'A proven building offers sun, wind protection and conservative fees.',
    },
  },
  'carlton-2br': {
    lives:
      'University, hospital and Lygon Street life within walking distance of the CBD, with strong trams and major parks close by.',
    housing:
      'The headline unit median is distorted by studios and student stock; a credible family two-bedroom is a distinct, more expensive product.',
    fit: [
      { text: 'Outstanding education, hospital and cultural access.', tag: null },
      {
        text: 'Student-oriented stock makes median-price comparisons unreliable.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Car-light university-precinct living with city access.',
      mainRisk: 'Mistaking investor accommodation pricing for the cost of a liveable two-bedroom.',
      pursueWhen: 'An owner-occupier floor plan appears away from nightlife and arterial noise.',
    },
  },
  'fitzroy-2br': {
    lives:
      'Dense, creative and walkable, with Brunswick and Smith streets, trams and the CBD all close enough to make the car optional.',
    housing:
      'Warehouse conversions, Victorian fabric and boutique apartments are attractive but scarce; noise and design quality are intensely site-specific.',
    fit: [
      { text: 'One of the strongest adult-life and low-car neighbourhoods.', tag: null },
      {
        text: 'A high lifestyle premium buys less space and little quiet by default.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Walkable inner-city life with genuine neighbourhood character.',
      mainRisk: 'Paying a lifestyle premium for a noisy or compromised apartment.',
      pursueWhen:
        'A quiet-edge warehouse or boutique two-bedroom has strong light and ventilation.',
    },
  },
  'parkville-2br': {
    lives:
      'University, hospital, Royal Park and the new Metro Tunnel define a calm institutional precinct immediately north of the city.',
    housing:
      'Apartment supply is limited and heterogeneous, from older blocks to student-heavy buildings; true family-scale two-bedrooms are not the median product.',
    fit: [
      { text: 'Elite hospital, university, park and city access.', tag: null },
      {
        text: 'Thin owner-occupier stock makes the search slower than the median suggests.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A quiet green base tied closely to hospitals and the CBD.',
      mainRisk: 'Relying on a unit median shaped by smaller or student-oriented stock.',
      pursueWhen: 'An established full-size apartment appears near the park or Metro station.',
    },
  },
  'carlton-north-2br': {
    lives:
      'Village-like Rathdowne and Nicholson Street living, with Princes Park, trams and cycling routes compensating for the absence of rail.',
    housing:
      'Apartments are scarcer than terraces and the good low-rise stock carries a family-neighbourhood premium.',
    fit: [
      { text: 'Strong parks, schools and everyday family amenity close to the city.', tag: null },
      { text: 'No station means tram reliability matters every day.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Inner-north family life without giving up city proximity.',
      mainRisk: 'Paying near-house-location money for thin apartment choice and tram dependence.',
      pursueWhen: 'A quiet low-rise two-bedroom appears near Princes Park or a frequent tram.',
    },
  },
  'fitzroy-north-2br': {
    lives:
      'Edinburgh Gardens, village strips and dense tram and cycling links create a softer family version of Fitzroy.',
    housing:
      'Older walk-ups and boutique apartments are limited and keenly held; arterial edges are much less appealing than the garden-side streets.',
    fit: [
      { text: 'Excellent park access and strong independent neighbourhood life.', tag: null },
      { text: 'No heavy rail and scarce quality stock weaken the value case.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Park-led inner-north family life with character.',
      mainRisk: 'Compromising on noise or apartment quality just to secure the suburb.',
      pursueWhen: 'A proven walk-up lists off the main roads within easy reach of the gardens.',
    },
  },
  'brunswick-east-2br': {
    lives:
      'Food, trams, cycling and Merri Creek access give it an energetic but more affordable inner-north proposition.',
    housing:
      'There is meaningful two-bedroom supply, though main-road investor buildings vary widely in noise, ventilation, defects and owners-corporation burden.',
    fit: [
      { text: 'The strongest value step-down among these close-in northern suburbs.', tag: null },
      {
        text: 'Tram-only commuting and uneven apartment quality require careful selection.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Inner-north amenity at a more achievable apartment price.',
      mainRisk: 'A poor corridor building erasing both comfort and resale appeal.',
      pursueWhen:
        'An established quiet-side two-bedroom has good natural light and conservative fees.',
    },
  },
  // 'Footscray'
  'footscray-station-2br': {
    lives:
      'Dense, loud and genuinely urban — a major rail junction (Sunbury, Werribee, Williamstown lines plus V/Line) with a market, Vietnamese and East African food strips, and everything walkable. Gritty around the station; softens fast toward Seddon.',
    housing:
      'Older walk-ups, new towers around the station precinct, and Victorian cottages on the fringes. 2BR apartment supply is strong and comparatively cheap; quiet positions away from Hopkins St and the rail corridor are the scarce commodity.',
    fit: [
      {
        text: 'New Footscray Hospital on the doorstep — strong pharmacy/hospital employment for Jeanie.',
        tag: null,
      },
      {
        text: 'Excellent rail redundancy gives Lulu real teen independence.',
        tag: null,
      },
      {
        text: 'Footscray High (multi-campus) is a credible public secondary story.',
        tag: null,
      },
      {
        text: 'Street-level grit is the main lived compromise.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Maximum transport and amenity per dollar in the inner ring.',
      mainRisk: 'Buying into noise or a charmless tower because the price looked right.',
      pursueWhen:
        'A low-rise 2BR on a quiet street west or south of the core appears under budget.',
    },
  },

  // 'Seddon/West Footscray'
  'seddon-westfootscray-villa': {
    lives:
      'Village-scale inner west — quiet weatherboard streets around small strips (Charles St, Victoria St), with Footscray’s amenity a walk away rather than outside the window. Calm, family-heavy, steadily gentrified.',
    housing:
      'Mostly period weatherboards with scattered villa units and small walk-up pockets. Suitable 2BR apartment stock is thin; villa units and small houses are the realistic targets and they move quickly.',
    fit: [
      {
        text: 'Footscray High Pilgrim campus and solid primaries in walking range.',
        tag: null,
      },
      {
        text: 'Two rail lines within reach — good redundancy without living on top of them.',
        tag: null,
      },
      {
        text: 'Footscray/Sunshine hospital corridor is close for Jeanie.',
        tag: null,
      },
      {
        text: 'Limited apartment stock means fewer candidate listings per month.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Quiet family streets with inner-west amenity one suburb over.',
      mainRisk: 'Waiting months for the right stock in a thin market.',
      pursueWhen:
        'A villa unit or small house with usable outdoor space lists at 2BR-apartment money.',
    },
  },

  // 'Sunshine'
  'sunshine-station-2br': {
    lives:
      'A working suburb mid-transformation — huge rail junction (Sunbury line, V/Line, future airport rail), big flat blocks, multicultural food, and rough edges around the station core that thin out into ordinary quiet streets.',
    housing:
      'Houses on full blocks at prices the inner ring can’t touch, plus villa units and a growing apartment pipeline near the station. Stock is plentiful; the sorting problem is street quality, not supply.',
    fit: [
      {
        text: 'Joan Kirner / Sunshine Hospital precinct — major employer for Jeanie.',
        tag: null,
      },
      {
        text: 'House and 3BR strategies both work here on real budgets.',
        tag: null,
      },
      {
        text: 'Public school strength is the weak pillar — plan around it.',
        tag: 'tradeoff',
      },
      {
        text: 'Station-core streets vary sharply; walk them at night before committing.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Space and a genuine block without giving up rail.',
      mainRisk: 'Underestimating the school compromise for Lulu’s secondary years.',
      pursueWhen:
        'A solid house on a quiet street near the station lists at land-value-plus-a-bit.',
    },
  },

  // 'St Albans'
  'established-western-value': {
    lives:
      'Melbourne’s cheapest credible rail suburb — strongly Vietnamese, practical rather than pretty, with the hospital precinct and Sunbury line anchoring daily life. Little strip culture; life happens at home and at the shops.',
    housing:
      'Post-war houses on big blocks dominate, with villa units common. Almost everything is affordable; almost nothing is charming. Renovation-ready stock is the norm.',
    fit: [
      {
        text: 'Joan Kirner Women’s & Children’s literally in the suburb — shortest possible commute for Jeanie if she works there.',
        tag: null,
      },
      {
        text: 'Strong house and expandable-home economics.',
        tag: null,
      },
      {
        text: 'Weak school and teen-amenity story for Lulu.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Maximum land and lowest debt on a rail line.',
      mainRisk: 'Solving money and creating a lifestyle/schools problem.',
      pursueWhen:
        'Buying power is the binding constraint and the hospital employment link is real.',
    },
  },

  // 'Kensington/Flemington'
  'inner-lowcar-benchmark': {
    lives:
      'A genuine village pocket hiding ten minutes from the CBD — quiet cottage streets, small strips, racecourse and river parkland, with the Craigieburn line and trams giving multiple ways in. Flemington adds density and diversity around the estate.',
    housing:
      'Workers’ cottages and small period homes dominate; low-rise 2BR apartments exist but are contested. Villa units are rare. Anything quiet and renovated goes fast.',
    fit: [
      {
        text: 'Parkville hospital precinct (RMH, Royal Women’s, RCH) one stop away — the best pharmacy-employment access on the list.',
        tag: null,
      },
      {
        text: 'Mount Alexander College is the local secondary; Lulu gets real tram/train independence.',
        tag: null,
      },
      {
        text: 'Small suburb — thin listing flow.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Inner-city convenience with a small-town feel.',
      mainRisk: 'Paying a village premium for a compromised floorplan.',
      pursueWhen:
        'A quiet-street 2BR with a real second bedroom appears — they’re rare, so move fast.',
    },
  },

  // 'Brunswick/Coburg'
  'upfield-corridor': {
    lives:
      'Sydney Rd’s long spine of cafes, music and multicultural retail, with the Upfield line and route 19 tram running the length of it. Busy and social on the strips, calm one street back; Coburg is the quieter, more family-weighted end.',
    housing:
      'Period homes are fiercely contested; the realistic stock is walk-ups, newer Sydney Rd apartments, and villa units toward Coburg. Good low-rise 2BRs exist but attract exactly your competition.',
    fit: [
      {
        text: 'Brunswick SC and Coburg High both credible and improving.',
        tag: null,
      },
      {
        text: 'Tram+train redundancy means Lulu never needs a lift.',
        tag: null,
      },
      {
        text: 'Parkville precinct is a short tram for Jeanie.',
        tag: null,
      },
      {
        text: 'Popularity premium — you pay for the postcode’s reputation.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Strip life, transport redundancy and a solid school story in one package.',
      mainRisk: 'Overpaying in auctions driven by buyers wanting exactly what you want.',
      pursueWhen:
        'A quiet-street low-rise 2BR or Coburg villa unit lists off the main-road corridors.',
    },
  },

  // 'Pascoe Vale/Glenroy'
  'northwest-villa-corridor': {
    lives:
      'Ordinary, quiet, functional north — Craigieburn line, modest local shops, parks along the Moonee Ponds Creek. Little destination amenity; the appeal is calm streets and price.',
    housing:
      'Villa units are the signature stock and they’re abundant. Post-war houses on decent blocks fill the rest. Competition is milder than the inner north.',
    fit: [
      {
        text: 'Pascoe Vale Girls SC is a genuine public option for Lulu.',
        tag: null,
      },
      {
        text: 'Villa/Townhouse strategy money goes furthest here.',
        tag: null,
      },
      {
        text: 'Thin teen amenity — independence relies on the train, not the neighbourhood.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Villa-unit value on a direct rail line.',
      mainRisk: 'A lifestyle that feels flat during solo weeks.',
      pursueWhen: 'A renovated villa unit with a courtyard lists near the station.',
    },
  },

  // 'Reservoir'
  'northern-rail-value': {
    lives:
      'Big-sky north with full-size blocks, the Mernda line, and the Edwardes St strip slowly inheriting Preston’s spillover. Gentrifying but unhurried; quiet is the default.',
    housing:
      'Villa units everywhere, post-war houses on generous land, and early-stage townhouse development. Supply is genuinely good across unit and house stock.',
    fit: [
      {
        text: 'House and Villa/Townhouse strategies both price in comfortably.',
        tag: null,
      },
      {
        text: 'Northern Hospital (Epping) reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Local secondaries are the honest weak point.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Space per dollar with a rail line and upside.',
      mainRisk: 'The schools compromise arriving right as Lulu hits secondary.',
      pursueWhen: 'A villa unit or buildable block appears walkable to Reservoir station.',
    },
  },

  // 'Richmond'
  'inner-richmond-2br': {
    lives:
      'Dense and highly walkable with three stations and three tram corridors. Swan St and Bridge Rd are active and noisy; Victoria St adds the Vietnamese strip. Quieter residential pockets exist but street selection matters.',
    housing:
      'Older walk-ups, workers’ cottages and warehouse conversions, plus new builds bleeding in from Cremorne. Good low-rise 2BR stock exists; quiet positions with genuine second bedrooms attract strong competition.',
    fit: [
      {
        text: 'Melbourne Girls’ College is the standout public option for Lulu.',
        tag: null,
      },
      {
        text: 'Epworth Richmond and St Vincent’s both close for Jeanie.',
        tag: null,
      },
      {
        text: 'Nathan is one stop over the river.',
        tag: 'network',
      },
      {
        text: 'Location premium is real — you pay for the postcode before the dwelling.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Independent inner-city life with the best transport redundancy on the list.',
      mainRisk: 'Paying a large location premium for a compromised apartment.',
      pursueWhen: 'A quiet low-rise 2BR with a real second bedroom and manageable OC fees appears.',
    },
  },

  // 'Cremorne'
  'cremorne-2br': {
    lives:
      'A tiny tech-office pocket wedged between Swan St and the river — buzzing on weekdays, quiet at night, with Richmond’s full amenity a short walk away.',
    housing:
      'Very small residential stock: converted warehouses, new apartments and a handful of cottages. Listings are occasional rather than reliable.',
    fit: [
      {
        text: 'Shares Richmond’s school and hospital access, including MGC.',
        tag: null,
      },
      {
        text: 'Nathan nearby.',
        tag: 'network',
      },
      {
        text: 'Stock scarcity makes this a target of opportunity, not a plan.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A quiet river-pocket base with Richmond amenity.',
      mainRisk: 'Waiting indefinitely for stock that rarely lists.',
      pursueWhen: 'The rare liveable 2BR appears — treat it as a Richmond listing with a bonus.',
    },
  },

  // 'South Yarra'
  'inner-south-yarra-2br': {
    lives:
      'High-amenity and high-velocity — Chapel St and Toorak Rd, the river, the Tan, and a major interchange station. Polished, busy, and more anonymous than village-like.',
    housing:
      'Tower-heavy: the market is dominated by high-rise 1–2BRs with meaningful OC fees. Quality art deco and low-rise stock exists west of Chapel St but is fiercely priced.',
    fit: [
      {
        text: 'Nathan lives here — the strongest personal-network card on the board.',
        tag: 'network',
      },
      {
        text: 'The Alfred precinct a short tram for Jeanie.',
        tag: null,
      },
      {
        text: 'OC fees and tower stock are the structural trap for the budget.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Bachelor or 2BR strategies where lifestyle and Nathan proximity lead.',
      mainRisk: 'High fees and tower compromise eroding the all-in monthly figure.',
      pursueWhen: 'A low-rise art deco 2BR with sane OC fees lists — the unicorn, but it exists.',
    },
  },

  // 'Windsor/Prahran'
  'inner-windsor-prahran-2br': {
    lives:
      'Chapel St’s better half — walkable, social, slightly scruffier and warmer than South Yarra, with Prahran Market as the daily anchor and the Sandringham line running through.',
    housing:
      'Art deco and 60s–70s walk-ups dominate — exactly the low-rise 2BR hunting ground. Stock flow is decent; quiet streets off Chapel and Dandenong Rd are the filter.',
    fit: [
      {
        text: 'Prahran High (new vertical school) is a credible local secondary.',
        tag: null,
      },
      {
        text: 'The Alfred within walking/tram distance for Jeanie.',
        tag: null,
      },
      {
        text: 'Nathan is a short walk or one stop away.',
        tag: 'network',
      },
    ],
    decision: {
      bestFor: 'The best walk-up 2BR hunting on the south side, with network and hospital access.',
      mainRisk: 'Weekend noise bleed near Chapel St corners.',
      pursueWhen: 'A quiet-street art deco 2BR with a genuine second bedroom lists at fair money.',
    },
  },

  // 'St Kilda'
  'st-kilda-2br': {
    lives:
      'Beach, Acland and Fitzroy St strips, and a transient, anything-goes energy. Tram-rich but trainless; the 96 and 16 do the heavy lifting. Beautiful mornings, occasionally chaotic nights.',
    housing:
      'Art deco and walk-up heartland — 2BR supply is abundant and cheaper than its glamour suggests. Building quality and OC health vary widely.',
    fit: [
      {
        text: 'Beach-anchored solo weeks are the genuine draw.',
        tag: null,
      },
      {
        text: 'Elwood College is the realistic public secondary.',
        tag: null,
      },
      {
        text: 'No heavy rail — Collins St commute leans entirely on trams.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Beachside walk-up value with real strip life.',
      mainRisk: 'Tram-only commute wearing thin, and variable building stock.',
      pursueWhen: 'A quality art deco 2BR on a quiet street lists below inner-east money.',
    },
  },

  // 'Balaclava/St Kilda East'
  'balaclava-2br': {
    lives:
      'Carlisle St’s unpolished, functional strip with a strong established Jewish community, the Sandringham line at Balaclava, and the beach a ride away. Quieter and more residential than St Kilda proper.',
    housing:
      'Walk-ups and art deco blocks in volume, plus interwar houses further east. Similar stock to Windsor at a small discount.',
    fit: [
      {
        text: 'Direct Sandringham-line commute — better than St Kilda’s trams.',
        tag: null,
      },
      {
        text: 'The Alfred reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Less destination amenity than neighbours either side.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Walk-up value one notch cheaper than Windsor with a train.',
      mainRisk: 'Buying the discount and missing the amenity that made bayside appealing.',
      pursueWhen: 'A solid 2BR walk-up near Balaclava station undercuts Windsor comparables.',
    },
  },

  // 'Elwood'
  'elwood-2br': {
    lives:
      'Leafy, affluent, beach-village calm — canal paths, Ormond Rd’s small strip, and no train. Quietly family-heavy and genuinely lovely to walk.',
    housing:
      'Art deco apartments are the signature stock, alongside expensive houses. 2BR supply is real; prices carry a lifestyle premium.',
    fit: [
      {
        text: 'Elwood College and Elwood PS make a coherent local school story.',
        tag: null,
      },
      {
        text: 'Excellent recreation: beach, parks, safe streets.',
        tag: null,
      },
      {
        text: 'Tram-and-bus-only commute is the structural weakness.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Beach-village family life where commute is deprioritised.',
      mainRisk: 'Daily Collins St trip becoming the tax you pay forever.',
      pursueWhen: 'Commute weighting is toggled down and a deco 2BR appears at fair money.',
    },
  },

  // 'Carnegie/Oakleigh'
  'inner-se-apartment-corridor': {
    lives:
      'Two strong villages — Koornang Rd’s cafes and Oakleigh’s Greek Eaton Mall — on the Dandenong-line skyrail. Family-dense, food-rich, and quietly one of the best amenity-per-dollar zones in the south-east.',
    housing:
      'Villa units in volume plus post-war houses and newer apartments near stations. The Villa/Townhouse strategy’s natural habitat.',
    fit: [
      {
        text: 'Glen Eira College zone on the Carnegie side; strong primaries throughout.',
        tag: null,
      },
      {
        text: 'Monash Medical Centre corridor for Jeanie.',
        tag: null,
      },
      {
        text: 'Skyrail-adjacent streets need case-by-case noise judgement.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Villa-unit family living with genuine strip culture.',
      mainRisk: 'Paying Carnegie’s rising premium for stock Oakleigh sells cheaper.',
      pursueWhen: 'A courtyard villa unit walkable to either station and strip lists.',
    },
  },

  // 'Springvale/Noble Park'
  'se-value-corridor': {
    lives:
      'One of Melbourne’s great food destinations — Vietnamese and Cambodian anchored — on the Dandenong line, with practical, unpretentious streets around it.',
    housing:
      'Cheap houses and abundant villa units; among the lowest entry prices with a real station and strip.',
    fit: [
      {
        text: 'Monash Medical Centre and Dandenong Hospital both reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Value is exceptional for 3BR and villa strategies.',
        tag: null,
      },
      {
        text: 'School strength and teen amenity are the honest weak pillars.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Maximum family space near rail and remarkable food.',
      mainRisk: 'The schools compromise for Lulu’s secondary years.',
      pursueWhen: 'Budget pressure dominates and a solid house near the station lists.',
    },
  },

  // 'Moorabbin/Cheltenham'
  'frankston-middle-ring': {
    lives:
      'Functional bayside-adjacent south-east — Frankston line, Southland, and quiet streets that trade character for practicality. The beach is close without being present.',
    housing:
      'Villa units and post-war houses in steady supply; townhouse development active around stations.',
    fit: [
      {
        text: 'Cheltenham SC adequate; Mentone’s school cluster one stop away.',
        tag: null,
      },
      {
        text: 'Villa/Townhouse strategy prices well here.',
        tag: null,
      },
      {
        text: 'Amenity is errand-shaped, not lifestyle-shaped.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Practical villa-unit value on the Frankston line.',
      mainRisk: 'A suburb that works on paper but never delights.',
      pursueWhen: 'A renovated villa unit near Cheltenham station lists under Carnegie money.',
    },
  },

  // 'Tarneit/Wyndham Vale'
  'growth-corridor-stress-test': {
    lives:
      'New-estate west at scale — big new houses, young families, car-shaped daily life, and a crowded Geelong-line V/Line commute from stations built for growth that arrived early.',
    housing:
      'Near-new 4BR houses and house-and-land at prices that embarrass the middle ring. Supply is effectively unlimited.',
    fit: [
      {
        text: 'Werribee Mercy Hospital for Jeanie.',
        tag: null,
      },
      {
        text: 'New but crowded schools; zoning is stable, quality still maturing.',
        tag: null,
      },
      {
        text: 'Directly contradicts the transport-first philosophy.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Maximum new house per dollar, eyes open.',
      mainRisk: 'The commute and car-dependence eroding everything the house saved.',
      pursueWhen: 'Family superhouse economics genuinely require it — and only then.',
    },
  },

  // 'Craigieburn'
  'craigieburn-townhouse': {
    lives:
      'Established growth-corridor north at the end of its own line — estate living with maturing amenity, genuine multicultural mix, and car-first daily logistics.',
    housing:
      'New and near-new houses in volume; townhouses emerging. Entry prices remain among the lowest with metro rail.',
    fit: [
      {
        text: 'Metro line terminus — better than V/Line-dependent peers.',
        tag: null,
      },
      {
        text: 'Northern Hospital reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Long commute and thin teen independence.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Cheapest metro-rail house-and-land equation.',
      mainRisk: 'Distance from every personal anchor on the board.',
      pursueWhen: 'House strategy leads and the property is walkable to the station.',
    },
  },

  // 'Donnybrook'
  'donnybrook-house-land': {
    lives:
      'Paddocks turning into estates on the Seymour V/Line — the frontier option, where the suburb’s character is a construction schedule.',
    housing: 'House-and-land almost exclusively. The cheapest new-build path on the list.',
    fit: [
      {
        text: 'Pure house economics; nothing else competes on price.',
        tag: null,
      },
      {
        text: 'V/Line-only service, minimal amenity for years yet.',
        tag: 'tradeoff',
      },
      {
        text: 'Weakest Lulu story on the board — schools and independence both unproven.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Lowest-cost new build, treated as a financial position not a lifestyle.',
      mainRisk: 'Betting Lulu’s teen years on infrastructure that hasn’t arrived.',
      pursueWhen: 'Honestly? Probably only if every inner option fails the numbers.',
    },
  },

  // 'Box Hill'
  'box-hill-2br': {
    lives:
      'A second CBD in miniature — major rail and tram-109 interchange, Box Hill Hospital, and one of Melbourne’s best Chinese food centres, with towers rising fast around the core.',
    housing:
      'Apartment supply is deep and comparatively cheap thanks to the construction pipeline; houses and units sit in the quieter streets beyond the core.',
    fit: [
      {
        text: 'Box Hill Hospital in-suburb — top-tier pharmacy/hospital employment for Jeanie.',
        tag: null,
      },
      {
        text: 'Box Hill HS zone is a strong public story for Lulu.',
        tag: null,
      },
      {
        text: 'Tower oversupply cuts prices but demands careful building selection.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'School + hospital + transport stacked in one suburb at fair prices.',
      mainRisk: 'Buying into a compromised tower because supply made it cheap.',
      pursueWhen: 'A low-rise or quality mid-rise 2BR in the zone lists off the core.',
    },
  },

  // 'Yarraville' (record created July 2026)
  'yarraville-2br': {
    lives:
      'The inner west’s postcard village — the Sun Theatre and Anderson St strip, weatherboard streets, Cruickshank Park, and two rail lines. Community-dense and walkable; the industrial edge and West Gate corridor sit at the boundary.',
    housing:
      'Period weatherboards dominate with limited apartment and villa-unit stock. Suitable 2BRs are scarce; small houses are the real market and they’re contested.',
    fit: [
      {
        text: 'Yarraville West PS and Footscray High (Pilgrim) anchor the school story.',
        tag: null,
      },
      {
        text: 'Village strip gives Lulu walkable independence young.',
        tag: null,
      },
      {
        text: 'New Footscray Hospital close for Jeanie.',
        tag: null,
      },
      {
        text: 'Truck-route and industrial-fringe streets need filtering.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Village family life with the west’s best strip.',
      mainRisk: 'Paying the village premium for thin, contested stock.',
      pursueWhen: 'A small house or rare quality 2BR lists off the truck corridors.',
    },
  },
  'spotswood-2br': {
    lives:
      'A tiny, quiet pocket between Yarraville and the river — Hudsons Rd’s small strip, Scienceworks, industrial surrounds, and a station on the Werribee/Williamstown lines. Sleepy in a way some people love.',
    housing:
      'Small suburb, small market: weatherboards and the occasional unit. Listings are rare; patience is structural.',
    fit: [
      {
        text: 'Cheaper entry to the inner west with a genuine station.',
        tag: null,
      },
      {
        text: 'School zoning varies at the boundary — verify by address.',
        tag: 'tradeoff',
      },
      {
        text: 'Minimal local amenity; Yarraville carries the lifestyle load.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Quiet inner-west value one stop from Yarraville’s amenity.',
      mainRisk: 'Waiting a long time in a market this thin.',
      pursueWhen: 'The rare quiet-street listing undercuts Yarraville comparables.',
    },
  },
  'south-melbourne-2br': {
    lives:
      'Market-anchored inner living — South Melbourne Market, Clarendon St, dense tram coverage and the 96 light rail, with the beach and CBD both walkable-ish. No heavy rail, but everything else.',
    housing:
      'Terraces, converted warehouses and a deep apartment market from art deco to new. 2BR supply is genuine; quality and OC health vary block to block.',
    fit: [
      {
        text: 'Albert Park College zone — a top-tier public secondary for Lulu.',
        tag: null,
      },
      {
        text: 'The Alfred and CBD hospital precincts both reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Tram-dependent commute, though it’s a short one.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: '2BR Balanced inside a genuinely strong school zone.',
      mainRisk: 'Building-quality lottery in the apartment stock.',
      pursueWhen: 'A quality low-rise 2BR in the APC zone lists with sane fees.',
    },
  },
  'armadale-2br': {
    lives:
      'Polished High St village — antiques, cafes and immaculate streets on the Frankston/Dandenong-corridor rail. Quietly wealthy, calm, and extremely liveable if the budget stretches.',
    housing:
      'Period apartments and art deco blocks are the realistic entry beneath the mansions. Stock is decent for 1–2BRs; prices carry the postcode.',
    fit: [
      {
        text: 'Prahran High zone covers much of the area; verify by address.',
        tag: null,
      },
      {
        text: 'Nathan a couple of stops away.',
        tag: 'network',
      },
      {
        text: 'The Alfred reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Postcode premium buys polish, not space.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Premium-village 2BR living with rail and network access.',
      mainRisk: 'Paying Toorak-adjacent money for a small footprint.',
      pursueWhen: 'A deco 2BR lists at the suburb’s lower band — the zone and station do the rest.',
    },
  },
  'burnley-2br': {
    lives:
      'Richmond’s quietest corner — golf course, river parkland and a four-line station, with Swan St’s noise safely at arm’s length.',
    housing:
      'A small pocket of cottages and low-rise apartments. Stock flow is thin; think of it as Richmond’s quiet-street filter pre-applied.',
    fit: [
      {
        text: 'Shares Richmond’s school access including MGC proximity.',
        tag: null,
      },
      {
        text: 'Nathan nearby.',
        tag: 'network',
      },
      {
        text: 'Four-line station is elite commute redundancy.',
        tag: null,
      },
    ],
    decision: {
      bestFor: 'Richmond’s transport and schools without Richmond’s noise.',
      mainRisk: 'Thin listings making the search slow.',
      pursueWhen: 'Any quality low-rise 2BR lists — the pocket itself is the quality filter.',
    },
  },
  'hawthorn-2br': {
    lives:
      'Glenferrie Rd’s student-and-family bustle around Swinburne, leafy heritage streets, and strong transport — Lilydale/Belgrave/Alamein lines plus trams. Established, green, expensive.',
    housing:
      'One of Melbourne’s deepest art deco and walk-up markets — genuinely good 2BR hunting despite the postcode. Houses are another price universe.',
    fit: [
      {
        text: 'Auburn High is the local public secondary; strong primaries throughout.',
        tag: null,
      },
      {
        text: 'Deep walk-up stock means steady candidate flow, rare at this quality tier.',
        tag: null,
      },
      {
        text: 'Student-precinct pockets near Swinburne can be noisy.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Quality-tier 2BR walk-ups with elite transport redundancy.',
      mainRisk: 'Stretching for the postcode when Windsor buys the same stock cheaper.',
      pursueWhen: 'A quiet-street deco 2BR lists at the overlap with inner-south pricing.',
    },
  },
  'mckinnon-villa': {
    lives:
      'A suburb organised around its school — quiet streets, small station-side shops on the Frankston line, and a family rhythm set by McKinnon SC’s catchment.',
    housing:
      'Houses and villa units with the zone premium fully priced in. Villa units are the value entry into the zone.',
    fit: [
      {
        text: 'McKinnon SC — arguably the strongest public-school card on the entire board for Lulu.',
        tag: null,
      },
      {
        text: 'Direct Frankston-line commute to the loop.',
        tag: null,
      },
      {
        text: 'You pay for the zone whether or not you use every year of it.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: '3BR or villa strategies where school strength leads everything.',
      mainRisk: 'Zone premium on a dwelling you’d otherwise not choose.',
      pursueWhen: 'A villa unit inside the zone lists at neighbouring-suburb money.',
    },
  },
  'glen-waverley-2br': {
    lives:
      'The east’s education magnet — GWSC’s pull, Kingsway’s food strip, The Glen, and a line terminus that guarantees a seat. Family-dense and unashamedly suburban.',
    housing:
      'Post-war houses, knock-down-rebuilds, and a newer apartment core near the station. Zone demand keeps everything firm.',
    fit: [
      {
        text: 'Glen Waverley SC plus renowned primaries (Glendal PS) — the deepest school stack on the list.',
        tag: null,
      },
      {
        text: 'Monash Medical Centre corridor for Jeanie.',
        tag: null,
      },
      {
        text: '~40-minute commute is the schools tax.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'The pure schools-maximising family strategy.',
      mainRisk: 'Trading your commute and inner-city life for the zone.',
      pursueWhen: 'Family-together scenarios lead and a unit or house near the terminus lists.',
    },
  },
  'balwyn-north-2br': {
    lives:
      'Leafy, prosperous, and deliberately quiet — wide streets, Balwyn HS’s catchment gravity, and tram-only transport (route 48). The classic schools-over-commute counterexample.',
    housing:
      'Houses dominate at serious prices; units and townhouses are the only realistic entry, and they still carry the zone premium.',
    fit: [
      {
        text: 'Balwyn HS zone — elite public secondary for Lulu.',
        tag: null,
      },
      {
        text: 'Box Hill Hospital reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'No train: the commute relies entirely on a long tram ride.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Testing whether school weighting truly outranks commute weighting.',
      mainRisk: 'The tram commute grinding daily against your transport-first values.',
      pursueWhen:
        'It probably shouldn’t be — unless a zone unit lists cheap and schools toggle dominates.',
    },
  },
  'middle-park-2br': {
    lives:
      'Immaculate Victorian streets between the beach and Albert Park Lake, with the 96 light rail as the spine. Small, expensive, serene.',
    housing:
      'Terraces and period apartments; stock is scarce and dear. The 2BR apartment is the only realistic entry.',
    fit: [
      {
        text: 'Albert Park College is a genuinely strong public secondary.',
        tag: null,
      },
      {
        text: 'Best-in-class recreation: beach, lake, MSAC.',
        tag: null,
      },
      {
        text: 'Price per square metre is the highest bayside on the list.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Premium bayside calm inside a top school zone.',
      mainRisk: 'Paying house money for an apartment.',
      pursueWhen:
        'A period 2BR lists at the bottom of the suburb’s band — zone value does the rest.',
    },
  },
  'mentone-2br': {
    lives:
      'Beachside school town — a station village on the Frankston line surrounded by a dense cluster of schools, with a calm, family-suburban rhythm.',
    housing:
      'Houses, units and 70s apartments in reasonable supply; school-cluster demand supports prices but stock is broader than the inner bayside.',
    fit: [
      {
        text: 'Mentone Girls’ Secondary is a strong public option for Lulu.',
        tag: null,
      },
      {
        text: 'Direct Frankston-line commute, though it’s a long one.',
        tag: null,
      },
      {
        text: 'Optimised for Lulu weeks; solo weeks risk feeling isolated.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: '3BR family strategy anchored on schools and beach.',
      mainRisk: 'Solo-week flatness a long way from your people.',
      pursueWhen: 'Family-together scenarios firm up and a 3BR near station and schools lists.',
    },
  },
  'ivanhoe-house': {
    lives:
      'Upper Heidelberg Road provides the main village spine, with direct Hurstbridge-line access and nearby river and parkland networks.',
    housing:
      'The requested product is an established three-bedroom house. Current suburb medians place this well above the existing family strategy cap.',
    fit: [
      {
        text: 'Direct rail and a walkable village make day-to-day independence plausible.',
        tag: null,
      },
      {
        text: 'Darebin and Yarra parkland access is a meaningful family-lifestyle advantage.',
        tag: null,
      },
      {
        text: 'Detached-house pricing is the dominant trade-off.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A north-east family benchmark prioritising village life, rail and parklands.',
      mainRisk: 'The requested house product is likely to fail the current purchase-price gates.',
      pursueWhen:
        'Retain for comparison or inspect only if the budget changes or a materially discounted property appears.',
    },
  },

  'heidelberg-3br-townhouse': {
    lives:
      'Burgundy Street, Heidelberg station and the Austin–Mercy hospital precinct form a concentrated activity centre.',
    housing:
      'Three-bedroom townhouses are the intended product, but the current sales sample is too thin for a confident price band.',
    fit: [
      {
        text: 'Austin Hospital and Mercy Hospital for Women sit next to the station precinct, creating a real healthcare-employment hedge.',
        tag: null,
      },
      {
        text: 'Direct rail and an established shopping strip support low-car routines.',
        tag: null,
      },
      {
        text: 'Townhouse availability and owners-corporation exposure need property-level checks.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A household valuing rail access plus direct proximity to a major hospital employment precinct.',
      mainRisk:
        'Suitable three-bedroom townhouse stock may be scarce or priced above the provisional band.',
      pursueWhen:
        'After a live-listing sample confirms at least several suitable properties within the catchment.',
    },
  },
  'rosanna-house': {
    lives:
      'Rosanna combines a smaller station shopping strip with quieter residential streets and access to local parklands.',
    housing:
      'Three-bedroom detached houses remain expensive, although generally below Ivanhoe pricing.',
    fit: [
      {
        text: 'The rebuilt station provides lifts, safer access and direct rail.',
        tag: null,
      },
      {
        text: 'A quieter residential setting may suit family life better than denser inner options.',
        tag: null,
      },
      {
        text: 'The station anchor is zoned to Charles La Trobe P-12 College; Viewbank College applies only to part of the catchment.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A quieter Hurstbridge-line family option where space and local calm matter.',
      mainRisk: 'Price remains high and school-zone coverage may not include the entire catchment.',
      pursueWhen:
        'Only where an exact-address check confirms the intended secondary zone and the price trade-off remains acceptable.',
    },
  },
  'fairfield-house': {
    lives:
      'Station Street provides the village centre, while Yarra Bend and nearby river trails distinguish Fairfield from denser inner-north records.',
    housing:
      'The requested detached-house product is a premium inner-middle option and is likely outside current strategy caps.',
    fit: [
      {
        text: 'Direct rail, village shops and cycling links support independent daily movement.',
        tag: null,
      },
      {
        text: 'River and parkland access creates a strong lifestyle case.',
        tag: null,
      },
      {
        text: 'Detached-house cost may make the record useful mainly as a comparison benchmark.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A closer-in compromise between inner-north amenity and north-east parkland access.',
      mainRisk: 'House prices are likely to trigger the strategy price gate.',
      pursueWhen:
        'Only when the requested stock falls materially below the prevailing suburb median.',
    },
  },
  'surrey-hills-house': {
    lives:
      'Union station and the surrounding village connect an established family area to the Belgrave and Lilydale lines.',
    housing:
      'Three-bedroom houses are firmly premium-priced and sit well above the current family strategy ceiling.',
    fit: [
      {
        text: 'Direct rail and established local services provide a strong practical base.',
        tag: null,
      },
      {
        text: 'The 2027 overlay confirms Koonung Secondary at the station anchor, with Box Hill High and Camberwell High intersecting other parts of the catchment.',
        tag: null,
      },
      {
        text: 'Purchase cost is severe enough that this is primarily a benchmark record.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'Testing the value of established eastern family amenity against a very high purchase price.',
      mainRisk: 'The house product is incompatible with current price filters.',
      pursueWhen: 'Only after a substantial budget change or if the dwelling type is changed.',
    },
  },
  'blackburn-house': {
    lives:
      'Blackburn combines a station village with access to Blackburn Lake and a more suburban eastern setting.',
    housing:
      'Three-bedroom houses are cheaper than Surrey Hills but remain well above the current family strategy cap.',
    fit: [
      {
        text: 'The station, village and lake form a coherent family-lifestyle package.',
        tag: null,
      },
      {
        text: 'Chinese-community and Mingle signals now resolve through the generated Census criteria.',
        tag: null,
      },
      {
        text: 'Price, commute and safety remain provisional despite the now-evidenced school and community context.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'An eastern family benchmark balancing rail, greenery and somewhat lower prices than inner-east options.',
      mainRisk: 'Price and a longer door-to-door commute may outweigh the amenity advantage.',
      pursueWhen:
        'When verified commute and property evidence justify the above-cap purchase price.',
    },
  },
  'mount-waverley-villa': {
    lives:
      'Mount Waverley station anchors a suburban shopping centre with direct Glen Waverley-line access.',
    housing:
      'Three-bedroom villas are more attainable than detached houses but current medians remain above the existing strategy cap.',
    fit: [
      {
        text: 'Villa stock tests a lower-maintenance family format without switching to a large apartment complex.',
        tag: null,
      },
      {
        text: 'School and Chinese-community signals resolve through the official zone and generated Census pipelines.',
        tag: null,
      },
      {
        text: 'Commute length and owners-corporation quality require careful comparison with Glen Waverley.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A south-east villa option prioritising schools, community context and direct rail.',
      mainRisk:
        'Three-bedroom villas may still be too expensive while adding owners-corporation complexity.',
      pursueWhen:
        'When verified commute and owners-corporation evidence justify the above-cap purchase price.',
    },
  },
  'ashburton-villa': {
    lives:
      'Ashburton station, the High Street strip and nearby Gardiners Creek create a smaller-scale suburban centre.',
    housing:
      'The intended villa format exists, but the latest sales sample is too thin to support a confident three-bedroom median.',
    fit: [
      {
        text: 'The station and village support practical daily routines.',
        tag: null,
      },
      {
        text: 'The generated greenspace pipeline confirms strong station-catchment open-space access.',
        tag: null,
      },
      {
        text: 'Stock scarcity and price are the principal uncertainties.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A compact eastern family option where village scale and open-space access matter.',
      mainRisk:
        'There may not be enough suitable three-bedroom villa stock to justify a dedicated record.',
      pursueWhen: 'After a live-listing and settled-sales sample confirms recurring supply.',
    },
  },
  'bentleigh-house': {
    lives:
      'Centre Road supplies a substantial shopping strip around a direct Frankston-line station.',
    housing: 'Three-bedroom houses are expensive and likely to fail current purchase filters.',
    fit: [
      {
        text: 'The station and Centre Road strip support a practical low-car routine.',
        tag: null,
      },
      {
        text: 'Any McKinnon Secondary College benefit must be tied to the exact 2027 polygon, not the Bentleigh name.',
        tag: null,
      },
      {
        text: 'Detached-house pricing is the major constraint.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'Comparing a southern family-house and school-zone proposition against villa options.',
      mainRisk: 'Price remains severe, and McKinnon zoning applies only to part of the catchment.',
      pursueWhen:
        'Only where an exact-address check confirms McKinnon eligibility and the purchase-price gate is acceptable.',
    },
  },
  'newport-house': {
    lives:
      'Newport combines a rail junction, Mason Street services and Newport Lakes, with Williamstown reachable by rail or bicycle.',
    housing:
      'Three-bedroom houses remain expensive but are generally below comparable inner-east family-house records.',
    fit: [
      {
        text: 'Newport Lakes is approximately one kilometre from the station and provides a substantial local nature reserve.',
        tag: null,
      },
      {
        text: 'Council identifies a roughly 3.8 km cycling route from Newport station to Williamstown Beach.',
        tag: null,
      },
      {
        text: 'Freight, industrial and major-road exposure need street-level inspection.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A western family option combining rail, local nature and practical access to a swimming beach.',
      mainRisk:
        'House pricing remains above current caps, and environmental nuisance varies sharply by street.',
      pursueWhen:
        'When a quieter station-catchment property appears and the beach-access route is acceptable in practice.',
    },
  },
  // ---- 2026-07-19 batch: drafted in-repo against areaCorridors record data
  //      (no parked owner draft existed for these 13). Owner review expected. ----

  // 'Ascot Vale'
  'ascot-vale-2br': {
    lives:
      'Flat, close-in north-west with a village strip on Union Rd, the Craigieburn line running one-seat through the City Loop, and tram 57 as the second route. Showgrounds and Maribyrnong River trails set the weekend rhythm.',
    housing:
      'Older walk-ups and villa units at a genuine discount to the inner north; the Union Rd value pocket persists. Quality varies sharply by street and block.',
    fit: [
      { text: 'Train plus tram redundancy gives Lulu real independence at 12-15.', tag: null },
      {
        text: 'Royal Melbourne and Footscray hospital precincts both reachable for Jeanie.',
        tag: null,
      },
      {
        text: 'Flood overlays and estate edges make street selection the whole game.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Inner value with two transport modes and a 16-minute commute.',
      mainRisk: 'Buying the wrong pocket: arterial noise or a flood overlay under a good price.',
      pursueWhen:
        'A solid walk-up or villa unit lists on a quiet street between Union Rd and the station.',
    },
  },

  // 'Essendon' — graduated pilot of the 2026-07-21 onboarding batch.
  'essendon-2br': {
    lives:
      'Established north-west suburb on the Craigieburn line, one stop pattern through the City Loop. ABS 2021: 21,240 residents, median age 39, a long-standing Italian-Australian community thread.',
    housing:
      'Proposed product is the older 2BR apartment near the station; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      {
        text: 'Census community context is integrated and visible on the card.',
        tag: null,
      },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },

  // 'Northcote'
  'northcote-2br': {
    lives:
      "High St's arts-and-food spine with Westgarth's cinema corner, Merri Creek trails, and two real routes to town: the Mernda line and tram 86. Busy, social, family-thick.",
    housing:
      'Older units, walk-ups and a growing mid-rise layer. Renovated 2BRs push the top of the band; the honest value is the unrenovated walk-up on a side street.',
    fit: [
      { text: 'Northcote High is a strong zoned public secondary for Lulu.', tag: null },
      {
        text: 'Train and tram redundancy plus creek trails: teen independence is genuine.',
        tag: null,
      },
      { text: 'Entry prices crowd the budget ceiling for the good stock.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: "2BR Balanced with the inner north's best strip life.",
      mainRisk: 'Paying renovated money for what the suburb, not the apartment, is worth.',
      pursueWhen: 'An unrenovated walk-up 2BR lists a block or two off High St.',
    },
  },

  // 'Thornbury'
  'thornbury-2br': {
    lives:
      "Northcote's quieter continuation: same corridor, same creek, smaller strips, more room to breathe. The 86 and the Mernda line both run through it.",
    housing:
      'Villa units with courtyards are the distinctive stock, alongside older walk-ups. The Northcote discount is real and the fabric nearly identical.',
    fit: [
      { text: 'A villa-unit courtyard within budget is rare this close in.', tag: null },
      { text: 'Same teen independence as Northcote at a lower entry.', tag: null },
      {
        text: 'Thornbury High vs Northcote High zoning is street-by-street; verify by address.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Northcote life at a price that leaves margin.',
      mainRisk: 'Assuming the school zone without checking the exact street.',
      pursueWhen: 'A villa unit with a real courtyard lists under the Northcote comparable.',
    },
  },

  // 'Preston'
  'preston-villa': {
    lives:
      'Preston Market anchors a genuinely multicultural food-and-shopping life, with rebuilt stations after the level-crossing removals and the 86 and 11 trams as backup. Unpolished and improving.',
    housing:
      'The most realistic villa-unit-with-courtyard market on the corridor, plus older units and townhouses. Block-by-block variation is the sorting problem.',
    fit: [
      { text: 'Best space-per-dollar on the Mernda corridor.', tag: null },
      { text: 'Market, trams and trains give Lulu a workable independent radius.', tag: null },
      {
        text: 'Preston High is re-established and growing but its senior years are still building depth.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Villa strategies that want a courtyard without leaving the rail corridor.',
      mainRisk: 'The commute edge: 35 minutes typical becomes 46 stressed.',
      pursueWhen: "A villa unit near Preston or Bell station lists in the band's lower half.",
    },
  },

  // 'Malvern'
  'malvern-2br': {
    lives:
      "Calm, established inner-east streets between good strips, with Malvern station's one-seat 25-minute run and three tram routes through the suburb. Family-ordered and quietly expensive.",
    housing:
      'Art deco and older 2BR apartments beneath a serious house market; villa units appear occasionally. The band starts where cheaper corridors end.',
    fit: [
      { text: 'Strong primaries and safe streets suit the co-parenting brief.', tag: null },
      { text: 'Nathan a few stops up the line in South Yarra.', tag: 'network' },
      {
        text: 'Secondary zoning splits toward Glen Eira College and Prahran High; verify by address.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A calm, school-rich base with blue-chip resale.',
      mainRisk: 'Budget exhaustion: entry cost buys the postcode before the floorplan.',
      pursueWhen: "A deco 2BR lists at the band's bottom near the station.",
    },
  },

  // 'Toorak'
  'toorak-2br': {
    lives:
      'The priciest postcode at its cheapest entry point: older walk-ups south of Toorak Rd, a 23-minute one-seat ride, and amenity that skews older and wealthier than the household.',
    housing:
      'Older 2BR apartments only; the band buys less floorplan here than anywhere in the lens. The resale floor is the strongest in the file.',
    fit: [
      { text: 'Nathan one suburb over in South Yarra.', tag: 'network' },
      { text: 'Commute and safety are top-tier.', tag: null },
      {
        text: "Little community traction for a single-parent household; the suburb's life stage is not yours.",
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A calibration point: what blue-chip costs against what it returns.',
      mainRisk: 'Paying the postcode premium for a lifestyle mismatch.',
      pursueWhen:
        'Probably never ahead of Windsor or Armadale; revisit only if a walk-up lists far under band.',
    },
  },

  // 'Kew'
  'kew-2br': {
    lives:
      'Leafy Boroondara at its most school-dense, organised around Kew Junction and the 48 and 109 trams. No train, and daily life is calmer and more private than any inner strip.',
    housing:
      "Older apartments and villa units beneath serious house money. The band tops out at the tool's ceiling and the stock is thin.",
    fit: [
      {
        text: 'Kew High zone plus one of the strongest school environments in Melbourne.',
        tag: null,
      },
      { text: 'A 40-minute-plus tram-only commute with no rail fallback.', tag: 'tradeoff' },
      { text: 'Weekend life beyond the tram spine leans on a car.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'A schools-first play where commute weighting is genuinely low.',
      mainRisk: 'The daily tram grind eroding everything the schools bought.',
      pursueWhen: 'School weighting dominates and a villa unit lists near Kew Junction.',
    },
  },

  // 'Balwyn'
  'balwyn-2br': {
    lives:
      'Quiet, prosperous streets on the 109 tram spine with the Balwyn High zone as the organising fact of the local market. The measured version of the school-zone premium.',
    housing:
      'A thin unit and villa market where the zone premium is priced into everything; houses are another universe.',
    fit: [
      { text: 'Balwyn High is the benchmark zoned public secondary.', tag: null },
      {
        text: "A 45-minute tram-only commute fails the brief's reliability test.",
        tag: 'tradeoff',
      },
      { text: 'Life beyond the 109 spine assumes a car.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Testing whether the zone premium beats the commute penalty.',
      mainRisk: 'Buying the zone and resenting the transport every working day.',
      pursueWhen:
        'Only if schools outweigh commute after honest weighting, and a zone unit lists cheap.',
    },
  },

  // 'Albert Park'
  'albert-park-2br': {
    lives:
      'Village streets between the park, the lake and the beach, with the 96 light rail running reserved track to the Collins St end of Southern Cross. Serene, complete, expensive.',
    housing:
      'Older apartments only, and the band clears the budget ceiling for most of them. Listings are scarce; parking and heritage compromises are standard.',
    fit: [
      {
        text: 'Albert Park College plus park, beach and MSAC: the strongest child environment in the lens.',
        tag: null,
      },
      { text: 'Close to the current Southbank orbit, keeping continuity for Lulu.', tag: null },
      { text: 'Entry price is the whole problem.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Lifestyle and schools together if the budget stretches.',
      mainRisk: "Overreaching on price for the suburb's calm.",
      pursueWhen: "A small older 2BR lists at the band's floor with a sane body corporate.",
    },
  },

  // 'North Melbourne'
  'north-melbourne-2br': {
    lives:
      "Errol St's village core beside the Parkville hospital precinct, with the shortest commute in the lens: every northern line, Arden on the Metro Tunnel, and trams 57 and 58. Gritty edges, real convenience.",
    housing:
      'Older walk-ups and a growing new-apartment layer around Arden. The value pocket is the older stock on the quiet western streets.',
    fit: [
      { text: 'Parkville hospital precinct in walking distance for Jeanie.', tag: null },
      { text: 'University High is a strong zoned secondary for Lulu.', tag: null },
      { text: 'Arden construction will run for years on the precinct edges.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Commute-first living with hospital-precinct employment insurance.',
      mainRisk: 'Buying next to a decade of construction.',
      pursueWhen: 'An older 2BR lists on a settled street away from the Arden works.',
    },
  },

  // 'Sunbury' (Tama's suburb)
  'sunbury-house': {
    lives:
      'An established country-town-turned-suburb with its own centre, schools and aquatic centre, out on the Sunbury line with Metro Tunnel through-running. Space is the entire proposition.',
    housing:
      'Whole houses with yards at 2BR-apartment money; the strongest space-per-dollar in the file. Established streets, not greenfield paddocks.',
    fit: [
      {
        text: 'Tama is local: the one suburb on the list with day-to-day family backup.',
        tag: 'network',
      },
      { text: 'A house and yard transform Lulu weeks at home.', tag: null },
      {
        text: 'The 55-minute door-to-door commute is the whole trade, every working day.',
        tag: 'tradeoff',
      },
      { text: 'Teen independence drops to lifts and timetables.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Space and family backup when commute weighting honestly drops.',
      mainRisk: 'Discovering the commute is unlivable after buying the house.',
      pursueWhen: 'Remote-heavy work patterns firm up, making the trip 2-3 days not 5.',
    },
  },

  // 'Clifton Hill'
  'clifton-hill-2br': {
    lives:
      "A pocket-sized junction suburb: Queens Pde's strip, Darling Gardens, the Merri Creek trail, and the Mernda/Hurstbridge junction giving rail redundancy no single-line suburb can match.",
    housing:
      'Older walk-ups in tight supply; the good ones are known quantities at auction and the Yarra postcode premium is priced in.',
    fit: [
      { text: "St Vincent's precinct one stop away for Jeanie.", tag: null },
      { text: 'Two-line junction plus tram 86: elite teen independence.', tag: null },
      { text: 'Thin stock makes the search slow and competitive.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Inner-north life with the best transport redundancy on the northside.',
      mainRisk: 'Waiting out a thin market while prices drift.',
      pursueWhen: "A quality walk-up 2BR lists off Hoddle St's noise shadow.",
    },
  },

  // 'Doncaster'
  'doncaster-villa': {
    lives:
      'Prosperous, quiet school-belt streets with Westfield as the de facto town centre and the DART busway as the only transport story. The measured counterexample to the rail-first rule.',
    housing:
      'Villa units and townhouses at 2BR-apartment money beneath a strong house market; stock is decent and less contested than in rail suburbs.',
    fit: [
      { text: 'Primary and secondary school strength across the belt for Lulu.', tag: null },
      { text: 'Box Hill Hospital corridor reachable for Jeanie.', tag: null },
      { text: 'No rail, bus-dependent teen years, car-shaped daily life.', tag: 'tradeoff' },
    ],
    decision: {
      bestFor: 'Schools and space if transport weighting truly collapses.',
      mainRisk: 'The busway feeling like a compromise every single day.',
      pursueWhen: 'It rarely wins under this brief; revisit only if work goes mostly remote.',
    },
  },

  // 'Collingwood/Abbotsford' (shared)
  'inner-collingwood-2br': collingwoodAbbotsford,
  // 'Collingwood/Abbotsford' (shared)
  'inner-abbotsford-2br': collingwoodAbbotsford,
  // 'Chelsea/Bonbeach' (shared)
  'chelsea-2br': chelseaBonbeach,
  // 'Chelsea/Bonbeach' (shared)
  'bonbeach-2br': chelseaBonbeach,
  // 'Fawkner' — graduated record of the 2026-07-21 onboarding batch.
  'fawkner-house': {
    lives: 'Fawkner: ABS 2021 records 14,274 residents. Corridor: upfield line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Thomastown' — graduated record of the 2026-07-21 onboarding batch.
  'thomastown-house': {
    lives: 'Thomastown: ABS 2021 records 20,234 residents. Corridor: mernda line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Bundoora' — graduated record of the 2026-07-21 onboarding batch.
  'bundoora-house': {
    lives: 'Bundoora: ABS 2021 records 28,068 residents. Corridor: tram 86 / bus.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Viewbank' — graduated record of the 2026-07-21 onboarding batch.
  'viewbank-house': {
    lives:
      'Viewbank: ABS 2021 records 7,030 residents. Corridor: bus to heidelberg (hurstbridge line).',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Watsonia' — graduated record of the 2026-07-21 onboarding batch.
  'watsonia-house': {
    lives: 'Watsonia: ABS 2021 records 5,352 residents. Corridor: hurstbridge line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Eltham' — graduated record of the 2026-07-21 onboarding batch.
  'eltham-house': {
    lives: 'Eltham: ABS 2021 records 18,847 residents. Corridor: hurstbridge line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Williamstown' — graduated record of the 2026-07-21 onboarding batch.
  'williamstown-house': {
    lives: 'Williamstown: ABS 2021 records 14,407 residents. Corridor: williamstown line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Point Cook' — graduated record of the 2026-07-21 onboarding batch.
  'point-cook-house': {
    lives:
      'Point Cook: ABS 2021 records 66,781 residents. Corridor: bus to williams landing (werribee line).',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Werribee' — graduated record of the 2026-07-21 onboarding batch.
  'werribee-house': {
    lives: 'Werribee: ABS 2021 records 50,027 residents. Corridor: werribee line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Moonee Ponds' — graduated record of the 2026-07-21 onboarding batch.
  'moonee-ponds-2br': {
    lives: 'Moonee Ponds: ABS 2021 records 16,224 residents. Corridor: craigieburn line.',
    housing:
      'Proposed product is the older 2br apartment; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Eltham North' — graduated record of the 2026-07-21 onboarding batch.
  'eltham-north-house': {
    lives:
      'Eltham North: ABS 2021 records 6,830 residents. Corridor: bus to eltham (hurstbridge line).',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Essendon West' — graduated record of the 2026-07-21 onboarding batch.
  'essendon-west-house': {
    lives: 'Essendon West: ABS 2021 records 1,559 residents. Corridor: bus routes.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Watsonia North' — graduated record of the 2026-07-21 onboarding batch.
  'watsonia-north-house': {
    lives:
      'Watsonia North: ABS 2021 records 3,799 residents. Corridor: bus to watsonia (hurstbridge line).',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Black Rock' — graduated record of the 2026-07-21 onboarding batch.
  'black-rock-house': {
    lives:
      'Black Rock: ABS 2021 records 6,389 residents. Corridor: bus to sandringham (sandringham line).',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Braybrook' — graduated record of the 2026-07-21 onboarding batch.
  'braybrook-villa': {
    lives: 'Braybrook: ABS 2021 records 9,682 residents. Corridor: bus / sunbury line edge.',
    housing:
      'Proposed product is the villa unit; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Brighton' — graduated record of the 2026-07-21 onboarding batch.
  'brighton-house': {
    lives: 'Brighton: ABS 2021 records 23,252 residents. Corridor: sandringham line.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Bulleen' — graduated record of the 2026-07-21 onboarding batch.
  'bulleen-house': {
    lives: 'Bulleen: ABS 2021 records 11,219 residents. Corridor: bus (manningham corridor).',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Burwood' — graduated record of the 2026-07-21 onboarding batch.
  'burwood-house': {
    lives: 'Burwood: ABS 2021 records 15,147 residents. Corridor: tram 75.',
    housing:
      'Proposed product is the established 3-bedroom house; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Camberwell' — graduated record of the 2026-07-21 onboarding batch.
  'camberwell-2br': {
    lives:
      'Camberwell: ABS 2021 records 21,965 residents. Corridor: belgrave / lilydale / alamein junction.',
    housing:
      'Proposed product is the older 2br apartment; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Elsternwick' — graduated record of the 2026-07-21 onboarding batch.
  'elsternwick-2br': {
    lives: 'Elsternwick: ABS 2021 records 10,887 residents. Corridor: sandringham line.',
    housing:
      'Proposed product is the older 2br apartment; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Hawthorn East' — graduated record of the 2026-07-21 onboarding batch.
  'hawthorn-east-2br': {
    lives:
      'Hawthorn East: ABS 2021 records 14,834 residents. Corridor: belgrave / lilydale (auburn edge).',
    housing:
      'Proposed product is the older 2br apartment; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'St Kilda East' — graduated record of the 2026-07-21 onboarding batch.
  'st-kilda-east-2br': {
    lives: 'St Kilda East: ABS 2021 records 12,571 residents. Corridor: trams 3 / 16 / 67.',
    housing:
      'Proposed product is the older 2br apartment; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'St Kilda West' — graduated record of the 2026-07-21 onboarding batch.
  'st-kilda-west-2br': {
    lives: 'St Kilda West: ABS 2021 records 2,951 residents. Corridor: trams 12 / 96.',
    housing:
      'Proposed product is the older 2br apartment; the recurring-stock assumption and price band are set from VGV medians and recurring listings.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Recreation and kid-amenity are not yet scored, so that criterion drops out of the weighted mean.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A 2026 north/west batch candidate; weigh it on the scored criteria and price band shown on this card.',
      mainRisk:
        'Commute, safety and price bands are evidence-based estimates, not verified to a specific block.',
      pursueWhen:
        'After verifying the specific block, its owners-corp and the exact school zone at findmyschool.vic.gov.au.',
    },
  },
  // 'Aberfeldie' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'aberfeldie-house': {
    lives:
      'Aberfeldie: ABS 2021 records 3,925 residents. Corridor: bus to essendon (craigieburn line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Albion' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'albion-house': {
    lives:
      'Albion: ABS 2021 records 4,334 residents. Corridor: sunbury line. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  }, // 'Blackburn North' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'blackburn-north-house': {
    lives:
      'Blackburn North: ABS 2021 records 7,627 residents. Corridor: bus to blackburn (belgrave / lilydale line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Blackburn South' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'blackburn-south-house': {
    lives:
      'Blackburn South: ABS 2021 records 10,939 residents. Corridor: bus to blackburn (belgrave / lilydale line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Box Hill North' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'box-hill-north-house': {
    lives:
      'Box Hill North: ABS 2021 records 12,337 residents. Corridor: bus to box hill (belgrave / lilydale line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Box Hill South' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'box-hill-south-house': {
    lives:
      'Box Hill South: ABS 2021 records 8,491 residents. Corridor: bus / tram to box hill. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Brunswick West' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'brunswick-west-2br': {
    lives:
      'Brunswick West: ABS 2021 records 14,746 residents. Corridor: tram 19 / upfield line edge. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the older 2br apartment; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Coburg North' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'coburg-north-house': {
    lives:
      'Coburg North: ABS 2021 records 8,327 residents. Corridor: upfield line (merlynston / batman). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Gardenvale' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'gardenvale-house': {
    lives:
      'Gardenvale: ABS 2021 records 1,019 residents. Corridor: sandringham line. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Heidelberg West' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'heidelberg-west-house': {
    lives:
      'Heidelberg West: ABS 2021 records 5,252 residents. Corridor: bus to heidelberg (hurstbridge line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Keilor' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'keilor-house': {
    lives:
      'Keilor: ABS 2021 records 5,906 residents. Corridor: bus (keilor village). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Keilor Downs' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'keilor-downs-house': {
    lives:
      'Keilor Downs: ABS 2021 records 9,857 residents. Corridor: bus to st albans (sunbury line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Keilor East' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'keilor-east-house': {
    lives:
      'Keilor East: ABS 2021 records 15,078 residents. Corridor: bus (keilor park / milleara). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Keysborough' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'keysborough-house': {
    lives:
      'Keysborough: ABS 2021 records 30,018 residents. Corridor: bus (no rail in locality). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Maidstone' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'maidstone-house': {
    lives:
      'Maidstone: ABS 2021 records 9,389 residents. Corridor: bus to tottenham / sunshine. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Maribyrnong' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'maribyrnong-2br': {
    lives:
      'Maribyrnong: ABS 2021 records 12,573 residents. Corridor: bus to footscray. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the older 2br apartment; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Port Melbourne' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'port-melbourne-2br': {
    lives:
      'Port Melbourne: ABS 2021 records 17,633 residents. Corridor: route 109 light rail. Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the older 2br apartment; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Sunshine North' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'sunshine-north-house': {
    lives:
      'Sunshine North: ABS 2021 records 12,047 residents. Corridor: bus to sunshine (sunbury / metro line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Sunshine West' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'sunshine-west-house': {
    lives:
      'Sunshine West: ABS 2021 records 18,552 residents. Corridor: bus to sunshine (sunbury / metro line). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Tullamarine' — owner-approved scored record of the 2026-07-22 onboarding batch.
  'tullamarine-house': {
    lives:
      'Tullamarine: ABS 2021 records 6,733 residents. Corridor: bus (no rail in locality). Locality, schools and greenspace evidence is integrated.',
    housing:
      'Proposed product is the established 3-bedroom house; the price band frames the official 2025 VGV broad-property median; confirm recurring stock and building costs at listing level.',
    fit: [
      { text: 'Census community context is integrated and visible on the card.', tag: null },
      {
        text: 'Commute and cost are provisional evidence estimates; safety stays null because the CSA download lacks suburb geography.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Evidence-backed comparison with source caveats visible on the card.',
      mainRisk:
        'Treating provisional commute, price or dwelling-product evidence as address-level certainty.',
      pursueWhen: 'Before purchase, verify the exact address, title, commute and school zone.',
    },
  },
  // 'Templestowe' — evidence-complete 2026-07-22 next-five onboarding batch.
  'templestowe-house': {
    lives:
      'Templestowe is a low-density Manningham house market anchored here at Templestowe Village and the direct route 905 bus spine.',
    housing:
      'The proposed product is an established 3BR house; its official 2025 VGV house median is $1.605m, with address-level stock still to verify.',
    fit: [
      {
        text: 'Census, locality, cost, schools and generated greenspace evidence are integrated.',
        tag: null,
      },
      {
        text: 'The direct route 905 avoids a transfer, but deep residential pockets remain car-dependent.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'House space and a one-seat DART commute without pretending the suburb is low-car.',
      mainRisk: 'High house cost and deep-pocket car dependence away from the village bus spine.',
      pursueWhen:
        'When the exact route 905 walk and boundary-sensitive primary zone both pass address-level checks.',
    },
  },
  // 'Sydenham' — evidence-complete 2026-07-22 next-five onboarding batch.
  'sydenham-house': {
    lives:
      'Sydenham is an established western house market centred on Watergardens station, shopping and the Sunbury rail corridor.',
    housing:
      'The proposed product is an established 3BR house; its official 2025 VGV house median is $740k.',
    fit: [
      {
        text: 'Census, locality, cost, schools and generated greenspace evidence are integrated.',
        tag: null,
      },
      {
        text: 'Watergardens offers one-seat rail, but station access varies substantially across the suburb.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A mainstream house proposition with one-seat rail from the outer west.',
      mainRisk: 'A suburb-wide label can hide a car trip to Watergardens.',
      pursueWhen:
        'When the exact station walk, school zone and after-dark route all pass address-level checks.',
    },
  },
  // 'Rockbank' — evidence-complete 2026-07-22 next-five onboarding batch.
  'rockbank-house': {
    lives:
      'Rockbank is a fast-changing Melton growth suburb with a rebuilt regional-rail station and substantial estate delivery still underway.',
    housing:
      'The proposed product is a completed 3BR house rather than an unbuilt package; the official 2025 VGV house median is $621k.',
    fit: [
      {
        text: 'Census, locality, cost, schools and generated greenspace evidence are integrated.',
        tag: null,
      },
      {
        text: 'Nature access is strong, but major-park access is weak and the new secondary has no senior cohort yet.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'Testing whether low house cost plus direct regional rail offsets growth-area car dependence.',
      mainRisk:
        'Frequency, estate staging and service delivery vary more than the headline station proximity suggests.',
      pursueWhen:
        'When completed recurring stock, useful V/Line frequency and delivered local services are confirmed.',
    },
  },
  // 'Wollert' — evidence-complete 2026-07-22 next-five onboarding batch.
  'wollert-house': {
    lives:
      'Wollert is a large Whittlesea growth locality; this proposition deliberately uses the established southern bus pocket rather than the rural polygon centre.',
    housing:
      'The proposed product is a completed 3BR house; the official 2025 VGV house median is $710k.',
    fit: [
      {
        text: 'Census, locality, cost, schools and generated greenspace evidence are integrated.',
        tag: null,
      },
      {
        text: 'The proposition requires a feeder-bus transfer, and the new secondary has no senior cohort yet.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A transparent outer-growth comparison using a real occupied pocket and feeder-bus commute.',
      mainRisk:
        'Long transfers and future-stage service promises can overwhelm the purchase-price advantage.',
      pursueWhen:
        'When the exact feeder journey, completed services and recurring stock pass address-level checks.',
    },
  },
  // 'Mernda' — evidence-complete 2026-07-22 next-five onboarding batch.
  'mernda-house': {
    lives:
      'Mernda is an outer-north house market with a modern metro terminus and established town-centre services around the station.',
    housing:
      'The proposed product is a completed 3BR house; the official 2025 VGV house median is $730k.',
    fit: [
      {
        text: 'Census, locality, cost, schools and generated greenspace evidence are integrated.',
        tag: null,
      },
      {
        text: 'The terminus and strong greenspace improve the proposition, but many pockets remain car-dependent.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Outer-growth house value with a genuine one-seat metro anchor.',
      mainRisk:
        'The station improves the commute, but many pockets remain car-dependent for daily life.',
      pursueWhen:
        'When the exact station connection and boundary-sensitive primary zone pass address-level checks.',
    },
  },
}

export function suburbProfileFor(areaId) {
  return suburbProfiles[areaId] || null
}
