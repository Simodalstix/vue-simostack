<template>
  <div class="max-w-[1440px] mx-auto px-6 sm:px-11">
    <!-- hero -->
    <section class="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 pt-8 pb-10 sm:pt-10 items-start">
      <div class="flex flex-col">
        <div class="flex items-center gap-[14px] mb-5">
          <span class="w-7 h-[1.5px] bg-ob-bronze"></span>
          <span class="font-mono font-bold text-[11px] leading-none tracking-[0.2em] uppercase text-ob-sand">Systems &amp; Linux</span>
        </div>

        <h1 class="font-bold text-[40px] sm:text-[56px] lg:text-[66px] leading-[0.96] tracking-[-0.015em] text-ob-bright">
          Simon Parker
        </h1>

        <div class="max-w-[920px] mt-6 flex flex-col gap-4">
          <p class="text-[17px] sm:text-[18px] leading-[1.6] text-ob-text">
            I work in MSP support across varied client environments, Microsoft&nbsp;365, Entra&nbsp;ID, Active Directory, endpoints and networking, bringing a deliberate, root-cause approach carried over from years in regulated healthcare.
          </p>
          <p class="text-[17px] sm:text-[18px] leading-[1.6] text-ob-dim">
            Outside support I build depth in <span class="text-ob-teal-bright font-semibold">Linux</span>, cloud infrastructure and automation through Terraform, AWS&nbsp;CDK and a bare-metal homelab, learning how systems behave, break and recover.
          </p>
        </div>

        <div class="flex flex-wrap gap-[12px] mt-7">
          <router-link
            :to="{ name: 'Projects' }"
            class="px-[22px] py-[13px] bg-ob-teal text-ob-ink font-semibold text-[14px] rounded-[2px] hover:brightness-110 transition"
          >View Projects</router-link>
          <router-link
            :to="{ name: 'About' }"
            class="px-[22px] py-[13px] font-semibold text-[14px] rounded-[2px] border transition-colors"
            :class="aboutBtnClass"
          >About Me</router-link>
        </div>

      </div>

      <!-- connect card + CTAs -->
      <div class="flex flex-col gap-6">
      <aside class="border border-ob-sand/16 border-t-2 !border-t-ob-bronze rounded-[6px] bg-ob-surface">
        <div class="p-[26px]">
          <div class="font-mono text-[11px] leading-none tracking-[0.16em] uppercase text-ob-sand mb-[18px]">Connect</div>
          <div class="flex flex-col gap-[10px]">
            <a
              v-for="link in connectLinks"
              :key="link.label"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-[13px] px-[15px] py-[13px] border border-ob-sand/14 rounded-[4px] bg-ob-surface2 hover:border-ob-sand/30 transition-colors"
            >
              <span class="text-ob-teal-bright shrink-0" v-html="link.icon"></span>
              <span class="flex flex-col gap-[3px] min-w-0">
                <span class="font-mono text-[10px] leading-none tracking-[0.08em] uppercase text-ob-faint">{{ link.label }}</span>
                <span class="font-semibold text-[14px] leading-none text-ob-text truncate">{{ link.value }}</span>
              </span>
            </a>
          </div>
        </div>
      </aside>
      </div>
    </section>

    <!-- certifications -->
    <section class="pt-8 pb-10 border-t border-ob-sand/14">
      <div class="flex items-baseline justify-between mb-7 gap-4">
        <div class="flex items-baseline gap-[18px]">
          <span class="font-mono text-[13px] leading-none text-ob-sand">01</span>
          <h2 class="font-bold text-[28px] leading-none tracking-[-0.02em] text-ob-bright">Certifications</h2>
        </div>
        <span class="font-mono text-[12px] leading-none text-ob-faint tracking-[0.04em] text-right">13 credentials · 1 in progress</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
        <div v-for="cat in certCategories" :key="cat.name">
          <div class="flex items-center gap-[10px] pb-[14px] mb-[18px] border-b border-ob-sand/16">
            <span class="w-[6px] h-[6px] bg-ob-bronze rounded-full"></span>
            <span class="font-mono text-[11px] leading-none tracking-[0.1em] uppercase text-ob-soft">{{ cat.name }}</span>
          </div>
          <div class="flex flex-col gap-4">
            <div v-for="cert in cat.items" :key="cert.name">
              <div class="flex items-center gap-[8px]">
                <span class="font-semibold text-[15px] leading-[1.3] text-ob-text">{{ cert.name }}</span>
                <span
                  v-if="cert.inProgress"
                  class="font-mono text-[9px] leading-none tracking-[0.1em] uppercase text-ob-sand border border-ob-sand/50 rounded-[2px] px-[6px] py-[3px] whitespace-nowrap"
                >In progress</span>
              </div>
              <div class="font-mono text-[11px] leading-none mt-[6px]" :class="cert.inProgress ? 'text-ob-sand' : 'text-ob-faint'">{{ cert.code }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// "About Me" secondary button variant (handoff exposes a single toggle).
// 'outline' = transparent / faint border / light text (current default);
// 'amber'   = filled amber / dark ink text.
const aboutVariant = 'outline'
const aboutBtnClass = computed(() =>
  aboutVariant === 'amber'
    ? 'bg-ob-sand text-ob-ink border-ob-sand hover:brightness-110'
    : 'bg-transparent text-ob-text border-ob-text/18 hover:border-ob-text/30',
)

const connectLinks = [
  {
    label: 'LinkedIn',
    value: 'in/simonparker-dev',
    href: 'https://www.linkedin.com/in/simonparker-dev/',
    external: true,
    icon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  },
  {
    label: 'GitHub',
    value: 'Simodalstix',
    href: 'https://github.com/Simodalstix',
    external: true,
    icon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>',
  },
  {
    label: 'Email',
    value: 'lastpolar@gmail.com',
    href: 'mailto:lastpolar@gmail.com',
    external: false,
    icon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  },
]

const certCategories = [
  {
    name: 'Amazon Web Services',
    items: [
      { name: 'Solutions Architect', code: 'SAA-C03 · Associate' },
      { name: 'Developer', code: 'DVA-C02 · Associate' },
      { name: 'Cloud Practitioner', code: 'CLF-C02 · Foundational' },
      { name: 'SysOps Administrator', code: 'SOA-C02 · Associate', inProgress: true },
    ],
  },
  {
    name: 'Microsoft & Azure',
    items: [
      { name: 'Azure Administrator', code: 'AZ-104 · Associate' },
      { name: 'Identity & Access Admin', code: 'SC-300 · Associate' },
      { name: '365 Fundamentals', code: 'MS-900 · Foundational' },
    ],
  },
  {
    name: 'Linux & Automation',
    items: [
      { name: 'Red Hat System Admin', code: 'RHCSA · EX200' },
      { name: 'Python Associate', code: 'PCAP' },
      { name: 'Terraform Associate', code: 'HashiCorp · 003' },
    ],
  },
  {
    name: 'Foundations',
    items: [
      { name: 'CompTIA Security+', code: 'SY0-701' },
      { name: 'CompTIA A+', code: '220-1101 / 1102' },
      { name: 'ITIL 4 Foundation', code: 'Service Management' },
    ],
  },
]
</script>
