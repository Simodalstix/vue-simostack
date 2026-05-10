export const scenarios = [
  {
    id: 'app-unreachable',
    title: 'App Unreachable — Outside-In',
    symptom: "users can't reach the app / health check alert fires",
    firstQuestion: 'everyone or one user? All AZs or one?',
    steps: [
      {
        n: 1,
        label: 'DNS — does the name resolve?',
        runFrom: 'your machine or a bastion — testing as an external client would',
        lines: [
          { cmd: 'dig +short api.example.com' },
          { note: '+short strips the full DNS response — gives you just the answer: IP or empty' },
          { out: '(empty)',    status: 'fail', meaning: 'DNS failure — Route 53 record, propagation, DHCP options' },
          { out: '10.0.1.15', status: 'ok',   meaning: 'resolves — move to network layer' },
          { cmd: 'dig @169.254.169.253 +short api.example.com' },
          { note: 'VPC resolver — use when resolves externally but not from inside the VPC' },
        ],
      },
      {
        n: 2,
        label: 'Port — is anything listening?',
        runFrom: 'the instance itself, or a host in the same VPC',
        lines: [
          { cmd: 'nc -zvw2 <ip> 443' },
          { note: '-z = scan only (no data), -v = verbose, -w2 = 2s timeout' },
          { out: 'Connection timed out', status: 'fail', meaning: 'SG or NACL blocking — packet never arrives' },
          { out: 'Connection refused',   status: 'fail', meaning: 'reaches host, but nothing listening on that port' },
        ],
      },
      {
        n: 3,
        label: 'ALB — is the load balancer responding?',
        runFrom: 'anywhere with network access to the ALB DNS',
        lines: [
          { cmd: 'curl -sf http://<alb-dns>/health' },
          { note: '-s = silent, -f = fail with non-zero exit on 4xx/5xx (useful in scripts)' },
          { out: 'curl: (7) Failed to connect', status: 'fail', meaning: 'ALB itself unreachable' },
          { out: 'HTTP/1.1 502',               status: 'fail', meaning: 'ALB up, but all targets unhealthy' },
          { cmd: 'aws elbv2 describe-target-health --target-group-arn <arn>' },
          { out: '"State": "unhealthy", "Reason": "Target.FailedHealthChecks"', status: 'fail' },
        ],
      },
      {
        n: 4,
        label: 'Instance — is the app running?',
        runFrom: 'the instance via SSH or SSM',
        lines: [
          { cmd: 'systemctl status app' },
          { out: 'Active: failed (Result: exit-code)', status: 'fail' },
          { cmd: 'journalctl -u app -n 30 --no-pager' },
          { note: '-u = unit, -n 30 = last 30 lines, --no-pager = don\'t pause output' },
          { out: 'FATAL: cannot write to /var/log/app', status: 'fail', meaning: 'disk full or permissions — see Disk Full' },
        ],
      },
      {
        n: 5,
        label: 'Disk — is it full?',
        lines: [
          { cmd: 'df -h' },
          { note: '-h = human-readable sizes (G, M, K)' },
          { out: '/dev/xvda1   20G   19.9G   0   100% /', status: 'fail', meaning: 'disk full → see Disk Full scenario' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'What does the VPC resolver at 169.254.169.253 tell you that external DNS doesn\'t?', a: 'External DNS shows what the world resolves. VPC resolver shows what instances inside the VPC see. A record might resolve publicly but fail inside due to a missing private hosted zone or split-horizon misconfiguration.' },
        { q: 'What\'s the TTL risk when updating a Route 53 record mid-incident?', a: 'Old TTL stays cached in resolvers until it expires. If TTL was 300s, you\'re waiting up to 5 minutes for propagation. Lesson: set low TTL before planned changes.' },
      ],
      2: [
        { q: 'What\'s the difference between connection timed out and connection refused at the network level?', a: 'Timed out = packet never arrives — dropped by SG, NACL, or missing route. Refused = packet arrives at the host but nothing is listening on that port. Two completely different problems.' },
        { q: 'How would you confirm an SG is specifically dropping the packet?', a: 'VPC Flow Logs — rejected packets show REJECT action. Filter on the source IP and destination port to confirm the rule is dropping it.' },
      ],
      3: [
        { q: 'What algorithm does ALB use by default for routing requests to targets?', a: 'Round-robin. Least outstanding requests (LOR) is available and better for endpoints with variable processing time.' },
        { q: 'What\'s the timing risk when ASG replaces an unhealthy instance?', a: 'New instance launches but the app needs time to start and pass health checks. Without a grace period, ALB marks it unhealthy before it\'s ready. Health check grace period (60s+ for JVM) prevents this.' },
      ],
      4: [
        { q: 'When would you use SSM over SSH to get on the instance?', a: 'When port 22 is blocked, no key pair exists, or the instance is in a private subnet with no bastion. SSM requires no open port — just IAM role with AmazonSSMManagedInstanceCore and outbound 443.' },
        { q: 'What\'s the difference between journalctl -u app and journalctl -xe?', a: '-u app = logs for that unit only. -xe = all journal logs jumping to the end with plain-English explanations. -xe is useful when the failure involves a dependency or a system-level event.' },
      ],
      5: [
        { q: 'What\'s the difference between df showing 100% and inode exhaustion?', a: 'df -h = block usage (actual file data). df -ih = inode usage (number of files). You can exhaust inodes with free blocks — millions of tiny files from sessions, tmp, or mail queues.' },
        { q: 'What\'s the fastest way to recover disk space without deleting logs permanently?', a: 'If a process holds a deleted file open: truncate -s 0 /path/to/log zeros it in place — space freed immediately, process keeps running, no restart needed.' },
      ],
    },
    causes: [
      { trigger: 'DNS not resolving',   fix: 'Route 53 record wrong, DHCP options, TTL not propagated' },
      { trigger: 'Port timed out',      fix: 'SG not allowing source IP, NACL blocking' },
      { trigger: 'ALB 502',             fix: 'all targets unhealthy — app crashed or health check misconfigured' },
      { trigger: 'App failed to start', fix: 'config error, port conflict, disk full, permissions' },
      { trigger: 'Disk full',           fix: 'logs accumulated, app can\'t write' },
    ],
    prevention: [
      'CloudWatch alarm: UnhealthyHostCount > 0, disk utilisation > 80%',
      '/health endpoint — dedicated, always 200, no auth, no DB dependency',
      'logrotate configured for all app logs',
    ],
    probes: [
      { q: 'Where would you start if you couldn\'t SSH in at all?', a: 'SSM Session Manager — no port 22 needed, just an IAM role attached to the instance' },
      { q: 'Why test DNS before anything else?', a: 'DNS failure breaks everything downstream — rules it out in seconds before touching anything else' },
      { q: 'Connection timed out vs connection refused?', a: 'timed out = packet dropped (SG/NACL/routing) | refused = reaches host, but nothing is listening on that port' },
    ],
  },

  {
    id: 'disk-full',
    title: 'Disk Full',
    symptom: 'no space left on device / writes failing / app won\'t start',
    firstQuestion: 'space exhaustion or inode exhaustion? They have different fixes.',
    steps: [
      {
        n: 1,
        label: 'Identify the type of exhaustion',
        lines: [
          { cmd: 'df -h' },
          { out: '/dev/xvda1   20G   19.9G   0   100% /', status: 'fail', meaning: 'space full' },
          { cmd: 'df -ih' },
          { note: '-i = inode usage — you can run out even with free space (millions of tiny files: sessions, tmp, mail queues)' },
          { out: '/dev/xvda1   1.3M   1.3M   0   100% /', status: 'fail', meaning: 'inode exhaustion — different fix, skip to Step 4' },
        ],
      },
      {
        n: 2,
        label: 'Find what\'s consuming space',
        lines: [
          { cmd: 'du -sh /var/log/* | sort -rh | head -10' },
          { note: '-s = summarise, -h = human-readable, sort -r = largest first' },
          { out: '18G   /var/log/app',    status: 'fail' },
          { out: '1.2G  /var/log/nginx',  status: 'info' },
        ],
      },
      {
        n: 3,
        label: 'Deleted files still held open',
        lines: [
          { note: 'df shows full but du doesn\'t add up — file deleted but process still holds the fd' },
          { cmd: 'lsof | grep deleted | awk \'{print $2,$7,$9}\' | sort -k2 -rn' },
          { note: 'space is NOT freed until the process closes the fd or is restarted' },
          { out: '1234   19327352512   /var/log/app/access.log', status: 'fail', meaning: '18GB held by nginx' },
          { cmd: 'truncate -s 0 /var/log/app/access.log' },
          { note: 'zeros file in place — fd stays valid, process keeps running, space freed immediately' },
          { cmd: 'kill -USR1 $(cat /var/run/nginx.pid)' },
          { note: 'alternative: signal nginx to reopen its log files after rotation' },
        ],
      },
      {
        n: 4,
        label: 'Rotate logs',
        lines: [
          { cmd: 'logrotate -f /etc/logrotate.conf' },
          { note: '-f = force rotation even if the file isn\'t due yet' },
        ],
      },
      {
        n: 5,
        label: 'Inode exhaustion — clear small files',
        lines: [
          { cmd: 'find /tmp -mtime +7 -delete' },
          { note: '-mtime +7 = modified more than 7 days ago | -delete = remove in place, no pipe to rm needed' },
          { cmd: 'find /var/spool -type f -mtime +30 -delete' },
        ],
      },
      {
        n: 6,
        label: 'EBS expand (structurally undersized)',
        lines: [
          { note: 'Expand the volume in the AWS console first, then:' },
          { cmd: 'lsblk' },
          { note: 'confirm the OS sees the new size' },
          { cmd: 'sudo growpart /dev/xvda 1' },
          { note: 'extend the partition to fill the new disk size' },
          { cmd: 'sudo xfs_growfs /' },
          { note: 'resize xfs filesystem (Amazon Linux default) — ext4: sudo resize2fs /dev/xvda1' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'What\'s an inode and why can you exhaust them with free disk space remaining?', a: 'Inodes store file metadata (permissions, timestamps, pointers to blocks). Filesystem has a fixed count set at format time. Millions of small files — sessions, tmp, mail queues — each consume one inode regardless of size.' },
        { q: 'How do you check which directory has the most files when hunting inode exhaustion?', a: 'find / -xdev -printf \'%h\\n\' | sort | uniq -c | sort -rn | head — counts files per directory. Common culprits: /tmp, /var/spool, /var/lib/php/sessions.' },
      ],
      2: [
        { q: 'Why does du sometimes not account for all the space df shows as used?', a: 'Deleted files held open by running processes — they don\'t appear in du (no filename) but still consume blocks. lsof | grep deleted reveals them.' },
        { q: 'What\'s the difference between du -sh and du -h on a directory?', a: '-s = summarise to one total line. Without -s you get every subdirectory recursively. -sh /var/log/* gives a per-entry summary — much more useful for triage.' },
      ],
      3: [
        { q: 'Why does truncate -s 0 free space when rm doesn\'t?', a: 'rm unlinks the filename but the process still holds the file descriptor open — kernel keeps the blocks allocated. truncate zeros the file in place, fd stays valid, blocks freed immediately. No process restart needed.' },
        { q: 'What\'s the risk of just killing the process that holds the file open?', a: 'Application crash, possible data corruption if mid-write, clients lose connections. Truncate in place is safe — process keeps its fd, just gets an empty file to write into.' },
      ],
      4: [
        { q: 'What does the compress directive in logrotate do and why does it matter?', a: 'Gzip-compresses rotated logs. Text logs typically compress 10-20:1 — a 1GB log becomes 50MB. Critical when keeping 7+ days of rotation on a constrained volume.' },
        { q: 'What\'s the missingok directive for?', a: 'Prevents logrotate from failing the entire config if a log file doesn\'t exist — useful for apps that only create log files when they have something to write.' },
      ],
      5: [
        { q: 'What kinds of files most commonly cause inode exhaustion in practice?', a: 'PHP session files in /var/lib/php/sessions, mail queue messages in /var/spool/postfix, tmp files from web frameworks, and container overlay layers.' },
        { q: 'Why use find -delete instead of piping to rm?', a: '-delete avoids spawning a separate rm process per file — significantly faster when clearing millions of small files. find already has the path; -delete acts directly.' },
      ],
      6: [
        { q: 'What\'s the correct sequence for expanding an EBS volume in-place?', a: 'Modify volume in console (no stop needed) → wait for optimizing state → growpart to extend partition → xfs_growfs or resize2fs to extend the filesystem. OS sees the new disk size immediately after modify.' },
        { q: 'Why is growpart a separate step from xfs_growfs?', a: 'Two distinct layers: the partition table claims a slice of the disk. The filesystem fills within that partition. Expanding disk → growpart extends partition to claim new space → xfs_growfs extends filesystem to fill it.' },
      ],
    },
    causes: [
      { trigger: 'Logs never rotated',     fix: 'add /etc/logrotate.d/<app> config' },
      { trigger: 'Deleted file held open', fix: 'truncate in place or restart the holding process' },
      { trigger: 'Docker overlay2',        fix: 'docker system prune' },
      { trigger: 'Inode exhaustion',       fix: 'tmp/session files — find + delete by age' },
      { trigger: 'Volume undersized',      fix: 'expand EBS + growpart + xfs_growfs' },
    ],
    prevention: [
      'logrotate: daily, compress, rotate 7, missingok',
      'CloudWatch alarm: disk utilisation > 80%',
      'Size EBS with 30% headroom for growth',
    ],
    probes: [
      { q: 'Why does df show full but du doesn\'t account for all the space?', a: 'deleted files still held open by a process — lsof | grep deleted reveals them. Space not freed until fd is closed.' },
      { q: 'Difference between truncate and rm here?', a: 'rm unlinks the filename but the fd stays open — space not freed. truncate zeros the file in place, space freed immediately, process keeps running unaffected.' },
      { q: 'How would you prevent this recurring?', a: 'logrotate config for the app + CloudWatch disk alarm at 80% to catch it before it\'s a crisis' },
    ],
  },

  {
    id: 'service-wont-start',
    title: "Service Won't Start / Crash Loop",
    symptom: 'service alert / systemctl shows failed / process keeps restarting',
    firstQuestion: 'failing on start, or starting then immediately crashing?',
    steps: [
      {
        n: 1,
        label: 'Read the logs first — most answers are here',
        runFrom: 'the instance',
        lines: [
          { cmd: 'systemctl status nginx' },
          { out: 'Active: failed (Result: exit-code)', status: 'fail' },
          { out: '[emerg] bind() to 0.0.0.0:80 failed (98: Address in use)', status: 'fail' },
          { cmd: 'journalctl -u nginx -n 50 --no-pager' },
          { cmd: 'journalctl -xe' },
          { note: '-x = add plain-English explanations for known error codes, -e = jump to end of journal' },
        ],
      },
      {
        n: 2,
        label: 'Config syntax check',
        lines: [
          { cmd: 'nginx -t' },
          { note: '-t = test config — parses and reports errors without touching the running service' },
          { out: '[emerg] unexpected "}" in /etc/nginx/nginx.conf:42', status: 'fail', meaning: 'exact line number' },
          { out: 'configuration file test is successful',               status: 'ok' },
          { note: 'equivalents: apache2 -t  |  sshd -t  |  named-checkconf' },
        ],
      },
      {
        n: 3,
        label: 'Port conflict — something else on that port?',
        lines: [
          { cmd: 'ss -tlnp | grep :80' },
          { note: '-t = TCP, -l = listening, -n = numeric (no name resolution), -p = show process' },
          { out: 'LISTEN ... users:(("apache2",pid=999))', status: 'fail', meaning: 'apache2 owns port 80' },
        ],
      },
      {
        n: 4,
        label: 'Permissions — can the service user read/write what it needs?',
        lines: [
          { cmd: 'ls -la /var/log/nginx/' },
          { cmd: 'stat -c \'%a %U %G\' /etc/app/config.yaml' },
          { note: '%a = octal permissions, %U = owner name, %G = group name' },
        ],
      },
      {
        n: 5,
        label: 'SELinux — is a policy blocking it?',
        lines: [
          { cmd: 'ausearch -m avc -ts recent | audit2why' },
          { note: '-m avc = access vector cache denials | audit2why = plain English explanation + suggested fix' },
          { out: 'avc: denied { name_bind } for comm="nginx" src=80', status: 'fail' },
          { out: 'setsebool -P httpd_can_network_connect 1', status: 'info', meaning: 'suggested fix from audit2why' },
        ],
      },
      {
        n: 6,
        label: 'Resources — can it even start?',
        lines: [
          { cmd: 'df -h' },
          { note: 'can it write its pid file and logs?' },
          { cmd: 'free -h' },
          { note: 'is there any memory available?' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'What does Result: exit-code in systemctl status tell you vs Result: signal?', a: 'exit-code = process ran and exited non-zero (config error, missing dependency, explicit failure). signal = killed by a signal (SIGKILL from OOM, SIGSEGV crash). Different root causes.' },
        { q: 'When would you use journalctl -xe instead of journalctl -u app?', a: '-xe shows all journal logs across services with explanations — useful when the failure involves a dependency (DB unavailable, socket not ready) that shows up in a different unit.' },
      ],
      2: [
        { q: 'What does systemctl reload do differently from systemctl restart?', a: 'reload = sends SIGHUP — workers finish existing connections then reload config, zero downtime. restart = stop + start, brief gap. reload only works if the service supports it.' },
        { q: 'Does nginx -t validate all included config files?', a: 'Yes — parses nginx.conf and all include directives recursively (conf.d/, sites-enabled/). Reports the first error with exact file path and line number.' },
      ],
      3: [
        { q: 'How do you cleanly stop the conflicting process once you\'ve identified it?', a: 'systemctl stop <service> if it\'s a managed service. Don\'t kill -9 unless you know what it is — give it a chance to clean up. Check if it should be running at all first.' },
        { q: 'Why would a port still be bound after a service restart?', a: 'Previous instance left a socket in TIME_WAIT, ungraceful shutdown left the fd open, or a duplicate service unit is running. ss -tlnp shows both the port and the owning PID.' },
      ],
      4: [
        { q: 'What user does systemd run a service as by default if User= isn\'t set?', a: 'root. Most web services should specify User= and Group= in the [Service] section — running as root is a security risk and can mask permission issues.' },
        { q: 'How do you check what user a service is configured to run as?', a: 'systemctl cat <service> — shows the full unit file including User= and Group=. Or cat /etc/systemd/system/<service>.service directly.' },
      ],
      5: [
        { q: 'What\'s the difference between restorecon and setsebool?', a: 'restorecon resets file security context to what the policy expects — fixes files placed in wrong locations. setsebool enables/disables named booleans like httpd_can_network_connect.' },
        { q: 'What does audit2why output tell you that the raw AVC denial doesn\'t?', a: 'Translates the denial into plain English, identifies which policy rule triggered it, and usually suggests the specific setsebool or restorecon command to resolve it.' },
      ],
      6: [
        { q: 'How would you debug a service that OOM kills immediately on start?', a: 'dmesg | grep -i killed — shows OOM kill with process name and memory stats. Check systemd unit for MemoryMax= limit. Check /proc/<pid>/oom_score before it dies if possible.' },
        { q: 'What systemd directive would you use to cap a service\'s memory and prevent OOM?', a: 'MemoryMax= in the [Service] section — kernel enforces it before the OOM killer acts globally. Safer than relying on OOM to clean up.' },
      ],
    },
    causes: [
      { trigger: 'Config syntax error',       fix: 'nginx -t reveals the exact line — fix and reload' },
      { trigger: 'Port already bound',         fix: 'find and stop the conflicting process' },
      { trigger: 'Wrong file ownership',       fix: 'chown nginx:nginx /var/log/nginx' },
      { trigger: 'SELinux denying bind/read',  fix: 'restorecon or setsebool — audit2why tells you which' },
      { trigger: 'Disk full',                  fix: 'can\'t write pid file or logs — see Disk Full' },
      { trigger: 'OOM killed on startup',      fix: 'see OOM Killer scenario' },
    ],
    prevention: [
      'systemd unit: Restart=on-failure with a RestartSec delay',
      'Config syntax test in CI/CD pipeline before deployment',
      'CloudWatch alarm on service state via custom metric or log pattern',
    ],
    probes: [
      { q: 'First command when a service fails?', a: 'systemctl status — gives exit code, last log lines, and timestamps all in one shot' },
      { q: 'How do you test a config change without restarting the service?', a: 'nginx -t first to validate, then systemctl reload (sends SIGHUP — workers drain gracefully, no downtime)' },
      { q: 'Difference between restart and reload?', a: 'restart = stop + start (brief downtime for new connections) | reload = SIGHUP, workers finish existing connections then reload config' },
    ],
  },

  {
    id: 'high-cpu',
    title: 'High CPU',
    symptom: 'CloudWatch CPU alarm / system sluggish / load average elevated',
    firstQuestion: 'is load > number of cores? One process or system-wide?',
    steps: [
      {
        n: 1,
        label: 'Load average vs core count',
        runFrom: 'the instance',
        lines: [
          { cmd: 'uptime' },
          { out: 'load average: 7.82, 6.91, 5.43', status: 'fail' },
          { note: 'load average = processes wanting CPU right now (1m, 5m, 15m avg). 2-core instance: > 2.0 = queue building' },
          { cmd: 'nproc' },
          { out: '2', status: 'info', meaning: '7.82 / 2 = 3.9× saturation — severely overloaded' },
        ],
      },
      {
        n: 2,
        label: 'Who is consuming CPU?',
        lines: [
          { cmd: 'ps aux --sort=-%cpu | head -10' },
          { note: '--sort=-%cpu = sort by CPU descending' },
          { out: 'app   1234   198%   java -jar app.jar',  status: 'fail', meaning: '198% = consuming both cores fully' },
          { out: 'root  5678    45%   find / -name "*.log"', status: 'fail', meaning: 'runaway filesystem scan' },
        ],
      },
      {
        n: 3,
        label: 'What is that process actually doing?',
        lines: [
          { cmd: 'strace -p 1234 -c' },
          { note: '-p = attach to running PID, -c = count mode — summarise syscalls after Ctrl-C, don\'t print each one' },
          { out: '89.1%   futex',     status: 'fail', meaning: 'thread contention / locking — threads blocking each other' },
          { out: '10.2%   epoll_wait', status: 'ok',  meaning: 'waiting for IO events — normal for a server' },
        ],
      },
      {
        n: 4,
        label: 'Is it a scheduled job?',
        lines: [
          { cmd: 'crontab -l' },
          { cmd: 'cat /etc/cron.d/*' },
          { note: 'compare job schedule against when the spike started' },
        ],
      },
      {
        n: 5,
        label: 'Buy time while investigating, then kill if needed',
        lines: [
          { cmd: 'renice -n 19 -p 1234' },
          { note: 'lower scheduling priority (range: -20 highest → 19 lowest) — buys breathing room without killing' },
          { cmd: 'kill -15 1234' },
          { note: 'SIGTERM — ask process to stop gracefully (can be caught and ignored by the process)' },
          { cmd: 'kill -9 1234' },
          { note: 'SIGKILL — kernel forces termination, unblockable, no cleanup — last resort' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'What\'s the difference between 1-minute and 15-minute load averages, and when does the gap matter?', a: '1m = right now. 15m = sustained trend. High 1m with declining 15m = spike passing. High across all three = sustained saturation. They only converge after 15+ minutes of stable load.' },
        { q: 'How can load average be high while CPU% looks normal?', a: 'Load includes processes blocked on IO — disk reads, network waits — not just CPU work. High load with low CPU% = IO bottleneck. Confirm with iostat or iotop.' },
      ],
      2: [
        { q: 'What does 198% CPU in ps output mean on a 2-core instance?', a: 'Process is using nearly both cores simultaneously — ps reports per-process across all cores, so 100% = 1 full core. 200% would be full saturation of both.' },
        { q: 'What\'s the risk of relying on ps for CPU diagnosis?', a: 'ps is a point-in-time snapshot — misses short bursts. top or htop refresh continuously. For averages over time, CloudWatch or pidstat -u 1 gives a cleaner picture.' },
      ],
      3: [
        { q: 'What does futex at 89% of syscall time tell you about a Java process?', a: 'Threads are blocking on mutexes — severe lock contention or a deadlock. The process burns CPU waiting, not doing useful work. Usually points to a thread pool issue or a synchronized block under high concurrency.' },
        { q: 'What\'s the overhead risk of attaching strace to a production process?', a: 'strace intercepts every syscall — can slow the process 10-100× in verbose mode. Use -c (count mode) which summarises rather than printing each call. Still adds overhead; brief attachment only.' },
      ],
      4: [
        { q: 'How do you prevent a cron job from running away and saturating CPU?', a: 'Wrap with timeout: timeout 300 /path/to/script.sh. Sends SIGTERM after 5 minutes. Add -k 310 to send SIGKILL 10s later if the process ignores SIGTERM.' },
        { q: 'Where else should you check for scheduled work beyond crontab -l?', a: '/etc/cron.d/, /etc/cron.daily/, /etc/cron.hourly/, and systemd timers (systemctl list-timers). Many packages install crons in /etc/cron.d/ independently of user crontabs.' },
      ],
      5: [
        { q: 'When would SIGTERM fail and require SIGKILL?', a: 'Process explicitly catches SIGTERM and ignores it, process is in uninterruptible D state (blocked on IO — often NFS or kernel bug), or process is in a deadlock. SIGKILL is unblockable — kernel enforces it.' },
        { q: 'What does renice do and when is it preferable to killing the process?', a: 'Lowers scheduling priority (range -20 to 19, default 0) — process still runs but gets fewer CPU cycles. Use it when you need to investigate before terminating, or when the process is doing work you don\'t want to lose abruptly.' },
      ],
    },
    causes: [
      { trigger: 'Thread deadlock / infinite loop', fix: 'restart + investigate app code' },
      { trigger: 'Traffic spike',                   fix: 'expected CPU increase → ASG should scale out' },
      { trigger: 'Unbounded cron job',              fix: 'add timeout wrapper: timeout 300 /path/to/script.sh' },
      { trigger: 'Filesystem scan',                 fix: 'backup/security job — schedule off-peak' },
      { trigger: 'DEBUG logging in prod',           fix: 'floods CPU and disk simultaneously' },
    ],
    prevention: [
      'CloudWatch alarm: CPU > 80% sustained 5 min → SNS',
      'ASG CPU-based scaling policy',
      'Cron jobs wrapped with timeout 300 to bound runaway scripts',
    ],
    probes: [
      { q: 'Difference between load average and CPU percentage?', a: 'CPU% = instantaneous utilisation | load average = queue depth over time. High load with low CPU% = processes waiting on IO, not compute.' },
      { q: 'Why SIGTERM before SIGKILL?', a: 'SIGTERM lets the process close connections, flush buffers, clean up. SIGKILL gives no chance — can leave sockets open, corrupt state.' },
      { q: 'What does futex in strace output tell you?', a: 'threads are blocking on a mutex — contention, possible deadlock. Not a syscall you want at 89% of CPU time.' },
    ],
  },

  {
    id: 'oom',
    title: 'Memory Exhaustion / OOM Killer',
    symptom: 'process disappeared silently / service dead / system very slow',
    firstQuestion: 'killed by the kernel (OOM) or did it crash itself?',
    steps: [
      {
        n: 1,
        label: 'Is the service just silently dead?',
        runFrom: 'the instance',
        lines: [
          { cmd: 'systemctl status app' },
          { out: 'Active: inactive (dead)', status: 'fail', meaning: 'no error in systemctl — kernel killed it, not the app' },
        ],
      },
      {
        n: 2,
        label: 'OOM killer evidence in kernel logs',
        lines: [
          { cmd: 'dmesg | grep -i \'killed process\'' },
          { out: 'Out of memory: Kill process 1234 (java) score 892', status: 'fail' },
          { out: 'Killed process 1234 total-vm:4096000kB, anon-rss:3500000kB', status: 'fail', meaning: 'anon-rss = actual RAM the process was using' },
          { cmd: 'journalctl -k | grep -i oom' },
          { note: '-k = kernel messages only — equivalent to dmesg but via journalctl' },
        ],
      },
      {
        n: 3,
        label: 'Current memory state',
        lines: [
          { cmd: 'free -h' },
          { note: '\'available\' is what matters — includes reclaimable cache. \'free\' alone is misleading on Linux.' },
          { out: 'Swap: 0B   0B   0B', status: 'fail', meaning: 'no swap — kernel has no buffer before it starts killing' },
        ],
      },
      {
        n: 4,
        label: 'Who is using memory? Is it a leak?',
        lines: [
          { cmd: 'ps aux --sort=-%mem | head -10' },
          { cmd: 'watch -n 5 \'ps aux --sort=-%mem | head -5\'' },
          { note: 'if RSS grows steadily without a traffic increase → memory leak in the application' },
        ],
      },
      {
        n: 5,
        label: 'Immediate fix + add swap as a buffer',
        lines: [
          { cmd: 'systemctl start app' },
          { note: 'restart the killed service first, then investigate root cause' },
          { cmd: 'dd if=/dev/zero of=/swapfile bs=1M count=2048' },
          { note: 'creates 2GB swap file — buys time, not a permanent fix' },
          { cmd: 'chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'How do you distinguish an OOM kill from an app crash in systemctl output?', a: 'OOM: systemctl shows inactive (dead) with no exit code set — kernel sent SIGKILL, no cleanup. App crash: shows failed (Result: exit-code or signal) with journalctl showing the error output.' },
        { q: 'Why does systemctl show no error when the kernel kills a process?', a: 'SIGKILL gives the process no opportunity to run exit handlers or log anything. systemd sees the process disappear without an exit code — it marks it dead, not failed.' },
      ],
      2: [
        { q: 'What does the OOM score in dmesg represent?', a: 'Roughly: (process memory / total RAM) × 1000, adjusted for niceness and process age. Score 892 = process was using ~89% of RAM. Higher score = chosen first. /proc/<pid>/oom_score shows it live.' },
        { q: 'What\'s anon-rss vs total-vm in the OOM kill message?', a: 'total-vm = virtual address space (includes shared libs, mapped files, not all physical). anon-rss = actual anonymous physical RAM the process owned. anon-rss is the real number.' },
      ],
      3: [
        { q: 'What\'s the difference between free and available in free -h output?', a: 'free = genuinely unused RAM. available = free + reclaimable page cache. Linux fills spare RAM with disk cache — free looks tiny but available is the real headroom for new allocations.' },
        { q: 'Why is no swap particularly dangerous on EC2?', a: 'At RAM exhaustion, kernel starts killing immediately with no buffer. With swap, it pages out cold memory first — buys minutes to identify the cause without losing a service.' },
      ],
      4: [
        { q: 'How do you distinguish a memory leak from high but stable usage?', a: 'watch ps aux — RSS growing steadily over 10+ minutes without a traffic increase = leak. Stable high RSS = undersized instance. A leak trends upward until OOM; stable usage sits at a plateau.' },
        { q: 'What\'s -Xmx in JVM and when is it critical to set it?', a: 'Sets maximum heap size. Without it JVM can claim 25%+ of physical RAM dynamically. On a constrained instance, set it explicitly below your OOM threshold to give the kernel predictable limits.' },
      ],
      5: [
        { q: 'Why is adding swap a temporary fix rather than a solution?', a: 'Swap is orders of magnitude slower than RAM. Heavy swap use = severe performance degradation. It buys time to find the real cause (leak, undersized instance) but isn\'t a sustainable operating state.' },
        { q: 'How would you protect a critical process from being chosen by the OOM killer?', a: 'echo -1000 > /proc/<pid>/oom_score_adj — effectively immunises it. In systemd: OOMScoreAdjust=-1000 in the [Service] section. The kernel then targets other processes first.' },
      ],
    },
    causes: [
      { trigger: 'Memory leak',             fix: 'heap grows unbounded → OOM kills the process' },
      { trigger: 'Undersized instance',     fix: 'workload needs more RAM than the instance has' },
      { trigger: 'No swap',                 fix: 'no buffer — kernel kills immediately at exhaustion' },
      { trigger: 'JVM heap unbounded',      fix: 'set -Xmx to cap heap (e.g. -Xmx2g)' },
      { trigger: 'Competing services',      fix: 'separate services onto different instances, or resize' },
    ],
    prevention: [
      'CloudWatch memory alarm — requires CloudWatch agent (not installed by default on EC2)',
      'systemd unit: MemoryMax=2G — kernel enforces limit before OOM kills',
      'Swap on EC2 as safety net (1–2× RAM recommended)',
      'Alarm on "Out of memory" string in CloudWatch Logs',
    ],
    probes: [
      { q: 'How do you distinguish OOM kill from an app crash?', a: 'OOM: dmesg shows \'Kill process\', systemctl shows \'inactive (dead)\' not \'failed\'. App crash: journalctl shows error output, systemctl shows \'failed (exit-code)\'.' },
      { q: 'Why is the \'free\' column misleading on Linux?', a: 'Linux aggressively uses spare RAM as disk cache — \'free\' looks tiny but that cache is reclaimable. The \'available\' column is the real number.' },
      { q: 'Why add swap if there\'s no disk pressure?', a: 'Swap lets the kernel page out cold memory to disk instead of killing processes — buys time to identify and fix the real cause.' },
    ],
  },

  {
    id: 'alb-unhealthy',
    title: 'ALB Targets Unhealthy',
    symptom: '502 / 503 errors / ALB console shows targets unhealthy',
    firstQuestion: 'all targets or some? Just after a deployment?',
    steps: [
      {
        n: 1,
        label: 'Test the health check from the instance',
        runFrom: 'the EC2 instance — simulates exactly what ALB sends',
        lines: [
          { cmd: 'curl -sf http://localhost:8080/health' },
          { note: '-s = silent, -f = fail with non-zero exit on 4xx/5xx' },
          { out: 'curl: (7) Failed to connect', status: 'fail', meaning: 'app not running, or not on this port' },
          { out: '{"status":"degraded"}',       status: 'fail', meaning: 'app up but returning non-200 → ALB marks unhealthy' },
        ],
      },
      {
        n: 2,
        label: 'Confirm the app is on the right port',
        lines: [
          { cmd: 'ss -tlnp | grep 8080' },
          { out: '(nothing)', status: 'fail', meaning: 'app is on 8081 but target group expects 8080' },
        ],
      },
      {
        n: 3,
        label: 'Check the response code explicitly',
        lines: [
          { cmd: 'curl -s -o /dev/null -w \'%{http_code}\' http://localhost:8080/health' },
          { note: '-o /dev/null = discard body, -w \'%{http_code}\' = print only the status code' },
          { out: '302', status: 'fail', meaning: 'redirect — ALB expects 200 by default, treats 302 as unhealthy' },
          { out: '200', status: 'ok',   meaning: 'app healthy — look elsewhere (SG, port mismatch)' },
        ],
      },
      {
        n: 4,
        label: 'Security group — does the instance allow ALB inbound?',
        lines: [
          { note: 'Instance SG must allow inbound from the ALB SG on the app port' },
          { note: 'Common mistake: instance SG allows :80 from everywhere, but app runs on :8080' },
          { note: 'Fix: inbound rule — source = ALB security group ID, port = app port' },
        ],
      },
      {
        n: 5,
        label: 'Do health check requests appear in app logs?',
        lines: [
          { cmd: 'tail -f /var/log/app/access.log' },
          { out: '(no health check entries)', status: 'fail', meaning: 'traffic not reaching instance — SG or port mismatch' },
          { out: 'GET /health 500',           status: 'fail', meaning: 'traffic arrives, but app-level error' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'Why test the health check from the instance rather than from your machine?', a: 'Simulates exactly what ALB sends — same network path, same localhost port. Rules out SG issues between ALB and instance that would show as a different error from outside.' },
        { q: 'What should a health check endpoint specifically not check?', a: 'Downstream dependencies like databases. If DB is slow, health check returns 5xx, ALB marks instance unhealthy, kicks off a cascade. Health check should only verify the process itself is alive and responding.' },
      ],
      2: [
        { q: 'What algorithm does ALB use by default for routing, and when would you change it?', a: 'Round-robin. Least outstanding requests (LOR) is better for endpoints with variable processing time — prevents slow requests from blocking one target while others sit idle.' },
        { q: 'What\'s connection draining and when would you tune the delay?', a: 'Deregistration delay — time ALB waits for in-flight requests to finish before fully removing a target. Default 300s. Tune down to 30s for stateless APIs, keep high for long-running uploads or WebSocket connections.' },
      ],
      3: [
        { q: 'What HTTP codes does ALB accept as healthy by default?', a: '200 only. You can configure a range (200-299, or 200,301,302) in target group health check settings. A 302 marks the target unhealthy unless explicitly included in the success range.' },
        { q: 'Why would a /health endpoint return 302 in the first place?', a: 'HTTP-to-HTTPS redirect middleware running on all routes including /health. ALB doesn\'t follow redirects for health checks. Fix: exclude /health from redirect middleware, or configure ALB to allow 302 as success.' },
      ],
      4: [
        { q: 'Why scope the instance SG inbound rule to the ALB SG rather than 0.0.0.0/0?', a: 'ALB SG as source = only the ALB can reach that port, not arbitrary internet traffic. 0.0.0.0/0 opens the app port publicly — bypasses the ALB entirely for direct access.' },
        { q: 'What happens if the instance SG allows port 80 but the app runs on 8080?', a: 'Health check packets on 8080 are dropped by the SG — targets marked unhealthy. App on 8080 is functionally unreachable from ALB. Mismatch between SG rule port and app listen port.' },
      ],
      5: [
        { q: 'If health check GETs don\'t appear in the access log, what does that definitively rule out?', a: 'Application-level issues — the request never reaches the app. Points to SG blocking, wrong port, or app not running. The problem is in the network path between ALB and instance.' },
        { q: 'What does ALB return to clients when all targets are unhealthy?', a: '502 Bad Gateway — ALB has no healthy target to forward to. If some targets are healthy, it routes to those and returns 503 to requests that would have gone to the unhealthy ones.' },
      ],
    },
    causes: [
      { trigger: 'App not running',              fix: 'restart — see Service Won\'t Start' },
      { trigger: 'Health check returns non-200', fix: 'fix the handler or update ALB success code range' },
      { trigger: 'Port mismatch',                fix: 'app on wrong port or target group configured wrong' },
      { trigger: 'SG doesn\'t allow ALB',        fix: 'inbound rule: source = ALB SG, port = app port' },
      { trigger: 'Grace period too short',        fix: 'new instances marked unhealthy before app is ready — extend to 60s+ for JVM' },
    ],
    prevention: [
      '/health: dedicated endpoint — always 200, no auth, no DB dependency',
      'Health check grace period: 60s minimum for JVM, 30s for most others',
      'SG inbound: scope to ALB security group ID, not 0.0.0.0/0',
      'Alarm: UnhealthyHostCount > 0 → SNS',
    ],
    probes: [
      { q: 'Why scope the health check SG rule to the ALB SG specifically?', a: 'ALB SG as source = only the ALB can send health checks, not arbitrary internet traffic. 0.0.0.0/0 opens that port to everyone.' },
      { q: 'What should a health check endpoint actually check?', a: 'At minimum: process is up and can respond. NOT DB connectivity — health checks should be fast and not cascade failures upstream.' },
      { q: 'What happens when all targets are unhealthy?', a: 'ALB returns 502 to clients — it has no healthy target to forward to. New connections are rejected.' },
    ],
  },

  {
    id: 'cant-ssh',
    title: "Can't SSH to EC2",
    symptom: 'SSH times out or immediately refuses',
    firstQuestion: 'did this ever work? If yes — what changed?',
    steps: [
      {
        n: 1,
        label: 'Verbose SSH — where does the connection die?',
        lines: [
          { cmd: 'ssh -vvv ec2-user@<ip>' },
          { note: '-vvv = maximum verbosity — shows every step of the handshake' },
          { out: 'Connecting to <ip> port 22 ... (hangs)',                 status: 'fail', meaning: 'never reaches host — SG or NACL blocking' },
          { out: 'Connection established. Permission denied (publickey)',   status: 'fail', meaning: 'reaches host, but auth fails' },
        ],
      },
      {
        n: 2,
        label: 'SG — does it allow port 22 from your IP?',
        lines: [
          { note: 'Check inbound rules on the instance security group' },
          { note: 'If your IP changed (common with home internet) — update the rule' },
        ],
      },
      {
        n: 3,
        label: 'NACL — stateless, needs both directions explicitly',
        lines: [
          { note: 'SGs are stateful (return traffic is automatic). NACLs are not.' },
          { note: 'Inbound: TCP port 22 from your CIDR' },
          { note: 'Outbound: TCP port 1024–65535 (ephemeral — the client\'s return port)' },
          { note: 'Missing outbound ephemeral = SSH -vvv shows "Connection established" but then hangs' },
        ],
      },
      {
        n: 4,
        label: 'Correct key and username?',
        lines: [
          { cmd: 'ssh -i ~/.ssh/correct-key.pem ec2-user@<ip>' },
          { note: 'Username by distro:  Amazon Linux / RHEL → ec2-user  |  Ubuntu → ubuntu  |  CentOS → centos' },
        ],
      },
      {
        n: 5,
        label: '~/.ssh permissions — sshd is strict',
        lines: [
          { cmd: 'stat -c \'%a %U %G\' ~/.ssh ~/.ssh/authorized_keys' },
          { note: '~/.ssh must be 700 (owner only) | authorized_keys must be 600' },
          { note: 'if root owns these after a sudo op — sshd refuses to use them' },
        ],
      },
      {
        n: 6,
        label: 'SSM — the fallback when port 22 is blocked',
        lines: [
          { cmd: 'aws ssm start-session --target i-1234567890abcdef0' },
          { note: 'Requirements: SSM agent running + IAM role with AmazonSSMManagedInstanceCore + outbound 443' },
          { note: 'No port 22, no key pair — access controlled entirely via IAM' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'What does connection hangs vs immediate refusal tell you at the network level?', a: 'Hangs = packet never arrives at the host — dropped by SG, NACL, or routing black hole. Immediate refuse = packet reaches the host but sshd isn\'t listening on port 22 (not running, different port).' },
        { q: 'How much does -vvv add over -v for SSH debugging?', a: '-v = main connection steps and key negotiation. -vvv adds cipher selection and packet-level debug. Usually -v is sufficient to see exactly where the handshake fails.' },
      ],
      2: [
        { q: 'What\'s the minimum SG rule required for SSH access?', a: 'Inbound TCP port 22 from your source IP (/32). In production: scope to a bastion SG or known VPN CIDR. Never 0.0.0.0/0 — that exposes port 22 to the internet.' },
        { q: 'How do you update a SG rule from the CLI when you\'re locked out of the console?', a: 'aws ec2 authorize-security-group-ingress --group-id sg-xxx --protocol tcp --port 22 --cidr <your-ip>/32. Or use SSM if the role is already attached — doesn\'t need port 22.' },
      ],
      3: [
        { q: 'Why do NACLs require explicit outbound ephemeral ports for SSH to work?', a: 'NACLs are stateless — unlike SGs, they don\'t auto-allow return traffic. SSH client picks a random ephemeral port for the response. Without outbound 1024-65535, the response is dropped at the subnet boundary.' },
        { q: 'What\'s the symptom when NACL is missing the outbound ephemeral rule specifically?', a: 'SSH -vvv shows "Connection established" — the SG lets the inbound SYN through — but then hangs. The NACL drops the response before it leaves the subnet. Looks identical to a firewall timeout.' },
      ],
      4: [
        { q: 'What\'s the default SSH username for each major EC2 distro?', a: 'Amazon Linux / RHEL / CentOS: ec2-user. Ubuntu: ubuntu. Debian: admin. SUSE: ec2-user. If unsure, check /var/log/cloud-init-output.log — it logs the configured default user.' },
        { q: 'How do you avoid specifying -i and the username every time for a host?', a: '~/.ssh/config — Host block with IdentityFile pointing to the key and User set to ec2-user. ssh host.example.com then uses both automatically.' },
      ],
      5: [
        { q: 'What exact permissions does sshd require on ~/.ssh and authorized_keys?', a: '~/.ssh = 700 (owner read-write-execute only). authorized_keys = 600 (owner read-write). sshd refuses to authenticate if either is too permissive — a deliberate security check, not an error.' },
        { q: 'How would you fix permissions on authorized_keys if SSH is already locked?', a: 'EC2 Instance Connect (if enabled) or SSM Session Manager — neither requires port 22. Then chmod 600 ~/.ssh/authorized_keys and chown ec2-user:ec2-user if root took ownership.' },
      ],
      6: [
        { q: 'What are the three requirements for SSM Session Manager to work?', a: 'SSM agent running on the instance + IAM role with AmazonSSMManagedInstanceCore attached + outbound HTTPS (443) to SSM endpoints. No port 22, no key pair needed.' },
        { q: 'Why is SSM the preferred production access method over SSH?', a: 'Session fully logged to CloudTrail and optionally S3/CloudWatch Logs. Access controlled via IAM policies instead of key files. No exposed port 22. Works in private subnets without a bastion.' },
      ],
    },
    causes: [
      { trigger: 'SG not allowing port 22',    fix: 'add inbound rule (or move to SSM permanently)' },
      { trigger: 'NACL missing ephemeral out', fix: 'add outbound TCP 1024–65535' },
      { trigger: 'Wrong key',                  fix: '-i flag with the correct key file' },
      { trigger: 'Wrong username',             fix: 'match to distro (ec2-user, ubuntu, centos)' },
      { trigger: '~/.ssh permissions wrong',   fix: '700 on ~/.ssh, 600 on authorized_keys, owned by ec2-user' },
      { trigger: 'Private subnet, no bastion', fix: 'SSM Session Manager is the correct path here' },
    ],
    prevention: [
      'Use SSM Session Manager — no exposed port 22, sessions logged to CloudTrail, IAM-controlled',
      'Attach SSM IAM role at launch — it\'s your recovery path if SG gets misconfigured',
      'If SSH required: restrict SG to bastion SG or known CIDR, never 0.0.0.0/0',
    ],
    probes: [
      { q: 'Difference between an SG and a NACL?', a: 'SG = stateful, instance-level, allow-only rules. NACL = stateless, subnet-level, allow and deny rules, both directions must be explicit.' },
      { q: 'Why might SSH connect but immediately drop after "Connection established"?', a: 'NACL missing outbound ephemeral ports — SG passes the inbound, NACL drops the response before it leaves the subnet.' },
      { q: 'Why is SSM better than SSH for production access?', a: 'No exposed port 22, session fully logged to CloudTrail, access controlled via IAM policies instead of key management.' },
    ],
  },

  {
    id: 'latency-spike',
    title: 'Performance Degradation / Latency Spike',
    symptom: 'TargetResponseTime alarm / users reporting slowness',
    firstQuestion: 'all endpoints or one? Started with a deployment or gradually?',
    steps: [
      {
        n: 1,
        label: 'Identify which layer is slow',
        lines: [
          { note: 'ALB TargetResponseTime = time from ALB forwarding request to receiving a response from the instance' },
          { note: 'If this metric is high → the problem is in the app or DB, not the network or ALB itself' },
        ],
      },
      {
        n: 2,
        label: 'Isolate the slow endpoint',
        runFrom: 'the instance — removes ALB and network from the equation',
        lines: [
          { cmd: 'curl -s -o /dev/null -w \'%{time_total}\' http://localhost:8080/health' },
          { out: '0.012', status: 'ok',   meaning: 'fast — app process alive and responding' },
          { cmd: 'curl -s -o /dev/null -w \'%{time_total}\' http://localhost:8080/api/orders' },
          { note: '%{time_total} = total time from request sent to response received, in seconds' },
          { out: '8.432', status: 'fail', meaning: 'this endpoint is slow — likely DB or downstream dependency' },
        ],
      },
      {
        n: 3,
        label: 'App instance resources',
        lines: [
          { cmd: 'ps aux --sort=-%cpu | head -5' },
          { cmd: 'free -h' },
          { cmd: 'ss -s' },
          { note: 'socket summary — connection counts by state' },
          { out: 'TCP: 1024 (estab 1020 ...)', status: 'fail', meaning: 'connection exhaustion — app can\'t open new connections to DB or upstream' },
        ],
      },
      {
        n: 4,
        label: 'DB layer — CloudWatch RDS metrics',
        lines: [
          { note: 'DatabaseConnections — climbing toward max_connections?' },
          { note: 'CPUUtilization — DB CPU spiking?' },
          { note: 'ReadLatency — queries taking longer than usual?' },
          { note: 'db.t3.medium ≈ 170 max connections — easy to exhaust under moderate load' },
        ],
      },
      {
        n: 5,
        label: 'Cache miss spike',
        lines: [
          { note: 'ElastiCache CacheHitRate dropping → requests bypassing cache and hitting DB directly' },
          { note: 'Causes: cold start after deployment, TTL too short, cache invalidation bug' },
        ],
      },
      {
        n: 6,
        label: 'Bad deployment',
        lines: [
          { note: 'Did latency start precisely with a specific deploy?' },
          { note: 'Rollback → confirm latency recovers → diff the change and investigate the slow path' },
        ],
      },
    ],
    stepProbes: {
      1: [
        { q: 'What does ALB TargetResponseTime specifically measure?', a: 'Time from when ALB forwards the request to the target until it receives the last byte of the response. High TRT = problem in the app or DB, not in network or ALB overhead.' },
        { q: 'What\'s the difference between TargetResponseTime and total client-perceived latency?', a: 'TRT excludes ALB processing, connection setup, and TLS handshake. Total client latency includes all of those. TRT isolates just the backend — if TRT is normal but clients report slowness, look at the ALB or CDN layer.' },
      ],
      2: [
        { q: 'Why test from the instance rather than from your machine or a monitoring tool?', a: 'Removes ALB, SG, network hops, and TLS from the equation. If curl localhost is also slow, the problem is definitively in the app or its dependencies. If it\'s fast, the network path is suspect.' },
        { q: 'What\'s the difference between %{time_total} and %{time_starttransfer} in curl?', a: '%{time_total} = full round trip including data transfer. %{time_starttransfer} = time to first byte (TTFB) — excludes download time. TTFB isolates server processing from data transfer latency.' },
      ],
      3: [
        { q: 'What does a large number of CLOSE_WAIT connections in ss -s indicate?', a: 'App isn\'t closing its end of connections — usually a connection pool misconfiguration or code bug. Connections accumulate, eventually exhausting file descriptor limits and causing new connections to fail.' },
        { q: 'What does ss -s tell you that netstat doesn\'t?', a: 'Socket summary by state (ESTABLISHED, TIME_WAIT, CLOSE_WAIT) without needing elevated privileges on newer kernels. Faster and more reliable than netstat which is deprecated on modern Linux.' },
      ],
      4: [
        { q: 'What\'s max_connections on RDS db.t3.medium and why does it matter?', a: 'Approximately 170. Each app instance holds a connection pool — with multiple instances you can hit this quickly. RDS Proxy pools connections between app and RDS, preventing exhaustion under load.' },
        { q: 'How do you find slow queries without query profiling already enabled?', a: 'Enable slow query log in RDS parameter group (log_slow_queries, long_query_time). Or check Performance Insights if enabled — shows top SQL by load in real time without config changes.' },
      ],
      5: [
        { q: 'What causes a cache miss spike specifically after a deployment?', a: 'New deployment restarts app processes — in-process cache cleared. If using ElastiCache with changed cache key format, all existing entries miss. All requests fall through to DB until cache warms.' },
        { q: 'How would you programmatically warm a cache after deployment?', a: 'Pre-warming script that populates common keys before switching traffic. Or use blue/green deployment — new environment warms under test traffic before cutover, so cache is partially populated.' },
      ],
      6: [
        { q: 'What\'s the fastest rollback path for an ECS or Lambda deployment?', a: 'ECS: update service to the previous task definition revision — near-instant traffic shift. Lambda: update alias to point to the previous version. Both avoid redeployment entirely.' },
        { q: 'How do you identify which specific change introduced the slow path?', a: 'Correlate CloudWatch TargetResponseTime spike timestamp against CodePipeline execution history to isolate the deploy. Then git diff between that and the previous version to identify the changed code path.' },
      ],
    },
    causes: [
      { trigger: 'DB connection exhaustion', fix: 'RDS Proxy pools and reuses connections — prevents this' },
      { trigger: 'Slow query',              fix: 'slow query log + EXPLAIN + add index' },
      { trigger: 'Traffic spike',           fix: 'ASG should scale — check scaling policy and cooldown' },
      { trigger: 'Cache miss',              fix: 'cold start or invalidation bug — warm the cache' },
      { trigger: 'Memory pressure / GC',   fix: 'JVM GC pauses — instance needs more RAM or heap tuning' },
      { trigger: 'Bad deployment',          fix: 'new code path is slower → rollback, then investigate' },
    ],
    prevention: [
      'RDS Proxy — connection pooling, prevents exhaustion under load',
      'ElastiCache — cache repeated reads, keeps DB load flat',
      'ASG scaling policy on TargetResponseTime or RequestCountPerTarget',
      'CloudWatch alarm: TargetResponseTime p99 > 2s → SNS',
      'Slow query log enabled on RDS from day one',
    ],
    probes: [
      { q: 'How do you tell if the problem is the app or the DB?', a: 'Test a fast endpoint vs a DB-heavy one from the instance. If only DB endpoints are slow, it\'s the DB. Confirm with RDS CloudWatch: DatabaseConnections + ReadLatency.' },
      { q: 'What is RDS Proxy and why does it matter under load?', a: 'Sits in front of RDS and pools connections. App opens connections to Proxy; Proxy manages a smaller pool to RDS. Prevents connection exhaustion when traffic spikes.' },
      { q: 'What\'s connection exhaustion and how do you spot it?', a: 'App tries to open new DB connections but RDS is at max_connections — requests queue. ss -s shows connections near the limit. RDS CloudWatch: DatabaseConnections at max.' },
    ],
  },
]
