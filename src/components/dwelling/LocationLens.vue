<template>
  <section>
    <div class="flex items-baseline justify-between mb-3 flex-wrap gap-x-4 gap-y-1">
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
        Location lens · tunes the ranking below
      </h2>
      <span class="font-mono text-[11px] text-ob-faint"
        >{{ DESTINATION.label }} · {{ DESTINATION.dest }}</span
      >
    </div>

    <!-- corridor chips, grouped by region -->
    <div class="space-y-2">
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

const props = defineProps({
  locations: { type: Array, required: true },
})

const active = defineModel({ default: null })
const showDetail = ref(false)

const scoredLocations = computed(() => props.locations.filter((l) => l.status !== 'unscored'))

const REGION_ORDER = [
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
</script>
