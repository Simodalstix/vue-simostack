<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Config Management – Puppet, Compliance & Remediation"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/ssm-puppet.png"
        alt="AWS Config Management & Compliance Automation Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        <span class="text-ob-teal-bright">CDK (Python)</span> enforces masterless <span class="text-ob-teal-bright">Puppet</span> agent state via <span class="text-ob-teal-bright">SSM State Manager</span> (manifests in S3), audits the fleet with <span class="text-ob-teal-bright">AWS Config</span> rules, and routes violations through <span class="text-ob-teal-bright">EventBridge</span> to <span class="text-ob-teal-bright">Lambda</span> for auto-remediation. Covers cloud and on-prem via SSM Hybrid Activations.
      </p>
      <a
        href="https://github.com/Simodalstix/aws-config-mgmt-lab"
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
