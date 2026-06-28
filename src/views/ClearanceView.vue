<template>
  <div class="h-screen w-screen overflow-hidden flex flex-col bg-[#111418] text-[#F5F2EC] font-display">

    <!-- top nav — matches the main site header treatment -->
    <header class="shrink-0 border-b border-ob-sand/14">
      <nav class="px-6 h-[52px] flex items-center justify-between">
        <!-- brand -->
        <div class="flex items-center gap-[14px]">
          <span
            class="w-[30px] h-[30px] border-[1.5px] border-ob-bronze rounded-[3px] flex items-center justify-center font-display font-extrabold text-[12px] leading-none text-ob-sand tracking-[0.02em]"
          >SP</span>
          <span class="font-mono text-[12px] leading-none tracking-[0.04em] text-ob-soft">clearance · PV prep</span>
        </div>

        <!-- nav links -->
        <div class="flex items-center gap-8 font-display font-semibold text-[13px]">
          <button
            v-for="page in pages"
            :key="page.id"
            @click="active = page.id"
            class="transition-colors border-b-2 pb-[3px]"
            :class="active === page.id
              ? 'text-ob-text border-ob-teal'
              : 'text-ob-faint hover:text-ob-text border-transparent'"
          >{{ page.label }}</button>
        </div>
      </nav>
    </header>

    <!-- body -->
    <main class="flex-1 min-h-0">
      <OverviewPage v-if="active === 'overview'" />
      <TimelinePage v-else-if="active === 'timeline'" />
      <ContactsPage v-else-if="active === 'contacts'" />
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import OverviewPage from '@/components/clearance/OverviewPage.vue'
import TimelinePage from '@/components/clearance/TimelinePage.vue'
import ContactsPage from '@/components/clearance/ContactsPage.vue'

const pages = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contacts', label: 'Contacts' },
]

const active = ref('timeline')
</script>
