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
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Event-driven ingestion pipeline using <span class="text-cyan-300">API Gateway</span>, <span class="text-cyan-300">Lambda</span>, <span class="text-cyan-300">SQS</span>, <span class="text-cyan-300">DynamoDB</span>, and <span class="text-cyan-300">EventBridge</span>. SQS with <span class="text-cyan-300">DLQ</span> for reliable message processing, DynamoDB prevents duplicates, retry logic with exponential backoff. Everything provisioned through <span class="text-cyan-300">CDK</span>.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-lambda-sqs-dlq"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
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
