<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure AKS GitOps Platform - Enterprise Kubernetes with GitOps"
    borderClass="border border-ob-teal/40 shadow-xl shadow-black/30"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <!-- <img
        src="/images/project-modal-images/azure-aks-gitops-diagram.svg"
        alt="Azure AKS GitOps Platform Architecture"
        class="object-contain rounded-lg w-full"
      /> -->
      <p class="text-ob-dim text-center py-8">Diagram coming soon</p>
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Enterprise-ready <span class="text-ob-teal-bright">AKS</span> platform with GitOps delivery using <span class="text-ob-teal-bright">ArgoCD</span>/<span class="text-ob-teal-bright">Flux</span>. Modular <span class="text-ob-teal-bright">Terraform</span> architecture with system + workload node pools, <span class="text-ob-teal-bright">AAD</span> integration, automated team onboarding, and namespace isolation with resource limits.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-aks-platform"
        target="_blank"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
