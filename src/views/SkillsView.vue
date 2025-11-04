<template>
  <div class="text-white container mx-auto px-6 py-8 md:py-8">
    <section class="mb-12 text-center max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">My Skills & Certifications</h1>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Balanced Skills Section (short descriptions, easy to scan) -->
      <div class="md:col-span-2 mx-auto w-full max-w-4xl">
        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-3 text-white">Technical Support & Systems Operations</h2>

          <p class="text-lg text-gray-200 leading-relaxed">
            I’m strongest in <span class="text-orange-300">technical support</span> and
            <span class="text-orange-300">systems operations</span>—keeping users productive and
            systems steady. I’ve supported both <span class="text-orange-300">Windows</span> and
            <span class="text-orange-300">Linux</span> environments, managing
            <span class="text-orange-300">Active Directory</span> access, configuring
            <span class="text-orange-300">VPN</span>, <span class="text-orange-300">firewall</span>,
            <span class="text-orange-300">DNS</span>, and
            <span class="text-orange-300">DHCP</span> settings, and helping resolve common endpoint
            and network issues efficiently.
          </p>

          <p class="text-lg text-gray-200 leading-relaxed mt-4">
            Professionally, I’ve provided
            <span class="text-orange-300">application and product support</span>
            for SaaS clients—logging, tracking, and resolving issues through
            <span class="text-orange-300">HubSpot</span> and exploring platforms like
            <span class="text-orange-300">ServiceNow</span>. I’ve used
            <span class="text-orange-300">PowerShell</span> to troubleshoot connectivity, run
            queries in <span class="text-orange-300">SQL Server Management Studio</span>, and
            perform small fixes like updating data or resetting credentials. I’m also experienced
            with <span class="text-orange-300">remote tools</span> such as
            <span class="text-orange-300">TeamViewer</span> and
            <span class="text-orange-300">RDP</span>, and communication platforms like
            <span class="text-orange-300">Slack</span> for coordinating solutions with teams and
            users.
          </p>

          <p class="text-lg text-gray-200 leading-relaxed mt-4">
            For scripting and automation, I work comfortably in
            <span class="text-orange-300">Bash</span> and
            <span class="text-orange-300">Python</span> for log collection, system checks, and
            lightweight admin scripts. I understand <span class="text-orange-300">YAML</span> for
            configuration files and pipelines, and use
            <span class="text-orange-300">Ansible</span> to deploy updates and configurations across
            my <span class="text-orange-300">VMware</span> lab VMs. On the web side, I can build or
            adjust small interfaces with <span class="text-orange-300">HTML</span>,
            <span class="text-orange-300">CSS</span> (<span class="text-orange-300">Tailwind</span
            >), and frameworks like <span class="text-orange-300">Vue</span> and
            <span class="text-orange-300">React</span>—useful for dashboards and troubleshooting
            tools.
          </p>

          <p class="text-lg text-gray-200 leading-relaxed mt-4">
            I’ve also been building hands-on hardware experience through
            <span class="text-orange-300">CompTIA A+</span> study and home lab work with a
            <span class="text-orange-300">Raspberry Pi</span> and
            <span class="text-orange-300">SER8 Mini-PC</span>—learning component-level concepts like
            <span class="text-orange-300">memory, PCIe, cabling</span>, and system assembly.
            Combined with my <span class="text-orange-300">Security+</span> and cloud certifications
            (<span class="text-orange-300">AWS</span>, <span class="text-orange-300">Azure</span>,
            <span class="text-orange-300">Terraform</span>), I bring both the practical and
            analytical mindset needed to support users and infrastructure with confidence.
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
                <img
                  src="/images/skills-in-progress/aws-devops.png"
                  alt="AWS DevOps Badge"
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
