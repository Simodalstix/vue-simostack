<template>
  <div class="bg-gray-800 p-6 rounded shadow space-y-4">
    <div class="flex flex-col justify-between h-full">
      <!-- Profile Section -->
      <div class="text-center">
        <img
          src="/images/profile-pic/Profile_Picture.png"
          alt="Profile"
          class="rounded-full w-40 h-auto mx-auto border-4 border-white shadow-md"
        />
        <h2 class="text-2xl font-bold mt-4 border-b-2 border-indigo-500 pb-1">Simon Parker</h2>
        <p class="font-semibold text-cyan-400 mt-2 mb-2 text-sm">~/scientist/pharmacist/engineer</p>
        <p class="text-sm text-gray-300 leading-relaxed">
          I’ve made the leap from healthcare to cloud. Backed by a decade of professional
          experience, I bring reliability, clear communication, and an intense drive to learn and
          build. From AWS and Python to infrastructure and support, I’m hands-on, self-motivated,
          and focused on solving meaningful problems with modern tech.
        </p>

        <!-- Recent Role Button (Compact Profile Section Version) -->
        <div
          @click="showRole = true"
          class="mx-auto mt-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-400 transition duration-200 rounded flex items-center justify-between px-3 h-12 cursor-pointer gap-3"
        >
          <!-- Left Text -->
          <div class="flex flex-col text-left leading-tight">
            <p class="text-xs text-gray-200 font-medium">Customer Success</p>
            <p class="text-xs text-gray-400">Strongroom.AI</p>
          </div>

          <!-- Right Logo -->
          <div class="h-full">
            <img
              src="/images/profile-pic/StrongroomLogo.jpg"
              alt="Company Logo"
              class="h-full w-auto object-cover rounded"
            />
          </div>
        </div>

        <!-- Modal component rendered reactively -->
        <StrongRoomModal :visible="showRole" @close="showRole = false" />
      </div>

      <!-- Powered by AWS Section -->
      <section class="mt-6">
        <h3 class="text-xl font-semibold mb-2 border-b-2 border-indigo-500 pb-1 text-center">
          Website Powered by AWS
        </h3>
        <div class="flex justify-center gap-2">
          <img
            src="/images/aws-icons/SimpleStorageService.png"
            alt="S3"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'Amazon Simple Storage Service (S3) stores and serves all the static content for this website, including HTML, images, and assets.'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          />
          <img
            src="/images/aws-icons/CloudFront.png"
            alt="CloudFront"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'Amazon CloudFront is a global Content Delivery Network (CDN) that caches and delivers this website quickly from edge locations.'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          />
          <img
            src="/images/aws-icons/Route53.png"
            alt="Route53"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'Amazon Route 53 provides DNS routing, directing traffic from my custom domain to the CloudFront distribution'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          />
          <img
            src="/images/aws-icons/CertificateManager.png"
            alt="ACM"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'AWS Certificate Manager (ACM) provisions and manages the free SSL certificate to enable secure HTTPS connections.'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          /><img
            src="/images/aws-icons/APIGateway.svg"
            alt="S3"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'Amazon API Gateway securely handles all API requests and routes them to backend services.'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          /><img
            src="/images/aws-icons/Lambda.svg"
            alt="S3"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'AWS Lambda runs backend code automatically in response to events — no servers to manage.'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          />
          <img
            src="/images/aws-icons/DynamoDB.svg"
            alt="S3"
            class="w-10 cursor-pointer rounded-md hover:opacity-80"
            @mouseover="
              awsInfo =
                'Amazon DynamoDB is a fast, serverless NoSQL database used to store API data reliably.'
            "
            @mouseout="awsInfo = defaultAwsInfo"
          />
        </div>
        <!-- Fixed-height info box to prevent layout shift -->
        <div
          id="awsInfoBox"
          class="mt-4 text-center text-sm font-semibold text-gray-200 h-10 flex items-center justify-center"
        >
          {{ awsInfo }}
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StrongRoomModal from './modals/StrongRoomModal.vue'
const defaultAwsInfo = 'Hover over an icon to learn more.'
const awsInfo = ref(defaultAwsInfo)
const showRole = ref(false)
</script>
