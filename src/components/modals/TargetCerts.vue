<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Target Certifications"
    width="max-w-3xl"
  >
    <div class="space-y-8 mt-6 mx-4">
      <!-- RHCSA -->
      <div class="flex items-center space-x-6 pb-6">
        <img src="/images/skills-in-progress/rhcsa.png" alt="RHCSA Badge" class="w-24 md:w-28" />
        <div class="space-y-2">
          <h3 class="font-bold text-xl text-white">
            Red Hat Certified System Administrator (RHCSA)
          </h3>
          <p class="text-sm"><b>Status:</b>Ready: Just need a window to book it</p>
          <p class="text-sm">
            <b>Why:</b> Linux administration is the backbone of cloud and DevOps.
          </p>
          <p class="text-sm">
            <b>Focus:</b> Users/groups, storage, services, networking, and automation basics.
          </p>
        </div>
      </div>

      <!-- AWS DevOps Pro -->
      <!-- <div class="flex items-center space-x-6 border-b border-slate-600 pb-6">
        <img
          src="/images/skills-in-progress/aws-devops.png"
          alt="AWS DevOps Pro Badge"
          class="w-24 md:w-28"
        />
        <div class="space-y-2">
          <h3 class="font-bold text-xl text-white">AWS DevOps Engineer – Professional</h3>
          <p class="text-sm"><b>Status:</b> In study; practice exams underway</p>
          <p class="text-sm">
            <b>Why:</b> Validates pipelines, IaC, automation, monitoring, and ops at scale.
          </p>
          <p class="text-sm">
            <b>Focus:</b> CI/CD on AWS, deployment strategies (blue/green & canary), observability,
            incident response.
          </p>
        </div>
      </div> -->
    </div>

    <!-- Footer quote -->
    <div class="mt-6 border-t-2 border-slate-500">
      <div class="mt-3 mb-1 text-center text-md italic text-slate-300">
        We are what we repeatedly do. Excellence, then, is not an act but a habit.
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
