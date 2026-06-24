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
        <h2 class="text-xl font-bold text-ob-bright">CompTIA A+ ce Certification</h2>
        <div class="h-[3px] w-16 bg-[#D73502] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-ob-surface border border-ob-sand/14 p-5 rounded-[4px] mb-2">
      <p class="text-base text-ob-text mb-3">Validates core IT support competencies across hardware, operating systems, networking, security, and troubleshooting in real-world environments.</p>
      <ul class="text-base text-ob-muted2 space-y-1.5 mb-4 list-disc list-inside">
        <li>Hardware installation, configuration, and maintenance of desktops, laptops, and mobiles</li>
        <li>Operating system support across Windows, macOS, Linux, and mobile platforms</li>
        <li>Network connectivity, protocols, and basic infrastructure troubleshooting</li>
        <li>Security fundamentals including malware removal, access controls, and secure data practices</li>
        <li>Operational procedures, documentation, and support workflows in IT environments</li>
      </ul>
      <p class="text-sm text-ob-faint italic mb-4">A+ is the industry-standard entry point for IT support — covering the breadth of skills needed to diagnose, repair, and maintain systems across any organisation.</p>
      <div>
        <a
          href="https://www.credly.com/badges/7a7d63f5-07dc-47f5-9d86-1ba95699d84d"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#D73502] hover:bg-[#B52D02] text-ob-bright font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
