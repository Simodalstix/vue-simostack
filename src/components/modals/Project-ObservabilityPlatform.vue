<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Monitoring & Observability Platform Architecture"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/observability-platform-diagram.svg"
        alt="AWS Observability Platform Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        AWS monitoring platform built with CDK featuring automated resource discovery, multi-channel alerting via EventBridge, distributed tracing with X-Ray, and real-time CloudWatch dashboards. Lambda functions enrich alerts with context before routing to email or Slack.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-observability-platform"
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
