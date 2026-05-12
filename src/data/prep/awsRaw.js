export const awsRaw = [
  {
    heading: 'VPC & NETWORKING',
    prose: `Subnets
• Public subnet — has route to IGW. Instances need public IP or EIP to reach internet.
• Private subnet — no IGW route. Uses NAT Gateway for outbound, unreachable from internet.
• NAT Gateway — AZ-scoped, one per AZ. Never route private traffic across AZs. Outbound-only.

Security Groups vs NACLs
• SG — stateful, instance-level, allow-only rules, return traffic automatic.
• NACL — stateless, subnet-level, allow and deny, both directions must be explicit.
• Missing outbound ephemeral (1024–65535) = SSH or response silently dropped.
• Use SGs for everything. NACLs only for broad subnet-level blocks or explicit deny.

SG best practice
• Scope inbound rules to another SG ID, not 0.0.0.0/0.
• ALB SG → allows 443 from internet.
• EC2 SG → allows app port from ALB SG only.
• RDS SG → allows 5432/3306 from EC2 SG only.
• Never 0.0.0.0/0 on app or DB ports.

DNS
• VPC resolver at 169.254.169.253 — what instances use by default.
• dig @169.254.169.253 hostname — test internal resolution from an instance.
• Private hosted zone — internal DNS names not resolvable externally.`,
  },

  {
    heading: 'COMPUTE & ASG',
    prose: `ASG — the three numbers
• min — floor, ASG never terminates below this. Set to 2+ in production for AZ survival.
• desired — current target. Scaling moves desired within [min, max].
• max — ceiling, protects against runaway scaling and cost. Set based on load test.

Health check type
• EC2 (default) — hardware check only. Broken app on running instance = healthy, never replaced.
• ELB — ASG adopts ALB's verdict. App returning 5xx = unhealthy = replaced.
• Always use ELB health check type for web-facing workloads.

HealthCheckGracePeriod
• Seconds after launch that ASG ignores health check failures.
• Set to actual startup time + buffer — not the default 300s.
• Too short = app still starting, check fires, instance terminated, loop begins.

Lifecycle hooks
• Scale-out → Pending:Wait — bootstrap, fetch secrets, register before traffic.
• Scale-in → Terminating:Wait — drain connections, flush state, ship final logs.
• Must call CompleteLifecycleAction(CONTINUE or ABANDON) or hook times out.
• Critical for log shipping — without it logs on terminating instances are gone.

Scaling policies
• Target tracking — define a metric + target value, AWS manages alarms. Start here.
• Step scaling — tiered CloudWatch alarms, more control, more complexity.
• Cooldown — pause after event, prevents thrash. Default 300s.`,
  },

  {
    heading: 'LOAD BALANCING',
    prose: `ALB — Application Load Balancer
• Operates at L7 (HTTP/HTTPS). Routes by host header, path, query string.
• Terminates TLS — app server receives plain HTTP from ALB.
• Returns 502 when targets not responding. Returns 503 when no healthy targets.

Target group
• Registered instances receive traffic only if passing health checks.
• Health check path must return 2xx — a static 200 from a broken app is worse than 503.
• Deregistration delay (default 300s) — ALB drains in-flight requests before removing target.
• Tune down to 30s for stateless APIs.

Routing algorithms (per target group)
• Round robin (default) — even distribution, works when requests have similar cost.
• Least outstanding requests — routes to target with fewest in-flight. Better for mixed fast/slow APIs.

Sticky sessions
• Pins client to same target via cookie. Avoid — externalise session state to ElastiCache.
• If enabled: partial backend failure looks like user-specific failure.`,
  },

  {
    heading: 'DATABASE & CACHE',
    prose: `RDS
• Multi-AZ — synchronous standby, automatic failover ~60-120s, DNS cutover.
• Standby is NOT queryable — hot spare only, not a Read Replica.
• Read Replica — async replication, queryable, can lag. Used for read offload and DR.
• Promote Read Replica to standalone for Pilot Light failover (breaks replication).
• Encryption must be enabled at creation — cannot enable after.
• Workaround: snapshot → copy encrypted → restore from encrypted snapshot.

RDS Proxy
• Connection pooler between app and RDS.
• Solves connection exhaustion — Lambda → RDS is the canonical problem.
• Failover-aware: proxy endpoint stays stable during Multi-AZ failover (~3s vs ~60s).

ElastiCache
• Redis — persistence, replication, sorted sets. Default choice.
• Memcached — pure cache, multi-threaded, no persistence.
• Cache-aside: app checks cache → miss → read DB → write cache. Cold start = all misses.
• Post-deploy cache miss spike: new instances restart, in-process cache cleared, all fall through to DB.

DAX
• DynamoDB Accelerator — microsecond reads, API-compatible, write-through by default.
• Use for read-heavy DynamoDB workloads. Does not support strongly consistent reads.`,
  },

  {
    heading: 'STORAGE',
    prose: `EBS
• gp2 — burst IOPS from credit bucket. Exhaustion = sudden performance cliff.
• gp3 — provisioned IOPS and throughput, no burst credits. Prefer this.
• Deregistering an AMI does NOT delete its EBS snapshot — separate step, silent billing.
• Never deregister the AMI a running ASG points to — instances can't launch without it.

S3
• Eleven nines durability — data loss is not the risk, access control is.
• Bucket policy + IAM both evaluated — Explicit Deny in either wins.
• Block Public Access is account-level — enable it, override per bucket only when justified.
• Encryption at rest: SSE-S3 (default), SSE-KMS (your key, CloudTrail audit per decryption).`,
  },

  {
    heading: 'OBSERVABILITY',
    prose: `CloudWatch metrics — default vs agent required
• Default (no agent) — CPUUtilization, NetworkIn/Out, DiskReadOps, StatusCheckFailed.
• Requires CW Agent — MemoryUtilization, DiskUsed%, swap, process-level metrics.
• Memory is not a default metric — you will not see it without the agent installed.

Alarms for every production workload
• CPUUtilization > 80% — scaling signal.
• MemoryUtilization > 80% — requires CW Agent.
• DiskUsed% > 80% — requires CW Agent.
• HTTPCode_Target_5XX_Count > N — application-level failures.
• TargetResponseTime p99 > 2s — latency degradation.
• DatabaseConnections near max — precursor to exhaustion.
• UnhealthyHostCount > 0 — immediate action required.
• ApproximateAgeOfOldestMessage — SQS consumer lag.

Log shipping before termination
• Instances terminated by ASG take their logs with them.
• CloudWatch Logs agent ships continuously — if not installed, evidence disappears.
• Lifecycle hook (Terminating:Wait) gives time to flush in-flight logs before termination.
• Set log group retention — default is never expire, costs accumulate silently.

Logs Insights — useful query patterns`,
    code: `# errors in last hour by 5-minute window
fields @timestamp, @message
| filter @message like /ERROR/
| stats count(*) by bin(5m)

# top 10 slowest requests
fields @timestamp, @duration
| sort @duration desc | limit 10`,
  },

  {
    heading: 'SECURITY',
    prose: `IAM evaluation order
• Explicit Deny in any policy — always wins, no exceptions.
• Explicit Allow in any policy — permitted if no deny.
• Implicit Deny (default) — everything not explicitly allowed is denied.
• Resource-based policy (S3 bucket policy) evaluated alongside identity policy.

IAM best practices
• Roles over users for applications — instance profiles auto-rotate credentials.
• Scope to resource ARN, not wildcard — arn:aws:s3:::my-bucket/* not arn:aws:s3:::*.
• Access Analyzer — flags wildcard permissions and external access.
• Access Advisor — shows last used per service, remove unused permissions at 90 days.

SSM Session Manager over SSH
• No port 22, no key management, session logged to CloudTrail, IAM-controlled.
• Requirements: SSM agent running + AmazonSSMManagedInstanceCore role + outbound 443.
• Attach the role at launch — recovery path if SG gets misconfigured.

Encryption gotchas
• RDS encryption must be enabled at creation — snapshot workaround for existing instances.
• KMS customer-managed key = CloudTrail audit log per decryption. Use for regulated workloads.
• EBS: encrypted at volume creation, snapshot inherits encryption state.
• Never put credentials in user data — visible via metadata endpoint to anyone on the instance.

Secrets Manager vs Parameter Store
• Secrets Manager — credentials with rotation, ~$0.40/secret/month.
• Parameter Store — config values and AMI IDs, free standard tier, SecureString for secrets.
• Rule: credentials that rotate → Secrets Manager. Everything else → Parameter Store.`,
  },

  {
    heading: 'HA & DR',
    prose: `RTO and RPO
• RTO — Recovery Time Objective. How long until service restored. Drives compute strategy.
• RPO — Recovery Point Objective. How much data loss acceptable. Drives replication strategy.
• Lower RTO = more pre-provisioned infrastructure = higher cost. Define both independently.

DR patterns — increasing cost, decreasing RTO
• Pilot Light — minimal warm infra in DR region. RDS Read Replica running, ASG at 0, ALB pre-configured.
• Recovery: promote Read Replica → scale ASG → Route 53 flips DNS. RTO: 15-30 min. RPO: seconds.
• Warm Standby — scaled-down but running stack. Scale up on failover. RTO: minutes.
• Multi-site — active/active across regions. Near-zero RTO, highest cost.

Blue/green deployments
• Two environments, traffic shifted via ALB or Route 53.
• Rollback = traffic shift back — seconds, no rebuild required.
• Auto-rollback: CodeDeploy triggers on 5xx rate or CloudWatch alarm during deployment.

Route 53 failover
• Primary record with health check attached.
• Health check fails → Route 53 serves failover record automatically.
• TTL on failover records: keep low (60s) — high TTL = clients cache stale record during outage.

Multi-AZ design
• Minimum 2 AZs in production. AZ failure should degrade capacity, not cause outage.
• One NAT Gateway per AZ — never route private subnet traffic across AZs (cost + risk).
• Cross-AZ data transfer charged at $0.01/GB — design flows to stay within an AZ where possible.`,
  },

  {
    heading: 'SHARED RESPONSIBILITY & CULTURE',
    prose: `Shared responsibility
• AWS owns — physical hardware, hypervisor, managed service software (RDS patches, S3 durability).
• You own — IAM policies, SGs, encryption config, EC2 OS patching, app security, S3 bucket policies.
• Boundary shifts by service: EC2 = you own OS and above. RDS = you own access controls + encryption.
• Common failure: public S3 bucket, unpatched EC2 — both your problem, not AWS's.

AWS culture
• No-blame postmortems (CoE) — systemic improvement, not finding fault.
• Measure everything — alarms before customers notice, humans don't watch healthy systems.
• Automation expected — manual changes create drift, drift creates incidents.
• Working backwards — start from customer need, not available technology.
• IRAP — ASD assessment scheme for Australian government. ap-southeast-2 assessed to PROTECTED.`,
  },

  {
    heading: 'IaC — CDK & TERRAFORM',
    prose: `CDK
• Python (or TypeScript) compiled to CloudFormation. Real language — loops, conditionals, reusable constructs.
• L2 constructs encode best practices and wire IAM automatically (bucket.grant_read(role)).
• Use when: AWS-only, team knows Python, complex logic, want CloudFormation rollback.

Terraform
• HCL — declarative, describes end state. Provider ecosystem covers multi-cloud and non-AWS resources.
• State file is source of truth — remote state in S3 + DynamoDB lock for team use.
• Use when: multi-cloud, existing Terraform estate, team unfamiliar with CDK.

Key distinction
• CDK synthesises to CloudFormation — drift detection and rollback built in.
• Terraform manages its own state — plan before every apply, never edit state manually.
• Don't mix both tools for the same resources in the same environment.`,
    code: `cdk synth         # render CloudFormation — catch errors before touching infra
cdk diff          # show what will change vs deployed stack
terraform plan    # show diff — read before every apply
terraform apply   # execute`,
  },
]
