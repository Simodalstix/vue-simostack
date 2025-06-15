<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Certified Developer – Associate"
    width="max-w-3xl"
    ><div class="bg-gray-700 p-3">
      <p class="text-base text-white mb-2">
        Issued by Amazon Web Services Training and Certification
      </p>
      <p class="text-base text-gray-300">
        Earners of this certification have a comprehensive understanding of application life-cycle
        management. They demonstrated proficiency in writing applications using AWS service APIs,
        AWS CLI, and SDKs; using containers; and deploying with a CI/CD pipeline. Certification
        holders can develop, deploy, and debug cloud-based applications following AWS best
        practices.
      </p>
      <div class="mt-4">
        <a
          href="https://www.credly.com/badges/e90f09fd-d161-465a-93e1-bcfb7375635a"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
