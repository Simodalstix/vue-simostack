// src/data/dwelling/schools.js
//
// Curated school layer for the Decide map. PURPLE accent territory: schools
// render in the school/community purple, never in score colours.
//
// SCOPE AND HONESTY
// - Only schools already named in the areaCorridors childhood research (plus a
//   handful of unambiguous anchors) are listed. This is NOT a city-wide school
//   dataset and must not become a permanent marker cloud: the map shows a
//   suburb's schools only when that suburb is selected, or when the school
//   layer is explicitly enabled.
// - Coordinates are OSM-derived approximations to roughly campus precision,
//   provisional like every other coordinate in this feature. A missing school
//   is fine; an invented one is not. Add coordinates only when you can point
//   at the campus on a map.
// - ZONES ARE NOT MODELLED YET. School zones are street-level and can vary
//   within a suburb; any zone claim must be verified for the exact address at
//   findmyschool.vic.gov.au. Zone polygons are deferred until the official
//   dataset is transformed (see schoolZones note at the bottom).
//
// category: 'primary' | 'secondary' | 'combined' | 'specialist'
// sector:   'government' | 'independent' | 'catholic'
// areaIds:  ranking records this school is relevant to (usually its suburb's
//           record; a strong zoned school may list neighbouring records).

export const SCHOOL_DATASET = {
  source: 'Owner research, name-level, from the areaCorridors childhood notes',
  sourceYear: 2026,
  note: 'Verify any zone at findmyschool.vic.gov.au before relying on it.',
}

export const schools = [
  {
    id: 'south-yarra-ps',
    name: 'South Yarra PS',
    category: 'primary',
    sector: 'government',
    coordinates: [144.993, -37.8442],
    areaIds: ['inner-south-yarra-2br'],
    provisional: true,
  },
  {
    id: 'prahran-high',
    name: 'Prahran High',
    category: 'secondary',
    sector: 'government',
    coordinates: [144.9903, -37.8497],
    areaIds: ['inner-windsor-prahran-2br', 'inner-south-yarra-2br', 'toorak-2br'],
    provisional: true,
  },
  {
    id: 'northcote-high',
    name: 'Northcote High',
    category: 'secondary',
    sector: 'government',
    coordinates: [144.9885, -37.7645],
    areaIds: ['northcote-2br', 'thornbury-2br'],
    provisional: true,
  },
  {
    id: 'westgarth-ps',
    name: 'Westgarth PS',
    category: 'primary',
    sector: 'government',
    coordinates: [144.9925, -37.7784],
    areaIds: ['northcote-2br'],
    provisional: true,
  },
  {
    id: 'thornbury-high',
    name: 'Thornbury High',
    category: 'secondary',
    sector: 'government',
    coordinates: [145.0058, -37.7551],
    areaIds: ['thornbury-2br'],
    provisional: true,
  },
  {
    id: 'preston-high',
    name: 'Preston High',
    category: 'secondary',
    sector: 'government',
    coordinates: [145.0163, -37.7431],
    areaIds: ['preston-villa'],
    provisional: true,
  },
  {
    id: 'box-hill-high',
    name: 'Box Hill High',
    category: 'secondary',
    sector: 'government',
    coordinates: [145.1213, -37.8158],
    areaIds: ['box-hill-2br'],
    provisional: true,
  },
  {
    id: 'balwyn-high',
    name: 'Balwyn High',
    category: 'secondary',
    sector: 'government',
    coordinates: [145.0803, -37.7998],
    areaIds: ['balwyn-2br'],
    provisional: true,
  },
  {
    id: 'kew-high',
    name: 'Kew High',
    category: 'secondary',
    sector: 'government',
    coordinates: [145.0532, -37.7938],
    areaIds: ['kew-2br'],
    provisional: true,
  },
  {
    id: 'albert-park-college',
    name: 'Albert Park College',
    category: 'secondary',
    sector: 'government',
    coordinates: [144.9539, -37.8419],
    areaIds: ['albert-park-2br', 'st-kilda-2br'],
    provisional: true,
  },
  {
    id: 'albert-park-ps',
    name: 'Albert Park PS',
    category: 'primary',
    sector: 'government',
    coordinates: [144.9522, -37.8443],
    areaIds: ['albert-park-2br'],
    provisional: true,
  },
  {
    id: 'st-kilda-ps',
    name: 'St Kilda PS',
    category: 'primary',
    sector: 'government',
    coordinates: [144.9836, -37.8635],
    areaIds: ['st-kilda-2br'],
    provisional: true,
  },
  {
    id: 'university-high',
    name: 'University High (Parkville)',
    category: 'secondary',
    sector: 'government',
    coordinates: [144.9538, -37.7961],
    areaIds: ['north-melbourne-2br'],
    provisional: true,
  },
  {
    id: 'north-melbourne-ps',
    name: 'North Melbourne PS',
    category: 'primary',
    sector: 'government',
    coordinates: [144.9451, -37.8028],
    areaIds: ['north-melbourne-2br'],
    provisional: true,
  },
  {
    id: 'melbourne-high',
    name: 'Melbourne High (selective entry)',
    category: 'secondary',
    sector: 'government',
    coordinates: [144.9946, -37.8332],
    areaIds: ['inner-south-yarra-2br'],
    provisional: true,
  },
  {
    id: 'sunbury-college',
    name: 'Sunbury College',
    category: 'secondary',
    sector: 'government',
    coordinates: [144.7194, -37.5847],
    areaIds: ['sunbury-house'],
    provisional: true,
  },
  {
    id: 'salesian-rupertswood',
    name: 'Salesian College Rupertswood',
    category: 'secondary',
    sector: 'catholic',
    coordinates: [144.7409, -37.5713],
    areaIds: ['sunbury-house'],
    provisional: true,
  },
]

export function schoolsForArea(areaId) {
  return schools.filter((s) => s.areaIds.includes(areaId))
}

// GeoJSON for the map layer; feature id = array index for feature-state.
export const schoolFeatures = {
  type: 'FeatureCollection',
  features: schools.map((s, i) => ({
    type: 'Feature',
    id: i,
    properties: {
      schoolId: s.id,
      name: s.name,
      category: s.category,
      sector: s.sector,
      areaIds: s.areaIds,
    },
    geometry: { type: 'Point', coordinates: s.coordinates },
  })),
}

// SCHOOL ZONES (deferred). When the official zone dataset is transformed, add
// `schoolZones.js` exporting { schoolId, year, category, geometry } polygons
// plus a per-zone `year` for display, and render them as a faint translucent
// purple fill with a clear boundary stroke, only for the selected suburb and
// only behind a Primary / Secondary toggle. Zones can vary within a suburb and
// must be verified for an exact property address.
