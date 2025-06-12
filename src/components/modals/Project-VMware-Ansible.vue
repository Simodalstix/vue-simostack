<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="VMware + Monitoring Lab (In Progress)"
  >
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-5 text-gray-200">
      <!-- Left: Diagram + summary -->
      <div class="mt-3">
        <img
          src="/images/project-modal-images/ansible-vmware.svg"
          alt="VMware Monitoring Lab Diagram"
          class="object-contain rounded shadow"
        />

        <p class="italic text-base text-amber-300 mt-3">
          A fully automated, self-contained monitoring lab built with Ansible, Splunk, Prometheus,
          and pfSense — running on VMware.
        </p>
      </div>

      <!-- Right: Description + GitHub + Badges -->
      <div class="text-base space-y-4 mt-3">
        <p>
          This project builds a realistic enterprise monitoring lab using VMware Workstation. I
          automated provisioning and configuration of Linux and Windows VMs using Ansible playbooks
          and roles.
        </p>
        <p>
          The environment includes Prometheus and Node Exporter on Ubuntu VMs, Grafana for
          dashboards, and Splunk Universal Forwarder on a RHEL host. A FreeBSD pfSense VM serves as
          the DHCP and DNS gateway, with a Windows Server AD VM optionally integrated for directory
          service telemetry.
        </p>
        <div class="flex gap-3 items-center">
          <!-- <img src="/images/main-tools/ansible.svg" class="h-24" title="Ansible" /> -->
          <a
            href="https://github.com/Simodalstix/ansible-splunk-setup"
            class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
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
