<template>
  <div class="min-h-screen w-full flex flex-col bg-[#111418] text-[#F5F2EC] font-display">
    <!-- top nav — matches the clearance header treatment -->
    <header
      class="shrink-0 border-b border-ob-sand/14 sticky top-0 bg-[#111418]/95 backdrop-blur z-10"
    >
      <nav class="px-6 h-[52px] flex items-center justify-between">
        <div class="flex items-center gap-[14px]">
          <span
            class="w-[30px] h-[30px] border-[1.5px] border-ob-bronze rounded-[3px] flex items-center justify-center font-display font-extrabold text-[12px] leading-none text-ob-sand tracking-[0.02em]"
            >SP</span
          >
          <span class="font-mono text-[12px] leading-none tracking-[0.04em] text-ob-soft"
            >dwelling · Melbourne strategy</span
          >
        </div>

        <div
          class="flex items-center gap-6 md:gap-8 font-display font-semibold text-[13px] overflow-x-auto"
        >
          <router-link
            v-for="page in pages"
            :key="page.id"
            :to="{ name: page.name }"
            class="transition-colors border-b-2 pb-[3px] whitespace-nowrap"
            :class="
              route.name === page.name
                ? 'text-ob-text border-ob-teal'
                : 'text-ob-faint hover:text-ob-text border-transparent'
            "
          >
            {{ page.label }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="flex-1 min-h-0">
      <router-view />
    </main>

    <footer class="border-t border-ob-sand/14 px-6 py-4">
      <p class="font-mono text-[11px] tracking-[0.04em] text-ob-faint max-w-3xl">
        Indicative figures as at {{ AS_AT }} · medians and scheme rules dated in-line · general
        information, not financial, legal or credit advice — verify with SRO Vic, Housing Australia
        and a licensed broker before acting.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { AS_AT } from '@/data/dwelling/facts.js'

const route = useRoute()

const pages = [
  { id: 'overview', label: 'Overview', name: 'DwellingOverview' },
  { id: 'decide', label: 'Decide', name: 'DwellingDecide' },
]
</script>
