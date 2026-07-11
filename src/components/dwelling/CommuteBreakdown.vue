<template>
  <div>
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
      <span class="text-[13px] font-semibold text-ob-text">{{ presetLabel }}</span>
      <span class="font-mono text-[11.5px] text-ob-dim">{{ dest }}</span>
      <span class="font-mono text-[12px]" :class="bandClass"
        >{{ commute.typical }} min typical · {{ commute.stressed }} min at the 80th percentile</span
      >
    </div>

    <!-- modelled decomposition of what we hold: walk + ride + reliability buffer -->
    <div class="flex h-[6px] rounded-full overflow-hidden bg-ob-ink mb-2">
      <span
        class="block bg-ob-sand/60"
        :style="{ width: pct(walk) }"
        title="Walk to station"
      ></span>
      <span
        class="block bg-ob-teal/70"
        :style="{ width: pct(ride) }"
        title="Wait, in-vehicle, transfer"
      ></span>
      <span
        class="block bg-ob-faint/50"
        :style="{ width: pct(buffer) }"
        title="Reliability buffer"
      ></span>
    </div>
    <div class="grid grid-cols-3 gap-2 font-mono text-[11px] text-ob-dim">
      <span><span class="text-ob-sand">▪</span> Walk {{ walk }}m</span>
      <span><span class="text-ob-teal">▪</span> Ride + wait {{ ride }}m</span>
      <span><span class="text-ob-faint">▪</span> Buffer {{ buffer }}m</span>
    </div>
    <p class="mt-2 font-mono text-[11px] text-ob-faint">
      {{ commute.transfers }} routine transfer{{ commute.transfers === 1 ? '' : 's' }} · modelled
      split, verify against a timed 8am run
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  record: { type: Object, required: true },
  commute: { type: Object, required: true },
  band: { type: String, default: null },
  presetLabel: { type: String, default: 'Collins St' },
  dest: { type: String, default: '' },
})

const walk = computed(() => props.record.stationWalkMin ?? 0)
const buffer = computed(() => Math.max(0, props.commute.stressed - props.commute.typical))
const ride = computed(() => Math.max(0, props.commute.typical - walk.value))
const total = computed(() => walk.value + ride.value + buffer.value || 1)

function pct(part) {
  return (part / total.value) * 100 + '%'
}

const bandClass = computed(
  () =>
    ({
      Excellent: 'text-ob-teal',
      Good: 'text-ob-teal-bright',
      Acceptable: 'text-ob-sand',
      Difficult: 'text-ob-faint',
    })[props.band] || 'text-ob-muted',
)
</script>
