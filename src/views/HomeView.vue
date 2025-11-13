<template>
  <div class="bg-slate-900 min-h-screen flex flex-col justify-center text-white">
    <div class="text-center p-6 sm:p-8 md:p-12 lg:p-20" style="padding-bottom: 10rem">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
        <span class="text-orange-300">Technical Support</span>
        <span class="text-slate-300"> & </span>
      </h1>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
        <span class="text-cyan-400">Customer Support Analyst</span>
      </h1>

      <p class="mt-6 text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
        Focused on troubleshooting SaaS applications, resolving user issues, and supporting product
        teams through clear analysis and reliable communication.
      </p>

      <div
        class="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <router-link
          :to="{ name: 'Projects' }"
          class="group bg-gradient-to-r from-slate-700 to-slate-600 hover:from-purple-700 hover:to-violet-600 border border-slate-500 hover:border-violet-400 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 w-full md:w-auto"
        >
          <span class="group-hover:text-indigo-100">View My Projects</span>
        </router-link>

        <router-link
          :to="{ name: 'Skills' }"
          class="group bg-gradient-to-r from-slate-700 to-slate-600 hover:from-cyan-700 hover:to-cyan-600 border border-slate-500 hover:border-cyan-400 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 w-full md:w-auto"
        >
          <span class="group-hover:text-cyan-100">Explore My Skills</span>
        </router-link>

        <router-link
          :to="{ name: 'About' }"
          class="group bg-gradient-to-r from-slate-700 to-slate-600 hover:from-emerald-700 hover:to-emerald-600 border border-slate-500 hover:border-emerald-400 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 w-full md:w-auto"
        >
          <span class="group-hover:text-emerald-100">Read My Story</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page does not require a <script> block unless you have specific logic for it.
</script>
