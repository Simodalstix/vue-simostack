<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="E-Commerce Microservices - Maven to Gradle Migration"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/java-gradle-jenkins-diagram.svg"
        alt="E-Commerce Microservices Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Migrated 9-service e-commerce platform from Maven to Gradle with Jenkins CI/CD. Spring Cloud Gateway, Nacos, MySQL per service, Redis, Elasticsearch, and RabbitMQ. Achieved 40% faster builds (33s vs 2+ min) with parallel execution and Gradle caching.
      </p>
      <a
        href="https://github.com/Simodalstix/java-gradle-microservices"
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
