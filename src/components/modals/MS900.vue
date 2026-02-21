<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Microsoft 365 Certified: Fundamentals"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-3 rounded">
      <p class="text-base text-white mb-2">Issued by Microsoft</p>
      <p class="text-base text-gray-300">
        Earning the Microsoft 365 Fundamentals certification demonstrates an understanding of the options available in Microsoft 365 and the benefits of adopting cloud services, the Software as a Service (SaaS) cloud model, and implementing Microsoft 365 cloud service.
      </p>
    </div>
  </BaseModal>
</template>
