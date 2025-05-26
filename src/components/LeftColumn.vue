<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-4">
    <h1 class="text-2xl font-bold border-b-2 border-indigo-500 pb-1">From Pharmacy to Cloud</h1>
    <div class="flex flex-col h-full">
      <!-- Profile Section -->
      <div class="text-center">
        <p class="font-semibold text-indigo-300 mb-2 text-sm">~/scientist/pharmacist/engineer</p>

        <p class="text-base text-gray-300">
          I’ve made the leap from healthcare to cloud, backed by a decade of solving high-pressure
          problems and helping people navigate complexity. Whether supporting pharmacists or
          deploying infrastructure, I bring clarity, empathy, and curiosity to everything I do.
          After years of guiding patients through regulations and medications, I saw my strengths in
          communication and troubleshooting fit naturally in tech. I’d hit a ceiling in pharmacy —
          now I’m all-in on cloud, DevOps, and automation.
        </p>
        <div class="border-t border-indigo-500 mt-4"></div>

        <h2 class="text-md font-semibold text-indigo-300 m-2 pt-2">Strengths I Bring With Me</h2>
        <ul class="list-disc list-inside space-y-1">
          <li>Clear communication under pressure</li>
          <li>Technical troubleshooting for non-technical users</li>
          <li>Building trust with diverse teams and customers</li>
          <li>Managing regulated workflows with precision</li>
        </ul>

        <div>
          <div class="border-t border-indigo-500 mt-4"></div>
          <div class="mt-4 bg-slate-700 rounded-md">
            <h3
              class="text-sm font-semibold text-ellipsis white uppercase tracking-wide mb-2 text-center"
            >
              Currently Learning &amp; Building With
            </h3>
            <div class="flex justify-center items-center gap-2">
              <img
                src="/images/left-column/terraform-icon.svg"
                alt="Terraform"
                class="h-12 w-auto transition-transform duration-100 hover:scale-110"
              />
              <img
                src="/images/left-column/azure-icon.svg"
                alt="Azure"
                class="h-12 w-auto transition-transform duration-100 hover:scale-110"
              />
              <img
                src="/images/left-column/aws-icon.svg"
                alt="AWS"
                class="h-12 w-auto transition-transform duration-100 hover:scale-110"
              />
              <img
                src="/images/left-column/vue-icon.svg"
                alt="Vue"
                class="h-12 w-auto transition-transform duration-100 hover:scale-110"
              />
              <LearningModal
                :visible="showLearn"
                @close="showLearn = false"
                width="max-w-[1100px]"
                height="max-h-[92vh]"
                title="Learning Focus"
              />
              <button
                @click="showLearn = true"
                class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Learning Focus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LearningModal from './modals/LearningModal.vue'
const showLearn = ref(false)
</script>
