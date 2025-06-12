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
      <p class="text-base text-white mb-2">
        Microsoft Certified: Azure Administrator Associate (AZ-104)
      </p>
      <p class="text-base text-gray-300">
        This certification validates the skills required to manage Azure subscriptions, configure
        networking, secure identities, and monitor cloud resources. I've completed the full study
        plan and will be revising tomorrow before sitting the exam this Saturday.
      </p>
      <div class="mt-4">
        <span
          class="inline-block bg-cyan-600 text-white font-medium py-2 px-4 rounded-md shadow-sm cursor-default"
        >
          Verification link coming Saturday or Sunday
        </span>
      </div>
    </div>
  </BaseModal>
</template>
