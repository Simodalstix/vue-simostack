<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Certified Developer: Associate"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates proficiency in developing, deploying, and debugging cloud-native applications on AWS.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>Building with Lambda, API Gateway, DynamoDB, SQS, and SNS</li>
        <li>CI/CD pipelines using CodePipeline, CodeBuild, and CodeDeploy</li>
        <li>SDK and CLI usage, IAM authentication, and Secrets Manager integration</li>
        <li>Container deployment with ECS/Fargate and application observability with CloudWatch and X-Ray</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">This certification covers the full application lifecycle, from writing code against AWS APIs to deploying through automated pipelines with proper instrumentation.</p>
      <div>
        <a
          href="https://www.credly.com/badges/e90f09fd-d161-465a-93e1-bcfb7375635a"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
