<template>
  <div class="bg-gray-900 min-h-screen flex flex-col justify-center text-white">
    <div class="text-center p-8 md:p-12 lg:p-20" style="padding-bottom: 10rem">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
        From Pharmacist to <span class="text-purple-400">Cloud Engineer</span>
      </h1>

      <p class="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        Leveraging a foundation in healthcare to bring calm under pressure and a relentless focus on
        learning to the world of cloud infrastructure and DevOps. I build, automate, and secure
        modern cloud platforms with a passion for continuous improvement.
      </p>

      <div
        class="mt-10 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
      >
        <router-link
          :to="{ name: 'Projects' }"
          class="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-500 w-full md:w-auto"
        >
          View My Projects
        </router-link>

        <router-link
          :to="{ name: 'Skills' }"
          class="border-2 border-purple-500 text-purple-400 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-500 hover:text-white w-full md:w-auto"
        >
          Explore My Skills
        </router-link>

        <router-link
          :to="{ name: 'About' }"
          class="text-gray-400 hover:text-purple-400 transition-colors duration-300 font-semibold w-full md:w-auto"
        >
          Read My Story &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page does not require a <script> block unless you have specific logic for it.
</script>
