<script setup lang="ts">
import type { TooltipMessageProps } from '@/components/tooltips/types'

defineProps<TooltipMessageProps>()
</script>

<template>
  <div class="tooltip hh-text-2xs">
    <p v-for="(message, index) in messages" :key="index">
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  padding: var(--spacing-2xs) var(--spacing-xs);
}
</style>