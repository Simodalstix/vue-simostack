<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="ITIL 4 Foundation"
    width="max-w-3xl"
  >
    <div class="p-4">
      <p class="text-base text-gray-300 leading-relaxed mb-4">
        Issued by PeopleCert on behalf of AXELOS. Covers
        <span class="text-cyan-300">change enablement</span>,
        <span class="text-cyan-300">incident management</span>,
        <span class="text-cyan-300">service request workflows</span>, and continual improvement —
        the shared operational language for teams running production systems where changes follow
        a structured process, incidents have a clear escalation path, and
        <span class="text-cyan-300">on-call ownership</span> matters.
      </p>

      <!-- Scorecard image -->
      <div class="mt-4 flex justify-center">
        <img
          src="/images/project-modal-images/itil-scorecard.png"
          alt="ITIL 4 Foundation Score Report"
          class="rounded-lg max-h-[32rem] shadow-md"
        />
      </div>

      <!-- Footer note -->
      <p class="text-sm text-gray-300 mt-3 text-center italic">
        Official badge sharing requires an Axelos subscription.
        Full verification available upon request.
      </p>
    </div>
  </BaseModal>
</template>
