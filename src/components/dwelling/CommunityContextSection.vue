<template>
  <!-- Community Context · ABS Census 2021. Descriptive by default: records
       carry contextOnly / excludeFromSuburbScore / scoreContribution: 0. Three
       named derived measures are scored: the opt-in Chinese-community lens,
       grouped other-communities lens, and the partner-pool criterion
       (unpartnered 25-54 only). Combined lens labels render
       each component SAL suburb separately; percentages are never averaged
       and medians never blended. -->
  <div v-if="ctx" :class="rootClass">
    <div :class="compact ? 'flex flex-wrap items-baseline gap-x-2 gap-y-0.5' : ''">
      <p
        :class="
          compact
            ? 'font-mono text-[10px] uppercase tracking-[0.08em] text-ob-purple'
            : 'font-mono text-[10.5px] uppercase tracking-[0.08em] text-ob-purple'
        "
      >
        ABS Census 2021 · descriptive except named scored lens fields
      </p>
      <p
        v-if="ctx.components.length > 1"
        :class="
          compact
            ? 'font-mono text-[9.5px] text-ob-faint leading-snug'
            : 'font-mono text-[10px] text-ob-faint leading-snug mt-0.5'
        "
      >
        component suburbs shown separately, never averaged
      </p>
    </div>

    <div :class="componentsClass">
      <div v-for="c in ctx.components" :key="c.name" :class="compact ? 'space-y-1.5' : 'space-y-2'">
        <p
          v-if="ctx.components.length > 1"
          :class="
            compact
              ? 'text-[11.5px] font-semibold text-ob-text'
              : 'text-[12.5px] font-semibold text-ob-text'
          "
        >
          {{ c.record.suburb }}
        </p>

        <!-- scalar + percentage measures, each on its published ABS denominator -->
        <div :class="coreMeasuresClass">
          <div v-for="m in coreMeasures(c.record)" :key="m.label">
            <p
              :class="
                compact
                  ? 'font-mono text-[8.5px] uppercase tracking-[0.05em] text-ob-faint'
                  : 'font-mono text-[9.5px] uppercase tracking-[0.06em] text-ob-faint'
              "
            >
              {{ m.label }}
            </p>
            <p
              :class="
                compact
                  ? 'text-[10.5px] text-ob-muted2 leading-snug'
                  : 'text-[12px] text-ob-muted2 leading-snug'
              "
            >
              {{ m.value }}
            </p>
          </div>
        </div>

        <div v-if="birthplaces(c.record).length && !compact">
          <p class="font-mono text-[9.5px] uppercase tracking-[0.06em] text-ob-faint mb-1">
            Top overseas countries of birth
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="b in birthplaces(c.record)"
              :key="b.name"
              class="font-mono text-[10.5px] px-2 py-[2px] rounded-full border border-ob-purple/25 text-ob-muted2"
              >{{ b.name }} {{ fmtPct(b.percentage) }}</span
            >
          </div>
        </div>
        <p v-else-if="birthplaces(c.record).length" class="text-[10px] leading-snug text-ob-muted2">
          <span class="font-mono uppercase tracking-[0.05em] text-[8.5px] text-ob-faint">
            Birthplaces
          </span>
          · {{ inlineList(birthplaces(c.record)) }}
        </p>

        <!-- religious affiliation (optional summary) -->
        <p
          v-if="religionLine(c.record)"
          :class="
            compact
              ? 'font-mono text-[9.5px] text-ob-dim leading-snug'
              : 'font-mono text-[10.5px] text-ob-dim leading-snug'
          "
        >
          <span
            :class="
              compact
                ? 'uppercase tracking-[0.05em] text-ob-faint text-[8.5px]'
                : 'uppercase tracking-[0.06em] text-ob-faint text-[9.5px]'
            "
            >Religion · </span
          >{{ religionLine(c.record) }}
        </p>

        <!-- supplementary household context: ordinary rows, same visual weight
             as the other community measures -->
        <div
          v-if="householdContext(c.record).length"
          :class="
            compact
              ? 'grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-0.5'
              : 'grid grid-cols-2 gap-x-5 gap-y-1'
          "
        >
          <p
            v-for="h in householdContext(c.record)"
            :key="h.label"
            :class="
              compact ? 'font-mono text-[9.5px] text-ob-dim' : 'font-mono text-[10.5px] text-ob-dim'
            "
          >
            {{ h.label }}: <span class="text-ob-muted2">{{ h.value }}</span>
          </p>
        </div>

        <!-- source disclosure belongs to the full evidence drawer -->
        <p
          v-if="showEvidenceDetails"
          :class="
            compact
              ? 'font-mono text-[8.5px] text-ob-faint leading-snug'
              : 'font-mono text-[9.5px] text-ob-faint leading-snug'
          "
        >
          {{ sourceText(c.record) }}
        </p>
      </div>
    </div>

    <p
      v-if="ctx.missing.length"
      :class="
        compact
          ? 'font-mono text-[9px] text-ob-faint leading-snug'
          : 'font-mono text-[10px] text-ob-faint leading-snug'
      "
    >
      No individual SAL record in this dataset yet for {{ ctx.missing.join(', ') }}.
    </p>
    <p
      v-if="showEvidenceDetails"
      :class="
        compact
          ? 'font-mono text-[8.5px] text-ob-faint leading-snug'
          : 'font-mono text-[9.5px] text-ob-faint leading-snug'
      "
    >
      ABS applies small random adjustments for privacy, so component sums can differ slightly from
      published totals.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  communityContextFor,
  fmtPct,
  fmtCount,
  fmtWeeklyIncome,
  fmtMedianAge,
  sourceLineFor,
} from '@/data/dwelling/communityContext.js'

const props = defineProps({
  areaId: { type: String, required: true },
  // how many birthplace list items to show per component
  listLimit: { type: Number, default: 5 },
  compact: { type: Boolean, default: false },
  showEvidenceDetails: { type: Boolean, default: false },
})

const ctx = computed(() => communityContextFor(props.areaId))
const compact = computed(() => props.compact)
const rootClass = computed(() =>
  compact.value
    ? 'border-l-2 border-ob-purple/45 pl-3 space-y-2'
    : 'border-l-2 border-ob-purple/45 pl-3 space-y-3',
)
const componentsClass = computed(() =>
  compact.value && ctx.value?.components?.length > 1
    ? 'grid gap-x-5 gap-y-2 xl:grid-cols-2'
    : 'grid gap-y-2',
)
const coreMeasuresClass = computed(() => {
  if (!compact.value) return 'grid grid-cols-2 gap-x-5 gap-y-1.5 lg:grid-cols-3'
  return ctx.value?.components?.length > 1
    ? 'grid grid-cols-3 gap-x-4 gap-y-1'
    : 'grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3'
})

// Percentages are used exactly as published; each measure keeps its own ABS
// denominator (persons, dwellings, households) — nothing recalculated here.
function coreMeasures(record) {
  const c = record.community || {}
  return [
    { label: 'Population', value: fmtCount(c.totalPopulation?.count) },
    { label: 'Median age', value: fmtMedianAge(c.medianAge) },
    { label: 'Households with children', value: fmtPct(c.householdsWithChildren?.percentage) },
    { label: 'Median household income', value: fmtWeeklyIncome(c.medianHouseholdIncome) },
    {
      label: 'Owner occupied · renting',
      value: `${fmtPct(c.tenure?.ownerOccupied?.percentage)} · ${fmtPct(c.tenure?.renting?.percentage)}`,
    },
    { label: 'Overseas-born', value: fmtPct(c.overseasBornPopulation?.percentage) },
  ]
}

function birthplaces(record) {
  return (record.community?.topOverseasCountriesOfBirth || [])
    .filter((b) => b.count != null && b.count > 0)
    .slice(0, props.listLimit)
}
function inlineList(rows) {
  return rows.map((r) => `${r.name} ${fmtPct(r.percentage)}`).join(' · ')
}
function religionLine(record) {
  const rows = (record.community?.religiousAffiliationSummary || [])
    .filter((r) => r.percentage != null && r.percentage >= 1)
    .slice(0, 3)
  if (!rows.length) return null
  return rows.map((r) => `${r.name} ${fmtPct(r.percentage)}`).join(' · ')
}
function householdContext(record) {
  const a = record.additionalHouseholdContext || {}
  const rows = [
    { label: 'Hong Kong-born', m: a.hongKongBornPopulation },
    { label: 'China-born', m: a.chinaBornPopulation },
    { label: 'Unpartnered 25-54 (2021)', m: a.unpartnered2554 },
    { label: 'One-parent families (2021)', m: a.loneParentFamilies },
  ]
  return rows
    .filter((r) => r.m?.percentage != null)
    .map((r) => ({ label: r.label, value: fmtPct(r.m.percentage) }))
}
function sourceText(record) {
  const s = sourceLineFor(record)
  return `${s.geographyType} ${s.geographyCode} · Census ${s.censusYear} · ${s.source} · retrieved ${s.retrievedAt}`
}
</script>
