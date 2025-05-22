<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Learning Focus">
    <div
      class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-600 gap-6"
    >
      <!-- Column 1 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 p-1">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Certifications in Progress</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              I'm currently focused on earning the Microsoft Azure Administrator (AZ-104)
              certification, with the goal of building fluency in Azure resource management,
              networking, identity, and governance. Azure is now my primary focus, and I’m on track
              to sit the exam soon.
            </p>
            <p>
              Alongside this, I’m gradually preparing for the AWS SysOps Administrator certification
              to reinforce my foundation in AWS operations and monitoring. It’s running in the
              background while I go deep on Azure.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3">
          <img src="/images/skills-in-progress/sysops.png" class="h-28 object-contain" />

          <img src="/images/skills-in-progress/azure-admin.png" class="h-28 object-contain" />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 p-1">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Target Certifications</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              My long-term ambition is to become highly proficient in DevOps and cloud platform
              engineering — work that requires orchestration, resilience, automation, and
              scalability.
            </p>
            <p>
              I'm intentionally building skill in real-world infrastructure challenges: designing
              deployments, managing production issues, and automating infrastructure with tools like
              Terraform, Kubernetes, and Helm. My goal is to be the kind of engineer teams rely on
              when things get tough.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3 flex-wrap">
          <img src="/images/skills-in-progress/aws-devops.png" class="h-28 object-contain" />
          <img src="/images/skills-in-progress/rhcsa.png" class="h-28 object-contain" />
        </div>
      </div>

      <!-- Column 3 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 p-1">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Exploration</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              My goal is to become deeply skilled in DevOps and cloud platform engineering — the
              kind of work that involves orchestration, resilience, automation, and scalability.
            </p>
            <p>
              I want to build fluency in the real challenges modern teams face: infrastructure
              design, deployment, debugging production issues. I want to be the engineer teams trust
              when things get complex.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3">
          <img src="/images/skills-in-progress/kubernetes.svg" class="h-28 object-contain" />
          <img src="/images/k8s-icons/helm2.png" class="h-28 object-contain" />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
