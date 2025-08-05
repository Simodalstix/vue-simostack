<template>
  <div class="text-white container mx-auto px-6 py-12 md:py-10">
    <div class="grid md:grid-cols-3 gap-12 md:gap-10 mb-10">
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold mb-4">My Projects & Labs</h1>
        <p class="text-lg">
          My current focus is building real-world infrastructure and security labs that reflect how
          things work in enterprise environments. I deploy cloud and on-premises systems with
          integrated automation, monitoring, and threat detection. To complement this blue team
          experience, I also work through red team challenges on Hack The Box. This hands-on
          practice with attack techniques allows me to better understand, anticipate, and defend
          against them.
        </p>
      </div>

      <div class="flex flex-col justify-end">
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
          class="bg-[#1b2f21] border-2 border-[#9FEF00] hover:bg-[#2a4833] text-white p-3 mt-2 rounded-lg text-center shadow-md transition-colors duration-300 mt-4"
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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a
        href="https://github.com/Simodalstix/wazuh-soc-lab"
        target="_blank"
        rel="noopener noreferrer"
        class="md:col-span-2"
      >
        <BaseCard
          @click="showWazuhLabProject = true"
          class="bg-900 text-white p-4 border-2 border-slate-500 rounded shadow cursor-pointer hover:bg-indigo-800 transition flex items-center gap-5"
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
        </BaseCard>
      </a>

      <BaseCard
        @click="showMultiregionProject = true"
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
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
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
      >
        <h3 class="text-md font-bold text-white mb-3">
          Deploying Dynatrace Monitoring Agents in Azure
        </h3>
        <div class="flex items-center gap-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace Icon" class="w-8 h-8" />
        </div>
      </BaseCard>

      <BaseCard
        @click="showAzureProject = true"
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
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
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
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
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
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
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
      >
        <h3 class="text-md font-bold text-white mb-3">
          Deploying a Containerized Backend API on a Raspberry Pi
        </h3>
        <div class="flex items-center gap-3">
          <img src="/images/main-tools/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          <img src="/images/main-tools/raspberry-pi.svg" alt="Raspberry Pi Icon" class="w-8 h-8" />
        </div>
      </BaseCard>
      <BaseCard
        @click="showFullstackBlogProject = true"
        class="cursor-pointer p-4 rounded-md border-2 border-slate-500 hover:bg-indigo-800 transition"
      >
        <h3 class="text-md font-bold text-white mb-3">
          Full-Stack Blog on Raspberry Pi with Docker & AWS S3
        </h3>
        <div class="flex items-center gap-3">
          <img src="/images/main-tools/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          <img src="/images/main-tools/raspberry-pi.svg" alt="Raspberry Pi Icon" class="w-8 h-8" />
          <img src="/images/main-tools/aws-icon.svg" alt="AWS S3 Icon" class="w-8 h-8" />
          <img src="/images/project-icons/react-2.svg" alt="React Icon" class="w-8 h-8" />
        </div>
      </BaseCard>

      <BaseCard class="bg-gray-800 p-4 rounded-md border-2 border-slate-500 text-gray-400">
        <h3 class="text-md font-bold mb-3">New Project Coming Soon</h3>
        <p class="text-sm">A new project is currently in the works.</p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DynatraceModal from '../components/modals/Project-Dynatrace.vue'
import AwsMigrationModal from '../components/modals/Project-Migration.vue'
import AzureHubSpokeModal from '../components/modals/Project-Azure-Hub.vue'
import VmwareMonitoringModal from '../components/modals/Project-VMware-Ansible.vue'
import RaspberryPiModal from '../components/modals/Project-Raspberry.vue'
import ProjectMultiregion from '../components/modals/Project-Multiregion.vue'
const showMultiregionProject = ref(false)
const showRaspberry = ref(false)
const showVmwareProject = ref(false)
const showDynatraceProject = ref(false)
const showAzureProject = ref(false)
const showAwsProject = ref(false)
</script>
