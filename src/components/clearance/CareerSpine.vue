<script setup>
import { careerHistory } from '@/data/clearance/careerHistory.js'

const borderByType = {
  early: 'border-l-2 border-slate-600',
  trade: 'border-l-2 border-slate-600',
  lab: 'border-l-2 border-sky-700/60',
  education: 'border-l-2 border-purple-700/60',
  milestone: 'border-l-2 border-emerald-700/60',
  professional: 'border-l-2 border-amber-600/60',
  tech: 'border-l-2 border-orange-500/60',
}
</script>

<template>
  <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-5 flex flex-col gap-3">
    <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Career History</p>

    <div class="relative pl-5">
      <!-- Spine line -->
      <div class="absolute left-1.5 top-0 bottom-0 border-l-2 border-orange-500/30"></div>

      <div class="flex flex-col gap-3">
        <div
          v-for="entry in careerHistory"
          :key="entry.period + entry.role"
          :class="[
            'relative rounded-lg px-3 py-2',
            entry.current
              ? 'bg-orange-500/10 border-l-2 border-orange-400'
              : borderByType[entry.type] || 'border-l-2 border-slate-600',
          ]"
        >
          <!-- Dot -->
          <div
            :class="[
              'absolute -left-[19px] top-3 w-2.5 h-2.5 rounded-full border-2',
              entry.current
                ? 'bg-orange-400 border-orange-500'
                : entry.type === 'milestone'
                ? 'bg-emerald-500 border-emerald-600'
                : 'bg-slate-600 border-slate-500',
            ]"
          ></div>

          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{{ entry.period }}</p>
          <p class="text-[12px] text-slate-200 font-semibold">{{ entry.role }}</p>
          <p v-if="entry.org" class="text-[11px] text-slate-400">
            {{ entry.flag }} {{ entry.org }} · {{ entry.location }}
          </p>
          <p v-else class="text-[11px] text-slate-400">{{ entry.flag }} {{ entry.location }}</p>
          <p v-if="entry.note" class="text-[10px] text-slate-500 italic mt-0.5">{{ entry.note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
