<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="OPNsense Firewall (WireGuard + Routing)"
  >
    <div class="text-gray-200 space-y-4 text-base">
      <!-- Image -->
      <div class="px-6">
        <img
          src="/images/project-modal-images/opnsense-wireguard.png"
          alt="OPNsense WireGuard Firewall"
          class="object-contain rounded-lg w-full max-h-[65vh] mx-auto"
        />
      </div>

      <!-- Description -->
      <div class="px-6">
        <p class="text-gray-300 leading-relaxed">
          Practicing firewall configuration with OPNsense. Configured DHCP, routing, and VLAN segmentation for the homelab network.
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
