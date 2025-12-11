<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Red Hat Certified System Administrator (RHCSA)"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-3 rounded">
      <p class="text-base text-white mb-2">Issued by Red Hat</p>
      <p class="text-base text-gray-300">
        An IT professional who has earned the Red Hat® Certified System Administrator (RHCSA®) is
        able to perform the core system administration skills required in Red Hat Enterprise Linux
        environments. The credential is earned after successfully passing the Red Hat Certified
        System Administrator (RHCSA) Exam (EX200).
      </p>
      <div class="mt-4">
        <a
          href="https://www.credly.com/badges/6b46d32a-6c42-4349-a74f-5ed0a8d0b67c"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          View Badge on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
