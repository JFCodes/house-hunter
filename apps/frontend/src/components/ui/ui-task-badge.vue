<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  type: 'running' | 'success' | 'error'
  icon: Component
  label: string
}>()
</script>

<template>
  <div class="task-badge" :class="`task-badge--${type}`">
    <component
      :class="{ 'active-icon': type === 'running' }"
      :is="icon"
      :size="18" />
    <span>{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.task-badge {
  border: solid 1px transparent;
  border-radius: var(--radius-sm);
  padding: 0 var(--s-sm);
  color: var(--c-white);
  align-items: center;
  line-height: 36px;
  gap: var(--s-xs);
  display: flex;
  height: 32px;

  &--running {
    background-color: color-mix(in srgb, var(--c-warning) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-warning) 20%, transparent);
  }

  &--success {
    background-color: color-mix(in srgb, var(--c-success) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-success) 20%, transparent);
  }

  &--error {
    background-color: color-mix(in srgb, var(--c-danger) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-danger) 20%, transparent);
  }
}

.active-icon {
  animation: linear 1s spin infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>