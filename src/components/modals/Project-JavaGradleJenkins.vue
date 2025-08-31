<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="E-Commerce Microservices - Maven to Gradle Migration"
  >
    <!-- Top row: diagram + sidebar (unchanged proportions) -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/java-gradle-jenkins-diagram.svg"
          alt="E-Commerce Microservices Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions (paragraph style) -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Migrated a 9-service e-commerce platform from Maven to Gradle with Jenkins CI/CD.
            Includes Spring Cloud Gateway, Nacos, MySQL per service, Redis caching, Elasticsearch,
            and RabbitMQ—delivering production-ready DevOps practices and 40% faster builds.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              hose Gradle over Maven for faster builds and better dependency management, accepting
              migration effort for 40% performance gain. Selected Jenkins over cloud CI for
              enterprise use. Retained Spring Cloud architecture while modernizing build
              infrastructure—showing progress without breaking changes.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Performance, Architecture, DevOps -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Performance</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Build time: 33s vs 2+ min Maven baseline</li>
          <li>
            Parallel execution: 3 concurrent build stages
            <span class="text-gray-400">(measured)</span>
          </li>
          <li>
            Gradle caching: 80% faster incremental builds
            <span class="text-gray-400">(expected)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Architecture</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Services: 9 microservices with independent deployment</li>
          <li>Stack: Spring Boot 3.2.2, Spring Cloud, Java 17</li>
          <li>
            Infrastructure: MySQL, Redis, Elasticsearch, RabbitMQ
            <span class="text-gray-400">(containerized)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">DevOps</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Pipeline: Multi-stage Jenkins with approval gates</li>
          <li>Containers: Docker with eclipse-temurin:17-jre</li>
          <li>Deploy: Kubernetes manifests <span class="text-gray-400">(ready)</span></li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem & scope:</span>
          Modernize legacy Maven build system for enterprise e-commerce platform while maintaining
          functionality. Current phase: production-ready CI/CD pipeline with Docker integration and
          measurable performance improvements.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/java-gradle-microservices"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://docs.gradle.org/current/userguide/migrating_from_maven.html"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Migration Guide
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
