<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-ob-bg"
    borderClass="border border-ob-sand/16 shadow-2xl shadow-black/50"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-ob-bright">Microsoft Certified: Identity and Access Administrator Associate</h2>
        <div class="h-[3px] w-16 bg-[#0078D4] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Validates expertise in designing and operating identity solutions using Microsoft Entra ID across cloud and hybrid environments.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Entra ID tenant configuration, authentication methods, and conditional access policies</li>
        <li>SSO, MFA, passwordless authentication, and identity protection risk policies</li>
        <li>Application registrations, service principals, and API permission scoping</li>
        <li>Identity governance with access reviews, entitlement management, and privileged identity management</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">Identity is the control plane of modern infrastructure. This certification proves the ability to design and enforce zero-trust access at the platform level.</p>
      <div>
        <a
          href="https://learn.microsoft.com/en-us/users/simonparker-8212/credentials/certification/identity-and-access-administrator?tab=credentials-tab"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#0078D4] hover:bg-[#106EBE] text-ob-bright font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Microsoft Learn
        </a>
      </div>
    </div>
  </BaseModal>
</template>
