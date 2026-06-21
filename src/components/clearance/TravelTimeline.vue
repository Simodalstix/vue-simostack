<template>
  <div class="max-w-5xl">
    <div v-for="trip in trips" :key="trip.id" class="flex">
      <!-- year -->
      <div class="w-12 shrink-0 pt-2 pr-2 text-right text-[12px] font-mono text-slate-500">
        {{ trip.year }}
      </div>

      <!-- spine -->
      <div class="relative w-6 shrink-0 flex justify-center">
        <div class="absolute top-0 bottom-0 w-px bg-slate-700"></div>
        <div
          class="relative mt-2.5 w-3 h-3 rounded-full border-2 border-slate-900"
          :style="{ background: STATUS_COLOR[trip.status] }"
        ></div>
      </div>

      <!-- card -->
      <div class="flex-1 min-w-0 pb-6 pl-3">
        <div
          class="rounded-lg border border-slate-700 bg-slate-800/40 hover:bg-slate-800/70 transition-colors p-3"
        >
          <!-- header -->
          <div class="flex items-center gap-2 flex-wrap">
            <img
              v-for="iso in trip.countries"
              :key="iso"
              :src="flag(iso)"
              :alt="iso"
              class="w-4 h-4 rounded-full ring-1 ring-slate-900/40"
            />
            <span class="text-[14px] font-semibold text-slate-100">{{ trip.label }}</span>
            <span class="text-[11px] text-slate-400">· {{ trip.range }}</span>
            <span class="text-[11px] text-slate-500">
              · {{ trip.legs.length }} leg{{ trip.legs.length > 1 ? 's' : '' }}
            </span>
            <span
              v-if="trip.status === 'gap'"
              class="text-[10px] uppercase tracking-wider text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded"
              >Gap</span
            >
            <span
              v-else-if="trip.status === 'cancelled'"
              class="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-500/10 px-1.5 py-0.5 rounded"
              >Cancelled</span
            >
            <span class="ml-auto text-[11px] text-slate-400">{{ trip.paxSummary }}</span>
          </div>

          <!-- route strip -->
          <div class="mt-3 flex items-center flex-wrap gap-y-2">
            <template v-for="(it, i) in trip.routeItems" :key="i">
              <span
                v-if="it.type === 'node'"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700/60 text-[11px] font-mono text-slate-200"
                :title="cityName(it.code)"
              >
                <img
                  v-if="flag(countryOf(it.code))"
                  :src="flag(countryOf(it.code))"
                  :alt="countryOf(it.code)"
                  class="w-3.5 h-3.5 rounded-full"
                />
                {{ it.code }}
              </span>
              <span
                v-else-if="it.type === 'seg'"
                class="inline-block align-middle mx-1 w-7"
                :style="lineStyle(it.leg)"
                :title="segTitle(it.leg)"
              ></span>
              <span v-else class="mx-1.5 text-slate-600">⋯</span>
            </template>
          </div>

          <!-- per-leg detail -->
          <ul class="mt-3 border-t border-slate-700/60 pt-2 space-y-0.5">
            <li
              v-for="leg in trip.legs"
              :key="legId(leg)"
              class="flex items-center gap-3 text-[11px]"
              :class="{ 'opacity-50': leg.status === 'cancelled' }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :style="{ background: STATUS_COLOR[leg.status] }"
              ></span>
              <span class="font-mono text-slate-500 w-12 shrink-0">{{ formatShort(leg.date) }}</span>
              <span class="font-mono text-slate-300 w-20 shrink-0">{{ leg.from }} → {{ leg.to }}</span>
              <span
                class="flex-1 min-w-0 truncate"
                :class="leg.status === 'gap' ? 'text-amber-300' : 'text-slate-300'"
              >
                {{ carrierLabel(leg) }}
              </span>
              <span class="font-mono text-slate-600 w-16 shrink-0">{{ leg.ref || '—' }}</span>
              <span
                class="w-32 shrink-0 truncate text-right"
                :class="leg.pax.length > 1 ? 'text-slate-400' : 'text-slate-600'"
                >{{ leg.pax.join(', ') }}</span
              >
            </li>
          </ul>

          <!-- note -->
          <div v-if="trip.note" class="mt-2 text-[11px]">
            <span class="text-amber-300 font-semibold">Note:</span>
            <span class="text-slate-400"> {{ trip.note }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  legs: { type: Array, default: () => [] },
  airports: { type: Object, default: () => ({}) },
  tripMeta: { type: Object, default: () => ({}) },
})

// Flags are vendored locally (no third-party calls on this route).
const flagUrls = import.meta.glob('../../assets/flags/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})
const flag = (iso) => flagUrls[`../../assets/flags/${iso}.svg`]

const STATUS_COLOR = { confirmed: '#378ADD', gap: '#EF9F27', cancelled: '#94a3b8' }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const legId = (l) => `${l.date}-${l.from}-${l.to}`
const cityName = (code) => props.airports[code]?.name || code
const countryOf = (code) => props.airports[code]?.country

// Trips, newest first.
const trips = computed(() => {
  const byTrip = new Map()
  for (const l of props.legs) {
    if (!byTrip.has(l.tripId)) byTrip.set(l.tripId, [])
    byTrip.get(l.tripId).push(l)
  }
  return [...byTrip.entries()]
    .map(([id, ls]) => {
      ls.sort((a, b) => a.date.localeCompare(b.date))
      const countries = []
      const pax = new Set()
      for (const l of ls) {
        l.pax.forEach((p) => pax.add(p))
        for (const code of [l.from, l.to]) {
          const c = countryOf(code)
          if (c && !countries.includes(c)) countries.push(c)
        }
      }
      const hasGap = ls.some((l) => l.status === 'gap')
      const allCancelled = ls.every((l) => l.status === 'cancelled')
      const meta = props.tripMeta[id] || {}
      return {
        id,
        legs: ls,
        countries,
        paxSummary: [...pax].join(', '),
        status: hasGap ? 'gap' : allCancelled ? 'cancelled' : 'confirmed',
        year: ls[0].date.slice(0, 4),
        label: meta.label || id,
        note: meta.note || null,
        range: formatRange(ls[0].date, ls[ls.length - 1].date),
        routeItems: buildRoute(ls),
      }
    })
    .sort((a, b) => b.legs[0].date.localeCompare(a.legs[0].date))
})

// Walk the leg chain into nodes + segments, marking breaks where legs don't connect.
function buildRoute(ls) {
  const items = []
  let prev = null
  for (const leg of ls) {
    if (prev !== leg.from) {
      if (prev !== null) items.push({ type: 'break' })
      items.push({ type: 'node', code: leg.from })
    }
    items.push({ type: 'seg', leg })
    items.push({ type: 'node', code: leg.to })
    prev = leg.to
  }
  return items
}

function lineStyle(leg) {
  const c = STATUS_COLOR[leg.status]
  return {
    borderTop: `2px ${leg.status === 'confirmed' ? 'solid' : 'dashed'} ${c}`,
    opacity: leg.status === 'cancelled' ? 0.5 : 1,
  }
}

function segTitle(leg) {
  return `${formatShort(leg.date)} · ${leg.carrier || 'undocumented gap'}${leg.ref ? ' · ' + leg.ref : ''}`
}

function carrierLabel(leg) {
  if (leg.status === 'gap') return leg.carrier || 'Undocumented — itinerary image only'
  if (leg.status === 'cancelled') return `${leg.carrier} (cancelled)`
  return leg.carrier
}

function formatShort(iso) {
  const [, m, d] = iso.split('-')
  return `${+d} ${MONTHS[+m - 1]}`
}

function formatRange(startIso, endIso) {
  const [sy, sm] = startIso.split('-')
  const [ey, em] = endIso.split('-')
  if (sy === ey && sm === em) return `${MONTHS[+sm - 1]} ${sy}`
  if (sy === ey) return `${MONTHS[+sm - 1]} – ${MONTHS[+em - 1]} ${sy}`
  return `${MONTHS[+sm - 1]} ${sy} – ${MONTHS[+em - 1]} ${ey}`
}
</script>
