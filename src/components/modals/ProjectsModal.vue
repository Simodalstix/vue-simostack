<template>
  <BaseModal :visible="visible" @close="$emit('close')"
    ><div class="bg-gray-700 p-3 rounded text-gray-200 relative">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Project 1: Modern layout -->
        <div class="p-4 border border-gray-500 rounded bg-gray-700 text-gray-200">
          <div class="grid grid-cols-[auto_1fr] gap-4 h-full">
            <!-- LEFT COLUMN: 2-wide icon grid -->
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-2 gap-2">
                <img
                  src="/images/project-icons/nodejs.svg"
                  alt="Node.js"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/express.svg"
                  alt="Express"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/dockerSVG.svg"
                  alt="Docker"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/nginxSVG.svg"
                  alt="NGINX"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/raspberry-pi.svg"
                  alt="raspberry-pi"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/github-actions.svg"
                  alt="Github Actions"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/postgresqlSVG.svg"
                  alt="PostgreSQL "
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/duckdns.png"
                  alt="DuckDNS"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
              </div>
              <a
                href="https://github.com/Simodalstix/raspberry-pi-backend"
                target="_blank"
                class="mt-auto self-end text-cyan-400 hover:underline text-xs"
              >
                View on GitHub
              </a>
            </div>

            <!-- RIGHT COLUMN: Description + reflection -->
            <div class="flex flex-col">
              <div class="space-y-2">
                <h3 class="text-white text-md text-center font-semibold">
                  Raspberry Pi Backend with CI/CD & NGINX Proxy
                </h3>
                <div class="space-y-3 text-sm text-gray-300">
                  <p class="text-sm text-gray-300 mt-2">
                    This project powers the blog backend for <strong>this website</strong>, using a
                    Raspberry Pi for a zero-cost, self-hosted deployment. I containerized a Node.js
                    + PostgreSQL API with Docker Compose and configured GitHub Actions to
                    auto-deploy via SSH on every push. To expose the API securely, I set up NGINX
                    Proxy Manager in Docker and routed traffic from
                    <code>api.simostack.com</code> using DuckDNS with Let’s Encrypt SSL. A cron job
                    on the Pi keeps DuckDNS updated with the current IP, so the domain always
                    resolves correctly.
                  </p>

                  <p class="text-sm text-gray-300 mt-2">
                    Persistent volumes ensure data durability, and the whole setup mimics a
                    lightweight cloud deployment. This project was a great way to dive deeper into
                    DNS, SSL, container networking, and CI/CD workflows—while keeping infrastructure
                    simple and cost-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project 2: Refactored layout to match Project 3 -->
        <div class="p-4 border border-gray-500 rounded bg-gray-700 text-gray-200">
          <div class="grid grid-cols-[auto_1fr] gap-4 h-full">
            <!-- LEFT COLUMN: 2-wide icon grid -->
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-2 gap-2">
                <img
                  src="/images/career-pathways/terraform.svg"
                  alt="Terraform"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/aws-icon.svg"
                  alt="AWS Icon"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/VPC.svg"
                  alt="VPC"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/RDS.svg"
                  alt="RDS"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/ec2.svg"
                  alt="EC2"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/postgresqlSVG.svg"
                  alt="postgresqlSVG"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/secretsmanager.svg"
                  alt="ClientVPN"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
              </div>
              <a
                href="https://github.com/Simodalstix/terraform-postgres-rds-migration"
                target="_blank"
                class="mt-auto self-end text-cyan-400 hover:underline text-xs"
              >
                View on GitHub
              </a>
            </div>

            <!-- RIGHT COLUMN: Description + bullets -->
            <div class="flex flex-col">
              <div class="space-y-3">
                <h3 class="text-white text-base text-center font-semibold">
                  Database Migration PostgresSQL to Amazon RDS
                </h3>
                <div class="space-y-3 text-sm text-gray-300">
                  <p>
                    This project focused on a realistic migration scenario: taking a local
                    PostgreSQL database and moving it to the cloud using AWS RDS. I designed the
                    architecture with Terraform, including a VPC with public and private subnets, a
                    Bastion host accessed via SSM Session Manager, and Secrets Manager for secure
                    credential handling — avoiding any exposed ports or direct SSH.
                  </p>
                  <p>
                    The database was staged through S3 and restored using psql, closely mimicking
                    how a secure cloud transition might be handled in production. It gave me
                    practical insight into infrastructure planning, data transfer, and how to
                    combine security best practices with infrastructure-as-code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="p-4 border border-gray-500 rounded bg-gray-700 text-gray-200">
          <div class="grid grid-cols-[auto_1fr] gap-4 h-full">
            <!-- LEFT COLUMN: 2-wide icon grid -->
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-2 gap-2">
                <img
                  src="/images/career-pathways/terraform.svg"
                  alt="terraform"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/aws-icon.svg"
                  alt="AWS Icon"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />

                <img
                  src="/images/project-icons/postgresqlSVG.svg"
                  alt="PostgreSQL"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/Fargate.svg"
                  alt="Fargate"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />

                <img
                  src="/images/project-icons/dockerSVG.svg"
                  alt="Docker"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/nginxSVG.svg"
                  alt="NGINX"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/Python2Snakes.svg"
                  alt="Python"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/github-actions.svg"
                  alt="github actions"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
              </div>
              <a
                href="https://github.com/Simodalstix/terraform-flask-devops-lab"
                target="_blank"
                class="mt-auto self-end text-cyan-400 hover:underline text-xs"
              >
                View on GitHub
              </a>
            </div>

            <!-- RIGHT COLUMN: description + bullets + GitHub -->
            <div class="flex flex-col">
              <div class="space-y-3">
                <h3 class="text-white text-md text-center font-semibold">
                  Containerized Flask API & PostgreSQL Lab
                </h3>
                <div class="space-y-3 text-sm text-gray-300">
                  <p>
                    I created this project to strengthen my grasp of backend architecture and
                    container-based infrastructure. After getting a Flask API running locally, I
                    used Terraform and GitHub Actions to deploy it to AWS Fargate with a secure VPC,
                    IAM permissions, and an Application Load Balancer.
                  </p>
                  <p>
                    The goal was to simulate a real cloud-native environment using Docker, ECS, and
                    infrastructure-as-code. It gave me practical experience with private networking,
                    modular Terraform design, and CI/CD workflows — tying together backend logic
                    with modern deployment practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project 4 -->
        <div class="p-4 border border-gray-500 rounded bg-gray-700 text-gray-200">
          <div class="grid grid-cols-[auto_1fr] gap-4 h-full">
            <!-- LEFT COLUMN: Tight 2-column grid of icons -->
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-2 gap-2 place-items-center">
                <img
                  src="/images/career-pathways/terraform.svg"
                  alt="Terraform"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
                <img
                  src="/images/project-icons/google-cloud.svg"
                  alt="Google"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/gcp/compute_engine.svg"
                  alt="compute engine"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/gcp/secret_manager.svg"
                  alt="Secrets Manager"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/gcp/artifact_registry.svg"
                  alt="artifact registry"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />

                <img
                  src="/images/project-icons/dockerSVG.svg"
                  alt="Docker"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />

                <img
                  src="/images/project-icons/mongodb-icon.svg"
                  alt="MongoDB"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/github-actions.svg"
                  alt="github actions"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                /><img
                  src="/images/project-icons/cloudflare-svgrepo-com.svg"
                  alt="Cloudflare"
                  class="w-10 cursor-pointer rounded-md hover:opacity-80"
                />
              </div>
              <a
                href="https://github.com/Simodalstix/storybooks"
                target="_blank"
                class="mt-auto self-end text-cyan-400 hover:underline text-xs"
              >
                View on GitHub
              </a>
            </div>

            <!-- RIGHT COLUMN: Description + badges + GitHub -->
            <div class="flex flex-col">
              <div class="space-y-3">
                <h3 class="text-white text-base text-center font-semibold">
                  Devops Google-Cloud Atlas MongoDB
                </h3>
                <p class="space-y-3 text-sm text-gray-300">
                  I took a finished app — Storybooks — and used it as a platform to deepen my DevOps
                  skills. Starting with local Docker Compose setup, I then provisioned a full cloud
                  environment using Terraform, including DNS via Cloudflare and a production-ready
                  MongoDB Atlas cluster on GCP.
                </p>

                <p class="text-sm text-gray-300">
                  I created a Makefile to manage staging and production environments, and set up
                  GitHub Actions for CI/CD. This project gave me hands-on experience transforming a
                  legacy app into an infrastructure-as-code setup and automating its deployment
                  using modern CI/CD practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
