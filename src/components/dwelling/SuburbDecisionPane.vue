<template>
  <!-- The single authoritative suburb information surface for the Decide
       workspace. A dense preview is ALWAYS visible at the top (hovered
       suburb, else the selected one, else the current #1) with the ranked
       list below it. Clicking a suburb opens the full card in the map panel;
       the list itself always stays visible. -->
  <section
    class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] flex flex-col overflow-hidden lg:sticky lg:top-[68px] lg:max-h-[calc(100vh-96px)]"
  >
    <div class="px-4 py-2.5 border-b border-ob-sand/8 flex items-center gap-3 shrink-0">
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">Ranked suburbs</h2>
      <span v-if="mode" class="font-mono text-[10.5px] text-ob-dim truncate">
        testing: {{ mode.label }}
      </span>
      <span v-if="pinnedRow" class="font-mono text-[10px] text-ob-faint truncate">
        open on map: {{ pinnedRow.rec.suburb }}
      </span>
      <button
        v-if="pinnedRow"
        @click="unpin"
        class="ml-auto font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors shrink-0"
        title="Close the map card and return to the Melbourne lens"
      >
        map view
      </button>
    </div>

    <div class="flex flex-col min-h-0">
      <div
        v-if="previewRow"
        class="px-4 py-3 border-b border-ob-sand/8 shrink-0 h-[272px] sm:h-[252px] flex flex-col overflow-hidden"
      >
        <div class="flex items-baseline justify-between gap-2 flex-wrap">
          <span class="text-[15px] font-bold text-ob-text">{{ previewHeading }}</span>
          <span class="font-mono text-[10.5px] text-ob-faint"
            >#{{ rankById[previewRow.rec.id] }} · {{ previewRow.rec.region }} ·
            <span :style="{ color: bandColor(previewRow) }"
              >{{ previewRow.weighted }} {{ bandLabel(previewRow) }}</span
            ></span
          >
        </div>
        <p v-if="previewSharedNote" class="font-mono text-[10px] leading-snug text-ob-faint">
          {{ previewSharedNote }}
        </p>

        <div class="mt-2 grid grid-cols-3 gap-x-4 gap-y-1.5">
          <div>
            <p class="font-mono text-[9px] uppercase tracking-[0.06em] text-ob-faint">Expect</p>
            <p class="text-[11px] text-ob-muted2 leading-snug preview-clamp-2">
              {{ dwellingLabel(previewRow.rec) }}
            </p>
          </div>
          <div>
            <p class="font-mono text-[9px] uppercase tracking-[0.06em] text-ob-faint">Band</p>
            <p class="font-mono text-[11.5px] text-ob-text">{{ priceBand(previewRow.rec) }}</p>
          </div>
          <div>
            <p class="font-mono text-[9px] uppercase tracking-[0.06em] text-ob-faint">
              All-in @ {{ payoffYears }}yr
            </p>
            <p class="font-mono text-[11.5px] text-ob-text">
              {{ monthlyLabel(previewRow.rec) }}/mo
            </p>
          </div>
          <div>
            <p class="font-mono text-[9px] uppercase tracking-[0.06em] text-ob-faint">Commute</p>
            <p class="font-mono text-[11.5px]" :class="bandClass(previewRow.band)">
              {{ commuteShort(previewRow) }}
            </p>
          </div>
          <div>
            <p class="font-mono text-[9px] uppercase tracking-[0.06em] text-ob-faint">OC / walk</p>
            <p class="font-mono text-[11.5px] text-ob-muted2">
              {{ ocShort(previewRow.rec) }} · {{ previewRow.rec.stationWalkMin }}m
            </p>
          </div>
          <div>
            <p class="font-mono text-[9px] uppercase tracking-[0.06em] text-ob-faint">
              Schools · teen
            </p>
            <p class="font-mono text-[11.5px] text-ob-purple">
              {{ dots(previewRow.rec.childhood?.schoolStrength) }}
              {{ previewRow.rec.childhood?.teenIndependence ?? 'n/a' }}/5
            </p>
          </div>
        </div>

        <p class="mt-1.5 text-[11.5px] text-ob-muted2 leading-snug">
          <span
            v-for="l in areaLines(previewRow.rec.id)"
            :key="l.id"
            class="inline-flex items-center gap-1 mr-2"
          >
            <span
              class="w-2.5 h-[3px] rounded-full inline-block"
              :style="{ backgroundColor: l.color }"
            ></span
            >{{ l.name }}
          </span>
          <span v-if="!areaLines(previewRow.rec.id).length" class="text-ob-dim">tram based</span>
          <span class="text-ob-dim"> · {{ previewRow.rec.station }}</span>
        </p>

        <div class="mt-1 min-h-[28px]">
          <p
            v-if="snapshot(previewRow.rec.id)"
            class="text-[11px] leading-snug text-ob-purple preview-clamp-2"
          >
            {{ snapshot(previewRow.rec.id).text
            }}<span v-if="snapshot(previewRow.rec.id).multiComponent" class="text-ob-faint">
              ({{ snapshot(previewRow.rec.id).suburb }} shown)</span
            >
          </p>
        </div>

        <div class="mt-1 space-y-0.5 flex-1 overflow-hidden">
          <p
            v-if="previewRow.rec.caseFor?.[0]"
            class="text-[11px] leading-snug text-ob-muted2 preview-clamp-2"
          >
            <span class="text-ob-teal">+</span> {{ previewRow.rec.caseFor[0] }}
          </p>
          <p
            v-if="previewRow.rec.caseAgainst?.[0]"
            class="text-[11px] leading-snug text-ob-muted2 preview-clamp-2"
          >
            <span class="text-ob-sand">−</span> {{ previewRow.rec.caseAgainst[0] }}
          </p>
        </div>

        <div class="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
          <p
            v-if="friendFor(previewRow.rec.id)"
            class="text-[11px] leading-snug preview-clamp-1 max-w-[48%]"
          >
            <span class="text-ob-gold">★ {{ friendFor(previewRow.rec.id).text }}</span>
          </p>
          <p class="font-mono text-[10px] leading-snug preview-clamp-1 flex-1" :class="fitClass(previewRow)">
            {{ fitLine(previewRow) }}
          </p>
          <p class="font-mono text-[9.5px] text-ob-faint ml-auto">click to open the full card on the map</p>
        </div>
      </div>

      <ul class="overflow-y-auto min-h-0" role="listbox" aria-label="Ranked suburbs">
        <li v-for="row in scoredRows" :key="row.rec.id">
          <button
            @click="togglePin(row.rec.id)"
            role="option"
            :aria-selected="modelValue === row.rec.id"
            class="w-full text-left px-4 py-2 border-b border-ob-sand/6 transition-colors hover:bg-ob-surface/60 focus:bg-ob-surface/60"
          >
            <div class="flex items-center gap-2.5">
              <span class="font-mono text-[10px] text-ob-faint w-5 shrink-0">{{
                rankById[row.rec.id]
              }}</span>
              <span
                class="w-2.5 h-2.5 rounded-full shrink-0"
                :style="{ backgroundColor: bandColor(row) }"
                :title="bandLabel(row)"
              ></span>
              <span class="text-[12.5px] text-ob-text flex-1 truncate">{{ row.rec.suburb }}</span>
              <span
                v-if="friendFor(row.rec.id)?.badge"
                class="text-ob-gold text-[11px]"
                :title="friendFor(row.rec.id).text"
                >★</span
              >
              <span
                v-if="row.status !== 'ok'"
                class="font-mono text-[10px]"
                :class="row.status === 'reject' ? 'text-ob-sand' : 'text-ob-muted'"
                :title="row.reasons[0]"
                >{{ row.status === 'reject' ? '✕' : '~' }}</span
              >
              <span v-if="shortlistIds.includes(row.rec.id)" class="text-ob-sand text-[11px]"
                >★</span
              >
              <span class="font-mono text-[12px] text-ob-sand w-6 text-right shrink-0">{{
                row.weighted
              }}</span>
            </div>
            <div
              class="mt-0.5 pl-[30px] flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[10px] text-ob-faint"
            >
              <span>{{ priceBand(row.rec) }}</span>
              <span>{{ monthlyLabel(row.rec) }}/mo</span>
              <span :class="bandClass(row.band)">{{ commuteShort(row) }}</span>
              <span>{{ lineShort(row.rec.id) }}</span>
              <span>{{ dwellingShort(row.rec) }}</span>
              <span class="text-ob-purple/80"
                >Sch {{ dots(row.rec.childhood?.schoolStrength) }}</span
              >
            </div>
          </button>
        </li>
      </ul>
      <p
        class="px-4 py-2 font-mono text-[10px] leading-relaxed text-ob-faint border-t border-ob-sand/8 shrink-0"
      >
        Hover the map to preview · click a suburb to open its full card in the map panel · click
        it again or use map view to return · ✕/~ gates follow the active purchase mode ·
        provisional data until verified.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { bandFor } from '@/data/dwelling/mapConfig.js'
import { FEE_ESTIMATE_BY_RISK } from '@/data/dwelling/areaCorridors.js'
import { localitiesForArea, isGroupedArea } from '@/data/dwelling/areaGeo.js'
import { trainLines, linesForArea } from '@/data/dwelling/trainLines.js'
import { friendContextFor } from '@/data/dwelling/personalAnchors.js'
import { communitySnapshotFor } from '@/data/dwelling/communityContext.js'
import { allInMonthly } from '@/composables/useRepayment.js'

const props = defineProps({
  rows: { type: Array, required: true },
  // { areaId, localityName, ... } | null — live map hover from the parent.
  hoveredContext: { type: Object, default: null },
  shortlistIds: { type: Array, default: () => [] },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
  // Active purchase mode object (purchaseModes.js).
  mode: { type: Object, default: null },
})
const modelValue = defineModel({ default: null })
defineEmits(['toggle-shortlist'])

const scoredRows = computed(() => props.rows.filter((r) => r.status !== 'unscored'))

// Rank follows the displayed order (viable first, then score), which is how
// the rows already arrive from useAreaRanking.
const rankById = computed(() => {
  const map = {}
  scoredRows.value.forEach((r, i) => (map[r.rec.id] = i + 1))
  return map
})

const rowById = computed(() => {
  const m = {}
  for (const r of props.rows) m[r.rec.id] = r
  return m
})

const hoveredRow = computed(() =>
  props.hoveredContext?.areaId ? rowById.value[props.hoveredContext.areaId] || null : null,
)
const pinnedRow = computed(() =>
  modelValue.value ? rowById.value[modelValue.value] || null : null,
)

// The preview slot is always populated: hovered suburb, else the pinned one,
// else the current #1 under the active mode and weights.
const previewRow = computed(
  () => hoveredRow.value || pinnedRow.value || scoredRows.value[0] || null,
)

// Polygon-first heading: the hovered geographic suburb name leads even when
// the ranking record groups several localities.
const previewHeading = computed(() => {
  if (!previewRow.value) return ''
  const hoveredName =
    hoveredRow.value && props.hoveredContext?.localityName
      ? props.hoveredContext.localityName
      : null
  return hoveredName || previewRow.value.rec.suburb
})

// "Shared provisional market assumptions with X" wording for grouped records,
// never presenting two suburb names as one geography.
function sharedNoteFor(areaId, localityName) {
  if (!isGroupedArea(areaId)) return null
  const others = localitiesForArea(areaId).filter((n) => n !== localityName)
  if (localityName && others.length)
    return `Shared provisional market assumptions with ${others.join(' and ')}.`
  return `One grouped record covers ${localitiesForArea(areaId).join(' and ')}; treat the market assumptions as shared.`
}
const previewSharedNote = computed(() =>
  previewRow.value
    ? sharedNoteFor(
        previewRow.value.rec.id,
        hoveredRow.value ? props.hoveredContext?.localityName : null,
      )
    : null,
)

// Clicking a list row opens or closes the full card in the map panel.
function togglePin(id) {
  modelValue.value = modelValue.value === id ? null : id
}
function unpin() {
  modelValue.value = null
}

// ---- formatting helpers ---------------------------------------------------

function bandColor(row) {
  return bandFor(row.weighted).color
}
function bandLabel(row) {
  return bandFor(row.weighted).label
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
function priceBand(rec) {
  const p = rec.dwelling?.indicativePrice
  return p ? '$' + Math.round(p[0] / 1000) + 'k–$' + Math.round(p[1] / 1000) + 'k' : 'n/a'
}

// Ongoing owners-corp fee estimate, derived from the top of each record's
// annual OC band so it stays in sync with the data rather than being hand-set.
function feeEstimate(rec) {
  if (rec.feeEstimate != null) return rec.feeEstimate
  const high = rec.dwelling?.annualOc?.[1] ?? 0
  const risk = high > 5000 ? 'high' : high > 3000 ? 'moderate' : 'low'
  return FEE_ESTIMATE_BY_RISK[risk]
}
function monthlyFor(rec) {
  return allInMonthly(rec, {
    deposit: props.deposit,
    rate: props.rate,
    years: props.payoffYears,
    feeEstimate: feeEstimate(rec),
  })
}
function monthlyLabel(rec) {
  const m = monthlyFor(rec)
  return m != null ? '$' + m.toLocaleString('en-AU') : 'n/a'
}
function ocShort(rec) {
  const oc = rec.dwelling?.annualOc
  return oc ? '$' + Math.round(oc[1] / 1000) + 'k oc' : 'no oc'
}
function commuteShort(row) {
  return row.commute ? `${row.commute.typical}–${row.commute.stressed}m` : 'n/a'
}

const DWELLING_LABEL = {
  'older-apartment': 'older apartment',
  'new-apartment': 'new apartment',
  'villa-unit': 'villa unit',
  townhouse: 'townhouse',
  house: 'house',
}
function dwellingLabel(rec) {
  const t = rec.dwelling?.types?.[0]
  const bd = rec.dwelling?.bedrooms
  return t ? `${bd}BR ${DWELLING_LABEL[t] || t}` : 'n/a'
}
function dwellingShort(rec) {
  const t = rec.dwelling?.types?.[0]
  const short = { 'older-apartment': 'apt', 'new-apartment': 'apt', 'villa-unit': 'villa' }[t] || t
  return rec.dwelling ? `${rec.dwelling.bedrooms}BR ${short}` : ''
}

const lineById = Object.fromEntries(trainLines.map((l) => [l.id, l]))
function areaLines(areaId) {
  return linesForArea(areaId)
    .map((id) => lineById[id])
    .filter(Boolean)
}
function lineShort(areaId) {
  const ls = areaLines(areaId)
  return ls.length ? ls[0].group : 'tram'
}

function dots(v) {
  if (v == null) return 'n/a'
  return '●'.repeat(v) + '○'.repeat(5 - v)
}

function friendFor(areaId) {
  return friendContextFor(areaId)
}
function snapshot(areaId) {
  return communitySnapshotFor(areaId)
}

function fitClass(row) {
  return { ok: 'text-ob-teal', conditional: 'text-ob-muted', reject: 'text-ob-sand' }[row.status]
}
function fitLine(row) {
  const label = props.mode ? `under ${props.mode.label}` : 'under current settings'
  if (row.status === 'ok') return `✓ viable ${label}`
  if (row.status === 'conditional') return `~ conditional ${label}: ${row.reasons[0] || ''}`
  return `✕ fails ${label}: ${row.reasons[0] || ''}`
}
</script>

<style scoped>
.preview-clamp-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-clamp-2 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
