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
        <h2 class="text-xl font-bold text-ob-bright">Microsoft Certified: Azure Administrator Associate</h2>
        <div class="h-[3px] w-16 bg-[#0078D4] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Validates the ability to implement, manage, and monitor Azure environments including identity, networking, compute, and storage.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Entra ID user and group management, RBAC, and subscription governance</li>
        <li>Virtual network design, NSGs, peering, DNS, and load balancing</li>
        <li>VM deployment, scale sets, App Service, and container instances</li>
        <li>Storage accounts, backup policies, Azure Monitor, and cost management</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">This certification covers day-to-day Azure operations end to end, providing the foundation for managing production workloads with confidence.</p>
      <div>
        <a
          href="https://learn.microsoft.com/api/credentials/share/en-us/SimonParker-8212/8AEDB76D7A75F066?sharingId=F0664CD37994DC5D"
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
