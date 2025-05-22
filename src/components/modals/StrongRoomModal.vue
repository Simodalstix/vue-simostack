<template>
  <BaseModal :visible="visible" @close="$emit('close')" width="max-w-3xl">
    <div class="bg-gray-700 p-3">
      <h2 class="text-xl font-bold border-b-2 border-indigo-500 pb-1 mb-4">
        What Happened<span class="text-red-500">!</span>
      </h2>
      <p class="text-sm text-gray-300 leading-relaxed">
        Unfortunately, Strongroom.AI entered voluntary administration in April 2025 due to
        operational and financial challenges, resulting in approximately 50% of staff being made
        redundant — including my role. Despite the short tenure, my time at Strongroom.AI solidified
        my passion for tech, accelerated my skills in AWS and infrastructure, and gave me the
        confidence to pursue a cloud and DevOps career path.
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
