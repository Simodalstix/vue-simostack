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
      <table class="w-full text-[12px] min-w-[860px]">
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
            <!-- school-detail expander column, not sortable -->
            <th class="py-2 w-6"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="row in sortedRows" :key="row.id">
            <tr
              @click="select(row.id)"
              class="cursor-pointer transition-colors"
              :class="[
                active === row.id ? 'bg-ob-teal/10' : 'hover:bg-ob-surface/60',
                expanded.has(row.id) ? '' : 'border-b border-ob-sand/8 last:border-0',
              ]"
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
              <!-- all-in monthly: amortised repayment + monthly owners-corp estimate -->
              <td class="py-2 pl-3 text-right whitespace-nowrap">
                <span class="font-mono text-ob-text">{{
                  row.estMonthly != null ? '$' + fmt(row.estMonthly) : 'n/a'
                }}</span>
                <span
                  v-if="row.estMonthly != null"
                  class="block font-mono text-[10px] text-ob-faint leading-tight"
                  >incl. ~${{ fmt(row.ocMonthly) }}/mo OC est.</span
                >
              </td>
              <!-- score, with teal bar scaled across the visible set -->
              <td class="py-2 pr-3">
                <div class="relative h-[16px] flex items-center min-w-[52px]">
                  <div
                    class="absolute inset-y-[3px] left-0 rounded-sm bg-ob-teal/25"
                    :style="{ width: scoreBar(row.score) }"
                  ></div>
                  <span class="relative font-mono text-ob-sand pl-1">{{ row.score }}</span>
                </div>
              </td>
              <!-- schools: childhood strength 1-5 as filled teal dots -->
              <td class="py-2 pr-3">
                <span
                  class="font-mono text-[13px] tracking-[-0.5px] cursor-help"
                  :title="dotTitle('schoolStrength', row.schools)"
                >
                  <span
                    v-for="i in 5"
                    :key="i"
                    :class="
                      row.schools != null && i <= row.schools ? 'text-ob-teal' : 'text-ob-faint/40'
                    "
                    >{{ row.schools != null && i <= row.schools ? '●' : '○' }}</span
                  >
                </span>
              </td>
              <!-- teen: independence & amenity 1-5 as filled teal dots -->
              <td class="py-2 pr-3">
                <span
                  class="font-mono text-[13px] tracking-[-0.5px] cursor-help"
                  :title="dotTitle('teenIndependence', row.teen)"
                >
                  <span
                    v-for="i in 5"
                    :key="i"
                    :class="row.teen != null && i <= row.teen ? 'text-ob-teal' : 'text-ob-faint/40'"
                    >{{ row.teen != null && i <= row.teen ? '●' : '○' }}</span
                  >
                </span>
              </td>
              <!-- OC fees: qualitative fee exposure, its own separated column -->
              <td class="py-2 pl-3 border-l border-ob-sand/8 whitespace-nowrap">
                <span
                  class="inline-block font-mono text-[10.5px] px-2 py-[2px] rounded-full cursor-help"
                  :class="feeChipClass(row.feeRisk)"
                  :title="feeTitle(row.rec)"
                  >{{ row.feeRisk }}</span
                >
              </td>
              <!-- school-detail expander, separate from row-select -->
              <td class="py-2 pl-2 text-right">
                <button
                  @click.stop="toggleExpand(row.id)"
                  class="font-mono text-[13px] leading-none text-ob-faint hover:text-ob-teal transition-colors"
                  :title="expanded.has(row.id) ? 'Hide school detail' : 'Show school detail'"
                  :aria-expanded="expanded.has(row.id)"
                >
                  {{ expanded.has(row.id) ? '▾' : 'ⓘ' }}
                </button>
              </td>
            </tr>
            <!-- expandable school detail: teal chips for zoned public schools,
                 dim chips for private context, the note, and a fixed caveat -->
            <tr
              v-if="expanded.has(row.id) && row.rec.childhood"
              class="border-b border-ob-sand/8 bg-ob-surface/40"
            >
              <td :colspan="columns.length + 1" class="px-4 py-3">
                <div class="space-y-2.5">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span
                      class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0"
                      >Primary</span
                    >
                    <span
                      v-for="s in row.rec.childhood.publicPrimary"
                      :key="s"
                      class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-teal/15 text-ob-teal"
                      >{{ s }}</span
                    >
                    <span
                      v-if="!row.rec.childhood.publicPrimary.length"
                      class="font-mono text-[11px] text-ob-faint"
                      >not listed</span
                    >
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span
                      class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0"
                      >Secondary</span
                    >
                    <span
                      v-for="s in row.rec.childhood.publicSecondary"
                      :key="s"
                      class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-teal/15 text-ob-teal"
                      >{{ s }}</span
                    >
                    <span
                      v-if="!row.rec.childhood.publicSecondary.length"
                      class="font-mono text-[11px] text-ob-faint"
                      >not listed</span
                    >
                  </div>
                  <div
                    v-if="row.rec.childhood.privateContext.length"
                    class="flex flex-wrap items-center gap-1.5"
                  >
                    <span
                      class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0"
                      >Private</span
                    >
                    <span
                      v-for="s in row.rec.childhood.privateContext"
                      :key="s"
                      class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-sand/10 text-ob-dim"
                      >{{ s }}</span
                    >
                  </div>
                  <p
                    v-if="row.rec.childhood.note"
                    class="text-[12px] leading-relaxed text-ob-muted2"
                  >
                    {{ row.rec.childhood.note }}
                  </p>
                  <p class="font-mono text-[10.5px] leading-relaxed text-ob-faint">
                    {{ SCHOOL_CAVEAT }}
                  </p>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <p class="mt-2 font-mono text-[10.5px] text-ob-faint leading-relaxed">
        Monthly shown is all-in housing cost: amortised repayment at the selected horizon plus the
        estimated owners-corp fee. Indicative, placeholder location data until verified.
      </p>
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
import { FEE_ESTIMATE_BY_RISK } from '@/data/dwelling/areaCorridors.js'

const props = defineProps({
  locations: { type: Array, required: true },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
})

const active = defineModel({ default: null })
const showDetail = ref(false)

// Per-row school-detail expander in the compare table. Deliberately separate
// from row-select (which sets the active location that tunes the ranking).
const expanded = ref(new Set())
function toggleExpand(id) {
  const next = new Set(expanded.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expanded.value = next
}

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

// Annual owners-corp fee estimate in $/yr: a per-record override, else the
// midpoint for the derived risk band.
function feeEstimate(rec) {
  return rec.feeEstimate ?? FEE_ESTIMATE_BY_RISK[feeRisk(rec)]
}

// All-in monthly housing cost: amortised repayment (price-band midpoint, current
// deposit, selected horizon) plus the monthly share of the owners-corp fee.
function estMonthly(rec) {
  const p = rec.dwelling?.indicativePrice
  if (!p) return null
  const mid = (p[0] + p[1]) / 2
  const loan = Math.max(0, mid - props.deposit)
  const repay = monthlyPayment(loan, props.rate, props.payoffYears)
  return Math.round(repay + feeEstimate(rec) / 12)
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
      ocMonthly: Math.round(feeEstimate(rec) / 12),
      feeRisk: risk,
      feeRank: FEE_RANK[risk],
      score: l.weighted,
      schools: rec.childhood?.schoolStrength ?? null,
      teen: rec.childhood?.teenIndependence ?? null,
    }
  }),
)

const columns = computed(() => [
  { key: 'suburb', label: 'Suburb', align: 'left' },
  { key: 'region', label: 'Region', align: 'left' },
  { key: 'commute', label: 'Commute (min)', align: 'left' },
  { key: 'price', label: '2BR band', align: 'right' },
  { key: 'estMonthly', label: `All-in @ ${props.payoffYears}yr`, align: 'right' },
  { key: 'score', label: 'Score', align: 'left' },
  { key: 'schools', label: 'Schools', align: 'left' },
  { key: 'teen', label: 'Teen', align: 'left' },
  { key: 'feeRisk', label: 'OC fees', align: 'left' },
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
  schools: (r) => r.schools ?? -1,
  teen: (r) => r.teen ?? -1,
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
// The palette has one warm accent (sand/bronze are the same amber), so the
// three fee bands read cool -> warm -> hotter: teal, faint amber, filled amber.
function feeChipClass(r) {
  return (
    {
      low: 'bg-ob-teal/15 text-ob-teal',
      moderate: 'bg-ob-sand/15 text-ob-sand',
      high: 'bg-ob-sand/30 text-ob-bright ring-1 ring-ob-sand/45',
    }[r] || 'bg-ob-sand/15 text-ob-sand'
  )
}

const FEE_TOOLTIP = "Typical owners-corp fee exposure for this suburb's 2BR stock"
function feeTitle(rec) {
  return rec.feeNote ? `${FEE_TOOLTIP} · ${rec.feeNote}` : FEE_TOOLTIP
}

// Childhood dot columns: label the 1-5 score in the tooltip so the dots stay
// scannable. Keys mirror the framework lens criteria.
const CHILDHOOD_LABEL = {
  schoolStrength: 'Public school strength',
  teenIndependence: 'Kid independence & amenity',
}
function dotTitle(key, val) {
  return `${CHILDHOOD_LABEL[key]}: ${val == null ? 'n/a' : val + '/5'}`
}

// Permanent caveat shown under every expanded school-detail row.
const SCHOOL_CAVEAT =
  'School zones are street-level — verify any address at findmyschool.vic.gov.au. Scores are provisional judgements pending My School / VCE data checks.'
</script>
