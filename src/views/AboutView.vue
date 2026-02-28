<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
    <!-- Header -->
    <section class="mb-8 sm:mb-12 flex items-center justify-between">
      <h1 class="text-4xl sm:text-5xl font-bold">Profile</h1>
      <div class="flex items-center gap-3">
        <a
          href="https://www.linkedin.com/in/simonparker-dev/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-[#0A66C2] border border-slate-600 hover:border-[#0A66C2] rounded-lg transition-all duration-200 text-gray-300 hover:text-white"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span class="text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href="https://github.com/Simodalstix"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-purple-700 border border-slate-600 hover:border-purple-600 rounded-lg transition-all duration-200 text-gray-300 hover:text-white"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm font-medium">GitHub</span>
        </a>
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
                   My background in science shaped how I approach technology: I enjoy learning how systems interact and isolating problems to the systems or layers involved, working through issues systematically. My work spans support, cloud, and infrastructure environments, with a strong foundation in Linux-based systems.

        </p>
        
        <p class="text-base md:text-lg text-gray-200 leading-relaxed flex-1">
           Right now, my focus is gaining exposure to different client environments and mastering the Microsoft platforms I support each day. I'm working toward becoming consistently efficient and dependable in real-world troubleshooting while continuing to build practical depth in systems and infrastructure across Linux and cloud platforms.
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
