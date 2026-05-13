<template>
  <div class="flex h-full overflow-hidden font-mono">

    <!-- Left sidebar — project list -->
    <aside class="w-56 shrink-0 bg-slate-800 border-r border-slate-700 overflow-y-auto">
      <div class="px-3 py-2.5 border-b border-slate-700">
        <span class="text-[10px] uppercase tracking-widest text-slate-400">Projects</span>
      </div>
      <button
        v-for="(p, i) in projects"
        :key="p.id"
        @click="selectedIdx = i"
        class="w-full text-left px-3 py-2.5 border-b border-slate-700/40 border-l-2 transition-colors"
        :class="selectedIdx === i
          ? 'bg-slate-700 text-white border-l-orange-400'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 border-l-transparent'"
      >
        <div class="text-[12px] font-medium leading-snug">{{ p.label }}</div>
        <div class="flex flex-wrap gap-1 mt-1">
          <span
            v-for="tag in p.tags"
            :key="tag"
            class="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400 border border-slate-600/40"
          >{{ tag }}</span>
        </div>
      </button>
    </aside>

    <!-- Main content -->
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

        <!-- Thing + Point stacked | Memory Anchors -->
        <div class="flex gap-6 items-start">

          <!-- Left: thing + point stacked -->
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

          <!-- Right: memory anchors -->
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

        <!-- Must Know Cold + Likely Probes — side by side -->
        <div class="flex gap-6 items-start">

          <!-- Must Know Cold (40%) -->
          <div class="w-[40%] shrink-0">
            <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-3">
              Must Know Cold
            </div>
            <div v-for="(c, i) in project.code" :key="i" class="mb-5">
              <div class="text-[10px] text-slate-500 italic mb-2">{{ c.label }}</div>
              <PrepCodeBlock :code="c.snippet" />
            </div>
          </div>

          <!-- Likely Probes (60%) -->
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
