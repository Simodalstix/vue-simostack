export const cloudAwsCards = [
  {
    title: 'CapEx vs OpEx',
    body: `CapEx: upfront hardware purchase. Capital tied up before workload runs.
Capacity planning is a guess. Long refresh cycles.

OpEx: pay-as-you-go. Costs vary with consumption.
No procurement lead time. Scale in minutes, decommission same day.
Finance treats it as operational spend, not depreciating asset.`,
  },
  {
    title: 'Deployment Models',
    body: `Public      shared infra, provider-owned, logical isolation, lowest ops burden
Private     dedicated infra, full control, higher cost, justified by compliance
Hybrid      on-prem for sensitive/legacy, cloud for burst and net-new
            AWS Direct Connect + Outposts are the integration primitives
Multi-cloud deliberate multi-provider — avoid lock-in, optimise per workload`,
  },
  {
    title: 'IaaS / PaaS / SaaS',
    body: `IaaS    raw compute/storage/network — you manage OS and up    EC2
PaaS    provider manages OS + runtime — you manage app/data   RDS, Beanstalk
SaaS    provider manages everything — you configure and use   M365, WorkMail

Responsibility boundary shifts down with each layer.
More managed = less control, less ops burden.`,
  },
  {
    title: 'NIST 5 Characteristics',
    body: `On-demand self-service    provision via API, no human involvement from provider
Broad network access      available from any device over standard protocols
Resource pooling          shared infrastructure, dynamically assigned per demand
Rapid elasticity          scale up or down in minutes — appears unlimited
Measured service          usage metered and billed at resource level`,
  },
  {
    title: 'AWS Global Infrastructure',
    body: `Regions      30+ geographic areas. Fully independent — no data crosses without
             explicit action. Choose on: residency, latency, service availability.
             ap-southeast-2 Sydney (PROTECTED). ap-southeast-4 Melbourne.
AZs          physically separate DCs per region. Independent power + networking.
             Deploy across 2+ AZs to survive DC failure.
             AZ names (ap-southeast-2a) are randomly mapped per account.
Edge/PoP     400+ locations. CloudFront, Route 53, Global Accelerator.
             Serves content from the edge closest to the user.`,
  },
  {
    title: 'Shared Responsibility',
    body: `AWS owns     physical hardware, hypervisor, managed service software stack
             (RDS engine patches, S3 durability, Lambda runtime)
You own      IAM policies, VPC controls, SGs, encryption config, EC2 OS patching,
             application security, audit logging, S3 bucket policies

Boundary shifts by service type:
EC2          you own guest OS and up
RDS          AWS manages engine + OS — you manage access controls + encryption
Lambda       AWS manages runtime — you own code, IAM, env vars

Common failure: treating managed services as fully AWS's responsibility.
Public S3 bucket = your problem. Unpatched EC2 = your problem.`,
  },
  {
    title: 'AWS Value Proposition',
    body: `200+ services. Depth matters — EventBridge connects 90+. IAM is uniform.
No minimum commitment. Reserved/Savings Plans = 30–70% savings on commitment.
Spot = up to 90% savings for interruption-tolerant workloads.
IaC via CloudFormation/CDK — weeks of procurement deploys in minutes.
New features in console and API immediately — no upgrade cycle.`,
  },
  {
    title: 'IRAP & AGSVA',
    body: `IRAP         ASD scheme assessing services against ISM. Assessment ≠ certification.
             Produces report — agency accepts risk, not AWS.
ap-southeast-2  IRAP assessed to PROTECTED level
ap-southeast-4  assessed to OFFICIAL and OFFICIAL:Sensitive
Clearances   Baseline → NV1 → NV2 → PV. Each is a separate grant.
             PROTECTED and above = NV1 minimum. Def/Intel often NV2 or PV.
Sovereignty  region selection (syd/mel) + SCPs denying calls outside ap-southeast-2/4`,
  },
  {
    title: 'Well-Architected — 6 Pillars',
    body: `Operational Excellence   IaC, small reversible changes, anticipate failure
Security                 least privilege, encryption everywhere, enable traceability
Reliability              multi-AZ, health checks, tested restore procedures
Performance Efficiency   right instance type, serverless where applicable
Cost Optimisation        right-sizing, Reserved/Savings Plans, delete unused
Sustainability           higher utilisation, managed services, optimise compute hours`,
  },
  {
    title: 'AWS Culture',
    body: `Working Backwards    start from customer press release before writing code
Two-Pizza Teams      small teams own build + deploy + operate — no hand-offs
Mechanisms not heroics  operational issues → corrective process, not just fix
CoE                  Corrections of Error — blameless, systemic improvement focus
Measure everything   alarms before customers notice, dashboards owned by the team`,
  },
]
