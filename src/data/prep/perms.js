export const perms = {
  col1: `\
# chmod
chmod 644 config.yaml            # rw-r--r--  standard file
chmod 755 /usr/local/bin/script  # rwxr-xr-x  standard binary/dir
chmod 600 ~/.ssh/id_rsa          # rw-------  private key — sshd rejects wider
chmod 440 /etc/sudoers.d/deploy  # sudoers drop-ins must not be world-writable
chmod +x deploy.sh               # add execute bit
chmod -R 755 /var/www/html       # recursive — applies same perms to files AND dirs
find /var/www -type f -exec chmod 644 {} \;   # files only — preferred over -R
find /var/www -type d -exec chmod 755 {} \;   # dirs only

ls -la /etc/app/
> -rw-r--r-- 1 root root  512 Jan 15 config.yaml
> -rw------- 1 root root   64 Jan 15 secret.env
> -rwxr-xr-x 1 root root 2048 Jan 15 start.sh

# chown
chown nginx:nginx /var/www/html      # hand web root to service user
chown -R ec2-user:ec2-user /app      # restore after root deploy
chown root:root /etc/cron.d/backup   # cron files must be root:root
chown :<group> <file>                # group only, keep owner

ls -la /var/www/
> drwxr-xr-x 3 nginx  nginx  4096 Jan 15 html/
> drwxr-x--- 2 deploy deploy 4096 Jan 15 releases/

# id / groups — who am I, what can I access?
id
> uid=1000(simon) gid=1000(simon) groups=1000(simon),4(adm),10(wheel),992(docker)

id nginx                             # check service account's groups
groups                               # current user's group membership
groups ec2-user                      # check another user

# stat — full file metadata
stat /etc/shadow
> File: /etc/shadow
> Size: 1024   Blocks: 8   IO Block: 4096  regular file
> Access: (0640/-rw-r-----)  Uid: (0/root)  Gid: (42/shadow)
> Modify: 2024-01-15 14:32:01

stat -c '%a %U %G' /etc/shadow       # scriptable: octal owner group
> 640 root shadow

stat -c '%a %U %G' /etc/passwd /etc/shadow /etc/sudoers

# umask — default creation permissions
umask
> 0022                               # files created as 644, dirs as 755

umask 0027                           # tighten: files as 640, dirs as 750
# set in /etc/profile or ~/.bashrc for persistence
# common in security-hardened environments — new files not world-readable

# SSH directory permissions — sshd is strict, rejects misconfigured paths
chmod 700 ~/.ssh                     # directory must not be group/world readable
chmod 600 ~/.ssh/authorized_keys     # sshd rejects if group or world can read
chmod 600 ~/.ssh/id_rsa              # private key — same rule

# diagnosis: SSH auth failing on EC2
stat -c '%a %U %G' ~/.ssh ~/.ssh/authorized_keys
# must be: 700 ec2-user ec2-user / 600 ec2-user ec2-user
ls -la ~/.ssh/
# look for wrong owner (e.g. root after sudo operations) or permissions > 600`,

  col2: `\
# sudo
sudo systemctl restart nginx         # most common production use
sudo -u postgres psql                # run as service user
sudo -u nginx /usr/local/bin/check   # test as the actual service user
sudo -l                              # list your own sudo rights
sudo -l -U deploy                    # check another user's rights

sudo -l
> User simon may run the following commands:
>     (ALL) NOPASSWD: /usr/bin/systemctl restart nginx
>     (ALL) NOPASSWD: /usr/bin/journalctl

visudo                               # safely edit sudoers with lock
# drop-ins: /etc/sudoers.d/ — mode 440, root:root, no world-write or sudo ignores it

# SELinux — status
getenforce
> Enforcing

sestatus
> SELinux status:        enabled
> SELinuxfs mount:       /sys/fs/selinux
> Current mode:          enforcing
> Mode from config file: enforcing
> Policy MLS status:     enabled

setenforce 0                         # temporary permissive — test if SELinux is the cause
setenforce 1                         # re-enforce

# SELinux — audit
ausearch -m avc -ts recent
> type=AVC msg=audit(1705329121.456:789):
>   avc: denied { read } for pid=1234 comm="nginx"
>   path="/etc/app/config" scontext=system_u:system_r:httpd_t:s0
>   tcontext=unconfined_u:object_r:user_home_t:s0

ausearch -m avc -ts recent | audit2why
> Was caused by: Missing type enforcement (TE) allow rule
> Allow this access by executing: restorecon -Rv /etc/app/config

ausearch -m avc -c nginx             # denials for nginx process only`,

  col3: `\
# SELinux — context inspection
ls -Z /etc/app/
> -rw-r--r--. root root unconfined_u:object_r:user_home_t:s0  config    ← wrong
> -rw-r--r--. root root system_u:object_r:httpd_config_t:s0   nginx.conf ← correct

ps -eZ | grep nginx
> system_u:system_r:httpd_t:s0  1234 nginx: master process

# SELinux — repair
restorecon -v /etc/app/config
> Relabeled /etc/app/config from user_home_t to httpd_config_t

restorecon -Rv /var/www/html

# common boolean fixes
setsebool -P httpd_can_network_connect 1      # nginx proxying upstream
setsebool -P httpd_can_network_connect_db 1   # app connecting to DB

# SELinux — full diagnosis flow
getenforce                                    # 1. is it enforcing?
ausearch -m avc -ts recent | tail -20         # 2. what is it blocking?
ausearch -m avc -ts recent | audit2why        # 3. plain-English reason
restorecon -Rv <path>                         # 4. restore context
setenforce 0 && <test> && setenforce 1        # 5. confirm SELinux is the cause

# lsattr — immutable file flags
lsattr /etc/resolv.conf
> ----i--------e-- /etc/resolv.conf    ← i = immutable, root can't edit

chattr +i /etc/resolv.conf       # lock it — dhclient can't overwrite DNS
chattr -i /etc/resolv.conf       # remove immutable flag
chattr +a /var/log/app.log       # append-only — safe for log files
lsattr /etc/passwd /etc/shadow   # check core auth files for hidden flags`,
}
