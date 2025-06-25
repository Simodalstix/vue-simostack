<template>
  <div class="min-h-screen bg-gray-900">
    <nav class="p-2 bg-purple-800 text-white text-center w-full">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/blog">Blog</router-link>
    </nav>

    <!-- ✅ Constrained content wrapper -->
    <div class="max-w-screen-2xl mx-auto px-4">
      <router-view />
    </div>
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
