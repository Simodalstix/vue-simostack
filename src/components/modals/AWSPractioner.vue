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
      <p class="text-base text-white mb-2">
        Issued by Amazon Web Services Training and Certification
      </p>
      <p class="text-base text-gray-300">
        Earners of this certification have a fundamental understanding of IT services and their uses
        in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge
        owners are able to identify essential AWS services necessary to set up AWS-focused projects.
      </p>
      <div class="mt-4">
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
