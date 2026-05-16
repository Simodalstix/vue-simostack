<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Project tab bar -->
    <div class="shrink-0 flex border-b border-slate-700 bg-slate-800/20 flex-wrap">
      <button
        v-for="(p, i) in projects" :key="p.id"
        @click="selectedIdx = i"
        class="px-4 py-2 text-[12px] border-r border-slate-700/60 border-b-2 -mb-px transition-colors"
        :class="selectedIdx === i
          ? 'text-orange-300 border-b-orange-400 bg-orange-500/10'
          : 'text-slate-400 hover:text-slate-200 border-b-transparent'"
      >{{ p.label }}</button>
    </div>

    <!-- Main content — full width -->
    <main class="flex-1 overflow-y-auto p-6 bg-slate-900 space-y-6">
      <template v-if="project">

        <!-- Heading + tags -->
        <div>
          <h2 class="text-orange-300 font-semibold text-[13px] uppercase tracking-widest mb-1">
            {{ project.label }}
          </h2>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-[10px] px-2 py-0.5 rounded border bg-slate-800 text-slate-400 border-slate-600/50"
            >{{ tag }}</span>
          </div>
        </div>

        <div class="border-t border-slate-700/50" />

        <!-- Thing + Point | Memory Anchors -->
        <div class="flex gap-6 items-start">

          <div class="w-[40%] shrink-0 space-y-4">
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-2">The thing</div>
              <p class="text-slate-300 text-[12px] leading-relaxed">{{ project.thing }}</p>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-2">The point</div>
              <p class="text-slate-300 text-[12px] leading-relaxed">{{ project.point }}</p>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-3">
              Memory Anchors
            </div>
            <ul class="space-y-1.5">
              <li
                v-for="(anchor, i) in project.anchors"
                :key="i"
                class="flex gap-2 items-start text-[12px] text-slate-300 leading-relaxed"
              >
                <span class="text-orange-400/40 shrink-0 mt-0.5">•</span>
                <span>{{ anchor }}</span>
              </li>
            </ul>
          </div>

        </div>

        <div class="border-t border-slate-700/50" />

        <!-- Must Know Cold + Likely Probes -->
        <div class="flex gap-6 items-start">

          <div class="w-[40%] shrink-0">
            <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-3">
              Must Know Cold
            </div>
            <div v-for="(c, i) in project.code" :key="i" class="mb-5">
              <div class="text-[10px] text-slate-500 italic mb-2">{{ c.label }}</div>
              <PrepCodeBlock :code="c.snippet" />
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-3">
              Likely Probes
            </div>
            <div v-for="(probe, i) in project.probes" :key="i" class="mb-4">
              <div class="text-sky-300/80 text-[12px] leading-relaxed mb-1">{{ probe.q }}</div>
              <div class="border-l-2 border-slate-700 pl-3 text-slate-400 text-[11px] leading-relaxed">
                {{ probe.a }}
              </div>
            </div>
          </div>

        </div>

      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects } from '@/data/prep/projects.js'
import PrepCodeBlock from './PrepCodeBlock.vue'

const selectedIdx = ref(0)
const project = computed(() => projects[selectedIdx.value])
</script>
