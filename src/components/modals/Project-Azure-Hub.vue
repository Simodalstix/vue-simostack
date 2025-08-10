<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Hub & Spoke Network With Site to Site VPN"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram and Overview -->
      <div class="md:w-2/3 p-6 flex flex-col">
        <img
          src="/images/project-modal-images/azure-hub-spoke-vpn.jpg"
          alt="Azure Hub & Spoke VPN Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Hub-and-Spoke Network</li>
            <li>Hybrid cloud connectivity between Azure and AWS via site-to-site VPN</li>
            <li>Infrastructure as Code (IaC)</li>
            <li>Cross-cloud integration with secure routing and access controls</li>
            <li>Hybrid cloud connectivity between Azure and AWS via site-to-site VPN</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Cloud: Azure, AWS</li>
            <li>IaC: Terraform</li>
            <li>Networking: VPN Gateway, VNet Peering, NSGs</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        This project implements a production-style Azure network using a hub-and-spoke VNet
        architecture for scalable and secure connectivity. The hub hosts a VPN gateway, shared
        services, and centralized routing, enabling secure communication between spokes and
        extending the network to AWS for hybrid cloud integration. Each spoke is fully isolated to
        support independent workloads, enforce network security boundaries, and simplify
        multi-subnet application deployments. This design mirrors real-world enterprise environments
        where centralized control, segmentation, and cross-cloud connectivity are critical.
      </p>
      <a
        href="https://github.com/Simodalstix/az-hub-spoke-vpn"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        View on GitHub
      </a>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
