<template>
  <div class="p-5 min-h-full">

    <div class="mb-6">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">Clearance-Relevant</div>
      <h1 class="text-2xl font-bold text-slate-100">Profile</h1>
    </div>

    <div class="grid grid-cols-2 gap-6">

      <!-- LEFT: Foreign Associations -->
      <div class="space-y-5">
        <div class="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
          {{ foreignAssociations.heading }}
        </div>

        <p class="text-[13px] text-slate-300 leading-relaxed">{{ foreignAssociations.summary }}</p>

        <!-- Jeanie detail card -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-700/60 bg-slate-800/80 flex items-center justify-between">
            <div>
              <div class="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-0.5">Spouse</div>
              <div class="text-[14px] font-bold text-slate-100">Jeanie Parker</div>
            </div>
            <div class="flex gap-2">
              <FlagIcon v-for="f in foreignAssociations.jeanie.currentFlags" :key="f" :code="f" size="md" />
            </div>
          </div>
          <div class="px-5 py-4 space-y-2.5">
            <InfoRow label="Born" :value="foreignAssociations.jeanie.born" />
            <InfoRow label="Current citizenship" :value="foreignAssociations.jeanie.currentCitizenship.join(' + ')" />
            <InfoRow label="Residence" :value="foreignAssociations.jeanie.residence" />
            <InfoRow label="Employment" :value="foreignAssociations.jeanie.employment" />
            <InfoRow label="Prior foreign work" :value="foreignAssociations.jeanie.priorForeignEmployment" />
            <InfoRow label="Foreign assets" :value="foreignAssociations.jeanie.foreignAssets" />
            <InfoRow label="Family in HK" :value="foreignAssociations.jeanie.familyInHK" />
            <InfoRow label="Gov't links" :value="foreignAssociations.jeanie.governmentLinks" />
          </div>
        </div>

        <!-- HK travel -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4">
          <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">Travel to Hong Kong</div>
          <div class="space-y-2">
            <div v-for="t in foreignAssociations.travelToHK" :key="t.year"
              class="flex items-center gap-3 text-[12px]">
              <FlagIcon code="hk" label="Hong Kong" size="sm" />
              <span class="text-sky-400 font-mono">{{ t.year }}</span>
              <span class="text-slate-400">{{ t.context }}</span>
            </div>
          </div>
        </div>

        <!-- Assessment callout -->
        <div class="border-l-4 border-sky-600/60 bg-sky-950/20 px-4 py-3 rounded-r-lg">
          <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1.5">Assessment framing</div>
          <div class="text-[12px] text-sky-200/70 leading-relaxed">{{ foreignAssociations.assessment }}</div>
        </div>

        <div class="border-l-4 border-amber-600/60 bg-amber-950/20 px-4 py-3 rounded-r-lg">
          <div class="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-1.5">Context</div>
          <div class="text-[12px] text-amber-200/70 leading-relaxed">{{ foreignAssociations.context }}</div>
        </div>
      </div>

      <!-- RIGHT: Financial -->
      <div class="space-y-5">
        <div class="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
          {{ financial.heading }}
        </div>

        <p class="text-[13px] text-slate-300 leading-relaxed">{{ financial.summary }}</p>

        <!-- Financial items -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 overflow-hidden divide-y divide-slate-700/50">
          <div v-for="item in financial.items" :key="item.label"
            class="px-5 py-3.5 flex items-start gap-4">
            <!-- Status dot -->
            <div class="shrink-0 mt-1">
              <div class="w-2 h-2 rounded-full"
                :class="{
                  'bg-emerald-400': item.status === 'clear',
                  'bg-amber-400':   item.status === 'noted',
                  'bg-slate-500':   item.status === 'normal',
                }"
              ></div>
            </div>
            <div class="flex-1">
              <div class="flex items-baseline justify-between gap-2">
                <span class="text-[12px] text-slate-500 uppercase tracking-wide font-semibold">{{ item.label }}</span>
                <span class="text-[13px] font-semibold text-slate-100">{{ item.value }}</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">{{ item.detail }}</div>
            </div>
          </div>
        </div>

        <!-- Historical note -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4">
          <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            {{ financial.historicalNote.heading }}
          </div>
          <p class="text-[12px] text-slate-400 leading-relaxed">{{ financial.historicalNote.body }}</p>
        </div>

        <!-- Assessment callout -->
        <div class="border-l-4 border-emerald-600/60 bg-emerald-950/20 px-4 py-3 rounded-r-lg">
          <div class="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold mb-1.5">Assessment framing</div>
          <div class="text-[12px] text-emerald-200/70 leading-relaxed">{{ financial.assessment }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { foreignAssociations, financial } from '@/data/clearance/profile.js'
import FlagIcon from './FlagIcon.vue'
import InfoRow from './InfoRow.vue'
</script>
