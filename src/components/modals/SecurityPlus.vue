<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="CompTIA Security+ ce Certification"
    width="max-w-3xl"
    ><div class="bg-gray-700 p-3 rounded">
      <p class="text-base text-white mb-2">Issued by CompTIA</p>
      <p class="text-base text-gray-300">
        Earners of the CompTIA Security+ certification have the knowledge and skills necessary to
        perform core security functions required of any cybersecurity role. CompTIA Security+
        professionals know how to identify and address potential threats, attacks and
        vulnerabilities and they have established techniques in risk management, risk mitigation,
        threat management and intrusion detection.
      </p>
      <div class="mt-4">
        <a
          href="https://www.credly.com/badges/6966dceb-e004-4e7f-a0e2-690f3eb43f2e/public_url"
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
