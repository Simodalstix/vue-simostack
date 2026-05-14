<template>
  <div class="space-y-0">

    <template v-for="group in groups" :key="group.id">

      <!-- Single-layer group: plain block -->
      <template v-if="group.layers.length === 1">
        <LayerBlock :layer="group.layers[0]" class="mb-2" />
      </template>

      <!-- Multi-layer INSTANCE group: container with inner blocks -->
      <div v-else class="rounded-lg border border-slate-700/50 overflow-hidden mb-2">
        <div class="px-3 py-1.5 bg-slate-800/50 border-b border-slate-700/40">
          <span class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
            {{ group.label || 'Instance' }}
          </span>
        </div>
        <div class="p-2 space-y-2">
          <LayerBlock
            v-for="layer in group.layers"
            :key="layer.layer"
            :layer="layer"
            :compact="true"
          />
        </div>
      </div>

    </template>

    <!-- Prevention footer -->
    <div v-if="prevention?.length" class="pt-3 mt-1 border-t border-slate-700/50">
      <div class="text-[11px] uppercase tracking-widest text-emerald-500/70 font-semibold mb-2">
        Prevention
      </div>
      <ul class="space-y-1">
        <li
          v-for="item in prevention"
          :key="item"
          class="flex items-start gap-1.5 text-[12px] text-slate-300"
        >
          <span class="text-emerald-500/50 shrink-0 mt-px">›</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import LayerBlock from './LayerBlock.vue'

defineProps({
  groups:     { type: Array, required: true },
  prevention: { type: Array, default: () => [] },
})
</script>
