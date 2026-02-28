<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Infrastructure Lab – Proxmox & Enterprise Linux (revamp progress)""
  >
    <div class="text-gray-200 space-y-4 text-base px-2 sm:px-4">
     <!-- Overview -->
<section class="bg-slate-900 rounded-xl p-4 border border-slate-700/60">
  <p class="text-gray-300 leading-relaxed">
    Ongoing home lab built on a Proxmox host to simulate realistic enterprise
    infrastructure. The environment includes Windows–Linux identity integration,
    monitoring, PKI, and file services, allowing me to test and troubleshoot
    infrastructure in a controlled setting.
  </p>
</section>



      <!-- Services grid -->
      <section class="bg-slate-900 rounded-xl p-4 border border-slate-700/60">
        <h3 class="font-semibold text-lg text-slate-100 mb-3">Core services</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl border border-slate-700/60 p-3 hover:border-slate-400 transition-colors">
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/windows.svg" alt="Windows" class="w-6 h-6" />
              <img src="/images/project-icons/ad.png" alt="AD" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Active Directory (DC1 + GPO)</p>
            </div>
            <p class="text-sm text-gray-300">
              Windows Server 2022 domain controller used for identity, DNS, and policy.
            </p>
          </div>

          <div class="rounded-xl border border-slate-700/60 p-3 hover:border-slate-400 transition-colors">
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/rocky.svg" alt="Rocky" class="w-6 h-6" />
              <img src="/images/project-icons/samba.png" alt="Samba" class="w-10 h-5" />
              <p class="text-sm font-semibold text-slate-100">Rocky Linux File Server (Samba)</p>
            </div>
            <p class="text-sm text-gray-300">
              Centralised shares for lab clients with permissions and access control testing.
            </p>
          </div>

          <div class="rounded-xl border border-slate-700/60 p-3 hover:border-slate-400 transition-colors">
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/prometheus-icon.svg" alt="Prometheus" class="w-6 h-6" />
              <img src="/images/project-icons/grafana.png" alt="Grafana" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Monitoring (Prometheus + Grafana)</p>
            </div>
            <p class="text-sm text-gray-300">
              Observability for hosts and services; dashboards and alert experiments.
            </p>
          </div>

          <div class="rounded-xl border border-slate-700/60 p-3 hover:border-slate-400 transition-colors">
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/vault.svg" alt="Vault" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Vault PKI (Certificates + Secrets)</p>
            </div>
            <p class="text-sm text-gray-300">
              Automated PKI setup and internal cert issuance patterns for services.
            </p>
          </div>

          <div class="rounded-xl border border-slate-700/60 p-3 hover:border-slate-400 transition-colors sm:col-span-2">
            <div class="flex items-center gap-2 mb-1">
              <img src="/images/project-icons/opnsense.webp" alt="OPNsense" class="w-6 h-6" />
              <p class="text-sm font-semibold text-slate-100">Firewall / VPN (Legacy Reference)</p>
            </div>
            <p class="text-sm text-gray-300">
              Earlier routing and VPN experiments preserved as a reference setup.
            </p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-gray-700 pt-3 flex items-center justify-between text-sm text-gray-300">
        <span><span class="font-medium">Status:</span> Active lab environment</span>
        <span class="text-gray-400">Systems Infrastructure</span>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>