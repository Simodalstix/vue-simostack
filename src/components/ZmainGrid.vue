<template>
  <div class="bg-gray-900 text-gray-200">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <Left class="min-w-0" />
      <Middle class="min-w-0" />
      <Right class="min-w-0" />
    </div>
  </div>
</template>

<script setup>
import Left from './Left.vue'
import Middle from './Middle.vue'
import Right from './Right.vue'
</script>
