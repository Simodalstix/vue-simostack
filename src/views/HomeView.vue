<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-[940px]">
    <div class="rounded-2xl border border-slate-700 bg-slate-950/60 px-6 sm:px-8 py-6 pb-10">
      <div class="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between mb-6">
        <div class="flex items-center gap-4">
          <img src="/images/icons/oblivion_profileicon.jpg" alt="profile" class="h-20 rounded-full" />
          <h1 class="text-4xl sm:text-5xl md:text-5xl font-extrabold tracking-tight">
            Simon Parker
          </h1>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.linkedin.com/in/simonparker-dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-[#0A66C2] border border-slate-700 hover:border-[#0A66C2] rounded-lg transition-all duration-200 text-slate-300 hover:text-white font-medium"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span class="text-sm">LinkedIn</span>
          </a>

          <a
            href="https://github.com/Simodalstix"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-cyan-600 border border-slate-700 hover:border-cyan-400 rounded-lg transition-all duration-200 text-slate-300 hover:text-white font-medium"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">GitHub</span>
          </a>
        </div>
      </div>

      <!-- Career path -->
      <div class="font-mono text-left inline-block text-base sm:text-xl md:text-2xl leading-relaxed mb-6">
        <div class="text-gray-500">$ ls ~/career</div>
        <div class="text-gray-500">Pharmacist.tar.gz</div>
        <div class="text-cyan-300">Helpdesk-Support-Technician/</div>
        <div class="flex text-gray-500">
          <span class="mr-2 text-gray-500">└──</span>
          <span>Systems-Cloud-Engineer/</span>
        </div>
      </div>

      <!-- Intro -->
      <div class="max-w-4xl text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg space-y-4">
       <p> 
  I currently work in MSP support across varied client environments, handling
  <span class="text-cyan-300">Microsoft 365</span>,
  <span class="text-cyan-300">Entra ID</span>,
  <span class="text-cyan-300">Active Directory</span>,
  <span class="text-cyan-300">endpoints</span>, and
  <span class="text-cyan-300">network troubleshooting</span> in day-to-day operations.
</p>

       <p>
  Outside of support, I spend much of my time building depth in
  <span class="text-cyan-300">Linux administration</span>,
  <span class="text-cyan-300">cloud infrastructure</span>, and
  <span class="text-cyan-300">automation</span> through projects involving
  <span class="text-cyan-300">Terraform</span>,
  <span class="text-cyan-300">AWS CDK</span>,
  <span class="text-cyan-300">Ansible</span>, and virtualized lab environments.
</p>
      </div>

      <!-- CTA + Certifications -->
      <div class="mt-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">

        <!-- Left: Buttons -->
        <div class="flex flex-row md:flex-col gap-3 shrink-0 md:self-end relative z-10">
          <router-link
            to="/about"
            class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 border border-cyan-400 rounded-lg transition-all duration-200 text-white font-medium text-center"
          >
            About Me
          </router-link>
          <router-link
            to="/projects"
            class="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all duration-200 text-white font-medium text-center"
          >
            View Projects
          </router-link>
        </div>

        <!-- Right: Cert pyramid (top-right to bottom-left) -->
        <div class="flex-1 flex flex-col items-end pr-4 sm:pr-6 md:pr-10">
          <!-- Row 1: Security+ then Microsoft lowest to best right (flush right) -->
          <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-end gap-3 sm:gap-4">
            <img src="/images/certifications/securityplus.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showSecurityPlusModal = true" alt="CompTIA Security+" />
            <img src="/images/certifications/ms-900.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showMS900Modal = true" alt="Microsoft 365 Fundamentals" />
            <img src="/images/certifications/sc-300.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showSC300Modal = true" alt="Microsoft SC-300 Identity and Access Administrator" />
            <img src="/images/certifications/azure-admin.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showAzureAdminModal = true" alt="Azure Administrator Associate" />
          </div>
          <!-- Row 2: AWS lowest to best right (staggered) -->
          <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-end gap-3 sm:gap-4 pr-10 sm:pr-12 md:pr-16">
            <img src="/images/certifications/cloudpractitioner12.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showCloudPractitionerModal = true" alt="AWS Cloud Practitioner" />
            <img src="/images/certifications/aws-dva.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showDeveloperModal = true" alt="AWS Developer Associate" />
            <img src="/images/certifications/aws-saa.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showArchitectModal = true" alt="AWS Solutions Architect Associate" />
          </div>
          <!-- Row 3: Terraform + RHCSA (flush right) -->
          <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-end gap-3 sm:gap-4">
            <img src="/images/certifications/pcap.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showPCAPModal = true" alt="PCAP Python" />
            <img src="/images/certifications/terraform003.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showTerraformModal = true" alt="Terraform Associate" />
            <img src="/images/certifications/rhcsa.png" class="w-16 sm:w-20 md:w-28 hover:drop-shadow-[0_0_16px_rgba(255,80,80,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer rounded justify-self-end" @click="showRHCSAModal = true" alt="Red Hat Certified System Administrator" />
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Modals -->
  <MS900 :visible="showMS900Modal" @close="showMS900Modal = false" />
  <AzureAdministrator :visible="showAzureAdminModal" @close="showAzureAdminModal = false" />
  <RHCSA :visible="showRHCSAModal" @close="showRHCSAModal = false" />
  <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
  <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
  <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
  <SecurityPlus :visible="showSecurityPlusModal" @close="showSecurityPlusModal = false" />
  <SC300Modal :visible="showSC300Modal" @close="showSC300Modal = false" />
  <AWSPractitioner :visible="showCloudPractitionerModal" @close="showCloudPractitionerModal = false" />
  <PythonModal :visible="showPCAPModal" @close="showPCAPModal = false" />
</template>

<script setup>
import { ref } from 'vue'
import MS900 from '../components/modals/MS900.vue'
import AzureAdministrator from '../components/modals/AzureAdministrator.vue'
import RHCSA from '../components/modals/RHCSA-Cert.vue'
import AWSArchitect from '@/components/modals/AWSArchitect.vue'
import AWSDeveloper from '@/components/modals/AWSDeveloper.vue'
import TerraformModal from '@/components/modals/TerraformModal.vue'
import SecurityPlus from '../components/modals/SecurityPlus.vue'
import SC300Modal from '../components/modals/SC300Modal.vue'
import AWSPractitioner from '../components/modals/AWSPractioner.vue'
import PythonModal from '../components/modals/PythonModal.vue'


const showArchitectModal = ref(false)
const showDeveloperModal = ref(false)
const showTerraformModal = ref(false)
const showMS900Modal = ref(false)
const showAzureAdminModal = ref(false)
const showRHCSAModal = ref(false)
const showSC300Modal = ref(false)
const showCloudPractitionerModal = ref(false)
const showSecurityPlusModal = ref(false)
const showPCAPModal = ref(false)
</script>
