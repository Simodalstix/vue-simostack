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
    ><div class="bg-gray-700 p-3 rounded">
      <p class="text-sm text-gray-300 mb-2">
        Issued by Amazon Web Services Training and Certification
      </p>
      <p class="text-sm text-gray-300">
        Earners of this certification have a fundamental understanding of IT services and their uses
        in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge
        owners are able to identify essential AWS services necessary to set up AWS-focused projects.
        <a
          href="https://www.credly.com/badges/174cafbb-a6a8-4e96-afad-d2db977761e2"
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
