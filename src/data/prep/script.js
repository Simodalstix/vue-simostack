export const script = {
  col1: `\
# shebang and safety options
#!/usr/bin/env bash
set -euo pipefail   # exit on error | unset var | pipe fail
# set -x            # uncomment to trace commands — debugging only

# variables
LOG="\${1:-/var/log/app.log}"    # positional arg with fallback
TOP="\${2:-10}"
THRESHOLD=50

COUNT=$(grep -c ERROR "$LOG")   # capture command output

# guard clauses — fail fast
[[ -f "$LOG" ]] || { echo "log not found: $LOG" >&2; exit 1; }
[[ $EUID -eq 0 ]] || { echo "must run as root" >&2; exit 1; }

# test operators
[[ -f $F ]]          # file exists
[[ -d $D ]]          # directory exists
[[ -z $V ]]          # string is empty
[[ -n $V ]]          # string is non-empty
[[ $N -gt 0 ]]       # numeric greater than

# exit codes
exit 0               # success
exit 1               # failure
echo "exit: $?"      # inspect last exit code

# log function — timestamp prefix to stderr
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
die() { log "FATAL: $*"; exit 1; }

# trap — cleanup on exit
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT INT TERM`,

  col2: `\
# STEP 1: one-liner
awk '$9 ~ /^5[0-9][0-9]/ {print $1}' /var/log/access.log \\
  | sort | uniq -c | sort -rn | head -10

# STEP 2: parameterised — same logic, takes log and N as args
awk '$9 ~ /^5[0-9][0-9]/ {print $1}' "\${1:-/var/log/access.log}" \\
  | sort | uniq -c | sort -rn | head -"\${2:-10}"

# STEP 3: script — add validation, output, exit codes
#!/usr/bin/env bash
set -euo pipefail
LOG="\${1:-/var/log/access.log}"
TOP="\${2:-10}"
THRESHOLD=50

[[ -f "$LOG" ]] || { echo "log not found: $LOG" >&2; exit 1; }

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }

log "scanning $LOG for 5xx errors"
results=$(awk '$9 ~ /^5[0-9][0-9]/ {print $1}' "$LOG" \\
  | sort | uniq -c | sort -rn | head -"$TOP")
count=$(echo "$results" | wc -l)

echo "=== Top $TOP IPs causing 5xx ==="
echo "$results"

if [[ "$count" -gt "$THRESHOLD" ]]; then
  log "WARNING: $count unique IPs hitting 5xx"
  exit 2
fi
log "done — $count IPs found"
exit 0`,

  col3: `\
# cron basics
# min  hour  dom  month  dow   command
*/5  *    *    *      *     /usr/local/bin/check.sh >> /var/log/check.log 2>&1
0    2    *    *      *     /usr/local/bin/backup.sh
0    2    *    *      0     /usr/local/bin/weekly.sh
@reboot                     /usr/local/bin/startup.sh

# always: full paths, redirect stdout + stderr
0 * * * * /usr/local/bin/script.sh >> /var/log/script.log 2>&1

crontab -l                 # current user's crontab
crontab -l -u root         # another user
cat /etc/cron.d/*          # system-level crons
systemctl list-timers      # systemd timers — modern alternative`,
}
