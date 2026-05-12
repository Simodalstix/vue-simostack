<template>
  <div class="flex h-full overflow-hidden font-mono">

    <!-- ── Left rail ── -->
    <aside class="w-64 shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col h-full">

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

      <!-- Questions to Ask — pinned -->
      <div class="border-t border-slate-600 shrink-0">
        <div class="px-3 py-2 border-b border-slate-700/60">
          <span class="text-[10px] uppercase tracking-widest text-orange-400/80 font-semibold">Questions to Ask</span>
        </div>
        <div v-for="(q, i) in careerQuestionsCards" :key="i" class="px-3 py-2 border-b border-slate-700/30">
          <p class="text-[11px] text-slate-300 leading-snug italic">{{ q.question }}</p>
          <p v-if="q.toneNote" class="text-[10px] text-sky-400/60 mt-1">{{ q.toneNote }}</p>
        </div>
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

        <!-- Block cards -->
        <div v-if="selected.blocks?.length" class="flex flex-wrap gap-3 mb-5">
          <div
            v-for="bid in selected.blocks"
            :key="bid"
            class="flex-1 min-w-[190px] p-3 bg-slate-800 rounded-lg border border-slate-700/50 border-l-[3px]"
            :style="{ borderLeftColor: blockMap[bid]?.color }"
          >
            <!-- Icon + label -->
            <div class="flex items-center gap-1.5 mb-1">
              <svg
                class="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                :style="{ color: blockMap[bid]?.color }"
              >
                <path :d="blockMap[bid]?.icon" />
              </svg>
              <div class="text-[13px] font-semibold" :style="{ color: blockMap[bid]?.color }">
                {{ blockMap[bid]?.label }}
              </div>
            </div>

            <p class="text-slate-400 text-[11px] italic mb-2 leading-snug">{{ blockMap[bid]?.tagline }}</p>

            <ul class="space-y-1 mb-2.5">
              <li
                v-for="anchor in blockMap[bid]?.anchors"
                :key="anchor"
                class="text-slate-300 text-[12px] flex gap-1.5 leading-snug"
              >
                <span class="text-slate-600 shrink-0 mt-0.5 select-none">›</span>
                {{ anchor }}
              </li>
            </ul>

            <div class="flex flex-wrap gap-1">
              <span
                v-for="lp in blockMap[bid]?.lps"
                :key="lp"
                class="text-[10px] px-1.5 py-0.5 rounded border"
                :class="LP_COLORS[lp] || 'bg-slate-700 text-slate-300 border-slate-600'"
              >{{ lp }}</span>
            </div>
          </div>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { simonBlocks }        from '@/data/prep/simonBlocks.js'
import { careerAndValues }    from '@/data/prep/careerAndValues.js'
import { careerQuestionsCards } from '@/data/prep/careerQuestions.js'
import { LP_COLORS }          from '@/data/prep/lpConstants.js'

const blockMap = Object.fromEntries(simonBlocks.map(b => [b.id, b]))

const selectedIdx = ref(0)
const selected = computed(() => careerAndValues[selectedIdx.value])

function selectQuestion(idx) {
  selectedIdx.value = idx
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

// Separate AVOID items out so they render as a distinct callout
const mainCues = computed(() =>
  (selected.value?.cues ?? []).filter(c => !c.startsWith('[AVOID]'))
)
const avoidItems = computed(() =>
  (selected.value?.cues ?? [])
    .filter(c => c.startsWith('[AVOID]'))
    .map(c => c.replace(/^\[AVOID\]\s*/, ''))
)
</script>
