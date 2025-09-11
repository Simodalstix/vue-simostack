<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Container Platforms — EKS GitOps & Fargate Blue/Green"
  >
    <div class="bg-gray-900 text-gray-200">
      <!-- Top: diagram + slim sidebar -->
      <div class="flex flex-col md:flex-row">
        <!-- Diagram -->
        <div class="md:w-2/3 p-4">
          <img
            src="/images/project-modal-images/container-platform-diagram.svg"
            alt="EKS GitOps and ECS Fargate Architecture"
            class="object-contain rounded-lg w-full border border-gray-700"
          />
        </div>

        <!-- Slim sidebar: terse, mid-level details -->
        <aside class="md:w-1/3 p-4 space-y-5 md:max-h-[70vh] overflow-y-auto">
          <div class="bg-gray-800/60 border border-gray-700 rounded-md p-4">
            <h3 class="font-semibold text-gray-100 mb-2">EKS — GitOps</h3>
            <ul class="text-sm text-gray-300 list-disc list-inside space-y-1">
              <li>Terraform for VPC, EKS, IRSA, ALB</li>
              <li>Argo CD syncs Helm apps per env</li>
              <li>Autoscaling via HPA + Cluster Autoscaler</li>
              <li>Prometheus &amp; Grafana dashboards</li>
            </ul>
          </div>

          <div class="bg-gray-800/60 border border-gray-700 rounded-md p-4">
            <h3 class="font-semibold text-gray-100 mb-2">Fargate — Blue/Green</h3>
            <ul class="text-sm text-gray-300 list-disc list-inside space-y-1">
              <li>CDK for ALB, ECS services, Aurora v2</li>
              <li>GitHub Actions CI ➜ CodeDeploy blue/green</li>
              <li>Auto-rollback gated by CloudWatch alarms</li>
              <li>X-Ray tracing &amp; structured logs</li>
            </ul>
          </div>

          <!-- FIS: single-line highlight so it doesn’t dominate -->
          <div class="bg-gray-800/60 border border-gray-700 rounded-md p-3">
            <p class="text-xs text-gray-300">
              <span
                class="mr-2 inline-block px-2 py-0.5 rounded-full border border-gray-600 text-[10px] tracking-wide uppercase text-gray-300"
                >FIS</span
              >
              Targeted experiments validate auto-healing: ECS task kill/latency, EKS pod delete/CPU,
              and Aurora failover (stop on alarm breach).
            </p>
          </div>
        </aside>
      </div>

      <!-- Bottom: compact platform-wide notes (kept short) -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-t border-gray-800">
        <div class="bg-gray-800/60 border border-gray-700 rounded-md p-4">
          <h4 class="font-semibold text-gray-100 mb-2">Observability</h4>
          <ul class="text-sm text-gray-300 list-disc list-inside space-y-1">
            <li>ALB/ECS/EKS/RDS dashboards</li>
            <li>p95 latency, error rate, saturation</li>
            <li>Deployments gated by alarms</li>
          </ul>
        </div>
        <div class="bg-gray-800/60 border border-gray-700 rounded-md p-4">
          <h4 class="font-semibold text-gray-100 mb-2">Security</h4>
          <ul class="text-sm text-gray-300 list-disc list-inside space-y-1">
            <li>WAF on public entrypoints</li>
            <li>Least-privilege IAM &amp; IRSA</li>
            <li>Private subnets, KMS encryption</li>
          </ul>
        </div>
        <div class="bg-gray-800/60 border border-gray-700 rounded-md p-4">
          <h4 class="font-semibold text-gray-100 mb-2">Links</h4>
          <ul class="text-sm space-y-1">
            <li>
              <a
                class="underline text-gray-300 hover:text-gray-100"
                target="_blank"
                href="https://github.com/Simodalstix/AWS-eks-multi-tier-gitops"
                >EKS GitOps</a
              >
            </li>
            <li>
              <a
                class="underline text-gray-300 hover:text-gray-100"
                target="_blank"
                href="https://github.com/Simodalstix/AWS-fargate-golden-path"
                >ECS Fargate</a
              >
            </li>
          </ul>
        </div>
      </section>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
