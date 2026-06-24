<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-ob-bg"
    borderClass="border border-ob-sand/16 shadow-2xl shadow-black/50"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-ob-bright">CompTIA Security+ ce Certification</h2>
        <div class="h-[3px] w-16 bg-[#C8202F] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Validates foundational cybersecurity knowledge across threat analysis, network security, identity management, and risk mitigation.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Threat vectors, vulnerability assessment, and penetration testing concepts</li>
        <li>Network security architecture, firewalls, IDS/IPS, and segmentation</li>
        <li>Identity and access management, PKI, and cryptographic protocols</li>
        <li>Incident response procedures, governance frameworks, and compliance standards</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">Security+ establishes a vendor-neutral security baseline, the shared language for evaluating risk and implementing controls across any platform.</p>
      <div>
        <a
          href="https://www.credly.com/badges/6966dceb-e004-4e7f-a0e2-690f3eb43f2e/public_url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#C8202F] hover:bg-[#A81B27] text-ob-bright font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
