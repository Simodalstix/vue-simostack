<template>
  <div class="flex items-start text-[12px]">

    <!-- ═══ LEFT: Terraform ═══ -->
    <div class="w-[42%] shrink-0 border-r border-ob-text/18 p-4 space-y-3">

      <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold pb-1.5 border-b border-ob-text/14">
        Terraform / IaC
      </div>

      <!-- Core building blocks -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Core Building Blocks</span>
        </div>
        <div class="px-3 py-2.5 grid gap-y-1.5 gap-x-3 text-[11px]" style="grid-template-columns: 5.5rem 1fr">
          <span class="text-sky-300 font-mono font-semibold">provider</span>
          <span class="text-ob-muted">declares cloud/service target — aws, azurerm, kubernetes</span>
          <span class="text-sky-300 font-mono font-semibold">resource</span>
          <span class="text-ob-muted">the thing being created — aws_instance, aws_s3_bucket</span>
          <span class="text-sky-300 font-mono font-semibold">data</span>
          <span class="text-ob-muted">read existing infra without creating it — look up, don't manage</span>
          <span class="text-sky-300 font-mono font-semibold">variable</span>
          <span class="text-ob-muted">input — parameterise configs for reuse across environments</span>
          <span class="text-sky-300 font-mono font-semibold">output</span>
          <span class="text-ob-muted">expose values from a module or stack for other modules to consume</span>
          <span class="text-sky-300 font-mono font-semibold">module</span>
          <span class="text-ob-muted">reusable collection of resources — build once, compose, not copy</span>
          <span class="text-sky-300 font-mono font-semibold">state</span>
          <span class="text-ob-muted">terraform.tfstate — source of truth. never edit manually</span>
        </div>
      </div>

      <!-- S3 example -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">S3 Bucket Example</span>
        </div>
        <PrepCodeBlock :code="tfS3Example" />
      </div>

      <!-- Workflow -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Workflow Commands</span>
        </div>
        <PrepCodeBlock :code="tfWorkflowExample" />
      </div>

      <!-- Remote state -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Remote State</span>
        </div>
        <PrepCodeBlock :code="tfRemoteStateExample" />
      </div>

      <!-- CDK vs Terraform comparison table -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">CDK vs Terraform</span>
        </div>
        <div class="px-3 py-2">
          <table class="w-full text-[11px] border-collapse">
            <thead>
              <tr class="border-b border-ob-text/18">
                <th class="text-left pb-1.5 text-ob-dim font-normal w-[26%]"></th>
                <th class="text-left pb-1.5 text-sky-300 font-semibold pr-2">CDK</th>
                <th class="text-left pb-1.5 text-sky-300 font-semibold">Terraform</th>
              </tr>
            </thead>
            <tbody class="text-[11px]">
              <tr class="border-b border-ob-text/10">
                <td class="py-1 text-ob-dim pr-2">Best for</td>
                <td class="py-1 text-ob-text pr-2">AWS-only stacks</td>
                <td class="py-1 text-ob-text">Multi-cloud / non-AWS</td>
              </tr>
              <tr class="border-b border-ob-text/10">
                <td class="py-1 text-ob-dim pr-2">Language</td>
                <td class="py-1 text-ob-text pr-2">Python / TypeScript</td>
                <td class="py-1 text-ob-text">HCL</td>
              </tr>
              <tr class="border-b border-ob-text/10">
                <td class="py-1 text-ob-dim pr-2">State / rollback</td>
                <td class="py-1 text-ob-text pr-2">CloudFormation stack</td>
                <td class="py-1 text-ob-text">.tfstate + manual</td>
              </tr>
              <tr class="border-b border-ob-text/10">
                <td class="py-1 text-ob-dim pr-2">IAM wiring</td>
                <td class="py-1 text-ob-text pr-2">L2 constructs auto-wire</td>
                <td class="py-1 text-ob-text">Explicit resource blocks</td>
              </tr>
              <tr>
                <td class="py-1 text-ob-dim pr-2">Soundbite</td>
                <td class="py-1 text-amber-300/80 italic pr-2">"Real language, AWS-native"</td>
                <td class="py-1 text-amber-300/80 italic">"Multi-cloud, state-driven"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Interview talking points -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Interview Talking Points</span>
        </div>
        <div class="px-3 py-2.5 space-y-1.5 text-[11px]">
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Terraform is declarative — describe end state, it figures out the plan.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text"><span class="text-sky-300">plan</span> before <span class="text-sky-300">apply</span> every time — it's the diff before the commit.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Remote state in S3 + DynamoDB locking = safe team collaboration.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">State drift: infra changed outside Terraform. <span class="text-sky-300">plan</span> reveals the gap.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Don't mix CDK and Terraform ownership for the same resources.</span></div>
        </div>
      </div>

      <!-- Common failure modes -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Common Failure Modes</span>
        </div>
        <div class="px-3 py-2.5 space-y-1.5 text-[11px]">
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-ob-muted">State drift — infra changed outside Terraform, plan reveals divergence.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-ob-muted">Concurrent applies without locking — two engineers apply, state corrupts.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-ob-muted">Two tools owning the same resource — CDK and Terraform both manage one bucket.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-ob-muted">Hardcoded credentials in code or user data — use IAM roles instead.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-ob-muted">Python scripts without timeouts — silent hangs in pipelines.</span></div>
        </div>
      </div>

    </div>

    <!-- ═══ RIGHT: Python ═══ -->
    <div class="flex-1 p-4 space-y-3">

      <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold pb-1.5 border-b border-ob-text/14">
        Python Automation Patterns
      </div>

      <!-- Python interview framing -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Interview Framing</span>
        </div>
        <div class="px-3 py-2.5 space-y-1.5 text-[11px]">
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Python for repeatable operational tasks — not one-offs, not interactive tools.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Design around clear inputs, predictable output, and correct exit codes.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Use boto3 with IAM roles — never static keys, never hardcoded credentials.</span></div>
          <div class="flex gap-1.5"><span class="text-ob-dim shrink-0">•</span><span class="text-ob-text">Keep scripts simple, self-contained, and testable in isolation.</span></div>
        </div>
      </div>

      <!-- Python pattern cards -->
      <div v-for="script in pythonScripts" :key="script.id" class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">

        <!-- Header: title + tags -->
        <div class="px-3 py-2 border-b border-ob-text/14 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ script.heading }}</span>
          <div class="flex gap-1 ml-auto flex-wrap justify-end">
            <span
              v-for="tag in script.tags"
              :key="tag"
              class="px-1.5 py-0.5 text-[9px] bg-ob-surface/80 text-ob-text rounded font-mono"
            >{{ tag }}</span>
            <span
              v-if="script.stdlib"
              class="px-1.5 py-0.5 text-[9px] bg-emerald-900/50 text-emerald-400 rounded"
            >stdlib</span>
            <span
              v-else
              class="px-1.5 py-0.5 text-[9px] bg-sky-900/50 text-sky-300 rounded"
            >boto3</span>
          </div>
        </div>

        <!-- Demonstrates + When to use -->
        <div class="px-3 py-2 border-b border-ob-text/14 grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div class="text-[9px] uppercase tracking-widest text-ob-dim mb-1 font-semibold">What it demonstrates</div>
            <div class="text-ob-muted leading-relaxed">{{ script.demonstrates }}</div>
          </div>
          <div>
            <div class="text-[9px] uppercase tracking-widest text-ob-dim mb-1 font-semibold">When to use</div>
            <div class="text-ob-muted leading-relaxed">{{ script.whenToUse }}</div>
          </div>
        </div>

        <div class="border-b border-ob-text/14">
          <PrepCodeBlock :code="script.code" />
        </div>

        <!-- Interview line -->
        <div class="px-3 py-2 bg-amber-950/20 flex items-start gap-2 text-[11px]">
          <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold shrink-0 mt-px">In the interview</span>
          <span class="text-ob-text leading-relaxed">{{ script.interview }}</span>
        </div>

      </div>

      <!-- Operational scripts section -->
      <div class="pt-1">
        <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold pb-1.5 border-b border-ob-text/14">
          Operational Scripts
        </div>
        <p class="text-[11px] text-ob-dim mt-1.5 mb-2">Patterns for automation — log parsing, health polling, AWS API checks.</p>
      </div>

      <div v-for="script in operationalScripts" :key="script.id" class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">

        <div class="px-3 py-2 border-b border-ob-text/14 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">{{ script.heading }}</span>
          <div class="flex gap-1 ml-auto flex-wrap justify-end">
            <span
              v-for="tag in script.tags"
              :key="tag"
              class="px-1.5 py-0.5 text-[9px] bg-ob-surface/80 text-ob-text rounded font-mono"
            >{{ tag }}</span>
            <span class="px-1.5 py-0.5 text-[9px] bg-emerald-900/50 text-emerald-400 rounded">stdlib</span>
          </div>
        </div>

        <div class="px-3 py-2 border-b border-ob-text/14 grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div class="text-[9px] uppercase tracking-widest text-ob-dim mb-1 font-semibold">What it demonstrates</div>
            <div class="text-ob-muted leading-relaxed">{{ script.demonstrates }}</div>
          </div>
          <div>
            <div class="text-[9px] uppercase tracking-widest text-ob-dim mb-1 font-semibold">When to use</div>
            <div class="text-ob-muted leading-relaxed">{{ script.whenToUse }}</div>
          </div>
        </div>

        <div class="max-h-[195px] overflow-y-auto border-b border-ob-text/14">
          <PrepCodeBlock :code="script.code" />
        </div>

        <div class="px-3 py-2 bg-amber-950/20 flex items-start gap-2 text-[11px]">
          <span class="text-[9px] uppercase tracking-widest text-amber-500 font-semibold shrink-0 mt-px">In the interview</span>
          <span class="text-ob-text leading-relaxed">{{ script.interview }}</span>
        </div>

      </div>

      <!-- Speak this out loud -->
      <div class="border border-ob-text/16 rounded-lg bg-ob-surface2/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-ob-text/14">
          <span class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold">Speak This Out Loud</span>
        </div>
        <div class="px-3 py-2.5 space-y-2 text-[11px]">
          <div class="pl-3 border-l-2 border-amber-500/40 text-ob-text italic leading-relaxed">"Terraform is declarative — I describe the end state and let it work out the plan."</div>
          <div class="pl-3 border-l-2 border-amber-500/40 text-ob-text italic leading-relaxed">"I always run plan before apply. It's the diff before the commit — non-negotiable."</div>
          <div class="pl-3 border-l-2 border-amber-500/40 text-ob-text italic leading-relaxed">"Remote state with DynamoDB locking is how a team uses Terraform safely — without it, two concurrent applies will corrupt state."</div>
          <div class="pl-3 border-l-2 border-amber-500/40 text-ob-text italic leading-relaxed">"boto3 picks up the instance profile automatically on EC2 — no keys in code, ever."</div>
          <div class="pl-3 border-l-2 border-amber-500/40 text-ob-text italic leading-relaxed">"Exit codes matter in scripts — 0 means healthy, 1 means action needed. Cron and pipelines depend on that contract."</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { tfS3Example, tfWorkflowExample, tfRemoteStateExample, pythonScripts, operationalScripts } from '@/data/prep/iacPythonData.js'
</script>
