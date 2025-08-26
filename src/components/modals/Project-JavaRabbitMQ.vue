<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Cloud-Native Java + RabbitMQ on AKS">
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4 flex flex-col">
        <img
          src="/images/project-modal-images/java-rabbitmq-aks-diagram.svg"
          alt="Java RabbitMQ AKS Architecture Diagram"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Key decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Production-flavored microservices demo showcasing Java Spring Boot services with
            RabbitMQ messaging on Azure Kubernetes Service. Includes observability, CI/CD, and
            comprehensive learning materials for cloud-native development patterns.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions & trade-offs</h3>
          <div class="text-sm text-gray-300 space-y-3">
            <p class="text-base text-gray-300">
              Chose Spring Boot for rapid development over raw Java, accepting framework overhead
              for productivity. RabbitMQ over Kafka for simpler ops and lower resource usage. AKS
              over self-managed K8s for reduced operational burden.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- New Row: Architecture, Development, Operations -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Architecture</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>3 microservices: User (CRUD), Order (Publisher), Analytics (Consumer)</li>
          <li>Event-driven: RabbitMQ with DLQ and retry policies</li>
          <li>12-factor: Config via env vars, stateless containers</li>
          <li>SRP: Each service owns single bounded context</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Development</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Local: Docker Compose for PostgreSQL + RabbitMQ</li>
          <li>Java: Spring Boot + Maven + JPA/Hibernate</li>
          <li>Python: FastAPI consumer with Prometheus metrics</li>
          <li>Testing: JUnit for Java, pytest for Python</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Operations</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>CI/CD: GitHub Actions with GHCR registry</li>
          <li>K8s: Helm charts, NGINX Ingress, health probes</li>
          <li>Monitoring: Prometheus + Grafana dashboards</li>
          <li>Observability: Structured logs, correlation IDs</li>
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
          Demonstrate cloud-native Java microservices with async messaging, containerization, and
          Kubernetes orchestration. Portfolio-ready project with comprehensive learning materials
          for developers new to distributed systems.
        </div>
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/your-username/java-rabbitmq-aks"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://spring.io/guides/gs/messaging-rabbitmq/"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          Spring Guide
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
