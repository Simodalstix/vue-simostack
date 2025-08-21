n d
<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <header class="bg-purple-700 shadow-lg">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-xl font-bold hover:text-purple-300 transition-colors"
            >Simon Parker</router-link
          >
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
              class="hover:text-purple-300 transition-colors duration-200 py-2"
              @click="closeMobileMenu"
              >Home</router-link
            >
            <router-link
              :to="{ name: 'Blog' }"
              class="hover:text-purple-300 transition-colors duration-200 py-2"
              @click="closeMobileMenu"
              >Blog</router-link
            >
            <router-link
              :to="{ name: 'Skills' }"
              class="hover:text-purple-300 transition-colors duration-200 py-2"
              @click="closeMobileMenu"
              >Skills & Certs</router-link
            >
            <router-link
              :to="{ name: 'Projects' }"
              class="hover:text-purple-300 transition-colors duration-200 py-2"
              @click="closeMobileMenu"
              >Projects</router-link
            >
            <router-link
              :to="{ name: 'About' }"
              class="hover:text-purple-300 transition-colors duration-200 py-2"
              @click="closeMobileMenu"
              >About</router-link
            >
            <router-link
              :to="{ name: 'Contact' }"
              class="hover:text-purple-300 transition-colors duration-200 py-2"
              @click="closeMobileMenu"
              >Contact</router-link
            >
            <router-link
              :to="{ name: 'Elephant' }"
              class="hover:opacity-80 transition-opacity duration-200 py-2"
              @click="closeMobileMenu"
            >
              <div class="flex items-center">
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
          <div class="flex space-x-6">
            <router-link
              :to="{ name: 'Home' }"
              class="hover:text-purple-300 transition-colors duration-200"
              >Home</router-link
            >
            <router-link
              :to="{ name: 'Blog' }"
              class="hover:text-purple-300 transition-colors duration-200"
              >Blog</router-link
            >
            <router-link
              :to="{ name: 'Skills' }"
              class="hover:text-purple-300 transition-colors duration-200"
              >Skills & Certs</router-link
            >
            <router-link
              :to="{ name: 'Projects' }"
              class="hover:text-purple-300 transition-colors duration-200"
              >Projects</router-link
            >
            <router-link
              :to="{ name: 'About' }"
              class="hover:text-purple-300 transition-colors duration-200"
              >About</router-link
            >
            <router-link
              :to="{ name: 'Contact' }"
              class="hover:text-purple-300 transition-colors duration-200"
              >Contact</router-link
            >
            <router-link
              :to="{ name: 'Elephant' }"
              class="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/images/project-icons/elephant-icon.png"
                alt="Elephant Icon"
                class="h-8 w-8"
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
                src="/images/main-tools/ansible.svg"
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
                title="Python"
              />
              <!-- <img
                src="/images/main-tools/elastic.png"
                alt="Elastic"
                class="h-8 md:h-12"
                title="Elastic"
              />
              <img
                src="/images/main-tools/logstash.png"
                alt="Logstash"
                class="h-8 md:h-12"
                title="Logstash"
              />
              <img
                src="/images/main-tools/kibana.png"
                alt="Kibana"
                class="h-8 md:h-12"
                title="Kibana"
              /> -->
            </div>
          </div>
          <div class="flex items-center justify-center text-center">
            <h2 class="text-xl font-bold text-slate-300">
              Focused on Cloud Infrastructure, Systems Automation, and Security.
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
