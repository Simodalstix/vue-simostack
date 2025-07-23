<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Patch Management & Monitoring Agent Lab"
  >
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-6 text-gray-200">
      <div class="mt-3">
        <img
          src="/images/project-modal-images/dynatrace-console.png"
          alt="Azure IaaS Operations Diagram"
          class="object-contain rounded shadow"
        />

        <p class="italic text-base text-orange-300 mt-3">
          Deployed and configured a hybrid monitoring and infrastructure lab using Splunk, Node
          Exporter, and Dynatrace.
        </p>
      </div>

      <div class="text-base space-y-4 mt-3">
        <p>
          Deployed and configured a hybrid monitoring and infrastructure lab using Splunk, Node
          Exporter, and Dynatrace. Provisioned VMs (RHEL, Ubuntu, Windows) behind a pfSense firewall
          and set up automated patching workflows using Azure Update Management.
        </p>
        <p>
          Installed Splunk Universal Forwarder and Node Exporter via custom Bash scripts to simulate
          basic telemetry and log forwarding. The lab focused on VM provisioning, network routing,
          patch automation, and agent-based monitoring—without relying on advanced observability
          stacks.
        </p>
        <div class="flex gap-3 items-center">
          <img src="/images/main-tools/terraform.svg" class="h-24" title="Terraform" />

          <a
            href="https://github.com/Simodalstix/az-patching-dynatrace"
            class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
            target="_blank"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
