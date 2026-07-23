<template>
  <span class="inline-flex text-amber-400" role="img" :aria-label="label">
    <svg
      v-if="kind === 'beach'"
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42" />
      <path d="M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
    <svg
      v-else-if="kind === 'fast-commute'"
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m13 2-8 12h6l-1 8 9-13h-6z" />
    </svg>
    <svg
      v-else-if="kind === 'friend'"
      class="h-4 w-4"
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
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m2 8.5 10-5 10 5-10 5-10-5Z" />
      <path d="M6 11.5v4.25c3.5 2.5 8.5 2.5 12 0V11.5L12 14.5l-6-3Z" />
      <path d="M21 9h1v7h-1z" />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  kind: { type: String, required: true },
  label: { type: String, required: true },
})
</script>
