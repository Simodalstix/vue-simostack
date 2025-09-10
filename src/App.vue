n d
<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <header
      class="bg-gradient-to-r from-slate-800 to-slate-700 shadow-xl border-b border-slate-600"
    >
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <router-link
            to="/"
            class="text-xl font-bold text-white hover:text-indigo-300 transition-colors duration-200"
            >Simon Parker
          </router-link>
          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden focus:outline-none text-white"
            aria-label="Toggle menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Mobile menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-3">
            <router-link
              :to="{ name: 'Home' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
              >Home</router-link
            >
            <router-link
              :to="{ name: 'Blog' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
              >Blog</router-link
            >
            <router-link
              :to="{ name: 'Skills' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
              >Skills & Certs</router-link
            >
            <router-link
              :to="{ name: 'Projects' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
              >Projects</router-link
            >
            <router-link
              :to="{ name: 'ProjectsRemake' }"
              class="px-3 py-2 rounded-md text-orange-300 hover:text-white hover:bg-orange-600/50 transition-all duration-200 text-sm"
              @click="closeMobileMenu"
              >Projects v2</router-link
            >
            <router-link
              :to="{ name: 'SkillsRemake' }"
              class="px-3 py-2 rounded-md text-violet-300 hover:text-white hover:bg-violet-600/50 transition-all duration-200 text-sm"
              @click="closeMobileMenu"
              >Skills v2</router-link
            >
            <router-link
              :to="{ name: 'About' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
              >About</router-link
            >
            <router-link
              :to="{ name: 'Contact' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
              >Contact</router-link
            >
            <router-link
              :to="{ name: 'Elephant' }"
              class="px-3 py-2 rounded-md hover:bg-slate-600/50 transition-all duration-200"
              @click="closeMobileMenu"
            >
              <div class="flex items-center text-gray-300 hover:text-white">
                <img
                  src="/images/project-icons/elephant-icon.png"
                  alt="Elephant Icon"
                  class="h-6 w-6 mr-2"
                />
                <span>Elephant Room</span>
              </div>
            </router-link>
          </div>
        </div>
        <!-- Desktop menu -->
        <div class="hidden md:flex justify-between items-center mt-4">
          <div class="flex space-x-1">
            <router-link
              :to="{ name: 'Home' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              >Home</router-link
            >
            <router-link
              :to="{ name: 'Blog' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              >Blog</router-link
            >
            <router-link
              :to="{ name: 'Skills' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              >Skills & Certs</router-link
            >
            <router-link
              :to="{ name: 'Projects' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              >Projects</router-link
            >
            <router-link
              :to="{ name: 'ProjectsRemake' }"
              class="px-3 py-2 rounded-md text-orange-300 hover:text-white hover:bg-orange-600/50 transition-all duration-200 text-sm"
              >Projects v2</router-link
            >
            <router-link
              :to="{ name: 'SkillsRemake' }"
              class="px-3 py-2 rounded-md text-violet-300 hover:text-white hover:bg-violet-600/50 transition-all duration-200 text-sm"
              >Skills v2</router-link
            >
            <router-link
              :to="{ name: 'About' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              >About</router-link
            >
            <router-link
              :to="{ name: 'Contact' }"
              class="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
              >Contact</router-link
            >
            <router-link
              :to="{ name: 'Elephant' }"
              class="px-3 py-2 rounded-md hover:bg-slate-600/50 transition-all duration-200"
            >
              <img
                src="/images/project-icons/elephant-icon.png"
                alt="Elephant Icon"
                class="h-6 w-6"
              />
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto px-6 py-4">
      <router-view />
    </main>

    <footer class="bg-gray-800 text-white py-8 sm:py-10">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div class="md:col-span-2">
            <h3 class="text-lg font-bold mb-4">Technologies & Tools</h3>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="h-8 md:h-12"
                title="Terraform"
              />
              <img
                src="/images/main-tools/vmware.svg"
                alt="VMware"
                class="h-8 md:h-12"
                title="VMware"
              />
              <img
                src="/images/main-tools/aws-icon2.png"
                alt="AWS"
                class="h-8 md:h-12"
                title="AWS"
              />
              <img
                src="/images/main-tools/azure-icon.svg"
                alt="Azure"
                class="h-8 md:h-12"
                title="Azure"
              />
              <img
                src="/images/project-icons/ansible.svg"
                alt="Ansible"
                class="h-8 md:h-12"
                title="Ansible"
              /><img
                src="/images/project-icons/vue-icon.svg"
                alt="Vue"
                class="h-8 md:h-12"
                title="Vue"
              />
              <img
                src="/images/project-icons/python.svg"
                alt="Python"
                class="h-8 md:h-12"
                title="Python"
              />

              <img
                src="/images/main-tools/docker-mark-blue.svg"
                alt="Docker"
                class="h-8 md:h-12"
                title="Docker"
              />
              <img
                src="/images/project-icons/kubernetes.svg"
                alt="Kubernetes"
                class="h-8 md:h-12"
                title="Kubernetes"
              />
            </div>
          </div>
          <div class="flex items-center justify-center text-center">
            <h2 class="text-xl font-bold text-slate-300">
              Learning by building — Cloud Infrastructure, Automation, and DevOps.
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

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #111827;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
}
</style>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
