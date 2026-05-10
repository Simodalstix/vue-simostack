<template>
  <router-view v-if="isPrep" />
  <div v-else class="flex flex-col min-h-screen bg-slate-900 text-white">
    <header class="relative bg-slate-900 border-b border-slate-700/60">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-purple-900/20 pointer-events-none" />
      <nav class="relative container mx-auto px-6 py-3">

        <!-- Mobile -->
        <div class="flex justify-between items-center md:hidden">
          <span class="text-sm font-semibold tracking-widest text-cyan-400/80 uppercase">SP</span>
          <button @click="toggleMobileMenu" class="focus:outline-none text-slate-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div v-if="isMobileMenuOpen" class="md:hidden mt-3 pb-3 flex flex-col gap-1">
          <router-link :to="{ name: 'Home' }"     class="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-150" active-class="text-white bg-white/10" @click="closeMobileMenu">Home</router-link>
          <router-link :to="{ name: 'About' }"    class="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-150" active-class="text-white bg-white/10" @click="closeMobileMenu">About</router-link>
          <router-link :to="{ name: 'Projects' }" class="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-150" active-class="text-white bg-white/10" @click="closeMobileMenu">Projects</router-link>
        </div>

        <!-- Desktop -->
        <div class="hidden md:flex items-center justify-between">
          <span class="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase select-none">Simon Parker</span>
          <div class="flex items-center gap-1">
            <router-link
              :to="{ name: 'Home' }"
              class="px-4 py-1.5 rounded-full text-sm text-slate-400 border border-transparent hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all duration-150"
              exact-active-class="!bg-purple-600 !text-white !font-semibold !border-purple-400/40"
            >Home</router-link>
            <router-link
              :to="{ name: 'About' }"
              class="px-4 py-1.5 rounded-full text-sm text-slate-400 border border-transparent hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all duration-150"
              exact-active-class="!bg-purple-600 !text-white !font-semibold !border-purple-400/40"
            >About</router-link>
            <router-link
              :to="{ name: 'Projects' }"
              class="px-4 py-1.5 rounded-full text-sm text-slate-400 border border-transparent hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all duration-150"
              exact-active-class="!bg-purple-600 !text-white !font-semibold !border-purple-400/40"
            >Projects</router-link>
          </div>
        </div>

      </nav>
    </header>

    <main :class="isHome ? 'flex-grow' : 'flex-grow container mx-auto px-2 sm:px-6 py-4'">
      <router-view />
    </main>

    <footer class="bg-slate-800 text-white py-8 sm:py-10">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8">
                    <div class="flex items-center justify-center text-center">
            <h2 class="text-xl font-bold text-slate-300">
              Reliable systems. Trusted support. Continuous improvement.
            </h2>
          </div>
        </div>
        <div class="mt-8 border-t-2 border-slate-500 pt-6 text-center text-slate-400">
          <p>&copy; 2025 Simon Parker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isPrep = computed(() => route.path.startsWith('/prep'))
const isHome = computed(() => route.path === '/')

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
