<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Vault PKI Automation (Ansible + Rocky)"
  >
    <div class="text-gray-200 space-y-3">
      <!-- Image: spans full width -->
      <div class="px-2">
        <img
          src="/images/project-modal-images/vault-pki.png"
          alt="Vault PKI Automation"
          class="object-contain rounded-lg w-full max-h-[70vh] mx-auto"
        />
      </div>

      <!-- Two-column content below image -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-2">
        <!-- Overview -->
        <section>
          <h3 class="font-semibold text-lg text-orange-300 mb-1">Overview</h3>
          <p class="text-gray-300 text-base leading-snug">
            Automated deployment of a HashiCorp Vault PKI on Rocky Linux using Ansible. Includes
            TLS, trusted storage, and a root + intermediate CA setup for issuing internal
            certificates.
          </p>
        </section>

        <!-- Details -->
        <section>
          <h3 class="font-semibold text-lg text-orange-300 mb-1">Details</h3>
          <ul class="list-disc list-inside text-gray-300 text-base space-y-0.5">
            <li>Idempotent playbook handles Vault, TLS, and trust setup.</li>
            <li>PKI hierarchy ready for internal service certificates.</li>
          </ul>
        </section>
      </div>

      <!-- Footer -->
      <footer
        class="border-t border-gray-700 px-4 py-2 flex flex-col sm:flex-row justify-between items-center text-base text-gray-300"
      >
        <div class="sm:w-2/3 text-center sm:text-left">
          <span class="font-medium">Scope:</span>
          Secure Vault PKI via IaC, with headroom for HA and dynamic cert issuance.
        </div>

        <a
          href="https://github.com/Simodalstix/ansible-vault-pki"
          target="_blank"
          class="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-md shadow-sm transition-colors duration-200 mt-2 sm:mt-0"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
