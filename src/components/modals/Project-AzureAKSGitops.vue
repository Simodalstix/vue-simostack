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
          <h3 class="font-bold text-lg mb-2 text-orange-300">Key Architecture Decisions</h3>
          <div class="text-base text-gray-300 space-y-3">
            <p>
              Used GitOps with ArgoCD for deployments - all changes go through Git instead of direct
              kubectl commands. This provides audit trails and rollback capabilities.
            </p>
            <p>
              Separate node pools for system and workload pods. Azure AD integration for user
              authentication. Each team gets their own namespace with resource limits.
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
        <h3 class="font-bold text-lg mb-2 text-orange-300">High Availability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Auto-scaling node pools (1-10 nodes)</li>
          <li>GitOps automatically fixes configuration drift</li>
          <li>Automated TLS certificates and DNS management</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Main costs: VM nodes, load balancer, log storage</li>
          <li>Namespace resource quotas prevent overuse</li>
          <li>Right-sized VMs with auto-scaling</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Azure Monitor for container metrics and logs</li>
          <li>ArgoCD dashboard shows deployment status</li>
          <li>30-day log retention for troubleshooting</li>
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
          Learning Azure Kubernetes Service with GitOps deployment patterns. Demonstrates AKS
          cluster setup, ArgoCD integration, and team namespace isolation using Terraform
          and modern Kubernetes practices.
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
