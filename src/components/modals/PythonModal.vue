<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="
PCAP™ – Certified Associate Python Programmer"
    width="max-w-3xl"
    ><div class="bg-gray-700 p-3">
      <p class="text-base text-white mb-2">Issued by Python Institute</p>
      <p class="text-base text-gray-300">
        Earners of the PCAP – Certified Associate Python Programmer badge demonstrate the ability to
        accomplish coding tasks related to the basics of programming in the Python language and the
        fundamental notions and techniques used in object-oriented programming. Becoming PCAP
        certified ensures that the individual is fully acquainted with all the primary means
        provided by Python 3 to enable him to start his own studies, and to open a path to the
        developer’s career.
      </p>
      <div class="mt-4">
        <a
          href="https://www.credly.com/badges/dd32e128-d849-40fa-b39c-e4b77b3480cd"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          → Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
