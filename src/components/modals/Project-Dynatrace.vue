<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Patch Management & Observability Lab"
  >
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-6 text-gray-200">
      <div class="mt-3">
        <img
          src="/images/project-modal-images/dynatrace-console.png"
          alt="Azure IaaS Operations Diagram"
          class="object-contain rounded shadow"
        />

        <p class="italic text-base text-orange-300 mt-3">
          A robust Azure IaaS project demonstrating automated VM provisioning, patching, and
          comprehensive observability.
        </p>
      </div>

      <div class="text-base space-y-4 mt-3">
        <p>
          I recently built an Azure-based infrastructure platform using Terraform. This lab
          provisions highly available RHEL and Windows Server VMs within a secure network
          architecture, leveraging Load Balancers and Availability Sets for resilience.
        </p>
        <p>
          Key components include automated patching via Azure Update Management Center, granular
          RBAC, and policy enforcement. For observability, I integrated Azure Monitor (Log
          Analytics) alongside Dynatrace OneAgent deployments. This project solidified my skills in
          IaC, cloud operations, security, and advanced monitoring practices.
        </p>
        <div class="flex gap-3 items-center">
          <!-- <img src="/images/main-tools/terraform.svg" class="h-24" title="Terraform" />
          <img src="/images/main-tools/azure.svg" class="h-24" title="Azure" />
          <img src="/images/main-tools/dynatrace.svg" class="h-24" title="Dynatrace" /> -->

          <a
            href="https://github.com/Simodalstix/az-patching-dynatrace"
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
