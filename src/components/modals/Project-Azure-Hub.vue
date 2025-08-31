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
          <h3 class="font-bold text-lg mb-2 text-orange-300">Architecture Principles</h3>
          <div class="text-base text-gray-300 space-y-3">
            <p>
              Modular design: Reusable Terraform modules for networking, security, and foundation
              services. Single responsibility per module enables independent scaling and
              maintenance.
            </p>
            <p>
              Defense-in-depth: Azure Firewall for centralized security + NSGs for granular
              subnet-level controls. All spoke traffic force-tunneled through firewall for
              inspection and logging.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Modular architecture enables independent component updates and testing.</li>
          <li>
            Network Watcher + Connection Monitor for hybrid connectivity validation
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>
            Automated deployment with validation checks; rollback capability via Terraform state.
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Drivers: VPN Gateway, Azure Firewall, Key Vault, cross-spoke traffic.</li>
          <li>
            Cost Management + tagging strategy by workload and environment
            <span class="text-gray-400">(implemented)</span>
          </li>
          <li>Optimization: Standard SKUs, shared services consolidation, retention policies.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>
            Centralized logging: Firewall, NSG flow logs, Key Vault access logs
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>
            Security monitoring: Azure Security Center integration + compliance dashboard
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>Network analytics: Traffic flow patterns and security event correlation.</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Enterprise scope:</span>
          Comprehensive Azure networking foundation with enterprise-grade security, governance, and
          hybrid connectivity. Modular Terraform design enables rapid spoke deployment and
          consistent security baselines across workloads.
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
