<template>
  <div class="rounded-xl bg-slate-800/60 border border-slate-700 font-mono text-xs overflow-hidden">

    <!-- Question -->
    <div class="px-4 py-3 border-b border-slate-700 bg-slate-800/80">
      <p class="text-slate-100 text-sm font-semibold leading-snug">{{ card.question }}</p>
    </div>

    <!-- Simple layout: no toggle, just note -->
    <div v-if="card.simple" class="p-4 flex flex-col gap-3">
      <div class="text-slate-300 leading-relaxed whitespace-pre-wrap">{{ card.note }}</div>
      <div v-if="card.toneNote" class="flex items-start gap-1.5">
        <span class="text-sky-400/80 shrink-0">[TONE]</span>
        <span class="text-slate-400">{{ card.toneNote }}</span>
      </div>
    </div>

    <!-- Full layout: anchors | toggle -->
    <template v-else>
      <div class="grid grid-cols-5 divide-x divide-slate-700 min-h-[180px]">

        <!-- Left col: talking anchors (40%) -->
        <div class="col-span-2 p-4 space-y-2">
          <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-3">Talking Anchors</div>
          <div v-for="(anchor, i) in card.anchors" :key="i" class="flex gap-1.5 items-start leading-snug">
            <span class="shrink-0 text-slate-600 mt-0.5">•</span>
            <span>
              <span v-if="anchor.tag" class="mr-1" :class="tagColor(anchor.tag)">{{ anchor.tag }}</span>
              <span class="text-slate-300">{{ anchor.text }}</span>
            </span>
          </div>
        </div>

        <!-- Right col: mode toggle (60%) -->
        <div class="col-span-3 p-4 flex flex-col gap-3">

          <!-- Toggle buttons -->
          <div class="flex gap-1 shrink-0">
            <button
              @click="mode = 'rehearsal'"
              class="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded transition-colors duration-100"
              :class="mode === 'rehearsal' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'"
            >Rehearsal</button>
            <button
              @click="mode = 'anchors'"
              class="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded transition-colors duration-100"
              :class="mode === 'anchors' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'"
            >Anchors</button>
          </div>

          <!-- Rehearsal: verbatim prose -->
          <div v-if="mode === 'rehearsal'" class="text-slate-300 leading-relaxed whitespace-pre-wrap flex-1">{{ card.rehearsal }}</div>

          <!-- Anchors: cue bullets -->
          <div v-else class="flex-1 space-y-2">
            <template v-for="(cue, i) in card.cues" :key="i">
              <div v-if="cue === '---'" class="border-t border-slate-700/60 my-1" />
              <div v-else class="flex gap-1.5 items-start leading-snug">
                <span class="shrink-0 text-slate-600 mt-0.5">•</span>
                <span class="text-slate-300">{{ cue }}</span>
              </div>
            </template>
          </div>

        </div>
      </div>

      <!-- Footer: LP badges + tone warning -->
      <div class="px-4 py-2 border-t border-slate-700 flex flex-wrap items-center gap-2">
        <span
          v-for="lp in card.lps"
          :key="lp"
          class="text-[10px] rounded-full px-2 py-0.5 border font-medium"
          :class="LP_COLORS[lp] || 'bg-slate-700 text-slate-300 border-slate-600'"
        >{{ LP_SHORT_NAMES[lp] || lp }}</span>
        <span v-if="card.toneWarning" class="ml-auto text-[10px] text-amber-400/70 uppercase tracking-widest">
          ⚠ {{ card.toneWarning }}
        </span>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ card: Object })

const mode = ref('rehearsal')

const modules = import.meta.glob('/src/data/starStories.js', { eager: true })
const data = Object.values(modules)[0] || {}
const LP_COLORS = data.LP_COLORS || {}
const LP_SHORT_NAMES = data.LP_SHORT_NAMES || {}

const TAG_COLORS = {
  '[TONE]':   'text-sky-400/80',
  '[AVOID]':  'text-red-400/80',
  '[LP]':     'text-purple-400/80',
  '[ANCHOR]': 'text-amber-400/80',
  '[DATA]':   'text-emerald-400/80',
}

function tagColor(tag) {
  return TAG_COLORS[tag] || 'text-slate-400'
}
</script>
