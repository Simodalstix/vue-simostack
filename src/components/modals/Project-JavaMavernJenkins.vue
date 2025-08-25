<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Spring PetClinic Jenkins CI/CD Pipeline"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/java-maven-jenkins-diagram.svg"
          alt="Spring PetClinic CI/CD Pipeline Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Complete DevOps pipeline for Spring Boot application with Jenkins automation, PostgreSQL
            database, Docker containerization, and comprehensive quality gates. Demonstrates modern
            CI/CD practices for Java enterprise applications.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose Jenkins over GitHub Actions for enterprise setup with superior Java/Maven
              toolchain management and plugin ecosystem. PostgreSQL over H2 for production
              readiness. Excluded integration tests from CI for faster builds, accepting reduced
              test coverage for speed. Jenkins provides dedicated tools for static analysis and
              artifact management.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Pipeline, Quality, Deployment -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">CI/CD Pipeline</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Automated builds: Maven compile & packaging</li>
          <li>Test execution: Unit tests with JUnit reports</li>
          <li>Static analysis: SpotBugs security & quality checks</li>
          <li>Docker build: Multi-stage containerization</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Quality Gates</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>runs unit tests only (integration tests excluded)</li>
          <li>Fail build on high-priority SpotBugs</li>
          <li>Build artifacts: JAR archival with fingerprinting</li>
          <li>Environment config: PostgreSQL via environment variables</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Infrastructure</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Database: PostgreSQL with Docker Compose</li>
          <li>Containerization: Multi-stage Dockerfile optimization</li>
          <li>Compose orchestration with health checks</li>
          <li>Profile-based environment config</li>
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
          Demonstrate enterprise Java application modernization with automated CI/CD, database
          migration from H2 to PostgreSQL, and containerization. Shows real-world DevOps practices
          for monolith-to-cloud migration scenarios.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/java-app-jenkins"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://spring.io/guides/gs/spring-boot/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Spring Boot Guide
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
