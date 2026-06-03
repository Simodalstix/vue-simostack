<template>
  <div class="p-8 min-h-full">

    <div class="mb-8">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">AGSVA · ASD · PSPF</div>
      <h1 class="text-2xl font-bold text-slate-100 mb-1">Clearance</h1>
      <p class="text-[12px] text-slate-500">Process map, adjudicative criteria, referee planning, and document checklist.</p>
    </div>

    <!-- Process stages -->
    <div class="grid grid-cols-3 gap-4 mb-8 max-w-[1400px]">
      <div
        v-for="stage in pvProcess.stages"
        :key="stage.id"
        class="rounded-xl border overflow-hidden"
        :class="stage.status === 'active'
          ? 'bg-amber-950/20 border-amber-700/60'
          : 'bg-slate-800/40 border-slate-700'"
      >
        <div class="px-4 py-3 border-b flex items-center justify-between"
          :class="stage.status === 'active' ? 'border-amber-800/40 bg-amber-950/30' : 'border-slate-700/60 bg-slate-800/60'"
        >
          <div>
            <div class="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
              :class="stage.status === 'active' ? 'text-amber-400' : 'text-slate-500'"
            >{{ stage.who }}</div>
            <div class="text-[14px] font-bold text-slate-100">{{ stage.label }}</div>
            <div class="text-[11px] text-slate-500">{{ stage.full }}</div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <span v-if="stage.status === 'active'"
              class="text-[9px] px-2 py-0.5 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 font-semibold uppercase tracking-wide animate-pulse">
              Active
            </span>
            <span v-else
              class="text-[9px] px-2 py-0.5 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-400 font-semibold uppercase tracking-wide">
              Pending
            </span>
            <span class="text-[10px] text-slate-500 font-mono">{{ stage.timeline }}</span>
          </div>
        </div>
        <div class="px-4 py-3">
          <p class="text-[11px] text-slate-400 leading-relaxed mb-3">{{ stage.description }}</p>
          <ul class="space-y-1">
            <li v-for="item in stage.what" :key="item" class="flex gap-2 text-[11px] text-slate-500">
              <span class="shrink-0 mt-0.5"
                :class="stage.status === 'active' ? 'text-amber-600' : 'text-slate-600'"
              >›</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8 max-w-[1400px]">

      <!-- LEFT: Adjudicative criteria + OSA assessment -->
      <div class="space-y-6">

        <!-- Criteria -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-3">Adjudicative Criteria</div>
          <div class="space-y-2">
            <div v-for="cat in adjudicativeCategories" :key="cat.id"
              class="rounded-lg border px-4 py-3 flex items-start gap-3"
              :class="statusConfig[cat.status].bg + ' ' + statusConfig[cat.status].border"
            >
              <div class="w-2.5 h-2.5 rounded-full shrink-0 mt-1" :style="{ backgroundColor: statusConfig[cat.status].colour }"></div>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-2 mb-0.5">
                  <span class="text-[12px] font-semibold text-slate-200">{{ cat.label }}</span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded-full border font-semibold uppercase tracking-wide shrink-0"
                    :class="statusConfig[cat.status].text + ' ' + statusConfig[cat.status].border"
                    :style="{ backgroundColor: statusConfig[cat.status].colour + '18' }"
                  >{{ statusConfig[cat.status].label }}</span>
                </div>
                <p class="text-[11px] text-slate-400 leading-relaxed">{{ cat.note }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- OSA/Psychological assessment -->
        <div class="rounded-xl bg-amber-950/20 border border-amber-700/50 overflow-hidden">
          <div class="px-4 py-3 border-b border-amber-800/40 bg-amber-950/30">
            <div class="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-0.5">Immediate hurdle</div>
            <div class="text-[14px] font-bold text-slate-100">{{ oha.heading }}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">{{ oha.subheading }}</div>
          </div>
          <div class="px-4 py-4 space-y-3">
            <p class="text-[12px] text-slate-300">{{ oha.purpose }}</p>
            <div class="text-[11px] text-amber-300/80 font-semibold">Duration: {{ oha.duration }}</div>
            <div class="space-y-2 mt-2">
              <div v-for="cat in oha.categories" :key="cat.label"
                class="rounded-lg border px-3 py-2 flex items-start gap-3"
                :class="statusConfig[cat.status].bg + ' ' + statusConfig[cat.status].border"
              >
                <div class="w-2 h-2 rounded-full shrink-0 mt-1" :style="{ backgroundColor: statusConfig[cat.status].colour }"></div>
                <div>
                  <div class="text-[11px] font-semibold text-slate-200 mb-0.5">{{ cat.label }}</div>
                  <div class="text-[11px] text-slate-400 leading-snug">{{ cat.note }}</div>
                </div>
              </div>
            </div>
            <div class="border-l-4 border-amber-600/60 bg-amber-950/30 px-3 py-2.5 rounded-r-lg mt-2">
              <div class="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mb-1">Key principle</div>
              <div class="text-[11px] text-amber-200/70 leading-relaxed">{{ oha.keyPrinciple }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT: Referees + Documents -->
      <div class="space-y-6">

        <!-- Referee planning -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">Referee Planning</div>
          <div class="text-[11px] text-slate-500 mb-3">PV requires 5 referees covering every period of your life since age 16. No gaps allowed.</div>
          <div class="space-y-2">
            <div v-for="ref in referees" :key="ref.id"
              class="rounded-lg border bg-slate-800/50 border-slate-700 px-4 py-3"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <div class="text-[12px] font-semibold text-slate-200 leading-tight">{{ ref.role }}</div>
                <span class="text-[9px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wide shrink-0"
                  :class="refereeStatusConfig[ref.status].text"
                  :style="{
                    borderColor: refereeStatusConfig[ref.status].colour + '60',
                    backgroundColor: refereeStatusConfig[ref.status].colour + '18',
                  }"
                >{{ refereeStatusConfig[ref.status].label }}</span>
              </div>
              <div class="flex items-center gap-3 text-[11px] mb-1.5">
                <span class="text-slate-500">Period:</span>
                <span class="font-mono" :style="{ color: refereeStatusConfig[ref.status].colour }">{{ ref.period }}</span>
                <span class="text-slate-600">—</span>
                <span class="text-slate-400">{{ ref.covering }}</span>
              </div>
              <div class="text-[11px] text-slate-500 italic leading-snug">{{ ref.note }}</div>
            </div>
          </div>
        </div>

        <!-- Document checklist -->
        <div>
          <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-3">Document Checklist — PV</div>

          <div class="rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden mb-3">
            <div class="px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/60">
              <span class="text-[11px] font-semibold text-slate-300">Identity & Personal Documents</span>
            </div>
            <div class="divide-y divide-slate-700/30">
              <div v-for="doc in documents.mandatory" :key="doc.id"
                class="px-4 py-2.5 flex items-start gap-3"
              >
                <div class="w-2 h-2 rounded-full shrink-0 mt-1" :style="{ backgroundColor: documentStatusConfig[doc.status].colour }"></div>
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[12px] text-slate-200">{{ doc.label }}</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded-full border font-semibold uppercase tracking-wide shrink-0"
                      :class="documentStatusConfig[doc.status].text"
                      :style="{
                        borderColor: documentStatusConfig[doc.status].colour + '60',
                        backgroundColor: documentStatusConfig[doc.status].colour + '18',
                      }"
                    >{{ documentStatusConfig[doc.status].label }}</span>
                  </div>
                  <div class="text-[10px] text-slate-500 italic mt-0.5 leading-snug">{{ doc.note }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden">
            <div class="px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/60">
              <span class="text-[11px] font-semibold text-slate-300">Financial Documents</span>
            </div>
            <div class="divide-y divide-slate-700/30">
              <div v-for="doc in documents.financial" :key="doc.id"
                class="px-4 py-2.5 flex items-start gap-3"
              >
                <div class="w-2 h-2 rounded-full shrink-0 mt-1" :style="{ backgroundColor: documentStatusConfig[doc.status].colour }"></div>
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[12px] text-slate-200">{{ doc.label }}</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded-full border font-semibold uppercase tracking-wide shrink-0"
                      :class="documentStatusConfig[doc.status].text"
                      :style="{
                        borderColor: documentStatusConfig[doc.status].colour + '60',
                        backgroundColor: documentStatusConfig[doc.status].colour + '18',
                      }"
                    >{{ documentStatusConfig[doc.status].label }}</span>
                  </div>
                  <div class="text-[10px] text-slate-500 italic mt-0.5">{{ doc.note }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  pvProcess, adjudicativeCategories, referees, refereeStatusConfig,
  documents, documentStatusConfig, oha, statusConfig,
} from '@/data/clearance/clearance.js'
</script>
