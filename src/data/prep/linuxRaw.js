export const linuxRaw = [
  {
    heading: 'IS THIS PROCESS RUNNING / WHY DID IT DIE',
    code: String.raw`systemctl status nginx
# Active line tells you state + how long
# Main PID, exit code, last log lines — all in one shot

journalctl -u nginx -n 50 --no-pager
# Last 50 lines for this unit — start here before anything else

journalctl -u nginx -p err --no-pager
# Errors and above only — cuts through INFO noise

journalctl -b -1 -u nginx --no-pager
# Previous boot — for crash/reboot investigation

# Exit codes that matter
# exit 1   → app error — logs have the reason
# exit 137 → SIGKILL — OOM killer or manual kill
# exit 139 → segfault — application memory issue

systemctl list-units --failed
# All failed units at a glance

pgrep -la nginx
# Quick PID check without parsing ps output`,
  },

  {
    heading: 'WHAT IS IT LOGGING / FIND THE ERROR',
    code: String.raw`journalctl -u nginx -f
# Follow live — use during active troubleshooting

grep -i 'error\|warn\|fail' /var/log/app.log | tail -20
# Case-insensitive, multiple patterns, most recent last

grep -C 3 'ERROR' /var/log/app.log
# 3 lines of context either side — see what led to the error

grep -v 'DEBUG\|INFO' /var/log/app.log | tail -30
# Strip noise, show what's left

# Compressed/rotated logs
zgrep 'ERROR' /var/log/app.log.*.gz
# grep directly inside .gz — don't decompress first

# Count errors by type
grep -oE '^(ERROR|WARN|CRIT)' /var/log/app.log \
  | sort | uniq -c | sort -rn
# ERROR 312 / WARN 87 / CRIT 4`,
  },

  {
    heading: 'IS ANYTHING LISTENING / WHAT\'S CONNECTED',
    code: String.raw`ss -tlnp
# TCP listening sockets with process names
# Local Address:Port tells you what interface — 127.0.0.1 = localhost only, 0.0.0.0 = all

ss -tlnp | grep :8080
# Is something on this port? Which process?

ss -tp | grep ESTABLISHED | wc -l
# Count live connections

ss -tp | grep ESTABLISHED | grep 5432 | wc -l
# Live DB connections specifically — compare against max_connections

watch -n 2 'ss -tp | grep ESTABLISHED | grep 5432 | wc -l'
# Watch connection count live — spot exhaustion building

lsof -p 1234
# All files and sockets open by a specific PID
# Useful for "too many open files" — compare count against ulimit -n`,
  },

  {
    heading: 'WHY IS DISK FULL / WHAT\'S CONSUMING IT',
    code: String.raw`df -h
# Space usage by filesystem — start here
# 100% on / is the problem, not /boot or tmpfs

df -ih
# Inode usage — "no space left on device" with free blocks = inode exhaustion
# Fix: find and remove millions of small files (/tmp, sessions, mail queues)

du -sh /var/log/* | sort -rh | head -10
# What's consuming space — logs are almost always the culprit

# Deleted file still held open — space not freed until process closes fd
lsof | grep deleted | awk '{print $2, $7, $9}' | sort -k2 -rn | head -5
# PID, size, filename — find who's holding it

truncate -s 0 /var/log/app/access.log
# Zero the file in place — fd stays valid, process keeps running, space freed immediately
# Safer than rm while process is running

journalctl --disk-usage
journalctl --vacuum-size=500M
# systemd journal often grows unnoticed — check and trim it

# EBS volume expanded in console — resize the filesystem to match
sudo growpart /dev/xvda 1
sudo xfs_growfs /          # Amazon Linux (xfs)
sudo resize2fs /dev/xvda1  # Ubuntu/Debian (ext4)`,
  },

  {
    heading: 'PERMISSIONS / WHO OWNS WHAT',
    code: String.raw`ls -la /etc/app/
# Permissions, owner, group — natural first move

stat /etc/app/config.yaml
# Full metadata: octal permissions, owner, timestamps

chmod 644 config.yaml           # rw-r--r--  standard file
chmod 755 /usr/local/bin/script  # rwxr-xr-x  standard binary
chmod 600 ~/.ssh/authorized_keys  # sshd rejects anything wider
chown nginx:nginx /var/www/html
chown -R ec2-user:ec2-user /app   # after a root deploy

# SSH permissions — sshd is strict, silently refuses if wrong
# ~/.ssh           must be 700
# authorized_keys  must be 600
# Both must be owned by the connecting user, not root

# SELinux — when permissions look right but it still fails
getenforce                             # Enforcing / Permissive?
ausearch -m avc -ts recent | audit2why
# Plain English: what was denied and the exact fix command
restorecon -Rv /etc/app/              # reset file context to what policy expects
setenforce 0                          # temporarily permissive — confirm SELinux is the cause`,
  },

  {
    heading: 'NETWORK REACHABLE / DNS RESOLVING',
    code: String.raw`# DNS first — rules it out in seconds
dig +short api.example.com
dig @169.254.169.253 +short api.example.com   # VPC resolver — what instances see
# Empty = DNS failure. IP = resolves, move to connectivity.

# Connectivity
curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/health
# Status code only — clean for scripting

nc -zvw2 db.internal 5432
# TCP connectivity check — succeeded / refused / timed out
# refused = reaches host, nothing listening
# timed out = packet dropped (SG, NACL, routing)

# Distinguish SG vs NACL
# SG blocks inbound: connection times out immediately
# NACL missing outbound ephemeral: SSH -v shows "connected" then hangs
# VPC Flow Logs: REJECT action confirms SG/NACL drop

traceroute -T -p 443 app.internal
# TCP SYN trace — crosses SG rules, works where ICMP is blocked

# EC2 instance metadata
curl -s http://169.254.169.254/latest/meta-data/instance-id
curl -s http://169.254.169.254/latest/meta-data/local-ipv4`,
  },

  {
    heading: 'CURL — FLAGS AND PATTERNS',
    code: String.raw`# Core flags — memorise these
curl -I <url>                           # HEAD request — headers + status only
curl -s <url>                           # silent — suppress progress meter
curl -f <url>                           # fail — exit non-zero on 4xx/5xx (script-safe)
curl -v <url>                           # verbose — full TLS handshake + headers + body
curl -k <url>                           # insecure — skip TLS cert verification
curl -L <url>                           # follow redirects
curl -m 5 <url>                         # max time 5 seconds — hard timeout

# Combinations used in scenarios
curl -I https://app.example.com         # ALB check — what does the LB return?
curl -sf http://localhost:8080/health   # silent + fail — health check in scripts
curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/health
                                        # status code only — pipe-friendly
curl -v https://internal.api/health     # TLS + full response — debug certificate issues
curl -m 5 -sf http://<ip>:8080/health && echo ok || echo FAIL

# Adding headers and body
curl -H 'Authorization: Bearer <token>' https://api/endpoint
curl -X POST -H 'Content-Type: application/json' \
  -d '{"key":"value"}' http://localhost:8080/api

# Timing a request
curl -s -o /dev/null -w '%{time_total}' http://localhost:8080/api/orders
# time_total > 2.0 = slow endpoint — compare /health vs /api/* to isolate layer`,
  },

  {
    heading: 'RESOURCE PRESSURE — CPU / MEMORY / I/O',
    code: String.raw`uptime
# Load average vs core count (nproc) — above core count = queue building

ps aux --sort=-%cpu | head -5
ps aux --sort=-%mem | head -5
# Point-in-time — which process is consuming what

iostat -x 1
# %iowait = CPU waiting for disk, not doing useful work
# %util near 100 = disk saturated — in AWS check EBS VolumeQueueLength in CloudWatch

free -h
# Available column is what matters — includes reclaimable cache
# Swap in use = memory exhausted, paging to disk, system is slow

dmesg | grep -i 'killed process'
# OOM killer evidence — shows which process was killed and its memory footprint

# Memory leak pattern on ASG
# Memory climbs → OOM kill → ASG replaces instance → memory starts climbing again
# Impossible to catch without CloudWatch Agent (memory not default EC2 metric)
# Install CW Agent → MemoryUtilization metric → set alarm at 80%`,
  },

  {
    heading: 'QUICK PIPELINES — LOG PARSING / TOP OFFENDERS',
    code: String.raw`# Core pattern — adapt to any log field
awk '{print $FIELD}' logfile | sort | uniq -c | sort -rn | head -10
# uniq -c requires sorted input — sort BEFORE uniq, always

# Top IPs causing 5xx (ALB/nginx access log)
awk '$9 ~ /^5[0-9][0-9]/ {print $1}' /var/log/access.log \
  | sort | uniq -c | sort -rn | head -10

# Error rate by type
grep -oE '^(ERROR|WARN|CRIT)' /var/log/app.log \
  | sort | uniq -c | sort -rn

# Requests per hour — find the spike
awk '{print $4}' access.log | cut -d: -f2 | sort | uniq -c

# Slow requests over 2 seconds (if response time is last field)
awk '$NF > 2.0 {print $7, $NF}' access.log | sort -k2 -rn | head -10

# Live triage — DB connections + memory + load every 5 seconds
while true; do
  echo "$(date) | conns: $(ss -tp | grep ESTABLISHED | grep 5432 | wc -l) \
  | $(free -h | awk '/Mem:/ {print $3"/"$2}') \
  | load: $(uptime | awk -F'load average:' '{print $2}')"
  sleep 5
done`,
  },

  {
    heading: 'EDIT FILES IN PLACE — SED AND SUDO TEE',
    code: String.raw`# sed — in-place substitution
sed -i 's/old/new/' file                         # replace first match per line
sed -i 's/old/new/g' file                        # replace all matches per line
sed -i 's/^#\(Listen 80\)/\1/' /etc/httpd.conf   # uncomment a line
sed -i '/^#/d' file                              # delete all comment lines
sed -n '10,20p' file                             # print lines 10-20 without editing

# Always preview before committing — drop -i to dry-run:
sed 's/worker_processes 1/worker_processes 4/' /etc/nginx/nginx.conf
# Output goes to stdout, file untouched — verify before adding -i

# sudo tee — write to privileged files without running the whole pipe as root
# (sudo echo > file doesn't work — the redirect runs as your user, not root)
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
echo 'myapp soft nofile 65536' | sudo tee -a /etc/security/limits.conf
# -a = append   without -a, tee overwrites the file entirely

# Reload sysctl after writing — applies all /etc/sysctl.d/ files, no reboot needed
sudo sysctl --system

# Write a multi-line config block with tee + heredoc
sudo tee /etc/systemd/system/myapp.service > /dev/null << 'EOF'
[Service]
ExecStart=/usr/local/bin/myapp
Restart=on-failure
RestartSec=5s
EOF
sudo systemctl daemon-reload && sudo systemctl restart myapp

# tee to stdout and a file simultaneously — useful for logging output
some-command | sudo tee /var/log/deploy.log`,
  },
]
