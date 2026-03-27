<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center px-4 h-dvh overflow-hidden overscroll-none items-start md:items-center"
      :class="alignment"
      @click.self="$emit('close')"
      aria-modal="true"
      role="dialog"
    >
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="visible"
          class="text-gray-200 p-4 rounded-xl relative shadow-2xl overflow-y-auto w-full min-h-0 overscroll-contain max-h-[90dvh] md:max-h-none scrollbar-thin"
          :class="[width, bgColor, borderClass]"
          :style="maxHeightStyle"
        >
          <!-- Close button -->
          <button
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
            @click="$emit('close')"
            aria-label="Close"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
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
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  title: String,
  titleColor: { type: String, default: 'text-white' },
  borderClass: { type: String, default: '' },
  bgColor: { type: String, default: 'bg-gray-700' },
  width: { type: String, default: 'max-w-md' },
  height: { type: String, default: '90dvh' },
  alignment: { type: String, default: '' },
  hideTitleBorder: { type: Boolean, default: false },
})
defineEmits(['close'])

const maxHeightStyle = { maxHeight: props.height }
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
