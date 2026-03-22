<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Red Hat Certified System Administrator (RHCSA)"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates core Linux system administration skills through a fully hands-on, performance-based exam on live RHEL systems.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>User and group management, file permissions, ACLs, and SELinux enforcement</li>
        <li>Disk partitioning, LVM, filesystem creation, and persistent mounts</li>
        <li>Service management with systemd, firewall rules, and network configuration</li>
        <li>Package management, shell scripting, cron scheduling, and log analysis</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">One of the few certifications with no multiple choice. Every task is performed on a live system under time pressure, proving real operational ability.</p>
      <div>
        <a
          href="https://www.credly.com/badges/6b46d32a-6c42-4349-a74f-5ed0a8d0b67c"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          View Badge on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
