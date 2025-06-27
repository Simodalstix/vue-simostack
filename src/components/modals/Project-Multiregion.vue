<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS Multiregion E-commerce Platform">
    <div class="grid grid-cols-1 md:grid-cols-[5fr,2fr] mx-3 gap-6 text-gray-200">
      <!-- Left: Diagram + summary -->
      <div class="mt-3">
        <img
          src="/images/project-modal-images/AWS-multiregion-ecommerce.png"
          alt="AWS Multiregion Ecommerce Diagram"
          class="object-contain rounded shadow"
        />

        <p class="italic text-base text-orange-300 mt-5">
          A resilient, scalable e-commerce architecture leveraging multi-region AWS infrastructure,
          IaC, and automation.
        </p>
      </div>

      <!-- Right: Description + GitHub + Badges -->
      <div class="text-base space-y-4 mt-3">
        <p>
          Core services are provisioned using Infrastructure as Code (AWS CDK, Python), with a
          multi-region architecture designed for high availability, global DynamoDB tables, and
          cross-region S3 replication. While failover currently requires manual intervention, the
          platform is built to support automated failover in the future.
        </p>
        <p>
          The stack includes API Gateway, Lambda, and DynamoDB, with a focus on zero-downtime
          failover and automated regional failback. All infrastructure is fully reproducible and
          built for real-world cloud engineering scenarios.
        </p>

        <div class="flex gap-3 items-center">
          <img src="/images/main-tools/aws-icon.svg" class="h-24 mr-4" title="AWS" />

          <a
            href="https://github.com/Simodalstix/AWS-multiregion-ecommerce"
            class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
            target="_blank"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
