<template>
  <div class="px-5 pb-6 pt-1 border-t border-ob-sand/8 space-y-6">
    <!-- gate banner -->
    <div
      v-if="row.reasons.length"
      class="mt-4 rounded-[6px] px-4 py-3"
      :class="
        row.status === 'reject' || row.status === 'veto'
          ? 'bg-ob-sand/8 border border-ob-sand/25'
          : 'bg-ob-surface2 border border-ob-sand/14'
      "
    >
      <p
        class="font-mono text-[11px] uppercase tracking-[0.08em] mb-1"
        :class="row.status === 'reject' || row.status === 'veto' ? 'text-ob-sand' : 'text-ob-muted'"
      >
        {{
          row.status === 'veto'
            ? 'Soul exclusion · owner judgment'
            : row.status === 'reject'
              ? 'Rejected by a hard gate'
              : 'Conditional'
        }}
      </p>
      <ul class="space-y-1">
        <li v-for="(r, i) in row.reasons" :key="i" class="text-[12.5px] text-ob-muted2 flex gap-2">
          <span class="text-ob-sand shrink-0">!</span>{{ r }}
        </li>
      </ul>
    </div>

    <div
      v-if="coverageNote"
      class="rounded-[6px] px-4 py-3 bg-ob-surface2 border border-ob-sand/14"
    >
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-1">Map scope</p>
      <p class="text-[12.5px] leading-relaxed text-ob-muted2">{{ coverageNote }}</p>
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
      <CommuteBreakdown :record="rec" :commute="row.commute" :band="row.band" />
    </div>

    <!-- co-parenting geometry (the one-car panel was retired with the car
         concept; rec.oneCar stays in the data for the future property tool) -->
    <div>
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-2">
        Co-parenting geometry
      </p>
      <p class="text-[12.5px] leading-relaxed text-ob-dim">{{ rec.coparentingGeometry }}</p>
    </div>

    <!-- schools & childhood -->
    <div v-if="rec.childhood || zonedSchools" class="space-y-2.5">
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft">
        Schools &amp; childhood
      </p>
      <template v-if="zonedSchools">
        <div
          v-for="school in zonedSchoolRows"
          :key="school.label"
          class="rounded-[6px] border border-ob-purple/15 bg-ob-purple/4 px-3 py-2.5"
        >
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft">
              {{ school.label }}:
            </span>
            <span class="text-[12.5px] text-ob-muted2">{{ school.name }}</span>
            <span
              v-if="school.evidence?.strength != null"
              class="rounded-full bg-ob-purple/12 px-2 py-[2px] font-mono text-[10px] text-ob-purple"
            >
              {{ school.evidence.strength }}/5
            </span>
          </div>
          <p
            v-if="school.evidence?.evidenceNote"
            class="mt-1.5 text-[11.5px] leading-relaxed text-ob-muted2"
          >
            {{ school.evidence.evidenceNote }}
          </p>
          <div
            v-if="school.evidence"
            class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[9.5px] text-ob-faint"
          >
            <span>Confidence: {{ school.evidence.confidence }}</span>
            <a
              v-for="(source, index) in school.evidence.sources"
              :key="source"
              :href="source"
              target="_blank"
              rel="noopener noreferrer"
              class="text-ob-dim hover:text-ob-teal transition-colors"
            >
              source {{ index + 1 }} ↗
            </a>
          </div>
        </div>
        <p v-if="zonedSchools.boundaryFlag" class="text-[11.5px] leading-relaxed text-ob-sand">
          Anchor sits near a zone boundary: the zone can flip within this catchment.
        </p>
        <p class="font-mono text-[10.5px] leading-relaxed text-ob-faint">
          Zones: {{ zonedSchools.zoneYear }} · verify the exact address at findmyschool.vic.gov.au
        </p>
      </template>
      <template v-else>
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0"
            >Primary</span
          >
          <span
            v-for="s in rec.childhood.publicPrimary"
            :key="s"
            class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-teal/15 text-ob-teal"
            >{{ s }}</span
          >
          <span
            v-if="!rec.childhood.publicPrimary?.length"
            class="font-mono text-[11px] text-ob-faint"
            >not listed</span
          >
        </div>
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0"
            >Secondary</span
          >
          <span
            v-for="s in rec.childhood.publicSecondary"
            :key="s"
            class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-teal/15 text-ob-teal"
            >{{ s }}</span
          >
          <span
            v-if="!rec.childhood.publicSecondary?.length"
            class="font-mono text-[11px] text-ob-faint"
            >not listed</span
          >
        </div>
      </template>
      <div v-if="rec.childhood?.privateContext?.length" class="flex flex-wrap items-center gap-1.5">
        <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-ob-soft w-16 shrink-0"
          >Private</span
        >
        <span
          v-for="s in rec.childhood.privateContext"
          :key="s"
          class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-sand/10 text-ob-dim"
          >{{ s }}</span
        >
      </div>
      <p v-if="rec.childhood?.note" class="text-[12px] leading-relaxed text-ob-muted2">
        {{ rec.childhood.note }}
      </p>
      <p v-if="!zonedSchools" class="font-mono text-[10.5px] leading-relaxed text-ob-faint">
        {{ SCHOOL_FALLBACK_CAVEAT }}
      </p>
    </div>

    <div v-if="rec.greenspaceComponents" class="space-y-2.5">
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft">
        Greenspace evidence · context only
      </p>
      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-[6px] border border-ob-sand/10 px-3 py-2.5">
          <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-faint">
            Local open space
          </p>
          <p class="mt-0.5 font-mono text-[12px] text-ob-text">
            {{ formatScore(rec.greenspaceComponents.localOpenSpaceAccess) }}/10
          </p>
        </div>
        <div class="rounded-[6px] border border-ob-sand/10 px-3 py-2.5">
          <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-faint">Major parks</p>
          <p class="mt-0.5 font-mono text-[12px] text-ob-text">
            {{ formatScore(rec.greenspaceComponents.majorParkAccess) }}/10
          </p>
        </div>
        <div class="rounded-[6px] border border-ob-sand/10 px-3 py-2.5">
          <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-faint">
            Nature corridors
          </p>
          <p class="mt-0.5 font-mono text-[12px] text-ob-text">
            {{ formatScore(rec.greenspaceComponents.natureCorridorAccess) }}/10
          </p>
        </div>
      </div>
      <p
        v-if="rec.greenspaceEvidence"
        class="font-mono text-[10.5px] leading-relaxed text-ob-faint"
      >
        {{ formatPct(rec.greenspaceEvidence.localOpenSpaceCoveragePct) }} of represented residents
        are within 400m straight-line of eligible local open space ·
        {{ formatInt(rec.greenspaceEvidence.representedPopulation) }} residents across
        {{ rec.greenspaceEvidence.sampledMeshBlocks }} residential mesh blocks.
      </p>
    </div>

    <!-- decision profile: dimensions the brief wants comparable but NOT turned
         into weighting sliders. Every field renders an honest "not assessed"
         state until the owner fills areaEnrichment.js. -->
    <div class="space-y-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft">Decision profile</p>

      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1">
          Melbourne PT network reach
          <span class="text-ob-dim normal-case">· public transport only</span>
        </p>
        <p v-if="enrich.ptNetworkReach.score != null" class="text-[12.5px] text-ob-muted2">
          {{ enrich.ptNetworkReach.score }}/5
          <span v-if="enrich.ptNetworkReach.provisional" class="text-ob-sand">· provisional</span>
          <span v-if="enrich.ptNetworkReach.note">: {{ enrich.ptNetworkReach.note }}</span>
        </p>
        <p v-else class="text-[12px] text-ob-faint italic">not assessed</p>
      </div>

      <!-- unique character -->
      <div class="grid sm:grid-cols-2 gap-x-10 gap-y-4">
        <div>
          <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-teal mb-1.5">
            What this suburb uniquely gives you
          </p>
          <div v-if="enrich.signatureAssets.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="a in enrich.signatureAssets"
              :key="a"
              class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-teal/15 text-ob-teal"
              >{{ a }}</span
            >
          </div>
          <p v-else class="text-[12px] text-ob-faint italic">not assessed</p>
        </div>
        <div>
          <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-sand mb-1.5">
            What you must accept
          </p>
          <div v-if="enrich.structuralFrictions.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="f in enrich.structuralFrictions"
              :key="f"
              class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-sand/12 text-ob-sand"
              >{{ f }}</span
            >
          </div>
          <p v-else class="text-[12px] text-ob-faint italic">not assessed</p>
        </div>
      </div>

      <!-- kid activity access (enriches kid independence, not a new weight) -->
      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1.5">
          Kid activity access
        </p>
        <div v-if="hasActivity" class="space-y-1.5">
          <div
            v-for="grp in activityGroups"
            :key="grp.key"
            class="flex gap-2 flex-wrap items-baseline"
          >
            <span class="font-mono text-[10px] uppercase text-ob-soft w-20 shrink-0">{{
              grp.label
            }}</span>
            <span
              v-for="a in enrich.kidActivity[grp.key]"
              :key="a"
              class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-surface2 text-ob-dim"
              >{{ a }}</span
            >
          </div>
          <p v-if="enrich.kidActivity.note" class="text-[12px] leading-relaxed text-ob-muted2">
            {{ enrich.kidActivity.note }}
          </p>
        </div>
        <p v-else class="text-[12px] text-ob-faint italic">not assessed</p>
      </div>

      <!-- crime profile -->
      <div>
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1.5">
          Crime profile
          <span v-if="enrich.crime.geography" class="text-ob-dim normal-case"
            >· {{ enrich.crime.geography
            }}<span v-if="enrich.crime.asOf">, {{ enrich.crime.asOf }}</span></span
          >
        </p>
        <div v-if="hasCrime" class="flex flex-wrap gap-3">
          <span v-for="c in crimeRows" :key="c.key" class="font-mono text-[11.5px]">
            <span class="text-ob-soft">{{ c.label }}:</span>
            <span :class="crimeClass(enrich.crime[c.key])"> {{ enrich.crime[c.key] }}</span>
          </span>
        </div>
        <p v-else class="text-[12px] text-ob-faint italic">not assessed</p>
        <p v-if="enrich.crime.note" class="mt-1.5 text-[12px] leading-relaxed text-ob-muted2">
          {{ enrich.crime.note }}
        </p>
      </div>

      <!-- broad-area environmental / noise flags -->
      <div v-if="enrich.broadRiskFlags.length">
        <p class="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-faint mb-1.5">
          Broad-area flags
          <span class="text-ob-dim normal-case">· suburb level, address check still required</span>
        </p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="(f, i) in enrich.broadRiskFlags"
            :key="i"
            class="font-mono text-[11px] px-2 py-[2px] rounded-full bg-ob-sand/12 text-ob-sand"
            >{{ f.type }} · {{ f.level }}</span
          >
        </div>
      </div>
    </div>

    <CommunityContextSection :area-id="rec.id" :list-limit="5" show-evidence-details />

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
import { enrichmentFor } from '@/data/dwelling/areaEnrichment.js'
import { coverageLabelForArea, isGroupedArea } from '@/data/dwelling/areaGeo.js'
import { zonedSchoolEvidenceForArea } from '@/data/dwelling/schools/schoolStrength.js'
import CommuteBreakdown from './CommuteBreakdown.vue'
import CommunityContextSection from './CommunityContextSection.vue'

const props = defineProps({
  row: { type: Object, required: true },
})

const rec = computed(() => props.row.rec)

// Decision-profile enrichment (PT reach, crime, activity, character).
// Seeded empty; renders honest "not assessed" states.
const enrich = computed(() => enrichmentFor(rec.value.id))
const zonedSchools = computed(() => zonedSchoolEvidenceForArea(rec.value.id))
const zonedSchoolRows = computed(() => {
  if (!zonedSchools.value) return []
  return [
    { label: 'Zoned primary', ...zonedSchools.value.primary },
    { label: 'Zoned secondary', ...zonedSchools.value.secondary },
  ]
})

const activityGroups = [
  { key: 'walkable', label: 'Walk' },
  { key: 'cycleable', label: 'Cycle' },
  { key: 'pt', label: 'PT' },
  { key: 'driving', label: 'Drive' },
]
const hasActivity = computed(() =>
  activityGroups.some((g) => enrich.value.kidActivity[g.key]?.length),
)

const crimeRows = [
  { key: 'person', label: 'Against person' },
  { key: 'burglary', label: 'Burglary' },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'damage', label: 'Property damage' },
]
const hasCrime = computed(() => crimeRows.some((c) => enrich.value.crime[c.key] != null))
function crimeClass(band) {
  return (
    {
      low: 'text-ob-teal',
      moderate: 'text-ob-sand',
      elevated: 'text-ob-sand',
      high: 'text-ob-bright',
    }[band] || 'text-ob-dim'
  )
}

const SCHOOL_FALLBACK_CAVEAT =
  'School zones are street-level. Verify any address at findmyschool.vic.gov.au. The listed schools are legacy research pending generated zone context.'
const coverageNote = computed(() =>
  isGroupedArea(rec.value.id)
    ? `This ranked record covers ${coverageLabelForArea(rec.value.id)}.`
    : null,
)
const resolvedSources = computed(() =>
  (rec.value.sources || []).map((id) => areaSources[id]).filter(Boolean),
)
const vicplanSource = computed(() =>
  (rec.value.sources || []).includes('vicplan') ? areaSources.vicplan : null,
)

function formatScore(value) {
  return Number.isFinite(value) ? value.toFixed(1) : 'n/a'
}

function formatPct(value) {
  return Number.isFinite(value) ? `${value.toFixed(1)}%` : 'n/a'
}

function formatInt(value) {
  return Number.isFinite(value) ? value.toLocaleString() : 'n/a'
}
</script>
