<script setup lang="ts">

defineProps<{ label: string }>()

</script>

<template>
  <button class="hh-base-button hh-text-2xs hh-px-sm">
    {{ label }}
  </button>
</template>
