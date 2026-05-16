<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- OS Mental Model banner -->
    <div class="shrink-0 px-6 pt-4 pb-4 border-b border-slate-700/60 bg-slate-800/20">
      <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-3">Linux — OS Mental Model</div>
      <div class="grid grid-cols-4 gap-6">

        <!-- Boot chain -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">Boot Chain</div>
          <div class="space-y-0.5 text-[11px]">
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">BIOS/UEFI</span><span class="text-slate-500"> — firmware, hardware init, locates bootloader</span></span>
            </div>
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">GRUB</span><span class="text-slate-500"> — presents menu, loads kernel + initramfs into RAM</span></span>
            </div>
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">kernel</span><span class="text-slate-500"> — decompresses, detects hardware, mounts root FS</span></span>
            </div>
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">initramfs</span><span class="text-slate-500"> — early userspace, loads drivers, unlocks disk</span></span>
            </div>
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">systemd PID 1</span><span class="text-slate-500"> — first real process, takes over from kernel</span></span>
            </div>
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">target</span><span class="text-slate-500"> — multi-user.target or graphical.target</span></span>
            </div>
            <div class="flex gap-1.5 items-baseline">
              <span class="text-slate-700 shrink-0">→</span>
              <span><span class="text-amber-300/80">services</span><span class="text-slate-500"> — started by systemd units per target</span></span>
            </div>
            <div class="mt-2.5 pl-2.5 border-l-2 border-slate-700/60 text-[10px] text-slate-500 leading-snug space-y-1">
              <div>Recovery: add <code class="text-emerald-400/70">init=/bin/bash</code> to kernel line in GRUB → drops to root shell before systemd. Useful for password reset or mount debugging.</div>
              <div><code class="text-emerald-400/70">systemctl get-default</code> — shows the current boot target</div>
            </div>
          </div>
        </div>

        <!-- Process model -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">Process Model</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-slate-400">Kernel scheduler (CFS) allocates CPU time in time slices. Every process is either using CPU, waiting for it, or waiting for I/O.</div>
            <div class="space-y-0.5 mt-1">
              <div><code class="text-emerald-400/80">R</code><span class="text-slate-500"> — running or runnable, on the CPU or in the run queue</span></div>
              <div><code class="text-emerald-400/80">S</code><span class="text-slate-500"> — interruptible sleep, waiting for event or signal</span></div>
              <div><code class="text-emerald-400/80 font-semibold">D</code><span class="text-slate-400"> — uninterruptible I/O wait — <span class="text-amber-300/70">cannot be killed</span></span></div>
              <div><code class="text-emerald-400/80">Z</code><span class="text-slate-500"> — zombie, exited but parent hasn't reaped it</span></div>
              <div><code class="text-emerald-400/80">T</code><span class="text-slate-500"> — stopped via SIGSTOP or debugger</span></div>
            </div>
            <div class="mt-1.5 text-slate-500">Load average = count of R + D state processes. High load + low CPU = high D count = I/O bottleneck, not compute. Load average ≠ CPU utilisation.</div>
            <div class="mt-1 text-slate-500"><code class="text-emerald-400/60">/proc/&lt;pid&gt;/</code> — live view: fd, maps, status, limits. The kernel's truth about any process.</div>
            <div class="text-slate-500">cgroups enforce resource limits (CPU, memory, I/O) per process group — what containers use under the hood.</div>
          </div>
        </div>

        <!-- Memory model -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">Memory Model</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-slate-400">Each process gets a private virtual address space. The MMU + kernel map virtual pages → physical pages transparently.</div>
            <div class="space-y-0.5 mt-1">
              <div><span class="text-sky-400/80">page fault</span><span class="text-slate-500"> — page not in RAM, kernel loads it from disk or swap. Normal unless constant.</span></div>
              <div><span class="text-sky-400/80">page cache</span><span class="text-slate-500"> — kernel uses spare RAM to cache file reads. <code class="text-emerald-400/60">free -h</code> "available" includes this.</span></div>
              <div><span class="text-sky-400/80">anon memory</span><span class="text-slate-500"> — heap + stack, not file-backed. <code class="text-emerald-400/60">anon-rss</code> in OOM output = actual RAM consumed.</span></div>
              <div><span class="text-sky-400/80">swap</span><span class="text-slate-500"> — overflow when physical RAM exhausted. Swap in use = paging to disk on every access. Everything slows.</span></div>
            </div>
            <div class="mt-1.5 text-slate-500">OOM killer — RAM + swap both exhausted, kernel picks a process to kill. Scored by memory usage and heuristics. Evidence: <code class="text-emerald-400/60">dmesg | grep -i killed</code> or <code class="text-emerald-400/60">journalctl -k</code>.</div>
            <div class="text-slate-500"><code class="text-emerald-400/60">free -h</code> — the <span class="text-slate-300">available</span> column is what matters, not free. Available = free + reclaimable page cache.</div>
          </div>
        </div>

        <!-- Interview posture -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">Interview Posture</div>
          <div class="space-y-3 text-[11px]">
            <div>
              <div class="text-slate-200 font-semibold mb-0.5">Discuss commands — don't just recall them</div>
              <div class="text-slate-500">For every command: why you'd reach for it, what it tells you, and what you'd do with the output. That's the gap between someone who's used a thing and someone who understands it.</div>
            </div>
            <div>
              <div class="text-slate-200 font-semibold mb-0.5">Interviewer as Google</div>
              <div class="text-slate-500">If you hit a wall, narrate your thinking and ask. <span class="text-slate-400 italic">"I'd normally check X here — is that the direction you want me to go?"</span> shows structured thinking. Not weakness.</div>
            </div>
            <div>
              <div class="text-slate-200 font-semibold mb-0.5">The ceiling test</div>
              <div class="text-slate-500">They're probing until you reach your limit — that's the point. When you genuinely don't know, say so cleanly and offer what you'd do next. That's exactly what they're watching for.</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Code columns -->
    <div class="flex-1 min-h-0 grid grid-cols-3 gap-6 p-6">
      <div v-for="(col, ci) in cols" :key="ci" class="overflow-y-auto space-y-6 min-h-0">
        <div v-for="section in col" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">
            {{ section.heading }}
          </div>
          <PrepCodeBlock :code="section.code" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { linuxRaw } from '@/data/prep/linuxRaw.js'

const cols = [
  linuxRaw.slice(0, 3),
  linuxRaw.slice(3, 5),
  linuxRaw.slice(5),
]
</script>
