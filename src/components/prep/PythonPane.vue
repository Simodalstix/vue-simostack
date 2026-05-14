<template>
  <div class="flex h-full overflow-hidden font-mono">

    <!-- LEFT column -->
    <div class="flex-[2] overflow-y-auto p-5 border-r border-slate-700/60 space-y-6">

      <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold pb-1.5 border-b border-slate-700/40">
        Python for Systems Engineers
      </div>

      <!-- When Python wins -->
      <div>
        <div class="text-[11px] text-slate-300 leading-relaxed mb-3">
          Reach for Python when bash becomes unwieldy: structured data, AWS SDK calls,
          multi-step logic with error handling, or when you need something testable and maintainable.
        </div>
        <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-2">When Python wins over bash</div>
        <ul class="space-y-1">
          <li v-for="point in whenPython" :key="point" class="flex gap-2 text-[11px] text-slate-300">
            <span class="text-orange-400/50 shrink-0">›</span>{{ point }}
          </li>
        </ul>
      </div>

      <!-- Left scripts -->
      <div v-for="script in leftScripts" :key="script.id" class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">{{ script.heading }}</span>
          <div class="flex gap-1 ml-auto flex-wrap justify-end">
            <span v-for="tag in script.tags" :key="tag"
                  class="px-1.5 py-0.5 text-[9px] bg-slate-700/80 text-slate-300 rounded font-mono">{{ tag }}</span>
            <span class="px-1.5 py-0.5 text-[9px] bg-emerald-900/50 text-emerald-400 rounded">stdlib</span>
          </div>
        </div>
        <div class="px-3 py-2 border-b border-slate-700/40 grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">What it demonstrates</div>
            <div class="text-slate-400 leading-relaxed">{{ script.demonstrates }}</div>
          </div>
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">When to use</div>
            <div class="text-slate-400 leading-relaxed">{{ script.whenToUse }}</div>
          </div>
        </div>
        <div class="border-b border-slate-700/40">
          <PrepCodeBlock :code="script.code" />
        </div>
        <div class="px-3 py-2 bg-amber-950/20 flex items-start gap-2 text-[11px]">
          <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold shrink-0 mt-px">In the interview</span>
          <span class="text-slate-300 leading-relaxed">{{ script.interview }}</span>
        </div>
      </div>

    </div>

    <!-- RIGHT column -->
    <div class="flex-[3] overflow-y-auto p-5 space-y-6">

      <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold pb-1.5 border-b border-slate-700/40">
        Operational Scripts
      </div>

      <div v-for="script in rightScripts" :key="script.id" class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">{{ script.heading }}</span>
          <div class="flex gap-1 ml-auto flex-wrap justify-end">
            <span v-for="tag in script.tags" :key="tag"
                  class="px-1.5 py-0.5 text-[9px] bg-slate-700/80 text-slate-300 rounded font-mono">{{ tag }}</span>
            <span class="px-1.5 py-0.5 text-[9px] rounded"
                  :class="script.stdlib ? 'bg-emerald-900/50 text-emerald-400' : 'bg-sky-900/50 text-sky-300'">
              {{ script.stdlib ? 'stdlib' : 'boto3' }}
            </span>
          </div>
        </div>
        <div class="px-3 py-2 border-b border-slate-700/40 grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">What it demonstrates</div>
            <div class="text-slate-400 leading-relaxed">{{ script.demonstrates }}</div>
          </div>
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">When to use</div>
            <div class="text-slate-400 leading-relaxed">{{ script.whenToUse }}</div>
          </div>
        </div>
        <div class="border-b border-slate-700/40">
          <PrepCodeBlock :code="script.code" />
        </div>
        <div class="px-3 py-2 bg-amber-950/20 flex items-start gap-2 text-[11px]">
          <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold shrink-0 mt-px">In the interview</span>
          <span class="text-slate-300 leading-relaxed">{{ script.interview }}</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { pythonScripts, operationalScripts } from '@/data/prep/iacPythonData.js'

const whenPython = [
  'Log parsing at scale — Counter, regex, structured output',
  'AWS SDK (boto3) — describe resources, check health, act on state',
  'Multi-step logic with real error handling and exit codes',
  'Health checking fleets — urllib, requests, iterate over a list',
  'When you need the script to be testable and maintainable',
]

const allScripts = [...pythonScripts, ...operationalScripts]
const leftScripts  = allScripts.slice(0, 2)   // log parser, health checker
const rightScripts = allScripts.slice(2)        // boto3, disk, db monitor
</script>
