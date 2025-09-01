<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Ansible Monitoring Lab — Django + Observability Stack"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/ansible-monitoring-diagram.svg"
          alt="Ansible Monitoring Stack Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Single-VM deployment lab using Ansible to configure a complete web stack: Django polls
            app, PostgreSQL database, Prometheus metrics, Grafana dashboards, and Loki log
            aggregation with Nginx reverse proxy.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Learning objectives</h3>
          <p class="text-base text-gray-300">
            Practice Infrastructure as Code with Ansible roles, understand observability stack
            integration, and demonstrate automated deployment patterns. Single VM keeps complexity
            low while covering real-world monitoring concepts.
          </p>
        </div>
      </aside>
    </div>

    <!-- Row: Automation, Simplicity, Monitoring -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Automation</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>5 Ansible roles: baseline, database, webapp, monitoring, logging.</li>
          <li>Idempotent playbooks; templated configs.</li>
          <li>One-command deployment with make targets.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Simplicity</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Single VM target; no container orchestration.</li>
          <li>Standard Ansible project layout.</li>
          <li>Copy-paste commands in README.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Prometheus scrapes system and app metrics.</li>
          <li>Grafana dashboards for visualization.</li>
          <li>Loki aggregates logs from all services.</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Learn Ansible automation and observability patterns by deploying a realistic web application
        stack with monitoring—practical, repeatable, and educational.
      </div>

      <a
        href="https://github.com/Simodalstix/ansible-monitoring-lab"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
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
