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
      <p class="text-sm text-gray-300 mb-2">Issued by Python Institute</p>
      <p class="text-sm text-gray-300">
        Earners of the PCAP – Certified Associate Python Programmer badge demonstrate the ability to
        accomplish coding tasks related to the basics of programming in the Python language and the
        fundamental notions and techniques used in object-oriented programming. Becoming PCAP
        certified ensures that the individual is fully acquainted with all the primary means
        provided by Python 3 to enable him to start his own studies, and to open a path to the
        developer’s career.
        <a
          href="https://www.credly.com/badges/dd32e128-d849-40fa-b39c-e4b77b3480cd"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan-400 hover:text-cyan-300 underline block mt-3"
        >
          → Verify Certification on Credly
        </a>
      </p>
    </div>
  </BaseModal>
</template>
