<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="OPNsense Firewall (WireGuard + Routing)"
  >
    <!-- Screenshot -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/opnsense-wireguard.png"
        alt="OPNsense WireGuard Firewall"
        class="object-contain rounded-lg w-full max-h-[65vh] mx-auto"
      />
    </div>

    <!-- Description -->
    <div class="px-4 pb-4">
      <p class="text-base text-slate-300 leading-relaxed">
        Homelab firewall configuration using <span class="text-cyan-300">OPNsense</span>.
        Configured <span class="text-cyan-300">DHCP</span>, routing, and
        <span class="text-cyan-300">VLAN</span> segmentation for network isolation, with
        <span class="text-cyan-300">WireGuard VPN</span> for secure remote access — preserved
        as a reference setup for earlier routing and VPN experiments.
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
