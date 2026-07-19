// src/data/dwelling/areaSources.js
//
// Source registry for the Areas atlas. Records reference these by id in their
// sources[] array so provenance and freshness live in one place. lastChecked is
// the date the URL was last verified as current, not the date the underlying
// data was published (that is noted per record, e.g. Census 2021).

export const areaSources = {
  abs: {
    id: 'abs',
    name: 'ABS Census QuickStats',
    detail:
      'Suburb and regional ancestry, birthplace, language and household data. Full profiles are 2021 Census.',
    url: 'https://www.abs.gov.au/census/find-census-data/quickstats',
    lastChecked: '2026-07-19',
  },
  csa: {
    id: 'csa',
    name: 'Victorian Crime Statistics Agency',
    detail:
      'Recorded offence rates by suburb, postcode and LGA. Downloadable data updated June 2026.',
    url: 'https://www.crimestatistics.vic.gov.au/',
    lastChecked: '2026-07-19',
  },
  vicplan: {
    id: 'vicplan',
    name: 'VicPlan',
    detail:
      'Property-level planning reports: zones, overlays, flood, bushfire, heritage, reservations.',
    url: 'https://mapshare.vic.gov.au/vicplan/',
    lastChecked: '2026-07-19',
  },
  ptv: {
    id: 'ptv',
    name: 'Public Transport Victoria',
    detail:
      'Timetables, frequencies and Metro Tunnel / City Loop running patterns for door-to-door commute modelling.',
    url: 'https://transport.vic.gov.au/',
    lastChecked: '2026-07-19',
  },
  domain: {
    id: 'domain',
    name: 'Domain / Cotality medians',
    detail: 'Indicative price bands by suburb and dwelling type. Estimates, not quotes.',
    url: 'https://www.domain.com.au/',
    lastChecked: null,
  },
  vgv: {
    id: 'vgv',
    name: 'Valuer-General Victoria — suburb property sales statistics',
    detail:
      'Official annual settled-price medians by suburb and broad property type. Unit figures are explicitly treated as all-bedroom proxies.',
    url: 'https://www.land.vic.gov.au/land-registration/publications',
    lastChecked: '2026-07-19',
  },
  detSchoolLocations: {
    id: 'detSchoolLocations',
    name: 'Victorian Department of Education — School Locations 2025',
    detail:
      'Official school names, school numbers, type, status and coordinates. Joined by School_No after exact-name resolution.',
    url: 'https://discover.data.vic.gov.au/dataset/school-locations-2025',
    lastChecked: '2026-07-18',
  },
  detSchoolZones2027: {
    id: 'detSchoolZones2027',
    name: 'Victorian Department of Education — School Zones 2027',
    detail:
      'Official 2027 primary and secondary spatial zones. Intersected with station catchments rather than inferred from suburb names.',
    url: 'https://discover.data.vic.gov.au/dataset/victorian-government-school-zones-2027',
    lastChecked: '2026-07-18',
  },
}
