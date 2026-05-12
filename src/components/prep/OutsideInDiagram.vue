<template>
  <div class="w-full px-3 pt-2 pb-0 bg-slate-800/30 border-b border-slate-700/50">
    <svg
      viewBox="0 0 870 112"
      width="100%"
      height="112"
      xmlns="http://www.w3.org/2000/svg"
      class="block overflow-visible"
      style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace"
    >
      <!-- Commands row -->
      <text x="40"  y="12" text-anchor="middle" font-size="10"  fill="#34d399">dig</text>
      <text x="170" y="12" text-anchor="middle" font-size="10"  fill="#34d399">curl -I</text>
      <text x="300" y="12" text-anchor="middle" font-size="10"  fill="#34d399">aws elbv2</text>
      <text x="432" y="12" text-anchor="middle" font-size="9.5" fill="#34d399">ss / systemctl</text>
      <text x="562" y="12" text-anchor="middle" font-size="10"  fill="#34d399">journalctl</text>
      <text x="688" y="12" text-anchor="middle" font-size="10"  fill="#34d399">nc / ss -tp</text>

      <!-- VPC boundary — purple dashed border -->
      <rect
        x="122" y="18" width="596" height="44"
        rx="2" fill="none"
        stroke="rgba(139,92,246,0.45)" stroke-width="0.85"
        stroke-dasharray="4,3"
      />
      <text x="126" y="29" font-size="8.5" fill="rgba(167,139,250,0.55)">VPC</text>

      <!-- ASG bracket (around Host node) -->
      <rect
        x="385" y="18" width="90" height="44"
        rx="2" fill="none"
        stroke="rgba(6,78,59,0.7)" stroke-width="0.75"
      />

      <!-- Arrows between nodes -->
      <line x1="76"  y1="40" x2="120" y2="40" stroke="#475569" stroke-width="0.75"/>
      <polygon points="120,37 126,40 120,43" fill="#475569"/>

      <line x1="208" y1="40" x2="248" y2="40" stroke="#475569" stroke-width="0.75"/>
      <polygon points="248,37 254,40 248,43" fill="#475569"/>

      <line x1="338" y1="40" x2="383" y2="40" stroke="#475569" stroke-width="0.75"/>
      <polygon points="383,37 389,40 383,43" fill="#475569"/>

      <line x1="477" y1="40" x2="516" y2="40" stroke="#475569" stroke-width="0.75"/>
      <polygon points="516,37 522,40 516,43" fill="#475569"/>

      <line x1="606" y1="40" x2="644" y2="40" stroke="#475569" stroke-width="0.75"/>
      <polygon points="644,37 650,40 644,43" fill="#475569"/>

      <!-- Data → RDS / ElastiCache branches -->
      <line x1="718" y1="40" x2="730" y2="40" stroke="#475569" stroke-width="0.75"/>
      <line x1="730" y1="29" x2="730" y2="51" stroke="#475569" stroke-width="0.75"/>
      <line x1="730" y1="29" x2="736" y2="29" stroke="#475569" stroke-width="0.75"/>
      <line x1="730" y1="51" x2="736" y2="51" stroke="#475569" stroke-width="0.75"/>

      <!-- Node rects -->
      <rect x="4"   y="22" width="72"  height="36" rx="3" fill="#0f172a" stroke="#475569" stroke-width="0.75"/>
      <rect x="128" y="22" width="80"  height="36" rx="3" fill="#0f172a" stroke="#475569" stroke-width="0.75"/>
      <rect x="256" y="22" width="82"  height="36" rx="3" fill="#0f172a" stroke="#475569" stroke-width="0.75"/>
      <rect x="391" y="22" width="78"  height="36" rx="3" fill="#0f172a" stroke="#475569" stroke-width="0.75"/>
      <rect x="522" y="22" width="84"  height="36" rx="3" fill="#0f172a" stroke="#475569" stroke-width="0.75"/>
      <rect x="650" y="22" width="68"  height="36" rx="3" fill="#0f172a" stroke="#475569" stroke-width="0.75"/>

      <!-- Node labels -->
      <text x="40"  y="40" text-anchor="middle" dominant-baseline="central" font-size="10"  fill="#64748b">DNS</text>
      <text x="168" y="40" text-anchor="middle" dominant-baseline="central" font-size="9.5" fill="#94a3b8">Load Balancer</text>
      <text x="297" y="40" text-anchor="middle" dominant-baseline="central" font-size="9.5" fill="#94a3b8">Target Group</text>
      <text x="430" y="40" text-anchor="middle" dominant-baseline="central" font-size="10"  fill="#94a3b8">Host</text>
      <text x="564" y="40" text-anchor="middle" dominant-baseline="central" font-size="9"   fill="#94a3b8">Process / App</text>
      <text x="684" y="40" text-anchor="middle" dominant-baseline="central" font-size="10"  fill="#94a3b8">Data</text>

      <!-- SG / sub-labels — dropped 8px lower, larger font -->
      <text x="40"  y="76" text-anchor="middle" font-size="9"  fill="#475569">external</text>
      <text x="168" y="76" text-anchor="middle" font-size="9.5" fill="#64748b">SG: 443/80</text>
      <text x="297" y="76" text-anchor="middle" font-size="9.5" fill="#64748b">health check</text>
      <text x="430" y="76" text-anchor="middle" font-size="9.5" fill="#64748b">SG: from ALB</text>
      <text x="564" y="76" text-anchor="middle" font-size="9.5" fill="#64748b">port / service</text>
      <text x="684" y="76" text-anchor="middle" font-size="9.5" fill="#64748b">SG: from EC2</text>

      <!-- ASG label — below SG line -->
      <text x="430" y="90" text-anchor="middle" font-size="9.5" fill="rgba(52,211,153,0.5)">ASG  ·  AMI</text>

      <!-- RDS / ElastiCache branch labels -->
      <text x="739" y="33" font-size="10" fill="#94a3b8">RDS / Proxy</text>
      <text x="739" y="55" font-size="10" fill="#94a3b8">ElastiCache</text>
    </svg>
  </div>
</template>
