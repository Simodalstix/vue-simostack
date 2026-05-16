<template>
  <div class="h-full overflow-y-auto p-4 font-mono text-[12px]">

    <div class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold pb-1.5 border-b border-slate-700/40 mb-3">
      Terraform / IaC
    </div>

    <!-- 3-column grid -->
    <div class="grid grid-cols-3 gap-3 mb-3">

      <!-- Core Building Blocks -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Core Building Blocks</span>
        </div>
        <div class="px-3 py-2.5 grid gap-y-1.5 gap-x-3 text-[11px]" style="grid-template-columns: 5.5rem 1fr">
          <span class="text-sky-300 font-mono font-semibold">provider</span>
          <span class="text-slate-400">declares cloud/service target — aws, azurerm, kubernetes</span>
          <span class="text-sky-300 font-mono font-semibold">resource</span>
          <span class="text-slate-400">the thing being created — aws_instance, aws_s3_bucket</span>
          <span class="text-sky-300 font-mono font-semibold">data</span>
          <span class="text-slate-400">read existing infra without creating it — look up, don't manage</span>
          <span class="text-sky-300 font-mono font-semibold">variable</span>
          <span class="text-slate-400">input — parameterise configs for reuse across environments</span>
          <span class="text-sky-300 font-mono font-semibold">output</span>
          <span class="text-slate-400">expose values from a module or stack for other modules to consume</span>
          <span class="text-sky-300 font-mono font-semibold">module</span>
          <span class="text-slate-400">reusable collection of resources — build once, compose, not copy</span>
          <span class="text-sky-300 font-mono font-semibold">state</span>
          <span class="text-slate-400">terraform.tfstate — source of truth. never edit manually</span>
        </div>
      </div>

      <!-- S3 Bucket Example -->
      <div class="row-span-2 border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">S3 Bucket Example</span>
        </div>
        <PrepCodeBlock :code="tfS3Example" />
      </div>

      <!-- Workflow Commands -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Workflow Commands</span>
        </div>
        <PrepCodeBlock :code="tfWorkflowExample" />
      </div>

      <!-- Remote State -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Remote State</span>
        </div>
        <PrepCodeBlock :code="tfRemoteStateExample" />
      </div>

      <!-- Common Failure Modes -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Common Failure Modes</span>
        </div>
        <div class="px-3 py-2.5 space-y-1.5 text-[11px]">
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-slate-400">State drift — infra changed outside Terraform, plan reveals divergence.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-slate-400">Concurrent applies without locking — two engineers apply, state corrupts.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-slate-400">Two tools owning the same resource — CDK and Terraform both manage one bucket.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-slate-400">Hardcoded credentials in code or user data — use IAM roles instead.</span></div>
          <div class="flex gap-1.5"><span class="text-red-500/70 shrink-0">•</span><span class="text-slate-400">Python scripts without timeouts — silent hangs in pipelines.</span></div>
        </div>
      </div>

    </div>

    <!-- Bottom row — 3-col -->
    <div class="grid grid-cols-3 gap-3">

      <!-- CDK vs Terraform -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">CDK vs Terraform</span>
        </div>
        <div class="px-3 py-2">
          <table class="w-full text-[11px] border-collapse">
            <thead>
              <tr class="border-b border-slate-700/60">
                <th class="text-left pb-1.5 text-slate-500 font-normal w-[26%]"></th>
                <th class="text-left pb-1.5 text-sky-300 font-semibold pr-2">CDK</th>
                <th class="text-left pb-1.5 text-sky-300 font-semibold">Terraform</th>
              </tr>
            </thead>
            <tbody class="text-[11px]">
              <tr class="border-b border-slate-700/30">
                <td class="py-1 text-slate-500 pr-2">Best for</td>
                <td class="py-1 text-slate-300 pr-2">AWS-only stacks</td>
                <td class="py-1 text-slate-300">Multi-cloud / non-AWS</td>
              </tr>
              <tr class="border-b border-slate-700/30">
                <td class="py-1 text-slate-500 pr-2">Language</td>
                <td class="py-1 text-slate-300 pr-2">Python / TypeScript</td>
                <td class="py-1 text-slate-300">HCL</td>
              </tr>
              <tr class="border-b border-slate-700/30">
                <td class="py-1 text-slate-500 pr-2">State / rollback</td>
                <td class="py-1 text-slate-300 pr-2">CloudFormation stack</td>
                <td class="py-1 text-slate-300">.tfstate + manual</td>
              </tr>
              <tr class="border-b border-slate-700/30">
                <td class="py-1 text-slate-500 pr-2">IAM wiring</td>
                <td class="py-1 text-slate-300 pr-2">L2 constructs auto-wire</td>
                <td class="py-1 text-slate-300">Explicit resource blocks</td>
              </tr>
              <tr>
                <td class="py-1 text-slate-500 pr-2">Soundbite</td>
                <td class="py-1 text-amber-300/80 italic pr-2">"Real language, AWS-native"</td>
                <td class="py-1 text-amber-300/80 italic">"Multi-cloud, state-driven"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Interview Talking Points -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Interview Talking Points</span>
        </div>
        <div class="px-3 py-2.5 space-y-2 text-[11px]">
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300">Declarative means TF owns the diff — HCL describes end state, TF builds a <span class="text-sky-300">dependency graph (DAG)</span> to reach it. Idempotent: same config → same outcome.</span></div>
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300"><span class="text-sky-300">plan -out</span> in CI freezes the diff so apply executes exactly what was reviewed. Without it there's a race between plan and apply.</span></div>
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300">S3 stores state, DynamoDB provides a <span class="text-sky-300">single-writer lock</span>. Two concurrent applies without it → state corruption, no clean rollback.</span></div>
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300">State drift: plan on untouched code still shows changes if someone edited in console. Fix: <span class="text-sky-300">terraform import</span> to adopt it, or realign the real resource.</span></div>
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300"><span class="text-sky-300">for_each</span> over <span class="text-sky-300">count</span> for lists — count uses a numeric index so renaming an item destroys everything after it. for_each uses a stable string key.</span></div>
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300">State holds secrets in <span class="text-sky-300">plaintext</span> — restrict the S3 bucket, enable SSE, never commit tfstate to git.</span></div>
          <div class="flex gap-1.5"><span class="text-slate-500 shrink-0">•</span><span class="text-slate-300">Don't share resource ownership with CDK — two tools managing the same resource means last apply wins and breaks the other.</span></div>
        </div>
      </div>

      <!-- Speak This Out Loud -->
      <div class="border border-slate-700/50 rounded-lg bg-slate-800/25 overflow-hidden">
        <div class="px-3 py-2 border-b border-slate-700/40">
          <span class="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Speak This Out Loud</span>
        </div>
        <div class="px-3 py-2.5 space-y-2 text-[11px]">
          <div class="pl-3 border-l-2 border-amber-500/40 text-slate-300 italic leading-relaxed">"plan -out saves the exact plan to a file so CI applies precisely what was reviewed. Without it there's a race condition between plan and apply."</div>
          <div class="pl-3 border-l-2 border-amber-500/40 text-slate-300 italic leading-relaxed">"plan on a clean codebase still shows changes if someone touched the resource manually — that's drift, and it's how you catch console cowboys."</div>
          <div class="pl-3 border-l-2 border-amber-500/40 text-slate-300 italic leading-relaxed">"state rm removes a resource from state without destroying it — useful when you want Terraform to stop managing something without touching the real resource."</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { tfS3Example, tfWorkflowExample, tfRemoteStateExample } from '@/data/prep/iacPythonData.js'
</script>
