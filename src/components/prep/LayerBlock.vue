<template>
  <div class="rounded-lg border border-slate-700/40 border-l-[4px] overflow-hidden"
       :style="{ borderLeftColor: borderColor }"
       :class="bgClass">

    <!-- Main row -->
    <div class="flex items-center gap-3 px-3"
         :class="compact ? 'py-2.5' : 'py-3'">
      <div class="w-[120px] shrink-0">
        <div class="text-[13px] font-semibold text-slate-200 font-mono leading-tight">
          {{ LAYER_LABELS[layer.layer] || layer.layer }}
        </div>
        <div v-if="LAYER_DESCRIPTORS[layer.layer]"
             class="text-[10px] text-slate-500 mt-0.5 font-sans leading-tight">
          {{ LAYER_DESCRIPTORS[layer.layer] }}
        </div>
      </div>
      <span class="text-[10px] px-2.5 py-0.5 rounded-full border border-slate-600/60
                   bg-slate-800 text-slate-400 font-mono shrink-0 whitespace-nowrap">
        {{ layer.tool }}
      </span>
      <span class="flex-1 text-[12px] font-mono" :class="signalClass">
        {{ layer.signal || '—' }}
      </span>
    </div>

    <!-- Branches -->
    <div v-if="layer.branches?.length"
         class="px-3 pb-2.5 border-t border-slate-700/30 pt-1.5 space-y-1">
      <div v-for="(b, i) in layer.branches" :key="i"
           class="flex gap-2 items-baseline text-[11px] font-mono pl-2">
        <span class="text-slate-600 shrink-0 select-none">
          {{ i === layer.branches.length - 1 ? '└─' : '├─' }}
        </span>
        <span class="shrink-0" :class="signalClass">{{ b.signal }}</span>
        <span class="text-slate-500 italic font-sans">{{ b.meaning }}</span>
      </div>
    </div>

    <!-- Sub-rows (ASG context) -->
    <div v-if="layer.subRows?.length"
         class="px-3 pb-2.5 border-t border-slate-700/30 pt-1.5 space-y-1">
      <div v-for="sub in layer.subRows" :key="sub.layer"
           class="flex gap-2 items-center text-[11px] font-mono pl-2">
        <span class="text-slate-600 shrink-0 select-none">└─</span>
        <span class="text-slate-400 shrink-0">{{ LAYER_LABELS[sub.layer] || sub.layer }}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full border border-slate-700/40
                     bg-slate-800/60 text-slate-500 shrink-0">
          {{ sub.tool }}
        </span>
        <span class="text-slate-500 italic font-sans">{{ sub.signal }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  layer:   { type: Object,  required: true },
  compact: { type: Boolean, default: false },
})

const LAYER_LABELS = {
  dns: 'DNS', alb: 'Load Balancer', targetgroup: 'Target Group',
  system: 'System', process: 'Process', app: 'App', data: 'Data',
  asg: 'ASG', rds: 'RDS', cache: 'Cache',
}

const LAYER_DESCRIPTORS = {
  dns:         'name resolution',
  alb:         'edge · TLS termination · routing',
  targetgroup: 'health checks · registration',
  system:      'CPU · memory · disk · I/O',
  process:     'service state · port binding',
  app:         'logs · application behaviour',
  data:        'database · cache · connections',
  asg:         'scaling · health check type',
}

const BORDER_COLORS = {
  cleared: '#22c55e',
  stuck:   '#fbbf24',
  failing: '#f43f5e',
  reached: '#64748b',
  unknown: '#334155',
}

const BG_CLASSES = {
  cleared: 'bg-emerald-950/40',
  stuck:   'bg-amber-950/50',
  failing: 'bg-rose-950/50',
  reached: 'bg-slate-800/40',
  unknown: 'bg-slate-800/20',
}

const SIGNAL_CLASSES = {
  cleared: 'text-emerald-400',
  stuck:   'text-amber-300',
  failing: 'text-rose-300',
  reached: 'text-slate-400',
  unknown: 'text-slate-500',
}

const status      = computed(() => props.layer.status)
const borderColor = computed(() => BORDER_COLORS[status.value] || BORDER_COLORS.unknown)
const bgClass     = computed(() => BG_CLASSES[status.value]    || BG_CLASSES.unknown)
const signalClass = computed(() => SIGNAL_CLASSES[status.value] || SIGNAL_CLASSES.unknown)
</script>
