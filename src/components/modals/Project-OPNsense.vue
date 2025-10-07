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

      <!-- Two-column layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <!-- Overview -->
        <section>
          <h3 class="font-semibold text-orange-300 text-lg mb-2">Overview</h3>
          <p class="text-gray-300 leading-relaxed">
            OPNsense-based firewall VM providing segmented routing, DHCP, and VPN services for the
            lab. WireGuard configuration (pending) will enable secure connectivity between on-prem
            VMs and remote cloud environments.
          </p>
        </section>

        <!-- Details -->
        <section>
          <h3 class="font-semibold text-orange-300 text-lg mb-2">Details</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>DHCP-managed static leases for all lab nodes.</li>
            <li>Policy-based routing and VLAN segmentation.</li>
            <li>Planned: WireGuard tunnels to cloud landing zones.</li>
            <li>Monitoring via Prometheus and Wazuh integration.</li>
          </ul>
        </section>
      </div>

      <!-- Footer -->
      <footer
        class="border-t border-gray-700 px-6 py-3 flex flex-col sm:flex-row justify-between items-center text-gray-300 text-base"
      >
        <div class="sm:w-2/3 text-center sm:text-left leading-snug">
          <span class="font-medium">Scope:</span>
          Core gateway VM for inter-network routing and secure multi-zone VPN connectivity.
        </div>

        <button
          disabled
          class="bg-gray-700 text-gray-400 font-medium py-1.5 px-3 rounded-md shadow-sm mt-2 sm:mt-0 cursor-not-allowed"
        >
          Details coming soon
        </button>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
