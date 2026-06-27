<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Code columns -->
    <div class="flex-1 min-h-0 grid grid-cols-3 gap-6 p-6">

      <!-- Column 1: Boot Chain + linuxRaw[0–2] -->
      <div class="overflow-y-auto space-y-6 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">Boot Chain — ownership transfer</div>
          <div class="space-y-1.5 text-[11px]">

            <div class="pl-2 border-l-2 border-ob-text/16 space-y-0">
              <div class="text-amber-300/80 font-semibold">BIOS / UEFI</div>
              <div class="text-ob-muted">Firmware. Initialises hardware.</div>
              <div class="text-ob-muted">Finds first bootable media → hands off.</div>
              <div class="text-ob-faint italic">Does not load the OS.</div>
            </div>

            <div class="text-ob-faint pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-ob-text/16 space-y-0">
              <div class="text-amber-300/80 font-semibold">GRUB (bootloader)</div>
              <div class="text-ob-muted">Loads kernel + initramfs into RAM.</div>
              <div class="text-ob-muted">Passes kernel parameters (cmdline).</div>
              <div class="text-ob-faint italic">Does not manage services or targets.</div>
              <div class="text-ob-sand/60 text-[10px]">Failure → boot menu drops. Edit kernel line: <code class="text-emerald-400/60">init=/bin/bash</code> for recovery shell.</div>
            </div>

            <div class="text-ob-faint pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-ob-text/16 space-y-0">
              <div class="text-amber-300/80 font-semibold">initramfs</div>
              <div class="text-ob-muted">Early userspace — runs entirely in RAM.</div>
              <div class="text-ob-muted">Loads storage, LVM, RAID drivers.</div>
              <div class="text-ob-muted">Mounts the real root filesystem.</div>
              <div class="text-ob-sand/60 text-[10px]">Failure → <span class="text-ob-muted">cannot mount root filesystem</span> / dracut emergency shell.</div>
            </div>

            <div class="text-ob-faint pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-ob-text/16 space-y-0">
              <div class="text-amber-300/80 font-semibold">kernel</div>
              <div class="text-ob-muted">Decompresses. Detects hardware.</div>
              <div class="text-ob-muted">Spawns PID 1 — control transfers permanently.</div>
              <div class="text-ob-faint italic">Does not start services directly.</div>
            </div>

            <div class="text-ob-faint pl-2 leading-none">↓</div>

            <div class="pl-2 border-l-2 border-amber-500/30 space-y-0">
              <div class="text-amber-300/80 font-semibold">systemd (PID 1)</div>
              <div class="text-ob-muted">First real process. Owns the rest of boot.</div>
              <div class="text-ob-muted">Reads unit files → resolves deps → activates targets.</div>
              <div class="text-ob-muted"><code class="text-emerald-400/60">multi-user.target</code> — servers. <code class="text-emerald-400/60">graphical.target</code> adds display.</div>
              <div class="text-ob-sand/60 text-[10px]">Unit failure → <code class="text-emerald-400/60">systemctl status &lt;unit&gt;</code> / <code class="text-emerald-400/60">journalctl -b -u &lt;unit&gt;</code></div>
            </div>

          </div>
        </div>

        <div v-for="section in cols[0]" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">{{ section.heading }}</div>
          <PrepCodeBlock :code="section.code" />
        </div>

      </div>

      <!-- Column 2: Memory Model + linuxRaw[3–4] -->
      <div class="overflow-y-auto space-y-6 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">Memory Model — symptom thinking</div>
          <div class="text-[11px] space-y-1.5">

            <div class="text-ob-dim leading-snug">Each process has a private virtual address space. The MMU maps virtual → physical memory transparently. You usually ignore this abstraction — until the system comes under pressure.</div>

            <div class="space-y-1.5 mt-0.5">

              <div class="pl-2 border-l-2 border-sky-700/40 space-y-0.5">
                <div class="text-sky-400/80 font-semibold">page cache</div>
                <div class="text-ob-muted">Kernel uses spare RAM to cache file reads.</div>
                <div class="text-ob-muted">Repeated disk access hits RAM instead → much faster.</div>
                <div class="text-ob-faint italic">Free RAM is wasted RAM. <code class="text-emerald-400/60">available</code> in <code class="text-emerald-400/60">free -h</code> includes reclaimable cache.</div>
              </div>

              <div class="pl-2 border-l-2 border-sky-700/40 space-y-0.5">
                <div class="text-sky-400/80 font-semibold">page fault</div>
                <div class="text-ob-muted">Requested page not currently in RAM.</div>
                <div class="text-ob-dim">Minor fault = resolved from existing memory mappings.</div>
                <div class="text-ob-dim">Major fault = requires disk/storage access.</div>
                <div class="text-ob-sand/60 text-[10px]">Sustained major faults usually indicate memory pressure. System performance degrades before OOM occurs.</div>
              </div>

              <div class="pl-2 border-l-2 border-sky-700/40 space-y-0.5">
                <div class="text-sky-400/80 font-semibold">anon memory</div>
                <div class="text-ob-muted">Heap + stack allocations — not file-backed.</div>
                <div class="text-ob-dim"><code class="text-emerald-400/60">anon-rss</code> in OOM output represents actual private RAM consumed by the process.</div>
              </div>

              <div class="pl-2 border-l-2 border-amber-500/30 space-y-0.5">
                <div class="text-amber-300/70 font-semibold">swap</div>
                <div class="text-ob-muted">Disk used as RAM overflow.</div>
                <div class="text-ob-muted">Heavy swap activity causes massive latency because memory access becomes disk I/O.</div>
                <div class="text-ob-sand/60 text-[10px]"><code class="text-emerald-400/60">vmstat 1</code> → <code class="text-emerald-400/60">si</code>/<code class="text-emerald-400/60">so</code> non-zero = active swapping.</div>
              </div>

              <div class="pl-2 border-l-2 border-red-700/40 space-y-0.5">
                <div class="text-red-400/70 font-semibold">OOM killer</div>
                <div class="text-ob-muted">Triggered when RAM + swap are exhausted.</div>
                <div class="text-ob-muted">Kernel selects a process to kill using an OOM scoring heuristic.</div>
                <div class="text-ob-dim">Large anonymous memory consumers are common targets because that memory is difficult to reclaim.</div>
                <div class="text-ob-sand/60 text-[10px]">Evidence: <code class="text-emerald-400/60">dmesg | grep -i killed</code> or <code class="text-emerald-400/60">journalctl -k</code></div>
              </div>

            </div>
          </div>
        </div>

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">{{ cols[1][0].heading }}</div>
          <PrepCodeBlock :code="cols[1][0].code" />
        </div>

        <details class="group">
          <summary class="cursor-pointer select-none text-[10px] uppercase tracking-widest text-ob-sand/50 font-semibold hover:text-ob-sand transition-colors list-none flex items-center gap-1.5">
            <span class="group-open:rotate-90 transition-transform inline-block">▶</span>
            BONUS — MAKE JOURNAL LOGS PERSIST ACROSS REBOOTS
          </summary>
          <div class="mt-2 space-y-1.5 text-[11px]">
            <div class="text-ob-dim leading-snug">By default <code class="text-emerald-400/60">journald</code> stores logs in <code class="text-emerald-400/60">/run/log/journal</code> (RAM) — wiped on reboot. To persist them:</div>
            <PrepCodeBlock :code="persistJournalCode" />
          </div>
        </details>

        <div v-for="section in cols[1].slice(1)" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">{{ section.heading }}</div>
          <PrepCodeBlock :code="section.code" />
        </div>

      </div>

      <!-- Column 3: Process Model + linuxRaw[5+] -->
      <div class="overflow-y-auto space-y-6 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">Process Model — scheduler view</div>
          <div class="text-[11px] space-y-1.5">

            <div class="text-ob-dim leading-snug">CFS scheduler sees every process as a queue state — not a label to memorise.</div>

            <div class="space-y-1 mt-0.5">
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">R</code>
                <span class="text-ob-muted">On CPU or waiting for CPU. Runnable.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">S</code>
                <span class="text-ob-dim">Sleeping — waiting for an event or signal. Killable.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-amber-300/80 font-bold shrink-0 w-4">D</code>
                <span class="text-ob-muted">Uninterruptible I/O wait. <span class="text-amber-300/70">Cannot be killed.</span> Storage pain.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">Z</code>
                <span class="text-ob-dim">Zombie — exited, parent hasn't reaped it. Holds a PID slot.</span>
              </div>
              <div class="flex gap-2 items-baseline">
                <code class="text-emerald-400/80 shrink-0 w-4">T</code>
                <span class="text-ob-dim">Stopped by SIGSTOP or debugger.</span>
              </div>
            </div>

            <div class="border-t border-ob-text/14 pt-1.5 space-y-1 text-ob-dim">
              <div>Load avg = R + D count at any instant.</div>
              <div><span class="text-ob-text">High load + low CPU</span> → high D count → I/O bottleneck, not compute.</div>
              <div><span class="text-ob-text">High load + high CPU</span> → genuine compute pressure.</div>
              <div><span class="text-ob-text">D state won't clear</span> until I/O completes or times out.</div>
              <div class="text-ob-faint italic">CPU busy ≠ system healthy. Load average ≠ CPU utilisation.</div>
            </div>

            <div class="border-t border-ob-text/14 pt-1.5 space-y-0.5 text-ob-dim">
              <div><code class="text-emerald-400/60">/proc/&lt;pid&gt;/</code> — kernel's live truth: fd, maps, status, limits.</div>
              <div>cgroups limit CPU, memory, I/O per group — what containers use under the hood.</div>
            </div>

          </div>
        </div>

        <div v-for="section in cols[2]" :key="section.heading">
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">{{ section.heading }}</div>
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

const persistJournalCode = String.raw`# 1. Create the persistent log directory
sudo mkdir -p /var/log/journal

# 2. Tell journald to use it
# /etc/systemd/journald.conf
# [Journal]
# Storage=persistent

# 3. Apply
sudo systemctl restart systemd-journald

# Verify — should now show /var/log/journal/<machine-id>/
journalctl --disk-usage`
</script>
