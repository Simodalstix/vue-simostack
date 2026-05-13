<template>
  <div class="flex-1 overflow-y-auto p-6 font-mono">

    <div class="max-w-2xl space-y-4">

      <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-6">
        Research each interviewer before May 20 — tailor 1–2 questions per person
        based on their role and background.
      </div>

      <div
        v-for="interviewer in interviewers"
        :key="interviewer.id"
        class="rounded-xl bg-slate-800/50 border border-slate-700 border-l-2 overflow-hidden"
        :style="{ borderLeftColor: interviewer.color }"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b border-slate-700/50 bg-slate-800/60">
          <div class="text-[11px] font-semibold tracking-widest uppercase mb-0.5"
               :style="{ color: interviewer.color }">
            {{ interviewer.name }}
          </div>
          <div class="text-[12px] text-slate-400">{{ interviewer.role }}</div>
        </div>

        <!-- Questions area -->
        <div class="px-4 py-3 space-y-2">
          <div v-if="interviewer.questions.length === 0"
               class="text-[11px] text-slate-600 italic">
            No questions added yet — research LinkedIn and add before the loop.
          </div>
          <div
            v-for="(q, i) in interviewer.questions"
            :key="i"
            class="flex gap-2 items-start text-[12px] text-slate-300 leading-relaxed"
          >
            <span class="text-slate-600 shrink-0 mt-0.5 select-none">›</span>
            <span>{{ q }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const interviewers = [
  {
    id: 'joel',
    name: 'Joel Pollett',
    role: 'SDE II — likely bar raiser',
    color: '#6366f1',
    questions: [],
  },
  {
    id: 'bojan',
    name: 'Bojan Smojver',
    role: 'Interviewer',
    color: '#10b981',
    questions: [],
  },
  {
    id: 'michael',
    name: 'Michael Aquilina',
    role: 'Hiring Manager',
    color: '#f97316',
    questions: [],
  },
  {
    id: 'baljeet',
    name: 'Baljeet Singh',
    role: 'Interviewer',
    color: '#0ea5e9',
    questions: [],
  },
]
</script>
