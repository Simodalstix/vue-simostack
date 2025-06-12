<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Learning/Certifications">
    <div
      class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-purple-600 gap-6"
    >
      <!-- Column 1 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 pr-4">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Certifications in Progress</h3>
          <div class="text-base text-gray-300 space-y-3 leading-relaxed">
            <p>
              My Azure Administrator (AZ-104) study is complete — concepts learned, skills applied,
              and I’m ready to sit the exam within the next week. This covered resource management,
              networking, identity, and governance in production-style deployments.
            </p>
            <p>
              I’m now shifting focus to the AWS DevOps Engineer certification to deepen my
              understanding of CI/CD pipelines, automation workflows, and multi-service
              orchestration across cloud platforms.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3">
          <img src="/images/skills-in-progress/aws-devops.png" class="h-28 object-contain" />
          <img src="/images/skills-in-progress/azure-admin.png" class="h-28 object-contain" />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 pl-4">
        <div>
          <h3 class="text-lg font-semibold text-white m-3">Target Certifications</h3>
          <div class="text-base text-gray-300 space-y-3 leading-relaxed">
            <p>
              My long-term goal is to become highly proficient in DevOps and platform engineering —
              focused on reliability, automation, scalability, and secure infrastructure design. I’m
              actively sharpening real-world skills in system orchestration, configuration
              management, and incident response.
            </p>
            <p>
              Earning the RHCSA certification is a key milestone on this path. Azure DevOps
              certification remains on my radar if it's relevant to future team environments. I’m
              continuing to build expertise through tools like Ansible, Terraform, and
              enterprise-ready monitoring stacks across hybrid infrastructure.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3 flex-wrap">
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
