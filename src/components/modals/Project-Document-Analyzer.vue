<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Intelligent Document Contract Analyzer"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/bedrock-document-analyzer-diagram.svg"
          alt="Document Contract Analyzer Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            AI-powered legal contract analysis system using Amazon Bedrock (Claude) and Textract.
            Upload contracts, get intelligent risk assessment, key term extraction, and compliance
            checking in under 60 seconds. Built with full TypeScript stack for production use.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose serverless Lambda over containers for cost efficiency and auto-scaling. Bedrock
              Claude provides superior legal analysis vs other AI models. Direct S3 uploads via
              presigned URLs reduce Lambda costs. 90-day lifecycle balances compliance with storage
              costs.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem & scope:</span>
          Automate legal contract review to save hours of manual analysis. Extract key terms, assess
          risks, identify unusual clauses, and check compliance using AI. Demonstrates modern
          serverless architecture with AI integration and production-ready security.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-ai-document-analyzer"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
