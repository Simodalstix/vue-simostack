// src/data/dwelling/girlsSport.js
//
// Girls' sport access evidence for the expanded suburb profile card and the
// kid-amenity criterion, keyed by areaCorridors record id. The score uses only
// broad club/facility presence; confidence and source detail stay visible so
// the claim never outruns the owner research.
//
// Source mix:
// - original owner-supplied research JSON (melbourne_girls_sport_facilities_35_
//   records.json, 2026-07-15), 35 records checked against club finders and
//   council facility pages; the recovered artifact lives locally at
//   handoff_docs/research/ (gitignored) and is the source of truth for
//   those 35 names
// - the ten July 2026 expansion entries (Spotswood through Mentone) were
//   briefly reconstructed while the artifact was parked; restored verbatim
//   from the recovered artifact 2026-07-19
// Shipped as:
//   line         -> one-sentence summary for the card
//   facilities   -> named venues (merged into the card's facility chips)
//   clubPresence -> { netball, girlsFooty, soccer } each true | false |
//                   'unknown'. THREE-STATE: 'unknown' means not researched,
//                   never "no". Do not coerce.
//   confidence   -> 'high' | 'medium' | 'low' research confidence, shown
//                   with the claim so wording never outruns the evidence.
//   sources      -> URLs backing the record; rendered only in the evidence
//                   drawer, never in the main card body.
//
// Supplied as one combined 'Collingwood/Abbotsford' record; both ids share it.
const collingwoodAbbotsford = {
  line: "Collingwood Leisure Centre and Basketball Stadium provide swimming and courts amid active girls' field-sport culture.",
  facilities: ['Collingwood Leisure Centre', 'Collingwood Basketball Stadium'],
  clubPresence: {
    netball: true,
    girlsFooty: true,
    soccer: true,
  },
  confidence: 'medium',
  sources: [
    'https://www.yarracity.vic.gov.au/yarra-leisure/locations/collingwood-leisure-centre',
    'https://www.yarracity.vic.gov.au/residents/people-disability/services-and-activities-people-disability',
    'https://vic.netball.com.au/netball-finder',
    'https://play.afl/club-finder-map',
    'https://playfootball.com.au/football-finder',
  ],
}

// Supplied as one combined 'Chelsea/Bonbeach' record; both ids share it.
const chelseaBonbeach = {
  line: 'No major aquatic centre nearby; Bonbeach Sports Complex anchors basketball and outdoor netball.',
  facilities: ['Bonbeach Sports Complex', 'Bonbeach Reserve'],
  clubPresence: {
    netball: true,
    girlsFooty: true,
    soccer: true,
  },
  confidence: 'medium',
  sources: [
    'https://www.kingston.vic.gov.au/community/get-involved/community-groups/Chelsea-District-Basketball-Association',
    'https://www.kingston.vic.gov.au/environment/parks-and-reserves/sports-grounds-and-facilities',
    'https://vic.netball.com.au/netball-finder',
    'https://play.afl/club-finder-map',
    'https://playfootball.com.au/football-finder',
  ],
}

export const girlsSportByArea = {
  // 'Footscray'
  'footscray-station-2br': {
    line: 'Maribyrnong Aquatic Centre and RecWest Braybrook cover swimming and courts; all three target sports have local pathways.',
    facilities: ['Maribyrnong Aquatic Centre', 'RecWest Braybrook'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.maribyrnong.vic.gov.au/mac/Home',
      'https://www.maribyrnong.vic.gov.au/Parks/RecWest-Braybrook',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Seddon/West Footscray'
  'seddon-westfootscray-villa': {
    line: "Maribyrnong Aquatic Centre and RecWest Braybrook are nearby; local netball, girls' football and soccer pathways are active.",
    facilities: ['Maribyrnong Aquatic Centre', 'RecWest Braybrook'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.maribyrnong.vic.gov.au/mac/Home',
      'https://www.maribyrnong.vic.gov.au/Parks/RecWest-Braybrook',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Sunshine'
  'sunshine-station-2br': {
    line: "Sunshine Leisure Centre and RecWest Braybrook provide swimming and courts; local netball, girls' football and soccer are active.",
    facilities: ['Sunshine Leisure Centre', 'RecWest Braybrook'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://slc.brimbank.vic.gov.au/aquatics/watch-around-water',
      'https://www.maribyrnong.vic.gov.au/Parks/RecWest-Braybrook',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'St Albans'
  'established-western-value': {
    line: 'Brimbank Aquatic and Wellness Centre and Keilor Basketball Netball Stadium provide strong swim-and-court access.',
    facilities: ['Brimbank Aquatic and Wellness Centre', 'Keilor Basketball Netball Stadium'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://bawc.brimbank.vic.gov.au/',
      'https://www.brimbank.vic.gov.au/experience-brimbank/sport-and-fitness/sport-and-fitness-facilities/keilor-basketball-netball-stadium',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Kensington/Flemington'
  'inner-lowcar-benchmark': {
    line: "Kensington centre and Parkville's State Netball and Hockey Centre provide swimming, basketball and elite netball access.",
    facilities: [
      'Kensington Community Aquatic and Recreation Centre',
      'Melbourne Sports Centres – Parkville (State Netball and Hockey Centre)',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.melbourne.vic.gov.au/kensington-community-aquatic-and-recreation-centre-redevelopment',
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Brunswick/Coburg'
  'upfield-corridor': {
    line: 'Brunswick Baths, Coburg Leisure Centre and two local stadiums sit beside strong multi-sport club culture.',
    facilities: [
      'Brunswick Baths',
      'Coburg Leisure Centre',
      'Brunswick Stadium',
      'Coburg Basketball Stadium',
      'Coburg Velodrome',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://active.merri-bek.vic.gov.au/brunswick-baths/',
      'https://active.merri-bek.vic.gov.au/coburg-leisure-centre/',
      'https://active.merri-bek.vic.gov.au/sportsgrounds-and-facilities/',
      'https://www.merri-bek.vic.gov.au/exploring-merri-bek/events/venues/outdoor-venues/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Pascoe Vale/Glenroy'
  'northwest-villa-corridor': {
    line: 'Oak Park aquatic and stadium facilities provide swimming and courts; local football, netball and soccer are established.',
    facilities: [
      'Oak Park Sports and Aquatic Centre',
      'Pascoe Vale Outdoor Pool',
      'Narre Narre (Oak Park) Stadium',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://active.merri-bek.vic.gov.au/oak-park-sports-and-aquatic-centre/',
      'https://active.merri-bek.vic.gov.au/pascoe-vale-outdoor-pool/',
      'https://conversations.merri-bek.vic.gov.au/narre-narre-oak-park-stadium-refurbishment/completed',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Reservoir'
  'northern-rail-value': {
    line: 'Reservoir Leisure Centre and Darebin Community Sports Stadium provide nearby swimming, basketball and netball access.',
    facilities: [
      'Reservoir Leisure Centre',
      'Darebin Community Sports Stadium',
      'Narrandjeri Stadium',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.darebin.vic.gov.au/Events-and-facilities/Sport-in-Darebin/Reservoir-Leisure-Centre',
      'https://www.darebin.vic.gov.au/Events-and-facilities/Sport-in-Darebin/Find-and-book-a-sport-venue',
      'https://www.darebin.vic.gov.au/Events-and-facilities/Sport-in-Darebin/Narrandjeri-Stadium',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Richmond'
  'inner-richmond-2br': {
    line: "Richmond Recreation Centre and Collingwood Basketball Stadium are nearby; local girls' field-sport pathways are active.",
    facilities: ['Richmond Recreation Centre', 'Collingwood Basketball Stadium'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.yarracity.vic.gov.au/yarra-leisure/locations/richmond-recreation-centre',
      'https://www.yarracity.vic.gov.au/residents/people-disability/services-and-activities-people-disability',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Cremorne'
  'cremorne-2br': {
    line: 'Richmond Recreation Centre is nearby; major indoor basketball and netball options require travelling.',
    facilities: ['Richmond Recreation Centre'],
    clubPresence: {
      netball: 'unknown',
      girlsFooty: 'unknown',
      soccer: 'unknown',
    },
    confidence: 'low',
    sources: [
      'https://www.yarracity.vic.gov.au/yarra-leisure/locations/richmond-recreation-centre',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'South Yarra'
  'inner-south-yarra-2br': {
    line: "Prahran Aquatic Centre and MSAC provide nearby swimming and indoor courts; girls' field-sport pathways are active.",
    facilities: ['Prahran Aquatic Centre', 'Melbourne Sports and Aquatic Centre (MSAC)'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.stonnington.vic.gov.au/active/Swim/Prahran-Aquatic-Centre',
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Windsor/Prahran'
  'inner-windsor-prahran-2br': {
    line: "Prahran Aquatic Centre and MSAC cover swimming and courts, with active local netball, girls' football and soccer.",
    facilities: ['Prahran Aquatic Centre', 'Melbourne Sports and Aquatic Centre (MSAC)'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.stonnington.vic.gov.au/active/Swim/Prahran-Aquatic-Centre',
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'St Kilda'
  'st-kilda-2br': {
    line: "MSAC and St Kilda Sports Club provide aquatic and court access; local girls' field sports are active.",
    facilities: [
      'Melbourne Sports and Aquatic Centre (MSAC)',
      'St Kilda Sports Club',
      'Peanut Farm Reserve',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://melbournesportscentres.com.au/',
      'https://www.portphillip.vic.gov.au/people-and-community/community-directory/st-kilda-sports-club/',
      'https://www.portphillip.vic.gov.au/explore-the-city/sport-and-fitness/outdoor-basketball-and-netball-courts/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Balaclava/St Kilda East'
  'balaclava-2br': {
    line: "Prahran Aquatic Centre, MSAC and Alma Park support swimming, courts and active girls' field sports.",
    facilities: [
      'Prahran Aquatic Centre',
      'Melbourne Sports and Aquatic Centre (MSAC)',
      'Alma Park',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.stonnington.vic.gov.au/active/Swim/Prahran-Aquatic-Centre',
      'https://melbournesportscentres.com.au/',
      'https://www.portphillip.vic.gov.au/explore-the-city/sport-and-fitness/sporting-reserves-and-grounds/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Elwood'
  'elwood-2br': {
    line: "No major facility in-suburb; MSAC is nearby, while local girls' football and soccer pathways remain active.",
    facilities: ['Melbourne Sports and Aquatic Centre (MSAC)'],
    clubPresence: {
      netball: 'unknown',
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Carnegie/Oakleigh'
  'inner-se-apartment-corridor': {
    line: "GESAC and Oakleigh Recreation Centre provide pools, courts and gymnastics, backed by active girls' field-sport pathways.",
    facilities: [
      'Glen Eira Sports and Aquatic Centre (GESAC)',
      'Carnegie Memorial Swimming Pool',
      'Oakleigh Recreation Centre',
      'Oakleigh Stadium',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.geleisure.com.au/locations/glen-eira-sports-and-aquatic-centre',
      'https://www.geleisure.com.au/about-us/opening-hours/cmsp-opening-hours',
      'https://www.monash.vic.gov.au/Things-to-Do/Parks-Recreation/Oakleigh-Recreation-Centre',
      'https://www.monash.vic.gov.au/Things-to-Do/Sports-and-Recreation/Sports-Stadiums/Oakleigh-Stadium',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Springvale/Noble Park'
  'se-value-corridor': {
    line: 'Noble Park Aquatic Centre and Springers Leisure Centre provide swimming, basketball, netball and indoor soccer.',
    facilities: ['Noble Park Aquatic Centre', 'Springers Leisure Centre', 'Dandenong Stadium'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.greaterdandenong.vic.gov.au/sport-and-recreation/leisure-and-recreational-facilities',
      'https://www.greaterdandenong.vic.gov.au/our-environment/open-spaces/springers-leisure-centre',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Moorabbin/Cheltenham'
  'frankston-middle-ring': {
    line: 'Waves Leisure Centre and Southern Basketball Centre provide strong swimming and court access, with active field-sport pathways.',
    facilities: ['Waves Leisure Centre', 'Southern Basketball Centre'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://kingstonactive.com.au/',
      'https://www.southernbasketball.com.au/contact-us/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Tarneit/Wyndham Vale'
  'growth-corridor-stress-test': {
    line: "AquaPulse and Eagle Stadium are the major swim-and-court hubs; local girls' football, netball and soccer are active.",
    facilities: ['AquaPulse', 'Eagle Stadium'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.wyndham.vic.gov.au/venues/aquapulse',
      'https://www.wyndham.vic.gov.au/venues/eagle-stadium',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Craigieburn'
  'craigieburn-townhouse': {
    line: 'Splash and Craigieburn Sports Stadium provide pools and eight courts; Sprint Athletics Centre adds track access.',
    facilities: [
      'Splash Aqua Park and Leisure Centre',
      'Craigieburn Sports Stadium',
      'Sprint Athletics Centre',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.hume.vic.gov.au/Things-to-do/Leisure-and-Open-Space/Leisure-Centres/Splash-Aqua-Park-and-Leisure-Centre',
      'https://www.hume.vic.gov.au/Things-to-do/Leisure-and-Open-Space/Sport-and-Recreation/Sports-Stadiums-and-Facilities',
      'https://www.hume.vic.gov.au/Things-to-do/Community-Facilities/Facilities-and-spaces-for-hire/Craigieburn-Anzac-Park',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Donnybrook'
  'donnybrook-house-land': {
    line: 'Olivine Recreation Reserve has AFL ovals and netball-futsal courts; no major aquatic or indoor stadium is nearby.',
    facilities: ['Olivine Recreation Reserve'],
    clubPresence: {
      netball: 'unknown',
      girlsFooty: 'unknown',
      soccer: 'unknown',
    },
    confidence: 'low',
    sources: [
      'https://www.whittlesea.vic.gov.au/Things-to-see-and-do/Parks-trails-and-playgrounds/Local-parks-and-reserves/Olivine-Recreation-Reserve',
      'https://www.whittlesea.vic.gov.au/Things-to-see-and-do/Swimming-pools-and-leisure-centres',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Box Hill'
  'box-hill-2br': {
    line: 'Aqualink Box Hill combines pools and three courts; Box Hill Little Athletics adds a strong junior pathway.',
    facilities: ['Aqualink Box Hill', 'Box Hill Little Athletics Centre'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.aqualink.com.au/',
      'https://www.aqualink.com.au/sports-activities/stadium-court-bookings',
      'https://lavic.com.au/centres/box-hill/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Yarraville' (record created July 2026)
  'yarraville-2br': {
    line: "Maribyrnong Aquatic Centre and RecWest Braybrook are nearby, alongside active netball, girls' football and soccer pathways.",
    facilities: ['Maribyrnong Aquatic Centre', 'RecWest Braybrook'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.maribyrnong.vic.gov.au/mac/Home',
      'https://www.maribyrnong.vic.gov.au/Parks/RecWest-Braybrook',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'spotswood-2br': {
    line: 'No major facility in-suburb; Maribyrnong Aquatic Centre and RecWest Braybrook require a short trip.',
    facilities: ['Maribyrnong Aquatic Centre', 'RecWest Braybrook'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: 'unknown',
    },
    confidence: 'low',
    sources: [
      'https://www.maribyrnong.vic.gov.au/mac/Home',
      'https://www.maribyrnong.vic.gov.au/Parks/RecWest-Braybrook',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'south-melbourne-2br': {
    line: 'MSAC and Lakeside Stadium are on the doorstep for swimming, courts, athletics and soccer.',
    facilities: ['Melbourne Sports and Aquatic Centre (MSAC)', 'Lakeside Stadium'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'armadale-2br': {
    line: "Prahran Aquatic Centre and MSAC provide nearby swimming and courts; active girls' field-sport pathways surround Armadale.",
    facilities: ['Prahran Aquatic Centre', 'Melbourne Sports and Aquatic Centre (MSAC)'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.stonnington.vic.gov.au/active/Swim/Prahran-Aquatic-Centre',
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'burnley-2br': {
    line: 'Richmond Recreation Centre and Hawthorn Aquatic are nearby; major indoor court access requires travelling.',
    facilities: ['Richmond Recreation Centre', 'Hawthorn Aquatic and Leisure Centre'],
    clubPresence: {
      netball: 'unknown',
      girlsFooty: 'unknown',
      soccer: 'unknown',
    },
    confidence: 'low',
    sources: [
      'https://www.yarracity.vic.gov.au/yarra-leisure/locations/richmond-recreation-centre',
      'https://www.boroondara.vic.gov.au/explore-boroondara/sports-and-recreation/leisure-centres-and-pools/hawthorn-aquatic-and-leisure-centre',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'hawthorn-2br': {
    line: 'Hawthorn Aquatic and Leisure Centre anchors swimming; Boroondara Sports Complex adds basketball and netball courts nearby.',
    facilities: ['Hawthorn Aquatic and Leisure Centre', 'Boroondara Sports Complex'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.boroondara.vic.gov.au/explore-boroondara/sports-and-recreation/leisure-centres-and-pools/hawthorn-aquatic-and-leisure-centre',
      'https://www.boroondara.vic.gov.au/explore-boroondara/sports-and-recreation/leisure-centres-and-pools/boroondara-sports-complex',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'mckinnon-villa': {
    line: "GESAC provides nearby swimming, basketball and netball, with active girls' football and soccer pathways locally.",
    facilities: ['Glen Eira Sports and Aquatic Centre (GESAC)'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.geleisure.com.au/locations/glen-eira-sports-and-aquatic-centre',
      'https://www.geleisure.com.au/stadium/stadium-bookings',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'glen-waverley-2br': {
    line: 'Monash Aquatic and Recreation Centre leads swimming; Waverley basketball and netball venues provide extensive court access.',
    facilities: [
      'Monash Aquatic and Recreation Centre',
      'Waverley Basketball Complex',
      'Waverley Netball Centre',
    ],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.activemonash.vic.gov.au/Swimming/Pool-Facilities-Availability/Monash-Aquatic-Recreation-Centre',
      'https://www.monash.vic.gov.au/Things-to-Do/Sports-and-Recreation',
      'https://www.monash.vic.gov.au/Things-to-Do/Sports-and-Recreation/Sports-Stadiums/Waverley-Netball-Centre',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'balwyn-north-2br': {
    line: 'Boroondara Sports Complex combines pools and courts; Myrtle and Macleay Parks add eight outdoor netball courts.',
    facilities: ['Boroondara Sports Complex', 'Myrtle and Macleay Parks'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://www.boroondara.vic.gov.au/explore-boroondara/sports-and-recreation/leisure-centres-and-pools/boroondara-sports-complex',
      'https://yoursay.boroondara.vic.gov.au/myrtle-macleay-parks-master-plan',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'middle-park-2br': {
    line: 'MSAC is on the doorstep for swimming and courts; Lakeside Stadium adds athletics and soccer.',
    facilities: ['Melbourne Sports and Aquatic Centre (MSAC)', 'Lakeside Stadium'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'high',
    sources: [
      'https://melbournesportscentres.com.au/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },
  'mentone-2br': {
    line: "Waves Leisure Centre and Southern Basketball Centre provide nearby swimming and basketball; local girls' field sports are active.",
    facilities: ['Waves Leisure Centre', 'Southern Basketball Centre'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://kingstonactive.com.au/',
      'https://www.southernbasketball.com.au/contact-us/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
  },

  // 'Ivanhoe' (July 2026 onboarding pilot)
  'ivanhoe-house': {
    line: "Ivanhoe Aquatic anchors swimming and gym access; netball, girls' footy and junior soccer clubs are all active, though netball matches run at Macleod courts.",
    facilities: ['Ivanhoe Aquatic and Fitness Centre', 'Chelsworth Park'],
    clubPresence: {
      netball: true,
      girlsFooty: true,
      soccer: true,
    },
    confidence: 'medium',
    sources: [
      'https://www.banyule.vic.gov.au/Banyule-leisure/Ivanhoe-Aquatic-Banyule',
      'https://www.ivanhoenetballclub.org.au/',
      'https://www.ivanhoejfc.com.au/',
      'https://www.oldivanhoesc.com/',
      'https://vic.netball.com.au/netball-finder',
      'https://play.afl/club-finder-map',
      'https://playfootball.com.au/football-finder',
    ],
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

export function girlsSportFor(areaId) {
  return girlsSportByArea[areaId] || null
}

// Broad, auditable access score: each confirmed pathway and any researched
// facility presence contribute equally. Unknown/false pathways do not add a
// bonus, and a missing entry remains null so unresearched suburbs are never
// punished by the ranking engine.
export function sportAccessScore(entry) {
  if (!entry) return null
  const pathwayCount = ['netball', 'girlsFooty', 'soccer'].filter(
    (key) => entry.clubPresence?.[key] === true,
  ).length
  const facilityPresence = entry.facilities?.length > 0 ? 1 : 0
  return Math.min(10, (pathwayCount + facilityPresence) * 2.5)
}

// The three sports in display order, with their card labels.
export const GIRLS_SPORT_CLUBS = [
  { key: 'netball', label: 'netball' },
  { key: 'girlsFooty', label: "girls' footy" },
  { key: 'soccer', label: 'soccer' },
]
