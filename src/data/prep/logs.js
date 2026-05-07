export const logs = {
  col1: `# basic filtering
grep 'ERROR' app.log
grep -i 'error' app.log              # case-insensitive
grep -v 'DEBUG' app.log              # exclude DEBUG lines
grep -n 'timeout' app.log            # show line numbers
grep -c 'ERROR' app.log              # count matching lines
grep -l 'ERROR' /var/log/*.log       # list files with match

# context
grep -A 3 'ERROR' app.log            # 3 lines after match
grep -B 2 'ERROR' app.log            # 2 lines before match
grep -C 2 'ERROR' app.log            # 2 lines either side

# extended regex (-E)
grep -E 'ERROR|WARN|CRIT' app.log
grep -E '[45][0-9][0-9]' access.log
grep -E '^ERROR' app.log             # line starts with ERROR
grep -E 'timeout$' app.log           # line ends with timeout
grep -E '[0-9]{1,3}(\\.[0-9]{1,3}){3}' access.log

# extract match only
grep -oE '[0-9]{1,3}(\\.[0-9]{1,3}){3}' access.log
> 192.168.1.45
> 10.0.1.15

grep -oE '[45][0-9][0-9]' access.log | sort | uniq -c
> 142 500
>  34 404
>   8 502

# realistic targets
grep -v '^#' /etc/ssh/sshd_config    # strip comments
grep -v '^$' /etc/hosts              # strip empty lines
grep '/bin/bash' /etc/passwd         # users with bash shell
grep 'Failed password' /var/log/secure | grep -oE 'from [^ ]+'
> from 203.0.113.45
> from 198.51.100.12

# tail / head
tail -f /var/log/app.log             # follow live
tail -F /var/log/app.log             # follow by name (survives rotate)
tail -n 200 app.log | grep ERROR
tail -f app.log | grep --line-buffered ERROR
head -n 20 app.log`,

  col2: `# field extraction
# default delimiter: whitespace
# $0=full line  $1=first field  $NF=last field  NR=line number

# /etc/passwd — colon delimited
# root:x:0:0:root:/root:/bin/bash
# $1=user  $3=UID  $4=GID  $6=home  $7=shell

awk -F: '{print $1, $3}' /etc/passwd
> root 0
> simon 1000
> nginx 998

awk -F: '$3 >= 1000 {print $1, $6}' /etc/passwd
> simon /home/simon

awk -F: '$7 !~ /nologin|false/ {print $1, $7}' /etc/passwd
> root /bin/bash
> simon /bin/bash

# access.log — space delimited
# 192.168.1.45 - - [15/Jan/2024:14:32:01] "GET /api HTTP/1.1" 500 243
# $1=IP  $7=path  $9=status  $10=bytes

awk '$9 == 500 {print $1, $7}' access.log
> 192.168.1.45 /api/orders
> 10.0.1.15 /api/search

awk '$9 ~ /^5/ {print $1}' access.log | sort | uniq -c | sort -rn
> 142 203.0.113.45
>  89 10.0.1.15

awk '$10 > 100000 {print $7, $10}' access.log
> /api/export 524288

awk '{sum += $10} END {print "total bytes:", sum}' access.log
> total bytes: 1073741824

# pattern + action
awk '/ERROR/ {print NR, $0}' app.log
awk 'NR==10,NR==20 {print}' app.log
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10
> 312 192.168.1.45
>  89 10.0.1.15

awk -F: '$7 ~ /bash|sh$/ {print $1, $3, $7}' /etc/passwd
> root 0 /bin/bash
> simon 1000 /bin/bash`,

  col3: `# sed — stream editing
sed 's/foo/bar/' file                # replace first match per line
sed 's/foo/bar/g' file               # replace all matches
sed -i 's/foo/bar/g' file            # edit in place
sed -n '10,20p' file                 # print lines 10-20 only
sed '/^#/d' file                     # delete comment lines
sed '/^$/d' file                     # delete empty lines
sed 's/[[:space:]]*$//' file         # strip trailing whitespace

# realistic
sed -i 's/localhost/db.internal/g' config.yaml
sed '/^#/d; /^$/d' /etc/nginx/nginx.conf
sed 's/password=.*/password=REDACTED/' app.log
sed -n '/^root/p' /etc/passwd
> root:x:0:0:root:/root:/bin/bash

# sort & uniq
sort -n file                         # numeric sort
sort -rn file                        # reverse numeric
sort -k2,2 file                      # sort by field 2
sort -u file                         # sort + deduplicate
uniq -c file                         # prefix count (needs sorted input)
sort | uniq -c | sort -rn            # canonical frequency pipeline

# pipelines — interview ready

# top 10 IPs causing 5xx
awk '$9 ~ /^5[0-9][0-9]/ {print $1}' access.log \\
  | sort | uniq -c | sort -rn | head -10
> 142 203.0.113.45
>  89 198.51.100.12

# error rate by type
grep -E '^(ERROR|WARN|CRIT)' app.log \\
  | awk '{print $1}' \\
  | sort | uniq -c | sort -rn
>  312 ERROR
>   87 WARN
>    4 CRIT

# unique IPs in log
grep -oE '[0-9]{1,3}(\\.[0-9]{1,3}){3}' access.log | sort -u
> 10.0.1.15
> 192.168.1.45

# slow requests over 2s
awk '$NF > 2.0 {print $7, $NF}' access.log \\
  | sort -k2 -rn | head -10
> /api/export 8.432
> /api/search 3.211

# users with login shells and UIDs
awk -F: '$7 ~ /bash|sh$/ {print $1, $3, $7}' /etc/passwd
> root 0 /bin/bash
> simon 1000 /bin/bash

# strip comments and blanks from config
sed '/^[[:space:]]*#/d; /^$/d' /etc/ssh/sshd_config

# find processes by user
ps aux | awk '$1 == "nginx" {print $2, $11}'
> 1234 nginx: master process
> 1235 nginx: worker process

# count 404s per path
awk '$9 == 404 {print $7}' access.log \\
  | sort | uniq -c | sort -rn | head -10
> 45 /api/v1/old-endpoint
> 12 /favicon.ico`,
}
