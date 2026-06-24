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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Migrated 9-service e-commerce platform from <span class="text-ob-teal-bright">Maven</span> to <span class="text-ob-teal-bright">Gradle</span> with <span class="text-ob-teal-bright">Jenkins</span> CI/CD. Spring Cloud Gateway, <span class="text-ob-teal-bright">Nacos</span>, MySQL per service, <span class="text-ob-teal-bright">Redis</span>, Elasticsearch, and <span class="text-ob-teal-bright">RabbitMQ</span>. Achieved 40% faster builds (33s vs 2+ min) with parallel execution and Gradle caching.
      </p>
      <a
        href="https://github.com/Simodalstix/java-gradle-microservices"
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
