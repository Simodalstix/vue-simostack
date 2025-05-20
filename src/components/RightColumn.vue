<template>
  <div class="bg-gray-800 p-6 rounded shadow flex flex-col justify-between h-full">
    <!-- TOP BLOCK: heading + icons -->
    <div>
      <h2 class="text-xl font-semibold text-center border-b-2 border-indigo-500 pb-1 mb-4">
        Certifications
      </h2>
      <div class="flex flex-col items-center space-y-4">
        <img
          src="/images/certifications/python-associate.png"
          alt="python-associate"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          onclick="openModal('pythonModal')"
        />
        <img
          src="/images/certifications/Solutions_Architect.png"
          alt="Solutions Architect"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          onclick="openModal('architectModal')"
        />
        <img
          src="/images/certifications/Developer.png"
          alt="Developer"
          class="w-36 hover:border-2 hover:border-indigo-500 transition rounded cursor-pointer"
          onclick="openModal('developerModal')"
        />
      </div>
    </div>

    <!-- BOTTOM BLOCK: visitor count -->
    <div class="text-sm text-gray-400 text-center">
      Visited
      <span id="visitor-count" class="font-bold text-purple-400">?</span>
      times.
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColumnPanel',
  emits: ['action'], // This defines the custom event
  methods: {
    emitAction() {
      this.$emit('action') // Emit event to parent when button is clicked
    },
  },
}
</script>
