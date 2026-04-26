<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS SSM Fleet – Puppet Config Management Without SSH"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/ssm-puppet.png"
        alt="AWS SSM Fleet Puppet Config Management Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Five-node fleet managed via <span class="text-cyan-300">AWS Systems Manager</span> — no SSH, no key pairs. <span class="text-cyan-300">CDK (Python)</span> provisions one <span class="text-cyan-300">Puppet</span> master and four agents on <span class="text-cyan-300">EC2</span>. Puppet code syncs from <span class="text-cyan-300">S3</span>, roles are classified via Facter facts, and <span class="text-cyan-300">Node.js</span> apps are deployed using the roles/profiles/Hiera pattern with 30-minute convergence intervals.
      </p>
      <a
        href="https://github.com/Simodalstix/aws-ssm-fleet"
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
