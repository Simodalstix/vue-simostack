<template>
  <div class="flex h-full overflow-hidden font-mono">

    <!-- ── Left sidebar ── -->
    <aside class="w-56 shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col h-full">

      <div class="px-3 py-2 border-b border-slate-700/60">
        <span class="text-[10px] uppercase tracking-widest text-slate-400">Questions</span>
      </div>

      <div class="flex-1 overflow-y-auto">
        <button
          v-for="(q, idx) in careerAndValues"
          :key="idx"
          @click="selectQuestion(idx)"
          class="w-full text-left px-3 py-2 border-b border-slate-700/30 border-l-2 transition-colors duration-100"
          :class="selectedIdx === idx
            ? 'bg-slate-700/60 text-white border-l-orange-400'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 border-l-transparent'"
        >
          <div class="text-[11.5px] leading-snug truncate" :class="selectedIdx === idx ? 'text-slate-100' : 'text-slate-400'">{{ q.question }}</div>
          <div v-if="q.blocks?.length" class="flex gap-1.5 mt-1.5">
            <svg
              v-for="bid in q.blocks"
              :key="bid"
              class="w-3 h-3 shrink-0"
              :class="selectedIdx === idx ? 'text-slate-400' : 'text-slate-600'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :title="blockMap[bid]?.label"
            >
              <path :d="blockMap[bid]?.icon" />
            </svg>
          </div>
        </button>
      </div>

    </aside>

    <!-- ── Main panel ── -->
    <main class="flex-1 overflow-y-auto p-6 bg-slate-900">
      <div v-if="selected">

        <!-- Question title + coreLine -->
        <div class="mb-4">
          <p class="text-[15px] font-semibold text-slate-100 leading-snug mb-1">{{ selected.question }}</p>
          <p v-if="selected.coreLine" class="text-[11px] text-slate-500 italic">{{ selected.coreLine }}</p>
        </div>

        <!-- Cues -->
        <div class="max-w-2xl">
          <div class="space-y-1">
            <template v-for="(cue, i) in mainCues" :key="i">
              <div v-if="cue === '---'" class="border-t border-slate-700/40 my-2.5" />
              <div v-else class="flex gap-2 items-start leading-snug py-0.5 rounded">
                <span
                  v-if="cueTag(cue)"
                  class="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 leading-none"
                  :class="tagBadgeClass(cue)"
                >{{ cueTag(cue) }}</span>
                <span v-else class="shrink-0 text-slate-600 mt-0.5 select-none text-[13px]">›</span>
                <span class="text-[12.5px]" :class="cueTextClass(cue)">{{ cueText(cue) }}</span>
              </div>
            </template>
          </div>

          <!-- AVOID callout -->
          <div v-if="avoidItems.length" class="mt-4 border border-rose-900/40 bg-rose-950/25 rounded-lg px-3 py-2.5">
            <div class="text-[9px] uppercase tracking-widest text-rose-500 font-semibold mb-2">⚠ Avoid</div>
            <div v-for="item in avoidItems" :key="item" class="text-[12px] text-rose-300/80 italic leading-snug">
              {{ item }}
            </div>
          </div>

          <!-- Tone warning -->
          <div v-if="selected.toneWarning" class="mt-3 border border-amber-800/30 bg-amber-950/20 rounded-lg px-3 py-2">
            <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold mr-2">Tone</span>
            <span class="text-[12px] text-amber-300/80 italic">{{ selected.toneWarning }}</span>
          </div>
        </div>

      </div>
    </main>

    <!-- ── Right blocks strip ── -->
    <aside class="w-44 shrink-0 border-l border-slate-700/60 overflow-y-auto flex flex-col gap-2 p-3">
      <div class="text-[9px] uppercase tracking-widest text-slate-600 font-semibold mb-1 px-1">
        Traits
      </div>
      <div
        v-for="block in simonBlocks"
        :key="block.id"
        class="rounded-lg border border-slate-700/30 border-l-2 p-2.5 transition-opacity duration-150"
        :style="{ borderLeftColor: block.color }"
        :class="isActive(block.id)
          ? 'bg-slate-800/60 border-slate-700/60 opacity-100'
          : 'bg-slate-800/20 opacity-25'"
      >
        <div class="text-[11px] font-semibold mb-0.5" :style="{ color: block.color }">
          {{ block.label }}
        </div>
        <p class="text-[10px] text-slate-400 leading-snug">{{ block.tagline }}</p>
        <div class="flex flex-wrap gap-1 mt-1.5">
          <span
            v-for="lp in block.lps"
            :key="lp"
            class="text-[9px] px-1.5 py-0.5 rounded border"
            :class="LP_COLORS[lp] || 'bg-slate-700 text-slate-300 border-slate-600'"
          >{{ LP_SHORT_NAMES[lp] || lp }}</span>
        </div>
      </div>
    </aside>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { simonBlocks }     from '@/data/prep/simonBlocks.js'
import { careerAndValues } from '@/data/prep/careerAndValues.js'
import { LP_COLORS, LP_SHORT_NAMES } from '@/data/prep/lpConstants.js'

const blockMap = Object.fromEntries(simonBlocks.map(b => [b.id, b]))

const selectedIdx = ref(0)
const selected = computed(() => careerAndValues[selectedIdx.value])

function selectQuestion(idx) {
  selectedIdx.value = idx
}

function isActive(blockId) {
  return selected.value?.blocks?.includes(blockId) ?? false
}

const TAG_RE = /^\[(ANCHOR|DATA|LP|AVOID|TONE)\]\s*/

function cueTag(cue) {
  const m = cue.match(TAG_RE)
  return m ? m[1] : null
}
function cueText(cue) {
  return cue.replace(TAG_RE, '')
}
function tagBadgeClass(cue) {
  const tag = cueTag(cue)
  if (tag === 'ANCHOR') return 'bg-slate-600/60 text-slate-200 border border-slate-500/40'
  if (tag === 'DATA')   return 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/40'
  if (tag === 'LP')     return 'bg-purple-900/50 text-purple-300 border border-purple-700/40'
  if (tag === 'TONE')   return 'bg-amber-900/50 text-amber-300 border border-amber-700/40'
  return ''
}
function cueTextClass(cue) {
  const tag = cueTag(cue)
  if (tag === 'ANCHOR') return 'text-slate-100 font-medium'
  if (tag === 'DATA')   return 'text-emerald-300'
  if (tag === 'LP')     return 'text-purple-300'
  if (tag === 'TONE')   return 'text-amber-300 italic'
  return 'text-slate-300'
}

const mainCues = computed(() =>
  (selected.value?.cues ?? []).filter(c => !c.startsWith('[AVOID]'))
)
const avoidItems = computed(() =>
  (selected.value?.cues ?? [])
    .filter(c => c.startsWith('[AVOID]'))
    .map(c => c.replace(/^\[AVOID\]\s*/, ''))
)
</script>
