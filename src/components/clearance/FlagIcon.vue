<template>
  <div class="inline-flex items-center justify-center shrink-0" :title="label">
    <img
      :src="`https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/${code}.svg`"
      :alt="label || code"
      :class="sizeClass"
      class="rounded-full shadow-sm object-cover"
      @error="showFallback = true"
    />
    <!-- Fallback if CDN fails -->
    <span v-if="showFallback" :class="sizeClass"
      class="rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 font-mono font-bold"
      :style="{ fontSize: fallbackFontSize }"
    >{{ code.toUpperCase() }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  code:  { type: String, required: true },   // ISO 3166-1 alpha-2 lowercase
  label: { type: String, default: '' },
  size:  { type: String, default: 'md' },    // xs | sm | md | lg | xl
})

const showFallback = ref(false)

const sizeClass = computed(() => ({
  xs: 'w-10 h-10',
  sm: 'w-10 h-10',
  md: 'w-11 h-11',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
}[props.size] || 'w-11 h-11'))

const fallbackFontSize = computed(() => ({
  xs: '11px',
  sm: '11px',
  md: '12px',
  lg: '13px',
  xl: '14px',
}[props.size] || '12px'))
</script>
