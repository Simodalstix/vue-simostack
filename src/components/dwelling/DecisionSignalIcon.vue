<template>
  <span class="inline-flex" role="img" :aria-label="label">
    <svg
      v-if="kind === 'beach'"
      class="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <path d="M4 19h16M7 15c3-1 5 1 8 0 2-.6 3-.5 4 0" />
      <path d="M11 18c1-4 1-7 .5-10" />
      <path
        d="M11.5 8c-2-1.8-3.6-1.5-5-.2M11.5 8c1.4-2.1 3.3-2.4 5-1.2M11.5 8c.1-2.2-1-3.8-2.8-4.5"
      />
    </svg>
    <svg
      v-else-if="kind === 'fast-commute'"
      class="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="m13 2-8 12h6l-1 8 9-13h-6z" />
    </svg>
    <svg
      v-else-if="kind === 'friend'"
      class="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="m12 2.8 2.75 5.57 6.15.9-4.45 4.34 1.05 6.13L12 16.85l-5.5 2.89 1.05-6.13L3.1 9.27l6.15-.9L12 2.8Z"
      />
    </svg>
    <svg
      v-else
      class="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <path
        d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"
      />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  kind: { type: String, required: true },
  label: { type: String, required: true },
})
</script>
