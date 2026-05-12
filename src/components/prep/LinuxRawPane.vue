<template>
  <div class="grid grid-cols-3 gap-6 h-full p-6">
    <div v-for="(col, ci) in cols" :key="ci" class="overflow-y-auto space-y-6 min-h-0">
      <div v-for="section in col" :key="section.heading">
        <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">
          {{ section.heading }}
        </div>
        <PrepCodeBlock :code="section.code" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { linuxRaw } from '@/data/prep/linuxRaw.js'

const cols = [
  linuxRaw.slice(0, 3),
  linuxRaw.slice(3, 5),
  linuxRaw.slice(5),
]
</script>
