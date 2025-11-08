<template>
  <div class="text-white container mx-auto px-6 py-6 md:py-3">
    <section class="mb-12 text-center max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">My Skills & Certifications</h1>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Balanced Skills Section (short descriptions, easy to scan) -->
      <div class="md:col-span-2 mx-auto w-full max-w-4xl">
        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-3 text-white">Technical Support & Systems Operations</h2>

          <p class="text-lg text-gray-200 leading-relaxed">
            I’m strongest in <span class="text-orange-300">IT support</span> and
            <span class="text-orange-300">service operations</span>—helping users stay productive
            and keeping systems reliable. I’ve supported mixed environments across
            <span class="text-orange-300">Windows</span> and
            <span class="text-orange-300">Linux</span>, managing
            <span class="text-orange-300">Active Directory</span> access, configuring
            <span class="text-orange-300">VPN</span> and
            <span class="text-orange-300">firewall</span> settings, and resolving endpoint and
            <span class="text-orange-300">network</span> issues efficiently.
          </p>

          <p class="text-lg text-gray-200 leading-relaxed mt-4">
            Professionally, I’ve delivered
            <span class="text-orange-300">application support</span> for SaaS clients—logging,
            tracking, and resolving tickets through <span class="text-orange-300">HubSpot</span> and
            learning platforms like <span class="text-orange-300">ServiceNow</span>. I use tools
            such as <span class="text-orange-300">PowerShell</span> and
            <span class="text-orange-300">SQL Server Management Studio</span> for diagnostics and
            light data fixes, and rely on
            <span class="text-orange-300">remote support tools</span> like
            <span class="text-orange-300">TeamViewer</span> and
            <span class="text-orange-300">RDP</span> to assist users directly. Clear, calm
            communication remains at the centre of my work.
          </p>

          <p class="text-lg text-gray-200 leading-relaxed mt-4">
            For scripting and process improvement, I work with
            <span class="text-orange-300">Bash</span> and
            <span class="text-orange-300">Python</span> to automate small admin tasks, gather logs,
            and perform system checks. I understand <span class="text-orange-300">YAML</span> for
            configuration and use <span class="text-orange-300">Ansible</span> in my home lab to
            practise consistent updates across <span class="text-orange-300">VMware</span> virtual
            machines. These tools help me learn how automation supports everyday IT operations.
          </p>

          <p class="text-lg text-gray-200 leading-relaxed mt-4">
            I’m also developing hands-on hardware knowledge through
            <span class="text-orange-300">CompTIA A+</span> study and lab work with a
            <span class="text-orange-300">Raspberry Pi</span> and
            <span class="text-orange-300">Beelink mini PC</span>, exploring topics like
            <span class="text-orange-300">memory</span>, <span class="text-orange-300">PCIe</span>,
            and <span class="text-orange-300">system assembly</span>. Combined with my
            <span class="text-orange-300">Security+</span> and cloud certifications (<span
              class="text-orange-300"
              >AWS</span
            >, <span class="text-orange-300">Azure</span>,
            <span class="text-orange-300">Terraform</span>), it gives me a strong foundation to
            support users and infrastructure with confidence.
          </p>
        </div>
      </div>

      <!-- Third column: Certifications -->
      <div class="md:col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="col-span-2">
            <div
              class="rounded-t-lg border border-purple-600 bg-gradient-to-r from-purple-700 to-purple-600"
            >
              <h2 class="text-2xl font-bold py-3 text-center">Completed Certifications</h2>
            </div>
            <div
              class="border-l-2 border-r-2 border-b-2 border-purple-600 p-8 grid grid-cols-2 gap-8 place-items-center"
            >
              <div>
                <AWSPractioner
                  :visible="showPractitionerModal"
                  @close="showPractitionerModal = false"
                />
                <img
                  src="/images/certifications/Cloud_Practitioner.png"
                  alt="AWS Cloud Practitioner Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showPractitionerModal = true"
                />
              </div>
              <div>
                <SecurityPlus
                  :visible="showSecurityPlusModal"
                  @close="showSecurityPlusModal = false"
                />
                <img
                  src="/images/certifications/securityplus.png"
                  alt="Comptia Security+ Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showSecurityPlusModal = true"
                />
              </div>

              <div>
                <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
                <img
                  src="/images/certifications/Solutions_Architect.png"
                  alt="AWS Solutions Architect Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showArchitectModal = true"
                />
              </div>
              <div>
                <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
                <img
                  src="/images/certifications/terraform003-2.png"
                  alt="Terraform Associate Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showTerraformModal = true"
                />
              </div>
              <div>
                <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
                <img
                  src="/images/certifications/Developer.png"
                  alt="AWS Developer Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showDeveloperModal = true"
                />
              </div>
              <div>
                <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
                <img
                  src="/images/certifications/azure-admin.png"
                  alt="Azure Admin Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showAzureAmin = true"
                />
              </div>
              <div>
                <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
                <img
                  src="/images/certifications/python-associate.png"
                  alt="Python Associate Badge"
                  class="w-20 md:w-24 lg:w-36 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded cursor-pointer"
                  @click="showPythonModal = true"
                />
              </div>
            </div>
            <div
              class="rounded-b-lg border-l border-r border-b border-purple-600 bg-gradient-to-r from-purple-700 to-purple-600"
            >
              <h2 class="text-2xl font-bold py-3 text-center">&nbsp;</h2>
            </div>
          </div>

          <div
            @click="showTargetCertsModal = true"
            class="col-span-1 cursor-pointer transition duration-100 rounded-lg group"
          >
            <div
              class="rounded-t-lg border border-slate-600 bg-gradient-to-r from-slate-700 to-slate-600 group-hover:border-emerald-400 group-hover:from-emerald-700 group-hover:to-emerald-600 transition-all duration-100"
            >
              <h2 class="text-2xl font-bold py-3 text-center">In Progress</h2>
            </div>
            <div
              class="border-l-2 border-r-2 border-b-2 border-slate-600 p-8 flex flex-col justify-between items-center text-center group-hover:border-emerald-400 transition-all duration-100"
            >
              <div class="flex flex-col gap-8 mb-auto">
                <img
                  src="/images/certifications/a-plus.png"
                  alt="Comptia A+ Badge"
                  class="w-20 sm:w-36 mx-auto"
                />
                <img
                  src="/images/skills-in-progress/rhcsa.png"
                  alt="RHCSA Badge"
                  class="w-20 sm:w-36 mx-auto"
                />
              </div>
            </div>
            <div
              class="rounded-b-lg border border-slate-600 bg-gradient-to-r from-slate-700 to-slate-600 group-hover:border-emerald-400 group-hover:from-emerald-700 group-hover:to-emerald-600 transition-all duration-100"
            >
              <h2 class="text-2xl font-bold py-3 text-center">How Soon?</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
  <SecurityPlus :visible="showSecurityPlusModal" @close="showSecurityPlusModal = false" />

  <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
  <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
  <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
  <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
  <TargetCertifications :visible="showTargetCertsModal" @close="showTargetCertsModal = false" />
  <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
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
import SecurityPlus from '../components/modals/SecurityPlus.vue'
const showSecurityPlusModal = ref(false)
const showAzureAmin = ref(false)
const showPythonModal = ref(false)
const showPractitionerModal = ref(false)
const showTerraformModal = ref(false)
const showDeveloperModal = ref(false)
const showArchitectModal = ref(false)
const showTargetCertsModal = ref(false)
</script>
