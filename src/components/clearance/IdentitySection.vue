<template>
  <div class="p-5 min-h-full">

    <div class="mb-6">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">Personal Profile</div>
      <h1 class="text-2xl font-bold text-slate-100">Identity</h1>
    </div>

    <!-- 3:2 split — identity left, health right -->
    <div class="grid gap-6" style="grid-template-columns: 3fr 2fr;">

      <!-- LEFT: combined subject + spouse card -->
      <div class="rounded-xl bg-slate-800/60 border border-slate-700 overflow-hidden">
        <div class="px-5 py-3 border-b border-slate-700/60 bg-slate-800/80">
          <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Household — Southbank, Melbourne VIC</div>
        </div>
        <div class="grid grid-cols-2 divide-x divide-slate-700/60">

          <!-- Simon column -->
          <div class="px-5 py-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-0.5">Subject</div>
                <div class="text-lg font-bold text-slate-100">{{ simon.name }}</div>
              </div>
              <div class="flex gap-1.5">
                <FlagIcon v-for="c in simon.citizenships" :key="c.code" :code="c.code" :label="c.country" size="md" />
              </div>
            </div>
            <InfoRow label="Born" :value="simon.born" />
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Citizenships</div>
              <div class="space-y-1.5">
                <div v-for="c in simon.citizenships" :key="c.code" class="flex items-start gap-2">
                  <FlagIcon :code="c.code" :label="c.country" size="sm" />
                  <div>
                    <div class="text-[12px] text-slate-200 font-medium">{{ c.country }}</div>
                    <div class="text-[11px] text-slate-500 italic">{{ c.basis }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Education</div>
              <div class="space-y-3">
                <div v-for="deg in education" :key="deg.degree" class="flex items-start gap-2.5">
                  <div class="shrink-0 w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
                    <img :src="deg.logoUrl" :alt="deg.institution" class="w-9 h-9 object-contain rounded-md" @error="(e) => e.target.style.display='none'" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[12px] text-slate-200 font-medium leading-snug">{{ deg.degree }}</div>
                    <div class="text-[11px] text-slate-400">{{ deg.institution }}</div>
                    <div class="text-[10px] text-sky-400/80 font-mono mt-0.5">{{ deg.years }}<span v-if="deg.note" class="text-slate-500 ml-1">· {{ deg.note }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Jeanie column -->
          <div class="px-5 py-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-0.5">Spouse</div>
                <div class="text-lg font-bold text-slate-100">{{ jeanie.name }}</div>
              </div>
              <div class="flex gap-1.5">
                <FlagIcon v-for="c in jeanie.citizenships" :key="c.code" :code="c.code" :label="c.country" size="md" />
              </div>
            </div>
            <InfoRow label="Born" :value="jeanie.born" />
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Citizenships</div>
              <div class="space-y-1.5">
                <div v-for="c in jeanie.citizenships" :key="c.code" class="flex items-start gap-2">
                  <FlagIcon :code="c.code" :label="c.country" size="sm" />
                  <div>
                    <div class="text-[12px] text-slate-200 font-medium">{{ c.country }}</div>
                    <div class="text-[11px] text-slate-500 italic">{{ c.basis }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Education</div>
              <div class="space-y-3">
                <div v-for="deg in jeanieEducation" :key="deg.degree" class="flex items-start gap-2.5">
                  <div class="shrink-0 w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
                    <img :src="deg.logoUrl" :alt="deg.institution" class="w-9 h-9 object-contain rounded-md" @error="(e) => e.target.style.display='none'" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[12px] text-slate-200 font-medium leading-snug">{{ deg.degree }}</div>
                    <div class="text-[11px] text-slate-400">{{ deg.institution }}</div>
                    <div class="text-[10px] text-sky-400/80 font-mono mt-0.5">{{ deg.years }}<span v-if="deg.note" class="text-slate-500 ml-1">· {{ deg.note }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Lulu footer strip -->
        <div class="border-t border-slate-700/60 px-5 py-3 flex items-center gap-3 bg-slate-800/40">
          <FlagIcon :code="household.daughter.flag" :label="household.daughter.citizenship" size="xs" />
          <span class="text-[11px] text-slate-300 font-semibold">{{ household.daughter.name }}</span>
          <span class="text-[11px] text-slate-500">· Age {{ household.daughter.age }} · {{ household.daughter.citizenship }} · Daughter</span>
        </div>
      </div>

      <!-- RIGHT: health + disclosures -->
      <div class="space-y-5">

        <!-- Health card -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 overflow-hidden">
          <div class="px-5 py-3 border-b border-slate-700/60 bg-slate-800/80">
            <div class="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Health & Physical Profile</div>
          </div>
          <div class="px-5 py-4 space-y-4">

            <!-- VO2 Max -->
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">VO₂ Max — Garmin</div>
              <div class="flex items-end gap-3">
                <div class="text-4xl font-bold text-emerald-400 leading-none">{{ health.vo2max.value }}</div>
                <div class="pb-0.5">
                  <div class="text-[12px] font-semibold text-emerald-300">{{ health.vo2max.rating }}</div>
                  <div class="text-[11px] text-slate-400">{{ health.vo2max.percentile }} · {{ health.vo2max.ageGroup }}</div>
                </div>
              </div>
            </div>

            <!-- Sport -->
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Sport & Physique</div>
              <div class="text-[11px] text-slate-400 mb-2">{{ health.physique }}</div>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="s in health.sport" :key="s.name"
                  class="text-[10px] px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-300">
                  {{ s.name }}
                </span>
              </div>
            </div>

            <!-- Bloodwork -->
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Blood Tests — {{ health.bloodwork.date }}</div>
              <div class="border-l-4 border-emerald-600/60 bg-emerald-950/20 px-3 py-2.5 rounded-r-lg">
                <div class="text-[11px] text-emerald-200/80 leading-relaxed">{{ health.bloodwork.summary }}</div>
              </div>
              <!-- Markers (shown when populated) -->
              <div v-if="health.bloodwork.markers.length" class="mt-2 space-y-1">
                <div v-for="m in health.bloodwork.markers" :key="m.label" class="flex items-center justify-between text-[11px]">
                  <span class="text-slate-500">{{ m.label }}</span>
                  <span class="text-emerald-400 font-mono font-semibold">{{ m.value }}</span>
                </div>
              </div>
              <a v-if="health.bloodwork.link" :href="health.bloodwork.link" target="_blank"
                class="mt-2 inline-flex items-center gap-1.5 text-[10px] text-sky-400 hover:text-sky-300">
                View results →
              </a>
            </div>

          </div>
        </div>

        <!-- Disclosures -->
        <div class="rounded-xl bg-slate-800/60 border border-slate-700 overflow-hidden">
          <div class="px-5 py-3 border-b border-slate-700/60 bg-slate-800/80">
            <div class="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Voluntary Disclosures</div>
          </div>
          <div class="divide-y divide-slate-700/40">
            <div v-for="d in disclosures" :key="d.id" class="px-5 py-4 space-y-2.5">
              <!-- Header row -->
              <div class="flex items-center gap-2.5">
                <span class="text-[18px] shrink-0">{{ d.icon }}</span>
                <span class="text-[13px] font-semibold text-slate-100">{{ d.label }}</span>
                <span class="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full border font-semibold ml-auto shrink-0"
                  :class="d.colour === 'amber'
                    ? 'text-amber-400 border-amber-700/60 bg-amber-900/20'
                    : 'text-slate-400 border-slate-600 bg-slate-700/40'"
                >disclosed</span>
              </div>
              <!-- Summary -->
              <p class="text-[12px] text-slate-300">{{ d.summary }}</p>
              <!-- Detail bullets -->
              <ul class="space-y-1">
                <li v-for="point in d.detail" :key="point" class="flex gap-2 text-[11px] text-slate-400">
                  <span class="shrink-0 mt-0.5"
                    :class="d.colour === 'amber' ? 'text-amber-600' : 'text-slate-600'"
                  >›</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
              <!-- Framing callout -->
              <div class="border-l-4 px-3 py-2.5 rounded-r-lg"
                :class="d.colour === 'amber'
                  ? 'border-amber-600/60 bg-amber-950/30'
                  : 'border-emerald-600/60 bg-emerald-950/20'"
              >
                <div class="text-[10px] uppercase tracking-widest font-semibold mb-1"
                  :class="d.colour === 'amber' ? 'text-amber-500' : 'text-emerald-400'"
                >Framing</div>
                <div class="text-[11px] leading-relaxed"
                  :class="d.colour === 'amber' ? 'text-amber-200/70' : 'text-emerald-200/70'"
                >{{ d.framing }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { simon, jeanie, household, education, jeanieEducation, health, disclosures } from '@/data/clearance/identity.js'
import FlagIcon from './FlagIcon.vue'
import InfoRow from './InfoRow.vue'
</script>
