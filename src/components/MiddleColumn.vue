<template>
  <div class="bg-gray-800 p-6 rounded shadow space-y-4">
    <h1 class="text-2xl font-bold border-b-2 border-indigo-500 pb-1">
      Junior DevOps &amp; Cloud Engineer
    </h1>
    <p class="mt-4 text-sm text-gray-300">
      I hit a skill ceiling too early in pharmacy, and I knew I needed a change. Once I discovered
      AWS and CloudFormation, something clicked. I became fascinated with how systems are built,
      automated, and maintained — and I haven’t looked back. Then I found Terraform, realized it was
      the cloud-agnostic industry standard, and that shifted everything. I’m now working toward the
      Terraform Associate exam and progressing through RHCSA to build the Linux fundamentals I know
      I’ll need. I’m not going back to pharmacy — I’m committed to building a long-term career in
      tech. DevOps just fits me. I want to keep improving, keep asking smarter questions, and
      eventually become the person others turn to when things get complex.
    </p>

    <div class="mt-6 flex gap-2">
      <!-- This is your trigger button -->
      <LearningModal
        :visible="showFocus"
        @close="showFocus = false"
        width="max-w-[1100px]"
        height="max-h-[92vh]"
        title="Learning"
      />
      <button
        @click="showFocus = true"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Learning Focus
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
        class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
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

      <button
        @click="showKubernetes = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Kubernetes
      </button>

      <button
        onclick="checkPiConnection()"
        class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
      >
        Raspblog
      </button>
    </div>
    <div class="mt-6 bg-gray-700 p-4 rounded relative">
      <h2 class="text-xl font-bold border-b-2 border-indigo-500 pb-1">
        Current Skills &amp; Technologies
      </h2>

      <ul class="list-disc ml-4 mt-2 text-sm text-gray-300">
        <li>SQL Server & Querying – basic admin tasks and writing SQL queries</li>
        <li>
          Linux CLI & System Navigation – working with file structures, permissions, and services
        </li>
        <li>Cloud Security Concepts – KMS, TLS, SSE, IAM roles</li>
        <li>Working with APIs – consuming REST APIs, using HTTP methods and status codes</li>
        <li>Containers & Serverless – Docker, Fargate, Lambda, API Gateway, DynamoDB</li>

        <li>Infrastructure as Code (AWS CDK, Terraform, CloudFormation)</li>
        <li>Cloud Networking Fundamentals – VPCs, subnets, DNS, port config</li>
        <li>Command-Line Fluency – daily use of Linux CLI, Git, AWS CLI, Docker, Terraform</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LearningModal from './modals/LearningModal.vue'
import ProjectsModal from './modals/ProjectsModal.vue'
import KubernetesModal from './modals/KubernetesModal.vue'

const showProjects = ref(false)
const showFocus = ref(false)
const showKubernetes = ref(false)
</script>
