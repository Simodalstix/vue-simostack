<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-4">
    <h1 class="text-2xl font-bold text-center border-b-2 border-indigo-500 pb-1">
      Pharmacist to Engineer
    </h1>
    <div class="flex flex-col h-full">
      <p class="text-lg font-semibold text-white mb-2">
        ~/scientist/pharmacist/engineer |
        <a
          href="https://github.com/Simodalstix"
          class="shadow-sm text-indigo-500 hover:bg-blue-700 transition duration-200"
          target="_blank"
        >
          GitHub
        </a>
      </p>

      <p class="text-base">
        I’m an Australian citizen pivoting from healthcare into infrastructure, DevOps, and cloud
        engineering — aiming to support government or defence environments where reliability and
        trust matter. I bring calm under pressure, instinctive triage skills, and years of
        experience translating complex systems for people from all walks of life.
      </p>
      <span class="text-indigo-500">Key Strength: Relentless Focus, Relentless Learning</span>
      <p>
        I move fast because I care — not just about understanding systems, but mastering them. I
        bring sharp attention to detail and a deep drive to learn, build, and improve. Now I channel
        that into platforms, automation, and infrastructure using tools like AWS, Azure, Terraform,
        Docker, VMware, and Ansible — and I’m just getting started.
      </p>

      <BaseCard
        @click="showTargetCertsModal = true"
        class="bg-indigo-800 background border-l-4 text-center border-indigo-500 border mt-4 p-4 rounded-md border-radius shadow cursor-pointer hover:bg-blue-800 duration-200"
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
