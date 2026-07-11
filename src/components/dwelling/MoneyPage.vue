<template>
  <div class="max-w-[1500px] mx-auto px-6 lg:px-10 py-10 space-y-12">
    <!-- repayment model + incentive stack side by side on wide screens -->
    <div class="grid xl:grid-cols-2 gap-x-14 gap-y-12 items-start">
      <section>
        <p class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-2">
          Repayment model
        </p>
        <p class="text-[13.5px] text-ob-muted mb-3 leading-relaxed">
          Work backwards: pick the payoff horizon you can live with, see the repayment it demands,
          then size the loan — not the other way round. P&amp;I, monthly compounding. Stress-test at
          +2%.
        </p>
        <p class="font-mono text-[11px] text-ob-faint mb-6 leading-relaxed">
          Seeded to your position: about ${{ fmt(personalPosition.calc.deposit) }} deposit plus this
          loan is roughly a ${{ fmt(personalPosition.calc.targetPrice) }} purchase, serviced from
          about ${{ fmt(personalPosition.calc.netMonthly) }} a month take-home. Nudge from there.
        </p>

        <div class="flex flex-wrap gap-6 mb-6">
          <div>
            <label
              for="loan"
              class="block font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-1"
            >
              Loan amount · ${{ fmt(loan) }}
            </label>
            <input
              id="loan"
              type="range"
              min="200000"
              max="800000"
              step="10000"
              v-model.number="loan"
              class="w-64 accent-[#3DB8A0]"
            />
          </div>
          <div>
            <label
              for="rate"
              class="block font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft mb-1"
            >
              Rate · {{ rate.toFixed(2) }}% p.a.
            </label>
            <input
              id="rate"
              type="range"
              min="4"
              max="9"
              step="0.05"
              v-model.number="rate"
              class="w-64 accent-[#D4903A]"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-[13px] min-w-[520px]">
            <thead>
              <tr
                class="font-mono text-[11px] uppercase tracking-[0.08em] text-ob-soft border-b border-ob-sand/14"
              >
                <th class="text-left py-2 pr-4 font-normal">Term</th>
                <th class="text-right py-2 px-4 font-normal">Monthly</th>
                <th class="text-right py-2 px-4 font-normal">Total interest</th>
                <th class="text-right py-2 pl-4 font-normal">Interest as % of loan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in schedule"
                :key="row.years"
                class="border-b border-ob-sand/8 last:border-0"
                :class="row.years <= 15 ? '' : 'opacity-45'"
              >
                <td
                  class="py-2.5 pr-4 font-semibold"
                  :class="row.years <= 15 ? 'text-ob-teal' : 'text-ob-muted'"
                >
                  {{ row.years }} yrs
                </td>
                <td class="py-2.5 px-4 text-right font-mono text-ob-text">
                  ${{ fmt(row.monthly) }}
                </td>
                <td class="py-2.5 px-4 text-right font-mono text-ob-muted">
                  ${{ fmt(row.interest) }}
                </td>
                <td
                  class="py-2.5 pl-4 text-right font-mono"
                  :class="row.pct > 60 ? 'text-ob-sand' : 'text-ob-dim'"
                >
                  {{ row.pct }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-[12px] text-ob-faint leading-relaxed">
          The 30-year row is greyed for a reason: on ${{ fmt(loan) }} at {{ rate.toFixed(2) }}%, the
          30-year path pays ${{ fmt(delta30v12) }} more interest than the 12-year path. That delta
          is the price of a bigger house you said you don't want.
        </p>
      </section>

      <section>
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
          Incentive stack · {{ AS_AT }} · dates matter
        </h2>
        <div class="space-y-3">
          <div
            v-for="s in schemes"
            :key="s.id"
            class="bg-ob-surface border border-ob-sand/8 rounded-[6px] p-4"
          >
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span class="text-[13.5px] font-bold text-ob-text">{{ s.name }}</span>
              <span class="font-mono text-[11.5px] text-ob-teal">{{ s.headline }}</span>
            </div>
            <p class="mt-2 text-[12.5px] leading-relaxed text-ob-dim">{{ s.detail }}</p>
            <p class="mt-1 font-mono text-[10.5px] text-ob-faint">verified: {{ s.verified }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- transport economics + parking -->
    <section class="grid lg:grid-cols-2 gap-x-14 gap-y-10">
      <div>
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
          Annual transport economics
        </h2>
        <div class="space-y-3">
          <div v-for="t in transportCosts" :key="t.item" class="border-l-2 border-ob-teal/45 pl-3">
            <div class="flex flex-wrap items-baseline gap-x-3">
              <span class="text-[13px] font-semibold text-ob-text">{{ t.item }}</span>
              <span class="font-mono text-[12px] text-ob-sand">{{ t.cost }}</span>
            </div>
            <p class="text-[12px] text-ob-dim mt-[2px] leading-relaxed">{{ t.note }}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-soft mb-4">
          Parking types, honestly priced
        </h2>
        <div class="space-y-3">
          <div v-for="p in parkingTypes" :key="p.type" class="border-l-2 border-ob-sand/45 pl-3">
            <p class="text-[13px] font-semibold text-ob-text">{{ p.type }}</p>
            <p class="text-[12px] text-ob-dim mt-[2px] leading-relaxed">{{ p.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- traps -->
    <section>
      <h2 class="font-mono text-[11px] tracking-[0.14em] uppercase text-ob-sand mb-4">
        Cheap-looking, expensive-being
      </h2>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <div
          v-for="t in hiddenCostTraps"
          :key="t.trap"
          class="bg-ob-surface2 border border-ob-sand/8 rounded-[6px] p-4"
        >
          <p class="text-[13px] font-bold text-ob-sand">{{ t.trap }}</p>
          <p class="mt-1.5 text-[12.5px] leading-relaxed text-ob-muted2">{{ t.reality }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  AS_AT,
  schemes,
  transportCosts,
  parkingTypes,
  personalPosition,
} from '@/data/dwelling/facts.js'
import { hiddenCostTraps } from '@/data/dwelling/framework.js'
import { totalInterest, buildSchedule } from '@/composables/useRepayment.js'

const loan = ref(personalPosition.calc.loan)
const rate = ref(personalPosition.calc.rate)
const TERMS = [5, 10, 12, 15, 20, 30]

const schedule = computed(() => buildSchedule(loan.value, rate.value, TERMS))

const delta30v12 = computed(() =>
  Math.round(totalInterest(loan.value, rate.value, 30) - totalInterest(loan.value, rate.value, 12)),
)

function fmt(n) {
  return n.toLocaleString('en-AU')
}
</script>
