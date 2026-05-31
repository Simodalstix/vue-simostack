<script setup>
import { selfProfile, wifeProfile, household, disclosureItems } from '@/data/clearance/identity.js'
</script>

<template>
  <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-5 flex flex-col gap-4">
    <p class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold font-mono">Identity</p>

    <!-- Self -->
    <div class="rounded-lg bg-slate-800 border border-slate-700 px-3 py-3 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <span class="text-[18px]">{{ selfProfile.flag }}</span>
        <span class="text-sm font-semibold text-slate-100">{{ selfProfile.name }}</span>
      </div>
      <p class="text-[11px] text-slate-400">Born: {{ selfProfile.born }}</p>
      <p class="text-[11px] text-slate-400">Citizenship: {{ selfProfile.citizenship }}</p>
      <p class="text-[11px] text-slate-400">Residency: {{ selfProfile.residency }}</p>
    </div>

    <!-- Wife -->
    <div class="rounded-lg border px-3 py-3 flex flex-col gap-1 border-amber-700/40 bg-amber-950/20">
      <div class="flex items-center gap-1.5">
        <span v-for="flag in wifeProfile.flags" :key="flag" class="text-[18px]">{{ flag }}</span>
        <span class="text-sm font-semibold text-slate-100 ml-1">{{ wifeProfile.name }}</span>
      </div>
      <p class="text-[11px] text-slate-400">Born: {{ wifeProfile.born }}</p>
      <p class="text-[11px] text-slate-400">Citizenship: {{ wifeProfile.citizenship }}</p>
      <p class="text-[11px] text-slate-400">Residency: {{ wifeProfile.residency }}</p>
    </div>

    <!-- Household -->
    <div class="flex flex-col gap-1">
      <p class="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-1">Household</p>
      <div v-for="item in household" :key="item.label" class="flex items-center gap-2">
        <span class="text-[14px]">{{ item.icon }}</span>
        <span class="text-[11px] text-slate-400">{{ item.label }}</span>
      </div>
    </div>

    <!-- Disclosure items -->
    <div class="flex flex-col gap-2">
      <p class="text-[9px] uppercase tracking-widest text-slate-500 font-mono">Disclosure Items</p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="item in disclosureItems"
          :key="item.label"
          :class="['inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-mono', item.colour]"
        >
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>
