<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Resilient Serverless Ingestion Pipeline on AWS"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/sqs-dlq-diagram.svg"
        alt="Event-Driven Ingestion + DLQ Reliability Lab Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Event-driven ingestion pipeline using API Gateway, Lambda, SQS, DynamoDB, and EventBridge. SQS with DLQ for reliable message processing, DynamoDB prevents duplicates, retry logic with exponential backoff. Everything provisioned through CDK.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-lambda-sqs-dlq"
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
