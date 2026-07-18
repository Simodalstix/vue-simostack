// src/data/dwelling/suburbProfiles.js
//
// Narrative copy for the EXPANDED suburb profile card on the Decide page,
// keyed by the areaCorridors record id. Presentation copy only: nothing here
// is scored, ranked or read by the ranking engine.
//
// Source mix:
// - original owner-supplied draft (2026-07-15) for the first shipped batch
// - July 2026 expansion entries below, reconstructed from areaCorridors.js
//   placeholder research because the parked draft artifact is not in-repo
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
// - Tama's suburb (Sunbury) has no drafted profile yet.
// - Verify school-zone claims at findmyschool.vic.gov.au (zones shift yearly).

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
        text: 'Land Build and 3BR strategies both work here on real budgets.',
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
        text: 'Strong Land Build and expandable-house economics.',
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
        text: 'Land Build and Villa/Townhouse strategies both price in comfortably.',
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
        text: 'Excellent kid-amenity: beach, parks, safe streets.',
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
      pursueWhen: 'Land Build strategy leads and the block is walkable to the station.',
    },
  },

  // 'Donnybrook'
  'donnybrook-house-land': {
    lives:
      'Paddocks turning into estates on the Seymour V/Line — the frontier option, where the suburb’s character is a construction schedule.',
    housing: 'House-and-land almost exclusively. The cheapest new-build path on the list.',
    fit: [
      {
        text: 'Pure Land Build economics; nothing else competes on price.',
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
      'A quiet, low-turnover pocket tucked between the rail line, the river-industrial edge and Newport. Hudsons Rd is modest rather than buzzy; Yarraville supplies most of the village energy one stop away.',
    housing:
      'Mostly weatherboards and the occasional older unit or small block. The real issue is not sorting quality but waiting for enough stock to appear.',
    fit: [
      {
        text: 'Real train access on the Werribee/Williamstown corridor.',
        tag: null,
      },
      {
        text: 'Yarraville village amenity is one stop away.',
        tag: null,
      },
      {
        text: 'Industrial edges and thin listing flow are the structural compromise.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Cheaper inner-west entry with a genuine station.',
      mainRisk: 'Waiting months, then compromising on street quality because stock is scarce.',
      pursueWhen: 'A quiet-street weatherboard or rare solid 2BR lists near the station.',
    },
  },
  'south-melbourne-2br': {
    lives:
      'Dense inner-city life without needing the CBD itself: market energy, Clarendon St, easy cycling, and trams everywhere. It is active and highly practical, but less serene than Albert Park or Middle Park.',
    housing:
      'A deep apartment market ranging from art deco walk-ups to newer towers and warehouse conversions. Plenty of choice, but building quality and owners-corp health vary sharply.',
    fit: [
      {
        text: 'Albert Park College is the headline public-school card.',
        tag: null,
      },
      {
        text: 'Jeanie already works here and Lulu already has routine here.',
        tag: 'network',
      },
      {
        text: 'The commute is easy but tram-based rather than rail-redundant.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Continuity with current life plus strong inner-city kid independence.',
      mainRisk: 'Buying a compromised apartment because the suburb-level fit feels so strong.',
      pursueWhen: 'A quality low-rise 2BR in the APC zone lists with sane fees and no defect tail.',
    },
  },
  'armadale-2br': {
    lives:
      'Polished High St village life: boutiques, cafes, period streets and a calm, old-money feel. It is visibly settled, safe and attractive, but you are paying for that polish every day.',
    housing:
      'The workable stock is art deco apartments and period walk-ups beneath a house market that sits in a different price universe. Good 2BRs do exist, but the postcode is fully priced in.',
    fit: [
      {
        text: 'Rail plus trams gives strong transport redundancy.',
        tag: null,
      },
      {
        text: 'A calm, safe daily environment is the real product here.',
        tag: null,
      },
      {
        text: 'Value is the honest weak point versus Windsor or inner-west alternatives.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Premium-village living where lifestyle and resale quality lead the call.',
      mainRisk:
        'Paying east-side money for a small floorplan that does not materially change life.',
      pursueWhen:
        'A deco 2BR lands near the bottom of the suburb band and beats inner-south comps.',
    },
  },
  'burnley-2br': {
    lives:
      'A tiny pocket of quiet streets and rail access tucked beside Richmond, the Yarra and the golf course. It feels like borrowed Richmond amenity without Richmond’s constant noise.',
    housing:
      'Very limited stock: cottages, a few low-rise apartments, and not much else. Searches here are opportunistic rather than dependable.',
    fit: [
      {
        text: 'Burnley station gives elite line redundancy for the commute.',
        tag: null,
      },
      {
        text: 'Richmond schools, hospitals and amenity sit effectively next door.',
        tag: null,
      },
      {
        text: 'Flood edges, freeway noise and stock scarcity mean this cannot be the main plan.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Richmond access with a quieter home base if a listing appears.',
      mainRisk: 'Treating a very small, thin market as if it will regularly produce candidates.',
      pursueWhen:
        'A liveable low-rise 2BR appears in the pocket away from the viaduct and junction.',
    },
  },
  'hawthorn-2br': {
    lives:
      'Leafy heritage streets, Glenferrie Rd amenity and a visible university pulse around Swinburne. One street is elegant and calm; the next can feel younger, busier and more transient.',
    housing:
      'Deep walk-up and art deco stock compared with most prestige suburbs. Genuine 2BR supply exists, but buyers know that and price the better blocks accordingly.',
    fit: [
      {
        text: 'Two stations plus trams creates real transport backup.',
        tag: null,
      },
      {
        text: 'Strong primaries and a credible public-secondary path keep the kid story solid.',
        tag: null,
      },
      {
        text: 'You still pay a Hawthorn premium against very similar stock elsewhere.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'Quality low-rise stock and school strength with east-side polish.',
      mainRisk: 'Overpaying for the postcode when the actual apartment is merely fine.',
      pursueWhen: 'A quiet-street deco 2BR turns up at overlap money with Windsor or Malvern.',
    },
  },
  'mckinnon-villa': {
    lives:
      'A school-zone suburb first and almost everything else second: calm family streets, little theatre, and daily life organised around the station, the school and the house.',
    housing:
      'Villa units are the realistic entry to a market otherwise dominated by houses and school-premium pricing. The dwelling can be modest; the zone is what you are really buying.',
    fit: [
      {
        text: 'McKinnon SC is one of the strongest zoned public-secondary cards in the set.',
        tag: null,
      },
      {
        text: 'Direct Frankston-line access keeps the CBD commute straightforward.',
        tag: null,
      },
      {
        text: 'Lifestyle variety is thin if the school story stops carrying the suburb.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A school-first purchase where the zone is genuinely decisive.',
      mainRisk:
        'Paying a zone premium for a dwelling and neighbourhood you would not otherwise pick.',
      pursueWhen: 'A well-kept villa unit inside the zone lists at neighbouring-suburb money.',
    },
  },
  'glen-waverley-2br': {
    lives:
      'The eastern education magnet: Kingsway food strip, The Glen, buses in every direction, and a suburb organised around schools and the terminus station. It feels functional and family-heavy rather than village-like.',
    housing:
      'Houses and rebuild sites sit beyond the brief; the practical targets are villa units and newer apartments near the station core. Demand stays firm because the school story is the product.',
    fit: [
      {
        text: 'Glen Waverley SC plus notable primaries is the deepest school stack in the file.',
        tag: null,
      },
      {
        text: 'The terminus guarantees a seat, even if the ride is long.',
        tag: null,
      },
      {
        text: 'The commute and car dependence are the tax you pay for the school offer.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A schools-first brief where east-side education weight outranks commute pain.',
      mainRisk:
        'Discovering the family logic is correct on paper but exhausting in daily practice.',
      pursueWhen:
        'A quality unit near the station and inside the zone justifies the daily travel cost.',
    },
  },
  'balwyn-north-2br': {
    lives:
      'Wide, prosperous, deliberately quiet streets with Doncaster Rd as the movement spine. Daily life is safe and ordered, but solo-week energy is limited and the suburb can feel suburban in the fullest sense.',
    housing:
      'Houses dominate, with units and villas acting as the only entry to a school-premium market. The housing stock is respectable; the challenge is paying the zone price for small-format dwellings.',
    fit: [
      {
        text: 'Balwyn High in-suburb is the entire thesis.',
        tag: null,
      },
      {
        text: 'Box Hill and Kew corridors are reachable without being local.',
        tag: null,
      },
      {
        text: 'The long tram 48 commute is the cleanest reason this should rank below Balwyn proper.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A pure public-school premium play with strong resale support.',
      mainRisk: 'Paying school money plus a long daily commute for a suburb that does little else.',
      pursueWhen:
        'A zone unit lists near the bottom of the band and the school weighting is truly dominant.',
    },
  },
  'middle-park-2br': {
    lives:
      'One of the calmest inner-bayside pockets in Melbourne: beach, lake, tram, period streets and almost no obvious roughness. It feels settled and graceful, but also expensive in every visible way.',
    housing:
      'The realistic stock is period apartments and the occasional small terrace-scale dwelling. Listings are scarce and most have parking or heritage compromises somewhere in the story.',
    fit: [
      {
        text: 'Beach, lake and MSAC make kid amenity unusually strong.',
        tag: null,
      },
      {
        text: 'Albert Park College keeps the public-school story top tier.',
        tag: null,
      },
      {
        text: 'Value is brutally weak; you are paying for the pocket, not the apartment.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor:
        'A continuity-heavy, lifestyle-rich family base close to the current Southbank orbit.',
      mainRisk: 'Buying too little dwelling because the suburb itself is so compelling.',
      pursueWhen:
        'A period 2BR appears at the bottom of the suburb band with parking and a sane body corp.',
    },
  },
  'mentone-2br': {
    lives:
      'A beachside station village shaped by schools, sport and the bay. It is calmer and more family-coded than the inner bayside, with enough strip life to function but little urban surplus.',
    housing:
      'A broader stock mix than most premium school suburbs: houses, villa units and older apartments in usable numbers. The main trade is commute length rather than listing scarcity.',
    fit: [
      {
        text: "Mentone Girls' Secondary and the wider school cluster are the key family draw.",
        tag: null,
      },
      {
        text: 'Beach and village life are meaningfully better than the price suggests.',
        tag: null,
      },
      {
        text: 'Distance from the city network compounds over time, especially in solo weeks.',
        tag: 'tradeoff',
      },
    ],
    decision: {
      bestFor: 'A family-oriented beach-and-schools compromise at middle-ring prices.',
      mainRisk: "Accepting a daily commute burden that erodes the suburb's upsides over years.",
      pursueWhen:
        'A solid 2BR near both the station and the school cluster lists without needing the car for basics.',
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
        text: 'Chinese-community and partner-pool signals now resolve through the generated Census criteria.',
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
      pursueWhen: 'When verified commute and property evidence justify the above-cap purchase price.',
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
  // 'Collingwood/Abbotsford' (shared)
  'inner-collingwood-2br': collingwoodAbbotsford,
  // 'Collingwood/Abbotsford' (shared)
  'inner-abbotsford-2br': collingwoodAbbotsford,
  // 'Chelsea/Bonbeach' (shared)
  'chelsea-2br': chelseaBonbeach,
  // 'Chelsea/Bonbeach' (shared)
  'bonbeach-2br': chelseaBonbeach,
}

export function suburbProfileFor(areaId) {
  return suburbProfiles[areaId] || null
}
