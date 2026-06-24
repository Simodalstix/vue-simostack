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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        DevOps toolchain with <span class="text-ob-teal-bright">Terraform</span> deploying VPC, EC2, and IAM. <span class="text-ob-teal-bright">SonarQube</span> in Docker for code quality, <span class="text-ob-teal-bright">LaunchDarkly</span> feature flags in .NET 8 API, Playwright tests, and <span class="text-ob-teal-bright">GitHub Actions</span> CI/CD with quality gates. Demonstrates platform team tooling patterns.
      </p>
      <a
        href="https://github.com/Simodalstix/terraform-aws-devops-toolchain"
        target="_blank"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
