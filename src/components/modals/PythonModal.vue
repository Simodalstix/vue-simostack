<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="PCAP: Certified Associate Python Programmer"
    width="max-w-3xl"
  >
    <div class="bg-gray-700 p-4 rounded">
      <p class="text-base text-white mb-3">Validates the ability to write, analyse, and reason about Python code, covering control flow, data structures, functions, OOP, and exception handling.</p>
      <ul class="text-base text-gray-300 space-y-1.5 mb-4 list-disc list-inside">
        <li>Control flow logic, iterators, generators, and list comprehensions</li>
        <li>Object-oriented programming with inheritance, polymorphism, and encapsulation</li>
        <li>String processing, file I/O, and structured exception handling</li>
        <li>Modules, packages, and the Python standard library for real-world scripting</li>
      </ul>
      <p class="text-sm text-slate-400 italic mb-4">In an era of AI-generated code, formally understanding how logic executes, not just what to prompt, is what separates engineers who can debug, extend, and trust what they ship.</p>
      <div>
        <a
          href="https://www.credly.com/badges/dd32e128-d849-40fa-b39c-e4b77b3480cd"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
