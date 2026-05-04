<template>
  <div class="max-w-5xl mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white">STAR Stories</h1>
      <p class="text-slate-400 text-sm mt-1">{{ stories.length }} stories — tap to review</p>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="story in stories"
        :key="story.id"
        :to="{ name: 'PrepStarDetail', params: { id: story.id } }"
        class="group block rounded-xl border border-slate-700 bg-slate-800/60 p-4 hover:border-slate-600 hover:bg-slate-800 transition-all"
      >
        <h2 class="text-white font-semibold text-sm leading-snug group-hover:text-cyan-200 transition-colors">
          {{ story.title }}
        </h2>
        <div class="mt-2.5 flex flex-wrap gap-1.5">
          <span
            v-for="lp in story.lps"
            :key="lp.name"
            :class="['text-xs rounded-full px-2 py-0.5 border font-medium', LP_COLORS[lp.name]]"
          >
            {{ LP_SHORT_NAMES[lp.name] }}
          </span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const modules = import.meta.glob('/src/data/starStories.js', { eager: true })
const data = Object.values(modules)[0] || {}
const stories = data.stories || []
const LP_COLORS = data.LP_COLORS || {}
const LP_SHORT_NAMES = data.LP_SHORT_NAMES || {}
</script>
