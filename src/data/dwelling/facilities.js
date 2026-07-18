// src/data/dwelling/facilities.js
//
// Small curated family/recreation POI layer: major aquatic centres, major
// sports precincts and significant recreation anchors relevant to candidate
// suburbs. Deliberately tiny; this is not an attempt to map every facility in
// Melbourne. No facility carries a score and none feeds the ranking.
//
// Markers are passive, visible only when a relevant suburb is selected or the
// layer is explicitly enabled, and listed under "nearby facilities" in the
// suburb pane. Coordinates are OSM-derived landmark-level approximations.

export const facilities = [
  {
    id: 'msac',
    name: 'Melbourne Sports & Aquatic Centre (MSAC)',
    kind: 'aquatic',
    coordinates: [144.9576, -37.8437],
    areaIds: ['albert-park-2br', 'st-kilda-2br', 'inner-south-yarra-2br'],
    provisional: true,
  },
  {
    id: 'albert-park-precinct',
    name: 'Albert Park Lake & sports precinct',
    kind: 'recreation',
    coordinates: [144.968, -37.8446],
    areaIds: ['albert-park-2br', 'st-kilda-2br'],
    provisional: true,
  },
  {
    id: 'northcote-aquatic',
    name: 'Northcote Aquatic & Recreation Centre',
    kind: 'aquatic',
    coordinates: [144.9975, -37.7654],
    areaIds: ['northcote-2br', 'thornbury-2br'],
    provisional: true,
  },
  {
    id: 'reservoir-leisure',
    name: 'Reservoir Leisure Centre',
    kind: 'aquatic',
    coordinates: [145.0043, -37.7202],
    areaIds: ['northern-rail-value', 'preston-villa'],
    provisional: true,
  },
  {
    id: 'ivanhoe-aquatic',
    name: 'Ivanhoe Aquatic & Fitness Centre',
    kind: 'aquatic',
    coordinates: [145.0431, -37.7622],
    areaIds: ['ivanhoe-house'],
    provisional: true,
  },
  {
    id: 'aqualink-box-hill',
    name: 'Aqualink Box Hill',
    kind: 'aquatic',
    coordinates: [145.1264, -37.8271],
    areaIds: ['box-hill-2br'],
    provisional: true,
  },
  {
    id: 'harold-holt',
    name: 'Harold Holt Swim Centre',
    kind: 'aquatic',
    coordinates: [145.0417, -37.8556],
    areaIds: ['malvern-2br', 'toorak-2br'],
    provisional: true,
  },
  {
    id: 'boroondara-sports',
    name: 'Boroondara Sports Complex',
    kind: 'sports',
    coordinates: [145.0797, -37.7906],
    areaIds: ['balwyn-2br', 'kew-2br'],
    provisional: true,
  },
  {
    id: 'sunbury-aquatic',
    name: 'Sunbury Aquatic & Leisure Centre',
    kind: 'aquatic',
    coordinates: [144.7412, -37.5695],
    areaIds: ['sunbury-house'],
    provisional: true,
  },
  {
    id: 'st-kilda-sea-baths',
    name: 'St Kilda Sea Baths',
    kind: 'aquatic',
    coordinates: [144.9727, -37.8677],
    areaIds: ['st-kilda-2br'],
    provisional: true,
  },
  {
    id: 'melbourne-uni-sport',
    name: 'Melbourne University sport precinct',
    kind: 'sports',
    coordinates: [144.9598, -37.7957],
    areaIds: ['north-melbourne-2br'],
    provisional: true,
  },
]

export function facilitiesForArea(areaId) {
  return facilities.filter((f) => f.areaIds.includes(areaId))
}

export const facilityFeatures = {
  type: 'FeatureCollection',
  features: facilities.map((f, i) => ({
    type: 'Feature',
    id: i,
    properties: { facilityId: f.id, name: f.name, kind: f.kind, areaIds: f.areaIds },
    geometry: { type: 'Point', coordinates: f.coordinates },
  })),
}
