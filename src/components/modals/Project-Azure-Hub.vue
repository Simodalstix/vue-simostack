<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Hub–Spoke with Site-to-Site VPN to AWS (strongSwan)"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/azure-hub-spoke-vpn.jpg"
          alt="Azure Hub–Spoke with S2S VPN to AWS"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Decisions (paragraphs) -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">What this is</h3>
          <p class="text-base text-gray-300">
            Terraform-managed Azure hub-and-spoke network with a secure IPSec site-to-site VPN to an
            AWS VPC running <em>strongSwan</em>. Hub centralises shared services (VPN Gateway, Azure
            Firewall, Bastion); spokes are peered and routed via the hub for egress and hybrid
            connectivity.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key decisions &amp; trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p>
              Opted for a hybrid lab by terminating IPsec on an EC2/strongSwan endpoint (home
              CGNAT), instead of simulated on-prem. Trade-off: self-hosted IPsec (strongSwan on EC2
              + EIP) as the Azure VPN peer—lower cost & more control; I run the gateway.
            </p>
            <p>
              Centralised hub control: VPN Gateway + Azure Firewall handle transit & egress; spokes
              use peering and route tables (egress via firewall, VPN routes to AWS). Bastion for
              secure admin access.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability (concise + honest today) -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Goal: stable IPSec tunnel; bi-directional ping Azure↔AWS.</li>
          <li>
            Measurement: Azure Monitor VPN connection state + EC2/strongSwan status
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>
            Fail paths: route/NSG/firewall misconfig; validate with `ipsec statusall` &amp; flow
            logs.
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Drivers: VPN Gateway, Azure Firewall, Bastion, cross-cloud egress.</li>
          <li>
            Method: Azure Pricing Calculator + Cost Management validation
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>Levers: smallest viable SKUs, stop EC2 when idle, tighten logging retention.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>
            Diag settings → Log Analytics: VPN GW, Firewall, NSG flow logs
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>
            Alerts: tunnel down / high egress; webhook to Slack
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>Runbook: ping both directions after deploy; capture screenshots.</li>
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
          Demonstrate secure hybrid connectivity and centralised egress using Azure hub–spoke with
          an IPSec S2S to AWS. Current phase: wire up metrics/alerts and publish baseline checks.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/az-hub-spoke-vpn"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://github.com/Simodalstix/az-hub-spoke-vpn#readme"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Project README
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
