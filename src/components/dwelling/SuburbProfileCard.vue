<template>
  <div class="h-full cursor-pointer overflow-hidden" @click="emit('close')">
    <div
      v-if="showEvidence"
      class="h-full overflow-y-auto"
      @click.stop
    >
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

    <div v-else class="h-full px-4 py-3.5">
      <div class="h-full grid grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-2.5">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 space-y-1">
            <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <p class="text-[21px] font-bold leading-tight text-ob-text">{{ row.rec.suburb }}</p>
              <span
                class="font-mono text-[11px] px-2 py-[2px] rounded-full"
                :style="{ backgroundColor: bandColor(row) + '22', color: bandColor(row) }"
                >{{ row.weighted }} · {{ bandLabel(row) }}</span
              >
              <button
                @click.stop="$emit('toggle-shortlist', row.rec.id)"
                class="font-mono text-[10px] px-2 py-[3px] rounded-full border transition-colors"
                :class="
                  shortlistIds.includes(row.rec.id)
                    ? 'border-ob-sand/45 text-ob-sand'
                    : 'border-ob-sand/14 text-ob-faint hover:text-ob-muted'
                "
              >
                {{ shortlistIds.includes(row.rec.id) ? '★ shortlisted' : '☆ shortlist' }}
              </button>
              <span
                v-if="row.rec.placeholder"
                class="font-mono text-[9.5px] text-ob-sand"
                title="Placeholder data pending verification"
                >provisional data</span
              >
            </div>
            <p
              v-if="headerNote"
              class="font-mono text-[9px] leading-snug text-ob-faint card-clamp-1"
            >
              {{ headerNote }}
            </p>
          </div>
          <div class="shrink-0 text-right">
            <p class="font-mono text-[10.5px] text-ob-faint">
              <template v-if="rankById[row.rec.id]">#{{ rankById[row.rec.id] }} · </template
              >{{ row.rec.region }}
            </p>
            <p class="font-mono text-[9px] text-ob-faint">click card to return to map</p>
          </div>
        </div>

        <div class="space-y-2">
          <div class="grid gap-x-5 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[0.95fr_1fr_1.2fr_0.95fr_1.7fr]">
            <div v-for="m in headerMetrics" :key="m.label" class="min-w-0">
              <p class="font-mono text-[8.5px] uppercase tracking-[0.05em] text-ob-faint">
                {{ m.label }}
              </p>
              <p class="mt-0.5 font-mono text-[12px] leading-snug" :class="m.tone || 'text-ob-text'">
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
        </div>

        <div class="grid min-h-0 gap-3 overflow-hidden">
          <div class="grid gap-3 xl:grid-cols-[1.04fr_0.96fr]">
            <div class="grid content-start gap-3 min-h-0">
              <div class="rounded-[6px] border border-ob-purple/20 bg-ob-purple/4 px-3 py-2.5">
                <div class="grid gap-2 md:grid-cols-[auto_1fr] md:items-start">
                  <div class="space-y-1 md:min-w-[112px]">
                    <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-purple">
                      Schools
                    </p>
                    <p class="font-mono text-[10px] text-ob-purple">
                      {{ dots(row.rec.childhood?.schoolStrength) }}
                    </p>
                    <p class="font-mono text-[9.5px] text-ob-purple">
                      teen independence {{ row.rec.childhood?.teenIndependence ?? 'n/a' }}/5
                    </p>
                  </div>
                  <div class="min-w-0">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="school in schoolChips(row.rec)"
                        :key="school"
                        class="font-mono text-[9.5px] px-1.5 py-[2px] rounded-full bg-ob-purple/12 text-ob-purple"
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
                </div>
              </div>

              <div class="grid gap-3 md:grid-cols-2">
                <div>
                  <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-teal mb-1">
                    Strengths
                  </p>
                  <ul class="space-y-0.5">
                    <li
                      v-for="(point, i) in row.rec.caseFor"
                      :key="i"
                      class="text-[10.5px] leading-snug text-ob-muted2 flex gap-1.5"
                    >
                      <span class="text-ob-teal shrink-0">+</span>{{ point }}
                    </li>
                  </ul>
                </div>
                <div>
                  <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-sand mb-1">
                    Compromises
                  </p>
                  <ul class="space-y-0.5">
                    <li
                      v-for="(point, i) in row.rec.caseAgainst"
                      :key="i"
                      class="text-[10.5px] leading-snug text-ob-muted2 flex gap-1.5"
                    >
                      <span class="text-ob-sand shrink-0">−</span>{{ point }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="grid content-start gap-3 min-h-0">
              <div class="rounded-[6px] border border-ob-sand/10 px-3 py-2.5">
                <p class="font-mono text-[8.5px] uppercase tracking-[0.05em] text-ob-faint">
                  Dwelling stock
                </p>
                <p class="mt-0.5 font-mono text-[10px] text-ob-soft">
                  {{ dwellingLabel(row.rec) }}
                </p>
                <p class="mt-0.5 text-[11px] leading-snug text-ob-muted2 card-clamp-4">
                  {{ row.rec.dwelling?.suitableStock }}
                </p>
              </div>

              <div class="grid gap-3 md:grid-cols-2">
                <div class="rounded-[6px] border px-3 py-2.5" :class="practicalCardClass">
                  <p
                    class="font-mono text-[9px] uppercase tracking-[0.07em]"
                    :class="friendFor(row.rec.id) ? 'text-ob-gold' : 'text-ob-soft'"
                  >
                    {{ friendFor(row.rec.id) ? '★ Personal network' : 'Practical notes' }}
                  </p>
                  <p
                    v-if="friendFor(row.rec.id)"
                    class="mt-0.5 text-[10.5px] leading-snug card-clamp-2"
                    :class="friendFor(row.rec.id) ? 'text-ob-gold' : 'text-ob-muted2'"
                  >
                    {{ friendFor(row.rec.id).text }}
                  </p>
                  <p class="mt-1 text-[10.5px] leading-snug text-ob-muted2 card-clamp-4">
                    {{ row.rec.coparentingGeometry }}
                  </p>
                </div>

                <div
                  v-if="mode"
                  class="rounded-[6px] border border-ob-teal/18 bg-ob-surface px-3 py-2.5"
                >
                  <p class="font-mono text-[9px] uppercase tracking-[0.07em] text-ob-soft">
                    Fit under {{ mode.label }}
                  </p>
                  <p class="mt-0.5 font-mono text-[10.5px] leading-snug" :class="fitClass(row)">
                    {{ fitLine(row) }}
                  </p>
                  <p
                    v-if="mode.priceNote"
                    class="mt-1 text-[10px] leading-snug text-ob-faint card-clamp-3"
                  >
                    {{ mode.priceNote }}
                  </p>
                </div>
              </div>

              <div
                v-if="facilitiesFor(row.rec.id).length"
                class="rounded-[6px] border border-ob-sand/10 px-3 py-2"
              >
                <p class="font-mono text-[8.5px] uppercase tracking-[0.05em] text-ob-faint">
                  Nearby facilities
                </p>
                <div class="mt-1 flex flex-wrap gap-1">
                  <span
                    v-for="facility in facilitiesFor(row.rec.id)"
                    :key="facility.id"
                    class="font-mono text-[9px] px-1.5 py-[2px] rounded-full border border-ob-purple/30 text-ob-muted2"
                    >{{ facility.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <CommunityContextSection :area-id="row.rec.id" :list-limit="4" compact />
        </div>

        <div class="flex items-center gap-3 border-t border-ob-sand/8 pt-2">
          <button
            @click.stop="showEvidence = true"
            class="font-mono text-[10.5px] text-ob-faint hover:text-ob-teal transition-colors"
          >
            full evidence & research detail ▸
          </button>
          <p class="font-mono text-[9px] text-ob-faint ml-auto">
            click anywhere else on the card to close
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { bandFor } from '@/data/dwelling/mapConfig.js'
import { FEE_ESTIMATE_BY_RISK } from '@/data/dwelling/areaCorridors.js'
import { localitiesForArea, isGroupedArea } from '@/data/dwelling/areaGeo.js'
import { trainLines, linesForArea } from '@/data/dwelling/trainLines.js'
import { facilitiesForArea } from '@/data/dwelling/facilities.js'
import { friendContextFor } from '@/data/dwelling/personalAnchors.js'
import { allInMonthly } from '@/composables/useRepayment.js'
import AreaDetailDrawer from './AreaDetailDrawer.vue'
import CommunityContextSection from './CommunityContextSection.vue'

const props = defineProps({
  row: { type: Object, required: true },
  rankById: { type: Object, required: true },
  shortlistIds: { type: Array, default: () => [] },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
  mode: { type: Object, default: null },
})

const emit = defineEmits(['toggle-shortlist', 'close'])

const showEvidence = ref(false)
watch(
  () => props.row?.rec?.id,
  () => {
    showEvidence.value = false
  },
)

const sharedNote = computed(() => {
  const areaId = props.row.rec.id
  if (!isGroupedArea(areaId)) return null
  return `Grouped coverage: ${localitiesForArea(areaId).join(' + ')} market assumptions shared.`
})
const gateNote = computed(() => {
  if (!props.row.reasons.length) return null
  const lead = props.row.reasons[0]
  const suffix = props.row.reasons.length > 1 ? ` +${props.row.reasons.length - 1}` : ''
  return `${props.row.status === 'reject' ? 'Fails' : 'Conditional'}: ${lead}${suffix}`
})
const headerNote = computed(() => [sharedNote.value, gateNote.value].filter(Boolean).join(' · '))
const headerMetrics = computed(() => [
  { label: 'Purchase band', value: priceBand(props.row.rec) },
  { label: `All-in @ ${props.payoffYears}yr`, value: monthlyLabel(props.row.rec), tone: 'text-ob-teal' },
  { label: 'Collins St commute', value: commuteLabel(props.row), tone: bandClass(props.row.band) },
  { label: 'Owners-corp', value: ocLabel(props.row.rec), tone: 'text-ob-muted2' },
])
const practicalCardClass = computed(() =>
  friendFor(props.row.rec.id)
    ? 'border-ob-gold-muted/20'
    : 'border-ob-sand/10 bg-ob-surface/60',
)

function bandColor(row) {
  return bandFor(row.weighted).color
}
function bandLabel(row) {
  return bandFor(row.weighted).label
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
function priceBand(rec) {
  const price = rec.dwelling?.indicativePrice
  return price ? '$' + Math.round(price[0] / 1000) + 'k–$' + Math.round(price[1] / 1000) + 'k' : 'n/a'
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
  return monthly != null ? '$' + monthly.toLocaleString('en-AU') : 'n/a'
}
function ocLabel(rec) {
  const oc = rec.dwelling?.annualOc
  return oc ? '$' + oc[0].toLocaleString('en-AU') + '–$' + oc[1].toLocaleString('en-AU') + '/yr' : 'n/a'
}
function commuteLabel(row) {
  if (!row.commute) return 'n/a'
  return `${row.commute.typical}m typical · ${row.commute.stressed}m stressed`
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
function dots(v) {
  if (v == null) return 'n/a'
  return '●'.repeat(v) + '○'.repeat(5 - v)
}
function schoolChips(rec) {
  const childhood = rec.childhood
  if (!childhood) return []
  return [...(childhood.publicPrimary || []), ...(childhood.publicSecondary || [])]
}
function friendFor(areaId) {
  return friendContextFor(areaId)
}
function facilitiesFor(areaId) {
  return facilitiesForArea(areaId)
}
function fitClass(row) {
  return { ok: 'text-ob-teal', conditional: 'text-ob-muted', reject: 'text-ob-sand' }[row.status]
}
function fitLine(row) {
  const label = props.mode ? `under ${props.mode.label}` : 'under current settings'
  if (row.status === 'ok') return `✓ viable ${label}`
  if (row.status === 'conditional') return `~ conditional ${label}: ${row.reasons[0] || ''}`
  return `✕ fails ${label}: ${row.reasons[0] || ''}`
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
