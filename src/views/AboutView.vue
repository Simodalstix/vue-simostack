<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
    <!-- Header -->
    <section class="mb-8 sm:mb-12">
      <h1 class="text-4xl sm:text-5xl font-bold mb-2">About Me</h1>
    </section>

    <!-- Main container with L-shaped border -->
    <section class="relative border-l-4 border-b-4 md:border-cyan-500 border-transparent md:rounded-bl-3xl pl-4 md:pl-6 sm:pl-8 pb-6 md:pb-8 mb-8 md:mb-12 max-w-5xl">
      <!-- Start point circle (desktop only) -->
      <div class="hidden md:block absolute -left-[9px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-6 border-slate-900"></div>
      <!-- End point circle (desktop only) -->
      <div class="hidden md:block absolute -bottom-[9px] right-0 w-4 h-4 bg-cyan-500 rounded-full border-6 border-slate-900"></div>
      
      <div class="space-y-4 md:space-y-6">
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">
          Currently working in MSP support, I handle Level 1 and 2 issues across Microsoft 365, identity, and endpoint environments. My background in science shaped how I approach technology: I enjoy understanding how systems interact, identifying root causes, and working through complexity methodically.
        </p>
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">
          Outside of daily support work, I am particularly interested in operating systems and infrastructure, especially Linux and cloud platforms such as Azure and AWS. I run a home server and lab environment where I experiment with networking, automation, and system configuration in a practical, hands-on way.
        </p>
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">My focus right now is becoming efficient and reliable in core troubleshooting scenarios, while steadily building deeper knowledge in systems and infrastructure.</p>
       
      </div>
    </section>

    <!-- Role cards below the timeline -->
    <section class="max-w-6xl relative pt-0 md:pt-8">
      <!-- Connector lines from bottom border to cards -->
      <div class="hidden md:block absolute -top-12 left-0 right-0 h-20">
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
          <h3 class="text-xl font-bold text-slate-300 mb-3">Pharmacist - Community </h3>
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
            Deliver Level 1 and 2 support across client environments, including Microsoft 365, Entra ID, Active Directory, endpoints, networking, and common business applications. Work across varied infrastructures, diagnosing issues methodically and resolving them in live production environments.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <!-- <section class="mt-16 sm:mt-20 text-center max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-6">Let's Connect</h2>
      <p class="text-lg text-gray-300 mb-6 leading-relaxed">
        I work best in environments that value steady communication, accuracy, and clear thinking. If you're looking for reliable MSP or helpdesk support, I'm open to opportunities where practical problem-solving matters.
      </p>
      <div class="flex flex-wrap justify-center items-center gap-6 text-lg">
        <a href="mailto:Lastpolar@gmail.com" class="text-cyan-300 hover:text-cyan-400 transition-colors">
          📧 Lastpolar@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/simonparker-dev/" target="_blank" class="text-cyan-300 hover:text-cyan-400 transition-colors">
          💼 LinkedIn
        </a>
        <a href="https://github.com/Simodalstix" target="_blank" class="text-cyan-300 hover:text-cyan-400 transition-colors">
          🔗 GitHub
        </a>
      </div>
    </section> -->
  </div>
</template>
