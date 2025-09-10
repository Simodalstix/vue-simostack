<template>
  <BaseModal 
    :visible="visible" 
    @close="$emit('close')" 
    title="AWS Foundation Platform"
    width="max-w-6xl"
    height="85vh"
  >
    <div class="flex flex-col lg:flex-row gap-6 mt-4">
      <!-- Main diagram -->
      <div class="lg:w-2/3">
        <img
          src="/images/project-modal-images/enterprise-landingzone-diagram.svg"
          alt="AWS Enterprise Architecture"
          class="w-full h-auto rounded-lg border border-slate-600"
        />
      </div>

      <!-- Technical sidebar -->
      <div class="lg:w-1/3 bg-slate-800 rounded-lg p-4 space-y-4">
        <div>
          <h3 class="text-lg font-bold text-cyan-300 mb-3">Stack Overview</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-300">Foundation</span>
              <span class="text-gray-400">8 stacks</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-300">Container</span>
              <span class="text-gray-400">6 stacks</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-300">Serverless</span>
              <span class="text-gray-400">5 stacks</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-bold text-cyan-300 mb-3">Implementation</h3>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• CDK Python with Poetry</li>
            <li>• Multi-account organization</li>
            <li>• GitOps deployment</li>
            <li>• Automated testing</li>
          </ul>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue'

defineProps({
  visible: Boolean,
})

defineEmits(['close'])
</script>
