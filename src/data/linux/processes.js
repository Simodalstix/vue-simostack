export const page = {
  title: 'Processes & Services',
  slug: 'processes',

  concepts: [
    { term: 'PID', def: 'Process ID — unique integer assigned to every running process' },
    { term: 'PPID', def: 'Parent PID — the process that spawned this one' },
    { term: 'PID 1', def: 'systemd — the init system, ancestor of all processes' },
    { term: 'Daemon', def: 'Background service process, typically no controlling terminal (ends in d: sshd, httpd)' },
    { term: 'Zombie', def: 'Process that has exited but parent hasn\'t collected its exit status yet' },
    { term: 'Orphan', def: 'Process whose parent died — adopted by PID 1 (systemd)' },
    { term: 'Fork', def: 'System call that creates a child process as a copy of the parent' },
    { term: 'Exec', def: 'Replaces the current process image with a new program' },
    { term: 'Nice value', def: '-20 (highest priority) to 19 (lowest). Default 0. Higher nice = more polite = lower priority' },
    { term: 'Unit', def: 'systemd\'s configuration object — service, socket, timer, mount, target, etc.' },
    { term: 'Target', def: 'systemd grouping of units, equivalent to SysV runlevels (multi-user.target ≈ runlevel 3)' },
    { term: 'Journal', def: 'systemd\'s binary structured log store — queried with journalctl' },
    { term: 'cgroup', def: 'Linux kernel feature — systemd uses these to track and limit resources per service' },
  ],

  signals: [
    { number: '1',  name: 'SIGHUP',  cmd: 'kill -1',  use: 'Reload config — graceful restart without full stop' },
    { number: '2',  name: 'SIGINT',  cmd: 'Ctrl+C',   use: 'Interrupt — polite stop from terminal' },
    { number: '9',  name: 'SIGKILL', cmd: 'kill -9',  use: 'Force kill — immediate, cannot be caught or ignored' },
    { number: '15', name: 'SIGTERM', cmd: 'kill',      use: 'Graceful stop — default. Process can clean up before exit' },
    { number: '18', name: 'SIGCONT', cmd: 'kill -18', use: 'Continue a stopped process' },
    { number: '19', name: 'SIGSTOP', cmd: 'Ctrl+Z',   use: 'Suspend process — cannot be caught or ignored' },
  ],

  commandGroups: [
    {
      heading: 'Viewing Processes',
      commands: [
        { cmd: 'ps aux',              desc: 'All processes — a=all users, u=user format, x=no tty required' },
        { cmd: 'ps -ef',              desc: 'All processes, full format (POSIX style, shows PPID)' },
        { cmd: 'ps aux | grep nginx', desc: 'Find a specific process by name' },
        { cmd: 'pgrep nginx',         desc: 'Get PID(s) by process name — cleaner than grep' },
        { cmd: 'pgrep -a nginx',      desc: 'Get PID + full command line' },
        { cmd: 'pidof nginx',         desc: 'All PIDs of running program by exact name' },
        { cmd: 'top',                 desc: 'Interactive process viewer — q to quit, k to kill, r to renice' },
        { cmd: 'top -u ec2-user',     desc: 'Filter top to a specific user' },
      ],
    },
    {
      heading: 'Controlling Processes',
      commands: [
        { cmd: 'kill <PID>',          desc: 'Send SIGTERM (15) — graceful stop' },
        { cmd: 'kill -9 <PID>',       desc: 'Send SIGKILL — force kill, last resort' },
        { cmd: 'kill -HUP <PID>',     desc: 'Send SIGHUP — reload config without restart' },
        { cmd: 'killall nginx',        desc: 'Kill all processes matching name — send SIGTERM' },
        { cmd: 'killall -9 nginx',     desc: 'Force kill all matching' },
        { cmd: 'pkill -f "python app"', desc: 'Kill by matching full command line (regex)' },
      ],
    },
    {
      heading: 'Background & Foreground',
      commands: [
        { cmd: 'command &',           desc: 'Run in background, returns control to shell' },
        { cmd: 'jobs',                desc: 'List background/suspended jobs in current shell' },
        { cmd: 'fg %1',               desc: 'Bring job 1 to foreground' },
        { cmd: 'bg %1',               desc: 'Resume suspended job 1 in background' },
        { cmd: 'Ctrl+Z',              desc: 'Suspend the current foreground process (SIGSTOP)' },
        { cmd: 'nohup command &',     desc: 'Run immune to hangup — survives terminal close, output → nohup.out' },
        { cmd: 'disown %1',           desc: 'Remove job from shell\'s job table — won\'t get SIGHUP on logout' },
      ],
    },
    {
      heading: 'Priority (Nice)',
      commands: [
        { cmd: 'nice -n 10 command',   desc: 'Start command with nice value 10 (lower priority)' },
        { cmd: 'nice -n -5 command',   desc: 'Start with higher priority (needs root for negative values)' },
        { cmd: 'renice -n 5 -p <PID>', desc: 'Change nice value of running process' },
        { cmd: 'renice -n 5 -u bob',   desc: 'Renice all processes owned by user' },
      ],
    },
  ],

  systemd: {
    serviceCommands: [
      { cmd: 'systemctl status nginx',                          desc: 'Show status, recent logs, active state' },
      { cmd: 'systemctl start nginx',                           desc: 'Start service now' },
      { cmd: 'systemctl stop nginx',                            desc: 'Stop service now' },
      { cmd: 'systemctl restart nginx',                         desc: 'Stop then start (brief downtime)' },
      { cmd: 'systemctl reload nginx',                          desc: 'Reload config without stopping (if supported)' },
      { cmd: 'systemctl enable nginx',                          desc: 'Start on boot (creates symlink in target)' },
      { cmd: 'systemctl disable nginx',                         desc: 'Don\'t start on boot' },
      { cmd: 'systemctl is-active nginx',                       desc: 'Exits 0 if active — useful in scripts' },
      { cmd: 'systemctl is-enabled nginx',                      desc: 'Check if enabled for boot' },
      { cmd: 'systemctl daemon-reload',                         desc: 'Reload systemd config — required after editing unit files' },
      { cmd: 'systemctl list-units --type=service',             desc: 'List all loaded service units' },
      { cmd: 'systemctl list-units --type=service --state=failed', desc: 'Show only failed services' },
      { cmd: 'systemctl list-unit-files --type=service',        desc: 'All service unit files and their enabled state' },
    ],
    journalCommands: [
      { cmd: 'journalctl -u nginx',                  desc: 'All logs for a unit' },
      { cmd: 'journalctl -u nginx -f',               desc: 'Follow logs in real time (like tail -f)' },
      { cmd: 'journalctl -u nginx -n 50',            desc: 'Last 50 lines for unit' },
      { cmd: 'journalctl -u nginx --since "1h ago"', desc: 'Logs from the last hour' },
      { cmd: 'journalctl -u nginx -p err',           desc: 'Filter by priority: emerg alert crit err warning notice info debug' },
      { cmd: 'journalctl -b',                        desc: 'Logs from current boot only' },
      { cmd: 'journalctl -b -1',                     desc: 'Logs from previous boot' },
      { cmd: 'journalctl --disk-usage',              desc: 'Check how much space the journal is using' },
      { cmd: 'journalctl --vacuum-size=500M',        desc: 'Trim journal to 500MB' },
    ],
    unitFile: `[Unit]
Description=My Application
Documentation=https://example.com
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/myapp --config /etc/myapp/config.yaml
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5s
User=myapp
Group=myapp
WorkingDirectory=/opt/myapp

# Resource limits
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target`,
  },

  examples: [
    {
      label: 'Find a process and kill it cleanly',
      code: `# Get PID
pgrep -a myapp

# Graceful stop first
kill $(pgrep myapp)

# If still running after a moment:
kill -9 $(pgrep myapp)`,
    },
    {
      label: 'What\'s using a port?',
      code: `# Find what's listening on port 8080
ss -tlnp | grep :8080

# Output includes PID — then:
systemctl status <service-name>`,
    },
    {
      label: 'Deploy a custom service',
      code: `# 1. Create unit file
sudo vim /etc/systemd/system/myapp.service

# 2. Reload systemd
sudo systemctl daemon-reload

# 3. Enable + start
sudo systemctl enable --now myapp

# 4. Verify
systemctl status myapp
journalctl -u myapp -f`,
    },
    {
      label: 'Check why a service failed',
      code: `# Status shows last few log lines
systemctl status nginx

# Full recent logs
journalctl -u nginx -n 100

# Since last start attempt
journalctl -u nginx --since "5 min ago"

# Previous boot if it crashed on startup
journalctl -u nginx -b -1`,
    },
  ],

  awsPatterns: [
    {
      heading: 'Key AWS Services on EC2',
      items: [
        { service: 'amazon-ssm-agent',          desc: 'SSM connectivity — must be running for Session Manager, Run Command, Patch Manager' },
        { service: 'amazon-cloudwatch-agent',   desc: 'Ships metrics and logs to CloudWatch' },
        { service: 'cloud-init',                desc: 'Runs UserData on first boot — check logs at /var/log/cloud-init-output.log' },
        { service: 'sshd',                      desc: 'SSH daemon — if this dies, you lose SSH access (use SSM as backup)' },
      ],
    },
    {
      heading: 'Common AWS Ops Commands',
      code: `# SSM agent — check before assuming connectivity issues
systemctl status amazon-ssm-agent
journalctl -u amazon-ssm-agent -n 50

# CloudWatch agent — if metrics stop appearing
systemctl status amazon-cloudwatch-agent
systemctl restart amazon-cloudwatch-agent

# Did UserData run successfully?
cat /var/log/cloud-init-output.log
journalctl -u cloud-init

# Instance metadata — useful in scripts and debugging
curl http://169.254.169.254/latest/meta-data/instance-id
curl http://169.254.169.254/latest/meta-data/local-ipv4`,
    },
  ],
}
