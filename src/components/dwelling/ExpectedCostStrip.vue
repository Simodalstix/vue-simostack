<template>
  <div class="bg-ob-surface2 border border-ob-teal/25 rounded-[8px] p-5">
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-ob-sand">Expected cost</p>
      <p v-if="strategy" class="font-mono text-[11px] text-ob-dim">
        {{ strategy.name }} <span class="text-ob-faint">@</span>
        {{ location ? location.suburb : 'generic (no location)' }}
      </p>
    </div>

    <p v-if="!strategy" class="text-[13px] text-ob-muted">
      Select a strategy to see expected cost.
    </p>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1">
          Monthly @ {{ payoffYears }}yr
        </p>
        <p class="font-mono text-[22px] font-bold text-ob-teal leading-none">${{ fmt(monthly) }}</p>
        <p v-if="location" class="mt-1 font-mono text-[11px]" :class="deltaClass">
          {{ deltaLabel }}
        </p>
      </div>
      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1">
          Price band
        </p>
        <p class="font-mono text-[14px] text-ob-text">{{ priceBandLabel }}</p>
        <p class="mt-1 font-mono text-[11px] text-ob-dim">loan ~${{ fmt(loan) }}</p>
      </div>
      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1">
          Owners-corp
        </p>
        <p class="font-mono text-[14px] text-ob-text">{{ ocLabel }}</p>
        <p v-if="location" class="mt-1 font-mono text-[11px] text-ob-dim">
          ~${{ fmt(Math.round(ocMidMonthly)) }}/mo folded in
        </p>
      </div>
      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1">
          Transport
        </p>
        <p class="font-mono text-[13px] text-ob-text leading-snug">{{ transportLabel }}</p>
      </div>
    </div>

    <p v-if="strategy" class="mt-4 font-mono text-[11px] text-ob-faint leading-relaxed">
      All-in housing ~${{ fmt(allInMonthly) }}/mo (repayment + owners-corp) on a ~${{
        fmt(deposit)
      }}
      deposit at {{ rate.toFixed(2) }}%. Indicative, placeholder location data, stress-test at +2%.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { monthlyPayment } from '@/composables/useRepayment.js'

const props = defineProps({
  strategy: { type: Object, default: null },
  location: { type: Object, default: null },
  payoffYears: { type: Number, default: 12 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
})

function fmt(n) {
  return Math.round(n).toLocaleString('en-AU')
}

const priceBand = computed(() => {
  if (!props.strategy) return null
  if (props.location?.dwelling?.indicativePrice) return props.location.dwelling.indicativePrice
  return [props.strategy.cost.low * 1000, props.strategy.cost.high * 1000]
})
const priceMid = computed(() =>
  priceBand.value ? (priceBand.value[0] + priceBand.value[1]) / 2 : 0,
)
const priceBandLabel = computed(() =>
  priceBand.value
    ? '$' +
      Math.round(priceBand.value[0] / 1000) +
      'k–$' +
      Math.round(priceBand.value[1] / 1000) +
      'k'
    : '',
)
const loan = computed(() => Math.max(0, priceMid.value - props.deposit))
const monthly = computed(() =>
  Math.round(monthlyPayment(loan.value, props.rate, props.payoffYears)),
)

// generic baseline (strategy's own cost, no location) for the relative delta
const genericMonthly = computed(() => {
  if (!props.strategy) return 0
  const mid = (props.strategy.cost.low * 1000 + props.strategy.cost.high * 1000) / 2
  return Math.round(monthlyPayment(Math.max(0, mid - props.deposit), props.rate, props.payoffYears))
})
const delta = computed(() => monthly.value - genericMonthly.value)
const deltaClass = computed(() => (delta.value > 0 ? 'text-ob-sand' : 'text-ob-teal'))
const deltaLabel = computed(
  () => (delta.value >= 0 ? '+' : '') + '$' + fmt(delta.value) + '/mo vs generic',
)

const ocBand = computed(() => props.location?.dwelling?.annualOc ?? null)
const ocMidMonthly = computed(() =>
  ocBand.value ? (ocBand.value[0] + ocBand.value[1]) / 2 / 12 : 0,
)
const ocLabel = computed(() =>
  ocBand.value ? '$' + fmt(ocBand.value[0]) + '–$' + fmt(ocBand.value[1]) + '/yr' : 'varies',
)
const transportLabel = computed(
  () => props.location?.dwelling?.expectedTransportCost ?? 'depends on final location',
)
const allInMonthly = computed(() => monthly.value + ocMidMonthly.value)
</script>
