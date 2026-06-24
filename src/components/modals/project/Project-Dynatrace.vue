<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Azure Monitoring & Patch Management Lab"
    borderClass="border border-ob-teal/40 shadow-xl shadow-black/30"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/dynatrace-console.png"
        alt="Azure Monitoring Lab Architecture"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Monitoring and patch management lab with <span class="text-ob-teal-bright">Azure Monitor</span>, <span class="text-ob-teal-bright">Dynatrace OneAgent</span>, and automated patching. Linux/Windows VMs with load balancer, sample applications, health probes, and maintenance windows. Dual monitoring stack for infrastructure and <span class="text-ob-teal-bright">APM</span> coverage.
      </p>
      <a
        href="https://github.com/Simodalstix/az-dynatrace"
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
