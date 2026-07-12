<template>
  <!-- Collapsible Overview card. Matches the Decide strategy-card expand
       pattern: +/- indicator, teal border when open. Open cards span both
       columns of the masonry grid; the body height animates smoothly. -->
  <section
    class="bg-ob-surface border rounded-[6px] transition-colors self-start"
    :class="[
      open ? 'border-ob-teal/45' : 'border-ob-sand/8 hover:border-ob-sand/16',
      open ? 'lg:col-span-2' : '',
    ]"
  >
    <button
      class="w-full text-left px-4 py-3 flex items-center gap-4"
      :aria-expanded="open"
      @click="$emit('toggle')"
    >
      <span class="flex-1 min-w-0">
        <span class="block text-[13.5px] font-semibold text-ob-text">{{ title }}</span>
        <span
          v-if="summary"
          class="block mt-0.5 font-mono text-[11.5px] leading-snug"
          :class="open ? 'text-ob-faint' : 'text-ob-dim'"
          >{{ summary }}</span
        >
      </span>
      <span class="text-ob-faint text-[14px] w-3 text-center shrink-0">{{ open ? '−' : '+' }}</span>
    </button>

    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div class="px-4 pb-5 border-t border-ob-sand/8">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  summary: { type: String, default: '' },
  open: { type: Boolean, default: false },
})
defineEmits(['toggle'])
</script>
