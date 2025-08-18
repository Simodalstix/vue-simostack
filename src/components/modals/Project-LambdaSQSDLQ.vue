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
          <h3 class="font-semibold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            A production-ready, event-driven ingestion pipeline on AWS using API Gateway, Lambda,
            SQS, DynamoDB, and EventBridge. It demonstrates how platform teams can embed resilience,
            observability, and operational excellence directly into the architecture, with
            everything provisioned through CDK for repeatability.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability & Fault Tolerance</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-sm text-gray-300">
              Implements resilience mechanisms: DLQ with controlled redrive, idempotency in
              DynamoDB, partial batch retries, and circuit breakers for external calls. Backoff with
              jitter prevents storms, while single-responsibility Lambdas limit blast radius and
              simplify scaling—together forming a modern resilience posture.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>DLQ with configurable redrive policy.</li>
          <li>Idempotency enforced using DynamoDB + TTL.</li>
          <li>Circuit breaker patterns for external dependencies.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Est. ~US$20/mo in dev (1M msgs, us-east-1).</li>
          <li>Major drivers: Lambda, API Gateway, CloudWatch.</li>
          <li>KMS optional (adds ~$3/mo if enabled).</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch dashboards + alarms preconfigured.</li>
          <li>Structured JSON logging with correlation IDs.</li>
          <li>X-Ray tracing + Log Insights queries for troubleshooting.</li>
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
          Demonstrate a resilient ingestion pipeline with safe failure handling, observability, and
          cost-effective scaling. Current phase: DLQ handling, retries with backoff/jitter,
          idempotency, and circuit breakers.
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
