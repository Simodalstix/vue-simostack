<script setup>
defineProps({
  visible: Boolean,
})
defineEmits(['close'])

import BaseModal from './BaseModal.vue'
</script>

<template>
  <BaseModal
    :visible="visible"
    @close="$emit('close')"
    title="Certifications in Progress"
    width="max-w-6xl"
  >
    <div class="bg-gray-700 p-6 rounded space-y-6 text-white">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- RHCSA -->
        <div class="space-y-3">
          <h3 class="font-bold text-xl mb-2 text-orange-300">
            Red Hat Certified System Administrator (RHCSA)
          </h3>
          <p><b>Status:</b> Current main focus. Exam to sit very soon.</p>
          <p>
            <b>Motivation:</b> Foundation for success — to gain the necessary administration skills
            to feel at home piloting Linux environments and be effective across cloud,
            infrastructure, DevOps, and security roles.
          </p>
          <p>
            <b>Outcome / Up next:</b> This certification lays the groundwork for Red Hat Certified
            Engineer (RHCE), where I’ll deepen my automation skills with Ansible. It also sets the
            path toward Kubernetes and OpenShift.
          </p>
        </div>

        <!-- Security+ -->
        <div class="space-y-3">
          <h3 class="font-bold text-xl mb-2 text-orange-300">CompTIA Security+</h3>
          <p><b>Status:</b> Blitzing through, aiming to sit immediately after RHCSA.</p>
          <p>
            <b>Motivation:</b> Gain a necessary HR/recruiter tick box. I also genuinely want to
            understand the security landscape at a high level — critical for diving deeper and
            specializing.
          </p>
          <p>
            <b>Outcome / Up next:</b> Once complete, I’ll move onto more technical and hands-on
            certifications like HTB's CDSA. That will position me for real-world SOC Analyst roles.
          </p>
        </div>

        <!-- AWS DevOps Pro -->
        <div class="space-y-3">
          <h3 class="font-bold text-xl mb-2 text-orange-300">AWS DevOps Engineer – Professional</h3>
          <p><b>Status:</b> Mostly finished — currently paused for RHCSA.</p>
          <p>
            <b>Motivation:</b> I’ve been drawn to this certification ever since I started with AWS
            Cloud Practitioner. It felt like the natural endpoint — the cert that covers what
            actually matters in the field. It pushes you to know the full lifecycle: pipelines, IaC,
            automation, and monitoring — the kind of skills needed to build scalable, self-healing
            infrastructure. It signals my readiness to step into a serious cloud engineering role.
          </p>
          <p>
            <b>Outcome / Up next:</b> This certification proves credibility for cloud engineering
            roles. Targeting Solutions Architect Professional and Security Specialty next for true
            mastery
          </p>
        </div>

        <!-- HTB CDSA -->
        <div class="space-y-3">
          <h3 class="font-bold text-xl mb-2 text-orange-300">
            HTB Certified Defensive Security Analyst (CDSA)
          </h3>
          <p><b>Status:</b> Underway, occasionally stealing focus from RHCSA</p>
          <p>
            <b>Motivation:</b> This is a non-conventional, trailblazing choice — I deliberately
            sought out HTB CDSA because it offers one of the most respected, hands-on security
            training experiences available. The exam tests real-world incident response across
            complex environments, with no multiple-choice questions. It aligns with my drive to
            train like a true analyst and pursue work grounded in real detection and response.
          </p>
          <p>
            <b>Outcome / Up next:</b> I’m aiming to build toward SOC Analyst readiness and pursue
            the SSCP certification. This cert is my launchpad into professional blue team
            operations.
          </p>
        </div>
      </div>

      <p class="text-sm text-center text-gray-400 italic mt-4">
        “We are what we repeatedly do. Excellence, then, is not an act but a habit.”
      </p>
    </div>
  </BaseModal>
</template>
