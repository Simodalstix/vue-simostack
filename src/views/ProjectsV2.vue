<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-[90vw]">
    <h1 class="text-5xl font-bold mb-10">Systems, Cloud & Infra Projects</h1>

    <!-- Outer: 2 halves -->
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">

      <!-- LEFT HALF -->
      <div class="lg:w-1/2 flex flex-col gap-4 sm:gap-6">

        <!-- Blurb full width -->
        <div class="rounded-2xl border border-slate-700 bg-slate-950/60 p-6 sm:p-8">
          <p class="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
            These projects document hands-on work building and operating cloud environments — infrastructure provisioning, containerised workloads, and system design using tools like Terraform, AWS CDK, and container platforms.
          </p>
          <p class="text-base md:text-lg text-gray-200 leading-relaxed mb-5">
            Each project explores a specific operational problem such as networking, deployment pipelines, or service architecture.
          </p>
         <div class="font-mono text-sm md:text-base bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-4">
  <div class="text-cyan-300">$ rm -rf /limitations</div>
</div>
        </div>

        <!-- LEFT MAIN COLUMN -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <!-- LEFT FIRST COLUMN -->
          <div class="flex-1 flex flex-col gap-2">

        <BaseCard
          @click="showWindowsAD = true"
          class="group cursor-pointer px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 hover:border-zinc-500 transition-all duration-100"
        >
          <h3 class="text-sm font-semibold text-slate-200 group-hover:text-white">Windows Server 2022 Domain Controller — AD, DNS & Group Policy</h3>
          <div class="flex items-center gap-3 mt-2.5">
            <img src="/images/project-icons/proxmox.svg" alt="Proxmox" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/windows.svg" alt="Windows" class="w-8 h-8 rounded-md" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showRockySamba = true"
          class="group cursor-pointer px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 hover:border-zinc-500 transition-all duration-100"
        >
          <h3 class="text-sm font-semibold text-slate-200 group-hover:text-white">Rocky Linux Samba File Server — Centralised Shares & ACL Testing</h3>
          <div class="flex items-center gap-3 mt-2.5">
            <img src="/images/project-icons/proxmox.svg" alt="Proxmox" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/samba.png" alt="Samba" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showPrometheusGrafana = true"
          class="group cursor-pointer px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 hover:border-zinc-500 transition-all duration-100"
        >
          <h3 class="text-sm font-semibold text-slate-200 group-hover:text-white">Prometheus + Grafana Monitoring — Host Observability & Alerting</h3>
          <div class="flex items-center gap-3 mt-2.5">
            <img src="/images/project-icons/proxmox.svg" alt="Proxmox" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/prometheus.png" alt="Prometheus" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showVaultPKI = true"
          class="group cursor-pointer px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 hover:border-zinc-500 transition-all duration-100"
        >
          <h3 class="text-sm font-semibold text-slate-200 group-hover:text-white">HashiCorp Vault PKI — Automated Internal Certs & Secret Management</h3>
          <div class="flex items-center gap-3 mt-2.5">
            <img src="/images/project-icons/proxmox.svg" alt="Proxmox" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/vault.svg" alt="Vault" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          </div>
        </BaseCard>

        <BaseCard
          @click="showOPNsense = true"
          class="group cursor-pointer px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 hover:border-zinc-500 transition-all duration-100"
        >
          <h3 class="text-sm font-semibold text-slate-200 group-hover:text-white">OPNsense Firewall & WireGuard VPN — Routing & NAT Reference</h3>
          <div class="flex items-center gap-3 mt-2.5">
            <img src="/images/project-icons/proxmox.svg" alt="Proxmox" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/opnsense.webp" alt="OPNsense" class="w-8 h-8 rounded-md" />
          </div>
        </BaseCard>

          </div>
          <!-- LEFT SECOND COLUMN -->
          <div class="flex-1 flex flex-col gap-4 sm:gap-6">

        <BaseCard
          @click="showAwsFargateGoldenPath = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">ECS Fargate Golden Path + Resilience Scenarios</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/ecs.svg" alt="ECS" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/fargate.svg" alt="Fargate" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/code-deploy.svg" alt="CodeDeploy" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/alb.svg" alt="ALB" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Containers</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Fargate</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Observability</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Ready
            </span>
            <span class="text-gray-400">Cloud Infrastructure - View details</span>
          </div>
        </BaseCard>

        <BaseCard
          @click="showEnterpriseLandingZone = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">AWS Multi-Account Landing Zone Architecture</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/organizations.svg" alt="Organizations" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/transit-gateway.svg" alt="Transit Gateway" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/guardduty.svg" alt="GuardDuty" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/security-hub.svg" alt="Security Hub" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Multi-Account</span>
            <span class="px-2 py-1 text-xs font-medium bg-gray-500/20 text-slate-300 border border-slate-500/20 rounded-md">Hub & Spoke</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Enterprise</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Ready
            </span>
            <span class="text-gray-400">Cloud Infrastructure - View details</span>
          </div>
        </BaseCard>

        <BaseCard
          @click="showAwsGitopsGP = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-cyan-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">EKS Multi-Tier App – GitOps Pipeline</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/eks.svg" alt="EKS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/helm.png" alt="Helm" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/prometheus.png" alt="Prometheus" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">GitOps</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Kubernetes</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Monitoring</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">DevOps - View details</span>
          </div>
        </BaseCard>

        <BaseCard
          @click="showAwsDrBackupLab = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">AWS Disaster Recovery & Backup - Rapid Recovery</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/backup.svg" alt="AWS Backup" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/rds.svg" alt="RDS" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/ebs.svg" alt="EBS" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/route53.svg" alt="Route 53" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Backup</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">DR</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Automation</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">Experimental Lab - View details</span>
          </div>
        </BaseCard>

          </div>
        </div>
      </div>

      <!-- RIGHT MAIN COLUMN -->
      <div class="lg:w-1/2 flex flex-col sm:flex-row gap-4 sm:gap-6">
        <!-- RIGHT FIRST COLUMN -->
        <div class="flex-1 flex flex-col gap-4 sm:gap-6">

        <BaseCard
          @click="showAzureContainerApps = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">Azure Container Apps – DevOps & Change Control</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
            <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/azure-devops.svg" alt="Azure DevOps" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/worker-container-app.svg" alt="Container Apps" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/key-vault.svg" alt="Key Vault" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/application-insights.svg" alt="App Insights" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Containers</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Serverless</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">CI/CD</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">DevOps - View details</span>
          </div>
        </BaseCard>

        <BaseCard
          @click="showPilotLightDR = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">E-commerce Platform Pilot Light Disaster Recovery</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/alb.svg" alt="ALB" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/rds.svg" alt="RDS" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/route53.svg" alt="Route 53" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/step-functions.svg" alt="Step Functions" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Multi-Region</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">DR</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Auto Failover</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">Experimental Lab - View details</span>
          </div>
        </BaseCard>

        <BaseCard
          @click="showAwsLambdaSqsDlq = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">Resilient Serverless Ingestion Pipeline on AWS (SQS + DLQ)</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/lambda.svg" alt="Lambda" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/sqs.svg" alt="SQS" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/iam.svg" alt="IAM" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Serverless</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Queues</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Reliability</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">Cloud Infrastructure - View details</span>
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
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/project-icons/java.svg" alt="Java" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/spring.svg" alt="Spring Boot" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/maven.svg" alt="Maven" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/jenkins.svg" alt="Jenkins" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/docker-mark-blue.svg" alt="Docker" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/postgres.svg" alt="PostgreSQL" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">CI/CD</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Java</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Containers</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">DevOps Lab - View details</span>
          </div>
        </BaseCard>

        </div>
        <!-- RIGHT SECOND COLUMN -->
        <div class="flex-1 flex flex-col gap-4 sm:gap-6">

        <BaseCard
          @click="showAzureProject = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-700 hover:to-indigo-950 transition-all hover:border-indigo-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">Azure Hub-Spoke Landing Zone Architecture</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
            <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/firewall.svg" alt="Azure Firewall" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/vnet.svg" alt="Azure VNet" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/key-vault.svg" alt="Key Vault" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/azure-vpn.png" alt="VPN Gateway" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Hub & Spoke</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Enterprise</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">VPN Tunnel</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">Cloud Infrastructure - View details</span>
          </div>
        </BaseCard>

        <BaseCard
          @click="showObservabilityPlatform = true"
          class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-950 transition-all hover:border-cyan-400 duration-100 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">AWS Monitoring & Observability Platform Architecture</h3>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
            <img src="/images/project-icons/python.svg" alt="Python" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/eventbridge.svg" alt="EventBridge" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/sns.svg" alt="SNS" class="w-8 h-8 rounded-md" />
            <img src="/images/aws-icons/step-functions.svg" alt="Step Functions" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Observability</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Monitoring</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Cost Control</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">DevOps - View details</span>
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
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
            <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
            <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/azure-vm.svg" alt="Azure VM" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/monitor.svg" alt="Azure Monitor" class="w-8 h-8 rounded-md" />
            <img src="/images/azure-icons/log-analytics-workspaces.svg" alt="Log Analytics" class="w-8 h-8 rounded-md" />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Azure</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Monitoring</span>
            <span class="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/20 rounded-md">Automation</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-slate-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-300 border border-green-500/20 rounded-full">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                Ready
              </span>
            </div>
            <span class="text-gray-400">DevOps - View details</span>
          </div>
        </BaseCard>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'

const showAwsFargateGoldenPath = ref(false)
const showEnterpriseLandingZone = ref(false)
const showAzureContainerApps = ref(false)
const showAwsGitopsGP = ref(false)
const showAwsDrBackupLab = ref(false)
const showPilotLightDR = ref(false)
const showAzureProject = ref(false)
const showAwsLambdaSqsDlq = ref(false)
const showObservabilityPlatform = ref(false)
const showJavaMavernJenkins = ref(false)
const showDynatraceProject = ref(false)
const showWindowsAD = ref(false)
const showRockySamba = ref(false)
const showPrometheusGrafana = ref(false)
const showVaultPKI = ref(false)
const showOPNsense = ref(false)
</script>
