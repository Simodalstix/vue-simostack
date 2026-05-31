<template>
  <div class="flex items-start gap-3">
    <span class="text-[10px] uppercase tracking-wide text-slate-500 font-semibold shrink-0 w-28 mt-0.5">{{ label }}</span>
    <span class="text-[12px] text-slate-300 leading-snug flex-1">{{ value }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
})
</script>
