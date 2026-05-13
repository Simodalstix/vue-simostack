export const scenarios = [
  // ── 1 — CAN'T REACH IT ───────────────────────────────────────────────────
  {
    id: 'cant-reach',
    label: "Can't Reach It",
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I', status: 'cleared', signal: 'responds' }] },

      { id: 'targetgroup',
        layers: [{
          layer: 'targetgroup', tool: 'aws elbv2', status: 'stuck', signal: '',
          branches: [
            { signal: '503', meaning: 'no healthy targets — all instances down or not registered' },
            { signal: '502', meaning: 'targets exist but not responding — investigate instance' },
          ],
        }]
      },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system',    tool: 'nc / ss',    status: 'reached', signal: 'reachable' },
          { layer: 'process', tool: 'systemctl',  status: 'failing', signal: 'service failed' },
          { layer: 'app',     tool: 'journalctl', status: 'failing', signal: 'crash loop / bad config' },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'nc', status: 'unknown', signal: '' }] },
    ],

    prevention: [
      'SSM role at launch',
      'SGs in IaC',
      'Lightweight /health',
      'ALB SG as instance inbound source',
    ],

    flow: [
      "The spine cleared DNS and the ALB. The signal is at the target group — work inward from there.",
      "Test from the instance directly, bypassing the ALB entirely:",
      { cmd: 'curl -s http://localhost:8080/health' },
      "If this fails, the process isn't healthy on the instance itself — nothing to do with the ALB. Check what's actually running:",
      { cmd: 'ss -tlnp | grep 8080' },
      "Nothing there means the process is down. If it's listening but refusing, check what interface it's bound to — `127.0.0.1` means localhost only, invisible to the ALB. Needs `0.0.0.0`.",
      { cmd: 'systemctl status myapp' },
      { cmd: 'journalctl -u myapp -n 50' },
      "If the process keeps restarting, the exit code tells you the branch: exit 137 is OOM, exit 1 is application error, exit 139 is a segfault. Each goes a different direction.",
      "If you need to get on the instance and SSH times out, skip it entirely:",
      { cmd: 'aws ssm start-session --target <instance-id>' },
      "SSM needs no port 22 — just the IAM role and outbound 443.",
    ],

    probes: [
      {
        q: 'ALB returning 502. Walk me through what you check.',
        a: [
          '502 = bad gateway — ALB is up, its targets are not responding',
          'Check target group: `aws elbv2 describe-target-health`',
          'Test from instance directly: `curl -s http://localhost:8080/health`',
          'Process down → systemctl + journalctl. Process up but 127.0.0.1 bound → fix bind address',
        ],
      },
      {
        q: 'curl to the instance works but ALB still shows targets unhealthy.',
        a: [
          'Health check path wrong — ALB checks /health, app returns 404 on that path',
          'Response code mismatch — app returns 302, ALB expects 2xx by default',
          'SG between ALB and instance not allowing ALB SG as source on the app port',
          'HealthCheckGracePeriod expired before app finished starting on a new instance',
        ],
      },
      {
        q: 'Port 22 times out. How do you get on the instance?',
        a: [
          'SSM: `aws ssm start-session --target <instance-id>`',
          'Requirements: SSM agent running + AmazonSSMManagedInstanceCore role + outbound 443',
          'No port 22, no key pair — access controlled via IAM, session logged to CloudTrail',
        ],
      },
      {
        q: 'What is the difference between 502 and 503 from the ALB?',
        a: [
          '502 = bad gateway — targets are registered but not responding (app crashed, wrong port, bad bind)',
          '503 = no healthy targets — target group is empty or all targets failing health checks',
        ],
      },
      {
        q: 'SG vs NACL — the key operational difference.',
        a: [
          'SG = stateful, instance-level, allow-only rules — return traffic automatic',
          'NACL = stateless, subnet-level, allow and deny — both directions must be explicit',
          'NACL missing outbound ephemeral (1024-65535) = SSH or response traffic silently dropped',
        ],
      },
    ],
  },

  // ── 2 — IT'S SLOW ────────────────────────────────────────────────────────
  {
    id: 'its-slow',
    label: "It's Slow",
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I', status: 'cleared', signal: '200 — TargetResponseTime high' }] },

      { id: 'targetgroup',
        layers: [{ layer: 'targetgroup', tool: 'aws elbv2', status: 'cleared', signal: 'targets healthy' }] },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system', tool: 'top / iostat', status: 'stuck', signal: '',
            branches: [
              { signal: 'high CPU',    meaning: 'runaway process or traffic spike' },
              { signal: 'high iowait', meaning: 'disk saturated — check EBS VolumeQueueLength' },
              { signal: 'swap in use', meaning: 'memory exhausted — paging to disk' },
            ]
          },
          { layer: 'process', tool: 'ss -tp',       status: 'reached', signal: 'running' },
          { layer: 'app',     tool: 'curl -w time', status: 'failing', signal: 'specific endpoint slow' },
        ]
      },

      { id: 'data',
        layers: [{
          layer: 'data', tool: 'ss / CW RDS', status: 'failing', signal: '',
          branches: [
            { signal: 'connections near max', meaning: 'pool exhaustion — add RDS Proxy' },
            { signal: 'slow query log',       meaning: 'specific query needs index' },
            { signal: 'cache hit rate low',   meaning: 'cold cache or invalidation bug' },
          ]
        }]
      },
    ],

    prevention: [
      'RDS Proxy',
      'ElastiCache for repeated reads',
      'CW Agent for memory/disk',
      'Slow query log from day one',
      'Scale on TargetResponseTime',
    ],

    flow: [
      "The spine shows the ALB and target group are healthy. The signal is latency — work from the host inward.",
      "Pattern first. Is it all endpoints or one specific one? Test from the instance, removing the ALB from the equation:",
      { cmd: "curl -s -o /dev/null -w '%{time_total}' http://localhost:8080/api/orders" },
      "If `/health` is fast and `/api/orders` is slow, the problem is the application code or its dependencies — not the infrastructure.",
      "Check the host under load:",
      { cmd: 'top' },
      { cmd: 'iostat -x 1' },
      "High `%iowait` with disk `%util` near 100% = EBS saturated. Check CloudWatch `VolumeQueueLength` — above 1 means the disk is backed up regardless of what the OS shows.",
      { cmd: 'free -h' },
      "Swap in use = system ran out of RAM and is paging. Everything slows. Find what consumed the memory with `ps aux --sort=-%mem`.",
      "If the host looks healthy, the database is almost always next. Check live connection count:",
      { cmd: 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l' },
      "Compare against `max_connections` on RDS. Connection exhaustion means new requests queue before they start. Looks like latency, isn't a latency problem.",
      "Connection exhaustion → RDS Proxy. Repeated reads of same data → ElastiCache. Read volume → Read Replica. These are different problems with different fixes — identify which before recommending anything.",
    ],

    probes: [
      {
        q: 'High load average but CPU looks normal. What does that tell you?',
        a: [
          'Load average includes I/O-waiting processes, not just CPU-active ones',
          'High load + low CPU% = disk or network bottleneck, not compute',
          'Confirm with `iostat -x 1` — %iowait and %util columns tell the real story',
        ],
      },
      {
        q: 'DB connections are maxed out. What are your options?',
        a: [
          'RDS Proxy — pools connections, prevents exhaustion, handles failover transparently',
          'Read Replica — offloads read volume, does not help write throughput',
          'ElastiCache — caches repeated reads, removes them from DB entirely',
          'These solve different problems — identify which before recommending',
        ],
      },
      {
        q: 'When would you use a read replica vs ElastiCache?',
        a: [
          'Read Replica: high volume of different reads, reporting queries, reduce primary load',
          'ElastiCache: repeated reads of the same data — product pages, session data, lookups',
          'ElastiCache is faster (sub-millisecond) but requires cache invalidation logic',
        ],
      },
      {
        q: 'EBS looks fine at the OS level but the app is still slow.',
        a: [
          'OS metrics show what the instance sees — not EBS burst credit state',
          'gp2 IOPS burst from a credit bucket — exhaustion looks like sudden slowdown',
          'Check CloudWatch VolumeQueueLength — above 1 means disk is backed up',
          'gp3 is provisioned, no burst credits — prefer it over gp2 for consistent workloads',
        ],
      },
      {
        q: 'How do you find which query is causing the slowdown?',
        a: [
          'Enable slow query log in RDS parameter group: long_query_time, log_slow_queries',
          'Performance Insights if enabled — shows top SQL by load in real time, no config change needed',
        ],
      },
    ],
  },

  // ── 3 — IT'S CRASHING ────────────────────────────────────────────────────
  {
    id: 'crashing',
    label: "It's Crashing",
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I', status: 'cleared', signal: 'responds (502 intermittent)' }] },

      { id: 'targetgroup',
        layers: [{ layer: 'targetgroup', tool: 'aws elbv2', status: 'stuck', signal: 'targets flapping' }] },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system', tool: 'nc / ss', status: 'reached', signal: 'reachable' },
          { layer: 'process', tool: 'systemctl', status: 'failing', signal: '',
            branches: [
              { signal: 'exit 137', meaning: 'SIGKILL — OOM killer or manual kill' },
              { signal: 'exit 1',   meaning: 'application error — logs have the reason' },
              { signal: 'df 100%',  meaning: 'disk full — app cannot write, fails silently' },
            ]
          },
          { layer: 'app', tool: 'journalctl / dmesg', status: 'failing', signal: 'crash evidence' },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'nc', status: 'unknown', signal: '' }] },
    ],

    prevention: [
      'logrotate for every service',
      'CW Logs before termination',
      'Disk + memory alarms',
      'Restart=on-failure with RestartSec',
    ],

    flow: [
      "Start with systemd — the exit code is the branch indicator:",
      { cmd: 'systemctl status myapp' },
      { cmd: 'journalctl -u myapp -n 100' },
      "**Branch: exit 137 (OOM)**",
      "137 = SIGKILL = kernel killed it. Confirm in kernel logs:",
      { cmd: "dmesg | grep -i 'killed process'" },
      "The output shows which process, its anon-rss (actual RAM it was using), and the OOM score. Check current memory:",
      { cmd: 'free -h' },
      "If no swap is configured, the kernel has no buffer — it kills immediately at exhaustion. Memory leak pattern: RSS climbs steadily over hours, OOM kills, ASG replaces the instance, repeat. Requires CloudWatch Agent shipping `MemoryUtilization` over time to catch.",
      "**Branch: disk full (df 100%)**",
      { cmd: 'df -h' },
      "At 100% the app can't write logs, PID files, or temp files — it fails silently with no useful error. Find what consumed the space:",
      { cmd: 'du -sh /var/log/* | sort -rh | head -10' },
      "If `du` doesn't account for all the space `df` shows, a process is holding a deleted file open:",
      { cmd: "lsof | grep deleted | awk '{print $2, $7, $9}' | sort -k2 -rn" },
      "Fix without restarting: `truncate -s 0 /var/log/app/access.log` — zeroes the file in place, fd stays valid, space freed immediately.",
      "**ASG masking the problem:** the instance terminates before you can investigate. Check the ASG activity log:",
      { cmd: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>' },
    ],

    probes: [
      {
        q: 'Service keeps restarting. Exit code 137. What happened?',
        a: [
          'Exit 137 = SIGKILL — process was killed, not crashed',
          'OOM killer is the most common cause: `dmesg | grep -i "killed process"`',
          'anon-rss in the dmesg output = actual RAM the process was consuming',
          'Also check: journalctl shows if it was killed manually vs kernel',
        ],
      },
      {
        q: 'ASG keeps launching new instances every 10 minutes. How do you investigate?',
        a: [
          'Instances terminate before you can get on them',
          'Check CloudWatch Logs — requires agent shipping logs before termination',
          'ASG activity log: `aws autoscaling describe-scaling-activities`',
          'Add lifecycle hook (Terminating:Wait) to pause termination for investigation',
        ],
      },
      {
        q: 'df shows full but du does not account for all the space. Why?',
        a: [
          'Process is holding a deleted file open — kernel keeps blocks allocated',
          '`lsof | grep deleted` reveals the PID, size, and filename',
          '`truncate -s 0 /path` zeroes it in place — space freed, process keeps running',
          'rm unlinks the name but fd stays open — blocks not freed until process closes it',
        ],
      },
      {
        q: 'Disk is at 100%. What is your approach?',
        a: [
          '`df -h` — confirm which filesystem is full',
          '`df -ih` — check inode exhaustion separately (millions of tiny files = inodes, not blocks)',
          '`du -sh /var/log/* | sort -rh` — logs are almost always the culprit',
          '`lsof | grep deleted` — deleted files held open not visible to du',
          '`journalctl --disk-usage` then `--vacuum-size=500M` — systemd journal often unnoticed',
        ],
      },
      {
        q: 'Service is in a restart loop spiking CPU. What causes that?',
        a: [
          'Restart=always with no RestartSec — tight loop, fails instantly, restarts instantly',
          'Bad config file — process reads it, fails, restarts, reads it again',
          '`systemctl cat myapp` — check Restart= and RestartSec= in the unit file',
          'systemd rate-limits after 5 restarts in 10 seconds (StartLimitBurst)',
        ],
      },
    ],
  },

  // ── 4 — A CHANGE BROKE IT ────────────────────────────────────────────────
  {
    id: 'change-broke',
    label: 'A Change Broke It',
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I', status: 'cleared', signal: 'responds' }] },

      { id: 'targetgroup',
        layers: [{
          layer: 'targetgroup', tool: 'aws elbv2', status: 'stuck', signal: '',
          branches: [
            { signal: 'some healthy some not', meaning: 'mixed versions — rolling update partial' },
            { signal: 'all unhealthy',         meaning: 'bad deploy landed everywhere' },
          ],
        }]
      },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system',    tool: 'curl :version', status: 'reached', signal: 'reachable' },
          { layer: 'process', tool: 'systemctl',     status: 'reached', signal: 'running — wrong version or stale config' },
          { layer: 'app',     tool: 'journalctl',    status: 'failing', signal: '',
            branches: [
              { signal: 'AccessDenied',    meaning: 'IAM policy change removed a permission' },
              { signal: 'old behaviour',   meaning: 'service not restarted after config change' },
              { signal: 'mixed responses', meaning: 'partial rollout — instances on different versions' },
            ]
          },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'nc / aws cli', status: 'unknown', signal: '' }] },
    ],

    prevention: [
      'Blue/green over rolling',
      'AMI ID in Parameter Store',
      'Config in IaC only',
      'Never deregister active AMI',
    ],

    flow: [
      "First question: what changed and when exactly? Most outages trace to a change.",
      "If rolling deploy — did the new version land everywhere? Some instances may be on the old version, some on the new. Check what's actually running per instance:",
      { cmd: 'curl http://<instance-ip>:8080/version' },
      "If config changed — did the service restart to pick it up? Most services read config at startup only:",
      { cmd: 'systemctl restart myapp' },
      { cmd: 'journalctl -u myapp -n 50' },
      "If IAM or SG changed — what did the app lose access to? Test dependencies directly:",
      { cmd: 'nc -zv <rds-endpoint> 5432' },
      { cmd: 'aws s3 ls s3://my-bucket' },
      "IAM changes surface as `AccessDenied` in the application logs, not system logs. Don't stop at `journalctl` if you don't see an obvious error there.",
      "Rollback path depends on the deployment method:",
      { list: [
        "Blue/green: flip the ALB listener back to the old target group — traffic shift, seconds, no rebuild",
        "Rolling: redeploy previous AMI ID from Parameter Store",
        "IaC: revert commit, re-apply — `terraform plan` shows the diff before apply",
      ]},
      "Never layer further changes on a broken state before capturing root cause evidence.",
    ],

    probes: [
      {
        q: 'Deploy went out an hour ago. Some users see errors, some do not.',
        a: [
          'Rolling update left mixed versions across the ASG',
          'ALB routes round-robin — different instances return different behaviour',
          'Confirm: check version endpoint or AMI ID on each instance directly',
          'Fix: complete the rolling update, or roll back to previous version',
        ],
      },
      {
        q: 'Config was updated but the app behaves as if still on the old config.',
        a: [
          'Most services read config at startup only — file change does not auto-reload',
          '`systemctl restart myapp` picks it up — check journalctl after for errors',
          'Some services support reload via SIGHUP: `systemctl reload myapp` if supported',
        ],
      },
      {
        q: 'Blue/green vs rolling rollback — what is the difference?',
        a: [
          'Blue/green: traffic shift back to old target group — seconds, no rebuild, safest',
          'Rolling: redeploy previous AMI ID — all instances replaced, takes minutes',
          'Blue/green is preferred when fast recovery matters',
        ],
      },
      {
        q: 'App deployed fine but now returns access denied reaching S3.',
        a: [
          'IAM change removed a required permission — surfaces in app logs as AccessDenied',
          'Test from the instance: `aws s3 ls s3://my-bucket`',
          'Check: `aws sts get-caller-identity` — confirm which role the instance is using',
          'Check the IAM policy attached to the role and what changed',
        ],
      },
    ],
  },

  // ── 5 — INTERMITTENT ─────────────────────────────────────────────────────
  {
    id: 'intermittent',
    label: 'Intermittent',
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'CW metrics', status: 'stuck', signal: 'TRT spiking intermittently' }] },

      { id: 'targetgroup',
        layers: [{ layer: 'targetgroup', tool: 'aws elbv2', status: 'stuck', signal: 'health checks flapping' }] },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system',    tool: 'top / free',  status: 'reached', signal: 'resource pressure at peak' },
          { layer: 'process', tool: 'ss -tp',       status: 'reached', signal: 'running — connections near limit' },
          { layer: 'app',     tool: 'curl / logs',  status: 'failing', signal: '',
            branches: [
              { signal: 'connection pool exhaustion', meaning: 'requests queue then time out' },
              { signal: '/health too heavy',          meaning: 'DB call times out under load' },
              { signal: 'memory climbing',            meaning: 'slow leak — OOM eventually, ASG hides it' },
            ]
          },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'ss / CW RDS', status: 'failing', signal: 'connections near max_connections' }] },
    ],

    prevention: [
      'Lightweight /health only',
      'HealthCheckGracePeriod = startup time',
      'CW Agent from launch',
      'RDS Proxy',
      'ElastiCache for session state',
    ],

    flow: [
      "Intermittent is the hardest class of problem. Resist the instinct to start poking. Pattern first.",
      "Does it correlate with time of day? Load-related. Same users every time? Sticky sessions or AZ imbalance. Getting worse slowly? Slow leak.",
      "Pull CloudWatch metrics across the failure window. `TargetResponseTime`, request count, error rate. Find the moment the pattern started and what else changed at that moment.",
      "If it correlates with load, check connection count:",
      { cmd: 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l' },
      "Watch it live at peak:",
      { cmd: 'watch -n 2 "ss -tp | grep ESTABLISHED | grep 5432 | wc -l"' },
      "If it's climbing toward `max_connections` on RDS, that is the answer. Requests queue waiting for a connection, then time out. Looks like intermittent latency, isn't a latency problem.",
      "Health check flapping — most common cause is the health endpoint doing too much. A DB call in `/health` that times out under load marks the instance unhealthy, ALB drains it, load redistributes, metric drops, check passes again, repeat.",
      "Memory leak pattern: RAM climbs slowly over days, OOM kills eventually, ASG replaces the instance, RAM starts climbing again. Invisible without `MemoryUtilization` from CloudWatch Agent.",
    ],

    probes: [
      {
        q: 'Health checks are flapping. Instance passes then fails every few minutes.',
        a: [
          'Grace period too short — app still starting when first checks fire after launch',
          'Health endpoint too heavy — DB call times out under load, returns 5xx',
          'Instance briefly overwhelmed at peak — response drops over timeout threshold',
          'Fix: lightweight /health endpoint, set grace period to actual startup time',
        ],
      },
      {
        q: 'Intermittent timeouts correlating with peak traffic. Where do you start?',
        a: [
          'Pattern before action — pull CloudWatch metrics for the failure window first',
          'DB connection count: `ss -tp | grep ESTABLISHED | grep 5432 | wc -l`',
          'If near max_connections — connection pool exhaustion, add RDS Proxy',
          'If connections fine — check CPU and memory trends during the same window',
        ],
      },
      {
        q: 'Same users are failing every time, other users are fine.',
        a: [
          'Sticky sessions pinning them to the same unhealthy target',
          'AZ imbalance — one AZ losing capacity, sessions pinned to targets there',
          'Mixed versions — specific users always hit the instance with the bad deploy',
        ],
      },
      {
        q: 'Memory is not showing up in CloudWatch. Why?',
        a: [
          'Memory is not a default EC2 metric — requires CloudWatch Agent installed and configured',
          'Without CW Agent: no MemoryUtilization, no DiskUsed% metrics at all',
          'Install CW Agent, store config in SSM Parameter Store, distribute via Run Command',
        ],
      },
    ],
  },

  // ── 6 — ASG / SCALING ────────────────────────────────────────────────────
  {
    id: 'asg-scaling',
    label: 'ASG / Scaling',
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I', status: 'cleared', signal: 'responds' }] },

      { id: 'targetgroup',
        layers: [{
          layer: 'targetgroup', tool: 'aws elbv2', status: 'stuck', signal: '',
          branches: [
            { signal: 'no scale out despite alarm',    meaning: 'cooldown blocking or desired == max' },
            { signal: 'instances unhealthy on launch', meaning: 'grace period or health check type' },
          ],
          subRows: [
            { layer: 'asg', tool: 'describe-asg', status: 'stuck', signal: 'min / desired / max — cooldown state' },
          ],
        }]
      },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system', tool: 'CW / logs', status: 'stuck', signal: '',
            branches: [
              { signal: 'terminates immediately',      meaning: 'HealthCheckGracePeriod too short' },
              { signal: 'EC2 health type, app broken', meaning: 'ASG sees healthy — never replaced' },
              { signal: 'mixed AMI versions',          meaning: 'instance refresh paused or partial' },
            ],
            subRows: [
              { layer: 'asg', tool: 'describe-instance-refreshes', status: 'stuck', signal: 'refresh status' },
            ],
          },
          { layer: 'process', tool: 'systemctl',  status: 'reached', signal: 'varies' },
          { layer: 'app',     tool: 'journalctl', status: 'unknown', signal: '' },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'nc', status: 'unknown', signal: '' }] },
    ],

    prevention: [
      'GracePeriod = measured startup time',
      'ELB health check type',
      'Instance refresh MinHealthy=90%',
      'Lifecycle hook on Terminating:Wait',
    ],

    flow: [
      "Two distinct problem classes — scaling not triggering, or scaling happening but instances not healthy.",
      "**Not scaling out:** Check the CloudWatch alarm state:",
      { cmd: 'aws cloudwatch describe-alarms --alarm-names <name>' },
      "Alarm in `OK` but CPU is clearly high — check the metric period and evaluation window. Target tracking alarms are AWS-managed, not named. Check the ASG activity log directly:",
      { cmd: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>' },
      "Alarm in `ALARM` but not scaling — check cooldown. ASG ignores triggers during cooldown after a previous event (default 300s). Also check `desired` vs `max` — if they're equal, the ASG is at its ceiling regardless of alarm state.",
      { cmd: 'aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name>' },
      "**Instances launching but immediately unhealthy:** Check `HealthCheckGracePeriod`. Too short = app still starting when first health check fires = terminated = loop:",
      { cmd: "aws autoscaling describe-auto-scaling-groups | jq '.[].HealthCheckGracePeriod'" },
      "Also check health check type. EC2 = hardware only. A running instance with a broken app is `healthy` to EC2 checks. Use ELB health check type for web-facing workloads — ASG adopts the ALB's verdict.",
      "**Mixed versions after deploy:**",
      { cmd: 'aws autoscaling describe-instance-refreshes --auto-scaling-group-name <name>' },
      "A paused or failed refresh leaves instances on mixed versions. Refresh pauses if too many instances fail health checks during the update (`MinHealthyPercentage` threshold).",
    ],

    probes: [
      {
        q: 'New instances keep launching but immediately become unhealthy.',
        a: [
          'HealthCheckGracePeriod too short — app not ready when first check fires',
          'Measure actual startup time and set grace period to that plus a buffer',
          'Also check: bootstrap script failing — errors in /var/log/cloud-init-output.log',
          'SG not allowing ALB to reach the instance health check port',
        ],
      },
      {
        q: 'What is the difference between EC2 and ELB health check type?',
        a: [
          'EC2: instance running + passing system status checks — hardware failure only',
          'A running instance with a broken app is healthy to EC2 checks — broken app is never replaced',
          'ELB: ASG adopts ALB verdict — app returning 5xx = unhealthy = terminated and replaced',
          'Always use ELB health check type for web-facing workloads',
        ],
      },
      {
        q: 'Scaling policy configured but ASG is not scaling during peak.',
        a: [
          'Check CloudWatch alarm state — is it actually in ALARM?',
          'Check ASG activity log — was scale out attempted and blocked?',
          'Check desired vs max — if equal, ASG is at its ceiling',
          'Check cooldown — scale event recently completed? Default 300s blocks the next trigger',
        ],
      },
      {
        q: 'What is a lifecycle hook and when would you use one?',
        a: [
          'Intercepts instance state transitions: Pending:Wait (scale-out) and Terminating:Wait (scale-in)',
          'Scale-out: bootstrap, fetch secrets, register with service before traffic hits',
          'Scale-in: drain connections, flush state, ship final logs before termination',
          'Must call CompleteLifecycleAction or the hook times out and instance proceeds anyway',
        ],
      },
    ],
  },
]
