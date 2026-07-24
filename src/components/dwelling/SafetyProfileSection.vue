<template>
  <section
    class="rounded-[6px] border border-ob-sand/10 bg-ob-surface2"
    :class="compact ? 'px-3 py-2.5' : 'px-4 py-3.5'"
  >
    <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-mono">
      <h3 class="text-[10.5px] uppercase tracking-[0.08em] text-ob-soft">Safety</h3>
      <template v-if="safety">
        <span class="text-[11px] font-semibold uppercase tracking-[0.06em]" :class="bandClass">{{
          bandLabel
        }}</span>
        <span class="text-[10px] text-ob-faint">
          {{ ordinal(safety.rank) }} · {{ suburbsBetter }} suburbs better in cohort
        </span>
      </template>
    </div>

    <template v-if="safety">
      <div class="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span class="font-mono leading-none" :class="compact ? 'text-[17px]' : 'text-[20px]'"
          >{{ safety.score.toFixed(1) }}/10</span
        >
        <span class="text-[10.5px] text-ob-faint">· 10 = lower risk</span>
      </div>
      <div
        class="mt-2.5 grid grid-cols-2"
        :class="compact ? 'gap-x-3 gap-y-1' : 'gap-x-5 gap-y-1.5'"
      >
        <div v-for="basket in safetyContext.baskets" :key="basket.key" class="min-w-0">
          <p :class="compact ? 'text-[10.5px] leading-snug' : 'text-[11.5px] leading-relaxed'">
            <span class="text-ob-soft">{{ basket.label }}</span>
            <span :class="riskClass(safety.baskets[basket.key]?.riskPercentile)">
              · {{ riskLabel(safety.baskets[basket.key]?.riskPercentile) }}
            </span>
          </p>
        </div>
      </div>
      <details v-if="!compact" class="mt-3 border-t border-ob-sand/10 pt-2">
        <summary class="cursor-pointer font-mono text-[10px] text-ob-faint hover:text-ob-teal">
          CSA method &amp; limits
        </summary>
        <p class="mt-1.5 text-[10.5px] leading-relaxed text-ob-faint">
          {{ safetyContext.source.referencePeriod }} · population-adjusted, smoothed comparison of
          recorded offences. Busy centres, hospitals, nightlife and transport hubs can affect rates.
        </p>
        <a
          :href="safetyContext.source.datasetUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-1 inline-block font-mono text-[10px] text-ob-dim hover:text-ob-teal"
          >Crime Statistics Agency source ↗</a
        >
      </details>
    </template>
    <p
      v-else
      :class="
        compact
          ? 'mt-1.5 text-[11px] italic text-ob-faint'
          : 'mt-2 text-[12px] italic text-ob-faint'
      "
    >
      Safety data is not yet available for this recently added record.
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { safetyContext, safetyFor } from '@/data/dwelling/safety/safetyContext.js'

const props = defineProps({
  areaId: { type: String, required: true },
  compact: { type: Boolean, default: false },
})
const safety = computed(() => safetyFor(props.areaId))
const bandLabel = computed(() => {
  const score = safety.value?.score
  if (score == null) return null
  if (score >= 7) return 'Good'
  if (score >= 4) return 'Moderate'
  return 'Bad'
})
const bandClass = computed(() => {
  if (bandLabel.value === 'Good') return 'text-ob-teal'
  if (bandLabel.value === 'Moderate') return 'text-amber-300'
  return 'text-red-300'
})
const suburbsBetter = computed(() => {
  if (!safety.value) return 0
  return Math.max(0, safety.value.cohortSize - safety.value.rank)
})

function ordinal(rank) {
  const mod100 = rank % 100
  if (mod100 >= 11 && mod100 <= 13) return `${rank}th`
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[rank % 10] || 'th'
  return `${rank}${suffix}`
}

function riskLabel(percentile) {
  if (percentile == null) return 'not assessed'
  if (percentile <= 1 / 3) return 'lower'
  if (percentile <= 2 / 3) return 'mid-range'
  return 'higher'
}

function riskClass(percentile) {
  if (percentile == null) return 'text-ob-faint'
  if (percentile <= 1 / 3) return 'text-ob-teal'
  if (percentile <= 2 / 3) return 'text-amber-300'
  return 'text-red-300'
}
</script>
