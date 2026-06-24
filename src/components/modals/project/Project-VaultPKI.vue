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
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Automated deployment of <span class="text-ob-teal-bright">HashiCorp Vault</span> PKI on
        Rocky Linux using <span class="text-ob-teal-bright">Ansible</span>.
        <span class="text-ob-teal-bright">Root + intermediate CA</span> hierarchy for issuing
        internal certificates, with <span class="text-ob-teal-bright">TLS</span> and trusted storage
        configured. Idempotent playbook handles full Vault, TLS, and trust setup end-to-end.
      </p>
      <a
        href="https://github.com/Simodalstix/ansible-vault-pki"
        target="_blank"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
