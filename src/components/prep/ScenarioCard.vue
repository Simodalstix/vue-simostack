<template>
  <div class="font-mono text-xs">

    <!-- Header -->
    <div class="mb-5 pb-4 border-b border-ob-text/18">
      <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">
        {{ scenario.title }}
      </div>
      <div class="flex flex-wrap gap-x-6 gap-y-1 text-[12px]">
        <span>
          <span class="text-ob-dim">symptom: </span>
          <span class="text-ob-text">{{ scenario.symptom }}</span>
        </span>
        <span>
          <span class="text-ob-dim">first ask: </span>
          <span class="text-amber-300">{{ scenario.firstQuestion }}</span>
        </span>
      </div>
    </div>

    <!-- Body: steps + probes + right panel -->
    <div class="grid grid-cols-9 gap-6">

      <!-- Steps (left, 3 cols) -->
      <div class="col-span-3 space-y-6">
        <div v-for="step in scenario.steps" :key="step.n">

          <!-- Step heading -->
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-ob-sand font-bold shrink-0">{{ step.n }}.</span>
            <span class="text-ob-sand font-semibold leading-snug">{{ step.label }}</span>
          </div>

          <!-- runFrom -->
          <div v-if="step.runFrom" class="text-[10px] text-ob-dim italic mb-2 ml-4">
            run from: {{ step.runFrom }}
          </div>

          <!-- Lines -->
          <div class="space-y-1.5 ml-4">
            <template v-for="(line, i) in step.lines" :key="i">

              <!-- Command -->
              <div v-if="line.cmd" class="flex items-start gap-2">
                <span class="text-ob-faint shrink-0 select-none mt-px">$</span>
                <span class="text-cyan-400 leading-snug">{{ line.cmd }}</span>
              </div>

              <!-- Explanation note -->
              <div v-else-if="line.note" class="text-ob-dim leading-snug ml-4">
                {{ line.note }}
              </div>

              <!-- Output -->
              <div v-else-if="line.out" class="flex items-start gap-2 flex-wrap ml-2">
                <span :class="arrowColor(line.status)" class="shrink-0 select-none mt-px">›</span>
                <span :class="outColor(line.status)" class="leading-snug">{{ line.out }}</span>
                <span v-if="line.meaning" class="text-ob-dim leading-snug">— {{ line.meaning }}</span>
              </div>

            </template>
          </div>
        </div>
      </div>

      <!-- Middle: Interviewer Probes (3 cols) -->
      <div class="col-span-3 border-l border-ob-text/18 pl-5">
        <div class="text-[10px] uppercase tracking-widest text-ob-dim font-semibold mb-4">Interviewer Probes</div>
        <div v-for="step in scenario.steps" :key="step.n" class="mb-5">
          <div class="text-[10px] text-ob-faint font-semibold mb-2">Step {{ step.n }}</div>
          <div
            v-for="(probe, i) in (scenario.stepProbes?.[step.n] ?? [])"
            :key="i"
            class="mb-3"
          >
            <div class="text-sky-400/80 leading-snug mb-0.5">Q: {{ probe.q }}</div>
            <div class="text-ob-muted leading-snug border-l border-ob-text/18 pl-2">A: {{ probe.a }}</div>
          </div>
        </div>
      </div>

      <!-- Right panel (3 cols) -->
      <div class="col-span-3 space-y-6 border-l border-ob-text/18 pl-5">

        <!-- Root Causes -->
        <div v-if="scenario.causes?.length">
          <div class="text-[10px] uppercase tracking-widest text-ob-dim font-semibold mb-3">Root Causes</div>
          <div v-for="(c, i) in scenario.causes" :key="i" class="flex items-start gap-1.5 mb-2 leading-snug">
            <span class="text-amber-400 shrink-0">{{ c.trigger }}</span>
            <span class="text-ob-faint shrink-0">→</span>
            <span class="text-ob-text">{{ c.fix }}</span>
          </div>
        </div>

        <!-- Prevention -->
        <div v-if="scenario.prevention?.length">
          <div class="text-[10px] uppercase tracking-widest text-ob-dim font-semibold mb-3">Prevention</div>
          <div v-for="(p, i) in scenario.prevention" :key="i" class="flex items-start gap-2 mb-1.5 leading-snug">
            <span class="text-emerald-500 shrink-0 mt-px">•</span>
            <span class="text-ob-text">{{ p }}</span>
          </div>
        </div>

        <!-- Probe Points -->
        <div v-if="scenario.probes?.length">
          <div class="text-[10px] uppercase tracking-widest text-ob-dim font-semibold mb-3">Probe Points</div>
          <div v-for="(probe, i) in scenario.probes" :key="i" class="mb-4">
            <div class="text-sky-400 leading-snug mb-1">{{ probe.q }}</div>
            <div class="text-ob-text leading-snug border-l-2 border-ob-text/18 pl-2.5">{{ probe.a }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ scenario: Object })

function arrowColor(status) {
  if (status === 'fail') return 'text-amber-400'
  if (status === 'ok')   return 'text-emerald-400'
  return 'text-ob-dim'
}

function outColor(status) {
  if (status === 'fail') return 'text-amber-300'
  if (status === 'ok')   return 'text-emerald-300'
  return 'text-ob-muted'
}
</script>
