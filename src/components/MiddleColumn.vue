<template>
  <div class="bg-gray-800 p-4 rounded shadow space-y-4">
    <h1 class="text-2xl text-gray-300 font-bold border-b-2 border-indigo-500 pb-1">
      Junior DevOps &amp; Cloud Engineer
    </h1>
    <p class="text-base">
      Right now I'm deep in Azure, building real-world, production-style environments. I'm working
      on App Services, databases, and a secure hub-and-spoke network with a VPN gateway — all
      defined with infrastructure as code and deployed via CI/CD. These projects are grounded in
      what hiring teams care about: scalable, secure, automated delivery.
    </p>
    <p class="text-base">
      I'm also integrating tools like Kubernetes, Jenkins, AD, and Dynatrace — all part of my
      hands-on push to master monitoring, automation, and platform engineering. This isn't just
      study — it's applied learning tied directly to AZ-104 and real architectural challenges.
    </p>

    <div class="mt-6 flex gap-2">
      <!-- This is your trigger button -->

      <FocusModal
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
      </button>

      <ProjectsModal
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
      </button>

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

      <router-link
        to="/blog"
        class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
      >
        Raspblog
      </router-link>
    </div>
    <div class="mt-6 bg-blue-900 p-4 rounded shadow border-l-4 border-indigo-500">
      <div class="flex items-center gap-4">
        <img src="/images/skills-in-progress/azure-admin.png" alt="AZ-104 Badge" class="w-24" />
        <div>
          <h3 class="text-lg font-bold text-white">Current Focus: AZ-104 + Azure Projects</h3>
          <p class="text-sm text-gray-300">
            I’m building production-style Azure environments with App Services, SQL, secure VNETs,
            and automated deployments — all aligned to the AZ-104 Administrator path.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 space-y-2 text-sm text-gray-300">
      <div>
        <h4 class="font-semibold text-indigo-300">Hub & Spoke Networking Lab (In Progress)</h4>
        <p>
          Designing a secure Azure hub-and-spoke network with VNet peering, a VPN Gateway, NSGs, and
          custom routing. Will deploy via Terraform and GitHub Actions.
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
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ProjectsModal from './modals/ProjectsModal.vue'
import KubernetesModal from './modals/KubernetesModal.vue'
import FocusModal from './modals/FocusModal.vue'

const showProjects = ref(false)
const showFocus = ref(false)
const showKubernetes = ref(false)
</script>
