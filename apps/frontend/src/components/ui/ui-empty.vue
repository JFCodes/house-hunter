<script setup lang="ts">
import type { Component } from 'vue'
// Components
import { ShieldQuestionMark } from '@lucide/vue'

defineProps<{ icon?: Component }>()
</script>

<template>
  <div class="empty">
    <component :is="icon || ShieldQuestionMark" color="var(--color-text-muted)" :size="54" />
    <div class="hh-text-center">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
