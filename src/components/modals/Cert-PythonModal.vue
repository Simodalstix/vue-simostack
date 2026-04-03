<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    bgColor="bg-[#D6E3F1]"
    borderClass="border border-[#C7D9EC]"
    width="max-w-3xl"
    :hideTitleBorder="true"
  >
    <template #header>
      <div class="px-2 pt-2 pb-4">
        <h2 class="text-xl font-bold text-gray-900">PCAP: Certified Associate Python Programmer</h2>
        <div class="h-0.5 bg-[#3776AB] mt-3 rounded-full"></div>
      </div>
    </template>
    <div class="bg-[#F8FBFF] p-5 rounded border border-[#C7D9EC]">
      <p class="text-base text-gray-800 mb-3">Validates the ability to write, analyse, and reason about Python code, covering control flow, data structures, functions, OOP, and exception handling.</p>
      <ul class="text-base text-gray-600 space-y-1.5 mb-4 list-disc list-inside">
        <li>Control flow logic, iterators, generators, and list comprehensions</li>
        <li>Object-oriented programming with inheritance, polymorphism, and encapsulation</li>
        <li>String processing, file I/O, and structured exception handling</li>
        <li>Modules, packages, and the Python standard library for real-world scripting</li>
      </ul>
      <p class="text-sm text-gray-400 italic mb-4">In an era of AI-generated code, formally understanding how logic executes, not just what to prompt, is what separates engineers who can debug, extend, and trust what they ship.</p>
      <div>
        <a
          href="https://www.credly.com/badges/dd32e128-d849-40fa-b39c-e4b77b3480cd"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-[#3776AB] hover:bg-[#2D6291] text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
        >
          Verify Certification on Credly
        </a>
      </div>
    </div>
  </BaseModal>
</template>
