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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Multi-account landing zone for <span class="text-ob-teal-bright">Amazon Bedrock</span> with <span class="text-ob-teal-bright">Terraform</span>/<span class="text-ob-teal-bright">CDK</span>. <span class="text-ob-teal-bright">VPC endpoints</span> for private Bedrock access, <span class="text-ob-teal-bright">KMS</span>-encrypted logs, least-privilege <span class="text-ob-teal-bright">IAM</span> roles for model usage, and content filters with guardrails. All prompts and responses logged to <span class="text-ob-teal-bright">S3</span> for audit.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-bedrock-baseline-landingzone"
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
