export const observabilityCards = [
  {
    title: 'CloudWatch Metrics',
    body: `Default EC2 metrics (no agent required):
  CPUUtilization, NetworkIn/Out, DiskReadOps/WriteOps
  StatusCheckFailed_Instance, StatusCheckFailed_System

**NOT captured by default** — require CloudWatch Agent:
  Memory utilisation (MemoryUsed, MemoryAvailable)
  Disk space (DiskUsed, DiskFree per mount)
  Process-level metrics

Custom metrics: publish via PutMetricData API or CloudWatch Agent config.
Standard resolution: **1-minute**. High resolution: **1-second** (higher cost).
Metric retention: 15 months. Granularity coarsens over time.`,
  },
  {
    title: 'CloudWatch Agent',
    body: `Installed on EC2 (or on-premises). Requires IAM role with
**CloudWatchAgentServerPolicy** or equivalent.

Config managed via **SSM Parameter Store** — no hardcoded paths.
Ships to SSM on one instance, distribute fleet-wide via SSM Run Command.

Collects: memory, disk, swap, process metrics, and log files.
Log file tailing: define log file path → ships to specified log group.
Multiple log files → multiple log group targets in one config.`,
    code: `# verify agent is running
systemctl status amazon-cloudwatch-agent
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \\
  -a status`,
  },
  {
    title: 'Log Groups & Streams',
    body: `**Log group**: logical container for related logs. One per application or service.
Retention set at group level — default is **never expire** (costs accumulate).
Set retention: 7, 14, 30, 90, 365 days depending on compliance requirement.

**Log stream**: sequence of events from one source within a group.
One stream per EC2 instance or ECS task.

Ship logs before instance terminates:
Use lifecycle hook (Terminating:Wait) to flush in-flight logs.
Gone instance = gone logs if not shipped.

/aws/lambda/<function>          Lambda — one stream per invocation container
/aws/ecs/containerlogs          ECS task logs via awslogs driver
/aws/rds/instance/<id>/error    RDS engine logs`,
  },
  {
    title: 'Alarms',
    body: `**Threshold**: metric crosses static value for N consecutive periods.
  CPU > 80% for 5 minutes → ALARM → trigger SNS or scaling policy.

**Anomaly detection**: ML baseline from metric history. Alert on deviation.
No fixed threshold. Useful for metrics with variable normal patterns.

**Composite alarm**: AND/OR logic across multiple alarms.
  Reduce noise: only alert if CPU high AND error rate high simultaneously.

Alarm states:
  **OK**                  metric within threshold
  **ALARM**               metric breached threshold
  **INSUFFICIENT_DATA**   no data — not the same as OK.
                      Common after instance stop or metric gap.`,
  },
  {
    title: 'CloudWatch Logs Insights',
    body: `Interactive query language for log groups. Faster than grep at scale.
Aggregates across multiple log streams and log groups simultaneously.`,
    code: `# errors in last hour, count by 5-minute window
fields @timestamp, @message
| filter @message like /ERROR/
| stats count(*) by bin(5m)

# top 10 slowest Lambda invocations
fields @timestamp, @duration
| sort @duration desc
| limit 10

# 5xx errors with request path (ALB access logs)
fields @timestamp, requestProcessingTime, targetStatusCode, requestUri
| filter targetStatusCode like /5\\d\\d/
| sort requestProcessingTime desc`,
    wide: true,
  },
  {
    title: 'Baseline Alarms',
    body: `These should exist on every production workload:

**CPUUtilization** > 80%                    EC2 — scaling signal or investigation
**MemoryUtilization** > 80%                 requires CloudWatch Agent
**DiskUsed** > 80% per mount                requires CloudWatch Agent
**HTTPCode_Target_5XX_Count** > threshold   ALB — application-level failures
**TargetResponseTime** > threshold          ALB — latency degradation
**DatabaseConnections** near max            RDS — precursor to exhaustion
**FreeStorageSpace** < threshold            RDS — autoscaling has limits
**ApproximateAgeOfOldestMessage**           SQS — consumer lag
**UnhealthyHostCount** > 0                  ALB target group`,
  },
  {
    title: 'X-Ray & Distributed Tracing',
    body: `X-Ray traces requests across services — Lambda, API Gateway, ECS, RDS.
Produces service map showing latency and error rate per connection.

**Trace**: full path of one request through your system.
**Segment**: one service's contribution to a trace.
**Subsegment**: database query, HTTP call, or custom annotation.

Use when: latency problem exists but CloudWatch metrics don't isolate it.
X-Ray shows exactly which service or dependency is slow.

**Sampling**: X-Ray does not trace every request by default. Default: 5% + 1/sec.
Increase sampling rate for debugging, reduce for cost in high-traffic systems.`,
  },
]
