// src/data/dwelling/regions.js
//
// Regional reading material for the Overview tab. Presentation-agnostic prose
// consumed by RegionLens.vue and summarised in the Overview accordion.

export const regions = [
  {
    name: 'West',
    why: [
      'Often the strongest intersection of price and CBD access.',
      'Several substantial activity centres with good cultural food and retail.',
      'Flat, practical cycling terrain; older apartments and villa units alongside new stock.',
    ],
    watch: [
      'Freight rail, industrial activity and truck routes.',
      'Flood, contamination and aircraft-noise pockets.',
      'Some cheap homes are cheap because they are cut off from stations and services.',
      'Western versus central Collins St can produce very different results.',
    ],
    corridors:
      'Sunbury line, Werribee and Williamstown; Metro Tunnel one-seat from the Sunbury corridor.',
  },
  {
    name: 'North',
    why: [
      'Older villa units and compact townhouses.',
      'Strong local shopping strips; parks, trails and cycling closer to the city.',
      'More traditional residential environments than many apartment precincts.',
    ],
    watch: [
      'The inner north is no longer reliably inexpensive.',
      'Some rail corridors are slower than their distance suggests.',
      'Bus gaps and long station walks can quietly create car dependence.',
      'Parking and narrow-lot layouts can be awkward.',
    ],
    corridors:
      'Craigieburn, Upfield and Mernda lines; inner tram routes and low-car benchmark suburbs.',
  },
  {
    name: 'East and south-east',
    why: [
      'Strong rail and established activity centres.',
      'Extensive supermarkets, medical services and cultural amenities.',
      'A substantial supply of apartments and units; Metro Tunnel benefits the Cranbourne/Pakenham corridor.',
    ],
    watch: [
      'Higher purchase costs closer to the city.',
      'School-zone premiums can affect properties irrelevant to your needs.',
      'Large apartment developments require careful defect and owners-corporation review.',
      'Major roads and rail corridors create noise pockets.',
    ],
    corridors: 'Cranbourne/Pakenham line via the Metro Tunnel; established south-east centres.',
  },
  {
    name: 'South',
    why: [
      'Established shops and services with Frankston-line access.',
      'Bayside recreation and outdoor amenity.',
      'Older apartment and villa stock around selected stations.',
    ],
    watch: [
      'Bayside branding raises prices closer in.',
      'The affordable end of the corridor can mean a long daily commute.',
      'Flood, salt exposure and insurance need property-level review.',
      'Car use increases rapidly away from rail centres.',
    ],
    corridors: 'Frankston line, running through the City Loop all day in 2026.',
  },
  {
    name: 'Outer growth areas',
    controlGroup: true,
    note: 'Here mainly as a control group showing why headline affordability can mislead. A $550k new house needing two cars, long station drives and tolls can suit the brief less than a $600k older unit near reliable rail.',
    why: ['New compact houses and small lots at a low headline price.'],
    watch: [
      'Service lag and immature amenity.',
      'Car dependence and long door-to-door travel.',
      'Construction and defect risk on new builds.',
    ],
    corridors: 'Tarneit, Wyndham Vale, Mernda, Craigieburn and Cranbourne fringes.',
  },
]
