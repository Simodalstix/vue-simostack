<template>
  <!-- Census records remain descriptive and component values are never
       averaged. Multi-suburb records share labels in a comparison matrix so
       the evidence reads as one compact panel instead of two mini-reports. -->
  <div v-if="ctx" :class="rootClass">
    <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <p
        class="font-mono uppercase tracking-[0.08em] text-ob-purple"
        :class="compact ? 'text-[10px]' : 'text-[10.5px]'"
      >
        People · Census 2021
      </p>
      <p class="font-mono text-ob-faint" :class="compact ? 'text-[9px]' : 'text-[9.5px]'">
        descriptive context
      </p>
    </div>

    <div
      v-if="ctx.components.length > 1"
      class="grid items-end gap-x-3"
      :style="{ gridTemplateColumns: comparisonColumns }"
    >
      <span aria-hidden="true"></span>
      <p
        v-for="c in ctx.components"
        :key="c.name"
        class="min-w-0 truncate font-semibold text-ob-text"
        :class="compact ? 'text-[11px]' : 'text-[12px]'"
      >
        {{ c.record.suburb }}
      </p>
    </div>

    <div v-if="isSingle" class="grid grid-cols-2 gap-1.5 xl:grid-cols-3">
      <div
        v-for="measure in singleMeasures"
        :key="measure.label"
        class="min-w-0 rounded-[5px] border border-ob-purple/15 px-2 py-1.5"
      >
        <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
          {{ measure.label }}
        </p>
        <p class="text-ob-muted2" :class="compact ? 'text-[10.5px]' : 'text-[11.5px]'">
          {{ measure.value }}
        </p>
      </div>
    </div>

    <div
      v-else-if="ctx.components.length"
      class="overflow-hidden rounded-[5px] border border-ob-purple/15"
    >
      <div
        v-for="(measure, index) in measureRows"
        :key="measure.label"
        class="grid items-baseline gap-x-3 px-2"
        :class="[compact ? 'py-1' : 'py-1.5', index ? 'border-t border-ob-purple/10' : '']"
        :style="{ gridTemplateColumns: comparisonColumns }"
      >
        <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
          {{ measure.label }}
        </p>
        <p
          v-for="(value, valueIndex) in measure.values"
          :key="ctx.components[valueIndex].name"
          class="min-w-0 text-ob-muted2"
          :class="compact ? 'text-[10.5px] leading-snug' : 'text-[11.5px] leading-snug'"
        >
          {{ value }}
        </p>
      </div>
    </div>

    <div v-if="hasBackground" class="space-y-1">
      <template v-if="isSingle">
        <div class="border-t border-ob-purple/10 pt-1.5">
          <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
            Background
          </p>
          <p
            class="text-ob-muted2"
            :class="compact ? 'text-[9.5px] leading-snug' : 'text-[10.5px] leading-relaxed'"
          >
            {{ inlineList(birthplaces(ctx.components[0].record)) }}
          </p>
        </div>
      </template>
      <template v-else>
        <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
          Background
        </p>
        <div class="grid gap-x-3" :style="{ gridTemplateColumns: comparisonColumns }">
          <span aria-hidden="true"></span>
          <p
            v-for="c in ctx.components"
            :key="c.name"
            class="text-ob-muted2"
            :class="compact ? 'text-[9.5px] leading-snug' : 'text-[10.5px] leading-relaxed'"
          >
            {{ inlineList(birthplaces(c.record)) }}
          </p>
        </div>
      </template>
    </div>

    <div v-if="householdRows.length" class="space-y-1">
      <template v-if="isSingle">
        <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
          Household snapshot
        </p>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1">
          <div v-for="row in householdRows" :key="row.label" class="min-w-0">
            <p class="font-mono text-ob-dim" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
              {{ row.label }}
            </p>
            <p class="text-ob-muted2" :class="compact ? 'text-[9.5px]' : 'text-[10.5px]'">
              {{ row.values[0] }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
          Household snapshot
        </p>
        <div
          v-for="row in householdRows"
          :key="row.label"
          class="grid gap-x-3"
          :style="{ gridTemplateColumns: comparisonColumns }"
        >
          <p class="font-mono text-ob-dim" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
            {{ row.label }}
          </p>
          <p
            v-for="(value, valueIndex) in row.values"
            :key="ctx.components[valueIndex].name"
            class="text-ob-muted2"
            :class="compact ? 'text-[9.5px]' : 'text-[10.5px]'"
          >
            {{ value }}
          </p>
        </div>
      </template>
    </div>

    <div
      v-if="hasReligion"
      class="grid gap-x-3"
      :style="{ gridTemplateColumns: comparisonColumns }"
    >
      <p class="font-mono text-ob-faint" :class="compact ? 'text-[8.5px]' : 'text-[9.5px]'">
        Belief
      </p>
      <p
        v-for="c in ctx.components"
        :key="c.name"
        class="font-mono text-ob-dim"
        :class="compact ? 'text-[9px] leading-snug' : 'text-[10px] leading-relaxed'"
      >
        {{ religionLine(c.record) || 'n/a' }}
      </p>
    </div>

    <!-- Source disclosure belongs to the full evidence drawer. -->
    <div v-if="showEvidenceDetails" class="space-y-0.5 border-t border-ob-purple/10 pt-1.5">
      <p
        v-for="c in ctx.components"
        :key="c.name"
        class="font-mono text-ob-faint"
        :class="compact ? 'text-[8.5px] leading-snug' : 'text-[9.5px] leading-snug'"
      >
        {{ c.record.suburb }} · {{ sourceText(c.record) }}
      </p>
    </div>

    <p
      v-if="ctx.missing.length"
      class="font-mono text-ob-faint"
      :class="compact ? 'text-[9px] leading-snug' : 'text-[10px] leading-snug'"
    >
      No Census record yet for {{ ctx.missing.join(', ') }}.
    </p>
    <p
      v-if="showEvidenceDetails"
      class="font-mono text-ob-faint"
      :class="compact ? 'text-[8.5px] leading-snug' : 'text-[9.5px] leading-snug'"
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
  listLimit: { type: Number, default: 5 },
  compact: { type: Boolean, default: false },
  showEvidenceDetails: { type: Boolean, default: false },
})

const ctx = computed(() => communityContextFor(props.areaId))
const compact = computed(() => props.compact)
const isSingle = computed(() => (ctx.value?.components?.length || 0) === 1)
const rootClass = computed(() =>
  compact.value
    ? 'border-l-2 border-ob-purple/45 pl-3 space-y-2'
    : 'border-l-2 border-ob-purple/45 pl-3 space-y-3',
)
const comparisonColumns = computed(() => {
  const count = Math.max(ctx.value?.components?.length || 1, 1)
  return `${compact.value ? '72px' : '88px'} repeat(${count}, minmax(0, 1fr))`
})

// Percentages are displayed on their published ABS denominators. Values from
// component suburbs share a visual row but are not recomputed or averaged.
function coreMeasures(record) {
  const c = record?.community || {}
  return [
    { label: 'People', value: fmtCount(c.totalPopulation?.count) },
    { label: 'Median age', value: fmtMedianAge(c.medianAge) },
    { label: 'With kids', value: fmtPct(c.householdsWithChildren?.percentage) },
    { label: 'Income', value: fmtWeeklyIncome(c.medianHouseholdIncome) },
    {
      label: 'Own / rent',
      value: `${fmtPct(c.tenure?.ownerOccupied?.percentage)} / ${fmtPct(c.tenure?.renting?.percentage)}`,
    },
    { label: 'Born overseas', value: fmtPct(c.overseasBornPopulation?.percentage) },
  ]
}

const measureRows = computed(() => {
  const components = ctx.value?.components || []
  const rows = coreMeasures(components[0]?.record)
  return rows.map((row, rowIndex) => ({
    label: row.label,
    values: components.map((component) => coreMeasures(component.record)[rowIndex].value),
  }))
})
const singleMeasures = computed(() => {
  const record = ctx.value?.components?.[0]?.record
  return coreMeasures(record)
})

function birthplaces(record) {
  return (record.community?.topOverseasCountriesOfBirth || [])
    .filter((birthplace) => birthplace.count != null && birthplace.count > 0)
    .slice(0, props.listLimit)
}

function inlineList(rows) {
  if (!rows.length) return 'n/a'
  return rows.map((row) => `${row.name} ${fmtPct(row.percentage)}`).join(' · ')
}

const hasBackground = computed(() =>
  (ctx.value?.components || []).some((component) => birthplaces(component.record).length),
)

function religionLine(record) {
  const rows = (record.community?.religiousAffiliationSummary || [])
    .filter((row) => row.percentage != null && row.percentage >= 1)
    .slice(0, 3)
  if (!rows.length) return null
  return rows.map((row) => `${row.name} ${fmtPct(row.percentage)}`).join(' · ')
}

function householdContext(record) {
  const additional = record.additionalHouseholdContext || {}
  const rows = [
    { label: 'Hong Kong-born', measure: additional.hongKongBornPopulation },
    { label: 'China-born', measure: additional.chinaBornPopulation },
    { label: 'Unpartnered 35-44 (2021)', measure: additional.unpartnered3544 },
    { label: 'One-parent families (2021)', measure: additional.loneParentFamilies },
  ]
  return rows
    .filter((row) => row.measure?.percentage != null)
    .map((row) => ({ label: row.label, value: fmtPct(row.measure.percentage) }))
}

const householdRows = computed(() => {
  const components = ctx.value?.components || []
  const labels = [
    ...new Set(
      components.flatMap((component) => householdContext(component.record).map((row) => row.label)),
    ),
  ]
  return labels.map((label) => ({
    label,
    values: components.map(
      (component) =>
        householdContext(component.record).find((row) => row.label === label)?.value || 'n/a',
    ),
  }))
})

const hasReligion = computed(() =>
  (ctx.value?.components || []).some((component) => religionLine(component.record)),
)

function sourceText(record) {
  const source = sourceLineFor(record)
  return `${source.geographyType} ${source.geographyCode} · Census ${source.censusYear} · ${source.source} · retrieved ${source.retrievedAt}`
}
</script>
