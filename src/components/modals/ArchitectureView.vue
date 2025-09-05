<template>
  <BaseModal :visible="visible" @close="$emit('close')" title="Zero-Trust Security Platform">
    <!-- Top row: diagram + sidebar -->
    <div class="flex flex-col md:flex-row text-gray-200">
      <!-- Left: Architecture Diagram -->
      <div class="md:w-2/3 p-4">
        <!-- <img
          src="/images/project-modal-images/zero-trust-security-diagram.svg"
          alt="Zero-Trust Security Platform Architecture"
          class="object-contain rounded-lg w-full"
        /> -->
      </div>

      <!-- Right: Description + Security Controls -->
      <aside class="w-full md:w-1/3 bg-gray-700 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 class="font-bold text-lg text-red-300">Description</h3>
          <p class="text-base text-gray-300">
            Enterprise zero-trust security platform with HashiCorp Vault for secret management,
            Wazuh SIEM for threat detection, and automated PKI for certificate lifecycle. Deployed
            across multi-platform infrastructure with comprehensive monitoring and automated
            incident response.
          </p>
        </div>

        <div>
          <h3 class="font-bold text-lg text-red-300">Security Architecture</h3>
          <p class="text-base text-gray-300">
            Principle of least privilege enforced through Vault policies; mTLS everywhere with
            automated certificate rotation; real-time threat detection with custom Wazuh rules;
            automated credential rotation and incident containment; complete audit trails for
            compliance frameworks.
          </p>
        </div>
      </aside>
    </div>

    <!-- Row: Components, Integration, Operations -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-800 text-gray-200 border-t border-gray-700"
    >
      <div>
        <h3 class="font-bold text-lg mb-2 text-red-300">Core Components</h3>
        <p class="text-sm text-gray-300 mb-2">
          HashiCorp Vault cluster with HA Raft storage for dynamic secrets and PKI. Wazuh SIEM with
          custom detection rules for security events. Internal Certificate Authority with automated
          lifecycle management.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-red-300">Integration</h3>
        <p class="text-sm text-gray-300 mb-2">
          Jenkins CI/CD with Vault credential injection. ELK Stack enhanced with security analytics.
          File server with Vault authentication. Cross-platform monitoring via Wazuh agents on all
          infrastructure.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2 text-red-300">Operations</h3>
        <p class="text-sm text-gray-300 mb-2">
          Automated threat response with IP blocking and credential rotation. SOC2/PCI-DSS
          compliance reporting. Certificate rotation policies. Single-command deployment with
          Infrastructure as Code.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4"
    >
      <div class="w-full sm:w-2/3 text-gray-300">
        <span class="font-medium">Problem & scope:</span>
        Modern enterprises need zero-trust security across hybrid infrastructure. This platform
        provides centralized secret management, real-time threat detection, and automated
        certificate lifecycle management with enterprise-grade compliance and incident response
        capabilities.
      </div>

      <div class="flex gap-3 w-full sm:w-auto">
        <a
          href="https://github.com/simodalstix/ansible-security-platform"
          target="_blank"
          class="bg-red-700 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          View on GitHub
        </a>
        <a
          href="https://www.vaultproject.io/docs/what-is-vault"
          target="_blank"
          class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          HashiCorp Vault
        </a>
      </div>
    </footer>
  </BaseModal>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
import BaseModal from './BaseModal.vue'
</script>
