<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="bg-gray-700/50 border border-gray-600 rounded-xl p-4"
    >
      <div class="text-sm text-gray-300">{{ item.label }}</div>
      <div class="text-xl font-bold mt-1">{{ item.value }}</div>
      <div v-if="item.hint" class="text-xs text-gray-400 mt-2">{{ item.hint }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
