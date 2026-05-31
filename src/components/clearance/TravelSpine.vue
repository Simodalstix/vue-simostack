<script setup>
import { travelHistory } from '@/data/clearance/travelHistory.js'
</script>

<template>
  <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-5 flex flex-col gap-3">
    <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Travel History</p>

    <div class="relative pl-5">
      <!-- Spine line -->
      <div class="absolute left-1.5 top-0 bottom-0 border-l-2 border-slate-700"></div>

      <div class="flex flex-col gap-5">
        <div v-for="entry in travelHistory" :key="entry.year + entry.destination" class="relative">
          <!-- Dot -->
          <div
            :class="[
              'absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2',
              entry.highlight
                ? 'bg-amber-400 border-amber-500'
                : 'bg-slate-600 border-slate-500',
            ]"
          ></div>

          <!-- Year -->
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{{ entry.year }}<span v-if="entry.age" class="ml-2 text-slate-600">· age {{ entry.age }}</span></p>

          <!-- Flags -->
          <div class="flex flex-wrap gap-0.5 mt-0.5">
            <span v-if="entry.flag" class="text-[14px]">{{ entry.flag }}</span>
            <template v-else-if="entry.flags">
              <span v-for="f in entry.flags" :key="f" class="text-[14px]">{{ f }}</span>
            </template>
          </div>

          <!-- Destination -->
          <p class="text-[12px] text-slate-200 font-semibold mt-0.5">{{ entry.destination }}</p>

          <!-- Context -->
          <p class="text-[11px] text-slate-400 italic leading-snug mt-0.5">{{ entry.context }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
