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

# lsblk
lsblk
> NAME    MAJ:MIN  SIZE  TYPE  MOUNTPOINT
> xvda    202:0    20G   disk
> └─xvda1 202:1    20G   part  /
> xvdf    202:80   50G   disk
> └─xvdf1 202:81   50G   part  /var/log

lsblk -f
> NAME    FSTYPE  UUID                                  MOUNTPOINT
> xvda1   xfs     a1b2c3d4-...                         /
> xvdf1   ext4    e5f6g7h8-...                         /var/log

# findmnt
findmnt /var/log
> TARGET    SOURCE      FSTYPE  OPTIONS
> /var/log  /dev/xvdf1  ext4    rw,relatime

findmnt -D                            # disk usage per mount
mount | grep -i noexec                # check for noexec restrictions`,

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

# find — locate by attribute
find /var/log -name "*.log" -size +100M -ls
> 12345  8700000 -rw-r--r-- nginx /var/log/app/access.log  8.3G

find / -xdev -size +500M 2>/dev/null
> /var/log/app/access.log
> /var/lib/docker/overlay2/abc123

find /tmp -mtime +7 -delete           # purge tmp older than a week
find /var/log -name "*.log" -mtime +30 # old logs — candidates for rotation
find /var/log -type f -empty          # zero-byte files (rotated but not pruned)
find /var/log -name "*.log" -size +50M -exec ls -lh {} \;`,

  col3: `\
# lsof — open file inspection
lsof | grep deleted
> nginx  1234  nginx  4u  REG  202,1  8589934592  /var/log/app/access.log (deleted)
# file was rotated but nginx still holds the fd — space not freed
# fix: restart nginx, or send USR1 to reopen log files

lsof | grep deleted | awk '{print $2, $7, $9}' | sort -k2 -rn
> 1234  8589934592  /var/log/access.log    ← 8GB held by pid 1234

lsof -p 1234                          # all files open by process
lsof +D /var/log                      # all processes writing to /var/log
lsof +D /var/log | awk '{print $1, $2}' | sort -u

# disk full diagnosis — full flow
df -h                                 # 1. which mount is full?
du -sh /var/log/* | sort -rh | head   # 2. what's consuming space?
lsof | grep deleted | awk '{print $2,$7,$9}'  # 3. deleted files held open?
find / -xdev -size +500M 2>/dev/null  # 4. any single large file?

# fuser — find what blocks unmount
fuser -m /mnt/data
> /mnt/data:  1234c  5678c    ← PIDs using the mount

fuser -v /mnt/data
> USER   PID  ACCESS COMMAND
> simon  1234    c.. bash
> deploy 5678    c.. python

fuser -km /mnt/data && umount /mnt/data   # evict all and unmount

# common disk patterns
# pattern: df shows full, du doesn't add up → lsof | grep deleted
# pattern: "no space left" with df free → df -ih inode exhaustion
# pattern: "target is busy" on umount → fuser -m <mount>
# pattern: log file missing after rotation → lsof -p <pid> to confirm fd held`,
}
