<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-ob-bg"
    borderClass="border border-ob-sand/16 shadow-2xl shadow-black/50"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-ob-bright">AWS Certified Developer: Associate</h2>
        <div class="h-[3px] w-16 bg-[#FF9900] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Validates proficiency in developing, deploying, and debugging cloud-native applications on AWS.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Building with Lambda, API Gateway, DynamoDB, SQS, and SNS</li>
        <li>CI/CD pipelines using CodePipeline, CodeBuild, and CodeDeploy</li>
        <li>SDK and CLI usage, IAM authentication, and Secrets Manager integration</li>
        <li>Container deployment with ECS/Fargate and application observability with CloudWatch and X-Ray</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">This certification covers the full application lifecycle, from writing code against AWS APIs to deploying through automated pipelines with proper instrumentation.</p>
      <div>
        <a
          href="https://www.credly.com/badges/e90f09fd-d161-465a-93e1-bcfb7375635a"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#FF9900] hover:bg-[#EC7211] text-[#0C0F12] font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
