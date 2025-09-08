<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-10">
    <!-- Header Section -->
    <div class="text-center mb-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">Infrastructure Portfolio</h1>
        <p class="text-xl text-slate-400 mb-8">
          Modular cloud and on-premises platforms showcasing enterprise architecture patterns,
          DevOps automation, and modern security practices across AWS, Azure, and home lab
          environments.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            :to="{ name: 'Projects' }"
            class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Current Projects
          </router-link>
          <a
            href="https://github.com/Simodalstix"
            target="_blank"
            class="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-slate-500/20 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
          <a
            href="https://academy.hackthebox.com/profile/1441297"
            target="_blank"
            class="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M11.996 0L1.119 6.003v11.994L11.996 24l10.877-6.003V6.003L11.996 0zm8.148 16.672L12 20.177l-8.144-3.505V7.328L12 3.823l8.144 3.505v9.344z"
              />
            </svg>
            HTB Academy
          </a>
        </div>
      </div>
    </div>
    <!-- AWS Cloud Zone -->
    <div class="relative mb-16">
      <!-- Zone Container with Modern Gradient Border -->
      <div
        class="border-2 border-slate-500/40 rounded-3xl p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/60 backdrop-blur-md relative overflow-hidden"
      >
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-teal-500/10"
          ></div>
        </div>

        <!-- Zone Header -->
        <!-- COPY HEADER OPTIONS HERE: Replace this entire section with any header from AwsHeaders.vue -->

        <!-- Header Option 3: Minimal Professional -->
        <div class="header-option-3 mb-8">
          <div class="border-l-4 border-cyan-400 pl-6 mb-6 bg-gradient-to-r from-slate-600/20 via-slate-700/10 to-transparent rounded-r-xl py-4 -ml-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img
                  src="/images/main-tools/aws-icon2.png"
                  alt="AWS"
                  class="w-10 h-10 rounded-md"
                />
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">AWS Cloud Infrastructure</h3>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-slate-400">IaC - Python CDK + Terraform </span>
                    <span class="text-xs text-slate-500">•</span>
                    <span class="text-sm text-slate-400">3 Enterprise Platforms</span>
                    <span class="text-xs text-slate-500">•</span>
                    <span class="text-sm text-slate-400">Multi-Account + Multi-Region</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <img
                  src="/images/main-tools/terraform.svg"
                  alt="Terraform"
                  class="w-10 h-10 rounded-md opacity-80"
                />
                <img
                  src="/images/project-icons/python.svg"
                  alt="Python CDK"
                  class="w-10 h-10 rounded-md opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- END HEADER SECTION -->

        <!-- Enhanced Projects Grid -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <!-- AWS Foundation Platform -->
          <BaseCard
            @click="showAwsFoundation = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-cyan-100 mb-2">
                AWS Foundation Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Multi-account landing zone with organizational structure, security baseline,
                comprehensive observability, SSM configuration management, and Wireguard VPN
                connectivity to home lab infrastructure.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-10 h-10 rounded-md" />
              <img
                src="/images/aws-icons/organizations.svg"
                alt="Organizations"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/aws-icons/transit-gateway.svg"
                alt="Transit Gateway"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/aws-icons/cloudwatch.svg"
                alt="CloudWatch"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/aws-icons/ssm.svg" alt="SSM" class="w-10 h-10 rounded-md" />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Multi-Account
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Organizations
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                VPN Gateway
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Consolidating
              </span>
              <span class="text-slate-400 font-medium">Foundation</span>
            </div>
          </BaseCard>

          <!-- AWS Container Platform -->
          <BaseCard
            @click="showAwsContainers = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-cyan-100 mb-2">
                AWS Container Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Unified container orchestration with EKS Kubernetes clusters, ECS Fargate serverless
                containers, ArgoCD GitOps workflows, and comprehensive monitoring with Prometheus
                and Grafana.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img src="/images/aws-icons/eks.svg" alt="EKS" class="w-10 h-10 rounded-md" />
              <img src="/images/aws-icons/ecs.svg" alt="ECS" class="w-10 h-10 rounded-md" />
              <img src="/images/aws-icons/fargate.svg" alt="Fargate" class="w-10 h-10 rounded-md" />
              <img
                src="/images/project-icons/argocd.svg"
                alt="ArgoCD"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/prometheus.png"
                alt="Prometheus"
                class="w-10 h-10 rounded-md"
              />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                EKS
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                ECS Fargate
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                ArgoCD
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Consolidating
              </span>
              <span class="text-slate-400 font-medium">Orchestration</span>
            </div>
          </BaseCard>

          <!-- AWS Serverless Platform -->
          <BaseCard
            @click="showAwsServerless = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-cyan-100 mb-2">
                AWS Serverless Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Event-driven serverless architecture with Lambda functions, Step Functions
                workflows, SQS/DLQ messaging, DynamoDB global tables, and multi-region disaster
                recovery patterns.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img src="/images/aws-icons/lambda.svg" alt="Lambda" class="w-10 h-10 rounded-md" />
              <img
                src="/images/aws-icons/step-functions.svg"
                alt="Step Functions"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/aws-icons/sqs.svg" alt="SQS" class="w-10 h-10 rounded-md" />
              <img
                src="/images/aws-icons/dynamodb.svg"
                alt="DynamoDB"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/aws-icons/apigateway.svg"
                alt="API Gateway"
                class="w-10 h-10 rounded-md"
              />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Lambda
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Step Functions
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                DynamoDB
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Consolidating
              </span>
              <span class="text-slate-400 font-medium">Event Architecture</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <!-- Enterprise Home Lab Zone - Redesigned -->
    <div class="relative mb-16">
      <!-- Zone Container with Modern Gradient Border -->
      <div
        class="border-2 border-slate-500/40 rounded-3xl p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/60 backdrop-blur-md relative overflow-hidden"
      >
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-emerald-500/10"
          ></div>
        </div>

        <!-- Home Lab Header -->
        <!-- COPY HEADER OPTIONS HERE: Replace this entire section with any header from HomeLabHeaders.vue -->
        <!-- Header Option 3: Minimal Professional -->
        <div class="relative z-10 mb-8">
          <div class="border-l-4 border-zinc-400 pl-6 mb-6 bg-gradient-to-r from-zinc-600/20 via-slate-700/10 to-transparent rounded-r-xl py-4 -ml-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img
                  src="/images/project-icons/proxmox2.png"
                  alt="Proxmox"
                  class="w-10 h-10 rounded-md"
                />
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">On-Premises Lab</h3>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-slate-400">IaC - Ansible</span>
                    <span class="text-xs text-slate-500">•</span>
                    <span class="text-sm text-slate-400">6 Core Services</span>
                    <span class="text-xs text-slate-500">•</span>
                    <span class="text-sm text-slate-400">80GB RAM Across 3 Systems</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <img
                  src="/images/main-tools/vmware.svg"
                  alt="VMware"
                  class="w-10 h-10 rounded-md opacity-80"
                />
                <img
                  src="/images/project-icons/rocky.svg"
                  alt="Rocky Linux"
                  class="w-10 h-10 rounded-md opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- END HOME LAB HEADER SECTION -->

        <!-- Enhanced Projects Grid -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <!-- Zero-Trust Security Platform -->
          <BaseCard
            @click="showZeroTrustSecurity = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-zinc-950 transition-all hover:border-zinc-400 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-zinc-100 mb-2">
                Zero-Trust Security Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Security platform with HashiCorp Vault for secret management, Wazuh SIEM for threat
                detection, and automated PKI for certificate lifecycle. Implements zero-trust
                principles with mTLS everywhere.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img src="/images/project-icons/vault.svg" alt="Vault" class="w-10 h-10 rounded-md" />
              <img
                src="/images/project-icons/wazuh-icon.png"
                alt="Wazuh"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/ansible.svg"
                alt="Ansible"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/project-icons/redhat.svg" alt="RHEL" class="w-10 h-10 rounded-md" />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                Zero-Trust
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                SIEM
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                PKI
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                In Progress
              </span>
              <span class="text-slate-400 font-medium">Security Core</span>
            </div>
          </BaseCard>

          <!-- CI/CD Pipeline -->
          <BaseCard
            @click="showCICDPipeline = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-zinc-950 transition-all hover:border-zinc-400 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-zinc-100 mb-2">
                CI/CD Pipeline
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                DevOps pipeline on native Rocky Linux with Jenkins orchestration, SonarQube code
                quality gates, Nexus artifact management, and Docker containerization. Integrates
                with Vault for secure credential injection.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img
                src="/images/project-icons/jenkins.svg"
                alt="Jenkins"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/sonarqube.png"
                alt="SonarQube"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/project-icons/nexus.png" alt="Nexus" class="w-10 h-10 rounded-md" />
              <img
                src="/images/project-icons/docker-mark-blue.svg"
                alt="Docker"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-10 h-10 rounded-md" />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                DevOps
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Quality Gates
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                Native Linux
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
              <span class="text-slate-400 font-medium">DevOps Core</span>
            </div>
          </BaseCard>

          <!-- ELK Observability Stack -->
          <BaseCard
            @click="showELKStack = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-zinc-950 transition-all hover:border-zinc-400 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-zinc-100 mb-2">
                ELK Observability Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Centralized logging and analytics with Elasticsearch cluster, Kibana dashboards,
                Logstash processing, and Filebeat agents. Integrated with Wazuh for security event
                correlation.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img
                src="/images/project-icons/elastic.svg"
                alt="Elasticsearch"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/kibana.svg"
                alt="Kibana"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/logstash.svg"
                alt="Logstash"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/filebeat.svg"
                alt="Filebeat"
                class="w-10 h-10 rounded-md"
              />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                Observability
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Analytics
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                Multi-Node
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                In Progress
              </span>
              <span class="text-slate-400 font-medium">Observability</span>
            </div>
          </BaseCard>

          <!-- File Server Platform -->
          <BaseCard
            @click="showEnterpriseFileServer = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-zinc-950 transition-all hover:border-zinc-400 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-zinc-100 mb-2">
                File Server Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Hybrid cloud file services with Active Directory integration, automated cloud
                extensions to AWS S3 and Azure Blob, Vault authentication, and distributed backup to
                edge locations.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img
                src="/images/project-icons/ubuntu.svg"
                alt="Ubuntu"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/ad.png"
                alt="Active Directory"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-10 h-10 rounded-md" />
              <img
                src="/images/main-tools/azure-icon.svg"
                alt="Azure"
                class="w-10 h-10 rounded-md"
              />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                Hybrid Cloud
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full"
              >
                File Services
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full"
              >
                Modular
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                In Progress
              </span>
              <span class="text-slate-400 font-medium">File Services</span>
            </div>
          </BaseCard>

          <!-- VyOS Network Security -->
          <BaseCard
            @click="showVyOSFirewall = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-zinc-950 transition-all hover:border-zinc-400 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-zinc-100 mb-2">
                VyOS Network Security
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Enterprise-grade network security with VyOS firewall, advanced routing protocols,
                VPN concentrator capabilities, and network segmentation. Provides perimeter defense
                and secure connectivity for the entire lab infrastructure.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img src="/images/project-icons/vyos.png" alt="VyOS" class="w-10 h-10 rounded-md" />
              <img
                src="/images/project-icons/ansible.svg"
                alt="Ansible"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/wireguard.png"
                alt="WireGuard"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/project-icons/ipsec.png" alt="IPSec" class="w-10 h-10 rounded-md" />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                Firewall
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                VPN Gateway
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-full"
              >
                Network Security
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
              <span class="text-slate-400 font-medium">Network Security</span>
            </div> </BaseCard
          ><!-- Identity & Authentication Platform -->
          <BaseCard
            @click="showIdentityPlatform = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-zinc-700 hover:to-zinc-950 transition-all hover:border-zinc-400 duration-100 hover:shadow-xl hover:shadow-zinc-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-zinc-100 mb-2">
                Identity & Authentication
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Identity platform with Zitadel IdP, OIDC/SAML SSO across all services, MFA with
                passkeys, and integration with Vault for seamless authentication. Modern identity
                patterns with zero-trust integration.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img
                src="/images/project-icons/zitadel.png"
                alt="Zitadel"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/project-icons/oauth2.jpg"
                alt="OAuth"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/project-icons/saml.svg" alt="SAML" class="w-10 h-10 rounded-md" />
              <img src="/images/project-icons/mfa.svg" alt="MFA" class="w-10 h-10 rounded-md" />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-zinc-500/20 text-zinc-300 border border-zinc-500/30 rounded-full"
              >
                OIDC/SAML
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                MFA
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-full"
              >
                Passkeys
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Planned
              </span>
              <span class="text-slate-400 font-medium">Identity Core</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <!-- Azure Cloud Zone -->
    <div class="relative">
      <!-- Zone Container with Modern Gradient Border -->
      <div
        class="border-2 border-slate-500/40 rounded-3xl p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/60 backdrop-blur-md relative overflow-hidden"
      >
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10"
          ></div>
        </div>

        <!-- Zone Header -->
        <div class="relative z-10 mb-8">
          <div class="border-l-4 border-indigo-400 pl-6 mb-6 bg-gradient-to-r from-indigo-600/20 via-slate-700/10 to-transparent rounded-r-xl py-4 -ml-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img
                  src="/images/main-tools/azure-icon.svg"
                  alt="Azure"
                  class="w-10 h-10 rounded-md"
                />
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">Azure Cloud Infrastructure</h3>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-slate-400">IaC - Terraform</span>
                    <span class="text-xs text-slate-500">•</span>
                    <span class="text-sm text-slate-400">2 Specialized Platforms</span>
                    <span class="text-xs text-slate-500">•</span>
                    <span class="text-sm text-slate-400">Hub & Spoke + Container Focus</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <img
                  src="/images/main-tools/terraform.svg"
                  alt="Terraform"
                  class="w-10 h-10 rounded-md opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <!-- Azure Foundation Platform -->
          <BaseCard
            @click="showAzureFoundation = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-indigo-100 mb-2">
                Azure Foundation Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Hub & spoke networking topology with Azure Firewall, VPN Gateway for lab
                connectivity, Dynatrace monitoring integration, and comprehensive Azure Monitor
                observability with Log Analytics workspaces.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img
                src="/images/main-tools/azure-icon.svg"
                alt="Azure"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/azure-icons/vnet.svg" alt="VNet" class="w-10 h-10 rounded-md" />
              <img
                src="/images/azure-icons/firewall.svg"
                alt="Azure Firewall"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/azure-icons/monitor.svg"
                alt="Azure Monitor"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/focus/dynatrace-icon.svg"
                alt="Dynatrace"
                class="w-10 h-10 rounded-md"
              />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Hub & Spoke
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Azure Firewall
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                VPN Gateway
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Consolidating
              </span>
              <span class="text-slate-400 font-medium">Foundation</span>
            </div>
          </BaseCard>

          <!-- Azure Container Platform -->
          <BaseCard
            @click="showAzureContainers = true"
            class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-white group-hover:text-indigo-100 mb-2">
                Azure Container Platform
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Modern container orchestration with Azure Container Apps for serverless workloads,
                AKS clusters for Kubernetes, Azure DevOps CI/CD pipelines, and Key Vault integration
                for secrets management.
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <img
                src="/images/azure-icons/worker-container-app.svg"
                alt="Container Apps"
                class="w-10 h-10 rounded-md"
              />
              <img src="/images/azure-icons/aks.svg" alt="AKS" class="w-10 h-10 rounded-md" />
              <img
                src="/images/azure-icons/azure-devops.svg"
                alt="Azure DevOps"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/azure-icons/key-vault.svg"
                alt="Key Vault"
                class="w-10 h-10 rounded-md"
              />
              <img
                src="/images/azure-icons/application-insights.svg"
                alt="App Insights"
                class="w-10 h-10 rounded-md"
              />
            </div>

            <!-- Enhanced Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Container Apps
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                AKS
              </span>
              <span
                class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded-full"
              >
                Azure DevOps
              </span>
            </div>

            <!-- Status & Metadata -->
            <div class="flex items-center justify-between text-xs pt-4 border-t border-slate-600">
              <span
                class="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
              >
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Consolidating
              </span>
              <span class="text-slate-400 font-medium">Orchestration</span>
            </div>
          </BaseCard>

          <!-- Future Expansion Slot -->
          <BaseCard
            class="group cursor-pointer p-6 rounded-xl border border-slate-600/50 bg-gradient-to-br from-slate-800/40 to-slate-900/60 hover:from-slate-700/60 hover:to-slate-800/80 transition-all hover:border-slate-500 duration-100 opacity-60"
          >
            <div class="mb-4">
              <h4 class="text-xl font-bold text-slate-300 mb-2">Future Platform</h4>
              <p class="text-slate-500 text-sm leading-relaxed">
                Expansion slot for additional Azure services such as AI/ML platform, data analytics
                pipeline, or IoT edge computing solutions based on project requirements and learning
                objectives.
              </p>
            </div>

            <!-- Placeholder Tech Stack -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <div
                class="w-10 h-10 bg-slate-600/50 rounded-md border-2 border-dashed border-slate-500"
              ></div>
              <div
                class="w-10 h-10 bg-slate-600/50 rounded-md border-2 border-dashed border-slate-500"
              ></div>
              <div
                class="w-10 h-10 bg-slate-600/50 rounded-md border-2 border-dashed border-slate-500"
              ></div>
              <div
                class="w-10 h-10 bg-slate-600/50 rounded-md border-2 border-dashed border-slate-500"
              ></div>
            </div>

            <!-- Placeholder Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-600/20 text-slate-400 border border-slate-600/30 rounded-full"
              >
                TBD
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-600/20 text-slate-400 border border-slate-600/30 rounded-full"
              >
                Future
              </span>
              <span
                class="px-3 py-1 text-xs font-semibold bg-slate-600/20 text-slate-400 border border-slate-600/30 rounded-full"
              >
                Expansion
              </span>
            </div>

            <!-- Status & Metadata -->
            <div
              class="flex items-center justify-between text-xs pt-4 border-t border-slate-600/50"
            >
              <span
                class="flex items-center gap-2 px-3 py-1 bg-slate-600/20 text-slate-400 border border-slate-600/30 rounded-full"
              >
                <div class="w-2 h-2 bg-slate-500 rounded-full"></div>
                Available
              </span>
              <span class="text-slate-500 font-medium">Expansion Slot</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Under construction page for projects redesign
</script>
