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
          <h3 class="font-bold text-lg text-orange-300">Key Architecture Decisions</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Used backup and restore strategy for lowest cost disaster recovery. Daily backups
              are copied to another AWS region. Recovery takes a few hours but costs much less
              than keeping duplicate infrastructure running all the time.
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
        <h3 class="font-bold text-lg mb-2 text-orange-300">Backup Strategy</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>4-hour recovery time objective</li>
          <li>Daily automated backups to second region</li>
          <li>Route 53 health checks for DNS failover</li>
          <li>CloudFormation templates for recovery</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>~$50/month for development environment</li>
          <li>Main costs: backup storage and cross-region copies</li>
          <li>Much cheaper than running duplicate infrastructure</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch monitors backup job success</li>
          <li>Alarms for backup failures and cost overruns</li>
          <li>Regular recovery testing to validate process</li>
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
          Learning cost-effective disaster recovery with AWS Backup service. Demonstrates
          cross-region backup strategies, automated recovery procedures, and DNS failover
          patterns for business continuity planning.
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
