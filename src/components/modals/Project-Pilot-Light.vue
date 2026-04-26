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
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        <span class="text-cyan-300">Pilot light</span> disaster recovery for e-commerce using <span class="text-cyan-300">RDS</span> read replica, <span class="text-cyan-300">Step Functions</span> orchestration, and <span class="text-cyan-300">Route 53</span> health checks. Achieves 5–10 minute <span class="text-cyan-300">RTO</span> with 80% cost savings vs warm standby. Automated failover with validation and rollback capabilities.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-dr-pilot-light"
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
