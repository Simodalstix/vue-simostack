<template>
  <div class="space-y-5">
    <p v-if="strategy.whatItIs" class="text-[13px] leading-relaxed text-ob-muted2">
      {{ strategy.whatItIs }}
    </p>

    <p class="text-[13px] text-ob-muted2">
      <span class="text-ob-soft font-mono text-[11px] uppercase tracking-[0.08em] mr-2"
        >Dwelling</span
      >{{ strategy.dwelling }}
    </p>

    <!-- corridors + use/reject -->
    <div class="grid xl:grid-cols-[1.5fr_1fr] gap-x-10 gap-y-5">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-2">Corridors</p>
        <div class="space-y-2">
          <div
            v-for="c in strategy.corridors"
            :key="c.area"
            class="flex flex-col md:flex-row md:items-baseline gap-x-4 text-[13px]"
          >
            <span class="font-semibold text-ob-text md:w-56 shrink-0">{{ c.area }}</span>
            <span class="text-ob-teal-bright font-mono text-[11.5px] md:w-72 shrink-0">{{
              c.line
            }}</span>
            <span class="text-ob-dim text-[12.5px]">{{ c.note }}</span>
          </div>
        </div>
        <p class="mt-2 text-[12.5px] text-ob-dim">{{ strategy.commute.detail }}</p>
      </div>
      <div class="space-y-4">
        <div class="border-l-2 border-ob-teal/45 pl-3">
          <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-teal mb-1">
            Use when
          </p>
          <p class="text-[12.5px] leading-relaxed text-ob-muted2">{{ strategy.useWhen }}</p>
        </div>
        <div class="border-l-2 border-ob-sand/45 pl-3">
          <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-sand mb-1">
            Reject when
          </p>
          <p class="text-[12.5px] leading-relaxed text-ob-muted2">{{ strategy.rejectWhen }}</p>
        </div>
      </div>
    </div>

    <!-- for / against -->
    <div class="grid md:grid-cols-2 gap-x-10 gap-y-5">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-teal mb-2">For</p>
        <ul class="space-y-1.5">
          <li
            v-for="(p, i) in strategy.pros"
            :key="i"
            class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-teal shrink-0">+</span>{{ p }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-sand mb-2">
          Against / hidden costs
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="(c, i) in strategy.cons"
            :key="'c' + i"
            class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-sand shrink-0">−</span>{{ c }}
          </li>
          <li
            v-for="(h, i) in strategy.hiddenCosts"
            :key="'h' + i"
            class="text-[12.5px] leading-relaxed text-ob-dim flex gap-2"
          >
            <span class="text-ob-faint shrink-0">$</span>{{ h }}
          </li>
        </ul>
      </div>
    </div>

    <!-- transport scores -->
    <div>
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-2">
        Transport scores (5 = aligned with the philosophy)
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-x-6 gap-y-2">
        <div
          v-for="t in transportKeys"
          :key="t.key"
          class="flex items-center justify-between xl:flex-col xl:items-start gap-1"
        >
          <span class="text-[11.5px] text-ob-dim">{{ t.label }}</span>
          <span class="font-mono text-[12px]" :class="scoreClass(strategy.transport[t.key])"
            >{{ strategy.transport[t.key] }}/5</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  strategy: { type: Object, required: true },
})

// Car-related rows (car independence, keeping one small car) were removed
// from the visible Decide surface July 2026; the strategy data keeps them for
// the future property-comparison tool.
const transportKeys = [
  { key: 'pt', label: 'PT to Collins St' },
  { key: 'walk', label: 'Walkability' },
  { key: 'cycle', label: 'Cycling / e-bike' },
  { key: 'lulu', label: 'Lulu logistics' },
  { key: 'transportCost', label: 'Annual transport cost' },
]

function scoreClass(v) {
  if (v >= 4) return 'text-ob-teal'
  if (v === 3) return 'text-ob-sand'
  return 'text-ob-faint'
}
</script>
