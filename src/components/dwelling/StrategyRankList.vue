<template>
  <section>
    <div class="flex items-baseline justify-between mb-4 flex-wrap gap-x-4 gap-y-1">
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
        Relative rank · score /100{{ locationLabel ? ' · tuned to ' + locationLabel : '' }}
      </h2>
      <span class="font-mono text-[11px] text-ob-faint">click a row to focus cost + expand</span>
    </div>

    <ol class="space-y-2">
      <li
        v-for="(r, i) in ranked"
        :key="r.strategy.id"
        class="bg-ob-surface border rounded-[6px] transition-colors"
        :class="[
          open === r.strategy.id ? 'border-ob-teal/45' : 'border-ob-sand/8 hover:border-ob-sand/16',
          focused === r.strategy.id ? 'ring-1 ring-ob-teal/40' : '',
        ]"
      >
        <button class="w-full text-left px-4 py-3 flex items-center gap-4" @click="toggle(r)">
          <span
            class="font-mono text-[13px] w-6 shrink-0"
            :class="i < 3 ? 'text-ob-teal' : 'text-ob-faint'"
            >{{ i + 1 }}</span
          >
          <span class="flex-1 min-w-0">
            <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span class="text-[13.5px] font-semibold text-ob-text">{{ r.strategy.name }}</span>
              <span
                class="font-mono text-[10.5px] tracking-[0.06em] uppercase px-2 py-[2px] rounded-full border"
                :class="verdictClass(r.strategy.verdict)"
                >{{ verdictMeta[r.strategy.verdict].label }}</span
              >
              <span
                v-if="focused === r.strategy.id"
                class="font-mono text-[10px] tracking-[0.06em] uppercase text-ob-teal"
                >focused</span
              >
            </span>
            <span class="hidden md:block mt-0.5 text-[12px] text-ob-dim truncate">{{
              r.strategy.tagline
            }}</span>
          </span>
          <span class="w-28 lg:w-48 shrink-0 hidden sm:block">
            <span class="block h-[5px] rounded-full bg-ob-ink overflow-hidden">
              <span
                class="block h-full rounded-full"
                :class="i < 3 ? 'bg-ob-teal' : 'bg-ob-sand/45'"
                :style="{ width: r.scorePct + '%' }"
              ></span>
            </span>
          </span>
          <span
            class="font-mono text-[14px] w-10 text-right shrink-0"
            :class="i < 3 ? 'text-ob-teal' : 'text-ob-muted'"
            >{{ r.scorePct }}</span
          >
          <span class="text-ob-faint text-[13px] w-3 text-center shrink-0">{{
            open === r.strategy.id ? '−' : '+'
          }}</span>
        </button>

        <div
          v-if="open === r.strategy.id"
          class="px-4 pb-5 pt-1 border-t border-ob-sand/8 space-y-5"
        >
          <!-- criterion contribution breakdown -->
          <div class="pt-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-3">
              Score contribution · raw /5 × weight ÷ total
            </p>
            <div class="grid sm:grid-cols-2 gap-x-10 gap-y-2">
              <div
                v-for="b in r.breakdown"
                :key="b.key"
                class="flex items-center gap-3 text-[12.5px]"
                :class="b.weight === 0 ? 'opacity-40' : ''"
              >
                <span class="flex-1 min-w-0 truncate text-ob-muted2">
                  {{ b.label }}
                  <span v-if="b.overridden" class="text-ob-teal font-mono text-[10.5px]"
                    >· {{ locationLabel }}</span
                  >
                </span>
                <span class="font-mono text-[12px] w-10 text-right" :class="scoreClass(b.raw)"
                  >{{ b.raw.toFixed ? b.raw.toFixed(1) : b.raw }}/5</span
                >
                <span class="font-mono text-[11px] w-8 text-right text-ob-faint"
                  >×{{ b.weight }}</span
                >
                <span class="w-20 lg:w-28 shrink-0">
                  <span class="block h-[5px] rounded-full bg-ob-ink overflow-hidden">
                    <span
                      class="block h-full rounded-full"
                      :class="b.overridden ? 'bg-ob-teal' : 'bg-ob-teal/70'"
                      :style="{ width: (b.contribution / maxContribution(r)) * 100 + '%' }"
                    ></span>
                  </span>
                </span>
                <span class="font-mono text-[12px] w-10 text-right text-ob-sand">{{
                  b.contribution.toFixed(2)
                }}</span>
              </div>
            </div>
          </div>

          <StrategyDetail :strategy="r.strategy" />
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { verdictMeta } from '@/data/dwelling/strategies.js'
import StrategyDetail from './StrategyDetail.vue'

defineProps({
  ranked: { type: Array, required: true },
  locationLabel: { type: String, default: null },
})
const focused = defineModel({ default: null })
const open = ref(null)

function toggle(r) {
  focused.value = r.strategy.id
  open.value = open.value === r.strategy.id ? null : r.strategy.id
}
function maxContribution(r) {
  return Math.max(...r.breakdown.map((b) => b.contribution), 0.0001)
}
function verdictClass(v) {
  return {
    shortlist: 'border-ob-teal/45 text-ob-teal',
    solid: 'border-ob-sand/45 text-ob-sand',
    situational: 'border-ob-sand/14 text-ob-muted',
    'avoid-unless': 'border-ob-sand/14 text-ob-faint',
  }[v]
}
function scoreClass(v) {
  if (v >= 4) return 'text-ob-teal'
  if (v >= 3) return 'text-ob-sand'
  return 'text-ob-faint'
}
</script>
