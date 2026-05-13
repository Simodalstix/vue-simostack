export const projects = [
  {
    id: 'packer-ami',
    label: 'Packer AMI Pipeline',
    tags: ['Packer', 'Bash', 'SSM', 'EC2', 'ASG'],

    thing: `A two-layer AMI baking pipeline that produces versioned, hardened, tested machine images. Eliminates configuration drift at launch — the ASG always starts from a known-good image with no runtime installs.`,

    point: `SSM Parameter Store as the config bus between pipeline stages. The base build writes its AMI ID to a parameter. The app build reads that parameter as its source — no hardcoded IDs anywhere. The ASG reads the app AMI ID from Parameter Store on every deploy. Downstream infrastructure never needs to change when a new image is built.`,

    anchors: [
      'Two layers: base (OS hardening, CW agent, SSH config) → app (runtime, service binary, systemd unit)',
      'Base build ~10-15 min on t3.small, ephemeral builder — launches, provisions, AMIs, terminates',
      'verify_build.sh runs inside builder before AMI is sealed — PASS/FAIL smoke test, bad builds fail fast',
      'Retention: keep 3 most recent + always protect whatever AMI the running ASG currently points to',
      'Sysctl hardening step failed in builder environment — some kernel params not writable in Packer — traced, fixed',
      'Direct connection to DR: pre-baked AMI in DR region = ASG scale-out is fast, no bootstrap lag',
    ],

    code: [
      {
        label: 'SSM config bus — base build writes, app build reads',
        lang: 'hcl',
        snippet: `# base template — writes AMI ID after successful build
post-processor "shell-local" {
  inline = [
    "aws ssm put-parameter --name /ops-lab/images/base-ami-id --value {{ build \`amazon-ebs.base\` \\"id\\" }} --type String --overwrite"
  ]
}

# app template — reads base AMI ID as source
source "amazon-ebs" "app" {
  source_ami    = "{{ ssm \\"/ops-lab/images/base-ami-id\\" }}"
  instance_type = "t3.small"
}`,
      },
      {
        label: 'verify_build.sh — smoke test before AMI is sealed',
        lang: 'bash',
        snippet: `#!/usr/bin/env bash
set -euo pipefail

check() {
  local name=$1; shift
  if "$@" &>/dev/null; then
    echo "PASS  $name"
  else
    echo "FAIL  $name" >&2; exit 1
  fi
}

check "cloudwatch-agent"  systemctl is-active amazon-cloudwatch-agent
check "app-service"       systemctl is-active myapp
check "health-endpoint"   curl -sf http://localhost:8080/health
echo "All checks passed — AMI build approved"`,
      },
    ],

    probes: [
      { q: 'Why SSM Parameter Store instead of hardcoding the AMI ID?', a: 'Downstream infrastructure never needs to change when a new image is built. The ASG reads the parameter at deploy time — rebuild the image and the whole stack picks it up automatically. Same principle as not hardcoding container image tags.' },
      { q: 'What does verify_build.sh actually protect against?', a: 'A broken image being sealed and pushed to production. Without it, a failed service install produces an AMI that launches, passes EC2 health checks, and serves traffic — until the app layer fails. Fail fast at build time, not at 3am.' },
      { q: 'How does this connect to your DR setup?', a: 'The Pilot Light DR region has an ASG at 0 with the app AMI ID in Parameter Store. On failover, scale ASG desired to N — instances launch from a pre-baked, tested image immediately. No bootstrap lag, no runtime installs, predictable RTO.' },
    ],
  },

  {
    id: 'pilot-light-dr',
    label: 'Pilot Light DR',
    tags: ['Route 53', 'RDS', 'ASG', 'CDK', 'Multi-region'],

    thing: `A cross-region disaster recovery setup between ap-southeast-2 (Sydney) and ap-southeast-4 (Melbourne). Minimal infrastructure warm in the DR region — RDS read replica running, compute at zero, traffic flips on health check failure.`,

    point: `The RTO/RPO tradeoff made explicit in code. Running a read replica continuously costs money but gives async replication lag of seconds rather than hours from a snapshot restore. The ASG at 0 means no ongoing compute cost — the tradeoff is the ~5 minute scale-out time vs warm standby. That's a conscious choice, not an oversight.`,

    anchors: [
      'Primary: ap-southeast-2. DR: ap-southeast-4',
      'RDS read replica running continuously — async replication, promotable on failover',
      'ASG at 0 in DR — ALB and target group pre-configured, instances launch on failover',
      'Route 53 health check on primary ALB — failure triggers failover record',
      'Recovery sequence: promote replica (~minutes, breaks replication) → scale ASG → DNS TTL expires',
      'RTO: 15-30 minutes. RPO: seconds to minutes (async replication lag)',
      'Pilot Light vs Warm Standby: lower cost, slightly higher RTO — right tradeoff for this workload',
      'Pre-baked AMI in DR region (Packer pipeline) — ASG scale-out uses known-good image immediately',
    ],

    code: [
      {
        label: 'Route 53 failover records — primary + DR',
        lang: 'python',
        snippet: `# Primary record with health check
primary = route53.ARecord(self, "Primary",
    zone=zone,
    record_name="api",
    target=route53.RecordTarget.from_alias(
        targets.LoadBalancerTarget(primary_alb)
    ),
)
cfn_primary = primary.node.default_child
cfn_primary.failover = "PRIMARY"
cfn_primary.health_check_id = health_check.ref
cfn_primary.set_identifier = "primary"

# DR failover record
dr = route53.ARecord(self, "DR",
    zone=zone,
    record_name="api",
    target=route53.RecordTarget.from_alias(
        targets.LoadBalancerTarget(dr_alb)
    ),
)
cfn_dr = dr.node.default_child
cfn_dr.failover = "SECONDARY"
cfn_dr.set_identifier = "dr"`,
      },
    ],

    probes: [
      { q: 'What is the difference between Pilot Light and Warm Standby?', a: 'Pilot Light: minimal infra warm (replica + ALB), compute at zero, scale out on failover. RTO 15-30 min. Warm Standby: scaled-down but running stack, scale up on failover. RTO minutes. Higher cost, lower RTO. Choose based on what the workload justifies.' },
      { q: 'Why keep the read replica running rather than restoring from a snapshot?', a: 'Async replication gives RPO of seconds to minutes — snapshot restore gives RPO of hours. The ongoing cost of a replica is the price of a low RPO. For data-sensitive workloads that is usually worth it.' },
      { q: 'What happens to the read replica during failover?', a: 'Promote it to a standalone primary — takes minutes, breaks replication. From that point it is the source of truth. Once the original primary is recovered you set up replication again in the other direction.' },
      { q: 'Why keep TTL low on the Route 53 failover record?', a: 'High TTL means clients cache the primary record and continue trying to reach it during an outage. 60s TTL bounds the propagation delay — after the health check fails and the failover record activates, clients get the DR endpoint within 60 seconds.' },
    ],
  },

  {
    id: 'cdk-landing-zone',
    label: 'CDK Landing Zone',
    tags: ['CDK', 'Python', 'SCPs', 'IAM', 'Multi-account'],

    thing: `A multi-account AWS organisation structure built with CDK Python, implementing Zero Trust network boundaries and Service Control Policies. Separate accounts for workloads, logging, and security tooling with region-locking SCPs.`,

    point: `SCPs as the hard enforcement layer that IAM cannot override. Even an account root user cannot make API calls outside approved regions. This is the pattern required for Australian Government PROTECTED workloads — sovereignty enforced at the organisation level, not trusted to per-account config.`,

    anchors: [
      'Separate accounts: workload, logging, security — blast radius isolation',
      'SCP denying all API calls outside ap-southeast-2 and ap-southeast-4',
      'SCP evaluation: explicit deny in SCP wins over explicit allow in IAM — always',
      'CDK Python: stacks synthesise to CloudFormation, deployed via changesets',
      'Logging account: centralised CloudTrail + CloudWatch Logs — workload accounts cannot delete',
      'Security account: GuardDuty delegated admin, Security Hub aggregation',
      'L2 constructs used throughout — bucket.grant_read(role) wires IAM automatically',
    ],

    code: [
      {
        label: 'SCP — deny API calls outside approved regions',
        lang: 'python',
        snippet: `import json
from aws_cdk import aws_organizations as org

class RegionLockSCP(Construct):
    def __init__(self, scope, id):
        super().__init__(scope, id)

        org.CfnPolicy(self, "RegionLock",
            name="DenyOutsideApprovedRegions",
            type="SERVICE_CONTROL_POLICY",
            content=json.dumps({
                "Version": "2012-10-17",
                "Statement": [{
                    "Effect": "Deny",
                    "Action": "*",
                    "Resource": "*",
                    "Condition": {
                        "StringNotEquals": {
                            "aws:RequestedRegion": [
                                "ap-southeast-2",
                                "ap-southeast-4"
                            ]
                        }
                    }
                }]
            })
        )`,
      },
      {
        label: 'CDK stack — S3 bucket with KMS + least-privilege grant',
        lang: 'python',
        snippet: `from aws_cdk import (
    Stack, aws_s3 as s3,
    aws_kms as kms, aws_iam as iam,
    RemovalPolicy
)

class LoggingStack(Stack):
    def __init__(self, scope, id, **kwargs):
        super().__init__(scope, id, **kwargs)

        key = kms.Key(self, "LogKey", enable_key_rotation=True)

        bucket = s3.Bucket(self, "Logs",
            encryption=s3.BucketEncryption.KMS,
            encryption_key=key,
            versioned=True,
            removal_policy=RemovalPolicy.RETAIN,
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
        )

        # grant read to security account role only
        bucket.grant_read(
            iam.AccountPrincipal(self.node.try_get_context("security_account"))
        )`,
      },
    ],

    probes: [
      { q: 'Why use an SCP rather than just IAM policies for region locking?', a: 'SCP evaluation happens before IAM — an explicit deny in an SCP cannot be overridden by any IAM policy, including root. IAM alone can be misconfigured or overridden by a privileged user. SCP is the organisation-level hard boundary required for sovereignty.' },
      { q: 'What does the CDK L2 construct bucket.grant_read() actually do?', a: 'Generates the IAM policy statements required for read access and attaches them to the principal automatically. No need to write the JSON policy by hand. The construct knows which actions are required for read and scopes them correctly to the resource ARN.' },
      { q: 'Why separate accounts rather than separate VPCs?', a: "Account boundaries are harder than VPC boundaries. A misconfigured SG or route table in a single account can create unintended access paths between VPCs. Separate accounts mean API-level isolation — the workload account physically cannot reach the security account's resources without an explicit cross-account role." },
    ],
  },

  {
    id: 'serverless-pipeline',
    label: 'Serverless Pipeline',
    tags: ['Lambda', 'SQS', 'DynamoDB', 'API Gateway', 'EventBridge'],

    thing: `An event-driven ingestion pipeline: API Gateway receives POST requests, Lambda validates and enqueues to SQS, a second Lambda processes and writes to DynamoDB. Failed messages route to a DLQ and trigger EventBridge alerts.`,

    point: `The DLQ is not a safety net — it is an observability primitive. Any message that exceeds maxReceiveCount lands in the DLQ, triggering an EventBridge rule that fires an alert. Nothing disappears silently. The original error is preserved for inspection and replay. An SQS queue without a DLQ is an incident waiting to happen.`,

    anchors: [
      'API Gateway → Lambda (validate + enqueue) → SQS → Lambda (process) → DynamoDB',
      'Visibility timeout on SQS must exceed Lambda max execution time — otherwise reprocessed mid-flight',
      'maxReceiveCount=3 — after 3 failures message moves to DLQ, not retried endlessly',
      'DLQ → EventBridge rule → SNS alert — nothing fails silently',
      'Lambda event source mapping: batch_size=10, bisect_batch_on_error=True — isolates bad messages',
      'DynamoDB on-demand billing — scales to zero between events, right for bursty ingestion',
      'Reflection: 7 Lambda functions for this pipeline was over-applying SRP — cold start surface multiplied, latency increased. 2-3 would have been the right call.',
    ],

    code: [
      {
        label: 'SQS queue with DLQ + Lambda event source mapping',
        lang: 'python',
        snippet: `from aws_cdk import (
    aws_sqs as sqs, aws_lambda as lambda_,
    aws_lambda_event_sources as sources, Duration
)

dlq = sqs.Queue(self, "DLQ",
    retention_period=Duration.days(14)
)

queue = sqs.Queue(self, "Ingestion",
    visibility_timeout=Duration.seconds(300),
    dead_letter_queue=sqs.DeadLetterQueue(
        max_receive_count=3,
        queue=dlq
    )
)

processor = lambda_.Function(self, "Processor", ...)

processor.add_event_source(
    sources.SqsEventSource(queue,
        batch_size=10,
        bisect_batch_on_error=True,
    )
)`,
      },
    ],

    probes: [
      { q: 'What happens if visibility timeout is shorter than Lambda execution time?', a: 'The message becomes visible again before the Lambda finishes processing it — another Lambda picks it up and processes it in parallel. You get duplicate writes. Visibility timeout must exceed max Lambda execution time with headroom.' },
      { q: 'What is bisect_batch_on_error and why does it matter?', a: 'If a batch of 10 messages fails, Lambda splits it into two batches of 5 and retries. This isolates the bad message rather than blocking the entire batch on one poison pill. Without it, one bad message can stall the whole queue.' },
      { q: 'You mentioned over-applying SRP with 7 Lambda functions. What would you do differently?', a: 'Consolidate to 2-3 functions. Each additional Lambda multiplies cold start surface — in a synchronous path that compounds into noticeable latency. SRP is a good principle but serverless has a cost per function boundary. The right abstraction level is the domain operation, not the line of code.' },
    ],
  },

  {
    id: 'ssm-fleet-lab',
    label: 'SSM Fleet Management Lab',
    tags: ['SSM', 'CDK', 'Python', 'Poetry', 'Run Command'],

    thing: `A CDK Python project that provisions a small EC2 fleet and manages it entirely through SSM — no SSH, no exposed ports. Run Command distributes operations across the fleet, Session Manager provides access, Parameter Store holds configuration.`,

    point: `SSM as the production-correct access model. No key pairs, no port 22, no bastion hosts. Every session is logged to CloudTrail. Access is controlled by IAM policy — revoking access is removing a policy, not rotating keys. This is how AWS expects production fleets to be managed, and it is what this role will operate at scale.`,

    anchors: [
      'No port 22 anywhere — all access via SSM Session Manager',
      'SSM Run Command: send shell commands to fleet by tag, no SSH needed',
      'AmazonSSMManagedInstanceCore policy: minimum required for SSM + Parameter Store + Logs',
      'Poetry for dependency management — pyproject.toml, lockfile, reproducible builds',
      'CDK Python stack provisions fleet + IAM roles + SSM documents',
      'Sessions logged to CloudTrail — who accessed what instance and when',
      'Parameter Store as config distribution: aws ssm get-parameter at boot, no hardcoded config',
    ],

    code: [
      {
        label: 'CDK — EC2 instance with SSM role, no key pair',
        lang: 'python',
        snippet: `from aws_cdk import (
    aws_ec2 as ec2, aws_iam as iam
)

role = iam.Role(self, "InstanceRole",
    assumed_by=iam.ServicePrincipal("ec2.amazonaws.com"),
    managed_policies=[
        iam.ManagedPolicy.from_aws_managed_policy_name(
            "AmazonSSMManagedInstanceCore"
        )
    ]
)

instance = ec2.Instance(self, "FleetNode",
    instance_type=ec2.InstanceType.of(
        ec2.InstanceClass.T3, ec2.InstanceSize.MICRO
    ),
    machine_image=ec2.MachineImage.latest_amazon_linux2(),
    vpc=vpc,
    role=role,
    # no key_name — access via SSM only
)`,
      },
      {
        label: 'SSM Run Command — distribute operation across tagged fleet',
        lang: 'bash',
        snippet: `# Run a command across all instances tagged Env=prod
aws ssm send-command \\
  --document-name "AWS-RunShellScript" \\
  --targets "Key=tag:Env,Values=prod" \\
  --parameters '{"commands":["systemctl status myapp"]}' \\
  --output text

# Check command results
aws ssm list-command-invocations \\
  --command-id <command-id> \\
  --details \\
  --query 'CommandInvocations[*].[InstanceId,Status,CommandPlugins[0].Output]'`,
      },
    ],

    probes: [
      { q: 'Why SSM over SSH for a production fleet?', a: 'No exposed port 22, no key management, sessions logged to CloudTrail with full audit trail, access controlled by IAM — revoking access is removing a policy. Works in private subnets with no bastion. SSH is operationally expensive and a persistent attack surface.' },
      { q: 'What are the three requirements for SSM Session Manager to work?', a: 'SSM agent running on the instance, IAM role with AmazonSSMManagedInstanceCore attached, and outbound HTTPS (443) to SSM endpoints. No inbound ports required.' },
      { q: 'What is Poetry and why use it over pip?', a: 'Dependency management tool — pyproject.toml defines requirements, poetry.lock pins exact versions for reproducible builds. pip install with a requirements.txt can drift between environments. Poetry guarantees the same dependency tree everywhere.' },
    ],
  },
]
