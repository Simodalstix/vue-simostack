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

    <!-- New Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Region: Sydney for AU data residency</li>
          <li>Error handling: Retry logic with dead letter queues</li>
          <li>Processing status: Real-time updates via DynamoDB</li>
          <li>Fallback: Graceful on AI failure</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Target: ~$20-50/month for moderate usage</li>
          <li>Optimizations: Serverless, on-demand billing, lifecycle policies</li>
          <li>Drivers: Bedrock tokens, Lambda invocations, S3 storage</li>
          <li>Scaling: Pay-per-use model scales to zero</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Tracing: X-Ray end-to-end request tracking</li>
          <li>Metrics: CloudWatch dashboards for all services</li>
          <li>Logs: Structured logging with correlation IDs</li>
          <li>Monitoring: Processing time and accuracy metrics</li>
        </ul>
      </div>
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
