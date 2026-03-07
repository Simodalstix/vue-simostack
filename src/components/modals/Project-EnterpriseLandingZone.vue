<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Multi-Account Landing Zone Architecture"
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
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        AWS Landing Zone using CDK with multi-account organizational structure. Hub-and-spoke networking via Transit Gateway, security baseline with GuardDuty and Security Hub, automated governance with Config rules, and standardized account creation.
      </p>
      <a
        href="https://github.com/simodalstix/AWS-enterprise-landingzone"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
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
