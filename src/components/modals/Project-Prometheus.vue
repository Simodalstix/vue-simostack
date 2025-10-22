<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Prometheus + Grafana Monitoring Stack"
  >
    <div class="text-gray-200 space-y-3 text-base">
      <!-- Overview -->
      <div class="px-6 pt-2">
        <p class="text-gray-300 leading-relaxed">
          Centralized monitoring stack on
          <span class="font-medium text-orange-300">beelink-monitoring</span>, using
          <span class="font-medium">Prometheus</span> for metrics and
          <span class="font-medium">Grafana</span> for visualization. Node Exporters on Linux VMs
          (Rocky, Ubuntu) expose CPU, memory, disk, and network data, scraped by Prometheus and
          displayed in Grafana.
        </p>
      </div>

      <!-- Screenshot grid -->
      <div class="flex flex-col space-y-2 px-6">
        <img
          src="/images/project-modal-images/monitoring-ansible-nodeexporter.png"
          alt="Ansible playbook deploying node_exporters to remote VMs"
          class="rounded-lg shadow-md w-full object-contain"
        />
        <img
          src="/images/project-modal-images/monitoring-grafana-nodeexporter.png"
          alt="Grafana Node Exporter dashboard displaying VM metrics"
          class="rounded-lg shadow-md w-full object-contain"
        />
      </div>

      <!-- Footer -->
      <footer
        class="border-t border-gray-700 px-6 py-2 flex flex-col sm:flex-row justify-between items-center text-gray-300 text-base"
      >
        <div class="sm:w-3/4 text-center sm:text-left leading-snug">
          <span class="font-medium">Scope:</span>
          Demonstrates a Linux-based monitoring solution with Prometheus collecting metrics from
          distributed Node Exporters and Grafana providing centralized performance dashboards.
        </div>
        <a
          href="https://github.com/Simodalstix/ansible-beelink-monitoring"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-3 rounded-md shadow-sm mt-2 sm:mt-0 transition-colors duration-150"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
