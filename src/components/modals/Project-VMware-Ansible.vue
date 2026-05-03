<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Ansible Monitoring Lab — Django + Observability Stack"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/ansible-monitoring-diagram.svg"
        alt="Ansible Monitoring Stack Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Single-VM deployment using <span class="text-cyan-300">Ansible</span> to configure Django polls app, <span class="text-cyan-300">PostgreSQL</span>, <span class="text-cyan-300">Prometheus</span> metrics, <span class="text-cyan-300">Grafana</span> dashboards, and <span class="text-cyan-300">Loki</span> log aggregation with Nginx reverse proxy. Five idempotent roles with templated configs and one-command deployment.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-monitoring-lab"
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
