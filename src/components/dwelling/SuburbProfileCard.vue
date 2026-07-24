<template>
  <div
    class="h-full overflow-hidden"
    :class="closeOnCardClick ? 'cursor-pointer' : ''"
    @click="closeOnCardClick && emit('close')"
  >
    <div v-if="showEvidence" class="h-full overflow-y-auto" @click.stop>
      <div class="px-4 py-3.5 space-y-3">
        <div class="flex items-center justify-between gap-3">
          <p class="font-mono text-[11px] tracking-[0.12em] uppercase text-ob-soft">
            Full evidence · {{ row.rec.suburb }}
          </p>
          <button
            @click.stop="showEvidence = false"
            class="font-mono text-[10.5px] text-ob-faint hover:text-ob-teal transition-colors"
          >
            back to summary
          </button>
        </div>
        <AreaDetailDrawer :row="row" />
      </div>
    </div>

    <div v-else class="h-full overflow-y-auto px-4 py-3.5">
      <div class="grid min-h-full grid-rows-[auto_auto_auto_1fr_auto] gap-2.5">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 space-y-1">
            <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <p class="text-[21px] font-bold leading-tight text-ob-text">{{ row.rec.suburb }}</p>
              <span
                v-if="!unscored && !vetoed"
                class="inline-flex items-baseline gap-1.5 rounded-full px-2 py-[3px] font-mono"
                :style="{ backgroundColor: bandBadgeFill(row), color: bandColor(row) }"
              >
                <span class="text-[15px] font-extrabold leading-none">{{ scoreDisplay(row) }}</span>
                <span class="text-[9px] uppercase tracking-[0.08em]">{{ bandLabel(row) }}</span>
              </span>
              <span
                v-else-if="vetoed"
                class="font-mono text-[15px] font-extrabold leading-none text-ob-dim"
              >
                {{ scoreDisplay(row) }}
              </span>
              <span v-if="headerChips.length" class="inline-flex items-center gap-1.5">
                <span
                  v-for="chip in headerChips"
                  :key="chip.key"
                  class="inline-flex items-center"
                  :title="chip.text"
                >
                  <DecisionSignalIcon :kind="chip.key" :label="chip.text" />
                </span>
              </span>
              <span
                v-if="prestige"
                class="inline-flex items-center rounded-full border border-ob-purple/45 bg-ob-purple/12 px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.08em] text-ob-purple"
                title="Entry price is well above the current budget cap"
              >
                {{ PRESTIGE_LABEL }}
              </span>
            </div>
            <p
              v-if="headerNote"
              class="font-mono text-[9px] leading-snug text-ob-faint card-clamp-1"
            >
              {{ headerNote }}
            </p>
            <div v-if="gateChip" class="flex flex-wrap gap-1.5">
              <span
                class="border px-2 py-[3px] font-mono text-[9.5px] leading-none"
                :class="[chipClass(gateChip), chipShapeClass(gateChip)]"
              >
                {{ gateChip.text }}
              </span>
            </div>
          </div>
          <div class="shrink-0 text-right">
            <p class="flex items-baseline justify-end gap-1 font-mono">
              <template v-if="vetoed">
                <span class="text-[13px] font-bold leading-none text-ob-dim">Veto</span>
                <span class="text-[10px] text-ob-faint">·</span>
              </template>
              <template v-else-if="rankById[row.rec.id]">
                <span class="text-[15px] font-extrabold leading-none text-ob-sand"
                  >#{{ rankById[row.rec.id] }}</span
                >
                <span class="text-[10px] text-ob-faint">·</span>
              </template>
              <span class="text-[10.5px] text-ob-faint">{{ row.rec.region }}</span>
            </p>
            <p v-if="closeOnCardClick" class="font-mono text-[9px] text-ob-faint">
              click card to return to map
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <div
            class="grid gap-x-5 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.2fr_0.75fr_1.1fr_0.9fr_1.6fr]"
          >
            <div v-for="m in headerMetrics" :key="m.label" class="min-w-0">
              <p class="font-mono text-[8.5px] uppercase tracking-[0.05em] text-ob-faint">
                {{ m.label }}
              </p>
              <p
                class="mt-0.5 font-mono text-[12px] leading-snug"
                :class="m.tone || 'text-ob-text'"
              >
                {{ m.value }}
              </p>
            </div>
            <div class="min-w-0">
              <p class="font-mono text-[8.5px] uppercase tracking-[0.05em] text-ob-faint">
                Transport
              </p>
              <p class="mt-0.5 text-[10.5px] leading-snug text-ob-muted2 card-clamp-2">
                <span class="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span
                    v-for="line in areaLines(row.rec.id)"
                    :key="line.id"
                    class="inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span
                      class="w-2.5 h-[3px] rounded-full inline-block"
                      :style="{ backgroundColor: line.color }"
                    ></span
                    >{{ formatLineName(line.name) }}
                  </span>
                  <span v-if="!areaLines(row.rec.id).length" class="text-ob-dim whitespace-nowrap"
                    >tram / light-rail based</span
                  >
                  <span class="text-ob-dim whitespace-nowrap"
                    >· {{ row.rec.station }} · ~{{ row.rec.stationWalkMin }} min walk</span
                  >
                </span>
              </p>
            </div>
          </div>
          <div v-if="unscored" class="border-l-2 border-ob-sand/55 bg-ob-sand/5 px-2.5 py-1.5">
            <p class="font-mono text-[10.5px] leading-snug text-ob-sand">
              {{ UNSCORED_BANNER }}
            </p>
          </div>
        </div>

        <div class="grid min-h-0 content-start gap-3">
          <div class="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <section
              class="grid content-start gap-3 rounded-[6px] border border-ob-sand/10 px-3 py-2.5"
            >
              <div>
                <p class="font-mono text-[9px] uppercase tracking-[0.08em] text-ob-teal">
                  The suburb
                </p>
                <p class="mt-1 text-[11px] leading-snug text-ob-muted2">
                  {{ suburbProfile?.lives || row.rec.headline || row.rec.caseFor?.[0] }}
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                <div>
                  <p class="mb-1 font-mono text-[8.5px] uppercase tracking-[0.07em] text-ob-teal">
                    Strengths
                  </p>
                  <ul class="space-y-0.5">
                    <li
                      v-for="(point, i) in row.rec.caseFor"
                      :key="i"
                      class="flex gap-1.5 text-[10.5px] leading-snug text-ob-muted2"
                    >
                      <span class="shrink-0 text-ob-teal">+</span>{{ point }}
                    </li>
                  </ul>
                </div>
                <div>
                  <p class="mb-1 font-mono text-[8.5px] uppercase tracking-[0.07em] text-ob-sand">
                    Compromises
                  </p>
                  <ul class="space-y-0.5">
                    <li
                      v-for="(point, i) in row.rec.caseAgainst"
                      :key="i"
                      class="flex gap-1.5 text-[10.5px] leading-snug text-ob-muted2"
                    >
                      <span class="shrink-0 text-ob-sand">−</span>{{ point }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="grid gap-3 border-t border-ob-sand/8 pt-2 sm:grid-cols-2">
                <div>
                  <p class="font-mono text-[8px] uppercase tracking-[0.05em] text-ob-faint">
                    Dwelling stock
                  </p>
                  <p class="mt-0.5 font-mono text-[9.5px] text-ob-soft">
                    {{ dwellingLabel(row.rec) }}
                  </p>
                  <p class="mt-0.5 text-[10px] leading-snug text-ob-dim card-clamp-3">
                    {{ suburbProfile?.housing || row.rec.dwelling?.suitableStock }}
                  </p>
                </div>
                <div>
                  <p
                    class="font-mono text-[8px] uppercase tracking-[0.05em]"
                    :class="friendFor(row.rec.id) ? 'text-ob-gold' : 'text-ob-faint'"
                  >
                    {{ friendFor(row.rec.id) ? '★ Personal network' : 'Practical notes' }}
                  </p>
                  <p
                    v-if="friendFor(row.rec.id)"
                    class="mt-0.5 text-[10px] leading-snug text-ob-gold"
                  >
                    {{ friendFor(row.rec.id).text }}
                  </p>
                  <p
                    v-if="personalNetworkLine"
                    class="mt-0.5 text-[9.5px] leading-snug text-ob-gold"
                  >
                    {{ personalNetworkLine }}
                  </p>
                  <p class="mt-0.5 text-[9.5px] leading-snug text-ob-dim">
                    Beach:
                    <span :class="beachAccess ? 'text-ob-teal' : 'italic text-ob-faint'">
                      {{
                        beachAccess
                          ? `~${beachAccess.estMin} min by ${beachAccess.mode}`
                          : 'not assessed'
                      }}
                    </span>
                  </p>
                  <p class="mt-0.5 text-[10px] leading-snug text-ob-dim card-clamp-3">
                    {{ row.rec.coparentingGeometry }}
                  </p>
                </div>
              </div>
            </section>

            <section
              class="grid content-start gap-3 rounded-[6px] border border-ob-purple/20 bg-ob-purple/4 px-3 py-2.5"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <p class="font-mono text-[9px] uppercase tracking-[0.08em] text-ob-purple">
                  Childhood
                </p>
                <p class="font-mono text-[9.5px] text-ob-purple">
                  teen independence {{ teenIndependenceDots }}
                  {{ row.rec.childhood?.teenIndependence ?? 'n/a' }}/5
                </p>
              </div>

              <div>
                <p class="mb-1 font-mono text-[8.5px] uppercase tracking-[0.06em] text-ob-faint">
                  Schools
                </p>
                <div v-if="zonedSchools" class="space-y-0.5">
                  <div v-for="school in zonedSchoolRows" :key="school.label">
                    <p class="text-[10.5px] leading-snug text-ob-muted2">
                      <span class="font-mono text-[9.5px] text-ob-faint">{{ school.label }}:</span>
                      {{ school.name }}
                      <span
                        v-if="school.strength != null"
                        class="ml-1 whitespace-nowrap rounded-full bg-ob-purple/12 px-1.5 py-[1px] font-mono text-[9px] text-ob-purple"
                      >
                        {{ school.strength }}/5
                      </span>
                    </p>
                    <p
                      v-if="school.alsoInCatchment.length"
                      class="font-mono text-[9px] leading-snug text-ob-faint"
                    >
                      Also in catchment: {{ school.alsoInCatchment.join(', ') }}
                    </p>
                  </div>
                  <p
                    v-if="zonedSchools.boundaryFlag"
                    class="text-[9.5px] leading-snug text-ob-sand"
                  >
                    Anchor sits near a zone boundary: the zone can flip within this catchment.
                  </p>
                  <p class="font-mono text-[9px] leading-snug text-ob-faint">
                    Zones: {{ zonedSchools.zoneYear }} · verify the exact address at
                    findmyschool.vic.gov.au
                  </p>
                </div>
                <div v-else class="flex flex-wrap gap-1">
                  <span
                    v-for="school in schoolChips(row.rec)"
                    :key="school"
                    class="rounded-full bg-ob-purple/12 px-1.5 py-[2px] font-mono text-[9.5px] text-ob-purple"
                    >{{ school }}</span
                  >
                </div>
                <p
                  v-if="row.rec.childhood?.note"
                  class="mt-1 text-[10.5px] leading-snug text-ob-muted2 card-clamp-3"
                >
                  {{ row.rec.childhood.note }}
                </p>
              </div>

              <div class="border-t border-ob-purple/15 pt-2">
                <p class="font-mono text-[8.5px] uppercase tracking-[0.06em] text-ob-faint">
                  Girls' sport and facilities
                  <span
                    v-if="girlsSport?.confidence"
                    class="normal-case tracking-normal text-ob-dim"
                  >
                    · {{ girlsSport.confidence }} confidence
                  </span>
                </p>
                <p v-if="girlsSport?.line" class="mt-1 text-[10.5px] leading-snug text-ob-muted2">
                  {{ girlsSport.line }}
                </p>
                <p v-else class="mt-1 text-[10.5px] italic leading-snug text-ob-faint">
                  girls' sport not researched yet
                </p>
                <div v-if="girlsSportPathways.length" class="mt-1.5 flex flex-wrap gap-1">
                  <span
                    v-for="sport in girlsSportPathways"
                    :key="sport.key"
                    class="rounded-full bg-ob-teal/8 px-1.5 py-[2px] font-mono text-[9px] text-ob-teal"
                    >✓ {{ sport.label }}</span
                  >
                </div>
                <div v-if="childhoodFacilities.length" class="mt-1.5 flex flex-wrap gap-1">
                  <span
                    v-for="facility in childhoodFacilities"
                    :key="facility"
                    class="rounded-full border border-ob-purple/30 px-1.5 py-[2px] font-mono text-[9px] text-ob-muted2"
                    >{{ facility }}</span
                  >
                </div>
              </div>
            </section>
          </div>

          <!-- Keep the two comparative evidence blocks together in the visible
               profile summary. The full evidence drawer repeats them at a
               larger scale, but this is the panel most users actually see. -->
          <div
            class="grid items-start gap-3 border-t border-ob-sand/8 pt-2 sm:grid-cols-[minmax(0,1.35fr)_minmax(210px,0.9fr)]"
          >
            <CommunityContextSection :area-id="row.rec.id" :list-limit="4" compact />
            <SafetyProfileSection :area-id="row.rec.id" compact />
          </div>
        </div>

        <div class="flex items-center gap-3 border-t border-ob-sand/8 pt-2">
          <button
            @click.stop="showEvidence = true"
            class="font-mono text-[10.5px] text-ob-faint hover:text-ob-teal transition-colors"
          >
            full evidence & research detail ▸
          </button>
          <p v-if="closeOnCardClick" class="font-mono text-[9px] text-ob-faint ml-auto">
            click anywhere else on the card to close
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { fitBandBadgeFill, fitBandColor, getFitBand } from '@/data/dwelling/fitBands.js'
import { FEE_ESTIMATE_BY_RISK } from '@/data/dwelling/areaCorridors.js'
import { trainLines, linesForArea } from '@/data/dwelling/trainLines.js'
import { facilitiesForArea } from '@/data/dwelling/facilities.js'
import { GIRLS_SPORT_CLUBS, girlsSportFor } from '@/data/dwelling/girlsSport.js'
import { beachAccessByAreaId } from '@/data/dwelling/beachAccess.js'
import { differentiatingChipsFor, gateExceptionChipFor } from '@/data/dwelling/decisionChips.js'
import { friendContextFor } from '@/data/dwelling/personalAnchors.js'
import { personalNetworkByAreaId } from '@/data/dwelling/personalNetwork.js'
import { suburbProfileFor } from '@/data/dwelling/suburbProfiles.js'
import { costMetricForArea, formatCostMetric } from '@/data/dwelling/cost/costContext.js'
import { schoolContextByAreaId } from '@/data/dwelling/schools/dwelling-school-context.js'
import { zonedSchoolEvidenceForArea } from '@/data/dwelling/schools/schoolStrength.js'
import {
  PRESTIGE_LABEL,
  UNSCORED_BANNER,
  isPrestigeRow,
  isUnscoredRow,
  isVetoedRow,
} from '@/data/dwelling/unscoredUx.js'
import { allInMonthly } from '@/composables/useRepayment.js'
import AreaDetailDrawer from './AreaDetailDrawer.vue'
import CommunityContextSection from './CommunityContextSection.vue'
import SafetyProfileSection from './SafetyProfileSection.vue'
import DecisionSignalIcon from './DecisionSignalIcon.vue'

const props = defineProps({
  row: { type: Object, required: true },
  rankById: { type: Object, required: true },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
  // Active Settle strategy (decideStrategies.js).
  strategy: { type: Object, default: null },
  weights: { type: Object, default: () => ({}) },
  closeOnCardClick: { type: Boolean, default: true },
})

const emit = defineEmits(['close'])

const showEvidence = ref(false)
watch(
  () => props.row?.rec?.id,
  () => {
    showEvidence.value = false
  },
)

const gateNote = computed(() => {
  if (!props.row.reasons.length) return null
  // Vetoes are shown by the grey "Veto" marker, not a reason line.
  if (isVetoedRow(props.row)) return null
  const lead = props.row.reasons[0]
  const suffix = props.row.reasons.length > 1 ? ` +${props.row.reasons.length - 1}` : ''
  return `${props.row.status === 'reject' ? 'Fails' : 'Conditional'}: ${lead}${suffix}`
})
const headerNote = computed(() => gateNote.value)
const headerMetrics = computed(() => [
  { label: 'Scored price', value: scoredPriceLabel.value },
  { label: 'Repayment estimate', value: monthlyLabel(props.row.rec), tone: 'text-ob-teal' },
  { label: 'Collins St commute', value: commuteLabel(props.row), tone: bandClass(props.row.band) },
  { label: 'Owners-corp', value: ocLabel(props.row.rec), tone: 'text-ob-muted2' },
])
const scoredPriceLabel = computed(() =>
  formatCostMetric(costMetricForArea(props.row.rec.id, props.strategy, props.row.rec), {
    terse: true,
  }),
)
const unscored = computed(() => isUnscoredRow(props.row))
const vetoed = computed(() => isVetoedRow(props.row))
const prestige = computed(() => isPrestigeRow(props.row))
const suburbProfile = computed(() => suburbProfileFor(props.row.rec.id))
const girlsSport = computed(() => girlsSportFor(props.row.rec.id))
const beachAccess = computed(() => beachAccessByAreaId[props.row.rec.id] || null)
const headerChips = computed(() => differentiatingChipsFor(props.row, props.weights))
// The owner-veto reason is long and already stated in the fit line; showing it
// as a header chip too overflows the chip row and resizes the card on hover.
const gateChip = computed(() => (isVetoedRow(props.row) ? null : gateExceptionChipFor(props.row)))
const girlsSportPathways = computed(() =>
  GIRLS_SPORT_CLUBS.filter((sport) => girlsSport.value?.clubPresence?.[sport.key] === true),
)
const childhoodFacilities = computed(() => [
  ...new Set([
    ...(girlsSport.value?.facilities || []),
    ...facilitiesForArea(props.row.rec.id).map((facility) => facility.name),
  ]),
])
const teenIndependenceDots = computed(() => {
  const value = props.row.rec.childhood?.teenIndependence
  if (!Number.isFinite(value)) return ''
  const rounded = Math.max(0, Math.min(5, Math.round(value)))
  return `${'●'.repeat(rounded)}${'○'.repeat(5 - rounded)}`
})
const zonedSchools = computed(() => zonedSchoolEvidenceForArea(props.row.rec.id))
const schoolCatchmentContext = computed(() => schoolContextByAreaId[props.row.rec.id] || {})
const zonedSchoolRows = computed(() => {
  if (!zonedSchools.value) return []
  return [
    {
      label: 'Zoned primary',
      name: zonedSchools.value.primary.name,
      strength: zonedSchools.value.primary.evidence?.strength,
      alsoInCatchment: schoolCatchmentContext.value.alsoInCatchmentPrimary || [],
    },
    {
      label: 'Zoned secondary',
      name: zonedSchools.value.secondary.name,
      strength: zonedSchools.value.secondary.evidence?.strength,
      alsoInCatchment: schoolCatchmentContext.value.alsoInCatchmentSecondary || [],
    },
  ]
})
const personalNetworkLine = computed(() => {
  const network = personalNetworkByAreaId[props.row.rec.id]
  if (!network || network.distanceKm == null) return null
  return `Friends: ${network.distanceKm.toFixed(1)} km from ${network.stationAnchorName} station anchor to South Yarra`
})
function chipClass(chip) {
  return {
    friend: 'border-ob-gold-muted/35 text-ob-gold bg-ob-gold-dark/40',
    beach: 'border-amber-500/35 text-amber-300 bg-amber-500/10',
    chinese: 'border-red-500/35 text-red-300 bg-red-500/10',
    pink: 'border-pink-500/35 text-pink-300 bg-pink-500/10',
    green: 'border-emerald-600/50 text-emerald-300 bg-emerald-700/25',
    yellow: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    train: 'border-ob-sand/20 text-ob-muted2 bg-ob-surface/60',
    commute: 'border-blue-500/45 text-blue-300 bg-blue-500/10',
    schools: 'border-ob-purple/30 text-ob-purple bg-ob-purple/8',
    conditional: 'border-ob-sand/30 text-ob-sand bg-ob-sand/8',
    reject: 'border-red-400/35 text-red-300 bg-red-400/8',
    veto: 'border-ob-sand/20 text-ob-faint bg-ob-sand/5',
  }[chip.tone]
}
function chipShapeClass(chip) {
  return ['friend', 'beach', 'commute', 'schools'].includes(chip.tone)
    ? 'rounded-[4px]'
    : 'rounded-full'
}
function bandColor(row) {
  if (isVetoedRow(row)) return '#7A8A99'
  if (row.status === 'reject') return '#f87171'
  return fitBandColor(row.weighted)
}
function bandBadgeFill(row) {
  if (isVetoedRow(row)) return 'rgba(122, 138, 153, 0.12)'
  if (row.status === 'reject') return 'rgba(248, 113, 113, 0.12)'
  return fitBandBadgeFill(row.weighted)
}
function bandLabel(row) {
  if (isVetoedRow(row)) return 'owner veto'
  if (row.status === 'reject') return 'gated'
  return getFitBand(row.weighted).label
}
function scoreDisplay(row) {
  return row.status === 'reject' ? 'gated' : row.weighted
}
function bandClass(band) {
  return (
    {
      Excellent: 'text-ob-teal',
      Good: 'text-ob-teal-bright',
      Acceptable: 'text-ob-sand',
      Difficult: 'text-ob-faint',
    }[band] || 'text-ob-dim'
  )
}
function feeEstimate(rec) {
  if (rec.feeEstimate != null) return rec.feeEstimate
  const high = rec.dwelling?.annualOc?.[1] ?? 0
  const risk = high > 5000 ? 'high' : high > 3000 ? 'moderate' : 'low'
  return FEE_ESTIMATE_BY_RISK[risk]
}
function monthlyFor(rec) {
  return allInMonthly(rec, {
    deposit: props.deposit,
    rate: props.rate,
    years: props.payoffYears,
    feeEstimate: feeEstimate(rec),
  })
}
function monthlyLabel(rec) {
  const monthly = monthlyFor(rec)
  return monthly != null ? '$' + monthly.toLocaleString('en-AU') + '/mo' : 'n/a'
}
function ocLabel(rec) {
  const oc = rec.dwelling?.annualOc
  return oc
    ? '$' + oc[0].toLocaleString('en-AU') + '–$' + oc[1].toLocaleString('en-AU') + '/yr'
    : 'n/a'
}
function commuteLabel(row) {
  const commute = row.commute || row.rec.commute
  if (!commute) return 'n/a'
  return `${commute.typical}m typical · ${commute.stressed}m stressed`
}
const DWELLING_LABEL = {
  'older-apartment': 'older apartment',
  'new-apartment': 'new apartment',
  'villa-unit': 'villa unit',
  townhouse: 'townhouse',
  house: 'house',
}
function dwellingLabel(rec) {
  const type = rec.dwelling?.types?.[0]
  const bedrooms = rec.dwelling?.bedrooms
  return type ? `${bedrooms}BR ${DWELLING_LABEL[type] || type}` : 'n/a'
}
const lineById = Object.fromEntries(trainLines.map((line) => [line.id, line]))
function areaLines(areaId) {
  return linesForArea(areaId)
    .map((id) => lineById[id])
    .filter(Boolean)
}
function formatLineName(name) {
  return name.replaceAll(' / ', '/')
}
function schoolChips(rec) {
  const childhood = rec.childhood
  if (!childhood) return []
  return [...(childhood.publicPrimary || []), ...(childhood.publicSecondary || [])]
}
function friendFor(areaId) {
  return friendContextFor(areaId)
}
</script>

<style scoped>
.card-clamp-1 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.card-clamp-2 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-clamp-3 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.card-clamp-4 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>
