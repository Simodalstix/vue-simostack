<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Hack The Box Academy Progress">
    <div class="p-4 sm:p-6">
      <p class="mt-2 text-sm text-gray-600">
        HTB Academy profiles aren’t public, so I’m sharing my module completion badges here.
      </p>

      <div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          v-for="badge in badges"
          :key="badge.id"
          class="rounded-xl border border-gray-200/40 p-3 text-center bg-white/5"
        >
          <img
            :src="badge.src"
            :alt="badge.title"
            class="w-full aspect-square object-contain rounded-md"
            loading="lazy"
          />
          <div class="mt-2 text-sm font-medium">{{ badge.title }}</div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'

// Drop images in src/assets/htb/ and update titles/paths.
// This starts with 2 rows × 4 columns (8 items).
const badges = [
  {
    id: 1,
    title: 'Introduction to Networking',
    src: new URL('@/assets/htb/introduction-to-networking.png', import.meta.url).href,
  },
  {
    id: 2,
    title: 'Linux Fundamentals',
    src: new URL('@/assets/htb/linux-fundamentals.png', import.meta.url).href,
  },
  {
    id: 3,
    title: 'Windows Fundamentals',
    src: new URL('@/assets/htb/windows-fundamentals.png', import.meta.url).href,
  },
  {
    id: 4,
    title: 'Web Requests',
    src: new URL('@/assets/htb/web-requests.png', import.meta.url).href,
  },
  {
    id: 5,
    title: 'Introduction to Cybersecurity',
    src: new URL('@/assets/htb/intro-to-cybersecurity.png', import.meta.url).href,
  },
  {
    id: 6,
    title: 'Intro to Bash Scripting',
    src: new URL('@/assets/htb/intro-to-bash.png', import.meta.url).href,
  },
  {
    id: 7,
    title: 'Networking Concepts',
    src: new URL('@/assets/htb/networking-concepts.png', import.meta.url).href,
  },
  {
    id: 8,
    title: 'Intro to Pentesting',
    src: new URL('@/assets/htb/intro-to-pentesting.png', import.meta.url).href,
  },
]
</script>

<style scoped>
/* Optional: soften backdrop content if your BaseModal supports it */
</style>
