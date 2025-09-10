<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="EKS Multi-Tier App – GitOps Pipeline"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/eks-gitops-gp-diagram3.svg"
          alt="EKS GitOps Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            EKS deployment with GitOps workflows, multi-metric monitoring, and container
            orchestration. Demonstrates infrastructure as code and automated deployment pipelines
            using ArgoCD, Prometheus, and Terraform.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose ArgoCD for GitOps over traditional CI/CD for declarative deployments and drift
              detection. Spot instances reduce costs by 70% with managed node groups for
              reliability. Self-managed Prometheus/Grafana over AWS managed services for learning
              and cost control.
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
          <li>3 worker nodes across availability zones</li>
          <li>Auto-scaling based on CPU/memory usage</li>
          <li>Pod health checks and restart policies</li>
          <li>GitOps drift detection</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>~$130/month development environment</li>
          <li>Spot instances for 70% cost reduction</li>
          <li>Single NAT Gateway, GP3 storage</li>
          <li>Nodes scale down when not needed</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Grafana dashboards for cluster metrics</li>
          <li>Prometheus collecting pod and node data</li>
          <li>Basic alerting for system issues</li>
          <li>ArgoCD deployment status tracking</li>
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
          Demonstrate Kubernetes deployment patterns with GitOps workflows,
          infrastructure as code, and multi-metric monitoring. Showcases container-based
          application lifecycle management from development to production.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-eks-multi-tier-gitops"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://mantalus.com/blog/setting-up-argocd-on-eks/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Inspiration
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
