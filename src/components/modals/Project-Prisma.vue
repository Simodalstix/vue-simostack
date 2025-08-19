<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Full‑Stack Blog with Jenkins CI/CD on AWS & Raspberry Pi"
  >
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Screenshot -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/prisma-react.jpg"
          alt="Full‑stack blog demo screenshot"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Value -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">What this is</h3>
          <p class="text-base text-gray-300">
            A CI/CD pipeline that builds a React + Node/Express + Prisma/PostgreSQL blog, ships
            multi‑arch Docker images, deploys the backend to a Raspberry Pi via Ansible, and serves
            the frontend from S3/CloudFront with DNS/TLS managed in Terraform.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Developer value</h3>
          <p class="text-base text-gray-300">
            Push → Jenkins builds & tests → image to ECR → Pi updated via Ansible → frontend
            invalidated on CloudFront. Secrets live in SSM/Jenkins creds; pipeline gates and smoke
            tests keep deploys safe.
          </p>
        </div>
      </aside>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Key features</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Terraform: S3, CloudFront, Route53, ACM, IAM.</li>
          <li>Jenkins: declarative pipeline, multi‑arch Docker, ECR push.</li>
          <li>Ansible: backend deploy to ARM64 (Pi) with health checks.</li>
          <li>Secrets: AWS SSM Parameter Store + Jenkins credentials.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Automation gaps (next)</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>
            DB lifecycle: provision Postgres (RDS/Docker) + <code>prisma migrate deploy</code>.
          </li>
          <li>One‑command bootstrap: Jenkins seed job + Terraform backend/state.</li>
          <li>Health‑gated/rollback deploys; blue/green for backend.</li>
          <li>CloudFront cache invalidation wired into pipeline.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Build/test logs in Jenkins + artifacts.</li>
          <li>App health endpoint + smoke tests post‑deploy.</li>
          <li>(Planned) alerts via SNS/Webhook; Pi service metrics.</li>
        </ul>
      </div>
    </div>

    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Demonstrate a practical, low‑cost full‑stack pipeline from commit to global CDN plus edge
        caching, with an ARM backend target.
      </div>
      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/react-prisma-pg1"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://www.jenkins.io/doc/book/pipeline/syntax/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Jenkins Pipeline Syntax
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
