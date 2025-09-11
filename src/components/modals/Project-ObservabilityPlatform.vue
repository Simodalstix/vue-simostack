<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Monitoring & Observability Platform Architecture"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/observability-platform-diagram.svg"
          alt="AWS Observability Platform Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Platform Controls -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            AWS monitoring platform built with CDK providing visibility
            into AWS workloads. Features automated resource discovery, multi-channel alerting,
            distributed tracing with X-Ray, and real-time dashboards with minimal configuration.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key Architecture Decisions</h3>
          <p class="text-base text-gray-300">
            Used CloudWatch as the central monitoring hub with X-Ray for distributed tracing.
            EventBridge routes alerts to different channels (email, Slack). Lambda functions
            process and enrich alert data before sending notifications.
          </p>
        </div>
      </aside>
    </div>

    <!-- Implementation Details -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Alert Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch alarms for different severity levels</li>
          <li>EventBridge routes alerts to appropriate channels</li>
          <li>Lambda functions enrich alerts with context</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Log retention policies to control storage costs</li>
          <li>X-Ray sampling to reduce tracing overhead</li>
          <li>S3 lifecycle policies for log archival</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring Coverage</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch dashboards for key services</li>
          <li>X-Ray tracing for request flow visibility</li>
          <li>Log aggregation with CloudWatch Logs Insights</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem & scope:</span>
        Learning to build comprehensive monitoring for AWS workloads. Demonstrates CloudWatch
        integration, alert routing with EventBridge, and distributed tracing patterns for
        visibility across multiple services.
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-observability-platform"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
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
