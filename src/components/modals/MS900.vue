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
       <div class="mt-4">
        <a
          href="https://learn.microsoft.com/api/credentials/share/en-us/SimonParker-8212/989AE3914AA3B976?sharingId=F0664CD37994DC5D"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Microsoft Learn
        </a>
      </div>
    </div>
  </BaseModal>
</template>
