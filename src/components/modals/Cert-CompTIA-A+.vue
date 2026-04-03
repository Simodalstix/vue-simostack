<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="CompTIA A+ ce Certification"
    width="max-w-3xl"
    ><div class="bg-gray-700 p-3 rounded">
      <p class="text-base text-white mb-2">Issued by CompTIA</p>
      <p class="text-base text-gray-300">
        Earners of the CompTIA A+ certification are proven problem solvers who are able to perform
        critical IT support tasks including device configuration, data backup and recovery, and
        operating system configuration. CompTIA A+ certified professionals have demonstrated
        baseline security skills for IT support roles and are able to detect and remove malware,
        address privacy concerns, and troubleshoot core service challenges.
      </p>
      <div class="mt-4">
        <a
          href="https://www.credly.com/badges/7a7d63f5-07dc-47f5-9d86-1ba95699d84d"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
