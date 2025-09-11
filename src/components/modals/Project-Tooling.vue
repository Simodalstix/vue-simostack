<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS DevOps Toolchain – Developer Tooling Lab"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/sonarqube.jpg"
          alt="AWS DevOps Toolchain Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            A hands-on lab showing how platform teams can provision and integrate developer tools on
            AWS. It uses Terraform to deploy infra (VPC, EC2, IAM), runs SonarQube in Docker,
            integrates LaunchDarkly feature flags into a .NET 8 minimal API, and validates behavior
            with Playwright tests. GitHub Actions drives CI/CD end-to-end, enforcing quality gates
            before deploy.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-300">Key Architecture Decisions</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-sm text-gray-300">
              Used GitHub Actions for CI/CD because it integrates well with the code repository.
              SonarQube runs on EC2 for code quality scanning. LaunchDarkly feature flags allow
              testing new features with a subset of users before full rollout.
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
        <h3 class="font-bold text-lg mb-2 text-orange-300">Quality Control</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>SonarQube scans code for bugs and security issues</li>
          <li>Quality gates prevent bad code from deploying</li>
          <li>Playwright tests validate application behavior</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>~$30-50/month for development environment</li>
          <li>Main cost: EC2 instance running SonarQube</li>
          <li>Terraform makes it easy to destroy when not needed</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Feature Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>LaunchDarkly feature flags for safe rollouts</li>
          <li>GitHub Actions automates build and deployment</li>
          <li>SonarQube dashboard shows code quality metrics</li>
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
          Learning DevOps toolchain setup with code quality scanning, feature flags, and automated
          testing. Demonstrates Terraform infrastructure deployment, SonarQube integration, and
          CI/CD pipeline patterns with GitHub Actions.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/terraform-aws-devops-toolchain"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://launchdarkly.com/blog/what-are-feature-flags/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Feature Flags
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
