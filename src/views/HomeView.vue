<template>
  <div class="bg-gray-900 text-gray-200">
    <div class="w-full xl:max-w-screen-2xl mx-auto px-4">
      <div class="grid grid-cols-1 gap-4 sm:gap-6 py-4 sm:py-6">
        <Left class="min-w-0" />
        <Middle class="min-w-0" />
        <Right class="min-w-0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Left from '../components/LeftColumn.vue'
import Middle from '../components/MiddleColumn.vue'
import Right from '../components/RightColumn.vue'
</script>
