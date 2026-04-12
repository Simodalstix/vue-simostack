<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-[#232F3E]"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-white">AWS Certified Developer: Associate</h2>
        <div class="h-0.5 bg-[#FF9900] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-white p-5 rounded mb-2">
      <p class="text-base text-gray-800 mb-3">Validates proficiency in developing, deploying, and debugging cloud-native applications on AWS.</p>
      <ul class="text-base text-gray-600 space-y-1.5 mb-4 list-disc list-inside">
        <li>Building with Lambda, API Gateway, DynamoDB, SQS, and SNS</li>
        <li>CI/CD pipelines using CodePipeline, CodeBuild, and CodeDeploy</li>
        <li>SDK and CLI usage, IAM authentication, and Secrets Manager integration</li>
        <li>Container deployment with ECS/Fargate and application observability with CloudWatch and X-Ray</li>
      </ul>
      <p class="text-sm text-gray-400 italic mb-4">This certification covers the full application lifecycle, from writing code against AWS APIs to deploying through automated pipelines with proper instrumentation.</p>
      <div>
        <a
          href="https://www.credly.com/badges/e90f09fd-d161-465a-93e1-bcfb7375635a"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#FF9900] hover:bg-[#EC7211] text-gray-900 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
