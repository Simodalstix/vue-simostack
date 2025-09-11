<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Org-Ready Hub-Spoke Landing Zone Architecture"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/azure-landing-zone-hub-diagram.svg"
          alt="Azure Enterprise Landing Zone Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Architecture Decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Enterprise-grade Azure Landing Zone with modular Terraform architecture. Hub-spoke
            topology centralizes security (Azure Firewall, Bastion) and foundation services (Key
            Vault, Private DNS). Multiple spoke networks for workload isolation with preserved
            hybrid connectivity to AWS via IPSec VPN.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-300">Key Architecture Decisions</h3>
          <div class="text-base text-gray-300 space-y-3">
            <p>
              Used hub-and-spoke topology to centralize shared services like Azure Firewall and
              Bastion. Each workload gets its own spoke VNet for isolation. Terraform modules
              make it easy to deploy new spokes consistently.
            </p>
            <p>
              Azure Firewall in the hub inspects all traffic between spokes and to the internet.
              Network Security Groups provide additional subnet-level filtering.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Network Architecture</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Hub VNet with shared services (firewall, bastion)</li>
          <li>Spoke VNets for workload isolation</li>
          <li>VNet peering connects hub to all spokes</li>
          <li>Terraform modules for consistent deployment</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Main costs: VPN Gateway, Azure Firewall, traffic</li>
          <li>Resource tagging for cost tracking</li>
          <li>Standard SKUs for cost optimization</li>
          <li>Shared services reduce per-spoke costs</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Security & Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Azure Firewall logs all traffic flows</li>
          <li>Network Security Groups for subnet filtering</li>
          <li>Azure Monitor for network performance</li>
          <li>Key Vault for secrets management</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem &amp; scope:</span>
          Learning Azure networking with hub-and-spoke architecture. Demonstrates VNet peering,
          Azure Firewall configuration, and modular Terraform patterns for scalable network
          design with centralized security controls.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/Azure-hub-spoke-vpn"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Inspiration
        </a>
      </div>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
