<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Microsoft Certified: Identity and Access Administrator Associate"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates expertise in designing and operating identity solutions using Microsoft Entra ID across cloud and hybrid environments.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>Entra ID tenant configuration, authentication methods, and conditional access policies</li>
        <li>SSO, MFA, passwordless authentication, and identity protection risk policies</li>
        <li>Application registrations, service principals, and API permission scoping</li>
        <li>Identity governance with access reviews, entitlement management, and privileged identity management</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">Identity is the control plane of modern infrastructure. This certification proves the ability to design and enforce zero-trust access at the platform level.</p>
      <div>
        <a
          href="https://learn.microsoft.com/en-us/users/simonparker-8212/credentials/certification/identity-and-access-administrator?tab=credentials-tab"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Microsoft Learn
        </a>
      </div>
    </div>
  </BaseModal>
</template>
