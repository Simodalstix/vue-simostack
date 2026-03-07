<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Cloud-Native Java + RabbitMQ on AKS">
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/java-rabbitmq-aks-diagram.svg"
        alt="Java RabbitMQ AKS Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Microservices demo with Spring Boot and RabbitMQ on AKS. Three services (User CRUD, Order Publisher, Analytics Consumer) with event-driven messaging, DLQ, retry policies. GitHub Actions CI/CD, Helm charts, Prometheus monitoring, and structured logging with correlation IDs.
      </p>
      <a
        href="https://github.com/your-username/java-rabbitmq-aks"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
