<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-3">
    <h1 class="text-2xl text-center text-gray-300 font-bold border-b-2 border-indigo-500 pb-1">
      Linux | Cloud | DevOps
    </h1>
    <p class="text-base">
      I’m currently focused on completing my RHCSA Linux certification while ramping up on
      real-world, fullstack cloud projects. My goal is to build production-grade systems that
      reflect what’s actually used in the industry, from microservices and event-driven
      architectures to infrastructure as code, observability, and security best practices. I’m
      especially interested in how DevOps, platform engineering, and cloud-native tools like
      Kubernetes, Terraform, and CI/CD pipelines come together to support scalable, reliable
      systems. Every project I build now is designed to feel like a slice of a real platform, not
      just a demo.
    </p>

    <BaseCard
      @click="showMultiregionProject = true"
      class="bg-indigo-800 text-white p-4 border-l-4 border-indigo-500 rounded shadow cursor-pointer hover:bg-indigo-700 transition flex items-center gap-5"
    >
      <img
        src="/images/project-icons/eventbridge.svg"
        alt="EventBridge Badge"
        class="w-20 rounded-md"
      />
      <div>
        <h3 class="text-lg font-bold text-white">AWS Multiregion E-commerce Platform (CDK)</h3>
        <p class="text-sm text-gray-300">
          I built a resilient e-commerce backend across multiple AWS regions using EventBridge,
          CodePipeline, and global DynamoDB. This project demonstrates a production-grade,
          event-driven foundation, ready for automated failover and future expansion.
        </p>
      </div>
    </BaseCard>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
import ProjectMultiregion from './modals/Project-Multiregion.vue'
const showMultiregionProject = ref(false)
const showRaspberry = ref(false)
const showVmwareProject = ref(false)
const showDynatraceProject = ref(false)
const showAzureProject = ref(false)
const showAwsProject = ref(false)
</script>
