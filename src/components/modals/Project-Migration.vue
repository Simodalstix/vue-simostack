<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS PostgreSQL Migration">
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-6 text-gray-200">
      <!-- Left: Diagram + summary -->
      <div class="mt-3">
        <img
          src="/images/project-modal-images/db-migration.svg"
          alt="AWS Migration Diagram"
          class="object-contain rounded shadow"
        />

        <p class="italic text-base text-orange-300 mt-3">
          A realistic database migration project using Terraform, RDS, and secure AWS infrastructure
          practices.
        </p>
      </div>

      <!-- Right: Description + GitHub + Badges -->
      <div class="text-base space-y-4 mt-3">
        <p>
          This project simulates a production-style migration of a local PostgreSQL database into
          AWS RDS. I used Terraform to provision a secure network architecture with public/private
          subnets, SSM-based Bastion access, and credential management via Secrets Manager.
        </p>
        <p>
          The database was staged via S3 and restored using <code>psql</code> to mirror a real-world
          handover. I also avoided direct SSH by using Systems Manager for admin access. The project
          strengthened my skills in infrastructure-as-code, secure credential handling, and cloud
          migration planning.
        </p>
        <div class="flex gap-3 items-center">
          <img src="/images/main-tools/terraform.svg" class="h-24" title="Terraform" />
          <a
            href="https://github.com/Simodalstix/terraform-postgres-rds-migration"
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
