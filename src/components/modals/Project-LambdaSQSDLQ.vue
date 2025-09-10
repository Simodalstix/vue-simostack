<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Resilient Serverless Ingestion Pipeline on AWS"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/sqs-dlq-diagram.svg"
          alt="Event-Driven Ingestion + DLQ Reliability Lab Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key patterns -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Event-driven ingestion pipeline on AWS using API Gateway, Lambda, SQS, DynamoDB, and
            EventBridge. Demonstrates how platform teams can embed resilience, observability, and
            operational patterns directly into the architecture, with everything provisioned through
            CDK for repeatability.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key Architecture Decisions</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Used SQS with DLQ for reliable message processing - failed messages go to dead letter
              queue for investigation. DynamoDB stores processed message IDs to prevent duplicates.
              Lambda functions are small and focused on single tasks for easier debugging.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Error Handling</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Dead letter queue captures failed messages</li>
          <li>DynamoDB prevents duplicate processing</li>
          <li>Retry logic with exponential backoff</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>~$20/month for 1M messages in development</li>
          <li>Main costs: Lambda execution and API Gateway</li>
          <li>Optional KMS encryption adds ~$3/month</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch dashboards show message flow</li>
          <li>Structured logging with request tracking</li>
          <li>X-Ray tracing for performance debugging</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem &amp; scope:</span>
          Learning serverless event-driven architecture with proper error handling and monitoring.
          Demonstrates message queuing, dead letter queues, and Lambda function patterns for
          reliable data processing.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-lambda-sqs-dlq"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/implement-dead-letter-queues-to-handle-message-processing-failures.html"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          DLQ Best Practices
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
