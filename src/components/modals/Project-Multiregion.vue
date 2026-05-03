<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Serverless Multi-Region AWS Platform – (Expansion Underway)"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/AWS-multiregion-ecommerce.jpg"
        alt="AWS Multiregion Ecommerce Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Multi-region serverless ecommerce backend with <span class="text-cyan-300">DynamoDB Global Tables</span>, <span class="text-cyan-300">API Gateway</span>, <span class="text-cyan-300">Lambda</span>, and <span class="text-cyan-300">Route 53</span> failover. Pay-per-use scaling with provisioned concurrency on checkout path. Targets p95 &lt; 250ms and &gt;= 99.9% availability with ~60–120s failover.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-multiregion-ecommerce"
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
