<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Raspberry Pi Backend API — Node.js + Docker"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/rasp-api-image.jpg"
        alt="Raspberry Pi Backend Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Self-hosted Node.js/Express API on Raspberry Pi with Docker Compose running API and PostgreSQL. GitHub Actions builds ARM-compatible containers and deploys over SSH with environment secrets. Compose restart policy, health checks, and named volumes for reliability.
      </p>
      <a
        href="https://github.com/Simodalstix/raspberry-pi-backend"
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
