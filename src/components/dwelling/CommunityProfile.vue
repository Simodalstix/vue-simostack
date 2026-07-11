<template>
  <div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
      <h4 class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft">
        Community profile
        <span v-if="profile?.censusYear" class="text-ob-faint"
          >· Census {{ profile.censusYear }}</span
        >
      </h4>
      <a
        v-if="absSource"
        :href="absSource.url"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-[11px] text-ob-faint hover:text-ob-teal transition-colors"
        >ABS QuickStats ↗</a
      >
    </div>

    <p class="text-[11.5px] leading-relaxed text-ob-faint mb-3">
      Contextual only. Factual ABS composition, shown with geography and census year. Never scored,
      never ranked, and never used to infer safety, quality or desirability.
    </p>

    <div v-if="isEmpty" class="border border-dashed border-ob-sand/20 rounded-[6px] p-4">
      <p class="text-[12.5px] text-ob-muted2">
        Not yet pulled. Populate from ABS QuickStats for this exact geography before stating any
        figures. Placeholder fields below show what this section will carry.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 mt-3">
        <span
          v-for="f in fieldLabels"
          :key="f"
          class="font-mono text-[11px] text-ob-faint flex items-center justify-between gap-2"
        >
          {{ f }} <span class="text-ob-dim/60">—</span>
        </span>
      </div>
    </div>

    <ul
      v-if="profile?.notes?.length"
      class="mt-3 space-y-1.5 text-[12px] leading-relaxed text-ob-dim"
    >
      <li v-for="(n, i) in profile.notes" :key="i" class="flex gap-2">
        <span class="text-ob-faint shrink-0">note</span>{{ n }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: { type: Object, default: () => ({}) },
  absSource: { type: Object, default: null },
})

const fieldLabels = [
  'Top ancestries',
  'Countries of birth',
  'Languages at home',
  'Overseas-born %',
  'Age profile',
  'Households with children',
  'Lone-person households',
  'Owners vs renters',
  'Population change',
  'Cultural grocers & markets',
  'Language & community services',
  'Everyday cultural amenity',
]

const isEmpty = computed(() => {
  const p = props.profile || {}
  const arrays = [p.ancestries, p.birthplaces, p.languages, p.amenities]
  const arraysEmpty = arrays.every((a) => !a || a.length === 0)
  const scalarsEmpty = [
    p.overseasBornPct,
    p.ageProfile,
    p.householdsWithChildren,
    p.lonePerson,
    p.ownerVsRenter,
    p.populationChange,
  ].every((v) => v == null)
  return arraysEmpty && scalarsEmpty
})
</script>
