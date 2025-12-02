<template>
  <div class="text-white container mx-auto px-6 py-8 max-w-6xl">
    <!-- Header (no redundant paragraph) -->
    <section class="text-center mb-6">
      <h1 class="text-4xl font-bold">My Skills & Certifications</h1>
    </section>

    <!-- Certification Strip -->
    <section
      class="mb-4 rounded-xl  bg-slate-900/70 px-6 py-5 max-w-5xl mx-auto"
    >
      <div class="flex flex-wrap justify-center gap-6 md:gap-8">
        <!-- ITIL -->
        <div class="flex flex-col items-center">
          <ITILCertification :visible="showITILModal" @close="showITILModal = false" />
          <img
            src="/images/certifications/itil.png"
            class="w-16 md:w-28 lg:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 rounded"
            @click="showITILModal = true"
          />
          
        </div>

        <!-- A+ -->
        <div class="flex flex-col items-center">
          <APlus :visible="showAPlusModal" @close="showAPlusModal = false" />
          <img
            src="/images/certifications/a-plus.png"
            class="w-16 md:w-28 lg:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 cursor-pointer rounded"
            @click="showAPlusModal = true"
          />
        
        </div>

        <!-- Security+ -->
        <div class="flex flex-col items-center">
          <SecurityPlus :visible="showSecurityPlusModal" @close="showSecurityPlusModal = false" />
          <img
            src="/images/certifications/securityplus.png"
            class="w-16 md:w-28 lg:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 cursor-pointer rounded"
            @click="showSecurityPlusModal = true"
          />
         
        </div>
<div class="flex flex-col items-center">
  <PCAPModal :visible="showPCAPModal" @close="showPCAPModal = false" />
  <img
    src="/images/certifications/pcap.png"
    class="w-16 md:w-28 lg:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 cursor-pointer rounded"
    @click="showPCAPModal = true"
    alt="Python Institute PCAP – Certified Associate in Python Programming"
  />
 
</div>
        <!-- AWS Cloud Practitioner -->
        <div class="flex flex-col items-center">
          <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
          <img
            src="/images/certifications/Cloud_Practitioner.png"
            class="w-16 md:w-28 lg:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 cursor-pointer rounded"
            @click="showPractitionerModal = true"
          />
         
        </div>

        <!-- Azure Administrator -->
        <div class="flex flex-col items-center">
          <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
          <img
            src="/images/certifications/azure-admin.png"
            class="w-16 md:w-28 lg:w-28 hover:drop-shadow-[0_0_16px_rgba(150,150,200,0.8)] transition-all duration-300 cursor-pointer rounded"
            @click="showAzureAmin = true"
          />
      

        </div>  
        
      </div>

      <p class="mt-6 text-sm md:text-base text-center text-gray-200 leading-relaxed">
  These certifications provide a solid grounding for customer success and technical support roles,
  covering ITIL processes, OS and hardware fundamentals, core security concepts, Microsoft 365 /
  Entra ID administration, and cloud environment proficiency.
</p>


    </section>

    <!-- Unified Dual-Role Gradient Card -->
    <section
  class="rounded-2xl border border-slate-700 bg-gradient-to-br from-cyan-800 to-slate-900 px-6 py-6 max-w-6xl mx-auto"
>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- LEFT: Customer Success / SaaS Support -->
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3">Customer Success & SaaS Support</h2>

          <p class="text-gray-200 leading-relaxed">
            Experience in <span class="text-cyan-300">ticketed SaaS environments</span> where
            clear communication, tone, and follow-up matter. Comfortable handling first contact
            through <span class="text-cyan-300">Dialpad</span>, email, and live chat, and carrying
            a case through to resolution.
          </p>

          <p class="text-gray-200 leading-relaxed mt-3">
            Experienced with <span class="text-cyan-300">TeamViewer</span> and
            <span class="text-cyan-300">RDP</span> for guided sessions, configuration changes, and
            assisting with <span class="text-cyan-300">installs</span> or workflow fixes.
            Accurate, clear case notes maintained in
            <span class="text-cyan-300">ServiceNow</span> and
            <span class="text-cyan-300">HubSpot</span>.
          </p>

          <p class="text-gray-200 leading-relaxed mt-3">
            Collaboration with engineering via <span class="text-cyan-300">Slack</span>, sharing
            structured repro steps, logs, and screenshots – not just forwarding tickets. Customer
            background from <span class="text-cyan-300">pharmacy</span> reinforces accuracy and a
            calm approach with <span class="text-cyan-300">stressed customers</span>.
          </p>
        </div>

        <!-- RIGHT: Technical Support / Troubleshooting -->
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3">Technical Support & Troubleshooting</h2>

          <p class="text-gray-200 leading-relaxed">
  Works directly with <span class="text-cyan-300">Microsoft 365</span>,
  <span class="text-cyan-300">Entra ID</span>, and
  <span class="text-cyan-300">Active Directory</span> to diagnose identity,
  access, licensing, and <span class="text-cyan-300">security group</span> issues.
  Breaks down sign-in failures with structured checks that reveal the actual cause.
</p>


          <p class="text-gray-200 leading-relaxed mt-3">
            Familiar with <span class="text-cyan-300">Intune</span> for onboarding, compliance,
            and <span class="text-cyan-300">application installs</span>. On
            <span class="text-cyan-300">Windows 10/11</span> and Linux, uses logs, event viewer,
            service states, and focused <span class="text-cyan-300">PowerShell</span> /
            <span class="text-cyan-300">Bash</span> commands instead of guesswork.
          </p>

          <p class="text-gray-200 leading-relaxed mt-3">
            <span class="text-cyan-300">Azure Admin</span> and
            <span class="text-cyan-300">AWS CP</span> provide context when issues involve
            <span class="text-cyan-300">APIs</span>,
            <span class="text-cyan-300">IAM</span>, or cloud-backed services. Able to identify
            whether a problem is likely endpoint, identity, or platform-side and communicate that
            clearly to both users and engineers.
          </p>
        </div>
      </div>
    </section>
  </div>

  <!-- Modals -->
  <AWSPractioner :visible="showPractitionerModal" @close="showPractitionerModal = false" />
  <SecurityPlus :visible="showSecurityPlusModal" @close="showSecurityPlusModal = false" />
  <AzureAdministrator :visible="showAzureAmin" @close="showAzureAmin = false" />
  <APlus :visible="showAPlusModal" @close="showAPlusModal = false" />
  <ITILCertification :visible="false" @close="false" />
</template>

<script setup>
import { ref } from 'vue'
import AWSPractioner from '../components/modals/AWSPractioner.vue'
import AzureAdministrator from '../components/modals/AzureAdministrator.vue'
import SecurityPlus from '../components/modals/SecurityPlus.vue'
import APlus from '../components/modals/CompTIA-A+.vue'
import ITILCertification from '../components/modals/ITIL-Certification.vue'
import PCAPModal from '../components/modals/PythonModal.vue'
const showPCAPModal = ref(false);

const showITILModal = ref(false)
const showAPlusModal = ref(false)
const showSecurityPlusModal = ref(false)
const showAzureAmin = ref(false)
const showPractitionerModal = ref(false)
</script>
