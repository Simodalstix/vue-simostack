<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="AWS Multiregion E-commerce Platform">
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Main Content: Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/AWS-multiregion-ecommerce.png"
          alt="AWS Multiregion Ecommerce Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right-Hand Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Key Features</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Multi-Region High Availability</li>
            <li>Global Data Replication (DynamoDB & S3)</li>
            <li>Serverless Architecture</li>
            <li>Infrastructure as Code (AWS CDK)</li>
            <li>Automated Failover (Manual Trigger)</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-2 text-orange-300">Technologies Used</h3>
          <ul class="list-disc list-inside space-y-1 text-base">
            <li>Cloud: AWS</li>
            <li>IaC: AWS CDK (Python)</li>
            <li>Services: API Gateway, Lambda, DynamoDB, S3, Code-Pipeline</li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Footer -->
    <footer class="border-t border-gray-700 p-4 flex justify-between items-center text-sm">
      <p class="text-gray-400 italic w-2/3">
        A resilient, scalable e-commerce architecture leveraging multi-region AWS infrastructure,
        IaC, and automation. Core services are provisioned using AWS CDK (Python).
      </p>
      <a
        href="https://github.com/Simodalstix/AWS-multiregion-ecommerce"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
      >
        View on GitHub
      </a>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
