<template>
  <component
    :is="as"
    v-bind="attrs"
    :class="[
      'group rounded-2xl border border-slate-700 bg-slate-800/60 p-4 transition',
      'hover:border-slate-600 hover:bg-slate-800',
      clickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/60' : '',
    ]"
    :role="clickable && as !== 'a' ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="onClick"
    @keydown.enter="onClick"
    @keydown.space.prevent="onClick"
  >
    <!-- Header -->
    <div class="flex items-start gap-3">
      <!-- Single icon -->
      <img
        v-if="icon && !icons?.length"
        :src="icon"
        alt=""
        class="h-10 w-10 rounded-xl object-cover"
      />
      <!-- Multiple icons -->
      <div v-else-if="icons && icons.length" class="flex items-center gap-2 flex-wrap">
        <img
          v-for="(ic, i) in icons"
          :key="i"
          :src="ic.src"
          :alt="ic.alt || ''"
          class="h-7 w-7 rounded-lg object-cover"
          :class="ic.class"
        />
      </div>

      <div class="min-w-0">
        <h3 v-if="title" class="text-base font-semibold leading-tight text-white">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-slate-300 mt-1 line-clamp-2">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Badges -->
    <div v-if="badges && badges.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="(b, i) in badges"
        :key="i"
        class="text-xs rounded-full px-2 py-1 border border-slate-600 bg-slate-700/60 text-slate-200"
      >
        {{ b }}
      </span>
    </div>

    <!-- Meta row (small, optional) -->
    <div
      v-if="meta && meta.length"
      class="mt-3 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1"
    >
      <div v-for="(m, i) in meta" :key="i" class="inline-flex items-center gap-1">
        <span class="opacity-80">{{ m.label }}:</span>
        <span class="font-medium text-slate-300">{{ m.value }}</span>
      </div>
    </div>

    <!-- Freeform slot (optional extra content) -->
    <div v-if="$slots.default" class="mt-3">
      <slot />
    </div>
  </component>
</template>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

defineProps({
  // Element to render as: 'div' | 'a' | 'button' etc.
  as: { type: String, default: 'div' },
  title: String,
  subtitle: String,
  icon: String, // single icon
  icons: { type: Array, default: () => [] }, // [{ src, alt?, class? }]
  badges: { type: Array, default: () => [] }, // ['ECS', 'ALB']
  meta: { type: Array, default: () => [] }, // [{ label, value }]
  clickable: { type: Boolean, default: true }, // enables role/tabindex/keyboard handlers
})

const emit = defineEmits(['open', 'click'])

function onClick(e) {
  emit('click', e) // forward native intent if needed
  if (e?.defaultPrevented) return
  if (attrs?.onOpen || attrs?.onopen) emit('open')
  else emit('open')
}
</script>
