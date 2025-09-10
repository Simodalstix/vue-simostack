<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-10">
    <!-- Header Section -->
    <div class="text-center mb-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4">Skills & Certifications</h1>
        <p class="text-lg sm:text-xl text-slate-400 mb-8">
          Technical expertise spanning cloud infrastructure, DevOps automation, and enterprise
          security practices with industry-recognized certifications validating hands-on experience.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            :to="{ name: 'Skills' }"
            class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Current Skills Page
          </router-link>
          <a
            href="https://www.credly.com/users/simon-parker.b3f8c6b8"
            target="_blank"
            class="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-slate-500/20 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            Credly Profile
          </a>
        </div>
      </div>
    </div>

    <!-- Certifications Zone -->
    <div class="relative mb-16">
      <div
        class="border-2 border-slate-500/40 rounded-3xl p-4 sm:p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/60 backdrop-blur-md relative overflow-hidden"
      >
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10"
          ></div>
        </div>

        <!-- Zone Header -->
        <div class="relative z-10 mb-8">
          <div
            class="border-l-4 border-violet-400 pl-6 mb-6 bg-gradient-to-r from-violet-600/20 via-slate-700/10 to-transparent rounded-r-xl py-4 -ml-2"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-md bg-violet-500/20 flex items-center justify-center">
                  <svg class="w-6 h-6 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">
                    Industry Certifications
                  </h3>
                  <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span class="text-xs sm:text-sm text-slate-400">7 Active Certifications</span>
                    <span class="text-xs text-slate-500 hidden sm:inline">•</span>
                    <span class="text-xs sm:text-sm text-slate-400">AWS + Azure + Security</span>
                    <span class="text-xs text-slate-500 hidden sm:inline">•</span>
                    <span class="text-xs sm:text-sm text-slate-400">Terraform + Python</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 self-start sm:self-auto">
                <img
                  src="/images/main-tools/aws-icon2.png"
                  alt="AWS"
                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-md opacity-80"
                />
                <img
                  src="/images/main-tools/azure-icon.svg"
                  alt="Azure"
                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-md opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications Grid -->
        <div class="relative z-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- AWS Cloud Practitioner -->
          <div
            @click="showPractitionerModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/Cloud_Practitioner.png"
                alt="AWS Cloud Practitioner"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                AWS Cloud Practitioner
              </h4>
              <p class="text-xs text-slate-400">Foundation</p>
            </div>
          </div>

          <!-- AWS Solutions Architect -->
          <div
            @click="showArchitectModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/Solutions_Architect.png"
                alt="AWS Solutions Architect"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                AWS Solutions Architect
              </h4>
              <p class="text-xs text-slate-400">Associate</p>
            </div>
          </div>

          <!-- AWS Developer -->
          <div
            @click="showDeveloperModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/Developer.png"
                alt="AWS Developer"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                AWS Developer
              </h4>
              <p class="text-xs text-slate-400">Associate</p>
            </div>
          </div>

          <!-- Azure Administrator -->
          <div
            @click="showAzureAdmin = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/azure-admin.png"
                alt="Azure Administrator"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                Azure Administrator
              </h4>
              <p class="text-xs text-slate-400">Associate</p>
            </div>
          </div>

          <!-- Terraform Associate -->
          <div
            @click="showTerraformModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/terraform003-2.png"
                alt="Terraform Associate"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                Terraform Associate
              </h4>
              <p class="text-xs text-slate-400">003</p>
            </div>
          </div>

          <!-- Python Associate -->
          <div
            @click="showPythonModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/python-associate.png"
                alt="Python Associate"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                Python Associate
              </h4>
              <p class="text-xs text-slate-400">PCAP</p>
            </div>
          </div>

          <!-- Security+ -->
          <div
            @click="showSecurityPlusModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-violet-700 hover:to-violet-950 transition-all hover:border-violet-400 duration-100 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div class="text-center">
              <img
                src="/images/certifications/securityplus.png"
                alt="Security+"
                class="w-16 h-16 mx-auto mb-3 hover:filter hover:drop-shadow-[0_0_20px_rgba(139,69,193,0.6)] transition-all duration-300 rounded"
              />
              <h4 class="text-sm font-medium text-white group-hover:text-violet-100 mb-1">
                CompTIA Security+
              </h4>
              <p class="text-xs text-slate-400">601</p>
            </div>
          </div>

          <!-- In Progress Slot -->
          <div
            @click="showTargetCertsModal = true"
            class="group cursor-pointer p-4 rounded-xl border border-slate-600/50 bg-gradient-to-br from-slate-800/40 to-slate-900/60 hover:from-cyan-700/60 hover:to-cyan-800/80 transition-all hover:border-cyan-400 duration-100 opacity-80"
          >
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-3 bg-slate-600/50 rounded-md border-2 border-dashed border-slate-500 flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h4 class="text-sm font-medium text-slate-300 mb-1">In Progress</h4>
              <p class="text-xs text-slate-400">RHCSA + DevOps</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Skills Zone -->
    <div class="relative">
      <div
        class="border-2 border-slate-500/40 rounded-3xl p-4 sm:p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/60 backdrop-blur-md relative overflow-hidden"
      >
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-emerald-500/10"
          ></div>
        </div>

        <!-- Zone Header -->
        <div class="relative z-10 mb-8">
          <div
            class="border-l-4 border-cyan-400 pl-6 mb-6 bg-gradient-to-r from-cyan-600/20 via-slate-700/10 to-transparent rounded-r-xl py-4 -ml-2"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-md bg-cyan-500/20 flex items-center justify-center">
                  <svg class="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">Technical Skills</h3>
                  <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span class="text-xs sm:text-sm text-slate-400">Cloud + DevOps + Security</span>
                    <span class="text-xs text-slate-500 hidden sm:inline">•</span>
                    <span class="text-xs sm:text-sm text-slate-400">Infrastructure as Code</span>
                    <span class="text-xs text-slate-500 hidden sm:inline">•</span>
                    <span class="text-xs sm:text-sm text-slate-400">Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Grid -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <!-- Cloud Platforms -->
          <div
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-md bg-blue-500/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white">Cloud Platforms</h4>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">AWS (EC2, Lambda, S3, IAM, CloudWatch)</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300"
                  >Azure (VMs, App Services, Key Vault, Monitor)</span
                >
              </div>
            </div>
          </div>

          <!-- Infrastructure as Code -->
          <div
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-md bg-purple-500/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white">Infrastructure as Code</h4>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <img
                  src="/images/main-tools/terraform.svg"
                  alt="Terraform"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">Terraform (AWS + Azure providers)</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/ansible.svg"
                  alt="Ansible"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">Ansible (Configuration management)</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="/images/main-tools/aws-icon2.png"
                  alt="CloudFormation"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">CloudFormation + CDK</span>
              </div>
            </div>
          </div>

          <!-- DevOps & CI/CD -->
          <div
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-md bg-green-500/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white">DevOps & CI/CD</h4>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/jenkins.svg"
                  alt="Jenkins"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">Jenkins (Pipeline automation)</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/github-actions.svg"
                  alt="GitHub Actions"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">GitHub Actions</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/docker-mark-blue.svg"
                  alt="Docker"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">Docker + Kubernetes</span>
              </div>
            </div>
          </div>

          <!-- Security & Monitoring -->
          <div
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-md bg-red-500/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white">Security & Monitoring</h4>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/wazuh-icon.png"
                  alt="Wazuh"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">Wazuh SIEM + ELK Stack</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/images/project-icons/vault.svg" alt="Vault" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">HashiCorp Vault</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="/images/aws-icons/cloudwatch.svg"
                  alt="CloudWatch"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">CloudWatch + Azure Monitor</span>
              </div>
            </div>
          </div>

          <!-- Scripting & Automation -->
          <div
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-md bg-yellow-500/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white">Scripting & Automation</h4>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <img src="/images/project-icons/python.svg" alt="Python" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">Python (Automation + CDK)</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/images/project-icons/bash.webp" alt="Bash" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">Bash + PowerShell</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/images/project-icons/json.svg" alt="JSON" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">JSON + YAML + TOML</span>
              </div>
            </div>
          </div>

          <!-- Systems Administration -->
          <div
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-md bg-indigo-500/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white">Systems Administration</h4>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <img src="/images/project-icons/redhat.svg" alt="RHEL" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">RHEL + Ubuntu + Windows Server</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/ad.png"
                  alt="Active Directory"
                  class="w-6 h-6 rounded"
                />
                <span class="text-sm text-slate-300">Active Directory + Group Policy</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/images/main-tools/vmware.svg" alt="VMware" class="w-6 h-6 rounded" />
                <span class="text-sm text-slate-300">VMware + Proxmox</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
  <SecurityPlus :visible="showSecurityPlusModal" @close="showSecurityPlusModal = false" />
  <AWSArchitect :visible="showArchitectModal" @close="showArchitectModal = false" />
  <TerraformModal :visible="showTerraformModal" @close="showTerraformModal = false" />
  <AWSDeveloper :visible="showDeveloperModal" @close="showDeveloperModal = false" />
  <PythonModal :visible="showPythonModal" @close="showPythonModal = false" />
  <TargetCertifications :visible="showTargetCertsModal" @close="showTargetCertsModal = false" />
  <AzureAdministrator :visible="showAzureAdmin" @close="showAzureAdmin = false" />
</template>

<script setup>
import { ref } from 'vue'
import AWSArchitect from '../components/modals/AWSArchitect.vue'
import AWSDeveloper from '../components/modals/AWSDeveloper.vue'
import TerraformModal from '../components/modals/TerraformModal.vue'
import AWSPractioner from '../components/modals/AWSPractioner.vue'
import PythonModal from '../components/modals/PythonModal.vue'
import AzureAdministrator from '../components/modals/AzureAdministrator.vue'
import TargetCertifications from '../components/modals/TargetCerts.vue'
import SecurityPlus from '../components/modals/SecurityPlus.vue'

const showSecurityPlusModal = ref(false)
const showAzureAdmin = ref(false)
const showPythonModal = ref(false)
const showPractitionerModal = ref(false)
const showTerraformModal = ref(false)
const showDeveloperModal = ref(false)
const showArchitectModal = ref(false)
const showTargetCertsModal = ref(false)
</script>
