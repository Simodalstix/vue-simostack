<template>
  <div class="bg-gray-900 text-gray-200">
    <div class="mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_2.3fr_1.1fr] gap-5 p-2">
      <Left class="min-w-0" />
      <Middle class="min-w-0" />
      <Right class="min-w-0" />
    </div>
  </div>
</template>
<script setup>
import Left from '../components/LeftColumn.vue'
import Middle from '../components/MiddleColumn.vue'
import Right from '../components/RightColumn.vue'
</script>
