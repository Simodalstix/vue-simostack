<template>
  <component :is="as" v-bind="attrs" class="rounded-xl p-4 shadow space-y-2">
    <h3 v-if="title" class="text-lg font-semibold text-white">{{ title }}</h3>
    <slot />
  </component>
</template>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
defineProps({
  title: String,
  as: {
    type: String,
    default: 'div', // 'a', 'button', etc
  },
})
</script>
