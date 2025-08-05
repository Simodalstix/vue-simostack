<template>
  <div class="bg-gray-800 p-4 rounded shadow flex flex-col h-full text-white">
    <div>
      <h1 class="text-2xl font-bold border-b-2 border-slate-500 pb-1 mb-4 text-center">
        Certifications
      </h1>
      <div class="grid grid-cols-2 gap-4 place-items-center">
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

    <div class="mt-10 text-center">
      <h1 class="text-2xl font-bold border-b-2 border-slate-500 pb-1 mb-4">
        Certifications in Progress
      </h1>
      <button
        @click="showTargetCertsModal = true"
        class="bg-purple-700 border-2 border-purple-600 hover:bg-purple-600 text-white p-3 rounded-lg shadow-md transition-colors duration-300 w-full md:w-auto"
      >
        View Certifications
      </button>
    </div>

    <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
    <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
    <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
    <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
    <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
    <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />

    <TargetCertifications :visible="showTargetCertsModal" @close="showTargetCertsModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AWSArchitect from '../components/modals/AWSArchitect.vue'
import AWSDeveloper from '../components/modals/AWSDeveloper.vue'
import TerraformModal from '../components/modals/TerraformModal.vue'
import AWSPractioner from '../components/modals/AWSPractioner.vue'
import PythonModal from '../components/modals/PythonModal.vue'
import AzureAdministrator from '../components/modals/AzureAdministrator.vue'
import TargetCertifications from '../components/modals/TargetCerts.vue'

const showAzureAmin = ref(false)
const showPythonModal = ref(false)
const showPractitionerModal = ref(false)
const showTerraformModal = ref(false)
const showDeveloperModal = ref(false)
const showArchitectModal = ref(false)
const showTargetCertsModal = ref(false)
</script>

<style scoped>
/* Scoped styles here if needed */
</style>
