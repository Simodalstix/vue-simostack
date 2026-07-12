<template>
  <section>
    <h2 v-if="heading" class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
      Regional lens · read before the ranking
    </h2>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
      <article
        v-for="r in regions"
        :key="r.name"
        class="bg-ob-surface border border-ob-sand/8 rounded-[6px] p-4 flex flex-col"
      >
        <div class="flex items-baseline justify-between gap-3 mb-2">
          <h3 class="text-[14.5px] font-bold text-ob-text">{{ r.name }}</h3>
          <span
            v-if="r.controlGroup"
            class="font-mono text-[10px] tracking-[0.06em] uppercase px-2 py-[2px] rounded-full border border-ob-sand/25 text-ob-sand"
            >control group</span
          >
        </div>

        <p v-if="r.note" class="text-[12.5px] leading-relaxed text-ob-muted2 mb-3">{{ r.note }}</p>

        <p class="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ob-teal mb-1.5">
          Why consider
        </p>
        <ul class="space-y-1 mb-3">
          <li
            v-for="(w, i) in r.why"
            :key="i"
            class="text-[12px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-teal shrink-0">+</span>{{ w }}
          </li>
        </ul>

        <p class="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ob-sand mb-1.5">
          Why reject parts of it
        </p>
        <ul class="space-y-1 mb-3">
          <li
            v-for="(w, i) in r.watch"
            :key="i"
            class="text-[12px] leading-relaxed text-ob-muted2 flex gap-2"
          >
            <span class="text-ob-sand shrink-0">−</span>{{ w }}
          </li>
        </ul>

        <p class="mt-auto pt-2 border-t border-ob-sand/8 font-mono text-[11px] text-ob-dim">
          {{ r.corridors }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { regions } from '@/data/dwelling/regions.js'

defineProps({
  heading: { type: Boolean, default: true },
})
</script>
