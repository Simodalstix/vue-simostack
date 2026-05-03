<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-[#1D1D1F]"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-white">HashiCorp Certified: Terraform Associate</h2>
        <div class="h-0.5 bg-[#7B42BC] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-white p-5 rounded mb-2">
      <p class="text-base text-slate-800 mb-3">Validates hands-on ability to write, plan, and manage infrastructure as code across cloud providers.</p>
      <ul class="text-base text-slate-600 space-y-1.5 mb-4 list-disc list-inside">
        <li>HCL syntax, module composition, and input/output variable design</li>
        <li>State management, remote backends, and workspace isolation</li>
        <li>Provider configuration, resource lifecycle rules, and drift detection</li>
        <li>Terraform Cloud workflows, Sentinel policy enforcement, and collaboration patterns</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">Terraform is the standard for managing infrastructure across providers through a single, consistent workflow. This certification reflects an understanding of the patterns that make that possible at scale.</p>
      <div>
        <a
          href="https://www.credly.com/badges/89c1ade6-f291-4af1-8d1e-ef2f469752c4"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#7B42BC] hover:bg-[#6A35A6] text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
