export const haDrCards = [
  {
    title: 'Spotting HA Gaps',
    body: `**Single EC2 behind ALB**
  No fault tolerance. AZ failure = total outage.
  **Fix**: ASG across 2+ AZs, min capacity 2, ELB health check type.

**RDS no Multi-AZ**
  Single point of failure for data tier.
  Instance failure = manual recovery. Hours of RTO.
  **Fix**: enable Multi-AZ. ~60–120s automatic failover.

**Single NAT Gateway**
  AZ failure takes all private subnet outbound traffic with it.
  **Fix**: one NAT Gateway per AZ. Each private subnet routes to local NGW.
  Cross-AZ NGW traffic also incurs data transfer charges.

**Hardcoded config / manual changes to production**
  Drift creates incidents. IaC only. Manual change = undocumented state.

**No health check on /health**
  Static 200 from broken app routes real traffic to broken target.
  ALB only removes targets marked unhealthy — app must report honestly.`,
  },
  {
    title: 'RTO & RPO',
    body: `**RTO** — Recovery Time Objective
How long until service is restored after failure.
Drives compute recovery strategy.
Lower RTO = more pre-provisioned infrastructure = higher cost.

**RPO** — Recovery Point Objective
How much data loss is acceptable.
Drives replication strategy and backup frequency.
RPO=0 requires synchronous replication (Multi-AZ).
RPO=hours allows daily snapshots.

Plan both independently. A 1-hour RTO with a 0 RPO is a valid design.
A 15-minute RTO with a 24-hour RPO is also valid — depends on the workload.`,
  },
  {
    title: 'Pilot Light DR',
    body: `Minimal infrastructure warm in DR region. Cheapest active DR pattern.

**What's running in DR:**
  RDS read replica — running, replicating, promotable
  ASG at 0 — template ready, no instances running
  ALB pre-configured — listeners and target groups exist
  Route 53 health check watching primary

**Recovery sequence:**
  1. Promote RDS read replica to standalone (~minutes, breaks replication)
  2. Scale ASG desired → N (instances launch from pre-baked AMI)
  3. Route 53 health check fails primary → failover record activates
  4. DNS TTL expires → traffic shifts to DR region

**RTO**: 15–30 minutes. **RPO**: seconds to minutes (async replication lag).
Cost: fraction of full warm standby — pay for replica + ALB, not compute.`,
  },
  {
    title: 'Warm Standby & Multi-Site',
    body: `**Warm Standby**
Scaled-down but fully operational stack running in DR region.
Scale up on failover — faster than Pilot Light, higher ongoing cost.
RTO: minutes. All services running — just undersized.

**Multi-site active/active**
Traffic split across regions continuously (weighted or latency routing).
No failover required — redirect remaining traffic on failure.
Near-zero RTO. Highest cost and operational complexity.
Requires data synchronised or partitioned across regions.
Global DynamoDB tables, Aurora Global Database support this pattern.

Choose based on RTO/RPO requirements and cost tolerance.
Pilot Light → Warm Standby → Multi-site = increasing cost, decreasing RTO.`,
  },
  {
    title: 'Blue/Green Deployments',
    body: `Two identical environments. Traffic shifted via ALB or Route 53.
Rollback = traffic shift back. No rebuild required. Zero-downtime.

**CodeDeploy** manages shift:
  Canary      small % first (e.g. 10%), validate, then full shift
  Linear      incremental (e.g. 10% every minute until 100%)
  All-at-once immediate full shift — fastest, no validation window

Auto-rollback triggers:
  5xx rate exceeds threshold during deployment window
  CloudWatch alarm enters ALARM state
  Health check failures in new target group

Blue/green requires enough capacity to run both environments simultaneously.
For EC2/ECS: double compute during deployment window.
For Lambda: traffic shifting via weighted aliases — no extra cost.`,
  },
  {
    title: 'Route 53 Routing Policies',
    body: `**Simple**          single record, no health checks, basic resolution
**Weighted**        split traffic by percentage — A/B testing, gradual migration
**Latency**         route to lowest-latency region for the user
**Failover**        primary + standby. Health check on primary.
                Primary fails check → Route 53 serves failover record.
**Geolocation**     route based on user's geographic location
**Geoproximity**    route based on distance, with bias adjustment
**Multi-value**     up to 8 healthy records returned, client chooses

TTL on failover records: keep low (60s). High TTL = clients cache stale
record during outage and fail to reach DR endpoint.`,
  },
  {
    title: 'Route 53 Health Checks',
    body: `HTTP/HTTPS/TCP health checks to an endpoint or CloudWatch alarm.
Check interval: **30s** (standard) or **10s** (fast, higher cost).
Failure threshold: consecutive failures before marking unhealthy (default 3).

**Calculated health checks**: combine multiple checks with AND/OR logic.
Use to build composite health signal from multiple endpoints.

Health check → failover routing: primary record has health check attached.
On failure, Route 53 serves the failover record automatically.
DNS propagation bounded by TTL — set TTL low on records that must fail fast.

Health checks originate from multiple AWS regions simultaneously.
Endpoint must be publicly reachable (or use CloudWatch alarm as proxy
for private endpoints).`,
  },
  {
    title: 'Multi-AZ Design Principles',
    body: `Deploy across minimum **2 AZs** in production. 3 AZs for higher resilience.
AZ failure should degrade capacity, not cause an outage.

Stateless compute: EC2 and ECS tasks are replaceable. ASG replaces them.
Stateful data: Multi-AZ RDS, ElastiCache cluster mode, S3 (11 nines durability).

ALB spans multiple AZs automatically. Targets in failed AZ are removed.
NAT Gateway: one per AZ. Never route across AZs for outbound — adds cost + risk.

Cross-AZ data transfer: charged at **$0.01/GB** in most regions.
Design data flows to stay within an AZ where possible.
RDS Multi-AZ replication is exempt from cross-AZ transfer charges.`,
  },
]
