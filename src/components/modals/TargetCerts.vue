<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Certifications in Progress"
    width="max-w-6xl"
    :hideTitleBorder="true"
  >
    <div class="grid grid-cols-1 md:grid-cols-5">
      <!-- Header -->
      <div class="md:col-span-1">
        <div class="rounded-t-lg border-l-2 border-r-2 border-t-2 border-orange-300 bg-orange-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">In Progress</h2>
        </div>
      </div>
      <div class="md:col-span-3">
        <h2 class="text-center font-bold text-xl">Target Certifications</h2>
      </div>
      <div class="md:col-span-1">
        <div class="rounded-t-lg border-l-2 border-r-2 border-t-2 border-cyan-300 bg-cyan-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">Next Up</h2>
        </div>
      </div>

      <!-- ROW 1: RHCSA (progress) / RHCE (next) -->
      <div
        class="md:col-span-1 flex items-center justify-center border-l-2 border-r-2 border-orange-300 py-4"
      >
        <img src="/images/skills-in-progress/rhcsa.png" alt="RHCSA Badge" class="w-24 md:w-36" />
      </div>

      <div class="md:col-span-3 space-y-2 p-4 border-t-2 border-slate-500">
        <h3 class="font-bold text-xl text-white">Red Hat Certified System Administrator (RHCSA)</h3>
        <p class="text-sm"><b>Status:</b> Preparing to sit.</p>
        <p class="text-sm">
          <b>Why:</b> Solid Linux administration skills are the backbone of cloud and DevOps work.
        </p>
        <p class="text-sm">
          <b>Focus:</b> Users/groups, storage, services, networking, and automation basics.
        </p>
      </div>

      <div
        class="md:col-span-1 flex items-center justify-center border-l-2 border-r-2 border-cyan-300 py-4"
      >
        <img src="/images/certifications/rhce.png" alt="RHCE Badge" class="w-24 md:w-36" />
      </div>

      <!-- ROW 2: AWS DevOps Pro (progress) / Azure DevOps (next) -->
      <div
        class="md:col-span-1 flex items-center justify-center border-l-2 border-r-2 border-orange-300 py-4 border-t-slate-500"
      >
        <img
          src="/images/skills-in-progress/aws-devops.png"
          alt="AWS DevOps Pro Badge"
          class="w-24 md:w-36"
        />
      </div>

      <div class="md:col-span-3 space-y-2 p-4 border-slate-500 border-t-2 border-b-2">
        <h3 class="font-bold text-xl text-white">AWS DevOps Engineer – Professional</h3>
        <p class="text-sm"><b>Status:</b> In study; practice exams underway.</p>
        <p class="text-sm">
          <b>Why:</b> Validates pipelines, IaC, automation, monitoring, and ops at scale.
        </p>
        <p class="text-sm">
          <b>Focus:</b> CI/CD on AWS, deployment strategies (blue/green & canary), observability,
          incident response.
        </p>
      </div>

      <div
        class="md:col-span-1 flex items-center justify-center border-l-2 border-r-2 border-cyan-300 py-4"
      >
        <img
          src="/images/certifications/azure-devops.png"
          alt="Azure DevOps Badge"
          class="w-24 md:w-32"
        />
      </div>

      <!-- Footer -->
      <div class="md:col-span-1">
        <div class="rounded-b-lg border-l-2 border-r-2 border-b-2 border-orange-300 bg-orange-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">&nbsp;</h2>
        </div>
      </div>
      <div class="md:col-span-3">
        <h2 class="mt-4 text-center text-bold text-md italic">
          “We are what we repeatedly do. Excellence, then, is not an act but a habit.”
        </h2>
      </div>
      <div class="md:col-span-1">
        <div class="rounded-b-lg border-l-2 border-r-2 border-b-2 border-cyan-300 bg-cyan-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">&nbsp;</h2>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
