<script setup lang="ts">
import type { Component } from 'vue'
// Components
import { ShieldQuestionMark } from '@lucide/vue'

defineProps<{ icon?: Component }>()
</script>

<template>
  <div class="empty">
    <component :is="icon || ShieldQuestionMark" :size="54" />
    <div class="--text-center">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  color: var(--c-empty-color);
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
