export const netFundCards = [
  // Row 1 — DNS records (text only, balanced height)
  {
    title: 'DNS Resolution & TTL',
    body: `Resolution chain: local cache → recursive resolver → root → TLD → authoritative.
Cache hit ends the chain early — the resolver serves the cached answer without
contacting the authoritative server. EC2 uses 169.254.169.253 (VPC+2 address)
as the recursive resolver by default.

TTL controls how long the cached answer stays valid. Reduce TTL before a planned
DNS change — propagation delay is bounded by the old record's TTL. Low TTL
increases resolver query volume and Route53 costs. Default: 300s.`,
  },
  {
    title: 'Record Types — A · AAAA · CNAME · MX · NS',
    body: `A     hostname → IPv4. Multiple = round-robin distribution. No order guarantee.
AAAA  hostname → IPv6. Dual-stack clients prefer AAAA over A when both exist.
CNAME alias → canonical name. Not valid at zone apex — breaks NS and MX lookup.
      Use Route53 ALIAS at apex (example.com). CNAME chains add per-hop latency.
MX    mail exchange + priority (lower number = preferred). Multiple for HA.
NS    nameserver for the zone. Delegates authority. Changing NS = transferring
      control. Parent zone must update glue records or resolution fails.`,
  },
  {
    title: 'Record Types — TXT · PTR · SRV · AD',
    body: `TXT  arbitrary text. SPF, DKIM, DMARC, domain verification (ACM, SES).
     Multiple TXT records allowed on the same name.
PTR  reverse DNS: IP → hostname. Stored in .in-addr.arpa. Requires ownership
     of the IP block. Used for email reputation and security audit trails.
SRV  service location: priority, weight, port, target host.
     AD uses SRV to find domain controllers:
       _ldap._tcp.domain  →  DC address and port
       _kerberos._tcp.domain  →  KDC location
     DNS failure = AD authentication failure. No fallback, no workaround.`,
  },

  // Row 2 — tools (code-block cards flanking a text card)
  {
    title: 'Querying DNS — dig & nslookup',
    body: `Query a specific resolver to isolate where a DNS problem lives.
Comparing results from the VPC resolver vs an external one tells you
whether the fault is in your private zone or upstream.`,
    code: `dig +short <hostname>                # resolve — IP only
dig @169.254.169.253 <hostname>  # EC2 VPC resolver directly
dig @8.8.8.8 <hostname>          # bypass local, hit Google DNS
dig +trace <hostname>            # trace delegation from root
nslookup <hostname> <server>     # same intent, older syntax`,
  },
  {
    title: 'TCP vs UDP',
    body: `TCP: connection-oriented, reliable, ordered. Three-way handshake (SYN →
SYN-ACK → ACK) before data flows. Retransmits on packet loss. Higher overhead.
HTTP, SSH, database connections, file transfer.

UDP: connectionless. No handshake, no delivery guarantee, no retransmit.
Lower overhead, higher throughput. Loss is acceptable or app-handled.
DNS queries, VoIP, video streaming, SNMP, syslog.

Half-open connections (SYN sent, final ACK never returned) accumulate state.
Basis of SYN flood attacks — fills the connection table, starves real traffic.`,
  },
  {
    title: 'curl — HTTP Testing',
    body: `Essential for verifying connectivity, TLS, and response behaviour without
a browser. Reach for it when a service is suspect: health endpoints, auth
headers, status codes, redirect chains, and certificate validity.`,
    code: `curl -I <url>                              # headers only (HEAD)
curl -s -o /dev/null -w '%{http_code}' <url>  # status code only
curl -v <url>                              # verbose: TLS + headers + body
curl -k <url>                              # skip TLS cert verification
curl -m 5 <url>                            # hard timeout, 5 seconds
curl -sf http://localhost:8080/health && echo ok
curl -H 'Authorization: Bearer <token>' <url>`,
  },

  // Row 3 — IP / AWS networking (one code card centred)
  {
    title: 'IP Addressing & NAT',
    body: `Private ranges (RFC1918) — not internet-routable:
  10.0.0.0/8      large private networks, most AWS VPC designs
  172.16.0.0/12   VPC default CIDR family (AWS default: 172.31.0.0/16)
  192.168.0.0/16  home and small office networks

NAT translates private → public IP on outbound. Stateful — tracks sessions
to reverse-translate responses. Return traffic must match an active session
entry; unsolicited inbound is dropped. Many-to-one (PAT): many private IPs
share one public IP, differentiated by source port.`,
  },
  {
    title: 'NAT Gateway vs Internet Gateway',
    body: `NAT Gateway: outbound-only for private subnets. AZ-scoped — one per AZ for
resilience; cross-AZ NGW traffic incurs data transfer charges. Charged per
hour and per GB. Not reachable from the internet.

IGW: bidirectional for public subnets. One per VPC. Instance needs a public
IP or EIP to communicate with the internet. HA and horizontally scaled.

They serve different subnet types and cannot substitute for each other.`,
    code: `# private subnet route table
0.0.0.0/0 → nat-xxxxxxxx   # outbound only via NAT Gateway

# public subnet route table
0.0.0.0/0 → igw-xxxxxxxx   # bidirectional via Internet Gateway`,
  },
  {
    title: 'Hub vs Switch vs Router',
    body: `Hub (L1): broadcasts every frame to all ports. All ports share one collision
domain — simultaneous transmissions collide. No traffic isolation. Obsolete.

Switch (L2): learns MAC addresses, forwards frames to the correct port only.
Separate collision domain per port. Supports VLANs for L2 segmentation.
Foundation of LAN design.

Router (L3): forwards packets between networks by IP. Routing table selects
next hop. Connects subnets, VLANs, and the internet. In AWS the VPC has an
implicit router — no physical device, configured via route tables per subnet.`,
  },

  // Row 4 — diagnostics + path (code card last)
  {
    title: 'Traceroute',
    body: `Sends probes with incrementing TTL. Each router decrements TTL; at TTL=0 it
returns ICMP Time Exceeded, revealing its address. Three probes per hop.
Builds the full path with per-hop round-trip times.

ping: is the destination reachable, what is the RTT.
traceroute: which hop is the problem — path with per-hop latency.

Asterisks (*): ICMP filtered — not necessarily the failure point. Use
traceroute -T (TCP SYN probes) to work through security groups and firewalls.`,
  },
  {
    title: 'CIDR & Subnetting',
    body: `CIDR notation: <network>/<prefix-length>
  /24 = 256 addresses  (254 usable outside AWS)
  /16 = 65,536 addresses
  /28 = 16 addresses  (smallest allowed VPC subnet)

AWS reserves 5 IPs per subnet: .0 network · .1 VPC router · .2 DNS
· .3 future use · .255 broadcast = 11 usable in a /28.

VPC CIDR cannot be changed after creation — plan sizing upfront. A /16
split into /24 subnets gives 256 subnets of 251 usable hosts each.`,
  },
  {
    title: 'Full Request Path — https://www.amazon.com',
    body: `Every step is a potential failure domain. Know where TLS terminates (ALB,
not the app server), where auth is enforced, and where caching can
short-circuit the chain. ALB access logs surface which step is slow.`,
    code: `1. DNS lookup      cache → recursive → authoritative → A record
2. TCP handshake   SYN → SYN-ACK → ACK  (client → ALB, port 443)
3. TLS handshake   cert presented, cipher negotiated, session keys set
4. HTTP GET        Host, Accept, Cookie, Authorization headers
5. Load balancer   ALB terminates TLS, routes by host/path rule
6. App server      ECS task / EC2 processes the request
7. Backends        RDS (read), ElastiCache (cache), S3 (assets)
8. Response        app → ALB → client, TLS-encrypted throughout`,
  },
]
