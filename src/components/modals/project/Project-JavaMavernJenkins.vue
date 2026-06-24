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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Complete DevOps pipeline for Spring Boot application with <span class="text-ob-teal-bright">Jenkins</span> automation, <span class="text-ob-teal-bright">PostgreSQL</span> database, <span class="text-ob-teal-bright">Docker</span> containerization, and quality gates. Maven compile, <span class="text-ob-teal-bright">JUnit</span> tests, <span class="text-ob-teal-bright">SpotBugs</span> security checks, and multi-stage Docker builds with health checks.
      </p>
      <a
        href="https://github.com/Simodalstix/java-app-jenkins"
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
