export const corePipePattern = `# top N items causing 5xx — the base pattern
awk '$9 ~ /^5[0-9][0-9]/ {print $1}' /var/log/access.log \\
  | sort | uniq -c | sort -rn | head -10

# uniq -c requires sorted input — sort BEFORE uniq, always
# sort -rn = sort numerically, reverse (highest first)
# adapt $1 (IP) to $7 (path) or other fields as needed`

export const scenarios = [
  // ── 1 — CAN'T REACH IT ───────────────────────────────────────────────────
  {
    id: 'cant-reach',
    label: "Can't Reach It",
    entry: 'no response, connection timed out, or immediately refused',
    signals: [
      { symptom: 'curl: connection timed out',   meaning: 'packet never arrives — SG, NACL, or routing' },
      { symptom: 'curl: connection refused',      meaning: 'reaches host, nothing listening on that port' },
      { symptom: 'ALB 502',                       meaning: 'targets not responding — app down or health check misconfigured' },
      { symptom: 'ALB 503',                       meaning: 'no healthy targets registered' },
      { symptom: 'process bound to 127.0.0.1',    meaning: 'reachable locally, invisible to ALB' },
    ],
    probes: [
      {
        q: 'ALB returning 502. Walk me through what you check.',
        a: [
          '502 = bad gateway — ALB is up, its targets are not responding',
          'Check target group: `aws elbv2 describe-target-health --target-group-arn <arn>`',
          'Test from instance directly: `curl -s http://localhost:8080/health`',
          'If process down: `systemctl status` + `journalctl -u myapp -n 50`',
          'If process up but refusing: `ss -tlnp | grep 8080` — check bind address',
        ],
      },
      {
        q: 'curl to the instance works but ALB still shows targets unhealthy.',
        a: [
          'Health check path wrong — ALB checks /health, app returns 404 on that path',
          'Response code mismatch — app returns 302, ALB expects 2xx only',
          'SG between ALB and instance doesn\'t allow ALB SG as source on app port',
          'Health check grace period expired before app was ready (new instance)',
        ],
      },
      {
        q: 'Port 22 times out. How do you get on the instance?',
        a: [
          '`aws ssm start-session --target <instance-id>`',
          'Requirements: SSM agent + AmazonSSMManagedInstanceCore role + outbound 443',
          'No port 22, no key pair, IAM-controlled, session logged to CloudTrail',
        ],
      },
      {
        q: "What's the difference between 502 and 503 from the ALB?",
        a: [
          '502 = targets exist but are not responding (app crashed, wrong port, bad bind)',
          '503 = no healthy targets registered at all (empty target group, all failing health checks)',
        ],
      },
      {
        q: 'SG vs NACL — what\'s the key operational difference?',
        a: [
          'SG = stateful, instance-level, allow-only. Return traffic automatic.',
          'NACL = stateless, subnet-level, allow and deny. Both directions explicit.',
          'NACL missing outbound ephemeral (1024-65535) = SSH or response traffic silently dropped',
        ],
      },
    ],
    prevention: [
      'Health check path: dedicated /health, always 200, no auth, no DB dependency',
      'SSM IAM role attached at launch — recovery path if SG misconfigured',
      'SG rules in IaC — manual SG changes are the most common cause of this class of incident',
      'ALB SG as source on instance SG inbound — not 0.0.0.0/0',
    ],
    scriptPush: 'Parse ALB access logs, output the top 10 source IPs returning 502s in the last hour. Core pattern: `awk \'$9 == 502 {print $1}\' access.log | sort | uniq -c | sort -rn | head -10`',
    flow: [
      "First question: did this ever work? If yes — what changed?",
      "Scope it: one user or everyone? One user might be client-side, DNS on their end, or a permissions issue. Everyone means I'm looking at infrastructure.",
      "If it's everyone, I start at the outermost layer. Can I even hit the load balancer?",
      { cmd: 'curl -I https://app.example.com' },
      { list: [
        "Nothing back at all → still at the network layer. Check DNS resolves, check the SG on the ALB, check Route 53.",
        "502 or 503 → the ALB is up but its targets are unhealthy or not registered. Move inward.",
        "200 → the ALB is healthy. The problem is somewhere behind it, or it's intermittent.",
      ]},
      "If I'm seeing 502/503, I go to the target group. Are instances registered? Are they passing health checks? A 502 from the ALB almost always means the instance isn't responding on the health check path.",
      "Next I want to know if I can hit the instance directly, bypassing the ALB:",
      { cmd: 'curl http://<instance-ip>:8080/health' },
      { list: [
        "Responds → the instance is fine. Problem is target group registration, health check config, or the SG between the ALB and instance.",
        "Refuses immediately → the process isn't listening on that port. Is it running at all?",
      ]},
      { cmd: 'ss -tlnp | grep 8080' },
      "Nothing there means the process is down. Check status and logs:",
      { cmd: 'systemctl status myapp' },
      { cmd: 'journalctl -u myapp -n 50' },
      "If the process is listening but the ALB still can't reach it — check what interface it's bound to. Bound to `127.0.0.1` means localhost only. The ALB can't reach it. Needs to be `0.0.0.0`.",
      "If I need to get on the instance and SSH times out — I'm not assuming it's the app. Check the SG allows port 22 from my source, or skip SSH entirely and use SSM. SSM doesn't need port 22.",
      { cmd: 'aws ssm start-session --target <instance-id>' },
    ],
  },

  // ── 2 — IT'S SLOW ────────────────────────────────────────────────────────
  {
    id: 'its-slow',
    label: "It's Slow",
    entry: 'reachable, but latency is high or throughput is degraded',
    signals: [
      { symptom: 'High load average, low CPU%',         meaning: 'I/O wait — disk or network bottleneck, not CPU' },
      { symptom: '%iowait high in iostat',               meaning: 'EBS saturated — check VolumeQueueLength in CloudWatch' },
      { symptom: 'Swap in use',                          meaning: 'memory exhausted, paging to disk — severe degradation' },
      { symptom: 'DB connections near max_connections',  meaning: 'connection pool exhaustion — requests queuing' },
      { symptom: 'Only specific endpoints slow',         meaning: 'application code path or downstream dependency' },
      { symptom: 'Latency rises before errors appear',   meaning: 'saturation before failure — look at DB or connections' },
    ],
    probes: [
      {
        q: 'High load average but CPU looks normal. What does that tell you?',
        a: [
          'Load average includes I/O-waiting processes, not just CPU-active ones',
          'High load + low CPU% = disk or network bottleneck',
          'Confirm with `iostat -x 1` — %iowait and %util columns',
          'EBS has IOPS/throughput limits — hitting them looks identical to slow disk',
        ],
      },
      {
        q: 'DB connections are maxed out. What are your options?',
        a: [
          'RDS Proxy — pools connections between app and RDS, prevents exhaustion',
          'Read Replica — offloads read volume, doesn\'t help write throughput',
          'ElastiCache — caches repeated reads, removes them from DB entirely',
          'These solve different problems — identify which before recommending',
        ],
      },
      {
        q: 'When would you use a read replica vs ElastiCache?',
        a: [
          'Read Replica: high read volume of different data, reporting queries, reduce primary load',
          'ElastiCache: repeated reads of the same data (product pages, session data)',
          'ElastiCache is faster (microseconds vs milliseconds) but requires cache invalidation logic',
        ],
      },
      {
        q: 'EBS looks fine at the OS level but app is still slow.',
        a: [
          'OS metrics (`iostat`) show what the instance sees — not EBS burst credit state',
          'Check CloudWatch: VolumeQueueLength > 1 = disk backed up even if OS looks okay',
          'gp2 IOPS burst from a credit bucket — exhaustion looks like sudden slowdown',
          'gp3 is provisioned — prefer it, no burst credit concern',
        ],
      },
      {
        q: 'How do you find which query is causing the slowdown?',
        a: [
          'Enable slow query log in RDS parameter group: `long_query_time`, `log_slow_queries`',
          'Performance Insights if enabled — shows top SQL by load in real time, no config needed',
          'From instance: `ss -tp | grep ESTABLISHED | grep 5432 | wc -l` — confirm connection count',
        ],
      },
    ],
    prevention: [
      'RDS Proxy — connection pooling, protects DB from connection exhaustion under load',
      'ElastiCache — cache repeated reads, keeps DB load flat as traffic grows',
      'CloudWatch Agent — memory and disk not captured by default, required for baseline alarms',
      'Slow query log enabled from day one — not retroactively when there\'s a problem',
      'ASG scaling policy on TargetResponseTime or RequestCountPerTarget, not just CPU',
    ],
    scriptPush: 'Monitor DB connection count every 5 seconds and log with timestamp. Core pattern: `watch -n 5 "echo $(date): $(ss -tp | grep ESTABLISHED | grep 5432 | wc -l) connections"`',
    flow: [
      "First: is it slow for everyone or one user? Is it consistently slow or does it spike? Does it correlate with time of day, a specific endpoint, or a specific operation?",
      "Pattern first. Touch nothing until I understand the shape of the problem.",
      "If it's consistent and widespread, I start at the host. Is the instance itself under pressure?",
      "`top` or `vmstat 1 5`",
      "High CPU — which process? Is this expected load or a runaway?",
      "High load average but CPU looks low — that's I/O wait. The CPU is sitting idle waiting for disk. Check `iostat`:",
      { cmd: 'iostat -x 1' },
      "%iowait elevated and %util on the disk approaching 100% means the disk is saturated. In AWS, EBS has IOPS and throughput limits. Hitting them looks identical to a slow physical disk. Check CloudWatch: VolumeQueueLength climbing is the clearest signal.",
      "If it's not disk, check memory:",
      { cmd: 'free -h' },
      "Swap usage means the system ran out of physical memory and is paging to disk. That's slow. Look for what's consuming memory with `top` sorted by %MEM.",
      "If the host looks healthy, the problem is almost always the database. That's where performance issues live.",
      { list: [
        "Connection count approaching max_connections → connections are queuing",
        "RDS CPU elevated",
        "Read/write latency climbing in CloudWatch",
        "Slow query log identifies the specific query that's causing it",
      ]},
      "Check live connection count from the instance:",
      { cmd: 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l' },
      "Connection exhaustion → RDS Proxy. Repeated reads of the same data → ElastiCache. Read volume overwhelming the primary → Read Replica.",
      "These are different problems with different fixes. Identify which before recommending anything.",
    ],
  },

  // ── 3 — IT'S CRASHING ────────────────────────────────────────────────────
  {
    id: 'crashing',
    label: "It's Crashing",
    entry: 'process keeps dying, OOM events, disk full, service restart loop',
    signals: [
      { symptom: 'Exit code 137',                   meaning: 'SIGKILL — OOM killer or manual kill, not an app crash' },
      { symptom: 'Exit code 1',                     meaning: 'application error — logs will have the reason' },
      { symptom: 'Exit code 139',                   meaning: 'segfault — application memory issue' },
      { symptom: 'df -h at 100%',                   meaning: 'disk full — app can\'t write, fails silently' },
      { symptom: 'dmesg shows "Kill process"',       meaning: 'OOM killer fired — confirms exit 137' },
      { symptom: 'Restart loop with CPU spike',      meaning: 'tight restart loop, bad config, no RestartSec delay' },
    ],
    probes: [
      {
        q: 'Service keeps restarting. Exit code 137. What happened and how do you confirm it?',
        a: [
          'Exit 137 = SIGKILL — process was killed, not crashed',
          'OOM killer is the most common cause: `dmesg | grep -i "killed process"`',
          'Confirm: anon-rss in dmesg output shows how much RAM the process had consumed',
          'Also check: `journalctl -u myapp -n 100` shows who/what triggered the kill',
        ],
      },
      {
        q: 'ASG keeps launching instances every 10 minutes. How do you investigate?',
        a: [
          'New instances terminate before you can get on them',
          'Check CloudWatch Logs — requires agent shipping logs before termination',
          'Check CloudTrail for instance termination events and timing',
          'Use lifecycle hook (Terminating:Wait) to pause termination and investigate',
          'Check ASG activity log: `aws autoscaling describe-scaling-activities`',
        ],
      },
      {
        q: 'Application stopped writing logs. No errors in journalctl. Where do you look?',
        a: [
          'Classic disk full symptom — app tries to write, can\'t, fails silently',
          '`df -h` immediately — check filesystem usage',
          '`lsof | grep deleted` — deleted file held open, space not freed (`truncate -s 0` to fix)',
          '`df -ih` — inode exhaustion: "no space left" with free blocks = millions of small files',
        ],
      },
      {
        q: 'Disk is at 100%. How do you find what\'s consuming it?',
        a: [
          '`du -sh /var/log/* | sort -rh | head -10` — logs are the most common culprit',
          '`lsof | grep deleted` — deleted but held-open files not visible to du',
          '`journalctl --disk-usage` — systemd journal often grows unnoticed',
          '`find / -xdev -size +500M 2>/dev/null` — large files anywhere on the filesystem',
        ],
      },
      {
        q: 'Service is in a restart loop and spiking CPU. What would cause that?',
        a: [
          '`Restart=always` with no `RestartSec` — tight loop, process fails immediately, restarts immediately',
          'Bad config file — process reads it, fails, restarts, reads it again, fails again',
          '`systemctl cat myapp` — check Restart= and RestartSec= in unit file',
          'systemd rate-limits after 5 restarts in 10 seconds — shows "start-limit-hit" in status',
        ],
      },
    ],
    prevention: [
      'logrotate configured for every service — check /etc/logrotate.d/, missing = logs grow forever',
      'CloudWatch Logs agent shipping before instance termination — lifecycle hook if needed',
      'CloudWatch alarm: DiskUsed > 80%, MemoryUtilization > 80% (requires CW Agent)',
      'systemd unit: Restart=on-failure with RestartSec=5 — not Restart=always with no delay',
      'CloudWatch alarm: "Out of memory" or "Kill process" string match in log group',
    ],
    scriptPush: 'Scan all log directories, report any consuming over 1GB, flag which process holds deleted files. Core pattern: `du -sh /var/log/* | sort -rh | head -10` then `lsof | grep deleted | awk \'{print $2,$7,$9}\' | sort -k2 -rn | head -10`',
    flow: [
      "Start with systemd. How many times has this service restarted and what's the exit code telling me?",
      { cmd: 'systemctl status myapp' },
      { cmd: 'journalctl -u myapp -n 100' },
      "Exit code matters:",
      { list: [
        "Exit 1 → application error. The logs will tell me what.",
        "Exit 137 → killed by signal 9. That's the OOM killer, not a crash. Or someone killed it.",
        "Exit 139 → segfault. Application-level memory issue.",
      ]},
      "If it's 137, confirm OOM:",
      { cmd: 'dmesg | grep -i "oom\\|killed process"' },
      "Then check memory pressure:",
      { cmd: 'free -h' },
      "If memory was exhausted, I need to know what consumed it. `top` sorted by memory, or check if there's a leak — memory usage trends up over time, OOM kill terminates it, ASG launches a new instance, repeat. That pattern hides in ASG environments. CloudWatch memory metrics (requires CloudWatch Agent) over a longer window will show the trend.",
      "Before assuming OOM — check disk. Disk full silently breaks many applications. The app tries to write a log, can't, and dies with no meaningful error message:",
      { cmd: 'df -h' },
      "Logs are the most common culprit. If log rotation isn't configured, logs grow until the disk fills:",
      { cmd: 'du -sh /var/log/* | sort -rh | head -20' },
      { cmd: 'journalctl --disk-usage' },
      "Check logrotate config exists for the service under `/etc/logrotate.d/`.",
      "If the service is in a restart loop — check the systemd unit file. A service set to `Restart=always` with no `RestartSec` is a tight loop. It'll spike CPU and make the system look under load when the real problem is a bad config file the process can't read.",
      "In ASG environments: the instance gets terminated and replaced before you can investigate. Look at terminated instance logs in CloudWatch Logs if the agent was shipping them, or check CloudTrail for the termination event and timing.",
    ],
  },

  // ── 4 — A CHANGE BROKE IT ────────────────────────────────────────────────
  {
    id: 'change-broke',
    label: 'A Change Broke It',
    entry: 'was working, recent deploy or config change, now returning errors',
    signals: [
      { symptom: 'Some users affected, some not',         meaning: 'mixed versions across ASG (rolling deploy partial)' },
      { symptom: 'All users affected after deploy',       meaning: 'all instances on bad version, or config not picked up' },
      { symptom: 'Access denied errors in app logs',      meaning: 'IAM policy change removed a required permission' },
      { symptom: 'Config updated but old behaviour',      meaning: 'service not restarted — still running old config' },
      { symptom: 'Errors started at exact deploy time',   meaning: 'correlate CloudWatch spike timestamp to pipeline execution' },
    ],
    probes: [
      {
        q: 'Deploy went out an hour ago. Some users see errors, some don\'t.',
        a: [
          'Rolling deploy left mixed versions — some instances on new, some on old',
          'ALB routes round-robin — users hitting different instances get different behaviour',
          'Confirm: check AMI ID or version endpoint on each instance individually',
          'Fix options: complete the rolling update, or roll back to previous AMI/version',
        ],
      },
      {
        q: 'Config was updated but app is behaving as if still on the old config.',
        a: [
          'Most services read config at startup only — file change doesn\'t auto-reload',
          '`systemctl restart myapp` — picks up new config, check journalctl after',
          'Some services support reload (SIGHUP): `systemctl reload myapp` if supported',
          'Confirm new config is active: check the service\'s --config flag or env var',
        ],
      },
      {
        q: 'Blue/green vs rolling rollback — what\'s the difference?',
        a: [
          'Blue/green: traffic shift back to old target group — seconds, no rebuild, safest',
          'Rolling: redeploy previous AMI ID from Parameter Store — minutes, all instances replaced',
          'Blue/green is preferred when fast recovery matters — no rebuild required',
        ],
      },
      {
        q: 'App deployed fine but now gets access denied reaching S3.',
        a: [
          'IAM change removed a permission — surfaces as AccessDenied in app logs, not system logs',
          'Check: `aws sts get-caller-identity` on the instance — confirm which role it\'s using',
          'Check IAM policy attached to the role — what changed in the last deploy?',
          'Test directly: `aws s3 ls s3://my-bucket` from the instance',
        ],
      },
      {
        q: 'How do you confirm what version is running across all ASG instances?',
        a: [
          'Hit a version endpoint on each instance IP directly (bypassing ALB)',
          '`aws autoscaling describe-auto-scaling-groups` — shows AMI ID per instance',
          'Instance refresh status: `aws autoscaling describe-instance-refreshes`',
        ],
      },
    ],
    prevention: [
      'Blue/green over rolling for production — rollback is a traffic shift, not a rebuild',
      'AMI ID in Parameter Store — always has the rollback reference',
      'Never deregister the AMI a running ASG points to — instances can\'t launch without it',
      'Config changes in IaC — manual config edits don\'t trigger restarts and leave no audit trail',
      'Never layer more changes on a broken state before capturing root cause evidence',
    ],
    scriptPush: 'Check every instance in an ASG and report which AMI ID each is running. Core pattern: `aws autoscaling describe-auto-scaling-groups | jq \'.[] .Instances[] | {id: .InstanceId, ami: .LaunchTemplate}\'`',
    flow: [
      "First question: what changed and when exactly? Deployment, config update, dependency version, IAM policy, security group? Most outages trace to a recent change.",
      "If it was a code deploy — did the new version actually land everywhere?",
      "In an ASG with rolling updates, some instances may be on the old version and some on the new. The ALB health checks passed on mixed versions. Users hitting different instances get different behaviour.",
      "Check what's actually running:",
      { cmd: 'curl http://<instance-ip>:8080/version' },
      { cmd: 'systemctl status myapp' },
      "If config changed — did the service restart to pick it up? Most services read config at startup only. A config file change without a service restart means the running process is still on the old config:",
      { cmd: 'systemctl restart myapp' },
      { cmd: 'journalctl -u myapp -n 50' },
      "If it's an IAM or SG change — what did the app lose access to? Test dependencies directly:",
      { cmd: 'nc -zv <rds-endpoint> 5432' },
      { cmd: 'aws s3 ls s3://my-bucket' },
      "An IAM change that removed a permission the app relied on will surface as access denied errors in the application logs, not the system logs.",
      "Rollback path depends on the deployment method:",
      { list: [
        "Blue/green: flip the ALB listener rule back to the old target group. Traffic shift, not rebuild. Fastest recovery.",
        "Rolling: redeploy the previous AMI ID. Pull it from Parameter Store if you're using it as the config bus.",
        "IaC: revert the commit, re-apply. Terraform plan shows the diff before apply.",
      ]},
      "Don't make further changes while diagnosing. Layering changes on top of a broken state makes root cause impossible to establish.",
    ],
  },

  // ── 5 — INTERMITTENT ─────────────────────────────────────────────────────
  {
    id: 'intermittent',
    label: 'Intermittent',
    entry: 'hard to reproduce, not consistently broken, flapping health checks',
    signals: [
      { symptom: 'Failures correlate with peak traffic',    meaning: 'load saturation — DB connections, CPU, memory' },
      { symptom: 'Same users fail repeatedly',              meaning: 'sticky sessions pinning them to a bad instance' },
      { symptom: 'Targets flap healthy/unhealthy',          meaning: 'health check grace period, heavy health endpoint' },
      { symptom: 'Latency rises before errors',             meaning: 'saturation before failure — find the bottleneck first' },
      { symptom: 'Memory climbs slowly then resets',        meaning: 'memory leak hidden by ASG instance replacement' },
      { symptom: 'DB connections climb and don\'t fall',    meaning: 'connection leak or pool exhaustion' },
    ],
    probes: [
      {
        q: 'Health checks flapping — passes then fails repeatedly. What are the likely causes?',
        a: [
          'Grace period too short — app not ready when first checks fire after launch',
          'Health endpoint does too much — DB call times out under load, returns 5xx',
          'Instance briefly overwhelmed at peak — health check response drops over timeout',
          'Wrong health check path or port — check target group configuration',
          'Fix: lightweight health endpoint, set grace period to actual startup time',
        ],
      },
      {
        q: 'Intermittent timeouts correlating with peak traffic. Where do you start?',
        a: [
          'Pattern first — pull CloudWatch metrics for the failure window before touching anything',
          'DB connection count: `ss -tp | grep ESTABLISHED | grep 5432 | wc -l`',
          'If connections near max_connections — that\'s your answer (add RDS Proxy)',
          'If connections fine — check CPU and memory trends during the same window',
        ],
      },
      {
        q: 'Same users are failing every time. What does that suggest?',
        a: [
          'Sticky sessions — ALB pinning them to the same target (usually a bad instance)',
          'Check: is ALB stickiness enabled on the target group?',
          'AZ imbalance — one AZ losing capacity, users session-pinned to targets there',
          'Mixed versions — specific users always hit the instance with the bad deploy',
        ],
      },
      {
        q: 'Memory isn\'t showing up in CloudWatch. Why?',
        a: [
          'Memory is not a default EC2 metric — requires CloudWatch Agent installed and configured',
          'Without CW Agent: no MemoryUtilization, no DiskUsed% metrics at all',
          'Install + configure CW Agent, store config in SSM Parameter Store, distribute via Run Command',
        ],
      },
      {
        q: 'How do you distinguish connection pool exhaustion from a network issue?',
        a: [
          'Network issue: curl times out, nc fails, traceroute shows packet loss',
          'Connection exhaustion: curl to app works, but DB-dependent endpoints are slow/failing',
          'Confirm: `ss -tp | grep ESTABLISHED | grep 5432 | wc -l` — count live DB connections',
          'Watch it over time: `watch -n 2 "ss -tp | grep ESTABLISHED | grep 5432 | wc -l"`',
        ],
      },
    ],
    prevention: [
      'Health endpoint: process-only check, no DB calls, no external dependencies',
      'HealthCheckGracePeriod = actual startup time — not the default 300s',
      'CloudWatch Agent on every instance from launch — memory and disk are essential metrics',
      'RDS Proxy — connection pooling prevents exhaustion under load spikes',
      'Sticky sessions off by default — externalise session state to ElastiCache instead',
    ],
    scriptPush: 'Mini triage script: log DB connection count, memory, and load average every 5 seconds. Core pattern: `while true; do date; echo "DB: $(ss -tp | grep 5432 | wc -l)"; free -h | awk \'/Mem:/ {print $3"/"$2}\'; uptime; sleep 5; done`',
    flow: [
      "Intermittent is the hardest class of problem. The instinct is to start poking — resist it. The first move is always: find the pattern before touching anything.",
      "Does it correlate with:",
      { list: [
        "Time of day → load-related, resource exhaustion under peak traffic",
        "A specific endpoint → application-level, not infrastructure",
        "The same users every time → specific AZ, specific instance, sticky sessions",
        "Getting worse slowly over time → slow leak — memory, connections, file descriptors",
      ]},
      "Pull CloudWatch metrics across the window when failures occurred. Request count, error rate, target response time, latency. Look for the moment the pattern started and what else changed at that moment.",
      "If it correlates with load — check connection exhaustion. DB connection pools have limits. Under peak, if connections aren't released properly the pool fills. New requests queue, then time out. Looks like intermittent latency spikes, not hard failures:",
      { cmd: 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l' },
      "Compare to `max_connections` on RDS. If they're close, that's your answer.",
      "If the same users are affected every time — think sticky sessions or AZ imbalance. One AZ losing instances while others are fine will affect users whose sessions are pinned there.",
      "Health check flapping — instance passes then fails intermittently. Common causes:",
      { list: [
        "Grace period too short — app still starting when checks fire",
        "Health check path does too much work — DB call in the health endpoint times out under load",
        "Instance is healthy but briefly overwhelmed during peak — health check response drops over timeout threshold, ALB marks it unhealthy, drains it, load redistributes, repeat",
      ]},
      "Check current target health:",
      { cmd: 'aws elbv2 describe-target-health --target-group-arn <arn>' },
      "Memory leak pattern: memory climbs slowly, performance degrades as paging increases, OOM kill eventually fires, ASG replaces the instance, memory starts climbing again. Each cycle is days apart. Impossible to catch without CloudWatch Agent shipping MemoryUtilization over time.",
    ],
  },

  // ── 6 — ASG / SCALING ────────────────────────────────────────────────────
  {
    id: 'asg-scaling',
    label: 'ASG / Scaling',
    entry: 'ASG not scaling when expected, new instances immediately unhealthy, scaling thrash, or mixed versions after a rolling update',
    signals: [
      { symptom: 'Alarm in ALARM but no scale out',          meaning: 'cooldown blocking, or desired == max ceiling hit' },
      { symptom: 'New instances terminate immediately',       meaning: 'HealthCheckGracePeriod too short for actual startup time' },
      { symptom: 'EC2 health check type, app broken',        meaning: 'ASG sees "healthy" — broken app never replaced' },
      { symptom: 'Instances mixed versions post-deploy',      meaning: 'instance refresh paused or partially completed' },
      { symptom: 'Scale out then immediate scale in',         meaning: 'cooldown too short, instances not warm before metric rechecked' },
    ],
    probes: [
      {
        q: 'New instances keep launching but immediately get marked unhealthy.',
        a: [
          'HealthCheckGracePeriod too short — app not ready when first check fires',
          'Check actual startup time vs grace period configured',
          'Also check: bootstrap script failing (`/var/log/cloud-init-output.log`)',
          'SG not allowing ALB to reach the instance health check port',
          'Fix: set grace period to startup time + 30s buffer minimum',
        ],
      },
      {
        q: "What's the difference between EC2 and ELB health check type?",
        a: [
          'EC2: instance running + passing system status checks. Hardware failure only.',
          'A running instance with a broken app = healthy to EC2 checks. Broken app never replaced.',
          'ELB: ASG adopts ALB\'s verdict. ALB marks unhealthy → ASG terminates and replaces.',
          'For web-facing workloads: always use ELB health check type.',
        ],
      },
      {
        q: 'Scaling policy is configured but ASG isn\'t scaling during peak.',
        a: [
          'Check CloudWatch alarm state — is it actually in ALARM?',
          'Check ASG activity log — was scale out attempted and blocked?',
          'Check desired vs max — if desired == max, ASG is at its ceiling',
          'Check cooldown — was a scale event recently completed? Default 300s blocks next trigger.',
        ],
      },
      {
        q: 'After deployment some users see old version, some new. What happened?',
        a: [
          'Rolling update (instance refresh) left mixed versions — didn\'t propagate to all instances',
          'Check: `aws autoscaling describe-instance-refreshes` — look for paused or failed status',
          'Refresh pauses if health checks fail above the MinHealthyPercentage threshold',
          'Confirm which AMI each instance is running, compare to expected in Parameter Store',
        ],
      },
      {
        q: 'What is a lifecycle hook and when would you use one?',
        a: [
          'Intercepts instance state transitions: scale-out (Pending:Wait) and scale-in (Terminating:Wait)',
          'Scale-out: bootstrap, fetch secrets, register with service discovery before traffic',
          'Scale-in: drain connections, flush state, ship final logs before termination',
          'Must call CompleteLifecycleAction (CONTINUE or ABANDON) or hook times out',
          'Critical for log shipping — without it, logs on terminating instances are lost',
        ],
      },
    ],
    prevention: [
      'HealthCheckGracePeriod = actual startup time + buffer — measure it, don\'t guess',
      'ELB health check type for all web-facing ASGs — not the EC2 default',
      'Instance refresh with MinHealthyPercentage=90 — safe rolling update with automatic pause',
      'Lifecycle hook on scale-in (Terminating:Wait) — ships logs before instance terminates',
      'ASG activity log shipped to CloudWatch — termination evidence persists after instance gone',
    ],
    scriptPush: 'Check all instances in an ASG and report which AMI ID each is running. Core pattern: `aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name> | jq -r \'.AutoScalingGroups[].Instances[] | "\\(.InstanceId) \\(.LaunchTemplate.Version // "no-lt")"\'`',
    flow: [
      "First question: is the problem scaling not triggering, or scaling happening but instances not healthy?",
      "Not scaling out when expected — check the alarm. Is the CloudWatch alarm actually in ALARM?",
      { cmd: 'aws cloudwatch describe-alarms --alarm-names <policy-alarm-name>' },
      "Alarm in OK but CPU is clearly high — check the metric period and threshold. Target tracking policy CloudWatch alarms are managed by AWS, not visible by name. Check the scaling activity log directly:",
      { cmd: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>' },
      "Alarm in ALARM but not scaling — check cooldown. ASG ignores triggers during cooldown after a previous scale event. Default 300s. Check desired vs max — if desired already equals max, ASG can't scale further regardless of alarm state.",
      { cmd: 'aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name>' },
      "New instances launching but immediately unhealthy — most common cause is HealthCheckGracePeriod set too short. App is still starting when the first health check fires. ASG terminates it. Loop begins.",
      "Check what grace period is configured:",
      { cmd: "aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name> \\\n  | jq '.[].HealthCheckGracePeriod'" },
      "Also check health check type. EC2 type = hardware check only. A running instance with a broken app is \"healthy\" to EC2 health checks. ELB type = ASG adopts the ALB's verdict. For web workloads, ELB type is almost always correct.",
      "If instances pass health checks but the rolling update left mixed versions — check instance refresh status:",
      { cmd: 'aws autoscaling describe-instance-refreshes --auto-scaling-group-name <name>' },
      "A paused or failed refresh leaves some instances on the old version. The refresh checkpoint mechanism stops it if too many instances fail health checks during the update.",
      "Scaling thrash — scales out then immediately back in. Usually cooldown too short. Target tracking policy fired, instances launched, metric dropped (because new capacity), scale-in triggered before new instances were fully warm.",
      "Fix: set warmup time to actual instance startup time. Separate scale-out and scale-in cooldowns.",
    ],
  },
]
