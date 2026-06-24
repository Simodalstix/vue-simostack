<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-ob-bg"
    borderClass="border border-ob-sand/16 shadow-2xl shadow-black/50"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-ob-bright">AWS Certified Solutions Architect: Associate</h2>
        <div class="h-[3px] w-16 bg-[#FF9900] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Proves the ability to design secure, scalable, and cost-optimised architectures on AWS using well-architected principles.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Multi-tier architecture design with VPCs, subnets, and availability zones</li>
        <li>Compute, storage, and database service selection based on workload requirements</li>
        <li>IAM policies, encryption strategies, and network security controls</li>
        <li>High availability patterns, disaster recovery strategies, and cost governance</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">This certification demonstrates the ability to reason about trade-offs between resilience, performance, and cost across the full AWS service catalogue.</p>
      <div>
        <a
          href="https://www.credly.com/badges/7eea6cbf-d1ac-4006-b031-896c63f04041"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#FF9900] hover:bg-[#EC7211] text-[#0C0F12] font-semibold py-2 px-4 rounded-[2px] shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
