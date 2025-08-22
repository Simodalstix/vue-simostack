<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Monitoring & Patch Management Lab"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/dynatrace-console.png"
          alt="Azure Monitoring Lab Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Architecture Decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Comprehensive monitoring and patch management lab with Azure Monitor, Dynatrace
            OneAgent, and automated patching. Features Linux/Windows VMs with load balancer, sample
            applications for realistic monitoring scenarios, and integrated observability stack.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-300">Key Decisions</h3>
          <div class="text-base text-gray-300 space-y-3">
            <p>
              Dual monitoring stack: Azure Monitor for infrastructure + Dynatrace for APM. Trade-off
              between cost and comprehensive observability coverage. Automated patching with
              maintenance windows vs. manual control. Sample apps provide realistic load for alert
              validation.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Automated patch management with maintenance windows and reboot policies.</li>
          <li>
            Load balancer health probes ensure application availability during patching cycles.
          </li>
          <li>Availability sets provide fault tolerance across update and fault domains.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Drivers: VM compute, Log Analytics ingestion, Dynatrace licensing, load balancer.</li>
          <li>
            Standard SKUs and B-series VMs for cost-effective lab environment
            <span class="text-gray-400">(implemented)</span>
          </li>
          <li>Optimization: Scheduled load generation, retention policies, resource tagging.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Dual monitoring with Azure Monitor (infra) + Dynatrace (apps)</li>
          <li>
            Automated alerting: CPU/memory thresholds with email notifications
            <span class="text-gray-400">(implemented)</span>
          </li>
          <li>Application Insights integration for web application performance monitoring.</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Lab scope:</span>
          Focused monitoring and patch management environment for testing observability tools, alert
          workflows, and automated maintenance scenarios. Modular Terraform design enables easy
          extension and customization.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/az-dynatrace"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://docs.microsoft.com/en-us/azure/azure-monitor/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Azure Monitor
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
