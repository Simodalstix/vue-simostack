<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Scenario tab bar -->
    <div class="shrink-0 flex border-b border-slate-700 bg-slate-800/20 flex-wrap">
      <button
        v-for="(s, i) in scenarios"
        :key="s.id"
        @click="selectedTab = i"
        class="px-4 py-2 text-[12px] border-r border-slate-700/60 border-b-2 -mb-px transition-colors"
        :class="selectedTab === i
          ? 'text-orange-300 border-b-orange-400 bg-orange-500/10'
          : 'text-slate-400 hover:text-slate-200 border-b-transparent'"
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

      <!-- RIGHT (65%): section tabs + content -->
      <div class="flex-[3] flex flex-col min-h-0">

        <!-- Section tab bar -->
        <div class="shrink-0 flex gap-1 px-4 pt-3 pb-0 border-b border-slate-700/60">
          <button
            v-for="tab in ['Diagnose', 'Root Cause', 'Prevent', 'Rollback', 'Probes']"
            :key="tab"
            @click="rightTab = tab"
            class="px-3 py-1.5 text-[11px] font-mono border-b-2 transition-colors -mb-px"
            :class="rightTab === tab
              ? 'text-orange-300 border-orange-400'
              : 'text-slate-500 border-transparent hover:text-slate-300'"
          >{{ tab }}</button>
        </div>

        <!-- Content area -->
        <div class="flex-1 overflow-y-auto p-5">

          <!-- DIAGNOSE -->
          <div v-if="rightTab === 'Diagnose'" class="space-y-3">
            <template v-for="(block, i) in scenario.flow" :key="i">

              <!-- Decision node -->
              <div
                v-if="block.type === 'decision'"
                class="rounded-lg border overflow-hidden"
                :class="decisionBorderClass(block.color)"
              >
                <div class="px-3 py-2 flex items-center gap-2" :class="decisionHeaderClass(block.color)">
                  <span class="text-[11px] font-mono font-semibold" :class="decisionTextClass(block.color)">
                    {{ block.signal }}
                  </span>
                  <span class="ml-auto text-[9px] uppercase tracking-widest" :class="decisionTextClass(block.color)">
                    {{ block.color === 'amber' ? 'investigate →' : block.color === 'rose' ? 'root cause' : 'cleared ✓' }}
                  </span>
                </div>
                <div class="px-3 py-2.5 space-y-3 bg-slate-900/40">
                  <div>
                    <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1">Interpretation</div>
                    <p class="text-slate-300 text-[12px] leading-relaxed">{{ block.interpretation }}</p>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold shrink-0 mt-0.5">Next</span>
                    <span class="text-[12px] font-mono" :class="decisionTextClass(block.color)">{{ block.nextHop }}</span>
                  </div>
                  <div>
                    <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">Validate</div>
                    <div v-for="(v, vi) in block.validate" :key="vi" class="mb-2">
                      <div class="text-emerald-400 text-[11px] font-mono bg-slate-800/60 border border-slate-700/50 rounded px-2.5 py-1 mb-0.5 whitespace-pre">{{ v.cmd }}</div>
                      <div class="text-slate-500 text-[10px] italic pl-1">→ {{ v.lookFor }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Prose -->
              <p
                v-else-if="typeof block === 'string'"
                class="text-slate-300 text-[12px] leading-relaxed"
                v-html="parseText(block)"
              />

              <!-- Command -->
              <div
                v-else-if="block.cmd"
                class="text-emerald-400 bg-slate-800/60 border border-slate-700/50 rounded px-3 py-1.5 text-[11px] leading-snug font-mono whitespace-pre"
              >{{ block.cmd }}</div>

              <!-- List -->
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

          <!-- ROOT CAUSE -->
          <div v-else-if="rightTab === 'Root Cause'" class="space-y-2">
            <div
              v-for="rc in scenario.rootCauses"
              :key="rc.cause"
              class="rounded-lg border border-slate-700/50 overflow-hidden"
            >
              <div class="px-3 py-2 bg-rose-950/30 border-b border-slate-700/40">
                <span class="text-rose-300 text-[12px] font-mono">{{ rc.cause }}</span>
              </div>
              <div class="px-3 py-2 bg-slate-800/20 space-y-1">
                <div class="text-slate-300 text-[12px]">{{ rc.fix }}</div>
                <div
                  v-if="rc.cmd"
                  class="text-emerald-400 text-[11px] font-mono bg-slate-800/60 border border-slate-700/40 rounded px-2.5 py-1 mt-1.5 whitespace-pre"
                >{{ rc.cmd }}</div>
              </div>
            </div>
          </div>

          <!-- PREVENT -->
          <div v-else-if="rightTab === 'Prevent'" class="space-y-2">
            <div
              v-for="p in scenario.prevention"
              :key="p"
              class="flex gap-2 items-start text-[12px] text-slate-300 leading-relaxed"
            >
              <span class="text-emerald-500 shrink-0 mt-0.5">•</span>
              <span>{{ p }}</span>
            </div>
          </div>

          <!-- ROLLBACK -->
          <div v-else-if="rightTab === 'Rollback'" class="space-y-3">
            <template v-for="(block, i) in scenario.rollback" :key="i">
              <p
                v-if="typeof block === 'string'"
                class="text-slate-300 text-[12px] leading-relaxed"
                v-html="parseText(block)"
              />
              <div
                v-else-if="block.cmd"
                class="text-emerald-400 bg-slate-800/60 border border-slate-700/50 rounded px-3 py-1.5 text-[11px] leading-snug font-mono whitespace-pre"
              >{{ block.cmd }}</div>
            </template>
          </div>

          <!-- PROBES -->
          <div v-else-if="rightTab === 'Probes'" class="grid grid-cols-2 gap-3">
            <div
              v-for="probe in scenario.probes"
              :key="probe.q"
              class="rounded-lg bg-slate-800/40 border border-slate-700/50 p-3"
            >
              <div class="text-sky-300/80 text-[12px] leading-relaxed mb-2">{{ probe.q }}</div>
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { scenarios } from '@/data/prep/troubleshootingScenarios.js'
import ScenarioSpine from './ScenarioSpine.vue'

const selectedTab = ref(0)
const scenario    = computed(() => scenarios[selectedTab.value])
const rightTab    = ref('Diagnose')

watch(selectedTab, () => { rightTab.value = 'Diagnose' })

function decisionBorderClass(color) {
  if (color === 'amber') return 'border-amber-700/60'
  if (color === 'rose')  return 'border-rose-700/60'
  return 'border-emerald-800/60'
}
function decisionHeaderClass(color) {
  if (color === 'amber') return 'bg-amber-950/60 border-b border-amber-800/40'
  if (color === 'rose')  return 'bg-rose-950/60 border-b border-rose-800/40'
  return 'bg-emerald-950/60 border-b border-emerald-900/40'
}
function decisionTextClass(color) {
  if (color === 'amber') return 'text-amber-300'
  if (color === 'rose')  return 'text-rose-300'
  return 'text-emerald-400'
}

function parseText(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code class="text-emerald-400 font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<span class="text-slate-100 font-semibold">$1</span>')
}
</script>
