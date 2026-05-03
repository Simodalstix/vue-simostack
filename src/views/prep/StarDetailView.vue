<template>
  <div v-if="story" class="flex flex-col gap-2 overflow-hidden" style="height: calc(100dvh - 5rem)">

    <!-- Header: back · title · LP badges — all one row -->
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 shrink-0">
      <RouterLink
        :to="{ name: 'PrepStars' }"
        class="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors shrink-0"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Stories
      </RouterLink>
      <span class="text-slate-600">·</span>
      <h1 class="text-base font-bold text-white">{{ story.title }}</h1>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="lp in story.lps"
          :key="lp.name"
          :class="['text-xs rounded-full px-2 py-0.5 border font-semibold', LP_COLORS[lp.name]]"
        >
          <span v-if="lp.primary" class="opacity-70 mr-0.5">★</span>{{ LP_SHORT_NAMES[lp.name] }}
        </span>
      </div>
    </div>

    <!-- 4-column STAR grid — fills all remaining height -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 flex-1 min-h-0">
      <section class="flex flex-col rounded-xl border border-blue-500/30 bg-blue-900/20 p-3 min-h-0 overflow-hidden">
        <h2 class="text-xs font-bold tracking-widest uppercase text-blue-400 mb-2 shrink-0">Situation / Task</h2>
        <div class="flex-1 overflow-y-auto scrollbar-thin pr-1">
          <p class="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{{ story.situation }}</p>
        </div>
      </section>

      <section class="flex flex-col rounded-xl border border-amber-500/30 bg-amber-900/20 p-3 min-h-0 overflow-hidden">
        <h2 class="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2 shrink-0">Action</h2>
        <div class="flex-1 overflow-y-auto scrollbar-thin pr-1">
          <p class="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{{ story.action }}</p>
        </div>
      </section>

      <section class="flex flex-col rounded-xl border border-emerald-500/30 bg-emerald-900/20 p-3 min-h-0 overflow-hidden">
        <h2 class="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-2 shrink-0">Result</h2>
        <div class="flex-1 overflow-y-auto scrollbar-thin pr-1">
          <p class="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{{ story.result }}</p>
        </div>
      </section>

      <section class="flex flex-col rounded-xl border border-violet-500/30 bg-violet-900/20 p-3 min-h-0 overflow-hidden">
        <h2 class="text-xs font-bold tracking-widest uppercase text-violet-400 mb-2 shrink-0">Close</h2>
        <div class="flex-1 overflow-y-auto scrollbar-thin pr-1">
          <p class="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{{ story.close }}</p>
        </div>
      </section>
    </div>

    <!-- Anchors strip -->
    <div class="shrink-0 rounded-lg border border-yellow-500/25 bg-yellow-900/15 px-3 py-2">
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span class="text-xs font-bold tracking-widest uppercase text-yellow-400 shrink-0">Anchors</span>
        <span
          v-for="anchor in story.anchors"
          :key="anchor"
          class="text-xs rounded-md px-2 py-0.5 bg-yellow-400/10 border border-yellow-500/30 text-yellow-200 font-medium"
        >
          {{ anchor }}
        </span>
      </div>
    </div>

    <!-- LP triggers strip -->
    <div class="shrink-0 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2">
      <div class="flex flex-wrap items-start gap-x-5 gap-y-1.5">
        <div v-for="lp in story.lps" :key="lp.name" class="flex items-baseline gap-1.5">
          <span :class="['text-xs rounded-full px-2 py-0.5 border font-semibold shrink-0', LP_COLORS[lp.name]]">
            <span v-if="lp.primary" class="opacity-70 mr-0.5">★</span>{{ LP_SHORT_NAMES[lp.name] }}
          </span>
          <span class="text-xs text-slate-300">{{ lp.why }}</span>
        </div>
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
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const modules = import.meta.glob('/src/data/starStories.js', { eager: true })
const data = Object.values(modules)[0] || {}
const stories = data.stories || []
const LP_COLORS = data.LP_COLORS || {}
const LP_SHORT_NAMES = data.LP_SHORT_NAMES || {}

const route = useRoute()
const story = computed(() => stories.find((s) => s.id === route.params.id))

onMounted(() => { document.body.style.overflow = 'hidden' })
onUnmounted(() => { document.body.style.overflow = '' })
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
</style>
