<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-700 py-8">
      <div class="container mx-auto px-6">
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-3">About Simon</h1>
        <p class="text-lg text-slate-300 text-center max-w-2xl mx-auto">
          Scientist turned cloud engineer, building the future one deployment at a time
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-8">
          <!-- Professional Story -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <h2 class="text-xl font-bold text-white">Professional Story</h2>
            </div>
            <div class="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                At 39, I made the leap from a 15-year career in pharmacy to cloud engineering. My scientific background gives me a methodical approach to infrastructure design.
              </p>
              <p>
                Currently seeking junior cloud/DevOps roles where I can contribute my fresh perspective, strong work ethic, and growing technical expertise.
              </p>
            </div>
          </div>

          <!-- Career Timeline -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-3 h-3 bg-violet-400 rounded-full"></div>
              <h2 class="text-xl font-bold text-white">Career Journey</h2>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-violet-400 font-bold text-xs">2024</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-white">Cloud Engineering Transition</h3>
                  <p class="text-slate-300 text-xs">AWS, Azure, Terraform, Docker, Kubernetes</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-cyan-400 font-bold text-xs">2023</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-white">DevOps Discovery</h3>
                  <p class="text-slate-300 text-xs">Python automation, infrastructure as code</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-emerald-400 font-bold text-xs">2009</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-white">Pharmacy Career</h3>
                  <p class="text-slate-300 text-xs">15 years clinical pharmacy experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div>
          <!-- Character & Interests -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <h2 class="text-xl font-bold text-white">Character & Interests</h2>
            </div>
            <div class="grid grid-cols-1 gap-3 text-slate-300 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Identical Twin:</strong> Born 2 minutes before my brother - still winning</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Handstand Walker:</strong> Can walk 50+ meters on my hands</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Published Scientist:</strong> Co-authored antimicrobial resistance research</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>ARAM Enthusiast:</strong> League of Legends ARAM mode addict</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Linux Installer:</strong> Compulsive OS experimenter</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Hardware Tinkerer:</strong> Currently obsessed with Beelink SER8</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Tech Passion:</strong> Genuinely excited by infrastructure automation</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold text-xs mt-1">•</span>
                <span><strong>Problem Solver:</strong> Love making complex systems simple</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>