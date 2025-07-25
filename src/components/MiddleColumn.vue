<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-5">
    <h1 class="text-2xl text-center text-white font-bold border-b-2 border-indigo-500 pb-1">
      Linux | Cloud | DevOps | Security
    </h1>
    <p class="text-base">
      My current focus is building real world infrastructure and security labs that reflect how
      things work in enterprise. I’m deploying both cloud and on premises environments with
      automation, monitoring, and threat detection built in from the start. These projects are about
      more than just tooling. They’re teaching me how systems behave, how attackers move, and how
      engineers can detect and respond under pressure. To complement the blue team side, I’m also
      working through red team challenges on Hack The Box to build practical, hands on experience
      with attack techniques—so I can better understand, anticipate, and defend against them.
    </p>

    <a
      href="https://github.com/Simodalstix/wazuh-soc-lab"
      target="_blank"
      rel="noopener noreferrer"
    >
      <BaseCard
        @click="showWazuhLabProject = true"
        class="bg-gray-800 text-white mt-3 p-4 border-2 border-indigo-500 rounded shadow cursor-pointer hover:bg-indigo-800 transition flex items-center gap-5"
      >
        <img src="/images/project-icons/wazuh-icon.png" alt="Wazuh Logo" class="w-20 rounded-xl" />
        <div>
          <h3 class="text-lg font-bold text-white">SOC Lab: Wazuh + ELK Stack on VMware</h3>
          <p class="text-sm text-gray-300">
            I’m building a home lab simulating real SOC operations using Wazuh, ELK Stack, and
            Ansible. Hosted on VMware, this lab features log ingestion from Linux, Windows, and
            pfSense systems with alerting, dashboarding, and threat detection mapped to MITRE
            ATT&CK.
          </p>
        </div>
      </BaseCard></a
    >

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseCard
        @click="showMultiregionProject = true"
        class="bg-purple-800 bg-opacity-60 text-white p-3 border-l-4 border-purple-800 rounded shadow cursor-pointer hover:bg-purple-700 transition text-center font-medium flex items-center justify-center min-h-[50px]"
      >
        <span>AWS Multiregion CI/CD</span>
        <img src="/images/main-tools/aws-icon.svg" alt="AWS Icon" class="w-8 ml-4" /><img
          src="/images/project-icons/eventbridge.svg"
          alt="Terraform Icon"
          class="w-8 ml-2 rounded-md"
        /> </BaseCard
      ><BaseCard
        @click="showDynatraceProject = true"
        class="bg-purple-800 bg-opacity-60 text-white p-3 border-l-4 border-purple-800 rounded shadow cursor-pointer hover:bg-purple-700 transition text-center font-medium flex items-center justify-center min-h-[50px]"
      >
        <span>Azure Monitoring Agents</span>
        <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 ml-4" /><img
          src="/images/focus/dynatrace-icon.svg"
          alt="Dynatrace Icon"
          class="w-8 ml-2"
        />
      </BaseCard>
      <BaseCard
        @click="showAzureProject = true"
        class="bg-purple-800 bg-opacity-60 text-white p-3 border-l-4 border-purple-800 rounded shadow cursor-pointer hover:bg-purple-700 transition text-center font-medium flex items-center justify-center min-h-[50px]"
      >
        <span>Azure Hub-Spoke + VPN</span>
        <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 ml-4" /><img
          src="/images/main-tools/terraform.svg"
          alt="Terraform Icon"
          class="w-8 ml-2"
        />
      </BaseCard>

      <BaseCard
        @click="showAwsProject = true"
        class="bg-purple-800 bg-opacity-60 text-white border-l-4 border-purple-800 p-3 rounded shadow cursor-pointer hover:bg-purple-700 transition text-center font-medium flex items-center justify-center min-h-[50px]"
      >
        <span>AWS Database Migration</span
        ><img src="/images/main-tools/aws-icon.svg" alt="AWS Icon" class="w-8 ml-4" /><img
          src="/images/main-tools/terraform.svg"
          alt="Terraform Icon"
          class="w-8 ml-2"
        />
      </BaseCard>

      <BaseCard
        @click="showVmwareProject = true"
        class="bg-purple-800 bg-opacity-60 text-white border-l-4 border-purple-800 p-3 rounded shadow cursor-pointer hover:bg-purple-700 transition text-center font-medium flex items-center justify-center min-h-[50px]"
      >
        <span>VMware Monitoring</span>
        <img src="/images/main-tools/vmware.svg" alt="VMware Icon" class="w-8 ml-4" /><img
          src="/images/main-tools/ansible.svg"
          alt="Ansible Icon"
          class="w-8 ml-2"
        /> </BaseCard
      ><BaseCard
        @click="showRaspberry = true"
        class="bg-purple-800 bg-opacity-60 text-white border-l-4 border-purple-800 p-3 rounded shadow cursor-pointer hover:bg-purple-700 transition text-center font-medium flex items-center justify-center min-h-[50px]"
      >
        <span>Pi Backend API (Docker + DB)</span>
        <img src="/images/main-tools/docker-mark-blue.svg" alt="Ansible Icon" class="w-8 ml-4" />
      </BaseCard>
    </div>
    <Project-Multiregion
      :visible="showMultiregionProject"
      @close="showMultiregionProject = false"
      width="max-w-[1100px]"
      height="max-h-[92vh]"
    />
    <DynatraceModal
      :visible="showDynatraceProject"
      @close="showDynatraceProject = false"
      width="max-w-[1100px]"
      height="max-h-[92vh]"
    />
    <AzureHubSpokeModal
      :visible="showAzureProject"
      @close="showAzureProject = false"
      width="max-w-[1100px]"
      height="max-h-[92vh]"
    />
    <AwsMigrationModal
      :visible="showAwsProject"
      @close="showAwsProject = false"
      width="max-w-[1100px]"
      height="max-h-[92vh]"
    />
    <VmwareMonitoringModal
      :visible="showVmwareProject"
      @close="showVmwareProject = false"
      width="max-w-[1100px]"
      height="max-h-[92vh]"
    />
    <RaspberryPiModal
      :visible="showRaspberry"
      @close="showRaspberry = false"
      width="max-w-[1100px]"
      height="max-h-[92vh]"
    />

    <div class="space-y-4 text-sm text-gray-300">
      <h2 class="text-2xl text-center text-white font-bold border-b-2 border-indigo-500 pb-1">
        Core Tech Stack
      </h2>
      <div>
        <div class="mt-7">
          <div class="flex flex-wrap gap-6 justify-center items-center">
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="h-[72px] w-auto"
                title="Terraform"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/vmware.svg"
                alt="VMware"
                class="h-[72px] w-auto"
                title="VMware"
              />
            </div>
            <div
              class="transition brightness-110 duration-200 hover:scale-110 hover:brightness-120"
            >
              <img
                src="/images/main-tools/aws-icon.svg"
                alt="AWS"
                class="h-[72px] w-auto"
                title="AWS"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/azure-icon.svg"
                alt="Azure"
                class="h-[72px] w-auto"
                title="Azure"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/ansible.svg"
                alt="Ansible"
                class="h-[72px] w-auto"
                title="Ansible"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/project-icons/python.svg"
                alt="Python"
                class="h-[72px] w-auto"
                title="Python"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DynatraceModal from './modals/Project-Dynatrace.vue'
import AwsMigrationModal from './modals/Project-Migration.vue'
import AzureHubSpokeModal from './modals/Project-Azure-Hub.vue'
import VmwareMonitoringModal from './modals/Project-VMware-Ansible.vue'
import RaspberryPiModal from './modals/Project-Raspberry.vue'
import ProjectMultiregion from './modals/Project-Multiregion.vue'
const showMultiregionProject = ref(false)
const showRaspberry = ref(false)
const showVmwareProject = ref(false)
const showDynatraceProject = ref(false)
const showAzureProject = ref(false)
const showAwsProject = ref(false)
</script>
