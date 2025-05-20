<template>
  <div class="bg-gray-900 text-gray-200">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.6fr_2.5fr_0.9fr] gap-6 p-4">
      <Left class="min-w-0" />
      <Middle class="min-w-0" />
      <Right class="min-w-0" />
    </div>
  </div>
</template>

<script setup>
import Left from './LeftColumn.vue'
import Middle from './MiddleColumn.vue'
import Right from './RightColumn.vue'
</script>
