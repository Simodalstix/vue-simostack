<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="ECS Fargate Golden Path + Resilience Scenarios"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/ecs-golden-path-diagram.svg"
        alt="ECS Fargate Golden Path Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        <span class="text-ob-teal-bright">ECS Fargate</span> web service with blue/green deployments via <span class="text-ob-teal-bright">CodeDeploy</span>, multi-metric observability, and built-in chaos engineering scenarios. Auto-rollback on health check failures, <span class="text-ob-teal-bright">X-Ray</span> tracing, and controlled failure scenarios for incident response training.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-fargate-golden-path"
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
