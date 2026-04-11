<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS SSM Fleet – Puppet Config Management Without SSH"
  >
    <!-- Description -->
    <div class="px-4 pt-4 pb-4">
      <p class="text-base text-gray-300 leading-relaxed">
        Five-node fleet managed entirely through <span class="text-cyan-300">AWS Systems Manager</span> — no SSH, no key pairs. <span class="text-cyan-300">CDK (Python)</span> provisions one <span class="text-cyan-300">Puppet</span> master and four agents (web + app servers) on <span class="text-cyan-300">EC2</span>. Puppet code syncs from <span class="text-cyan-300">S3</span>, roles are classified via custom Facter facts, and <span class="text-cyan-300">Node.js</span> apps are deployed using the roles/profiles/Hiera pattern with 30-minute convergence intervals.
      </p>
    </div>

    <!-- Key Details -->
    <div class="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400 mb-1">Fleet Size</p>
        <p class="text-sm font-semibold text-white">5 Nodes</p>
      </div>
      <div class="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400 mb-1">Instance Type</p>
        <p class="text-sm font-semibold text-white">t3.small</p>
      </div>
      <div class="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400 mb-1">OS</p>
        <p class="text-sm font-semibold text-white">Amazon Linux 2023</p>
      </div>
      <div class="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400 mb-1">Convergence</p>
        <p class="text-sm font-semibold text-white">30 min</p>
      </div>
    </div>

    <!-- Highlights + GitHub -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <h4 class="text-sm font-semibold text-slate-300 mb-2">Highlights</h4>
        <ul class="space-y-1.5 text-sm text-slate-300">
          <li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▸</span> Keyless access — all node communication via <span class="text-cyan-300 ml-1">SSM Session Manager</span>, no inbound ports opened</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▸</span> Role-based classification using custom <span class="text-cyan-300 ml-1">Facter facts</span> set at launch time</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▸</span> Puppet code distributed from <span class="text-cyan-300 ml-1">S3</span> to master, agents pull on 30-minute intervals</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▸</span> <span class="text-cyan-300">Make targets</span> for scope-based triggering — deploy changes to specific roles only</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▸</span> <span class="text-cyan-300">IAM</span>-based auth throughout; complete teardown via CDK destroy</li>
        </ul>
      </div>
      <div class="flex md:flex-col md:justify-end">
        <a
          href="https://github.com/Simodalstix/aws-ssm-fleet"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
        >
          View on GitHub
        </a>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
