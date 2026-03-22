<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Microsoft Certified: Azure Administrator Associate"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates the ability to implement, manage, and monitor Azure environments including identity, networking, compute, and storage.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>Entra ID user and group management, RBAC, and subscription governance</li>
        <li>Virtual network design, NSGs, peering, DNS, and load balancing</li>
        <li>VM deployment, scale sets, App Service, and container instances</li>
        <li>Storage accounts, backup policies, Azure Monitor, and cost management</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">This certification covers day-to-day Azure operations end to end, providing the foundation for managing production workloads with confidence.</p>
      <div>
        <a
          href="https://learn.microsoft.com/api/credentials/share/en-us/SimonParker-8212/8AEDB76D7A75F066?sharingId=F0664CD37994DC5D"
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
