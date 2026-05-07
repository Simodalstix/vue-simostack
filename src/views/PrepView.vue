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
            <span class="text-[10px] opacity-60">{{ activeSection === section.id ? '▾' : '▸' }}</span>
          </button>

          <div v-if="activeSection === section.id">
            <button
              v-for="tab in section.tabs"
              :key="tab.id"
              @click="setTab(section.id, tab.id)"
              class="w-full text-left pl-5 pr-3 py-1.5 text-[12px] border-b border-slate-700/30 transition-colors duration-100"
              :class="activeKey === section.id + '-' + tab.id
                ? 'text-white bg-slate-700 border-l-2 border-l-slate-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 border-l-2 border-l-transparent'"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto bg-slate-900 p-6 text-slate-300">

      <!-- Linux Raw -->
      <div v-if="activeKey === 'linux-processes'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="proc.col1" />
        <PrepCodeBlock :code="proc.col2" />
        <PrepCodeBlock :code="proc.col3" />
      </div>
      <div v-if="activeKey === 'linux-logs'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="logs.col1" />
        <PrepCodeBlock :code="logs.col2" />
        <PrepCodeBlock :code="logs.col3" />
      </div>
      <div v-if="activeKey === 'linux-networking'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="net.col1" />
        <PrepCodeBlock :code="net.col2" />
        <PrepCodeBlock :code="net.col3" />
      </div>
      <div v-if="activeKey === 'linux-permissions'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="perms.col1" />
        <PrepCodeBlock :code="perms.col2" />
        <PrepCodeBlock :code="perms.col3" />
      </div>
      <div v-if="activeKey === 'linux-disk'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="disk.col1" />
        <PrepCodeBlock :code="disk.col2" />
        <PrepCodeBlock :code="disk.col3" />
      </div>
      <div v-if="activeKey === 'linux-scripting'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="script.col1" />
        <PrepCodeBlock :code="script.col2" />
        <PrepCodeBlock :code="script.col3" />
      </div>

      <!-- AWS & Systems -->
      <div v-if="activeKey === 'aws-net-fundamentals'" class="h-full overflow-y-auto">
        <PrepCards :cards="netFundCards" />
      </div>
      <div v-if="activeKey === 'aws-cloud-aws'" class="h-full overflow-y-auto">
        <PrepCards :cards="cloudAwsCards" />
      </div>
      <div v-if="activeKey === 'aws-compute'" class="h-full overflow-y-auto">
        <PrepCards :cards="computeCards" />
      </div>
      <div v-if="activeKey === 'aws-data-messaging'" class="h-full overflow-y-auto">
        <PrepCards :cards="dataMessagingCards" />
      </div>
      <div v-if="activeKey === 'aws-observability'" class="h-full overflow-y-auto">
        <PrepCards :cards="observabilityCards" />
      </div>
      <div v-if="activeKey === 'aws-ha-dr'" class="h-full overflow-y-auto">
        <PrepCards :cards="haDrCards" />
      </div>
      <div v-if="activeKey === 'aws-security'" class="h-full overflow-y-auto">
        <PrepCards :cards="securityCards" />
      </div>
      <div v-if="activeKey === 'aws-iac'" class="h-full overflow-y-auto">
        <PrepCards :cards="iacCards" />
      </div>

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
      <div v-if="activeKey === 'star-invent-simplify'">
        <CareerCard :card="starInventSimplifyCards[0]" />
      </div>

      <!-- Career & Values -->
      <div v-if="activeKey === 'career-narrative'" class="flex flex-col gap-4">
        <CareerCard v-for="(card, i) in careerNarrativeCards" :key="i" :card="card" />
      </div>
      <div v-if="activeKey === 'career-why-aws'" class="flex flex-col gap-4">
        <CareerCard v-for="(card, i) in careerWhyAwsCards" :key="i" :card="card" />
      </div>
      <div v-if="activeKey === 'career-values'" class="flex flex-col gap-4">
        <CareerCard v-for="(card, i) in careerValuesCards" :key="i" :card="card" />
      </div>
      <div v-if="activeKey === 'career-questions'" class="flex flex-col gap-4">
        <CareerCard v-for="(card, i) in careerQuestionsCards" :key="i" :card="card" />
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PrepCodeBlock from '@/components/prep/PrepCodeBlock.vue'
import PrepCards    from '@/components/prep/PrepCards.vue'
import CareerCard   from '@/components/prep/CareerCard.vue'

import { proc }                 from '@/data/prep/proc.js'
import { logs }                 from '@/data/prep/logs.js'
import { net }                  from '@/data/prep/net.js'
import { perms }                from '@/data/prep/perms.js'
import { disk }                 from '@/data/prep/disk.js'
import { script }               from '@/data/prep/script.js'
import { netFundCards }         from '@/data/prep/netFundCards.js'
import { cloudAwsCards }        from '@/data/prep/cloudAwsCards.js'
import { computeCards }         from '@/data/prep/computeCards.js'
import { dataMessagingCards }   from '@/data/prep/dataMessagingCards.js'
import { observabilityCards }   from '@/data/prep/observabilityCards.js'
import { haDrCards }            from '@/data/prep/haDrCards.js'
import { securityCards }        from '@/data/prep/securityCards.js'
import { iacCards }             from '@/data/prep/iacCards.js'
import { starComplexCards }          from '@/data/prep/starComplexCards.js'
import { starDifficultClientCards }  from '@/data/prep/starDifficultClientCards.js'
import { starDisagreeCommitCards }   from '@/data/prep/starDisagreeCommitCards.js'
import { starInventSimplifyCards }   from '@/data/prep/starInventSimplifyCards.js'
import { careerNarrativeCards }      from '@/data/prep/careerNarrative.js'
import { careerWhyAwsCards }    from '@/data/prep/careerWhyAws.js'
import { careerValuesCards }    from '@/data/prep/careerValues.js'
import { careerQuestionsCards } from '@/data/prep/careerQuestions.js'

const sections = [
  {
    id: 'linux',
    label: 'Linux Raw',
    tabs: [
      { id: 'processes',   label: 'Processes & Services' },
      { id: 'logs',        label: 'Logs & Text Processing' },
      { id: 'networking',  label: 'Networking' },
      { id: 'permissions', label: 'Permissions & Security' },
      { id: 'disk',        label: 'Disk & Filesystem' },
      { id: 'scripting',   label: 'Scripting' },
    ],
  },
  {
    id: 'aws',
    label: 'AWS & Systems',
    tabs: [
      { id: 'net-fundamentals', label: 'Networking Fundamentals' },
      { id: 'cloud-aws',        label: 'Cloud & AWS Foundations' },
      { id: 'compute',          label: 'Compute & Scaling' },
      { id: 'data-messaging',   label: 'Data & Messaging' },
      { id: 'observability',    label: 'Observability' },
      { id: 'ha-dr',            label: 'HA & DR Patterns' },
      { id: 'security',         label: 'Security Posture' },
      { id: 'iac',              label: 'IaC — CDK & Terraform' },
    ],
  },
  {
    id: 'star',
    label: 'STAR Stories',
    tabs: [
      { id: 'duo-mfa',          label: 'Duo MFA Incident' },
      { id: 'packer-pipeline',  label: 'Packer Pipeline' },
      { id: 'difficult-client', label: 'Difficult Client' },
      { id: 'above-beyond',     label: 'Above & Beyond' },
      { id: 'disagree-commit',  label: 'Disagree & Commit' },
      { id: 'invent-simplify',  label: 'Invent & Simplify' },
    ],
  },
  {
    id: 'career',
    label: 'Career & Values',
    tabs: [
      { id: 'narrative', label: 'Career Narrative' },
      { id: 'why-aws',   label: 'Why AWS & This Role' },
      { id: 'values',    label: 'Values & Self-Awareness' },
      { id: 'questions', label: 'Questions to Ask' },
    ],
  },
]

const activeSection = ref('linux')
const activeTab     = ref('processes')

const activeKey = computed(() => `${activeSection.value}-${activeTab.value}`)

function toggleSection(sectionId) {
  if (activeSection.value !== sectionId) {
    activeSection.value = sectionId
    activeTab.value = sections.find(s => s.id === sectionId).tabs[0].id
  }
}

function setTab(sectionId, tabId) {
  activeSection.value = sectionId
  activeTab.value = tabId
}
</script>
