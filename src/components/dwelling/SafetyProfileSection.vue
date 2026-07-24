<template>
  <section
    class="rounded-[6px] border border-ob-sand/10 bg-ob-surface2"
    :class="compact ? 'px-3 py-2.5' : 'px-4 py-3.5'"
  >
    <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h3 class="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ob-soft">Safety</h3>
      <span v-if="safety" class="font-mono text-[10px] text-ob-faint">
        {{ safety.rank }}/{{ safety.cohortSize }} · relative cohort rank
      </span>
    </div>

    <template v-if="safety">
      <div class="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          :class="
            compact
              ? 'font-mono text-[17px] leading-none text-ob-teal'
              : 'font-mono text-[21px] leading-none text-ob-teal'
          "
          >{{ safety.score.toFixed(1) }}/10</span
        >
        <span class="text-[11.5px] text-ob-muted2">{{ band }}</span>
      </div>
      <p :class="compact ? 'mt-1.5 text-[11px] text-ob-muted2' : 'mt-2 text-[12px] text-ob-muted2'">
        10 = lower recorded-offence risk.
      </p>
      <div :class="compact ? 'mt-2 space-y-1' : 'mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5'">
        <div v-for="basket in safetyContext.baskets" :key="basket.key" class="min-w-0">
          <p :class="compact ? 'text-[11px] leading-snug' : 'text-[12px] leading-relaxed'">
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
import { safetyContext, safetyFor, safetyBandFor } from '@/data/dwelling/safety/safetyContext.js'

const props = defineProps({
  areaId: { type: String, required: true },
  compact: { type: Boolean, default: false },
})
const safety = computed(() => safetyFor(props.areaId))
const band = computed(() => safetyBandFor(props.areaId))

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
