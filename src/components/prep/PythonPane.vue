<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Fundamentals banner -->
    <div class="shrink-0 px-6 pt-4 pb-4 border-b border-slate-700/60 bg-slate-800/20">
      <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold mb-3">Python — Fundamentals</div>
      <div class="grid grid-cols-4 gap-6">

        <!-- The language -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">The Language</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-slate-400 leading-snug">Interpreted — source runs through the CPython VM directly. No compile step. <code class="text-emerald-400/70">python3 script.py</code> executes immediately.</div>
            <div class="space-y-0.5">
              <div><span class="text-sky-400/80">dynamic typing</span><span class="text-slate-500"> — types live on the object, not the variable. <code class="text-emerald-400/60">x = 1</code> then <code class="text-emerald-400/60">x = "hello"</code> is valid.</span></div>
              <div><span class="text-sky-400/80">GIL</span><span class="text-slate-500"> — one thread runs bytecode at a time. CPU-bound threads don't scale — use multiprocessing or async instead.</span></div>
              <div><span class="text-sky-400/80">memory</span><span class="text-slate-500"> — reference counting + cyclic GC. Objects freed when refcount hits zero. No manual memory management.</span></div>
            </div>
            <div class="text-slate-500 text-[10px] leading-snug">Everything is an object — functions, classes, modules, even types themselves.</div>
          </div>
        </div>

        <!-- General scripts -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">General Scripts</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-slate-400 leading-snug">Standalone <code class="text-emerald-400/70">.py</code> files that do one job — parse logs, check health, rotate files, hit an API. No framework, no deployment, just <code class="text-emerald-400/70">python3 script.py</code>.</div>
            <div class="space-y-0.5">
              <div><span class="text-sky-400/80">stdlib-only</span><span class="text-slate-500"> — os, sys, subprocess, pathlib, json, argparse built-in. No pip needed.</span></div>
              <div><span class="text-sky-400/80">exit codes</span><span class="text-slate-500"> — <code class="text-emerald-400/60">sys.exit(0)</code> success, <code class="text-emerald-400/60">sys.exit(1)</code> failure. CI reads these.</span></div>
              <div><span class="text-sky-400/80">bash equivalent</span><span class="text-slate-500"> — <code class="text-emerald-400/60">set -euo pipefail</code> becomes try/except + explicit sys.exit on error.</span></div>
            </div>
            <div class="text-slate-500 text-[10px] leading-snug">Reach for Python over bash when you need structured data, real error handling, or something testable.</div>
          </div>
        </div>

        <!-- boto3 / SDK -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">boto3 — Python AWS SDK</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-slate-400 leading-snug">AWS's official Python library. Wraps every AWS API — you call Python methods, boto3 makes the HTTPS request and parses the response.</div>
            <div class="space-y-0.5">
              <div><span class="text-sky-400/80">client</span><span class="text-slate-500"> — low-level, 1:1 with the API. <code class="text-emerald-400/60">boto3.client('s3')</code></span></div>
              <div><span class="text-sky-400/80">resource</span><span class="text-slate-500"> — higher-level OO wrapper. <code class="text-emerald-400/60">s3.Bucket('name').put_object(...)</code></span></div>
              <div><span class="text-sky-400/80">credentials</span><span class="text-slate-500"> — env vars → ~/.aws/credentials → IAM instance profile. Never hardcode.</span></div>
              <div><span class="text-sky-400/80">paginators</span><span class="text-slate-500"> — handles next_token automatically. Always use for list operations.</span></div>
              <div><span class="text-sky-400/80">waiters</span><span class="text-slate-500"> — polls until a resource reaches a target state. <code class="text-emerald-400/60">.get_waiter('instance_running').wait(...)</code></span></div>
            </div>
          </div>
        </div>

        <!-- Python CDK -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1.5">Python CDK</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-slate-400 leading-snug">Write infrastructure as Python classes. CDK synthesises them to CloudFormation — you get real language features (loops, conditions, inheritance) for describing infra.</div>
            <div class="space-y-0.5">
              <div><span class="text-sky-400/80">cdk synth</span><span class="text-slate-500"> — generates the CloudFormation template. Review it before deploying.</span></div>
              <div><span class="text-sky-400/80">cdk deploy</span><span class="text-slate-500"> — deploys via CloudFormation changeset. Automatic rollback if it fails.</span></div>
              <div><span class="text-sky-400/80">L1 constructs</span><span class="text-slate-500"> — 1:1 with CloudFormation (CfnBucket). Full control, no opinions.</span></div>
              <div><span class="text-sky-400/80">L2 constructs</span><span class="text-slate-500"> — opinionated wrappers. <code class="text-emerald-400/60">bucket.grant_read(role)</code> auto-wires the IAM policy.</span></div>
              <div><span class="text-sky-400/80">vs boto3</span><span class="text-slate-500"> — CDK <em>declares</em> infrastructure. boto3 <em>operates</em> on it at runtime. Different jobs.</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Two-column body -->
    <div class="flex flex-1 min-h-0 overflow-hidden">

    <!-- LEFT column -->
    <div class="flex-[2] overflow-y-auto p-5 border-r border-slate-700/60 space-y-6">

      <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold pb-1.5 border-b border-slate-700/40">
        Python for Systems Engineers
      </div>

      <!-- When Python wins -->
      <div>
        <div class="text-[11px] text-slate-300 leading-relaxed mb-3">
          Reach for Python when bash becomes unwieldy: structured data, AWS SDK calls,
          multi-step logic with error handling, or when you need something testable and maintainable.
        </div>
        <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-2">When Python wins over bash</div>
        <ul class="space-y-1">
          <li v-for="point in whenPython" :key="point" class="flex gap-2 text-[11px] text-slate-300">
            <span class="text-orange-400/50 shrink-0">›</span>{{ point }}
          </li>
        </ul>
      </div>

      <!-- Left scripts -->
      <div v-for="script in leftScripts" :key="script.id" class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">{{ script.heading }}</span>
          <div class="flex gap-1 ml-auto flex-wrap justify-end">
            <span v-for="tag in script.tags" :key="tag"
                  class="px-1.5 py-0.5 text-[9px] bg-slate-700/80 text-slate-300 rounded font-mono">{{ tag }}</span>
            <span class="px-1.5 py-0.5 text-[9px] bg-emerald-900/50 text-emerald-400 rounded">stdlib</span>
          </div>
        </div>
        <div class="px-3 py-2 border-b border-slate-700/40 grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">What it demonstrates</div>
            <div class="text-slate-400 leading-relaxed">{{ script.demonstrates }}</div>
          </div>
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">When to use</div>
            <div class="text-slate-400 leading-relaxed">{{ script.whenToUse }}</div>
          </div>
        </div>
        <div class="border-b border-slate-700/40">
          <PrepCodeBlock :code="script.code" />
        </div>
        <div class="px-3 py-2 bg-amber-950/20 flex items-start gap-2 text-[11px]">
          <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold shrink-0 mt-px">In the interview</span>
          <span class="text-slate-300 leading-relaxed">{{ script.interview }}</span>
        </div>
      </div>

    </div>

    <!-- RIGHT column -->
    <div class="flex-[3] overflow-y-auto p-5 space-y-6">

      <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold pb-1.5 border-b border-slate-700/40">
        Operational Scripts
      </div>

      <div v-for="script in rightScripts" :key="script.id" class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">{{ script.heading }}</span>
          <div class="flex gap-1 ml-auto flex-wrap justify-end">
            <span v-for="tag in script.tags" :key="tag"
                  class="px-1.5 py-0.5 text-[9px] bg-slate-700/80 text-slate-300 rounded font-mono">{{ tag }}</span>
            <span class="px-1.5 py-0.5 text-[9px] rounded"
                  :class="script.stdlib ? 'bg-emerald-900/50 text-emerald-400' : 'bg-sky-900/50 text-sky-300'">
              {{ script.stdlib ? 'stdlib' : 'boto3' }}
            </span>
          </div>
        </div>
        <div class="px-3 py-2 border-b border-slate-700/40 grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">What it demonstrates</div>
            <div class="text-slate-400 leading-relaxed">{{ script.demonstrates }}</div>
          </div>
          <div>
            <div class="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">When to use</div>
            <div class="text-slate-400 leading-relaxed">{{ script.whenToUse }}</div>
          </div>
        </div>
        <div class="border-b border-slate-700/40">
          <PrepCodeBlock :code="script.code" />
        </div>
        <div class="px-3 py-2 bg-amber-950/20 flex items-start gap-2 text-[11px]">
          <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold shrink-0 mt-px">In the interview</span>
          <span class="text-slate-300 leading-relaxed">{{ script.interview }}</span>
        </div>
      </div>

    </div>

    </div><!-- end two-column body -->
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { pythonScripts, operationalScripts } from '@/data/prep/iacPythonData.js'

const whenPython = [
  'Log parsing at scale — Counter, regex, structured output',
  'AWS SDK (boto3) — describe resources, check health, act on state',
  'Multi-step logic with real error handling and exit codes',
  'Health checking fleets — urllib, requests, iterate over a list',
  'When you need the script to be testable and maintainable',
]

const allScripts = [...pythonScripts, ...operationalScripts]
const leftScripts  = allScripts.slice(0, 2)   // log parser, health checker
const rightScripts = allScripts.slice(2)        // boto3, disk, db monitor
</script>
