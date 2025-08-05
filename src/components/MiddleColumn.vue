<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-5">
    <h1 class="text-2xl text-center text-white font-bold border-b-2 border-slate-500 pb-1">
      Projects
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

    <div class="space-y-5">
      <a
        href="https://github.com/Simodalstix/wazuh-soc-lab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BaseCard
          @click="showWazuhLabProject = true"
          class="bg-gray-800 text-white mt-3 p-4 border-2 border-slate-500 rounded shadow cursor-pointer hover:bg-indigo-800 transition flex items-center gap-5"
        >
          <img
            src="/images/project-icons/wazuh-icon.png"
            alt="Wazuh Logo"
            class="w-20 rounded-xl"
          />
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseCard
          @click="showMultiregionProject = true"
          class="cursor-pointer p-2 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
        >
          <h3 class="text-md font-bold text-white mb-3">
            Implementing a Multi-Region CI/CD Pipeline in AWS
          </h3>
          <div class="flex items-center gap-3">
            <img src="/images/main-tools/aws-icon.svg" alt="AWS Icon" class="w-8 h-8" />
            <img
              src="/images/project-icons/eventbridge.svg"
              alt="EventBridge Icon"
              class="w-8 h-8 rounded-md"
            />
          </div>
        </BaseCard>

        <BaseCard
          @click="showDynatraceProject = true"
          class="cursor-pointer p-2 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
        >
          <h3 class="text-md font-bold text-white mb-3">
            Deploying Dynatrace Monitoring Agents in Azure
          </h3>
          <div class="flex items-center gap-3">
            <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
            <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace Icon" class="w-8 h-8" />
            <!-- <img src="/images/main-tools/splunk.png" alt="Splunk Icon" class="w-8 h-8" /> -->
          </div>
        </BaseCard>

        <BaseCard
          @click="showAzureProject = true"
          class="cursor-pointer p-2 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
        >
          <h3 class="text-md font-bold text-white mb-3">
            Creating a Hub-Spoke Network in Azure with a VPN Gateway
          </h3>
          <div class="flex items-center gap-3">
            <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
            <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showAwsProject = true"
          class="cursor-pointer p-2 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
        >
          <h3 class="text-md font-bold text-white mb-3">
            Executing a Database Migration to AWS with Terraform
          </h3>
          <div class="flex items-center gap-3">
            <img src="/images/main-tools/aws-icon.svg" alt="AWS Icon" class="w-8 h-8" />
            <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showVmwareProject = true"
          class="cursor-pointer p-2 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
        >
          <h3 class="text-md font-bold text-white mb-3">
            Automating VMware Monitoring and Alerting with Ansible
          </h3>
          <div class="flex items-center gap-3">
            <img src="/images/main-tools/vmware.svg" alt="VMware Icon" class="w-8 h-8" />
            <img src="/images/main-tools/ansible.svg" alt="Ansible Icon" class="w-8 h-8" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showRaspberry = true"
          class="cursor-pointer p-2 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
        >
          <h3 class="text-md font-bold text-white mb-3">
            Deploying a Containerized Backend API on a Raspberry Pi
          </h3>
          <div class="flex items-center gap-3">
            <img src="/images/main-tools/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          </div>
        </BaseCard>
      </div>
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
