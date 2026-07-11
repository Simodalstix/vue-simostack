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
    lastChecked: null,
  },
  csa: {
    id: 'csa',
    name: 'Victorian Crime Statistics Agency',
    detail:
      'Recorded offence rates by suburb, postcode and LGA. Downloadable data updated June 2026.',
    url: 'https://www.crimestatistics.vic.gov.au/',
    lastChecked: null,
  },
  vicplan: {
    id: 'vicplan',
    name: 'VicPlan',
    detail:
      'Property-level planning reports: zones, overlays, flood, bushfire, heritage, reservations.',
    url: 'https://mapshare.vic.gov.au/vicplan/',
    lastChecked: null,
  },
  ptv: {
    id: 'ptv',
    name: 'Public Transport Victoria',
    detail:
      'Timetables, frequencies and Metro Tunnel / City Loop running patterns for door-to-door commute modelling.',
    url: 'https://www.ptv.vic.gov.au/',
    lastChecked: null,
  },
  domain: {
    id: 'domain',
    name: 'Domain / Cotality medians',
    detail: 'Indicative price bands by suburb and dwelling type. Estimates, not quotes.',
    url: 'https://www.domain.com.au/',
    lastChecked: null,
  },
}
