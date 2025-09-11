<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="E-commerce Pilot Light Disaster Recovery"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/dr-pilot-light-diagram.svg"
          alt="Pilot Light DR Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Enterprise-grade disaster recovery solution using AWS Pilot Light strategy for
            e-commerce platforms. Maintains minimal infrastructure in DR region with automated
            failover, achieving 80% cost reduction while meeting strict RTO/RPO requirements.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose pilot light over warm standby for cost optimization, accepting 5-10 minute RTO
              for 80% savings. RDS read replica provides continuous data sync. Step Functions
              orchestrate complex failover workflows with automated validation and rollback
              capabilities.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Disaster Recovery</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>5-10 minute recovery time objective</li>
          <li>Route 53 health checks trigger failover</li>
          <li>RDS read replica keeps data synchronized</li>
          <li>Step Functions automate the failover process</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Primary region: ~$200-500/month</li>
          <li>DR region: ~$50-100/month (pilot light)</li>
          <li>80% cost savings vs full standby</li>
          <li>Only database replica runs continuously</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch dashboards for DR status</li>
          <li>Route 53 health check monitoring</li>
          <li>RDS replica lag tracking</li>
          <li>SNS alerts for failover events</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem & scope:</span>
          Learning disaster recovery patterns with AWS pilot light strategy. Demonstrates
          cross-region database replication, automated failover with Step Functions, and
          cost-effective DR architecture for web applications.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-dr-pilot-light"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-iii-pilot-light-and-warm-standby/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          AWS Blog
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
