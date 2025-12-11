<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps – DevOps & Change Control"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-2">
      <img
        src="/images/project-modal-images/azure-devops-containers-diagram.svg"
        alt="Azure Container Apps Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-2 text-gray-200">
      <div>
        <h3 class="font-bold text-lg text-orange-300 mb-2">Description</h3>
        <p class="text-sm text-gray-300">
          Azure Container Apps platform with Terraform IaC and Azure DevOps pipelines. Includes
          compliance controls, change management, multi-stage deployment across dev, staging,
          prod, security scanning, and monitoring.
        </p>
      </div>

      <div>
        <h3 class="font-bold text-lg text-orange-300 mb-2">Key Considerations</h3>
        <p class="text-sm text-gray-300">
          Built for high availability using managed services. Azure DevOps chosen for compliance
          and governance. Shared registries and monitoring to optimize costs, with trade-offs
          between isolation and operational overhead.
        </p>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 px-4 py-3 flex flex-col sm:flex-row justify-between items-center text-sm gap-3"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem &amp; scope:</span>
          Learning Azure Container Apps with proper DevOps practices and multi-environment deployment patterns.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/Azure-devops-container-apps"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://docs.microsoft.com/en-us/azure/container-apps/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Azure Docs
        </a>
      </div>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
