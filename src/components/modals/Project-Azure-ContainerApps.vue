<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps – DevOps & Change Control"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/azure-devops-containers-diagram.svg"
        alt="Azure Container Apps Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Azure Container Apps platform with Terraform IaC and Azure DevOps pipelines. Multi-stage deployment across dev, staging, and prod with security scanning, compliance controls, and automated change management.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-devops-container-apps"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
