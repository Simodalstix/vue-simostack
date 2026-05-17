<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Code columns -->
    <div class="flex-1 min-h-0 grid grid-cols-3 gap-6 p-6">

      <!-- Column 1: Boot Chain + linuxRaw[0–2] -->
      <div class="overflow-y-auto space-y-6 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">Boot Chain — ownership transfer</div>
          <div class="space-y-1.5 text-[11px]">

            <div class="pl-2 border-l-2 border-slate-700/50 space-y-0">
              <div class="text-amber-300/80 font-semibold">BIOS / UEFI</div>
              <div class="text-slate-400">Firmware. Initialises hardware.</div>
              <div class="text-slate-400">Finds first bootable media → hands off.</div>
              <div class="text-slate-600 italic">Does not load the OS.</div>
            </div>

            <div class="text-slate-700 pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-slate-700/50 space-y-0">
              <div class="text-amber-300/80 font-semibold">GRUB (bootloader)</div>
              <div class="text-slate-400">Loads kernel + initramfs into RAM.</div>
              <div class="text-slate-400">Passes kernel parameters (cmdline).</div>
              <div class="text-slate-600 italic">Does not manage services or targets.</div>
              <div class="text-orange-400/60 text-[10px]">Failure → boot menu drops. Edit kernel line: <code class="text-emerald-400/60">init=/bin/bash</code> for recovery shell.</div>
            </div>

            <div class="text-slate-700 pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-slate-700/50 space-y-0">
              <div class="text-amber-300/80 font-semibold">initramfs</div>
              <div class="text-slate-400">Early userspace — runs entirely in RAM.</div>
              <div class="text-slate-400">Loads storage, LVM, RAID drivers.</div>
              <div class="text-slate-400">Mounts the real root filesystem.</div>
              <div class="text-orange-400/60 text-[10px]">Failure → <span class="text-slate-400">cannot mount root filesystem</span> / dracut emergency shell.</div>
            </div>

            <div class="text-slate-700 pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-slate-700/50 space-y-0">
              <div class="text-amber-300/80 font-semibold">kernel</div>
              <div class="text-slate-400">Decompresses. Detects hardware.</div>
              <div class="text-slate-400">Spawns PID 1 — control transfers permanently.</div>
              <div class="text-slate-600 italic">Does not start services directly.</div>
            </div>

            <div class="text-slate-700 pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-amber-500/30 space-y-0">
              <div class="text-amber-300/80 font-semibold">systemd (PID 1)</div>
              <div class="text-slate-400">First real process. Owns the rest of boot.</div>
              <div class="text-slate-400">Reads unit files → resolves deps → activates targets.</div>
              <div class="text-slate-400"><code class="text-emerald-400/60">multi-user.target</code> — servers. <code class="text-emerald-400/60">graphical.target</code> adds display.</div>
              <div class="text-orange-400/60 text-[10px]">Unit failure → <code class="text-emerald-400/60">systemctl status &lt;unit&gt;</code> / <code class="text-emerald-400/60">journalctl -b -u &lt;unit&gt;</code></div>
            </div>

          </div>
        </div>

        <div v-for="section in cols[0]" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">{{ section.heading }}</div>
          <PrepCodeBlock :code="section.code" />
        </div>

      </div>

      <!-- Column 2: Memory Model + linuxRaw[3–4] -->
      <div class="overflow-y-auto space-y-6 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">Memory Model — symptom thinking</div>
          <div class="text-[11px] space-y-1.5">

            <div class="text-slate-500 leading-snug">Each process has a private virtual address space. The MMU maps virtual → physical memory transparently. You usually ignore this abstraction — until the system comes under pressure.</div>

            <div class="space-y-1.5 mt-0.5">

              <div class="pl-2 border-l-2 border-sky-700/40 space-y-0.5">
                <div class="text-sky-400/80 font-semibold">page cache</div>
                <div class="text-slate-400">Kernel uses spare RAM to cache file reads.</div>
                <div class="text-slate-400">Repeated disk access hits RAM instead → much faster.</div>
                <div class="text-slate-600 italic">Free RAM is wasted RAM. <code class="text-emerald-400/60">available</code> in <code class="text-emerald-400/60">free -h</code> includes reclaimable cache.</div>
              </div>

              <div class="pl-2 border-l-2 border-sky-700/40 space-y-0.5">
                <div class="text-sky-400/80 font-semibold">page fault</div>
                <div class="text-slate-400">Requested page not currently in RAM.</div>
                <div class="text-slate-500">Minor fault = resolved from existing memory mappings.</div>
                <div class="text-slate-500">Major fault = requires disk/storage access.</div>
                <div class="text-orange-400/60 text-[10px]">Sustained major faults usually indicate memory pressure. System performance degrades before OOM occurs.</div>
              </div>

              <div class="pl-2 border-l-2 border-sky-700/40 space-y-0.5">
                <div class="text-sky-400/80 font-semibold">anon memory</div>
                <div class="text-slate-400">Heap + stack allocations — not file-backed.</div>
                <div class="text-slate-500"><code class="text-emerald-400/60">anon-rss</code> in OOM output represents actual private RAM consumed by the process.</div>
              </div>

              <div class="pl-2 border-l-2 border-amber-500/30 space-y-0.5">
                <div class="text-amber-300/70 font-semibold">swap</div>
                <div class="text-slate-400">Disk used as RAM overflow.</div>
                <div class="text-slate-400">Heavy swap activity causes massive latency because memory access becomes disk I/O.</div>
                <div class="text-orange-400/60 text-[10px]"><code class="text-emerald-400/60">vmstat 1</code> → <code class="text-emerald-400/60">si</code>/<code class="text-emerald-400/60">so</code> non-zero = active swapping.</div>
              </div>

              <div class="pl-2 border-l-2 border-red-700/40 space-y-0.5">
                <div class="text-red-400/70 font-semibold">OOM killer</div>
                <div class="text-slate-400">Triggered when RAM + swap are exhausted.</div>
                <div class="text-slate-400">Kernel selects a process to kill using an OOM scoring heuristic.</div>
                <div class="text-slate-500">Large anonymous memory consumers are common targets because that memory is difficult to reclaim.</div>
                <div class="text-orange-400/60 text-[10px]">Evidence: <code class="text-emerald-400/60">dmesg | grep -i killed</code> or <code class="text-emerald-400/60">journalctl -k</code></div>
              </div>

            </div>
          </div>
        </div>

        <div v-for="section in cols[1]" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">{{ section.heading }}</div>
          <PrepCodeBlock :code="section.code" />
        </div>

      </div>

      <!-- Column 3: Process Model + linuxRaw[5+] -->
      <div class="overflow-y-auto space-y-6 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">Process Model — scheduler view</div>
          <div class="text-[11px] space-y-1.5">

            <div class="text-slate-500 leading-snug">CFS scheduler sees every process as a queue state — not a label to memorise.</div>

            <div class="space-y-1 mt-0.5">
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">R</code>
                <span class="text-slate-400">On CPU or waiting for CPU. Runnable.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">S</code>
                <span class="text-slate-500">Sleeping — waiting for an event or signal. Killable.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-amber-300/80 font-bold shrink-0 w-4">D</code>
                <span class="text-slate-400">Uninterruptible I/O wait. <span class="text-amber-300/70">Cannot be killed.</span> Storage pain.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">Z</code>
                <span class="text-slate-500">Zombie — exited, parent hasn't reaped it. Holds a PID slot.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">T</code>
                <span class="text-slate-500">Stopped by SIGSTOP or debugger.</span>
              </div>
            </div>

            <div class="border-t border-slate-700/40 pt-1.5 space-y-1 text-slate-500">
              <div>Load avg = R + D count at any instant.</div>
              <div><span class="text-slate-300">High load + low CPU</span> → high D count → I/O bottleneck, not compute.</div>
              <div><span class="text-slate-300">High load + high CPU</span> → genuine compute pressure.</div>
              <div><span class="text-slate-300">D state won't clear</span> until I/O completes or times out.</div>
              <div class="text-slate-600 italic">CPU busy ≠ system healthy. Load average ≠ CPU utilisation.</div>
            </div>

            <div class="border-t border-slate-700/40 pt-1.5 space-y-0.5 text-slate-500">
              <div><code class="text-emerald-400/60">/proc/&lt;pid&gt;/</code> — kernel's live truth: fd, maps, status, limits.</div>
              <div>cgroups limit CPU, memory, I/O per group — what containers use under the hood.</div>
            </div>

          </div>
        </div>

        <div v-for="section in cols[2]" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-2">{{ section.heading }}</div>
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
  linuxRaw.slice(3, 6),
  linuxRaw.slice(6),
]
</script>
