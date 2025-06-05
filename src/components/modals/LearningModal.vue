<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Learning/Certifications">
    <div
      class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-purple-600 gap-6"
    >
      <!-- Column 1 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 pr-4">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Certifications in Progress</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              I'm currently focused on earning the Microsoft Azure Administrator (AZ-104)
              certification, with the goal of building fluency in Azure resource management,
              networking, identity, and governance. Azure is now my primary focus, and I'm on track
              to sit the exam soon.
            </p>
            <p>
              Alongside this, I'm gradually preparing for the AWS SysOps Administrator certification
              to reinforce my foundation in AWS operations and monitoring. It's running in the
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
      <div class="flex flex-col items-center text-center justify-between space-y-4 pl-4">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Target Certifications</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              My long-term ambition is to become highly proficient in DevOps and cloud platform
              engineering — the kind of work that focuses on reliability, automation, scalability,
              and secure infrastructure. I'm actively building real-world skills in system
              orchestration, infrastructure automation, and incident response.
            </p>
            <p>
              This includes designing resilient deployments, automating with tools like Terraform
              and Ansible, and implementing monitoring practices using Azure Monitor and Dynatrace.
              My goal is to become the kind of engineer teams rely on when stability and uptime
              matter most.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3 flex-wrap">
          <img src="/images/skills-in-progress/aws-devops.png" class="h-28 object-contain" />
          <img src="/images/skills-in-progress/azure-devops.png" class="h-28 object-contain" />
          <img src="/images/skills-in-progress/rhcsa.png" class="h-28 object-contain" />
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
