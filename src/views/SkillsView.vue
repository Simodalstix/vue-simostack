<template>
  <div class="text-white container mx-auto px-6 py-10 md:py-10">
    <section class="mb-12 text-center max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">Technical Skills</h1>
    </section>

    <div class="grid md:grid-cols-2 gap-12 md:gap-20">
      <div>
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Infrastructure & DevOps</h2>
          <ul class="list-disc list-inside space-y-2 text-lg">
            <li>Terraform, CloudFormation</li>
            <li>Ansible, GitHub Actions</li>
            <li>Docker, VMware</li>
          </ul>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Scripting & Languages</h2>
          <ul class="list-disc list-inside space-y-2 text-lg">
            <li>Bash, Python, PowerShell</li>
          </ul>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Cloud Platforms</h2>
          <ul class="list-disc list-inside space-y-2 text-lg">
            <li>AWS (EC2, S3, IAM, Lambda)</li>
            <li>Azure (App Services, VNets, Key Vault, Monitor)</li>
          </ul>
        </div>
      </div>

      <div>
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Security & Monitoring</h2>
          <ul class="list-disc list-inside space-y-2 text-lg">
            <li>Wazuh, ELK Stack, CloudWatch</li>
            <li>DNS, SSH hardening</li>
          </ul>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Systems Administration</h2>
          <ul class="list-disc list-inside space-y-2 text-lg">
            <li>RHEL, Ubuntu, Windows Server</li>
            <li>Active Directory, pfSense</li>
            <li>DNS, DHCP, NAT, SSH access control</li>
          </ul>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Web & Frontend</h2>
          <ul class="list-disc list-inside space-y-2 text-lg">
            <li>HTTP, JavaScript, Vue.js</li>
            <li>NGINX, Let's Encrypt</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page is static and doesn't require a script block.
</script>
