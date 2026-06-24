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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Single-VM deployment using <span class="text-ob-teal-bright">Ansible</span> to configure Django polls app, <span class="text-ob-teal-bright">PostgreSQL</span>, <span class="text-ob-teal-bright">Prometheus</span> metrics, <span class="text-ob-teal-bright">Grafana</span> dashboards, and <span class="text-ob-teal-bright">Loki</span> log aggregation with Nginx reverse proxy. Five idempotent roles with templated configs and one-command deployment.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-monitoring-lab"
        target="_blank"
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
