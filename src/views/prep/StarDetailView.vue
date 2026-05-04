<template>
  <div v-if="story" class="flex flex-col gap-3 pb-6">

    <!-- Header -->
    <div class="shrink-0">
      <div class="flex items-center gap-3 mb-2">
        <RouterLink
          :to="{ name: 'PrepStars' }"
          class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors shrink-0"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Stories
        </RouterLink>
        <h1 class="text-lg font-bold text-white">{{ story.title }}</h1>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="lp in story.lps"
          :key="lp.name"
          :class="['text-xs rounded-full px-2.5 py-0.5 border font-semibold', LP_COLORS[lp.name]]"
        >
          <span v-if="lp.primary" class="opacity-60 mr-0.5">★</span>{{ LP_SHORT_NAMES[lp.name] }}
        </span>
      </div>
    </div>

    <!--
      4-col grid, height driven by Action content.
      items-start so columns don't stretch to fill artificial space.
      col 1: S/T | cols 2-3: Action | col 4: Result + Close stacked
    -->
    <div class="hidden lg:grid lg:grid-cols-4 lg:items-start lg:gap-3">

      <!-- Situation / Task -->
      <section class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
        <h2 class="text-xs font-bold tracking-widest uppercase text-blue-400/80 mb-3">Situation / Task</h2>
        <p class="text-sm text-slate-300 leading-relaxed">{{ story.situation }}</p>
        <ul v-if="story.anchors?.length" class="mt-3 space-y-1 border-t border-slate-700 pt-3">
          <li
            v-for="anchor in story.anchors"
            :key="anchor"
            class="flex items-start gap-1.5 text-xs text-yellow-200/70"
          >
            <span class="mt-0.5 shrink-0 text-yellow-500/60">•</span>
            {{ anchor }}
          </li>
        </ul>
      </section>

      <!-- Action — center, double-wide, drives the row height -->
      <section class="col-span-2 rounded-xl bg-slate-800/80 border border-slate-600 p-4">
        <h2 class="text-xs font-bold tracking-widest uppercase text-amber-400/90 mb-3">Action</h2>
        <p class="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{{ story.action }}</p>
      </section>

      <!-- Result + Close stacked in col 4 -->
      <div class="flex flex-col gap-3">
        <section class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-emerald-400/80 mb-3">Result</h2>
          <p class="text-sm text-slate-300 leading-relaxed">{{ story.result }}</p>
        </section>
        <section class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
          <h2 class="text-xs font-bold tracking-widest uppercase text-violet-400/80 mb-3">Close</h2>
          <p class="text-sm text-slate-300 leading-relaxed">{{ story.close }}</p>
        </section>
      </div>

    </div>

    <!-- Mobile: simple stack -->
    <div class="flex flex-col gap-3 lg:hidden">
      <section class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
        <h2 class="text-xs font-bold tracking-widest uppercase text-blue-400/80 mb-3">Situation / Task</h2>
        <p class="text-sm text-slate-300 leading-relaxed">{{ story.situation }}</p>
        <ul v-if="story.anchors?.length" class="mt-3 space-y-1 border-t border-slate-700 pt-3">
          <li
            v-for="anchor in story.anchors"
            :key="anchor"
            class="flex items-start gap-1.5 text-xs text-yellow-200/70"
          >
            <span class="mt-0.5 shrink-0 text-yellow-500/60">•</span>
            {{ anchor }}
          </li>
        </ul>
      </section>
      <section class="rounded-xl bg-slate-800/80 border border-slate-600 p-4">
        <h2 class="text-xs font-bold tracking-widest uppercase text-amber-400/90 mb-3">Action</h2>
        <p class="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{{ story.action }}</p>
      </section>
      <section class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
        <h2 class="text-xs font-bold tracking-widest uppercase text-emerald-400/80 mb-3">Result</h2>
        <p class="text-sm text-slate-300 leading-relaxed">{{ story.result }}</p>
      </section>
      <section class="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
        <h2 class="text-xs font-bold tracking-widest uppercase text-violet-400/80 mb-3">Close</h2>
        <p class="text-sm text-slate-300 leading-relaxed">{{ story.close }}</p>
      </section>
    </div>

    <!-- LP triggers -->
    <div class="flex flex-wrap items-start gap-x-5 gap-y-1.5 rounded-xl bg-slate-800/40 border border-slate-700 px-4 py-2.5">
      <div v-for="lp in story.lps" :key="lp.name" class="flex items-baseline gap-1.5">
        <span :class="['text-xs rounded-full px-2 py-0.5 border font-semibold shrink-0', LP_COLORS[lp.name]]">
          {{ LP_SHORT_NAMES[lp.name] }}<span v-if="lp.primary" class="ml-0.5 opacity-60"> ★</span>
        </span>
        <span class="text-xs text-slate-400">{{ lp.why }}</span>
      </div>
    </div>

  </div>

  <div v-else class="py-12 text-center">
    <p class="text-slate-400 mb-3">Story not found.</p>
    <RouterLink :to="{ name: 'PrepStars' }" class="text-cyan-400 hover:text-cyan-300 text-sm">
      ← Back to stories
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const modules = import.meta.glob('/src/data/starStories.js', { eager: true })
const data = Object.values(modules)[0] || {}
const stories = data.stories || []
const LP_COLORS = data.LP_COLORS || {}
const LP_SHORT_NAMES = data.LP_SHORT_NAMES || {}

const route = useRoute()
const story = computed(() => stories.find((s) => s.id === route.params.id))
</script>
