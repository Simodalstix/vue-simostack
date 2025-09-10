<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Multi-Account Landing Zone Architecture"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/enterprise-landingzone-diagram.svg"
          alt="Enterprise Landing Zone Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Platform Controls -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            AWS Landing Zone using CDK with multi-account organizational structure,
            hub-and-spoke networking via Transit Gateway, and security baseline with GuardDuty,
            Security Hub, and automated governance.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key Architecture Decisions</h3>
          <p class="text-base text-gray-300">
            Used CDK over Terraform for better AWS service integration. Transit Gateway provides
            centralized networking instead of VPC peering. Separate accounts for different
            environments (dev/staging/prod) with shared services account for common resources.
          </p>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Multi-Account Setup</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Transit Gateway connects all account VPCs</li>
          <li>Standardized account creation with CDK</li>
          <li>Config rules check for compliance drift</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Control</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Budget alerts for each account</li>
          <li>Shared NAT Gateway reduces costs</li>
          <li>CloudTrail logs archived to cheaper storage</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Security & Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch dashboards across accounts</li>
          <li>CloudTrail logging for all API calls</li>
          <li>Security Hub aggregates security findings</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Learning to build multi-account AWS environments with proper security and networking.
        This project demonstrates account organization, centralized logging, and standardized
        infrastructure patterns using Infrastructure as Code.
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/simodalstix/AWS-enterprise-landingzone"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          AWS Control Tower
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
