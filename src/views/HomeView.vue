<template>
  <div class="max-w-[1440px] mx-auto px-6 sm:px-11">
    <!-- hero -->
    <section class="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 pt-12 pb-14 sm:pt-16 items-start">
      <div class="flex flex-col">
        <div class="flex items-center gap-[14px] mb-6">
          <span class="w-7 h-[1.5px] bg-ob-bronze"></span>
          <span class="font-mono text-[12px] leading-none tracking-[0.2em] uppercase text-ob-sand">Cloud &amp; Infrastructure Engineer</span>
        </div>

        <h1 class="font-extrabold text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-0.035em] text-ob-bright">
          Simon Parker
        </h1>

        <div class="flex items-center flex-wrap gap-x-3 gap-y-1 mt-6 font-mono text-[13px] text-ob-faint tracking-[0.02em]">
          <span>pharmacy</span><span class="text-ob-bronze">&rarr;</span>
          <span>helpdesk</span><span class="text-ob-bronze">&rarr;</span>
          <span class="text-ob-soft">systems &amp; cloud</span>
        </div>

        <div class="max-w-[580px] mt-7 flex flex-col gap-4">
          <p class="text-[17px] sm:text-[18px] leading-[1.6] text-ob-muted">
            I work in MSP support across varied client environments, Microsoft&nbsp;365, Entra&nbsp;ID, Active Directory, endpoints and networking, bringing a deliberate, root-cause approach carried over from years in regulated healthcare.
          </p>
          <p class="text-[17px] sm:text-[18px] leading-[1.6] text-ob-dim">
            Outside support I build depth in Linux, cloud infrastructure and automation through Terraform, AWS&nbsp;CDK and a bare-metal homelab, learning how systems behave, break and recover.
          </p>
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

        <div class="flex flex-wrap gap-[14px]">
          <router-link
            :to="{ name: 'Projects' }"
            class="px-7 py-[14px] bg-ob-teal text-ob-text font-bold text-[14px] rounded-[3px] hover:brightness-110 transition"
          >View Projects</router-link>
          <router-link
            :to="{ name: 'About' }"
            class="px-7 py-[14px] text-ob-teal-bright font-bold text-[14px] rounded-[3px] border-[1.5px] border-ob-teal/45 hover:border-ob-teal-bright/70 transition-colors"
          >About Me</router-link>
        </div>
      </div>
    </section>

    <!-- certifications -->
    <section class="pt-11 pb-14 border-t border-ob-sand/14">
      <div class="flex items-baseline justify-between mb-9 gap-4">
        <div class="flex items-baseline gap-[18px]">
          <span class="font-mono text-[13px] leading-none text-ob-sand">01</span>
          <h2 class="font-bold text-[28px] leading-none tracking-[-0.02em] text-ob-bright">Certifications</h2>
        </div>
        <span class="font-mono text-[12px] leading-none text-ob-faint tracking-[0.04em] text-right">13 credentials · 1 in progress</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
        <div v-for="cat in certCategories" :key="cat.name">
          <div class="flex items-center gap-[10px] pb-[14px] mb-[18px] border-b border-ob-sand/16">
            <span class="w-[6px] h-[6px] bg-ob-bronze rounded-full"></span>
            <span class="font-mono text-[11px] leading-none tracking-[0.1em] uppercase text-ob-soft">{{ cat.name }}</span>
          </div>
          <div class="flex flex-col gap-4">
            <div v-for="cert in cat.items" :key="cert.name">
              <div class="font-semibold text-[15px] leading-[1.3]" :class="cert.inProgress ? 'text-ob-dim' : 'text-ob-text'">{{ cert.name }}</div>
              <div class="font-mono text-[11px] leading-none mt-[6px]" :class="cert.inProgress ? 'text-ob-sand' : 'text-ob-faint'">{{ cert.code }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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
      { name: 'SysOps Administrator', code: 'SOA-C02 · in progress', inProgress: true },
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
