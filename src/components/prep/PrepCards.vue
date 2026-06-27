<template>
  <div class="grid grid-cols-3 gap-3 auto-rows-min font-mono text-xs">
    <div
      v-for="(card, i) in cards"
      :key="i"
      class="rounded-lg bg-ob-surface2/50 border border-ob-text/16 border-l-2 flex flex-col overflow-hidden"
      :class="[card.wide ? 'col-span-2' : '', card.code ? 'border-l-cyan-500/50' : 'border-l-ob-sand/40']"
    >
      <!-- Header -->
      <div class="px-3 pt-2.5 pb-2 border-b border-ob-text/14 bg-ob-surface2/60">
        <span
          class="text-[10px] font-semibold tracking-widest uppercase"
          :class="card.code ? 'text-cyan-400' : 'text-ob-sand'"
        >{{ card.title }}</span>
      </div>

      <!-- Body -->
      <div class="px-3 py-2.5 flex flex-col gap-2 flex-1">
        <div
          v-if="card.body"
          class="text-ob-text leading-snug whitespace-pre-wrap"
          v-html="renderBody(card.body)"
        />
        <div v-if="card.body && card.code" class="border-t border-ob-text/14 mt-0.5" />
        <PrepCodeBlock v-if="card.code" :code="card.code" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'

defineProps({
  cards: { type: Array, required: true },
})

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderBody(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<span class="text-amber-400 font-semibold">$1</span>')
}
</script>
