<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Enterprise AWS Observability Platform Architecture"
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
            Enterprise-ready monitoring platform built with AWS CDK providing instant visibility
            into any AWS workload. Features automated resource discovery, intelligent alerting,
            distributed tracing with X-Ray, and real-time dashboards with minimal configuration.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Automation & Intelligence</h3>
          <p class="text-base text-gray-300">
            EventBridge-driven workflows enable automated incident response; Step Functions handle
            complex remediation; Lambda functions process alerts with enrichment and routing;
            Kinesis streams provide real-time log analysis with anomaly detection.
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
          <li>Multi-severity alerting with automatic escalation and routing.</li>
          <li>Composite alarms for system-wide health indicators.</li>
          <li>Automated remediation workflows with rollback capabilities.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Budget monitoring with anomaly detection and forecasting.</li>
          <li>S3 lifecycle policies with automated archival (IA → Glacier).</li>
          <li>X-Ray sampling rules and configurable log retention periods.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Universal resource discovery across EC2, ECS, EKS, Lambda, RDS.</li>
          <li>Pre-built CloudWatch dashboards with business metrics integration.</li>
          <li>Structured log processing with CloudWatch Logs Insights queries.</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem & scope:</span>
        Organizations struggle with fragmented monitoring across AWS services and lack unified
        observability. This platform provides comprehensive monitoring, intelligent alerting, and
        automated remediation with enterprise-grade security and cost optimization.
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-observability-platform"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://aws.amazon.com/cloudwatch/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          AWS CloudWatch
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
