<template>
  <section class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] overflow-hidden">
    <div
      v-if="!selectedRow"
      class="px-4 pt-3.5 pb-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-ob-sand/8"
    >
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
        Melbourne map · fit score
      </h2>
      <span v-if="strategy" class="ml-auto font-mono text-[10.5px] text-ob-dim truncate">
        testing: {{ strategy.label }}
      </span>
    </div>
    <div v-else class="px-4 py-2.5 border-b border-ob-sand/8 flex items-center gap-3 shrink-0">
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">Suburb profile</h2>
      <span v-if="strategy" class="font-mono text-[10.5px] text-ob-dim truncate">
        testing: {{ strategy.label }}
      </span>
      <button
        @click="closeProfile"
        class="ml-auto font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors shrink-0"
      >
        map view
      </button>
    </div>

    <!-- map -->
    <div class="relative">
      <div class="h-[380px] sm:h-[460px] lg:h-[600px]">
        <div
          class="h-full transition-opacity"
          :class="selectedRow ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        >
          <component
            :is="DwellingMap"
            :points="features.points"
            :localities="features.localities"
            :bounds="features.bounds"
            :area-state="areaState"
            :selected-area-id="modelValue"
            :get-popup-html="popupHtml"
            :basemap="coastlineUrl"
            :water="bayUrl"
            :water-bodies="waterBodiesUrl"
            :river="yarraUrl"
            :theme="theme"
            :train-lines="trainLineFeatures"
            :hover-line-ids="hoverLineIds"
            :selected-line-ids="selectedLineIds"
            :schools="schoolFeatures"
            :school-zones="schoolZones"
            :active-zone-category="activeZoneCategory"
            :facilities="facilityFeatures"
            :open-space="openSpaceUrl"
            :hovered-area-id="displayHoveredId"
            :show-all-schools="layers.schools"
            :show-all-facilities="layers.facilities"
            :show-open-space="layers.openSpace"
            :anchors="personalAnchors"
            :show-anchors="layers.anchors"
            :suspend-interaction="!!selectedRow"
            @select="onSelect"
            @hover="onHover"
          />
        </div>
        <SuburbProfileCard
          v-if="selectedRow"
          class="absolute inset-0 z-10 bg-ob-surface2"
          :row="selectedRow"
          :rank-by-id="rankById"
          :payoff-years="payoffYears"
          :deposit="deposit"
          :rate="rate"
          :strategy="strategy"
          :weights="weights"
          @close="closeProfile"
        />
      </div>

      <!-- score legend -->
      <div
        v-if="!selectedRow"
        class="absolute left-3 bottom-3 z-10 pointer-events-none space-y-1.5"
      >
        <p
          class="inline-flex items-center rounded-[5px] bg-ob-bg/55 px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.08em] text-ob-faint shadow-[0_4px_18px_rgba(0,0,0,0.28)] backdrop-blur-[2px]"
        >
          Fit score
        </p>
        <div class="space-y-1">
          <div
            v-for="row in legend"
            :key="row.label"
            class="inline-flex items-center gap-1.5 rounded-[5px] bg-ob-bg/45 px-2 py-[3px] shadow-[0_4px_18px_rgba(0,0,0,0.24)] backdrop-blur-[2px]"
          >
            <span
              class="w-3 h-3 rounded-[3px] shrink-0"
              :style="{ backgroundColor: row.color }"
            ></span>
            <span class="font-mono text-[10px] text-ob-dim">{{ row.label }}</span>
          </div>
        </div>
      </div>

      <!-- No train-line legend: hovering a line identifies it in the popup.
           Line colour stays route identity, never fit. -->
    </div>

    <!-- layer toggles + caption -->
    <div
      v-if="!selectedRow"
      class="px-4 py-2 border-t border-ob-sand/8 flex flex-wrap items-center gap-x-3 gap-y-1.5"
    >
      <span class="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ob-faint">Layers</span>
      <button
        v-for="t in layerToggles"
        :key="t.key"
        @click="layers[t.key] = !layers[t.key]"
        class="font-mono text-[10.5px] px-2 py-[3px] rounded-full border transition-colors"
        :class="
          layers[t.key]
            ? t.key === 'schools' || t.key === 'facilities'
              ? 'border-ob-purple/45 text-ob-purple'
              : t.key === 'anchors'
                ? 'border-ob-gold-muted/60 text-ob-gold'
                : 'border-ob-teal/45 text-ob-teal'
            : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
        "
        :title="t.hint"
      >
        {{ t.label }}
      </button>
      <div v-if="schoolZones" class="inline-flex items-center gap-1.5">
        <span class="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ob-faint">
          Zones
        </span>
        <div class="inline-flex rounded-[6px] border border-ob-sand/14 overflow-hidden">
          <button
            v-for="category in ['primary', 'secondary']"
            :key="category"
            type="button"
            class="px-2 py-[3px] font-mono text-[10px] transition-colors border-r border-ob-sand/14 last:border-r-0"
            :class="
              activeZoneCategory === category
                ? 'bg-ob-purple/15 text-ob-purple'
                : 'text-ob-faint hover:text-ob-muted'
            "
            :aria-pressed="activeZoneCategory === category"
            @click="activeZoneCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>
      <div class="w-full sm:w-auto sm:ml-auto font-mono text-[10px] leading-relaxed text-ob-faint">
        <p>Suburb fill = weighted fit score · provisional until verified</p>
        <p v-if="schoolZones">
          School zones: official {{ schoolZones.zoneYear }} enrolment zones · verify any address at
          findmyschool.vic.gov.au · solid = zoned at station · dashed = zone overlaps catchment ·
          not for property purchase reliance
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, defineAsyncComponent, watch, onMounted } from 'vue'
import { MAP_THEME, computeAreaState, scoreLegend } from '@/data/dwelling/mapConfig.js'
import { fitBandColor, getFitBand } from '@/data/dwelling/fitBands.js'
import { coverageLabelForArea, isGroupedArea } from '@/data/dwelling/areaGeo.js'
import { trainLineFeatures, linesForArea } from '@/data/dwelling/trainLines.js'
import { schoolPoints } from '@/data/dwelling/schools/dwelling-school-points.js'
import { facilityFeatures } from '@/data/dwelling/facilities.js'
import { personalAnchors } from '@/data/dwelling/personalAnchors.js'
import coastlineUrl from '@/assets/geo/melbourne-coastline.geojson?url'
import bayUrl from '@/assets/geo/port-phillip-bay.geojson?url'
import waterBodiesUrl from '@/assets/geo/melbourne-water-bodies.geojson?url'
import yarraUrl from '@/assets/geo/yarra-river.geojson?url'
import openSpaceUrl from '@/assets/geo/melbourne-open-space.geojson?url'
import SuburbProfileCard from './SuburbProfileCard.vue'

// maplibre-gl is heavy; keep it in its own async chunk so the rest of Settle
// view (and every other route) never pays for it up front.
const DwellingMap = defineAsyncComponent(() => import('./DwellingMap.vue'))

const props = defineProps({
  rows: { type: Array, required: true },
  features: { type: Object, required: true }, // { points, localities, bounds }
  indexById: { type: Object, required: true },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
  // Active Settle strategy (decideStrategies.js).
  strategy: { type: Object, default: null },
  weights: { type: Object, default: () => ({}) },
  // Suburb hovered in the ranked list; highlighted on the map exactly like a
  // pointer hover. The map's own pointer hover wins while both are live.
  listHoveredId: { type: String, default: null },
})
const modelValue = defineModel({ default: null })
const emit = defineEmits(['hover'])

const theme = MAP_THEME
const legend = scoreLegend()
const schoolFeatures = {
  type: 'FeatureCollection',
  features: schoolPoints.map((school, index) => ({
    type: 'Feature',
    id: index,
    properties: {
      schoolId: school.id,
      name: school.name,
      category: school.category,
      sector: school.sector,
      areaIds: school.areaIds,
      zonedFor: school.zonedFor,
    },
    geometry: { type: 'Point', coordinates: school.coordinates },
  })),
}
const schoolZones = ref(null)
const activeZoneCategory = ref('primary')

onMounted(async () => {
  const module = await import('@/data/dwelling/schools/dwelling-school-zones.json')
  schoolZones.value = module.default
})

// Map overlay layers. Schools and facilities also appear contextually for the
// hovered or selected suburb with the toggle off; anchors and the contextual
// eligible-open-space layer default on.
const layers = reactive({ anchors: true, schools: false, facilities: false, openSpace: true })
const layerToggles = [
  { key: 'anchors', label: '★ personal', hint: 'Personal network anchors (gold)' },
  {
    key: 'schools',
    label: 'schools',
    hint: 'Show every curated school, not just the hovered or selected suburb',
  },
  { key: 'facilities', label: 'facilities', hint: 'Show every curated aquatic/sports facility' },
  {
    key: 'openSpace',
    label: 'open space',
    hint: 'Eligible public open-space polygons (context only; no scoring impact)',
  },
]

const scoredRows = computed(() =>
  props.rows.filter((row) => row.status !== 'unscored' && row.status !== 'veto'),
)

// Rank follows the displayed order (viable first, then score), matching the
// decision pane's ranked list.
const rankById = computed(() => {
  const map = {}
  scoredRows.value.forEach((r, i) => (map[r.rec.id] = i + 1))
  return map
})

const areaState = computed(() => computeAreaState(props.rows, props.indexById))

const rowById = computed(() => {
  const m = {}
  for (const r of props.rows) m[r.rec.id] = r
  return m
})
const selectedRow = computed(() =>
  modelValue.value ? rowById.value[modelValue.value] || null : null,
)

const hoveredAreaId = ref(null)
const displayHoveredId = computed(() => hoveredAreaId.value || props.listHoveredId || null)
const hoverLineIds = computed(() =>
  displayHoveredId.value ? linesForArea(displayHoveredId.value) : [],
)
const selectedLineIds = computed(() => (modelValue.value ? linesForArea(modelValue.value) : []))

watch(
  () => modelValue.value,
  (id) => {
    if (id != null) {
      hoveredAreaId.value = null
      emit('hover', null)
    }
  },
)

// Clicking the already-selected suburb again closes its full profile.
function onSelect(payload) {
  const id = typeof payload === 'string' ? payload : payload?.areaId || null
  modelValue.value = modelValue.value === id ? null : id
}
function onHover(payload) {
  hoveredAreaId.value = payload?.areaId || null
  emit('hover', payload)
}
function closeProfile() {
  modelValue.value = null
}

// Compact on-map popup: polygon name first, score chip, rank, plus the name
// of any train line under the pointer (there is no on-map line legend).
function popupHtml(payload) {
  const areaId = typeof payload === 'string' ? payload : payload?.areaId
  const localityName = typeof payload === 'object' ? payload?.localityName : null
  const lineHits = (typeof payload === 'object' && payload?.lineHits) || []
  const linesHtml = lineHits
    .map(
      (l) =>
        `<span style="display:inline-block;width:10px;height:3px;border-radius:2px;background:${l.color};margin-right:4px;vertical-align:middle"></span><span style="color:#A6B4C0">${esc(l.name)} line</span>`,
    )
    .join('<br>')
  const row = rowById.value[areaId]
  if (!row) return linesHtml || null
  const heading = localityName || row.rec.suburb
  const shared =
    isGroupedArea(areaId) && localityName
      ? `<span style="color:#94A4B2; font-size:11px">Shared assumptions: ${esc(coverageLabelForArea(areaId))}</span><br>`
      : ''
  const base =
    row.status === 'unscored'
      ? `<strong>${esc(heading)}</strong><br>${shared}<span style="color:${theme.unscoredOutline}">unscored</span>`
      : row.status === 'veto'
        ? `<strong>${esc(heading)}</strong><br>${shared}<span style="color:${theme.markerDim}">owner veto · score ${row.weighted}</span>`
        : (() => {
            const b = getFitBand(row.weighted)
            return `<strong>${esc(heading)}</strong><br>${shared}<span style="color:${fitBandColor(b)}">${row.weighted} · ${b.label}</span> · #${rankById.value[areaId]}`
          })()
  return linesHtml ? `${base}<br>${linesHtml}` : base
}
function esc(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
  )
}
</script>
