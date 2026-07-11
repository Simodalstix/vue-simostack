<template>
  <div class="px-5 pb-6 pt-1 border-t border-ob-sand/8 space-y-6">
    <!-- gate banner -->
    <div
      v-if="row.reasons.length"
      class="mt-4 rounded-[6px] px-4 py-3"
      :class="
        row.status === 'reject'
          ? 'bg-ob-sand/8 border border-ob-sand/25'
          : 'bg-ob-surface2 border border-ob-sand/14'
      "
    >
      <p
        class="font-mono text-[11px] uppercase tracking-[0.08em] mb-1"
        :class="row.status === 'reject' ? 'text-ob-sand' : 'text-ob-muted'"
      >
        {{ row.status === 'reject' ? 'Rejected by a hard gate' : 'Conditional' }}
      </p>
      <ul class="space-y-1">
        <li v-for="(r, i) in row.reasons" :key="i" class="text-[12.5px] text-ob-muted2 flex gap-2">
          <span class="text-ob-sand shrink-0">!</span>{{ r }}
        </li>
      </ul>
    </div>

    <!-- case for / against -->
    <div class="grid md:grid-cols-2 gap-x-10 gap-y-5 pt-4">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-teal mb-2">
          The case for
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="(p, i) in rec.caseFor"
            :key="i"
            class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-teal shrink-0">+</span>{{ p }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-sand mb-2">
          The case against
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="(c, i) in rec.caseAgainst"
            :key="i"
            class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-sand shrink-0">−</span>{{ c }}
          </li>
        </ul>
      </div>
    </div>

    <!-- best / avoid dwelling type -->
    <div class="grid md:grid-cols-2 gap-x-10 gap-y-5">
      <div class="border-l-2 border-ob-teal/45 pl-3">
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-teal mb-1">
          Best property type
        </p>
        <p class="text-[12.5px] leading-relaxed text-ob-muted2">{{ rec.bestType }}</p>
      </div>
      <div class="border-l-2 border-ob-sand/45 pl-3">
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-sand mb-1">
          Properties to avoid
        </p>
        <p class="text-[12.5px] leading-relaxed text-ob-muted2">{{ rec.avoidType }}</p>
      </div>
    </div>

    <!-- commute anatomy -->
    <div v-if="row.commute" class="bg-ob-surface2 rounded-[6px] p-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-3">
        Commute anatomy
      </p>
      <CommuteBreakdown
        :record="rec"
        :commute="row.commute"
        :band="row.band"
        :preset-label="presetLabel"
        :dest="dest"
      />
    </div>

    <!-- one-car + co-parenting geometry -->
    <div class="grid md:grid-cols-2 gap-x-10 gap-y-5">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-2">
          One-car practicality
        </p>
        <p class="text-[12.5px] leading-relaxed text-ob-dim">{{ rec.oneCar }}</p>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-2">
          Co-parenting geometry
        </p>
        <p class="text-[12.5px] leading-relaxed text-ob-dim">{{ rec.coparentingGeometry }}</p>
      </div>
    </div>

    <!-- community profile -->
    <CommunityProfile :profile="rec.communityProfile" :abs-source="absSource" />

    <!-- risks + inspection -->
    <div class="grid md:grid-cols-2 gap-x-10 gap-y-5">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-sand mb-2">
          Risks & overlays
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="(r, i) in rec.risks"
            :key="i"
            class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-sand shrink-0">▪</span>{{ r }}
          </li>
        </ul>
        <a
          v-if="vicplanSource"
          :href="vicplanSource.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block mt-2 font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
          >Pull the property-level VicPlan report ↗</a
        >
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-2">
          Inspection checklist
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="(c, i) in rec.inspectionChecklist"
            :key="i"
            class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-teal shrink-0">☐</span>{{ c }}
          </li>
        </ul>
      </div>
    </div>

    <!-- sources + freshness -->
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
      <span class="font-mono text-[11px] text-ob-faint">Sources:</span>
      <a
        v-for="s in resolvedSources"
        :key="s.id"
        :href="s.url"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-[11px] text-ob-dim hover:text-ob-teal transition-colors"
        >{{ s.name }} ↗</a
      >
      <span
        class="ml-auto font-mono text-[11px]"
        :class="rec.placeholder ? 'text-ob-sand' : 'text-ob-dim'"
      >
        {{ rec.placeholder ? 'unverified placeholder' : 'verified ' + rec.verifiedAt }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { areaSources } from '@/data/dwelling/areaSources.js'
import CommuteBreakdown from './CommuteBreakdown.vue'
import CommunityProfile from './CommunityProfile.vue'

const props = defineProps({
  row: { type: Object, required: true },
  presetLabel: { type: String, default: 'Collins St' },
  dest: { type: String, default: '' },
})

const rec = computed(() => props.row.rec)
const resolvedSources = computed(() =>
  (rec.value.sources || []).map((id) => areaSources[id]).filter(Boolean),
)
const absSource = computed(() => areaSources.abs)
const vicplanSource = computed(() =>
  (rec.value.sources || []).includes('vicplan') ? areaSources.vicplan : null,
)
</script>
