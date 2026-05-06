<template>
  <div class="grid grid-cols-3 gap-x-8 gap-y-8 font-mono text-xs">
    <div v-for="(card, i) in cards" :key="i" class="flex flex-col gap-2">
      <div class="text-slate-200 font-semibold border-b border-slate-700 pb-1.5">
        {{ card.title }}
      </div>
      <div class="text-slate-400 leading-relaxed whitespace-pre-wrap flex-1">{{ card.body }}</div>
      <PrepCodeBlock v-if="card.code" :code="card.code" />
    </div>
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'

defineProps({
  cards: { type: Array, required: true },
})
</script>
