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
        Complete DevOps pipeline for Spring Boot application with <span class="text-cyan-300">Jenkins</span> automation, <span class="text-cyan-300">PostgreSQL</span> database, <span class="text-cyan-300">Docker</span> containerization, and quality gates. Maven compile, <span class="text-cyan-300">JUnit</span> tests, <span class="text-cyan-300">SpotBugs</span> security checks, and multi-stage Docker builds with health checks.
      </p>
      <a
        href="https://github.com/Simodalstix/java-app-jenkins"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
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
