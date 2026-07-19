<template>
  <div
    class="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-10 py-5 sm:py-8 lg:py-10 space-y-5 lg:space-y-8"
  >
    <!-- THE WORKSPACE: map and suburb decision pane as equal stars. Weighting
         toggles lead the compact control card above the map; the five purchase
         strategies sit beneath them as a quieter one-line selector. -->
    <div
      class="grid lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[minmax(0,1.35fr)_minmax(570px,1fr)] gap-6 items-start"
    >
      <!-- LEFT column: intro + map -->
      <div class="space-y-4 lg:space-y-5 min-w-0 lg:col-start-1 lg:row-start-1">
        <div class="space-y-3 sm:space-y-4">
          <div class="max-w-3xl">
            <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-2">
              Decide
            </p>
            <h1 class="text-[22px] sm:text-[24px] md:text-[30px] font-extrabold leading-tight">
              One place to weigh it all:
              <span class="text-ob-teal">strategy, location and cost.</span>
            </h1>
          </div>

          <!-- Phone controls: the ranking is primarily a 2BR tool, with one
               compact escape hatch for the 1BR strategy. The full weighting
               workspace remains available from md upward. -->
          <div
            class="md:hidden bg-ob-surface2 border border-ob-sand/10 rounded-[8px] p-2.5"
            aria-label="Mobile ranking strategy"
          >
            <div class="flex items-center gap-2">
              <span class="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ob-faint">
                Rank for
              </span>
              <div class="grid grid-cols-2 gap-1.5 flex-1">
                <button
                  v-for="s in mobileStrategies"
                  :key="s.id"
                  type="button"
                  @click="activeStrategyId = s.id"
                  :aria-pressed="activeStrategyId === s.id"
                  class="rounded-[6px] border px-3 py-2 font-mono text-[11px] transition-colors"
                  :class="
                    activeStrategyId === s.id
                      ? 'border-ob-teal/40 bg-ob-teal/10 text-ob-teal'
                      : 'border-ob-sand/14 text-ob-faint'
                  "
                >
                  {{ s.shortLabel }}
                </button>
              </div>
            </div>
            <p class="mt-1.5 font-mono text-[9px] leading-snug text-ob-faint">
              {{ activeStrategy.intent }} · preset weights
            </p>
          </div>

          <div
            class="hidden md:block bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4"
            aria-label="Ranking controls"
          >
            <div class="flex items-center flex-wrap gap-x-4 gap-y-2">
              <div class="min-w-0">
                <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
                  Weightings · {{ activeStrategy.label }} preset
                </h2>
                <p class="mt-0.5 font-mono text-[10px] text-ob-faint">Toggle to re-rank</p>
              </div>

              <div class="flex items-center gap-2 ml-auto">
                <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-faint">
                  payoff
                </span>
                <div
                  class="grid grid-cols-3 rounded-[6px] border border-ob-sand/14 overflow-hidden"
                >
                  <button
                    v-for="y in [15, 20, 30]"
                    :key="y"
                    @click="payoffYears = y"
                    class="px-2 py-[4px] font-mono text-[10.5px] transition-colors border-r border-ob-sand/14 last:border-r-0"
                    :class="
                      payoffYears === y
                        ? 'bg-ob-teal/15 text-ob-teal'
                        : 'text-ob-faint hover:text-ob-muted'
                    "
                  >
                    {{ y }}yr
                  </button>
                </div>
                <button
                  @click="resetToggles"
                  class="font-mono text-[10.5px] text-ob-faint hover:text-ob-teal transition-colors"
                >
                  reset
                </button>
              </div>
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="c in decideCriteria"
                :key="c.key"
                @click="toggleCriterion(c.key)"
                :disabled="enabled[c.key] && enabledCount === 1"
                :aria-pressed="enabled[c.key]"
                :title="c.hint"
                class="inline-flex items-center justify-between gap-2 font-mono text-[11px] px-2.5 py-[6px] rounded-[6px] border transition-colors disabled:cursor-not-allowed"
                :class="criterionButtonClass(c)"
              >
                <span>{{ c.label }}</span>
                <span>×{{ enabled[c.key] ? activeStrategy.weights[c.key] : 0 }}</span>
              </button>
            </div>

            <div class="mt-3 pt-3 border-t border-ob-sand/8 flex items-center gap-3 min-w-0">
              <span
                class="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ob-faint"
              >
                Strategy
              </span>
              <div class="min-w-0 flex-1 grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                <button
                  v-for="s in decideStrategies"
                  :key="s.id"
                  @click="activeStrategyId = s.id"
                  :title="`${s.dwelling} · ${s.intent}`"
                  class="min-w-0 truncate rounded-[5px] border px-2 py-[5px] font-mono text-[10px] transition-colors"
                  :class="
                    activeStrategyId === s.id
                      ? 'border-ob-teal/35 bg-ob-teal/8 text-ob-teal'
                      : 'border-ob-sand/12 text-ob-faint hover:border-ob-sand/25 hover:text-ob-muted'
                  "
                >
                  {{ s.shortLabel }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <MapPanel
          v-if="showDesktopMap"
          v-model="activeLocationId"
          :rows="rankedLocations"
          :features="mapFeatures"
          :index-by-id="areaIndexById"
          :shortlist-ids="shortlist"
          :payoff-years="payoffYears"
          :deposit="deposit"
          :rate="rate"
          :strategy="activeStrategy"
          :list-hovered-id="listHoverId"
          @hover="hoveredContext = $event"
          @toggle-shortlist="toggleShortlist"
        />
      </div>

      <!-- RIGHT column: the authoritative ranked suburb pane. -->
      <SuburbDecisionPane
        v-model="activeLocationId"
        :rows="rankedLocations"
        :hovered-context="hoveredContext"
        :shortlist-ids="shortlist"
        :payoff-years="payoffYears"
        :deposit="deposit"
        :rate="rate"
        :strategy="activeStrategy"
        :weights="effectiveWeights"
        class="order-2 min-w-0 lg:col-start-2 lg:row-start-1"
        @toggle-shortlist="toggleShortlist"
        @hover="listHoverId = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  decideStrategies,
  decideCriteria,
  defaultStrategyId,
  strategyById,
} from '@/data/dwelling/decideStrategies.js'
import { areaCorridors } from '@/data/dwelling/areaCorridors.js'
import { stationPointFeatures, areaBounds, areaIndexById } from '@/data/dwelling/areaGeoFeatures.js'
import { localityFeatures } from '@/data/dwelling/localityFeatures.js'
import { personalPosition } from '@/data/dwelling/facts.js'
import { useAreaRanking } from '@/composables/useAreaRanking.js'
import MapPanel from '@/components/dwelling/MapPanel.vue'
import SuburbDecisionPane from '@/components/dwelling/SuburbDecisionPane.vue'

const payoffYears = ref(15)
const activeLocationId = ref(null)
const hoveredContext = ref(null)
// Suburb hovered in the ranked list; routed into the map's hover highlight.
const listHoverId = ref(null)

const deposit = personalPosition.calc.deposit
const rate = personalPosition.calc.rate

// The strategy is the single mode: a weight preset over the eight criteria plus
// the purchase proposition (dwelling types, bedrooms, price cap) expressed
// through the same named filter gates as before.
const activeStrategyId = ref(defaultStrategyId)
const activeStrategy = computed(() => strategyById(activeStrategyId.value))
const mobileStrategies = decideStrategies.filter((strategy) =>
  ['balanced2br', 'bachelor1br'].includes(strategy.id),
)

// Do not merely hide MapLibre with CSS on phones: avoid mounting it and
// downloading its map/school-zone payload entirely until the desktop layout
// is active.
const showDesktopMap = ref(false)
let desktopMapQuery = null
function syncDesktopMap(event) {
  showDesktopMap.value = event.matches
}
onMounted(() => {
  desktopMapQuery = window.matchMedia('(min-width: 1024px)')
  showDesktopMap.value = desktopMapQuery.matches
  desktopMapQuery.addEventListener('change', syncDesktopMap)
})
onBeforeUnmount(() => desktopMapQuery?.removeEventListener('change', syncDesktopMap))

// Binary criterion toggles over the active preset. Switching strategy restores
// each criterion's default (Chinese stays off); the last enabled criterion
// cannot be switched off, so the weight set can never go empty from the UI.
const enabled = reactive(
  Object.fromEntries(decideCriteria.map((c) => [c.key, c.defaultEnabled !== false])),
)
const enabledCount = computed(() => decideCriteria.filter((c) => enabled[c.key]).length)
function toggleCriterion(key) {
  if (enabled[key] && enabledCount.value === 1) return
  enabled[key] = !enabled[key]
}
function criterionButtonClass(criterion) {
  if (!enabled[criterion.key])
    return 'border-ob-sand/14 text-ob-faint hover:text-ob-muted line-through'
  if (criterion.accent === 'amber') return 'border-amber-500/45 text-amber-300 bg-amber-500/10'
  if (criterion.accent === 'red') return 'border-red-500/45 text-red-300 bg-red-500/10'
  if (criterion.accent === 'pink') return 'border-pink-500/45 text-pink-300 bg-pink-500/10'
  return 'border-ob-teal/45 text-ob-teal bg-ob-teal/8'
}
function resetToggles() {
  decideCriteria.forEach((c) => (enabled[c.key] = c.defaultEnabled !== false))
}
watch(activeStrategyId, resetToggles)

// Effective weight per criterion: the preset value while the toggle is on,
// 0 while it is off. Standard criteria renormalise inside useAreaRanking;
// additive criteria use the value as their premium multiplier.
const effectiveWeights = computed(() =>
  Object.fromEntries(
    decideCriteria.map((c) => [c.key, enabled[c.key] ? activeStrategy.value.weights[c.key] : 0]),
  ),
)

// Loose limits beyond the strategy's own: the map is for tuning, not hard
// filtering. Intrinsic gates (over 65 min, >1 transfer, no second bedroom)
// still apply inside useAreaRanking.
const areaFilters = computed(() => ({
  maxPrice: activeStrategy.value.filters.maxPrice,
  maxCommute: 90,
  maxStationWalk: 20,
  minBedrooms: activeStrategy.value.filters.minBedrooms,
  dwellingTypes: activeStrategy.value.filters.dwellingTypes,
  strategy: activeStrategy.value,
  includeStretch: true,
}))

const rankedLocations = useAreaRanking(areaCorridors, areaFilters, effectiveWeights)

// Local GeoJSON for the map. Static geometry; colours are applied live.
const mapFeatures = {
  points: stationPointFeatures,
  localities: localityFeatures,
  bounds: areaBounds,
}

// Shortlist for map + pane (capped at three, per the brief).
const shortlist = ref([])
function toggleShortlist(id) {
  const i = shortlist.value.indexOf(id)
  if (i >= 0) shortlist.value = shortlist.value.filter((x) => x !== id)
  else if (shortlist.value.length < 3) shortlist.value = [...shortlist.value, id]
}

// Deep-link the active suburb via ?area=. Read once on mount, then mirror
// changes into the query. A rejected suburb stays selected (it is still in the
// set, just gated) — we only clear an id that matches no record at all.
const route = useRoute()
const router = useRouter()
onMounted(() => {
  const q = route.query.area
  if (typeof q === 'string' && areaCorridors.some((r) => r.id === q)) activeLocationId.value = q
})
watch(activeLocationId, (id) => {
  const next = { ...route.query }
  if (id == null) delete next.area
  else next.area = id
  router.replace({ query: next })
})
</script>
