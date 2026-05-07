export const net = {
  col1: `\
# ss — socket statistics
ss -tlnp
> State  Recv-Q Send-Q  Local Address:Port  Peer Address:Port  Process
> LISTEN  0      128         0.0.0.0:22         0.0.0.0:*      sshd
> LISTEN  0      511         0.0.0.0:80         0.0.0.0:*      nginx
> LISTEN  0      511         0.0.0.0:443        0.0.0.0:*      nginx
> LISTEN  0      128       127.0.0.1:5432       0.0.0.0:*      postgres

ss -tunlp                          # TCP + UDP listening with PIDs
ss -tp                             # established TCP with process names
ss -s                              # socket state summary

ss -tlnp | grep :8080              # which process holds port 8080
ss -tp | grep ESTABLISHED | wc -l  # count live connections
watch -n2 'ss -s'                  # live connection monitor

# ip — interfaces and routing
ip addr show
> 2: eth0: <BROADCAST,MULTICAST,UP> mtu 9001
>     link/ether 02:ab:cd:ef:12:34
>     inet 10.0.1.15/24 brd 10.0.1.255 scope global eth0

ip route show
> default via 10.0.1.1 dev eth0
> 10.0.1.0/24 dev eth0 proto kernel src 10.0.1.15
> 169.254.169.254 via 10.0.1.1 dev eth0   # IMDS

ip route get 10.0.2.50
> 10.0.2.50 via 10.0.1.1 dev eth0 src 10.0.1.15

ip -s link show eth0
> RX: bytes  packets  errors  dropped
>     102400    1024       0        0`,

  col2: `\
# curl — HTTP testing
curl -I http://localhost:8080
> HTTP/1.1 200 OK
> Server: nginx/1.24.0
> Content-Type: application/json

curl -s -o /dev/null -w '%{http_code}' http://localhost/health
> 200

curl -v https://api.internal/health
> * TLSv1.3 (OUT), TLS handshake
> * SSL certificate verify ok
> < HTTP/2 200

curl -sf http://localhost:8080/health && echo ok || echo FAIL
curl -m 5 -s -o /dev/null -w '%{http_code}' http://<alb-dns>/health
curl -H 'Authorization: Bearer <token>' https://<api>/endpoint
curl -X POST -H 'Content-Type: application/json' \
     -d '{"key":"value"}' http://localhost:8080/api
curl -s https://checkip.amazonaws.com   # confirm outbound/NAT IP
curl -s --connect-timeout 2 http://<ip>:9090/metrics | head -5

# dig — DNS resolution
dig +short api.example.com
> 52.64.12.34

dig api.example.com
> ;; ANSWER SECTION:
> api.example.com. 300 IN A 52.64.12.34

dig @169.254.169.253 api.example.com   # query VPC resolver (EC2)
dig @8.8.8.8 api.example.com           # query specific resolver
dig -x 52.64.12.34                     # reverse DNS lookup
dig +trace api.example.com             # trace delegation from root
dig MX example.com                     # MX records
dig TXT example.com                    # TXT/SPF records

dig +short <rds-endpoint>              # confirm RDS hostname resolves
dig @169.254.169.253 +short <hostname> # internal VPC resolution check`,

  col3: `\
# nc — connectivity testing
nc -zv db.internal 5432
> Connection to db.internal 5432 port [tcp/postgresql] succeeded!

nc -zvw2 db.internal 5432     # 2s timeout
nc -zvw2 db.internal 5432 2>&1 | grep -i 'succeeded\|refused\|timed'

for p in 80 443 8080 8443; do
  nc -zvw1 app.internal $p 2>&1
done
> Connection to app.internal 80 succeeded!
> Connection to app.internal 443 succeeded!
> nc: connect to app.internal port 8080 failed: Connection refused

echo | nc -w1 host 443 && echo open || echo closed
nc -l 9999                    # throwaway listener for connectivity test

# traceroute + ping
traceroute app.internal
> traceroute to app.internal, 30 hops max
>  1  10.0.1.1  0.5ms  0.4ms  0.5ms
>  2  * * *                           # ICMP blocked — not a failure
>  3  10.0.2.50  1.2ms  1.1ms  1.3ms

traceroute -T -p 443 <alb-dns>  # TCP SYN trace — crosses SG rules
# use -T when ICMP is blocked by security groups

ping -c 4 app.internal
> 64 bytes from 10.0.2.50: icmp_seq=1 ttl=64 time=0.8ms
> 4 packets transmitted, 4 received, 0% packet loss

ping -c 1 -W 1 <ip> && echo up || echo down   # scriptable host check
ping -c 10 -i 0.2 host | tail -2              # spot intermittent loss

# combined: full path diagnosis
dig +short api.internal                        # 1. does DNS resolve?
curl -sf http://api.internal/health            # 2. does HTTP respond?
traceroute -T -p 443 api.internal              # 3. where does it break?
ss -tlnp | grep :443                           # 4. is anything listening?`,
}
