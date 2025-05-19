# Strapi on AWS AppRunner - Setup Guide

## Overview

This guide explains how to deploy your Strapi backend to AWS AppRunner and connect it to an Aurora Serverless database.

---

## Why AppRunner?

- Fully managed container deployment
- HTTPS by default (no manual certificate management)
- Scales automatically
- No server management (you just push a container or a GitHub repo)

---

## Steps

### 1. Containerize Your Strapi App

- Add a `Dockerfile` at your Strapi project root:

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
```

**Important:** Your `npm run start` should start Strapi in production mode.

### 2. Push to ECR (Elastic Container Registry)

- Create a repository in ECR.
- Build and tag your Docker image:

```bash
docker build -t my-strapi-app .
docker tag my-strapi-app:latest [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com/my-strapi-app:latest
```

- Authenticate Docker to your ECR:

```bash
aws ecr get-login-password --region [REGION] | docker login --username AWS --password-stdin [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com
```

- Push your image:

```bash
docker push [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com/my-strapi-app:latest
```

### 3. Deploy to AppRunner

- Open AppRunner in AWS Console.
- Create a service "from container registry".
- Choose your ECR repository and image.
- Set port `1337` (Strapi default).
- Set environment variables from your `.env` (DATABASE_CLIENT, DATABASE_HOST, etc.).
- Adjust service settings (instance size, scaling).

---

## Database Networking: How AppRunner Connects to Aurora

**AppRunner services** live on AWS's managed network, **outside your VPC** by default.

**Aurora Serverless** clusters normally sit **inside a VPC**.

### Solutions:

1. **Publicly Accessible Aurora Cluster** (Simplest for now)

   - Make your Aurora Serverless cluster **public** (toggle "public access" on RDS cluster).
   - Open inbound security group rule for port `5432` from "Anywhere" (0.0.0.0/0) or **tighten** to AppRunner IP ranges later.
   - This allows AppRunner to reach your database over the internet.

2. **Private VPC Connector (Advanced)**
   - AppRunner can attach to your VPC via a VPC Connector.
   - This requires setting up VPC networking and a private DNS resolver.
   - (More complex, better for production later.)

### ✨ TL;DR for your case:

- **Normal for now** to talk over internet.
- **Not weird** for dev projects or low-sensitivity projects.
- **Secure the database** by:
  - Enabling SSL on the connection (DATABASE_SSL=true).
  - Using strong database usernames and passwords.
  - Restricting security group inbound rules as much as possible later.

---

## Do You Need a Domain Name?

**No, not immediately.**

- AppRunner automatically gives you a public HTTPS URL, like:

  `https://random-service-name.us-east-1.awsapprunner.com`

- You can register a custom domain later (e.g., `api.crossflex.com`) and attach it easily.

**Custom domains** are optional, not required.

---

## Final Thoughts

- Deploying Strapi on AppRunner is clean and scalable.
- Talking to Aurora Serverless publicly is normal for early deployments.
- You can tighten security later as you move toward production readiness.

---

## What's Next

- Test the deployed Strapi URL.
- Point your frontend to the new public API endpoint.
- Celebrate 🎉

---

> Written for CrossFlex - The Josh Factory Inc.
