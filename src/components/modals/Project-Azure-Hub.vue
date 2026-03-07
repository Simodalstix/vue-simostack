<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Org-Ready Hub-Spoke Landing Zone Architecture"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/azure-landing-zone-hub-diagram.svg"
        alt="Azure Enterprise Landing Zone Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Enterprise-grade Azure Landing Zone with modular Terraform architecture. Hub-spoke topology centralizes security (Azure Firewall, Bastion) and foundation services (Key Vault, Private DNS). Multiple spoke networks for workload isolation with hybrid connectivity to AWS via IPSec VPN.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-hub-spoke-vpn"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
