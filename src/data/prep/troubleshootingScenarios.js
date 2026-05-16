export const scenarios = [
  // ── 1 — CAN'T REACH IT ───────────────────────────────────────────────────
  {
    id: 'cant-reach',
    label: "Can't Reach It",
    spineGroups: [
      { id: 'dns',
        layers: [{ layer: 'dns', tool: 'dig app.example.com', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I https://app.example.com', status: 'cleared', signal: 'responds' }] },

      { id: 'targetgroup',
        layers: [{
          layer: 'targetgroup', tool: 'aws elbv2 describe-target-health --target-group-arn <arn>', status: 'stuck', signal: '',
          branches: [
            { signal: '503', meaning: 'no healthy targets — all instances down or not registered' },
            { signal: '502', meaning: 'targets exist but not responding — investigate instance' },
          ],
        }]
      },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system',  tool: 'nc → ss',    status: 'reached', signal: 'reachable' },
          { layer: 'process', tool: 'systemctl',  status: 'failing', signal: 'service failed' },
          { layer: 'app',     tool: 'journalctl', status: 'failing', signal: 'crash loop / bad config' },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'nc', status: 'unknown', signal: '' }] },
    ],

    prevention: [
      'Attach AmazonSSMManagedInstanceCore to the instance role via the Launch Template — gives SSM Session Manager access from first boot, no port 22 or key pairs needed.',
      'Define security group rules in IaC — manual SG changes drift silently and are invisible until something breaks.',
      'Health endpoint must return immediately without hitting the database — a slow /health cascades into health check failures under load.',
      'Instance SG inbound rule should reference the ALB security group, not a wide CIDR — ensures only the ALB can reach the app port.',
    ],

    flow: [
      "First: scope and recent changes. One user or everyone? What changed in the last 24 hours?",

      {
        type: 'decision',
        signal: '503 from ALB',
        color: 'amber',
        interpretation: 'No healthy targets registered. ALB has nothing to route to. The problem is at the Target Group layer — registration, health checks, or the app not listening.',
        nextHop: 'Stay at Target Group layer. Do not go to the instance yet.',
        validate: [
          { cmd: 'aws elbv2 describe-target-health --target-group-arn <arn>', lookFor: 'are instances registered? what is the health state and reason code?' },
          { cmd: 'aws elbv2 describe-target-groups --load-balancer-arn <arn>', lookFor: 'health check path, port, threshold — is the config correct?' },
          { cmd: 'curl -s http://localhost:8080/health', lookFor: 'from the instance — does the app respond to the health check path?' },
        ],
      },

      {
        type: 'decision',
        signal: '502 from ALB',
        color: 'amber',
        interpretation: 'ALB reached the target and sent traffic, but the backend returned an invalid or refused response. Target exists — problem is at the Process or App layer.',
        nextHop: 'Move inward — investigate Process and App layers on the instance.',
        validate: [
          { cmd: 'curl -s http://localhost:8080/health', lookFor: 'connection refused = process down. 5xx = running but unhealthy.' },
          { cmd: 'ss -tlnp | grep 8080', lookFor: 'nothing = not listening. 127.0.0.1 = bound to localhost only, invisible to ALB — needs 0.0.0.0.' },
          { cmd: 'journalctl -u myapp -n 50', lookFor: 'crash loop / bad config / port conflict / permission denied' },
        ],
      },

      {
        type: 'decision',
        signal: 'Process not listening / service failed',
        color: 'rose',
        interpretation: 'The service is down or misconfigured. Root cause is at the Process or App layer.',
        nextHop: 'Read the exit code — it determines the branch.',
        validate: [
          { cmd: 'systemctl status myapp', lookFor: '`failed` = crashed or exited non-zero — systemd will restart. `inactive` = stopped, not scheduled to restart — usually intentional. `activating` = stuck in startup. exit code 137 = OOM killed.' },
          { cmd: 'journalctl -u myapp -n 100', lookFor: 'the last lines before the crash — config error / dependency missing / port conflict' },
          { cmd: 'journalctl -b -1 -u myapp', lookFor: 'if the crash was on a previous boot — OOM / kernel kill events' },
        ],
      },

      "If you cannot SSH and need to get on the instance:",
      {
        type: 'decision',
        signal: 'SSH times out',
        color: 'amber',
        interpretation: 'Port 22 is blocked or the instance is in a private subnet. This is a network path problem, not an app problem.',
        nextHop: 'Use SSM — no port 22 required.',
        validate: [
          { cmd: 'aws ssm start-session --target <instance-id>', lookFor: 'session opens = SSM agent running and IAM role attached. fails = check AmazonSSMManagedInstanceCore role + outbound 443.' },
          { cmd: 'aws ec2 describe-instances --instance-ids <id> --query "Reservations[*].Instances[*].State"', lookFor: 'confirm instance is running before assuming network issue' },
        ],
      },
    ],

    rootCauses: [
      {
        cause: 'Process not listening on expected port',
        fix: 'Collect evidence first — read journalctl before restarting. The reason is in the last log lines before the crash.',
        cmd: 'journalctl -u myapp -n 30 && systemctl restart myapp',
      },
      {
        cause: 'Process bound to 127.0.0.1 (localhost only)',
        fix: 'App config has bind address set to localhost. Validate the current bind address before changing, then update to 0.0.0.0 and restart — ALB cannot reach a process bound to loopback.',
        cmd: 'ss -tlnp | grep 8080  # confirm bind address before and after fix',
      },
      {
        cause: 'SG blocking ALB → instance traffic',
        fix: 'Instance SG inbound rule must allow the ALB security group as source on the app port. A CIDR rule is wrong here — reference the ALB SG directly.',
      },
      {
        cause: 'Health check path returning non-2xx',
        fix: 'Update /health endpoint to return 200. Or update the target group success code range to include the actual response code.',
      },
      {
        cause: 'HealthCheckGracePeriod too short',
        fix: 'App not ready when first check fires on a new instance. Measure actual startup time, then set grace period to that value plus a buffer.',
      },
      {
        cause: 'SSH blocked, no SSM role',
        fix: 'Attach AmazonSSMManagedInstanceCore role and ensure outbound 443 from the instance to Systems Manager endpoints.',
      },
    ],

    rollback: [
      "Restore service first, then investigate root cause — do not layer further changes onto a broken state.",
      "**Blue/green:** flip the ALB listener back to the stable target group — traffic shifts in seconds, no rebuild needed.",
      { cmd: 'aws elbv2 modify-listener --listener-arn <arn> --default-actions Type=forward,TargetGroupArn=<stable-tg-arn>' },
      "**Rolling deploy:** redeploy the previous AMI ID from Parameter Store.",
      { cmd: String.raw`BASE=$(aws ssm get-parameter --name /prod/ami/app-latest --query Parameter.Value --output text)
echo "Rolling back to: $BASE"` },
      "If the issue was a misconfigured SG, restore the correct rule in IaC and re-apply. Never manually edit SG rules to fix — that creates undocumented drift.",
    ],

    probes: [
      {
        q: 'ALB returning 502. Walk me through what you check.',
        a: [
          '502 = bad gateway — ALB is up, its targets are not responding',
          'Isolate the layer: `aws elbv2 describe-target-health --target-group-arn <arn>`',
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
          '502 = bad gateway — targets registered but not responding (app crashed, wrong port, bad bind)',
          '503 = no healthy targets — target group is empty or all targets failing health checks',
        ],
      },
      {
        q: 'SG vs NACL — the key operational difference.',
        a: [
          'SG = stateful, instance-level, allow-only rules — return traffic is automatic, no explicit outbound rule needed',
          'NACL = stateless, subnet-level, allow and deny — both inbound and outbound must be explicitly permitted',
          'NACL missing outbound ephemeral (1024-65535) = response traffic silently dropped',
          'Default NACL allows all traffic including ephemeral ports — custom NACLs must add ephemeral outbound rules explicitly',
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
        layers: [{ layer: 'dns', tool: 'dig app.example.com', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I https://app.example.com', status: 'cleared', signal: '200 — TargetResponseTime high' }] },

      { id: 'targetgroup',
        layers: [{ layer: 'targetgroup', tool: 'aws elbv2 describe-target-health --target-group-arn <arn>', status: 'cleared', signal: 'targets healthy' }] },

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
            { signal: 'slow query log',       meaning: 'identify specific query, then evaluate indexing' },
            { signal: 'cache hit rate low',   meaning: 'cold cache, short TTL, eviction pressure, or bad invalidation' },
          ]
        }]
      },
    ],

    prevention: [
      'RDS Proxy pools database connections — prevents connection exhaustion under load, which presents as latency but is actually a queuing problem.',
      'ElastiCache for repeated reads of the same data — session state, lookups, product pages. Removes that load from RDS entirely.',
      'MemoryUtilization > 80% (CW Agent required)',
      'DiskUsed% > 80% (CW Agent required)',
      'Enable RDS slow query log from launch — set long_query_time=1. You want that data before you need it, not during an incident.',
      'Scale on TargetResponseTime > 2s',
    ],

    flow: [
      "Pattern first. Is it all endpoints or one specific one? Isolate the slow layer before touching anything.",
      "Test from the instance directly — removes the ALB from the equation:",
      { cmd: "curl -s -o /dev/null -w '%{time_total}' http://localhost:8080/api/orders" },
      "If /health is fast and /api/orders is slow, the problem is the application code or its data dependencies — not infrastructure.",

      {
        type: 'decision',
        signal: 'high %iowait',
        color: 'amber',
        interpretation: 'CPU is idle but waiting for disk I/O. Signal chain: system slows gradually under sustained load → VolumeQueueLength rises → BurstBalance drains → iowait climbs while CPU stays low. This is the gp2 burst exhaustion pattern. The OS metric understates the problem — validate in CloudWatch.',
        nextHop: 'Check CloudWatch VolumeQueueLength and BurstBalance — queue above 1 and draining credits confirm gp2 exhaustion.',
        validate: [
          { cmd: 'iostat -x 1', lookFor: '%iowait > 10% and %util near 100% = disk saturated' },
          { cmd: 'aws cloudwatch get-metric-statistics --namespace AWS/EBS --metric-name VolumeQueueLength ...', lookFor: 'above 1 = queue building. check BurstBalance alongside — if draining, gp2 credits are the cause' },
        ],
      },

      {
        type: 'decision',
        signal: 'ESTABLISHED connections climbing toward max_connections',
        color: 'amber',
        interpretation: 'New requests are queuing for a database connection before they start. This looks like latency but is a connection pool exhaustion problem. Adding instances makes it worse.',
        nextHop: 'Confirm connection count against RDS max_connections. Fix is RDS Proxy, not more instances.',
        validate: [
          { cmd: 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l', lookFor: 'compare against max_connections in the RDS parameter group' },
          { cmd: 'watch -n 2 "ss -tp | grep ESTABLISHED | grep 5432 | wc -l"', lookFor: 'watch at peak — is it climbing? reaching max? requests failing after?' },
        ],
      },

      {
        type: 'decision',
        signal: 'cache hit rate low',
        color: 'rose',
        interpretation: 'ElastiCache is serving misses — queries falling through to RDS that should be cached. A cache miss spike directly increases downstream DB load. Causes: cold cache after restart, TTL too short, eviction pressure (maxmemory-policy too aggressive), or bad invalidation logic clearing keys on every write.',
        nextHop: 'Check when the cache was last restarted and trace the cache invalidation logic.',
        validate: [
          { cmd: 'aws cloudwatch get-metric-statistics --namespace AWS/ElastiCache --metric-name CacheHitRate ...', lookFor: 'sudden drop = cache restart or mass eviction. gradual decline = TTL too short or over-invalidation' },
        ],
      },

      "If the host looks healthy, check memory:",
      { cmd: 'free -h' },
      "Swap in use = system ran out of RAM and is paging to disk. Measure first: `ps aux --sort=-%mem | head -5` — identify the consuming process before deciding whether to restart or scale up.",
    ],

    rootCauses: [
      {
        cause: 'EBS burst credits exhausted (gp2)',
        fix: 'gp2 volumes draw IOPS from a burst credit bucket. Signal chain: system slows gradually under sustained load, VolumeQueueLength rises, BurstBalance drains, iowait climbs while CPU stays low. Once exhausted, IOPS drop to baseline (3 IOPS/GB). Migrate to gp3 for provisioned IOPS without burst dependency.',
        cmd: 'aws ec2 modify-volume --volume-id <vol-id> --volume-type gp3 --iops 3000',
      },
      {
        cause: 'RDS connection pool exhausted',
        fix: 'Requests queue waiting for a connection, then time out. Add RDS Proxy — it pools and multiplexes connections, reducing the active connection count to RDS.',
      },
      {
        cause: 'Missing index on slow query',
        fix: 'Sequence: enable slow_query_log=1 and set long_query_time in the RDS parameter group → identify the specific slow query → run EXPLAIN → then evaluate indexing. Never add indexes before identifying the query. Performance Insights shows top SQL by load in real time without config changes.',
        cmd: '# RDS parameter group: slow_query_log=1, long_query_time=1, log_output=FILE\n# Then: SHOW VARIABLES LIKE "slow_query_log"; to confirm',
      },
      {
        cause: 'Memory exhausted — swap in use',
        fix: 'A process is consuming too much RAM, forcing the kernel to page to disk. Measure with ps aux first, then scale up the instance type or reduce memory pressure.',
        cmd: 'ps aux --sort=-%mem | head -5',
      },
      {
        cause: 'ElastiCache cache miss rate high',
        fix: 'Cache miss spikes increase downstream DB load directly — the DB absorbs every request that should have been cached. Causes: cold cache after restart, TTL too short, eviction pressure (maxmemory-policy), or invalidation logic clearing keys too aggressively. Warm the cache or increase TTL for stable data.',
      },
    ],

    rollback: [
      "If latency started with a recent deployment, roll back the deploy first — restore service before investigating.",
      "**Blue/green:** flip the ALB listener to the previous stable target group.",
      { cmd: 'aws elbv2 modify-listener --listener-arn <arn> --default-actions Type=forward,TargetGroupArn=<stable-tg-arn>' },
      "If latency started after an RDS parameter group change, revert it:",
      { cmd: String.raw`aws rds modify-db-parameter-group \
  --db-parameter-group-name prod-pg \
  --parameters "ParameterName=slow_query_log,ParameterValue=0,ApplyMethod=immediate"` },
      "If a cache config change caused excessive misses, flush and allow the cache to re-warm — or roll back the ElastiCache config change.",
    ],

    probes: [
      {
        q: 'High load average but CPU looks normal. What does that tell you?',
        a: [
          'Load average counts I/O-waiting processes, not just CPU-active ones — load average ≠ CPU utilization',
          'High load + low CPU% = disk or network bottleneck, not compute',
          'High load + low CPU + low iowait = network waits, lock contention, or kernel-level blocking',
          'Measure first: `iostat -x 1` — %iowait and %util columns tell the real story',
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
          'gp2 burst credits drain gradually under sustained load — exhaustion looks like a progressive slowdown',
          'Signal chain: VolumeQueueLength rises → BurstBalance drains → iowait climbs, CPU stays low',
          'Check CloudWatch VolumeQueueLength — above 1 means disk is backed up',
          'gp3 is provisioned, no burst credits — prefer it over gp2 for consistent workloads',
        ],
      },
      {
        q: 'How do you find which query is causing the slowdown?',
        a: [
          'Sequence: enable slow_query_log=1, set long_query_time → identify the specific query → EXPLAIN → then evaluate indexing',
          'Performance Insights if enabled — shows top SQL by load in real time, no config change needed',
          'Never add indexes before identifying the query — confirm first, then remediate',
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
        layers: [{ layer: 'dns', tool: 'dig app.example.com', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I https://app.example.com', status: 'cleared', signal: 'responds (502 intermittent)' }] },

      { id: 'targetgroup',
        layers: [{ layer: 'targetgroup', tool: 'aws elbv2 describe-target-health --target-group-arn <arn>', status: 'stuck', signal: 'transitions: healthy → unhealthy → initial' }] },

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
      'Configure logrotate for every service — unmanaged logs are the most common cause of disk-full crashes.',
      'Ship logs to CloudWatch Logs before the instance terminates — once ASG replaces a crashing instance the local logs are gone.',
      'DiskUsed% > 80% (CW Agent required)',
      'MemoryUtilization > 80% (CW Agent required)',
      'Restart=on-failure · RestartSec=5s',
    ],

    flow: [
      "Start with systemd — the exit code is the branch indicator.",
      { cmd: 'systemctl status myapp' },
      "Read the state carefully: `failed` = crashed or exited non-zero — systemd will attempt restart. `inactive` = stopped, not scheduled to restart — likely intentional. `activating` = stuck in startup, not yet ready. Exit code and last log lines are in the status output — read them before going anywhere else.",

      "**Log source hierarchy — use the right tool before grepping blindly:**",
      { list: [
        "systemd-managed service logs → `journalctl -u myapp -n 100`",
        "kernel-level events (OOM, hardware faults) → `dmesg` or `journalctl -k`",
        "plain file logs → `grep` / `tail` / `awk` against `/var/log/*`",
        "all currently failed units → `systemctl list-units --failed`",
      ]},

      {
        type: 'decision',
        signal: 'exit 137',
        color: 'amber',
        interpretation: 'SIGKILL — the process was killed externally, not crashed by app logic. The OOM killer is the most common cause at AWS scale. anon-rss in the kernel log is the actual RAM the process was consuming at kill time.',
        nextHop: 'Check kernel logs for OOM evidence — anon-rss tells you actual RAM resident at kill.',
        validate: [
          { cmd: "dmesg | grep -i 'killed process'", lookFor: 'process name, anon-rss (actual RAM at kill), and timestamp — correlates with the crash time' },
          { cmd: "journalctl -k | grep -i 'killed process'", lookFor: 'alternative to dmesg — persistent across reboots, same kernel ring buffer content' },
          { cmd: 'free -h', lookFor: 'swap in use = RAM exhausted. available < 100MB = under memory pressure right now' },
          { cmd: 'ps aux --sort=-%mem | head -5', lookFor: 'which process is consuming most RAM currently' },
        ],
      },

      {
        type: 'decision',
        signal: 'exit 1',
        color: 'amber',
        interpretation: 'Application error — the process started but exited with a non-zero code. The reason is in the application logs, not the kernel. Do not go to dmesg.',
        nextHop: 'Read journalctl — the last lines before exit are the answer.',
        validate: [
          { cmd: 'journalctl -u myapp -n 100', lookFor: 'config file not found / port already in use / DB connection refused / permission denied / missing env var' },
          { cmd: 'journalctl -u myapp -p err --no-pager', lookFor: 'errors only — cuts through INFO noise to expose the failure reason' },
        ],
      },

      {
        type: 'decision',
        signal: 'df 100%',
        color: 'rose',
        interpretation: 'Filesystem full. The app cannot write log files, PID files, or temp files — it fails silently with no useful error. Free space first, then restart.',
        nextHop: 'Free space before restarting. Restarting on a full disk will crash again immediately.',
        validate: [
          { cmd: 'du -sh /var/log/* | sort -rh | head -10', lookFor: 'logs are almost always the culprit' },
          { cmd: "lsof | grep deleted | awk '{print $2, $7, $9}' | sort -k2 -rn | head -5", lookFor: 'large deleted files held open — space not freed until process closes the fd' },
          { cmd: 'journalctl --disk-usage', lookFor: 'systemd journal grows silently and is often the overlooked culprit during disk-full incidents' },
        ],
      },

      "To see all failing services at a glance:",
      { cmd: 'systemctl list-units --failed --no-legend' },
      "**ASG masking the problem:** the instance terminates before you can investigate. Check the ASG activity log and add a Terminating:Wait lifecycle hook to buy time.",
      { cmd: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>' },
    ],

    rootCauses: [
      {
        cause: 'OOM kill (exit 137)',
        fix: 'Process was consuming too much RAM — kernel killed it. anon-rss in dmesg / journalctl -k output is the actual RAM resident at kill time. Memory leak pattern: RSS climbs over hours, OOM kills, ASG replaces, repeats. Only catchable with MemoryUtilization over time from CW Agent.',
        cmd: "dmesg | grep -i 'killed process'\n# or: journalctl -k | grep -i 'killed process'",
      },
      {
        cause: 'Disk full (df 100%)',
        fix: 'Zero the log file in place — the fd stays valid, process keeps running, space freed immediately. Then set up logrotate to prevent recurrence. journalctl journal growth is often overlooked — check and vacuum it proactively.',
        cmd: 'truncate -s 0 /var/log/app/access.log\njournalctl --disk-usage\njournalctl --vacuum-size=500M',
      },
      {
        cause: 'App startup error (exit 1)',
        fix: 'Collect evidence first — read the last lines in journalctl before restarting. Config parse error, missing dependency, port conflict. Fix the root cause, reload the daemon, restart.',
        cmd: 'journalctl -u myapp -n 50\nsystemctl daemon-reload && systemctl restart myapp',
      },
      {
        cause: 'Deleted file held open — space not freed',
        fix: 'du does not show deleted-but-open files. Find them with lsof. Truncate in place — does not require killing the holding process.',
        cmd: "lsof | grep deleted | awk '{print $2, $7, $9}' | sort -k2 -rn | head -5",
      },
      {
        cause: 'Tight restart loop (Restart=always, no RestartSec)',
        fix: 'Process fails instantly, restarts instantly — tight loop. systemd rate-limits after 5 restarts in 10s. Add RestartSec=5s and change to Restart=on-failure.',
      },
    ],

    rollback: [
      "If a recent deployment caused the crashes, roll back before investigating — restore service first.",
      "**Blue/green:** flip the ALB listener to the previous stable target group.",
      { cmd: 'aws elbv2 modify-listener --listener-arn <arn> --default-actions Type=forward,TargetGroupArn=<stable-tg-arn>' },
      "If disk is full on a running instance, free space immediately without restarting the process:",
      { cmd: 'truncate -s 0 /var/log/app/access.log\njournalctl --vacuum-size=500M' },
      "**journalctl maintenance:** systemd journal growth is often overlooked during disk-full incidents — it accumulates silently across reboots. Check size and vacuum proactively:",
      { cmd: 'journalctl --disk-usage\njournalctl --vacuum-size=500M' },
      "To buy investigation time before the ASG terminates a crashing instance, add a Terminating:Wait lifecycle hook:",
      { cmd: String.raw`aws autoscaling put-lifecycle-hook \
  --auto-scaling-group-name prod-asg \
  --lifecycle-hook-name pause-for-debug \
  --lifecycle-transition autoscaling:EC2_INSTANCE_TERMINATING \
  --heartbeat-timeout 3600` },
    ],

    probes: [
      {
        q: 'Service keeps restarting. Exit code 137. What happened?',
        a: [
          'Exit 137 = SIGKILL — process was killed externally, not crashed by app logic',
          'OOM killer is the most common cause: `dmesg | grep -i "killed process"` or `journalctl -k | grep -i "killed process"`',
          'anon-rss in the output = actual RAM the process was consuming at kill time',
          'Also check `free -h` — swap in use confirms RAM was exhausted',
        ],
      },
      {
        q: 'ASG keeps launching new instances every 10 minutes. How do you investigate?',
        a: [
          'Instances terminate before you can get on them — collect evidence from CloudWatch Logs first',
          'ASG activity log: `aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>`',
          'Add lifecycle hook (Terminating:Wait) to pause termination for investigation',
          'Requires CW Logs agent shipping logs before termination — otherwise evidence is gone',
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
          '`journalctl --disk-usage` then `--vacuum-size=500M` — systemd journal grows silently and is often missed',
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
        layers: [{ layer: 'dns', tool: 'dig app.example.com', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I https://app.example.com', status: 'cleared', signal: 'responds' }] },

      { id: 'targetgroup',
        layers: [{
          layer: 'targetgroup', tool: 'aws elbv2 describe-target-health --target-group-arn <arn>', status: 'stuck', signal: '',
          branches: [
            { signal: 'some healthy some not', meaning: 'mixed versions — rolling update partial' },
            { signal: 'all unhealthy',         meaning: 'bad deploy landed everywhere' },
          ],
        }]
      },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system',  tool: 'curl :version', status: 'reached', signal: 'reachable' },
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
      'Prefer blue/green deployments over rolling — rollback is a traffic shift back to the old target group, not a redeploy.',
      'Store the current AMI ID in Parameter Store — gives you a reliable rollback target without hunting for the old ID under pressure.',
      'All configuration changes through IaC only — manual changes leave no audit trail and cause silent drift.',
      'Never deregister an AMI while it is in use — ASG scale-out will fail silently if the launch image is gone.',
    ],

    flow: [
      "First question: what changed and when exactly? Most outages trace to a change. Get the deploy time before doing anything else.",

      {
        type: 'decision',
        signal: 'some targets healthy, some not',
        color: 'amber',
        interpretation: 'Rolling deploy landed on some instances but not all. ALB routes round-robin — different users hit different versions. The broken version is on a subset of instances.',
        nextHop: 'Identify which instances have the new version. Roll back or complete the deploy.',
        validate: [
          { cmd: 'curl http://<instance-ip>:8080/version', lookFor: 'compare version across instances — identifies which ones have the broken deploy' },
          { cmd: 'aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name>', lookFor: 'launch template version per instance — confirms mixed state' },
        ],
      },

      {
        type: 'decision',
        signal: 'AccessDenied in app logs',
        color: 'rose',
        interpretation: 'An IAM policy change removed a permission the app depends on. This only surfaces when the code path that uses that permission runs — not at startup.',
        nextHop: 'Identify the exact API call that is failing and restore the permission via IaC.',
        validate: [
          { cmd: 'aws sts get-caller-identity', lookFor: 'confirm which role the instance is using' },
          { cmd: 'aws s3 ls s3://my-bucket', lookFor: 'test the specific dependency directly from the instance' },
          { cmd: 'journalctl -u myapp | grep -i "access denied"', lookFor: 'which API call is failing — tells you the exact permission needed' },
        ],
      },

      {
        type: 'decision',
        signal: 'old behaviour despite config change',
        color: 'rose',
        interpretation: 'Most services read config at startup only. Updating the config file does not take effect until the service restarts. The running process is still using its in-memory config from before the change.',
        nextHop: 'Restart the service. Check journalctl after for config parse errors.',
        validate: [
          { cmd: 'systemctl restart myapp', lookFor: 'check exit code — if it fails, the new config has an error' },
          { cmd: 'journalctl -u myapp -n 30', lookFor: 'config parse error = file is wrong. started successfully = change applied' },
        ],
      },

      "Rollback path depends on the deployment method:",
      { list: [
        "Blue/green: flip the ALB listener back to the old target group — traffic shift, seconds, no rebuild",
        "Rolling: redeploy previous AMI ID from Parameter Store",
        "IaC: revert commit, re-apply — `terraform plan` shows the diff before apply",
      ]},
      "Collect evidence before layering further changes. Do not remediate on top of a broken state without capturing root cause first.",
    ],

    rootCauses: [
      {
        cause: 'App regression in new deployment',
        fix: 'Bad code or config in the new version. Roll back via ALB listener (blue/green) or redeploy previous AMI (rolling).',
        cmd: 'aws elbv2 modify-listener --listener-arn <arn> --default-actions Type=forward,TargetGroupArn=<stable-tg-arn>',
      },
      {
        cause: 'IAM permission removed',
        fix: 'App loses access to a dependency mid-flight. Check which API call fails in journalctl. Restore the permission in the IAM policy via IaC.',
        cmd: 'aws sts get-caller-identity  # confirm role, then check attached policies',
      },
      {
        cause: 'Config change not applied — service not restarted',
        fix: 'Config files are read at startup. File updated but process not restarted = still on old config. Restart the service.',
        cmd: 'systemctl restart myapp && journalctl -u myapp -n 20',
      },
      {
        cause: 'Mixed version rollout — partial deploy',
        fix: 'Rolling update left instances on different versions. Complete the deploy to all instances, or roll back all instances to the previous version.',
      },
      {
        cause: 'SG rule changed, blocking a dependency',
        fix: 'Outbound rule removed or inbound rule on the target resource changed. Test connectivity and restore via IaC.',
        cmd: 'nc -zvw2 db.internal 5432  # test from the instance',
      },
    ],

    rollback: [
      "Choose the fastest rollback path first — restore service, then investigate root cause.",
      "**Blue/green:** flip the ALB listener back to the stable target group — traffic shifts in seconds.",
      { cmd: 'aws elbv2 modify-listener --listener-arn <arn> --default-actions Type=forward,TargetGroupArn=<stable-tg-arn>' },
      "**Rolling deploy — two rollback models:**",
      { list: [
        "**Revert ASG to previous launch template version** — fast, modifies the version in-place.",
        "**Create a new launch template version referencing the previous AMI** — preferred for audit consistency. Every change is a forward revision, history is clean, reviewable, and never rewritten.",
      ]},
      { cmd: String.raw`PREV_AMI=$(aws ssm get-parameter --name /prod/ami/app-latest --query Parameter.Value --output text)
# Create a new LT version pointing at the previous AMI (preferred — preserves audit history)
aws ec2 create-launch-template-version \
  --launch-template-id <lt-id> \
  --source-version '$Latest' \
  --launch-template-data "{\"ImageId\":\"$PREV_AMI\"}"
# Then update ASG to use the new version number` },
      "**IaC change (Terraform/CDK):** revert the commit and re-apply. Always run plan before apply — confirms exactly what will change.",
      { cmd: 'terraform plan  # verify the revert diff before applying' },
      "**IAM policy change:** restore the removed permission in IaC. Never manually edit IAM policies to fix — that creates drift with no audit trail.",
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
        layers: [{ layer: 'dns', tool: 'dig app.example.com', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'CW metrics', status: 'stuck', signal: 'TargetResponseTime spiking intermittently' }] },

      { id: 'targetgroup',
        layers: [{ layer: 'targetgroup', tool: 'aws elbv2 describe-target-health --target-group-arn <arn>', status: 'stuck', signal: 'healthy ↔ unhealthy cycling' }] },

      { id: 'instance', label: 'Instance',
        layers: [
          { layer: 'system',  tool: 'top / free',  status: 'reached', signal: 'resource pressure at peak' },
          { layer: 'process', tool: 'ss -tp',       status: 'reached', signal: 'ESTABLISHED connections climbing' },
          { layer: 'app',     tool: 'curl · logs',  status: 'failing', signal: '',
            branches: [
              { signal: 'connection pool exhaustion', meaning: 'requests queue then time out' },
              { signal: '/health endpoint too heavy', meaning: 'DB call times out under load — amplifies outage' },
              { signal: 'memory climbing',            meaning: 'slow leak — OOM eventually, ASG hides it' },
            ]
          },
        ]
      },

      { id: 'data',
        layers: [{ layer: 'data', tool: 'ss / CW RDS', status: 'failing', signal: 'RDS max_connections pressure' }] },
    ],

    prevention: [
      'Health endpoint must be trivial — no database calls, no external dependencies. A DB call in /health that times out under load starts a flapping cascade.',
      'Set HealthCheckGracePeriod to match your measured startup time — too short means instances are terminated before the app is ready.',
      'UnhealthyHostCount > 0',
      'MemoryUtilization > 80% (CW Agent required)',
      'RDS Proxy prevents connection pool exhaustion — the most common cause of intermittent timeouts that correlate with traffic spikes.',
      'Store session state in ElastiCache, not on the instance — sticky sessions create AZ imbalance and hide individual instance failures.',
    ],

    flow: [
      "Intermittent is the hardest class. Resist the instinct to start poking. Pattern first.",
      "Does it correlate with time of day? Load-related. Same users every time? Sticky sessions or AZ imbalance. Getting worse slowly over days? Slow leak.",

      {
        type: 'decision',
        signal: 'TargetResponseTime spiking at peak',
        color: 'amber',
        interpretation: 'Latency correlates with load — this is a capacity or queuing problem, not a code bug. Something is saturating at peak: DB connections, memory, disk I/O, or the instance CPU.',
        nextHop: 'Pull CloudWatch metrics across the failure window. Find what else was spiking at the same moment.',
        validate: [
          { cmd: 'aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name TargetResponseTime ...', lookFor: 'when did it start? what else changed at that exact moment?' },
          { cmd: 'top', lookFor: 'CPU, load average vs nproc — is the host saturated?' },
          { cmd: 'free -h', lookFor: 'swap in use = memory exhausted. available < 100MB = under pressure now' },
        ],
      },

      {
        type: 'decision',
        signal: 'ESTABLISHED connections climbing',
        color: 'amber',
        interpretation: 'Requests are queuing for a database connection. New requests start late, respond late, ALB sees timeouts. This is connection pool exhaustion — it looks like latency but is not a latency problem.',
        nextHop: 'Compare live connection count to RDS max_connections. Fix is RDS Proxy.',
        validate: [
          { cmd: 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l', lookFor: 'compare against max_connections in the RDS parameter group' },
          { cmd: 'watch -n 2 "ss -tp | grep ESTABLISHED | grep 5432 | wc -l"', lookFor: 'watch at peak — is it climbing to max? requests failing immediately after?' },
        ],
      },

      {
        type: 'decision',
        signal: 'healthy ↔ unhealthy cycling',
        color: 'amber',
        interpretation: 'The health check passes, then fails, then passes again in a cycle. Either the /health endpoint is too heavy under load, or HealthCheckGracePeriod is too short on new instances.',
        nextHop: 'Time the /health endpoint under load. Compare to the ALB health check timeout setting.',
        validate: [
          { cmd: "curl -s -o /dev/null -w '%{time_total}' http://localhost:8080/health", lookFor: 'how long does /health take? close to ALB timeout = it will flap under load' },
          { cmd: 'aws elbv2 describe-target-groups --load-balancer-arn <arn>', lookFor: 'HealthCheckTimeoutSeconds — if /health response time approaches this, flapping is expected under load' },
        ],
      },
    ],

    rootCauses: [
      {
        cause: 'Connection pool exhaustion (RDS max_connections)',
        fix: 'Add RDS Proxy — pools and multiplexes connections from many app instances down to a smaller pool on RDS. Intermittent timeouts at peak disappear.',
      },
      {
        cause: '/health endpoint doing DB call',
        fix: 'Under load, the DB call times out. /health returns 5xx. ALB marks instance unhealthy, drains it, load redistributes, pressure drops, check passes again — repeat. Remove all external dependencies from /health.',
      },
      {
        cause: 'Memory leak (slow OOM cycle)',
        fix: 'RSS climbs over hours, OOM kills, ASG replaces, repeats. Only visible with MemoryUtilization over time from CW Agent. Profile and patch the leak.',
        cmd: 'ps aux --sort=-%mem | head -5  # identify the consuming process',
      },
      {
        cause: 'Sticky sessions causing AZ imbalance',
        fix: 'Sessions pinned to one AZ. That AZ loses capacity, all those users see errors. Move session state to ElastiCache and remove sticky sessions from the ALB target group.',
      },
      {
        cause: 'HealthCheckGracePeriod too short',
        fix: 'New instances terminated before the app finishes starting. Measure actual startup time and set grace period to that plus a buffer.',
        cmd: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name prod-asg --health-check-grace-period 120',
      },
    ],

    rollback: [
      "Intermittent issues rarely have a clean rollback — they are usually configuration or architecture problems, not a bad deploy.",
      "If the issue started after a recent change, roll back that change first:",
      { cmd: 'aws elbv2 modify-listener --listener-arn <arn> --default-actions Type=forward,TargetGroupArn=<stable-tg-arn>' },
      "If health check flapping is causing cascading failures, temporarily raise the unhealthy threshold — buys time to diagnose without continual instance replacement:",
      { cmd: String.raw`aws elbv2 modify-target-group \
  --target-group-arn <tg-arn> \
  --unhealthy-threshold-count 5 \
  --health-check-timeout-seconds 10` },
      "If connection pool exhaustion is the immediate cause, temporarily increase max_connections while RDS Proxy is being provisioned:",
      { cmd: String.raw`aws rds modify-db-parameter-group \
  --db-parameter-group-name prod-pg \
  --parameters "ParameterName=max_connections,ParameterValue=500,ApplyMethod=pending-reboot"` },
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
        layers: [{ layer: 'dns', tool: 'dig app.example.com', status: 'cleared', signal: 'resolves' }] },

      { id: 'alb',
        layers: [{ layer: 'alb', tool: 'curl -I https://app.example.com', status: 'cleared', signal: 'responds' }] },

      { id: 'targetgroup',
        layers: [{
          layer: 'targetgroup', tool: 'aws elbv2 describe-target-health --target-group-arn <arn>', status: 'stuck', signal: '',
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
      'Set HealthCheckGracePeriod to the measured startup time of your app — new instances need time to initialise before the first health check fires.',
      'Use ELB health check type, not EC2 — EC2 only checks hardware status, so a running instance with a broken app stays in rotation indefinitely.',
      'Set MinHealthyPercentage=90% on instance refresh — maintains capacity during rolling AMI updates.',
      'Lifecycle hook on Terminating:Wait lets you drain connections, flush state, and ship final logs before the instance is terminated.',
    ],

    flow: [
      "Two distinct problem classes — scaling not triggering, or scaling triggering but instances not becoming healthy.",

      {
        type: 'decision',
        signal: 'no scale out despite alarm in ALARM',
        color: 'amber',
        interpretation: 'The CloudWatch alarm has fired but the ASG is not adding instances. Either a cooldown period is blocking the trigger, or desired capacity has already reached max and there is nowhere to go.',
        nextHop: 'Check desired vs max capacity first, then cooldown state in the activity log.',
        validate: [
          { cmd: 'aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name>', lookFor: 'desired == max = ceiling hit. check cooldown timestamp in the activity log' },
          { cmd: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>', lookFor: 'was a scale event attempted and blocked? what was the stated reason?' },
          { cmd: 'aws cloudwatch describe-alarms --alarm-names <name>', lookFor: 'confirm alarm is actually in ALARM state. check metric period and evaluation window' },
        ],
      },

      {
        type: 'decision',
        signal: 'instances terminate immediately after launch',
        color: 'rose',
        interpretation: 'New instances are launched but fail health checks before the app finishes starting. HealthCheckGracePeriod is shorter than actual startup time — the instance is terminated before it has a chance.',
        nextHop: 'Measure actual startup time, increase grace period, and check bootstrap logs for errors.',
        validate: [
          { cmd: "aws autoscaling describe-auto-scaling-groups | jq '.[].HealthCheckGracePeriod'", lookFor: 'compare to actual startup time — should be startup + buffer (30-60s)' },
          { cmd: 'cat /var/log/cloud-init-output.log', lookFor: 'bootstrap errors — a failure here means the app never starts at all' },
          { cmd: 'journalctl -u myapp -n 50', lookFor: 'app startup errors that prevent it from passing health checks' },
        ],
      },

      {
        type: 'decision',
        signal: 'EC2 health type, app broken',
        color: 'rose',
        interpretation: 'EC2 health check only verifies the instance is running and passes system status checks. A running instance with a broken app is permanently healthy to EC2 checks — it will never be replaced by the ASG.',
        nextHop: 'Switch ASG health check type to ELB. The ASG then adopts the ALB verdict.',
        validate: [
          { cmd: 'aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <name>', lookFor: 'HealthCheckType: EC2 = broken app stays in rotation. needs to be ELB for web-facing workloads' },
          { cmd: 'aws elbv2 describe-target-health --target-group-arn <arn>', lookFor: 'is the ALB already seeing the targets as unhealthy? if so, ASG just does not know yet.' },
        ],
      },

      "**Mixed versions after deploy — check instance refresh status:**",
      { cmd: 'aws autoscaling describe-instance-refreshes --auto-scaling-group-name <name>' },
      "A paused or failed refresh leaves instances on mixed versions. Refresh pauses when too many instances fail health checks during the update (MinHealthyPercentage threshold).",
    ],

    rootCauses: [
      {
        cause: 'Desired capacity at max — cannot scale out',
        fix: 'ASG ceiling reached. Increase max capacity immediately, then review if the limit should stay higher permanently.',
        cmd: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name prod-asg --max-size 20',
      },
      {
        cause: 'Cooldown period blocking scale out',
        fix: 'Previous scale event triggered a cooldown (default 300s). ASG ignores new triggers during this window. Wait for it to expire or reduce the cooldown on the policy.',
        cmd: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name <name>  # shows cooldown end time',
      },
      {
        cause: 'HealthCheckGracePeriod too short',
        fix: 'Instances terminated before app finishes starting. Measure startup time and set grace period to that plus a buffer.',
        cmd: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name prod-asg --health-check-grace-period 120',
      },
      {
        cause: 'EC2 health check type — app failures invisible to ASG',
        fix: 'Switch to ELB health check type. ASG then uses the ALB verdict — instances with broken apps are identified and replaced.',
        cmd: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name prod-asg --health-check-type ELB',
      },
      {
        cause: 'Bootstrap script failing — app never starts',
        fix: 'cloud-init runs user data at first boot. A failure here means the app never starts. Check the log and fix the script.',
        cmd: 'cat /var/log/cloud-init-output.log | tail -50',
      },
    ],

    rollback: [
      "If a bad instance refresh left instances on a broken version, cancel the refresh and start a new one with the previous AMI.",
      { cmd: String.raw`aws autoscaling cancel-instance-refresh --auto-scaling-group-name prod-asg
# Then start a new refresh pinned to the previous AMI version` },
      "If instances are not scaling out and you need capacity immediately, manually raise desired above the current max:",
      { cmd: String.raw`aws autoscaling update-auto-scaling-group \
  --auto-scaling-group-name prod-asg \
  --max-size 20 \
  --desired-capacity 10` },
      "Switch health check type to ELB immediately if broken instances are staying in rotation:",
      { cmd: String.raw`aws autoscaling update-auto-scaling-group \
  --auto-scaling-group-name prod-asg \
  --health-check-type ELB \
  --health-check-grace-period 120` },
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
