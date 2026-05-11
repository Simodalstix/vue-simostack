<template>
  <div class="flex h-full overflow-hidden font-mono">

    <!-- Left panel -->
    <aside class="w-72 shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col h-full">

      <!-- Question list -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-3 py-2 border-b border-slate-700/60">
          <span class="text-[10px] uppercase tracking-widest text-slate-400">Questions</span>
        </div>
        <button
          v-for="(q, idx) in careerAndValues"
          :key="idx"
          @click="selectQuestion(idx)"
          class="w-full text-left px-3 py-2 border-b border-slate-700/30 border-l-2 transition-colors duration-100"
          :class="selectedIdx === idx
            ? 'bg-slate-700 text-white'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'"
          :style="{ borderLeftColor: selectedIdx === idx ? firstBlockColor(q) : 'transparent' }"
        >
          <div class="text-[12px] text-slate-300 leading-snug truncate" :title="q.question">{{ q.question }}</div>
          <div v-if="q.blocks?.length" class="flex gap-1.5 mt-1">
            <span
              v-for="bid in q.blocks"
              :key="bid"
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :style="{ backgroundColor: blockMap[bid]?.color }"
              :title="blockMap[bid]?.label"
            />
          </div>
        </button>
      </div>

      <!-- Questions to Ask — pinned -->
      <div class="border-t border-slate-600 shrink-0">
        <div class="px-3 py-2 border-b border-slate-700/60">
          <span class="text-[10px] uppercase tracking-widest text-orange-400/80 font-semibold">Questions to Ask</span>
        </div>
        <div
          v-for="(q, i) in careerQuestionsCards"
          :key="i"
          class="px-3 py-2 border-b border-slate-700/30"
        >
          <p class="text-[11px] text-slate-300 leading-snug italic">{{ q.question }}</p>
          <p v-if="q.toneNote" class="text-[10px] text-sky-400/70 mt-1">{{ q.toneNote }}</p>
        </div>
      </div>
    </aside>

    <!-- Right panel -->
    <main class="flex-1 overflow-y-auto p-6 bg-slate-900">
      <div v-if="selected">

        <!-- Question header -->
        <p class="text-base font-mono text-slate-200 mb-4">{{ selected.question }}</p>

        <!-- Block cards — all expanded, side-by-side -->
        <div v-if="selected.blocks?.length" class="flex flex-wrap gap-3 mb-4">
          <div
            v-for="bid in selected.blocks"
            :key="bid"
            class="flex-1 min-w-[200px] p-3 bg-slate-800 rounded border border-slate-700/60 border-l-2"
            :style="{ borderLeftColor: blockMap[bid]?.color }"
          >
            <div class="text-[14px] font-semibold mb-0.5" :style="{ color: blockMap[bid]?.color }">
              {{ blockMap[bid]?.label }}
            </div>
            <p class="text-slate-400 text-[13px] italic mb-2 leading-snug">{{ blockMap[bid]?.tagline }}</p>
            <ul class="space-y-1 mb-2.5">
              <li
                v-for="anchor in blockMap[bid]?.anchors"
                :key="anchor"
                class="text-slate-300 text-[13px] flex gap-1.5 leading-snug"
              >
                <span class="text-slate-600 shrink-0 mt-0.5">›</span>
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

        <!-- Cues — constrained width -->
        <div class="max-w-2xl space-y-1.5">
          <template v-for="(cue, i) in selected.cues" :key="i">
            <div v-if="cue === '---'" class="border-t border-slate-700/50 my-3" />
            <div v-else class="flex gap-2 items-start leading-snug">
              <span
                v-if="cueTag(cue)"
                class="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 leading-none"
                :class="tagBadgeClass(cue)"
              >{{ cueTag(cue) }}</span>
              <span v-else class="shrink-0 text-slate-600 mt-0.5 select-none text-[13px]">›</span>
              <span class="text-[13px]" :class="cueTextClass(cue)">{{ cueText(cue) }}</span>
            </div>
          </template>

          <!-- Tone warning -->
          <div v-if="selected.toneWarning" class="pt-3 mt-1 border-t border-slate-700/50">
            <span class="text-[10px] text-amber-400/70 uppercase tracking-widest">⚠ {{ selected.toneWarning }}</span>
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

function firstBlockColor(q) {
  return blockMap[q.blocks?.[0]]?.color ?? '#f97316'
}

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
  if (tag === 'AVOID')  return 'bg-rose-900/50 text-rose-300 border border-rose-700/40'
  if (tag === 'TONE')   return 'bg-amber-900/50 text-amber-300 border border-amber-700/40'
  return ''
}
function cueTextClass(cue) {
  const tag = cueTag(cue)
  if (tag === 'ANCHOR') return 'text-slate-100 font-medium'
  if (tag === 'DATA')   return 'text-emerald-300'
  if (tag === 'LP')     return 'text-purple-300'
  if (tag === 'AVOID')  return 'text-rose-400 italic'
  if (tag === 'TONE')   return 'text-amber-300 italic'
  return 'text-slate-300'
}
</script>
