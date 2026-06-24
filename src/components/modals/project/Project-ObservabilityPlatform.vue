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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        AWS monitoring platform built with <span class="text-ob-teal-bright">CDK</span> featuring automated resource discovery, multi-channel alerting via <span class="text-ob-teal-bright">EventBridge</span>, distributed tracing with <span class="text-ob-teal-bright">X-Ray</span>, and real-time <span class="text-ob-teal-bright">CloudWatch</span> dashboards. <span class="text-ob-teal-bright">Lambda</span> functions enrich alerts with context before routing to email or Slack.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-observability-platform"
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
