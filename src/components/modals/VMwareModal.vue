<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="VMware Lab">
    <!-- Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/vmware-workstation.png"
        alt="VMware Workstation – lab VMs"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description -->
    <div class="px-4 pb-4">
      <p class="text-base text-slate-300 leading-relaxed">
        VMware Workstation lab for practicing RHEL/RHCSA and prototyping infrastructure: pfSense, Active Directory, file services, and monitoring. Fast iteration environment for testing configurations before moving to the Proxmox host.
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({
  visible: Boolean,
})
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
