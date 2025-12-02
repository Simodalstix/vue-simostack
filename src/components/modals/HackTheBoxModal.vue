<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Hack The Box Academy"
    width="max-w-4xl"
  >
    <div class="space-y-6 mt-6 mx-4">
      <!-- Cyber Security Overview -->
      <div class="flex items-start space-x-4 border-b border-slate-600 pb-4">
  <img src="/images/certifications/cdsa.png" alt="Hack The Box Academy" class="w-24 mt-1" />

  <div class="space-y-2">
    <h3 class="font-bold text-lg text-white">
      Hack The Box Academy – Cyber Security
    </h3>

      <p class="text-sm text-gray-300 leading-relaxed">
      Building practical defensive security skills across log analysis, event correlation, 
      attacker behaviour, and the foundations of incident response. The training develops the 
      ability to recognise malicious activity, investigate across multiple data sources, and 
      produce clear, evidence-backed findings—mirroring real SOC workflows without framing it 
      as a certification path.
    </p>
  </div>
</div>


      <!-- Completed Modules -->
      <div>
        <h4 class="font-bold text-lg text-white mb-4">Completed Academy Modules</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

          <!-- CARD COMPONENT TEMPLATE (all cards follow this structure) -->
          <!-- Bash Scripting -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/83b69254-7b0e-11f0-9254-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span
              class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-emerald-600/15
                     text-emerald-300 border border-emerald-500/30 rounded-md"
            >General</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Introduction to Bash Scripting
              </h5>
              <p class="text-xs text-gray-400">Do things the traditional way</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- SIEM Fundamentals -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/31722f5c-6a14-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-blue-600/20
                         text-blue-400 border border-blue-600/40 rounded-md"
            >Defensive</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Anticipate the next attack
              </h5>
              <p class="text-xs text-gray-400">
                Security Monitoring & SIEM Fundamentals module 
              </p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Networking -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/49dc8034-6a09-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-emerald-600/15
                         text-emerald-300 border border-emerald-500/30 rounded-md"
            >General</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Everything is connected
              </h5>
              <p class="text-xs text-gray-400">Introduction to Networking module completed</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Incident Handling -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/3e6a9fca-6a83-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-emerald-600/15
                         text-emerald-300 border border-emerald-500/30 rounded-md"
            >General</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Panoptic
              </h5>
              <p class="text-xs text-gray-400">Incident Handling Process module completed</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Windows Event Logs -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/316d31c4-6e80-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-blue-600/20
                         text-blue-400 border border-blue-600/40 rounded-md"
            >Defensive</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Log keeper
              </h5>
              <p class="text-xs text-gray-400">
                Windows Event Logs & Finding Evil module completed
              </p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Linux Fundamentals -->
          <a
            href="https://academy.hackthebox.com/achievement/badge/cd92a5c2-705f-11f0-bcfd-bea50ffe6cb4"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-emerald-600/15
                         text-emerald-300 border border-emerald-500/30 rounded-md"
            >General</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Our favorite seabird
              </h5>
              <p class="text-xs text-gray-400">Linux Fundamentals module completed</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Linux Priv Esc -->
          <a
            href=""
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-red-600/20
                         text-red-400 border border-red-600/40 rounded-md"
            >Offensive</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Linux Privilege Escalation
              </h5>
              <p class="text-xs text-gray-400">Stairway to Heaven (In Progress)</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Threat Hunting -->
          <a
            href=""
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <span class="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-blue-600/20
                         text-blue-400 border border-blue-600/40 rounded-md"
            >Defensive</span>

            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100 mb-0.5">
                Intro to Threat Hunting & Hunting With Elastic
              </h5>
              <p class="text-xs text-gray-400">Predict the next move (In Progress)</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

          <!-- Placeholder -->
          <a
            href="#"
            target="_blank"
            class="group relative flex items-start justify-between p-3 bg-slate-800/70 hover:bg-slate-700/70
                   rounded-lg border border-slate-700 hover:border-emerald-400/80 shadow-sm transition-all"
          >
            <div class="pr-12">
              <h5 class="font-medium text-white text-sm group-hover:text-emerald-100">
                More to update as I progress
              </h5>
              <p class="text-xs text-gray-400">Additional modules will be added over time</p>
            </div>

            <div class="absolute bottom-2 right-2 flex items-center space-x-1 text-gray-400
                        group-hover:text-emerald-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span class="text-[10px] font-medium tracking-wide">Badge</span>
            </div>
          </a>

        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 border-t-2 border-slate-500">
      <div class="mt-3 mb-1 text-center text-md italic text-slate-300">
        Hack The Box Academy – Hands-on cybersecurity training
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
