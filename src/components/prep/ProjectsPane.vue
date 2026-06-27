<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Project tab bar -->
    <div class="shrink-0 flex border-b border-ob-text/18 bg-ob-surface2/20">
      <button
        v-for="(p, i) in projects" :key="p.id"
        @click="selectedIdx = i"
        class="px-4 py-2 text-[12px] border-r border-ob-text/18 border-b-2 -mb-px transition-colors"
        :class="selectedIdx === i
          ? 'text-ob-sand border-b-ob-sand bg-ob-sand/10'
          : 'text-ob-muted hover:text-ob-text border-b-transparent'"
      >{{ p.label }}</button>
    </div>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto p-5 bg-ob-bg">
      <template v-if="project">

        <!-- Header -->
        <div class="mb-5 flex items-start gap-6">
          <div class="shrink-0">
            <h2 class="text-ob-sand font-semibold text-[13px] uppercase tracking-widest mb-2">
              {{ project.label }}
            </h2>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags" :key="tag"
                class="text-[10px] px-2 py-0.5 rounded border bg-ob-surface2 text-ob-muted border-ob-text/16"
              >{{ tag }}</span>
            </div>
          </div>
          <div v-if="project.summary" class="flex-1 text-[12px] text-cyan-300/80 leading-relaxed border-l border-ob-text/18 pl-5 pt-0.5">
            {{ project.summary }}
          </div>
        </div>

        <!-- Sections grid -->
        <div class="grid grid-cols-2 gap-3">
          <template v-for="(sec, i) in project.sections" :key="i">
            <div :class="sec.span === 2 ? 'col-span-2' : 'col-span-1'">

              <!-- ── prose ───────────────────────────────────────── -->
              <template v-if="sec.type === 'prose'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 px-4 py-3">
                  <div v-if="sec.heading" class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">
                    {{ sec.heading }}
                  </div>
                  <p class="text-ob-text text-[12px] leading-relaxed">{{ sec.body }}</p>
                </div>
              </template>

              <!-- ── kv grid ─────────────────────────────────────── -->
              <template v-else-if="sec.type === 'kv'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden h-full">
                  <div v-if="sec.heading" class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ sec.heading }}</span>
                  </div>
                  <div class="px-3 py-2.5 grid gap-y-1.5 gap-x-3 text-[11px]" style="grid-template-columns: 8.5rem 1fr">
                    <template v-for="row in sec.rows" :key="row.key">
                      <span class="text-sky-300 font-mono font-semibold self-start pt-px">{{ row.key }}</span>
                      <span class="text-ob-muted leading-snug">{{ row.value }}</span>
                    </template>
                  </div>
                </div>
              </template>

              <!-- ── code block ─────────────────────────────────── -->
              <template v-else-if="sec.type === 'code'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden h-full">
                  <div v-if="sec.heading" class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ sec.heading }}</span>
                  </div>
                  <div v-if="sec.label" class="px-3 pt-2 text-[10px] text-ob-dim italic">{{ sec.label }}</div>
                  <div class="px-3 py-2.5">
                    <PrepCodeBlock :code="sec.snippet" />
                  </div>
                </div>
              </template>

              <!-- ── flow diagram ───────────────────────────────── -->
              <template v-else-if="sec.type === 'flow'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
                  <div v-if="sec.heading" class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ sec.heading }}</span>
                  </div>
                  <div class="px-4 py-4 flex flex-wrap items-center gap-2">
                    <template v-for="(step, si) in sec.steps" :key="si">
                      <div class="flex flex-col items-center min-w-[80px] max-w-[140px]">
                        <div class="w-full px-2 py-2 border border-sky-700/60 bg-sky-950/40 rounded text-center">
                          <div class="text-sky-300 text-[11px] font-semibold leading-tight">{{ step.label }}</div>
                          <div v-if="step.sub" class="text-ob-dim text-[10px] mt-0.5 leading-tight">{{ step.sub }}</div>
                        </div>
                      </div>
                      <span v-if="si < sec.steps.length - 1" class="text-ob-faint text-[14px] shrink-0">→</span>
                    </template>
                  </div>
                </div>
              </template>

              <!-- ── bullet list ────────────────────────────────── -->
              <template v-else-if="sec.type === 'bullets'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden h-full">
                  <div v-if="sec.heading" class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ sec.heading }}</span>
                  </div>
                  <div class="px-3 py-2.5 space-y-1.5">
                    <div v-for="(item, bi) in sec.items" :key="bi" class="flex gap-2 text-[11px]">
                      <span class="text-ob-sand/40 shrink-0 mt-0.5">•</span>
                      <span class="text-ob-text leading-snug">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <!-- ── comparison table ───────────────────────────── -->
              <template v-else-if="sec.type === 'table'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
                  <div v-if="sec.heading" class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ sec.heading }}</span>
                  </div>
                  <div class="px-3 py-2 overflow-x-auto">
                    <table class="w-full text-[11px] border-collapse">
                      <thead>
                        <tr class="border-b border-ob-text/18">
                          <th
                            v-for="col in sec.cols" :key="col"
                            class="text-left pb-1.5 pr-4 font-semibold"
                            :class="col ? 'text-sky-300' : 'text-ob-dim'"
                          >{{ col }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, ri) in sec.rows" :key="ri" class="border-b border-ob-text/8">
                          <td class="py-1.5 pr-4 text-ob-dim font-medium">{{ row.label }}</td>
                          <td v-for="(val, vi) in row.vals" :key="vi" class="py-1.5 pr-4 text-ob-text">{{ val }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </template>

              <!-- ── probes ─────────────────────────────────────── -->
              <template v-else-if="sec.type === 'probes'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
                  <div class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">
                      {{ sec.heading || 'Likely Probes' }}
                    </span>
                  </div>
                  <div class="px-3 py-3 space-y-4">
                    <div v-for="(probe, pi) in sec.items" :key="pi">
                      <div class="text-sky-300/80 text-[12px] leading-relaxed mb-1">{{ probe.q }}</div>
                      <div class="border-l-2 border-ob-text/18 pl-3 text-ob-muted text-[11px] leading-relaxed">{{ probe.a }}</div>
                    </div>
                  </div>
                </div>
              </template>

              <!-- ── quotes ─────────────────────────────────────── -->
              <template v-else-if="sec.type === 'quotes'">
                <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden h-full">
                  <div class="px-3 py-2 border-b border-ob-text/14">
                    <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">
                      {{ sec.heading || 'Speak This Out Loud' }}
                    </span>
                  </div>
                  <div class="px-3 py-3 space-y-3">
                    <div
                      v-for="(q, qi) in sec.items" :key="qi"
                      class="pl-3 border-l-2 border-amber-500/40 text-ob-text italic text-[11px] leading-relaxed"
                    >{{ q }}</div>
                  </div>
                </div>
              </template>

              <!-- ── stack (multiple sections stacked in one column) ─── -->
              <template v-else-if="sec.type === 'stack'">
                <div class="flex flex-col gap-3 h-full">
                  <div v-for="(child, ci) in sec.items" :key="ci" class="flex-1">
                    <div v-if="child.type === 'kv'" class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden h-full">
                      <div v-if="child.heading" class="px-3 py-2 border-b border-ob-text/14">
                        <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ child.heading }}</span>
                      </div>
                      <div class="px-3 py-2.5 grid gap-y-1.5 gap-x-3 text-[11px]" style="grid-template-columns: 8.5rem 1fr">
                        <template v-for="row in child.rows" :key="row.key">
                          <span class="text-sky-300 font-mono font-semibold self-start pt-px">{{ row.key }}</span>
                          <span class="text-ob-muted leading-snug">{{ row.value }}</span>
                        </template>
                      </div>
                    </div>
                    <div v-else-if="child.type === 'prose'" class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 px-4 py-3 h-full">
                      <div v-if="child.heading" class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">{{ child.heading }}</div>
                      <p class="text-ob-text text-[12px] leading-relaxed">{{ child.body }}</p>
                    </div>
                    <div v-else-if="child.type === 'bullets'" class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden h-full">
                      <div v-if="child.heading" class="px-3 py-2 border-b border-ob-text/14">
                        <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ child.heading }}</span>
                      </div>
                      <div class="px-3 py-2.5 space-y-1.5">
                        <div v-for="(item, bi) in child.items" :key="bi" class="flex gap-2 text-[11px]">
                          <span class="text-ob-sand/40 shrink-0 mt-0.5">•</span>
                          <span class="text-ob-text leading-snug">{{ item }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

            </div>
          </template>
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
