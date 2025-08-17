<template>
  <div class="bg-gray-800 p-3 sm:p-4 rounded shadow flex flex-col h-full">
    <!-- Top Section: Certifications -->
    <div>
      <h1 class="text-2xl font-bold border-b-2 border-slate-500 pb-1 mb-4 text-center">
        Certifications
      </h1>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
        <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
        <img
          src="/images/certifications/Cloud_Practitioner.png"
          alt="AWS Cloud Practitioner Badge"
          class="w-24 sm:w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
          @click="showPractitionerModal = true"
        />

        <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
        <img
          src="/images/certifications/azure-admin.png"
          alt="Azure Admin Badge"
          class="w-24 sm:w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
          @click="showAzureAmin = true"
        />

        <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
        <img
          src="/images/certifications/Solutions_Architect.png"
          alt="AWS Solutions Architect Badge"
          class="w-24 sm:w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
          @click="showArchitectModal = true"
        />

        <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
        <img
          src="/images/certifications/terraform003-2.png"
          alt="Terraform Associate Badge"
          class="w-24 sm:w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
          @click="showTerraformModal = true"
        />

        <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
        <img
          src="/images/certifications/Developer.png"
          alt="AWS Developer Badge"
          class="w-24 sm:w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
          @click="showDeveloperModal = true"
        />

        <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
        <img
          src="/images/certifications/python-associate.png"
          alt="Python Associate Badge"
          class="w-24 sm:w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
          @click="showPythonModal = true"
        />
      </div>
    </div>

    <!-- Spacer to push socials down -->
    <div class="flex-grow"></div>

    <!-- Bottom Section: Socials -->
    <div class="mt-10">
      <h1 class="text-2xl font-bold border-b-2 border-slate-500 pb-1 mb-4 text-center">
        Labs & Code
      </h1>

      <div
        class="bg-purple-700 border-2 border-purple-600 hover:bg-purple-600 text-white p-3 mt-2 rounded-lg text-center shadow-md transition-colors duration-300"
      >
        <a
          href="https://github.com/Simodalstix"
          target="_blank"
          class="flex items-center justify-center gap-2 text-white font-semibold"
        >
          <img src="/images/project-icons/githubwhite.png" alt="GitHub Logo" class="w-8 h-8" />
          GitHub
        </a>
      </div>

      <div
        class="bg-[#1b2f21] border-2 border-[#9FEF00] hover:bg-[#2a4833] text-white p-3 mt-2 rounded-lg text-center shadow-md transition-colors duration-300"
      >
        <a
          href="https://app.hackthebox.com/user/HTB-D6ACA7E9C8"
          target="_blank"
          class="flex items-center justify-center gap-2 text-white font-semibold"
        >
          <img
            src="/images/project-icons/hackthebox-green.svg"
            alt="Hack The Box Logo"
            class="w-8 h-8"
          />
          Hack The Box
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AWSArchitect from './modals/AWSArchitect.vue'
import AWSDeveloper from './modals/AWSDeveloper.vue'
import TerraformModal from './modals/TerraformModal.vue'
import AWSPractioner from './modals/AWSPractioner.vue'
import PythonModal from './modals/PythonModal.vue'
import AzureAdministrator from './modals/AzureAdministrator.vue'
const showAzureAmin = ref(false)
const showPythonModal = ref(false)
const showPractitionerModal = ref(false)
const showTerraformModal = ref(false)
const showDeveloperModal = ref(false)
const showArchitectModal = ref(false)
</script>
