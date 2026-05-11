<template>
  <div class="rounded-xl bg-slate-800/50 border border-slate-700 border-l-2 border-l-orange-500/40 font-mono text-xs overflow-hidden">

    <!-- Story header: title + question + LP badges -->
    <div v-if="card.title" class="px-4 pt-3 pb-3 border-b border-slate-700 bg-slate-800/70">
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-2.5">
          <img v-if="card.logo" :src="card.logo" class="w-10 h-auto object-contain rounded-md opacity-80 shrink-0" />
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-semibold tracking-widest uppercase text-orange-300">{{ card.title }}</span>
            <p class="text-slate-200 text-sm font-medium leading-snug">{{ card.question }}</p>
          </div>
        </div>
        <div v-if="card.lps?.length" class="flex flex-wrap gap-1.5 pt-0.5">
          <span
            v-for="lp in card.lps"
            :key="lp"
            class="text-xs rounded px-2.5 py-1 border font-medium tracking-wide"
            :class="LP_COLORS[lp] || 'bg-slate-700 text-slate-300 border-slate-600'"
          >{{ LP_SHORT_NAMES[lp] || lp }}</span>
        </div>
      </div>
    </div>

    <!-- Question (career/values cards with no title) -->
    <div v-if="!card.title" class="px-4 py-3 border-b border-slate-700/50 bg-slate-800/70">
      <p class="text-slate-200 text-sm font-medium leading-snug">{{ card.question }}</p>
    </div>

    <!-- Simple layout (career/values cards) -->
    <div v-if="card.simple" class="p-4 flex flex-col gap-3">
      <div class="text-slate-300 leading-relaxed whitespace-pre-wrap">{{ card.note }}</div>
      <div v-if="card.toneNote" class="flex items-start gap-1.5">
        <span class="text-sky-400/80 shrink-0">[TONE]</span>
        <span class="text-slate-400">{{ card.toneNote }}</span>
      </div>
    </div>

    <!-- Full layout: anchors | rehearsal/cues toggle -->
    <template v-else>
      <div class="grid grid-cols-5 divide-x divide-slate-700/60 min-h-[180px]">

        <!-- Left: Talking Anchors (40%) -->
        <div class="col-span-2 p-4 space-y-2">
          <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">Talking Anchors</div>
          <div v-for="(anchor, i) in card.anchors" :key="i" class="flex gap-1.5 items-start leading-snug">
            <span class="shrink-0 text-slate-700 mt-0.5 select-none">•</span>
            <span>
              <span v-if="anchor.tag" class="mr-1 font-medium" :class="tagColor(anchor.tag)">{{ anchor.tag }}</span>
              <span class="text-slate-300">{{ anchor.text }}</span>
            </span>
          </div>
        </div>

        <!-- Right: Toggle + content (60%) -->
        <div class="col-span-3 p-4 flex flex-col gap-3">

          <!-- Toggle -->
          <div class="flex gap-1 shrink-0">
            <button
              @click="mode = 'rehearsal'"
              class="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded border transition-colors duration-100"
              :class="mode === 'rehearsal'
                ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                : 'text-slate-500 border-transparent hover:text-slate-300'"
            >Rehearsal</button>
            <button
              @click="mode = 'anchors'"
              class="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded border transition-colors duration-100"
              :class="mode === 'anchors'
                ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                : 'text-slate-500 border-transparent hover:text-slate-300'"
            >Anchors</button>
          </div>

          <!-- Rehearsal: full prose -->
          <div v-if="mode === 'rehearsal'" class="text-slate-300 leading-relaxed whitespace-pre-wrap flex-1">{{ card.rehearsal }}</div>

          <!-- Anchors: structured cues -->
          <div v-else class="flex-1 space-y-1.5">
            <template v-for="(cue, i) in card.cues" :key="i">
              <div v-if="cue === '---'" class="border-t border-slate-700/50 my-2" />
              <div v-else-if="isStarSection(cue)" class="text-orange-300 font-semibold tracking-wide mt-2 first:mt-0">
                {{ cue }}
              </div>
              <div v-else class="flex gap-1.5 items-start leading-snug">
                <span class="shrink-0 text-slate-600 mt-0.5 select-none">›</span>
                <span class="text-slate-300">{{ cue }}</span>
              </div>
            </template>
          </div>

        </div>
      </div>

      <!-- Footer: tone warning only -->
      <div v-if="card.toneWarning" class="px-4 py-2 border-t border-slate-700/50">
        <span class="text-[10px] text-amber-400/70 uppercase tracking-widest">⚠ {{ card.toneWarning }}</span>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ card: Object })

const mode = ref('rehearsal')

import { LP_COLORS, LP_SHORT_NAMES } from '@/data/prep/lpConstants.js'

const STAR_SECTIONS = new Set(['SITUATION', 'TASK', 'ACTION', 'RESULT', 'CLOSE'])

function isStarSection(cue) {
  return STAR_SECTIONS.has(cue.trim())
}

const TAG_COLORS = {
  '[DATA]':   'text-emerald-400/80',
  '[LP]':     'text-orange-400/80',
  '[TONE]':   'text-sky-400/80',
  '[ANCHOR]': 'text-amber-400/80',
  '[AVOID]':  'text-red-400/80',
}

function tagColor(tag) {
  return TAG_COLORS[tag] || 'text-slate-400'
}
</script>
