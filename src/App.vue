<template>
  <router-view v-if="isPrep" />
  <div v-else class="flex flex-col min-h-screen bg-ob-bg text-ob-text font-display">
    <!-- nav -->
    <header class="border-b border-ob-sand/14">
      <nav class="max-w-[1440px] mx-auto px-6 sm:px-11 py-3 sm:py-4 flex items-center justify-between">
        <!-- brand -->
        <div class="flex items-center gap-[14px]">
          <span
            class="w-[34px] h-[34px] border-[1.5px] border-ob-bronze rounded-[3px] flex items-center justify-center font-display font-extrabold text-[13px] leading-none text-ob-sand tracking-[0.02em] select-none"
          >SP</span>
          <span class="hidden sm:inline font-mono text-[13px] leading-none tracking-[0.04em] text-ob-soft">simonparker.dev</span>
        </div>

        <!-- desktop links -->
        <div class="hidden md:flex items-center gap-9 font-display font-semibold text-[13px]">
          <router-link
            :to="{ name: 'Home' }"
            class="text-ob-faint hover:text-ob-text transition-colors border-b-2 border-transparent pb-[3px]"
            exact-active-class="!text-ob-text !border-ob-teal"
          >Home</router-link>
          <router-link
            :to="{ name: 'About' }"
            class="text-ob-faint hover:text-ob-text transition-colors border-b-2 border-transparent pb-[3px]"
            active-class="!text-ob-text !border-ob-teal"
          >About</router-link>
          <router-link
            :to="{ name: 'Projects' }"
            class="text-ob-faint hover:text-ob-text transition-colors border-b-2 border-transparent pb-[3px]"
            active-class="!text-ob-text !border-ob-teal"
          >Projects</router-link>
          <span
            class="font-mono text-[12px] leading-none text-ob-faint tracking-[0.04em] pl-6 border-l border-ob-sand/14"
          >Melbourne, AU</span>
        </div>

        <!-- mobile toggle -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-ob-faint hover:text-ob-text transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden px-6 pb-4 flex flex-col gap-1 font-display font-semibold text-sm border-t border-ob-sand/14">
        <router-link :to="{ name: 'Home' }" class="px-2 py-2 text-ob-faint hover:text-ob-text transition-colors" exact-active-class="!text-ob-text" @click="closeMobileMenu">Home</router-link>
        <router-link :to="{ name: 'About' }" class="px-2 py-2 text-ob-faint hover:text-ob-text transition-colors" active-class="!text-ob-text" @click="closeMobileMenu">About</router-link>
        <router-link :to="{ name: 'Projects' }" class="px-2 py-2 text-ob-faint hover:text-ob-text transition-colors" active-class="!text-ob-text" @click="closeMobileMenu">Projects</router-link>
      </div>
    </header>

    <main class="flex-grow">
      <router-view />
    </main>

    <!-- footer -->
    <footer class="border-t border-ob-sand/14">
      <div class="max-w-[1440px] mx-auto px-6 sm:px-11 py-4 flex items-center justify-between font-mono text-xs text-ob-faint">
        <span>&copy; 2026 Simon Parker</span>
        <span>Melbourne · AEST</span>
      </div>
    </footer>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isPrep = computed(() => route.path.startsWith('/prep') || route.path.startsWith('/clearance'))

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
