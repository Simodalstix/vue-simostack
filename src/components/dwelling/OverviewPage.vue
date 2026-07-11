<template>
  <div class="max-w-[1500px] mx-auto px-6 lg:px-10 py-10 space-y-12">
    <!-- thesis + non-negotiables share the first row -->
    <section class="grid lg:grid-cols-[1.25fr_1fr] gap-x-14 gap-y-10 items-start">
      <div>
        <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-3">
          The brief, distilled
        </p>
        <h1 class="text-[26px] md:text-[32px] font-extrabold leading-tight">
          A modest Melbourne home, on a one-seat ride to Collins St,
          <span class="text-ob-teal">paid off in 10–15 years</span> — with a real room for Lulu.
        </h1>
        <p class="mt-4 text-[14px] leading-relaxed text-ob-muted">
          Success is measured in housing security, debt burned down, commute quality and daily life
          — not capital growth. Melbourne's five-year underperformance and the Metro Tunnel opening
          make mid-2026 an unusually good moment for exactly this brief: the market is soft, the
          transport map just improved, and every first-home incentive is at a cyclical high.
        </p>
      </div>
      <div>
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
          Non-negotiables
        </h2>
        <ul class="space-y-2">
          <li
            v-for="(item, i) in nonNegotiables"
            :key="i"
            class="flex gap-3 text-[13.5px] leading-relaxed text-ob-muted2"
          >
            <span class="text-ob-teal mt-[1px] shrink-0">▸</span>{{ item }}
          </li>
        </ul>
      </div>
    </section>

    <!-- your position: the personal reality the tool serves -->
    <section>
      <div class="flex items-baseline justify-between mb-4 flex-wrap gap-x-4 gap-y-1">
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft">
          Your position · {{ personalPosition.asAt }}
        </h2>
        <span class="font-mono text-[11px] text-ob-faint">indicative and dated · not advice</span>
      </div>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <div
          v-for="f in personalPosition.figures"
          :key="f.label"
          class="bg-ob-surface border border-ob-sand/8 rounded-[6px] p-4"
        >
          <div class="flex items-baseline justify-between gap-3">
            <span class="text-[13px] font-semibold text-ob-text">{{ f.label }}</span>
            <span class="font-mono text-[13px] text-ob-sand whitespace-nowrap">{{ f.value }}</span>
          </div>
          <p class="mt-2 text-[12.5px] leading-relaxed text-ob-dim">{{ f.detail }}</p>
        </div>
      </div>
      <div class="grid lg:grid-cols-2 gap-x-14 gap-y-6 mt-6">
        <div>
          <h3 class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-3">
            Planning assumptions
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(a, i) in personalPosition.assumptions"
              :key="i"
              class="flex gap-3 text-[13px] leading-relaxed text-ob-muted2"
            >
              <span class="text-ob-teal mt-[1px] shrink-0">▸</span>{{ a }}
            </li>
          </ul>
        </div>
        <div class="border-l-2 border-ob-sand/45 pl-4">
          <h3 class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-sand mb-2">
            Eligibility flag · verify
          </h3>
          <p class="text-[12.5px] leading-relaxed text-ob-muted2">
            {{ personalPosition.eligibilityFlag }}
          </p>
        </div>
      </div>
    </section>

    <!-- market facts -->
    <section>
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
        Market context · {{ AS_AT }}
      </h2>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <div
          v-for="f in marketFacts"
          :key="f.id"
          class="bg-ob-surface border border-ob-sand/8 rounded-[6px] p-4"
        >
          <div class="flex items-baseline justify-between gap-3">
            <span class="text-[13px] font-semibold text-ob-text">{{ f.label }}</span>
            <span class="font-mono text-[13px] text-ob-sand whitespace-nowrap">{{ f.value }}</span>
          </div>
          <p class="mt-2 text-[12.5px] leading-relaxed text-ob-dim">{{ f.detail }}</p>
        </div>
      </div>
    </section>

    <!-- collins st + bands -->
    <section class="grid lg:grid-cols-[1.4fr_1fr] gap-x-14 gap-y-8">
      <div>
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
          Which end of Collins St matters
        </h2>
        <div class="grid md:grid-cols-3 gap-5">
          <div
            v-for="s in collinsStSections"
            :key="s.section"
            class="border-l-2 border-ob-teal/45 pl-4"
          >
            <p class="text-[13px] font-semibold text-ob-text">{{ s.section }}</p>
            <p class="text-[12.5px] leading-relaxed text-ob-dim mt-1">{{ s.access }}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
          Commute bands (door-to-door)
        </h2>
        <table class="w-full text-[13px]">
          <tbody>
            <tr
              v-for="b in commuteBands"
              :key="b.band"
              class="border-b border-ob-sand/8 last:border-0"
            >
              <td class="py-2 pr-4 font-semibold" :class="bandClass(b.band)">{{ b.band }}</td>
              <td class="py-2 font-mono text-[12px] text-ob-muted">{{ b.range }}</td>
            </tr>
          </tbody>
        </table>
        <p class="mt-3 text-[12px] text-ob-faint leading-relaxed">
          Guides, not rules — and never straight-line distance. Sunshine (13&nbsp;km out, tunnel
          one-seat) beats plenty of 7&nbsp;km suburbs with a tram crawl.
        </p>
      </div>
    </section>
  </div>

  <!-- regions (moved from the Areas tab as reading material) -->
  <div class="border-t border-ob-sand/14">
    <div class="max-w-[1500px] mx-auto px-6 lg:px-10 pt-10">
      <RegionLens />
    </div>
  </div>

  <!-- money model + incentive stack + economics + traps -->
  <div class="border-t border-ob-sand/14">
    <MoneyPage />
  </div>

  <!-- open questions, professional questions, research plan -->
  <div class="border-t border-ob-sand/14">
    <PlanPage />
  </div>
</template>

<script setup>
import {
  AS_AT,
  marketFacts,
  nonNegotiables,
  collinsStSections,
  commuteBands,
  personalPosition,
} from '@/data/dwelling/facts.js'
import RegionLens from '@/components/dwelling/RegionLens.vue'
import MoneyPage from '@/components/dwelling/MoneyPage.vue'
import PlanPage from '@/components/dwelling/PlanPage.vue'

function bandClass(band) {
  return (
    {
      Excellent: 'text-ob-teal',
      Good: 'text-ob-teal-bright',
      Acceptable: 'text-ob-sand',
      Difficult: 'text-ob-faint',
    }[band] || 'text-ob-sand'
  )
}
</script>
