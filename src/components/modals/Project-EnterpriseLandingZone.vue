<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Enterprise Landing Zone Architecture"
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
            Production-ready AWS Landing Zone using CDK with enterprise organizational structure,
            multi-account strategy, hub-and-spoke networking via Transit Gateway, and comprehensive
            security baseline with GuardDuty, Security Hub, and automated governance.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Security & Governance</h3>
          <p class="text-base text-gray-300">
            Service Control Policies enforce preventive guardrails; Config rules provide detective
            controls; organization-wide CloudTrail with integrity validation; cross-account IAM
            roles with least privilege; centralized KMS key management across all accounts.
          </p>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Multi-AZ Transit Gateway with redundant connectivity paths.</li>
          <li>Account factory for standardized baseline provisioning.</li>
          <li>Automated drift detection and compliance monitoring.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Account-level budgets with automated alerts and thresholds.</li>
          <li>Centralized NAT Gateway in shared services for cost optimization.</li>
          <li>S3 lifecycle policies for CloudTrail logs with automated archival.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Cross-account CloudWatch dashboards and centralized monitoring.</li>
          <li>Organization-wide CloudTrail with centralized log aggregation.</li>
          <li>Security Hub findings aggregation across all accounts and regions.</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Enterprise organizations need a scalable, secure foundation for AWS multi-account
        environments. This landing zone provides automated account provisioning, centralized
        governance, and standardized networking patterns following AWS Well-Architected principles.
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
