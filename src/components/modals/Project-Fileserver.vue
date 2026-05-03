<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Fileserver (Samba Share + Autofs Integration)"
  >
    <!-- Screenshots -->
    <div class="px-4 pt-3 pb-3">
      <div class="grid grid-cols-2 gap-3">
        <img
          src="/images/project-modal-images/fs-ansible.png"
          alt="Ansible deploy output showing successful deployment"
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
    </div>

    <!-- Description + GitHub -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Centralised <span class="text-cyan-300">Samba</span> fileserver on Rocky Linux,
        providing shared storage for Rocky and Ubuntu clients via
        <span class="text-cyan-300">Autofs</span> on-demand mounting. Configured with guest
        access and <span class="text-cyan-300">SELinux</span> for cross-platform compatibility.
        Deployed and configured via <span class="text-cyan-300">Ansible</span>.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-beelink-fileserver"
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
