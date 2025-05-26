<template>
  <div>
    <nav class="p-2 bg-gray-800 text-white">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/blog">Blog</router-link>
    </nav>
    <router-view />
  </div>
</template>
