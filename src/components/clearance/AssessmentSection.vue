<template>
  <div class="p-5 min-h-full">

    <div class="mb-6">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">AGSVA · PSPF</div>
      <h1 class="text-2xl font-bold text-slate-100">Assessment</h1>
    </div>

    <div class="grid grid-cols-2 gap-6">

      <!-- LEFT: Adjudicative criteria -->
      <div class="space-y-5">
        <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold">
          Adjudicative Categories — Baseline
        </div>
        <p class="text-[12px] text-slate-400 leading-relaxed">
          AGSVA assesses suitability against the PSPF adjudicative criteria.
          This is not a pass/fail checklist — it's a holistic assessment of
          whether a person could be susceptible to coercion or compromise.
          Voluntary, honest disclosure across all categories is itself a
          positive character indicator.
        </p>

        <div class="space-y-2">
          <div v-for="cat in adjudicativeCategories" :key="cat.id"
            class="rounded-lg border px-4 py-3.5 flex items-start gap-4"
            :class="statusConfig[cat.status].border + ' ' + statusConfig[cat.status].bg"
          >
            <!-- Indicator -->
            <div class="shrink-0 mt-0.5 flex flex-col items-center gap-1">
              <div class="w-2.5 h-2.5 rounded-full"
                :style="{ backgroundColor: statusConfig[cat.status].colour }">
              </div>
            </div>
            <!-- Content -->
            <div class="flex-1">
              <div class="flex items-center justify-between gap-3 mb-1">
                <span class="text-[12px] font-semibold text-slate-200">{{ cat.label }}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wide"
                  :class="statusConfig[cat.status].text + ' ' + statusConfig[cat.status].border"
                  :style="{ backgroundColor: statusConfig[cat.status].colour + '18' }"
                >{{ statusConfig[cat.status].label }}</span>
              </div>
              <p class="text-[11px] text-slate-400 leading-relaxed">{{ cat.note }}</p>
            </div>
          </div>
        </div>

        <!-- PSPF note -->
        <div class="border-l-4 border-emerald-600/60 bg-emerald-950/20 px-4 py-3 rounded-r-lg">
          <div class="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold mb-1">PSPF Guidance</div>
          <div class="text-[12px] text-emerald-200/70 leading-relaxed">
            The Protective Security Policy Framework explicitly states that treated mental
            health conditions are not a barrier to security clearance. Clearance decisions
            are holistic — not automatic refusals on any single category.
          </div>
        </div>
      </div>

      <!-- RIGHT: OHA -->
      <div class="space-y-5">
        <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold">
          {{ oha.heading }}
        </div>

        <div class="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4 space-y-2">
          <div class="text-[13px] font-semibold text-slate-100 mb-1">{{ oha.subheading }}</div>
          <p class="text-[12px] text-slate-400 leading-relaxed">{{ oha.purpose }}</p>
        </div>

        <div class="space-y-3">
          <div v-for="cat in oha.categories" :key="cat.label"
            class="rounded-lg border px-4 py-3.5 flex items-start gap-4"
            :class="statusConfig[cat.status].border + ' ' + statusConfig[cat.status].bg"
          >
            <div class="shrink-0 mt-0.5">
              <div class="w-2.5 h-2.5 rounded-full"
                :style="{ backgroundColor: statusConfig[cat.status].colour }">
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between gap-3 mb-1">
                <span class="text-[12px] font-semibold text-slate-200">{{ cat.label }}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wide"
                  :class="statusConfig[cat.status].text + ' ' + statusConfig[cat.status].border"
                  :style="{ backgroundColor: statusConfig[cat.status].colour + '18' }"
                >{{ statusConfig[cat.status].label }}</span>
              </div>
              <p class="text-[11px] text-slate-400 leading-relaxed">{{ cat.note }}</p>
            </div>
          </div>
        </div>

        <!-- Key principle callout -->
        <div class="border-l-4 border-sky-600/60 bg-sky-950/20 px-4 py-3 rounded-r-lg">
          <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1.5">Key principle</div>
          <div class="text-[12px] text-sky-200/70 leading-relaxed">{{ oha.keyPrinciple }}</div>
        </div>

        <!-- Status legend -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4">
          <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">Legend</div>
          <div class="space-y-2">
            <div v-for="(cfg, key) in statusConfig" :key="key" class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: cfg.colour }"></div>
              <span class="text-[11px] font-semibold" :class="cfg.text">{{ cfg.label }}</span>
              <span class="text-[11px] text-slate-500">—
                <template v-if="key === 'clear'">No concerns identified</template>
                <template v-if="key === 'noted'">Disclosure item — documented and understood</template>
                <template v-if="key === 'context'">Requires context to assess</template>
              </span>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-slate-700/50">
            <p class="text-[11px] text-slate-500 italic">
              No category is rated as "concerning" — this profile contains no material red flags.
              "Noted" items are standard disclosures that require documentation, not automatic adverse findings.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { adjudicativeCategories, oha, statusConfig } from '@/data/clearance/assessment.js'
</script>
