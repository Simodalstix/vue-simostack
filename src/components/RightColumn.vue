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
          alt="Cloud Practitioner"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showPractitionerModal = true"
        />
        <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
        <img
          src="/images/certifications/python-associate.png"
          alt="Python Associate"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showPythonModal = true"
        />

        <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
        <img
          src="/images/certifications/Solutions_Architect.png"
          alt="Solutions Architect"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showArchitectModal = true"
        /><TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
        <img
          src="/images/certifications/terraform003-2.png"
          alt="Terraform Associate"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showTerraformModal = true"
        />
        <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
        <img
          src="/images/certifications/Developer.png"
          alt="Developer"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          @click="showDeveloperModal = true"
        />
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
const showPythonModal = ref(false)
const showPractitionerModal = ref(false)
const showTerraformModal = ref(false)
const showDeveloperModal = ref(false)
const showArchitectModal = ref(false)
</script>
