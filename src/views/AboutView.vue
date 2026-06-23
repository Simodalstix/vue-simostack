<template>
  <div class="max-w-[1440px] mx-auto px-6 sm:px-11">
    <!-- header -->
    <section class="pt-12 sm:pt-14 pb-9">
      <div class="flex items-center gap-[14px] mb-6">
        <span class="w-7 h-[1.5px] bg-ob-bronze"></span>
        <span class="font-mono text-[12px] leading-none tracking-[0.2em] uppercase text-ob-sand">About</span>
      </div>
      <h1 class="font-extrabold text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.0] tracking-[-0.03em] text-ob-bright max-w-[820px]">
        Background &amp; direction
      </h1>
    </section>

    <!-- intro + traits -->
    <section class="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-14 pb-12 items-start">
      <div class="flex flex-col gap-5">
        <p class="text-[17px] sm:text-[19px] leading-[1.65] text-ob-muted2">
          Before moving into technology I worked in healthcare, where mistakes carry real consequences. That environment trained me to slow down, verify assumptions, and think carefully about what might be missing before acting. Those habits translate naturally into troubleshooting complex systems.
        </p>
        <p class="text-[17px] sm:text-[19px] leading-[1.65] text-ob-dim">
          Cloud and infrastructure feel like a playground for systems thinking, where I design, test and refine how systems behave under change, failure and scale. Outside of work I explore this through hands-on labs and projects, building and refining code on GitHub, working in <span class="text-ob-sand font-semibold">Linux</span>, and deploying across cloud platforms.
        </p>
      </div>

      <!-- traits panel -->
      <aside class="border border-ob-sand/16 border-t-2 !border-t-ob-bronze rounded-[6px] bg-ob-surface overflow-hidden">
        <div class="px-6 py-[22px]">
          <div class="font-mono text-[12px] leading-none text-ob-faint mb-[18px]">$ simon --traits</div>
          <div class="flex flex-col gap-[13px] font-mono text-[13.5px] leading-none">
            <div v-for="t in traits" :key="t.key" class="flex justify-between">
              <span class="text-ob-faint">{{ t.key }}</span>
              <span :class="t.accent ? 'text-ob-sand' : 'text-ob-text'">{{ t.value }}</span>
            </div>
          </div>
        </div>
        <div class="px-6 py-[18px] border-t border-ob-sand/14 bg-ob-bronze/8 flex items-center justify-between gap-4">
          <div>
            <div class="font-mono text-[11px] leading-none tracking-[0.1em] uppercase text-ob-faint mb-[7px]">Current focus</div>
            <div class="font-semibold text-[14px] leading-[1.3] text-ob-text">AWS SysOps Administrator</div>
          </div>
          <span class="font-mono text-[11px] leading-none text-ob-sand whitespace-nowrap">in progress</span>
        </div>
      </aside>
    </section>

    <!-- career path -->
    <section class="pt-11 pb-14 border-t border-ob-sand/14">
      <div class="flex items-baseline gap-[18px] mb-10">
        <span class="font-mono text-[13px] leading-none text-ob-sand">02</span>
        <h2 class="font-bold text-[28px] leading-none tracking-[-0.02em] text-ob-bright">Career path</h2>
      </div>

      <!-- node track (desktop) -->
      <div class="relative mb-[22px] hidden md:block">
        <div class="absolute top-1/2 left-[16%] right-[16%] h-[2px] bg-ob-sand/18 -translate-y-1/2"></div>
        <div class="relative grid grid-cols-3">
          <div class="flex justify-center"><span class="w-[13px] h-[13px] rounded-full bg-[#4A3D28] border-[3px] border-ob-bg"></span></div>
          <div class="flex justify-center"><span class="w-[13px] h-[13px] rounded-full bg-[#4A3D28] border-[3px] border-ob-bg"></span></div>
          <div class="flex justify-center"><span class="w-[15px] h-[15px] rounded-full bg-ob-sand border-[3px] border-ob-bg shadow-[0_0_0_4px_rgba(221,194,154,0.16)]"></span></div>
        </div>
      </div>

      <!-- role cards -->
      <div class="grid md:grid-cols-3 gap-6 items-stretch">
        <div
          v-for="role in roles"
          :key="role.title"
          :class="[
            'rounded-[6px] bg-ob-surface p-7',
            role.current
              ? 'border-[1.5px] border-ob-bronze shadow-[0_0_0_4px_rgba(188,145,99,0.10)]'
              : 'border border-ob-sand/16',
          ]"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="font-mono text-[13px] leading-none" :class="role.current ? 'text-ob-text' : 'text-ob-dim'">{{ role.date }}</span>
            <span
              class="font-mono text-[10px] leading-none tracking-[0.1em] uppercase rounded-full px-[11px] py-[5px]"
              :class="role.current ? 'text-ob-sand bg-ob-sand/14' : 'text-ob-faint border border-ob-sand/18'"
            >{{ role.tag }}</span>
          </div>
          <h3 class="font-bold text-[21px] leading-[1.2] tracking-[-0.01em] mb-3" :class="role.current ? 'text-ob-bright' : 'text-ob-text'">{{ role.title }}</h3>
          <p class="text-[14.5px] leading-[1.6]" :class="role.current ? 'text-ob-muted2' : 'text-ob-dim'">{{ role.body }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const traits = [
  { key: 'curiosity', value: 'high' },
  { key: 'learning', value: 'continuous' },
  { key: 'ownership', value: 'enforcing' },
  { key: 'root_cause', value: 'required' },
  { key: 'team_morale', value: '+3', accent: true },
  { key: 'mindset', value: 'engineer', accent: true },
]

const roles = [
  {
    date: '2017 - 2024',
    tag: 'Healthcare',
    title: 'Pharmacist - Community',
    body: 'Community pharmacy in a regulated healthcare environment. Dispensed prescriptions, advised patients, and communicated clearly in high-responsibility situations. Built strong attention to detail, accountability, and the ability to stay calm in compliance-driven settings.',
  },
  {
    date: '2025',
    tag: 'SaaS',
    title: 'Customer & Technical Support',
    body: 'Application and customer support for a SaaS product: onboarding, installations, user education and structured troubleshooting. Documented solutions, analysed recurring issues, and worked closely with engineering to improve product reliability.',
  },
  {
    date: '2026 - Present',
    tag: 'MSP · Current',
    title: 'Helpdesk Support Technician',
    body: 'Level 1 and 2 support across client environments: Microsoft 365, Entra ID, Active Directory, endpoints, networking and business applications. Focused on root-cause analysis, repeatable fixes, and understanding how services behave across real-world infrastructure.',
    current: true,
  },
]
</script>
