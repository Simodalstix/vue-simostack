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
  AWS Landing Zone built with <span class="text-ob-teal-bright">CDK</span> implementing
  <span class="text-ob-teal-bright">zero trust</span> principles — no implicit cross-account
  trust, identity-based access boundaries, and <span class="text-ob-teal-bright">SCPs</span>
  enforcing governance at the org level. Hub-and-spoke networking via
  <span class="text-ob-teal-bright">Transit Gateway</span>, centralised security baseline with
  <span class="text-ob-teal-bright">GuardDuty</span> and
  <span class="text-ob-teal-bright">Security Hub</span>, and
  <span class="text-ob-teal-bright">Config</span> compliance.
</p>
      <a
        href="https://github.com/simodalstix/AWS-enterprise-landingzone"
        target="_blank"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
