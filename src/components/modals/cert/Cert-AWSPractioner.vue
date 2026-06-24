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
        <h2 class="text-xl font-bold text-ob-bright">AWS Certified Cloud Practitioner</h2>
        <div class="h-[3px] w-16 bg-[#FF9900] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Validates foundational understanding of AWS Cloud services, pricing, architecture, and the shared responsibility model.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Core AWS services across compute, storage, networking, and databases</li>
        <li>AWS global infrastructure, regions, availability zones, and edge locations</li>
        <li>Shared responsibility model, IAM fundamentals, and security best practices</li>
        <li>Pricing models, billing tools, and AWS Support plans</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">The entry point into AWS certification, establishing the cloud literacy that underpins every architecture and operational decision.</p>
      <div>
        <a
          href="https://www.credly.com/badges/174cafbb-a6a8-4e96-afad-d2db977761e2"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#FF9900] hover:bg-[#EC7211] text-[#0C0F12] font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
