<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS Bedrock Baseline Landing Zone">
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/bedrock-landingzone-diagram.svg"
        alt="Bedrock Landing Zone Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Multi-account landing zone for <span class="text-cyan-300">Amazon Bedrock</span> with <span class="text-cyan-300">Terraform</span>/<span class="text-cyan-300">CDK</span>. <span class="text-cyan-300">VPC endpoints</span> for private Bedrock access, <span class="text-cyan-300">KMS</span>-encrypted logs, least-privilege <span class="text-cyan-300">IAM</span> roles for model usage, and content filters with guardrails. All prompts and responses logged to <span class="text-cyan-300">S3</span> for audit.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-bedrock-baseline-landingzone"
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
