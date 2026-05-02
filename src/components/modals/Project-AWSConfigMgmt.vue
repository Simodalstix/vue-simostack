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
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        <span class="text-cyan-300">CDK (Python)</span> enforces masterless <span class="text-cyan-300">Puppet</span> agent state via <span class="text-cyan-300">SSM State Manager</span> (manifests in S3), audits the fleet with <span class="text-cyan-300">AWS Config</span> rules, and routes violations through <span class="text-cyan-300">EventBridge</span> to <span class="text-cyan-300">Lambda</span> for auto-remediation. Covers cloud and on-prem via SSM Hybrid Activations.
      </p>
      <a
        href="https://github.com/Simodalstix/aws-config-mgmt-lab"
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
