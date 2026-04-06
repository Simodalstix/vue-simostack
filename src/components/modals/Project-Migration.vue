<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS PostgreSQL Migration">
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/db-migration.svg"
        alt="AWS PostgreSQL Migration Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        <span class="text-cyan-300">PostgreSQL</span> migration to <span class="text-cyan-300">Amazon RDS</span> with <span class="text-cyan-300">Terraform</span> provisioning VPC, security groups, <span class="text-cyan-300">SSM</span> bastion access, and <span class="text-cyan-300">Secrets Manager</span> credentials. Uses pg_dump/pg_restore for simple, reproducible migrations. Multi-AZ ready with enhanced monitoring and CloudWatch metrics.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-terraform-postgres-rds-migration"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
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
