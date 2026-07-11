<template>
  <section>
    <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
      Regional lens · read before the ranking
    </h2>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
      <article
        v-for="r in regions"
        :key="r.name"
        class="bg-ob-surface border border-ob-sand/8 rounded-[6px] p-4 flex flex-col"
      >
        <div class="flex items-baseline justify-between gap-3 mb-2">
          <h3 class="text-[14.5px] font-bold text-ob-text">{{ r.name }}</h3>
          <span
            v-if="r.controlGroup"
            class="font-mono text-[10px] tracking-[0.06em] uppercase px-2 py-[2px] rounded-full border border-ob-sand/25 text-ob-sand"
            >control group</span
          >
        </div>

        <p v-if="r.note" class="text-[12.5px] leading-relaxed text-ob-muted2 mb-3">{{ r.note }}</p>

        <p class="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ob-teal mb-1.5">
          Why consider
        </p>
        <ul class="space-y-1 mb-3">
          <li
            v-for="(w, i) in r.why"
            :key="i"
            class="text-[12px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-teal shrink-0">+</span>{{ w }}
          </li>
        </ul>

        <p class="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ob-sand mb-1.5">
          Why reject parts of it
        </p>
        <ul class="space-y-1 mb-3">
          <li
            v-for="(w, i) in r.watch"
            :key="i"
            class="text-[12px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-sand shrink-0">−</span>{{ w }}
          </li>
        </ul>

        <p class="mt-auto pt-2 border-t border-ob-sand/8 font-mono text-[11px] text-ob-dim">
          {{ r.corridors }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
const regions = [
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
</script>
