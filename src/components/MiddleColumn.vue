<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-3">
    <h1 class="text-2xl text-center text-gray-300 font-bold border-b-2 border-indigo-500 pb-1">
      Cloud | Platform | DevOps
    </h1>
    <p class="text-base">
      Recently, I’ve been building hands-on experience with monitoring tools like Splunk and Ansible
      as part of real-world enterprise labs. As I expand my skills, I’m eager to take on more data
      pipeline projects—automating data flows, working with event-driven cloud architectures, and
      exploring scalable integrations. I’m also keen to dive into AI services like AWS Bedrock,
      bringing together modern cloud infrastructure with practical machine learning and automation.
    </p>

    <BaseCard
      @click="showDynatraceProject = true"
      class="bg-indigo-800 text-white p-4 border-l-4 border-indigo-500 rounded shadow cursor-pointer hover:bg-indigo-700 transition flex items-center gap-5"
    >
      <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace Badge" class="w-20" />
      <div>
        <h3 class="text-lg font-bold text-white">Azure IaaS: Patching & Observability (Recent)</h3>
        <p class="text-sm text-gray-300">
          Built a resilient Azure IaaS lab with Terraform, featuring RHEL/Windows VMs, automated
          patching with Update Manager, load balancing, and full-stack observability via Azure
          Monitor and Dynatrace
        </p>
      </div>
    </BaseCard>

    <div class="grid grid-cols-2 gap-4">
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
    <h2 class="text-2xl text-center text-gray-300 font-bold border-b-2 border-indigo-500 pb-1">
      Infrastructure and Platform Stack
    </h2>
    <div class="mt-4 space-y-4 text-sm text-gray-300">
      <div>
        <div class="mt-5">
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
                src="/images/main-tools/docker-mark-blue.svg"
                alt="Docker"
                class="h-[72px] w-auto"
                title="Docker"
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
const showRaspberry = ref(false)
const showVmwareProject = ref(false)
const showDynatraceProject = ref(false)
const showAzureProject = ref(false)
const showAwsProject = ref(false)
</script>
