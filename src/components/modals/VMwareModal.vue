<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="VMware Lab">
    <!-- Top row: screenshot + short copy -->
    <div class="flex flex-col md:flex-row text-slate-200">
      <!-- Left: VMware console screenshot -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/vmware-workstation.png"
          alt="VMware Workstation – lab VMs"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: short description -->
      <aside class="w-full md:w-1/3 bg-slate-800/60 p-4 space-y-4">
        <div>
          <h3 class="font-semibold text-slate-100">What this shows</h3>
          <p class="text-base text-slate-300">
            VMware Workstation is where I practice RHEL/RHCSA and prototype the lab: pfSense, Active
            Directory, file services, and monitoring. It's fast to iterate, easy to break and
            rebuild, and keeps notes/scripts close at hand. I'm now moving the long-term build to
            the Beelink host, keeping VMware for experiments.
          </p>
        </div>

        <!-- Optional tiny bullets for quick signal -->
        <ul class="text-base text-slate-300 space-y-1 list-disc list-inside">
          <li>RHEL + Windows Server VMs</li>
          <li>pfSense, AD DS, Samba, exporters</li>
          <li>Snapshot/restore for rebuild practice</li>
        </ul>

        <!-- Optional links row -->
        <div class="flex flex-wrap gap-2 pt-2">
          <a
            v-if="links?.ansible"
            :href="links.ansible"
            target="_blank"
            class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-xs"
          >
            Ansible notes/scripts
          </a>
          <button
            v-if="onShowRoadmap"
            @click="onShowRoadmap()"
            class="px-3 py-1 rounded-md bg-purple-700 hover:bg-purple-600 text-xs"
          >
            Beelink roadmap
          </button>
        </div>
      </aside>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({
  visible: Boolean,
  links: { type: Object, default: () => ({ ansible: '' }) },
  onShowRoadmap: { type: Function, default: null },
})
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
