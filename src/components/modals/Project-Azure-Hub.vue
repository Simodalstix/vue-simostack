<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Azure Hub & Spoke VPN">
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-6 text-gray-200">
      <!-- Left: Diagram + summary -->
      <div class="mt-3">
        <img
          src="/images/project-modal-images/azure-hub-spoke-vpn.svg"
          alt="Azure Hub & Spoke VPN Diagram"
          class="object-contain rounded shadow"
        />
        <p class="italic text-base text-orange-300 mt-3">
          A secure hub-and-spoke network with VPN, VNet peering, and cross-cloud testing — built
          with Terraform.
        </p>
      </div>

      <!-- Right: Description + GitHub + Badges -->
      <div class="text-base space-y-4 mt-3">
        <p>
          This project implements a production-style Azure network using a hub-and-spoke VNet
          design. The hub contains a VPN gateway and shared services, while each spoke is isolated
          for independent workloads — ideal for multi-subnet architecture.
        </p>
        <p>
          I used Terraform to deploy VNets, NSGs, peerings, a VPN Gateway, and routing tables. I
          validated connectivity from an AWS EC2 instance over the site-to-site VPN, simulating
          hybrid or multi-cloud scenarios.
        </p>
        <div class="flex gap-3 items-center">
          <img src="/images/main-tools/terraform.svg" class="h-24" title="Terraform" />
          <a
            href="https://github.com/Simodalstix/az-hub-spoke-vpn"
            class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
            target="_blank"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
