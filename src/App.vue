<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <header class="bg-purple-700 shadow-lg">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold hover:text-purple-300 transition-colors"
          >Simon Parker</router-link
        >
        <div class="flex space-x-6">
          <router-link to="/" class="hover:text-purple-300 transition-colors">Home</router-link>

          <router-link to="/blog" class="hover:text-purple-300 transition-colors">Blog</router-link>
          <router-link to="/skills" class="text-white mx-2">Skills</router-link>
          <router-link to="/projects" class="hover:text-purple-300 transition-colors"
            >Projects</router-link
          >
          <router-link to="/about" class="hover:text-purple-300 transition-colors"
            >About</router-link
          >
          <router-link to="/contact" class="hover:text-purple-300 transition-colors"
            >Contact</router-link
          >
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto px-6 py-4">
      <router-view />
    </main>

    <footer class="bg-gray-800 text-white py-10">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-lg font-bold mb-4">Technologies & Tools</h3>
            <div class="flex flex-wrap gap-4">
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="h-12"
                title="Terraform"
              />
              <img src="/images/main-tools/vmware.svg" alt="VMware" class="h-12" title="VMware" />
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="h-12" title="AWS" />
              <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="h-12" title="Azure" />
              <img
                src="/images/main-tools/ansible.svg"
                alt="Ansible"
                class="h-12"
                title="Ansible"
              /><img src="/images/project-icons/vue-icon.svg" alt="Vue" class="h-12" title="Vue" />
              <img
                src="/images/project-icons/python.svg"
                alt="Python"
                class="h-12"
                title="Python"
              />

              <img
                src="/images/main-tools/docker-mark-blue.svg"
                alt="Docker"
                class="h-12"
                title="Python"
              />
              <img
                src="/images/main-tools/elastic.png"
                alt="Elastic"
                class="h-12"
                title="Elastic"
              />
              <img
                src="/images/main-tools/logstash.png"
                alt="Logstash"
                class="h-12"
                title="Logstash"
              />
              <img src="/images/main-tools/kibana.png" alt="Kibana" class="h-12" title="Kibana" />
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
