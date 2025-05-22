<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Learning Focus">
    <div
      class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-600 gap-6"
    >
      <!-- Column 1 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 p-3">
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">Certifications in Progress</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              Currently focused on Terraform and RHCSA as my primary study goals. I've been living
              inside the Terraform docs and tutorials, wiring it into project after project — and
              I’m finally ready to sit the exam within the next week.
            </p>
            <p>
              Alongside that, I’m steadily progressing through the RHCSA course by Sander van Vugt
              to sharpen my practical Linux skills. Loving it. Genuinely.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3">
          <img src="/images/skills-in-progress/sysops.png" class="h-28 object-contain" />

          <img src="/images/skills-in-progress/azure-admin.png" class="h-28 object-contain" />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 px-2">
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">Target Certifications</h3>
          <div class="text-sm text-gray-300 space-y-3 leading-relaxed">
            <p>
              My priority is landing a Junior Cloud or DevOps role in a strong technical
              environment. I’m not chasing every cert — I’m looking for a role where I can flourish,
              apply what I’ve learned, and build experience.
            </p>
            <p>
              AWS or Google Cloud would be ideal. The next certs I choose will depend on the team I
              join — whether it’s AWS-heavy, Azure-leaning, or GCP-native.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-3 flex-wrap">
          <img src="/images/skills-in-progress/aws-devops.png" class="h-28 object-contain" />
          <img src="/images/skills-in-progress/rhcsa.png" class="h-28 object-contain" />
        </div>
      </div>

      <!-- Column 3 -->
      <div class="flex flex-col items-center text-center justify-between space-y-4 px-2">
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">Exploration</h3>
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
