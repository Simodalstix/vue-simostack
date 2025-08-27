<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure AKS GitOps Platform - Enterprise Kubernetes with GitOps"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <!-- <img
          src="/images/project-modal-images/azure-aks-gitops-diagram.svg"
          alt="Azure AKS GitOps Platform Architecture"
          class="object-contain rounded-lg w-full"
        /> -->
      </div>

      <!-- Right: Description + Architecture Decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Enterprise-ready AKS platform with GitOps delivery, secure defaults, and developer
            enablement. Modular Terraform architecture deploys system + workload node pools with AAD
            integration, ArgoCD/Flux for continuous delivery, and automated team onboarding with
            namespace isolation.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-300">Platform Principles</h3>
          <div class="text-base text-gray-300 space-y-3">
            <p>
              GitOps-first: All workloads deployed declaratively via Git repositories. No manual
              kubectl changes - immutable infrastructure with audit trails.
            </p>
            <p>
              Secure by default: Workload Identity, Key Vault CSI, namespace-scoped RBAC, and
              resource quotas. Teams get isolated environments with least-privilege access.
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
          <li>Auto-scaling nodes (1–10) with system/workload separation.</li>
          <li>GitOps reconciliation restores state after config drift.</li>
          <li>Automated TLS (cert-manager) and DNS (external-dns).</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Drivers: Node pools, Load Balancer, Log Analytics, DNS queries.</li>
          <li>
            Namespace quotas prevent runaway costs <span class="text-gray-400">(implemented)</span>
          </li>
          <li>Optimization: Right-sized VMs, scaling, shared services.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>
            Azure Monitor Container Insights, 30-day retention
            <span class="text-gray-400">(implemented)</span>
          </li>
          <li>
            Dynatrace OneAgent for AI-driven root cause analysis
            <span class="text-gray-400">(ready)</span>
          </li>
          <li>GitOps deployment tracking & app health via ArgoCD UI.</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Platform scope:</span>
          Production-ready Kubernetes platform with GitOps delivery, enterprise security, and
          self-service team onboarding. Minimal but complete - the 20% of features that solve 80% of
          enterprise Kubernetes needs.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/Azure-aks-platform"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://argoproj.github.io/argo-cd/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          ArgoCD Docs
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
