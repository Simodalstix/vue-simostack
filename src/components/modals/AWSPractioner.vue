<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Certified Cloud Practitioner"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates foundational understanding of AWS Cloud services, pricing, architecture, and the shared responsibility model.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>Core AWS services across compute, storage, networking, and databases</li>
        <li>AWS global infrastructure, regions, availability zones, and edge locations</li>
        <li>Shared responsibility model, IAM fundamentals, and security best practices</li>
        <li>Pricing models, billing tools, and AWS Support plans</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">The entry point into AWS certification, establishing the cloud literacy that underpins every architecture and operational decision.</p>
      <div>
        <a
          href="https://www.credly.com/badges/174cafbb-a6a8-4e96-afad-d2db977761e2"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
