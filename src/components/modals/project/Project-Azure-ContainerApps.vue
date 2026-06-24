<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps – DevOps & Change Control"
    borderClass="border border-ob-teal/40 shadow-xl shadow-black/30"
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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        <span class="text-ob-teal-bright">Azure Container Apps</span> platform with <span class="text-ob-teal-bright">Terraform</span> IaC and <span class="text-ob-teal-bright">Azure DevOps</span> pipelines. Multi-stage deployment across dev, staging, and prod with security scanning, compliance controls, and automated change management.
      </p>
      <a
        href="https://github.com/Simodalstix/Azure-devops-container-apps"
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
