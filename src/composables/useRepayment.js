// src/composables/useRepayment.js
//
// Single source for the mortgage repayment math. Used by the Money model on the
// Settle overview and by the live expected-cost strip in the ranking workspace. P&I,
// monthly compounding.

export function monthlyPayment(principal, annualRatePct, years) {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (n <= 0) return 0
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

// Total interest paid over the full term.
export function totalInterest(principal, annualRatePct, years) {
  return monthlyPayment(principal, annualRatePct, years) * years * 12 - principal
}

// All-in monthly housing cost for a ranking record: amortised repayment on the
// price-band midpoint (current deposit, selected horizon) plus the monthly
// share of the owners-corp fee estimate. Single source for the decision pane
// and the expected-cost strip. `feeEstimate` is the annual $ figure the caller
// derives from the record's OC band.
export function allInMonthly(rec, { deposit, rate, years, feeEstimate = 0 }) {
  const p = rec.dwelling?.indicativePrice
  if (!p) return null
  const mid = (p[0] + p[1]) / 2
  const loan = Math.max(0, mid - deposit)
  return Math.round(monthlyPayment(loan, rate, years) + feeEstimate / 12)
}

// Convenience for building a term-comparison table (Money tab).
export function buildSchedule(principal, annualRatePct, terms) {
  return terms.map((years) => {
    const monthly = monthlyPayment(principal, annualRatePct, years)
    const interest = monthly * years * 12 - principal
    return {
      years,
      monthly: Math.round(monthly),
      interest: Math.round(interest),
      pct: principal > 0 ? Math.round((interest / principal) * 100) : 0,
    }
  })
}
