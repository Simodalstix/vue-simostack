<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps – DevOps & Change Control"
    borderClass="border border-indigo-500/30 shadow-xl shadow-indigo-500/10"
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
        <span class="text-cyan-300">Azure Container Apps</span> platform with <span class="text-cyan-300">Terraform</span> IaC and <span class="text-cyan-300">Azure DevOps</span> pipelines. Multi-stage deployment across dev, staging, and prod with security scanning, compliance controls, and automated change management.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-devops-container-apps"
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
