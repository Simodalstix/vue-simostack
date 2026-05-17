<template>
  <div class="flex h-screen overflow-hidden font-mono bg-slate-900 text-slate-300">

    <!-- Sidebar -->
    <aside class="w-[200px] shrink-0 bg-slate-800 border-r border-slate-700 overflow-y-auto flex flex-col">
      <div class="px-3 py-2.5 border-b border-slate-700">
        <span class="text-[10px] uppercase tracking-widest text-slate-400">Interview Prep</span>
      </div>

      <nav class="flex-1">
        <div v-for="section in sections" :key="section.id">
          <button
            @click="toggleSection(section.id)"
            class="w-full text-left px-3 py-2 text-[13px] font-semibold flex justify-between items-center border-b border-slate-700/60 transition-colors duration-100"
            :class="activeSection === section.id
              ? 'bg-orange-500/20 text-orange-300 border-l-2 border-l-orange-400'
              : 'text-slate-300 hover:bg-slate-700/40 hover:text-white border-l-2 border-l-transparent'"
          >
            <span>{{ section.label }}</span>
            <span v-if="section.tabs.length" class="text-[10px] opacity-60">{{ activeSection === section.id ? '▾' : '▸' }}</span>
          </button>

          <div v-if="activeSection === section.id && section.tabs.length">
            <button
              v-for="tab in section.tabs"
              :key="tab.id"
              @click="setTab(section.id, tab.id)"
              class="w-full text-left pl-5 pr-3 py-1.5 text-[12px] border-b border-slate-700/30 transition-colors duration-100"
              :class="activeKey === section.id + '-' + tab.id
                ? 'text-white bg-slate-700 border-l-2 border-l-slate-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 border-l-2 border-l-transparent'"
            >
              <div class="flex items-center justify-between gap-1">
                <span>{{ tab.label }}</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <!-- STAR Stories — pinned -->
      <div class="border-t border-slate-600 shrink-0 mb-8">
        <div class="px-3 py-2 border-b border-slate-700/60">
          <span class="text-[10px] uppercase tracking-widest text-orange-400/80 font-semibold">STAR Stories</span>
        </div>
        <button
          v-for="tab in starSection.tabs"
          :key="tab.id"
          @click="setTab('star', tab.id)"
          class="w-full text-left pl-3 pr-2 py-1.5 text-[12px] border-b border-slate-700/30 border-l-[5px] transition-colors duration-100"
          :class="activeKey === 'star-' + tab.id
            ? 'text-slate-100 bg-slate-700/60'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'"
          :style="{ borderLeftColor: lpBorderColor(tab.id, activeKey === 'star-' + tab.id) }"
        >
          <div class="flex items-center justify-between gap-1 min-w-0">
            <span class="truncate">{{ tab.label }}</span>
            <span v-if="secondaryLps(tab.id).length" class="flex gap-px shrink-0 ml-1">
              <span
                v-for="lp in secondaryLps(tab.id)"
                :key="lp"
                class="block w-1.5 h-4 rounded-sm"
                :style="{ backgroundColor: LP_HEX[lp] || '#475569', opacity: activeKey === 'star-' + tab.id ? '0.8' : '0.55' }"
                :title="lp"
              />
            </span>
          </div>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main
      class="flex-1 bg-slate-900 text-slate-300"
      :class="(['career', 'scenarios', 'linux', 'aws', 'questions', 'projects', 'python', 'proxmox'].includes(activeSection)) ? 'overflow-hidden' : 'overflow-y-auto p-6'"
    >

      <!-- Linux Raw -->
      <LinuxRawPane v-if="activeSection === 'linux'" />

      <!-- AWS & Systems -->
      <AwsRawPane v-if="activeSection === 'aws'" />

      <!-- Python -->
      <PythonPane v-if="activeSection === 'python'" />

      <!-- Proxmox & Networking -->
      <ProxmoxNetPane v-if="activeSection === 'proxmox'" />

      <!-- STAR Stories -->
      <div v-if="activeKey === 'star-duo-mfa'">
        <CareerCard :card="starComplexCards[0]" />
      </div>
      <div v-if="activeKey === 'star-packer-pipeline'">
        <CareerCard :card="starComplexCards[1]" />
      </div>
      <div v-if="activeKey === 'star-difficult-client'">
        <CareerCard :card="starDifficultClientCards[0]" />
      </div>
      <div v-if="activeKey === 'star-above-beyond'">
        <CareerCard :card="starDifficultClientCards[1]" />
      </div>
      <div v-if="activeKey === 'star-disagree-commit'">
        <CareerCard :card="starDisagreeCommitCards[0]" />
      </div>
      <div v-if="activeKey === 'star-highest-standards'">
        <CareerCard :card="starHighestStandardsCards[0]" />
      </div>
      <div v-if="activeKey === 'star-invent-simplify'">
        <CareerCard :card="starInventSimplifyCards[0]" />
      </div>
      <div v-if="activeKey === 'star-learn-curious'">
        <CareerCard :card="starLearnCuriousCards[0]" />
      </div>

      <!-- Career Map -->
      <CareerMapView v-if="activeSection === 'career'" />

      <!-- Scenarios -->
      <TroubleshootingPane v-if="activeSection === 'scenarios'" />

      <!-- Questions to Ask -->
      <InterviewerQuestionsPane v-if="activeSection === 'questions'" />

      <!-- Projects -->
      <ProjectsPane v-if="activeSection === 'projects'" />

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CareerCard          from '@/components/prep/CareerCard.vue'
import CareerMapView       from '@/components/prep/CareerMapView.vue'
import TroubleshootingPane from '@/components/prep/TroubleshootingPane.vue'
import LinuxRawPane        from '@/components/prep/LinuxRawPane.vue'
import AwsRawPane          from '@/components/prep/AwsRawPane.vue'
import PythonPane                 from '@/components/prep/PythonPane.vue'
import ProxmoxNetPane             from '@/components/prep/ProxmoxNetPane.vue'
import InterviewerQuestionsPane  from '@/components/prep/InterviewerQuestionsPane.vue'
import ProjectsPane              from '@/components/prep/ProjectsPane.vue'
import { starComplexCards }          from '@/data/prep/starComplexCards.js'
import { starDifficultClientCards }  from '@/data/prep/starDifficultClientCards.js'
import { starDisagreeCommitCards }     from '@/data/prep/starDisagreeCommitCards.js'
import { starHighestStandardsCards }  from '@/data/prep/starHighestStandardsCards.js'
import { starInventSimplifyCards }    from '@/data/prep/starInventSimplifyCards.js'
import { starLearnCuriousCards }      from '@/data/prep/starLearnCuriousCards.js'

const starSection = {
  id: 'star',
  label: 'STAR Stories',
  tabs: [
    { id: 'duo-mfa',           label: 'Dive Deep' },
    { id: 'learn-curious',     label: 'Bias for Action' },
    { id: 'difficult-client',  label: 'Bias for Action' },
    { id: 'above-beyond',      label: 'Customer Obsession' },
    { id: 'disagree-commit',   label: 'Disagree & Commit' },
    { id: 'highest-standards', label: 'Highest Standards' },
    { id: 'invent-simplify',   label: 'Invent & Simplify' },
    { id: 'packer-pipeline',   label: 'Learn & Be Curious' },
  ],
}

const sections = [
  {
    id: 'linux',
    label: 'Linux Raw',
    tabs: [],
  },
  {
    id: 'aws',
    label: 'AWS & Systems',
    tabs: [],
  },
  {
    id: 'python',
    label: 'Python',
    tabs: [],
  },
  {
    id: 'proxmox',
    label: 'Proxmox & Networking',
    tabs: [],
  },
  {
    id: 'career',
    label: 'Career & Values',
    tabs: [],
  },
  {
    id: 'scenarios',
    label: 'Scenarios',
    tabs: [],
  },
  {
    id: 'questions',
    label: 'Questions to Ask',
    tabs: [],
  },
  {
    id: 'projects',
    label: 'Projects',
    tabs: [],
  },
]

import { LP_HEX } from '@/data/prep/lpConstants.js'

const starTabLps = {
  'duo-mfa':           starComplexCards[0]?.lps          ?? [],
  'packer-pipeline':   starComplexCards[1]?.lps          ?? [],
  'difficult-client':  starDifficultClientCards[0]?.lps  ?? [],
  'above-beyond':      starDifficultClientCards[1]?.lps  ?? [],
  'disagree-commit':   starDisagreeCommitCards[0]?.lps   ?? [],
  'highest-standards': starHighestStandardsCards[0]?.lps ?? [],
  'invent-simplify':   starInventSimplifyCards[0]?.lps   ?? [],
  'learn-curious':     starLearnCuriousCards[0]?.lps    ?? [],
}

const activeSection = ref('linux')
const activeTab     = ref('processes')

const activeKey = computed(() => `${activeSection.value}-${activeTab.value}`)


function lpBorderColor(tabId, isActive) {
  const lps = starTabLps[tabId] ?? []
  const hex = LP_HEX[lps[0]] || '#475569'
  return isActive ? hex + 'ee' : hex + '90'
}

function secondaryLps(tabId) {
  return (starTabLps[tabId] ?? []).slice(1)
}

function toggleSection(sectionId) {
  if (activeSection.value !== sectionId) {
    activeSection.value = sectionId
    const section = sections.find(s => s.id === sectionId)
    activeTab.value = section.tabs.length ? section.tabs[0].id : ''
  }
}

function setTab(sectionId, tabId) {
  activeSection.value = sectionId
  activeTab.value = tabId
}
</script>
