export const computeCards = [
  {
    title: 'AMI Fundamentals',
    body: `Snapshot of root volume + launch permissions + block device mappings.
Encodes OS, packages, agents, config, and service binary.
Region-scoped — copy to additional regions before multi-region deploy.

Golden AMI pattern: bake once, launch many.
AMI built + tested in pipeline → ID written to Parameter Store.
ASG launch pulls that AMI — no runtime installs, no userdata drift,
no dependency on PyPI/apt at boot. Fast, known, tested state.

Never deregister the AMI a running ASG currently points to —
instances cannot launch without their source AMI registered.`,
  },
  {
    title: 'Launch Templates vs User Data',
    body: `Launch templates > launch configurations (LCs are legacy since 2016):
  LTs support versioning — roll back to a prior version
  LTs support mixed instance types (Spot + On-Demand, multi-family)
  LTs support all current EC2 features — LCs do not

User data: shell script, runs once at first boot, as root.
Visible via metadata endpoint — never put credentials in user data.
Use for: pull config from Parameter Store, start a pre-installed service.
Do NOT use as primary deployment mechanism — versions drift per repo release.`,
  },
  {
    title: 'EC2 Instance Types & Purchasing',
    body: `t3 / m6i    general purpose     balanced CPU + memory
c6i / c7g   compute optimised   batch, HPC, high CPU:mem ratio
r6i         memory optimised    large datasets, caching, SAP HANA
i3en        storage optimised   high IOPS, Elasticsearch, Cassandra
p4 / g5     accelerated         GPU, ML training and inference

On-Demand    pay per second, no commitment, highest cost
Reserved     1 or 3yr commitment, 30–70% saving, exact instance match
Savings Plan 1 or 3yr, 30–70% saving, flexible across families + Fargate
Spot         up to 90% saving, 2-min reclaim warning, fault-tolerant only`,
  },
  {
    title: 'ASG — min / desired / max',
    body: `Min     floor — ASG never terminates below this. Set to minimum for
        service to remain operational. 2+ in production for AZ survival.
Desired current target. Scaling moves desired within [min, max].
        Instance failure → desired unchanged, ASG launches replacement.
Max     ceiling — protects against runaway scaling. Set on cost + load test.

AZ placement: balanced by default — launches in AZ with fewest instances.
AZ rebalancing triggers if one AZ loses instances disproportionately.`,
  },
  {
    title: 'ASG Scaling Policies',
    body: `Target Tracking    define metric + target value. ASG adjusts to hold it.
                   e.g. maintain avg CPU at 50%. Start here by default.
                   AWS manages the CloudWatch alarms internally.

Step Scaling       triggered by CloudWatch alarms. Tiered response:
                   +2 instances if CPU > 60%, +4 if CPU > 80%.
                   More control, more operational complexity.

Scheduled          change min/desired/max on cron. Pre-warm before known
                   events, scale down after close of business.

Predictive         ML forecast, scales ahead of load. Needs 2+ weeks of
                   history. Effective on regular daily traffic patterns.`,
  },
  {
    title: 'Cooldown & Lifecycle Hooks',
    body: `Cooldown: pause after scaling event — ASG ignores further triggers.
Default 300s. Prevents thrash: spike → scale → still high → scale again.
Simple scaling: full cooldown after every action.
Target tracking/step: per-instance warm-up time. Set to actual startup time.

Lifecycle hooks: intercept instance state transitions.
Scale-out → Pending:Wait: bootstrap, fetch secrets, register with LB.
Scale-in → Terminating:Wait: drain connections, flush state, ship final logs.
Must call CompleteLifecycleAction (CONTINUE or ABANDON) or hook times out.`,
  },
  {
    title: 'ALB Health Checks',
    body: `ALB polls each target on configured path + port.
Healthy response: 2xx or 3xx within timeout window.

HealthyThresholdCount    consecutive successes to mark healthy (default 5)
UnhealthyThresholdCount  consecutive failures to mark unhealthy (default 2)
Interval                 time between checks (default 30s)
Timeout                  must be less than Interval

Unhealthy target: removed from ALB rotation. ALB does NOT terminate it.
That is the ASG's job — only if ASG is set to ELB health check type.

/health endpoint must reflect real readiness — check DB connectivity,
required config, dependent services. Static 200 from a broken app is
worse than 503: routes real traffic to a broken target.`,
  },
  {
    title: 'ASG Health Check Type',
    body: `EC2 (default): healthy if running + passing EC2 system status checks.
Catches hardware failure. Cannot detect app returning 500s.
Broken app on running instance → never replaced. This is the gap.

ELB: ASG adopts ALB's health verdict.
ALB marks target unhealthy → ASG terminates and replaces instance.
Almost always correct for web-facing workloads.

HealthCheckGracePeriod: seconds after launch ASG ignores failures.
Set too short → slow app triggers terminate-replace loop.
Set to actual startup time + buffer.`,
  },
  {
    title: 'ALB Routing Algorithms',
    body: `Set per target group, not per listener.

Round Robin (default)
Evenly distributes in sequence. Works when requests have similar cost.
Can imbalance if some requests are far more expensive than others.

Least Outstanding Requests
Routes to target with fewest in-flight requests.
Better for mixed fast/slow APIs — long requests don't block the queue.

Slow Start Mode
New targets receive gradually increasing share over 30–900s warm-up.
Use for JVM warm-up or cache population before full-throughput serving.

Sticky Sessions
Routes a client to the same target for cookie-based session duration.
Avoid — prefer externalised session state (ElastiCache) instead.`,
  },
  {
    title: 'Packer AMI Baking Pipeline',
    body: `Two-layer build: base → app.
Base:  AWS AMI → CloudWatch agent, SSM agent, hardening, SSH config.
       Publish base AMI ID to Parameter Store on success.
       Rebuild weekly or on upstream CVE disclosure.
App:   pull base AMI ID from Parameter Store → install runtime,
       dependencies, service binary, systemd unit. Run verify_build.sh.
       Smoke test hits /health — non-zero exit = build fails, no AMI registered.`,
  },
  {
    title: 'SSM as Config Bus',
    body: `Parameter Store: central, versioned, IAM-controlled config and AMI IDs.
No custom infrastructure. No credential at build time beyond IAM role.`,
    code: `# base build writes ID
aws ssm put-parameter --name /ami/base/latest --value ami-0abc --type String --overwrite

# app build reads base AMI
BASE=$(aws ssm get-parameter --name /ami/base/latest --query Parameter.Value --output text)

# ASG launch template reads app AMI at deploy time
aws ec2 create-launch-template-version --launch-template-data "{\"ImageId\":\"$APP_AMI\"}"`,
  },
  {
    title: 'AMI Retention',
    body: `Every AMI is backed by an EBS snapshot.
Deregistering AMI does NOT delete snapshot — separate step.
Forgotten snapshots accumulate silently and appear on the bill.

Rule: keep N most recent + always keep the AMI the running ASG points to.
If current AMI falls outside N most recent, protect it until next deploy.`,
    code: `# list AMIs sorted by creation date
aws ec2 describe-images --owners self --filters Name=name,Values=myservice-* \
  --query 'sort_by(Images,&CreationDate)[*].[ImageId,Name,CreationDate]' --output table

# deregister then delete snapshot
aws ec2 deregister-image --image-id ami-0abc1234
aws ec2 delete-snapshot --snapshot-id snap-0def5678`,
  },
]
