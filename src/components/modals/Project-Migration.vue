<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS PostgreSQL Migration">
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/db-migration.svg"
          alt="AWS PostgreSQL Migration Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Security -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            A production‑style migration of a local PostgreSQL database into Amazon RDS. Terraform
            provisions VPC with public/private subnets, route tables, security groups, SSM‑based
            bastion access, and credentials via Secrets Manager. Simple, reproducible, and isolated.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions &amp; trade-offs</h3>
          <p class="text-base text-gray-300">
            Chose <code>pg_dump</code>/<code>pg_restore</code> over AWS DMS—simpler for small DBs
            and easy to repeat, but no live sync or scaling features.
          </p>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Multi‑AZ ready (toggle via Terraform variable).</li>
          <li>Subnet groups span AZs; SGs follow least‑privilege.</li>
          <li>Parameter group with TLS + safe defaults.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Default to small instance + gp3; easy to resize.</li>
          <li>Lifecycle policies on logs/snapshots (optional).</li>
          <li>Variables for turning off Multi‑AZ/dev features.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Enhanced monitoring & CloudWatch metrics.</li>
          <li>RDS error/slow query logs optional.</li>
          <li>S3 snapshot exports supported via IAM role.</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Lift a local Postgres into RDS behind a private network boundary with IaC, SSM access, and
        managed secrets. Current phase: VPC, RDS, bastion, secrets; simple import path next.
      </div>

      <a
        href="https://github.com/Simodalstix/AWS-terraform-postgres-rds-migration"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
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
