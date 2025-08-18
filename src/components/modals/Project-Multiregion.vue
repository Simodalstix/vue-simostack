<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Serverless Multi-Region AWS Platform – (Expansion Underway)"
  >
    <!-- Top row: diagram + sidebar (unchanged proportions) -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/AWS-multiregion-ecommerce.jpg"
          alt="AWS Multiregion Ecommerce Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions (description added above) -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-semibold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            A multi-region, serverless ecommerce backend focused on low-ops, pay-per-use, and
            regional resilience. Optimised for simplicity over active-active write complexity.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-300">Key decisions & trade-offs</h3>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>
              DynamoDB Global Tables over Aurora — simpler ops; eventual consistency acceptable with
              idempotency.
            </li>
            <li>
              API Gateway + Lambda — pay-per-use; provisioned concurrency only on checkout path.
            </li>
            <li>
              Route 53 failover over active-active writes — lower cost/complexity; brief propagation
              delay accepted.
            </li>
          </ul>
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
          <li>Targets: p95 &lt; 250ms; ≥ 99.9% availability.</li>
          <li>
            Failover: ~60–120s
            <span class="text-gray-400">(expected via Route 53 health checks)</span>
          </li>
          <li>
            Measurement: k6/Artillery + CloudWatch/X-Ray
            <span class="text-gray-400">(planned)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>
            Method: AWS Pricing Calculator; validate in Cost Explorer
            <span class="text-gray-400">(planned)</span>
          </li>
          <li>Savings: HTTP API, CloudFront caching, response compression.</li>
          <li>
            Publish: “~AU$X/mo @ Y req/s” after baseline <span class="text-gray-400">(todo)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Dashboards: latency, errors, throttles; DDB capacity.</li>
          <li>Alarms: 5xx &gt; 1%, throttles &gt; 0, p95 &gt; target.</li>
          <li>Alerts: SNS → Slack <span class="text-gray-400">(planned)</span></li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + tech badges + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem & scope:</span>
          Global storefront handling spiky traffic with strict cost controls and regional
          resilience. Current phase: baseline metrics + alerting integration.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/Simodalstix/AWS-multiregion-ecommerce"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://github.com/Simodalstix/AWS-multiregion-ecommerce/blob/main/docs/ARCHITECTURE.md"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Architecture Doc
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
