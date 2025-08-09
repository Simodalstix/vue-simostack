<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Certifications in Progress"
    width="max-w-6xl"
    :hideTitleBorder="true"
  >
    <div class="grid grid-cols-5">
      <!-- ===================== HEADER ROW ===================== -->
      <div class="col-span-1">
        <!-- Left header (orange) -->
        <div class="rounded-t-lg border-l-2 border-r-2 border-t-2 border-orange-300 bg-orange-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">In Progress</h2>
        </div>
      </div>
      <div class="col-span-3">
        <h2 class="text-center font-bold text-xl">Certifications In Progress</h2>
      </div>
      <div class="col-span-1">
        <!-- Right header (cyan) — owns separator via LEFT border -->
        <div class="rounded-t-lg border-l-2 border-r-2 border-t-2 border-cyan-300 bg-cyan-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">Future</h2>
        </div>
      </div>

      <!-- ===================== ROW 1 ===================== -->
      <!-- Left badge (orange side borders) -->
      <div
        class="col-span-1 flex items-center justify-center border-l-2 border-r-2 border-orange-300 py-4"
      >
        <img src="/images/certifications/cdsa.png" alt="HTB CDSA Badge" class="w-36" />
      </div>

      <!-- Middle content — no cyan border here -->
      <div class="col-span-3 space-y-2 p-4 border-t-2 border-slate-500">
        <h3 class="font-bold text-xl text-white">HTB - Certified Defensive Security Analyst</h3>
        <p class="text-sm"><b>Status:</b> In Progress - 19%</p>
        <p class="text-sm">
          <b>Why:</b> To build advanced, hands-on blue team skills in log analysis, threat
          detection, and incident handling. This certification bridges the gap between foundational
          knowledge from Security+ and real-world SOC analyst workflows.
        </p>
        <p class="text-sm">
          <b>Up next:</b> GIAC Security Essentials (GSEC) to formalize and validate my defensive
          security skills with a globally recognized certification.
        </p>
      </div>

      <!-- Right badge — cyan separator is the LEFT border; also keep outer RIGHT border -->
      <div
        class="col-span-1 flex items-center justify-center border-l-2 border-r-2 border-cyan-300 py-4"
      >
        <img src="/images/certifications/gsec.png" alt="GSEC Badge" class="w-36" />
      </div>

      <!-- ===================== ROW 2 ===================== -->
      <div
        class="col-span-1 flex items-center justify-center border-l-2 border-r-2 border-orange-300 py-4 border-t-slate-500"
      >
        <img src="/images/skills-in-progress/rhcsa.png" alt="RHCSA Badge" class="w-36" />
      </div>

      <div class="col-span-3 space-y-2 p-4 border-slate-500 border-t-2">
        <h3 class="font-bold text-xl text-white">Red Hat Certified System Administrator (RHCSA)</h3>
        <p class="text-sm"><b>Status:</b> Ready to sit - within the next week</p>
        <p class="text-sm">
          <b>Why:</b> To gain the necessary administration skills to feel at home piloting Linux
          environments. It's the foundation for roles in cloud, infrastructure, and DevOps.
        </p>
        <p class="text-sm">
          <b>Up next:</b> This certification lays the groundwork for the Red Hat Certified Engineer
          (RHCE). I want to be an Ansible master.
        </p>
      </div>

      <div
        class="col-span-1 flex items-center justify-center border-l-2 border-r-2 border-cyan-300 py-4"
      >
        <img src="/images/certifications/rhce.png" alt="RHCE Badge" class="w-36" />
      </div>

      <!-- ===================== ROW 3 ===================== -->
      <div
        class="col-span-1 flex items-center justify-center border-l-2 border-r-2 border-orange-300 py-4"
      >
        <img
          src="/images/skills-in-progress/aws-devops.png"
          alt="AWS DevOps Pro Badge"
          class="w-36"
        />
      </div>

      <div class="col-span-3 space-y-2 p-4 border-slate-500 border-t-2 border-b-2">
        <h3 class="font-bold text-xl text-white">AWS DevOps Engineer – Professional</h3>
        <p class="text-sm">
          <b>Status:</b> Actually close, I've done practice exams. But content needs revision.
        </p>
        <p class="text-sm">
          <b>Why:</b> This cert covers the full lifecycle: pipelines, IaC, automation, and
          monitoring. It signals my readiness to step into a serious cloud engineering role.
        </p>
        <p class="text-sm">
          <b>Up next:</b> Likely pursuing Azure DevOps to deepen my understanding of CI/CD tooling
          and Azure-native workflows.
        </p>
      </div>

      <div
        class="col-span-1 flex items-center justify-center border-l-2 border-r-2 border-cyan-300 py-4"
      >
        <img src="/images/certifications/azure-devops.png" alt="Azure DevOps Badge" class="w-32" />
      </div>

      <!-- ===================== FOOTER ROW ===================== -->
      <div class="col-span-1">
        <!-- Left footer (orange) -->
        <div class="rounded-b-lg border-l-2 border-r-2 border-b-2 border-orange-300 bg-orange-300">
          <h2 class="text-xl font-bold py-2 text-center text-gray-900">&nbsp;</h2>
        </div>
      </div>
      <div class="col-span-3">
        <h2 class="mt-4 text-center text-bold text-md italic">
          “We are what we repeatedly do. Excellence, then, is not an act but a habit.”
        </h2>
      </div>
      <div class="col-span-1">
        <!-- Right footer (cyan) — mirror header with LEFT cyan border -->
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
