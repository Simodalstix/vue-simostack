<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="K3s + ArgoCD GitOps Platform">
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/k3s-argocd-diagram.svg"
          alt="K3s ArgoCD GitOps Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Lightweight Kubernetes platform using K3s with GitOps automation via ArgoCD.
            Demonstrates infrastructure as code with Ansible, container orchestration, and modern
            deployment practices on ARM64 hardware.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose a single-node K3s cluster for low resource overhead and simpler ops. MariaDB
              over PostgreSQL for lighter footprint on ARM64. Expose services via NodePort for
              direct access; Ingress can be added later if you need hostnames/TLS and path routing.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Automation, Simplicity, Learning -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Automation</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Ansible: Automates K3s install & config</li>
          <li>GitOps: ArgoCD manages app deploys</li>
          <li>IaC: Reproducible cluster provisioning</li>
          <li>One-command deployment: make bootstrap</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Simplicity</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Single-node K3s cluster on ARM64</li>
          <li>NodePort for simplicity; ingress optional</li>
          <li>MariaDB for lighter footprint on Pi</li>
          <li>Minimal resource footprint (~2GB RAM)</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Learning</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>GitOps principles with ArgoCD</li>
          <li>Ansible automation and roles</li>
          <li>K3s: Lightweight Kubernetes platform</li>
          <li>Modern DevOps practices and tooling</li>
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
          Demonstrate modern GitOps workflows and infrastructure automation using lightweight,
          cost-effective hardware. Showcases Kubernetes fundamentals, Ansible automation, and
          declarative application management suitable for development and learning environments.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/k3s-argocd-raspberry-pi"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://k3s.io/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          K3s Docs
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
