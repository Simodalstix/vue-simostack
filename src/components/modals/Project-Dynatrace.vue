<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Patch Management & Monitoring Agent Lab"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram -->
      <div class="md:w-2/3 p-6 flex flex-col">
        <img
          src="/images/project-modal-images/dynatrace-console.png"
          alt="Azure IaaS Operations Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Hybrid Monitoring Setup</li>
            <li>Automated Patch Management</li>
            <li>Multi-OS VM Provisioning</li>
            <li>Log Forwarding and Telemetry</li>
            <li>Network Security with pfSense</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Monitoring: Splunk, Dynatrace, Node Exporter</li>
            <li>IaaS: Azure (VMs, Update Management)</li>
            <li>Firewall: pfSense</li>
            <li>Scripting: Bash</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        Deployed and configured a hybrid monitoring and infrastructure lab using Splunk, Node
        Exporter, and Dynatrace. Provisioned VMs (RHEL, Ubuntu, Windows) behind a pfSense firewall
        and set up automated patching workflows using Azure Update Management.
      </p>
      <a
        href="https://github.com/Simodalstix/az-patching-dynatrace"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        View on GitHub
      </a>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
