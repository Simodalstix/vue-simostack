export const projects = [

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Ops-Lab Platform — the big picture
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'ops-lab-platform',
    label: 'Ops-Lab Platform',
    tags: ['CDK Python', 'SSM', 'Packer', 'Puppet', 'CloudWatch', 'Multi-project'],
    summary: 'Five CDK Python stacks deployed in sequence — networking, observability, image pipeline, 3-tier app, and config management. SSM Parameter Store acts as the config bus between all of them: every stack writes its outputs and reads upstream outputs via /ops-lab/* so no ARN is hardcoded anywhere. This platform is the foundation everything else in this loop is built on.',
    sections: [
      {
        type: 'flow',
        span: 2,
        heading: 'Deployment Order — 5 Projects, 4 Tiers',
        steps: [
          { label: 'aws-ops-networking',     sub: 'VPC 10.0.0.0/16, 3 AZs, public + isolated + private subnets, SSM SG' },
          { label: 'aws-ops-observability',  sub: 'SNS alert topic, CW agent config template, OpsLabDashboard' },
          { label: 'aws-image-pipeline',     sub: 'Packer base AMI → app AMI, CodeBuild, lifecycle management' },
          { label: 'aws-3tier-platform',     sub: 'ALB + ASG + RDS PostgreSQL + ElastiCache Redis, FIS experiments' },
          { label: 'aws-config-mgmt-lab',    sub: 'Puppet (masterless), AWS Config rules, auto-remediation' },
        ],
      },
      {
        type: 'code',
        span: 1,
        heading: 'SSM Parameter Bus — /ops-lab/* hierarchy',
        label: 'no ARN is hardcoded in any stack — everything is read at deploy time from Parameter Store',
        snippet:
`# Every project writes its outputs and reads upstream outputs via this hierarchy.
# Stacks are loosely coupled: networking has no idea 3tier exists.

/ops-lab/
  networking/              # aws-ops-networking writes — consumed by everything above it
    vpc-id
    subnet/public-{0,1,2}    # Packer builders + ALB
    subnet/isolated-{0,1,2}  # RDS + ElastiCache (no egress)
    ssm-sg-id                # shared SG: outbound-only to SSM endpoints

  shared/                  # aws-ops-observability writes — shared by all workloads
    sns-topic-arn            # one alert destination for the whole platform
    cloudwatch-write-policy-arn
    cw-agent-config          # JSON template with __LOG_GROUP__ placeholder

  images/                  # aws-image-pipeline writes — consumed by 3tier ASG
    base-ami-id
    base-ami-version         # YYYYMMDD-hhmm
    app-ami-id               # ← 3tier AppTierStack reads this at launch template creation
    app-ami-version

  3tier/                   # aws-3tier-platform writes — consumed by config-mgmt + ops scripts
    alb-dns-name
    rds-endpoint
    rds-secret-arn
    elasticache-endpoint
    asg-name

  config/                  # aws-config-mgmt-lab writes
    puppet-state-association-id
    puppet-bucket-name`,
      },
      {
        type: 'stack',
        span: 1,
        items: [
          {
            type: 'kv',
            heading: 'Why SSM as Config Bus',
            rows: [
              { key: 'No hardcoding',       value: 'zero ARNs or endpoints in any CDK stack — everything resolved at deploy time from Parameter Store' },
              { key: 'Loose coupling',       value: 'networking stack has no knowledge of 3tier; 3tier just reads /ops-lab/networking/* and continues' },
              { key: 'Independent deploys',  value: 'rebuild the app AMI → publish new ID → 3tier ASG picks it up on next refresh, nothing else changes' },
              { key: 'Operational bus',      value: 'ops scripts (drain_asg, rds_snapshot, verify_platform) also read from SSM — same source of truth' },
              { key: 'Region-safe',          value: 'parameters are regional — same key paths work in ap-southeast-4 DR region with different values' },
            ],
          },
          {
            type: 'kv',
            heading: 'What Each Project Builds',
            rows: [
              { key: 'networking',      value: 'VPC foundation — subnets, SGs, S3 gateway endpoint. No NAT by default (cost).' },
              { key: 'observability',   value: 'shared SNS topic, CloudWatch agent config template, dashboard, log retention enforcer' },
              { key: 'image-pipeline',  value: 'two-layer Packer AMI factory with CodeBuild, lifecycle management (keep 3 + current)' },
              { key: '3tier-platform',  value: 'URL shortener: FastAPI + RDS PostgreSQL 16 + ElastiCache Redis, FIS chaos experiments' },
              { key: 'config-mgmt-lab', value: 'masterless Puppet via State Manager, 6 AWS Config rules, EventBridge auto-remediation' },
            ],
          },
        ],
      },
      {
        type: 'probes',
        span: 2,
        items: [
          {
            q: 'Why build five separate projects instead of one monolithic CDK app?',
            a: 'Independent lifecycles. Networking never needs to be redeployed when app code changes. The AMI pipeline can rebuild images without touching the platform. Each project can be torn down and rebuilt independently — important for cost control in a lab. SSM decouples them without making them unaware of each other.',
          },
          {
            q: 'What happens if a stack is deployed before its upstream dependency?',
            a: 'The CDK stack will fail to resolve the SSM parameter — it reads at synth time for most parameters. The deployment order is enforced by the parameter hierarchy: if /ops-lab/networking/vpc-id does not exist, the 3tier stacks cannot synthesise. This is a feature, not a bug — it prevents partial deployments.',
          },
          {
            q: 'How does a new project onboard to the platform?',
            a: 'Read the parameters it needs from /ops-lab/networking/* and /ops-lab/shared/*. Write its own outputs to /ops-lab/{project}/*. It inherits the shared SNS topic, CloudWatch policy, agent config, and networking without any coordination with other stacks.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Config Management + Fleet
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'config-management-fleet',
    label: 'Config Management + Fleet',
    tags: ['SSM', 'Puppet', 'State Manager', 'AWS Config', 'EventBridge', 'Hiera'],
    summary: 'SSM replaces SSH as the access layer for the fleet — no bastion, no key pairs, every action audited. Masterless Puppet running on a 30-minute State Manager schedule enforces desired state across all instances: role/profile classification, Hiera for data, convergence that catches and reverts manual drift automatically.',
    sections: [
      {
        type: 'kv',
        span: 1,
        heading: 'SSM — What It Replaces',
        rows: [
          { key: 'SSH / bastion',     value: 'Session Manager — interactive shell into any managed instance, no port 22, no key pairs, session logged to CloudTrail' },
          { key: 'Ad-hoc scripts',    value: 'Run Command — push commands or SSM documents to tagged fleet, results per-instance, no SSH required' },
          { key: 'Cron / scheduled',  value: 'State Manager — associate a document with tagged instances on a schedule. This is how Puppet applies every 30 min.' },
          { key: 'Manual patching',   value: 'Patch Manager — schedule OS patching fleet-wide, maintenance-window aware, no bastion' },
          { key: 'Config discovery',  value: 'Inventory — pull installed packages, running services, network config from all managed instances' },
        ],
      },
      {
        type: 'kv',
        span: 1,
        heading: 'Configuration Management — The Concepts',
        rows: [
          { key: 'Desired State',       value: 'declare what the system should look like — not how to get there. The tool calculates the delta and applies it.' },
          { key: 'Idempotency',         value: 'apply the same manifest 100 times → same result every time. Safe to run continuously on a schedule without side effects.' },
          { key: 'Convergence',         value: 'observe current state → diff against desired → apply delta → repeat. State Manager runs this loop every 30 minutes.' },
          { key: 'Configuration Drift', value: 'someone edits a running instance manually — it diverges from the manifest. Puppet detects and reverts it on the next convergence run.' },
          { key: 'Immutable Infra',     value: 'instead of patching running instances, bake a new AMI and replace them. No drift accumulation, no "works on that one node" problems.' },
          { key: 'Scale',               value: '1 manifest → any number of instances. Tag a new instance and it is automatically picked up by the State Manager association — zero manual config.' },
        ],
      },
      {
        type: 'code',
        span: 1,
        heading: 'Run Command — useful day-to-day',
        label: 'target all Project=ops-lab instances — same tag State Manager uses for the Puppet association',
        snippet:
`# Open a shell into any instance (no SSH, no key pair)
aws ssm start-session --target i-1234567890abcdef0

# Check a service across the whole fleet
aws ssm send-command \\
  --document-name "AWS-RunShellScript" \\
  --targets "Key=tag:Project,Values=ops-lab" \\
  --parameters '{"commands":["systemctl status nginx"]}' \\
  --query 'Command.CommandId' --output text

# Tail a log file from one instance
aws ssm send-command \\
  --document-name "AWS-RunShellScript" \\
  --instance-ids i-1234567890abcdef0 \\
  --parameters '{"commands":["tail -50 /var/log/app/app.log"]}'

# Force Puppet convergence immediately (don't wait 30 min)
aws ssm send-command \\
  --document-name "ops-lab-puppet-apply" \\
  --targets "Key=tag:Project,Values=ops-lab"

# Get results of a command
aws ssm get-command-invocation \\
  --command-id <id> --instance-id <id> \\
  --query '[Status,StandardOutputContent]'`,
      },
      {
        type: 'code',
        span: 1,
        heading: 'Puppet — role/profile pattern',
        label: 'node classified by a custom fact set at launch — no master, no certificates, no CSR signing',
        snippet:
`# site.pp — classify by $facts['role'] written to instance at boot
node default {
  case $facts['role'] {
    'web':  { include role::web  }
    'app':  { include role::app  }
    default { include profile::base }
  }
}

# role::web — what the node IS (composes profiles)
class role::web {
  include profile::base
  include profile::web
}

# profile::base — baseline applied to EVERY instance
class profile::base {
  package { ['htop', 'tree', 'wget']: ensure => present }
  file { '/etc/motd': content => "Managed by Puppet (ops-lab)\\n" }
}

# profile::web — values from Hiera, not hardcoded in the manifest
class profile::web {
  $port = lookup('profile::web::port', Integer, 'first', 80)
  service { 'nginx': ensure => running, enable => true }
}`,
      },
      {
        type: 'kv',
        span: 1,
        heading: 'Puppet: This Setup',
        rows: [
          { key: 'No Puppet Server',   value: 'manifests sync from S3 at run time — nothing to run, patch, or make highly available' },
          { key: 'State Manager',      value: 'association targets Project=ops-lab tag — runs every 30 min, or force immediately with Run Command' },
          { key: 'New instance',       value: 'tag it → auto-picked up by association. No CSR, no cert signing, no waiting.' },
          { key: 'Role fact',          value: '$facts[\'role\'] is written to the instance in user data at launch — site.pp classifies from there' },
          { key: 'Hiera',              value: 'config values (ports, versions, counts) live in YAML per role — change fleet-wide by editing one file, no manifest change' },
          { key: 'vs Puppet Server',   value: 'no PKI overhead, no single point of failure. Trade-off: no real-time catalog compilation or PuppetDB query.' },
        ],
      },
      {
        type: 'bullets',
        span: 1,
        heading: 'AWS Config + Auto-Remediation (supporting layer)',
        items: [
          'IaC defines intended state at deploy time — it does not watch for drift between deployments. Someone opens port 22 in the console right now: Terraform state still says closed.',
          'AWS Config watches the AWS control plane continuously — SG rules, tags, EBS encryption, IAM roles attached. Detects that console change in minutes, not at the next terraform plan.',
          'Non-compliance fires EventBridge → Lambda calls the AWS API to fix it (revoke_security_group_ingress, create_tags). Never touches the instance OS — that is Puppet\'s job.',
          'The split: Puppet enforces state inside the instance. Config enforces state on the AWS resource wrapper around it. IaC prevents drift at deploy time. Config catches drift in between.',
        ],
      },
      {
        type: 'probes',
        span: 2,
        items: [
          {
            q: 'What is configuration management and why does it matter at scale?',
            a: 'Configuration management is the practice of defining what a system should look like in code and having a tool continuously enforce that state. At scale it matters because manual configuration is not repeatable — 50 instances configured by hand over 6 months will drift into 50 different states. CM gives you a single source of truth, automatic drift correction, and onboarding that is just "tag the instance."',
          },
          {
            q: 'Why masterless Puppet instead of a Puppet Server?',
            a: 'No server to run, patch, or make highly available. New instances are automatically picked up by the State Manager tag association — no certificate signing request, no waiting. The convergence loop every 30 minutes gives eventual consistency. For an AWS-native fleet this is simpler and more resilient than a Puppet Server that becomes a single point of failure.',
          },
          {
            q: 'What is the role/profile pattern and why use it?',
            a: 'Role = what the node IS (web server, app server). Profile = what a node DOES (manages nginx, installs base packages). Roles compose profiles. Business intent (role::web) is decoupled from technology implementation (profile::web). Changing how nginx is configured only touches profile::web — every role that includes it picks up the change automatically.',
          },
          {
            q: 'If you are already using IaC, why do you need AWS Config?',
            a: 'IaC defines intended state at deploy time — it does not watch for drift after the fact. Someone opens port 22 in the console right now: the Terraform state file still says it is closed. You would only find the drift the next time someone runs a plan. AWS Config evaluates continuously and on every resource change event, so that console change is caught in minutes. It also covers resources IaC does not own at all — an instance launched manually, an unencrypted volume attached directly in the console. IaC prevents drift at deployment. Config catches drift in between, from any source.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. 3-Tier App + AMI Pipeline
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'three-tier-ami-pipeline',
    label: '3-Tier App + AMI Pipeline',
    tags: ['Packer', 'CDK', 'ASG', 'RDS', 'ElastiCache', 'FIS', 'FastAPI'],
    summary: 'A Packer two-layer AMI bake (base hardening → app runtime) feeds a production-style 3-tier app: ALB fronts an ASG of FastAPI instances backed by RDS PostgreSQL 16 and ElastiCache Redis. A pilot light DR setup in ap-southeast-4 (Melbourne) brings RTO to 15–30 minutes, with Step Functions orchestrating the failover sequence so a half-failed promotion is impossible.',
    sections: [
      {
        type: 'flow',
        span: 2,
        heading: 'AMI Pipeline — Two-Layer Bake',
        steps: [
          { label: 'Packer Base',       sub: 'AL2023 → harden.sh + fail2ban + sysctl + CW agent (~10 min on t3.small)' },
          { label: 'verify_build.sh',   sub: 'PASS/FAIL smoke test before sealing' },
          { label: 'publish_ami.py',    sub: 'writes to /ops-lab/images/base-ami-id' },
          { label: 'Packer App',        sub: 'reads base from SSM → adds Python 3.11 + FastAPI + systemd unit' },
          { label: 'publish_ami.py',    sub: 'writes to /ops-lab/images/app-ami-id' },
          { label: '3-Tier ASG',        sub: 'launch template reads app-ami-id from SSM — no hardcoded value' },
        ],
      },
      {
        type: 'code',
        span: 1,
        heading: 'Packer Templates — base → app',
        label: 'base.pkr.hcl hardens and installs CW agent; app.pkr.hcl reads base AMI ID from SSM',
        snippet:
`# base.pkr.hcl — Layer 1
source "amazon-ebs" "base" {
  source_ami_filter {
    filters     = { name = "al2023-ami-2023*-x86_64" }
    owners      = ["amazon"]
    most_recent = true
  }
  instance_type = "t3.small"
  subnet_id     = var.public_subnet_id  # read from SSM via pkrvars
}

build {
  provisioner "shell" { script = "provisioners/harden.sh" }
  provisioner "shell" { script = "provisioners/install_cw_agent.sh" }
  provisioner "shell" { script = "provisioners/verify_build.sh" }
  post-processor "shell-local" {
    inline = ["python3 scripts/publish_ami.py --layer base"]
  }
}

# app.pkr.hcl — Layer 2 reads base from SSM
source "amazon-ebs" "app" {
  source_ami    = "{{ ssm \\"/ops-lab/images/base-ami-id\\" }}"
  instance_type = "t3.small"
}

build {
  provisioner "shell" { script = "provisioners/install_deps.sh" }  # Python 3.11 + FastAPI
  provisioner "shell" { script = "provisioners/verify_build.sh" }
  post-processor "shell-local" {
    inline = ["python3 scripts/publish_ami.py --layer app"]
  }
}`,
      },
      {
        type: 'stack',
        span: 1,
        items: [
          {
            type: 'kv',
            heading: '3-Tier Architecture',
            rows: [
              { key: 'Presentation', value: 'ALB — internet-facing, public subnets, HTTP :80, health check /health every 30s' },
              { key: 'Application',  value: 'ASG 1–3 × t3.small, FastAPI on :8080, SSM-only access (no port 22, no key pairs)' },
              { key: 'Data',         value: 'RDS PostgreSQL 16 db.t3.micro + ElastiCache Redis cache.t3.micro — isolated subnets, no egress' },
              { key: 'Secrets',      value: 'DB credentials auto-generated to Secrets Manager, fetched by app at boot from SSM' },
              { key: 'Zero hardcoding', value: 'app reads RDS endpoint, Redis endpoint, secret ARN from /ops-lab/3tier/* at instance boot' },
              { key: 'Cost',         value: '~$85/month at minimum — tear down between sessions, spin up in ~15 min' },
            ],
          },
          {
            type: 'kv',
            heading: 'URL Shortener — What It Does',
            rows: [
              { key: 'POST /links',          value: 'create short URL — write RDS, cache Redis 1-hour TTL' },
              { key: 'GET /{code}',          value: 'redirect — cache-aside (Redis first, fallback RDS on miss)' },
              { key: 'GET /links/{code}/stats', value: 'hit count + created_at from RDS' },
              { key: 'GET /health',          value: 'probe DB + Redis — return 503 if either is down (ALB deregisters on failure)' },
              { key: 'Metrics emitted',      value: 'CacheHit, CacheMiss, CacheError, RedirectLatencyMs → OpsLab/3tier namespace' },
              { key: 'FIS experiments',      value: 'AZ failure, instance termination, CPU stress — stop condition: ALB 5xx alarm' },
            ],
          },
          {
            type: 'bullets',
            heading: 'DR — Concise',
            items: [
              'Pilot Light tier: ap-southeast-4 (Melbourne) — RDS read replica running, ASG at desired=0, ALB pre-configured',
              'RTO: 15–30 min. RPO: seconds–minutes (async replication lag vs hours from snapshot restore)',
              'Route 53 health check every 10s on primary ALB — 3 × failure (~30s) activates DR failover record',
              'Failover sequence: promote RDS replica (2–5 min, breaks replication) → scale ASG → DNS TTL (60s) expires',
              'Step Functions orchestrates the sequence: each step is retried independently, visual audit trail, rollback on failure — not a shell script that can half-run',
              'Pre-baked AMI in DR region means ASG scale-out has no bootstrap lag — instance launches fully configured',
            ],
          },
        ],
      },
      {
        type: 'probes',
        span: 1,
        items: [
          {
            q: 'Why two Packer layers instead of one?',
            a: 'Separation of change frequency. The base layer (hardening, CW agent) changes rarely — maybe once a month when a CVE needs patching. The app layer (FastAPI, Python deps) changes every sprint. Splitting them means 95% of app builds complete in ~5 min reusing the cached base, rather than re-running 10+ min of hardening every time.',
          },
          {
            q: 'How does the 3-tier platform update its app AMI without downtime?',
            a: 'publish_ami.py writes the new app-ami-id to SSM. The ASG launch template reads from SSM, so a new launch template version is created pointing at the new AMI. An instance refresh then replaces instances one at a time — ALB drains each instance before termination. No downtime, always serving from either old or new instances.',
          },
          {
            q: 'Why use Step Functions for the DR failover sequence instead of a Lambda or shell script?',
            a: 'Each step in the failover (promote replica, update Route 53, scale ASG, notify) can fail independently. Step Functions retries failed steps, gives a visual audit trail of what happened and when, and stops cleanly rather than leaving the system in a half-failed state. A shell script that dies halfway through a failover is worse than the original outage.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ECS Fargate + Chaos Engineering
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'ecs-fargate-chaos',
    label: 'ECS Fargate + Chaos',
    tags: ['Docker', 'ECS', 'Fargate', 'FIS', 'CloudWatch', 'ECR'],
    summary: 'A containerised FastAPI service on Fargate — no EC2 cluster nodes to manage, task-level IAM roles, awsvpc networking with per-task security groups. The interesting part is the AWS FIS chaos experiments: task termination, CPU stress, and network disruption were run with defined stop conditions, and the auto-scaling policy came from that data rather than a guess.',
    sections: [
      {
        type: 'kv',
        span: 1,
        heading: 'Container vs VM',
        rows: [
          { key: 'What it is',  value: 'process with walls — Linux namespaces isolate visibility, cgroups limit CPU/memory/I/O' },
          { key: 'Startup',     value: 'Container: milliseconds. VM: 30–60 seconds.' },
          { key: 'Overhead',    value: 'Container: ~MB (shares host kernel). VM: ~GB (full OS copy).' },
          { key: 'Isolation',   value: 'Container: process-level. VM: full kernel boundary — stronger, heavier.' },
          { key: 'Portability', value: 'image runs anywhere with a compatible runtime — same on laptop, CI, and prod' },
        ],
      },
      {
        type: 'kv',
        span: 1,
        heading: 'Docker Key Concepts',
        rows: [
          { key: 'image',        value: 'immutable template — layers of filesystem changes, built from Dockerfile' },
          { key: 'container',    value: 'running instance of an image — isolated process, namespaces + cgroups' },
          { key: 'layer cache',  value: 'build-time only — Docker reuses unchanged layers. Deps before code = fast rebuilds.' },
          { key: 'registry',     value: 'ECR / Docker Hub — stores and serves images. Tag = version pointer.' },
          { key: 'health check', value: 'periodic command — container marked unhealthy if it fails; ECS replaces it' },
          { key: 'bind mount',   value: '-v /host:/container — share files without rebuilding image (dev only)' },
        ],
      },
      {
        type: 'code',
        span: 1,
        heading: 'Dockerfile',
        label: 'deps before code — layer cache means pip only re-runs when requirements.txt changes',
        snippet:
`FROM python:3.12-slim           # slim omits build tools — ~200 MB smaller than full image
WORKDIR /app

COPY requirements.txt .         # copy dep manifest first, before any app code
RUN pip install --no-cache-dir -r requirements.txt  # cached until requirements.txt changes

COPY . .                        # code changes here don't bust the pip cache above
EXPOSE 8080                     # metadata only — -p flag is what actually opens the port
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# build — . is the build context sent to the Docker daemon
docker build -t myapp:1.0.0 .
docker images                   # see local images, layer sizes, cache hits`,
      },
      {
        type: 'code',
        span: 1,
        heading: 'Build → Run → Inspect',
        label: 'dev run first, then production flags, then the commands you reach for in an incident',
        snippet:
`# run minimal (dev / smoke test)
docker run -p 8080:8080 myapp:1.0.0

# run production
docker run -d --name myapp -p 8080:8080 \\
  -e DATABASE_URL=postgresql://db:5432/app \\
  -e LOG_LEVEL=info \\
  --memory="512m" --cpus="0.5" \\
  --restart unless-stopped \\
  --health-cmd="curl -sf http://localhost:8080/health || exit 1" \\
  --health-interval=30s \\
  myapp:1.0.0

# inspect
docker ps
docker logs myapp --tail 50 -f
docker exec -it myapp /bin/sh
docker stats myapp`,
      },
      {
        type: 'kv',
        span: 1,
        heading: 'ECS Core Concepts',
        rows: [
          { key: 'Fargate vs EC2', value: 'EC2 launch type: you manage cluster nodes. Fargate: AWS provisions compute — you just define the task.' },
          { key: 'Task Definition', value: 'blueprint — image, CPU/mem, ports, IAM roles, log config. Versioned, immutable.' },
          { key: 'Service',        value: 'controller: runs N tasks, replaces failures, wires to ALB + Auto Scaling' },
          { key: 'Execution Role', value: 'ECS pulls image from ECR, writes logs to CloudWatch on your behalf' },
          { key: 'Task Role',      value: 'what the code inside the container can call — S3, DynamoDB, SSM...' },
          { key: 'awsvpc mode',    value: 'each Fargate task gets its own ENI + private IP — SGs applied per-task' },
        ],
      },
      {
        type: 'bullets',
        span: 1,
        heading: 'Chaos Engineering — AWS FIS',
        items: [
          'Chaos Engineering: inject faults deliberately to find how the system behaves before an incident does',
          'AWS FIS (Fault Injection Simulator): structured experiments with defined scope, duration, and stop conditions',
          'Stop conditions: CloudWatch alarm breach halts the experiment automatically — bounded blast radius',
          'stop-task: terminates a random Fargate task — ECS rescheduled within ~30s. Confirmed RTO target met.',
          '30% CPU stress for 5 min: service held SLA at 40% baseline load, degraded visibly at 70%',
          'Result: auto-scaling trigger set at 60% CPU — data from the experiment, not a guess',
          'Network disruption (100ms latency + 10% loss): retry logic absorbed it, no user-visible errors',
        ],
      },
      {
        type: 'code',
        span: 1,
        heading: 'Task Definition',
        label: 'Fargate, awsvpc, dual IAM roles, CloudWatch logging',
        snippet:
`{
  "family": "app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",  "memory": "512",
  "executionRoleArn": "arn:aws:iam::123456789:role/ecsTaskExecutionRole",
  "taskRoleArn":      "arn:aws:iam::123456789:role/ecsTaskRole",
  "containerDefinitions": [{
    "name": "app",
    "image": "123456789.dkr.ecr.ap-southeast-2.amazonaws.com/app:1.2.0",
    "portMappings": [{ "containerPort": 8080 }],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group":         "/ecs/app",
        "awslogs-region":        "ap-southeast-2",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }]
}`,
      },
      {
        type: 'table',
        span: 1,
        heading: 'FIS Experiments Run',
        cols: ['Experiment', 'Observed', 'Action'],
        rows: [
          { label: 'Stop Task',         vals: ['ECS reschedule ~30s',              'None — confirmed RTO met'] },
          { label: 'CPU Stress 30%',    vals: ['Degraded at 70% baseline load',    'Auto-scale trigger → 60% CPU'] },
          { label: 'Network 100ms+10%', vals: ['Retry logic handled it cleanly',   'No change needed'] },
        ],
      },
      {
        type: 'probes',
        span: 2,
        items: [
          {
            q: 'What is the difference between a task definition and an ECS service?',
            a: 'A task definition is the immutable blueprint — image, CPU, memory, ports, IAM roles. Versioned. An ECS service is the controller that runs N copies, replaces failed tasks, registers with the ALB, and integrates with Auto Scaling. You update the service to point at a new task definition revision to deploy.',
          },
          {
            q: 'What are the two IAM roles in ECS Fargate and why are they separate?',
            a: 'The execution role is used by ECS itself — pull image from ECR, write logs to CloudWatch. The task role is used by the code inside the container — call S3, DynamoDB, SSM. Separating them follows least privilege: the container runtime does not need app permissions and vice versa.',
          },
          {
            q: 'What did the chaos experiments actually tell you that you did not already know?',
            a: 'The CPU stress experiment showed degradation at 70% baseline load — we had assumed 80% was the right auto-scaling trigger. Setting it at 60% came from the experiment data. Without chaos testing we would have shipped a system that degrades under real peak load before scaling kicks in.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Terraform IaC — fundamentals reference card
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'terraform-iac',
    label: 'Terraform IaC',
    tags: ['Terraform', 'HCL', 'S3', 'DynamoDB', 'GitHub Actions'],
    summary: 'A reference card rather than a live stack — Terraform covers the same infrastructure problems as CDK but with a different philosophy: multi-cloud, HCL, and an explicit state file. The point is knowing the tradeoffs between the two tools. Remote state backed by S3 with DynamoDB locking is what makes it safe for a team, and understanding why is the kind of thing that comes up in systems interviews.',
    sections: [
      {
        type: 'kv',
        span: 1,
        heading: 'Building Blocks',
        rows: [
          { key: 'provider', value: 'declares cloud/service target — aws, azurerm, kubernetes' },
          { key: 'resource', value: 'the thing being created — aws_instance, aws_s3_bucket' },
          { key: 'data',     value: 'read existing infra without creating it — look up, don\'t manage' },
          { key: 'variable', value: 'input — parameterise configs for reuse across environments' },
          { key: 'output',   value: 'expose values from a module or stack for other modules to consume' },
          { key: 'module',   value: 'reusable collection of resources — build once, compose, not copy' },
          { key: 'state',    value: 'terraform.tfstate — source of truth between Terraform and AWS. Never edit manually.' },
        ],
      },
      {
        type: 'code',
        span: 1,
        heading: 'Workflow + Remote State',
        label: 'commands every day + the S3+DynamoDB backend that makes it team-safe',
        snippet:
`terraform init      # download providers, initialise backend
terraform validate  # syntax check — no API calls
terraform plan      # show diff vs state — always read before apply
terraform apply     # execute the plan
terraform state rm <resource>     # remove from state without destroying real resource
terraform import <resource> <id>  # adopt existing resource into state

terraform {
  backend "s3" {
    bucket         = "my-tf-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-southeast-2"
    dynamodb_table = "terraform-locks"  # single-writer lock — prevents concurrent apply corruption
    encrypt        = true               # state holds resource IDs + sometimes secrets in plaintext
  }
}`,
      },
      {
        type: 'table',
        span: 2,
        heading: 'IaC Tool Comparison',
        cols: ['', 'CDK', 'Terraform', 'Ansible'],
        rows: [
          { label: 'What it manages', vals: ['AWS resources',              'Any cloud resources',        'OS config, software install'] },
          { label: 'Language',        vals: ['Python / TypeScript',        'HCL',                        'YAML (playbooks)'] },
          { label: 'Model',           vals: ['Declarative (via CF)',        'Declarative (state file)',   'Procedural (ordered tasks)'] },
          { label: 'State / rollback', vals: ['CloudFormation stack',      'S3 tfstate + manual',        'None — idempotent task design'] },
          { label: 'IAM wiring',      vals: ['L2 constructs auto-wire',    'Explicit resource blocks',   'Not applicable'] },
          { label: 'Soundbite',       vals: ['"AWS-native, real language"', '"Multi-cloud, state-driven"', '"Config management, agentless"'] },
        ],
      },
      {
        type: 'bullets',
        span: 1,
        heading: 'Interview Talking Points',
        items: [
          'Declarative: TF owns the diff — HCL describes end state, TF builds a dependency graph (DAG). Same config applied twice → same outcome.',
          'plan -out in CI freezes the diff so apply executes exactly what was reviewed. Without it there is a race between plan and apply.',
          'S3 stores state, DynamoDB provides a single-writer lock. Two concurrent applies without it → state corruption, no clean rollback.',
          'State drift: plan on untouched code still shows changes if someone edited in the console. Fix: terraform import to adopt it.',
          'for_each over count for lists — count uses numeric index so renaming an item destroys everything after it. for_each uses a stable string key.',
          'State holds secrets in plaintext — restrict the S3 bucket, enable SSE, never commit tfstate to git.',
        ],
      },
      {
        type: 'quotes',
        span: 1,
        heading: 'Speak This Out Loud',
        items: [
          '"plan -out saves the exact plan to a file so CI applies precisely what was reviewed. Without it there is a race condition between plan and apply."',
          '"plan on a clean codebase still shows changes if someone touched the resource manually — that\'s drift, and it\'s how you catch console cowboys."',
          '"state rm removes a resource from state without destroying it — useful when you want Terraform to stop managing something without touching the real resource."',
        ],
      },
      {
        type: 'probes',
        span: 2,
        items: [
          {
            q: 'What is declarative IaC and why does it matter?',
            a: 'You describe the desired end state — not the steps to get there. Terraform builds a dependency graph and determines the correct API call sequence. Same config applied twice produces the same result. Contrast with imperative scripts where idempotency is your problem to solve.',
          },
          {
            q: 'Why does remote state need DynamoDB locking?',
            a: 'Without locking, two engineers running apply simultaneously both read the current state, both make API calls, and both try to write new state — the second write overwrites the first. State is now wrong. DynamoDB provides a single-writer lease that blocks the second apply until the first completes.',
          },
          {
            q: 'When would you choose CDK over Terraform?',
            a: 'CDK for AWS-only stacks where L2 constructs auto-wire IAM (bucket.grant_read() generates the correct policy automatically) and where Python is already the team language. Terraform for multi-cloud or when the team is already HCL-native. CDK state lives in CloudFormation with automatic rollback — Terraform rollback is manual. Never let both own the same resource.',
          },
        ],
      },
    ],
  },
]
