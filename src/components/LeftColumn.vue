<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-4">
    <h1 class="text-2xl font-bold text-center border-b-2 border-indigo-500 pb-1">
      Pharmacist to Engineer
    </h1>
    <div class="flex flex-col h-full">
      <p class="text-lg font-semibold text-white mb-2">
        ~/scientist/pharmacist/engineer |
        <span class="text-indigo-500">Melbourne</span>
      </p>

      <p class="text-base">
        I’m an Australian citizen pivoting from healthcare into infrastructure, DevOps, and cloud
        engineering — aiming to support government or defence environments where reliability and
        trust matter. I bring calm under pressure, instinctive triage skills, and years of
        experience translating complex systems for people from all walks of life.
      </p>
      <span class="text-indigo-500">Standout Quality: Relentless Focus, Relentless Learning</span>
      <p>
        I’m driven to learn, build, and improve — not just to understand systems, but to master
        them. Certifications have validated that commitment and signaled my readiness to support
        high-trust environments.
      </p>
      <h1 class="text-2xl mt-4 font-bold text-center pb-1">Target Certifications</h1>
      <BaseCard
        @click="showTargetCertsModal = true"
        class="bg-indigo-800 background border-l-4 text-center border-indigo-500 border mt-2 p-4 rounded-md border-radius shadow cursor-pointer hover:bg-blue-800 duration-200"
      >
        <div class="flex justify-center items-center gap-10">
          <img
            src="/images/skills-in-progress/aws-devops.png"
            alt="AWS DevOps Badge"
            class="w-36"
          />
          <img src="/images/skills-in-progress/rhcsa.png" alt="RHCSA Badge" class="w-36" />
        </div>
        <div></div>
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
