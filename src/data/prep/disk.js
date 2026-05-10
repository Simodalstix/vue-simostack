export const disk = {
  col1: `\
# df — filesystem space
df -h
> Filesystem      Size  Used Avail Use% Mounted on
> /dev/xvda1       20G   18G  1.2G  94% /           ← near full
> /dev/xvdf        50G   12G   38G  24% /var/log
> tmpfs           3.8G     0  3.8G   0% /dev/shm

df -Th                                # include filesystem type
df -ih                                # inode usage — separate limit
df -ih
> Filesystem     Inodes IUsed IFree IUse% Mounted on
> /dev/xvda1      1.3M  1.3M     0  100% /     ← inode exhaustion
# "no space left on device" with free blocks = inode exhaustion
# fix: find and remove millions of small files (e.g. /tmp, sessions)

df -h | grep -v tmpfs                 # real filesystems only
df -h /var/log                        # filesystem for a specific path

# lsblk — block device layout
lsblk
> NAME    MAJ:MIN  SIZE  TYPE  MOUNTPOINT
> xvda    202:0    20G   disk
> └─xvda1 202:1    20G   part  /
> xvdf    202:80   50G   disk
> └─xvdf1 202:81   50G   part  /var/log

lsblk -f                              # show filesystem type per partition

# mount — practical commands
mount | grep xvdf                     # verify a disk is mounted
mount -a                              # mount everything in /etc/fstab
umount /mnt/data                      # unmount a filesystem
mount -o remount,rw /                 # remount read-only fs as rw (recovery)

# EBS volume resize — after expanding volume in AWS console
lsblk                                 # confirm new size is visible to OS
sudo growpart /dev/xvda 1            # extend the partition to fill disk
sudo xfs_growfs /                    # resize xfs filesystem (Amazon Linux default)
sudo resize2fs /dev/xvda1            # resize ext4 filesystem instead
df -h                                 # confirm new size reflected`,

  col2: `\
# du — directory size
du -sh /var/log/*
> 4.0K   /var/log/audit
> 8.5G   /var/log/app        ← culprit
> 120M   /var/log/nginx

du -sh * | sort -rh | head -10
> 8.5G  app/
> 512M  mysql/
> 120M  nginx/

du -h --max-depth=1 /var/lib/docker | sort -rh
> 14G  /var/lib/docker
> 12G  /var/lib/docker/overlay2    ← usually the docker space hog

# journalctl — systemd journal space (common surprise on RHEL/AL2)
journalctl --disk-usage
> Archived and active journals take up 2.3G in the filesystem.

journalctl --vacuum-size=500M        # trim journal to 500MB
journalctl --vacuum-time=7d          # or discard entries older than 7 days

# find — locate by attribute
find /var/log -name "*.log" -size +100M -ls
> 12345  8700000 -rw-r--r-- nginx /var/log/app/access.log  8.3G

find / -xdev -size +500M 2>/dev/null
> /var/log/app/access.log
> /var/lib/docker/overlay2/abc123

find /tmp -mtime +7 -delete           # purge tmp older than a week
find /var/log -name "*.log" -mtime +30 # old logs — candidates for rotation
find /var/log -type f -empty          # zero-byte files (rotated but not pruned)`,

  col3: `\
# lsof — open file inspection
lsof | grep deleted
> nginx  1234  nginx  4u  REG  202,1  8589934592  /var/log/app/access.log (deleted)
# file was rotated but nginx still holds the fd — space not freed until process closes it

lsof | grep deleted | awk '{print $2, $7, $9}' | sort -k2 -rn
> 1234  8589934592  /var/log/access.log    ← 8GB held by pid 1234

lsof -p 1234                          # all files open by a specific process
lsof +D /var/log                      # all processes with open files under /var/log

# fix for deleted-but-held file: truncate in place rather than deleting
# safe because the fd stays valid — process keeps writing, space is freed immediately
truncate -s 0 /var/log/app/access.log

# alternative: send USR1 to nginx to reopen log files after rotation
kill -USR1 $(cat /var/run/nginx.pid)

# fuser — find what blocks unmount
fuser -m /mnt/data
> /mnt/data:  1234c  5678c    ← PIDs using the mount

fuser -v /mnt/data
> USER   PID  ACCESS COMMAND
> simon  1234    c.. bash
> deploy 5678    c.. python

fuser -km /mnt/data && umount /mnt/data   # evict all and unmount

# common disk patterns
# pattern: df shows full, du doesn't add up → lsof | grep deleted (deleted files held open)
# pattern: "no space left" with df showing free blocks → df -ih (inode exhaustion)
# pattern: "target is busy" on umount → fuser -m <mount>
# pattern: disk full on EC2, volume already expanded → growpart then xfs_growfs/resize2fs
# pattern: unexpected disk growth on RHEL → journalctl --disk-usage`,
}
