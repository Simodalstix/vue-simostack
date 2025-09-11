<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps – DevOps & Change Control"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/azure-devops-containers-diagram.svg"
          alt="Azure Container Apps Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Azure Container Apps platform with Terraform IaC and Azure DevOps pipelines. Includes
            compliance controls, change management, multi-stage deployment across dev, staging,
            prod, security scanning, and monitoring.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Design Decisions</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Built for high availability using managed services. Azure DevOps chosen for compliance
              and governance. Shared registries and monitoring to optimize costs, with trade-offs
              between isolation and operational overhead.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">DevOps Pipeline</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Azure DevOps for CI/CD automation</li>
          <li>Security scanning with Checkov</li>
          <li>Manual approvals for production</li>
          <li>Dev → Staging → Production flow</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Container Platform</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Azure Container Apps for serverless containers</li>
          <li>Auto-scaling based on HTTP requests</li>
          <li>Rolling updates with zero downtime</li>
          <li>Terraform for infrastructure deployment</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Application Insights for request tracing</li>
          <li>Azure Monitor dashboards and alerts</li>
          <li>Structured logging with KQL queries</li>
          <li>Performance and error rate tracking</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem &amp; scope:</span>
          Learning Azure Container Apps with proper DevOps practices. Demonstrates CI/CD pipelines,
          multi-environment deployment, security scanning, and Infrastructure as Code patterns with
          Terraform and Azure DevOps.
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
