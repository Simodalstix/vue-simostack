<template>
  <div class="text-white container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10">
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold mb-4">My Projects & Labs</h1>
        <p class="text-lg">
          My projects are a testament to my hands-on approach to learning and building. I focus on
          creating real-world infrastructure that mirrors enterprise environments, with a strong
          emphasis on Infrastructure as Code (IaC), automation, and monitoring. I also build
          full-stack web applications to gain a deeper understanding of the entire technology stack.
          The labs and projects I create are designed to be reproducible and scalable, showcasing my
          ability to tackle modern infrastructure challenges.
        </p>
      </div>

      <div class="flex flex-col justify-end">
        <div
          class="bg-purple-700 border-2 border-purple-600 hover:bg-purple-600 text-white p-4 mt-2 rounded-lg text-center shadow-md transition-colors duration-300"
        >
          <a
            href="https://github.com/Simodalstix"
            target="_blank"
            class="flex items-center justify-center gap-2 text-white font-semibold py-2"
          >
            <img src="/images/project-icons/githubwhite.png" alt="GitHub Logo" class="w-8 h-8" />
            GitHub
          </a>
        </div>

        <button
          type="button"
          class="bg-[#1b2f21] border-2 border-[#9FEF00] hover:bg-[#2a4833] text-white p-4 mt-4 rounded-lg text-center shadow-md transition-colors duration-300 w-full"
        >
          <span class="flex items-center justify-center gap-2 text-white font-semibold py-2">
            <img
              src="/images/project-icons/hackthebox-green.svg"
              alt="Hack The Box Logo"
              class="w-8 h-8"
            />
            Hack The Box
          </span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      <!-- AWS DR & Backup Lab -->
      <BaseCard
        @click="showAwsDrBackupLab = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">AWS DR & Backup - Rapid Recovery</h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/backup.svg" alt="AWS Backup" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/rds.svg" alt="RDS" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/ebs.svg" alt="EBS" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/route53.svg" alt="Route 53" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Backup</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >DR</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Automation</span
          ><span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CDK</span
          >
        </div>
      </BaseCard>

      <!-- Implementing a Multi-Region CI/CD Pipeline in AWS -->
      <BaseCard
        @click="showMultiregionProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Serverless Multi-Region Platform with Security and Monitoring
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/project-icons/eventbridge.svg"
            alt="EventBridge Icon"
            class="w-8 h-8 rounded-md"
          /><img src="/images/aws-icons/lambda.svg" alt="Lambda Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/dynamodb.svg"
            alt="DynamoDB Icon"
            class="w-8 h-8 rounded-md"
          /><img
            src="/images/aws-icons/apigateway.svg"
            alt="API Gateway Icon"
            class="w-8 h-8 rounded-md"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >AWS</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CDK</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Automation</span
          ><span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Serverless</span
          >
        </div>
      </BaseCard>

      <!-- AWS Lambda + SQS + DLQ -->
      <BaseCard
        @click="showAwsLambdaSqsDlq = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Resilient Serverless Ingestion Pipeline on AWS (SQS + DLQ)
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/lambda.svg" alt="Lambda" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/sqs.svg" alt="SQS" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/iam.svg" alt="IAM" class="w-8 h-8 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Serverless</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Queues</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Reliability</span
          ><span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CDK</span
          >
        </div>
      </BaseCard>

      <!-- Creating a Hub-Spoke Network in Azure with a VPN Gateway -->
      <BaseCard
        @click="showAzureProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Azure Hub-Spoke Network with a VPN Gateway
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/project-icons/azure-vpn.png" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/project-icons/azure-vm.png" alt="Azure VNet Icon" class="w-8 h-8" />
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Azure</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >IaC</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Networking</span
          >
        </div>
      </BaseCard>

      <BaseCard
        @click="showBedrockLandingzone = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">AWS Bedrock Landing Zone Architecture</h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img
            src="/images/main-tools/terraform.svg"
            alt="Terraform Icon"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/bedrock.png" alt="Bedrock Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/organizations.svg"
            alt="Organizations Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/cloudtrail.svg"
            alt="CloudTrail Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/guardduty.svg"
            alt="GuardDuty Icon"
            class="w-8 h-8 rounded-md"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Multi-Account
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Landing Zone
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Enterprise AI
          </span>
        </div>
      </BaseCard>

      <!-- AWS Fargate Golden Path -->
      <BaseCard
        @click="showAwsFargateGoldenPath = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          ECS Fargate Golden Path + Resilience Scenarios
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/ecs.svg" alt="ECR" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/fargate.svg" alt="SSM" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/code-deploy.svg" alt="ECS" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/alb.svg" alt="ALB" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/cloudwatch.svg" alt="CloudWatch" class="w-8 h-8 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Containers</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Fargate</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Observability</span
          ><span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CDK</span
          >
        </div>
      </BaseCard>

      <BaseCard
        @click="showAwsGitopsGP = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Enterprise EKS Multi-Tier Application with GitOps
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/eks.svg" alt="EKS" class="w-8 h-8 rounded-md" />

          <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/helm2.png" alt="Helm" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/prometheus.png"
            alt="Prometheus"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            GitOps
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Kubernetes
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Monitoring
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            IaC
          </span>
        </div>
      </BaseCard>

      <BaseCard
        @click="showToolingProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Terraform-AWS DevOps Toolchain SonarQube & LaunchDarkly
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <!-- Update icon paths to match your assets -->
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img src="/images/project-icons/csharp.png" alt="Csharp Icon" class="w-8 h-8" />
          <img
            src="/images/project-icons/github-actions.svg"
            alt="GitHub Actions Icon"
            class="w-8 h-8"
          />
          <img
            src="/images/project-icons/launchdarkly.svg"
            alt="LaunchDarkly Icon"
            class="w-8 h-8"
          /><img src="/images/project-icons/sonarqube.png" alt="SonarQube Icon" class="h-8" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Terraform</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >AWS</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CI/CD</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Tooling</span
          >
        </div>
      </BaseCard>

      <BaseCard
        @click="showPilotLightDR = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">E-commerce Pilot Light Disaster Recovery</h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          /><img src="/images/aws-icons/alb.svg" alt="ALB Icon" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/rds.svg" alt="RDS Icon" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/route53.svg" alt="Route 53 Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/step-functions.svg"
            alt="Step Functions Icon"
            class="w-8 h-8 rounded-md"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Pilot Light
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Cross-Region DR
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Auto Failover
          </span>
        </div>
      </BaseCard>

      <BaseCard
        @click="showK3sGitops = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-green-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Raspberry Pi k3s GitOps Platform with Observability (In Progress)
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img
            src="/images/project-icons/raspberry-pi.svg"
            alt="Raspberry Pi"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/main-tools/terraform.svg" alt="Terraform" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/k3s.svg" alt="k3s" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/argocd.svg" alt="ArgoCD" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/helm2.png" alt="Helm" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/prometheus.png"
            alt="Prometheus"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-8 h-8 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            GitOps
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Kubernetes (k3s)
          </span>

          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Raspberry Pi
          </span>
        </div>
      </BaseCard>

      <!-- Full-Stack Blog on Raspberry Pi with Docker & AWS S3
      <BaseCard
        @click="showPrismaModal = true"
        class="relative rounded-xl p-4 shadow space-y-2 border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Full-Stack Blog CI/CD on AWS & Raspberry Pi - With Jenkins
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          <img src="/images/main-tools/raspberry-pi.svg" alt="Raspberry Pi Icon" class="w-8 h-8" />
          <img src="/images/main-tools/aws-icon2.png" alt="AWS S3 Icon" class="w-8 h-8" />
          <img src="/images/project-icons/react-2.svg" alt="React Icon" class="w-8 h-8" />
          <img src="/images/project-icons/expressjs.png" alt="Express Icon" class="h-8" />
          <img src="/images/project-icons/jenkins.svg" alt="Jenkins Icon" class="h-8" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Full-Stack</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Docker</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >AWS</span
          ><span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Automation</span
          >
        </div>
      </BaseCard> -->

      <!-- Executing a Database Migration to AWS with Terraform -->
      <!-- <BaseCard
        @click="showAwsProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Executing a Database Migration to AWS with Terraform
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />

          <img src="/images/project-icons/postgresqlSVG.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/aws-icons/rds.svg" alt="RDS Icon" class="w-8 h-8 rounded-md" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >AWS</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >IaC</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Migration</span
          >
        </div>
      </BaseCard> -->

      <BaseCard
        @click="showAzureContainerAppsProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Azure Container Apps Pipeline - IaC + Jenkins CI/CD (In Progress)
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/project-icons/jenkins.svg" alt="Jenkins Icon" class="w-8 h-8" />
          <img
            src="/images/project-icons/worker-container-app.svg"
            alt="Azure Container Apps Icon"
            class="w-8 h-8"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Azure</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Serverless</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CI/CD</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >IaC</span
          >
        </div>
      </BaseCard>

      <!-- SOC Lab: Wazuh + ELK on VMware -->
      <BaseCard
        @click="showWazuhLabProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          SOC Lab: Wazuh + ELK on VMware with Ansible
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/project-icons/wazuh-icon.png" alt="Wazuh" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/elastic.png" alt="Elastic" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/logstash.png" alt="Linux" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/kibana.png" alt="Windows" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/vmware.svg" alt="VMware" class="w-8 h-8 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >VMware</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >SIEM</span
          >

          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Automation</span
          >
        </div>
      </BaseCard>

      <!-- Deploying Dynatrace Monitoring Agents in Azure -->
      <BaseCard
        @click="showDynatraceProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Deploying Dynatrace & Azure Monitoring Agents in Azure
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace Icon" class="w-8 h-8" />
          <img src="/images/project-icons/azure-vm.png" alt="Azure VM Icon" class="w-8 h-8" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Azure</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Monitoring</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Automation</span
          >
        </div>
      </BaseCard>

      <!-- Automating VMware Monitoring and Alerting with Ansible -->
      <BaseCard
        @click="showVmwareProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Automating VMware Monitoring and Alerting with Ansible
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/vmware.svg" alt="VMware Icon" class="w-8 h-8" />
          <img src="/images/main-tools/ansible.svg" alt="Ansible Icon" class="w-8 h-8" />
          <img src="/images/project-icons/ubuntu.svg" alt="Ubuntu Icon" class="w-8 h-8" />
          <img src="/images/project-icons/prometheus.png" alt="Prometheus Icon" class="w-8 h-8" />
          <img src="/images/project-icons/grafana.png" alt="Grafana Icon" class="w-8 h-8" />
          <img src="/images/project-icons/splunk2.png" alt="Grafana Icon" class="h-8" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >VMware</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Automation</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Monitoring</span
          >
        </div>
      </BaseCard>

      <!-- Deploying a Containerized Backend API on a Raspberry Pi -->
      <BaseCard
        @click="showRaspberry = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Github actions CI/CD Backend API on a Raspberry Pi & Docker
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />

          <img src="/images/main-tools/raspberry-pi.svg" alt="Raspberry Pi Icon" class="w-8 h-8" />
          <img src="/images/project-icons/postgresqlSVG.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/project-icons/expressjs.png" alt="Express Icon" class="h-8" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Docker</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Backend</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CI/CD</span
          >
        </div>
      </BaseCard>

      <!-- BaseCard: Amazon Managed Grafana + Okta (CDK) -->
      <BaseCard
        @click="showAwsAmgOktaCdk = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">Amazon Managed Grafana + Okta (CDK)</h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS" class="w-8 h-8 rounded-md" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/project-icons/grafana.png"
            alt="Amazon Managed Grafana"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/project-icons/okta-logo.svg" alt="Okta" class="h-4 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Observability</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >SSO</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CDK</span
          >
        </div>
      </BaseCard>

      <BaseCard class="bg-gray-800 p-4 rounded-md border-2 border-slate-500 text-gray-400">
        <h3 class="text-md font-bold mb-3">More to edit when I get a chance</h3>
        <p class="text-sm"></p>
      </BaseCard>
    </div>

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
    <Project-Bedrock-Landingzone
      :visible="showBedrockLandingzone"
      @close="showBedrockLandingzone = false"
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

    <DynatraceModal
      :visible="showDynatraceProject"
      @close="showDynatraceProject = false"
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DynatraceModal from '../components/modals/Project-Dynatrace.vue'
import AwsMigrationModal from '../components/modals/Project-Migration.vue'
import AzureHubSpokeModal from '../components/modals/Project-Azure-Hub.vue'
import VmwareMonitoringModal from '../components/modals/Project-VMware-Ansible.vue'
import RaspberryPiModal from '../components/modals/Project-Raspberry.vue'
import PrismaModal from '../components/modals/Project-Prisma.vue'
import ProjectMultiregion from '../components/modals/Project-Multiregion.vue'
import WazuhSOClab from '../components/modals/Projects-Wazuh.vue'
import HtbModal from '../components/modals/HackTheBox.vue'
import DeveloperTooling from '../components/modals/Project-Tooling.vue'
import ProjectDRbackup from '@/components/modals/Project-DRbackup.vue'
import ProjectLambdaSqsDlq from '@/components/modals/Project-LambdaSQSDLQ.vue'
import ProjectBedrockLandingzone from '@/components/modals/Project-Bedrock-Landingzone.vue'
import ProjectFargateGoldenPath from '@/components/modals/Project-FargateGoldenPath.vue'
import ProjectPilotLight from '@/components/modals/Project-Pilot-Light.vue'
import ProjectEKSGitopsGP from '@/components/modals/Project-EKS-Gitops-GP.vue'
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
