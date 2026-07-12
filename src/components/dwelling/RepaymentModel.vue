<template>
  <div>
    <p class="text-[13.5px] text-ob-muted mb-3 leading-relaxed">
      Work backwards: pick the payoff horizon you can live with, see the repayment it demands, then
      size the loan — not the other way round. P&amp;I, monthly compounding. Stress-test at +2%.
    </p>
    <p class="font-mono text-[11px] text-ob-faint mb-6 leading-relaxed">
      Seeded to your position: about ${{ fmt(personalPosition.calc.deposit) }} deposit plus this
      loan is roughly a ${{ fmt(personalPosition.calc.targetPrice) }} purchase, serviced from about
      ${{ fmt(personalPosition.calc.netMonthly) }}
      a month take-home. Nudge from there.
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
            <td class="py-2.5 px-4 text-right font-mono text-ob-text">${{ fmt(row.monthly) }}</td>
            <td class="py-2.5 px-4 text-right font-mono text-ob-muted">${{ fmt(row.interest) }}</td>
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
      30-year path pays ${{ fmt(delta30v12) }} more interest than the 12-year path. That delta is
      the price of a bigger house you said you don't want.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { personalPosition } from '@/data/dwelling/facts.js'
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
