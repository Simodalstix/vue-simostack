<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Container Apps + Jenkins IaC Pipeline"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/azure-container-apps-diagram.svg"
          alt="Azure Container Apps Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Production-ready Azure Container Apps platform with Terraform Infrastructure as Code and
            Jenkins CI/CD pipelines. Features comprehensive monitoring, security best practices, and
            multi-environment deployment with automated quality gates and approval workflows.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose Container Apps over AKS for serverless simplicity and auto-scaling, accepting
              less Kubernetes control. Jenkins over Azure DevOps for flexibility. Terraform modules
              enable multi-environment consistency with shared infrastructure components.
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
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Multi-replica: Auto-scaling 1-10 replicas based on load</li>
          <li>Health checks: Liveness and readiness probes on /health</li>
          <li>Blue/green: Single revision mode with traffic splitting</li>
          <li>Availability tests: Multi-region health monitoring</li>
          <li>Managed identity: Secure Key Vault integration</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Target: ~$30-80/month for dev/prod environments</li>
          <li>Serverless: Pay-per-use with automatic scale-to-zero</li>
          <li>Drivers: Container Apps compute, Log Analytics, ACR</li>
          <li>Optimization: Shared resources, right-sized replicas</li>
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
          Demonstrate production-ready Azure Container Apps deployment with Infrastructure as Code,
          automated CI/CD pipelines, comprehensive monitoring, and security best practices. Includes
          dev/prod environments with quality gates and manual approval workflows.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/Azure-container-apps-jenkins"
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
