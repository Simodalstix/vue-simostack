<template>
  <div id="cloud-projects" class="max-w-[1440px] mx-auto px-6 sm:px-11 pb-6">
    <!-- header -->
    <section class="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-14 items-end pt-8 sm:pt-10 pb-8">
      <div class="max-w-[640px]">
        <div class="flex items-center gap-[12px] mb-5">
          <span class="font-mono font-semibold text-[13px] leading-none text-ob-sand">03</span>
          <span class="w-6 h-[2px] bg-ob-sand"></span>
          <span class="font-mono font-semibold text-[11px] leading-none tracking-[0.2em] uppercase text-ob-sand">Projects</span>
        </div>
        <h1 class="font-bold text-[36px] sm:text-[44px] lg:text-[46px] leading-[1.0] tracking-[-0.02em] text-ob-bright mb-4">Selected work</h1>
        <p class="text-[15px] sm:text-[16px] leading-[1.6] text-ob-dim max-w-[540px]">
          Cloud infrastructure I design and ship, multi-tier platforms, event-driven pipelines and golden-path automation, mostly on AWS with Python CDK.
        </p>
      </div>

      <!-- IaC panel: the IaC toolchain plus the SSM config-bus pattern that
           demonstrates why Python CDK is powerful here. Paths are representative
           of the 3-tier platform stack set; confirm against the real Parameter
           Store tree before relying on them. -->
      <div class="lg:mr-3">
        <aside class="w-full lg:w-auto lg:max-w-[380px]">
          <div class="font-mono text-[10px] leading-none tracking-[0.16em] uppercase text-ob-teal-bright mb-[10px]">Architecture</div>
          <h2 class="text-[19px] font-semibold leading-[1.15] tracking-[-0.01em] text-ob-text mb-[12px]">Modular by design</h2>
          <p class="text-[12.5px] leading-[1.6] text-ob-dim max-w-[360px]">
            Every capability ships as its own CDK stack. They share state through SSM Parameter Store
            (<span class="font-mono text-[11.5px] text-ob-soft">/sb/{stack}/*</span>)
            instead of brittle references, so any stack deploys or changes on its own.
          </p>
        </aside>
      </div>
    </section>

    <div class="space-y-8">
      <!-- Cloud Platforms & Infrastructure -->
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <!-- Featured Proxmox Lab card (tall — pinned top-right on lg, sub-item modals) -->
          <BaseCard
            class="flex flex-col lg:col-start-3 lg:row-start-2 lg:row-span-2 p-6 rounded-[3px] border border-ob-sand/16 border-t-2 !border-t-ob-bronze bg-ob-surface"
          >
            <div class="flex items-start justify-between gap-3 mb-[10px]">
              <h3 class="text-[21px] font-semibold leading-[1.18] text-ob-text">Beelink SER8 Proxmox Hypervisor</h3>
              <img
                src="/images/project-icons/proxmox-light.svg"
                alt="Proxmox"
                class="w-[42px] h-auto max-h-[36px] object-contain shrink-0"
              />
            </div>
            <p class="text-[13.5px] leading-[1.58] text-ob-dim mb-4">A single-node Proxmox host running my homelab, six VMs delivering production-style services.</p>
            <div class="flex flex-wrap gap-[7px] mb-4">
              <span class="font-mono text-[10.5px] leading-none text-ob-soft border border-ob-sand/18 rounded-[2px] px-2 py-[5px]">Hypervisor</span>
              <span class="font-mono text-[10.5px] leading-none text-ob-soft border border-ob-sand/18 rounded-[2px] px-2 py-[5px]">Firewall</span>
              <span class="font-mono text-[10.5px] leading-none text-ob-soft border border-ob-sand/18 rounded-[2px] px-2 py-[5px]">Linux</span>
            </div>
            <div class="border-t border-ob-sand/14 pb-1 pt-4">
              <p class="text-xs text-ob-dim font-mono">Ryzen 7 8845HS &middot; 32 GB DDR5 &middot; 1 TB NVMe</p>
            </div>
            <ul class="mt-3 flex flex-col">
              <li @click="showDC1 = true" class="flex items-center gap-[14px] py-[11px] px-2 -mx-2 rounded-[3px] border-b border-ob-sand/10 cursor-pointer group/item transition-colors hover:bg-ob-teal/[0.06]"><span class="font-mono text-[12px] text-ob-sand w-6 shrink-0">01</span><span class="text-[15px] text-ob-text group-hover/item:text-ob-bright transition-colors">Windows Server Domain Controller</span></li>
              <li @click="showFileServer = true" class="flex items-center gap-[14px] py-[11px] px-2 -mx-2 rounded-[3px] border-b border-ob-sand/10 cursor-pointer group/item transition-colors hover:bg-ob-teal/[0.06]"><span class="font-mono text-[12px] text-ob-sand w-6 shrink-0">02</span><span class="text-[15px] text-ob-text group-hover/item:text-ob-bright transition-colors">Rocky Linux Samba File Server</span></li>
              <li @click="showVaultPki = true" class="flex items-center gap-[14px] py-[11px] px-2 -mx-2 rounded-[3px] border-b border-ob-sand/10 cursor-pointer group/item transition-colors hover:bg-ob-teal/[0.06]"><span class="font-mono text-[12px] text-ob-sand w-6 shrink-0">03</span><span class="text-[15px] text-ob-text group-hover/item:text-ob-bright transition-colors">HashiCorp Vault PKI</span></li>
              <li @click="showOPNsense = true" class="flex items-center gap-[14px] py-[11px] px-2 -mx-2 rounded-[3px] border-b border-ob-sand/10 cursor-pointer group/item transition-colors hover:bg-ob-teal/[0.06]"><span class="font-mono text-[12px] text-ob-sand w-6 shrink-0">04</span><span class="text-[15px] text-ob-text group-hover/item:text-ob-bright transition-colors">OPNsense Firewall &amp; WireGuard VPN</span></li>
              <li @click="showPrometheusGrafana = true" class="flex items-center gap-[14px] py-[11px] px-2 -mx-2 rounded-[3px] cursor-pointer group/item transition-colors hover:bg-ob-teal/[0.06]"><span class="font-mono text-[12px] text-ob-sand w-6 shrink-0">05</span><span class="text-[15px] text-ob-text group-hover/item:text-ob-bright transition-colors">Prometheus + Grafana Monitoring</span></li>
            </ul>
            <div class="flex items-center justify-between gap-2 pt-4 mt-auto border-t border-ob-sand/14">
              <span class="inline-flex items-center gap-[7px] font-mono text-[10px] leading-none tracking-[0.1em] uppercase text-ob-teal-bright">
                <span class="w-[6px] h-[6px] rounded-full bg-ob-teal-bright"></span>Live
              </span>
              <button type="button" @click="showProxmoxLab = true" class="font-mono text-[11px] leading-none text-ob-teal-bright hover:text-ob-teal transition-colors">build notes →</button>
            </div>
          </BaseCard>

          <!-- Standard project cards (title-led, status moved to footer) -->
          <BaseCard
            v-for="project in mainProjects"
            :key="project.id"
            class="group cursor-pointer p-[22px] flex flex-col rounded-[3px] border border-ob-sand/16 bg-ob-surface hover:border-ob-teal hover:bg-ob-teal/[0.06] transition-colors"
            :class="project.id === 'azure-hub-spoke' ? 'lg:col-start-3 lg:row-start-1' : ''"
            @click="handleCardClick(project)"
          >
            <div class="flex items-center justify-between gap-3 mb-[10px]">
              <h3 class="font-semibold text-[18px] leading-[1.2] tracking-[-0.01em] text-ob-text group-hover:text-ob-bright transition-colors">{{ project.title }}</h3>
              <img
                v-if="project.icons && project.icons[0]"
                :src="project.icons[0].src"
                :alt="project.icons[0].alt"
                class="w-[42px] h-auto max-h-[36px] object-contain shrink-0"
              />
            </div>
            <p
              v-if="project.descriptionHtml"
              class="text-[13.5px] leading-[1.58] text-ob-dim mb-4 min-h-[64px]"
              v-html="project.descriptionHtml"
            ></p>
            <p v-else class="text-[13.5px] leading-[1.58] text-ob-dim mb-4 min-h-[64px]">{{ project.description }}</p>

            <div class="flex flex-wrap gap-[7px] mb-5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="font-mono text-[10.5px] leading-none text-ob-soft border border-ob-sand/18 rounded-[2px] px-2 py-[5px] whitespace-nowrap"
              >{{ tag }}</span>
            </div>

            <div class="mt-auto flex items-center justify-between gap-3 pt-[18px] border-t border-ob-sand/14">
              <span class="inline-flex items-center gap-[7px] font-mono text-[10px] leading-none tracking-[0.1em] uppercase text-ob-teal-bright shrink-0">
                <span class="w-[6px] h-[6px] rounded-full bg-ob-teal-bright"></span>Live
              </span>
              <a
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-[11px] leading-none text-ob-teal-bright hover:text-ob-teal transition-colors"
                @click.stop
              >View Repo →</a>
            </div>
          </BaseCard>

        </div>
      </div>
    </div>

    <!-- More work — compact breadth list, visually distinct from featured cards -->
    <section class="pt-10 mt-4 border-t border-ob-sand/14">
      <div class="flex items-center gap-6 mb-6">
        <h2 class="font-bold text-[22px] leading-none tracking-[-0.02em] text-ob-bright shrink-0">More work</h2>
        <span class="flex-1 h-px bg-ob-sand/14"></span>
        <span class="font-mono text-[11px] leading-none tracking-[0.08em] uppercase text-ob-faint shrink-0">Additional projects</span>
      </div>
      <div class="grid sm:grid-cols-2 gap-x-10 gap-y-1">
        <button
          v-for="item in secondaryProjects"
          :key="item.id"
          type="button"
          @click="activeProject = item.id"
          class="group flex flex-col items-start gap-[6px] border-l-2 border-ob-sand/25 hover:border-ob-teal pl-4 py-[11px] text-left transition-colors"
        >
          <span class="flex items-center gap-3 w-full">
            <span class="font-semibold text-[14px] leading-[1.25] text-ob-text group-hover:text-ob-bright transition-colors">{{ item.title }}</span>
            <span class="ml-auto font-mono text-[14px] leading-none text-ob-teal-bright opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
          </span>
          <span class="font-mono text-[10.5px] leading-none tracking-[0.04em] text-ob-faint">{{ item.tags.join(' · ') }}</span>
        </button>
      </div>
    </section>
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

  <ProjectAwsConfigMgmt
    :visible="showAwsConfigMgmt"
    @close="showAwsConfigMgmt = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectAWS3TierPlatform
    :visible="showAws3TierPlatform"
    @close="showAws3TierPlatform = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectAWSImagePipeline
    :visible="showAwsImagePipeline"
    @close="showAwsImagePipeline = false"
    width="max-w-[1100px]"
    height="max-h-[92vh]"
  />

  <ProjectAWSEventPipeline
    :visible="showAwsEventPipeline"
    @close="showAwsEventPipeline = false"
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
import DynatraceModal from '@/components/modals/project/Project-Dynatrace.vue'
import AwsMigrationModal from '@/components/modals/project/Project-Migration.vue'
import AzureHubSpokeModal from '@/components/modals/project/Project-Azure-Hub.vue'
import VmwareMonitoringModal from '@/components/modals/project/Project-VMware-Ansible.vue'
import RaspberryPiModal from '@/components/modals/project/Project-Raspberry.vue'
import PrismaModal from '@/components/modals/project/Project-Prisma.vue'
import ProjectMultiregion from '@/components/modals/project/Project-Multiregion.vue'
import WazuhSOClab from '@/components/modals/project/Projects-Wazuh.vue'
import DeveloperTooling from '@/components/modals/project/Project-Tooling.vue'
import ProjectDRbackup from '@/components/modals/project/Project-DRbackup.vue'
import ProjectLambdaSqsDlq from '@/components/modals/project/Project-LambdaSQSDLQ.vue'
import ProjectBedrockLandingzone from '@/components/modals/project/Project-Bedrock-Landingzone.vue'
import ProjectFargateGoldenPath from '@/components/modals/project/Project-FargateGoldenPath.vue'
import ProjectPilotLight from '@/components/modals/project/Project-Pilot-Light.vue'
import ProjectEKSGitopsGP from '@/components/modals/project/Project-EKSGitopsGP.vue'
import ProjectAzureContainerApps from '@/components/modals/project/Project-Azure-ContainerApps.vue'
import ProjectDocumentAnalyzer from '@/components/modals/project/Project-Document-Analyzer.vue'
import ProjectJavaMavernJenkins from '@/components/modals/project/Project-JavaMavernJenkins.vue'
import ProjectEnterpriseLandingZone from '@/components/modals/project/Project-EnterpriseLandingZone.vue'
import ProjectAksGitopsProject from '@/components/modals/project/Project-AzureAKSGitops.vue'
import ProjectObservabilityPlatform from '@/components/modals/project/Project-ObservabilityPlatform.vue'
import ProjectJavaGradleJenkins from '@/components/modals/project/Project-JavaGradleJenkins.vue'
import ProjectK3sGitops from '@/components/modals/project/Project-K3sGitops.vue'
import ProjectAwsConfigMgmt from '@/components/modals/project/Project-AWSConfigMgmt.vue'
import HackTheBoxModal from '@/components/modals/project/HackTheBoxModal.vue'
import VMwareModal from '@/components/modals/project/VMwareModal.vue'
import VaultPkiModal from '@/components/modals/project/Project-VaultPKI.vue'
import ProjectOPNsense from '@/components/modals/project/Project-OPNsense.vue'
import ProjectDC1 from '@/components/modals/project/Project-DC1.vue'
import ProjectFileServer from '@/components/modals/project/Project-Fileserver.vue'
import ProjectPrometheusGrafana from '@/components/modals/project/Project-Prometheus.vue'
import ProjectProxmoxLab from '@/components/modals/project/Project-ProxmoxLab.vue'
import ProjectAWS3TierPlatform from '@/components/modals/project/Project-AWS3TierPlatform.vue'
import ProjectAWSImagePipeline from '@/components/modals/project/Project-AWSImagePipeline.vue'
import ProjectAWSEventPipeline from '@/components/modals/project/Project-AWSEventPipeline.vue'

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
const showAwsConfigMgmt = ref(false)
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
const showAws3TierPlatform = ref(false)
const showAwsImagePipeline = ref(false)
const showAwsEventPipeline = ref(false)

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  // ── Main section ──────────────────────────────────────────────────────────

  {
    id: 'aws-3tier-platform',
    title: 'AWS 3-Tier Platform – FastAPI, ALB, ASG, RDS & ElastiCache Redis',
    titleHtml: 'AWS 3-Tier Platform – FastAPI, ALB, ASG, RDS & ElastiCache <span class="text-red-500">Redis</span>',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/ec2-autoscaling.svg', alt: 'Auto Scaling' },
      { src: '/images/aws-icons/rds.svg', alt: 'RDS' },
      { src: '/images/project-icons/redis.svg', alt: 'Redis' },
      { src: '/images/project-icons/FastAPI.svg', alt: 'FastAPI' },
    ],
    tags: ['Database', 'Cache', 'Fault Injection'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
    isNew: true,
  },
  {
    id: 'aws-image-pipeline',
    title: 'AWS Image Pipeline – Golden AMI Factory with Packer & SSM',
    titleHtml: 'AWS Image Pipeline – Golden AMI Factory with <span class="text-[#4d8bff]">Packer</span> & SSM',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/ec2.svg', alt: 'EC2' },
      { src: '/images/aws-icons/iam.svg', alt: 'IAM' },
      { src: '/images/project-icons/Packer.svg', alt: 'Packer' },
      { src: '/images/aws-icons/ssm.svg', alt: 'SSM' },
    ],
    tags: ['Golden AMI', 'Image Baking', 'Automation'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
    isNew: true,
  },
  {
    id: 'aws-event-driven-pipeline',
    title: 'AWS Event-Driven Pipeline – SQS, Lambda, S3, Glue & Athena',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/sqs.svg', alt: 'SQS' },
      { src: '/images/aws-icons/Glue.svg', alt: 'Glue' },
      { src: '/images/aws-icons/s3.svg', alt: 'S3' },
      { src: '/images/aws-icons/athena.svg', alt: 'Athena' },
    ],
    tags: ['Serverless', 'Data Pipeline', 'Analytics'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
    isNew: true,
  },
  {
    id: 'fargate-golden-path',
    title: 'ECS Fargate Golden Path – Blue/Green, Aurora Serverless, X-Ray & FIS',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/aws-icons/ecs.svg', alt: 'ECS' },
      { src: '/images/aws-icons/fargate.svg', alt: 'Fargate' },
      { src: '/images/aws-icons/code-deploy.svg', alt: 'CodeDeploy' },
      { src: '/images/aws-icons/fis.svg', alt: 'FIS' },
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
    id: 'aws-config-mgmt',
    title: 'AWS SSM Fleet – Puppet, Config Mangement & Compliance',
    titleHtml: 'AWS SSM Fleet – <span class="text-amber-400">Puppet</span> Config Mangement & Compliance',
    icons: [
      { src: '/images/main-tools/aws-icon2.png', alt: 'AWS' },
      { src: '/images/project-icons/python.svg', alt: 'Python' },
      { src: '/images/project-icons/puppet.svg', alt: 'Puppet' },
      { src: '/images/aws-icons/ssm.svg', alt: 'SSM' },
      { src: '/images/aws-icons/config.svg', alt: 'AWS Config' },
      { src: '/images/aws-icons/eventbridge.svg', alt: 'EventBridge' },
    ],
    tags: ['Masterless Puppet', 'Fleet', 'Keyless'],
    status: 'Ready',
    statusColor: 'green',
    category: 'Cloud Infrastructure',
    hover: 'hover:bg-cyan-800 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/25',
    titleHover: 'group-hover:text-cyan-100',
    section: 'main',
  },
{
    id: 'pilot-light-dr',
    title: 'E-commerce Platform Pilot Light Disaster Recovery with Step Functions',
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
    statusColor: 'orange',
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
    hover: 'hover:bg-slate-700/60 hover:border-slate-400/60 hover:shadow-lg hover:shadow-slate-500/10',
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
    hover: 'hover:bg-slate-700/60 hover:border-slate-400/60 hover:shadow-lg hover:shadow-slate-500/10',
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

// ─── Curated grid (handoff Selected work) ─────────────────────────────────────
// The grid shows a curated subset of the project catalogue above. cardMeta keys
// (in order) drive the P-0N index, copy and repo link; the matching catalogue
// entry supplies the modal wiring via its id. The remaining catalogue entries
// stay defined so their modals remain available for future use.
// NOTE: aws-event-driven-pipeline and aws-config-mgmt repo slugs are best-guess
// pending confirmation.
const cardMeta = {
  'aws-3tier-platform': {
    code: 'P-01',
    title: 'AWS 3-Tier Platform',
    description: 'A production-style three-tier app, FastAPI behind an ALB and auto-scaling group, with RDS and ElastiCache Redis for data and caching.',
    tags: ['Database', 'Cache'],
    category: 'Cloud Infrastructure',
    repoUrl: 'https://github.com/Simodalstix/aws-3tier-platform',
  },
  'aws-image-pipeline': {
    code: 'P-02',
    title: 'AWS Image Pipeline',
    description: 'A golden-AMI factory that bakes hardened, pre-patched images with Packer and SSM, giving repeatable, drift-free fleets that launch fast.',
    descriptionHtml: 'A golden-AMI factory that bakes hardened, pre-patched images with <span class="text-[#02A8EF]">Packer</span> and SSM, giving repeatable, drift-free fleets that launch fast.',
    tags: ['Golden AMI', 'Automation'],
    category: 'Automation',
    repoUrl: 'https://github.com/Simodalstix/aws-image-pipeline',
  },
  'aws-event-driven-pipeline': {
    code: 'P-03',
    title: 'AWS Event-Driven Pipeline',
    description: 'Decoupled serverless processing across SQS, Lambda and S3, with Glue and Athena turning raw events into queryable, analytics-ready datasets.',
    tags: ['Serverless', 'Analytics'],
    category: 'Serverless',
    repoUrl: 'https://github.com/Simodalstix/aws-event-driven-pipeline',
  },
  'fargate-golden-path': {
    code: 'P-04',
    title: 'ECS Fargate Golden Path',
    description: 'Blue/green delivery on ECS Fargate backed by Aurora Serverless, with X-Ray tracing and FIS fault-injection wired in from the start.',
    tags: ['Containers', 'Observability'],
    category: 'Containers',
    repoUrl: 'https://github.com/Simodalstix/aws-fargate-golden-path',
  },
  'aws-config-mgmt': {
    code: 'P-05',
    title: 'AWS SSM Fleet',
    description: 'Masterless Puppet configuration across an SSM-managed fleet, with keyless access, drift detection and continuous compliance reporting.',
    tags: ['Fleet', 'Compliance'],
    category: 'Fleet',
    repoUrl: 'https://github.com/Simodalstix/aws-ssm-puppet-fleet',
  },
  'pilot-light-dr': {
    code: 'P-06',
    title: 'E-commerce Pilot Light DR',
    description: 'Pilot-light disaster recovery with RDS read replica, S3 cross-region replication, Step Functions failover and Route 53 health-check routing across Sydney and Singapore.',
    tags: ['Multi-Region', 'Failover'],
    category: 'Disaster Recovery',
    repoUrl: 'https://github.com/Simodalstix/aws-dr-pilot-light',
  },
  'azure-hub-spoke': {
    code: 'P-07',
    title: 'Azure Hub-Spoke Landing Zone',
    description: 'Azure landing zone with hub-spoke networking: Azure Firewall, VPN Gateway, NSGs, Key Vault and Private DNS, built as modular Terraform with a CI/CD pipeline.',
    tags: ['Hub & Spoke', 'VPN'],
    category: 'Cloud Infrastructure',
    repoUrl: 'https://github.com/Simodalstix/azure-hub-spoke-vpn',
  },
}

const mainProjects = computed(() =>
  Object.entries(cardMeta).map(([id, meta]) => {
    const base = projects.find((p) => p.id === id)
    return { ...base, id, ...meta }
  }),
)

// ─── Secondary "More work" list ───────────────────────────────────────────────
// Compact breadth list below the featured cards. Each id maps to a modal via the
// `activeProject` watch map. Short title + 2-3 tags only; the rows read as
// "additional work", not same-tier featured cards.
const secondaryProjects = [
  { id: 'eks-gitops',              title: 'EKS Multi-Tier GitOps',        tags: ['EKS', 'ArgoCD', 'Helm'] },
  { id: 'multiregion-platform',    title: 'Serverless Multi-Region',      tags: ['Lambda', 'DynamoDB', 'API GW'] },
  { id: 'enterprise-landing-zone', title: 'Multi-Account Landing Zone',   tags: ['Organizations', 'GuardDuty'] },
  { id: 'observability-platform',  title: 'Observability Platform',       tags: ['CloudWatch', 'EventBridge'] },
  { id: 'dr-backup',               title: 'DR & Backup Automation',       tags: ['AWS Backup', 'Route 53'] },
  { id: 'devops-toolchain',        title: 'DevOps Toolchain',             tags: ['SonarQube', 'LaunchDarkly'] },
  { id: 'vmware-monitoring',       title: 'VMware Monitoring',            tags: ['Ansible', 'Prometheus'] },
  { id: 'k3s-gitops',              title: 'Raspberry Pi k3s GitOps',      tags: ['k3s', 'ArgoCD', 'Pi'] },
]

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
    'aws-config-mgmt':         showAwsConfigMgmt,
    'aws-image-pipeline':          showAwsImagePipeline,
    'aws-event-driven-pipeline':   showAwsEventPipeline,
    'aws-3tier-platform':          showAws3TierPlatform,
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
