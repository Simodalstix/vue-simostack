<template>
  <div id="cloud-projects" class="text-white container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
    <div class="flex flex-col min-[1150px]:flex-row gap-4 min-[1150px]:gap-8 mb-6 sm:mb-8 mt-4 sm:mt-6">
      <div class="min-[1150px]:w-2/3">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center min-[1150px]:text-left">Systems, Cloud &amp; Infra Projects</h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
       Cloud infrastructure, platform engineering, and systems work built across AWS, Azure, Kubernetes, and a bare-metal Proxmox lab. Projects range from multi-account landing zones and GitOps pipelines to disaster recovery, observability platforms, and Java CI/CD. Current shift: moving beyond pure IaC into AWS operations — understanding how services behave, break, and recover in practice.
        </p>
      </div>
      <div class="min-[1150px]:w-1/3 flex flex-col justify-start">
        <div class="font-mono text-xs sm:text-sm bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 sm:px-4 sm:py-3 w-fit">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-green-400">●</span>
            <span class="text-white">simon.service</span>
            <span class="text-gray-400">- Cloud Labs &amp; Projects</span>
          </div>
          <div class="pl-4 text-gray-500">Loaded: <span class="text-gray-300">loaded (/etc/systemd/system/simon.service; <span class="text-green-400">enabled</span>)</span></div>
          <div class="pl-4 text-gray-500">Active: <span class="text-green-400">active (running)</span><span class="text-gray-500"> since 2025</span></div>
          <div class="pl-4 text-gray-500">Main PID: <span class="text-gray-300">simon</span></div>
          <div class="pl-4 text-gray-500">Status: <span class="text-cyan-300">"Diving deep into infrastructure"</span></div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Cloud Platforms & Infrastructure -->
      <div>
        <div class="grid grid-cols-2 min-[720px]:grid-cols-3 min-[1150px]:grid-cols-4 gap-4 sm:gap-6">

          <!-- Proxmox Infrastructure Lab Card (hardcoded — row-span, sub-items, custom emits) -->
          <BaseCard
            class="hidden min-[1150px]:flex flex-col lg:row-span-2 p-4 min-[1400px]:p-6 rounded-xl border border-slate-600/80 bg-slate-700/80 bg-gradient-to-br from-slate-700 to-slate-800"
          >
            <div class="flex items-start justify-between mb-3 min-[1400px]:mb-4">
              <h3 class="text-base min-[1400px]:text-lg font-bold text-white">Beelink SER8 Proxmox Hypervisor</h3>
              <img src="/images/project-icons/beelink.png" alt="Beelink" class="w-8 h-8 min-[1400px]:w-10 min-[1400px]:h-10 rounded-md" />
            </div>
            <div class="flex items-center gap-1.5 min-[1400px]:gap-3 mb-3 min-[1400px]:mb-4">
              <img src="/images/project-icons/proxmox2.png" alt="Proxmox" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-md" />
              <img src="/images/project-icons/windows.svg" alt="Windows" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-sm" />
              <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-md" />
              <img src="/images/project-icons/vault.svg" alt="Vault" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-md" />
              <img src="/images/project-icons/ansible.svg" alt="Ansible" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-md" />
              <img src="/images/project-icons/opnsense.webp" alt="OPNsense" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-md" />
              <img src="/images/project-icons/wazuh-icon.png" alt="Wazuh" class="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-md" />
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 rounded-md">Hypervisor</span>
              <span class="px-2 py-1 text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 rounded-md">Firewall</span>
              <span class="px-2 py-1 text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 rounded-md">Linux</span>
            </div>
            <div class="border-t border-slate-700/60 pt-4">
              <p class="text-xs text-slate-400 font-medium">Ryzen 7 8845HS &middot; 32 GB DDR5 &middot; 1 TB NVMe</p>
              <p class="text-xs text-slate-500 mt-1.5">6 VMs running services on a single node.</p>
            </div>
            <ul class="space-y-1.5 min-[1400px]:space-y-2 text-xs min-[1400px]:text-sm mt-2">
              <li @click="showDC1 = true" class="flex items-center gap-1.5 min-[1400px]:gap-2.5 cursor-pointer group/item"><span class="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/item:bg-slate-300 shrink-0 transition-colors"></span><span class="bg-slate-800/60 group-hover/item:bg-slate-700/60 text-slate-300 group-hover/item:text-white px-1.5 py-0.5 min-[1400px]:px-2.5 min-[1400px]:py-1 rounded-md transition-colors">Windows Server Domain Controller</span></li>
              <li @click="showFileServer = true" class="flex items-center gap-1.5 min-[1400px]:gap-2.5 cursor-pointer group/item"><span class="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/item:bg-slate-300 shrink-0 transition-colors"></span><span class="bg-slate-800/60 group-hover/item:bg-slate-700/60 text-slate-300 group-hover/item:text-white px-1.5 py-0.5 min-[1400px]:px-2.5 min-[1400px]:py-1 rounded-md transition-colors">Rocky Linux Samba File Server</span></li>
              <li @click="showVaultPki = true" class="flex items-center gap-1.5 min-[1400px]:gap-2.5 cursor-pointer group/item"><span class="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/item:bg-slate-300 shrink-0 transition-colors"></span><span class="bg-slate-800/60 group-hover/item:bg-slate-700/60 text-slate-300 group-hover/item:text-white px-1.5 py-0.5 min-[1400px]:px-2.5 min-[1400px]:py-1 rounded-md transition-colors">HashiCorp Vault PKI</span></li>
              <li @click="showOPNsense = true" class="flex items-center gap-1.5 min-[1400px]:gap-2.5 cursor-pointer group/item"><span class="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/item:bg-slate-300 shrink-0 transition-colors"></span><span class="bg-slate-800/60 group-hover/item:bg-slate-700/60 text-slate-300 group-hover/item:text-white px-1.5 py-0.5 min-[1400px]:px-2.5 min-[1400px]:py-1 rounded-md transition-colors">OPNsense Firewall & WireGuard VPN</span></li>

              <li @click="showPrometheusGrafana = true" class="flex items-center gap-1.5 min-[1400px]:gap-2.5 cursor-pointer group/item"><span class="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/item:bg-slate-300 shrink-0 transition-colors"></span><span class="bg-slate-800/60 group-hover/item:bg-slate-700/60 text-slate-300 group-hover/item:text-white px-1.5 py-0.5 min-[1400px]:px-2.5 min-[1400px]:py-1 rounded-md transition-colors">Prometheus + Grafana Monitoring</span></li>
            </ul>
            <div class="flex items-center justify-between gap-2 text-xs text-gray-400 pt-4 mt-auto border-t border-slate-700/60">
              <span class="flex items-center gap-1 px-2 py-1 bg-yellow-700/30 text-yellow-300 border border-yellow-600/30 rounded-full">
                <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Archived
              </span>
              <span>Systems Infrastructure</span>
            </div>
          </BaseCard>

          <!-- Data-driven project cards -->
          <template v-for="project in mainProjects" :key="project.id">
            <BaseCard
              :class="[
                'group cursor-pointer p-4 flex flex-col rounded-xl border border-slate-600/80 bg-slate-700/80 bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-100',
                project.hover,
                project.githubUrl ? 'relative' : '',
              ]"
              @click="handleCardClick(project)"
            >
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                :aria-label="`Open GitHub repo: ${project.title}`"
              >
                <span class="sr-only">Open GitHub repo</span>
              </a>

              <div class="flex items-center justify-between mb-4">
                <h3 :class="['text-base font-bold text-white', project.titleHover]">{{ project.title }}</h3>
              </div>

              <div class="flex items-center justify-evenly mb-4">
                <img v-for="icon in project.icons.slice(0, 6)" :key="icon.alt" :src="icon.src" :alt="icon.alt" class="w-8 h-8 min-[1400px]:w-10 min-[1400px]:h-10 rounded-md" />
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-1 py-0.5 text-[10px] min-[1400px]:px-2 min-[1400px]:py-1 min-[1400px]:text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
                >{{ tag }}</span>
              </div>

              <div class="mt-auto flex items-center justify-between text-[10px] min-[1400px]:text-xs text-gray-400 pt-4 border-t border-slate-600">
                <span :class="['flex items-center gap-1 px-1.5 py-0.5 text-[10px] min-[1400px]:px-2 min-[1400px]:py-1 min-[1400px]:text-xs rounded-full', statusClasses[project.statusColor].badge]">
                  <div :class="['w-2 h-2 rounded-full', statusClasses[project.statusColor].dot]"></div>
                  {{ project.status }}
                </span>
                <span class="text-gray-400">{{ project.category }} - {{ project.githubUrl ? 'View on GitHub' : 'View details' }}</span>
              </div>
            </BaseCard>
          </template>
        </div>
      </div>

      <!-- Extra Projects & Experiments -->
      <div>
        <h3 class="text-lg font-semibold text-slate-200 mb-6 text-center sm:text-left">Extra Projects &amp; Experiments</h3>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <template v-for="project in extraProjects" :key="project.id">
            <BaseCard
              v-if="project.id === 'coming-soon'"
              class="p-4 rounded-xl border border-slate-600/80 bg-slate-700/80 text-gray-400"
            >
              <h3 class="text-lg font-bold mb-3 text-white">More Projects Coming Soon</h3>
              <p class="text-sm text-slate-300">Additional cloud infrastructure and DevOps projects in development.</p>
            </BaseCard>

            <BaseCard
              v-else
              :class="[
                'group cursor-pointer p-4 flex flex-col rounded-xl border border-slate-600/80 bg-slate-700/80 bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-100',
                project.hover,
              ]"
              @click="handleCardClick(project)"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 :class="['text-base font-bold text-white', project.titleHover]">{{ project.title }}</h3>
              </div>

              <div class="flex items-center justify-evenly mb-4">
                <img v-for="icon in project.icons.slice(0, 6)" :key="icon.alt" :src="icon.src" :alt="icon.alt" class="w-8 h-8 min-[1400px]:w-10 min-[1400px]:h-10 rounded-md" />
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-1 py-0.5 text-[10px] min-[1400px]:px-2 min-[1400px]:py-1 min-[1400px]:text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md"
                >{{ tag }}</span>
              </div>

              <div class="mt-auto flex items-center justify-between text-[10px] min-[1400px]:text-xs text-gray-400 pt-4 border-t border-slate-600">
                <span :class="['flex items-center gap-1 px-1.5 py-0.5 text-[10px] min-[1400px]:px-2 min-[1400px]:py-1 min-[1400px]:text-xs rounded-full', statusClasses[project.statusColor].badge]">
                  <div :class="['w-2 h-2 rounded-full', statusClasses[project.statusColor].dot]"></div>
                  {{ project.status }}
                </span>
                <span class="text-gray-400">{{ project.category }} - View details</span>
              </div>
            </BaseCard>
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals (all unchanged) -->
  <ProjectFargateGoldenPath
    :visible="showAwsFargateGoldenPath"
    @close="showAwsFargateGoldenPath = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <Project-Multiregion
    :visible="showMultiregionProject"
    @close="showMultiregionProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectProxmoxLab
    :visible="showProxmoxLab"
    @close="showProxmoxLab = false"
    @open-dc1="showDC1 = true"
    @open-fileserver="showFileServer = true"
    @open-prometheus="showPrometheusGrafana = true"
    @open-vault="showVaultPki = true"
    @open-opnsense="showOPNsense = true"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectAzureContainerApps
    :visible="showAzureContainerApps"
    @close="showAzureContainerApps = false"
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
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <AwsMigrationModal
    :visible="showAwsProject"
    @close="showAwsProject = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />
  <ProjectDC1
    :visible="showDC1"
    @close="showDC1 = false"
    width="max-w-[900px]"
    height="max-h-[85vh]"
  />

  <ProjectPrometheusGrafana
    :visible="showPrometheusGrafana"
    @close="showPrometheusGrafana = false"
    width="max-w-[900px]"
    height="max-h-[85vh]"
  />

  <VaultPkiModal
    :visible="showVaultPki"
    @close="showVaultPki = false"
    width="max-w-[900px]"
    height="max-h-[85vh]"
  />

  <ProjectOPNsense
    :visible="showOPNsense"
    @close="showOPNsense = false"
    width="max-w-[900px]"
    height="max-h-[85vh]"
  />

  <ProjectFileServer
    :visible="showFileServer"
    @close="showFileServer = false"
    width="max-w-[900px]"
    height="max-h-[85vh]"
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

  <ProjectK3sGitops
    :visible="showK3sGitops"
    @close="showK3sGitops = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectAwsSsmFleet
    :visible="showAwsSsmFleet"
    @close="showAwsSsmFleet = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <VMwareModal
    :visible="showVmwareModal"
    @close="showVmwareModal = false"
    width="max-w-[1000px]"
    height="max-h-[92vh]"
  />

  <HackTheBoxModal :visible="showHtbModal" @close="showHtbModal = false" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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
import ProjectAksGitopsProject from '@/components/modals/Project-AzureAKSGitops.vue'
import ProjectObservabilityPlatform from '@/components/modals/Project-ObservabilityPlatform.vue'
import ProjectJavaGradleJenkins from '@/components/modals/Project-JavaGradleJenkins.vue'
import ProjectK3sGitops from '@/components/modals/Project-K3sGitops.vue'
import ProjectAwsSsmFleet from '@/components/modals/Project-AWSSsmFleet.vue'
import HackTheBoxModal from '@/components/modals/HackTheBoxModal.vue'
import VMwareModal from '@/components/modals/VMwareModal.vue'
import VaultPkiModal from '@/components/modals/Project-VaultPKI.vue'
import ProjectOPNsense from '@/components/modals/Project-OPNsense.vue'
import ProjectDC1 from '@/components/modals/Project-DC1.vue'
import ProjectFileServer from '@/components/modals/Project-Fileserver.vue'
import ProjectPrometheusGrafana from '@/components/modals/Project-Prometheus.vue'
import ProjectProxmoxLab from '@/components/modals/Project-ProxmoxLab.vue'

defineProps({
  releaseVersion: String,
})

// ─── Modal visibility refs ────────────────────────────────────────────────────
const showProxmoxLab = ref(false)
const showPrometheusGrafana = ref(false)
const showFileServer = ref(false)
const showDC1 = ref(false)
const showOPNsense = ref(false)
const showVaultPki = ref(false)
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
const showAwsSsmFleet = ref(false)
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

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  // ── Main section ──────────────────────────────────────────────────────────
  {
    id: 'fargate-golden-path',
    title: 'ECS Fargate Golden Path + Resilience Scenarios',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/ecs.svg', alt: 'ECS' },
      { src: '/images/aws-icons/fargate.svg', alt: 'Fargate' },
      { src: '/images/aws-icons/code-deploy.svg', alt: 'CodeDeploy' },
      { src: '/images/aws-icons/alb.svg', alt: 'ALB' },
      { src: '/images/aws-icons/cloudwatch.svg', alt: 'CloudWatch' },
    ],
    tags: ['Containers', 'Fargate', 'Observability'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'enterprise-landing-zone',
    title: 'AWS Multi-Account Landing Zone – Zero Trust Architecture',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/organizations.svg', alt: 'Organizations' },
      { src: '/images/aws-icons/transit-gateway.svg', alt: 'Transit Gateway' },
      { src: '/images/aws-icons/guardduty.svg', alt: 'GuardDuty' },
      { src: '/images/aws-icons/security-hub.svg', alt: 'Security Hub' },
    ],
    tags: ['Multi-Account', 'Hub & Spoke', 'Enterprise'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'azure-container-apps',
    title: 'Azure Container Apps – DevOps & Change Control',
    icons: [
      { src: '/images/main-tools/azure-icon.svg', alt: 'Azure' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/azure-icons/azure-devops.svg', alt: 'Azure DevOps' },
      { src: '/images/azure-icons/worker-container-app.svg', alt: 'Container Apps' },
      { src: '/images/azure-icons/key-vault.svg', alt: 'Key Vault' },
      { src: '/images/azure-icons/application-insights.svg', alt: 'App Insights' },
    ],
    tags: ['Containers', 'Serverless', 'CI/CD'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps',
    hover: 'hover:bg-indigo-800 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/20',
    titleHover: 'group-hover:text-indigo-100',
    section: 'main',
  },
  {
    id: 'aws-ssm-fleet',
    title: 'AWS SSM Fleet – Puppet Config Management Without SSH',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/project-icons/puppet.svg', alt: 'Puppet' },
      { src: '/images/aws-icons/ssm.svg', alt: 'SSM' },
      { src: '/images/aws-icons/ec2.svg', alt: 'EC2' },
      { src: '/images/project-icons/nodejs.svg', alt: 'Node.js' },

    ],
    tags: ['Config Management', 'Fleet', 'Keyless'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'dr-backup',
    title: 'AWS Disaster Recovery & Backup - Rapid Recovery',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/backup.svg', alt: 'AWS Backup' },
      { src: '/images/aws-icons/rds.svg', alt: 'RDS' },
      { src: '/images/aws-icons/ebs.svg', alt: 'EBS' },
      { src: '/images/aws-icons/route53.svg', alt: 'Route 53' },
      { src: '/images/aws-icons/cloudwatch.svg', alt: 'CloudWatch' },
    ],
    tags: ['Backup', 'DR', 'Automation'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Experimental Lab',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'azure-hub-spoke',
    title: 'Azure Hub-Spoke Landing Zone Architecture & VPN',
    icons: [
      { src: '/images/main-tools/azure-icon.svg', alt: 'Azure' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/azure-icons/firewall.svg', alt: 'Azure Firewall' },
      { src: '/images/azure-icons/vnet.svg', alt: 'Azure VNet' },
      { src: '/images/azure-icons/key-vault.svg', alt: 'Key Vault' },
      { src: '/images/azure-icons/azure-vpn.png', alt: 'VPN Gateway' },
    ],
    tags: ['Hub & Spoke', 'Enterprise', 'VPN Tunnel'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-indigo-800 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/20',
    titleHover: 'group-hover:text-indigo-100',
    section: 'main',
  },
  {
    id: 'lambda-sqs-dlq',
    title: 'Resilient Serverless Ingestion Pipeline on AWS (SQS + DLQ)',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/lambda.svg', alt: 'Lambda' },
      { src: '/images/aws-icons/sqs.svg', alt: 'SQS' },
      { src: '/images/aws-icons/cloudwatch.svg', alt: 'CloudWatch' },
      { src: '/images/aws-icons/iam.svg', alt: 'IAM' },
    ],
    tags: ['Serverless', 'Queues', 'Reliability'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'pilot-light-dr',
    title: 'E-commerce Platform Pilot Light Disaster Recovery',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/alb.svg', alt: 'ALB' },
      { src: '/images/aws-icons/rds.svg', alt: 'RDS' },
      { src: '/images/aws-icons/route53.svg', alt: 'Route 53' },
      { src: '/images/aws-icons/step-functions.svg', alt: 'Step Functions' },
    ],
    tags: ['Multi-Region', 'DR', 'Auto Failover'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Experimental Lab',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'observability-platform',
    title: 'AWS Monitoring & Observability Platform Architecture',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/cloudwatch.svg', alt: 'CloudWatch' },
      { src: '/images/aws-icons/eventbridge.svg', alt: 'EventBridge' },
      { src: '/images/aws-icons/sns.svg', alt: 'SNS' },
      { src: '/images/aws-icons/step-functions.svg', alt: 'Step Functions' },
    ],
    tags: ['Observability', 'Monitoring', 'Cost Control'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'dynatrace-azure',
    title: 'Deploying Dynatrace & Azure Monitoring Agents in Azure',
    icons: [
      { src: '/images/main-tools/azure-icon.svg', alt: 'Azure' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/focus/dynatrace-icon.svg', alt: 'Dynatrace' },
      { src: '/images/azure-icons/azure-vm.svg', alt: 'Azure VM' },
      { src: '/images/azure-icons/monitor.svg', alt: 'Azure Monitor' },
      { src: '/images/azure-icons/log-analytics-workspaces.svg', alt: 'Log Analytics' },
    ],
    tags: ['Azure', 'Monitoring', 'Automation'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps',
    hover: 'hover:bg-indigo-800 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/20',
    titleHover: 'group-hover:text-indigo-100',
    section: 'main',
  },
  {
    id: 'aws-db-migration',
    title: 'Executing a Database Migration to AWS with Terraform',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/project-icons/postgres.svg', alt: 'PostgreSQL' },
      { src: '/images/aws-icons/rds.svg', alt: 'RDS' },
      { src: '/images/aws-icons/ec2.svg', alt: 'EC2' },
      { src: '/images/aws-icons/secrets-manager.svg', alt: 'Secrets Manager' },
    ],
    tags: ['Database', 'Migration', 'Automation'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Migration',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'microservices-mall',
    title: 'Microservices Mall – Jenkins CI/CD & Kubernetes',
    icons: [
      { src: '/images/project-icons/java.svg', alt: 'Java' },
      { src: '/images/project-icons/spring.svg', alt: 'Spring Boot' },
      { src: '/images/project-icons/gradle.svg', alt: 'Gradle' },
      { src: '/images/project-icons/jenkins.svg', alt: 'Jenkins' },
      { src: '/images/project-icons/docker-mark-blue.svg', alt: 'Docker' },
      { src: '/images/project-icons/kubernetes.svg', alt: 'Kubernetes' },
      { src: '/images/project-icons/mysql.svg', alt: 'MySQL' },
    ],
    tags: ['Microservices', 'Java', 'Enterprise'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps Lab',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'java-petclinic',
    title: 'Java Spring PetClinic with Jenkins CI/CD Pipeline',
    icons: [
      { src: '/images/project-icons/java.svg', alt: 'Java' },
      { src: '/images/project-icons/spring.svg', alt: 'Spring Boot' },
      { src: '/images/project-icons/maven.svg', alt: 'Maven' },
      { src: '/images/project-icons/jenkins.svg', alt: 'Jenkins' },
      { src: '/images/project-icons/docker-mark-blue.svg', alt: 'Docker' },
      { src: '/images/project-icons/postgres.svg', alt: 'PostgreSQL' },
    ],
    tags: ['CI/CD', 'Java', 'Containers'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps Lab',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'java-rabbitmq-aks',
    title: 'Cloud-Native Java Microservices + RabbitMQ on AKS',
    icons: [
      { src: '/images/main-tools/azure-icon.svg', alt: 'Azure' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/project-icons/java.svg', alt: 'Java' },
      { src: '/images/project-icons/spring.svg', alt: 'Spring Boot' },
      { src: '/images/project-icons/rabbitmq.svg', alt: 'RabbitMQ' },
      { src: '/images/azure-icons/aks.svg', alt: 'AKS' },
      { src: '/images/project-icons/docker-mark-blue.svg', alt: 'Docker' },
    ],
    tags: ['Messaging', 'Kubernetes', 'Microservices'],
    status: 'No Diagram',
    statusColor: 'purple',
    category: 'DevOps',
    hover: 'hover:bg-indigo-800 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/20',
    titleHover: 'group-hover:text-indigo-100',
    githubUrl: 'https://github.com/Simodalstix/java-rabbitmq-aks',
    section: 'main',
  },
  {
    id: 'multiregion-platform',
    title: 'Serverless Multi-Region Platform - Security + Monitoring',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/project-icons/eventbridge.svg', alt: 'EventBridge' },
      { src: '/images/aws-icons/lambda.svg', alt: 'Lambda' },
      { src: '/images/aws-icons/dynamodb.svg', alt: 'DynamoDB' },
      { src: '/images/aws-icons/apigateway.svg', alt: 'API Gateway' },
    ],
    tags: ['Multi-Region', 'Serverless', 'Automation'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
  {
    id: 'bedrock-landing-zone',
    title: 'AWS Bedrock Landing Zone – Multi-Account AI Platform',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/aws-icons/bedrock.png', alt: 'Bedrock' },
      { src: '/images/aws-icons/organizations.svg', alt: 'Organizations' },
      { src: '/images/aws-icons/cloudtrail.svg', alt: 'CloudTrail' },
      { src: '/images/aws-icons/guardduty.svg', alt: 'GuardDuty' },
    ],
    tags: ['Multi-Account', 'AI Platform', 'Enterprise'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
{
    id: 'eks-gitops',
    title: 'EKS Multi-Tier App – GitOps Pipeline & Observability',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/aws-icons/eks.svg', alt: 'EKS' },
      { src: '/images/project-icons/argocd.svg', alt: 'ArgoCD' },
      { src: '/images/project-icons/helm.png', alt: 'Helm' },
      { src: '/images/project-icons/prometheus.png', alt: 'Prometheus' },
      { src: '/images/project-icons/grafana.png', alt: 'Grafana' },
    ],
    tags: ['GitOps', 'Kubernetes', 'Monitoring'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },


  // ── Extra section ──────────────────────────────────────────────────────────
  {
    id: 'devops-toolchain',
    title: 'DevOps Toolchain with SonarQube & LaunchDarkly',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/main-tools/terraform.svg', alt: 'Terraform' },
      { src: '/images/project-icons/csharp.png', alt: 'C#' },
      { src: '/images/project-icons/github-actions.svg', alt: 'GitHub Actions' },
      { src: '/images/project-icons/launchdarkly.svg', alt: 'LaunchDarkly' },
      { src: '/images/project-icons/sonarqube.png', alt: 'SonarQube' },
    ],
    tags: ['DevOps', 'Toolchain', 'Quality Gates'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'extra',
  },
  {
    id: 'k3s-gitops',
    title: 'Raspberry Pi k3s GitOps Platform with Observability',
    icons: [
      { src: '/images/project-icons/raspberry-pi.svg', alt: 'Raspberry Pi' },
      { src: '/images/project-icons/ansible.svg', alt: 'Ansible' },
      { src: '/images/project-icons/k3s.svg', alt: 'k3s' },
      { src: '/images/project-icons/argocd.svg', alt: 'ArgoCD' },
      { src: '/images/project-icons/helm.png', alt: 'Helm' },
      { src: '/images/project-icons/mariadb.svg', alt: 'MariaDB' },
    ],
    tags: ['GitOps', 'Kubernetes', 'Raspberry Pi'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Experimental Lab',
    hover: 'hover:bg-zinc-700/60 hover:border-slate-400/60 hover:shadow-lg hover:shadow-zinc-500/10',
    titleHover: 'group-hover:text-slate-100',
    section: 'extra',
  },
  {
    id: 'vmware-monitoring',
    title: 'Infrastructure Monitoring with Prometheus & Grafana',
    icons: [
      { src: '/images/main-tools/vmware.svg', alt: 'VMware' },
      { src: '/images/project-icons/ansible.svg', alt: 'Ansible' },
      { src: '/images/project-icons/redhat.svg', alt: 'Red Hat' },
      { src: '/images/project-icons/prometheus.png', alt: 'Prometheus' },
      { src: '/images/project-icons/grafana.png', alt: 'Grafana' },
      { src: '/images/project-icons/loki.png', alt: 'Loki' },
    ],
    tags: ['VMware', 'Automation', 'Monitoring'],
    status: 'Ready',
    statusColor: 'green',
    category: 'DevOps',
    hover: 'hover:bg-zinc-700/60 hover:border-slate-400/60 hover:shadow-lg hover:shadow-zinc-500/10',
    titleHover: 'group-hover:text-slate-100',
    section: 'extra',
  },
  {
    id: 'portfolio-website',
    title: 'This Portfolio – AWS Static Site with CI/CD',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/vue-icon.svg', alt: 'Vue' },
      { src: '/images/aws-icons/s3.svg', alt: 'S3' },
      { src: '/images/aws-icons/cloudfront.svg', alt: 'CloudFront' },
      { src: '/images/aws-icons/route53.svg', alt: 'Route 53' },
      { src: '/images/project-icons/github.svg', alt: 'GitHub' },
    ],
    tags: ['Static Site', 'CDN', 'CI/CD'],
    status: 'Live',
    statusColor: 'green',
    category: 'Web',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    githubUrl: 'https://github.com/Simodalstix/vue-simostack',
    section: 'extra',
  },
  {
    id: 'coming-soon',
    title: '',
    icons: [],
    tags: [],
    status: '',
    statusColor: 'green',
    category: '',
    hover: '',
    titleHover: '',
    section: 'extra',
  },
]

// ─── Derived ──────────────────────────────────────────────────────────────────
const mainProjects = computed(() => projects.filter(p => p.section === 'main'))
const extraProjects = computed(() => projects.filter(p => p.section === 'extra'))

const statusClasses = {
  green:  { badge: 'bg-green-500/30 text-green-300 border border-green-500/20',    dot: 'bg-green-400' },
  amber:  { badge: 'bg-amber-500/30 text-amber-300 border border-amber-500/20',    dot: 'bg-amber-400' },
  stone:  { badge: 'bg-stone-500/30 text-stone-300 border border-stone-500/20',    dot: 'bg-stone-400' },
  purple: { badge: 'bg-purple-500/30 text-purple-300 border border-purple-500/20', dot: 'bg-purple-400' },
}

// ─── Modal routing ────────────────────────────────────────────────────────────
const activeProject = ref(null)

watch(activeProject, (id) => {
  if (!id) return
  const map = {
    'fargate-golden-path':     showAwsFargateGoldenPath,
    'enterprise-landing-zone': showEnterpriseLandingZone,
    'azure-container-apps':    showAzureContainerApps,
    'eks-gitops':              showAwsGitopsGP,
    'dr-backup':               showAwsDrBackupLab,
    'azure-hub-spoke':         showAzureProject,
    'lambda-sqs-dlq':          showAwsLambdaSqsDlq,
    'pilot-light-dr':          showPilotLightDR,
    'observability-platform':  showObservabilityPlatform,
    'dynatrace-azure':         showDynatraceProject,
    'aws-db-migration':        showAwsProject,
    'microservices-mall':      showJavaGradleJenkins,
    'java-petclinic':          showJavaMavernJenkins,
    'multiregion-platform':    showMultiregionProject,
    'bedrock-landing-zone':    showBedrockLandingzone,
    'aws-ssm-fleet':           showAwsSsmFleet,
    'devops-toolchain':        showToolingProject,
    'k3s-gitops':              showK3sGitops,
    'vmware-monitoring':       showVmwareProject,
  }
  if (map[id]) map[id].value = true
  activeProject.value = null
})

function handleCardClick(project) {
  if (!project.githubUrl) activeProject.value = project.id
}
</script>
