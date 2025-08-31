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
        @click="showEnterpriseLandingZone = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          AWS Multi-Account Landing Zone Architecture
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img src="/images/project-icons/python.svg" alt="CDK Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/organizations.svg"
            alt="Organizations Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/transit-gateway.svg"
            alt="Transit Gateway Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/guardduty.svg"
            alt="GuardDuty Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/security-hub.svg"
            alt="Security Hub Icon"
            class="w-8 h-8 rounded-md"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Multi-Account
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Hub-and-Spoke
          </span>
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            Enterprise
          </span>
        </div>
      </BaseCard>

      <!-- AWS DR & Backup Lab -->
      <BaseCard
        @click="showAwsDrBackupLab = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          AWS Disaster Recovery & Backup - Rapid Recovery
        </h3>

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

      <BaseCard
        @click="showAzureContainerApps = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Azure Container Apps – DevOps & Change Control
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img
            src="/images/azure-icons/azure-devops.svg"
            alt="Devops Pipeline Icon"
            class="w-8 h-8"
          />
          <img
            src="/images/azure-icons/worker-container-app.svg"
            alt="Azure Container Apps Icon"
            class="w-8 h-8"
          /><img
            src="/images/azure-icons/key-vault.svg"
            alt="Azure Container Apps Icon"
            class="w-8 h-8"
          /><img
            src="/images/azure-icons/application-insights.svg"
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

      <BaseCard
        @click="showAwsGitopsGP = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">EKS Multi-Tier App – GitOps Pipeline</h3>

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

      <BaseCard
        @click="showPilotLightDR = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          E-commerce Platform Pilot Light Disaster Recovery
        </h3>
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

      <!-- Azure Enterprise Landing Zone - Hub-Spoke Network Architecture -->
      <BaseCard
        @click="showAzureProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Azure Org-Ready Hub-Spoke Landing Zone Architecture
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/azure-icons/firewall.svg" alt="Azure Firewall Icon" class="w-8 h-8" />
          <img src="/images/azure-icons/vnet.svg" alt="Azure VNet Icon" class="w-8 h-8" />
          <img src="/images/azure-icons/key-vault.svg" alt="Azure Key Vault Icon" class="w-8 h-8" />
          <img
            src="/images/azure-icons/azure-vpn.png"
            alt="Azure VPN Gateway Icon"
            class="w-8 h-8"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Azure</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Enterprise</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Landing Zone</span
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
      <BaseCard
        @click="showObservabilityPlatform = true"
        class="relative cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          AWS Monitoring & Observability Platform Architecture
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img
            src="/images/project-icons/python.svg"
            alt="Python Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/cloudwatch.svg"
            alt="CloudWatch Icon"
            class="w-8 h-8 rounded-md"
          />
          <img
            src="/images/aws-icons/eventbridge.svg"
            alt="EventBridge Icon"
            class="w-8 h-8 rounded-md"
          />
          <img src="/images/aws-icons/sns.svg" alt="SNS Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/step-functions.svg"
            alt="Step Functions Icon"
            class="w-8 h-8 rounded-md"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Serverless</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Enterprise</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Cost Monitoring</span
          >
        </div>
      </BaseCard>

      <!-- Spring PetClinic Jenkins CI/CD -->
      <BaseCard
        @click="showJavaMavernJenkins = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Java Spring PetClinic with Jenkins CI/CD Pipeline
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/project-icons/java.svg" alt="Java Icon" class="w-8 h-8" />
          <img src="/images/project-icons/spring.svg" alt="Spring Boot Icon" class="w-8 h-8" />
          <img src="/images/project-icons/maven.svg" alt="Maven Icon" class="w-8 h-8" />
          <img src="/images/project-icons/jenkins.svg" alt="Jenkins Icon" class="w-8 h-8" />
          <img src="/images/project-icons/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          <img src="/images/project-icons/postgres.svg" alt="PostgreSQL Icon" class="w-8 h-8" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >CI/CD</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >DevOps</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Containerization</span
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
          <img src="/images/azure-icons/azure-vm.svg" alt="Azure VM Icon" class="w-8 h-8" />
          <img src="/images/azure-icons/monitor.svg" alt="Azure Monitor Icon" class="w-8 h-8" />
          <img
            src="/images/azure-icons/log-analytics-workspaces.svg"
            alt="Log workspace Icon"
            class="w-8 h-8"
          />
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

      <!-- Executing a Database Migration to AWS with Terraform -->
      <BaseCard
        @click="showAwsProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Executing a Database Migration to AWS with Terraform
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />

          <img src="/images/project-icons/postgres.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/aws-icons/rds.svg" alt="RDS Icon" class="w-8 h-8 rounded-md" />
          <img src="/images/aws-icons/ec2.svg" alt="EC2 Icon" class="w-8 h-8 rounded-md" />
          <img
            src="/images/aws-icons/secrets-manager.svg"
            alt="Secrets Manager Icon"
            class="w-8 h-8 rounded-md"
          />
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
      </BaseCard>
      <BaseCard
        @click="showJavaGradleJenkins = true"
        class="relative cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          E-Commerce Microservices Mall – Jenkins CI/CD & Kubernetes
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/project-icons/java.svg" alt="Java Icon" class="w-8 h-8" />
          <img src="/images/project-icons/spring.svg" alt="Spring Boot Icon" class="w-8 h-8" />
          <img src="/images/project-icons/gradle.svg" alt="Gradle Icon" class="w-8 h-8" />
          <img src="/images/project-icons/jenkins.svg" alt="Jenkins Icon" class="w-8 h-8" />
          <img src="/images/project-icons/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          <img src="/images/project-icons/kubernetes.svg" alt="Kubernetes Icon" class="w-8 h-8" />
          <img src="/images/project-icons/mysql.svg" alt="MySQL Icon" class="w-8 h-8" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Microservices</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >DevOps</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Enterprise Scale</span
          >
        </div>
      </BaseCard>

      <!-- Java RabbitMQ AKS -->
      <BaseCard
        class="relative cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
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

        <h3 class="text-lg font-bold text-white mb-3">
          Cloud-Native Java + RabbitMQ on AKS (<span class="text-orange-300 font-semibold">
            Needs Write-up </span
          >)
        </h3>

        <div class="flex items-center gap-3 mb-3">
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

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Microservices</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Messaging</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Kubernetes</span
          >
        </div>
      </BaseCard>

      <BaseCard
        @click="showDocumentAnalyzer = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          AWS AI Document Analyzer – Textract & Claude
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img
            src="/images/project-icons/type-script.svg"
            alt="Type Script"
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

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Serverless</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >OCR</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >AI</span
          ><span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Event Driven</span
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
          <img src="/images/main-tools/raspberry-pi.svg" alt="Raspberry Pi Icon" class="w-8 h-8" />
          <img src="/images/project-icons/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />

          <img src="/images/project-icons/postgres.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/project-icons/express.svg" alt="Express Icon" class="h-8" />
          <img src="/images/project-icons/nginx.svg" alt="NGINX Icon" class="h-8" />
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

      <BaseCard
        @click="showK3sGitops = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          Raspberry Pi k3s GitOps Platform with Observability (<span
            class="text-purple-400 font-semibold"
          >
            In Progress </span
          >)
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

      <!-- Azure AKS GitOps Platform -->
      <BaseCard
        class="relative cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
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

        <h3 class="text-lg font-bold text-white mb-3">
          Azure AKS GitOps Platform – Kubernetes (<span class="text-purple-400 font-semibold">
            In Progress </span
          >)
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/azure-icon.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />
          <img src="/images/azure-icons/aks.svg" alt="Azure AKS Icon" class="w-8 h-8" />
          <img src="/images/project-icons/argocd.svg" alt="ArgoCD Icon" class="w-8 h-8" />
          <img src="/images/project-icons/nginx.svg" alt="NGINX Icon" class="w-8 h-8" />
          <img src="/images/azure-icons/key-vault.svg" alt="Azure Key Vault Icon" class="w-8 h-8" />
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >AKS</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >GitOps</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Platform</span
          >
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
          <img src="/images/main-tools/aws-icon2.png" alt="AWS Icon" class="w-8 h-8" />
          <img src="/images/main-tools/terraform.svg" alt="Terraform Icon" class="w-8 h-8" />

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

      <!-- SOC Lab: Wazuh + ELK on VMware -->
      <!-- <BaseCard
        @click="showWazuhLabProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          SOC Lab: Wazuh + ELK on VMware with Ansible
        </h3>

        <div class="flex items-center gap-3 mb-3">
          <img src="/images/main-tools/vmware.svg" alt="VMware" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/ansible.svg" alt="Ansible" class="w-8 h-8 rounded-md" />
          <img src="/images/project-icons/wazuh-icon.png" alt="Wazuh" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/elastic.png" alt="Elastic" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/logstash.png" alt="Linux" class="w-8 h-8 rounded-md" />
          <img src="/images/main-tools/kibana.png" alt="Windows" class="w-8 h-8 rounded-md" />
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
      </BaseCard> -->

      <!-- Automating VMware Monitoring and Alerting with Ansible -->
      <!-- <BaseCard
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

      <BaseCard
        @click="showTicketDeskProject = true"
        class="cursor-pointer p-4 rounded-xl border-2 bg-slate-700 border-slate-500 hover:bg-indigo-800 transition-all duration-300"
      >
        <h3 class="text-lg font-bold text-white mb-3">
          TicketDesk API - ASP.NET Core 8 with Full Observability
        </h3>
        <div class="flex items-center gap-3 mb-3">
          <img src="/images/azure-icons/azure.svg" alt="Azure Icon" class="w-8 h-8" />
          <img src="/images/project-icons/dotnet.svg" alt=".NET Icon" class="w-8 h-8" />
          <img src="/images/project-icons/csharp.svg" alt="C# Icon" class="w-8 h-8" />
          <img src="/images/project-icons/postgres.svg" alt="PostgreSQL Icon" class="w-8 h-8" />
          <img src="/images/project-icons/docker-mark-blue.svg" alt="Docker Icon" class="w-8 h-8" />
          <img
            src="/images/project-icons/github-actions.svg"
            alt="GitHub Actions Icon"
            class="w-8 h-8"
          />

          <img src="/images/project-icons/prometheus.svg" alt="Prometheus Icon" class="w-8 h-8" />
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Clean Architecture</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Production Ready</span
          >
          <span class="bg-gray-800/60 text-gray-200 text-xs font-semibold px-2 py-0.5 rounded-full"
            >Enterprise Grade</span
          >
        </div>
      </BaseCard> -->

      <BaseCard class="bg-gray-800 p-4 rounded-md border-2 border-slate-500 text-gray-400">
        <h3 class="text-md font-bold mb-3">More to edit when I get a chance</h3>
        <p class="text-sm"></p>
      </BaseCard>
    </div>

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
import ProjectEKSGitopsGP from '@/components/modals/Project-EKSGitopsGP.vue'
import ProjectAzureContainerApps from '@/components/modals/Project-Azure-ContainerApps.vue'
import ProjectDocumentAnalyzer from '@/components/modals/Project-Document-Analyzer.vue'
import ProjectJavaMavernJenkins from '@/components/modals/Project-JavaMavernJenkins.vue'
import ProjectEnterpriseLandingZone from '@/components/modals/Project-EnterpriseLandingZone.vue'
// import ProjectJavaRabbitMQ from '@/components/modals/Project-JavaRabbitMQ.vue'
import ProjectAksGitopsProject from '@/components/modals/Project-AzureAKSGitops.vue'
import ProjectObservabilityPlatform from '@/components/modals/Project-ObservabilityPlatform.vue'
import ProjectJavaGradleJenkins from '@/components/modals/Project-JavaGradleJenkins.vue'
const showJavaGradleJenkins = ref(false)
const showObservabilityPlatform = ref(false)
const showAksGitopsProject = ref(false)
const showJavaRabbitMQ = ref(false)
const showEnterpriseLandingZone = ref(false)
const showJavaMavernJenkins = ref(false)
const showDocumentAnalyzer = ref(false)
const showAzureContainerApps = ref(false)

const showK3sGitops = ref(false)
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
