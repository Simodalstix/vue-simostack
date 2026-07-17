<template>
  <section
    class="bg-ob-surface2 border border-ob-sand/8 rounded-[8px] flex flex-col overflow-hidden lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)]"
  >
    <div class="px-4 py-2.5 border-b border-ob-sand/8 flex items-center gap-3 shrink-0">
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

    <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
      <button
        v-if="previewRow"
        @click="togglePin(previewRow.rec.id)"
        class="px-4 py-3 border-b border-ob-sand/8 shrink-0 min-h-[128px] flex flex-col gap-2 text-left transition-colors hover:bg-ob-surface/45 focus:bg-ob-surface/45"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[15px] font-bold text-ob-text">{{ previewHeading }}</p>
            <p class="mt-1 text-[11.5px] leading-snug text-ob-muted2 preview-clamp-2">
              {{ previewTagline(previewRow) }}
            </p>
          </div>
          <span
            v-if="!isUnscoredRow(previewRow)"
            class="shrink-0 inline-flex items-baseline gap-1.5 rounded-full px-2 py-[3px] font-mono"
            :style="scoreBadgeStyle(previewRow)"
            :title="bandLabel(previewRow)"
          >
            <span class="text-[15px] font-bold leading-none text-ob-sand"
              >#{{ rankById[previewRow.rec.id] }}</span
            >
            <span class="text-[10px] text-ob-faint">·</span>
            <span
              class="text-[14px] font-extrabold leading-none"
              :style="{ color: bandColor(previewRow) }"
              >{{ previewRow.weighted }}</span
            >
          </span>
          <span
            v-else
            class="shrink-0 rounded-full border border-ob-sand/30 bg-ob-sand/8 px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.06em] text-ob-sand"
          >
            unscored
          </span>
        </div>

        <p class="font-mono text-[10.5px] text-ob-soft">
          Expected cost {{ priceBand(previewRow.rec) }} · Commute {{ commuteShort(previewRow) }}
        </p>

        <div class="flex flex-wrap gap-1.5 mt-auto">
          <span
            v-for="badge in previewBadges(previewRow)"
            :key="badge.key"
            class="inline-flex items-center rounded-full px-2 py-[3px] font-mono text-[10px] leading-none border"
            :class="badge.className"
          >
            {{ badge.text }}
          </span>
        </div>
      </button>

      <ul class="min-h-0 flex-1 overflow-y-auto" role="listbox" aria-label="Ranked suburbs">
        <li v-for="row in scoredRows" :key="row.rec.id">
          <button
            @click="togglePin(row.rec.id)"
            role="option"
            :aria-selected="modelValue === row.rec.id"
            class="w-full text-left px-4 py-2.5 border-b border-ob-sand/6 transition-colors focus:bg-ob-surface/60"
            :class="
              modelValue === row.rec.id
                ? 'bg-ob-surface/70 ring-inset ring-1 ring-ob-teal/20'
                : 'hover:bg-ob-surface/50'
            "
          >
            <div class="flex items-start gap-3">
              <span
                class="w-10 shrink-0 pt-[1px] font-mono text-[15px] font-bold leading-none text-ob-sand"
              >
                #{{ rankById[row.rec.id] }}
              </span>

              <div class="min-w-0 flex-1">
                <div class="flex items-start gap-2">
                  <span class="text-[12.5px] font-semibold text-ob-text flex-1 truncate">
                    {{ row.rec.suburb }}
                  </span>
                  <span
                    v-if="shortlistIds.includes(row.rec.id)"
                    class="text-ob-sand text-[11px] shrink-0"
                    title="Shortlisted"
                  >
                    ★
                  </span>
                  <span
                    class="shrink-0 font-mono text-[14px] font-extrabold leading-none"
                    :style="{ color: bandColor(row) }"
                    :title="bandLabel(row)"
                  >
                    {{ row.weighted }}
                  </span>
                </div>

                <p class="mt-0.5 text-[10.5px] leading-snug text-ob-muted2 preview-clamp-1">
                  {{ previewTagline(row) }}
                </p>

                <div
                  class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-ob-faint"
                >
                  <span>{{ priceBand(row.rec) }}</span>
                  <span>Commute {{ commuteShort(row) }}</span>
                </div>
                <div v-if="gateChip(row) || rowChips(row).length" class="mt-1 flex flex-wrap gap-1">
                  <span
                    v-if="gateChip(row)"
                    class="rounded-full border px-1.5 py-[2px] font-mono text-[9px] leading-none"
                    :class="chipClass(gateChip(row))"
                  >
                    {{ gateChip(row).text }}
                  </span>
                  <span
                    v-for="chip in rowChips(row)"
                    :key="chip.key"
                    class="rounded-full border px-1.5 py-[2px] font-mono text-[9px] leading-none"
                    :class="chipClass(chip)"
                  >
                    {{ chip.text }}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </li>
      </ul>

      <details v-if="unscoredRows.length" class="shrink-0 border-t border-ob-sand/10">
        <summary
          class="cursor-pointer select-none px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ob-sand"
        >
          Unscored · pending evidence ({{ unscoredRows.length }})
        </summary>
        <div class="max-h-32 overflow-y-auto border-t border-ob-sand/6">
          <div
            v-for="row in unscoredRows"
            :key="row.rec.id"
            class="flex items-baseline gap-2 border-b border-ob-sand/6 px-4 py-2 last:border-b-0"
          >
            <span class="min-w-0 flex-1 truncate text-[12px] font-semibold text-ob-muted2">
              {{ row.rec.suburb }}
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
        Hover the map to preview · click a suburb to open the full card · ✕/~ follows the active
        strategy · provisional data until verified.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { fitBandBadgeFill, fitBandColor, getFitBand } from '@/data/dwelling/fitBands.js'
import { suburbProfileFor } from '@/data/dwelling/suburbProfiles.js'
import { isUnscoredRow, partitionDecisionRows } from '@/data/dwelling/unscoredUx.js'
import { differentiatingChipsFor, gateExceptionChipFor } from '@/data/dwelling/decisionChips.js'

const props = defineProps({
  rows: { type: Array, required: true },
  hoveredContext: { type: Object, default: null },
  shortlistIds: { type: Array, default: () => [] },
  payoffYears: { type: Number, default: 15 },
  deposit: { type: Number, required: true },
  rate: { type: Number, default: 5.9 },
  strategy: { type: Object, default: null },
})
defineEmits(['toggle-shortlist'])

const modelValue = defineModel({ default: null })

const rowGroups = computed(() => partitionDecisionRows(props.rows))
const scoredRows = computed(() => rowGroups.value.ranked)
const unscoredRows = computed(() => rowGroups.value.unscored)

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
const previewRow = computed(
  () => hoveredRow.value || pinnedRow.value || scoredRows.value[0] || null,
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
  return {
    backgroundColor: fitBandBadgeFill(row.weighted),
  }
}

function bandColor(row) {
  return fitBandColor(row.weighted)
}

function bandLabel(row) {
  return getFitBand(row.weighted).ariaLabel
}

function priceBand(rec) {
  const price = rec.dwelling?.indicativePrice
  return price ? `$${Math.round(price[0] / 1000)}k-$${Math.round(price[1] / 1000)}k` : 'n/a'
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

function rowChips(row) {
  return differentiatingChipsFor(row)
}

function gateChip(row) {
  return gateExceptionChipFor(row)
}

function chipClass(chip) {
  return {
    friend: 'border-ob-gold-muted/35 text-ob-gold bg-ob-gold-dark/40',
    beach: 'border-ob-teal/30 text-ob-teal bg-ob-teal/8',
    train: 'border-ob-sand/20 text-ob-muted2 bg-ob-surface/60',
    commute: 'border-ob-teal/25 text-ob-teal-bright bg-ob-teal/6',
    schools: 'border-ob-purple/30 text-ob-purple bg-ob-purple/8',
    conditional: 'border-ob-sand/30 text-ob-sand bg-ob-sand/8',
    reject: 'border-red-400/35 text-red-300 bg-red-400/8',
  }[chip.tone]
}

function previewBadges(row) {
  const badges = []
  const exception = gateExceptionChipFor(row)
  if (exception) badges.push(exception)
  badges.push(...differentiatingChipsFor(row))
  return badges.slice(0, 3).map((badge) => ({
    ...badge,
    className: chipClass(badge),
  }))
}
</script>

<style scoped>
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
