<script setup>
defineProps({
  visible: Boolean,
})
defineEmits(['close'])

import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Target Certs: AWS DevOps & RHCSA Study Details"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-3 rounded">
      <p class="text-base text-white mb-4">
        An overview of my current study plans and progress toward the AWS Certified DevOps Engineer
        – Professional and Red Hat Certified System Administrator (RHCSA) certifications.
      </p>

      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-bold text-indigo-500 mb-2">
            AWS Certified DevOps Engineer – Professional
          </h3>
          <ul class="list-disc list-inside text-gray-300 ml-4 space-y-1">
            <li>
              <span class="font-semibold">Status:</span> 67% through my content — really enjoying
              GuardDuty, Control Tower, Config, and SSM. Encountering the “tricks and traps” that
              come with real AWS environments.
            </li>
            <li>
              <span class="font-semibold">Learning Focus:</span> Taking time to understand how AWS
              environments work at the organizational level, especially around automating compliance
              and security. Focusing on which services or aggregators to use for troubleshooting
              different issues.
            </li>
            <li>
              <span class="font-semibold">Resources:</span> A Cloud Guru, Stephane Maarek’s Udemy
              course, AWS documentation, hands-on labs, and Whizlabs for review.
            </li>
            <li>
              <span class="font-semibold">Key Areas:</span> Automation, CI/CD, monitoring & logging,
              security, high availability, fault tolerance, disaster recovery, and operational
              gotchas.
            </li>
            <li><span class="font-semibold">Expected Completion:</span> Q3 2025</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-bold text-indigo-500 mb-2">
            Red Hat Certified System Administrator (RHCSA)
          </h3>
          <ul class="list-disc list-inside text-gray-300 ml-4 space-y-1">
            <li>
              <span class="font-semibold">Status:</span> Already familiar with Linux — already 25%
              through Sander's content, covering CLI, user/group management, and systemd.
            </li>
            <li>
              <span class="font-semibold">Resources:</span> Sander van Vugt’s on-demand course
              (O’Reilly), official Red Hat docs, WSL for daily work, and Ubuntu/RHEL VMs in VMware
              for practice.
            </li>
            <li>
              <span class="font-semibold">Key Areas:</span> System and file management, software
              installation (dnf/yum), network setup, user/group administration, and basic security.
            </li>
            <li><span class="font-semibold">Expected Completion:</span> Q4 2025</li>
          </ul>
        </div>

        <p class="text-base text-gray-300 mt-4">Just a matter of time</p>
      </div>
    </div>
  </BaseModal>
</template>
