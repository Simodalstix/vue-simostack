<template>
  <div class="max-w-[1500px] mx-auto px-6 lg:px-10 py-10 space-y-12">
    <!-- open questions -->
    <section>
      <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-2">
        Still unknown
      </p>
      <p class="text-[13.5px] text-ob-muted max-w-3xl mb-5 leading-relaxed">
        Eight inputs decide which strategy wins. Everything else on this page is stable; these are
        not.
      </p>
      <div class="grid md:grid-cols-2 gap-3">
        <div
          v-for="(q, i) in infoNeeded"
          :key="i"
          class="bg-ob-surface border border-ob-sand/8 rounded-[6px] p-4"
        >
          <p class="text-[13.5px] font-semibold text-ob-text">{{ q.q }}</p>
          <p class="mt-1 text-[12.5px] leading-relaxed text-ob-dim">{{ q.why }}</p>
        </div>
      </div>
    </section>

    <!-- professional questions -->
    <section>
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
        Questions for the professionals
      </h2>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
        <div v-for="g in professionalQuestions" :key="g.who">
          <p class="text-[13px] font-bold text-ob-teal mb-2">{{ g.who }}</p>
          <ul class="space-y-1.5">
            <li
              v-for="(item, i) in g.items"
              :key="i"
              class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
            >
              <span class="text-ob-faint shrink-0">?</span>{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- research plan: four phases across on wide screens -->
    <section>
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
        Research plan
      </h2>
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="p in researchPlan"
          :key="p.phase"
          class="relative border-l border-ob-sand/14 pl-5"
        >
          <span
            class="absolute -left-[5px] top-[4px] w-[9px] h-[9px] rounded-full bg-ob-teal"
          ></span>
          <p class="font-mono text-[12px] tracking-[0.04em] text-ob-sand mb-2">{{ p.phase }}</p>
          <ul class="space-y-1.5">
            <li
              v-for="(s, i) in p.steps"
              :key="i"
              class="text-[13px] leading-relaxed text-ob-muted2 flex gap-2"
            >
              <span class="text-ob-teal shrink-0">▸</span>{{ s }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { infoNeeded, professionalQuestions, researchPlan } from '@/data/dwelling/framework.js'
</script>
