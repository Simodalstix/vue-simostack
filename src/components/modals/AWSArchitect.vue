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
      <p class="text-base text-white mb-2">
        Issued by Amazon Web Services Training and Certification
      </p>
      <p class="text-base text-gray-300">
        Earners of this certification have a comprehensive understanding of AWS services and
        technologies. They demonstrated the ability to design secure and robust solutions using
        architectural design principles based on customer requirements. Certification holders can
        strategically design well-architected distributed systems that are scalable, resilient,
        efficient, and fault-tolerant.
      </p>
      <div class="mt-4">
        <a
          href="https://www.credly.com/badges/7eea6cbf-d1ac-4006-b031-896c63f04041"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
