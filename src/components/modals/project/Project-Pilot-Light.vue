<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="E-commerce Pilot Light Disaster Recovery"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/dr-pilot-light-diagram.svg"
        alt="Pilot Light DR Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        <span class="text-ob-teal-bright">Pilot light</span> disaster recovery for e-commerce using <span class="text-ob-teal-bright">RDS</span> read replica, <span class="text-ob-teal-bright">Step Functions</span> orchestration, and <span class="text-ob-teal-bright">Route 53</span> health checks. Achieves 5–10 minute <span class="text-ob-teal-bright">RTO</span> with 80% cost savings vs warm standby. Automated failover with validation and rollback capabilities.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-dr-pilot-light"
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
