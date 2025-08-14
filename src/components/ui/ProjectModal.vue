<!-- ProjectModal.vue -->
<template>
  <BaseModal :visible="visible" @close="$emit('close')" :width="width" :height="height">
    <!-- HEADER -->
    <div class="space-y-3">
      <div class="flex items-start gap-4">
        <img v-if="hero" :src="hero" alt="" class="h-10 w-10 rounded-xl object-cover" />
        <div class="min-w-0">
          <h2 class="text-xl font-semibold leading-tight truncate text-white">{{ title }}</h2>
          <p v-if="subtitle" class="text-sm text-gray-300 mt-0.5">{{ subtitle }}</p>
        </div>
      </div>

      <!-- TABS (optional) -->
      <div v-if="tabs && tabs.length" class="border-b border-gray-700">
        <nav class="-mb-px flex flex-wrap gap-2">
          <button
            v-for="t in tabs"
            :key="t.key"
            @click="active = t.key"
            class="px-3 pb-2 text-sm rounded-t-md"
            :class="
              active === t.key
                ? 'border-b-2 border-white font-medium text-white'
                : 'text-gray-400 hover:text-gray-200'
            "
          >
            {{ t.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- MAIN CONTENT (two columns; steady dimensions) -->
    <!-- BaseModal already caps overall height via :height (e.g. max-h-[92vh]) and makes the body scrollable. -->
    <!-- We cap inner elements so the layout stays consistent across tabs. -->
    <div class="mt-4 grid md:grid-cols-3 gap-6">
      <!-- LEFT: image/screenshot area (2/3) -->
      <div class="md:col-span-2">
        <!-- limit image block so tab content doesn’t “jump” -->
        <div class="rounded-lg border border-gray-700 bg-gray-800/60 p-3">
          <component :is="leftRenderer" />
        </div>
      </div>

      <!-- RIGHT: prose area (1/3) -->
      <aside class="rounded-lg border border-gray-700 bg-gray-800/60 p-5">
        <component :is="rightRenderer" />
      </aside>
    </div>

    <!-- FOOTER -->
    <div v-if="$slots.footerText || $slots.actions" class="border-t border-gray-700 pt-4 mt-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div class="text-sm text-gray-400">
          <slot name="footerText" />
        </div>
        <div class="flex flex-wrap gap-2 justify-end">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed, useSlots } from 'vue'
import BaseModal from '@/components/modals/BaseModal.vue' // adjust path if needed

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  hero: { type: String, default: '' },
  tabs: { type: Array, default: () => [] }, // [{ key, label }]
  initialTab: { type: String, default: '' },

  // pass-through sizing to BaseModal (use your exact values from the old modal)
  width: { type: String, default: 'max-w-[1200px]' },
  height: { type: String, default: 'max-h-[92vh]' },
})

defineEmits(['close'])

const slots = useSlots()
const active = ref('')

const hasTabs = computed(() => props.tabs && props.tabs.length > 0)

watch(
  () => props.visible,
  (v) => {
    if (v && hasTabs.value) {
      active.value = props.initialTab || props.tabs[0]?.key || ''
    }
  },
  { immediate: true },
)

/**
 * Two named slots per tab:
 *   left-<key>  and  right-<key>
 * Fallbacks (no tabs): left-default / right-default
 */
const leftRenderer = computed(() => {
  const name = hasTabs.value ? `left-${active.value}` : 'left-default'
  return slots[name] ? () => slots[name]() : () => null
})

const rightRenderer = computed(() => {
  const name = hasTabs.value ? `right-${active.value}` : 'right-default'
  return slots[name] ? () => slots[name]() : () => null
})
</script>
