<template>
  <div class="text-white container mx-auto px-6 py-10 md:py-10">
    <section class="mb-12 text-center max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">My Skills & Certifications</h1>
    </section>

    <div class="grid md:grid-cols-3 gap-12 md:gap-20">
      <div>
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Infrastructure & DevOps</h2>
          <ul class="list-disc list-inside space-y-1 text-lg">
            <li>Terraform, CloudFormation</li>
            <li>Ansible, GitHub Actions</li>
            <li>Docker, VMware</li>
          </ul>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Cloud Platforms</h2>
          <ul class="list-disc list-inside space-y-1 text-lg">
            <li>AWS (EC2, S3, IAM, Lambda)</li>
            <li>Azure (App Services, VNets, Key Vault, Monitor)</li>
          </ul>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Scripting & Languages</h2>
          <ul class="list-disc list-inside space-y-1 text-lg">
            <li>Bash, Python, PowerShell</li>
          </ul>
        </div>
      </div>

      <div>
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Systems Administration</h2>
          <ul class="list-disc list-inside space-y-1 text-lg">
            <li>RHEL, Ubuntu, Windows Server</li>
            <li>Active Directory, pfSense, DNS</li>
            <li>DHCP, NAT, SSH access control</li>
          </ul>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Security & Monitoring</h2>
          <ul class="list-disc list-inside space-y-1 text-lg">
            <li>Wazuh, ELK Stack, CloudWatch</li>
            <li>SSH hardening</li>
          </ul>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Web & Frontend</h2>
          <ul class="list-disc list-inside space-y-1 text-lg">
            <li>HTTP, JavaScript, Vue.js</li>
            <li>NGINX, Let's Encrypt</li>
          </ul>
        </div>
      </div>

      <div>
        <div class="grid grid-cols-2 gap-4 place-items-center mb-8">
          <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
          <img
            src="/images/certifications/Cloud_Practitioner.png"
            alt="AWS Cloud Practitioner Badge"
            class="w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
            @click="showPractitionerModal = true"
          />

          <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
          <img
            src="/images/certifications/azure-admin.png"
            alt="Azure Admin Badge"
            class="w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
            @click="showAzureAmin = true"
          />

          <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
          <img
            src="/images/certifications/Solutions_Architect.png"
            alt="AWS Solutions Architect Badge"
            class="w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
            @click="showArchitectModal = true"
          />

          <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
          <img
            src="/images/certifications/terraform003-2.png"
            alt="Terraform Associate Badge"
            class="w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
            @click="showTerraformModal = true"
          />

          <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
          <img
            src="/images/certifications/Developer.png"
            alt="AWS Developer Badge"
            class="w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
            @click="showDeveloperModal = true"
          />

          <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
          <img
            src="/images/certifications/python-associate.png"
            alt="Python Associate Badge"
            class="w-36 hover:border-2 hover:border-slate-500 transition rounded cursor-pointer"
            @click="showPythonModal = true"
          />
        </div>

        <div class="mt-8 text-center">
          <button
            @click="showTargetCertsModal = true"
            class="bg-purple-700 border-2 border-purple-600 hover:bg-purple-600 text-white p-3 rounded-lg shadow-md transition-colors duration-300 w-full"
          >
            Whats next?
          </button>
        </div>
      </div>
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
