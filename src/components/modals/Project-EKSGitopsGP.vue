<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="EKS Multi-Tier App – GitOps Pipeline"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/eks-gitops-gp-diagram3.svg"
        alt="EKS GitOps Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        EKS deployment with GitOps workflows using ArgoCD, Prometheus, and Terraform. Multi-tier application with automated deployment pipelines, drift detection, and multi-metric monitoring. Spot instances reduce costs by 70% while maintaining reliability.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-eks-multi-tier-gitops"
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
