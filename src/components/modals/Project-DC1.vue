<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Active Directory Integration (DC1 + Linux Realm)"
  >
    <div class="text-gray-200 space-y-4 text-base">
      <!-- Overview -->
      <div class="px-6 pt-2">
        <p class="text-gray-300 leading-relaxed">
          Windows Server 2022 domain controller configured for
          <span class="font-medium text-orange-300">beelink.local</span>, with Linux clients (
          Rocky, Ubuntu) joined via realmd and sssd. Dynamic DNS updates verified through the DC1
          DNS Manager.
        </p>
      </div>

      <!-- Screenshot grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
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

      <!-- Footer -->
      <footer
        class="border-t border-gray-700 px-6 py-3 flex flex-col sm:flex-row justify-between items-center text-gray-300 text-base"
      >
        <div class="sm:w-2/3 text-center sm:text-left leading-snug">
          <span class="font-medium">Scope:</span>
          Demonstrates full Windows–Linux identity integration, including DNS, Kerberos
          authentication, and dynamic record registration.
        </div>

        <button
          disabled
          class="bg-gray-700 text-gray-400 font-medium py-1.5 px-3 rounded-md shadow-sm mt-2 sm:mt-0 cursor-not-allowed"
        >
          Completed Lab
        </button>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
