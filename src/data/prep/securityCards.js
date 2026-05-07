export const securityCards = [
  {
    title: 'Security Groups vs NACLs',
    body: `**Security Groups** (instance-level)
  **Stateful** — return traffic is automatically allowed.
  Whitelist only — deny by default, no explicit deny rule.
  Applied to ENI (network interface). Multiple SGs per instance.
  Reference other SGs by ID — cleaner than IP ranges for internal traffic.

**NACLs** (subnet-level)
  **Stateless** — must allow inbound AND outbound explicitly.
  Ordered rules — first match wins. Lower number = higher priority.
  Can **explicitly deny** — useful for blocking known bad IP ranges.
  Applied to all traffic entering/leaving a subnet.

Use SGs for most access control. Use NACLs for broad subnet-level blocks.
SG and NACL changes take effect immediately.`,
  },
  {
    title: 'SSM Session Manager',
    body: `Replace SSH entirely. **No port 22 open. No key management.**
Session logs to S3 or CloudWatch — fully audited. IAM-controlled access.

Requirements: SSM Agent running on instance + IAM role with SSM policy.
Amazon Linux 2/2023: SSM Agent pre-installed. Ubuntu: install manually.`,
    code: `# start a session
aws ssm start-session --target i-0abc1234def56789

# run a command fleet-wide
aws ssm send-command \\
  --instance-ids i-0abc i-0def \\
  --document-name AWS-RunShellScript \\
  --parameters '{"commands":["systemctl status nginx"]}'

# port forwarding through SSM
aws ssm start-session --target i-0abc \\
  --document-name AWS-StartPortForwardingSession \\
  --parameters '{"portNumber":["5432"],"localPortNumber":["5432"]}'`,
    wide: true,
  },
  {
    title: 'IAM — Evaluation Logic',
    body: `Every API call: authenticated (who?) then authorised (allowed?).

Evaluation order — stops at first match:
  1. **Explicit Deny** in any attached policy  →  always wins, no exceptions
  2. **Explicit Allow** in any attached policy →  permitted if no deny
  3. **Implicit Deny** (default)              →  everything not allowed is denied

Identity types:
  **Users**       long-lived credentials — avoid for applications
  **Roles**       assumed by services, EC2, Lambda, federated users — prefer always
  **Groups**      collection of users — attach policies to groups, not users
  **Policies**    JSON: Effect + Action + Resource + Condition`,
  },
  {
    title: 'IAM — Least Privilege',
    body: `Start with nothing. Add only what is required. Scope to resource ARN.

**Access Analyzer**: flags wildcard permissions (s3:* on *) and external access.
**Access Advisor**: shows last used date per service per role.
               Remove permissions unused for 90+ days.
**Credential Report**: last used date for all IAM users and their keys.

Common mistakes:
  AdministratorAccess on application roles — scope to resource ARN
  Long-lived access keys — use instance profiles (auto-rotated) instead
  Inline policies — use managed policies for cleaner audit trail
  Wildcard resources — arn:aws:s3:::* instead of specific bucket ARN`,
    code: `# simulate what a role can do
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123:role/MyRole \\
  --action-names s3:GetObject \\
  --resource-arns arn:aws:s3:::my-bucket/*`,
  },
  {
    title: 'Instance Profiles & Credentials',
    body: `Instance profile: IAM role attached to EC2 instance.
Credentials delivered via metadata service (169.254.169.254).
Auto-rotated every ~6 hours by STS. No key management required.

Prefer instance profiles over access keys always.
Access keys can leak via code, logs, environment variables.
If keys must be used: store in Secrets Manager, rotate via Lambda.`,
    code: `# confirm which role the instance is using
aws sts get-caller-identity

# inspect credentials from metadata service
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/`,
  },
  {
    title: 'Encryption',
    body: `**At rest:**
  **KMS**: envelope encryption. Data key encrypted with KMS key.
       Customer-managed key = your audit trail in CloudTrail.
  **RDS**: encrypted at creation only. Cannot enable after.
       Workaround: snapshot → copy encrypted → restore.
  **S3**: SSE-S3 (AWS-managed), SSE-KMS (customer key), SSE-C (you supply key).
      SSE-KMS gives CloudTrail audit log of every decryption.
  **EBS**: encrypted at volume creation. Snapshot inherits encryption state.

**In transit:**
  TLS everywhere. ALB terminates TLS. ACM manages certs (auto-renewed).
  RDS: enforce SSL via parameter group. Reject unencrypted connections.
  S3: bucket policy denying requests without aws:SecureTransport.`,
  },
  {
    title: 'GuardDuty & CloudTrail',
    body: `**GuardDuty**: threat detection. Analyses CloudTrail, VPC Flow Logs, DNS logs.
No agents, no configuration beyond enabling it.
Finding types: recon activity, credential compromise, C2 traffic,
cryptocurrency mining, unusual API calls.
Enable in all regions — threats don't respect your primary region.

**CloudTrail**: API call audit log. Who did what, when, from where.
Management events: enabled by default. Data events (S3, Lambda): opt-in.
Ship to S3 for long-term retention. Enable log file validation.
Multi-region trail: one trail covering all regions — enable this.
CloudTrail Insights: detects unusual API activity volume automatically.`,
  },
  {
    title: 'AWS Config & Security Hub',
    body: `**AWS Config**: records configuration history and evaluates compliance rules.
  "Did someone open port 22 to 0.0.0.0/0?" → Config rule fires.
  Can auto-remediate via SSM Automation or Lambda.
  Conformance packs: pre-built rule sets (CIS, PCI-DSS, HIPAA).

**Security Hub**: aggregates findings from GuardDuty, Config, Inspector,
Macie, and third-party tools into a single view.
Security score per account. Finding severity: CRITICAL / HIGH / MEDIUM / LOW.
Enables cross-account and cross-region finding aggregation.

**Inspector**: vulnerability scanning for EC2 (OS packages) and ECR images.
Automated, continuous — no manual scan scheduling.`,
  },
  {
    title: 'Secrets Manager vs Parameter Store',
    body: `**Secrets Manager**
  Designed for credentials. Built-in rotation for RDS, Redshift, DocumentDB.
  Cross-account sharing. Automatic rotation via Lambda.
  Cost: ~$0.40/secret/month + $0.05 per 10,000 API calls.

**Parameter Store**
  Free for standard tier (up to 10,000 params, 4KB each).
  SecureString tier: KMS-encrypted — treat as secret.
  No built-in rotation. Use for: AMI IDs, endpoints, config values.
  Advanced tier: larger values, parameter policies (TTL, notification).

Rule of thumb:
  Credentials that rotate → Secrets Manager.
  Config values and AMI IDs → Parameter Store.
  Don't put credentials in plaintext in either service.`,
  },
]
