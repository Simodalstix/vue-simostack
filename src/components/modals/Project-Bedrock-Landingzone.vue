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
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Multi-account landing zone for Amazon Bedrock with Terraform/CDK. VPC endpoints for private Bedrock access, KMS-encrypted logs, least-privilege IAM roles for model usage, and content filters with guardrails. All prompts and responses logged to S3 for audit.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-bedrock-baseline-landingzone"
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
