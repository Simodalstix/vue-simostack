<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Infrastructure Lab – Proxmox & Enterprise Linux"
  >
    <div class="text-ob-muted2 space-y-3 text-base px-2 sm:px-4">
     <!-- Overview -->
<section class="rounded-xl p-3">
  <p class="text-ob-muted2 leading-relaxed">
    Bare-metal Proxmox lab running on a Beelink mini-PC (32GB RAM, 6-core AMD Ryzen 9, 1TB NVMe). This is where I learn, administer, and experiment with Linux systems, VMs, and networking—building practical experience with enterprise infrastructure patterns outside of cloud environments.
  </p>
</section>



      <!-- Services grid -->
      <section class="rounded-xl p-3">
        <h3 class="font-semibold text-lg text-ob-text mb-2">Core services</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            @click="$emit('open-dc1')"
            class="rounded-xl border border-ob-sand/16 p-3 hover:border-ob-teal/40 hover:bg-ob-surface transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/windows.svg" alt="Windows" class="w-6 h-6" />
              <img src="/images/project-icons/ad.png" alt="AD" class="w-6 h-6" />
              <p class="text-sm font-semibold text-ob-text">Active Directory (DC1 + GPO)</p>
            </div>
            <p class="text-sm text-ob-muted2">
              Windows Server 2022 domain controller used for identity, DNS, and policy.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-fileserver')"
            class="rounded-xl border border-ob-sand/16 p-3 hover:border-ob-teal/40 hover:bg-ob-surface transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-6 h-6" />
              <img src="/images/project-icons/samba.png" alt="Samba" class="w-10 h-5" />
              <p class="text-sm font-semibold text-ob-text">Rocky Linux File Server (Samba)</p>
            </div>
            <p class="text-sm text-ob-muted2">
              Centralised shares for lab clients with permissions and access control testing.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-prometheus')"
            class="rounded-xl border border-ob-sand/16 p-3 hover:border-ob-teal/40 hover:bg-ob-surface transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/prometheus-icon.svg" alt="Prometheus" class="w-6 h-6" />
              <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-6 h-6" />
              <p class="text-sm font-semibold text-ob-text">Monitoring (Prometheus + Grafana)</p>
            </div>
            <p class="text-sm text-ob-muted2">
              Observability for hosts and services; dashboards and alert experiments.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-vault')"
            class="rounded-xl border border-ob-sand/16 p-3 hover:border-ob-teal/40 hover:bg-ob-surface transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/vault.svg" alt="Vault" class="w-6 h-6" />
              <p class="text-sm font-semibold text-ob-text">Vault PKI (Certificates + Secrets)</p>
            </div>
            <p class="text-sm text-ob-muted2">
              Automated PKI setup and internal cert issuance patterns for services.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-opnsense')"
            class="rounded-xl border border-ob-sand/16 p-3 hover:border-ob-teal/40 hover:bg-ob-surface transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/opnsense.webp" alt="OPNsense" class="w-6 h-6" />
              <p class="text-sm font-semibold text-ob-text">Firewall / VPN (Legacy Reference)</p>
            </div>
            <p class="text-sm text-ob-muted2">
              Earlier routing and VPN experiments preserved as a reference setup.
            </p>
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-ob-sand/16 pt-3 flex items-center justify-between text-sm text-ob-muted2">
        <span><span class="font-medium">Status:</span> Active lab environment</span>
        <span class="text-ob-dim">Systems Infrastructure</span>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close', 'open-dc1', 'open-fileserver', 'open-prometheus', 'open-vault', 'open-opnsense'])
import BaseModal from '../BaseModal.vue'
</script>