<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Full-Stack Blog with Jenkins CI/CD on AWS & Raspberry Pi"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Screenshot -->
      <div class="md:w-2/3 p-6 flex flex-col">
        <img
          src="/images/project-modal-images/prisma-react.jpg"
          alt="React + Prisma + PostgreSQL blog UI"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Automated CI/CD with Jenkins for AWS + Raspberry Pi deployments</li>
            <li>Terraform-provisioned AWS S3, CloudFront, Route 53, ACM, IAM</li>
            <li>Multi-arch Docker builds for ARM64 backend, deployed via Ansible</li>
            <li>Secure secrets in AWS SSM Parameter Store & Jenkins credentials</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Frontend: React, TypeScript</li>
            <li>Backend: Node.js, Express, Prisma ORM, Database: PostgreSQL</li>

            <li>DevOps: Jenkins, Terraform, Ansible, Docker (multi-arch)</li>
            <li>Cloud: AWS S3, CloudFront, Route 53, ACM, IAM</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        Built a blog platform with a Raspberry Pi backend and AWS-hosted frontend, deployed via a
        Jenkins CI/CD pipeline. Infrastructure is provisioned with Terraform (S3/CloudFront +
        DNS/TLS). Jenkins builds multi-arch Docker images for the ARM64 backend, pushes to ECR, and
        uses Ansible to deploy to the Pi with secrets from AWS SSM Parameter Store. Frontend assets
        are built and synced to S3 with automated cache invalidation, with pipeline gates, health
        checks, and smoke tests ensuring reliability.
      </p>
      <a
        href="https://github.com/Simodalstix/react-prisma-pg1"
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
