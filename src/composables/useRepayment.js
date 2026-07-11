// src/composables/useRepayment.js
//
// Single source for the mortgage repayment math. Used by the Money model on the
// Overview tab and by the live expected-cost strip on the Decide tab. P&I,
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
