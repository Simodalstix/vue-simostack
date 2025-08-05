<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="VMware + Monitoring Lab (In Progress)"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram -->
      <div class="md:w-2/3 p-6 flex-grow">
        <img
          src="/images/project-modal-images/ansible-vmware.svg"
          alt="VMware Monitoring Lab Diagram"
          class="object-contain rounded-lg w-full h-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Automated VM Provisioning</li>
            <li>Enterprise Monitoring Stack</li>
            <li>Configuration as Code (Ansible)</li>
            <li>Network Services with pfSense</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Virtualization: VMware Workstation</li>
            <li>Automation: Ansible</li>
            <li>Monitoring: Prometheus, Grafana, Splunk</li>
            <li>Networking: pfSense</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        This project builds a realistic enterprise monitoring lab using VMware Workstation, with
        automated provisioning and configuration of Linux and Windows VMs using Ansible playbooks
        and roles.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-splunk-setup"
        target="_blank"
        class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
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
