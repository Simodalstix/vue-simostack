<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Thin tab bar + layer order -->
    <div class="shrink-0 flex items-center gap-4 border-b border-slate-700 bg-slate-800/20 px-4 py-2 flex-wrap">

      <!-- Scenario tabs -->
      <div class="flex gap-1.5 flex-wrap">
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

      <!-- Layer order -->
      <div class="ml-28 flex items-center gap-1 flex-wrap">
        <span class="text-[12px] uppercase tracking-widest text-slate-500 mr-1">Layers:</span>
        <template v-for="(node, i) in philosophy.stack" :key="i">
          <span v-if="i > 0" class="text-slate-600 text-[10px] select-none">→</span>
          <template v-if="node.vpcEntry">
            <span class="text-[8px] font-semibold tracking-widest text-purple-400 border border-purple-600/50 bg-purple-900/20 rounded px-1 py-0.5 select-none">VPC</span>
            <span class="text-purple-700/60 text-[10px] select-none">▶</span>
          </template>
          <span
            class="text-[12px] font-mono px-1.5 py-0.5 rounded leading-none border"
            :class="node.external
              ? 'text-slate-400 bg-slate-900/50 border-slate-700/50'
              : 'text-emerald-400 bg-slate-900/70 border-emerald-900/50'"
          >{{ node.label }}</span>
        </template>
      </div>

    </div>

    <!-- Two-column body -->
    <div v-if="scenario" class="flex flex-1 min-h-0">

      <!-- LEFT: philosophy + entry + concepts + probes -->
      <div class="flex-[2] overflow-y-auto border-r border-slate-700/60 p-5 space-y-4">

        <!-- Philosophy -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">
            {{ philosophy.heading }}
          </div>
          <div class="space-y-1.5">
            <div
              v-for="(block, i) in philosophy.body"
              :key="i"
              class="text-slate-300 text-[12px] leading-relaxed"
              v-html="parseText(block)"
            />
          </div>
        </div>

        <div class="border-t border-slate-700/50" />

        <!-- Key Concepts -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">
            Key Concepts
          </div>
          <ul class="space-y-2">
            <li
              v-for="(c, i) in scenario.concepts"
              :key="i"
              class="flex gap-2 items-start leading-relaxed"
            >
              <span class="text-orange-400/40 shrink-0 mt-0.5 select-none">•</span>
              <span class="text-slate-300 text-[12px]" v-html="parseText(c)" />
            </li>
          </ul>
        </div>

        <div class="border-t border-slate-700/50" />

        <!-- Likely Probes -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">
            Likely Probes
          </div>
          <ol class="space-y-2.5">
            <li
              v-for="(q, i) in scenario.probes"
              :key="i"
              class="flex gap-2.5 items-start"
            >
              <span class="text-slate-600 shrink-0 text-[11px] mt-px select-none tabular-nums">{{ i + 1 }}.</span>
              <span class="text-sky-300/80 text-[12px] leading-relaxed">{{ q }}</span>
            </li>
          </ol>
        </div>

      </div>

      <!-- RIGHT: reasoning flow -->
      <div class="flex-[3] overflow-y-auto p-5 space-y-2.5">
        <!-- Entry condition -->
        <p class="text-[11px] text-slate-500 italic pb-2.5 mb-0.5 border-b border-slate-700/40">
          Entry: {{ scenario.entry }}
        </p>
        <template v-for="(block, i) in scenario.flow" :key="i">
          <p
            v-if="typeof block === 'string'"
            class="text-slate-300 text-[12px] leading-relaxed"
            v-html="parseText(block)"
          />
          <div
            v-else-if="block.cmd"
            class="text-emerald-400 bg-slate-800/60 border border-slate-700/50 rounded px-3 py-1.5 text-[11px] leading-snug"
          >{{ block.cmd }}</div>
          <ul v-else-if="block.list" class="space-y-1.5 ml-1">
            <li
              v-for="(item, j) in block.list"
              :key="j"
              class="flex gap-2 items-start leading-relaxed"
            >
              <span class="text-orange-400/50 shrink-0 mt-0.5 select-none">›</span>
              <span class="text-slate-300 text-[12px]" v-html="parseText(item)" />
            </li>
          </ul>
        </template>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { philosophy, scenarios } from '@/data/prep/troubleshootingScenarios.js'

const selectedTab = ref(0)
const scenario    = computed(() => scenarios[selectedTab.value])

function parseText(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code class="text-emerald-400 font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<span class="text-slate-100 font-semibold">$1</span>')
}
</script>
