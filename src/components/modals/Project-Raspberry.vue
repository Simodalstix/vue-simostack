<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Raspberry Pi Backend API — Node.js + Docker"
  >
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <img
          src="/images/project-modal-images/rasp-api-image.jpg"
          alt="Raspberry Pi Backend Architecture"
          class="object-contain rounded-lg w-full"
        />
      </div>

      <!-- Right: Description + Decisions -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-orange-300">Description</h3>
          <p class="text-base text-gray-300">
            Self‑hosted Node.js/Express API on a Raspberry Pi. Docker Compose runs the API and
            PostgreSQL; GitHub Actions builds and ships containers, then deploys over SSH with
            environment secrets.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-orange-300">Key decisions &amp; trade‑offs</h3>
          <p class="text-base text-gray-300">
            Chose Docker Compose over Kubernetes—lighter, faster to iterate on a single Pi. Picked
            SSH‑based deploys for simplicity; trades off blue/green and rollout controls. PostgreSQL
            for durability vs. file‑based stores at the cost of more setup.
          </p>
        </div>
        <div>
          <h3 class="font-bold text-lg text-orange-300">Planned expansion</h3>

          <p class="text-base text-gray-300">
            Prometheus + Grafana for metrics, and Loki for logs, writing to a mounted USB drive to
            keep SD card wear low.
          </p>
        </div>
      </aside>
    </div>

    <!-- Row: Reliability, Cost, Observability -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Reliability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Compose restart policy; healthcheck endpoint.</li>
          <li>Arm‑compatible images; pinned versions.</li>
          <li>DB in private network; named volumes.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Cost</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Runs on a single Pi; minimal infra.</li>
          <li>Builds via GitHub Actions free tier (limits apply).</li>
          <li>No managed services—more ops, lower spend.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-orange-300">Observability</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>App & DB logs via Docker (docker logs).</li>
          <li>Request logging middleware; `/health` probe.</li>
          <li>Basic alerts possible via GitHub Actions status.</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem &amp; scope:</span>
        Serve dynamic content from a Pi with a containerized API and simple CI/CD—small,
        reproducible, and easy to tinker with at home.
      </div>

      <a
        href="https://github.com/Simodalstix/raspberry-pi-backend"
        target="_blank"
        class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
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
