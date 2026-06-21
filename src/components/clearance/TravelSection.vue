<template>
  <div class="h-full flex flex-col bg-slate-900 text-slate-300">
    <!-- header -->
    <header class="px-6 py-4 border-b border-slate-700 shrink-0">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-0.5">
        Travel history
      </div>
      <div class="flex items-end justify-between gap-4">
        <h1 class="text-lg font-semibold text-slate-100">International flight timeline</h1>
        <div class="flex items-center gap-3 text-[11px]">
          <span class="text-slate-400">{{ stats.total }} legs</span>
          <span class="text-sky-300">{{ stats.confirmed }} confirmed</span>
          <span class="text-amber-300">{{ stats.gap }} gaps</span>
          <span class="text-slate-500">{{ stats.cancelled }} cancelled</span>
        </div>
      </div>
    </header>

    <!-- controls -->
    <div
      class="px-6 py-3 border-b border-slate-700 shrink-0 flex flex-wrap items-center gap-x-6 gap-y-2"
    >
      <div class="flex items-center rounded-md border border-slate-600 overflow-hidden text-[11px]">
        <button
          class="px-3 py-1 transition-colors"
          :class="viewMode === 'map' ? 'bg-sky-500/20 text-sky-200' : 'text-slate-400 hover:bg-slate-700/50'"
          @click="viewMode = 'map'"
        >
          Map
        </button>
        <button
          class="px-3 py-1 border-l border-slate-600 transition-colors"
          :class="viewMode === 'timeline' ? 'bg-sky-500/20 text-sky-200' : 'text-slate-400 hover:bg-slate-700/50'"
          @click="viewMode = 'timeline'"
        >
          Timeline
        </button>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-[11px] uppercase tracking-wider text-slate-500">Year</span>
        <input
          type="range"
          :min="minYear"
          :max="maxYear"
          step="1"
          :value="selectedYear ?? maxYear"
          class="w-48 accent-sky-500"
          @input="selectedYear = +$event.target.value"
        />
        <span class="text-[12px] font-mono w-20 text-slate-200">
          {{ selectedYear == null ? 'All years' : selectedYear }}
        </span>
        <button
          class="text-[11px] px-2 py-1 rounded border border-slate-600 text-slate-300 hover:bg-slate-700/50 disabled:opacity-40"
          :disabled="selectedYear == null"
          @click="selectedYear = null"
        >
          Show all
        </button>
      </div>

      <div class="flex items-center gap-4 text-[11px] ml-auto">
        <span class="flex items-center gap-1.5"
          ><span class="inline-block w-4 h-0.5" style="background: #378add"></span> Confirmed</span
        >
        <span class="flex items-center gap-1.5"
          ><span
            class="inline-block w-4 h-0.5"
            style="background: repeating-linear-gradient(90deg, #ef9f27 0 4px, transparent 4px 7px)"
          ></span>
          Gap</span
        >
        <span class="flex items-center gap-1.5"
          ><span
            class="inline-block w-4 h-0.5 opacity-60"
            style="background: repeating-linear-gradient(90deg, #94a3b8 0 2px, transparent 2px 5px)"
          ></span>
          Cancelled</span
        >
      </div>
    </div>

    <!-- map + list -->
    <div v-if="viewMode === 'map'" class="flex-1 flex min-h-0">
      <div class="flex-1 flex flex-col min-w-0 p-4">
        <div class="flex-1 min-h-0 flex items-center justify-center">
          <TravelMap
            :legs="filteredLegs"
            :airports="airports"
            :hovered-leg-id="hoveredLegId"
            :selected-trip-id="selectedTripId"
            class="w-full"
            @leg-hover="hoveredLegId = $event"
            @leg-click="onLegClick"
          />
        </div>

        <!-- detail line -->
        <div
          class="mt-3 h-12 shrink-0 rounded border border-slate-700 bg-slate-800/40 px-4 flex items-center text-[12px]"
        >
          <template v-if="hoveredLeg">
            <span class="font-mono text-slate-200">{{ hoveredLeg.from }} → {{ hoveredLeg.to }}</span>
            <span class="mx-2 text-slate-600">·</span>
            <span class="text-slate-400">{{ formatDate(hoveredLeg.date) }}</span>
            <span class="mx-2 text-slate-600">·</span>
            <span :class="statusTextClass(hoveredLeg.status)">{{
              carrierLabel(hoveredLeg)
            }}</span>
            <span v-if="hoveredLeg.ref" class="mx-2 text-slate-600">·</span>
            <span v-if="hoveredLeg.ref" class="font-mono text-slate-500">{{ hoveredLeg.ref }}</span>
            <span class="ml-auto text-slate-500">{{ hoveredLeg.pax.join(', ') }}</span>
          </template>
          <span v-else class="text-slate-500">
            Hover a flight arc or a trip to see details. Amber = undocumented gap to chase down.
          </span>
        </div>
      </div>

      <!-- trip list -->
      <aside class="w-72 shrink-0 border-l border-slate-700 overflow-y-auto">
        <div
          v-if="!trips.length"
          class="px-4 py-6 text-[12px] text-slate-500"
        >
          No travel recorded for {{ selectedYear }}.
        </div>
        <button
          v-for="trip in trips"
          :key="trip.id"
          class="w-full text-left px-4 py-3 border-b border-slate-800 transition-colors"
          :class="
            selectedTripId === trip.id ? 'bg-sky-500/10' : 'hover:bg-slate-800/60'
          "
          @mouseenter="selectedTripId = trip.id"
          @mouseleave="selectedTripId = null"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="text-[13px] font-medium text-slate-200">{{ trip.label }}</span>
            <span v-if="trip.hasGap" class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">{{ trip.range }}</div>
          <div class="text-[11px] font-mono text-slate-400 mt-1">
            {{ trip.route }}
            <span class="text-slate-600">· {{ trip.legs.length }} leg{{ trip.legs.length > 1 ? 's' : '' }}</span>
          </div>
        </button>
      </aside>
    </div>

    <!-- timeline view -->
    <div v-else class="flex-1 min-h-0 overflow-y-auto px-6 py-5">
      <TravelTimeline :legs="filteredLegs" :airports="airports" :trip-meta="TRIP_META" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TravelMap from '@/components/clearance/TravelMap.vue'
import TravelTimeline from '@/components/clearance/TravelTimeline.vue'
import rawLegs from '@/data/legs.json'
import airports from '@/data/airports.json'

// Validate on load: drop legs referencing an unknown IATA code, never crash.
const legs = rawLegs.filter((l) => {
  const ok = airports[l.from] && airports[l.to]
  if (!ok) console.warn(`[travel] skipping leg ${l.date} ${l.from}->${l.to}: unknown IATA code`)
  return ok
})

// Display names and context notes live in the view, never in legs.json
// (which stays presentation-agnostic). Notes mirror the source timeline doc.
const TRIP_META = {
  'kul-2011': {
    label: 'Kuala Lumpur',
    note: 'Both legs sourced from an itinerary image (Melissa and Simon). No booking reference on file.',
  },
  'relocation-2014': {
    label: 'Relocation to Melbourne',
    note: 'One-way ticket. Relocating permanently to Melbourne.',
  },
  'nz-2015-jul': { label: 'New Zealand' },
  'nz-2015-nov': { label: 'New Zealand' },
  'nz-2017-mar': { label: 'New Zealand' },
  'europe-2017': {
    label: 'Europe',
    note: 'Athens → Bucharest leg missing (no ticket on file). Ground legs (trains, coach) and the Macau ferry side-trip are not shown on the flight map.',
  },
  'nz-2017-dec': { label: 'New Zealand · Christmas' },
  'nz-2018-nov': { label: 'New Zealand' },
  'japan-2019': {
    label: 'Japan & Hong Kong',
    note: '5-day Hong Kong stay between arrival (1 Apr) and the Tokyo leg (6 Apr). Proposed to Jeanie in Japan.',
  },
  'nz-2020-covid': {
    label: 'New Zealand · cancelled',
    note: 'Likely cancelled — COVID border closures, April 2020.',
  },
  'nz-2021-jul': { label: 'New Zealand' },
  'nz-2023-apr': { label: 'New Zealand' },
  'nz-2023-dec': {
    label: 'New Zealand · Christmas',
    note: 'Boarding passes on file for Simon, Jeanie and Lulu (outbound). Return leg sourced from an Air NZ pre-trip email.',
  },
  'nz-2024-oct': { label: 'New Zealand' },
  'nz-2025-jun': { label: 'New Zealand' },
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const years = legs.map((l) => +l.date.slice(0, 4))
const minYear = Math.min(...years)
const maxYear = Math.max(...years)

const viewMode = ref('map')
const selectedYear = ref(null)
const hoveredLegId = ref(null)
const selectedTripId = ref(null)

const legId = (l) => `${l.date}-${l.from}-${l.to}`

const filteredLegs = computed(() =>
  selectedYear.value == null ? legs : legs.filter((l) => +l.date.slice(0, 4) === selectedYear.value),
)

const stats = computed(() => ({
  total: filteredLegs.value.length,
  confirmed: filteredLegs.value.filter((l) => l.status === 'confirmed').length,
  gap: filteredLegs.value.filter((l) => l.status === 'gap').length,
  cancelled: filteredLegs.value.filter((l) => l.status === 'cancelled').length,
}))

const hoveredLeg = computed(() => legs.find((l) => legId(l) === hoveredLegId.value) || null)

const trips = computed(() => {
  const byTrip = new Map()
  for (const l of filteredLegs.value) {
    if (!byTrip.has(l.tripId)) byTrip.set(l.tripId, [])
    byTrip.get(l.tripId).push(l)
  }
  return [...byTrip.entries()]
    .map(([id, ls]) => {
      ls.sort((a, b) => a.date.localeCompare(b.date))
      return {
        id,
        legs: ls,
        start: ls[0].date,
        label: TRIP_META[id]?.label || id,
        range: formatRange(ls[0].date, ls[ls.length - 1].date),
        route: routeSummary(ls),
        hasGap: ls.some((l) => l.status === 'gap'),
      }
    })
    .sort((a, b) => b.start.localeCompare(a.start))
})

// Compact route: walk the airport chain, collapse repeats, and render a
// round trip as "MEL ⇄ CHC" rather than the unhelpful "MEL → MEL".
function routeSummary(ls) {
  const seq = []
  for (const l of ls) {
    if (seq[seq.length - 1] !== l.from) seq.push(l.from)
    seq.push(l.to)
  }
  const dedup = seq.filter((c, i) => c !== seq[i - 1])
  const round = dedup.length > 1 && dedup[0] === dedup[dedup.length - 1]
  const core = round ? dedup.slice(0, -1) : dedup
  const sep = round ? ' ⇄ ' : ' → '
  if (core.length <= 1) return core[0] || ''
  if (core.length === 2) return core.join(sep)
  const extra = core.length - 2
  return `${core[0]}${sep}${core[core.length - 1]} · +${extra} stop${extra > 1 ? 's' : ''}`
}

function formatDate(iso) {
  const [y, m, d] = iso.split('-')
  return `${+d} ${MONTHS[+m - 1]} ${y}`
}

function formatRange(startIso, endIso) {
  const [sy, sm] = startIso.split('-')
  const [ey, em] = endIso.split('-')
  if (sy === ey && sm === em) return `${MONTHS[+sm - 1]} ${sy}`
  if (sy === ey) return `${MONTHS[+sm - 1]} – ${MONTHS[+em - 1]} ${sy}`
  return `${MONTHS[+sm - 1]} ${sy} – ${MONTHS[+em - 1]} ${ey}`
}

function carrierLabel(leg) {
  if (leg.status === 'gap') return leg.carrier || 'Undocumented gap'
  if (leg.status === 'cancelled') return `${leg.carrier} (cancelled)`
  return leg.carrier
}

function statusTextClass(status) {
  return {
    confirmed: 'text-slate-300',
    gap: 'text-amber-300',
    cancelled: 'text-slate-500',
  }[status]
}

function onLegClick(id) {
  const leg = legs.find((l) => legId(l) === id)
  if (leg) selectedYear.value = +leg.date.slice(0, 4)
}
</script>
