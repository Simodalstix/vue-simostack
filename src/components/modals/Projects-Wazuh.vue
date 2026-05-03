<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="SOC Lab: Wazuh + ELK on VMware"
  >
    <!-- Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/wazuh-elk.jpg"
        alt="Wazuh + ELK SOC Lab Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Blue-team homelab with Wazuh SIEM and Elastic Stack. Ingesting logs from Windows (Sysmon) and Linux endpoints, building detection rules, and mapping alerts to MITRE ATT&CK. Agent deployment automated with Ansible.
      </p>
      <a
        href="https://github.com/Simodalstix/wazuh-soc-lab"
        target="_blank"
        rel="noopener"
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
