<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-10">
    <!-- Home Lab Foundation -->
    <div class="mb-12">
      <!-- Home Infrastructure (TOP container) -->
      <div class="bg-slate-700/30 rounded-xl p-4 sm:p-6 border border-slate-600/30 mb-6 isolate">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <!-- Left: Title & Icon -->
          <div class="flex items-center gap-4">
            <div>
              <h3 class="text-xl sm:text-2xl font-semibold text-slate-200">
                My Projects &amp; Labs
              </h3>
            </div>
          </div>

          <div class="flex flex-row gap-3 lg:min-w-[200px]">
            <a
              href="https://github.com/Simodalstix"
              target="_blank"
              class="group flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-600/50 to-slate-700/50 hover:from-violet-700 hover:to-violet-600 border border-slate-500/50 hover:border-violet-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <img
                src="/images/project-icons/githubwhite.png"
                alt="GitHub"
                class="w-6 h-6 rounded-md"
              />
              <span class="text-white font-medium group-hover:text-indigo-100">GitHub</span>
            </a>
            <button
              type="button"
              @click="showHtbModal = true"
              class="group flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-600/50 to-slate-700/50 hover:from-green-700 hover:to-green-600 border border-slate-500/50 hover:border-green-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            >
              <img
                src="/images/project-icons/hackthebox-green.svg"
                alt="Hack The Box"
                class="w-6 h-6 rounded-md"
              />
              <span class="text-white font-medium group-hover:text-green-100">Hack The Box</span>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="space-y-4">
          <div class="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7">
            <!-- LEFT: description (merged span-4) -->
            <div class="lg:col-span-4">
              <div
                class="relative z-10 overflow-hidden p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800"
              >
                <p class="text-slate-300 text-lg leading-relaxed">
                  My portfolio brings together cloud projects on AWS and Azure with a growing set of
                  on-premises labs where I practice networking, identity, and monitoring.
                </p>
                <p class="text-slate-300 text-lg mt-3">
                  The cloud work is the core — automated setups with Terraform, Python CDK, CI/CD
                  pipelines, and monitoring that make environments reliable and reproducible. My
                  VMware lab extends that by giving me space to test how infrastructure pieces fit
                  together: Active Directory, VPNs, logging, and hybrid networking.
                </p>
                <p class="text-slate-300 text-lg mt-3">
                  Right now I’m concentrating on the Beelink lab as a longer-term build. The roadmap
                  ends with a hybrid environment that links on-premises Active Directory with Entra
                  ID, secured by VPNs, backed by a SIEM and monitoring stack, and reinforced with
                  recovery processes — a setup designed to mirror the day-to-day challenges of
                  engineering work.
                </p>
              </div>
            </div>

            <!-- VPN Tunnel spacer -->
            <div class="lg:col-span-1 flex flex-col items-center pb-8">
              <div class="flex flex-col items-center justify-between h-full relative">
                <!-- vertical run above -->
                <div class="w-[2px] flex-1"></div>

                <!-- circle aligned with Rocky card -->
                <span
                  class="h-3 w-3 my-2 translate-y-[2px] rounded-full bg-cyan-400 ring-2 ring-cyan-300/40 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                ></span>
                <div class="text-center mb-2">
                  <p class="text-cyan-400 text-xs font-medium">VPN Tunnel</p>
                  <p class="text-slate-400 text-xs">Point-to-Site</p>
                </div>
                <!-- vertical run below -->
                <div
                  class="w-[2px] h-[328px] -mb-[180px] bg-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                ></div>
              </div>
            </div>

            <!-- RIGHT: stacked cards -->
            <div class="lg:col-span-2 flex flex-col gap-4">
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img src="/images/project-icons/rocky.svg" alt="Rocky Linux" class="w-8 h-8" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Rocky Linux 10 Laptop
                    </h5>
                    <p class="text-slate-400 text-xs">Ansible • Containers • Tooling</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  Daily Linux workstation for automation work, containers, and lab management. The
                  VPN line will extend to this host later.
                </p>

                <!-- glowing cyan elbow -->
                <div class="flex items-center">
                  <div
                    class="h-[2px] w-36 -ml-[140px] bg-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                  ></div>
                  <span
                    class="h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-cyan-300/40 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                  ></span>
                </div>
              </BaseCard>

              <BaseCard
                @click="showVmwareModal = true"
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img src="/images/project-icons/windows.svg" alt="Windows 11" class="w-8 h-8" />
                  <img src="/images/main-tools/vmware.svg" alt="VMware" class="w-8 h-8" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Windows 11 Laptop
                    </h5>
                    <p class="text-slate-400 text-xs">VMware Workstation • Primary Dev Host</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  My general-purpose Windows 11 laptop and gaming rig, which I also use with VMware
                  Workstation for pfSense and lab practice.
                </p>
              </BaseCard>
            </div>
          </div>
        </div>
      </div>
      <!-- /Home Infrastructure (TOP container) -->

      <!-- Beelink Infrastructure -->
      <div class="bg-slate-700/30 rounded-xl p-4 sm:p-6 border border-slate-600/30">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <!-- Left (title + details) -->
          <div class="flex items-center gap-4">
            <img
              src="/images/project-icons/beelink.png"
              alt="Beelink SER8"
              class="w-8 h-8 sm:w-10 sm:h-10"
            />
            <div>
              <h3 class="text-lg sm:text-xl font-semibold text-slate-200">Beelink SER8 Mini-PC</h3>
              <p class="text-slate-400 text-xs sm:text-sm">
                Ryzen 7 8845HS • 32GB DDR5 • 1TB NVMe • 2.5GbE
              </p>
            </div>
          </div>

          <!-- Right (Proxmox badge) -->
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="text-slate-400 text-center text-sm hidden sm:block">
              Proxmox <br />Hypervisor
            </span>
            <img
              src="/images/project-icons/proxmox2.png"
              alt="Proxmox"
              class="w-8 h-8 sm:w-10 sm:h-10"
            />
          </div>
        </div>

        <!-- Body -->
        <div class="space-y-4">
          <!-- ONE unified grid: 2 columns (left) + VPN spacer + 2 columns (right) -->
          <div class="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7">
            <!-- Left column (stacked 2 cards) -->
            <div class="lg:col-span-2 flex flex-col gap-4">
              <!-- Wazuh Security Card -->
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src="/images/project-icons/wazuh-icon.png"
                    alt="Wazuh"
                    class="w-8 h-8 rounded-full"
                  /><img
                    src="/images/project-icons/opensearch2.webp"
                    alt="OpenSearch"
                    class="w-8 h-8 rounded-full"
                  />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Wazuh + OpenSearch
                    </h5>
                    <p class="text-slate-400 text-xs">VM 103 • 10GB RAM</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  SIEM with threat detection, log aggregation from all lab systems, and security
                  event correlation. Integrates with cloud security tools for hybrid monitoring.
                </p>
                <!-- Project metadata footer -->
                <div
                  class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
                    >
                      <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      To Implement
                    </span>
                  </div>
                  <span class="italic text-gray-400">Details coming soon</span>
                </div>
              </BaseCard>

              <!-- Ubuntu File Server -->
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img src="/images/project-icons/ubuntu.svg" alt="Ubuntu" class="w-8 h-8" /><img
                    src="/images/project-icons/samba.png"
                    alt="Samba"
                    class="w-16 h-8"
                  />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Ubuntu File Server
                    </h5>
                    <p class="text-slate-400 text-xs">VM 101 • 2GB RAM</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  Centralized file storage for Windows laptop, Rocky Linux laptop, and all VMs.
                  Testing cloud sync integration with AWS S3 and Azure Blob for hybrid storage
                  scenarios.
                </p>
                <!-- Project metadata footer -->
                <div
                  class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full"
                    >
                      <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  <span class="italic text-gray-400">Details coming soon</span>
                </div>
              </BaseCard>
            </div>

            <!-- Second Column -->
            <div class="lg:col-span-2 flex flex-col gap-4">
              <!-- OPNsense Card -->
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img src="/images/project-icons/opnsense.webp" alt="OPNsense" class="w-8 h-8" />
                  <img
                    src="/images/project-icons/wireguard.png"
                    alt="WireGuard"
                    class="w-8 h-8 rounded-full"
                  />

                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      OPNsense Firewall
                    </h5>
                    <p class="text-slate-400 text-xs">VM 102 • 3GB RAM</p>
                  </div>

                  <!-- right-side port + pipe -->
                  <div class="ml-auto flex items-center">
                    <!-- small horizontal line -->

                    <!-- circle node -->
                    <span
                      class="h-3 w-3 -mr-[4px] rounded-full bg-cyan-400 ring-2 ring-cyan-300/40 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                    ></span>
                    <div
                      class="h-[2px] w-36 -mr-36 bg-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                    ></div>
                  </div>
                </div>

                <p class="text-slate-400 text-sm mb-4">
                  Network gateway with VPN tunnels to cloud landing zones. Replaces pfSense with
                  advanced routing, VLAN segmentation, and site-to-site connectivity testing.
                </p>
                <!-- Project metadata footer -->
                <div
                  class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full"
                    >
                      <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  <span class="italic text-gray-400">Details coming soon</span>
                </div>
              </BaseCard>

              <!-- Prometheus Card -->
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src="/images/project-icons/prometheus-icon.svg"
                    alt="Prometheus"
                    class="w-8 h-8"
                  />
                  <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Prometheus + Grafana
                    </h5>
                    <p class="text-slate-400 text-xs">VM 104 • 4GB RAM</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  Infrastructure monitoring for all lab systems with custom dashboards. Collecting
                  metrics from cloud resources to create unified observability across hybrid
                  environments.
                </p>
                <!-- Project metadata footer -->
                <div
                  class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full"
                    >
                      <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  <span class="italic text-gray-400">Details coming soon</span>
                </div>
              </BaseCard>
            </div>
            <!-- VPN Tunnel spacer column -->
            <div class="lg:col-span-1 flex flex-col items-center pt-6 pb-8">
              <div class="flex flex-col items-center">
                <!-- vertical up into header -->
                <div
                  class="w-[2px] h-12 bg-gradient-to-b from-cyan-400 to-sky-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)] -mt-6"
                ></div>

                <!-- elbow at header height -->
                <div class="flex items-center -translate-y-[7px]">
                  <span
                    class="h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-cyan-300/40 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                  ></span>
                </div>

                <!-- continuous vertical down, overlapping elbow circle -->
                <div
                  class="w-[2px] h-20 -mt-[8px] bg-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                ></div>

                <!-- WireGuard node -->

                <div class="text-center my-1">
                  <p class="text-cyan-400 text-xs font-medium">VPN Tunnel</p>
                  <p class="text-slate-400 text-xs">IPsec</p>
                </div>

                <!-- continue vertical -->
                <div
                  class="w-[2px] h-60 bg-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                ></div>

                <!-- elbow connection circle -->
                <span
                  class="h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-cyan-300/40 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                ></span>
                <div class="flex items-center space-x-2 mt-2">
                  <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-10 h-10" />
                  <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-10 h-10" />
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 flex flex-col gap-4">
              <!-- Vault Card -->
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img src="/images/project-icons/vault.svg" alt="Vault" class="w-8 h-8" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Vault + PKI
                    </h5>
                    <p class="text-slate-400 text-xs">VM 105 • 3GB RAM</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  Certificate authority and secrets management for lab PKI. Issuing certificates for
                  services and testing integration with cloud identity providers and key management
                  services.
                </p>
                <!-- Project metadata footer -->
                <div
                  class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
                    >
                      <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      To Implement
                    </span>
                  </div>
                  <span class="italic text-gray-400">Details coming soon</span>
                </div>
              </BaseCard>

              <!-- Windows Server Card -->
              <BaseCard
                class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src="/images/project-icons/windows.svg"
                    alt="Windows Server"
                    class="w-8 h-8"
                  />
                  <img src="/images/project-icons/ad.png" alt="Active Directory" class="w-8 h-8" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-bold text-white group-hover:text-cyan-100">
                      Windows Server 2022
                    </h5>
                    <p class="text-slate-400 text-xs">VM 100 • 4GB RAM</p>
                  </div>
                </div>
                <p class="text-slate-400 text-sm mb-4">
                  Active Directory domain services with Group Policy management. Testing hybrid
                  identity scenarios and Azure AD Connect integration for cloud authentication
                  workflows.
                </p>
                <!-- Project metadata footer -->
                <div
                  class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full"
                    >
                      <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  <span class="italic text-gray-400">Details coming soon</span>
                </div>
              </BaseCard>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 pt-4 border-t border-slate-600">
          <div class="flex items-center justify-between">
            <span class="text-green-400 text-sm font-medium"
              >AD Domain: beelink.local • 6 Active VMs</span
            >
            <span class="text-slate-400 text-xs">26GB RAM allocated</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Cloud Infrastructure Projects -->

  <div class="text-white container mx-auto px-4 sm:px-6 mb-12">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white mb-4">Cloud Infrastructure Projects</h2>
      <p class="text-slate-300 text-lg leading-relaxed">
        These projects demonstrate well-architected cloud solutions, automation pipelines, and
        infrastructure patterns. Built with Terraform, containerization, and modern DevOps practices
        to reflect real-world engineering workflows.
      </p>
    </div>

    <div class="space-y-8">
      <!-- Cloud Platforms & Infrastructure -->
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <!-- Azure Container Apps Card -->
          <BaseCard
            @click="showAwsFargateGoldenPath = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                ECS Fargate Golden Path + Resilience Scenarios
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/ecs.svg" alt="ECS" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/fargate.svg" alt="Fargate" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/code-deploy.svg"
                alt="CodeDeploy"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/alb.svg" alt="ALB" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/cloudwatch.svg"
                alt="CloudWatch"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Containers
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Fargate
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Observability
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Infrastructure - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Landing Zone Card -->
          <BaseCard
            @click="showEnterpriseLandingZone = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                AWS Multi-Account Landing Zone Architecture
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/organizations.svg"
                alt="Organizations"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/aws-icons/transit-gateway.svg"
                alt="Transit Gateway"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/aws-icons/guardduty.svg"
                alt="GuardDuty"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/aws-icons/security-hub.svg"
                alt="Security Hub"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Multi-Account
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-gray-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Hub & Spoke
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Enterprise
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Infrastructure - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced DR & Backup Card -->
          <BaseCard
            @click="showAwsDrBackupLab = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                AWS Disaster Recovery & Backup - Rapid Recovery
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/backup.svg" alt="AWS Backup" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/rds.svg" alt="RDS" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/ebs.svg" alt="EBS" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/route53.svg" alt="Route 53" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/cloudwatch.svg"
                alt="CloudWatch"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Backup
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                DR
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Automation
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Experimental Lab - View details</span>
            </div>
          </BaseCard>

          <BaseCard
            @click="showAzureContainerApps = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Azure Container Apps – DevOps & Change Control
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/azure-devops.svg"
                alt="Azure DevOps"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/worker-container-app.svg"
                alt="Container Apps"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/key-vault.svg"
                alt="Key Vault"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/application-insights.svg"
                alt="App Insights"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Containers
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Serverless
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                CI/CD
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced EKS GitOps Card -->
          <BaseCard
            @click="showAwsGitopsGP = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                EKS Multi-Tier App – GitOps Pipeline
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/eks.svg" alt="EKS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/helm.png" alt="Helm" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/prometheus.png"
                alt="Prometheus"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/grafana.png"
                alt="Grafana"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                GitOps
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Kubernetes
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Monitoring
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Lambda SQS Card -->
          <BaseCard
            @click="showAwsLambdaSqsDlq = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Resilient Serverless Ingestion Pipeline on AWS (SQS + DLQ)
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/lambda.svg" alt="Lambda" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/sqs.svg" alt="SQS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/cloudwatch.svg"
                alt="CloudWatch"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/iam.svg" alt="IAM" class="w-8 h-8 rounded-md" />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Serverless
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Queues
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Reliability
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Infrastructure - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Pilot Light DR Card -->
          <BaseCard
            @click="showPilotLightDR = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                E-commerce Platform Pilot Light Disaster Recovery
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/alb.svg" alt="ALB" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/rds.svg" alt="RDS" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/route53.svg" alt="Route 53" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/step-functions.svg"
                alt="Step Functions"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Multi-Region
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                DR
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Auto Failover
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Experimental Lab - View details</span>
            </div>
          </BaseCard>

          <!-- Azure Hub-Spoke Card -->
          <BaseCard
            @click="showAzureProject = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Azure Org-Ready Hub-Spoke Landing Zone Architecture
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/firewall.svg"
                alt="Azure Firewall"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/azure-icons/vnet.svg" alt="Azure VNet" class="w-8 h-8 rounded-md" />
              <img
                src="/images/azure-icons/key-vault.svg"
                alt="Key Vault"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/azure-vpn.png"
                alt="VPN Gateway"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Hub & Spoke
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Enterprise
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                VPN Tunnel
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Infrastructure - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Multi-Region Platform Card -->
          <BaseCard
            @click="showMultiregionProject = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Serverless Multi-Region Platform with Security and Monitoring
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/eventbridge.svg"
                alt="EventBridge"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/lambda.svg" alt="Lambda" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/dynamodb.svg" alt="DynamoDB" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/apigateway.svg"
                alt="API Gateway"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Multi-Region
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Serverless
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Automation
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Infrastructure - View details</span>
            </div>
          </BaseCard>
          <!-- Enhanced Observability Platform Card -->
          <BaseCard
            @click="showObservabilityPlatform = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                AWS Monitoring & Observability Platform Architecture
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/cloudwatch.svg"
                alt="CloudWatch"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/aws-icons/eventbridge.svg"
                alt="EventBridge"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/sns.svg" alt="SNS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/step-functions.svg"
                alt="Step Functions"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Observability
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Monitoring
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Cost Control
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Spring PetClinic Card -->
          <BaseCard
            @click="showJavaMavernJenkins = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Java Spring PetClinic with Jenkins CI/CD Pipeline
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/project-icons/java.svg" alt="Java" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/spring.svg"
                alt="Spring Boot"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/maven.svg" alt="Maven" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/jenkins.svg"
                alt="Jenkins"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/docker-mark-blue.svg"
                alt="Docker"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/postgres.svg"
                alt="PostgreSQL"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                CI/CD
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Java
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Containers
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps Lab - View details</span>
            </div>
          </BaseCard>

          <!-- Dynatrace Azure Card -->
          <BaseCard
            @click="showDynatraceProject = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Deploying Dynatrace & Azure Monitoring Agents in Azure
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/focus/dynatrace-icon.svg"
                alt="Dynatrace"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/azure-vm.svg"
                alt="Azure VM"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/monitor.svg"
                alt="Azure Monitor"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/azure-icons/log-analytics-workspaces.svg"
                alt="Log Analytics"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Azure
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Monitoring
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Automation
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Bedrock Landing Zone Card -->
          <BaseCard
            @click="showBedrockLandingzone = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                AWS Bedrock Landing Zone Architecture
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/bedrock.png" alt="Bedrock" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/organizations.svg"
                alt="Organizations"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/aws-icons/cloudtrail.svg"
                alt="CloudTrail"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/aws-icons/guardduty.svg"
                alt="GuardDuty"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Multi-Account
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                AI Platform
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Enterprise
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Infrastructure - View details</span>
            </div>
          </BaseCard>

          <!-- Enhanced Database Migration Card -->
          <BaseCard
            @click="showAwsProject = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Executing a Database Migration to AWS with Terraform
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/postgres.svg"
                alt="PostgreSQL"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/aws-icons/rds.svg" alt="RDS" class="w-8 h-8 rounded-md" />
              <img src="/images/aws-icons/ec2.svg" alt="EC2" class="w-8 h-8 rounded-md" />
              <img
                src="/images/aws-icons/secrets-manager.svg"
                alt="Secrets Manager"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Database
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Migration
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Automation
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Cloud Migration - View details</span>
            </div>
          </BaseCard>
          <!-- Enhanced E-Commerce Microservices Card -->
          <BaseCard
            @click="showJavaGradleJenkins = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Microservices Mall – Jenkins CI/CD & Kubernetes
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/project-icons/java.svg" alt="Java" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/spring.svg"
                alt="Spring Boot"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/gradle.svg" alt="Gradle" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/jenkins.svg"
                alt="Jenkins"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/docker-mark-blue.svg"
                alt="Docker"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/kubernetes.svg"
                alt="Kubernetes"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/mysql.svg" alt="MySQL" class="w-8 h-8 rounded-md" />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Microservices
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Java
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Enterprise
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps Lab - View details</span>
            </div>
          </BaseCard>

          <!-- Java RabbitMQ AKS Card -->
          <BaseCard
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10 relative"
          >
            <!-- Full-card clickable overlay -->
            <a
              href="https://github.com/Simodalstix/java-rabbitmq-aks"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Open GitHub repo: Cloud-Native Java + RabbitMQ on AKS"
            >
              <span class="sr-only">Open GitHub repo</span>
            </a>

            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                Cloud-Native Java + RabbitMQ on AKS
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/java.svg" alt="Java" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/spring.svg"
                alt="Spring Boot"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/rabbitmq.svg"
                alt="RabbitMQ"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/azure-icons/aks.svg" alt="AKS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/docker-mark-blue.svg"
                alt="Docker"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Messaging
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Kubernetes </span
              ><span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Microservices
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-purple-500/30 text-purple-300 border border-purple-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  In Progress
                </span>
              </div>
              <span class="text-gray-400">DevOps - View on GitHub</span>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- DevOps & Automation -->
      <div>
        <h3 class="text-lg font-semibold text-slate-200 mb-6">Extra Projects & Experiments</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <!-- Col 1 -->
          <!-- Enhanced DevOps Toolchain Card -->
          <BaseCard
            @click="showToolingProject = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
                DevOps Toolchain SonarQube & LaunchDarkly
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
              <img
                src="/images/main-tools/terraform.svg"
                alt="Terraform"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/csharp.png" alt="C#" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/github-actions.svg"
                alt="GitHub Actions"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/launchdarkly.svg"
                alt="LaunchDarkly"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/sonarqube.png"
                alt="SonarQube"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                DevOps
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Toolchain
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Quality Gates
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps - View details</span>
            </div>
          </BaseCard>
          <!-- Enhanced K3s GitOps Card -->
          <BaseCard
            @click="showK3sGitops = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-slate-900 transition-all hover:border-slate-200 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-slate-100">
                Raspberry Pi k3s GitOps Platform with Observability
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img
                src="/images/project-icons/raspberry-pi.svg"
                alt="Raspberry Pi"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/ansible.svg"
                alt="Ansible"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/k3s.svg" alt="k3s" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
              <img src="/images/project-icons/helm.png" alt="Helm" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/mariadb.svg"
                alt="MariaDB"
                class="w-8 h-8 rounded-md"
              />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                GitOps
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Kubernetes
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Raspberry Pi
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">Experimental Lab - View details</span>
            </div>
          </BaseCard>
          <!-- Enhanced VMware Monitoring Card -->
          <BaseCard
            @click="showVmwareProject = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-slate-900 transition-all hover:border-slate-200 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white group-hover:text-zinc-100">
                Infrastructure Monitoring with Prometheus & Grafana
              </h3>
            </div>

            <!-- Tech stack icons -->
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/main-tools/vmware.svg" alt="VMware" class="w-8 h-8 rounded-md" />
              <img
                src="/images/project-icons/ansible.svg"
                alt="Ansible"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/redhat.svg"
                alt="Red Hat"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/prometheus.png"
                alt="Prometheus"
                class="w-8 h-8 rounded-md"
              />
              <img
                src="/images/project-icons/grafana.png"
                alt="Grafana"
                class="w-8 h-8 rounded-md"
              />
              <img src="/images/project-icons/loki.png" alt="Loki" class="w-8 h-8 rounded-md" />
            </div>

            <!-- Enhanced tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                VMware
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Automation
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
              >
                Monitoring
              </span>
            </div>

            <!-- Project metadata footer -->
            <div
              class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  Ready
                </span>
              </div>
              <span class="text-gray-400">DevOps - View details</span>
            </div>
          </BaseCard>
          <!-- Col 2 -->
          <!-- Col 3 -->
          <!-- Col 4 -->

          <BaseCard
            class="p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-gray-400"
          >
            <h3 class="text-lg font-bold mb-3 text-white">More Projects Coming Soon</h3>
            <p class="text-sm text-slate-300">
              Additional cloud infrastructure and DevOps projects in development.
            </p>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>

  <VMwareModal
    :visible="showVmwareModal"
    @close="showVmwareModal = false"
    width="max-w-[1000px]"
    height="max-h-[92vh]"
  />
  <ProjectK3sGitops
    :visible="showK3sGitops"
    @close="showK3sGitops = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <Project-JavaGradleJenkins
    :visible="showJavaGradleJenkins"
    @close="showJavaGradleJenkins = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectDRbackup
    :visible="showAwsDrBackupLab"
    @close="showAwsDrBackupLab = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <Project-Multiregion
    :visible="showMultiregionProject"
    @close="showMultiregionProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectBedrockLandingzone
    :visible="showBedrockLandingzone"
    @close="showBedrockLandingzone = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectDocumentAnalyzer
    :visible="showDocumentAnalyzer"
    @close="showDocumentAnalyzer = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <Project-LambdaSqsDlq
    :visible="showAwsLambdaSqsDlq"
    @close="showAwsLambdaSqsDlq = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectFargateGoldenPath
    :visible="showAwsFargateGoldenPath"
    @close="showAwsFargateGoldenPath = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectPilotLight
    :visible="showPilotLightDR"
    @close="showPilotLightDR = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectEKSGitopsGP
    :visible="showAwsGitopsGP"
    @close="showAwsGitopsGP = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectAksGitopsProject
    :visible="showAksGitopsProject"
    @close="showAksGitopsProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectEnterpriseLandingZone
    :visible="showEnterpriseLandingZone"
    @close="showEnterpriseLandingZone = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectAzureContainerApps
    :visible="showAzureContainerApps"
    @close="showAzureContainerApps = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <DynatraceModal
    :visible="showDynatraceProject"
    @close="showDynatraceProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectObservabilityPlatform
    :visible="showObservabilityPlatform"
    @close="showObservabilityPlatform = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <AzureHubSpokeModal
    :visible="showAzureProject"
    @close="showAzureProject = false"
    width="max-w-[1200px]"
    height="max-h-[92vh]"
  />
  <AwsMigrationModal
    :visible="showAwsProject"
    @close="showAwsProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectJavaMavernJenkins
    :visible="showJavaMavernJenkins"
    @close="showJavaMavernJenkins = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectJavaRabbitMQ
    :visible="showJavaRabbitMQ"
    @close="showJavaRabbitMQ = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <VmwareMonitoringModal
    :visible="showVmwareProject"
    @close="showVmwareProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <RaspberryPiModal
    :visible="showRaspberry"
    @close="showRaspberry = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <PrismaModal
    :visible="showPrismaModal"
    @close="showPrismaModal = false"
    width="max-w-[1200px]"
    height="max-h-[92vh]"
  />
  <WazuhSOClab
    :visible="showWazuhLabProject"
    @close="showWazuhLabProject = false"
    width="max-w-[1200px]"
    height="max-h-[92vh]"
  />
  <HtbModal
    :visible="showHtbModal"
    @close="showHtbModal = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <DeveloperTooling
    :visible="showToolingProject"
    @close="showToolingProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <HackTheBoxModal :visible="showHtbModal" @close="showHtbModal = false" />
</template>

<script setup>
// Props for the card
defineProps({
  releaseVersion: String, // e.g., "v1.2.0" or null
})
import { ref } from 'vue'
import DynatraceModal from '../components/modals/Project-Dynatrace.vue'
import AwsMigrationModal from '../components/modals/Project-Migration.vue'
import AzureHubSpokeModal from '../components/modals/Project-Azure-Hub.vue'
import VmwareMonitoringModal from '../components/modals/Project-VMware-Ansible.vue'
import RaspberryPiModal from '../components/modals/Project-Raspberry.vue'
import PrismaModal from '../components/modals/Project-Prisma.vue'
import ProjectMultiregion from '../components/modals/Project-Multiregion.vue'
import WazuhSOClab from '../components/modals/Projects-Wazuh.vue'
import DeveloperTooling from '../components/modals/Project-Tooling.vue'
import ProjectDRbackup from '@/components/modals/Project-DRbackup.vue'
import ProjectLambdaSqsDlq from '@/components/modals/Project-LambdaSQSDLQ.vue'
import ProjectBedrockLandingzone from '@/components/modals/Project-Bedrock-Landingzone.vue'
import ProjectFargateGoldenPath from '@/components/modals/Project-FargateGoldenPath.vue'
import ProjectPilotLight from '@/components/modals/Project-Pilot-Light.vue'
import ProjectEKSGitopsGP from '@/components/modals/Project-EKSGitopsGP.vue'
import ProjectAzureContainerApps from '@/components/modals/Project-Azure-ContainerApps.vue'
import ProjectDocumentAnalyzer from '@/components/modals/Project-Document-Analyzer.vue'
import ProjectJavaMavernJenkins from '@/components/modals/Project-JavaMavernJenkins.vue'
import ProjectEnterpriseLandingZone from '@/components/modals/Project-EnterpriseLandingZone.vue'
// import ProjectJavaRabbitMQ from '@/components/modals/Project-JavaRabbitMQ.vue'
import ProjectAksGitopsProject from '@/components/modals/Project-AzureAKSGitops.vue'
import ProjectObservabilityPlatform from '@/components/modals/Project-ObservabilityPlatform.vue'
import ProjectJavaGradleJenkins from '@/components/modals/Project-JavaGradleJenkins.vue'
import ProjectK3sGitops from '@/components/modals/Project-K3sGitops.vue'
import HackTheBoxModal from '@/components/modals/HackTheBoxModal.vue'
import VMwareModal from '@/components/modals/VMwareModal.vue'
const showVmwareModal = ref(false)
const showK3sGitops = ref(false)
const showJavaGradleJenkins = ref(false)
const showObservabilityPlatform = ref(false)
const showAksGitopsProject = ref(false)
const showJavaRabbitMQ = ref(false)
const showEnterpriseLandingZone = ref(false)
const showJavaMavernJenkins = ref(false)
const showDocumentAnalyzer = ref(false)
const showAzureContainerApps = ref(false)
const showAwsGitopsGP = ref(false)
const showPilotLightDR = ref(false)
const showAwsDrBackupLab = ref(false)
const showAwsLambdaSqsDlq = ref(false)
const showAwsFargateGoldenPath = ref(false)
const showBedrockLandingzone = ref(false)
const showToolingProject = ref(false)
const showHtbModal = ref(false)
const showPrismaModal = ref(false)
const showWazuhLabProject = ref(false)
const showMultiregionProject = ref(false)
const showRaspberry = ref(false)
const showVmwareProject = ref(false)
const showDynatraceProject = ref(false)
const showAzureProject = ref(false)
const showAwsProject = ref(false)
</script>
