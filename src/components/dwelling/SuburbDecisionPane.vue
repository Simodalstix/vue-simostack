<template>
  <section
    class="h-[calc(100dvh-10rem)] min-h-[460px] bg-ob-surface2 border border-ob-sand/8 rounded-[8px] flex flex-col overflow-hidden lg:h-auto lg:min-h-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)]"
  >
    <!-- On phones the list is the navigation. Selecting a row swaps this pane
         to the existing full profile card; MapLibre is deliberately absent. -->
    <div v-if="pinnedRow" class="lg:hidden flex min-h-0 flex-1 flex-col">
      <div class="flex items-center gap-3 border-b border-ob-sand/8 px-3 py-2.5 shrink-0">
        <button type="button" class="font-mono text-[11px] text-ob-teal" @click="unpin">
          ← rankings
        </button>
        <span class="min-w-0 flex-1 truncate text-right font-mono text-[10px] text-ob-faint">
          {{ pinnedRow.rec.suburb }} · {{ strategy?.shortLabel }}
        </span>
      </div>
      <SuburbProfileCard
        class="min-h-0 flex-1"
        :row="pinnedRow"
        :rank-by-id="rankById"
        :payoff-years="payoffYears"
        :deposit="deposit"
        :rate="rate"
        :strategy="strategy"
        :weights="weights"
        :close-on-card-click="false"
      />
    </div>

    <div
      class="px-3 sm:px-4 py-2.5 border-b border-ob-sand/8 items-center gap-3 shrink-0"
      :class="pinnedRow ? 'hidden lg:flex' : 'flex'"
    >
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">Ranked suburbs</h2>
      <span v-if="strategy" class="font-mono text-[10.5px] text-ob-dim truncate">
        testing: {{ strategy.label }}
      </span>
      <span v-if="pinnedRow" class="font-mono text-[10px] text-ob-faint truncate">
        open on map: {{ pinnedRow.rec.suburb }}
      </span>
      <button
        v-if="pinnedRow"
        @click="unpin"
        class="ml-auto font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors shrink-0"
        title="Close the map card and return to the Melbourne lens"
      >
        map view
      </button>
    </div>

    <div
      class="min-h-0 flex-1 flex-col overflow-hidden"
      :class="pinnedRow ? 'hidden lg:flex' : 'flex'"
    >
      <button
        v-if="previewRow"
        @click="togglePin(previewRow.rec.id)"
        class="hidden sm:flex px-4 py-3 border-b border-ob-sand/8 shrink-0 min-h-[128px] flex-col gap-2 text-left transition-colors hover:bg-ob-surface/45 focus:bg-ob-surface/45"
      >
        <div class="decision-preview-heading flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[15px] font-bold text-ob-text">{{ previewHeading }}</p>
            <p class="mt-1 text-[11.5px] leading-snug text-ob-muted2 preview-clamp-2">
              {{ previewTagline(previewRow) }}
            </p>
          </div>
          <div class="shrink-0 text-right">
            <span
              v-if="isRankedRow(previewRow)"
              class="inline-flex items-baseline gap-1.5 rounded-full px-2 py-[3px] font-mono"
              :style="scoreBadgeStyle(previewRow)"
              :title="bandLabel(previewRow)"
            >
              <span class="text-[12px] font-bold leading-none text-ob-sand"
                >#{{ rankById[previewRow.rec.id] }}</span
              >
              <span class="text-[10px] text-ob-faint">·</span>
              <span
                class="text-[11px] font-extrabold leading-none"
                :style="{ color: bandColor(previewRow) }"
                >{{ scoreDisplay(previewRow) }}</span
              >
            </span>
            <span
              v-else-if="isVetoedRow(previewRow)"
              class="inline-flex items-baseline gap-1.5 font-mono text-ob-dim"
            >
              <span class="text-[12px] font-bold leading-none">Veto</span>
              <span class="text-[10px] text-ob-faint">·</span>
              <span class="text-[11px] font-extrabold leading-none">{{ previewRow.weighted }}</span>
            </span>
            <span
              v-else
              class="inline-flex rounded-full border border-ob-sand/30 bg-ob-sand/8 px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.06em] text-ob-sand"
            >
              unscored
            </span>
            <span
              v-if="isPrestigeRow(previewRow)"
              class="inline-flex rounded-full border border-ob-purple/45 bg-ob-purple/12 px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-ob-purple"
            >
              {{ PRESTIGE_LABEL }}
            </span>
          </div>
        </div>

        <p class="font-mono text-[10.5px] text-ob-soft">
          Cost evidence {{ costEvidence(previewRow.rec) }} · Commute {{ commuteShort(previewRow) }}
        </p>

        <!-- Why the score is what it is: the same criterion values and weights
             the ranking uses, shown as labelled micro-meters. Bonus criteria
             keep their workspace accent (amber beach, red Chinese lens). -->
        <div
          v-if="breakdown(previewRow).length"
          class="grid grid-cols-3 gap-x-3 gap-y-1.5"
          aria-label="Score breakdown by criterion"
        >
          <div v-for="b in breakdown(previewRow)" :key="b.key" class="min-w-0" :title="b.hint">
            <div class="flex items-baseline justify-between gap-1">
              <span
                class="font-mono text-[8.5px] uppercase tracking-[0.04em] text-ob-faint truncate"
              >
                {{ b.label }}
              </span>
              <span
                class="font-mono text-[9.5px] leading-none"
                :class="b.value == null ? 'italic text-ob-faint' : 'text-ob-muted2'"
              >
                {{ b.display }}
              </span>
            </div>
            <div class="mt-[3px] h-[3px] rounded-full bg-ob-sand/10 overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="b.barClass"
                :style="{ width: b.pct + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="mt-auto flex flex-wrap gap-1.5">
          <span
            v-for="badge in previewBadges(previewRow)"
            :key="badge.key"
            class="rank-pill inline-flex items-center border font-mono text-[10px] leading-none"
            :class="[
              badge.className,
              chipShapeClass(badge),
              badge.title ? 'context-pill' : null,
              badge.signal ? 'p-1' : 'px-2 py-[3px]',
            ]"
            :title="badge.title"
          >
            <DecisionSignalIcon v-if="badge.signal" :kind="badge.key" :label="badge.text" />
            <template v-else>{{ badge.text }}</template>
          </span>
        </div>
      </button>

      <ul
        class="min-h-0 flex-1 overflow-y-auto themed-scroll"
        role="listbox"
        aria-label="Ranked suburbs"
      >
        <template v-for="row in displayRows" :key="row.rec.id">
          <li
            v-if="isVetoedRow(row) && row === vetoedRows[0]"
            class="border-y border-ob-sand/10 bg-ob-surface/25 px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ob-faint"
          >
            Soul exclusions · owner judgment
          </li>
          <li>
            <button
              @click="togglePin(row.rec.id)"
              @mouseenter="setListHover(row.rec.id)"
              @mouseleave="setListHover(null)"
              @focus="setListHover(row.rec.id)"
              @blur="setListHover(null)"
              role="option"
              :aria-selected="modelValue === row.rec.id"
              class="w-full text-left px-3 sm:px-4 py-3 sm:py-2.5 border-b border-ob-sand/6 transition-colors focus:bg-ob-surface/60"
              :class="
                isVetoedRow(row)
                  ? 'opacity-45 grayscale hover:opacity-60'
                  : modelValue === row.rec.id
                    ? 'bg-ob-surface/70 ring-inset ring-1 ring-ob-teal/20'
                    : 'hover:bg-ob-surface/50'
              "
            >
              <div class="flex items-start gap-3">
                <span
                  class="w-10 shrink-0 pt-[1px] font-mono text-[12px] font-bold leading-none text-ob-sand"
                >
                  {{ isRankedRow(row) ? `#${rankById[row.rec.id]}` : '—' }}
                </span>

                <div class="min-w-0 flex-1">
                  <div class="flex items-start gap-2">
                    <span class="flex-1 truncate text-[12.5px] font-semibold text-ob-text">
                      {{ row.rec.suburb }}
                    </span>
                    <span
                      class="shrink-0 font-mono text-[11px] font-extrabold leading-none"
                      :style="{ color: bandColor(row) }"
                      :title="bandLabel(row)"
                    >
                      {{ scoreDisplay(row) }}
                    </span>
                  </div>

                  <p class="mt-0.5 text-[10.5px] leading-snug text-ob-muted2 preview-clamp-1">
                    {{ previewTagline(row) }}
                  </p>

                  <div
                    class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-ob-faint"
                  >
                    <span>{{ costEvidence(row.rec, true) }}</span>
                    <span>Commute {{ commuteShort(row) }}</span>
                  </div>
                  <div
                    v-if="gateChip(row) || rowBadges(row).length"
                    class="mt-1 flex flex-wrap gap-1"
                  >
                    <span
                      v-if="gateChip(row)"
                      class="rounded-full border px-1.5 py-[2px] font-mono text-[9px] leading-none"
                      :class="chipClass(gateChip(row))"
                    >
                      {{ gateChip(row).text }}
                    </span>
                    <span
                      v-for="chip in rowBadges(row)"
                      :key="chip.key"
                      class="rank-pill inline-flex items-center border font-mono text-[9px] leading-none"
                      :class="[
                        chipClass(chip),
                        chipShapeClass(chip),
                        chip.title ? 'context-pill' : null,
                        chip.signal ? 'p-1' : 'px-1.5 py-[2px]',
                      ]"
                      :title="chip.title"
                    >
                      <DecisionSignalIcon v-if="chip.signal" :kind="chip.key" :label="chip.text" />
                      <template v-else>{{ chip.text }}</template>
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </li>
        </template>
      </ul>

      <details v-if="unscoredRows.length" class="shrink-0 border-t border-ob-sand/10">
        <summary
          class="cursor-pointer select-none px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-sand"
        >
          Unscored · pending evidence ({{ unscoredRows.length }})
        </summary>
        <div class="max-h-32 overflow-y-auto themed-scroll border-t border-ob-sand/6">
          <div
            v-for="row in unscoredRows"
            :key="row.rec.id"
            class="flex items-baseline gap-2 border-b border-ob-sand/6 px-4 py-2 last:border-b-0"
          >
            <span class="min-w-0 flex-1 truncate text-[12px] font-semibold text-ob-muted2">
              {{ row.rec.suburb }}
            </span>
            <span
              v-if="isPrestigeRow(row)"
              class="shrink-0 rounded-full border border-ob-purple/45 bg-ob-purple/12 px-1.5 py-[2px] font-mono text-[8.5px] uppercase tracking-[0.06em] text-ob-purple"
            >
              {{ PRESTIGE_LABEL }}
            </span>
            <span class="shrink-0 font-mono text-[9.5px] text-ob-faint">
              {{ row.rec.region }}
            </span>
          </div>
        </div>
      </details>

      <p
        class="px-4 py-2 font-mono text-[10px] leading-relaxed text-ob-faint border-t border-ob-sand/8 shrink-0"
      >
        Hard gates rank before weighted fit · “gated” rows retain their criterion breakdown for
        diagnosis · provisional data until verified.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { decideCriteria } from '@/data/dwelling/decideStrategies.js'
import { fitBandBadgeFill, fitBandColor, getFitBand } from '@/data/dwelling/fitBands.js'
import { suburbProfileFor } from '@/data/dwelling/suburbProfiles.js'
import {
  PRESTIGE_LABEL,
  isPrestigeRow,
  isRankedRow,
  isUnscoredRow,
  isVetoedRow,
  partitionDecisionRows,
} from '@/data/dwelling/unscoredUx.js'
import {
  decisionContextFor,
  differentiatingChipsFor,
  gateExceptionChipFor,
} from '@/data/dwelling/decisionChips.js'
import { costMetricForArea, formatCostMetric } from '@/data/dwelling/cost/costContext.js'
import SuburbProfileCard from './SuburbProfileCard.vue'
import DecisionSignalIcon from './DecisionSignalIcon.vue'

const props = defineProps({
  rows: { type: Array, required: true },
  hoveredContext: { type: Object, default: null },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
  strategy: { type: Object, default: null },
  // Effective weight per criterion key (preset value or 0 when toggled off),
  // so the preview breakdown reads the exact inputs the ranking used.
  weights: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['hover'])

const modelValue = defineModel({ default: null })

const rowGroups = computed(() => partitionDecisionRows(props.rows))
const scoredRows = computed(() => rowGroups.value.ranked)
const vetoedRows = computed(() => rowGroups.value.vetoed)
const unscoredRows = computed(() => rowGroups.value.unscored)
const displayRows = computed(() => [...scoredRows.value, ...vetoedRows.value])

const rankById = computed(() => {
  const map = {}
  scoredRows.value.forEach((row, index) => {
    map[row.rec.id] = index + 1
  })
  return map
})

const rowById = computed(() => {
  const map = {}
  for (const row of props.rows) map[row.rec.id] = row
  return map
})

const hoveredRow = computed(() =>
  props.hoveredContext?.areaId ? rowById.value[props.hoveredContext.areaId] || null : null,
)
const pinnedRow = computed(() =>
  modelValue.value ? rowById.value[modelValue.value] || null : null,
)

// Hovering a ranked row previews it here and highlights it on the map (the
// parent routes the emitted id into the map's hover feature-state).
const listHoverId = ref(null)
function setListHover(id) {
  listHoverId.value = id
  emit('hover', id)
}
const listHoverRow = computed(() =>
  listHoverId.value ? rowById.value[listHoverId.value] || null : null,
)

const previewRow = computed(
  () => hoveredRow.value || listHoverRow.value || pinnedRow.value || scoredRows.value[0] || null,
)

const previewHeading = computed(() => {
  if (!previewRow.value) return ''
  const hoveredName =
    hoveredRow.value && props.hoveredContext?.localityName
      ? props.hoveredContext.localityName
      : null
  return hoveredName || previewRow.value.rec.suburb
})

function togglePin(id) {
  modelValue.value = modelValue.value === id ? null : id
}

function unpin() {
  modelValue.value = null
}

function scoreBadgeStyle(row) {
  if (isVetoedRow(row)) return { backgroundColor: 'rgba(122, 138, 153, 0.12)' }
  if (row.status === 'reject') return { backgroundColor: 'rgba(248, 113, 113, 0.12)' }
  return {
    backgroundColor: fitBandBadgeFill(row.weighted),
  }
}

function bandColor(row) {
  if (isVetoedRow(row)) return '#7A8A99'
  if (row.status === 'reject') return '#f87171'
  return fitBandColor(row.weighted)
}

function bandLabel(row) {
  if (isVetoedRow(row)) return 'Owner veto'
  if (row.status === 'reject') return `Gated: ${row.reasons[0] || 'hard requirement failed'}`
  return getFitBand(row.weighted).ariaLabel
}

function scoreDisplay(row) {
  return row.status === 'reject' ? 'gated' : row.weighted
}

function costEvidence(rec, compact = false) {
  return formatCostMetric(costMetricForArea(rec.id, props.strategy, rec), { compact })
}

function commuteShort(row) {
  const commute = row.commute || row.rec.commute
  return commute ? `${commute.typical}-${commute.stressed}m` : 'n/a'
}

function previewTagline(row) {
  const profile = suburbProfileFor(row.rec.id)
  return (
    profile?.previewTagline ||
    profile?.decision?.bestFor ||
    row.rec.caseFor?.[0] ||
    row.rec.dwelling?.suitableStock ||
    'Open the full suburb card for the detailed profile.'
  )
}

function rowBadges(row) {
  const rankBadges = differentiatingChipsFor(row, props.weights).map((badge) => ({
    ...badge,
    signal: true,
    title: badge.text,
  }))
  const contextBadges = decisionContextFor(row).map((fact) => ({
    key: fact.key,
    text: `${fact.label} ${fact.value}`,
    tone: fact.tone,
    title: 'Descriptive context; does not affect rank',
  }))
  const leadingRankBadges = rankBadges.filter((badge) => ['friend', 'beach'].includes(badge.key))
  const trailingRankBadges = rankBadges.filter((badge) => !['friend', 'beach'].includes(badge.key))
  return [...leadingRankBadges, ...contextBadges, ...trailingRankBadges]
}

function gateChip(row) {
  // Vetoes read as a grey score plus the "Veto" marker; the reason chip is
  // redundant clutter, so suppress it for veto rows.
  if (isVetoedRow(row)) return null
  return gateExceptionChipFor(row)
}

function chipClass(chip) {
  return {
    friend: 'border-ob-gold-muted/35 text-ob-gold bg-ob-gold-dark/40',
    beach: 'border-amber-500/35 text-amber-300 bg-amber-500/10',
    chinese: 'border-red-500/35 text-red-300 bg-red-500/10',
    pink: 'border-pink-500/35 text-pink-300 bg-pink-500/10',
    green: 'border-emerald-600/50 text-emerald-300 bg-emerald-700/25',
    yellow: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    rainbow: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
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

// Per-criterion contributions for the preview card: the same value() calls and
// effective weights useAreaRanking scores with, never a recomputed rival.
// Null stays an honest n/a with an empty meter.
function breakdown(row) {
  if (!row || isUnscoredRow(row)) return []
  return decideCriteria
    .filter((c) => (props.weights[c.key] ?? 0) > 0)
    .map((c) => {
      const value = c.value(row.rec, row.commuteScore, { strategy: props.strategy })
      const bonus = c.scoringMode === 'additiveBonus'
      const display = value == null ? 'n/a' : (Math.round(value * 10) / 10).toFixed(1)
      return {
        key: c.key,
        label: c.label,
        value,
        display,
        pct: value == null ? 0 : Math.max(0, Math.min(100, value * 10)),
        barClass:
          c.accent === 'amber'
            ? 'bg-amber-400'
            : c.accent === 'blue'
              ? 'bg-blue-400'
              : c.accent === 'purple'
                ? 'bg-purple-400'
                : c.accent === 'red'
                  ? 'bg-red-400'
                  : c.accent === 'pink'
                    ? 'bg-pink-400'
                    : 'bg-ob-teal',
        hint:
          value == null
            ? `${c.label}: not assessed, contributes nothing`
            : `${c.label} ${display}/10 × weight ${props.weights[c.key]}${bonus ? ' · additive bonus' : ''}`,
      }
    })
}

function previewBadges(row) {
  const badges = []
  const exception = isVetoedRow(row) ? null : gateExceptionChipFor(row)
  if (exception) badges.push(exception)
  badges.push(...rowBadges(row))
  return badges.map((badge) => ({
    ...badge,
    className: chipClass(badge),
  }))
}
</script>

<style scoped>
/* On-palette scrollbar (standard properties cover Chrome 121+ and Firefox):
   solid sand thumb, matching the rank numerals. */
.themed-scroll {
  scrollbar-width: thin;
  scrollbar-color: #d4903a transparent;
}

.preview-clamp-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-clamp-2 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
