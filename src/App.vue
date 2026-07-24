<template>
  <router-view v-if="isPrep" />
  <div v-else class="flex flex-col min-h-screen bg-ob-bg text-ob-text font-display">
    <header class="border-b border-ob-sand/14">
      <nav
        class="max-w-[1440px] mx-auto px-6 sm:px-11 py-3 sm:py-4 flex items-center justify-between gap-6"
      >
        <div class="flex items-center gap-[14px]">
          <span
            class="w-[34px] h-[34px] border-[1.5px] border-ob-bronze rounded-[3px] flex items-center justify-center font-display font-extrabold text-[13px] leading-none text-ob-sand tracking-[0.02em] select-none"
            >SP</span
          >
          <span
            class="hidden sm:inline font-mono text-[13px] leading-none tracking-[0.04em] text-ob-soft"
            >simostack.com</span
          >
        </div>

        <div
          class="hidden md:flex items-center gap-7 font-display font-semibold text-[13px] min-w-0"
        >
          <router-link
            v-for="link in mainNavLinks"
            :key="link.name"
            :to="{ name: link.name }"
            class="text-ob-faint hover:text-ob-text transition-colors border-b-2 border-transparent pb-[3px]"
            :exact-active-class="link.exact ? '!text-ob-text !border-ob-teal' : undefined"
            :active-class="link.exact ? undefined : '!text-ob-text !border-ob-teal'"
            :class="{ '!text-ob-text !border-ob-teal': link.tool && route.meta.tool === link.tool }"
            >{{ link.label }}</router-link
          >
          <span
            class="font-mono text-[12px] leading-none text-ob-faint tracking-[0.04em] pl-6 border-l border-ob-sand/14 ml-auto"
            >Melbourne, AU</span
          >
        </div>

        <button
          @click="toggleMobileMenu"
          class="md:hidden text-ob-faint hover:text-ob-text transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <div
        v-if="isMobileMenuOpen"
        class="md:hidden px-6 pb-4 flex flex-col gap-1 font-display font-semibold text-sm border-t border-ob-sand/14"
      >
        <router-link
          v-for="link in mainNavLinks"
          :key="link.name"
          :to="{ name: link.name }"
          class="px-2 py-2 text-ob-faint hover:text-ob-text transition-colors"
          :exact-active-class="link.exact ? '!text-ob-text' : undefined"
          :active-class="link.exact ? undefined : '!text-ob-text'"
          :class="{ '!text-ob-text': link.tool && route.meta.tool === link.tool }"
          @click="closeMobileMenu"
          >{{ link.label }}</router-link
        >
      </div>
    </header>

    <main class="flex-grow">
      <router-view />
    </main>

    <!-- footer -->
    <footer class="border-t border-ob-sand/14">
      <div
        class="max-w-[1440px] mx-auto px-6 sm:px-11 min-h-[66px] py-3 sm:py-4 flex items-center justify-between font-mono text-[13px] leading-none tracking-[0.04em] text-ob-faint"
      >
        <span>&copy; 2026 Simon Parker</span>
        <span class="text-ob-soft"
          >Systems thinking shaped by years of high-stakes human contact.</span
        >
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { MAIN_NAV_LINKS } from '@/router/routes.js'

const route = useRoute()
const isPrep = computed(
  () => route.path.startsWith('/prep') || (import.meta.env.DEV && route.path.startsWith('/clearance')),
)
const mainNavLinks = MAIN_NAV_LINKS

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
