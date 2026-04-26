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
        AWS monitoring platform built with <span class="text-cyan-300">CDK</span> featuring automated resource discovery, multi-channel alerting via <span class="text-cyan-300">EventBridge</span>, distributed tracing with <span class="text-cyan-300">X-Ray</span>, and real-time <span class="text-cyan-300">CloudWatch</span> dashboards. <span class="text-cyan-300">Lambda</span> functions enrich alerts with context before routing to email or Slack.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-observability-platform"
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
