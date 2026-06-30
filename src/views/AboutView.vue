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
      <div class="flex flex-col items-start lg:items-end shrink-0 lg:mr-[calc(33.333%_+_8px)]">
        <div>
          <img
            src="/images/project-icons/monash-logo-white.png"
            alt="Monash University"
            class="h-[34px] w-auto object-contain"
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

    <!-- operating principles -->
    <section class="pt-6 pb-8">
      <h2 class="font-bold text-[25px] leading-none tracking-[-0.02em] text-ob-bright mb-8">Operating principles</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div v-for="p in principles" :key="p.title" class="border-l-2 border-ob-sand pl-[18px]">
          <div class="font-semibold text-[15px] leading-[1.3] text-ob-text mb-[10px]">{{ p.title }}</div>
          <p class="text-[13px] leading-[1.6] text-ob-dim">{{ p.body }}</p>
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
    title: 'Cuts to what actually matters',
    body: 'Comfortable making decisions with incomplete information. Most problems come down to two or three deciding factors, not twenty.',
  },
  {
    title: 'Explains without assuming context',
    body: "Years spent explaining things to people from every background. Accuracy means nothing if the person in front of you doesn't understand it.",
  },
  {
    title: "Goes deep when it's warranted",
    body: 'Comfortable spending real time on the things that need it, rather than chasing the fastest visible result.',
  },
  {
    title: 'Treats errors as consequential',
    body: "Some environments tolerate a wrong guess. Mine never did. That standard didn't loosen when the stakes changed shape.",
  },
]
</script>
