<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
    <!-- Header: Name & Role -->
    <section class="text-center mb-4 sm:mb-6">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-5">
        Simon Parker
      </h1>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
        <span class="text-cyan-400">Helpdesk Support Technician</span>
      </h2>
    </section>

    <!-- Certification Strip -->
    <section class="mb-8 sm:mb-10 rounded-xl bg-slate-900/70 px-4 sm:px-6 py-3 sm:py-4 max-w-5xl mx-auto">
      <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
        <div class="flex flex-col items-center">
          <img
            src="/images/certifications/itil.png"
            class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded cursor-pointer"
            @click="showITILModal = true"
          />
        </div>

        <div class="flex flex-col items-center">
          <img
            src="/images/certifications/a-plus.png"
            class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded cursor-pointer"
            @click="showAPlusModal = true"
          />
        </div>

        <div class="flex flex-col items-center">
          <img
            src="/images/certifications/securityplus.png"
            class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded cursor-pointer"
            @click="showSecurityPlusModal = true"
          />
        </div>

        <div class="flex flex-col items-center">
          <img
            src="/images/certifications/ms-900.png"
            class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded cursor-pointer"
            @click="showMS900Modal = true"
          />
        </div>

        <div class="flex flex-col items-center">
          <img
            src="/images/certifications/azure-admin.png"
            class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded cursor-pointer"
            @click="showAzureAdminModal = true"
          />
        </div>

        <!-- <div class="flex flex-col items-center">
          <img
            src="/images/certifications/rhcsa.png"
            class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded cursor-pointer"
            @click="showRHCSAModal = true"
          />
        </div> -->
      </div>
    </section>

    <!-- MSP/Helpdesk Description -->
    <section class="rounded-2xl border border-cyan-500 bg-gradient-to-br from-cyan-900 to-slate-900 px-5 sm:px-8 py-5 sm:py-6 max-w-2xl mx-auto">
      <div class="text-gray-200 leading-relaxed text-sm sm:text-base">
        <p>
          Working in MSP support, handling <span class="text-cyan-300">Level 1 & 2</span> issues across client environments. Daily work includes <span class="text-cyan-300">Microsoft 365</span> (<span class="text-cyan-300">SharePoint</span>, <span class="text-cyan-300">Teams</span>, <span class="text-cyan-300">Outlook</span>, <span class="text-cyan-300">Exchange</span>), <span class="text-cyan-300">Entra ID</span>, <span class="text-cyan-300">Active Directory</span>, <span class="text-cyan-300">endpoints</span>, and <span class="text-cyan-300">VPNs</span>. Ticketing through <span class="text-cyan-300">Autotask</span>, remote management via <span class="text-cyan-300">Datto RMM</span>, and documentation in <span class="text-cyan-300">IT Glue</span>. Focused on making <span class="text-cyan-300">PowerShell</span> a regular part of my workflow.
        </p>
      </div>
    </section>
  </div>

  <!-- Modals -->
  <ITILCertification :visible="showITILModal" @close="showITILModal = false" />
  <APlus :visible="showAPlusModal" @close="showAPlusModal = false" />
  <SecurityPlus :visible="showSecurityPlusModal" @close="showSecurityPlusModal = false" />
  <MS900 :visible="showMS900Modal" @close="showMS900Modal = false" />
  <AzureAdministrator :visible="showAzureAdminModal" @close="showAzureAdminModal = false" />
  <RHCSA :visible="showRHCSAModal" @close="showRHCSAModal = false" />
</template>

<script setup>
import { ref } from 'vue'
import ITILCertification from '../components/modals/ITIL-Certification.vue'
import APlus from '../components/modals/CompTIA-A+.vue'
import SecurityPlus from '../components/modals/SecurityPlus.vue'
import MS900 from '../components/modals/MS900.vue'
import AzureAdministrator from '../components/modals/AzureAdministrator.vue'
import RHCSA from '../components/modals/RHCSA-Cert.vue'

const showITILModal = ref(false)
const showAPlusModal = ref(false)
const showSecurityPlusModal = ref(false)
const showMS900Modal = ref(false)
const showAzureAdminModal = ref(false)
const showRHCSAModal = ref(false)
</script>
