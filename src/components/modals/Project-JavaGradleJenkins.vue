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
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Migrated 9-service e-commerce platform from <span class="text-cyan-300">Maven</span> to <span class="text-cyan-300">Gradle</span> with <span class="text-cyan-300">Jenkins</span> CI/CD. Spring Cloud Gateway, <span class="text-cyan-300">Nacos</span>, MySQL per service, <span class="text-cyan-300">Redis</span>, Elasticsearch, and <span class="text-cyan-300">RabbitMQ</span>. Achieved 40% faster builds (33s vs 2+ min) with parallel execution and Gradle caching.
      </p>
      <a
        href="https://github.com/Simodalstix/java-gradle-microservices"
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
