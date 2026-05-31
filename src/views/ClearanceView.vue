<template>
  <div class="flex h-screen overflow-hidden bg-slate-900 text-slate-300">

    <!-- Left sidebar -->
    <aside class="w-52 shrink-0 bg-slate-800/80 border-r border-slate-700 flex flex-col">

      <!-- Header -->
      <div class="px-4 py-4 border-b border-slate-700">
        <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-0.5">AGSVA</div>
        <div class="text-[13px] font-semibold text-slate-100">Baseline Profile</div>
        <div class="text-[10px] text-slate-500 mt-0.5">Personal Reference · 2026</div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-2">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeSection = section.id"
          class="w-full text-left px-4 py-3 border-l-2 transition-all duration-100 flex items-center gap-3"
          :class="activeSection === section.id
            ? 'bg-sky-500/10 border-l-sky-400 text-sky-300'
            : 'border-l-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'"
        >
          <span class="text-[16px]">{{ section.icon }}</span>
          <span class="text-[13px] font-medium">{{ section.label }}</span>
        </button>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-3 border-t border-slate-700">
        <div class="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Clearance tier</div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-[11px] text-sky-300 font-semibold">Baseline — Pending</span>
        </div>
      </div>

    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">

      <IdentitySection  v-if="activeSection === 'identity'" />
      <TimelineSection  v-if="activeSection === 'timeline'" />
      <ProfileSection   v-if="activeSection === 'profile'" />
      <AssessmentSection v-if="activeSection === 'assessment'" />

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IdentitySection   from '@/components/clearance/IdentitySection.vue'
import TimelineSection   from '@/components/clearance/TimelineSection.vue'
import ProfileSection    from '@/components/clearance/ProfileSection.vue'
import AssessmentSection from '@/components/clearance/AssessmentSection.vue'

const activeSection = ref('identity')

const sections = [
  { id: 'identity',   label: 'Identity',   icon: '🪪' },
  { id: 'timeline',   label: 'Timeline',   icon: '🗺️' },
  { id: 'profile',    label: 'Profile',    icon: '🔍' },
  { id: 'assessment', label: 'Assessment', icon: '📋' },
]
</script>
