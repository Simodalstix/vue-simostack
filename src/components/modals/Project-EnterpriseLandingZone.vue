<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Multi-Account Landing Zone – Zero Trust Architecture"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/enterprise-landingzone-diagram.svg"
        alt="Enterprise Landing Zone Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
     <p>
  AWS Landing Zone built with <span class="text-cyan-300">CDK</span> implementing
  <span class="text-cyan-300">zero trust</span> principles — no implicit cross-account
  trust, identity-based access boundaries, and <span class="text-cyan-300">SCPs</span>
  enforcing governance at the org level. Hub-and-spoke networking via
  <span class="text-cyan-300">Transit Gateway</span>, centralised security baseline with
  <span class="text-cyan-300">GuardDuty</span> and
  <span class="text-cyan-300">Security Hub</span>, and
  <span class="text-cyan-300">Config</span> compliance.
</p>
      <a
        href="https://github.com/simodalstix/AWS-enterprise-landingzone"
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
