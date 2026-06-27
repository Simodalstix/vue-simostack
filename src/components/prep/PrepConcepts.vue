<template>
  <div class="font-mono text-xs">
    <template v-for="(row, i) in rows" :key="i">

      <!-- blank spacer between topic groups -->
      <div v-if="row.spacer" class="h-4" />

      <!-- full-width code block -->
      <div v-else-if="row.code" class="border-b border-ob-text/10 py-2">
        <PrepCodeBlock :code="row.code" />
      </div>

      <!-- concept / implication row -->
      <div v-else class="flex border-b border-ob-text/8 min-h-[1.75rem]">
        <div class="w-1/2 py-1.5 pr-10 text-ob-text leading-snug">{{ row.left }}</div>
        <div class="w-1/2 py-1.5 pl-6 text-ob-muted border-l border-ob-text/14 leading-snug">{{ row.right }}</div>
      </div>

    </template>
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'

defineProps({
  rows: { type: Array, required: true },
})
</script>
