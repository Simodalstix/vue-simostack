<template>
  <div class="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 space-y-8">
    <!-- THE WORKSPACE: map and suburb decision pane as equal stars.
         Left ~60%: intro, Melbourne map, strategy selector, weighting toggles.
         Right ~40%: the single authoritative suburb pane (ranked list /
         hover preview / pinned inspector). Below lg the grid children stack
         map first, pane second, controls after (the pane spans both left rows
         on desktop). -->
    <div class="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
      <!-- LEFT column, upper: intro + map -->
      <div class="space-y-5 min-w-0 lg:col-start-1 lg:row-start-1">
        <div class="max-w-3xl">
          <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-2">Decide</p>
          <h1 class="text-[24px] md:text-[30px] font-extrabold leading-tight">
            One place to weigh it all:
            <span class="text-ob-teal">strategy, location and cost.</span>
          </h1>
          <p class="mt-3 text-[13.5px] leading-relaxed text-ob-muted">
            Pick the strategy you are testing; it sets both the purchase being priced and the
            weighting of the six criteria below. Toggle a criterion off to redistribute its weight.
            Hover a suburb to preview it; click a suburb to open its full card over the map.
            Location data is placeholder until verified.
          </p>
        </div>

        <MapPanel
          v-model="activeLocationId"
          :rows="rankedLocations"
          :features="mapFeatures"
          :index-by-id="areaIndexById"
          :shortlist-ids="shortlist"
          :payoff-years="payoffYears"
          :deposit="deposit"
          :rate="rate"
          :strategy="activeStrategy"
          @hover="hoveredContext = $event"
          @toggle-shortlist="toggleShortlist"
        />
      </div>

      <!-- LEFT column, lower: strategy selector + weighting toggles -->
      <div class="space-y-5 min-w-0 order-3 lg:order-none lg:col-start-1 lg:row-start-2">
        <!-- strategy: the ONE mode. Each strategy is a weighting preset plus
             the purchase proposition (dwelling, bedrooms, price cap) that runs
             through the ranking gates. -->
        <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4">
          <div class="flex items-baseline justify-between flex-wrap gap-2 mb-2.5">
            <h3 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
              Strategy · preset weights + the purchase being tested
            </h3>
            <span class="font-mono text-[10.5px] text-ob-faint">
              selecting one recolours the map and re-ranks live
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
            <button
              v-for="s in decideStrategies"
              :key="s.id"
              @click="activeStrategyId = s.id"
              class="text-left rounded-[6px] border px-3 py-2 transition-colors"
              :class="
                activeStrategyId === s.id
                  ? 'border-ob-teal/45 bg-ob-teal/8'
                  : 'border-ob-sand/14 hover:border-ob-sand/25'
              "
            >
              <span
                class="block text-[12px] font-semibold leading-snug"
                :class="activeStrategyId === s.id ? 'text-ob-teal' : 'text-ob-text'"
                >{{ s.label }}</span
              >
              <span class="block mt-0.5 font-mono text-[10px] text-ob-faint leading-snug">
                {{ s.dwelling }} · {{ s.intent }}
              </span>
            </button>
          </div>
        </div>

        <!-- weighting toggles: the active preset, criterion by criterion.
             Binary on/off only; off means weight 0 and the score renormalises
             over what remains, so switching one off never punishes a suburb. -->
        <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4">
          <div class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-2">
            <h3 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
              Weightings · {{ activeStrategy.label }} preset
            </h3>
            <div class="flex items-center gap-2 ml-auto">
              <span class="font-mono text-[10.5px] text-ob-faint">payoff</span>
              <div class="inline-flex rounded-[6px] border border-ob-sand/14 overflow-hidden">
                <button
                  v-for="y in [15, 20, 30]"
                  :key="y"
                  @click="payoffYears = y"
                  class="px-2.5 py-[4px] font-mono text-[11px] transition-colors border-r border-ob-sand/14 last:border-r-0"
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
                class="font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
              >
                reset
              </button>
            </div>
          </div>
          <p class="text-[11.5px] leading-snug text-ob-dim mb-3">
            Each criterion carries its preset weight or nothing. Toggling one off redistributes
            its weight across the rest, so a suburb is never marked down for a criterion you are
            ignoring. Switching strategy resets the toggles.
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="c in decideCriteria"
              :key="c.key"
              @click="toggleCriterion(c.key)"
              :disabled="enabled[c.key] && enabledCount === 1"
              :title="c.hint"
              class="font-mono text-[11px] px-2.5 py-[5px] rounded-[6px] border transition-colors disabled:cursor-not-allowed"
              :class="
                enabled[c.key]
                  ? 'border-ob-teal/45 text-ob-teal bg-ob-teal/8'
                  : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted line-through'
              "
            >
              {{ c.label }} ×{{ enabled[c.key] ? activeStrategy.weights[c.key] : 0 }}
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT column: the decision pane, spanning both left rows on desktop -->
      <SuburbDecisionPane
        v-model="activeLocationId"
        :rows="rankedLocations"
        :hovered-context="hoveredContext"
        :shortlist-ids="shortlist"
        :payoff-years="payoffYears"
        :deposit="deposit"
        :rate="rate"
        :strategy="activeStrategy"
        class="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 min-w-0"
        @toggle-shortlist="toggleShortlist"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  decideStrategies,
  decideCriteria,
  defaultStrategyId,
  strategyById,
} from '@/data/dwelling/decideStrategies.js'
import { areaCorridors } from '@/data/dwelling/areaCorridors.js'
import {
  catchmentFeatures,
  stationPointFeatures,
  areaBounds,
  areaIndexById,
} from '@/data/dwelling/areaGeoFeatures.js'
import { localityFeatures } from '@/data/dwelling/localityFeatures.js'
import { personalPosition } from '@/data/dwelling/facts.js'
import { useAreaRanking } from '@/composables/useAreaRanking.js'
import MapPanel from '@/components/dwelling/MapPanel.vue'
import SuburbDecisionPane from '@/components/dwelling/SuburbDecisionPane.vue'

const payoffYears = ref(15)
const activeLocationId = ref(null)
const hoveredContext = ref(null)

const deposit = personalPosition.calc.deposit
const rate = personalPosition.calc.rate

// The strategy is the single mode: a weight preset over the six criteria plus
// the purchase proposition (dwelling types, bedrooms, price cap) expressed
// through the same named filter gates as before.
const activeStrategyId = ref(defaultStrategyId)
const activeStrategy = computed(() => strategyById(activeStrategyId.value))

// Binary criterion toggles over the active preset. Switching strategy resets
// them all on; the last enabled criterion cannot be switched off (the button
// disables), so the weight set can never go empty from the UI.
const enabled = reactive(Object.fromEntries(decideCriteria.map((c) => [c.key, true])))
const enabledCount = computed(() => decideCriteria.filter((c) => enabled[c.key]).length)
function toggleCriterion(key) {
  if (enabled[key] && enabledCount.value === 1) return
  enabled[key] = !enabled[key]
}
function resetToggles() {
  decideCriteria.forEach((c) => (enabled[c.key] = true))
}
watch(activeStrategyId, resetToggles)

// Effective weight per criterion: the preset value while the toggle is on,
// 0 while it is off. The score renormalises over these inside useAreaRanking.
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
  includeStretch: true,
}))

const rankedLocations = useAreaRanking(areaCorridors, areaFilters, effectiveWeights)

// Local GeoJSON for the map. Static geometry; colours are applied live.
const mapFeatures = {
  catchments: catchmentFeatures,
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
