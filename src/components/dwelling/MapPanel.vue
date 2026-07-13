<template>
  <section
    class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] overflow-hidden"
    @keydown.esc="onEscape"
  >
    <!-- lens picker + heading -->
    <div
      class="px-4 pt-3.5 pb-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-ob-sand/8"
    >
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
        Melbourne lens · {{ activeLens.label }}
      </h2>
      <div class="flex flex-wrap gap-1.5 ml-auto">
        <button
          v-for="l in lenses"
          :key="l.key"
          @click="lensKey = l.key"
          class="font-mono text-[10.5px] px-2 py-[3px] rounded-full border transition-colors"
          :class="
            lensKey === l.key
              ? 'border-ob-teal/45 text-ob-teal'
              : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
          "
        >
          {{ l.label }}
        </button>
      </div>
    </div>

    <!-- Mobile-only Map / List switch. On lg+ both panes always show side by
         side; on small screens one shows at a time (list stays reachable
         without hover as the accessible fallback). -->
    <div class="lg:hidden px-4 py-2 border-b border-ob-sand/8 flex justify-center">
      <div
        class="inline-flex rounded-[6px] border border-ob-sand/14 overflow-hidden"
        role="tablist"
      >
        <button
          v-for="v in ['map', 'list']"
          :key="v"
          @click="mobileView = v"
          role="tab"
          :aria-selected="mobileView === v"
          class="px-4 py-[5px] font-mono text-[11px] uppercase tracking-[0.06em] transition-colors border-r border-ob-sand/14 last:border-r-0"
          :class="
            mobileView === v ? 'bg-ob-teal/15 text-ob-teal' : 'text-ob-faint hover:text-ob-muted'
          "
        >
          {{ v }}
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-[1.9fr_1fr]">
      <!-- MAP: the star. ~65% on desktop, tall. -->
      <div class="relative" :class="{ 'hidden lg:block': mobileView !== 'map' }">
        <div class="h-[340px] sm:h-[440px] lg:h-[560px]">
          <component
            :is="DwellingMap"
            :catchments="features.catchments"
            :points="features.points"
            :bounds="features.bounds"
            :area-state="areaState"
            :selected-area-id="modelValue"
            :shortlist-ids="shortlistIds"
            :get-popup-html="popupHtml"
            :basemap="coastlineUrl"
            :theme="theme"
            @select="onSelect"
            @hover="hoveredId = $event"
          />
        </div>

        <!-- legend -->
        <div
          class="absolute left-3 bottom-3 bg-ob-bg/85 backdrop-blur-sm border border-ob-sand/12 rounded-[6px] px-3 py-2"
        >
          <p class="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ob-faint mb-1.5">
            {{ activeLens.pct ? 'Fit score' : activeLens.label }}
          </p>
          <div class="space-y-1">
            <div v-for="row in legend" :key="row.label" class="flex items-center gap-1.5">
              <span
                class="w-3 h-3 rounded-[3px] shrink-0"
                :style="{ backgroundColor: row.color }"
              ></span>
              <span class="font-mono text-[10px] text-ob-dim">{{ row.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT RAIL: ranked list + hovered/selected summary -->
      <div
        class="border-t lg:border-t-0 lg:border-l border-ob-sand/8 flex-col max-h-[560px]"
        :class="mobileView === 'list' ? 'flex' : 'hidden lg:flex'"
      >
        <!-- preview card. Height is reserved so hovering a list row never
             reflows the list underneath the cursor. -->
        <div class="min-h-[190px] border-b border-ob-sand/8">
          <div v-if="previewRow" class="px-4 py-3">
            <div class="flex items-baseline justify-between gap-2">
              <span class="text-[14px] font-bold text-ob-text">{{ previewRow.rec.suburb }}</span>
              <span class="font-mono text-[11px] text-ob-faint"
                >#{{ rankById[previewRow.rec.id] }} · {{ previewRow.rec.region }}</span
              >
            </div>
            <div class="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                class="font-mono text-[11px] px-2 py-[2px] rounded-full"
                :style="{
                  backgroundColor: bandColor(previewRow) + '22',
                  color: bandColor(previewRow),
                }"
                >{{ previewRow.weighted }} · {{ bandLabel(previewRow) }}</span
              >
              <span v-if="previewRow.commute" class="font-mono text-[11px] text-ob-dim"
                >{{ previewRow.commute.typical }}–{{ previewRow.commute.stressed }} min</span
              >
              <span class="font-mono text-[11px] text-ob-dim">{{ priceBand(previewRow.rec) }}</span>
            </div>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] text-ob-faint">
              <span>Schools {{ dot(previewRow.rec.childhood?.schoolStrength) }}</span>
              <span>Teen {{ dot(previewRow.rec.childhood?.teenIndependence) }}</span>
              <span>Car: {{ carLabel(previewRow.rec) }}</span>
            </div>
            <p
              v-if="previewRow.rec.caseFor?.[0]"
              class="mt-2 text-[12px] leading-snug text-ob-muted2 line-clamp-2"
            >
              <span class="text-ob-teal">+</span> {{ previewRow.rec.caseFor[0] }}
            </p>
            <p
              v-if="previewRow.rec.caseAgainst?.[0]"
              class="mt-1 text-[12px] leading-snug text-ob-muted2 line-clamp-2"
            >
              <span class="text-ob-sand">−</span> {{ previewRow.rec.caseAgainst[0] }}
            </p>
            <div class="mt-2.5 flex items-center gap-3">
              <button
                @click="toggleShortlist(previewRow.rec.id)"
                class="font-mono text-[10.5px] px-2 py-[3px] rounded-full border transition-colors"
                :class="
                  shortlistIds.includes(previewRow.rec.id)
                    ? 'border-ob-sand/45 text-ob-sand'
                    : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
                "
              >
                {{ shortlistIds.includes(previewRow.rec.id) ? '★ shortlisted' : '☆ shortlist' }}
              </button>
              <span
                v-if="previewRow.rec.placeholder"
                class="font-mono text-[10px] text-ob-sand"
                title="Placeholder data pending verification"
                >provisional data</span
              >
            </div>
          </div>
          <p v-else class="px-4 py-3 font-mono text-[11px] leading-relaxed text-ob-faint">
            Hover the map or a suburb to preview it here; click to pin the selection.
          </p>
        </div>

        <!-- ranked list (keyboard + a11y fallback for the map) -->
        <ul class="overflow-y-auto flex-1" role="listbox" :aria-label="'Ranked suburbs'">
          <li v-for="row in scoredRows" :key="row.rec.id" :ref="(el) => setRowRef(row.rec.id, el)">
            <button
              @click="onSelect(row.rec.id)"
              @mouseenter="hoveredId = row.rec.id"
              @mouseleave="hoveredId = null"
              @focus="hoveredId = row.rec.id"
              role="option"
              :aria-selected="modelValue === row.rec.id"
              class="w-full text-left px-4 py-2 flex items-center gap-2.5 border-b border-ob-sand/6 transition-colors"
              :class="
                modelValue === row.rec.id
                  ? 'bg-ob-teal/10'
                  : 'hover:bg-ob-surface/60 focus:bg-ob-surface/60'
              "
            >
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
                v-if="row.status !== 'ok'"
                class="font-mono text-[10px]"
                :class="row.status === 'reject' ? 'text-ob-sand' : 'text-ob-muted'"
                >{{ row.status === 'reject' ? '✕' : '~' }}</span
              >
              <span v-if="shortlistIds.includes(row.rec.id)" class="text-ob-sand text-[11px]"
                >★</span
              >
              <span class="font-mono text-[12px] text-ob-sand w-6 text-right shrink-0">{{
                row.weighted
              }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- caption: geographic honesty -->
    <p
      class="px-4 py-2 font-mono text-[10px] leading-relaxed text-ob-faint border-t border-ob-sand/8"
    >
      Scores apply to the defined station-catchment hypothesis, not every property in the suburb.
      Catchment guides are straight-line radii, not walking-network isochrones. Location data is
      provisional until verified.
    </p>
  </section>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, nextTick, watch } from 'vue'
import {
  MAP_THEME,
  lensByKey,
  availableLenses,
  computeAreaState,
  legendFor,
  bandFor,
} from '@/data/dwelling/mapConfig.js'
import { carDependenceFor, CAR_DEPENDENCE_LABEL } from '@/data/dwelling/areaEnrichment.js'
import coastlineUrl from '@/assets/geo/melbourne-coastline.geojson?url'

// maplibre-gl is heavy; keep it in its own async chunk so the rest of the Decide
// view (and every other route) never pays for it up front.
const DwellingMap = defineAsyncComponent(() => import('./DwellingMap.vue'))

const props = defineProps({
  rows: { type: Array, required: true },
  features: { type: Object, required: true }, // { catchments, points, bounds }
  indexById: { type: Object, required: true },
  shortlistIds: { type: Array, default: () => [] },
})
const modelValue = defineModel({ default: null })
const emit = defineEmits(['toggle-shortlist'])

const theme = MAP_THEME
const lensKey = ref('overall')
// Only lenses with real data appear; if the active one stops being available
// (data removed), fall back to overall.
const lenses = computed(() => availableLenses(props.rows))
watch(lenses, (ls) => {
  if (!ls.some((l) => l.key === lensKey.value)) lensKey.value = 'overall'
})
const activeLens = computed(() => lensByKey(lensKey.value))
const legend = computed(() => legendFor(lensKey.value))

const hoveredId = ref(null)
const mobileView = ref('map')
const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const scoredRows = computed(() => props.rows.filter((r) => r.status !== 'unscored'))

// Rank by weighted score across scored rows (stable, matches the colour meaning).
const rankById = computed(() => {
  const ranked = [...scoredRows.value].sort((a, b) => (b.weighted ?? -1) - (a.weighted ?? -1))
  const map = {}
  ranked.forEach((r, i) => (map[r.rec.id] = i + 1))
  return map
})

const areaState = computed(() => computeAreaState(scoredRows.value, props.indexById, lensKey.value))

const rowById = computed(() => {
  const m = {}
  for (const r of props.rows) m[r.rec.id] = r
  return m
})
const previewRow = computed(
  () => rowById.value[hoveredId.value] || rowById.value[modelValue.value] || null,
)

function onSelect(areaId) {
  modelValue.value = areaId
}
function toggleShortlist(areaId) {
  emit('toggle-shortlist', areaId)
}
function onEscape() {
  hoveredId.value = null
}

function bandColor(row) {
  return bandFor(row.weighted).color
}
function bandLabel(row) {
  return bandFor(row.weighted).label
}
function priceBand(rec) {
  const p = rec.dwelling?.indicativePrice
  return p ? '$' + Math.round(p[0] / 1000) + 'k–$' + Math.round(p[1] / 1000) + 'k' : 'n/a'
}
function dot(v) {
  return v == null ? 'n/a' : v + '/5'
}
function carLabel(rec) {
  const cd = carDependenceFor(rec)
  return cd ? CAR_DEPENDENCE_LABEL[cd] : 'n/a'
}

// Small on-map hover popup: name, score band, rank, commute. Sanitised text.
function popupHtml(areaId) {
  const row = rowById.value[areaId]
  if (!row) return null
  const b = bandFor(row.weighted)
  const commute = row.commute ? `${row.commute.typical}–${row.commute.stressed} min` : ''
  return `<strong>${esc(row.rec.suburb)}</strong><br>
    <span style="color:${b.color}">${row.weighted} · ${b.label}</span> · #${rankById.value[areaId]}<br>
    <span style="color:#94A4B2">${commute}</span>`
}
function esc(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
  )
}

// Scroll the list to the selected suburb when it changes from the map.
const rowRefs = {}
function setRowRef(id, el) {
  if (el) rowRefs[id] = el
}
watch(modelValue, async (id) => {
  if (id == null) return
  await nextTick()
  rowRefs[id]?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' })
})
</script>
