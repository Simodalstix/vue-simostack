<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center px-4 h-dvh overscroll-contain"
    :class="alignment"
    @click.self="$emit('close')"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="bg-gray-700 text-gray-200 p-3 rounded-lg relative shadow-lg overflow-y-auto w-full min-h-0"
      :class="width"
      :style="maxHeightStyle"
      ref="dialogEl"
    >
      <!-- Close button -->
      <button
        class="absolute top-2 right-2 text-xl text-gray-300 hover:text-white"
        @click="$emit('close')"
        aria-label="Close"
      >
        &times;
      </button>

      <div class="min-h-0">
        <slot name="header">
          <h2
            v-if="title && !hideTitleBorder"
            :class="`text-xl font-bold border-b-2 border-slate-500 pb-2 text-center ${titleColor}`"
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
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String,
  titleColor: { type: String, default: 'text-white' },
  width: { type: String, default: 'max-w-md' }, // e.g. 'max-w-4xl'
  height: { type: String, default: '90dvh' }, // viewport-capped height for the dialog
  alignment: { type: String, default: 'items-start' }, // not centered on mobile
  hideTitleBorder: { type: Boolean, default: false },
})
defineEmits(['close'])

const maxHeightStyle = { maxHeight: props.height }

// Reset scroll to top whenever the modal opens
const dialogEl = ref(null)
watch(
  () => props.visible,
  async (open) => {
    if (open) {
      await nextTick()
      if (dialogEl.value) dialogEl.value.scrollTop = 0
    }
  },
)
</script>
