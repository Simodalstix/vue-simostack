<template>
  <div
    class="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-10 py-5 sm:py-8 lg:py-10 space-y-5 lg:space-y-8"
  >
    <!-- THE WORKSPACE: map and suburb decision pane as equal stars. Themed
         weighting rows lead the compact control card above the map; the two
         product strategies sit beneath them as a quieter one-line selector. -->
    <div
      class="grid lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[minmax(0,1.35fr)_minmax(570px,1fr)] gap-6 items-start"
    >
      <!-- LEFT column: intro + map -->
      <div class="space-y-4 lg:space-y-5 min-w-0 lg:col-start-1 lg:row-start-1">
        <div class="space-y-3 sm:space-y-4">
          <div class="max-w-none">
            <h1 class="text-[22px] sm:text-[24px] md:text-[30px] font-extrabold leading-tight">
              A place to settle down:
              <span class="text-ob-teal">comparing Melbourne suburbs.</span>
            </h1>
          </div>

          <!-- Phone controls expose the same two source-backed products as
               desktop: all-unit apartments and all-house properties. -->
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
              <button
                type="button"
                @click="soulEnabled = !soulEnabled"
                :aria-pressed="soulEnabled"
                :title="SOUL_GATE.hint"
                class="rounded-[6px] border px-2.5 py-2 font-mono text-[10.5px] transition-colors"
                :class="
                  soulEnabled
                    ? 'border-blue-500/45 bg-blue-500/10 text-blue-300'
                    : 'border-ob-sand/14 text-ob-faint line-through'
                "
              >
                Soul
              </button>
            </div>
            <p class="mt-1.5 font-mono text-[9px] leading-snug text-ob-faint">
              {{ activeStrategy.intent }} · preset weights
            </p>
          </div>

          <div
            class="hidden md:grid grid-cols-[minmax(0,1fr)_132px] gap-3 bg-ob-surface2 border border-ob-sand/8 rounded-[8px] p-3.5"
            aria-label="Ranking controls"
          >
            <div class="min-w-0">
              <div class="flex items-center flex-wrap gap-x-4 gap-y-2">
                <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
                  Weightings · {{ activeStrategy.label }} preset
                </h2>

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

              <div class="mt-2.5 flex flex-wrap gap-1.5" aria-label="Weighting themes">
                <button
                  v-for="c in allCriteria"
                  :key="c.key"
                  @click="toggleControl(c)"
                  :disabled="c.scoringRole !== 'gate' && enabled[c.key] && enabledCount === 1"
                  :aria-pressed="controlEnabled(c)"
                  :title="c.hint"
                  class="inline-flex items-center justify-between gap-2 font-mono text-[11px] px-2 py-[5px] rounded-[6px] border transition-colors disabled:cursor-not-allowed"
                  :class="criterionButtonClass(c)"
                >
                  <span>{{ c.label }}</span>
                </button>
              </div>
            </div>

            <div class="grid grid-rows-2 gap-1.5" aria-label="Ranking product">
              <button
                v-for="s in decideStrategies"
                :key="s.id"
                @click="activeStrategyId = s.id"
                :aria-pressed="activeStrategyId === s.id"
                :title="`${s.dwelling} · ${s.intent}`"
                class="min-w-0 rounded-[5px] border px-2 py-[5px] font-mono text-[10px] transition-colors"
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

        <MapPanel
          v-if="showDesktopMap"
          v-model="activeLocationId"
          :rows="rankedLocations"
          :features="mapFeatures"
          :index-by-id="areaIndexById"
          :payoff-years="payoffYears"
          :deposit="deposit"
          :rate="rate"
          :strategy="activeStrategy"
          :weights="effectiveWeights"
          :list-hovered-id="listHoverId"
          @hover="hoveredContext = $event"
        />
      </div>

      <!-- RIGHT column: the authoritative ranked suburb pane. -->
      <SuburbDecisionPane
        v-model="activeLocationId"
        :rows="rankedLocations"
        :hovered-context="hoveredContext"
        :payoff-years="payoffYears"
        :deposit="deposit"
        :rate="rate"
        :strategy="activeStrategy"
        :weights="effectiveWeights"
        class="order-2 min-w-0 lg:col-start-2 lg:row-start-1"
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
  decideCriterionByKey,
  defaultStrategyId,
  strategyById,
} from '@/data/dwelling/decideStrategies.js'
import { areaCorridors } from '@/data/dwelling/areaCorridors.js'
import { stationPointFeatures, areaBounds, areaIndexById } from '@/data/dwelling/areaGeoFeatures.js'
import { localityFeatures } from '@/data/dwelling/localityFeatures.js'
import { personalPosition } from '@/data/dwelling/facts.js'
import { useAreaRanking } from '@/composables/useAreaRanking.js'
import { SOUL_GATE } from '@/data/dwelling/ownerVetoes.js'
import MapPanel from '@/components/dwelling/MapPanel.vue'
import SuburbDecisionPane from '@/components/dwelling/SuburbDecisionPane.vue'

const payoffYears = ref(30)
const activeLocationId = ref(null)
const hoveredContext = ref(null)
// Suburb hovered in the ranked list; routed into the map's hover highlight.
const listHoverId = ref(null)

const deposit = personalPosition.calc.deposit
const rate = personalPosition.calc.rate

// The strategy selects one of the two source-backed product medians and its
// corresponding preset weights. There are no bedroom, price or type gates.
const activeStrategyId = ref(defaultStrategyId)
const activeStrategy = computed(() => strategyById(activeStrategyId.value))
const mobileStrategies = decideStrategies
const allCriteria = [
  'cost',
  'commute',
  'soul',
  'schools',
  'kidAmenity',
  'beach',
  'personalNetwork',
  'partnerPool',
  'chineseCommunity',
  'otherCommunities',
].map((key) => (key === SOUL_GATE.key ? SOUL_GATE : decideCriterionByKey[key]))

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
// each criterion's default (community lenses stay off); the last enabled criterion
// cannot be switched off, so the weight set can never go empty from the UI.
const enabled = reactive(
  Object.fromEntries(decideCriteria.map((c) => [c.key, c.defaultEnabled !== false])),
)
const soulEnabled = ref(SOUL_GATE.defaultEnabled)
const enabledCount = computed(() => decideCriteria.filter((c) => enabled[c.key]).length)
function toggleCriterion(key) {
  if (enabled[key] && enabledCount.value === 1) return
  enabled[key] = !enabled[key]
}
function toggleControl(control) {
  if (control.scoringRole === 'gate') soulEnabled.value = !soulEnabled.value
  else toggleCriterion(control.key)
}
function controlEnabled(control) {
  return control.scoringRole === 'gate' ? soulEnabled.value : enabled[control.key]
}
function criterionButtonClass(criterion) {
  if (!controlEnabled(criterion))
    return 'border-ob-sand/14 text-ob-faint hover:text-ob-muted line-through'
  if (criterion.accent === 'amber') return 'border-amber-500/45 text-amber-300 bg-amber-500/10'
  if (criterion.accent === 'blue') return 'border-blue-500/45 text-blue-300 bg-blue-500/10'
  if (criterion.accent === 'purple') return 'border-purple-500/45 text-purple-300 bg-purple-500/10'
  if (criterion.accent === 'red') return 'border-red-500/45 text-red-300 bg-red-500/10'
  if (criterion.accent === 'pink') return 'border-pink-500/45 text-pink-300 bg-pink-500/10'
  return 'border-ob-teal/45 text-ob-teal bg-ob-teal/8'
}
function resetToggles() {
  decideCriteria.forEach((c) => (enabled[c.key] = c.defaultEnabled !== false))
  soulEnabled.value = SOUL_GATE.defaultEnabled
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

// No price/commute/dwelling-type reject gates any more (July 2026): every
// scored record is coloured by its weighted score. `strategy` selects the
// weighting lens and which VGV median Cost reads; `soulEnabled` is the one
// remaining gate, the owner's explicit veto.
const areaFilters = computed(() => ({
  strategy: activeStrategy.value,
  includeStretch: true,
  soulEnabled: soulEnabled.value,
}))

const rankedLocations = useAreaRanking(areaCorridors, areaFilters, effectiveWeights)

// Local GeoJSON for the map. Static geometry; colours are applied live.
const mapFeatures = {
  points: stationPointFeatures,
  localities: localityFeatures,
  bounds: areaBounds,
}

// Deep-link the active suburb via ?area=. Read once on mount, then mirror
// changes into the query. We only clear an id that matches no record at all.
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
  router.replace({ query: next, hash: route.hash })
})
</script>
