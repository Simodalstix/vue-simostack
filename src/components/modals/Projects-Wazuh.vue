<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="SOC Lab: Wazuh + ELK on VMware (In Progress)"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Screenshot/Diagram -->
      <div class="md:w-2/3 p-4 sm:p-6 flex-grow">
        <img
          src="/images/project-modal-images/wazuh-elk.jpg"
          alt="Wazuh + ELK SOC Lab Diagram"
          class="rounded-lg w-full h-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Wazuh manager with Elastic (Elasticsearch + Kibana)</li>
            <li>Windows & Linux endpoints (Sysmon on Windows)</li>
            <li>Agent rollout & config automated via Ansible</li>
            <li>Alerting, dashboards, and rule tuning</li>
            <li>Detections mapped to MITRE ATT&CK</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>SIEM: Wazuh, Elastic Stack (Elasticsearch/Kibana)</li>
            <li>Automation: Ansible</li>
            <li>Platform: VMware Workstation / ESXi</li>
            <li>Endpoints: Windows (Sysmon), Linux</li>
            <li>Logging: Winlogbeat/Filebeat (as needed)</li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <p class="text-gray-400 italic w-full sm:w-2/3">
        Blue‑team home lab simulating SOC workflows: ingesting endpoint logs, generating alerts, and
        investigating detections with dashboards and MITRE mapping—fully automated where possible
        using Ansible.
      </p>
      <a
        href="https://github.com/Simodalstix/wazuh-soc-lab"
        target="_blank"
        rel="noopener"
        class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 w-full sm:w-auto text-center"
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
