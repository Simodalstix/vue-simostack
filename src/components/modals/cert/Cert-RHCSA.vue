<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-ob-bg"
    borderClass="border border-ob-sand/16"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-ob-bright">Red Hat Certified System Administrator (RHCSA)</h2>
        <div class="h-[3px] w-16 bg-[#EE0000] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-muted2 mb-3">Validates core Linux system administration skills through a fully hands-on, performance-based exam on live RHEL systems.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>User and group management, file permissions, ACLs, and SELinux enforcement</li>
        <li>Disk partitioning, LVM, filesystem creation, and persistent mounts</li>
        <li>Service management with systemd, firewall rules, and network configuration</li>
        <li>Package management, shell scripting, cron scheduling, and log analysis</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4 mt-5 pt-4 border-t border-ob-sand/16">When something breaks and the GUI is gone, you're left with a terminal and what you actually know. RHCSA is built around exactly that — real systems, no safety net, no guessing.</p>
      <div>
        <a
          href="https://www.credly.com/badges/6b46d32a-6c42-4349-a74f-5ed0a8d0b67c"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#EE0000] hover:bg-[#C9190B] text-ob-bright font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
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
import BaseModal from '../BaseModal.vue'
</script>
