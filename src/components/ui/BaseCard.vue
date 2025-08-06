<template>
  <div class="rounded-xl p-4 shadow space-y-2">
    <h3 v-if="title" class="text-lg font-semibold text-white">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>
