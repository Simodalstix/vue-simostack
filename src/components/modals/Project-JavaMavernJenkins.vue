<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Spring PetClinic Jenkins CI/CD Pipeline"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/java-maven-jenkins-diagram.svg"
        alt="Spring PetClinic CI/CD Pipeline Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Complete DevOps pipeline for Spring Boot application with Jenkins automation, PostgreSQL database, Docker containerization, and quality gates. Maven compile, JUnit tests, SpotBugs security checks, and multi-stage Docker builds with health checks.
      </p>
      <a
        href="https://github.com/Simodalstix/java-app-jenkins"
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
