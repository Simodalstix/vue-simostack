<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS PostgreSQL Migration">
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram -->
      <div class="md:w-2/3 p-6 flex-grow">
        <img
          src="/images/project-modal-images/db-migration.jpg"
          alt="AWS Migration Diagram"
          class="object-contain rounded-lg w-full h-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-6 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Secure Database Migration</li>
            <li>Infrastructure as Code (Terraform)</li>
            <li>Secure Bastion Access (SSM)</li>
            <li>Credential Management (Secrets Manager)</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Cloud: AWS (RDS, S3, VPC)</li>
            <li>IaC: Terraform</li>
            <li>Database: PostgreSQL</li>
            <li>Security: Secrets Manager, Systems Manager</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        This project simulates a production-style migration of a local PostgreSQL database into AWS
        RDS, using Terraform to provision a secure network architecture with public/private subnets,
        SSM-based Bastion access, and credential management via Secrets Manager.
      </p>
      <a
        href="https://github.com/Simodalstix/terraform-postgres-rds-migration"
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
