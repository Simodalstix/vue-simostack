<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Infrastructure Lab – Proxmox & Enterprise Linux"
  >
    <div class="text-slate-200 space-y-3 text-base px-2 sm:px-4">
     <!-- Overview -->
<section class="rounded-xl p-3">
  <p class="text-slate-300 leading-relaxed">
    Bare-metal Proxmox lab running on a Beelink mini-PC (32GB RAM, 6-core AMD Ryzen 9, 1TB NVMe). This is where I learn, administer, and experiment with Linux systems, VMs, and networking—building practical experience with enterprise infrastructure patterns outside of cloud environments.
  </p>
</section>



      <!-- Services grid -->
      <section class="rounded-xl p-3">
        <h3 class="font-semibold text-lg text-slate-100 mb-2">Core services</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            @click="$emit('open-dc1')"
            class="rounded-xl border border-slate-700/60 p-3 hover:border-cyan-400 hover:bg-slate-800/50 transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/windows.svg" alt="Windows" class="w-6 h-6" />
              <img src="/images/project-icons/ad.png" alt="AD" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Active Directory (DC1 + GPO)</p>
            </div>
            <p class="text-sm text-slate-300">
              Windows Server 2022 domain controller used for identity, DNS, and policy.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-fileserver')"
            class="rounded-xl border border-slate-700/60 p-3 hover:border-cyan-400 hover:bg-slate-800/50 transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-6 h-6" />
              <img src="/images/project-icons/samba.png" alt="Samba" class="w-10 h-5" />
              <p class="text-sm font-semibold text-slate-100">Rocky Linux File Server (Samba)</p>
            </div>
            <p class="text-sm text-slate-300">
              Centralised shares for lab clients with permissions and access control testing.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-prometheus')"
            class="rounded-xl border border-slate-700/60 p-3 hover:border-cyan-400 hover:bg-slate-800/50 transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/prometheus-icon.svg" alt="Prometheus" class="w-6 h-6" />
              <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Monitoring (Prometheus + Grafana)</p>
            </div>
            <p class="text-sm text-slate-300">
              Observability for hosts and services; dashboards and alert experiments.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-vault')"
            class="rounded-xl border border-slate-700/60 p-3 hover:border-cyan-400 hover:bg-slate-800/50 transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/vault.svg" alt="Vault" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Vault PKI (Certificates + Secrets)</p>
            </div>
            <p class="text-sm text-slate-300">
              Automated PKI setup and internal cert issuance patterns for services.
            </p>
          </button>

          <button
            type="button"
            @click="$emit('open-opnsense')"
            class="rounded-xl border border-slate-700/60 p-3 hover:border-cyan-400 hover:bg-slate-800/50 transition-all text-left w-full cursor-pointer"
          >
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/opnsense.webp" alt="OPNsense" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Firewall / VPN (Legacy Reference)</p>
            </div>
            <p class="text-sm text-slate-300">
              Earlier routing and VPN experiments preserved as a reference setup.
            </p>
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-slate-700 pt-3 flex items-center justify-between text-sm text-slate-300">
        <span><span class="font-medium">Status:</span> Active lab environment</span>
        <span class="text-slate-400">Systems Infrastructure</span>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close', 'open-dc1', 'open-fileserver', 'open-prometheus', 'open-vault', 'open-opnsense'])
import BaseModal from './BaseModal.vue'
</script>