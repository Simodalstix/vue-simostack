<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Tab bar -->
    <div class="shrink-0 flex items-center gap-1.5 flex-wrap border-b border-slate-700 bg-slate-800/20 px-4 py-2">
      <button
        v-for="(s, i) in scenarios"
        :key="s.id"
        @click="selectedTab = i"
        class="px-3 py-1 text-[12px] font-mono rounded border transition-colors duration-100"
        :class="selectedTab === i
          ? 'text-orange-300 bg-orange-500/15 border-orange-400/40'
          : 'text-slate-400 hover:text-slate-200 bg-slate-800/40 border-slate-700/40 hover:bg-slate-700/30'"
      >{{ s.label }}</button>
    </div>

    <!-- Two-column body -->
    <div v-if="scenario" class="flex flex-1 min-h-0">

      <!-- LEFT ~40%: entry + signals + probes + prevention + script push -->
      <div class="flex-[2] overflow-y-auto border-r border-slate-700/60 p-4 space-y-4">

        <!-- Entry condition -->
        <p class="text-[11px] text-slate-500 italic">Entry: {{ scenario.entry }}</p>

        <!-- Signals -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">Critical Signals</div>
          <div class="space-y-1">
            <div
              v-for="sig in scenario.signals"
              :key="sig.symptom"
              class="flex gap-1.5 text-[11px] leading-snug"
            >
              <span class="text-slate-400 shrink-0">{{ sig.symptom }}</span>
              <span class="text-slate-600 shrink-0">→</span>
              <span class="text-slate-500">{{ sig.meaning }}</span>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-700/40" />

        <!-- Probes -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2.5">Probes</div>
          <div class="space-y-3">
            <div v-for="(probe, i) in scenario.probes" :key="i">
              <div class="text-sky-300/80 text-[11px] leading-snug">Q: {{ probe.q }}</div>
              <ul class="border-l-2 border-slate-700 pl-2.5 mt-1 space-y-0.5">
                <li
                  v-for="(ans, j) in probe.a"
                  :key="j"
                  class="text-slate-400 text-[11px] leading-snug"
                  v-html="parseText(ans)"
                />
              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-700/40" />

        <!-- Prevention -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">Prevention</div>
          <div class="space-y-1">
            <div
              v-for="(item, i) in scenario.prevention"
              :key="i"
              class="flex gap-2 items-start text-[11px] leading-snug"
            >
              <span class="text-emerald-400/70 shrink-0 mt-px">•</span>
              <span class="text-slate-300">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-700/40" />

        <!-- Script Push -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold mb-1.5">Script Push</div>
          <p class="text-slate-400 text-[11px] italic leading-relaxed" v-html="parseText(scenario.scriptPush)" />
        </div>

      </div>

      <!-- RIGHT ~60%: diagram + reasoning flow -->
      <div class="flex-[3] flex flex-col min-h-0">

        <!-- Outside-in diagram (pinned top) -->
        <OutsideInDiagram class="shrink-0" />

        <!-- Reasoning flow (scrollable) -->
        <div class="flex-1 overflow-y-auto p-5 space-y-2.5">
          <template v-for="(block, i) in scenario.flow" :key="i">
            <div
              v-if="typeof block === 'string'"
              class="text-slate-300 text-[12px] leading-relaxed"
              v-html="parseText(block)"
            />
            <div
              v-else-if="block.cmd"
              class="text-emerald-400 bg-slate-800/60 border border-slate-700/50 rounded px-3 py-1.5 text-[11px] leading-snug whitespace-pre"
            >{{ block.cmd }}</div>
            <div v-else-if="block.list" class="space-y-1 ml-1">
              <div
                v-for="(item, j) in block.list"
                :key="j"
                class="flex gap-2 items-start text-[12px] leading-snug"
              >
                <span class="text-slate-500 shrink-0 mt-px">•</span>
                <span class="text-slate-300" v-html="parseText(item)" />
              </div>
            </div>
          </template>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { scenarios } from '@/data/prep/troubleshootingScenarios.js'
import OutsideInDiagram from './OutsideInDiagram.vue'

const selectedTab = ref(0)
const scenario    = computed(() => scenarios[selectedTab.value])

function parseText(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(?<![\d.])([1-5]\d{2})(?![\d.])/g, '<span class="text-purple-400">$1</span>')
    .replace(/`([^`]+)`/g, '<code class="text-emerald-400 font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<span class="text-slate-100 font-semibold">$1</span>')
}
</script>
