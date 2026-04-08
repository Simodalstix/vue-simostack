<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
    <!-- Header -->
    <section class="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">

        <h1 class="text-4xl sm:text-5xl font-bold text-center sm:text-left">Background &amp; Direction</h1>
      </div>
    </section>

    <!-- Main container with L-shaped border -->
    <section class="relative border-l-4 border-b-4 md:border-cyan-500 border-transparent md:rounded-bl-3xl pl-4 md:pl-6 sm:pl-8 pb-4 mb-4 md:mb-8 max-w-5xl">
      <!-- Start point circle (desktop only) -->
      <div class="hidden md:block absolute -left-[9px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-6 border-slate-900"></div>
      <!-- End point circle (desktop only) -->
      <div class="hidden md:block absolute -bottom-[9px] right-0 w-4 h-4 bg-cyan-500 rounded-full border-6 border-slate-900"></div>

    <div class="flex flex-col md:flex-row gap-6">

      <!-- Paragraphs (left) -->
      <div class="space-y-4 md:space-y-6 flex-1 min-w-0">
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">
          Before moving into technology I worked in healthcare, where mistakes carry real consequences. That environment trained me to slow down, verify assumptions, and think carefully about what might be missing before acting. Those habits translate naturally into troubleshooting complex systems.
        </p>
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">
         Cloud and infrastructure feel like a playground for systems thinking, where I design, test, and refine how systems behave under change, failure, and scale. Outside of work, I explore this through hands-on labs and projects, building and refining code in GitHub, working in Linux, and deploying systems across cloud platforms.
        </p>
      </div>

      <!-- Traits block (right) -->
      <div class="font-mono text-sm md:text-base bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-4 w-auto shrink-0 self-start">
        <div class="text-gray-500 mb-2">$ simon --traits</div>
        <div class="text-cyan-300">curiosity: high</div>
        <div class="text-cyan-300">learning: continuous</div>
      <div class="text-cyan-300">ownership: Enforcing</div>
        <div class="text-cyan-300">incident_response: calm</div>
        <div class="text-cyan-300">team_morale: +3</div>
          <div class="text-cyan-300">root_cause: required</div>
          <div class="text-cyan-300">logical_fallacies: none</div>

      </div>

    </div>

    </section>

    <!-- Role cards below the timeline -->
    <section class="max-w-6xl relative pt-0 md:pt-8">
      <!-- Connector lines from bottom border to cards -->
      <div class="hidden md:block absolute -top-8 left-0 right-0 h-16">
        <!-- Line to Pharmacist (left) -->
        <div class="absolute left-[16.84%] top-0 w-0.5 h-full bg-slate-600"></div>
        <div class="absolute left-[16.66%] -top-[6px] w-3 h-3 bg-cyan-500 rounded-full -translate-x-[3px]"></div>

        <!-- Line to SaaS (center) -->
        <div class="absolute left-1/2 top-0 w-0.5 h-full bg-slate-600"></div>
        <div class="absolute left-1/2 -top-[6px] w-3 h-3 bg-cyan-500 rounded-full -translate-x-1"></div>

        <!-- Line to MSP (right) -->
        <div class="absolute left-[83.54%] top-0 w-0.5 h-full bg-cyan-500"></div>
        <div class="absolute left-[83.33%] -top-[6px] w-3 h-3 bg-cyan-500 rounded-full -translate-x-[3px]"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Pharmacist (LEFT - earliest) -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-600 p-6">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="bg-slate-400 rounded-full w-3 h-3"></div>
              <span class="text-sm text-gray-400">2017 — 2024</span>
            </div>
            <span class="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">Healthcare</span>
          </div>
          <h3 class="text-xl font-bold text-slate-300 mb-3">Pharmacist - Community</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            Community pharmacy within a regulated healthcare environment. Dispensed prescriptions, advised patients, and communicated clearly in high-responsibility situations. Built strong attention to detail, accountability, and the ability to operate calmly in compliance-driven settings.
          </p>
        </div>

        <!-- SaaS Technical Support (CENTER) -->
        <div class="rounded-xl bg-slate-800/50 border border-slate-600 p-6">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="bg-slate-400 rounded-full w-3 h-3"></div>
              <span class="text-sm text-gray-400">2025 — 2025</span>
            </div>
            <span class="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">SaaS</span>
          </div>
          <h3 class="text-xl font-bold text-slate-300 mb-3">Customer & Technical Support</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            Provided application and customer support for a SaaS product, including onboarding, installations, user education, and structured troubleshooting. Documented solutions, analysed recurring issues, and collaborated closely with engineering teams to improve product reliability and customer experience.
          </p>
        </div>

        <!-- MSP Helpdesk Support (RIGHT - current) -->
        <div class="rounded-xl bg-gradient-to-br from-cyan-900 to-slate-900 border border-cyan-500 p-6">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="bg-cyan-400 rounded-full w-3 h-3"></div>
              <span class="text-sm text-gray-400">2026 — Present</span>
            </div>
            <span class="text-xs text-cyan-300 bg-cyan-700/50 px-3 py-1 rounded-full">MSP</span>
          </div>
          <h3 class="text-xl font-bold text-cyan-300 mb-3">Helpdesk Support Technician</h3>
          <p class="text-gray-200 text-sm leading-relaxed">
            Delivering Level 1 and 2 support across client environments, including Microsoft 365, Entra ID, Active Directory, endpoints, networking, and business applications. Focus on root cause analysis, repeatable fixes, and understanding how services behave across real-world infrastructure.
          </p>
        </div>
      </div>
    </section>

  </div>
</template>
