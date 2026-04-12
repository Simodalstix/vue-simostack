<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-[#1B1B1F]"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-white">Microsoft Certified: Identity and Access Administrator Associate</h2>
        <div class="h-0.5 bg-[#0078D4] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-[#F3F3F3] p-5 rounded mb-2">
      <p class="text-base text-gray-800 mb-3">Validates expertise in designing and operating identity solutions using Microsoft Entra ID across cloud and hybrid environments.</p>
      <ul class="text-base text-gray-600 space-y-1.5 mb-4 list-disc list-inside">
        <li>Entra ID tenant configuration, authentication methods, and conditional access policies</li>
        <li>SSO, MFA, passwordless authentication, and identity protection risk policies</li>
        <li>Application registrations, service principals, and API permission scoping</li>
        <li>Identity governance with access reviews, entitlement management, and privileged identity management</li>
      </ul>
      <p class="text-sm text-gray-400 italic mb-4">Identity is the control plane of modern infrastructure. This certification proves the ability to design and enforce zero-trust access at the platform level.</p>
      <div>
        <a
          href="https://learn.microsoft.com/en-us/users/simonparker-8212/credentials/certification/identity-and-access-administrator?tab=credentials-tab"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#0078D4] hover:bg-[#106EBE] text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Microsoft Learn
        </a>
      </div>
    </div>
  </BaseModal>
</template>
