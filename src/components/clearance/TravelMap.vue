<template>
  <figure class="travel-map m-0">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      :aria-label="ariaLabel"
      class="block w-full h-auto select-none"
    >
      <title>{{ ariaLabel }}</title>
      <desc>{{ ariaDesc }}</desc>

      <!-- ocean / sphere outline -->
      <path :d="spherePath" :fill="STYLE.ocean" :stroke="STYLE.landStroke" stroke-width="0.5" />

      <!-- country fills -->
      <path
        v-for="(d, i) in countryPaths"
        :key="i"
        :d="d"
        :fill="STYLE.land"
        :stroke="STYLE.landStroke"
        stroke-width="0.4"
      />

      <!-- flight arcs -->
      <g
        v-for="arc in arcsSorted"
        :key="arc.id"
        class="arc-group"
        @mouseenter="$emit('legHover', arc.id)"
        @mouseleave="$emit('legHover', null)"
        @click="$emit('legClick', arc.id)"
      >
        <path :d="arc.d" fill="none" stroke="transparent" stroke-width="9" class="arc-hit" />
        <path
          :d="arc.d"
          fill="none"
          :stroke="STYLE[arc.status].stroke"
          :stroke-width="isActive(arc) ? STYLE.hoverWidth : STYLE[arc.status].width"
          :stroke-dasharray="STYLE[arc.status].dash || undefined"
          :opacity="arcOpacity(arc)"
          stroke-linecap="round"
          class="arc-line"
        />
      </g>

      <!-- airports in the current set -->
      <g v-for="ap in usedAirports" :key="ap.code" class="airport">
        <circle :cx="ap.x" :cy="ap.y" r="1.8" :fill="STYLE.dot" />
        <text :x="ap.x + 3" :y="ap.y - 3" :fill="STYLE.label" font-size="7" class="airport-label">
          {{ ap.code }}
        </text>
      </g>
    </svg>
  </figure>
</template>

<script setup>
import { computed } from 'vue'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import topology from '@/assets/geo/countries-110m.json'

const props = defineProps({
  legs: { type: Array, default: () => [] },
  airports: { type: Object, default: () => ({}) },
  hoveredLegId: { type: String, default: null },
  selectedTripId: { type: String, default: null },
})

defineEmits(['legHover', 'legClick'])

// All colours and stroke styles live here, not scattered as hex literals.
const STYLE = {
  ocean: '#0f172a', // slate-900, matches the site background
  land: '#1e293b', // slate-800, muted low-contrast fill
  landStroke: '#334155', // slate-700
  dot: '#e2e8f0',
  label: '#94a3b8',
  hoverWidth: 3,
  confirmed: { stroke: '#378ADD', dash: null, width: 1.4, opacity: 0.85 },
  gap: { stroke: '#EF9F27', dash: '5 4', width: 1.4, opacity: 0.95 },
  cancelled: { stroke: '#94a3b8', dash: '2 4', width: 1.2, opacity: 0.4 },
}

const W = 980
const H = 500

// Geography is static: compute the projection and country paths once.
const projection = geoNaturalEarth1().fitExtent(
  [
    [8, 8],
    [W - 8, H - 8],
  ],
  { type: 'Sphere' },
)
const pathGen = geoPath(projection)
const countryPaths = feature(topology, topology.objects.countries).features.map((f) => pathGen(f))
const spherePath = pathGen({ type: 'Sphere' })

const legId = (l) => `${l.date}-${l.from}-${l.to}`

function project(code) {
  const a = props.airports[code]
  return a ? projection([a.lon, a.lat]) : null
}

// Quadratic bezier curved by a consistent perpendicular offset.
function arcD([x0, y0], [x1, y1]) {
  const dx = x1 - x0
  const dy = y1 - y0
  const dist = Math.hypot(dx, dy) || 1
  const k = 0.16
  const cx = (x0 + x1) / 2 + (-dy / dist) * dist * k
  const cy = (y0 + y1) / 2 + (dx / dist) * dist * k
  return `M${x0.toFixed(1)},${y0.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`
}

const arcs = computed(() =>
  props.legs
    .map((l) => {
      const p0 = project(l.from)
      const p1 = project(l.to)
      if (!p0 || !p1) return null
      return { id: legId(l), leg: l, status: l.status, d: arcD(p0, p1) }
    })
    .filter(Boolean),
)

const hasHighlight = computed(() => !!props.hoveredLegId || !!props.selectedTripId)

function isActive(arc) {
  return (
    props.hoveredLegId === arc.id ||
    (!!props.selectedTripId && arc.leg.tripId === props.selectedTripId)
  )
}

// Active arcs render last so they sit on top.
const arcsSorted = computed(() =>
  [...arcs.value].sort((a, b) => (isActive(a) ? 1 : 0) - (isActive(b) ? 1 : 0)),
)

function arcOpacity(arc) {
  const base = STYLE[arc.status].opacity
  if (!hasHighlight.value) return base
  return isActive(arc) ? 1 : base * 0.22
}

const usedAirports = computed(() => {
  const codes = new Set()
  props.legs.forEach((l) => {
    codes.add(l.from)
    codes.add(l.to)
  })
  return [...codes]
    .map((code) => {
      const p = project(code)
      const a = props.airports[code]
      if (!p || !a) return null
      return { code, x: p[0], y: p[1], name: a.name }
    })
    .filter(Boolean)
})

const ariaLabel = 'World map of international flight history, 2011 to 2025'
const ariaDesc = computed(() => {
  const n = arcs.value.length
  const gaps = arcs.value.filter((a) => a.status === 'gap').length
  const cancelled = arcs.value.filter((a) => a.status === 'cancelled').length
  return `${n} flight legs shown, including ${gaps} undocumented gaps and ${cancelled} cancelled legs.`
})
</script>

<style scoped>
.arc-line {
  transition:
    stroke-width 0.12s ease,
    opacity 0.12s ease;
}
.arc-hit {
  cursor: pointer;
}
.airport-label {
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .arc-line {
    transition: none;
  }
}
</style>
