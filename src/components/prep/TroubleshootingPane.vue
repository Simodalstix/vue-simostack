<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Tab bar -->
    <div class="shrink-0 flex gap-1.5 px-4 py-2 border-b border-slate-700 bg-slate-800/20 flex-wrap">
      <button
        v-for="(s, i) in scenarios"
        :key="s.id"
        @click="selectedTab = i"
        class="px-3 py-1 text-[12px] rounded border transition-colors"
        :class="selectedTab === i
          ? 'text-orange-300 bg-orange-500/15 border-orange-400/40'
          : 'text-slate-400 hover:text-slate-200 bg-slate-800/40 border-slate-700/40 hover:bg-slate-700/30'"
      >{{ s.label }}</button>
    </div>

    <!-- Two-column body -->
    <div v-if="scenario" class="flex flex-1 min-h-0">

      <!-- LEFT (35%): spine + prevention -->
      <div class="flex-[2] overflow-y-auto p-4 border-r border-slate-700/60">
        <ScenarioSpine
          :groups="scenario.spineGroups"
          :prevention="scenario.prevention"
        />
      </div>

      <!-- RIGHT (65%): flow + 2x2 probe grid -->
      <div class="flex-[3] overflow-y-auto p-5 space-y-6">

        <!-- Investigation flow -->
        <div class="space-y-2.5">
          <template v-for="(block, i) in scenario.flow" :key="i">
            <p
              v-if="typeof block === 'string'"
              class="text-slate-300 text-[12px] leading-relaxed"
              v-html="parseText(block)"
            />
            <div
              v-else-if="block.cmd"
              class="text-emerald-400 bg-slate-800/60 border border-slate-700/50 rounded px-3 py-1.5 text-[11px] leading-snug font-mono whitespace-pre"
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

        <!-- Divider -->
        <div class="border-t border-slate-700/50" />

        <!-- 2x2 probe grid -->
        <div class="grid grid-cols-2 gap-3">
            <div
              v-for="probe in scenario.probes"
              :key="probe.q"
              class="rounded-lg bg-slate-800/40 border border-slate-700/50 p-3"
            >
              <div class="text-sky-300/80 text-[12px] leading-relaxed mb-2">
                {{ probe.q }}
              </div>
              <ul class="border-l-2 border-slate-700 pl-2.5 space-y-1">
                <li
                  v-for="point in probe.a"
                  :key="point"
                  class="flex gap-1.5 items-start text-slate-400 text-[11px] leading-relaxed"
                >
                  <span class="text-slate-600 shrink-0 mt-0.5 select-none">›</span>
                  <span v-html="parseText(point)" />
                </li>
              </ul>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { scenarios } from '@/data/prep/troubleshootingScenarios.js'
import ScenarioSpine from './ScenarioSpine.vue'

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
