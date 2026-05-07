export const script = {
  col1: `\
# shebang and safety options
#!/usr/bin/env bash
set -euo pipefail   # exit on error | unset var | pipe fail
set -x              # xtrace — print each command (debugging)

# variables
NAME="\${1:-default}"           # positional arg with fallback
LOG="\${2:-/var/log/app.log}"
readonly THRESHOLD=10
COUNT=$(grep -c ERROR "$LOG")

# guard clauses — fail fast at top of script
[[ $EUID -eq 0 ]] || { echo "must run as root" >&2; exit 1; }
[[ -f "$LOG" ]] || { echo "log not found: $LOG" >&2; exit 1; }

# test operators — the ones that come up
[[ -f $F ]]            # file exists
[[ -d $D ]]            # directory exists
[[ -z $V ]]            # string is empty
[[ -n $V ]]            # string is non-empty
[[ $N -gt 0 ]]         # numeric greater than
[[ $S =~ ^[0-9]+$ ]]   # regex match

# exit codes
exit 0                 # success
exit 1                 # failure — any non-zero signals error
echo "exit: $?"        # inspect last exit code
cmd || exit 1          # abort if command fails

# functions
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
die() { log "FATAL: $*"; exit 1; }

# trap — cleanup on any exit
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT          # always runs, even on error
trap 'rm -f "$TMP"' EXIT INT TERM # also catches Ctrl-C

# useful parameter expansion
"\${VAR:-default}"    # fallback if unset
"\${VAR:?must set}"   # abort with message if unset
"\${VAR##*/}"         # strip path prefix — gives basename
"\${VAR%.*}"          # strip extension`,

  col2: `\
# STEP 1: one-liner
grep -E 'ERROR|WARN' /var/log/app.log | tail -50

# STEP 2: pipeline with awk field extraction
# access.log: IP - - [date] "METHOD path HTTP" status bytes
awk '$9 ~ /^5[0-9][0-9]/ {print $1}' /var/log/access.log \
  | sort | uniq -c | sort -rn | head -10

# STEP 3: same logic, elevated to script
#!/usr/bin/env bash
set -euo pipefail
LOG="\${1:-/var/log/access.log}"
TOP="\${2:-10}"
THRESHOLD=50

[[ -f "$LOG" ]] || { echo "log not found: $LOG" >&2; exit 1; }

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }

log "scanning $LOG for 5xx errors"
results=$(awk '$9 ~ /^5[0-9][0-9]/ {print $1}' "$LOG" \
  | sort | uniq -c | sort -rn | head -"$TOP")
count=$(echo "$results" | wc -l)

echo "=== Top $TOP IPs causing 5xx ==="
echo "$results"

if [[ "$count" -gt "$THRESHOLD" ]]; then
  log "WARNING: $count unique IPs hitting 5xx"
  exit 2
fi
log "done — $count IPs found"
exit 0

# STEP 4: error rate monitor with alerting
#!/usr/bin/env bash
set -euo pipefail
LOG="/var/log/app.log"
THRESHOLD=20
WINDOW=100

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
die() { log "FATAL: $*"; exit 1; }

[[ -f "$LOG" ]] || die "log not found: $LOG"

errors=$(tail -n "$WINDOW" "$LOG" | grep -c 'ERROR' || true)
log "found $errors errors in last $WINDOW lines"

if [[ "$errors" -gt "$THRESHOLD" ]]; then
  log "ALERT: error rate exceeded threshold ($errors > $THRESHOLD)"
  # hook: send to SNS, PagerDuty, Slack webhook etc
  exit 1
fi
echo "OK: $errors errors (threshold: $THRESHOLD)"
exit 0`,

  col3: `\
# cron syntax
# ┌─ min (0-59)
# │ ┌─ hour (0-23)
# │ │ ┌─ day of month (1-31)
# │ │ │ ┌─ month (1-12)
# │ │ │ │ ┌─ day of week (0-6, Sun=0)
# │ │ │ │ │
# * * * * *  /path/to/script.sh

# common schedules
*/5 * * * *   # every 5 minutes
0 * * * *     # every hour on the hour
0 2 * * *     # daily at 02:00
0 2 * * 0     # weekly, Sunday 02:00
@reboot       # once at system boot

# cron best practices
# always use full paths — cron has minimal PATH
0 * * * * /usr/local/bin/check-errors.sh >> /var/log/check-errors.log 2>&1
# redirect stdout and stderr to log >> /var/log/script.log 2>&1

# lock file — prevent overlapping runs
LOCKFILE=/tmp/myscript.lock
exec 200>"$LOCKFILE"
flock -n 200 || { echo "already running" >&2; exit 1; }

# view scheduled crons
crontab -l             # current user
crontab -l -u root     # specific user
cat /etc/cron.d/*      # system crons
systemctl list-timers  # systemd timers (modern alternative)

# COMPLETE EXAMPLE: log monitor on cron
#!/usr/bin/env bash
# /usr/local/bin/monitor-errors.sh
# cron: */5 * * * * /usr/local/bin/monitor-errors.sh >> /var/log/monitor.log 2>&1
set -euo pipefail
LOG="/var/log/app.log"
THRESHOLD=10
LOCKFILE="/tmp/monitor-errors.lock"
ALERT_URL="\${ALERT_WEBHOOK:-}"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

exec 200>"$LOCKFILE"
flock -n 200 || { log "already running, exiting"; exit 0; }

[[ -f "$LOG" ]] || { log "log not found"; exit 1; }

errors=$(tail -n 500 "$LOG" | grep -c 'ERROR' || true)
log "errors in last 500 lines: $errors"

if [[ "$errors" -gt "$THRESHOLD" ]]; then
  log "ALERT: $errors errors exceeds threshold $THRESHOLD"
  [[ -n "$ALERT_URL" ]] && \
    curl -sf -X POST "$ALERT_URL" \
      -d "{\"text\":\"ERROR spike: $errors errors\"}" || true
  exit 1
fi
log "OK"
exit 0

# HEALTH CHECK PATTERN — poll until ready
wait_for_service() {
  local host="$1" port="$2" retries=10
  until nc -zw1 "$host" "$port"; do
    (( retries-- ))
    [[ $retries -eq 0 ]] && die "timed out waiting for $host:$port"
    log "waiting for $host:$port ($retries left)"
    sleep 3
  done
  log "$host:$port is ready"
}

wait_for_service db.internal 5432
wait_for_service redis.internal 6379`,
}
