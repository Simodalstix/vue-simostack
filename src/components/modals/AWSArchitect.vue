<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Certified Solutions Architect – Associate"
    width="max-w-3xl"
    ><div class="bg-gray-700 p-3 rounded">
      <p class="text-sm text-gray-300 mb-2">
        Issued by Amazon Web Services Training and Certification
      </p>
      <p class="text-sm text-gray-300">
        Earners of this certification have a comprehensive understanding of AWS services and
        technologies. They demonstrated the ability to design secure and robust solutions using
        architectural design principles based on customer requirements. Certification holders can
        strategically design well-architected distributed systems that are scalable, resilient,
        efficient, and fault-tolerant.
        <a
          href="https://www.credly.com/badges/7eea6cbf-d1ac-4006-b031-896c63f04041"
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
