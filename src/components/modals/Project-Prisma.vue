<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Full‑Stack Blog with Jenkins CI/CD on AWS & Raspberry Pi"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/prisma-react.jpg"
        alt="Full‑stack blog demo screenshot"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        CI/CD pipeline building React + Node/Express + Prisma/PostgreSQL blog. Jenkins builds multi-arch Docker images to ECR, Ansible deploys backend to Raspberry Pi, frontend served from S3/CloudFront with Terraform-managed DNS/TLS. Secrets in SSM/Jenkins with pipeline gates.
      </p>
      <a
        href="https://github.com/Simodalstix/react-prisma-pg1"
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
