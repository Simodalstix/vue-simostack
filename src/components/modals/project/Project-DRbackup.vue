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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Backup and restore disaster recovery with daily cross-region backups, automated recovery via <span class="text-ob-teal-bright">CloudFormation</span>/<span class="text-ob-teal-bright">CDK</span>, and <span class="text-ob-teal-bright">Route 53</span> DNS failover. 4-hour <span class="text-ob-teal-bright">RTO</span> with minimal ongoing costs. <span class="text-ob-teal-bright">CloudWatch</span> monitors backup success with regular recovery testing.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-dr-backup-lab"
        target="_blank"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
