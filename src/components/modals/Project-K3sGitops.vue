<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="K3s + ArgoCD GitOps Platform">
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/k3s-argocd-diagram.svg"
        alt="K3s ArgoCD GitOps Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Lightweight Kubernetes platform using K3s with GitOps automation via ArgoCD on ARM64 hardware. Ansible automates K3s install and config, single-node cluster with minimal resource footprint (~2GB RAM), NodePort for simplicity.
      </p>
      <a
        href="https://github.com/Simodalstix/k3s-argocd-raspberry-pi"
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
