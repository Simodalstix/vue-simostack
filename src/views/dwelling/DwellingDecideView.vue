<template>
  <div class="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 space-y-8">
    <!-- THE WORKSPACE: map and suburb decision pane as equal stars.
         Left ~60%: intro, Melbourne lens map, purchase mode, weights.
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
            Pick the purchase you are testing, set your weights, then read the map against the pane
            beside it. Hover a suburb to preview it; click a suburb to open its full card over the
            map. Location data is placeholder until verified.
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
          :mode="activeMode"
          @hover="hoveredContext = $event"
          @toggle-shortlist="toggleShortlist"
        />
      </div>

      <!-- LEFT column, lower: purchase mode + weights (after the pane on mobile) -->
      <div class="space-y-5 min-w-0 order-3 lg:order-none lg:col-start-1 lg:row-start-2">
        <!-- purchase mode: WHAT is being tested. Changes the proposition (stock,
             bedrooms, price cap) through the ranking gates; never the weights. -->
        <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4">
          <div class="flex items-baseline justify-between flex-wrap gap-2 mb-2.5">
            <h3 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
              Purchase mode · the proposition being tested
            </h3>
            <span class="font-mono text-[10.5px] text-ob-faint">
              weights below stay yours; this changes the purchase, not the priorities
            </span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
            <button
              v-for="m in purchaseModes"
              :key="m.id"
              @click="activeModeId = m.id"
              class="text-left rounded-[6px] border px-3 py-2 transition-colors"
              :class="
                activeModeId === m.id
                  ? 'border-ob-teal/45 bg-ob-teal/8'
                  : 'border-ob-sand/14 hover:border-ob-sand/25'
              "
            >
              <span
                class="block text-[12px] font-semibold leading-snug"
                :class="activeModeId === m.id ? 'text-ob-teal' : 'text-ob-text'"
                >{{ m.label }}</span
              >
              <span class="block mt-0.5 font-mono text-[10px] text-ob-faint leading-snug">{{
                m.dwelling
              }}</span>
            </button>
          </div>
          <div class="mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p class="text-[12px] leading-snug text-ob-dim flex-1 min-w-[220px]">
              {{ activeMode.blurb }}
            </p>
            <button
              v-if="modeStrategy"
              @click="focusModeStrategy"
              class="font-mono text-[10.5px] text-ob-faint hover:text-ob-teal transition-colors"
            >
              full strategy card: {{ modeStrategy.name }} ↓
            </button>
          </div>
        </div>

        <!-- criteria weights: compact two-column panel under the map -->
        <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4">
          <div class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-2">
            <h3 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
              Criteria weights · your priorities
            </h3>
            <div class="flex items-center gap-2 ml-auto">
              <span class="font-mono text-[10.5px] text-ob-faint">payoff</span>
              <div class="inline-flex rounded-[6px] border border-ob-sand/14 overflow-hidden">
                <button
                  v-for="y in [10, 15, 20]"
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
                @click="weightsOpen = !weightsOpen"
                class="font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
              >
                {{ weightsOpen ? 'hide' : 'adjust' }}
              </button>
              <button
                @click="resetWeights"
                class="font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
              >
                reset
              </button>
            </div>
          </div>
          <p class="text-[11.5px] leading-snug text-ob-dim mb-3">
            Importance, not direction — everything is already scored so higher is better for you.
            <span class="font-mono text-ob-faint">0 = ignore · 10 = critical.</span>
            The two marked <span class="text-ob-teal">◆ map</span> also recolour the lens.
          </p>
          <div v-show="weightsOpen" class="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            <div v-for="c in criteriaState" :key="c.key">
              <div class="flex items-baseline justify-between gap-2">
                <label :for="'dw-' + c.key" class="text-[12px] text-ob-text"
                  >{{ c.label
                  }}<span
                    v-if="lensChildhoodKeys.includes(c.key)"
                    class="ml-1.5 font-mono text-[10px] text-ob-teal"
                    title="Also recolours the Melbourne lens map"
                    >◆ map</span
                  ></label
                >
                <span class="font-mono text-[12px] text-ob-sand shrink-0">{{ c.weight }}</span>
              </div>
              <input
                :id="'dw-' + c.key"
                type="range"
                min="0"
                max="10"
                step="1"
                v-model.number="c.weight"
                class="w-full accent-[#3DB8A0] h-[4px] mt-1"
              />
              <p class="mt-0.5 font-mono text-[10px] text-ob-faint leading-snug">{{ c.hint }}</p>
            </div>
          </div>
          <p v-show="!weightsOpen" class="font-mono text-[11px] text-ob-faint leading-relaxed">
            Use "adjust" to tune the ranking. Weights drive both the suburb pane and the strategy
            ranking below.
          </p>
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
        :mode="activeMode"
        class="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 min-w-0"
        @toggle-shortlist="toggleShortlist"
      />
    </div>

    <!-- live expected cost for the focused strategy at the pinned suburb -->
    <ExpectedCostStrip
      :strategy="focusedStrategyObj"
      :location="activeLocation"
      :payoff-years="payoffYears"
      :deposit="deposit"
      :rate="rate"
    />

    <!-- full strategy cards: the detailed explanations behind the purchase
         modes. The active mode's strategy is focused automatically. -->
    <div ref="strategySection">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mr-auto">
          Strategy cards · full detail
        </h2>
        <button
          v-for="(meta, key) in verdictMeta"
          :key="key"
          @click="verdictFilter = verdictFilter === key ? null : key"
          class="font-mono text-[11px] px-2.5 py-[4px] rounded-full border transition-colors"
          :class="
            verdictFilter === key
              ? 'border-ob-teal/45 text-ob-teal'
              : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
          "
        >
          {{ meta.label }}
        </button>
      </div>
      <StrategyRankList
        v-model="focusedStrategyId"
        :ranked="displayedStrategies"
        :location-label="activeLocation ? activeLocation.suburb : null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { criteria, lensChildhoodKeys } from '@/data/dwelling/framework.js'
import { strategies, verdictMeta } from '@/data/dwelling/strategies.js'
import { areaCorridors } from '@/data/dwelling/areaCorridors.js'
import { purchaseModes, defaultModeId, modeById } from '@/data/dwelling/purchaseModes.js'
import {
  catchmentFeatures,
  stationPointFeatures,
  areaBounds,
  areaIndexById,
} from '@/data/dwelling/areaGeoFeatures.js'
import { localityFeatures } from '@/data/dwelling/localityFeatures.js'
import { personalPosition } from '@/data/dwelling/facts.js'
import { useAreaRanking } from '@/composables/useAreaRanking.js'
import { useStrategyRanking } from '@/composables/useStrategyRanking.js'
import { commuteFor, scoreCommute } from '@/composables/useCommuteScoring.js'
import MapPanel from '@/components/dwelling/MapPanel.vue'
import SuburbDecisionPane from '@/components/dwelling/SuburbDecisionPane.vue'
import ExpectedCostStrip from '@/components/dwelling/ExpectedCostStrip.vue'
import StrategyRankList from '@/components/dwelling/StrategyRankList.vue'

const criteriaState = reactive(criteria.map((c) => ({ ...c })))
const payoffYears = ref(15)
const weightsOpen = ref(true)
const verdictFilter = ref(null)
const activeLocationId = ref(null)
const focusedStrategyId = ref(null)
const hoveredContext = ref(null)
const strategySection = ref(null)

const deposit = personalPosition.calc.deposit
const rate = personalPosition.calc.rate

// Purchase mode: the proposition under test. It expresses itself ONLY through
// the ranking filter gates (stock, bedrooms, price cap) so suburb viability
// changes stay explainable; it never touches the criteria weights.
const activeModeId = ref(defaultModeId)
const activeMode = computed(() => modeById(activeModeId.value))
const modeStrategy = computed(
  () => strategies.find((s) => s.id === activeMode.value.strategyId) || null,
)

// Loose limits beyond the mode's own: the lens is for tuning, not hard
// filtering. Intrinsic gates (over 65 min, >1 transfer, no second bedroom)
// still apply inside useAreaRanking.
const areaFilters = computed(() => ({
  maxPrice: activeMode.value.filters.maxPrice,
  maxCommute: 90,
  maxStationWalk: 20,
  minBedrooms: activeMode.value.filters.minBedrooms,
  dwellingTypes: activeMode.value.filters.dwellingTypes,
  includeStretch: true,
}))

// The lens criteria (school strength, teen independence) score PLACES, so their
// live weights flow into the suburb ranking, not the strategy ranking.
const childhoodWeights = computed(() =>
  criteriaState
    .filter((c) => lensChildhoodKeys.includes(c.key))
    .map((c) => ({ key: c.key, weight: c.weight })),
)
const rankedLocations = useAreaRanking(areaCorridors, areaFilters, childhoodWeights)

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

const activeLocation = computed(() =>
  activeLocationId.value == null
    ? null
    : areaCorridors.find((r) => r.id === activeLocationId.value) || null,
)

// commute score for the active suburb to the 555 Collins St anchor; drives
// the location override in the strategy ranking.
const commuteOverride = computed(() => {
  if (!activeLocation.value) return null
  const c = commuteFor(activeLocation.value)
  return c ? scoreCommute(c.typical, c.transfers) : null
})

const rankedStrategies = useStrategyRanking(strategies, criteriaState, commuteOverride)
const displayedStrategies = computed(() =>
  verdictFilter.value
    ? rankedStrategies.value.filter((r) => r.strategy.verdict === verdictFilter.value)
    : rankedStrategies.value,
)

const focusedStrategyObj = computed(() => {
  const list = displayedStrategies.value
  const hit = list.find((r) => r.strategy.id === focusedStrategyId.value)
  return (hit || list[0])?.strategy || null
})

// Selecting a purchase mode focuses its strategy in the cost strip and cards.
watch(
  activeMode,
  (m) => {
    if (m?.strategyId) focusedStrategyId.value = m.strategyId
  },
  { immediate: true },
)

// keep focus valid and defaulted to the top of the current list
watch(displayedStrategies, (list) => {
  if (!list.length) return
  if (!list.some((r) => r.strategy.id === focusedStrategyId.value)) {
    focusedStrategyId.value = list[0].strategy.id
  }
})

function focusModeStrategy() {
  if (modeStrategy.value) focusedStrategyId.value = modeStrategy.value.id
  strategySection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function resetWeights() {
  criteriaState.forEach((c, i) => (c.weight = criteria[i].weight))
}
</script>
