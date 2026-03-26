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
        <h2 class="text-xl font-bold text-white">AWS Certified Cloud Practitioner</h2>
        <div class="h-0.5 bg-[#FF9900] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-white p-5 rounded">
      <p class="text-base text-gray-800 mb-3">Validates foundational understanding of AWS Cloud services, pricing, architecture, and the shared responsibility model.</p>
      <ul class="text-base text-gray-600 space-y-1.5 mb-4 list-disc list-inside">
        <li>Core AWS services across compute, storage, networking, and databases</li>
        <li>AWS global infrastructure, regions, availability zones, and edge locations</li>
        <li>Shared responsibility model, IAM fundamentals, and security best practices</li>
        <li>Pricing models, billing tools, and AWS Support plans</li>
      </ul>
      <p class="text-sm text-gray-400 italic mb-4">The entry point into AWS certification, establishing the cloud literacy that underpins every architecture and operational decision.</p>
      <div>
        <a
          href="https://www.credly.com/badges/174cafbb-a6a8-4e96-afad-d2db977761e2"
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
