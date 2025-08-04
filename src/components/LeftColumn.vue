<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-4">
    <h1 class="text-2xl font-bold text-center border-b-2 border-slate-500 pb-1">
      Pharmacist to Engineer
    </h1>
    <div class="flex flex-col h-full">
      <p class="text-md font-semibold text-white mb-2">
        ~/scientist/pharmacist/engineer |
        <span class="text-purple-600">Melbourne</span>
      </p>

      <p class="text-base">
        I’m an Australian citizen pivoting from healthcare into Linux, cloud, and security
        engineering—focused on high-trust environments like government, defence and finance, where
        reliability and accountability matter. I bring calm under pressure, strong triage instincts,
        and years of experience translating complex systems for people from all walks of life.
      </p>
      <span class="text-purple-600">Standout Quality: Relentless Focus, Relentless Learning</span>
      <p>
        I’m building cloud and on-prem environments, automating what matters, and getting hands-on
        with real security tooling. I’m targeting certifications that bring credibility, but the
        trajectory I’m on is what really counts. I’ll be a killer addition to any engineering team.
      </p>

      <h1 class="text-2xl mt-3 font-bold text-center pb-1">Target Certifications</h1>
      <BaseCard
        @click="showTargetCertsModal = true"
        class="border-2 text-center border-slate-500 mt-2 p-3 rounded-md border-radius shadow cursor-pointer hover:bg-indigo-800 transition"
      >
        <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <img
            src="/images/skills-in-progress/aws-devops.png"
            alt="AWS DevOps Badge"
            class="w-24 sm:w-36"
          />

          <img
            src="/images/skills-in-progress/rhcsa.png"
            alt="RHCSA Badge"
            class="w-24 sm:w-36"
          /><img
            src="/images/certifications/securityplus.png"
            alt="Security+ Badge"
            class="w-24 sm:w-36"
          /><img src="/images/certifications/cdsa.png" alt="Security+ Badge" class="w-24 sm:w-36" />
        </div>
      </BaseCard>
    </div>
  </div>

  <TargetCertsModal :visible="showTargetCertsModal" @close="showTargetCertsModal = false" />
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from './ui/BaseCard.vue' // Adjust path based on your file structure
import TargetCertsModal from './modals/TargetCerts.vue' // Adjust path based on your file structure

// State for your Target Certs Modal
const showTargetCertsModal = ref(false)
</script>
