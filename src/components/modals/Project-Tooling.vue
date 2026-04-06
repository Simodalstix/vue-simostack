<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS DevOps Toolchain – Developer Tooling Lab"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/sonarqube.jpg"
        alt="AWS DevOps Toolchain Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        DevOps toolchain with <span class="text-cyan-300">Terraform</span> deploying VPC, EC2, and IAM. <span class="text-cyan-300">SonarQube</span> in Docker for code quality, <span class="text-cyan-300">LaunchDarkly</span> feature flags in .NET 8 API, Playwright tests, and <span class="text-cyan-300">GitHub Actions</span> CI/CD with quality gates. Demonstrates platform team tooling patterns.
      </p>
      <a
        href="https://github.com/Simodalstix/terraform-aws-devops-toolchain"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
