<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10">
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold mb-4">My Projects & Labs</h1>
        <p class="text-lg">
          My projects are how I learn—hands-on, reproducible, and tied to real tools. I focus on
          Infrastructure as Code (Terraform, CloudFormation), automation, and monitoring to practice
          how teams actually manage cloud environments. I also build small full-stack apps so I can
          see how code moves from development into production. I optimise for modularity and
          reuse—small proofs of concept I can extend as I go.
        </p>
      </div>

      <div class="flex flex-col justify-end gap-3">
        <a
          href="https://github.com/Simodalstix"
          target="_blank"
          class="group flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-indigo-700 hover:to-indigo-600 border border-slate-500 hover:border-indigo-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
        >
          <img src="/images/project-icons/githubwhite.png" alt="GitHub" class="w-6 h-6" />
          <span class="text-white font-medium group-hover:text-indigo-100">GitHub</span>
        </a>

        <button
          type="button"
          @click="showHtbModal = true"
          class="group flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-green-700 hover:to-green-600 border border-slate-500 hover:border-green-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
        >
          <img
            src="/images/project-icons/hackthebox-green.svg"
            alt="Hack The Box"
            class="w-6 h-6"
          />
          <span class="text-white font-medium group-hover:text-green-100">Hack The Box</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      <!-- Enhanced AWS Fargate Card -->
      <BaseCard
        @click="showAwsFargateGoldenPath = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Containers
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Fargate
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Observability
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>
      <!-- Enhanced Landing Zone Card -->
      <BaseCard
        @click="showEnterpriseLandingZone = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
          <img src="/images/aws-icons/guardduty.svg" alt="GuardDuty" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/security-hub.svg"
            alt="Security Hub"
            class="w-8 h-8 rounded-md"
          />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Multi-Account
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Hub & Spoke
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Enterprise
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced DR & Backup Card -->
      <BaseCard
        @click="showAwsDrBackupLab = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-3 py-1 text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20 rounded-md"
          >
            Backup
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 rounded-md"
          >
            DR
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20 rounded-md"
          >
            Automation
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Experimental Lab</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Azure Container Apps Card -->
      <BaseCard
        @click="showAzureContainerApps = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Azure Container Apps – DevOps & Change Control
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
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
          <img src="/images/azure-icons/key-vault.svg" alt="Key Vault" class="w-8 h-8 rounded-md" />
          <img
            src="/images/azure-icons/application-insights.svg"
            alt="App Insights"
            class="w-8 h-8 rounded-md"
          />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Containers
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Serverless
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            CI/CD
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced EKS GitOps Card -->
      <BaseCard
        @click="showAwsGitopsGP = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            EKS Multi-Tier App – GitOps Pipeline
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/eks.svg" alt="EKS" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/helm.png" alt="Helm" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/prometheus.png"
            alt="Prometheus"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            GitOps
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Kubernetes
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Monitoring
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Lambda SQS Card -->
      <BaseCard
        @click="showAwsLambdaSqsDlq = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/iam.svg" alt="IAM" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Serverless
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Queues
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Reliability
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Pilot Light DR Card -->
      <BaseCard
        @click="showPilotLightDR = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
            class="px-2 py-1 text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20 rounded-md"
          >
            Multi-Region
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 rounded-md"
          >
            DR
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20 rounded-md"
          >
            Auto Failover
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Experimental Lab</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Azure Hub-Spoke Card -->
      <BaseCard
        @click="showAzureProject = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Azure Org-Ready Hub-Spoke Landing Zone Architecture
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img
            src="/images/azure-icons/firewall.svg"
            alt="Azure Firewall"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/azure-icons/vnet.svg" alt="Azure VNet" class="w-8 h-8 rounded-md" />
          <img src="/images/azure-icons/key-vault.svg" alt="Key Vault" class="w-8 h-8 rounded-md" />
          <img
            src="/images/azure-icons/azure-vpn.png"
            alt="VPN Gateway"
            class="w-8 h-8 rounded-md"
          />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Hub & Spoke
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Enterprise
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            VPN Tunnel
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Multi-Region Platform Card -->
      <BaseCard
        @click="showMultiregionProject = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Multi-Region
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Serverless
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Automation
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>
      <!-- Enhanced Observability Platform Card -->
      <BaseCard
        @click="showObservabilityPlatform = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Observability
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Monitoring
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Cost Control
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Spring PetClinic Card -->
      <BaseCard
        @click="showJavaMavernJenkins = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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
          <img src="/images/project-icons/jenkins.svg" alt="Jenkins" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            CI/CD
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Java
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Containers
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Dynatrace Azure Card -->
      <BaseCard
        @click="showDynatraceProject = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Deploying Dynatrace & Azure Monitoring Agents in Azure
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace" class="w-8 h-8 rounded-md" />
          <img src="/images/azure-icons/azure-vm.svg" alt="Azure VM" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Azure
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Monitoring
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Automation
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Bedrock Landing Zone Card -->
      <BaseCard
        @click="showBedrockLandingzone = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            AWS Bedrock Landing Zone Architecture
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/bedrock.png" alt="Bedrock" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/organizations.svg"
            alt="Organizations"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/cloudtrail.svg" alt="CloudTrail" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/guardduty.svg" alt="GuardDuty" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Multi-Account
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            AI Platform
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Enterprise
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Database Migration Card -->
      <BaseCard
        @click="showAwsProject = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Executing a Database Migration to AWS with Terraform
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Database
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Migration
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Automation
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Migration</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>
      <!-- Enhanced E-Commerce Microservices Card -->
      <BaseCard
        @click="showJavaGradleJenkins = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            E-Commerce Microservices Mall – Jenkins CI/CD & Kubernetes
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
          <img src="/images/project-icons/jenkins.svg" alt="Jenkins" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Microservices
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Java
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Enterprise
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Java RabbitMQ AKS Card -->
      <BaseCard
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 relative"
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
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/java.svg" alt="Java" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/spring.svg"
            alt="Spring Boot"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/project-icons/rabbitmq.svg" alt="RabbitMQ" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Microservices
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Messaging
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Kubernetes
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
              In Progress
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View on GitHub</span>
        </div>
      </BaseCard>

      <!-- Enhanced Raspberry Pi Backend Card -->
      <BaseCard
        @click="showRaspberry = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Github actions CI/CD Backend API on a Raspberry Pi & Docker
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img
            src="/images/main-tools/raspberry-pi.svg"
            alt="Raspberry Pi"
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
          <img src="/images/project-icons/express.svg" alt="Express" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/nginx.svg" alt="NGINX" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Docker
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Backend
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            CI/CD
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced K3s GitOps Card (Old Style) -->
      <BaseCard
        @click="showK3sGitops = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
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
          <img src="/images/project-icons/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/k3s.svg" alt="k3s" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/helm.png" alt="Helm" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/mariadb.svg" alt="MariaDB" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            GitOps
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Kubernetes
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Raspberry Pi
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Experimental Lab</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced VMware Monitoring Card -->
      <BaseCard
        @click="showVmwareProject = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Automating VMware Monitoring and Alerting with Ansible
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/vmware.svg" alt="VMware" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/redhat.svg" alt="Red Hat" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/prometheus.png"
            alt="Prometheus"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/loki.png" alt="Loki" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            VMware
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Automation
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Monitoring
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced Azure AKS GitOps Card -->
      <BaseCard
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 relative"
      >
        <!-- Full-card clickable overlay -->
        <a
          href="https://github.com/Simodalstix/Azure-aks-platform"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label="Open GitHub repo: Azure AKS GitOps Platform - Enterprise Kubernetes"
        >
          <span class="sr-only">Open GitHub repo</span>
        </a>

        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            Azure AKS Platform Engineering with CI/CD and Observability
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/azure-icons/aks.svg" alt="Azure AKS" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/helm.png" alt="Helm" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/nginx.svg" alt="NGINX" class="w-8 h-8 rounded-md" />
          <img src="/images/azure-icons/key-vault.svg" alt="Key Vault" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Kubernetes
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            GitOps
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Platform
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
              In Progress
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View on GitHub</span>
        </div>
      </BaseCard>

      <!-- Enhanced Document Analyzer Card -->
      <BaseCard
        @click="showDocumentAnalyzer = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            AWS AI Document Analyzer – Textract & Claude
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/type-script.svg"
            alt="TypeScript"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/apigateway.svg"
            alt="API Gateway"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/lambda.svg" alt="Lambda" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/textract.svg" alt="Textract" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/bedrock.png" alt="Bedrock" class="w-8 h-8 rounded-md" />
        </div>

        <!-- Enhanced tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            Serverless
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            AI/ML
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            OCR
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>Cloud Infrastructure</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <!-- Enhanced DevOps Toolchain Card -->
      <BaseCard
        @click="showToolingProject = true"
        class="group cursor-pointer p-6 rounded-xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-100">
            DevOps Toolchain SonarQube & LaunchDarkly
          </h3>
        </div>

        <!-- Tech stack icons -->
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
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
            class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md"
          >
            DevOps
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md"
          >
            Toolchain
          </span>
          <span
            class="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md"
          >
            Quality Gates
          </span>
        </div>

        <!-- Project metadata footer -->
        <div
          class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-slate-600"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              Complete
            </span>
            <span>DevOps</span>
          </div>
          <span class="text-gray-500">View details</span>
        </div>
      </BaseCard>

      <BaseCard class="bg-gray-800 p-4 rounded-md border-2 border-slate-500 text-gray-400">
        <h3 class="text-md font-bold mb-3">More to edit when I get a chance</h3>
        <p class="text-sm"></p>
      </BaseCard>
    </div>

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
  </div>
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
