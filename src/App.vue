<template>
  <div class="min-h-screen bg-gray-900 overflow-y-hidden">
    <nav class="p-2 bg-gray-800 text-white w-full">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/blog">Blog</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #111827;
  min-height: 100%;
}
</style>
