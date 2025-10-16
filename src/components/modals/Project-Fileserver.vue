<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Fileserver (Samba Share + Autofs Integration)"
  >
    <div class="text-gray-200 space-y-4 text-base">
      <!-- Overview -->
      <div class="px-6 pt-2">
        <p class="text-gray-300 leading-relaxed">
          A centralized <span class="font-medium text-orange-300">Samba fileserver</span> hosted on
          Ubuntu, providing shared storage access for <span class="font-medium">Rocky</span> and
          <span class="font-medium">Ubuntu</span> clients using
          <span class="font-medium text-orange-300">Autofs</span> for on-demand mounting. Configured
          with guest access and SELinux integration to simulate a mixed-environment network share
          commonly found in enterprise networks.
        </p>
      </div>

      <!-- Screenshot grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
        <img
          src="/images/project-modal-images/fs-ansible.png"
          alt="Ansible deoploy output showing successful deployment"
          class="rounded-lg shadow-md w-full object-contain"
        />
        <img
          src="/images/project-modal-images/fs-smbconf.png"
          alt="smb.conf showing beelinkshare configuration"
          class="rounded-lg shadow-md w-full object-contain"
        />
        <img
          src="/images/project-modal-images/fs-smbstatus.png"
          alt="systemctl status smb service running"
          class="rounded-lg shadow-md w-full object-contain"
        />

        <img
          src="/images/project-modal-images/fs-clientmount.png"
          alt="Client VM listing files from mounted beelinkshare"
          class="rounded-lg shadow-md w-full object-contain"
        />
      </div>

      <!-- Footer -->
      <footer
        class="border-t border-gray-700 px-6 py-3 flex flex-col sm:flex-row justify-between items-center text-gray-300 text-base"
      >
        <div class="sm:w-2/3 text-center sm:text-left leading-snug">
          <span class="font-medium">Scope:</span>
          Demonstrates shared storage access between Linux systems using Samba and Autofs, including
          SELinux configuration for cross-platform compatibility.
        </div>

        <a
          href="https://github.com/Simodalstix/ansible-beelink-fileserver"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-md shadow-sm transition-colors duration-200 mt-2 sm:mt-0"
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
