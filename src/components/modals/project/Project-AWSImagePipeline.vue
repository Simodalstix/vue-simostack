<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="AWS Image Pipeline – Golden AMI Baking with Packer & SSM Parameter Store"
  >
    <!-- Image layers -->
    <div class="px-4 pt-3 pb-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-ob-surface border border-ob-sand/16 rounded-lg p-3">
          <p class="text-xs font-semibold text-ob-teal-bright mb-1.5">Base Layer – <code class="text-ob-muted2">base.pkr.hcl</code></p>
          <p class="text-xs text-ob-muted2 leading-relaxed">CloudWatch agent, OS hardening (fail2ban, SSH config, sysctl), AWS CLI v2. Built first — app layer depends on its SSM-published AMI ID.</p>
        </div>
        <div class="bg-ob-surface border border-ob-sand/16 rounded-lg p-3">
          <p class="text-xs font-semibold text-ob-teal-bright mb-1.5">App Layer – <code class="text-ob-muted2">app.pkr.hcl</code></p>
          <p class="text-xs text-ob-muted2 leading-relaxed">Python 3.11, FastAPI + uvicorn, <code class="text-ob-dim">/opt/app/</code> structure, systemd service unit. Reads base AMI ID from SSM at build time.</p>
        </div>
        <div class="bg-ob-surface border border-ob-sand/16 rounded-lg p-3">
          <p class="text-xs font-semibold text-ob-teal-bright mb-1.5">CDK Stack – <code class="text-ob-muted2">ImagePipelineStack</code></p>
          <p class="text-xs text-ob-muted2 leading-relaxed">Packer builder IAM instance profile and two CodeBuild projects (<code class="text-ob-dim">build-base-ami</code>, <code class="text-ob-dim">build-app-ami</code>) for automated triggering.</p>
        </div>
      </div>
    </div>

    <!-- SSM parameter flow -->
    <div class="px-4 pb-3">
      <p class="text-xs font-semibold text-ob-teal-bright mb-2">SSM Parameter Store – Cross-Stack Config</p>
      <div class="bg-ob-surface border border-ob-sand/16 rounded-lg overflow-hidden">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-ob-sand/16 text-ob-dim">
              <th class="text-left px-3 py-2 font-medium">Parameter</th>
              <th class="text-left px-3 py-2 font-medium hidden sm:table-cell">Written by</th>
              <th class="text-left px-3 py-2 font-medium">Read by</th>
            </tr>
          </thead>
          <tbody class="text-ob-muted2">
            <tr class="border-b border-ob-sand/16">
              <td class="px-3 py-1.5 font-mono text-[10px] text-ob-sand">/ops-lab/images/base-ami-id</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">publish_ami.py</td>
              <td class="px-3 py-1.5">app.pkr.hcl, aws-3tier-platform</td>
            </tr>
            <tr class="border-b border-ob-sand/16">
              <td class="px-3 py-1.5 font-mono text-[10px] text-ob-sand">/ops-lab/images/app-ami-id</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">publish_ami.py</td>
              <td class="px-3 py-1.5">aws-3tier-platform ASG</td>
            </tr>
            <tr>
              <td class="px-3 py-1.5 font-mono text-[10px] text-ob-dim">/ops-lab/networking/subnet/public-0</td>
              <td class="px-3 py-1.5 hidden sm:table-cell">aws-ops-networking</td>
              <td class="px-3 py-1.5">Packer builder subnet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Description + GitHub link -->
    <div class="px-4 pb-4 flex flex-col md:flex-row gap-4 md:items-center">
      <p class="text-base text-ob-muted2 leading-relaxed flex-1">
        Golden AMI baking pipeline for the <span class="text-ob-sand">ops-lab platform</span>. Produces hardened, pre-configured AMIs using <span class="text-ob-teal-bright">Packer</span> and publishes AMI IDs to <span class="text-ob-teal-bright">SSM Parameter Store</span> so downstream stacks always launch from a known-good image — no hardcoded AMI IDs anywhere. <span class="text-ob-teal-bright">CDK Python</span> deploys the IAM instance profile and <span class="text-ob-teal-bright">CodeBuild</span> projects. Part of a modular AWS ops platform alongside <span class="text-ob-teal-bright">aws-ops-networking</span>, <span class="text-ob-teal-bright">aws-ops-observability</span>, and <span class="text-ob-teal-bright">aws-3tier-platform</span>.
      </p>
      <a
        href="https://github.com/Simodalstix/aws-image-pipeline"
        target="_blank"
        class="bg-ob-teal hover:brightness-110 text-ob-ink font-semibold py-2 px-6 rounded-[2px] transition-all duration-200 text-center whitespace-nowrap"
      >
        View on GitHub
      </a>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from '../BaseModal.vue'
</script>
