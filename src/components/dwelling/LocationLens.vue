<template>
  <section>
    <div class="flex items-baseline justify-between mb-3 flex-wrap gap-x-4 gap-y-2">
      <div class="flex items-baseline gap-x-3 flex-wrap gap-y-1">
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
          Location lens · tunes the ranking below
        </h2>
        <span class="font-mono text-[11px] text-ob-faint"
          >{{ DESTINATION.label }} · {{ DESTINATION.dest }}</span
        >
      </div>

      <!-- view toggle -->
      <div class="inline-flex rounded-[6px] border border-ob-sand/14 overflow-hidden shrink-0">
        <button
          v-for="v in ['chips', 'compare']"
          :key="v"
          @click="view = v"
          class="px-3 py-[4px] font-mono text-[11px] transition-colors border-r border-ob-sand/14 last:border-r-0"
          :class="view === v ? 'bg-ob-teal/15 text-ob-teal' : 'text-ob-faint hover:text-ob-muted'"
        >
          {{ v }}
        </button>
      </div>
    </div>

    <!-- corridor chips, grouped by region -->
    <div v-if="view === 'chips'" class="space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-faint w-16 shrink-0"
          >Any</span
        >
        <button
          @click="select(null)"
          class="px-3 py-[7px] rounded-[6px] border font-mono text-[12px] transition-colors"
          :class="
            active == null
              ? 'border-ob-teal/45 bg-ob-teal/10 text-ob-teal'
              : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
          "
        >
          Generic (no location)
        </button>
      </div>
      <div v-for="g in grouped" :key="g.region" class="flex flex-wrap items-center gap-2">
        <span
          class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0 leading-tight"
          >{{ g.short }}</span
        >
        <button
          v-for="l in g.items"
          :key="l.rec.id"
          @click="select(l.rec.id)"
          class="px-3 py-[7px] rounded-[6px] border font-mono text-[12px] transition-colors flex items-center gap-2"
          :class="
            active === l.rec.id
              ? 'border-ob-teal/45 bg-ob-teal/10 text-ob-teal'
              : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
          "
        >
          <span class="text-ob-text">{{ l.rec.suburb }}</span>
          <span :class="bandClass(l.band)">{{ l.commute.typical }}m</span>
          <span class="text-ob-sand">{{ l.weighted }}</span>
          <span
            v-if="l.status === 'reject' || l.status === 'conditional'"
            class="text-[10px] uppercase"
            :class="l.status === 'reject' ? 'text-ob-sand' : 'text-ob-muted'"
            >{{ l.status === 'reject' ? '✕' : '~' }}</span
          >
        </button>
      </div>
    </div>

    <!-- compare table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-[12px] min-w-[660px]">
        <thead>
          <tr
            class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-soft border-b border-ob-sand/14"
          >
            <th
              v-for="col in columns"
              :key="col.key"
              @click="setSort(col.key)"
              class="py-2 font-normal cursor-pointer select-none whitespace-nowrap hover:text-ob-muted"
              :class="[
                col.align === 'right' ? 'text-right pl-3' : 'text-left pr-3',
                sortKey === col.key ? 'text-ob-teal' : '',
              ]"
            >
              {{ col.label
              }}<span v-if="sortKey === col.key" class="ml-1">{{
                sortDir === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in sortedRows"
            :key="row.id"
            @click="select(row.id)"
            class="border-b border-ob-sand/8 last:border-0 cursor-pointer transition-colors"
            :class="active === row.id ? 'bg-ob-teal/10' : 'hover:bg-ob-surface/60'"
          >
            <!-- suburb -->
            <td class="py-2 pr-3 whitespace-nowrap">
              <span class="text-ob-text font-semibold">{{ row.rec.suburb }}</span>
              <span
                v-if="row.status !== 'ok'"
                class="ml-1 text-[10px]"
                :class="row.status === 'reject' ? 'text-ob-sand' : 'text-ob-muted'"
                >{{ row.status === 'reject' ? '✕' : '~' }}</span
              >
            </td>
            <!-- region -->
            <td class="py-2 pr-3 text-ob-dim whitespace-nowrap">{{ row.regionShort }}</td>
            <!-- commute, with sand bar scaled across the visible set -->
            <td class="py-2 pr-3">
              <div class="relative h-[16px] flex items-center min-w-[64px]">
                <div
                  class="absolute inset-y-[3px] left-0 rounded-sm bg-ob-sand/25"
                  :style="{ width: commuteBar(row.commute) }"
                ></div>
                <span class="relative font-mono pl-1" :class="bandClass(row.band)"
                  >{{ row.commute }}m</span
                >
              </div>
            </td>
            <!-- 2BR price band -->
            <td class="py-2 pl-3 text-right font-mono text-ob-dim whitespace-nowrap">
              {{ row.priceLabel }}
            </td>
            <!-- est monthly at selected horizon -->
            <td class="py-2 pl-3 text-right font-mono text-ob-text whitespace-nowrap">
              {{ row.estMonthly != null ? '$' + fmt(row.estMonthly) : 'n/a' }}
            </td>
            <!-- ongoing-fee risk -->
            <td class="py-2 pr-3 whitespace-nowrap">
              <span
                class="font-mono"
                :class="[
                  feeClass(row.feeRisk),
                  row.rec.feeNote
                    ? 'cursor-help underline decoration-dotted underline-offset-2'
                    : '',
                ]"
                :title="row.rec.feeNote || ''"
                >{{ row.feeRisk }}</span
              >
            </td>
            <!-- score, with teal bar scaled across the visible set -->
            <td class="py-2 pr-1">
              <div class="relative h-[16px] flex items-center min-w-[52px]">
                <div
                  class="absolute inset-y-[3px] left-0 rounded-sm bg-ob-teal/25"
                  :style="{ width: scoreBar(row.score) }"
                ></div>
                <span class="relative font-mono text-ob-sand pl-1">{{ row.score }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- active location summary + detail -->
    <div
      v-if="activeRow"
      class="mt-3 bg-ob-surface border border-ob-sand/8 rounded-[6px] overflow-hidden"
    >
      <div class="px-4 py-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span class="text-[13.5px] font-bold text-ob-text"
          >{{ activeRow.rec.suburb }} catchment</span
        >
        <span class="font-mono text-[11.5px] text-ob-dim">{{ activeRow.rec.corridor }}</span>
        <span class="font-mono text-[11.5px]" :class="bandClass(activeRow.band)"
          >{{ activeRow.commute.typical }}–{{ activeRow.commute.stressed }} min</span
        >
        <span class="font-mono text-[11.5px] text-ob-dim">{{ priceBand(activeRow.rec) }}</span>
        <span
          v-if="activeRow.status !== 'ok'"
          class="font-mono text-[10.5px] uppercase tracking-[0.06em] px-2 py-[2px] rounded-full border"
          :class="
            activeRow.status === 'reject'
              ? 'border-ob-sand/45 text-ob-sand'
              : 'border-ob-sand/20 text-ob-muted'
          "
          >{{ activeRow.status }}</span
        >
        <button
          @click="showDetail = !showDetail"
          class="ml-auto font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
        >
          {{ showDetail ? 'hide details' : 'details' }}
        </button>
      </div>
      <AreaDetailDrawer v-if="showDetail" :row="activeRow" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import AreaDetailDrawer from './AreaDetailDrawer.vue'
import { DESTINATION } from '@/composables/useCommuteScoring.js'
import { monthlyPayment } from '@/composables/useRepayment.js'

const props = defineProps({
  locations: { type: Array, required: true },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
})

const active = defineModel({ default: null })
const showDetail = ref(false)

// table is the default on xl, chips on smaller screens
const view = ref(
  typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches
    ? 'compare'
    : 'chips',
)

const scoredLocations = computed(() => props.locations.filter((l) => l.status !== 'unscored'))

const REGION_ORDER = [
  { region: 'Inner', short: 'Inner' },
  { region: 'West', short: 'West' },
  { region: 'North', short: 'North' },
  { region: 'East and south-east', short: 'East/SE' },
  { region: 'South', short: 'South' },
  { region: 'Outer growth areas', short: 'Outer' },
]
const grouped = computed(() =>
  REGION_ORDER.map(({ region, short }) => ({
    region,
    short,
    items: scoredLocations.value.filter((l) => l.rec.region === region),
  })).filter((g) => g.items.length),
)
const activeRow = computed(() =>
  active.value == null ? null : props.locations.find((l) => l.rec.id === active.value),
)

function regionShort(region) {
  const hit = REGION_ORDER.find((r) => r.region === region)
  return hit ? hit.short : region
}

// --- compare table -------------------------------------------------------

const FEE_RANK = { low: 0, moderate: 1, high: 2 }

// Ongoing owners-corp fee risk, derived from the top of each record's annual
// OC band so it stays in sync with the data rather than being hand-set.
function feeRisk(rec) {
  const high = rec.dwelling?.annualOc?.[1] ?? 0
  if (high > 5000) return 'high'
  if (high > 3000) return 'moderate'
  return 'low'
}

// Est. monthly reuses the amortisation logic: price-band midpoint, the current
// deposit assumption, and the selected payoff horizon.
function estMonthly(rec) {
  const p = rec.dwelling?.indicativePrice
  if (!p) return null
  const mid = (p[0] + p[1]) / 2
  const loan = Math.max(0, mid - props.deposit)
  return Math.round(monthlyPayment(loan, props.rate, props.payoffYears))
}

const enriched = computed(() =>
  scoredLocations.value.map((l) => {
    const rec = l.rec
    const p = rec.dwelling?.indicativePrice
    const risk = feeRisk(rec)
    return {
      id: rec.id,
      rec,
      status: l.status,
      band: l.band,
      regionShort: regionShort(rec.region),
      commute: l.commute ? l.commute.typical : null,
      priceMid: p ? (p[0] + p[1]) / 2 : null,
      priceLabel: priceBand(rec),
      estMonthly: estMonthly(rec),
      feeRisk: risk,
      feeRank: FEE_RANK[risk],
      score: l.weighted,
    }
  }),
)

const columns = computed(() => [
  { key: 'suburb', label: 'Suburb', align: 'left' },
  { key: 'region', label: 'Region', align: 'left' },
  { key: 'commute', label: 'Commute (min)', align: 'left' },
  { key: 'price', label: '2BR band', align: 'right' },
  { key: 'estMonthly', label: `Monthly @ ${props.payoffYears}yr`, align: 'right' },
  { key: 'feeRisk', label: 'Fee risk', align: 'left' },
  { key: 'score', label: 'Score', align: 'left' },
])

const sortKey = ref('score')
const sortDir = ref('desc')

const SORT_VALUE = {
  suburb: (r) => r.rec.suburb.toLowerCase(),
  region: (r) => r.regionShort.toLowerCase(),
  commute: (r) => r.commute ?? Infinity,
  price: (r) => r.priceMid ?? Infinity,
  estMonthly: (r) => r.estMonthly ?? Infinity,
  feeRisk: (r) => r.feeRank,
  score: (r) => r.score ?? -1,
}

const sortedRows = computed(() => {
  const val = SORT_VALUE[sortKey.value] || SORT_VALUE.score
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...enriched.value].sort((a, b) => {
    const av = val(a)
    const bv = val(b)
    if (av < bv) return -dir
    if (av > bv) return dir
    return 0
  })
})

function setSort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = key === 'suburb' || key === 'region' ? 'asc' : 'desc'
  }
}

// Scale the inline bars against the min/max of the visible set so relative
// differences read at a glance; floor at 12% so the smallest still shows.
const commuteRange = computed(() => range(enriched.value.map((r) => r.commute)))
const scoreRange = computed(() => range(enriched.value.map((r) => r.score)))

function range(vals) {
  const clean = vals.filter((v) => v != null)
  return clean.length ? { min: Math.min(...clean), max: Math.max(...clean) } : { min: 0, max: 0 }
}
function normWidth(v, { min, max }) {
  if (v == null) return '0%'
  if (max === min) return '100%'
  const t = (v - min) / (max - min)
  return (12 + t * 88).toFixed(1) + '%'
}
function commuteBar(v) {
  return normWidth(v, commuteRange.value)
}
function scoreBar(v) {
  return normWidth(v, scoreRange.value)
}

function fmt(n) {
  return Math.round(n).toLocaleString('en-AU')
}

// --- shared helpers ------------------------------------------------------

function select(id) {
  active.value = id
  if (id == null) showDetail.value = false
}
function priceBand(rec) {
  const p = rec.dwelling?.indicativePrice
  return p ? '$' + Math.round(p[0] / 1000) + 'k–$' + Math.round(p[1] / 1000) + 'k' : ''
}
function bandClass(band) {
  return (
    {
      Excellent: 'text-ob-teal',
      Good: 'text-ob-teal-bright',
      Acceptable: 'text-ob-sand',
      Difficult: 'text-ob-faint',
    }[band] || 'text-ob-dim'
  )
}
function feeClass(r) {
  return { low: 'text-ob-teal', moderate: 'text-ob-dim', high: 'text-ob-sand' }[r] || 'text-ob-dim'
}
</script>
