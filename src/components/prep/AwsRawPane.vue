<template>
  <div class="grid grid-cols-3 gap-6 h-full p-6">
    <div v-for="(col, ci) in cols" :key="ci" class="overflow-y-auto space-y-6 min-h-0">
      <div v-for="section in col" :key="section.heading">
        <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">
          {{ section.heading }}
        </div>
        <div
          v-if="section.prose"
          class="text-ob-text text-[12px] space-y-0.5"
          v-html="renderProse(section.prose)"
        />
        <PrepCodeBlock
          v-if="section.code"
          :code="section.code"
          :class="{ 'mt-2': section.prose }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'
import { awsRaw } from '@/data/prep/awsRaw.js'

const cols = [
  awsRaw.slice(0, 4),
  awsRaw.slice(4, 7),
  awsRaw.slice(7),
]

function hl(s) {
  // HTTP code ranges (5xx, 2xx etc)
  s = s.replace(/\b([1-5]xx)\b/g,
    '<span class="text-purple-400">$1</span>')

  // Specific HTTP status codes — lookahead prevents matching ports, IPs, or suffixed numbers
  s = s.replace(/(?<![\d.])([1-5]\d{2})(?![\d.a-zA-Z])/g,
    '<span class="text-purple-400">$1</span>')

  // Time durations, percentages, dollar amounts, percentile notation
  s = s.replace(/~?\d+(?:-\d+)?(?:s|ms)\b|~?\d+(?:-\d+)? min\b|\d+%|\$[\d.]+(?:\/\w+)*|\bp\d+\b/g,
    m => `<span class="text-amber-400">${m}</span>`)

  // AWS services and tools — multi-word alternatives first
  s = s.replace(/\b(Read Replica|RDS Proxy|CloudWatch Logs|CloudWatch Agent|NAT Gateway|Route 53|Secrets Manager|Parameter Store|SSM Session Manager|Pilot Light|Warm Standby|Block Public Access|Access Analyzer|Access Advisor|EC2|ELB|RDS|S3|ALB|ASG|EBS|SQS|ElastiCache|DAX|DynamoDB|CloudWatch|CloudTrail|CloudFormation|Lambda|SSM|KMS|IAM|CDK|Terraform|CodeDeploy|Redis|Memcached|Python|TypeScript|HCL)\b/g,
    '<span class="text-sky-300">$1</span>')

  // AWS infrastructure abbreviations and named terms
  s = s.replace(/\b(Multi-AZ|RTO|RPO|IGW|NACL|VPC|TTL|TLS|ARN|AMI|DNS|SG|AZ|DR|HA|CoE|gp2|gp3|SSE-KMS|SSE-S3|IOPS|IRAP|PROTECTED|L2|L7)\b/g,
    '<span class="text-ob-bright">$1</span>')

  // CloudWatch metric names
  s = s.replace(/\b(CPUUtilization|MemoryUtilization|DiskUsed|NetworkIn|NetworkOut|StatusCheckFailed|HTTPCode_Target_5XX_Count|TargetResponseTime|DatabaseConnections|UnhealthyHostCount|ApproximateAgeOfOldestMessage|VolumeQueueLength)\b/g,
    '<span class="text-emerald-400">$1</span>')

  // IAM evaluation order terms
  s = s.replace(/\b(Explicit Deny|Explicit Allow|Implicit Deny)\b/g,
    '<span class="text-ob-sand">$1</span>')

  // Lifecycle hook action keywords
  s = s.replace(/\b(CONTINUE|ABANDON)\b/g,
    '<span class="text-amber-400">$1</span>')

  return s
}

function renderProse(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  let firstHeading = true
  return escaped.split('\n').map(line => {
    if (line === '') return '<div class="h-1.5"></div>'

    if (line.startsWith('• ')) {
      return `<div class="flex gap-1.5 leading-snug"><span class="text-ob-dim shrink-0 select-none mt-px">•</span><span>${hl(line.slice(2))}</span></div>`
    }

    const mt = firstHeading ? '' : ' mt-3'
    firstHeading = false
    return `<div class="text-ob-text font-semibold${mt}">${hl(line)}</div>`
  }).join('')
}
</script>
