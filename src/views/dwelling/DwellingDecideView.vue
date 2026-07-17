<template>
  <div class="max-w-[1680px] mx-auto px-6 lg:px-10 py-10 space-y-8">
    <!-- THE WORKSPACE: map and suburb decision tools as equal stars.
         Left: intro, strategy selector and Melbourne map. Right: a slightly
         narrower ranked pane with its weighting controls kept alongside it.
         The weighting rail stacks below the pane when the available width is
         too tight for both to remain readable. -->
    <div
      class="grid lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[minmax(0,1.35fr)_minmax(570px,1fr)] gap-6 items-start"
    >
      <!-- LEFT column: intro + map -->
      <div class="space-y-5 min-w-0 lg:col-start-1 lg:row-start-1">
        <div class="space-y-4">
          <div class="max-w-3xl">
            <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-2">
              Decide
            </p>
            <h1 class="text-[24px] md:text-[30px] font-extrabold leading-tight">
              One place to weigh it all:
              <span class="text-ob-teal">strategy, location and cost.</span>
            </h1>
          </div>
          <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4">
            <div class="flex items-baseline justify-between flex-wrap gap-2 mb-2.5">
              <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
                Strategy · preset weights + the purchase being tested
              </h2>
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

      <!-- RIGHT column: ranked suburbs with a live weighting rail. -->
      <div
        class="order-2 min-w-0 lg:col-start-2 lg:row-start-1 grid gap-4 xl:grid-cols-[minmax(0,1fr)_184px] xl:items-start"
      >
        <SuburbDecisionPane
          v-model="activeLocationId"
          :rows="rankedLocations"
          :hovered-context="hoveredContext"
          :shortlist-ids="shortlist"
          :payoff-years="payoffYears"
          :deposit="deposit"
          :rate="rate"
          :strategy="activeStrategy"
          class="min-w-0"
          @toggle-shortlist="toggleShortlist"
        />

        <!-- Standard criteria renormalise over what remains; Beach is an
             additive premium whose toggle simply adds or removes it. -->
        <aside
          class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-3 min-w-0 xl:sticky xl:top-6"
          aria-label="Ranking weightings"
        >
          <div class="flex items-start justify-between gap-2 xl:block">
            <div class="min-w-0">
              <h3 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
                Weightings
              </h3>
              <p class="mt-1 text-[11px] font-semibold leading-snug text-ob-text">
                {{ activeStrategy.label }} preset
              </p>
              <p class="mt-0.5 font-mono text-[10px] text-ob-faint">Toggle to re-rank</p>
            </div>
            <button
              @click="resetToggles"
              class="font-mono text-[10.5px] text-ob-faint hover:text-ob-teal transition-colors shrink-0 xl:mt-2"
            >
              reset
            </button>
          </div>

          <div class="mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-1 gap-2">
            <button
              v-for="c in decideCriteria"
              :key="c.key"
              @click="toggleCriterion(c.key)"
              :disabled="enabled[c.key] && enabledCount === 1"
              :aria-pressed="enabled[c.key]"
              :title="c.hint"
              class="w-full flex items-center justify-between gap-2 font-mono text-[11px] px-2.5 py-[6px] rounded-[6px] border transition-colors disabled:cursor-not-allowed"
              :class="
                enabled[c.key]
                  ? 'border-ob-teal/45 text-ob-teal bg-ob-teal/8'
                  : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted line-through'
              "
            >
              <span class="truncate">{{ c.label }}</span>
              <span class="shrink-0"
                >×{{ enabled[c.key] ? activeStrategy.weights[c.key] : 0 }}</span
              >
            </button>
          </div>

          <div class="mt-3 pt-3 border-t border-ob-sand/8">
            <span
              class="block mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ob-faint"
            >
              payoff
            </span>
            <div class="grid grid-cols-3 rounded-[6px] border border-ob-sand/14 overflow-hidden">
              <button
                v-for="y in [15, 20, 30]"
                :key="y"
                @click="payoffYears = y"
                class="px-1.5 py-[5px] font-mono text-[10.5px] transition-colors border-r border-ob-sand/14 last:border-r-0"
                :class="
                  payoffYears === y
                    ? 'bg-ob-teal/15 text-ob-teal'
                    : 'text-ob-faint hover:text-ob-muted'
                "
              >
                {{ y }}yr
              </button>
            </div>
          </div>
        </aside>
      </div>
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
import { stationPointFeatures, areaBounds, areaIndexById } from '@/data/dwelling/areaGeoFeatures.js'
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

// The strategy is the single mode: a weight preset over the seven criteria plus
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
