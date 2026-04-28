<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS 3-Tier Platform – FastAPI, ALB, ASG, RDS & ElastiCache Redis"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/verify_platform.py.png"
        alt="AWS 3-Tier Platform verification screenshot"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Stack breakdown -->
    <div class="px-4 pb-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-3">
          <p class="text-xs font-semibold text-cyan-400 mb-1.5">DataTierStack</p>
          <p class="text-xs text-slate-300 leading-relaxed">RDS PostgreSQL 16, ElastiCache Redis, Secrets Manager secret, security groups</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-3">
          <p class="text-xs font-semibold text-cyan-400 mb-1.5">AppTierStack</p>
          <p class="text-xs text-slate-300 leading-relaxed">EC2 ASG with launch template, CloudWatch log group, target group, CPU scaling policy</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-3">
          <p class="text-xs font-semibold text-cyan-400 mb-1.5">PresentationStack</p>
          <p class="text-xs text-slate-300 leading-relaxed">ALB, HTTP listener, ALB security group — deployed last, depends on AppTierStack</p>
        </div>
      </div>
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Production-style <span class="text-cyan-300">3-tier platform</span> built with <span class="text-cyan-300">CDK Python</span>. Runs a <span class="text-cyan-300">FastAPI</span> app behind an <span class="text-cyan-300">ALB</span> and <span class="text-cyan-300">Auto Scaling Group</span>, backed by <span class="text-cyan-300">RDS PostgreSQL 16</span> and <span class="text-cyan-300">ElastiCache Redis</span> in isolated subnets. Zero hardcoded ARNs — all cross-stack config flows through <span class="text-cyan-300">SSM Parameter Store</span>. Extended with <span class="text-cyan-300">FIS fault injection</span> experiments and DR runbooks. Part of a broader ops lab sharing networking and observability stacks.
      </p>
      <a
        href="https://github.com/Simodalstix/aws-3tier-platform"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
