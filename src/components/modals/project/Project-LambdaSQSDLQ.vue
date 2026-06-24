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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Event-driven ingestion pipeline using <span class="text-ob-teal-bright">API Gateway</span>, <span class="text-ob-teal-bright">Lambda</span>, <span class="text-ob-teal-bright">SQS</span>, <span class="text-ob-teal-bright">DynamoDB</span>, and <span class="text-ob-teal-bright">EventBridge</span>. SQS with <span class="text-ob-teal-bright">DLQ</span> for reliable message processing, DynamoDB prevents duplicates, retry logic with exponential backoff. Everything provisioned through <span class="text-ob-teal-bright">CDK</span>.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-lambda-sqs-dlq"
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
