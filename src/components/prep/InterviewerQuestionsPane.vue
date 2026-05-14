<template>
  <div class="flex-1 overflow-y-auto p-6 font-mono">

    <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-4">
      Research each interviewer before May 20 — tailor 1–2 questions per person
      based on their role and background.
    </div>

    <div class="grid grid-cols-2 gap-4">

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

        <!-- Insights -->
        <div v-if="interviewer.insights?.length" class="px-4 py-3 border-b border-slate-700/50">
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Key Insights
          </div>
          <ul class="space-y-1">
            <li v-for="(insight, i) in interviewer.insights" :key="i"
                class="flex gap-1.5 items-start text-[11px] text-slate-400 leading-relaxed">
              <span class="text-slate-600 shrink-0 mt-0.5 select-none">›</span>
              <span>{{ insight }}</span>
            </li>
          </ul>
        </div>

        <!-- Questions -->
        <div v-if="interviewer.questions.length" class="px-4 py-3 space-y-2">
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Questions to Ask
          </div>
          <div v-for="(q, i) in interviewer.questions" :key="i"
               class="text-[12px] text-slate-300 leading-relaxed italic border-l-2 pl-3"
               :style="{ borderColor: interviewer.color }">
            {{ q }}
          </div>
        </div>
        <div v-else class="px-4 py-3">
          <div class="text-[11px] text-slate-600 italic">
            No questions added yet — research LinkedIn and add before the loop.
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
    role: 'SDE II — Region Services',
    color: '#6366f1',
    insights: [
      'Peer-level interviewer — likely assessing day-to-day technical fit',
      'SDE II on the team you would join — knows what the actual work looks like',
      'Questions from him will be practical and grounded in real operations',
      'This is a two-way conversation — he is also selling you on the team',
    ],
    questions: [
      'What does a typical on-call week actually look like, and how does the team run postmortems when something goes wrong?',
      'What separates the engineers who thrive on this team from the ones who struggle?',
    ],
  },
  {
    id: 'bojan',
    name: 'Bojan Smojver',
    role: 'AWS — no public profile',
    color: '#10b981',
    insights: [
      'No LinkedIn presence — intentionally low profile, common in cleared/security-adjacent roles',
      'Has contributed patches to the Linux kernel — LZO hibernation performance (2011)',
      'Active in Australian Linux/security community since at least 2002',
      'Depth over breadth — cares about genuine understanding, not command recall',
      'Will respect intellectual honesty and "I don\'t know but here\'s how I\'d find out"',
      'Do not try to impress with surface knowledge — he will see through it immediately',
    ],
    questions: [
      'What\'s the most interesting low-level system behaviour you\'ve encountered operating at AWS scale?',
      'How does working with Linux at this scale change how you think about problems you\'d normally solve differently on a single machine?',
    ],
  },
  {
    id: 'michael',
    name: 'Michael Aquilina',
    role: 'Hiring Manager — Region Services',
    color: '#f97316',
    insights: [
      'Already has context from the phone screen — he advocated for you to get this loop',
      'Knows your background and saw something worth pursuing',
      'Will likely cover motivation, fit, and technical depth — not just process knowledge',
      'Prior relationship is a confidence signal, not a scoring advantage — still scores independently',
      'He asked the disk space / script question in the phone screen — that pattern may recur',
    ],
    questions: [
      'What made you build Region Services the way you have — what problem were you specifically solving?',
      'What does the on-call rotation look like in practice, and how has the team improved it over time?',
    ],
  },
  {
    id: 'baljeet',
    name: 'Baljeet Singh',
    role: 'Engineering Manager — AWS (Mar 2025)',
    color: '#0ea5e9',
    insights: [
      'Most likely bar raiser — EM role gives him independence from the hiring team',
      '17+ years in cybersecurity and technical leadership — not a generalist',
      'Previous: Senior EM at Commonwealth Bank, Founder at Zyg (DevSecOps consultancy), EIR at Antler',
      'Deep specialisation: cloud security at scale, DevSecOps, containers, Kubernetes',
      'Will push on security thinking — clearance context, IAM, least privilege, audit trails',
      'Bar raiser has effective veto power — must perform as if Michael is not in the room',
      'Expect LP-heavy questions — he will probe ownership, dive deep, earn trust specifically',
    ],
    questions: [
      'With the clearance requirement and isolated regions, how does the security posture here differ from commercial AWS — and what does that mean for how engineers operate day to day?',
      'What does the intersection of DevSecOps and systems engineering look like on this team?',
    ],
  },
]
</script>
