<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-[#232F3E]"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-white">AWS Certified Solutions Architect: Associate</h2>
        <div class="h-0.5 bg-[#FF9900] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-white p-5 rounded mb-2">
      <p class="text-base text-gray-800 mb-3">Proves the ability to design secure, scalable, and cost-optimised architectures on AWS using well-architected principles.</p>
      <ul class="text-base text-gray-600 space-y-1.5 mb-4 list-disc list-inside">
        <li>Multi-tier architecture design with VPCs, subnets, and availability zones</li>
        <li>Compute, storage, and database service selection based on workload requirements</li>
        <li>IAM policies, encryption strategies, and network security controls</li>
        <li>High availability patterns, disaster recovery strategies, and cost governance</li>
      </ul>
      <p class="text-sm text-gray-400 italic mb-4">This certification demonstrates the ability to reason about trade-offs between resilience, performance, and cost across the full AWS service catalogue.</p>
      <div>
        <a
          href="https://www.credly.com/badges/7eea6cbf-d1ac-4006-b031-896c63f04041"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#FF9900] hover:bg-[#EC7211] text-gray-900 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
