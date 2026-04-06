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
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        AI-powered legal contract analysis using <span class="text-cyan-300">Amazon Bedrock</span> (Claude) and <span class="text-cyan-300">Textract</span>. Serverless TypeScript stack with <span class="text-cyan-300">Lambda</span>, <span class="text-cyan-300">S3</span>, and <span class="text-cyan-300">DynamoDB</span>. Extracts key terms, assesses risks, and checks compliance in under 60 seconds with presigned URL uploads and 90-day lifecycle policies.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-ai-document-analyzer"
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
