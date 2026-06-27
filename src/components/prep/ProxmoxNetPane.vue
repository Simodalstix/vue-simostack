<template>
  <div class="flex flex-col h-full overflow-hidden font-mono">

    <!-- Lab overview banner -->
    <div class="shrink-0 px-6 pt-4 pb-4 border-b border-ob-text/18 bg-ob-surface2/20">
      <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-3">Proxmox Lab — Overview</div>
      <div class="grid grid-cols-3 gap-6">

        <!-- Hardware & stack -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-ob-dim font-semibold mb-1.5">Hardware & Stack</div>
          <div class="text-[11px] space-y-0.5">
            <div><span class="text-amber-300/80">Beelink SER8</span><span class="text-ob-dim"> — 32GB RAM, 6-core AMD Ryzen 9, 1TB NVMe. Bare metal.</span></div>
            <div><span class="text-amber-300/80">Proxmox VE</span><span class="text-ob-dim"> — Type 1 hypervisor, KVM/QEMU, web UI + API management</span></div>
            <div><span class="text-amber-300/80">OPNsense VM</span><span class="text-ob-dim"> — router, firewall, VLAN gateway, WireGuard VPN</span></div>
            <div><span class="text-amber-300/80">Rocky Linux</span><span class="text-ob-dim"> — RHEL-based: Samba file server, service and Linux practice</span></div>
            <div><span class="text-amber-300/80">Windows Server 2022</span><span class="text-ob-dim"> — DC1, Active Directory, DNS, GPO</span></div>
            <div><span class="text-amber-300/80">Prometheus + Grafana</span><span class="text-ob-dim"> — observability across all hosts</span></div>
            <div><span class="text-amber-300/80">Vault</span><span class="text-ob-dim"> — PKI, internal cert issuance</span></div>
          </div>
        </div>

        <!-- What was built -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-ob-dim font-semibold mb-1.5">What You Built</div>
          <div class="text-[11px] space-y-1.5 text-ob-muted">
            <div>Network segmented into VLANs — management, dev, services. OPNsense routes between them with firewall rules controlling what can reach what.</div>
            <div>WireGuard was the intended VPN approach — partially configured on OPNsense, understand the model well enough to discuss.</div>
            <div>Rocky Linux file server joined to the AD domain via Samba/winbind — Windows clients authenticate using AD credentials.</div>
            <div>Prometheus + Node Exporter across all hosts. Grafana dashboards, alert rules for service state and resource pressure.</div>
          </div>
        </div>

        <!-- How to narrate it -->
        <div>
          <div class="text-[9px] uppercase tracking-widest text-ob-dim font-semibold mb-1.5">"Walk Me Through Your Lab"</div>
          <div class="text-[11px] space-y-1.5">
            <div class="text-ob-muted">Lead with hardware, then topology, then what you actually learned from running it.</div>
            <div class="pl-2.5 border-l-2 border-ob-sand/30 text-ob-muted italic leading-snug text-[10px]">"Bare-metal Proxmox on a Beelink mini-PC — 32GB, 6-core. OPNsense VM handles routing and VLAN segmentation. Rocky Linux for Linux practice — Samba file server with autofs for on-demand mounting. Windows Server DC for AD. Prometheus and Grafana watching the whole stack. It's where I can break things, trace why they broke, and fix them."</div>
            <div class="text-ob-dim text-[10px]">The value isn't the tech stack — it's that you built and operated something real, and you understand why it works.</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Concept columns -->
    <div class="flex-1 min-h-0 grid grid-cols-3 gap-6 p-6">

      <!-- Col 1: Hypervisor + VLANs -->
      <div class="overflow-y-auto space-y-5 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">Hypervisor Concepts</div>
          <div class="space-y-1.5 text-[11px]">
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Type 1 (bare metal)</span><span class="text-ob-dim"> — runs directly on hardware, no host OS. Proxmox, ESXi, Hyper-V. Lower overhead, used in production.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Type 2 (hosted)</span><span class="text-ob-dim"> — runs on top of a host OS. VirtualBox, VMware Workstation. More overhead, fine for dev/test.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">KVM</span><span class="text-ob-dim"> — Linux kernel module that enables hardware virtualisation. Turns the kernel itself into a Type 1 hypervisor.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">QEMU</span><span class="text-ob-dim"> — device emulator. Provides virtual CPUs, NICs, and disks to VMs. Proxmox = KVM + QEMU + management layer.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">vmbr0</span><span class="text-ob-dim"> — Linux bridge. VMs attach to bridges, bridges attach to physical NICs. Default bridge for external connectivity.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">VLAN-aware bridge</span><span class="text-ob-dim"> — single bridge carries multiple VLANs via 802.1Q tags. Proxmox passes tagged frames to OPNsense unchanged.</span></span></div>
          </div>
        </div>

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">VLANs & Network Segmentation</div>
          <div class="space-y-1.5 text-[11px]">
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">VLAN</span><span class="text-ob-dim"> — logical network segment on shared physical infrastructure. Separates broadcast domains without physical separation.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">802.1Q</span><span class="text-ob-dim"> — tagging standard. Inserts a 4-byte tag into the Ethernet frame with a VLAN ID (1–4094). Switches read the tag to forward correctly.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">Access port</span><span class="text-ob-dim"> — carries one VLAN, strips and adds the tag transparently. End devices (VMs, PCs) never see the 802.1Q tag.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">Trunk port</span><span class="text-ob-dim"> — carries multiple VLANs with tags intact. Used between switches, and between Proxmox and OPNsense.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">Router on a stick</span><span class="text-ob-dim"> — one physical interface with sub-interfaces per VLAN. OPNsense does inter-VLAN routing this way — all traffic routes through it.</span></span></div>
            <div class="mt-2 pl-2.5 border-l-2 border-ob-text/18 text-[10px] text-ob-dim space-y-0.5 leading-snug">
              <div>Blast radius — compromise in one VLAN can't reach others without crossing the firewall.</div>
              <div>Security zones — dev, services, and management can each have different policies.</div>
              <div>Cleaner troubleshooting — traffic is where you expect it. Cross-VLAN surprises are visible.</div>
            </div>
          </div>
        </div>

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">Lab — Linux Anchors</div>

          <div class="text-[10px] text-ob-dim italic mb-1.5">autofs — on-demand mounting</div>
          <PrepCodeBlock :code="autofsSample" />

          <div class="text-[10px] text-ob-dim italic mt-4 mb-1.5">Samba file server — key ops</div>
          <PrepCodeBlock :code="sambaSample" />
        </div>

      </div>

      <!-- Col 2: Firewall + WireGuard -->
      <div class="overflow-y-auto space-y-5 min-h-0">

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-2">Firewall (OPNsense)</div>
          <div class="space-y-1.5 text-[11px]">
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Stateful</span><span class="text-ob-dim"> — tracks connection state table (SYN → ESTABLISHED → FIN). Return traffic automatically permitted. No explicit outbound rules needed for established sessions.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Stateless</span><span class="text-ob-dim"> — evaluates each packet independently. Both directions must be explicitly permitted. AWS NACLs work this way — the common gotcha.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Rule evaluation</span><span class="text-ob-dim"> — top-down, first match wins. Rules apply on the interface where traffic arrives, not where it is headed.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Implicit deny</span><span class="text-ob-dim"> — everything not explicitly permitted is dropped. The default is deny-all. No match = silent drop.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Anti-lockout rule</span><span class="text-ob-dim"> — OPNsense automatically preserves LAN → WebGUI access so you can't accidentally lock yourself out.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-amber-300/80">Aliases</span><span class="text-ob-dim"> — named objects (host, network, port range) referenced in rules. Update the alias once — every rule using it updates automatically.</span></span></div>
          </div>
        </div>

        <div>
          <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-1">WireGuard VPN</div>
          <div class="text-[10px] text-amber-400/60 mb-2">Partially set up — understand the model, didn't fully deploy</div>
          <div class="space-y-1.5 text-[11px]">
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">UDP-based</span><span class="text-ob-dim"> — default port 51820. Far simpler handshake than IPSec/IKE or OpenVPN TLS negotiation.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">Cryptokey routing</span><span class="text-ob-dim"> — each peer has a public key + AllowedIPs list. Packet decrypted, source IP checked against AllowedIPs — not listed = dropped.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">~4,000 lines of code</span><span class="text-ob-dim"> vs OpenVPN's ~600,000. Smaller attack surface, easier to audit, runs in the kernel itself.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">No CA needed</span><span class="text-ob-dim"> — just key pairs. <code class="text-emerald-400/70">wg genkey | tee private.key | wg pubkey > public.key</code></span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><span class="text-sky-400/80">Roaming-friendly</span><span class="text-ob-dim"> — if the client IP changes (mobile, switching networks), tunnel reconnects automatically via the key.</span></span></div>
            <div class="flex gap-1.5"><span class="text-ob-faint shrink-0 mt-0.5">•</span><span><code class="text-emerald-400/80">wg show</code><span class="text-ob-dim"> — peer status, last handshake, bytes transferred. Recent handshake = tunnel alive.</span></span></div>
          </div>
        </div>

      </div>

      <!-- Col 3: Probes -->
      <div class="overflow-y-auto space-y-3 min-h-0">
        <div class="text-[10px] uppercase tracking-widest text-ob-sand font-semibold mb-1">Interview Probes</div>

        <div
          v-for="probe in probes"
          :key="probe.q"
          class="rounded-lg bg-ob-surface2/40 border border-ob-text/16 p-3"
        >
          <div class="text-sky-300/80 text-[12px] leading-relaxed mb-2">{{ probe.q }}</div>
          <ul class="border-l-2 border-ob-text/18 pl-2.5 space-y-1">
            <li
              v-for="(point, i) in probe.a"
              :key="i"
              class="flex gap-1.5 items-start text-ob-muted text-[11px] leading-relaxed"
            >
              <span class="text-ob-faint shrink-0 mt-0.5 select-none">›</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import PrepCodeBlock from './PrepCodeBlock.vue'

const autofsSample = String.raw`# /etc/auto.master — master map
# tells autofs which directories to manage and which map file to use
/mnt/shares  /etc/auto.shares  --timeout=300
#  ^mount point  ^map file         ^unmount after 300s idle

# /etc/auto.shares — the map file
# format: <key>  <mount-options>  <location>
docs  -fstype=cifs,credentials=/etc/smb-creds,uid=1000  ://fileserver/docs
data  -fstype=cifs,credentials=/etc/smb-creds,uid=1000  ://fileserver/data

# On-demand: ls /mnt/shares/docs → autofs intercepts,
# mounts the share, delivers data. Idle 300s → unmounts automatically.
# Nothing mounted at boot — no stale mounts if the server is down.

systemctl enable --now autofs
systemctl status autofs
automount -f -v   # foreground + verbose — good for debugging`

const sambaSample = String.raw`testparm              # validate smb.conf before restarting — always run this first
smbstatus             # active connections + open files
pdbedit -L            # list Samba user database

# Test share access from a client
smbclient -L //fileserver -U username     # list available shares
smbclient //fileserver/docs -U username   # connect to a specific share

# Check if Samba services are running
systemctl status smb nmb`

const probes = [
  {
    q: 'Walk me through your home lab.',
    a: [
      'Bare-metal Proxmox on a Beelink mini-PC — 32GB, 6-core. OPNsense VM handles routing, VLAN segmentation, and WireGuard VPN.',
      'Rocky Linux VMs for Linux practice. Samba file server joined to the AD domain. Windows Server 2022 DC for AD and GPO work.',
      'Prometheus and Grafana watching the whole stack. Vault for internal PKI.',
      "It's where I can break things, trace why they broke, and fix them — that's the value.",
    ],
  },
  {
    q: 'Type 1 vs Type 2 hypervisor — practical difference?',
    a: [
      'Type 1 runs directly on hardware — Proxmox, ESXi. The hypervisor is the only layer between hardware and VMs. Lower overhead, used in production.',
      'Type 2 runs on a host OS — VirtualBox, VMware Workstation. Host OS adds overhead and resource contention. Convenient for dev/test.',
      'Proxmox is Type 1: KVM (kernel module, hardware virtualisation) + QEMU (device emulation) + the Proxmox management layer on top.',
    ],
  },
  {
    q: 'How does VLAN segmentation work in your lab?',
    a: [
      'Proxmox has a VLAN-aware Linux bridge. VMs are assigned VLAN IDs — Proxmox passes 802.1Q tagged frames to OPNsense via a trunk interface.',
      'OPNsense has a sub-interface per VLAN and does router-on-a-stick inter-VLAN routing.',
      'Firewall rules on each interface control which VLANs can reach which. Management VLAN is restricted by default.',
    ],
  },
  {
    q: 'What does a stateful firewall actually track?',
    a: [
      'A connection state table — TCP state (SYN, ESTABLISHED, FIN/TIME_WAIT) and for UDP, recent packet tuples.',
      'Because it knows which connections are established, return traffic is automatically permitted. No explicit outbound rule needed.',
      'Stateless evaluates each packet independently — both directions need explicit rules. AWS NACLs work this way.',
    ],
  },
  {
    q: 'Why segment the network at all?',
    a: [
      'Blast radius — compromise in one VLAN cannot reach others without crossing the firewall.',
      'Security zones — management, dev, and services can each have different policies.',
      'Easier troubleshooting — traffic is where you expect it to be. Cross-VLAN surprises are visible immediately.',
    ],
  },
  {
    q: 'You mentioned WireGuard — did you get it fully working?',
    a: [
      "Partially — configured the OPNsense side but didn't complete the client setup. I'd be upfront about that.",
      'I understand the model well: cryptokey routing, UDP-based, key pairs instead of certificates, runs in-kernel.',
      "The honest answer is I know how it works and what I'd do to finish it — I just haven't crossed the finish line on this one yet.",
    ],
  },
  {
    q: "What's a trunk port vs an access port?",
    a: [
      'Access port: carries one VLAN, strips the 802.1Q tag before delivering to the end device. The device never sees the tag.',
      'Trunk port: carries multiple VLANs with tags intact. Used between switches, and between Proxmox and OPNsense.',
      'In the lab: the link from Proxmox to OPNsense is a trunk — OPNsense sees tagged frames for each VLAN and routes accordingly.',
    ],
  },
]
</script>
