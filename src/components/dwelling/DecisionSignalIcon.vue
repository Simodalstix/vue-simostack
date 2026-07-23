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
      <circle cx="7" cy="7" r="2.5" />
      <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
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
      v-else-if="kind === 'schools'"
      class="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5Z" />
      <path d="M6 11.5v4.25c3.5 2.5 8.5 2.5 12 0V11.5M21.5 9.5v6" />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  kind: { type: String, required: true },
  label: { type: String, required: true },
})
</script>
