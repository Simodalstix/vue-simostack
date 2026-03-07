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
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Single-VM deployment using Ansible to configure Django polls app, PostgreSQL, Prometheus metrics, Grafana dashboards, and Loki log aggregation with Nginx reverse proxy. Five idempotent roles with templated configs and one-command deployment.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-monitoring-lab"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
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
