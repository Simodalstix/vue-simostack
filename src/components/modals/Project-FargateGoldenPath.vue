<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="ECS Fargate Golden Path + Resilience Scenarios"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/ecs-golden-path-diagram.svg"
          alt="ECS Fargate Golden Path Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            ECS Fargate web service with multi-metric observability, blue/green
            deployments, and built-in chaos engineering scenarios for incident response training.
            Deploy once, break things safely, learn how to fix them.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose Fargate over EC2 for no server management, accepting higher per-task cost for
              simplicity. Blue/green via CodeDeploy delivers zero-downtime updates with
              auto-rollback. One NAT Gateway cuts cost while keeping HA across AZs.
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
        <h3 class="font-bold text-lg mb-2 text-orange-300">High Availability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>2 Fargate tasks across availability zones</li>
          <li>CodeDeploy auto-rollback on health check failures</li>
          <li>Load balancer health checks on /healthz</li>
          <li>Chaos testing with controlled failure scenarios</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost Management</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>~$50-100/month for demo environment</li>
          <li>Single NAT Gateway, Aurora Serverless v2</li>
          <li>Main costs: Fargate compute and database</li>
          <li>Auto-scaling adjusts to traffic</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Monitoring</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CloudWatch dashboards for key metrics</li>
          <li>X-Ray tracing shows request flow</li>
          <li>CloudWatch alarms with email notifications</li>
          <li>Structured logging for troubleshooting</li>
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
          Learning containerized application deployment with ECS Fargate, blue/green deployments,
          and monitoring setup. Includes controlled failure scenarios to practice incident
          response and troubleshooting skills.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-fargate-golden-path"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://aws.amazon.com/blogs/containers/announcing-aws-fault-injection-simulator-new-features-for-amazon-ecs-workloads/"
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
