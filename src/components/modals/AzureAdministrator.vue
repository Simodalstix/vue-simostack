<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Microsoft Certified: Azure Administrator Associate"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-3 rounded">
      <p class="text-base text-white mb-2">Issued by Microsoft</p>
      <p class="text-base text-gray-300">
        Earning Azure Administrator Associate certification validates the skills and knowledge to
        implement, manage, and monitor an organization’s Microsoft Azure environment. Candidates
        have a deep understanding of each implementing, managing, and monitoring identity,
        governance, storage, compute, and virtual networks in a cloud environment, plus provision,
        size, monitor, and adjust resources, when needed.
      </p>
      <div class="mt-4">
        <a
          href="https://learn.microsoft.com/api/credentials/share/en-us/SimonParker-8212/8AEDB76D7A75F066?sharingId=F0664CD37994DC5D"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Microsoft Learn
        </a>
      </div>
    </div>
  </BaseModal>
</template>
