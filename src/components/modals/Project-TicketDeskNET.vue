<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="TicketDesk API - Production-Ready .NET 8 with Full DevOps Pipeline"
  >
    <!-- Architecture Diagram -->
    <div class="px-4 pt-3 pb-3">
      <img
        src="/images/project-modal-images/ticketdesk-api-architecture.svg"
        alt="TicketDesk API Architecture Diagram"
        class="object-contain rounded-lg w-full"
      />
    </div>

    <!-- Description + GitHub Link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Enterprise ASP.NET Core 8 REST API with PostgreSQL, clean architecture, FluentValidation, and Testcontainers. GitHub Actions CI/CD to Azure App Service with health checks, Prometheus metrics, Serilog structured logging, and OpenAPI/Swagger documentation.
      </p>
      <a
        href="https://github.com/yourusername/Azure-ticketdesk-api.net"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
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
