<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Disaster Recovery - Backup & Restore With Rapid Recovery"
  >
    <!-- Top row: diagram + sidebar (unchanged proportions) -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/dr-backup-diagram.svg"
          alt="AWS Backup & Restore DR Lab Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions (paragraph style) -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Hands-on DR lab using the Backup &amp; Restore pattern: daily backups with cross-region
            copy, automated recovery via CloudFormation/CDK and Lambda runbooks, and DNS failover
            using Route 53. Primary stack includes VPC + app tier, RDS PostgreSQL, S3, and KMS.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions &amp; trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose Backup &amp; Restore over Warm Standby/Pilot Light to minimise steady-state
              cost, accepting RTO/RPO in hours rather than minutes. Daily backups copy to a
              secondary region and age to cold storage; recovery remains automated via
              templates/runbooks—modern posture at a fraction of the cost.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Reliability, Cost, Observability (concise + accurate today) -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Targets: RTO ≤ 4h; RPO ≤ 4h.</li>
          <li>
            Failover: Route 53 health checks to secondary region
            <span class="text-gray-400">(expected)</span>
          </li>
          <li>
            Measurement: backup success &amp; recovery drills
            <span class="text-gray-400">(planned)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Target: &lt; AU$50/mo for lab scale.</li>
          <li>Drivers: backup storage + cross-region copies (RDS/EBS/S3).</li>
          <li>
            Method: AWS Backup pricing; validate in Cost Explorer
            <span class="text-gray-400">(planned)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Monitor: backup job success, copy lag, runbook errors.</li>
          <li>Alarms: recovery failures, cost threshold breaches.</li>
          <li>Alerts: SNS → Slack <span class="text-gray-400">(planned)</span></li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem &amp; scope:</span>
          Demonstrate a cost-optimised DR approach using Backup &amp; Restore with
          automated recovery. Current phase: baseline backup monitoring + first recovery drill.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-dr-backup-lab"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-i-strategies-for-recovery-in-the-cloud/"
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
