<template>
  <div class="w-full flex flex-col bg-[#111418] text-[#F5F2EC] font-display">
    <main class="flex-1 min-h-0">
      <router-view />
    </main>

    <footer class="border-t border-ob-sand/14 px-3 sm:px-6 py-3 sm:py-4">
      <p class="font-mono text-[11px] tracking-[0.04em] text-ob-faint max-w-3xl">
        Indicative figures as at {{ AS_AT }} · medians and scheme rules dated in-line · general
        information, not financial, legal or credit advice — verify with SRO Vic, Housing Australia
        and a licensed broker before acting.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { AS_AT } from '@/data/dwelling/facts.js'
</script>
