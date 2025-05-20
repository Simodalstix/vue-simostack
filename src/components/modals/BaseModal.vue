<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-gray-800 text-gray-200 p-6 rounded relative shadow-lg overflow-y-auto"
      :class="modalClasses"
      :style="maxHeightStyle"
    >
      <!-- Close button -->
      <button
        class="absolute top-2 right-2 text-xl text-gray-300 hover:text-white"
        @click="$emit('close')"
      >
        &times;
      </button>

      <!-- Optional Title -->
      <h2 v-if="title" class="text-xl font-bold border-b-2 border-indigo-500 pb-1 mb-4">
        {{ title }}
      </h2>

      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  title: String,
  width: {
    type: String,
    default: 'max-w-md', // you can override with e.g. 'max-w-4xl'
  },
  height: {
    type: String,
    default: 'max-h-[90vh]',
  },
  alignment: {
    type: String,
    default: 'items-center', // or 'items-start'
  },
});

defineEmits(['close']);

const modalClasses = `${props.width} w-full ${props.alignment}`;
const maxHeightStyle = { maxHeight: props.height };
</script>
