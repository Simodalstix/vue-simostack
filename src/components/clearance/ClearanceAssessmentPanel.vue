<script setup>
import { ref } from 'vue'
import {
  tabs,
  overview,
  foreignTies,
  substance,
  financial,
  mentalHealth,
  employment,
  character,
} from '@/data/clearance/assessmentData.js'

const activeTab = ref('Overview')
</script>

<template>
  <div class="rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden">
    <!-- Tab bar -->
    <div class="flex border-b border-slate-700 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2.5 text-[11px] font-mono whitespace-nowrap transition-colors',
          activeTab === tab
            ? 'text-orange-300 border-b-2 border-orange-400 bg-slate-800/60'
            : 'text-slate-500 hover:text-slate-300',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div class="p-5">

      <!-- Overview -->
      <div v-if="activeTab === 'Overview'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono mb-3">About this assessment</p>
          <div class="flex flex-col gap-1.5">
            <div v-for="(val, key) in overview.about" :key="key">
              <template v-if="key !== 'description'">
                <span class="text-[10px] text-slate-500 font-mono uppercase">{{ key.replace(/([A-Z])/g, ' $1') }}: </span>
                <span class="text-[11px] text-slate-300">{{ val }}</span>
              </template>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed mt-2">{{ overview.about.description }}</p>
          </div>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono mb-3">Profile summary — adjudicative view</p>
          <div class="flex flex-col gap-2">
            <div v-for="cat in overview.categories" :key="cat.label" class="flex items-center gap-3">
              <div
                :class="[
                  'w-2 h-2 rounded-full flex-shrink-0',
                  cat.indicator === 'green' ? 'bg-emerald-400' : 'bg-amber-400',
                ]"
              ></div>
              <span class="text-[11px] text-slate-300 font-mono w-44 flex-shrink-0">{{ cat.label }}</span>
              <span class="text-[11px] text-slate-500 italic">{{ cat.note }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Foreign Ties -->
      <div v-else-if="activeTab === 'Foreign Ties'" class="flex flex-col gap-4">
        <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Jeanie Parker — key facts</p>
        <ul class="flex flex-col gap-1">
          <li v-for="fact in foreignTies.facts" :key="fact" class="text-[11px] text-slate-400 flex gap-2">
            <span class="text-slate-600">·</span>{{ fact }}
          </li>
        </ul>
        <div class="border-l-4 border-amber-600 bg-amber-950/20 px-4 py-3 rounded-r-lg">
          <p class="text-[12px] text-slate-300 leading-relaxed whitespace-pre-line">{{ foreignTies.callout }}</p>
        </div>
      </div>

      <!-- Substance -->
      <div v-else-if="activeTab === 'Substance'" class="flex flex-col gap-4">
        <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Substance disclosure</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
          <div v-for="fact in substance.facts" :key="fact.label" class="flex gap-2">
            <span class="text-[10px] text-slate-500 font-mono uppercase w-40 flex-shrink-0 pt-0.5">{{ fact.label }}</span>
            <span class="text-[11px] text-slate-300">{{ fact.value }}</span>
          </div>
        </div>
        <div class="border-l-4 border-amber-600 bg-amber-950/20 px-4 py-3 rounded-r-lg">
          <p class="text-[12px] text-slate-300 leading-relaxed whitespace-pre-line">{{ substance.callout }}</p>
        </div>
      </div>

      <!-- Financial -->
      <div v-else-if="activeTab === 'Financial'" class="flex flex-col gap-4">
        <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Financial position</p>
        <div class="flex flex-col gap-2">
          <div v-for="fact in financial.facts" :key="fact.label" class="flex gap-2">
            <span class="text-[10px] text-slate-500 font-mono uppercase w-48 flex-shrink-0 pt-0.5">{{ fact.label }}</span>
            <span class="text-[11px] text-slate-300">{{ fact.value }}</span>
          </div>
        </div>
        <div class="border-l-4 border-amber-600 bg-amber-950/20 px-4 py-3 rounded-r-lg">
          <p class="text-[12px] text-slate-300 leading-relaxed whitespace-pre-line">{{ financial.callout }}</p>
        </div>
      </div>

      <!-- Mental Health -->
      <div v-else-if="activeTab === 'Mental Health'" class="flex flex-col gap-4">
        <div class="border-l-4 border-emerald-600 bg-emerald-950/20 px-4 py-3 rounded-r-lg">
          <p class="text-[12px] text-emerald-300 font-semibold">{{ mentalHealth.calloutNote }}</p>
        </div>
        <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Profile facts</p>
        <div class="flex flex-col gap-2">
          <div v-for="fact in mentalHealth.facts" :key="fact.label" class="flex gap-2">
            <span class="text-[10px] text-slate-500 font-mono uppercase w-44 flex-shrink-0 pt-0.5">{{ fact.label }}</span>
            <span class="text-[11px] text-slate-300">{{ fact.value }}</span>
          </div>
        </div>
        <div class="border-l-4 border-emerald-600 bg-emerald-950/20 px-4 py-3 rounded-r-lg">
          <p class="text-[12px] text-slate-300 leading-relaxed whitespace-pre-line">{{ mentalHealth.callout }}</p>
        </div>
      </div>

      <!-- Employment -->
      <div v-else-if="activeTab === 'Employment'" class="flex flex-col gap-4">
        <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Employment timeline</p>
        <div class="overflow-x-auto">
          <table class="w-full text-[11px] font-mono">
            <thead>
              <tr class="text-[9px] uppercase tracking-widest text-slate-500 border-b border-slate-700">
                <th class="text-left pb-2 pr-4">Period</th>
                <th class="text-left pb-2 pr-4">Role</th>
                <th class="text-left pb-2 pr-4">Organisation</th>
                <th class="text-left pb-2 pr-4">Location</th>
                <th class="text-left pb-2">Gaps / notes</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in employment.rows"
                :key="row.period"
                class="border-b border-slate-800 text-slate-400"
              >
                <td class="py-1.5 pr-4 text-slate-500 whitespace-nowrap">{{ row.period }}</td>
                <td class="py-1.5 pr-4 text-slate-200">{{ row.role }}</td>
                <td class="py-1.5 pr-4">{{ row.org }}</td>
                <td class="py-1.5 pr-4 whitespace-nowrap">{{ row.location }}</td>
                <td class="py-1.5 text-slate-500 italic">{{ row.gap }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="border-l-4 border-sky-600 bg-sky-950/20 px-4 py-3 rounded-r-lg">
          <p class="text-[12px] text-slate-300 leading-relaxed">{{ employment.gapNote }}</p>
        </div>
      </div>

      <!-- Character -->
      <div v-else-if="activeTab === 'Character'" class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono mb-3">Professional references</p>
            <ul class="flex flex-col gap-1.5">
              <li v-for="ref in character.professional" :key="ref" class="flex gap-2 text-[11px] text-slate-400">
                <span class="text-slate-600">·</span>{{ ref }}
              </li>
            </ul>
          </div>
          <div>
            <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono mb-3">Personal / character references</p>
            <ul class="flex flex-col gap-1.5">
              <li v-for="ref in character.personal" :key="ref" class="flex gap-2 text-[11px] text-slate-400">
                <span class="text-slate-600">·</span>{{ ref }}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono mb-3">Character notes</p>
          <ul class="flex flex-col gap-1.5">
            <li v-for="note in character.notes" :key="note" class="flex gap-2 text-[11px] text-slate-400">
              <span class="text-emerald-600">·</span>{{ note }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
