<template>
  <div class="text-white container mx-auto px-6 py-8 md:py-8">
    <section class="mb-12 text-center max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">My Skills & Certifications</h1>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Balanced Skills Section (short descriptions, easy to scan) -->
      <div class="md:col-span-2 mx-auto w-full max-w-4xl">
        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Infrastructure & Automation</h2>
          <p class="text-lg text-gray-200 mb-2">
            Building stable, repeatable infrastructure across Linux and Windows environments.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-lg text-gray-200">
            <li>Terraform & Ansible – automate provisioning, patching, and configuration</li>
            <li>VMware lab environments – simulate private cloud and hybrid networking</li>
            <li>Focus on reproducibility and lifecycle management through code</li>
          </ul>
        </div>

        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Cloud & Virtualization</h2>
          <p class="text-lg text-gray-200 mb-2">
            Hands-on with both AWS and Azure platforms in real-world project setups.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-lg text-gray-200">
            <li>AWS (EC2, IAM, VPC, CloudWatch) and Azure (App Services, VNets, Key Vault)</li>
            <li>Designed multi-tier environments with monitoring and backup integration</li>
            <li>Emphasis on secure IAM design and consistent resource tagging</li>
          </ul>
        </div>

        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Scripting & Tooling</h2>
          <p class="text-lg text-gray-200 mb-2">
            Automating day-to-day operations using modern scripting and scheduling tools.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-lg text-gray-200">
            <li>Bash, PowerShell, and Python for admin tasks and automation scripts</li>
            <li>systemd timers and cron jobs – recurring maintenance and monitoring</li>
            <li>JSON/YAML – defining IaC, pipelines, and configuration templates</li>
          </ul>
        </div>

        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Systems Administration</h2>
          <p class="text-lg text-gray-200 mb-2">
            Managing secure, multi-platform systems and hybrid domain environments.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-lg text-gray-200">
            <li>RHEL, Ubuntu, and Windows Server with Active Directory and Group Policy</li>
            <li>pfSense, DNS, DHCP, and firewall configuration for secure network access</li>
            <li>Emphasis on uptime, access control, and structured system configuration</li>
          </ul>
        </div>

        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Monitoring & Security</h2>
          <p class="text-lg text-gray-200 mb-2">
            Treating observability and hardening as core disciplines in every deployment.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-lg text-gray-200">
            <li>ELK, Wazuh, Splunk, and CloudWatch – event collection and correlation</li>
            <li>SSH lockdowns, PKI, CIS benchmarks, and VPN configuration (OpenVPN/IPSec)</li>
            <li>Security-first automation – patching, logging, and least-privilege IAM</li>
          </ul>
        </div>

        <div class="mb-10">
          <h2 class="text-2xl font-bold mb-2 text-purple-400">Web & Networking</h2>
          <p class="text-lg text-gray-200 mb-2">
            Solid grounding in networking and web stack fundamentals.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-lg text-gray-200">
            <li>Routing, NAT, DNS, and reverse proxies with NGINX & Let’s Encrypt</li>
            <li>Basic web integration using Vue.js for dashboards and admin interfaces</li>
            <li>VPN and remote access tooling (RDP, xfreerdp, TeamViewer)</li>
          </ul>
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
