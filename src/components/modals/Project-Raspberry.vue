<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Raspberry Pi Backend API – Node.js + Docker"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram -->
      <div class="md:w-2/3 p-6 flex-grow">
        <img
          src="/images/project-modal-images/rasp-api-image.png"
          alt="Raspberry Pi Backend Diagram"
          class="object-contain rounded-lg w-full h-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Self-Hosted API on Raspberry Pi</li>
            <li>Containerized with Docker Compose</li>
            <li>CI/CD with GitHub Actions</li>
            <li>Automated Deployment via SSH</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Hardware: Raspberry Pi</li>
            <li>Backend: Node.js, Express</li>
            <li>Database: PostgreSQL</li>
            <li>DevOps: Docker, GitHub Actions</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        This project runs a Node.js + Express API on a Raspberry Pi to serve dynamic content to my
        personal website. It uses PostgreSQL for storage and runs as a multi-container app via
        Docker Compose, with a full CI/CD pipeline using GitHub Actions.
      </p>
      <a
        href="https://github.com/Simodalstix/raspberry-pi-backend"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        View on GitHub
      </a>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
