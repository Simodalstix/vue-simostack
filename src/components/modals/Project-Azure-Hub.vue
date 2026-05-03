<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Hub-Spoke Landing Zone Architecture"
    borderClass="border border-indigo-500/30 shadow-xl shadow-indigo-500/10"
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
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Enterprise-grade Azure Landing Zone with modular <span class="text-cyan-300">Terraform</span> architecture. Hub-spoke topology centralizes security (<span class="text-cyan-300">Azure Firewall</span>, Bastion) and foundation services (<span class="text-cyan-300">Key Vault</span>, Private DNS). Multiple spoke networks for workload isolation with hybrid connectivity to AWS via <span class="text-cyan-300">IPSec VPN</span>.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-hub-spoke-vpn"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
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
