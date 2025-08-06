<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Certifications in Progress"
    width="max-w-6xl"
  >
    <div class="grid grid-cols-1 gap-4">
      <div class="grid grid-cols-4 gap-6 p-4 rounded-lg">
        <div class="col-span-1 flex items-center justify-center">
          <img src="/images/certifications/securityplus.png" alt="Security+ Badge" class="w-36" />
        </div>

        <div class="col-span-2 space-y-3">
          <h3 class="font-bold text-xl text-orange-300">CompTIA Security+</h3>
          <p class="text-sm"><b>Status:</b> Ready to sit - need an empty house</p>
          <p class="text-sm">
            <b>Why:</b> To gain a necessary HR/recruiter tick box and understand the high-level
            security landscape. It's critical for specializing and diving deeper into the field.
          </p>
          <p class="text-sm">
            <b>Up next:</b> I’ll move on to more hands-on security certifications, positioning me
            for real-world SOC Analyst roles.
          </p>
        </div>

        <div class="col-span-1 flex items-center justify-center">
          <img src="/images/certifications/cdsa.png" alt="HTB CDSA Badge" class="w-36" />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-6 p-4 rounded-lg">
        <div class="col-span-1 flex items-center justify-center">
          <img src="/images/skills-in-progress/rhcsa.png" alt="RHCSA Badge" class="w-36" />
        </div>

        <div class="col-span-2 space-y-3">
          <h3 class="font-bold text-xl text-orange-300">
            Red Hat Certified System Administrator (RHCSA)
          </h3>
          <p class="text-sm"><b>Status:</b> Will sit in the next 1-2 weeks</p>
          <p class="text-sm">
            <b>Why:</b> To gain the necessary administration skills to feel at home piloting Linux
            environments. It's the foundation for roles in cloud, infrastructure, and DevOps.
          </p>
          <p class="text-sm">
            <b>Up next:</b> This certification lays the groundwork for the Red Hat Certified
            Engineer (RHCE).
          </p>
        </div>

        <div class="col-span-1 flex items-center justify-center">
          <img src="/images/certifications/rhce.png" alt="RHCE Badge" class="w-36" />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-6 p-4 rounded-lg">
        <div class="col-span-1 flex items-center justify-center">
          <img
            src="/images/skills-in-progress/aws-devops.png"
            alt="AWS DevOps Pro Badge"
            class="w-36"
          />
        </div>

        <div class="col-span-2 space-y-3">
          <h3 class="font-bold text-xl text-orange-300">AWS DevOps Engineer – Professional</h3>
          <p class="text-sm"><b>Status:</b> Content needs revision.</p>
          <p class="text-sm">
            <b>Why:</b> This cert covers the full lifecycle: pipelines, IaC, automation, and
            monitoring. It signals my readiness to step into a serious cloud engineering role.
          </p>
          <p class="text-sm">
            <b>Up next:</b> Likely pursuing Azure DevOps to deepen my understanding of CI/CD tooling
            and Azure-native workflows.
          </p>
        </div>

        <div class="col-span-1 flex items-center justify-center">
          <img src="/images/certifications/azure-devops.png" alt="AWS SA Pro Badge" class="w-32" />
        </div>
      </div>
    </div>

    <footer class="text-sm text-center border-t-2 pt-4 border-slate-500 text-gray-400 italic my-1">
      “We are what we repeatedly do. Excellence, then, is not an act but a habit.”
    </footer>
  </BaseModal>
</template>
<script setup>
defineProps({
  visible: Boolean,
})
defineEmits(['close'])

import BaseModal from './BaseModal.vue'
</script>
