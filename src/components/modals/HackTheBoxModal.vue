<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Hack The Box Academy"
    width="max-w-4xl"
  >
    <div class="space-y-6 mt-6 mx-4">
      <!-- HTB Certified Defensive Security Analyst -->
      <div class="flex items-center space-x-6 border-b border-slate-600 pb-6">
        <img src="/images/certifications/cdsa.png" alt="HTB CDSA Badge" class="w-28" />
        <div class="space-y-3">
          <h3 class="font-bold text-xl text-white">
            HTB Certified Defensive Security Analyst (CDSA)
          </h3>
          <p class="text-sm"><b>Status:</b> In Progress</p>
          <p class="text-sm">
            <b>Focus:</b> SOC operations, incident response, threat hunting, and defensive security
            techniques.
          </p>
          <p class="text-sm text-gray-300 leading-relaxed">
            Hands-on certification assessing security analysis, incident handling, and SOC
            operations skills. Develops expertise in spotting security incidents, correlating
            disparate evidence, determining incident impact, and creating actionable reports for
            diverse audiences.
          </p>
        </div>
      </div>

      <!-- Module Completions -->
      <div>
        <h4 class="font-bold text-lg text-white mb-4">Completed Academy Modules</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Introduction to Bash Scripting -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/83b69254-7b0e-11f0-9254-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <span
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-green-600/20 text-green-400 border border-green-600/30 rounded-md"
              >General</span
            >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100 mb-1 pr-20">
                Introduction to Bash Scripting
              </h5>
              <p class="text-sm text-gray-400">Do things the traditional way</p>
            </div>
            <svg
              class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>

          <svg
            class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>

          <!-- Module 3 -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/31722f5c-6a14-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <span
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-md"
              >Defensive</span
            >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100 mb-1 pr-20">
                Anticipate the next attack
              </h5>
              <p class="text-sm text-gray-400">
                Security Monitoring & SIEM Fundamentals module completed
              </p>
            </div>
            <svg
              class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>

          <!-- Module 4 -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/49dc8034-6a09-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <span
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-green-600/20 text-green-400 border border-green-600/30 rounded-md"
              >General</span
            >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100 mb-1 pr-20">
                Everything is connected
              </h5>
              <p class="text-sm text-gray-400">Introduction to Networking module completed</p>
            </div>
            <svg
              class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>

          <!-- Module 5 -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/3e6a9fca-6a83-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <span
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-green-600/20 text-green-400 border border-green-600/30 rounded-md"
              >General</span
            >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100 mb-1 pr-20">Panoptic</h5>
              <p class="text-sm text-gray-400">Incident Handling Process module completed</p>
            </div>
            <svg
              class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>

          <!-- Module 6 -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/316d31c4-6e80-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <span
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-md"
              >Defensive</span
            >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100 mb-1 pr-20">
                Log keeper
              </h5>
              <p class="text-sm text-gray-400">
                Windows Event Logs & Finding Evil module completed
              </p>
            </div>
            <svg
              class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>

          <!-- Module 7 -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/cd92a5c2-705f-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <span
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-green-600/20 text-green-400 border border-green-600/30 rounded-md"
              >General</span
            >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100">
                Our favorite seabird
              </h5>
              <p class="text-sm text-gray-400">Linux Fundamentals module completed</p>
            </div>
            <svg
              class="absolute bottom-2 right-2 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>

          <!-- Module 8 -->
          <a
            href="#"
            target="_blank"
            class="group flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600 hover:border-green-400 transition-all duration-200"
          >
            <div>
              <h5 class="font-medium text-white group-hover:text-green-100">
                More to update as I progress
              </h5>
              <p class="text-sm text-gray-400">Module description</p>
            </div>
            <svg
              class="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 border-t-2 border-slate-500">
      <div class="mt-3 mb-1 text-center text-md italic text-slate-300">
        Hack The Box Academy - Hands-on cybersecurity training
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
