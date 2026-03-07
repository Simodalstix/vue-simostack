<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure AKS GitOps Platform - Enterprise Kubernetes with GitOps"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <!-- <img
        src="/images/project-modal-images/azure-aks-gitops-diagram.svg"
        alt="Azure AKS GitOps Platform Architecture"
        class="object-contain rounded-lg w-full"
      /> -->
      <p class="text-gray-400 text-center py-8">Diagram coming soon</p>
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Enterprise-ready AKS platform with GitOps delivery using ArgoCD/Flux. Modular Terraform architecture with system + workload node pools, AAD integration, automated team onboarding, and namespace isolation with resource limits.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-aks-platform"
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
