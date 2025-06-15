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
        <span
          class="inline-block bg-cyan-600 text-white font-medium py-2 px-4 rounded-md shadow-sm cursor-default"
        >
          Verification link coming as soon as Credly delivers the badge (~ Sunday)
        </span>
      </div>
    </div>
  </BaseModal>
</template>
