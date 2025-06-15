<template>
  <div class="bg-gray-800 p-4 rounded shadow flex flex-col justify-between h-full">
    <!-- TOP BLOCK: heading + icons -->
    <div>
      <h1 class="text-2xl font-bold border-b-2 border-indigo-500 pb-1 mb-4 text-center">
        Certifications
      </h1>
      <div class="grid grid-cols-2 gap-4 place-items-center">
        <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
        <img
          src="/images/certifications/Cloud_Practitioner.png"
          alt="AWS Cloud Practitioner Badge"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showPractitionerModal = true"
        />
        <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
        <img
          src="/images/certifications/python-associate.png"
          alt="Python Associate Badge"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showPythonModal = true"
        />

        <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
        <img
          src="/images/certifications/Solutions_Architect.png"
          alt="AWS Solutions Architect Badge"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showArchitectModal = true"
        /><TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
        <img
          src="/images/certifications/terraform003-2.png"
          alt="Terraform Associate Badge"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showTerraformModal = true"
        />
        <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
        <img
          src="/images/certifications/Developer.png"
          alt="AWS Developer Badge"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showDeveloperModal = true"
        /><AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
        <img
          src="/images/certifications/azure-admin.png"
          alt="Azure Admin Badge"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showAzureAmin = true"
        />
      </div>
      <div
        class="bg-purple-800 hover:bg-purple-700 text-white p-2 mt-8 rounded-md text-center shadow"
      >
        <a
          href="https://github.com/Simodalstix"
          target="_blank"
          class="flex items-center justify-center gap-2 text-white hover:text-white transition"
        >
          <Github class="text-gray-800 w-10 h-10" />
          GitHub.com/Simodalstix
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Github } from 'lucide-vue-next'
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
