<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Intelligent Document Contract Analyzer"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/bedrock-document-analyzer-diagram.svg"
        alt="Document Contract Analyzer Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        AI-powered legal contract analysis using <span class="text-ob-teal-bright">Amazon Bedrock</span> (Claude) and <span class="text-ob-teal-bright">Textract</span>. Serverless TypeScript stack with <span class="text-ob-teal-bright">Lambda</span>, <span class="text-ob-teal-bright">S3</span>, and <span class="text-ob-teal-bright">DynamoDB</span>. Extracts key terms, assesses risks, and checks compliance in under 60 seconds with presigned URL uploads and 90-day lifecycle policies.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-ai-document-analyzer"
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
