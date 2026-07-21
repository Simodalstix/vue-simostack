// src/data/dwelling/areaGeo.js
//
// Geographic registry for the Settle map. Keyed by areaCorridors[].id — the SAME
// id that strategies[].lensSuburbs already reference — so this is a stable
// extension of the existing linkage, never a parallel identity scheme.
//
// This file is PURELY geographic: verified station points, the localities a
// record covers, and nothing else. It carries NO colours, NO presentation
// classes and NO scores. Scores and prices stay in areaCorridors.js.
//
// COORDINATES are longitude-first ([lng, lat], GeoJSON order) and are
// OpenStreetMap-derived to roughly station-platform precision. They are
// provisional like the rest of the dwelling dataset: `verifiedAt` is set only
// where a coordinate was cross-checked against a public source during this
// pass, and null otherwise. A wrong dot is a map bug, so treat these as
// re-verifiable, not authoritative.
//
// MANY-TO-MANY by design: a combined record (Seddon / West Footscray,
// Carnegie / Oakleigh, Brunswick / Coburg) lists every station point it spans,
// and the map draws each point sharing that record's single score.
// Do NOT derive canonical ids from the human-readable `suburb`/`station` labels
// at runtime — always key off the record id.

import { areaCorridors } from './areaCorridors.js'
import { strategies } from './strategies.js'

// Shorthand: coordinates cross-checked against a public gazetteer this pass.
const V = '2026-07-13'
const OSM = 'OpenStreetMap'

export const areaGeo = {
  // ---- Inner ---------------------------------------------------------------
  'inner-south-yarra-2br': {
    localityNames: ['South Yarra'],
    stationPoints: [
      {
        id: 'south-yarra',
        name: 'South Yarra',
        coordinates: [144.9924, -37.8389],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'anzac',
        name: 'Anzac (Metro Tunnel)',
        coordinates: [144.9758, -37.8407],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-richmond-2br': {
    localityNames: ['Richmond'],
    stationPoints: [
      {
        id: 'richmond',
        name: 'Richmond',
        coordinates: [144.9895, -37.8231],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'east-richmond',
        name: 'East Richmond',
        coordinates: [144.9931, -37.8266],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-collingwood-2br': {
    localityNames: ['Collingwood'],
    stationPoints: [
      {
        id: 'victoria-park',
        name: 'Victoria Park',
        coordinates: [144.9906, -37.7986],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'collingwood',
        name: 'Collingwood',
        coordinates: [144.9878, -37.8017],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-windsor-prahran-2br': {
    localityNames: ['Windsor', 'Prahran'],
    stationPoints: [
      {
        id: 'windsor',
        name: 'Windsor',
        coordinates: [144.9906, -37.8558],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'prahran',
        name: 'Prahran',
        coordinates: [144.9931, -37.8517],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-abbotsford-2br': {
    localityNames: ['Abbotsford'],
    stationPoints: [
      {
        id: 'victoria-park-abb',
        name: 'Victoria Park',
        coordinates: [144.9906, -37.7986],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'collingwood-abb',
        name: 'Collingwood',
        coordinates: [144.9878, -37.8017],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'inner-lowcar-benchmark': {
    localityNames: ['Kensington', 'Flemington'],
    stationPoints: [
      {
        id: 'kensington',
        name: 'Kensington',
        coordinates: [144.9302, -37.7943],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'newmarket',
        name: 'Newmarket',
        coordinates: [144.927, -37.7876],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'melbourne-cbd-2br': {
    localityNames: ['Melbourne'],
    stationPoints: [
      {
        id: 'melbourne-central',
        name: 'Melbourne Central',
        coordinates: [144.9629, -37.8102],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'east-melbourne-2br': {
    localityNames: ['East Melbourne'],
    stationPoints: [
      {
        id: 'parliament-east-melbourne',
        name: 'Parliament',
        coordinates: [144.9729, -37.8111],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'west-melbourne-2br': {
    localityNames: ['West Melbourne'],
    stationPoints: [
      {
        id: 'north-melbourne-west-melbourne',
        name: 'North Melbourne',
        coordinates: [144.9426, -37.8071],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'docklands-2br': {
    localityNames: ['Docklands'],
    stationPoints: [
      {
        id: 'southern-cross-docklands',
        name: 'Southern Cross',
        coordinates: [144.951, -37.8183],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'carlton-2br': {
    localityNames: ['Carlton'],
    tramOnly: true,
    stationPoints: [],
  },
  'fitzroy-2br': {
    localityNames: ['Fitzroy'],
    tramOnly: true,
    stationPoints: [],
  },
  'parkville-2br': {
    localityNames: ['Parkville'],
    stationPoints: [
      {
        id: 'parkville-metro',
        name: 'Parkville (Metro Tunnel)',
        coordinates: [144.958, -37.8009],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'carlton-north-2br': {
    localityNames: ['Carlton North'],
    tramOnly: true,
    stationPoints: [],
  },
  'fitzroy-north-2br': {
    localityNames: ['Fitzroy North'],
    tramOnly: true,
    stationPoints: [],
  },
  'brunswick-east-2br': {
    localityNames: ['Brunswick East'],
    tramOnly: true,
    stationPoints: [],
  },

  // ---- West ----------------------------------------------------------------
  'sunshine-station-2br': {
    localityNames: ['Sunshine'],
    stationPoints: [
      {
        id: 'sunshine',
        name: 'Sunshine',
        coordinates: [144.8307, -37.788],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'footscray-station-2br': {
    localityNames: ['Footscray'],
    stationPoints: [
      {
        id: 'footscray',
        name: 'Footscray',
        coordinates: [144.9006, -37.8006],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'seddon-westfootscray-villa': {
    localityNames: ['Seddon', 'West Footscray'],
    stationPoints: [
      {
        id: 'seddon',
        name: 'Seddon',
        coordinates: [144.8906, -37.8079],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'west-footscray',
        name: 'West Footscray',
        coordinates: [144.876, -37.7997],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'yarraville-2br': {
    localityNames: ['Yarraville'],
    stationPoints: [
      {
        id: 'yarraville',
        name: 'Yarraville',
        coordinates: [144.8899, -37.8158],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'spotswood-2br': {
    localityNames: ['Spotswood'],
    stationPoints: [
      {
        id: 'spotswood',
        name: 'Spotswood',
        coordinates: [144.8859, -37.8307],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'established-western-value': {
    localityNames: ['St Albans'],
    stationPoints: [
      {
        id: 'st-albans',
        name: 'St Albans',
        coordinates: [144.7997, -37.7445],
        source: OSM,
        verifiedAt: V,
      },
    ],
  },

  // ---- North ---------------------------------------------------------------
  'northwest-villa-corridor': {
    localityNames: ['Pascoe Vale', 'Glenroy'],
    stationPoints: [
      {
        id: 'pascoe-vale',
        name: 'Pascoe Vale',
        coordinates: [144.937, -37.7297],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'glenroy',
        name: 'Glenroy',
        coordinates: [144.9163, -37.7057],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'upfield-corridor': {
    localityNames: ['Brunswick', 'Coburg'],
    stationPoints: [
      {
        id: 'brunswick',
        name: 'Brunswick',
        coordinates: [144.9601, -37.7686],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'jewell',
        name: 'Jewell',
        coordinates: [144.9614, -37.7746],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'coburg',
        name: 'Coburg',
        coordinates: [144.9639, -37.7439],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'northern-rail-value': {
    localityNames: ['Reservoir'],
    stationPoints: [
      {
        id: 'reservoir',
        name: 'Reservoir',
        coordinates: [145.006, -37.7163],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'ruthven',
        name: 'Ruthven',
        coordinates: [145.0096, -37.702],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'ascot-vale-2br': {
    localityNames: ['Ascot Vale'],
    stationPoints: [
      {
        id: 'ascot-vale',
        name: 'Ascot Vale',
        coordinates: [144.9213, -37.777],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  'essendon-2br': {
    localityNames: ['Essendon'],
    stationPoints: [
      {
        id: 'essendon',
        name: 'Essendon',
        // Same OSM-derived point the schematic Craigieburn line already uses
        // in trainLines.js; re-verify against a public gazetteer next pass.
        coordinates: [144.9095, -37.7561],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- East and south-east -------------------------------------------------
  'inner-se-apartment-corridor': {
    localityNames: ['Carnegie', 'Murrumbeena', 'Oakleigh'],
    stationPoints: [
      {
        id: 'carnegie',
        name: 'Carnegie',
        coordinates: [145.0558, -37.8877],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'murrumbeena',
        name: 'Murrumbeena',
        coordinates: [145.0672, -37.8887],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'oakleigh',
        name: 'Oakleigh',
        coordinates: [145.0888, -37.9003],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'se-value-corridor': {
    localityNames: ['Springvale', 'Noble Park', 'Clayton'],
    stationPoints: [
      {
        id: 'springvale',
        name: 'Springvale',
        coordinates: [145.152, -37.9483],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'noble-park',
        name: 'Noble Park',
        coordinates: [145.1743, -37.9662],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'clayton',
        name: 'Clayton',
        coordinates: [145.1207, -37.9243],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- South ---------------------------------------------------------------
  'frankston-middle-ring': {
    localityNames: ['Moorabbin', 'Highett', 'Cheltenham'],
    stationPoints: [
      {
        id: 'moorabbin',
        name: 'Moorabbin',
        coordinates: [145.0397, -37.9394],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'highett',
        name: 'Highett',
        coordinates: [145.043, -37.949],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'cheltenham',
        name: 'Cheltenham',
        coordinates: [145.0533, -37.9636],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  // ---- Outer growth areas (control group) ----------------------------------
  'growth-corridor-stress-test': {
    localityNames: ['Tarneit', 'Wyndham Vale'],
    stationPoints: [
      {
        id: 'tarneit',
        name: 'Tarneit',
        coordinates: [144.6946, -37.8322],
        source: OSM,
        verifiedAt: V,
      },
      {
        id: 'wyndham-vale',
        name: 'Wyndham Vale',
        coordinates: [144.6227, -37.8877],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'craigieburn-townhouse': {
    localityNames: ['Craigieburn'],
    stationPoints: [
      {
        id: 'craigieburn',
        name: 'Craigieburn',
        coordinates: [144.9431, -37.6023],
        source: OSM,
        verifiedAt: V,
      },
    ],
  },
  'donnybrook-house-land': {
    localityNames: ['Donnybrook'],
    stationPoints: [
      {
        id: 'donnybrook',
        name: 'Donnybrook',
        coordinates: [144.9701, -37.542],
        source: OSM,
        verifiedAt: V,
      },
    ],
  },

  // ---- July 2026 Settle expansion: individual suburb records. -----------
  // Coordinates are OSM-derived to roughly station precision and provisional
  // (verifiedAt: null) like the rest of the registry. Records with
  // tramOnly: true have no heavy-rail station; their commute runs on trams or
  // light rail and they carry no station points by design.
  'northcote-2br': {
    localityNames: ['Northcote'],
    stationPoints: [
      {
        id: 'northcote',
        name: 'Northcote',
        coordinates: [144.9958, -37.7699],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'merri',
        name: 'Merri',
        coordinates: [144.9906, -37.7757],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'thornbury-2br': {
    localityNames: ['Thornbury'],
    stationPoints: [
      {
        id: 'thornbury',
        name: 'Thornbury',
        coordinates: [144.9971, -37.7614],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'preston-villa': {
    localityNames: ['Preston'],
    stationPoints: [
      {
        id: 'preston',
        name: 'Preston',
        coordinates: [145.0005, -37.7385],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'bell',
        name: 'Bell',
        coordinates: [144.9987, -37.7472],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'box-hill-2br': {
    localityNames: ['Box Hill'],
    stationPoints: [
      {
        id: 'box-hill',
        name: 'Box Hill',
        coordinates: [145.1195, -37.8193],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'malvern-2br': {
    localityNames: ['Malvern'],
    stationPoints: [
      {
        id: 'malvern',
        name: 'Malvern',
        coordinates: [145.0284, -37.8663],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'toorak-2br': {
    localityNames: ['Toorak'],
    stationPoints: [
      {
        id: 'toorak',
        name: 'Toorak',
        coordinates: [145.0141, -37.8506],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'kew-2br': {
    localityNames: ['Kew'],
    tramOnly: true,
    stationPoints: [],
  },
  'clifton-hill-2br': {
    localityNames: ['Clifton Hill'],
    stationPoints: [
      {
        id: 'clifton-hill',
        name: 'Clifton Hill',
        coordinates: [144.9953, -37.7885],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  // Bus-only record: the DART Park & Ride acts as the commute anchor point the
  // same way St Kilda uses its light-rail terminus. No heavy rail exists.
  'doncaster-villa': {
    localityNames: ['Doncaster'],
    busOnly: true,
    stationPoints: [
      {
        id: 'doncaster-park-ride',
        name: 'Doncaster Park & Ride (DART)',
        coordinates: [145.1039, -37.7916],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'balwyn-2br': {
    localityNames: ['Balwyn'],
    tramOnly: true,
    stationPoints: [],
  },
  'albert-park-2br': {
    localityNames: ['Albert Park'],
    tramOnly: true,
    stationPoints: [],
  },
  'st-kilda-2br': {
    localityNames: ['St Kilda'],
    tramOnly: true,
    // The route 96 light-rail terminus at the old St Kilda station site acts
    // as the commute anchor point even though it is not heavy rail.
    stationPoints: [
      {
        id: 'st-kilda-96',
        name: 'St Kilda (route 96 light rail)',
        coordinates: [144.9718, -37.8593],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'balaclava-2br': {
    localityNames: ['Balaclava'],
    stationPoints: [
      {
        id: 'balaclava',
        name: 'Balaclava',
        coordinates: [144.993, -37.8693],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'elwood-2br': {
    localityNames: ['Elwood'],
    stationPoints: [
      {
        id: 'balaclava-elwood',
        name: 'Balaclava',
        coordinates: [144.993, -37.8693],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'elsternwick-elwood',
        name: 'Elsternwick',
        coordinates: [145.0037, -37.8853],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'cremorne-2br': {
    localityNames: ['Cremorne'],
    stationPoints: [
      {
        id: 'richmond-cremorne',
        name: 'Richmond',
        coordinates: [144.9895, -37.8231],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'east-richmond-cremorne',
        name: 'East Richmond',
        coordinates: [144.9931, -37.8266],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'chelsea-2br': {
    localityNames: ['Chelsea'],
    stationPoints: [
      {
        id: 'chelsea',
        name: 'Chelsea',
        coordinates: [145.1168, -38.0512],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'bonbeach-2br': {
    localityNames: ['Bonbeach'],
    stationPoints: [
      {
        id: 'bonbeach',
        name: 'Bonbeach',
        coordinates: [145.1207, -38.0624],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'north-melbourne-2br': {
    localityNames: ['North Melbourne'],
    stationPoints: [
      {
        id: 'north-melbourne',
        name: 'North Melbourne',
        coordinates: [144.9426, -37.8071],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'arden',
        name: 'Arden (Metro Tunnel)',
        coordinates: [144.9421, -37.7998],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'sunbury-house': {
    localityNames: ['Sunbury'],
    stationPoints: [
      {
        id: 'sunbury',
        name: 'Sunbury',
        coordinates: [144.7274, -37.5793],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'south-melbourne-2br': {
    localityNames: ['South Melbourne'],
    tramOnly: true,
    stationPoints: [],
  },
  'armadale-2br': {
    localityNames: ['Armadale'],
    stationPoints: [
      {
        id: 'armadale',
        name: 'Armadale',
        coordinates: [145.0206, -37.8557],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'burnley-2br': {
    localityNames: ['Burnley'],
    stationPoints: [
      {
        id: 'burnley',
        name: 'Burnley',
        coordinates: [145.0079, -37.8276],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'hawthorn-2br': {
    localityNames: ['Hawthorn'],
    stationPoints: [
      {
        id: 'hawthorn',
        name: 'Hawthorn',
        coordinates: [145.0233, -37.8217],
        source: OSM,
        verifiedAt: null,
      },
      {
        id: 'glenferrie-hawthorn',
        name: 'Glenferrie',
        coordinates: [145.0353, -37.8219],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'mckinnon-villa': {
    localityNames: ['McKinnon'],
    stationPoints: [
      {
        id: 'mckinnon',
        name: 'McKinnon',
        coordinates: [145.0381, -37.9115],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'glen-waverley-2br': {
    localityNames: ['Glen Waverley'],
    stationPoints: [
      {
        id: 'glen-waverley',
        name: 'Glen Waverley',
        coordinates: [145.1629, -37.8797],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'balwyn-north-2br': {
    localityNames: ['Balwyn North'],
    tramOnly: true,
    stationPoints: [],
  },
  'middle-park-2br': {
    localityNames: ['Middle Park'],
    tramOnly: true,
    stationPoints: [],
  },
  'mentone-2br': {
    localityNames: ['Mentone'],
    stationPoints: [
      {
        id: 'mentone',
        name: 'Mentone',
        coordinates: [145.0663, -37.9836],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'ivanhoe-house': {
    localityNames: ['Ivanhoe'],
    stationPoints: [
      {
        id: 'ivanhoe',
        name: 'Ivanhoe',
        coordinates: [145.0455, -37.7689],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'heidelberg-3br-townhouse': {
    localityNames: ['Heidelberg'],
    stationPoints: [
      {
        id: 'heidelberg',
        name: 'Heidelberg',
        coordinates: [145.0607923, -37.7571092],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'rosanna-house': {
    localityNames: ['Rosanna'],
    stationPoints: [
      {
        id: 'rosanna',
        name: 'Rosanna',
        coordinates: [145.0661791, -37.7428788],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'fairfield-house': {
    localityNames: ['Fairfield'],
    stationPoints: [
      {
        id: 'fairfield',
        name: 'Fairfield',
        coordinates: [145.0169241, -37.7791763],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'surrey-hills-house': {
    localityNames: ['Surrey Hills'],
    stationPoints: [
      {
        id: 'union',
        name: 'Union',
        coordinates: [145.1014154, -37.8223766],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'blackburn-house': {
    localityNames: ['Blackburn'],
    stationPoints: [
      {
        id: 'blackburn',
        name: 'Blackburn',
        coordinates: [145.1500487, -37.8200847],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'mount-waverley-villa': {
    localityNames: ['Mount Waverley'],
    stationPoints: [
      {
        id: 'mount-waverley',
        name: 'Mount Waverley',
        coordinates: [145.1281258, -37.8752637],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'ashburton-villa': {
    localityNames: ['Ashburton'],
    stationPoints: [
      {
        id: 'ashburton',
        name: 'Ashburton',
        coordinates: [145.0814007, -37.8620025],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'bentleigh-house': {
    localityNames: ['Bentleigh'],
    stationPoints: [
      {
        id: 'bentleigh',
        name: 'Bentleigh',
        coordinates: [145.0369346, -37.9175354],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'newport-house': {
    localityNames: ['Newport'],
    stationPoints: [
      {
        id: 'newport',
        name: 'Newport',
        coordinates: [144.8835734, -37.8424593],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },

  'fawkner-house': {
    localityNames: ['Fawkner'],
    stationPoints: [
      {
        id: 'fawkner',
        name: 'Fawkner',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [144.9601, -37.7147],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'thomastown-house': {
    localityNames: ['Thomastown'],
    stationPoints: [
      {
        id: 'thomastown',
        name: 'Thomastown',
        // Same OSM-derived point the schematic map already uses in trainLines.js.
        coordinates: [145.0128, -37.6811],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'bundoora-house': {
    localityNames: ['Bundoora'],
    tramOnly: true,
    stationPoints: [
      {
        id: 'bundoora-anchor',
        name: 'Bundoora (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.06, -37.7],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'viewbank-house': {
    localityNames: ['Viewbank'],
    stationPoints: [
      {
        id: 'viewbank-anchor',
        name: 'Viewbank (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.091, -37.74],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'watsonia-house': {
    localityNames: ['Watsonia'],
    stationPoints: [
      {
        id: 'watsonia',
        name: 'Watsonia',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [145.0837, -37.711],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'eltham-house': {
    localityNames: ['Eltham'],
    stationPoints: [
      {
        id: 'eltham',
        name: 'Eltham',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [145.1445, -37.7156],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'williamstown-house': {
    localityNames: ['Williamstown'],
    stationPoints: [
      {
        id: 'williamstown',
        name: 'Williamstown',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [144.897, -37.8687],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'point-cook-house': {
    localityNames: ['Point Cook'],
    stationPoints: [
      {
        id: 'point-cook-anchor',
        name: 'Point Cook (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [144.748, -37.889],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'werribee-house': {
    localityNames: ['Werribee'],
    stationPoints: [
      {
        id: 'werribee',
        name: 'Werribee',
        // Same OSM-derived point the schematic map already uses in trainLines.js.
        coordinates: [144.66, -37.9],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'moonee-ponds-2br': {
    localityNames: ['Moonee Ponds'],
    stationPoints: [
      {
        id: 'moonee-ponds',
        name: 'Moonee Ponds',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [144.9188, -37.766],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'eltham-north-house': {
    localityNames: ['Eltham North'],
    stationPoints: [
      {
        id: 'eltham-north-anchor',
        name: 'Eltham North (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.15, -37.695],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'essendon-west-house': {
    localityNames: ['Essendon West'],
    stationPoints: [
      {
        id: 'essendon-west-anchor',
        name: 'Essendon West (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [144.893, -37.755],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'watsonia-north-house': {
    localityNames: ['Watsonia North'],
    stationPoints: [
      {
        id: 'watsonia-north-anchor',
        name: 'Watsonia North (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.083, -37.7],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'black-rock-house': {
    localityNames: ['Black Rock'],
    stationPoints: [
      {
        id: 'black-rock-anchor',
        name: 'Black Rock (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.017, -37.9735],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'braybrook-villa': {
    localityNames: ['Braybrook'],
    stationPoints: [
      {
        id: 'braybrook-anchor',
        name: 'Braybrook (locality anchor)',
        // Representative point of the vendored locality polygon.
        coordinates: [144.8557, -37.7837],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'brighton-house': {
    localityNames: ['Brighton'],
    stationPoints: [
      {
        id: 'brighton-beach',
        name: 'Brighton Beach',
        // Same OSM-derived point the schematic map already uses in trainLines.js.
        coordinates: [145.01, -37.9199],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'bulleen-house': {
    localityNames: ['Bulleen'],
    stationPoints: [
      {
        id: 'bulleen-anchor',
        name: 'Bulleen (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.085, -37.766],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'burwood-house': {
    localityNames: ['Burwood'],
    tramOnly: true,
    stationPoints: [
      {
        id: 'burwood-anchor',
        name: 'Burwood (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [145.108, -37.8495],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'camberwell-2br': {
    localityNames: ['Camberwell'],
    stationPoints: [
      {
        id: 'camberwell',
        name: 'Camberwell',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [145.0587, -37.8265],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'elsternwick-2br': {
    localityNames: ['Elsternwick'],
    stationPoints: [
      {
        id: 'elsternwick',
        name: 'Elsternwick',
        // Same OSM-derived point the schematic map already uses in trainLines.js.
        coordinates: [145.0037, -37.8853],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'hawthorn-east-2br': {
    localityNames: ['Hawthorn East'],
    stationPoints: [
      {
        id: 'auburn',
        name: 'Auburn',
        // OSM-derived this pass; re-verify against a public gazetteer next pass.
        coordinates: [145.046, -37.8222],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'st-kilda-east-2br': {
    localityNames: ['St Kilda East'],
    tramOnly: true,
    stationPoints: [
      {
        id: 'st-kilda-east-anchor',
        name: 'St Kilda East (locality anchor)',
        // Representative point of the vendored locality polygon.
        coordinates: [145.0037, -37.8717],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
  'st-kilda-west-2br': {
    localityNames: ['St Kilda West'],
    tramOnly: true,
    stationPoints: [
      {
        id: 'st-kilda-west-anchor',
        name: 'St Kilda West (locality anchor)',
        // PROVISIONAL locality anchor, low precision; replace with the polygon-derived point once the locality is vendored.
        coordinates: [144.9705, -37.8598],
        source: OSM,
        verifiedAt: null,
      },
    ],
  },
}

export function localitiesForArea(areaId) {
  return areaGeo[areaId]?.localityNames || []
}

export function isGroupedArea(areaId) {
  return localitiesForArea(areaId).length > 1
}

export function formatLocalityList(names) {
  if (!names?.length) return ''
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
}

export function coverageLabelForArea(areaId) {
  return formatLocalityList(localitiesForArea(areaId))
}

// Strategy ids that apply to each area, derived (not hand-duplicated) from the
// existing strategies[].lensSuburbs many-to-many linkage. Keyed by area id.
export const strategyIdsByArea = (() => {
  const map = {}
  for (const s of strategies) {
    for (const areaId of s.lensSuburbs || []) {
      ;(map[areaId] ||= []).push(s.id)
    }
  }
  return map
})()

// Dev-only integrity check: warn about any scored ranking record with no map
// configuration (it would silently vanish from the map), any geo entry with no
// station points, and any geo entry pointing at a record that no longer exists.
export function validateAreaGeo() {
  const recIds = new Set(areaCorridors.map((r) => r.id))
  const warnings = []
  for (const rec of areaCorridors) {
    if (rec.scored === false) continue
    const geo = areaGeo[rec.id]
    if (!geo)
      warnings.push(`ranking record "${rec.id}" has no map configuration (won't appear on the map)`)
    else if (!geo.stationPoints?.length && !geo.tramOnly)
      warnings.push(`"${rec.id}" has no station points`)
  }
  for (const key of Object.keys(areaGeo)) {
    if (!recIds.has(key))
      warnings.push(`geo entry "${key}" references a non-existent ranking record`)
  }
  for (const w of warnings) console.warn(`[areaGeo] ${w}`)
  return warnings
}

if (import.meta.env && import.meta.env.DEV) validateAreaGeo()
