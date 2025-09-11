<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS Bedrock Baseline Landing Zone">
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/bedrock-landingzone-diagram.svg"
          alt="Bedrock Landing Zone Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Platform Controls -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            A baseline, multi‑account landing zone for Amazon Bedrock. Terraform/CDK provision org
            units, identity, network egress controls, private Bedrock access via VPC endpoints,
            KMS‑encrypted logs/artifacts, and least‑privilege roles for model usage at team scope.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key Architecture Decisions</h3>
          <p class="text-base text-gray-300">
            Used VPC endpoints for private Bedrock access instead of internet gateway. Separate
            accounts for different environments (dev/prod). IAM roles limit which AI models teams
            can access. All prompts and responses logged to S3 for audit purposes.
          </p>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Security Setup</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>VPC endpoints for private Bedrock access</li>
          <li>IAM roles control model access by team</li>
          <li>Content filters and guardrails configured</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Control</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Budget alerts for AI model usage</li>
          <li>Expensive models blocked by default</li>
          <li>S3 lifecycle policies for log storage</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch metrics for API calls and errors</li>
          <li>All prompts and responses logged to S3</li>
          <li>CloudTrail tracks all Bedrock API usage</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Learning to build secure AI infrastructure with AWS Bedrock. Demonstrates multi-account
        setup, private networking, IAM controls, and audit logging patterns for AI workloads
        using Infrastructure as Code.
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-bedrock-baseline-landingzone"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://aws.amazon.com/blogs/architecture/amazon-bedrock-baseline-architecture-in-an-aws-landing-zone/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Inspiration
        </a>
      </div>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
