<template>
  <div class="py-4 pb-10">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <RouterLink
        :to="{ name: 'Home' }"
        class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors shrink-0"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Prep
      </RouterLink>
      <span class="text-slate-700">·</span>
      <h1 class="text-lg font-bold text-white">{{ page.title }}</h1>
    </div>

    <!-- 4-column layout: Concepts+Signals | Commands | systemd | Examples+AWS -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">

      <!-- COL 1: Concepts + Signals -->
      <div class="flex flex-col gap-4">

        <!-- Concepts -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Concepts</h2>
          <dl class="space-y-2">
            <div v-for="c in page.concepts" :key="c.term">
              <dt class="font-mono text-xs text-cyan-300 font-semibold">{{ c.term }}</dt>
              <dd class="text-xs text-slate-400 leading-snug mt-0.5">{{ c.def }}</dd>
            </div>
          </dl>
        </div>

        <!-- Signals -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Signals</h2>
          <table class="w-full text-xs">
            <thead>
              <tr class="text-slate-500 border-b border-slate-700">
                <th class="text-left pb-1.5 font-medium">Sig</th>
                <th class="text-left pb-1.5 font-medium">Name</th>
                <th class="text-left pb-1.5 font-medium">Use</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <tr v-for="s in page.signals" :key="s.number" class="align-top">
                <td class="py-1.5 pr-2 font-mono text-amber-400/80 font-semibold shrink-0">{{ s.number }}</td>
                <td class="py-1.5 pr-2 font-mono text-cyan-300/80 whitespace-nowrap">{{ s.name }}</td>
                <td class="py-1.5 text-slate-400 leading-snug">{{ s.use }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <!-- COL 2: Command Groups -->
      <div class="flex flex-col gap-4">
        <div
          v-for="group in page.commandGroups"
          :key="group.heading"
          class="rounded-xl bg-slate-800/50 border border-slate-700 p-4"
        >
          <h2 class="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">{{ group.heading }}</h2>
          <table class="w-full text-xs">
            <tbody class="divide-y divide-slate-800">
              <tr v-for="c in group.commands" :key="c.cmd" class="align-top">
                <td class="py-1.5 pr-3 font-mono text-green-300/90 whitespace-nowrap">{{ c.cmd }}</td>
                <td class="py-1.5 text-slate-400 leading-snug">{{ c.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- COL 3: systemd -->
      <div class="flex flex-col gap-4">

        <!-- systemctl commands -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">systemctl</h2>
          <table class="w-full text-xs">
            <tbody class="divide-y divide-slate-800">
              <tr v-for="c in page.systemd.serviceCommands" :key="c.cmd" class="align-top">
                <td class="py-1.5 pr-3 font-mono text-green-300/90 whitespace-nowrap">{{ c.cmd }}</td>
                <td class="py-1.5 text-slate-400 leading-snug">{{ c.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- journalctl commands -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">journalctl</h2>
          <table class="w-full text-xs">
            <tbody class="divide-y divide-slate-800">
              <tr v-for="c in page.systemd.journalCommands" :key="c.cmd" class="align-top">
                <td class="py-1.5 pr-3 font-mono text-green-300/90 whitespace-nowrap">{{ c.cmd }}</td>
                <td class="py-1.5 text-slate-400 leading-snug">{{ c.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Unit file -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">Unit File Structure</h2>
          <pre class="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900/60 rounded-lg p-3 overflow-x-auto">{{ page.systemd.unitFile }}</pre>
        </div>

      </div>

      <!-- COL 4: Examples + AWS Patterns -->
      <div class="flex flex-col gap-4">

        <!-- Code examples -->
        <div
          v-for="ex in page.examples"
          :key="ex.label"
          class="rounded-xl bg-slate-800/50 border border-slate-700 p-4"
        >
          <h3 class="text-xs font-bold tracking-widest uppercase text-amber-400/80 mb-2">{{ ex.label }}</h3>
          <pre class="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900/60 rounded-lg p-3 overflow-x-auto whitespace-pre">{{ ex.code }}</pre>
        </div>

        <!-- AWS patterns -->
        <div
          v-for="pattern in page.awsPatterns"
          :key="pattern.heading"
          class="rounded-xl bg-slate-800/50 border border-slate-700 p-4"
        >
          <h3 class="text-xs font-bold tracking-widest uppercase text-violet-400/80 mb-3">{{ pattern.heading }}</h3>

          <!-- Service table -->
          <table v-if="pattern.items" class="w-full text-xs mb-0">
            <tbody class="divide-y divide-slate-800">
              <tr v-for="item in pattern.items" :key="item.service" class="align-top">
                <td class="py-1.5 pr-3 font-mono text-cyan-300/80 whitespace-nowrap">{{ item.service }}</td>
                <td class="py-1.5 text-slate-400 leading-snug">{{ item.desc }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Code block -->
          <pre v-if="pattern.code" class="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900/60 rounded-lg p-3 overflow-x-auto whitespace-pre">{{ pattern.code }}</pre>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { page } from '@/data/linux/processes.js'
</script>
