<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center text-gray-900">
    <div class="text-center p-8 md:p-12 lg:p-20">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
        Hello, I'm a <span class="text-purple-600">DevOps Engineer</span>
      </h1>

      <p class="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        I build, automate, and secure modern cloud infrastructure. Explore my journey in cloud
        engineering and a passion for automation and continuous improvement.
      </p>

      <div
        class="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <router-link
          :to="{ name: 'Certifications' }"
          class="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 hover:bg-purple-700 w-full md:w-auto"
        >
          View My Certifications
        </router-link>

        <router-link
          :to="{ name: 'Projects' }"
          class="border-2 border-purple-600 text-purple-600 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 hover:bg-purple-100 w-full md:w-auto"
        >
          See My Projects
        </router-link>

        <router-link
          :to="{ name: 'Blog' }"
          class="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-semibold w-full md:w-auto"
        >
          Read My Blog &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page does not require a <script> block unless you have specific logic for it.
</script>
