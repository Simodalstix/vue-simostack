<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
    <!-- Header -->
    <section class="mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <img src="/images/landscapes/profile.png" alt="profile" class=" h-20 sm:h-20 " />
        <h1 class="text-4xl sm:text-5xl font-bold">Personal Summary</h1>
      </div>
      
    </section>

    <!-- Main container with L-shaped border -->
    <section class="relative border-l-4 border-b-4 md:border-cyan-500 border-transparent md:rounded-bl-3xl pl-4 md:pl-6 sm:pl-8 pb-2 mb-8 md:mb-12 max-w-5xl">
      <!-- Start point circle (desktop only) -->
      <div class="hidden md:block absolute -left-[9px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-6 border-slate-900"></div>
      <!-- End point circle (desktop only) -->
      <div class="hidden md:block absolute -bottom-[9px] right-0 w-4 h-4 bg-cyan-500 rounded-full border-6 border-slate-900"></div>
      
      <div class="space-y-4 md:space-y-6">
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">
                 My background in science shaped how I approach technology: by understanding systems from the fundamentals upward. I’m interested in how operating systems, networking, identity, and applications interact across real infrastructure.

        </p>
        
        <p class="text-base md:text-lg text-gray-200 leading-relaxed flex-1">
          Today I work in MSP support across a variety of client environments, troubleshooting issues across Microsoft platforms and learning how systems behave in production.

Alongside this, I continue building depth in Linux systems, cloud infrastructure, and automation through hands-on labs and projects, with the goal of moving toward systems and infrastructure engineering roles.
          </p>
        <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <!-- <img
            src="/images/certifications/rhcsa.png"
            alt="RHCSA Certification"
            class="w-24 sm:w-28 md:w-32 opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
          /> -->
          
        </div>
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
            Delivering Level 1 and 2 support across client environments, including Microsoft 365, Entra ID, Active Directory, endpoints, networking, and common business applications. Work across varied infrastructures, diagnosing issues methodically and resolving them in live production environments.
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
