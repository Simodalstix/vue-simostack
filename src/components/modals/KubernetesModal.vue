<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Kubernetes" width="max-w-3xl">
    <div class="bg-gray-700 p-3">
      <p class="italic text-sm text-center text-gray-400 mb-4">
        "I choose to learn Kubernetes not because it is easy, but because it is hard." – JFK
        (probably)
      </p>

      <!-- Two-column grid for content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Column 1: Learning Journey -->
        <div class="text-gray-300 text-sm leading-relaxed">
          <p class="mb-4">
            I'm starting to explore Kubernetes gradually, using a hands-on project-based course as a
            reference. It's early days, but I’m getting more familiar with the concepts—especially
            how container orchestration, services, and deployment models work together.
          </p>
          <p class="mb-4">
            I’ve set up a clean environment with Devbox and have been poking around with some of the
            core tools. I’m not in a rush—Kubernetes is complex, and I’m balancing this learning
            with certifications and other higher-priority projects. My approach is to build a solid
            understanding at a sustainable pace.
          </p>
          <p>
            This Kubernetes lab acts as a side project and a learning sandbox, where I can test
            ideas, build fluency, and gradually connect the dots between infrastructure, delivery
            pipelines, and application configuration.
          </p>
          <div class="mt-6 text-sm text-cyan-400 text-left">
            <a
              href="https://www.youtube.com/watch?v=2T86xAtR6Fo"
              target="_blank"
              class="block hover:underline"
            >
              Youtube Course Link
            </a>
          </div>
        </div>

        <!-- Column 2: Tool Highlights -->
        <div class="text-gray-300 text-sm leading-relaxed">
          <h3 class="text-lg font-semibold text-white mb-2">Tools I'm Learning</h3>
          <ul class="list-disc list-inside space-y-2">
            <li>
              <strong>Kubernetes:</strong> Understanding clusters, deployments, and services from
              the ground up
            </li>
            <li><strong>Helm:</strong> Learning to manage reusable application charts</li>
            <li><strong>K9s:</strong> Navigating and observing the cluster from the terminal</li>
            <li><strong>kubectl:</strong> Getting hands-on with the core command-line interface</li>
            <li><strong>Kustomize:</strong> Managing config overlays for different environments</li>
            <li><strong>Devbox:</strong> Creating a reproducible and clean tooling setup</li>
            <li>
              <strong>Tilt:</strong> Accelerating local Kubernetes development by managing live
              updates and feedback loops
            </li>
            <li>
              <strong>Trivy:</strong> Scanning container images and configs for vulnerabilities and
              misconfigurations
            </li>
          </ul>
          <div class="mt-6 text-sm text-cyan-400 space-y-2 text-left">
            <a
              href="https://github.com/DevOpsDirective/devops-directive-kubernetes-course"
              target="_blank"
              class="block hover:underline"
            >
              GitHub – Course Repo by DevOps Directive
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Icon Row -->
      <div class="border-t-2 border-purple-600 pt-3 mt-2">
        <div class="flex flex-wrap justify-center items-center gap-4">
          <img src="/images/k8s-icons/kubernetes.svg" alt="Kubernetes" class="w-24 h-24" />
          <img src="/images/k8s-icons/helm2.png" alt="Helm" class="w-24 h-24" />
          <img
            src="/images/k8s-icons/tilt.png"
            alt="Tilt"
            class="h-16 max-w-[7rem] object-contain"
          /><img src="/images/k8s-icons/trivy.svg" alt="Trivy" class="h-24 object-contain" /><img
            src="/images/k8s-icons/cloudnative-pg.png"
            alt="Cloud Native PostgresSQL"
            class="h-24 object-contain white p-1"
          />
          <img src="/images/k8s-icons/kluctl.png" alt="Kluctl" class="h-24 object-contain" />
          <img
            src="/images/k8s-icons/jetify2.jpeg"
            alt="Devbox (Jetpack)"
            class="h-24 object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  </BaseModal>
</template>
