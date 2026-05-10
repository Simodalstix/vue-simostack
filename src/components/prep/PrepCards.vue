<template>
  <div class="grid grid-cols-3 gap-3 auto-rows-min font-mono text-xs">
    <div
      v-for="(card, i) in cards"
      :key="i"
      class="rounded-lg bg-slate-800/50 border border-slate-700/50 border-l-2 flex flex-col overflow-hidden"
      :class="[card.wide ? 'col-span-2' : '', card.code ? 'border-l-cyan-500/50' : 'border-l-orange-500/40']"
    >
      <!-- Header -->
      <div class="px-3 pt-2.5 pb-2 border-b border-slate-700/40 bg-slate-800/60">
        <span
          class="text-[10px] font-semibold tracking-widest uppercase"
          :class="card.code ? 'text-cyan-400' : 'text-orange-300'"
        >{{ card.title }}</span>
      </div>

      <!-- Body -->
      <div class="px-3 py-2.5 flex flex-col gap-2 flex-1">
        <div
          v-if="card.body"
          class="text-slate-300 leading-snug whitespace-pre-wrap"
          v-html="renderBody(card.body)"
        />
        <div v-if="card.body && card.code" class="border-t border-slate-700/40 mt-0.5" />
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
