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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Multi-region serverless ecommerce backend with <span class="text-ob-teal-bright">DynamoDB Global Tables</span>, <span class="text-ob-teal-bright">API Gateway</span>, <span class="text-ob-teal-bright">Lambda</span>, and <span class="text-ob-teal-bright">Route 53</span> failover. Pay-per-use scaling with provisioned concurrency on checkout path. Targets p95 &lt; 250ms and &gt;= 99.9% availability with ~60–120s failover.
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-multiregion-ecommerce"
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
