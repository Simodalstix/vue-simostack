<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Event-Driven Pipeline – SQS, Lambda, S3, Glue & Athena"
  >
    <!-- Architecture layers -->
    <div class="px-4 pt-3 pb-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-3">
          <p class="text-xs font-semibold text-amber-400 mb-1.5">Ingest – <code class="text-slate-300">IngestStack</code></p>
          <p class="text-xs text-slate-300 leading-relaxed">SQS queue (4-day retention, 60s visibility) with a DLQ that triggers a CloudWatch alarm after 3 failed attempts. SNS alert fires when DLQ depth &gt; 0.</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-3">
          <p class="text-xs font-semibold text-orange-400 mb-1.5">Process – <code class="text-slate-300">ProcessStack</code></p>
          <p class="text-xs text-slate-300 leading-relaxed">Lambda (Python 3.12, batch 10) validates and transforms JSON events, then writes to S3 partitioned by <code class="text-slate-400">year/month/day/source</code>. Errors propagate to DLQ — no silent swallowing.</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-3">
          <p class="text-xs font-semibold text-cyan-400 mb-1.5">Analytics – <code class="text-slate-300">AnalyticsStack</code></p>
          <p class="text-xs text-slate-300 leading-relaxed">Glue crawler (EventBridge Scheduler, daily 01:00 UTC) auto-discovers schema from S3. Athena workgroup enforces a 1 GB per-query scan limit for cost control.</p>
        </div>
      </div>
    </div>

    <!-- SSM parameter bus -->
    <div class="px-4 pb-3">
      <p class="text-xs font-semibold text-cyan-400 mb-2">SSM Parameter Store – Cross-Stack Config Bus</p>
      <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg overflow-hidden">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-slate-600/50 text-slate-400">
              <th class="text-left px-3 py-2 font-medium">Parameter</th>
              <th class="text-left px-3 py-2 font-medium hidden sm:table-cell">Written by</th>
              <th class="text-left px-3 py-2 font-medium">Read by</th>
            </tr>
          </thead>
          <tbody class="text-slate-300">
            <tr class="border-b border-slate-700/40">
              <td class="px-3 py-1.5 font-mono text-[10px] text-orange-300">/ops-lab/pipeline/sqs-queue-arn</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">IngestStack</td>
              <td class="px-3 py-1.5">ProcessStack (Lambda trigger)</td>
            </tr>
            <tr class="border-b border-slate-700/40">
              <td class="px-3 py-1.5 font-mono text-[10px] text-orange-300">/ops-lab/pipeline/sqs-queue-url</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">IngestStack</td>
              <td class="px-3 py-1.5">send_test_event.py, redrive_dlq.py</td>
            </tr>
            <tr class="border-b border-slate-700/40">
              <td class="px-3 py-1.5 font-mono text-[10px] text-orange-300">/ops-lab/pipeline/s3-bucket-name</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">ProcessStack</td>
              <td class="px-3 py-1.5">AnalyticsStack (Glue crawler)</td>
            </tr>
            <tr class="border-b border-slate-700/40">
              <td class="px-3 py-1.5 font-mono text-[10px] text-slate-400">/ops-lab/pipeline/glue-database-name</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">AnalyticsStack</td>
              <td class="px-3 py-1.5">query_athena.py</td>
            </tr>
            <tr>
              <td class="px-3 py-1.5 font-mono text-[10px] text-slate-400">/ops-lab/pipeline/athena-workgroup</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">AnalyticsStack</td>
              <td class="px-3 py-1.5">query_athena.py</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Operational tooling -->
    <div class="px-4 pb-3">
      <p class="text-xs font-semibold text-cyan-400 mb-2">Operational Tooling</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-2.5">
          <p class="text-[10px] font-semibold text-slate-200 mb-1">send_test_event.py</p>
          <p class="text-[10px] text-slate-400 leading-relaxed">Publish synthetic events with custom payload, batch count, and source label.</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-2.5">
          <p class="text-[10px] font-semibold text-slate-200 mb-1">redrive_dlq.py</p>
          <p class="text-[10px] text-slate-400 leading-relaxed">Replay poison messages back to the main queue after fixes, with dry-run mode.</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-2.5">
          <p class="text-[10px] font-semibold text-slate-200 mb-1">pipeline_health.py</p>
          <p class="text-[10px] text-slate-400 leading-relaxed">One-command check: queue depth, DLQ alert, Lambda error rate, last Glue run status.</p>
        </div>
        <div class="bg-slate-800/60 border border-slate-600/50 rounded-lg p-2.5">
          <p class="text-[10px] font-semibold text-slate-200 mb-1">query_athena.py</p>
          <p class="text-[10px] text-slate-400 leading-relaxed">Run ad-hoc SQL against the Glue catalog with column-aligned output and bytes-scanned reporting.</p>
        </div>
      </div>
    </div>

    <!-- Description + GitHub -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-slate-300 leading-relaxed flex-1">
        Event-driven ingestion and analytics pipeline for the <span class="text-orange-300">ops-lab platform</span>. Events flow from <span class="text-cyan-300">SQS</span> through a <span class="text-orange-300">Lambda</span> processor into a partitioned <span class="text-cyan-300">S3</span> data lake, where <span class="text-cyan-300">Glue</span> auto-discovers schema and <span class="text-cyan-300">Athena</span> enables SQL analytics. <span class="text-cyan-300">CDK Python</span> deploys all three stacks; all cross-stack references flow through <span class="text-cyan-300">SSM Parameter Store</span> — no hardcoded ARNs anywhere.
      </p>
      <a
        href="https://github.com/Simodalstix/aws-event-driven-pipeline"
        target="_blank"
        class="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-2 px-6 rounded-md shadow-sm shadow-cyan-400/40 hover:shadow-cyan-300/60 transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
