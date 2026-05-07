export const proc = {
  col1: `\
# unit lifecycle
systemctl status nginx
> ● nginx.service - A high performance web server
>    Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled)
>    Active: active (running) since Mon 2024-01-15 14:00:01 UTC
>   Main PID: 1234 (nginx)

systemctl start <unit>           # start unit
systemctl stop <unit>            # stop unit
systemctl restart <unit>         # stop then start
systemctl reload <unit>          # reload config (sends SIGHUP)
systemctl enable <unit>          # start on boot
systemctl disable <unit>         # remove from boot
systemctl daemon-reload          # rescan unit files after edits

# inspection
systemctl list-units --failed
> UNIT                LOAD   ACTIVE SUB    DESCRIPTION
> app.service         loaded failed failed Application Server

systemctl list-units --type=service --state=running
systemctl is-active nginx        # exits 0 if active — use in scripts
systemctl is-enabled nginx       # exits 0 if boot-enabled
systemctl cat nginx              # show resolved unit file on disk

systemctl show nginx -p MainPID
> MainPID=1234`,

  col2: `\
# journalctl — structured queries
journalctl -u nginx -n 50 --no-pager
> Jan 15 14:32:01 host nginx[1234]: 2024/01/15 connect() failed
> Jan 15 14:32:05 host nginx[1234]: upstream timed out (110)

journalctl -u nginx -f                    # follow live
journalctl -u nginx -p err                # err and above only
journalctl -u nginx --since "1 hour ago"
journalctl -u nginx --since "2024-01-15 14:00" --until "14:30"
journalctl -xe                            # recent + catalog explanation
journalctl --boot                         # this boot only
journalctl -u nginx --no-pager | grep -i 'error\|warn\|fail'

# ps — process snapshot
ps aux
> USER  PID  %CPU %MEM    VSZ   RSS  STAT  COMMAND
> nginx 1234  0.0  0.1  46884  3012  Ss    nginx: master process
> nginx 1235  0.0  0.2  47312  4100  S     nginx: worker process

ps aux --sort=-%cpu | head -10     # top cpu consumers
ps aux --sort=-%mem | head -10     # top memory consumers
ps -ef | grep nginx                # shows PPID — useful for orphan detection
ps -eo pid,ppid,stat,cmd,%cpu,%mem --sort=-%cpu | head -10

pgrep -la nginx
> 1234 nginx: master process /etc/nginx/nginx.conf
> 1235 nginx: worker process

pstree -p 1234
> nginx(1234)─┬─nginx(1235)
>             └─nginx(1236)`,

  col3: `\
# signals
kill <pid>           # SIGTERM (15) — graceful, process can catch
kill -9 <pid>        # SIGKILL — force, unblockable, no cleanup
kill -HUP <pid>      # SIGHUP — reload config (nginx, sshd)
kill -0 <pid>        # probe existence — exits 0 if process exists

pkill -f 'python app.py'     # match full cmdline
pkill -HUP nginx             # reload all nginx processes
pkill -u deploy              # kill all processes by user
killall nginx                # SIGTERM all by name

# /proc — live process inspection
cat /proc/1234/status
> Name:   nginx
> State:  S (sleeping)
> Pid:    1234
> VmRSS:  3012 kB
> Threads: 1

ls -la /proc/1234/fd | wc -l    # open file descriptor count
ls -la /proc/1234/fd
> lrwx------ 1 nginx nginx 64 Jan 15 14:00 0 -> /dev/null
> l-wx------ 1 nginx nginx 64 Jan 15 14:00 1 -> /var/log/nginx/access.log

lsof -p 1234
> COMMAND  PID   USER  FD  TYPE  DEVICE  SIZE  NODE  NAME
> nginx   1234  nginx   4u  IPv4  23456    0t0   TCP  *:80 (LISTEN)
> nginx   1234  nginx   5u  IPv4  23457    0t0   TCP  *:443 (LISTEN)

strace -p 1234 -c        # syscall summary — what is the process actually doing?
> % time   seconds  calls  errors  syscall
>  45.2    0.001200    120       0  epoll_wait
>  32.1    0.000854     45       3  read

ulimit -a | grep 'open files'
> open files                      (-n) 1024`,
}
