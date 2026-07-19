<template>
  <div
    class="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10 py-5 sm:py-8 lg:py-10 space-y-6 lg:space-y-8"
  >
    <!-- PERMANENT: thesis + non-negotiables share the first row -->
    <section class="grid lg:grid-cols-[1.25fr_1fr] gap-x-14 gap-y-6 lg:gap-y-10 items-start">
      <div>
        <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-3">
          The brief, distilled
        </p>
        <h1 class="text-[24px] sm:text-[26px] md:text-[32px] font-extrabold leading-tight">
          A modest Melbourne home, on a one-seat ride to Collins St,
          <span class="text-ob-teal">paid off in 10–15 years</span> — with a real room for Lulu.
        </h1>
        <p class="mt-4 text-[14px] leading-relaxed text-ob-muted">
          Success is measured in housing security, debt burned down, commute quality and daily life
          — not capital growth. Melbourne's five-year underperformance and the Metro Tunnel opening
          make mid-2026 an unusually good moment for exactly this brief: the market is soft, the
          transport map just improved, and every first-home incentive is at a cyclical high.
        </p>
        <router-link
          :to="{ name: 'DwellingDecide' }"
          class="mt-5 sm:hidden flex items-center justify-between rounded-[8px] border border-ob-teal/30 bg-ob-teal/8 px-4 py-3 text-[13px] font-semibold text-ob-teal"
        >
          <span>Open mobile suburb rankings</span>
          <span aria-hidden="true">→</span>
        </router-link>
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

    <!-- DEPTH ON DEMAND: one section open at a time, 2-column masonry on wide screens -->
    <div class="grid lg:grid-cols-2 gap-3 items-start grid-flow-row-dense">
      <!-- your position -->
      <AccordionSection
        title="Your position"
        :summary="summaries.position"
        :open="open === 'position'"
        @toggle="toggle('position')"
      >
        <div class="space-y-6 pt-3">
          <p class="font-mono text-[11px] text-ob-faint">
            As at {{ personalPosition.asAt }} · indicative and dated, not advice
          </p>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            <div
              v-for="f in personalPosition.figures"
              :key="f.label"
              class="bg-ob-surface2 border border-ob-sand/8 rounded-[6px] p-4"
            >
              <div class="flex items-baseline justify-between gap-3">
                <span class="text-[13px] font-semibold text-ob-text">{{ f.label }}</span>
                <span class="font-mono text-[13px] text-ob-sand whitespace-nowrap">{{
                  f.value
                }}</span>
              </div>
              <p class="mt-2 text-[12.5px] leading-relaxed text-ob-dim">{{ f.detail }}</p>
            </div>
          </div>
          <div class="grid lg:grid-cols-2 gap-x-14 gap-y-6">
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
        </div>
      </AccordionSection>

      <!-- market context -->
      <AccordionSection
        title="Market context"
        :summary="summaries.market"
        :open="open === 'market'"
        @toggle="toggle('market')"
      >
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3 pt-3">
          <div
            v-for="f in marketFacts"
            :key="f.id"
            class="bg-ob-surface2 border border-ob-sand/8 rounded-[6px] p-4"
          >
            <div class="flex items-baseline justify-between gap-3">
              <span class="text-[13px] font-semibold text-ob-text">{{ f.label }}</span>
              <span class="font-mono text-[13px] text-ob-sand whitespace-nowrap">{{
                f.value
              }}</span>
            </div>
            <p class="mt-2 text-[12.5px] leading-relaxed text-ob-dim">{{ f.detail }}</p>
          </div>
        </div>
      </AccordionSection>

      <!-- collins st access + commute bands -->
      <AccordionSection
        title="Collins St access"
        :summary="summaries.collins"
        :open="open === 'collins'"
        @toggle="toggle('collins')"
      >
        <div class="grid lg:grid-cols-[1.4fr_1fr] gap-x-14 gap-y-8 pt-3">
          <div>
            <h3 class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-4">
              Which end of Collins St matters
            </h3>
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
            <h3 class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-4">
              Commute bands (door-to-door)
            </h3>
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
        </div>
      </AccordionSection>

      <!-- regional lens -->
      <AccordionSection
        title="Regional lens"
        :summary="summaries.regions"
        :open="open === 'regions'"
        @toggle="toggle('regions')"
      >
        <div class="pt-3">
          <RegionLens :heading="false" />
        </div>
      </AccordionSection>

      <!-- repayment model -->
      <AccordionSection
        title="Repayment model"
        :summary="summaries.repayment"
        :open="open === 'repayment'"
        @toggle="toggle('repayment')"
      >
        <div class="pt-3">
          <RepaymentModel />
        </div>
      </AccordionSection>

      <!-- incentive stack -->
      <AccordionSection
        title="Incentive stack"
        :summary="summaries.incentive"
        :open="open === 'incentive'"
        @toggle="toggle('incentive')"
      >
        <div class="space-y-3 pt-3">
          <p class="font-mono text-[11px] text-ob-faint">
            As at {{ AS_AT }} · dates matter, verify before relying
          </p>
          <div
            v-for="s in schemes"
            :key="s.id"
            class="bg-ob-surface2 border border-ob-sand/8 rounded-[6px] p-4"
          >
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span class="text-[13.5px] font-bold text-ob-text">{{ s.name }}</span>
              <span class="font-mono text-[11.5px] text-ob-teal">{{ s.headline }}</span>
            </div>
            <p class="mt-2 text-[12.5px] leading-relaxed text-ob-dim">{{ s.detail }}</p>
            <p class="mt-1 font-mono text-[10.5px] text-ob-faint">verified: {{ s.verified }}</p>
          </div>
        </div>
      </AccordionSection>

      <!-- transport economics -->
      <AccordionSection
        title="Transport economics"
        :summary="summaries.transport"
        :open="open === 'transport'"
        @toggle="toggle('transport')"
      >
        <div class="space-y-3 pt-3">
          <div v-for="t in transportCosts" :key="t.item" class="border-l-2 border-ob-teal/45 pl-3">
            <div class="flex flex-wrap items-baseline gap-x-3">
              <span class="text-[13px] font-semibold text-ob-text">{{ t.item }}</span>
              <span class="font-mono text-[12px] text-ob-sand">{{ t.cost }}</span>
            </div>
            <p class="text-[12px] text-ob-dim mt-[2px] leading-relaxed">{{ t.note }}</p>
          </div>
        </div>
      </AccordionSection>

      <!-- parking types -->
      <AccordionSection
        title="Parking types"
        :summary="summaries.parking"
        :open="open === 'parking'"
        @toggle="toggle('parking')"
      >
        <div class="space-y-3 pt-3">
          <div v-for="p in parkingTypes" :key="p.type" class="border-l-2 border-ob-sand/45 pl-3">
            <p class="text-[13px] font-semibold text-ob-text">{{ p.type }}</p>
            <p class="text-[12px] text-ob-dim mt-[2px] leading-relaxed">{{ p.note }}</p>
          </div>
        </div>
      </AccordionSection>

      <!-- hidden-cost traps -->
      <AccordionSection
        title="Hidden-cost traps"
        :summary="summaries.traps"
        :open="open === 'traps'"
        @toggle="toggle('traps')"
      >
        <div class="grid md:grid-cols-2 gap-3 pt-3">
          <div
            v-for="t in hiddenCostTraps"
            :key="t.trap"
            class="bg-ob-surface2 border border-ob-sand/8 rounded-[6px] p-4"
          >
            <p class="text-[13px] font-bold text-ob-sand">{{ t.trap }}</p>
            <p class="mt-1.5 text-[12.5px] leading-relaxed text-ob-muted2">{{ t.reality }}</p>
          </div>
        </div>
      </AccordionSection>

      <!-- open questions -->
      <AccordionSection
        title="Open questions"
        :summary="summaries.questions"
        :open="open === 'questions'"
        @toggle="toggle('questions')"
      >
        <div class="pt-3">
          <p class="text-[13.5px] text-ob-muted max-w-3xl mb-4 leading-relaxed">
            These inputs decide which strategy wins. Everything else here is stable; these are not.
          </p>
          <div class="grid md:grid-cols-2 gap-3">
            <div
              v-for="(q, i) in infoNeeded"
              :key="i"
              class="bg-ob-surface2 border border-ob-sand/8 rounded-[6px] p-4"
            >
              <p class="text-[13.5px] font-semibold text-ob-text">{{ q.q }}</p>
              <p class="mt-1 text-[12.5px] leading-relaxed text-ob-dim">{{ q.why }}</p>
            </div>
          </div>
        </div>
      </AccordionSection>

      <!-- questions for the professionals -->
      <AccordionSection
        title="Questions for the professionals"
        :summary="summaries.professional"
        :open="open === 'professional'"
        @toggle="toggle('professional')"
      >
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6 pt-3">
          <div v-for="g in professionalQuestions" :key="g.who">
            <p class="text-[13px] font-bold text-ob-teal mb-2">{{ g.who }}</p>
            <ul class="space-y-1.5">
              <li
                v-for="(item, i) in g.items"
                :key="i"
                class="text-[12.5px] leading-relaxed text-ob-muted2 flex gap-2"
              >
                <span class="text-ob-faint shrink-0">?</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>
      </AccordionSection>

      <!-- research plan -->
      <AccordionSection
        title="Research plan"
        :summary="summaries.plan"
        :open="open === 'plan'"
        @toggle="toggle('plan')"
      >
        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-4 pt-3">
          <div
            v-for="p in researchPlan"
            :key="p.phase"
            class="relative border-l border-ob-sand/14 pl-5"
          >
            <span
              class="absolute -left-[5px] top-[4px] w-[9px] h-[9px] rounded-full bg-ob-teal"
            ></span>
            <p class="font-mono text-[12px] tracking-[0.04em] text-ob-sand mb-2">{{ p.phase }}</p>
            <ul class="space-y-1.5">
              <li
                v-for="(s, i) in p.steps"
                :key="i"
                class="text-[13px] leading-relaxed text-ob-muted2 flex gap-2"
              >
                <span class="text-ob-teal shrink-0">▸</span>{{ s }}
              </li>
            </ul>
          </div>
        </div>
      </AccordionSection>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  AS_AT,
  marketFacts,
  schemes,
  nonNegotiables,
  collinsStSections,
  commuteBands,
  parkingTypes,
  transportCosts,
  personalPosition,
} from '@/data/dwelling/facts.js'
import {
  infoNeeded,
  professionalQuestions,
  researchPlan,
  hiddenCostTraps,
} from '@/data/dwelling/framework.js'
import { regions } from '@/data/dwelling/regions.js'
import { monthlyPayment } from '@/composables/useRepayment.js'
import AccordionSection from '@/components/dwelling/AccordionSection.vue'
import RegionLens from '@/components/dwelling/RegionLens.vue'
import RepaymentModel from '@/components/dwelling/RepaymentModel.vue'

// one section open at a time; all collapsed by default so the page opens compact
const open = ref(null)
function toggle(id) {
  open.value = open.value === id ? null : id
}

const calc = personalPosition.calc

function fmt(n) {
  return Math.round(n).toLocaleString('en-AU')
}
function figVal(label) {
  return personalPosition.figures.find((f) => f.label === label)?.value ?? ''
}
function marketVal(id) {
  return marketFacts.find((f) => f.id === id)?.value ?? ''
}
function schemeHead(id) {
  return schemes.find((s) => s.id === id)?.headline ?? ''
}
function shortCost(s) {
  return s.replace('≈ ', '').replace(' / yr', '')
}

// Collapsed-header one-liners, derived from the data files so they never rot.
const summaries = computed(() => ({
  position: `transition plan · deposit ${figVal('Deposit outlook')} · borrow ${
    figVal('Indicative borrowing').split(',')[0]
  }`,
  market: `Median ${marketVal('median-dwelling')} · ${marketVal(
    'buyers-window',
  )} · Metro Tunnel ${marketVal('metro-tunnel').split(' ')[0].toLowerCase()}`,
  collins: `${collinsStSections
    .map((s) => s.section.match(/^(\w+)/)[1])
    .join(' · ')} ends · ${commuteBands.length} door-to-door bands`,
  regions: regions.map((r) => r.name.split(/[ /]/)[0]).join(' · '),
  repayment: `From $${fmt(calc.loan)} @ ${calc.rate}% · 15yr ≈ $${fmt(
    monthlyPayment(calc.loan, calc.rate, 15),
  )}/mo`,
  incentive: `${schemeHead('fhb-duty').split(',')[0]} · OTP concession · ${
    schemeHead('fhbg').split(',')[0]
  } scheme`,
  transport: `Myki ${shortCost(transportCosts[0].cost)} vs daily CBD ${shortCost(
    transportCosts[3].cost,
  )}`,
  parking: `${parkingTypes.length} parking types · ${parkingTypes[0].type.toLowerCase()} to no parking`,
  traps: `${hiddenCostTraps.length} traps where the sticker price hides the real cost`,
  questions: `${infoNeeded.length} inputs still unknown; they decide which strategy wins`,
  professional: professionalQuestions.map((g) => g.who.split(/[ /]/)[0]).join(' · '),
  plan: researchPlan
    .map((p) => p.phase.replace(/^\d+\s*·\s*/, '').replace(/\s*\(.*\)\s*/, ''))
    .join(' → '),
}))

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
