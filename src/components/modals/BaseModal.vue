<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center px-4"
    :class="alignment"
    @click.self="$emit('close')"
  >
    <div
      class="bg-gray-700 text-gray-200 p-3 rounded relative shadow-lg overflow-y-auto w-full"
      :class="width"
      :style="maxHeightStyle"
    >
      <!-- Close button -->
      <button
        class="absolute top-2 right-2 text-xl text-gray-300 hover:text-white"
        @click="$emit('close')"
      >
        &times;
      </button>
      <div>
        <slot name="header">
          <h2
            v-if="title"
            :class="`text-xl font-bold border-b-2 border-slate-500 pb-2  text-center ${titleColor}`"
          >
            {{ title }}
          </h2>
        </slot>

        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  title: String,
  titleColor: {
    type: String,
    default: 'text-white',
  },
  width: {
    type: String,
    default: 'max-w-md', // e.g. 'max-w-4xl'
  },
  height: {
    type: String,
    default: 'max-h-[90vh]',
  },
  alignment: {
    type: String,
    default: 'items-center', // or 'items-start'
  },
})

defineEmits(['close'])

const maxHeightStyle = { maxHeight: props.height }
</script>
