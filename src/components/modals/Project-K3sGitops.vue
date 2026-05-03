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
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Lightweight Kubernetes platform using <span class="text-cyan-300">K3s</span> with GitOps automation via <span class="text-cyan-300">ArgoCD</span> on <span class="text-cyan-300">ARM64</span> hardware. <span class="text-cyan-300">Ansible</span> automates K3s install and config, single-node cluster with minimal resource footprint (~2GB RAM), NodePort for simplicity.
      </p>
      <a
        href="https://github.com/Simodalstix/k3s-argocd-raspberry-pi"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
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
