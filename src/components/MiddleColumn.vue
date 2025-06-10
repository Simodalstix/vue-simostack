<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-4">
    <h1 class="text-2xl text-center text-gray-300 font-bold border-b-2 border-indigo-500 pb-1">
      Cloud | Platform | DevOps
    </h1>
    <p class="text-base">
      Right now I’m focused on building a realistic lab environment using VMware Workstation,
      pfSense, and Active Directory to simulate enterprise networking and identity services. I’m
      integrating Ansible automation, centralized monitoring with Prometheus, Grafana, and Splunk,
      and deploying tools that mirror real-world infrastructure — all with an emphasis on hands-on
      use, observability, and secure architecture.
    </p>
    <div class="mt-4 bg-purple-900 p-4 rounded shadow border-l-4 border-orange-400">
      <div class="flex items-center gap-3">
        <img src="/images/focus/jenkins.svg" alt="Jenkins Badge" class="w-24" />
        <div>
          <h3 class="text-lg font-bold text-white">Kubernetes + CI/CD Stack</h3>
          <p class="text-sm text-gray-300">
            Planning a Kubernetes-based lab featuring Helm for templating and Jenkins for automated
            deployments. Will be hosted on VMware and integrated with logging, secrets, and GitHub
            workflows.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex gap-2">
      <!-- This is your trigger button -->

      <LearningModal
        :visible="showLearn"
        @close="showLearn = false"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
        title="Learning Focus"
      />
      <button
        @click="showLearn = true"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Certifications
      </button>
      <!-- <FocusModal
        :visible="showFocus"
        @close="showFocus = false"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
        title="Actively Exploring"
      />
      <button
        @click="showFocus = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Exploration
      </button> -->

      <AzureHubSpokeModal
        :visible="showAzureProject"
        @close="showAzureProject = false"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
      />

      <button
        @click="showAzureProject = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Azure Hub VPN
      </button>

      <AwsMigrationModal
        :visible="showAwsProject"
        @close="showAwsProject = false"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
      />

      <button
        @click="showAwsProject = true"
        class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
      >
        AWS Database Migration
      </button>

      <VmwareMonitoringModal
        :visible="showVmwareProject"
        @close="showVmwareProject = false"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
      />

      <button
        @click="showVmwareProject = true"
        class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
      >
        VMware + Ansible
      </button>

      <!-- <ProjectsModal
        :visible="showProjects"
        @close="showProjects = false"
        title="Recent Projects"
        width="max-w-[1250px]"
        height="max-h-[92vh]"
        alignment="items-start"
      />

      <button
        @click="showProjects = true"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Projects
      </button> -->

      <KubernetesModal
        :visible="showKubernetes"
        @close="showKubernetes = false"
        title="Kubernetes"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
      />

      <!-- <button
        @click="showKubernetes = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Kubernetes
      </button> -->
    </div>
    <div class="mt-6 bg-blue-900 p-4 rounded shadow border-l-4 border-indigo-500">
      <div class="flex items-center gap-4">
        <img src="/images/skills-in-progress/azure-admin.png" alt="AZ-104 Badge" class="w-24" />
        <div>
          <h3 class="text-lg font-bold text-white">AZ-104 + Azure Projects</h3>
          <p class="text-sm text-gray-300">
            Study and revision complete, concepts learned and applied. Comfortable with practice
            exams and ready to sit at a moment’s notice — once my house occupants leave on holiday
            on the 17th.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 space-y-2 text-sm text-gray-300">
      <div>
        <div class="mt-1">
          <div class="flex flex-wrap gap-3 justify-center items-center">
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="h-20 w-auto"
                title="Terraform"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/vmware.svg"
                alt="VMware"
                class="h-20 w-auto"
                title="VMware"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/aws-icon.svg"
                alt="AWS"
                class="h-20 w-auto"
                title="AWS"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/azure-icon.svg"
                alt="Azure"
                class="h-20 w-auto"
                title="Azure"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/ansible.svg"
                alt="Ansible"
                class="h-20 w-auto"
                title="Ansible"
              />
            </div>
            <div class="transition duration-200 hover:scale-110 hover:brightness-110">
              <img
                src="/images/main-tools/docker-mark-blue.svg"
                alt="Docker"
                class="h-20 w-auto"
                title="Docker"
              />
            </div>
          </div>
        </div>

        <!-- <h4 class="font-semibold text-indigo-300">Hub & Spoke Networking Lab</h4>
        <p>
          Designed secure Azure hub-and-spoke network with VNet peering, a VPN Gateway, NSGs, and
          custom routing - infrastructure managed via Terraform. Connection tested with AWS EC2.
          <a href="https://github.com/Simodalstix/az-hub-spoke-vpn" class="text-cyan-400 underline"
            >GitHub →</a
          >
        </p>
      </div>
      <div>
        <h4 class="font-semibold text-indigo-300">Azure App Service Project (In Progress)</h4>
        <p>
          Building a full stack deployment pipeline for an Express API with PostgreSQL on App
          Service and Azure Database for PostgreSQL. CI/CD enabled via GitHub.
          <a
            href="https://github.com/Simodalstix/azure-app-database"
            class="text-cyan-400 underline"
            >GitHub →</a
          >
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// import ProjectsModal from './modals/ProjectsModal.vue'
import KubernetesModal from './modals/KubernetesModal.vue'
// import FocusModal from './modals/FocusModal.vue'
import LearningModal from './modals/LearningModal.vue'
import AwsMigrationModal from './modals/Project-Migration.vue'
import AzureHubSpokeModal from './modals/Project-Azure-Hub.vue'
import VmwareMonitoringModal from './modals/Project-VMware-Ansible.vue'
const showVmwareProject = ref(false)

const showAzureProject = ref(false)
const showAwsProject = ref(false)
const showLearn = ref(false)
// const showProjects = ref(false)
// const showFocus = ref(false)
const showKubernetes = ref(false)
</script>
