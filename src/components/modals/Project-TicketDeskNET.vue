<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="TicketDesk API - Production-Ready .NET 8 with Full DevOps Pipeline"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/ticketdesk-api-architecture.svg"
          alt="TicketDesk API Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Enterprise-grade ASP.NET Core 8 REST API with PostgreSQL, implementing clean
            architecture patterns. Features comprehensive validation, observability, automated
            testing with Testcontainers, and production-ready CI/CD pipeline deploying to Azure App
            Service via GitHub Actions.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Technical Decisions</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose .NET 8 for performance and enterprise adoption in Australian market. PostgreSQL
              for ACID compliance and scalability. FluentValidation for maintainable business rules.
              Testcontainers for realistic integration testing without mocking database
              interactions.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Development Practices, Architecture, Production -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Development Practices</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Clean Architecture: Controllers → Validators → Models → Data</li>
          <li>SOLID Principles: Single responsibility, dependency injection</li>
          <li>Test Pyramid: Unit tests for validators, integration for APIs</li>
          <li>Code Quality: FluentValidation, nullable reference types</li>
          <li>Documentation: OpenAPI/Swagger with example payloads</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Enterprise Features</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Database: EF Core migrations, constraints, indexes</li>
          <li>Validation: RFC 7807 problem details, detailed error responses</li>
          <li>Security: Input validation, SQL injection prevention</li>
          <li>Performance: Async/await, pagination, connection pooling</li>
          <li>Containerization: Multi-stage Docker builds</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability & DevOps</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Health Checks: /healthz with PostgreSQL connectivity</li>
          <li>Metrics: Prometheus /metrics with HTTP counters</li>
          <li>Logging: Serilog structured JSON with request IDs</li>
          <li>CI/CD: GitHub Actions with automated testing</li>
          <li>Deployment: Docker to Azure App Service with zero downtime</li>
        </ul>
      </div>
    </div>

    <!-- Footer: scope + links -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 space-y-2">
        <div class="text-gray-300">
          <span class="font-medium">Problem & scope:</span>
          Demonstrate modern .NET development practices for Australian enterprise market. Showcases
          clean architecture, comprehensive testing strategies, production observability, and
          automated deployment pipelines. Built to highlight skills in demand: .NET Core,
          PostgreSQL, Docker, Azure, and DevOps automation.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/yourusername/Azure-ticketdesk-api.net"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://your-ticketdesk-api.azurewebsites.net/swagger"
          target="_blank"
          class="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Live API Docs
        </a>
      </div>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
