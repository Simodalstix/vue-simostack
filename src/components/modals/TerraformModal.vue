<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="HashiCorp Certified: Terraform Associate (003)"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates hands-on ability to write, plan, and manage infrastructure as code across cloud providers.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>HCL syntax, module composition, and input/output variable design</li>
        <li>State management, remote backends, and workspace isolation</li>
        <li>Provider configuration, resource lifecycle rules, and drift detection</li>
        <li>Terraform Cloud workflows, Sentinel policy enforcement, and collaboration patterns</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">Formal certification validates understanding of state locking, dependency graphs, and blast radius, which are the mechanics that make infrastructure reliable at scale.</p>
      <div>
        <a
          href="https://www.credly.com/badges/89c1ade6-f291-4af1-8d1e-ef2f469752c4"
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
