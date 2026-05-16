<template>
  <div class="h-full overflow-y-auto p-6 font-mono">

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
    role: 'Software Development Engineer II — Region Services',
    color: '#6366f1',
    insights: [
      'Peer-level — knows what the actual day-to-day work looks like from the inside',
      'This is genuinely two-way: he is also sizing up whether you would be good to work with',
      'Practical and grounded — his questions will be about real operations, not theory',
      'He can tell you things a hiring manager will not say out loud',
    ],
    questions: [
      'What\'s something about working on this team that genuinely surprised you when you first joined?',
      'Is there a type of problem that comes up in this work that you\'ve found yourself actually starting to enjoy?',
    ],
  },
  {
    id: 'bojan',
    name: 'Bojan Smojver',
    role: 'Unknown — Principal Engineer?',
    color: '#10b981',
    insights: [
      'No LinkedIn presence — intentionally low profile, common in cleared/security-adjacent roles',
      'Has contributed patches to the Linux kernel — depth is real, not a line on a CV',
      'Active in Australian Linux and open source community for a long time',
      'Cares about genuine understanding — intellectual honesty lands better than confident wrong answers',
      'Do not try to impress with surface knowledge — ask things you are actually curious about',
    ],
    questions: [
      'Do you still run into Linux behaviour at this scale that genuinely surprises you, or does it start to feel predictable after a while?',
      'Is there a particular area you\'re deep in right now that you find yourself thinking about outside of work?',
    ],
  },
  {
    id: 'michael',
    name: 'Michael Aquilina',
    role: 'Systems Development Manager — Region Services',
    color: '#f97316',
    insights: [
      'Already has context — he saw something in the phone screen and pushed for the loop',
      'Prior relationship is a confidence signal, not a free pass — he still scores independently',
      'He asked the disk space / script question in the phone screen — that pattern may recur',
      'Can speak candidly about the team in a way others in the loop will not',
    ],
    questions: [
      'What\'s something about the culture here that people don\'t fully appreciate until they\'re actually in it?',
      'What would success look like for someone joining the team right now — what would make you think that\'s exactly who we needed?',
    ],
  },
  {
    id: 'baljeet',
    name: 'Baljeet Singh',
    role: 'Engineering Manager — AWS',
    color: '#0ea5e9',
    insights: [
      'Most likely bar raiser — Engineering Manager role gives him full independence from the hiring team',
      '17+ years across cybersecurity, technical leadership, DevSecOps — not a generalist',
      'Previous: Senior Engineering Manager at Commonwealth Bank, Founder at Zyg, Entrepreneur in Residence at Antler',
      'Will push on security thinking — clearance context, IAM, least privilege, audit trails',
      'Bar raiser has effective veto power — perform as if Michael is not in the room',
    ],
    questions: [
      'As an engineering manager here — does that mean you\'re managing other engineering managers as well, or are you working closer to the individual engineers day-to-day?',
      'What\'s the most important thing you\'ve learned about communicating well across those different layers?',
    ],
  },
]
</script>
