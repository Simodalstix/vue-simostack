<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="
PCAP™ – Certified Associate Python Programmer"
    width="max-w-3xl"
    ><div class="bg-gray-700 p-3">
      <p class="text-sm text-gray-300 mb-2">Issued by Python Institute</p>
      <p class="text-sm text-gray-300">
        Earners of this certification have a comprehensive understanding of application life-cycle
        management. They demonstrated proficiency in writing applications using AWS service APIs,
        AWS CLI, and SDKs; using containers; and deploying with a CI/CD pipeline. Certification
        holders can develop, deploy, and debug cloud-based applications following AWS best
        practices.
        <a
          href="https://www.credly.com/badges/dd32e128-d849-40fa-b39c-e4b77b3480cd"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan-400 hover:text-cyan-300 underline block mt-3"
        >
          → Verify Certification on Credly
        </a>
      </p>
    </div>
  </BaseModal>
</template>
