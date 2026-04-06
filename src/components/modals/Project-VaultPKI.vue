<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Vault PKI Automation (Ansible + Rocky)"
  >
    <!-- Screenshots -->
    <div class="px-4 pt-3 pb-3">
      <div class="grid grid-cols-2 gap-3">
        <img
          src="/images/project-modal-images/vault-pki-ansible.png"
          alt="Vault PKI Ansible playbook output"
          class="object-contain rounded-lg w-full"
        />
        <img
          src="/images/project-modal-images/vault-pki-output.png"
          alt="Vault console output"
          class="object-contain rounded-lg w-full"
        />
      </div>
    </div>

    <!-- Description + GitHub -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-gray-300 leading-relaxed flex-1">
        Automated deployment of <span class="text-cyan-300">HashiCorp Vault</span> PKI on
        Rocky Linux using <span class="text-cyan-300">Ansible</span>.
        <span class="text-cyan-300">Root + intermediate CA</span> hierarchy for issuing
        internal certificates, with <span class="text-cyan-300">TLS</span> and trusted storage
        configured. Idempotent playbook handles full Vault, TLS, and trust setup end-to-end.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-vault-pki"
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
