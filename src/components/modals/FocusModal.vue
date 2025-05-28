<template>
  <BaseModal :visible="visible" @close="$emit('close')" width="max-w-3xl">
    <div class="p-3 space-y-4">
      <p class="text-sm text-gray-300 mb-2">
        These tools represent the core technologies I’m actively exploring and incorporating into
        new real-world, production-grade projects. My goal is to deepen practical skills across
        automation, monitoring, and platform engineering — and demonstrate the kind of readiness
        that hiring teams value in complex, real-world environments.
      </p>
      <div class="grid md:grid-cols-2 gap-4">
        <Card title="Monitoring & Observability">
          <div class="flex items-center space-x-3 mb-1">
            <img src="/images/focus/prometheus.svg" alt="Prometheus" class="h-20" />
            <div>
              <p class="font-semibold text-sm">Prometheus</p>
              <p class="text-xs text-gray-300">
                I'm keen to learn Prometheus to build hands-on experience with container-native
                monitoring and alerting, especially within Kubernetes environments. I recognize its
                importance for understanding how production systems behave in real time.
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <img src="/images/focus/dynatrace-icon.svg" alt="Dynatrace" class="h-20" />
            <div>
              <p class="font-semibold text-sm">Dynatrace</p>
              <p class="text-xs text-gray-300">
                I'm going to focus on exploring Dynatrace for its enterprise-grade observability. I
                understand its capabilities for AI-driven insights, auto-discovery, and performance
                tracing across complex systems, and I see it as a valuable platform used in
                high-scale environments.
              </p>
            </div>
          </div>
        </Card>

        <!-- Row 2: Technical Focus Areas -->

        <Card title="Industry Foundations">
          <div class="flex items-center space-x-3 mb-2">
            <img src="/images/focus/vmware.svg" alt="VMware" class="h-20" />
            <div>
              <p class="font-semibold text-sm">VMware & vSphere</p>
              <p class="text-xs text-gray-300">
                I want to learn the foundations of VMware and vSphere because I understand these
                technologies are deeply embedded in large enterprise environments. I believe
                understanding virtualization helps bridge my cloud skills with real-world hybrid
                infrastructure.
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <img src="/images/focus/azure-ad.svg" alt="Active Directory" class="h-20" />
            <div>
              <p class="font-semibold text-sm">Active Directory</p>
              <p class="text-xs text-gray-300">
                I'm planning to build hands-on experience with Active Directory to strengthen my
                understanding of identity, group policy, and authentication. I recognize these as
                key skills for working in real-world enterprise and hybrid cloud environments.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Automation & Ops">
          <div class="flex items-center space-x-3 mb-2">
            <img src="/images/focus/ansible.svg" alt="Ansible" class="h-20" />
            <div>
              <p class="font-semibold text-sm">Ansible</p>
              <p class="text-xs text-gray-300">
                I'm adopting Ansible as a key focus to learn Linux configuration and system
                patching. I see it as an essential tool for reliable, repeatable operations,
                especially valuable in hybrid or enterprise environments.
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <img src="/images/focus/jenkins.svg" alt="Jenkins" class="h-20" />
            <div>
              <p class="font-semibold text-sm">Jenkins</p>
              <p class="text-xs text-gray-300">
                I'm going to focus on using Jenkins to build deeper CI/CD automation workflows. I'm
                aware of its strengths in managing pipelines that integrate infrastructure
                deployment, testing, and application delivery.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Platform Engineering">
          <div class="flex items-center space-x-3 mb-2">
            <img src="/images/focus/kubernetes.svg" alt="Kubernetes" class="h-20" />
            <div>
              <p class="font-semibold text-sm">Kubernetes</p>
              <p class="text-xs text-gray-300">
                I'm making it a priority to build core Kubernetes skills to understand how modern
                applications are deployed, scaled, and managed. I recognize its foundational role in
                delivering resilient, self-healing infrastructure at scale.
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <img src="/images/focus/openshift.svg" alt="OpenShift" class="h-20" />
            <div>
              <p class="font-semibold text-sm">OpenShift</p>
              <p class="text-xs text-gray-300">
                I'm focused on learning OpenShift to align with enterprise-grade Kubernetes
                platforms and Red Hat's ecosystem. I see this as a key step in my path toward
                mastering production-ready orchestration and platform engineering.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div></BaseModal
  >
</template>

<script setup>
import Card from '@/components/ui/BaseCard.vue'
import BaseModal from './BaseModal.vue'
defineProps({ visible: Boolean })
defineEmits(['close'])
</script>
