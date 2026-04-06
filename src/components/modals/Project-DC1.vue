<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Active Directory Integration (DC1 + Linux Realm)"
  >
    <!-- Screenshots -->
    <div class="px-4 pt-3 pb-3">
      <div class="grid grid-cols-2 gap-3">
        <img
          src="/images/project-modal-images/ad-servermanager.png"
          alt="Server Manager showing domain configuration"
          class="rounded-lg shadow-md w-full object-contain"
        />
        <img
          src="/images/project-modal-images/ad-aduc.png"
          alt="Active Directory Users and Computers showing Linux VMs"
          class="rounded-lg shadow-md w-full object-contain"
        />
        <img
          src="/images/project-modal-images/ad-dns.png"
          alt="DNS Manager showing A records for realm-joined VMs"
          class="rounded-lg shadow-md w-full object-contain"
        />
        <img
          src="/images/project-modal-images/ad-realm.png"
          alt="Linux realm list output verifying domain join"
          class="rounded-lg shadow-md w-full object-contain"
        />
      </div>
    </div>

    <!-- Description -->
    <div class="px-4 pb-4">
      <p class="text-base text-gray-300 leading-relaxed">
        <span class="text-cyan-300">Windows Server 2022</span> domain controller for
        <span class="text-cyan-300">beelink.local</span>, with Linux clients (Rocky, Ubuntu)
        joined via <span class="text-cyan-300">realmd</span> and
        <span class="text-cyan-300">sssd</span>. Dynamic DNS,
        <span class="text-cyan-300">Kerberos</span> authentication, and cross-platform identity
        integration verified through the DC1 DNS Manager and
        <span class="text-cyan-300">Active Directory Users & Computers</span>.
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
