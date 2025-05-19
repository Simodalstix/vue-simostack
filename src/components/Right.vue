<template>
  <div class="space-y-4">
    <!-- Section 1 -->
    <div class="bg-gray-700 rounded-lg p-4 shadow">
      <h3 class="text-lg font-semibold text-purple-300 mb-2">Section Title</h3>
      <p class="text-sm text-gray-300">
        This is a paragraph of text inside the section. You can include more content here.
      </p>
    </div>

    <!-- Section 2 -->
    <div class="bg-gray-700 rounded-lg p-4 shadow">
      <h3 class="text-lg font-semibold text-purple-300 mb-2">Another Section</h3>
      <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
    </div>

    <!-- Optional Button -->
    <div class="text-center">
      <button
        class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded transition"
        @click="emitAction"
      >
        Action Button
      </button>
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
