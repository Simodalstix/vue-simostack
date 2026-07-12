<template>
  <div class="max-w-[1500px] mx-auto px-6 lg:px-10 py-10 space-y-8">
    <!-- title -->
    <div class="max-w-3xl">
      <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-2">Decide</p>
      <h1 class="text-[24px] md:text-[30px] font-extrabold leading-tight">
        One place to weigh it all: <span class="text-ob-teal">strategy, location and cost.</span>
      </h1>
      <p class="mt-3 text-[13.5px] leading-relaxed text-ob-muted">
        Set your weights, pick a location to tune the ranking, and watch the relative rank and
        expected cost move as you tinker. Location data is placeholder until verified.
      </p>
    </div>

    <!-- controls -->
    <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-5 space-y-5">
      <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
        <!-- fixed commute anchor -->
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-1.5">
            Destination
          </p>
          <p class="font-mono text-[12px] text-ob-dim">555 Collins St · Southern Cross end</p>
        </div>

        <!-- payoff horizon -->
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-1.5">
            Payoff horizon
          </p>
          <div class="inline-flex rounded-[6px] border border-ob-sand/14 overflow-hidden">
            <button
              v-for="y in [10, 15, 20]"
              :key="y"
              @click="payoffYears = y"
              class="px-3 py-[6px] font-mono text-[12px] transition-colors border-r border-ob-sand/14 last:border-r-0"
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

        <button
          @click="weightsOpen = !weightsOpen"
          class="font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
        >
          {{ weightsOpen ? 'hide weights' : 'adjust weights' }}
        </button>
        <button
          @click="resetWeights"
          class="font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
        >
          reset weights
        </button>

        <!-- verdict filter -->
        <div class="ml-auto flex flex-wrap items-center gap-2">
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
      </div>
    </div>

    <!-- location lens (2/3) + criteria weights (1/3), stacking on <lg -->
    <div class="grid lg:grid-cols-3 gap-6 items-start">
      <LocationLens
        class="lg:col-span-2"
        v-model="activeLocationId"
        :locations="rankedLocations"
        :payoff-years="payoffYears"
        :deposit="deposit"
        :rate="rate"
      />

      <!-- criteria weights: compact panel, live-updates strategy ranking -->
      <div class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-4">
        <h3 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-2">
          Criteria weights
        </h3>
        <p class="text-[11.5px] leading-snug text-ob-dim mb-4">
          Importance, not direction — everything is already scored so higher is better for you.
          <span class="font-mono text-ob-faint">0 = ignore · 10 = critical.</span>
        </p>
        <div v-show="weightsOpen" class="space-y-4">
          <div v-for="(c, i) in criteriaState" :key="c.key">
            <div class="flex items-baseline justify-between gap-2">
              <label :for="'dw-' + c.key" class="text-[12px] text-ob-text">{{ c.label }}</label>
              <span class="font-mono text-[12px] text-ob-sand shrink-0">{{ c.weight }}</span>
            </div>
            <input
              :id="'dw-' + c.key"
              type="range"
              min="0"
              max="10"
              step="1"
              v-model.number="c.weight"
              class="w-full accent-[#3DB8A0] h-[4px] mt-1.5"
            />
            <div
              v-if="i === 0"
              class="flex justify-between font-mono text-[10px] text-ob-faint mt-0.5"
            >
              <span>ignore</span><span>critical</span>
            </div>
            <p class="mt-1 font-mono text-[10.5px] text-ob-faint leading-snug">{{ c.hint }}</p>
          </div>
        </div>
        <p v-show="!weightsOpen" class="font-mono text-[11px] text-ob-faint leading-relaxed">
          Use "adjust weights" above to tune the strategy ranking.
        </p>
      </div>
    </div>

    <!-- live expected cost -->
    <ExpectedCostStrip
      :strategy="focusedStrategyObj"
      :location="activeLocation"
      :payoff-years="payoffYears"
      :deposit="deposit"
      :rate="rate"
    />

    <!-- relative rank -->
    <StrategyRankList
      v-model="focusedStrategyId"
      :ranked="displayedStrategies"
      :location-label="activeLocation ? activeLocation.suburb : null"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { criteria, lensChildhoodKeys } from '@/data/dwelling/framework.js'
import { strategies, verdictMeta } from '@/data/dwelling/strategies.js'
import { areaCorridors } from '@/data/dwelling/areaCorridors.js'
import { personalPosition } from '@/data/dwelling/facts.js'
import { useAreaRanking } from '@/composables/useAreaRanking.js'
import { useStrategyRanking } from '@/composables/useStrategyRanking.js'
import { commuteFor, scoreCommute } from '@/composables/useCommuteScoring.js'
import LocationLens from '@/components/dwelling/LocationLens.vue'
import ExpectedCostStrip from '@/components/dwelling/ExpectedCostStrip.vue'
import StrategyRankList from '@/components/dwelling/StrategyRankList.vue'

const criteriaState = reactive(criteria.map((c) => ({ ...c })))
const payoffYears = ref(15)
const weightsOpen = ref(true)
const verdictFilter = ref(null)
const activeLocationId = ref(null)
const focusedStrategyId = ref(null)

const deposit = personalPosition.calc.deposit
const rate = personalPosition.calc.rate

// Loose filters: the lens is for tuning, not hard filtering. Intrinsic gates
// (over 65 min, >1 transfer, no second bedroom) still apply inside useAreaRanking.
const areaFilters = ref({
  maxPrice: 900000,
  maxCommute: 90,
  maxStationWalk: 20,
  minBedrooms: 2,
  carPref: 'either',
  dwellingTypes: [],
  includeStretch: true,
})
// The lens criteria (school strength, teen independence) score PLACES, so their
// live weights flow into the suburb ranking, not the strategy ranking.
const childhoodWeights = computed(() =>
  criteriaState
    .filter((c) => lensChildhoodKeys.includes(c.key))
    .map((c) => ({ key: c.key, weight: c.weight })),
)
const rankedLocations = useAreaRanking(areaCorridors, areaFilters, childhoodWeights)

const activeLocation = computed(() =>
  activeLocationId.value == null
    ? null
    : areaCorridors.find((r) => r.id === activeLocationId.value) || null,
)

// commute score for the active corridor to the 555 Collins St anchor; drives
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

// keep focus valid and defaulted to the top of the current list
watch(
  displayedStrategies,
  (list) => {
    if (!list.length) return
    if (!list.some((r) => r.strategy.id === focusedStrategyId.value)) {
      focusedStrategyId.value = list[0].strategy.id
    }
  },
  { immediate: true },
)

function resetWeights() {
  criteriaState.forEach((c, i) => (c.weight = criteria[i].weight))
}
</script>
