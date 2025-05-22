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
    ><div class="bg-gray-700 p-3 rounded">
      <p class="text-sm text-gray-300 mb-2">Issued by HashiCorp</p>
      <p class="text-sm text-gray-300">
        Earners of the HashiCorp Certified: Terraform Associate certification know the basic
        concepts, skills, and use cases associated with open source HashiCorp Terraform. They
        understand and can utilize Terraform according to the certification objectives.
        Additionally, they understand why enterprises choose to extend Terraform Open Source with
        Terraform Enterprise to solve business critical objectives.
        <a
          href="https://www.credly.com/badges/89c1ade6-f291-4af1-8d1e-ef2f469752c4"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan-400 hover:text-cyan-300 underline block mt-3"
        >
          → Verify Certification on Credly
        </a>
      </p>
    </div>
  </BaseModal>
</template>
