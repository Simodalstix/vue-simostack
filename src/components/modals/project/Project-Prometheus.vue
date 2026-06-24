<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Prometheus + Grafana Monitoring Stack"
  >
    <!-- Screenshots -->
    <div class="px-4 pt-3 pb-3">
      <div class="flex flex-col gap-3">
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
    </div>

    <!-- Description + GitHub -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Centralised monitoring stack using <span class="text-ob-teal-bright">Prometheus</span> for
        metrics collection and <span class="text-ob-teal-bright">Grafana</span> for visualization.
        <span class="text-ob-teal-bright">Node Exporters</span> on Linux VMs (Rocky, Ubuntu) expose
        CPU, memory, disk, and network data. Deployed across the lab with
        <span class="text-ob-teal-bright">Ansible</span>.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-beelink-monitoring"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
