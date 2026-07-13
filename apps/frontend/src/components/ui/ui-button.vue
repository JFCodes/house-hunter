<script setup lang="ts">

defineProps<{
  label: string
  disabled?: boolean
}>()

</script>

<template>
  <button class="hh-base-button hh-text-2xs hh-px-sm" :disabled="disabled">
    {{ label }}
  </button>
</template>
