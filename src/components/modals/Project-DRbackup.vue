<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Disaster Recovery - Backup & Restore With Rapid Recovery"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/dr-backup-diagram.svg"
        alt="AWS Backup & Restore DR Lab Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Backup and restore disaster recovery with daily cross-region backups, automated recovery via CloudFormation/CDK, and Route 53 DNS failover. 4-hour RTO with minimal ongoing costs. CloudWatch monitors backup success with regular recovery testing.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-dr-backup-lab"
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
