<template>
  <div class="flex h-screen overflow-hidden font-mono bg-slate-900 text-slate-300">

    <!-- Sidebar -->
    <aside class="w-[200px] shrink-0 bg-slate-800 border-r border-slate-700 overflow-y-auto flex flex-col">
      <div class="px-3 py-2.5 border-b border-slate-700">
        <span class="text-[10px] uppercase tracking-widest text-slate-500">Interview Prep</span>
      </div>

      <nav class="flex-1">
        <div v-for="section in sections" :key="section.id">
          <!-- Section header -->
          <button
            @click="toggleSection(section.id)"
            class="w-full text-left px-3 py-2 text-xs font-semibold flex justify-between items-center border-b border-slate-700/60 transition-colors duration-100"
            :class="activeSection === section.id
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-200'"
          >
            <span>{{ section.label }}</span>
            <span class="text-slate-500 text-[10px]">{{ activeSection === section.id ? '▾' : '▸' }}</span>
          </button>

          <!-- Sub-tabs -->
          <div v-if="activeSection === section.id">
            <button
              v-for="tab in section.tabs"
              :key="tab.id"
              @click="setTab(section.id, tab.id)"
              class="w-full text-left pl-5 pr-3 py-1.5 text-[11px] border-b border-slate-700/30 transition-colors duration-100"
              :class="activeKey === section.id + '-' + tab.id
                ? 'text-white bg-slate-600/70 border-l-2 border-l-slate-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 border-l-2 border-l-transparent'"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto bg-slate-900 p-6 text-slate-300">

      <!-- Linux Raw -->
      <div v-if="activeKey === 'linux-processes'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="proc.col1" />
        <PrepCodeBlock :code="proc.col2" />
        <PrepCodeBlock :code="proc.col3" />
      </div>
      <div v-if="activeKey === 'linux-logs'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="logs.col1" />
        <PrepCodeBlock :code="logs.col2" />
        <PrepCodeBlock :code="logs.col3" />
      </div>
      <div v-if="activeKey === 'linux-networking'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="net.col1" />
        <PrepCodeBlock :code="net.col2" />
        <PrepCodeBlock :code="net.col3" />
      </div>
      <div v-if="activeKey === 'linux-permissions'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="perms.col1" />
        <PrepCodeBlock :code="perms.col2" />
        <PrepCodeBlock :code="perms.col3" />
      </div>
      <div v-if="activeKey === 'linux-disk'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="disk.col1" />
        <PrepCodeBlock :code="disk.col2" />
        <PrepCodeBlock :code="disk.col3" />
      </div>
      <div v-if="activeKey === 'linux-scripting'" class="grid grid-cols-3 gap-8 h-full">
        <PrepCodeBlock :code="script.col1" />
        <PrepCodeBlock :code="script.col2" />
        <PrepCodeBlock :code="script.col3" />
      </div>

      <!-- AWS & Systems -->
      <div v-if="activeKey === 'aws-net-fundamentals'" class="h-full overflow-y-auto">
        <PrepCards :cards="netFundCards" />
      </div>
      <div v-if="activeKey === 'aws-cloud-aws'" class="h-full overflow-y-auto">
        <PrepCards :cards="cloudAwsCards" />
      </div>
      <div v-if="activeKey === 'aws-compute'" class="h-full overflow-y-auto">
        <PrepCards :cards="computeCards" />
      </div>
      <div v-if="activeKey === 'aws-data-messaging'"><!-- content goes here --></div>
      <div v-if="activeKey === 'aws-observability'"><!-- content goes here --></div>
      <div v-if="activeKey === 'aws-ha-dr'"><!-- content goes here --></div>
      <div v-if="activeKey === 'aws-security'"><!-- content goes here --></div>
      <div v-if="activeKey === 'aws-iac'"><!-- content goes here --></div>

      <!-- STAR Stories -->
      <div v-if="activeKey === 'star-complex-problem'"><!-- content goes here --></div>
      <div v-if="activeKey === 'star-difficult-client'"><!-- content goes here --></div>
      <div v-if="activeKey === 'star-disagree-commit'"><!-- content goes here --></div>

      <!-- Career & Values -->
      <div v-if="activeKey === 'career-narrative'"><!-- content goes here --></div>
      <div v-if="activeKey === 'career-why-aws'"><!-- content goes here --></div>
      <div v-if="activeKey === 'career-values'"><!-- content goes here --></div>
      <div v-if="activeKey === 'career-questions'"><!-- content goes here --></div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PrepCodeBlock from '@/components/prep/PrepCodeBlock.vue'
import PrepCards from '@/components/prep/PrepCards.vue'

// ── AWS: Networking Fundamentals ─────────────────────────────────────────────
// ── AWS: Networking Fundamentals ─────────────────────────────────────────────
// 12 cards / 4 rows — code-block cards clustered so no row has one tall + two short
const netFundCards = [
  // Row 1 — DNS records (text only, balanced height)
  {
    title: 'DNS Resolution & TTL',
    body: `Resolution chain: local cache → recursive resolver → root → TLD → authoritative.
Cache hit ends the chain early — the resolver serves the cached answer without
contacting the authoritative server. EC2 uses 169.254.169.253 (VPC+2 address)
as the recursive resolver by default.

TTL controls how long the cached answer stays valid. Reduce TTL before a planned
DNS change — propagation delay is bounded by the old record's TTL. Low TTL
increases resolver query volume and Route53 costs. Default: 300s.`,
  },
  {
    title: 'Record Types — A · AAAA · CNAME · MX · NS',
    body: `A     hostname → IPv4. Multiple = round-robin distribution. No order guarantee.
AAAA  hostname → IPv6. Dual-stack clients prefer AAAA over A when both exist.
CNAME alias → canonical name. Not valid at zone apex — breaks NS and MX lookup.
      Use Route53 ALIAS at apex (example.com). CNAME chains add per-hop latency.
MX    mail exchange + priority (lower number = preferred). Multiple for HA.
NS    nameserver for the zone. Delegates authority. Changing NS = transferring
      control. Parent zone must update glue records or resolution fails.`,
  },
  {
    title: 'Record Types — TXT · PTR · SRV · AD',
    body: `TXT  arbitrary text. SPF, DKIM, DMARC, domain verification (ACM, SES).
     Multiple TXT records allowed on the same name.
PTR  reverse DNS: IP → hostname. Stored in .in-addr.arpa. Requires ownership
     of the IP block. Used for email reputation and security audit trails.
SRV  service location: priority, weight, port, target host.
     AD uses SRV to find domain controllers:
       _ldap._tcp.domain  →  DC address and port
       _kerberos._tcp.domain  →  KDC location
     DNS failure = AD authentication failure. No fallback, no workaround.`,
  },

  // Row 2 — tools (code-block cards flanking a text card)
  {
    title: 'Querying DNS — dig & nslookup',
    body: `Query a specific resolver to isolate where a DNS problem lives.
Comparing results from the VPC resolver vs an external one tells you
whether the fault is in your private zone or upstream.`,
    code: `dig +short <hostname>                # resolve — IP only
dig @169.254.169.253 <hostname>  # EC2 VPC resolver directly
dig @8.8.8.8 <hostname>          # bypass local, hit Google DNS
dig +trace <hostname>            # trace delegation from root
nslookup <hostname> <server>     # same intent, older syntax`,
  },
  {
    title: 'TCP vs UDP',
    body: `TCP: connection-oriented, reliable, ordered. Three-way handshake (SYN →
SYN-ACK → ACK) before data flows. Retransmits on packet loss. Higher overhead.
HTTP, SSH, database connections, file transfer.

UDP: connectionless. No handshake, no delivery guarantee, no retransmit.
Lower overhead, higher throughput. Loss is acceptable or app-handled.
DNS queries, VoIP, video streaming, SNMP, syslog.

Half-open connections (SYN sent, final ACK never returned) accumulate state.
Basis of SYN flood attacks — fills the connection table, starves real traffic.`,
  },
  {
    title: 'curl — HTTP Testing',
    body: `Essential for verifying connectivity, TLS, and response behaviour without
a browser. Reach for it when a service is suspect: health endpoints, auth
headers, status codes, redirect chains, and certificate validity.`,
    code: `curl -I <url>                              # headers only (HEAD)
curl -s -o /dev/null -w '%{http_code}' <url>  # status code only
curl -v <url>                              # verbose: TLS + headers + body
curl -k <url>                              # skip TLS cert verification
curl -m 5 <url>                            # hard timeout, 5 seconds
curl -sf http://localhost:8080/health && echo ok
curl -H 'Authorization: Bearer <token>' <url>`,
  },

  // Row 3 — IP / AWS networking (one code card centred)
  {
    title: 'IP Addressing & NAT',
    body: `Private ranges (RFC1918) — not internet-routable:
  10.0.0.0/8      large private networks, most AWS VPC designs
  172.16.0.0/12   VPC default CIDR family (AWS default: 172.31.0.0/16)
  192.168.0.0/16  home and small office networks

NAT translates private → public IP on outbound. Stateful — tracks sessions
to reverse-translate responses. Return traffic must match an active session
entry; unsolicited inbound is dropped. Many-to-one (PAT): many private IPs
share one public IP, differentiated by source port.`,
  },
  {
    title: 'NAT Gateway vs Internet Gateway',
    body: `NAT Gateway: outbound-only for private subnets. AZ-scoped — one per AZ for
resilience; cross-AZ NGW traffic incurs data transfer charges. Charged per
hour and per GB. Not reachable from the internet.

IGW: bidirectional for public subnets. One per VPC. Instance needs a public
IP or EIP to communicate with the internet. HA and horizontally scaled.

They serve different subnet types and cannot substitute for each other.`,
    code: `# private subnet route table
0.0.0.0/0 → nat-xxxxxxxx   # outbound only via NAT Gateway

# public subnet route table
0.0.0.0/0 → igw-xxxxxxxx   # bidirectional via Internet Gateway`,
  },
  {
    title: 'Hub vs Switch vs Router',
    body: `Hub (L1): broadcasts every frame to all ports. All ports share one collision
domain — simultaneous transmissions collide. No traffic isolation. Obsolete.

Switch (L2): learns MAC addresses, forwards frames to the correct port only.
Separate collision domain per port. Supports VLANs for L2 segmentation.
Foundation of LAN design.

Router (L3): forwards packets between networks by IP. Routing table selects
next hop. Connects subnets, VLANs, and the internet. In AWS the VPC has an
implicit router — no physical device, configured via route tables per subnet.`,
  },

  // Row 4 — diagnostics + path (code card last)
  {
    title: 'Traceroute',
    body: `Sends probes with incrementing TTL. Each router decrements TTL; at TTL=0 it
returns ICMP Time Exceeded, revealing its address. Three probes per hop.
Builds the full path with per-hop round-trip times.

ping: is the destination reachable, what is the RTT.
traceroute: which hop is the problem — path with per-hop latency.

Asterisks (*): ICMP filtered — not necessarily the failure point. Use
traceroute -T (TCP SYN probes) to work through security groups and firewalls.`,
  },
  {
    title: 'CIDR & Subnetting',
    body: `CIDR notation: <network>/<prefix-length>
  /24 = 256 addresses  (254 usable outside AWS)
  /16 = 65,536 addresses
  /28 = 16 addresses  (smallest allowed VPC subnet)

AWS reserves 5 IPs per subnet: .0 network · .1 VPC router · .2 DNS
· .3 future use · .255 broadcast = 11 usable in a /28.

VPC CIDR cannot be changed after creation — plan sizing upfront. A /16
split into /24 subnets gives 256 subnets of 251 usable hosts each.`,
  },
  {
    title: 'Full Request Path — https://www.amazon.com',
    body: `Every step is a potential failure domain. Know where TLS terminates (ALB,
not the app server), where auth is enforced, and where caching can
short-circuit the chain. ALB access logs surface which step is slow.`,
    code: `1. DNS lookup      cache → recursive → authoritative → A record
2. TCP handshake   SYN → SYN-ACK → ACK  (client → ALB, port 443)
3. TLS handshake   cert presented, cipher negotiated, session keys set
4. HTTP GET        Host, Accept, Cookie, Authorization headers
5. Load balancer   ALB terminates TLS, routes by host/path rule
6. App server      ECS task / EC2 processes the request
7. Backends        RDS (read), ElastiCache (cache), S3 (assets)
8. Response        app → ALB → client, TLS-encrypted throughout`,
  },
]

// ── AWS: Compute & Scaling ───────────────────────────────────────────────────
// 12 cards / 4 rows — code-block cards in row 4, clustered together
const computeCards = [
  // Row 1 — EC2 fundamentals
  {
    title: 'AMIs — Amazon Machine Images',
    body: `An AMI is a snapshot of a root volume combined with launch permissions and block
device mappings. It encodes the OS, all installed packages, agents, config files,
and the service binary. Every EC2 instance starts from an AMI — it is the
immutable starting state for everything that launches from it.

Golden AMI pattern: bake once, launch many. The AMI is built in a pipeline, tested,
and published to Parameter Store. Every ASG launch pulls that AMI — no runtime
package installs, no userdata drift, no dependency on PyPI or apt being reachable
at boot. Instance comes up fast and in a known, tested state.

AMIs are region-scoped. Copy to additional regions before deploying multi-region.
Deregister old AMIs to avoid paying for EBS snapshots that back them. Never
deregister the AMI your ASG currently points to — instances cannot launch without
their source AMI being registered.`,
  },
  {
    title: 'User Data & Launch Templates',
    body: `User data: a shell script or cloud-init directive that runs once at first boot,
as root, before the instance is marked ready. Useful for lightweight bootstrap
tasks — pull a config from Parameter Store, start a service, apply last-minute
settings that cannot be baked in. Visible to any process on the instance via the
metadata endpoint — do not put credentials in user data.

The problem with user data as the primary deployment mechanism: every launch
re-runs the same script. Package versions drift as upstream repos publish new
releases. Bugs introduced in a repo package break launches. Boot time increases
with every apt install. The golden AMI pattern eliminates all of this — user data
shrinks to pulling a config and starting a pre-installed service.

Launch templates over launch configurations: LTs support versioning (roll back
to a prior version), mixed instance types in the same ASG (Spot + On-Demand,
multiple instance families), and all current EC2 features. Launch configurations
are a legacy type — AWS still supports them but has not added new features since
2016. Any new ASG should use a launch template.`,
  },
  {
    title: 'EC2 Instance Types & Purchasing',
    body: `Instance families are purpose-built. General purpose (t3, m6i): balanced CPU and
memory, cost-effective baseline. Compute optimised (c6i, c7g): high CPU-to-memory
ratio, batch and HPC. Memory optimised (r6i, x2idn): large in-memory datasets,
caching, SAP HANA. Storage optimised (i3en, im4gn): high sequential throughput
and IOPS, Elasticsearch, Cassandra. Accelerated (p4, g5): GPU for ML training
and inference.

Purchasing models:
On-Demand: pay per second, no commitment. Highest per-unit cost, maximum
flexibility. Right for unpredictable or short workloads.
Reserved Instances / Savings Plans: 1- or 3-year commitment. 30–70% saving over
On-Demand. Savings Plans are more flexible — apply across instance families,
regions, and Fargate. Reserved Instances are exact match.
Spot: unused EC2 capacity, up to 90% cheaper. AWS can reclaim with 2-minute
warning. Use for stateless, fault-tolerant, or checkpointable workloads: batch
jobs, rendering, ML training with checkpoint support.`,
  },

  // Row 2 — ASG fundamentals
  {
    title: 'ASG Core — Capacity & Desired State',
    body: `An Auto Scaling Group maintains a fleet of EC2 instances within defined capacity
bounds. Three parameters define its behaviour:

Min: the floor. ASG will never terminate below this count, regardless of scaling
policy. Set to the minimum that keeps the service operational — often 1 for low
environments, 2+ for production to survive AZ failure.

Max: the ceiling. ASG will not add instances beyond this count. Protects against
runaway scaling triggered by a bug or traffic spike. Set based on cost tolerance
and load testing results — not arbitrarily high.

Desired: the current target. Scaling events move desired up or down within
[min, max]. ASG works toward desired at all times — if an instance fails, desired
stays the same and ASG launches a replacement. If you scale down manually by
lowering desired, ASG terminates instances to match.

Instances are placed across AZs automatically. Default is balanced distribution —
ASG launches in the AZ with fewest running instances. AZ rebalancing triggers if
one AZ loses instances disproportionately.`,
  },
  {
    title: 'ASG Scaling Policies',
    body: `Target Tracking: the simplest and most common policy type. Define a metric and
a target value — ASG continuously adjusts capacity to hold the metric at that
value. Example: maintain average CPU at 50%. No thresholds to tune, no alarm
management required. AWS handles the CloudWatch alarms and scaling calculations
internally. Start here unless you have a reason not to.

Step Scaling: triggered by CloudWatch alarms. Define tiers — e.g. add 2 instances
if CPU > 60%, add 4 if CPU > 80%. More control than target tracking, more
operational complexity. Useful when the scale response should be proportional to
how far over the threshold you are, rather than constantly converging to a target.

Scheduled Scaling: change min/desired/max on a cron schedule. Use when load
patterns are predictable — pre-warm before a known traffic event, scale down after
close of business. Complements reactive policies rather than replacing them.

Predictive Scaling: uses ML to forecast load and scale ahead of it. Effective on
workloads with regular daily patterns. Requires sufficient history to train the
model — at least two weeks of CloudWatch metrics.`,
  },
  {
    title: 'Cooldown Periods & Lifecycle Hooks',
    body: `Cooldown: a pause after a scaling activity during which ASG ignores further
scale-out triggers. Default 300 seconds. Prevents thrash — without a cooldown, a
metric spike triggers a scale event, new instances start, metric is still high
(new instances not yet serving traffic), another scale event fires, and so on.

Simple scaling waits the full cooldown after every action. Target tracking and
step scaling use a separate warm-up time per instance — how long before a new
instance is counted in the aggregated metrics. Set warm-up to match actual app
startup time, not an arbitrary buffer.

Lifecycle hooks: intercept instance state transitions. At scale-out: instance
enters Pending:Wait before it is marked InService. Use to run bootstrap scripts,
register with a load balancer, fetch secrets, ship initial config. At scale-in:
instance enters Terminating:Wait before shutdown. Use to drain active connections,
flush in-memory state, or ship final logs to S3/CloudWatch.

The hook action is: do your work, then call CompleteLifecycleAction (CONTINUE or
ABANDON). If the hook times out without a response, ASG uses the default action
defined on the hook (typically CONTINUE).`,
  },

  // Row 3 — ALB, health checks, routing
  {
    title: 'ALB Health Checks',
    body: `The ALB periodically sends HTTP requests to each registered target on a
configured path and port. Healthy response: 2xx or 3xx within the timeout window.
The ALB tracks consecutive success and failure counts independently.

Key parameters:
HealthyThresholdCount: consecutive successes to mark healthy (default 5).
UnhealthyThresholdCount: consecutive failures to mark unhealthy (default 2).
Interval: time between checks (default 30s). Timeout: how long to wait for a
response (must be less than Interval).

An unhealthy target is removed from the ALB's rotation — no new requests are
sent. The ALB does not terminate the instance. That is the ASG's job, and only
if the ASG is configured to trust the ALB's health verdict.

Your /health endpoint should reflect actual application readiness — verify
database connectivity, required config, and dependent service reachability. A
200 from a broken app that returns static OK is worse than a 503: it sends real
traffic to a broken target instead of routing around it.`,
  },
  {
    title: 'ASG Health Check Type & Grace Period',
    body: `ASG has its own health check mechanism that runs independently of the ALB. The
health check type determines what verdict ASG uses to decide whether to replace
an instance.

EC2 (default): instance is healthy if it is running and passes the EC2 system
status checks. The EC2 check catches hardware failure and hypervisor issues, but
it cannot detect an application that has started and is returning 500s. An
unhealthy app on a running instance will never be replaced under EC2 health checks.

ELB: ASG adopts the ALB's health verdict. If the ALB marks a target unhealthy,
ASG terminates and replaces the instance. This is almost always the correct
setting for web-facing workloads — it closes the gap where a broken app survives
indefinitely on a healthy EC2 instance.

HealthCheckGracePeriod: the number of seconds after launch during which ASG
ignores health check failures. Gives the application time to start before ASG
acts on the first failing health check. Set too short and a slow-starting app
triggers a terminate-replace loop — new instances spin up, fail health checks,
get replaced, repeat. Set it to actual startup time plus a buffer.`,
  },
  {
    title: 'ALB Routing & Algorithms',
    body: `Target group routing algorithm is set per target group, not per listener.

Round Robin (default): requests distributed evenly across healthy targets in
sequence. Works well when all requests have similar cost and targets have equal
capacity. Simple and predictable. Can produce imbalance if some requests are
much more expensive than others — a heavy query on target A is followed by
another on target A's turn.

Least Outstanding Requests: routes new requests to the target with the fewest
in-flight requests. Better for workloads with variable request duration — long-
running requests occupy a target and new traffic is routed elsewhere rather than
queued behind the backlog. Use for APIs with mixed fast/slow operations.

Slow start mode: new targets receive a gradually increasing share of requests
over a warm-up window (30–900 seconds). Prevents a cold target from being
immediately flooded. Useful when targets require JVM warm-up or cache population
before they can serve at full throughput.

Sticky sessions (session affinity): ALB routes a client to the same target for
the duration of a cookie-based session. Use only when session state is local
to the instance — prefer externalised session state (ElastiCache) instead.`,
  },

  // Row 4 — AMI baking pipeline, code cards clustered
  {
    title: 'Packer AMI Baking Pipeline',
    body: `Packer (HashiCorp) automates the AMI build process. A Packer template defines
a source AMI (base), a series of provisioners (shell scripts, Ansible playbooks,
file uploads), and a post-processor (register the resulting AMI, copy to regions).

Two-layer build pattern:
Base layer: start from an AWS-provided AMI (Amazon Linux 2023, Ubuntu LTS). Install
the CloudWatch agent, SSM agent, hardening config, SSH lockdown, and monitoring
tooling. Publish base AMI ID to Parameter Store. Rebuild periodically to pick up
OS patches — weekly or on upstream CVE disclosure.

App layer: start from the base AMI ID pulled from Parameter Store. Install the
language runtime, install app dependencies, copy the service binary, write the
systemd unit file. Run verify_build.sh — a smoke test that starts the service,
hits its health endpoint, and exits non-zero on failure. Packer treats a non-zero
exit as a build failure and does not register the AMI.

The result: a provably tested image. Every instance that launches from it has
already passed a health check. No surprises at scale-out time.`,
  },
  {
    title: 'SSM Parameter Store as Config Bus',
    body: `Parameter Store provides a central, versioned store for configuration and AMI
IDs. IAM policies control read/write access per path. No custom infrastructure,
no credential required at build time beyond the IAM role.`,
    code: `# base build writes AMI ID after a successful bake
aws ssm put-parameter \\
  --name /ami/base/latest \\
  --value ami-0abc1234def56789 \\
  --type String --overwrite

# app build reads base AMI ID to use as source
BASE=$(aws ssm get-parameter \\
  --name /ami/base/latest \\
  --query Parameter.Value --output text)

# app build writes its result
aws ssm put-parameter \\
  --name /ami/app/myservice/latest \\
  --value ami-0xyz5678abc12345 \\
  --type String --overwrite

# ASG launch template reads AMI ID at deploy time
aws ec2 create-launch-template-version \\
  --launch-template-id lt-0abc123 \\
  --source-version '$Latest' \\
  --launch-template-data "{\"ImageId\":\"$APP_AMI\"}"`,
  },
  {
    title: 'AMI Retention & Lifecycle',
    body: `Every registered AMI is backed by an EBS snapshot. Deregistering the AMI does
not delete the snapshot — that is a separate step. Forgotten snapshots accumulate
silently and appear on the bill as "EBS snapshot storage."

Retention rule: keep the N most recent AMIs per service, and always keep whichever
AMI the running ASG currently points to — regardless of age. If the current AMI
falls outside the N most recent, protect it explicitly until the next deploy.`,
    code: `# list AMIs for a service, sorted by creation date
aws ec2 describe-images --owners self \\
  --filters Name=name,Values=myservice-* \\
  --query 'sort_by(Images,&CreationDate)[*].[ImageId,Name,CreationDate]' \\
  --output table

# deregister AMI
aws ec2 deregister-image --image-id ami-0abc1234

# delete the backing snapshot (required separately)
aws ec2 delete-snapshot --snapshot-id snap-0def5678

# find all snapshots not referenced by any AMI
aws ec2 describe-snapshots --owner-ids self \\
  --query 'Snapshots[?!not_null(Description) || !contains(Description, \`ami\`)].[SnapshotId,VolumeSize,StartTime]'

# AWS Data Lifecycle Manager — automate AMI rotation
# define a policy: tag-based selection, retention count, schedule`,
  },
]

// ── AWS: Cloud & AWS Foundations ─────────────────────────────────────────────
// 12 cards / 4 rows — code-block cards in row 4, clustered together
const cloudAwsCards = [
  // Row 1 — what cloud is and the consumption model shift
  {
    title: 'Cloud Computing & CapEx vs OpEx',
    body: `Cloud computing: on-demand delivery of compute, storage, databases, networking,
and software over the internet — billed per use, no upfront hardware commitment.

CapEx (traditional IT): purchase physical servers upfront. Capital tied up before
a single workload runs. Capacity planning is a guess — under-provision and you
starve; over-provision and hardware depreciates idle. Long refresh cycles.

OpEx (cloud): pay-as-you-go, costs vary with actual consumption. No procurement
lead time. Scale out in minutes, decommission just as fast. Failure cost is lower
because experiments are cheap. Finance treats it as operational spend, not asset.

The shift enables smaller teams to operate at scale previously available only to
organisations that could afford datacentre infrastructure.`,
  },
  {
    title: 'Deployment Models',
    body: `Public cloud: infrastructure owned and operated by a provider (AWS, Azure, GCP),
shared across customers via logical isolation. No physical tenancy. Lowest
operational burden — you consume, the provider maintains. Cost advantage via
massive economies of scale.

Private cloud: dedicated infrastructure, either on-premises or in a hosted
facility. Full control over hardware, locality, and compliance boundary. Higher
capital cost, longer procurement cycle. Justified when regulation or data
sovereignty rules out shared infrastructure.

Hybrid cloud: workloads span public and private. Typical pattern — sensitive data
and legacy systems stay on-premises; cloud handles burst capacity, analytics, and
net-new development. AWS Direct Connect and AWS Outposts are the integration
primitives for this model.

Multi-cloud: deliberate use of multiple providers to avoid lock-in, optimise cost
per workload, or meet contractual requirements.`,
  },
  {
    title: 'IaaS / PaaS / SaaS',
    body: `IaaS — Infrastructure as a Service: provider delivers raw compute, storage, and
network. You manage the OS, runtime, middleware, and application. Maximum control,
maximum responsibility. EC2 is IaaS — you patch the AMI, configure the firewall,
manage the software stack.

PaaS — Platform as a Service: provider manages OS, runtime, and scaling
infrastructure. You deploy code and manage data. Faster to ship, less operational
overhead. AWS Elastic Beanstalk, RDS, Lambda at the function level.

SaaS — Software as a Service: provider manages everything including the
application. You configure and use. Zero infrastructure responsibility. Examples:
Salesforce, Microsoft 365, AWS WorkMail.

Responsibility boundary shifts down with each layer — IaaS shifts least, SaaS
shifts most. The shared responsibility model maps to whichever layer you operate.`,
  },

  // Row 2 — NIST, infrastructure, responsibility
  {
    title: 'NIST Five Characteristics',
    body: `The US NIST definition of cloud computing specifies five essential characteristics.
Used in Australian government procurement frameworks and ASD guidance as the
baseline definition against which services are assessed.

On-demand self-service: provision compute, storage, and other resources through
a portal or API without human interaction with the provider. No ticket, no wait.

Broad network access: capabilities available over the network via standard
mechanisms — accessed from laptops, phones, and other cloud services uniformly.

Resource pooling: provider serves multiple customers from a shared pool, with
physical and virtual resources dynamically assigned and reassigned based on demand.
The customer has no visibility into or control over the physical location of
resources, though they may specify region-level constraints.

Rapid elasticity: capacity scales up and down quickly — to the consumer it appears
unlimited. Provision more in minutes; release and stop paying immediately.

Measured service: usage is monitored, controlled, and billed at the resource level.
Transparency for provider and customer. Pay only for what you consume.`,
  },
  {
    title: 'AWS Global Infrastructure',
    body: `Regions: 30+ geographic areas worldwide, each comprising multiple Availability
Zones. Regions are fully independent — no data crosses a region boundary without
explicit action. Choose a region based on data residency requirements, latency to
end users, and service availability. ap-southeast-2 (Sydney) and ap-southeast-4
(Melbourne) serve Australian workloads. Some services (IAM, Route 53, CloudFront)
are global and not region-scoped.

Availability Zones (AZs): physically separate datacentres within a region, with
independent power, cooling, and networking. Low-latency, high-bandwidth links
connect AZs within a region. Deploy across multiple AZs to survive datacentre
failure. Each AZ has a random mapping per account — your ap-southeast-2a may be
a different physical facility from another account's ap-southeast-2a.

Edge locations / Points of Presence: 400+ worldwide. Used by CloudFront (CDN),
Route 53 (DNS anycast), and Global Accelerator. Content served from the edge
closest to the user — reduces latency for static assets, API responses, and DNS.

Local Zones: AWS infrastructure placed closer to large population centres. Extend
your VPC to a Local Zone for single-digit millisecond latency workloads.`,
  },
  {
    title: 'Shared Responsibility Model',
    body: `AWS is responsible for security OF the cloud — the physical layer, hardware,
managed hypervisor, and managed service software stack. If a disk fails in an
S3 datacentre, that is AWS's problem. If the RDS engine has a CVE, AWS patches it.

You are responsible for security IN the cloud — everything you deploy, configure,
and connect. This includes: IAM policies and credential hygiene, VPC network
controls and security groups, encryption of data at rest and in transit, patching
the OS on EC2 instances, application-layer security, and audit logging.

The boundary shifts by service type. EC2 (IaaS): you own the guest OS and up.
RDS (managed): AWS manages the engine and underlying OS; you manage access
controls, parameter groups, and encryption settings. Lambda (serverless): AWS
manages the runtime; you own the function code, IAM permissions, and environment
variables.

Common interview failure: treating managed services as fully AWS's responsibility.
An S3 bucket misconfigured as public is your responsibility, not AWS's. An
unpatched EC2 instance is yours. IAM users with AdministratorAccess are yours.`,
  },

  // Row 3 — value prop, Australian gov, culture
  {
    title: 'AWS Value Proposition',
    body: `200+ services spanning compute, storage, databases, networking, ML, security,
analytics, and developer tooling. The depth matters — services are designed to
integrate. EventBridge connects 90+ AWS services. IAM is uniform across all of
them. CloudWatch surfaces metrics from every managed service.

No minimum commitment on most services. Reserved Instances and Savings Plans
reduce cost 30–70% in exchange for a 1- or 3-year commitment — but on-demand is
available immediately. Spot Instances offer up to 90% savings for interruption-
tolerant workloads.

Speed of innovation: AWS releases hundreds of features and new services per year.
New capabilities are available in the console and API immediately — no upgrade
cycle, no procurement required.

Operational agility: CloudFormation and CDK let you version infrastructure as code.
A stack that took weeks to procure on-premises deploys in minutes. Tear it down
when the experiment is over.`,
  },
  {
    title: 'IRAP & Australian Government Context',
    body: `IRAP — Information Security Registered Assessors Program: ASD-operated scheme
for assessing cloud and other services against the Australian Government ISM
(Information Security Manual). An IRAP assessment does not certify a service;
it produces an assessment report that supports an agency's own risk acceptance.

AWS holds IRAP assessments for ap-southeast-2 (Sydney) covering a broad service
catalogue at PROTECTED level. Melbourne (ap-southeast-4) is assessed for OFFICIAL
and OFFICIAL:Sensitive. Australian agencies consuming AWS services must verify
the service is in scope of the assessment for their classification level.

AGSVA security clearances: Baseline, NV1 (Negative Vetting 1), NV2, PV (Positive
Vetting). Personnel working with PROTECTED or above material are required to hold
at least NV1. Cloud roles in Defence and Intelligence often require NV2 or PV.

Sovereign cloud requirements: some agencies require data to remain in Australian
geographic boundaries. AWS supports this via region selection (Sydney/Melbourne)
and service control policies that deny API calls outside ap-southeast-2/4.
The AWS Australian Sovereign Cloud initiative adds additional compliance controls.`,
  },
  {
    title: 'AWS Culture & Operational Philosophy',
    body: `Working Backwards: product development starts from a press release and FAQ
written as if the product already exists. Forces clarity on what the customer
benefit actually is before a line of code is written.

Leadership Principles: 16 principles used in hiring and decision-making. Relevant
to cloud roles: Customer Obsession, Bias for Action, Operational Excellence,
Think Big, Dive Deep, Frugality. Expect behavioural interview questions directly
mapped to LPs.

Two-Pizza Teams: small, autonomous teams own their service end to end — build,
deploy, operate. No hand-offs to separate ops teams. You build it, you run it.
Accountability stays with the team closest to the code.

Mechanisms over heroics: repeatable, documented processes over individual skill.
Operational issues should produce a corrective mechanism — not just be resolved.
CoEs (Corrections of Error) are blameless; the goal is systemic improvement.

Measure everything: no opinion without data. Alarms before customers notice.
Dashboards owned by the team, not a separate monitoring group.`,
  },

  // Row 4 — WAF text + 2 code cards clustered
  {
    title: 'Well-Architected Framework',
    body: `Six pillars for evaluating and improving cloud architectures. Used in AWS
Well-Architected Reviews — a structured conversation with AWS or a partner that
produces a risk report and improvement plan.

Operational Excellence: run and monitor systems, improve processes. IaC, small
reversible changes, anticipate failure.

Security: protect data and systems. Least privilege IAM, encryption everywhere,
enable traceability (CloudTrail, Config), incident response plan.

Reliability: recover from failure, meet demand. Multi-AZ, health checks, Circuit
Breaker patterns, tested restore procedures.

Performance Efficiency: use compute resources efficiently. Right instance type,
serverless where applicable, review as new services release.

Cost Optimisation: avoid unnecessary spend. Right-sizing, Reserved/Savings Plans
for steady-state, Spot for batch, delete unused resources.

Sustainability: minimise environmental impact. Higher utilisation, managed
services, optimise code to reduce compute hours.`,
  },
  {
    title: 'AWS CLI — Core Patterns',
    body: `Common patterns for scripting, debugging, and verifying resources. The
--query flag uses JMESPath — learn it; it eliminates most jq dependencies.`,
    code: `aws sts get-caller-identity          # who am I — account, ARN, user
aws configure list                   # active credentials and region
aws configure list-profiles          # all named profiles

aws ec2 describe-instances \\
  --filters Name=instance-state-name,Values=running \\
  --query 'Reservations[].Instances[].[InstanceId,PrivateIpAddress,Tags[?Key==\`Name\`].Value|[0]]' \\
  --output table

aws s3 ls s3://<bucket> --recursive --human-readable --summarize
aws s3 cp <file> s3://<bucket>/<key>
aws s3 sync ./dist s3://<bucket>/ --delete

aws logs get-log-events \\
  --log-group-name /aws/lambda/<fn> \\
  --log-stream-name <stream> --limit 50

aws cloudformation describe-stack-events \\
  --stack-name <stack> \\
  --query 'StackEvents[?ResourceStatus==\`CREATE_FAILED\`]'`,
  },
  {
    title: 'IAM Core Concepts',
    body: `IAM is the identity and access control plane for all AWS services. Every API
call is authenticated (who are you?) and authorised (are you allowed?) via IAM.`,
    code: `# Identity types
Users        # long-lived, avoid for apps — use roles
Groups       # collection of users, policies attached to groups
Roles        # assumed by services, EC2 instances, Lambda, federated users
Policies     # JSON documents: Effect Allow/Deny + Action + Resource + Condition

# Evaluation logic (order matters)
1. Explicit Deny in any policy  →  always wins
2. Explicit Allow               →  permitted if no deny
3. Implicit Deny (default)      →  everything not allowed is denied

# Least privilege patterns
aws iam simulate-principal-policy \\
  --policy-source-arn <role-arn> \\
  --action-names s3:GetObject \\
  --resource-arns arn:aws:s3:::<bucket>/*

# Common mistakes
# AdministratorAccess on app roles — scope to resource ARN
# Inline policies — use managed, keeps audit trail cleaner
# Long-lived access keys — rotate via IAM credential report`,
  },
]

// ── Scripting ────────────────────────────────────────────────────────────────
const script = {
  col1: `\
# shebang and options
#!/usr/bin/env bash
set -euo pipefail                # exit on err | unset var | pipe fail
set -x                           # xtrace: print each command before running

# variables
NAME="\${1:-default}"            # positional arg with fallback value
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
readonly CONFIG="/etc/app/config"
COUNT=$(find /var/log -name "*.log" | wc -l)

# conditionals
if [[ -f "$CONFIG" ]]; then
  source "$CONFIG"
elif [[ "$NAME" == "reload" ]]; then
  reload_config
else
  echo "unknown state" >&2; exit 1
fi

# guard clauses — fail fast at top of script
[[ $EUID -eq 0 ]]  || { echo "must run as root" >&2;  exit 1; }
[[ -f "$CONFIG" ]] || { echo "config missing" >&2;     exit 1; }

# [[ ]] — test operators
[[ -f $F ]]                      # regular file exists
[[ -d $D ]]                      # directory exists
[[ -x $F ]]                      # file is executable
[[ -z $V ]]                      # string is empty
[[ -n $V ]]                      # string is non-empty
[[ $A == $B ]]                   # string equality
[[ $N -gt 0 ]]                   # numeric: -eq -ne -gt -lt -ge -le
[[ $S =~ ^[0-9]+$ ]]             # regex match (ERE)`,

  col2: `\
# for — iterate list or glob
for item in "\${ITEMS[@]}"; do
  echo "$item"
done

for f in /etc/app/*.conf; do     # glob over files
  [[ -f "$f" ]] && source "$f"
done

for i in $(seq 1 5); do
  echo "attempt $i of 5"
done

# while — condition loop
while IFS= read -r line; do      # safe line-by-line file read
  [[ -z "$line" ]] && continue
  process "$line"
done < "$INPUT_FILE"

while true; do                   # poll until condition met
  curl -sf http://localhost/health && break
  echo "not ready" >&2; sleep 5
done

# until
until nc -zw1 "$DB_HOST" 5432; do sleep 2; done

# loop control
break                            # exit loop immediately
continue                         # skip to next iteration

# examples
for host in "\${HOSTS[@]}"; do
  ssh "$host" 'systemctl is-active app' || echo "$host: DOWN"
done

for svc in nginx app worker; do
  systemctl is-active "$svc" || echo "$svc: not running"
done`,

  col3: `\
# functions
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
die() { log "FATAL: $*"; exit 1; }

retry() {
  local n=0
  until "$@"; do
    (( n++ )); [[ $n -ge 3 ]] && return 1
    sleep $(( n * 2 ))
  done
}
# usage: retry curl -sf http://host/health

# exit codes
command && echo "ok" || echo "failed"
command || exit 1                # abort script if this command fails
echo "exit was: $?"              # inspect last exit code
exit 0                           # success
exit 1                           # failure — any non-zero signals error

# trap — cleanup on exit or signal
cleanup() { rm -f "$TMP"; log "cleaned up"; }
trap cleanup EXIT                # always runs on any exit
trap cleanup EXIT INT TERM       # also catches Ctrl-C and SIGTERM

# patterns
TMP=$(mktemp); trap 'rm -f "$TMP"' EXIT
command -v jq >/dev/null || die "jq is required"
timeout 30 bash -c 'until nc -z "$DB" 5432; do sleep 1; done'

# parameter expansion
"\${VAR:-default}"               # use default if VAR unset or empty
"\${VAR:?must be set}"           # abort with message if unset
"\${#VAR}"                       # string length
"\${VAR%.*}"                     # strip shortest suffix (filename ext)
"\${VAR##*/}"                    # strip longest prefix (basename)`,
}

// ── Disk & Filesystem ────────────────────────────────────────────────────────
const disk = {
  col1: `\
# df — filesystem space
df -h                            # all mounts, human-readable sizes
df -Th                           # include filesystem type
df -ih                           # inode usage — a separate limit to block space
df -h <path>                     # filesystem that contains this path

# df — examples
df -h | grep -v tmpfs            # real filesystems only
df -ih | awk '$5+0 > 80'         # mounts above 80% inode use
# disk full but df shows space free? run df -ih — inode exhaustion
# symptom: "no space left on device" with blocks available

# lsblk / findmnt
lsblk                            # block device tree with sizes
lsblk -f                         # include filesystem type and UUID
findmnt <path>                   # which device serves this path
findmnt -D                       # disk usage per mount (like df -h)
mount | grep <fs>                # check mount options

# examples
lsblk -f | grep -v loop          # real disks only, skip loopback
findmnt /var/log                 # what device backs /var/log
mount | grep -i noexec           # check for noexec mount restrictions`,

  col2: `\
# du — directory size
du -sh <dir>                     # total size of a directory
du -sh * | sort -rh              # top-level items, largest first
du -h --max-depth=1 <dir>        # one level deep breakdown
du -sh /var/log/*                # size per log subdirectory

# du — examples
du -sh * | sort -rh | head -10   # find the 10 biggest things here
du -sh /var/log/* | sort -rh     # which service generates most log volume
du -sh /var/lib/docker           # docker data dir (common culprit on EC2)

# find — locate files by attribute
find <dir> -size +100M           # files larger than 100MB
find <dir> -size +1G             # files larger than 1GB
find <dir> -name "*.log" -size +50M
find <dir> -mtime -1             # modified in last 24 hours
find <dir> -mtime +30 -name "*.log"  # old logs — candidates for rotation
find <dir> -type f -empty        # zero-byte files
# opts  -size +N[k|M|G]  -mtime ±N days  -type f/d  -xdev stay on device

# find — examples
find /var/log -name "*.log" -size +100M -ls     # large logs with sizes
find /tmp -mtime +7 -delete                     # purge tmp older than a week
find / -xdev -size +500M 2>/dev/null | sort     # large files, this device only`,

  col3: `\
# lsof — open file inspection
lsof <file>                      # which processes have this file open
lsof +D <dir>                    # all open files under a directory
lsof | grep deleted              # deleted files still held open (disk leak)
lsof -p <pid>                    # all files open by a process
lsof -u <user>                   # all files open by a user
# opts  +D dir  -p pid  -u user  -c cmdname  -i network

# lsof — examples
lsof | grep deleted | awk '{print $2, $7, $9}'
# ↑ pid, size, filename — find what is leaking disk after deletion
lsof +D /var/log | awk '{print $1, $2}' | sort -u  # writers to /var/log
# pattern: service rotated its log, space not freed → lsof | grep deleted
# fix: restart the process holding the fd — space reclaimed immediately

# fuser — processes blocking a mount
fuser <file>                     # PIDs with this file open
fuser -m <mountpoint>            # all PIDs using a mount
fuser -v <file>                  # verbose: user, PID, access type
fuser -km <mountpoint>           # kill all users then ready to umount

# examples
fuser -m /mnt/data               # "target is busy" — who is blocking umount?
fuser -km /mnt/data && umount /mnt/data  # evict and unmount in one line
lsof | grep deleted | wc -l      # total count of leaked file descriptors`,
}

// ── Permissions & Security ───────────────────────────────────────────────────
const perms = {
  col1: `\
# chmod — file permissions
chmod 644 <file>                 # rw-r--r--  standard file
chmod 755 <dir>                  # rwxr-xr-x  standard directory
chmod 600 <file>                 # rw-------  private (keys, creds)
chmod +x <script>                # add execute bit
chmod -R 755 <dir>               # recursive apply
chmod g+s <dir>                  # setgid: new files inherit group
# octal  4=r  2=w  1=x  |  644 rw-r--r--  755 rwxr-xr-x  700 rwx------

# chmod — examples
chmod 600 ~/.ssh/authorized_keys       # sshd rejects if too permissive
chmod 640 /etc/app/config.env          # owner rw, group r, world none
find /var/www -type f -exec chmod 644 {} \;  # fix web root file perms
find /var/www -type d -exec chmod 755 {} \;  # fix web root dir perms

# chown
chown <user>:<group> <file>      # change owner and group
chown -R <user>:<group> <dir>    # recursive
chown :<group> <file>            # group only, keep owner
stat <file>                      # permissions, owner, mtime, inode
stat -c '%U %G %a' <file>        # owner group octal — scriptable

# chown — examples
chown -R nginx:nginx /var/www/html   # hand web root to service user
chown root:root /etc/cron.d/<job>    # cron files must be root-owned
chown -R ec2-user:ec2-user /app      # restore ownership after root deploy
stat -c '%a %U %G' /etc/shadow       # verify shadow is 640 root:shadow`,

  col2: `\
# sudo — privilege escalation
sudo <command>                   # run as root
sudo -u <user> <command>         # run as specific user
sudo -l                          # list sudo rights for current user
sudo -i                          # root login shell (full env)
visudo                           # safely edit /etc/sudoers (with lock)
# drop-ins: /etc/sudoers.d/ — each file must be mode 440, no world write

# sudo — examples
sudo systemctl restart <unit>    # most common production use
sudo -u postgres psql            # connect as postgres system user
sudo -l -U <user>                # check another user's sudo rights
sudo bash -c 'cmd1 && cmd2'      # run a pipeline as root

# umask — default permission mask
umask                            # show current mask
umask 022                        # new files 644, dirs 755 (system default)
umask 027                        # new files 640, dirs 750 (no world access)
# new perms = base minus mask  (base: 666 files, 777 dirs)

# lsattr / chattr — immutable flags
lsattr <file>                    # show extended attribute flags
chattr +i <file>                 # immutable — even root cannot modify
chattr -i <file>                 # remove immutable flag
chattr +a <file>                 # append-only (safe for log files)

# examples
lsattr /etc/resolv.conf          # is it locked by cloud-init or dhclient?
chattr +i /etc/resolv.conf       # stop dhclient overwriting DNS config
lsattr /etc/passwd /etc/shadow   # check core auth files for hidden flags`,

  col3: `\
# SELinux — mode and status
getenforce                       # Enforcing / Permissive / Disabled
setenforce 0                     # → Permissive (temporary, survives nothing)
setenforce 1                     # → Enforcing
sestatus                         # mode, policy name, booleans summary
# permanent mode: SELINUX= in /etc/selinux/config (requires reboot)

# SELinux — audit and diagnosis
ausearch -m avc -ts recent       # recent access vector cache denials
ausearch -m avc -ts today        # all AVC denials today
ausearch -m avc -c <process>     # denials for a specific process name
ausearch -m avc -ts recent | audit2why  # human-readable denial reason

# SELinux — context inspection and repair
ls -Z <file>                     # show file SELinux context label
ps -eZ | grep <service>          # show process context domain
restorecon -v <file>             # restore context from policy
restorecon -Rv <dir>             # recursive restore (after cp/mv broke ctx)
chcon -t <type> <file>           # change type label (temporary, not policy)

# SELinux — examples
getenforce && ausearch -m avc -ts recent | tail -20
restorecon -v /etc/app/config    # denied after file moved in — wrong ctx
restorecon -Rv /var/www/html     # re-deploy wiped contexts — mass restore
setsebool -P httpd_can_network_connect 1  # allow nginx to proxy upstream
ausearch -m avc -ts today | audit2why    # turn denials into plain English`,
}

// ── Networking ───────────────────────────────────────────────────────────────
const net = {
  col1: `\
# ss — socket statistics
ss -tlnp                         # TCP listening sockets with PIDs
ss -tunlp                        # TCP+UDP listening with PIDs
ss -tp                           # established TCP with process
ss -s                            # summary counts by socket state
# opts  -t tcp  -u udp  -l listen  -n numeric  -p pids  -4/-6 af

# ss — examples
ss -tlnp | grep :8080            # which process holds port 8080
ss -tp | grep ESTABLISHED | wc -l  # count live TCP connections
ss -tlnp | grep -v sshd          # all listeners except ssh
watch -n2 'ss -s'                # live socket state monitor

# ip — interfaces and routing
ip addr show                     # all interfaces with IPs
ip addr show <iface>             # single interface detail
ip route show                    # full routing table
ip route get <ip>                # route and src IP for a destination
ip link show                     # interface names and link state
ip -s link show <iface>          # tx/rx packet and error counts

# ip — examples
ip route get 10.0.1.5            # which route handles a VPC-internal IP
ip addr show | grep -E 'inet |state'  # all IPs and link states, compact`,

  col2: `\
# curl — HTTP testing and health checks
curl -I <url>                    # response headers only (HEAD request)
curl -s -o /dev/null -w '%{http_code}' <url>  # status code, no body
curl -v <url>                    # verbose: TLS handshake, headers, body
curl -k <url>                    # skip TLS cert verification
curl -m 5 <url>                  # abort after 5s timeout
curl -L <url>                    # follow redirects

# curl — examples
curl -sf http://localhost:8080/health && echo ok  # local service health check
curl -s -o /dev/null -w '%{http_code}\n' -m3 http://<alb-dns>/health
curl -H 'Authorization: Bearer <token>' https://<api>/endpoint
curl -X POST -H 'Content-Type: application/json' -d '{"k":"v"}' <url>
curl -s --connect-timeout 2 http://<private-ip>:9090/metrics | head -20

# dig — DNS resolution
dig +short <hostname>            # IP only — quick resolve check
dig <hostname>                   # full A record response with TTL
dig @<nameserver> <hostname>     # query a specific resolver
dig -x <ip>                      # reverse DNS lookup
dig +trace <hostname>            # trace full delegation from root
# opts  +short  +trace  -x reverse  AAAA/MX/TXT record types

# dig — examples
dig @169.254.169.253 <hostname>  # query VPC resolver directly (EC2)
dig +short <rds-endpoint>        # confirm RDS hostname resolves
dig +trace <hostname>            # debug: pinpoint where DNS breaks`,

  col3: `\
# nc — port and connectivity testing
nc -zv <host> <port>             # TCP reachability test
nc -zvw3 <host> <port>           # with 3s connect timeout
nc -l <port>                     # listen (throwaway test listener)
nc -zvu <host> <port>            # UDP port test
# opts  -z scan  -v verbose  -w timeout  -u udp

# nc — examples
nc -zv db.internal 5432          # can we reach Postgres?
nc -zvw2 <rds-endpoint> 3306     # RDS port check, 2s timeout
for p in 80 443 8080 8443; do nc -zvw1 <host> $p 2>&1; done
echo | nc -w1 <host> 443 && echo open || echo closed

# traceroute / ping
traceroute <host>                # hop-by-hop path with RTT
traceroute -T -p 443 <host>      # TCP SYN trace — crosses SG rules
ping -c 4 <host>                 # 4 ICMP packets then exit
ping -c 10 -i 0.2 <host>         # rapid-fire: spot packet loss fast

# examples
traceroute -T -p 443 <alb-dns>   # trace path to ALB over HTTPS port
ping -c 1 -W 1 <ip> && echo up || echo down  # scriptable host-up check
curl -s https://checkip.amazonaws.com  # confirm outbound/NAT public IP
ss -tlnp | awk 'NR>1 {print $4, $6}'  # ports and PIDs, one per line`,
}

// ── Logs & Text Processing ───────────────────────────────────────────────────
const logs = {
  col1: `\
# grep — search and filter
grep -i <pattern> <file>         # case-insensitive match
grep -r <pattern> <dir>          # recursive directory search
grep -l <pattern> <dir>          # list only filenames that match
grep -n <pattern> <file>         # show line numbers
grep -v <pattern> <file>         # invert: exclude matching lines
grep -E <pattern> <file>         # extended regex (ERE)
grep -P <pattern> <file>         # Perl-compatible regex
grep -c <pattern> <file>         # count matching lines
grep -o <pattern> <file>         # print only matched portion
grep -A 5 <pattern> <file>       # 5 lines after match
grep -B 3 <pattern> <file>       # 3 lines before match
grep -C 3 <pattern> <file>       # 3 lines context both sides
grep --include="*.log" -r <pat> . # recursive, filtered by filename

# tail / head
tail -f <file>                   # follow live output
tail -F <file>                   # follow by name (survives rotation)
tail -n 200 <file>               # last N lines
head -n 50 <file>                # first N lines`,

  col2: `\
# awk — field and pattern processing
awk '{print $1, $3}' <file>      # print fields 1 and 3
awk -F: '{print $1}' /etc/passwd # custom field delimiter
awk '/error/ {print NR, $0}' <file>  # match pattern, print line+number
awk '$3 > 100 {print}' <file>    # conditional row filter
awk '{sum+=$4} END {print sum}' <file>  # sum a numeric column
awk 'NR==10,NR==20' <file>       # print line range 10–20
awk '!seen[$0]++' <file>         # deduplicate, preserve order
awk 'END {print NR}' <file>      # count lines (like wc -l)
awk '{print NF}' <file>          # field count per line

# cut — column extraction
cut -d: -f1 /etc/passwd          # field 1, colon delimiter
cut -d' ' -f2,4 <file>           # fields 2 and 4, space delimiter
cut -c1-40 <file>                # first 40 characters per line

# wc — counts
wc -l <file>                     # line count
wc -w <file>                     # word count
wc -c <file>                     # byte count`,

  col3: `\
# sed — stream editing
sed 's/old/new/' <file>          # replace first match per line
sed 's/old/new/g' <file>         # replace all matches per line
sed -i 's/old/new/g' <file>      # edit file in place
sed -n '10,20p' <file>           # print lines 10–20 only
sed '/pattern/d' <file>          # delete matching lines
sed -n '/START/,/STOP/p' <file>  # print block between markers
sed 's/[[:space:]]*$//' <file>   # strip trailing whitespace

# sort & uniq — frequency analysis
sort <file>                      # lexicographic sort
sort -n <file>                   # numeric sort
sort -rn <file>                  # reverse numeric
sort -k2,2 <file>                # sort by field 2 only
sort -u <file>                   # sort and deduplicate
sort | uniq -c | sort -rn        # frequency count, ranked

# pipelines — log analysis patterns
journalctl -u <unit> --no-pager | grep -i error | tail -50
grep -E 'ERROR|WARN' <file> | awk '{print $NF}' | sort | uniq -c | sort -rn
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -20
grep -v '^#' <file> | grep -v '^$'`,
}

// ── Processes & Services ──────────────────────────────────────────────────────
const proc = {
  col1: `\
# systemctl — unit lifecycle
systemctl status <unit>          # state, PID, recent log lines
systemctl start <unit>           # start unit
systemctl stop <unit>            # stop unit
systemctl restart <unit>         # stop then start
systemctl reload <unit>          # reload config (sends SIGHUP)
systemctl enable <unit>          # start on boot
systemctl disable <unit>         # remove from boot
systemctl daemon-reload          # rescan unit files after edits

# systemctl — inspection
systemctl list-units --failed    # all failed units
systemctl list-units --type=service --state=running
systemctl is-active <unit>       # exits 0 if active (use in scripts)
systemctl is-enabled <unit>      # exits 0 if boot-enabled
systemctl show <unit> -p MainPID # PID of service main process
systemctl cat <unit>             # show resolved unit file on disk`,

  col2: `\
# journalctl — structured log queries
journalctl -u <unit>             # all logs for unit
journalctl -u <unit> -f          # follow live output
journalctl -u <unit> -n 100      # last 100 lines
journalctl -u <unit> -p err      # priority: emerg crit alert err warning
journalctl -u <unit> --since "1 hour ago"
journalctl -xe                   # recent logs + catalog explanation
journalctl --boot                # current boot logs only
journalctl --no-pager -u <unit> | grep -i error

# ps — process snapshot
ps aux                           # all procs: user cpu mem cmd
ps aux --sort=-%cpu              # by cpu, descending
ps aux --sort=-%mem              # by memory, descending
ps -ef                           # full format — shows PPID
ps -eo pid,ppid,stat,cmd,%cpu,%mem --sort=-%cpu
pgrep -la <name>                 # PIDs by name with full cmdline
pstree -p                        # process tree with PIDs`,

  col3: `\
# kill — signals
kill <pid>                       # SIGTERM (15) — graceful shutdown
kill -9 <pid>                    # SIGKILL — force, unblockable
kill -HUP <pid>                  # SIGHUP — reload config
kill -0 <pid>                    # probe if process exists, no signal
pkill -f <pattern>               # kill by full command match
pkill -u <user>                  # kill all processes by user
killall <name>                   # SIGTERM all matching by name
kill -l                          # list signal names and numbers

# /proc — live process inspection
cat /proc/<pid>/status           # state, threads, VmRSS, uid
ls -la /proc/<pid>/fd            # open file descriptor count and list
lsof -p <pid>                    # open files and sockets for PID
strace -p <pid>                  # trace syscalls on running process
strace -p <pid> -c               # syscall count and time summary
ulimit -a                        # current shell resource limits`,
}

const sections = [
  {
    id: 'linux',
    label: 'Linux Raw',
    tabs: [
      { id: 'processes', label: 'Processes & Services' },
      { id: 'logs', label: 'Logs & Text Processing' },
      { id: 'networking', label: 'Networking' },
      { id: 'permissions', label: 'Permissions & Security' },
      { id: 'disk', label: 'Disk & Filesystem' },
      { id: 'scripting', label: 'Scripting' },
    ],
  },
  {
    id: 'aws',
    label: 'AWS & Systems',
    tabs: [
      { id: 'net-fundamentals', label: 'Networking Fundamentals' },
      { id: 'cloud-aws', label: 'Cloud & AWS Foundations' },
      { id: 'compute', label: 'Compute & Scaling' },
      { id: 'data-messaging', label: 'Data & Messaging' },
      { id: 'observability', label: 'Observability' },
      { id: 'ha-dr', label: 'HA & DR Patterns' },
      { id: 'security', label: 'Security Posture' },
      { id: 'iac', label: 'IaC — CDK & Terraform' },
    ],
  },
  {
    id: 'star',
    label: 'STAR Stories',
    tabs: [
      { id: 'complex-problem', label: 'Complex Problem' },
      { id: 'difficult-client', label: 'Difficult Client' },
      { id: 'disagree-commit', label: 'Disagree & Commit' },
    ],
  },
  {
    id: 'career',
    label: 'Career & Values',
    tabs: [
      { id: 'narrative', label: 'Career Narrative' },
      { id: 'why-aws', label: 'Why AWS & This Role' },
      { id: 'values', label: 'Values & Self-Awareness' },
      { id: 'questions', label: 'Questions to Ask' },
    ],
  },
]

const activeSection = ref('linux')
const activeTab = ref('processes')

const activeKey = computed(() => `${activeSection.value}-${activeTab.value}`)

function toggleSection(sectionId) {
  if (activeSection.value !== sectionId) {
    activeSection.value = sectionId
    activeTab.value = sections.find(s => s.id === sectionId).tabs[0].id
  }
}

function setTab(sectionId, tabId) {
  activeSection.value = sectionId
  activeTab.value = tabId
}
</script>
