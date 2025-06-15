<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Raspberry Pi Backend API – Node.js + Docker"
  >
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-5 text-gray-200">
      <div class="mt-3">
        <img
          src="/images/project-modal-images/rasp-api-image.png"
          alt="Raspberry Pi Backend Diagram"
          class="object-contain rounded shadow"
        />

        <p class="italic text-base text-amber-300 mt-3">
          A self-hosted Node.js API with PostgreSQL, deployed on a Raspberry Pi using Docker. Powers
          dynamic content on simostack.com.
        </p>
      </div>

      <!-- Right: Description + GitHub + Badges -->
      <div class="text-base space-y-3 mt-3">
        <p>
          This project runs a Node.js + Express API on a Raspberry Pi to serve dynamic content (like
          blog posts) to my personal website. It uses PostgreSQL for storage and runs as a
          multi-container app via Docker Compose.
        </p>
        <p>
          CI/CD is handled with GitHub Actions, which builds and pushes Docker images on commit.
          Secrets are managed using GitHub’s encrypted secrets, and deployment to the Pi is fully
          automated via SSH.
        </p>
        <p>
          The setup mirrors a production pipeline in a compact, self-hosted environment — ideal for
          hands-on DevOps practice with containerization, automation, and service orchestration on
          ARM hardware.
        </p>

        <div class="flex gap-3 items-center">
          <img src="/images/main-tools/docker-mark-blue.svg" class="h-24" title="Docker" />
          <a
            href="https://github.com/Simodalstix/raspberry-pi-backend"
            class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
            target="_blank"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
