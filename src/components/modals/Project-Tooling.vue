<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS DevOps Toolchain: Terraform + CI/CD"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram -->
      <div class="md:w-2/3 p-6 flex flex-col">
        <img
          src="/images/project-modal-images/sonarqube.jpg"
          alt="AWS DevOps Toolchain Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Infrastructure as Code with Terraform</li>
            <li>GitHub Actions pipeline</li>
            <li>SonarQube quality gates block merges on failed checks</li>
            <li>Playwright E2E tests validate flagged behavior and endpoints</li>
            <li>LaunchDarkly feature flags for safe, gradual releases</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>IaC: Terraform</li>
            <li>CI/CD: GitHub Actions</li>
            <li>Cloud: AWS core services</li>
            <li>Code Quality: SonarQube</li>
            <li>Feature Flags: LaunchDarkly</li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        Provisions AWS with Terraform and runs a full CI flow in GitHub Actions. The .NET 8 API is
        scanned by SonarQube (quality gates), feature-toggled with LaunchDarkly, and validated
        end-to-end with Playwright. The entire toolchain is reproducible from zero with minimal
        manual steps.
      </p>
      <a
        href="https://github.com/Simodalstix/terraform-aws-devops-toolchain"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        View on GitHub
      </a>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
