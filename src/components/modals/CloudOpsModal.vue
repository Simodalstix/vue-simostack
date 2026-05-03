<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    width="max-w-2xl"
  >
    <template #header>
      <div class="flex items-center justify-center gap-3 pb-1">
        <h2 class="text-xl font-bold text-cyan-300">CloudOps Engineer</h2>
        <span class="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,1)]"></span>
          In Progress
        </span>
      </div>
    </template>
    <div class="px-2 pb-4 space-y-4">

      <!-- Intro -->
      <div class="flex items-start gap-4 pt-1 pb-2">
        <img
          src="/images/certifications/cloudops.webp"
          alt="AWS CloudOps Engineer"
          class="w-28 sm:w-28 shrink-0 rounded drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        />
        <p class="text-sm text-slate-300 leading-relaxed">
          The past year has seen a significant step-up in my AWS depth — through projects built around systems
          thinking: scripting for operational efficiency, automating away toil, and designing infrastructure that
          stays observable under pressure. The CloudOps Engineer cert is where that work crystallises: a formal
          marker of operational depth, built layer by layer.
        </p>
      </div>

      <!-- Project grid -->
      <div class="grid sm:grid-cols-2 gap-3">

        <div class="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 flex gap-3">
          <img src="/images/project-icons/Packer.svg" alt="Packer" class="w-8 h-8 shrink-0 mt-0.5 rounded-xl object-cover" />
          <div>
            <p class="text-xs font-semibold text-cyan-400 mb-1">AMI Image Pipeline</p>
            <p class="text-xs text-slate-300 leading-relaxed">
              Golden images baked with Packer in a layered base → app pipeline, AMI IDs published to
              SSM Parameter Store. No config drift, no snowflake instances — just a known-good image
              ready to scale.
            </p>
          </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 flex gap-3">
          <img src="/images/aws-icons/ec2-autoscaling.svg" alt="EC2 Auto Scaling" class="w-8 h-8 shrink-0 mt-0.5 rounded-xl object-cover" />
          <div>
            <p class="text-xs font-semibold text-cyan-400 mb-1">SSM Fleet Manager</p>
            <p class="text-xs text-slate-300 leading-relaxed">
              Patch compliance baselines, Run Command automation, and Session Manager across an EC2 fleet.
              The foundation for managing infrastructure at scale without SSH keys in production.
            </p>
          </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 flex gap-3">
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 shrink-0 mt-0.5 rounded-xl object-cover" />
          <div>
            <p class="text-xs font-semibold text-cyan-400 mb-1">CloudWatch & Alarms</p>
            <p class="text-xs text-slate-300 leading-relaxed">
              Custom metrics, structured log groups, and composite alarms routing into SNS. The
              instrumentation layer that turns silent failures into actionable signals before users
              notice.
            </p>
          </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 flex gap-3">
          <img src="/images/project-icons/eventbridge.svg" alt="EventBridge" class="w-8 h-8 shrink-0 mt-0.5 rounded-xl object-cover" />
          <div>
            <p class="text-xs font-semibold text-cyan-400 mb-1">Event Pipeline</p>
            <p class="text-xs text-slate-300 leading-relaxed">
              EventBridge rules routing service events into processing pipelines. Demonstrates
              event-driven ops patterns — automated response and decoupled handling without polling.
            </p>
          </div>
        </div>

      </div>

    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue'
defineProps({ visible: Boolean })
defineEmits(['close'])
</script>
