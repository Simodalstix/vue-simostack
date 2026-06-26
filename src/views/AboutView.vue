<template>
  <div class="max-w-[1440px] mx-auto px-6 sm:px-11">
    <!-- header -->
    <section class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pt-8 sm:pt-9 pb-6">
      <div class="max-w-[760px]">
        <div class="flex items-center gap-[12px] mb-5">
          <span class="font-mono font-semibold text-[13px] leading-none text-ob-sand">02</span>
          <span class="w-6 h-[2px] bg-ob-sand"></span>
          <span class="font-mono font-semibold text-[11px] leading-none tracking-[0.2em] uppercase text-ob-sand">About</span>
        </div>
        <h1 class="font-bold text-[36px] sm:text-[44px] lg:text-[46px] leading-[1.0] tracking-[-0.02em] text-ob-bright mb-4">
          Background &amp; trajectory
        </h1>
        <p class="text-[16px] leading-[1.6] text-ob-dim max-w-[680px]">
          A non-linear path into infrastructure, eight years in regulated healthcare, then a deliberate move into technology. The discipline came first; the stack followed.
        </p>
      </div>

      <!-- education badge -->
      <div class="flex flex-col items-start lg:items-end shrink-0 lg:mr-[10%]">
        <div class="rounded-md bg-white px-[6px] py-[3px] border border-black/5 shadow-sm">
          <img
            src="/images/project-icons/monash-logo-black.svg"
            alt="Monash University"
            class="h-[48px] w-auto object-contain"
          />
        </div>
      </div>
    </section>

    <!-- career -->
    <section class="pb-8">
      <div class="flex items-center gap-6 mb-6">
        <h2 class="font-bold text-[25px] leading-none tracking-[-0.02em] text-ob-bright shrink-0">Career</h2>
        <span class="flex-1 h-px bg-ob-sand/14"></span>
        <span class="font-mono text-[12px] leading-none tracking-[0.08em] text-ob-faint shrink-0">2017 – PRESENT</span>
      </div>

      <!-- node track (desktop) -->
      <div class="relative mb-5 hidden md:block">
        <div class="absolute top-[6px] left-2 right-2 h-px bg-ob-sand/14"></div>
        <div class="relative grid grid-cols-3 gap-6">
          <div v-for="role in roles" :key="role.title" class="flex items-center gap-3">
            <span
              class="rounded-full border-[3px] border-ob-bg shrink-0"
              :class="role.current
                ? 'w-[14px] h-[14px] bg-ob-teal shadow-[0_0_0_4px_rgba(61,184,160,0.16)]'
                : 'w-[13px] h-[13px] bg-ob-sand'"
            ></span>
            <span class="font-mono text-[12px] leading-none" :class="role.current ? 'text-ob-teal-bright' : 'text-ob-dim'">{{ role.date }}</span>
          </div>
        </div>
      </div>

      <!-- role cards -->
      <div class="grid md:grid-cols-3 gap-6 items-stretch">
        <div
          v-for="role in roles"
          :key="role.title"
          :class="[
            'rounded-[4px] bg-ob-surface p-5 flex flex-col',
            role.current ? 'border-[1.5px] border-ob-teal' : 'border border-ob-sand/16',
          ]"
        >
          <div class="md:hidden font-mono text-[12px] leading-none mb-3" :class="role.current ? 'text-ob-teal-bright' : 'text-ob-dim'">{{ role.date }}</div>
          <h3 class="font-bold text-[20px] leading-[1.2] tracking-[-0.01em] text-ob-bright mb-[13px]">{{ role.title }}</h3>
          <div class="font-mono text-[10.5px] leading-none tracking-[0.1em] uppercase mb-[18px]" :class="role.current ? 'text-ob-teal-bright' : 'text-ob-sand'">{{ role.label }}</div>
          <p class="text-[13.5px] leading-[1.6] text-ob-dim mb-5">{{ role.body }}</p>
          <div class="flex flex-wrap gap-[7px] mt-auto">
            <span
              v-for="tag in role.tags"
              :key="tag"
              class="font-mono text-[11.5px] leading-none tracking-[0.02em] text-ob-soft bg-ob-sand/[0.06] border border-ob-sand/25 rounded-[3px] px-[11px] py-[7px]"
            >{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- background & principles -->
    <section class="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 pt-6 pb-8">
      <div>
        <h2 class="font-bold text-[22px] leading-none tracking-[-0.02em] text-ob-bright mb-6">Background &amp; direction</h2>
        <div class="flex flex-col gap-4">
          <p class="text-[15px] leading-[1.65] text-ob-muted2">
            I came to infrastructure from healthcare, where precision and accountability aren't aspirations, they're the baseline. That grounding shapes how I approach systems: deliberately, with an eye on what happens when things go wrong.
          </p>
          <p class="text-[15px] leading-[1.65] text-ob-dim">
            Day to day I keep client environments stable and secure. Beyond that I'm going deeper in systems and cloud, <span class="text-ob-text font-semibold">Linux</span>, Terraform, AWS CDK and a bare-metal homelab, learning the foundations that make infrastructure reliable.
          </p>
        </div>
      </div>

      <div>
        <h2 class="font-bold text-[22px] leading-none tracking-[-0.02em] text-ob-bright mb-7">Operating principles</h2>
        <div class="grid sm:grid-cols-2 gap-x-10 gap-y-7">
          <div v-for="p in principles" :key="p.n" class="flex gap-[12px]">
            <span class="font-mono text-[13px] leading-none text-ob-sand pt-[2px] shrink-0">{{ p.n }}</span>
            <div>
              <div class="font-semibold text-[15px] leading-[1.25] text-ob-text mb-[6px]">{{ p.title }}</div>
              <p class="text-[12px] leading-[1.5] text-ob-dim">{{ p.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const roles = [
  {
    date: '2017 – 2024',
    label: 'Chemist Warehouse · Pharmacy',
    title: 'Pharmacist',
    body: 'Eight years of high-volume, high-consequence work governed by strict protocol, verify before acting, document everything, stay composed when the stakes are real.',
    tags: ['Regulated', 'Accountability', 'Detail'],
  },
  {
    date: '2025',
    label: 'Strongroom · Tech · SaaS',
    title: 'Customer & Technical Support',
    body: 'Moved into technology full-time, resolving issues across software and hardware. Translated a clinical mindset into structured troubleshooting and clear written communication.',
    tags: ['Triage', 'Comms', 'Diagnostics'],
  },
  {
    date: '2026 – Present',
    label: 'Cititec · MSP support',
    title: 'Helpdesk Support Technician',
    body: 'Frontline support across varied client environments, Microsoft 365, Entra ID, Active Directory, endpoints and networking. Owning incidents end to end and pushing toward root cause.',
    tags: ['M365', 'Entra ID', 'Networking'],
    current: true,
  },
]

const principles = [
  {
    n: '01',
    title: 'Accurate status over comfortable',
    body: 'I flag a risk early rather than explain a failure late.',
  },
  {
    n: '02',
    title: 'What I commit to gets done',
    body: 'Ownership I take is followed through, with care, and without needing chasing.',
  },
  {
    n: '03',
    title: 'Composed when systems are down',
    body: 'Methodical when pressure is high, steady, not reactive.',
  },
  {
    n: '04',
    title: 'Mistakes that carried real weight',
    body: 'Years in a field where an error had consequences, I bring that gravity to infrastructure.',
  },
]
</script>
