<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps – Production DevOps & Change Control"
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
            Enterprise-grade Azure Container Apps platform with Terraform IaC and Azure DevOps
            pipelines. Includes compliance controls, change management, multi-stage deployment
            across dev, staging, prod, security scanning, and monitoring aligned with 12-factor
            principles.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Reliability & Cost Balance</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Designed for high availability without excess overhead using managed services. Azure
              DevOps was chosen for compliance and governance. Shared registries and monitoring
              optimized costs, with isolation trade-offs versus fully separate environments.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Enterprise Features</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Compliance: Manual approvals, audit trails, change management</li>
          <li>Security: Checkov scanning, Key Vault, least privilege access</li>
          <li>Quality Gates: Format, lint, security checks</li>
          <li>Multi-Environment: Dev → Staging → Production workflow</li>
          <li>Immutable: IaC only, no manual changes</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Architecture</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>12-Factor App: Config via env vars, stateless containers</li>
          <li>SRP: Single-responsibility modules/pipelines</li>
          <li>Separation: Infrastructure, application, and CI/CD isolated</li>
          <li>Declarative: Terraform & YAML only</li>
          <li>Serverless: Auto-scaling Container Apps with zero-downtime</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Dashboards: Request rate, errors, latency, CPU metrics</li>
          <li>Tracing: Application Insights with correlation IDs</li>
          <li>Alerts: CPU, memory, error rate with email notifications</li>
          <li>Logs: Structured JSON logs with KQL queries</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem & scope:</span>
          Demonstrate enterprise-grade Azure Container Apps platform with compliance controls,
          change management, and security best practices. Features three-environment deployment,
          automated quality gates, manual approvals, and comprehensive audit trails for enterprise
          use.
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
