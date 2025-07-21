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
    title="Target Certs: AWS DevOps & RHCSA"
    width="max-w-2xl"
  >
    <div class="bg-gray-700 p-3 rounded space-y-5">
      <p class="text-base text-white mb-2">Certifications in Progress</p>

      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-bold text-indigo-400 mb-1">AWS DevOps Engineer – Professional</h3>
          <ul class="list-disc list-inside text-gray-300 ml-4 space-y-0.5">
            <li>
              <b>Status:</b> 76% complete - now in exam prep (Early Q3 2025 target) paused until
              RHCSA finished
            </li>
            <li><b>Focus:</b> Automation, CI/CD, IaC, monitoring, and resilience</li>
            <li><b>Motivation:</b> Deepen expertise for real-world, enterprise AWS</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold text-indigo-400 mb-1">
            Red Hat Certified System Administrator (RHCSA)
          </h3>
          <ul class="list-disc list-inside text-gray-300 ml-4 space-y-0.5">
            <li>
              <b>Status:</b> 81% complete (Aiming to sit exam in August), actively doing practice
              exams
            </li>
            <li><b>Focus:</b> Linux systems, partitions, mounts, Systemd networking, SELinux</li>
            <li><b>Motivation:</b> Prove hands-on Linux admin ability for platform roles</li>
          </ul>
        </div>
      </div>

      <p class="text-sm text-gray-400 mt-2">
        “We are what we repeatedly do. Excellence, then, is not an act but a habit.”
      </p>
    </div>
  </BaseModal>
</template>
