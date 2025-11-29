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
    <div class="bg-gray-700 p-4 rounded-lg">
      <!-- Short description -->
      <p class="text-base text-white mb-3">
        Issued by PeopleCert on behalf of AXELOS.
      </p>

      <p class="text-base text-gray-300 leading-relaxed">
        ITIL 4 Foundation introduces the core concepts of modern IT service management:
        service value systems, guiding principles, incident handling, change processes,
        service request workflows, and continual improvement. It establishes the shared
        terminology used across support, operations, and service desk environments.
      </p>

      <!-- Scorecard image -->
      <div class="mt-6 flex justify-center">
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
